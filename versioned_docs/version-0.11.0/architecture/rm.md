---
title: RM design
sidebar_position: 2
---

## 1 Background

  In the microservice scenario, the resources consumed and occupied by various services are diverse and more difficult to manage than traditional applications. Linkis RM provides services for the uniform allocation and recycling of resources. When a large number of services are started and closed at a high frequency, it ensures that the consumption of resources by the service does not exceed the limit.

## 2 Product Design

### 2.1 Overall architecture diagram

![RM Architecture Diagram](../images/ch4/rm_architecture_diagram.png)

  RM maintains the available resource information reported by the engine manager, processes the resource application submitted by the engine, and records the actual resource usage information after the successful application.

1. Engine Manager, EM for short: a microservice that processes requests to start an engine. As a resource provider, EM is responsible for registering and unregistering resources with RM. At the same time, EM, as the manager of the engine, is responsible for applying for resources from RM instead of the engine. For each EM instance, there is a corresponding resource record in the RM, which contains information such as the total resources and protection resources it provides, and dynamically updates the used resources.

2. Engine, also known as application: a microservice that executes user operations. At the same time, as the actual user of resources, the engine is responsible for reporting the actual used resources and releasing resources to the RM. Each Engine has a corresponding resource record in the RM: during the startup process, it is reflected as a locked resource; during the running process, it is reflected as a used resource; after being terminated, the resource record is subsequently deleted.

### 2.2 Database table structure design
```

User resource record table:
linkis_user_resource_meta_data:
id
user
ticket_id
creator
em_application_name
em_instance
engine_application_name
engine_instance
user_locked_resource: store json directly
user_used_resource: json
resource_type
locked_time
used_time

Module resource record table:
linkis_em_resource_meta_data:
id
em_application_name
em_instance
total_resource:json
protected_resource:json
resource_policy
used_resource:json
left_resource:json
locked_resource:json
register_time: long

Module policy table:
linkis_em_meta_data:
id
em_name
resource_request_policy

Lock: The table needs to add unique constraint: (scope, user, module_application_name, module_instance) to ensure that the lock is not forced to be acquired multiple times at the same time.
linkis_resource_lock:
id
user
em_application_name
em_instance

```

### 2.3 Types and formats of resources

  As shown in the figure above, all resource classes implement a top-level Resource interface, which defines the calculation and comparison methods that all resource classes need to support, and performs corresponding mathematical operator overloading, so that resources can be Directly calculated and compared like numbers.

|operator|corresponding method|operator|corresponding method|
|:---- |:---|:----- |:----- |
|+ |add |> |moreThan |
|- |minus |< | lessThan |
|* |multiply |= | equals |
| / |divide |>= | notLessThan |
| <= |notMoreThan |


  The currently supported resource types are shown in the following table. All resources have corresponding json serialization and deserialization methods, which can be stored in json format and transmitted across the network:

|Resource Type| Description|
|:---- |:---|
|MemoryResource |MemoryResource |
|CPUResource |CPU Resource|
|LoadResource |Have both memory and CPU resources|
|YarnResource |Yarn queue resources (queue, queue memory, queue CPU, number of queue instances)|
|LoadInstanceResource |Server resources (memory, CPU, number of instances)|
|DriverAndYarnResource |Driver and actuator resources (both server resources and Yarn queue resources)|
|SpecialResource |Other custom resources|


## 3 Record the available resources reported by EM

1. When the EM holding the resource starts, it will call the register interface through RPC and pass in the resource in json format for resource registration. The parameters that need to be provided to the register interface are as follows:
  
  1) Total resources: the total number of resources that the EM can provide.
  
  2) Protect resources: When the remaining resources are less than this resource, no further resources are allowed to be allocated.
  
  3) Resource type: such as LoadResource, DriverAndYarnResource and other type names.
  
  4) EM name: The EM name that provides resources such as sparkEngineManager.
  
  5) EM instance: machine name plus port name.
  
2. After the RM receives the resource registration request, it adds a new record to the table linkis_module_resource_meta_data, the content of which is consistent with the parameter information of the interface.

3. When the EM holding the resource is closed, it will call the unregister interface through RPC and pass in its own EM instance information as a parameter to offline the resource.

4. After receiving the resource offline request, the RM finds the row corresponding to the EM instance information in the linkis_module_resource_meta_data table and deletes it; at the same time, finds all the rows corresponding to the EM instance in the linkis_user_resource_meta_data table and deletes it.

## 4 Resource allocation and recycling

1. Receive user's resource application.

  a) RM provides requestResource interface to EM to report resource application, this interface accepts EM instance, user, Creator and Resource object as parameters. requestResource accepts an optional time parameter. When the processing event exceeds the limit of the time parameter, the resource request will be automatically processed as a failure.

2. Determine whether there are sufficient resources.
  
  a) According to the EM instance information, find the resource type provided by the EM, and then find the corresponding RequestResourceService (there are multiple subclasses, and each subclass corresponds to one or more resource types and has its own processing logic).
  
  b) RequestResourceService counts the remaining available resources from multiple dimensions.
    
   &ensp;i. According to the total resources of the EM, after subtracting the used resources and the protected resources, the remaining EM available resources are obtained.
    
   &ensp;ii. According to the upper limit of the resources allowed by the creator, after subtracting the resources already used by the creator, the remaining available resources of the creator are obtained.
    
   &ensp;iii. According to the upper limit of the resources allowed by the user, after subtracting the resources used by the user, the remaining resources available to the user are obtained.
    
   &ensp;iv. According to the user's global upper limit of the number of instances, subtract the number of engines that the user has started to obtain the remaining number of available instances.
   
  c) Step by step, compare the remaining available quantity with the requested resources.
  
   &ensp;i. According to the order listed in b, once the remaining available quantity of a certain step is less than the quantity applied for, it is immediately determined that there are not enough resources, and NotEnoughResource and the corresponding prompt information are returned, and the determination of subsequent steps will not be performed.
   
   &ensp;ii. In the above steps, if the remaining available quantity is greater than the requested quantity until the end, it is determined that there are enough resources, and the next step is to lock the resources.

