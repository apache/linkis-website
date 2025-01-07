---
title: EngineConn Design
sidebar_position: 3
---

EngineConn architecture design
==================

EngineConn: Engine connector, a module that provides functions such as unified configuration management, context service, physical library, data source management, micro service management, and historical task query for other micro service modules.

EngineConn architecture diagram

![EngineConn](/Images/Architecture/EngineConn/engineconn-01.png)

Introduction to the second-level module:
==============

linkis-computation-engineconn interactive engine connector
---------------------------------------------

The ability to provide interactive computing tasks.

| Core class               | Core function                                                   |
|----------------------|------------------------------------------------------------|
| EngineConnTask       | Defines the interactive computing tasks submitted to EngineConn                     |
| ComputationExecutor  | Defined interactive Executor, with interactive capabilities such as status query and task kill. |
| TaskExecutionService | Provides management functions for interactive computing tasks                             |

linkis-engineconn-common engine connector common module
--------------------------------------------

Define the most basic entity classes and interfaces in the engine connector. EngineConn is used to create a connection session Session for the underlying computing storage engine, which contains the session information between the engine and the specific cluster, and is the client that communicates with the specific engine.

| Core Service           | Core function                                                             |
|-----------------------|----------------------------------------------------------------------|
| EngineCreationContext | Contains the context information of EngineConn during startup                               |
| EngineConn            | Contains the specific information of EngineConn, such as type, specific connection information with layer computing storage engine, etc. |
| EngineExecution       | Provide Executor creation logic                                               |
| EngineConnHook        | Define the operations before and after each phase of engine startup                                       |

The core logic of linkis-engineconn-core engine connector
------------------------------------------

Defines the interfaces involved in the core logic of EngineConn.

| Core class            | Core function                           |
|-------------------|------------------------------------|
| EngineConnManager | Provide related interfaces for creating and obtaining EngineConn |
| ExecutorManager   | Provide related interfaces for creating and obtaining Executor   |
| ShutdownHook      | Define the operation of the engine shutdown phase             |

linkis-engineconn-launch engine connector startup module
------------------------------------------

Defines the logic of how to start EngineConn.

| Core class           | core function                 |
|------------------|--------------------------|
| EngineConnServer | EngineConn microservice startup class |

The core logic of the linkis-executor-core executor
------------------------------------

>   Defines the core classes related to the actuator. The executor is a real computing scene executor, responsible for submitting user code to EngineConn.

| Core class                 | Core function                                                   |
|----------------------------|------------------------------------------------------------|
| Executor | It is the actual computational logic execution unit and provides a top-level abstraction of the various capabilities of the engine. |
| EngineConnAsyncEvent | Defines EngineConn-related asynchronous events |
| EngineConnSyncEvent | Defines EngineConn-related synchronization events |
| EngineConnAsyncListener | Defines EngineConn related asynchronous event listener |
| EngineConnSyncListener | Defines EngineConn related synchronization event listener |
| EngineConnAsyncListenerBus | Defines the listener bus for EngineConn asynchronous events |
| EngineConnSyncListenerBus | Defines the listener bus for EngineConn synchronization events |
| ExecutorListenerBusContext | Defines the context of the EngineConn event listener |
| LabelService | Provide label reporting function |
| ManagerService | Provides the function of information transfer with LinkisManager |

linkis-callback-service callback logic
-------------------------------

| Core Class         | Core Function |
|--------------------|--------------------------|
| EngineConnCallback | Define EngineConn's callback logic |

linkis-accessible-executor can be accessed executor
--------------------------------------------

Executor that can be accessed. You can interact with it through RPC requests to get its status, load, concurrency and other basic indicators Metrics data.


| Core Class               | Core Function                                   |
|--------------------------|-------------------------------------------------|
| LogCache | Provide log cache function |
| AccessibleExecutor | The Executor that can be accessed can interact with it through RPC requests. |
| NodeHealthyInfoManager | Manage Executor's Health Information |
| NodeHeartbeatMsgManager | Manage the heartbeat information of Executor |
| NodeOverLoadInfoManager | Manage Executor load information |
| Listener | Provides events related to Executor and the corresponding listener definition |
| EngineConnTimedLock | Define Executor level lock |
| AccessibleService | Provides the start-stop and status acquisition functions of Executor |
| ExecutorHeartbeatService | Provides heartbeat related functions of Executor |
| LockService | Provide lock management function |
| LogService | Provide log management functions |