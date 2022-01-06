---
title: RM Design
sidebar_position: 2
---

## 1 Background

  Under the microservice scenario, the resources required and occupied by various services are diverse and more difficult to manage than traditional applications.Linkis RM provides services for the uniform allocation and recovery of resources and ensures that services are consumed within limits when a large number of services are activated and closed at high frequency.

## 2 Product Design

### 2.1 Overall Architecture

![RM Architecture](../images/ch4/rm_architecture_diagram.png)

  RM Maintenance Engine Manager reported available resource information, processed engine resource requests and recorded actual resource usage information after successful application.

1. Engine manager, Simplified EM：handles the micro-service requested by the startup engine.EM, as a provider of resources, is responsible for registering resources with RM (register) and offline resources (unregister).At the same time, EM, as manager of the engine, is responsible for applying resources to RM instead of the engine.Each EMM instance contains a corresponding resource record in RM, containing information on its total resources, protection of resources, etc. and dynamic updating of used resources.

2. Eng,Engine,Engine,also referred to applying：to perform user assignment microservices.At the same time, the engine, as the actual user of the resource, is responsible for reporting to RM the actual use and releasing the resource.Each Engine, has a corresponding resource record in RM：in startup that is reflected as a locked resource; during running; when running; when finished, the resource record is deleted.

### 2.2 Database Table Structure Design
```

用户资源记录表：
linkis_user_resource_meta_data: 
    id
    user
    ticket_id
    creator
    em_application_name
    em_instance
    engine_application_name
    engine_instance
    user_locked_resource: 直接存储json
    user_used_resource: json
    resource_type
    locked_time
    used_time

模块资源记录表：
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

模块policy表：
linkis_em_meta_data: 
    id
    em_name
    resource_request_policy

锁：该表需要添加unique constraint：（scope，user, module_application_name, module_instance），用来保证锁不被强制多次同时获取。
linkis_resource_lock: 
    id
    user
    em_application_name
    em_instance

```

### 2.3 Types and formats of resources

  As shown in the graph above, all resource classes achieve a top resource interface that defines the methods of calculation and comparison that all resource classes need to support and reload the corresponding mathematical operator, allowing resources to be calculated and compared directly as numbers.

| Operator | Response method | Operator | Response method |
|:-------- |:--------------- |:-------- |:--------------- |
| +        | add             | >        | more Than       |
| -        | minus           | <        | LessThan        |
| *        | Multiply-reply  | =        | Equals          |
| /        | dir             | >=       | NotLessThan     |
| <=       | notMoreThan     |          |                 |


  Current supported resource types are shown in the table below and all resources have json serialization and deserialization methods that can be stored in json format and passed between networks：

| Asset Type            | Description                                                                |
|:--------------------- |:-------------------------------------------------------------------------- |
| Memorandum Resource   | Memorandum Resource                                                        |
| CPUResource           | CPU Resources                                                              |
| LoadResource          | Resources with memory and CPU                                              |
| YarnResource          | Yarn queue resources (queue, queue memory, queue CPU, queue instances)     |
| LoadInstanceResource  | Server resources (memory, CPU, instances)                                  |
| DriverAndYarnResource | Drive and executor resources (with server resources, Yarn queue resources) |
| SpecialResource       | Other custom resources                                                     |


## 3 Recording available resources reported by EM.

1. At startup EMs will register resources via RPC using register interfaces to transfer resources in json format.需要向register接口提供的参数如下：

  1) Total Resources：Total Resources the EMM can provide.

  2) Protected resource：is no longer allowed to reallocate resources when the remaining resource is less than that resource.

  3) Resource type：type name like LoadResource, DriverAndYarnResource.

  4) EMM name：for resourcing EM, like sparkEngineManager.

  5) EM instance：machine name plus port name.

2. RM adds a record to the table linkis_module_resource_meta_data after receiving a request for registration of the resource. The content is consistent with the parameters of the interface.

3. When the resource is closed, the resource will be offline by means of an RPC call to the unregister interface, passing into its own EMs instance information as parameters.

4. RM finds the line corresponding to EM's instance information in the linkis_module_resource_meta_data table and deletes all lines of the EM's instance in the linkis_user_resource_meta_data table.

## 4 Allocation and recovery of resources

1.  Receive user resource requests.

  a) RM provides the requestResource interface to EM, which accepts EM examples, users, Creator and Resource objects as parameters.The requestResource accepts an optional time parameter that will automatically be processed as a failure when the processing of the file exceeds that time parameter.

2.  Determines whether there are sufficient resources.

  a) Find the type of resources provided by EM, based on EM, and then find the corresponding RequestResourceService (there are multiple subcategories, each of which corresponds to one or more resource type, with its own processing logics).

  b) RequestResourceService shows the remaining available resources from multiple dimensions.

   &ensp;i. Based on the total resources of the EMM, less used and protected resources, the remaining EM's available resources.

   &ensp;ii. Based on the maximum allowed resources available for this creator, subtracting the resources already used by the creator, derive from the remaining creator available resources.

   &ensp;iii. Based on the maximum allowed resources available to the user, subtracting the resources already used by the user.

   &ensp;iv. Based on the user's global maximum number of instances, subtract the number of engines that the user has started, derive the number of available instances.

  (c) Step by step compare the remaining available amounts with the requested resources.

   &ensp;i. Once the remaining quantity available for a step is smaller than the number requested, the order listed in (b) is immediately determined that insufficient resources are available, return NotEnghource and the corresponding reminder information and no further steps will be determined.

   &ensp;ii. In the above step, if until the last remaining quantity is greater than the quantity requested, it is determined that sufficient resources will be available for the next locking of the resource.

