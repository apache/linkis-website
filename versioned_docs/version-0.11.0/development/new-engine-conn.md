---
title: How To Quickly Implement A New Engine
sidebar_position: 3
---

## 1 General introduction

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When back-end developers use Linkis, they can not only directly use the execution engine that Linkis has developed, but also use the framework to develop their own applications according to their own needs.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis can be abstracted into Entrance, EngineManager and Engine modules. Among them, the role and architecture of the Entrance, EngineManager and Engine three modules can be viewed in the UJES architecture design document.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users only need to implement the necessary interfaces of the three modules to implement their own Linkis engine.

## 2 Access operation

### 2.1 Entrance access

#### 2.1.1 maven dependency

```xml
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>linkis-ujes-entrance</artifactId>
  <version>0.5.0</version>
</dependency>
```

#### 2.1.2 Interfaces to be implemented

 Entrance has no interfaces that must be instantiated. The following interfaces can be implemented as needed:
 
- EntranceParser. Used to transfer a request from the front end, usually a Json body, into a task that can be persisted. This class has provided AbstractEntranceParser, users only need to implement the parseToTask method, and the system provides CommonEntranceParser implementation by default.
 
 ![CommonEntranceParser](../images/ch6/CommonEntranceParser.png)<br/>

- EngineRequester. Used to obtain a RequestEngine class, which is used to request a new Engine from the EngineManager microservice. Linkis already has an implementation class.
 
 ![EngineRequesterImpl](../images/ch6/EngineRequesterImpl.png)<br/>

- Scheduler. It is used to implement scheduling. By default, the scheduling mode of multi-user concurrency and FIFO execution within a single user has been implemented.
 
 ![FIFOScheduler](../images/ch6/FIFOScheduler.png)<br/>

### 2.2 EngineManager access

#### 2.2.1 maven dependency

```xml
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>linkis-ujes-enginemanager</artifactId>
  <version>0.5.0</version>
</dependency>
```

#### 2.2.2 Interfaces to be implemented

 EngineManager needs to implement the following interfaces as needed:

- EngineCreator, AbstractEngineCreator already exists, and the createProcessEngineBuilder method needs to be implemented to create an EngineBuilder.

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here, ProcessEngineBuilder has provided a JavaProcessEngineBuilder class by default, this class is an abstract class, and the necessary classpath, JavaOpts, GC file path, log file The path, and the opening of the DEBUG port in the test mode have been completed.

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now JavaProcessEngineBuilder, you only need to add additional classpath and JavaOpts.

 ![AbstractEngineCreator](../images/ch6/AbstractEngineCreator.png)<br/>

- EngineResourceFactory, AbstractEngineResourceFactory already exists, and the getRequestResource method needs to be implemented to get the user's personalized resource request.
 
 ![EngineResourceFactory](../images/ch6/EngineResourceFactory.png)<br/>

- hooks, this is a spring entity bean, mainly used to add pre and post hooks before and after the engine is created and started. The user needs to provide an Array[EngineHook] for dependency injection.
 
 ![hooks](../images/ch6/hooks.png)<br/>
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For specific examples, please refer to the implementation of Hive EngineManager.

- resources, this is a spring entity bean, mainly used for registering resources like RM. Resources are instances of ModuleInfo, which need to be provided by the user for dependency injection.
 
 ![resources](../images/ch6/resources_bean.png)<br/>


### 2.3 Engine access

#### 2.3.1 maven dependency

```xml
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>Linkis-ujes-engine</artifactId>
  <version>0.5.0</version>
</dependency>
```

#### 2.3.2 Interfaces to be implemented

1. The interfaces that Engine must implement are as follows:

- EngineExecutorFactory. To create an EngineExecutor, the createExecutor method needs to be implemented. Specifically, an EngineExecutor is created through a Map that stores parameters.

![EngineExecutorFactory](../images/ch6/EngineExecutorFactory.png)<br/>

