---
title: Resource Manager
sidebar_position: 3
---

## 1. Background
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ResourceManager (RM for short) is the computing resource management module of Linkis. All EngineConn (EC for short), EngineConnManager (ECM for short), and even external resources including Yarn are managed by RM. RM can manage resources based on users, ECM, or other granularities defined by complex tags.  
## 2. The role of RM in Linkis
![01](/Images-zh/Architecture/rm-01.png)  
![02](/Images-zh/Architecture/rm-02.png)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As a part of Linkis Manager, RM mainly functions as follows: maintain the available resource information reported by ECM, process the resource application submitted by ECM, record the actual resource usage information reported by EC in real time during the life cycle after successful application, and provide query current resource usage The relevant interface of the situation.  
In Linkis, other services that interact with RM mainly include:  
1. Engine Manager, ECM for short: Processes the microservices that start the engine connector request. As a resource provider, ECM is responsible for registering and unregistering resources with RM. At the same time, as the manager of the engine, ECM is responsible for applying for resources from RM instead of the new engine connector that is about to start. For each ECM instance, there is a corresponding resource record in the RM, which contains information such as the total resources and protection resources it provides, and dynamically updates the used resources.  
![03](/Images-zh/Architecture/rm-03.png)  
2. The engine connector, referred to as EC, is the actual execution unit of user operations. At the same time, as the actual user of the resource, the EC is responsible for reporting the actual use of the resource to the RM. Each EC has a corresponding resource record in the RM: during the startup process, it is reflected as a locked resource; during the running process, it is reflected as a used resource; after being terminated, the resource record is subsequently deleted.  
![04](/Images-zh/Architecture/rm-04.png)  
## 3. Resource type and format
![05](/Images-zh/Architecture/rm-05.png)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As shown in the figure above, all resource classes implement a top-level Resource interface, which defines the calculation and comparison methods that all resource classes need to support, and overloads the corresponding mathematical operators to enable resources to be Directly calculated and compared like numbers.  
| Operator | Correspondence Method | Operator | Correspondence Method |
|--------|-------------|--------|-------------|
| \+ | add | \> | moreThan |
| \- | minus | \< | lessThan |
| \* | multiply | = | equals |
| / | divide | \>= | notLessThan |
| \<= | notMoreThan | | |  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The currently supported resource types are shown in the following table. All resources have corresponding json serialization and deserialization methods, which can be stored in json format and transmitted across the network:  

| Resource Type | Description |
|-----------------------|--------------------------------------------------------|
| MemoryResource | Memory Resource |
| CPUResource | CPU Resource |
| LoadResource | Both memory and CPU resources |
| YarnResource | Yarn queue resources (queue, queue memory, queue CPU, number of queue instances) |
| LoadInstanceResource | Server resources (memory, CPU, number of instances) |
| DriverAndYarnResource | Driver and executor resources (with server resources and Yarn queue resources at the same time) |
| SpecialResource | Other custom resources |  

## 4. Available resource management
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The available resources in the RM mainly come from two sources: the available resources reported by the ECM, and the resource limits configured according to tags in the Configuration module.  
**ECM resource report**:  
1. When the ECM is started, it will broadcast the ECM registration message. After receiving the message, the RM will register the resource according to the content contained in the message. The resource-related content includes:

     1. Total resources: the total number of resources that the ECM can provide.

     2. Protect resources: When the remaining resources are less than this resource, no further resources are allowed to be allocated.

     3. Resource type: such as LoadResource, DriverAndYarnResource and other type names.

     4. Instance information: machine name plus port name.

2. After RM receives the resource registration request, it adds a record in the resource table, the content is consistent with the parameter information of the interface, and finds the label representing the ECM through the instance information, and adds an association in the resource and label association table recording.

3. When the ECM is closed, it will broadcast a message that the ECM is closed. After receiving the message, the RM will go offline according to the ECM instance information in the message, that is, delete the resource and associated records corresponding to the ECM instance tag.  

**Configuration模块标签资源配置**：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the Configuration module, users can configure the number of resources based on different tag combinations, such as limiting the maximum available resources of the User/Creator/EngineType combination.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The RM queries the Configuration module for resource information through the RPC message, using the combined tag as the query condition, and converts it into a Resource object to participate in subsequent comparison and recording.  