3.  Lock the resource for a successful request to the resource.Once the resource is confirmed, lock the resource ahead and generate a unique identifier for the application.

  a) Two locks need to be added before locking is made in order to ensure correctness in and out of scenes (concrete implementation of the locking mechanism is described in separate sections)：EMs and user locks.

   &ensp;i. EM. Lock.Once you get this lock, you will not allow other resource operations for this EM.

   &ensp;ii. User Lock.Once you get this lock, the user's other resource operations will not be allowed.

  b) Once both locks have been successful, the adequacy of resources will again be judged and the follow-up steps will be continued if they are still sufficient.

  c) Generate a UUID for this resource request and insert a user resource record in the linkis_user_resource_meta_data table (pre_used_resource is the number of resources requested, used_resource is null).

  d) Update corresponding EMR resource record fields (locked_resource_resource_resource_data) in the linkis_module_resource.

  e) Submit a scheduled task which, if not cancelled, reverts to rolc, d and two-step operations after a fixed time and invalidates UUID so that locked resources that are not actually used will not be occupied indefinitely.

  f) Return UUID to the resource applicant.

  g) Two locks obtained in the final releasea regardless of what happened in the above steps.

4.  Actual use resources reported by recipient users.

  a) Provide resourceInited interfaces that accept UUUID, username, EM-instance information, actual use of resource objects and engine instance information as parameters.

  b) Obtain EMs locks and user locks upon receipt of reported information.

  c) Check the records of the corresponding locked resources according to UUID, update pre_used_resource to null, and fill in used_resources actually used.

  d) Update corresponding module resource records (restore blocked_resource, add used_resource).

  e) Exceptions：if the corresponding UUID cannot be found, consider that the resource is lost and returned to the exception information.

5.  Receive user requests to free resources.

  a) Provide a resourceReleased interface that accepts UUID, username, EMs as parameters.

  b) Obtain EMs locks and user locks upon receipt.

  c) Delete the line by retrieving the corresponding user resources from UUUID.

  d) Update the corresponding module resource record (cleaning used_resource, restoring left_resources).

## 5 EM locks and user locks implementation

  Locks via linkis_resource_blocktable, using the unique constraint mechanism of the database itself to ensure that data is not stolen.

1.  EMLock：for a global lock on an instance of an EM.

 a) get lock：

  &ensp;i. Check if there is a record of user null, application and instance fields as corresponding values, indicating that the lock has been obtained by other examples, asking for queries.

  &ensp;ii. Insert a record when no corresponding record is found. If the insertion is successful, indicate successful lockout; if the insertion occurs in violation of the UniqueConstraint error, log the query until the timeout.

 b) Release lock：

  &ensp;i. Delete the line you own.

2. User Lock：for a user's lock on an EM.

 a) get lock：

  &ensp;i. Check if user,application and instancefield are records of corresponding values, if any, indicating that the lock has been obtained by other examples, asking for queries.

  &ensp;ii. Insert a record when no corresponding record is found. If the insertion is successful, indicate successful lockout; if the insertion fails, log the round query awaits until timeout.

 b) Release lock：

  &ensp;i. Delete own records.

## 6 RM Client

  以jar包的形式，提供客户端给资源使用方和资源提供方，包含以下内容：

1.  Java class of all resource types (sub class of resource), and the corresponding json serialization method.

2.  Java class for all resource allocation results (sub-class for ResultResource) and the corresponding json serialization method.

3.  Packaged RM interfaces (registration of resources, offline, application, and available resources and requests for release of resources).

  After calling the client's interface, the client will generate the corresponding RPC command, which will be processed through a microservice passed from Sender to RM.Once the RMM is processed, the results are also returned to the client via RPC.

## 7 Multiple Instances Synchronization

&ensp;&ensp;Because RM is a critical bottom service, in order to prevent an anomaly that affects the allocation of resources for all services as a result of an RMM instance it is necessary to ensure that multiple RMs are at the same time in service status and that a request, regardless of which instance is handled, ensures consistency of results.

&ensp;&ensp;When requesting RM services, the user must request a request by forwarding the gateway service and cannot directly request a fixed RM instance.Gateway services identify RM instances of normal service delivery through service registration and discovery mechanisms, thus forwarding RPC requests to one of them.This ensures that all requests are dealt with in normal state RM instances.

&ensp;&ensp;RM All resource records are stored in the same database and all RMM instances do not maintain their own status.RM processes requests when they involve changes in status, get status information from the database in real time, complete processing logic and update the status back to the database immediately before releasing the lock.This ensures that multiple RMs are always based on the latest state when handling requests simultaneously.