- EngineExecutor. The actual real executor is used to submit and execute the code submitted by entrance. Need to implement getActualUsedResources (resources actually used by the engine), executeLine (execute a line of code parsed by CodeParser), executeCompletely (the supplementary method of executeLine, if the call to executeLine returns ExecuteIncomplete, then the new Code and the previous return ExecuteIncomplete The code is passed to the engine for execution at the same time)

![EngineExecutor](../images/ch6/EngineExecutor.png)<br/>


2. The interfaces or beans that the Engine does not have to implement are as follows:

- engineHooks: Array[EngineHook], is a spring bean. EngineHook is the pre- and post-hook created by the engine. At present, the system has provided two hooks: CodeGeneratorEngineHook is used to load UDFs and functions, and ReleaseEngineHook is used to release idle engines. If not specified, the system will provide engineHooks=Array(ReleaseEngineHook by default )

![engineHooks](../images/ch6/engineHooks_bean.png)<br/>

- CodeParser. Used to parse the code so that it can be executed line by line. If not specified, the system defaults to provide a CodeParser that directly returns all codes.

![CodeParser](../images/ch6/codeParser_bean.png)<br/>

- EngineParser, used to convert a RequestTask into a Job that can be submitted to the Scheduler. If not specified, the system will provide an EngineParser that converts the RequestTask into a CommonEngineJob by default.

![EngineParser](../images/ch6/engineParser_bean.png)<br/>


## 3 Reference examples

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This section will provide a reference example by introducing the writing of the hive engine.

### 3.1 HiveEntrance access

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;According to the description in the second section, Entrance has no interfaces that must be implemented, the code in linkis-0.5.0, and the entry of hive only have two classes. It is only used for error code extension.

### 3.2. HiveEngineManager access

-1. Implementation of EngineCreator interface

![HiveEngineCreator](../images/ch6/HiveEngineCreator.png)<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From the above figure, we can see that there is a HiveEngineCreator class in the HiveEM module, which inherits the AbstractEngineCreator class, and also implements the createProcessEngineBuilder method, returning a HiveQLProcessBuilder.

-2.HiveQLProcessBuilder implementation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HiveEngineManager has a HiveQLProcessBuilder class in this module, which inherits from JavaProcessEngineBuilder. This class implements a number of necessary interfaces and also overrides the build method. In fact, the parent The build method of the class is complete enough. HiveQLProcessBuilder overrides the build method to obtain the parameters passed in by the user and then add them to the startup command.

![HiveQLProcessBuilder](../images/ch6/HiveQLProcessBuilder.png)<br/>

-3. AbstractEngineResourceFactory interface implementation

![HiveEngineResourceFactory](../images/ch6/hive_engineResourceFactory_bean.png)<br/>
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In this instance, we can notify the ResourceManager of the number of CPU cores, memory size, and number of instances that the user wants to obtain each time the user requests the engine

-4. Injection of resources and hooks bean

![HiveBeans](../images/ch6/hive_beans.png)<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From the figure above, we can see that by injecting a Spring configuration

Configuration, inject two beans, resources and hooks, UJES framework itself will provide @ConditionalMissingBean annotation to inject default beans, developers can inject their own entity beans according to their own needs. In this class instance bean, the user can register the total memory of EngineManager service, the total number of CPU cores, and the total number of instances that can be created in RM.

### 3.3 HiveEngine access

-1. EngineExecutorFactory interface implementation
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There is a HiveEngineExecutorFactory in the HiveEngine module. At the end of the createExecutor method, the HiveEngineExecutor is returned.

![HiveEngineExecutorFactory](../images/ch6/HiveEngineExecutorFactory.png)<br/>

-2.EngineExecutor interface implementation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where executeLine is an interface that must be implemented, which is to pass in a line of script separated by CodeParser and return ExecuteResponse (success or failure).

![HiveEngineExecutor](../images/ch6/HiveEngineExecutor.png)<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In addition, executeCompletely also needs to be implemented, which is called when executeLine returns IncompleteReponse.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine has some common methods when performing operations, such as close kill pause progress and other methods that can be implemented according to your needs.

## 4 FAQ

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to add group questions.
 
![WeChat group](../images/ch6/group.png)<br/>