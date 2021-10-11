## How To Quickly Implement A New Engine

To implement a new engine is to implement a new "EngineConnPlugin(ECP)" means engine plugin. Specific steps are as follows: 

1.Create a new maven module and introduce the maven dependency of "ECP"：
```
<dependency>
<groupId>com.webank.wedatasphere.linkis</groupId>
<artifactId>linkis-engineconn-plugin-core</artifactId>
<version>${linkis.version}</version>
</dependency>
```
2.The main interfaces of implementing "ECP"：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a)EngineConnPlugin, when starting "EngineConn", first find the corresponding "EngineConnPlugin" class, and use this as the entry point to obtain the implementation of other core interfaces, which is the main interface that must be implemented.
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b)EngineConnFactory, which implements the logic of how to start an engine connector and how to start an engine executor, is an interface that must be implemented.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.a Implement the "createEngineConn" method: return an "EngineConn" object, where "getEngine" returns an object that encapsulates the connection information with the underlying engine, and also contains Engine type information.
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.b For engines that only support a single computing scenario, inherit "SingleExecutorEngineConnFactory" class and implement "createExecutor" method which returns the corresponding Executor.
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.c For engines that support multiple computing scenarios, you need to inherit "MultiExecutorEngineConnFactory" and implement an ExecutorFactory for each computing type. "EngineConnPlugin" will obtain all ExecutorFactory through reflection and return the corresponding Executor according to the actual situation.
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c)EngineConnResourceFactory, it is used to limit the resources required to start an engine. Before the engine starts, it will use this as the basis to apply for resources from the "Linkis Manager". Not required, "GenericEngineResourceFactory" can be used by default.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d)EngineLaunchBuilder, it is used to encapsulate the necessary information that "EngineConnManager" can parse into the startup command. Not necessary, you can directly inherit "JavaProcessEngineConnLaunchBuilder".

3.Implement Executor. As a real computing scene executor, Executor is the actual computing logic execution unit. It also abstracts various specific capabilities of the engine and provides various services such as locking, accessing status and obtaining logs. According to actual needs, Linkis provides the following derived Executor base classes by default. The class names and main functions are as follows：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) SensibleExecutor: 
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i. Executor has multiple states, allowing Executor to switch states.
         
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. After the Executor switches the state, operations such as notifications are allowed. 
         
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) YarnExecutor: refers to the Yarn type engine, which can obtain the "applicationId", "applicationURL" and queue。
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c) ResourceExecutor: refers to the engine's ability to dynamically change resources and cooperate with the "requestExpectedResource" method to apply to RM for new resources each time you want to change resources; And the "resourceUpdate" method is used to request new resources from RM each time the actual resource used by the engine changes:
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d) AccessibleExecutor: is a very important Executor base class. If the user's Executor inherits the base class, it means that the Engine can be accessed. Here we need to distinguish between "SensibleExecutor"'s "state" method and "AccessibleExecutor"'s "getEngineStatus" method. "state" method is used to get the engine status, and "getEngineStatus" is used to get the basic indicator metric data such as engine status, load and concurrency.
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e) At the same time, if AccessibleExecutor is inherited, it will trigger the Engine process to instantiate multiple "EngineReceiver" methods. "EngineReceiver" is used to process RPC requests from Entrance, EM and "LinkisMaster", marking the engine an accessible engine. If users have special RPC requirements, they can communicate with "AccessibleExecutor" by implementing the "RPCService" interface. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f) ExecutableExecutor: it is a resident Executor base class. The resident Executor includes: Streaming applications in the production center, steps specified to run in independent mode after submission to "Schedulis", business applications of business users, etc.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;g) StreamingExecutor: inherited from "ExecutiveExecutor", it needs the ability to diagnose, do checkpoint, collect job information and monitor alarms.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;h) ComputationExecutor: it is a commonly used interactive engine Executor which handles interactive execution tasks and has interactive capabilities such as status query ad task killing.

             
## Actual Case         
The following will take the Hive engine as case to illustrate the implementation of each interface. The following figure is what is needed to implement a Hive engine All core classes implemented.

Hive engine is an interactive engine, so when implementing Executor, it inherits "ComputationExecutor" and introduces the following maven dependencies: 

``` 
<dependency>
<groupId>com.webank.wedatasphere.linkis</groupId>
<artifactId>linkis-computation-engineconn</artifactId>
<version>${linkis.version}</version>
</dependency>
```
             
As a subclass of "ComputationExecutor", "HiveEngineConnExecutor" implements the "executeLine" method. This method receives a line of execution statements. After calling the Hive interface for execution, it returns different "ExecuteResponse" to indicate success or failure. At the same time, in this method, through the interface provided in the "engineExecutorContext", the result set, log and progress transmission are realized. 

The Hive engine only needs to execute the HQL Executor, which is a single executor engine. Therefore, when defining "HiveEngineConnFactory", it inherits "SingleExecutorEngineConnFactory" which implements the following two interfaces: 
a) createEngineConn: creates a object that contains "UserGroupInformation", "SessionState" adn "HiveConf" as an encapsulation of the connection information with the underlying engine, set to the EngineConn object to return.
b) createExecutor: creates a "HiveEngineConnExecutor" executor object based on the current engine connection information.

Hive engine is an ordinary Java process, so when implementing "EngineConnLaunchBuilder", it directly inherits "JavaProcessEngineConnLaunchBuilder". Like memory size, Java parameters and classPath, it can be adjusted through configuration, please refer to "EnvConfiguration" class for details.

Hive engine uses "LoadInstanceResource resources", so there is no need to implement "EngineResourceFactory", directly use the default "GenericEngineResourceFactory", adjust the number of resources through configuration, refer to "EngineConnPluginConf" class for details.

Implement "HiveEngineConnPlugin" and provide methods for creating the above implementation classes.