3. Lock the resource for the request that successfully applied for the resource. After confirming that the resources are sufficient, lock the resources in advance for the application and generate a unique identifier.

  a) In order to ensure the correctness in the concurrent scenario, two locks need to be added before the lock operation (the specific implementation of the lock mechanism is described in another chapter): EM lock and user lock.
    
   &ensp;i. EM lock. After the lock is obtained, other resource operations for the EM will not be allowed.
    
   &ensp;ii. User lock. After the lock is obtained, other resource operations of the user will not be allowed.
   
  b) After the two locks are successfully obtained, the judgment will be repeated again to determine whether the resources are sufficient, and if it is still sufficient, continue with the subsequent steps.
  
  c) Generate a UUID for the resource application, and insert a user resource record in the linkis_user_resource_meta_data table (pre_used_resource is the number of resources requested, and used_resource is null).
  
  d) Update the corresponding EM resource record fields (locked_resource, left_resource) in the linkis_module_resource_meta_data table.
  
  e) Submit a timed task. If the task is not cancelled, the two steps c and d will be rolled back after a fixed time, and the UUID will be invalidated so that the locked resources that are not actually used will not be occupied indefinitely.
  
  f) Return the UUID to the resource applicant.
  
  g) No matter what happens in the above steps, release the two locks obtained in a at the end.
  
4. Receive the actual used resources reported by the user.

  a) Provide resourceInited interface, accept UUID, user name, EM instance information, actual use of Resource object and engine instance information as parameters.
  
  b) After receiving the reported information, obtain the EM lock and user lock.
  
  c) According to the UUID query to find the corresponding locked resource record, update pre_used_resource to null, and fill in used_resource with the resource actually used.
  
  d) Update the corresponding module resource record (restore locked_resource, add used_resource).

  e) Abnormal situation: If the corresponding UUID cannot be found, it is considered that the lock on the resource has been lost, and an exception message is returned.

5. Receive a request from the user to release resources.

  a) Provide resourceReleased interface, accept UUID, username, EM instance as parameters.
  
  b) After receiving the request, obtain the EM lock and the user lock.
  
  c) Query the corresponding user resource record according to UUID, and delete the row.
  
  d) Update the corresponding module resource record (clean up used_resource, restore left_resource).

## 5 Implementation of EM lock and user lock

  The lock is realized through the linkis_resource_lock table, and the unique constraint mechanism of the database itself is used to ensure that the data is not preempted.

1. EM lock: for the global lock on an instance of an EM operation.

 a) Obtain the lock:
 
  &ensp;i. Check whether there is a record where the user is null and the application and instance fields are corresponding values. If there is, it means that the lock has been acquired by other instances, and polling is waiting.
  
  &ensp;ii. When there is no corresponding record, insert a record, if the insertion is successful, it means that the lock is successfully obtained; if the insertion encounters a UniqueConstraint error, the record polling and waiting until timeout.

 b) Release the lock:
 
  &ensp;i. Delete the record that you own.

2. User lock: lock the operation of a certain EM for a certain user.

 a) Obtain the lock:

  &ensp;i. Check whether there is a record with the user, application and instance fields as corresponding values. If so, it means that the lock has been acquired by other instances, and wait for polling.

  &ensp;ii. When there is no corresponding record, insert a record, if the insertion is successful, it means that the lock is successfully obtained; if the insertion fails, the record polling waits until timeout.

 b) Release the lock:

  &ensp;i. Delete the records held by yourself.

## 6 RM Client

  In the form of a jar package, the client is provided to resource users and resource providers, including the following:

1. All resources
Type of Java class (a subclass of Resource class), and the corresponding json serialization method.

2. The Java class (subclass of ResultResource class) of all resource allocation results, and the corresponding json serialization method.

3. The encapsulated RM interface (resource registration, offline, application, available resources and resource release requests).

  After calling the client's interface, the client will generate the corresponding RPC command and pass it to a microservice of RM for processing through the Sender. After RM is processed, the result is also returned to the client via RPC.

## 7 Multi-instance state synchronization

&ensp;&ensp;Because RM is a key underlying service, in order to prevent the resource allocation of all services from being affected by an abnormality of an RM instance, it is necessary to ensure that multiple RM instances are in service at the same time, and to ensure that a request is received by which instance Processing can ensure the consistency of the results.

&ensp;&ensp; When a user requests the service of RM, he must request it through the forwarding of the gateway service, and cannot directly request a fixed RM instance. Through the service registration and discovery mechanism, the gateway service identifies the RM instance that normally provides the service, and then forwards the RPC request to one of the instances. This ensures that all requests will be processed by the RM instance in the normal state.

All resource records of &ensp;&ensp;RM are stored in the same database, and all RM instances do not maintain their own state. When RM processes a request, any state change involved will obtain state information from the database in real time after the lock is locked, and immediately update the state back to the database after completing the processing logic, and then release the lock. This ensures that when multiple RMs process requests at the same time, they can always be based on the latest status.