## 5. Resource Usage Management  
**Receive user's resource application:**  
1. When LinkisManager receives a request to start EngineConn, it will call RM's resource application interface to apply for resources. The resource application interface accepts an optional time parameter. When the waiting time for applying for a resource exceeds the limit of the time parameter, the resource application will be automatically processed as a failure.  
**Judging whether there are enough resources:**  
That is, to determine whether the remaining available resources are greater than the requested resources, if greater than or equal to, the resources are sufficient; otherwise, the resources are insufficient.

1. RM preprocesses the label information attached to the resource application, and filters, combines and converts the original labels according to the rules (such as combining the User/Creator label and EngineType label), which makes the subsequent resource judgment more granular flexible.

2. Lock each converted label one by one, so that their corresponding resource records remain unchanged during the processing of resource applications.

3. According to each label:

    1. Query the corresponding resource record from the database through the Persistence module. If the record contains the remaining available resources, it is directly used for comparison.

    2. If there is no direct remaining available resource record, it will be calculated by the formula of [Remaining Available Resource=Maximum Available Resource-Used Resource-Locked Resource-Protected Resource].

    3. If there is no maximum available resource record, request the Configuration module to see if there is configured resource information, if so, use the formula for calculation, if not, skip the resource judgment for this tag.

    4. If there is no resource record, skip the resource judgment for this tag.

4. As long as one tag is judged to be insufficient in resources, the resource application will fail, and each tag will be unlocked one by one.

5. Only when all tags are judged to be sufficient resources, can the resource application be successfully passed and proceed to the next step.  

**lock by application of resources:**

1. The number of resource request by generating a new record in the resource table, and associated with each tag.

2. If there is a tag corresponding to the remaining available resource record, the corresponding number of the abatement.

3. Generate a timed task, the lock checks whether these resources are actually used after a certain time, if the timeout is not used, it is mandatory recycling.

4. unlock each tag.

**report the actual use of resources:**

1. EngineConn after the start, broadcast a resource utilization message. RM after receiving the message, check whether the label corresponding to the EngineConn lock resource record, and if not, an error.

2. If you have locked resource, the EngineConn all labels associated lock.

3. For each tag, the resource record corresponding lock record for the conversion of used resources.

4. Unlock all labels.

**Release actual used resources:**

1. EngineConn after the end of the life cycle, recycling broadcast messages. RM after receiving the message, check whether the EngineConn corresponding label resources have been recorded.

2. If so, all the labels associated EngineConn be locked.

3, minus the amount used in the corresponding resource record for each label.

4. If there is a tag corresponding to the remaining available resource record, the corresponding increase in number.

5. The unlocking each tag

## 6. External resource management
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In RM, in order to classify resources more flexibly and expansively, support multi-cluster resource management and control, and at the same time make it easier to access new external resources, the following considerations have been made in the design:

1. Unified management of resources through tags. After the resource is registered, it is associated with the tag, so that the attributes of the resource can be expanded infinitely. At the same time, resource applications are also tagged to achieve flexible matching.

2. Abstract the cluster into one or more tags, and maintain the environmental information corresponding to each cluster tag in the external resource management module to achieve dynamic docking.

3. Abstract a general external resource management module. If you need to access new external resource types, you can convert different types of resource information into Resource entities in the RM as long as you implement a fixed interface to achieve unified management.  
![06](/Images-zh/Architecture/rm-06.png)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other modules of RM obtain external resource information through the interface provided by ExternalResourceService.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The ExternalResourceService obtains information about external resources through resource types and tags:

1. The type, label, configuration and other attributes of all external resources (such as cluster name, Yarn web
     url, Hadoop version and other information) are maintained in the linkis\_external\_resource\_provider table.

2. For each resource type, there is an implementation of the ExternalResourceProviderParser interface, which parses the attributes of external resources, converts the information that can be matched to the Label into the corresponding Label, and converts the information that can be used as a parameter to request the resource interface into params . Finally, an ExternalResourceProvider instance that can be used as a basis for querying external resource information is constructed.

3. According to the resource type and label information in the parameters of the ExternalResourceService method, find the matching ExternalResourceProvider, generate an ExternalResourceRequest based on the information in it, and formally call the API provided by the external resource to initiate a resource information request.