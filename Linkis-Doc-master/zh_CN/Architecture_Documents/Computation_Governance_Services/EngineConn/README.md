EngineConn架构设计
==================

EngineConn：引擎连接器，为其他微服务模块提供统一配置管理、上下文服务、物理库、数据源管理、微服务管理和历史任务查询等功能的模块。

一、EngineConn架构图

![EngineConn](../../../Images/Architecture/EngineConn/engineconn-01.png)

二级模块介绍：
==============

linkis-computation-engineconn交互式引擎连接器
---------------------------------------------

提供交互式计算任务的能力。

| 核心类               | 核心功能                                                   |
|----------------------|------------------------------------------------------------|
| EngineConnTask       | 定义了提交给EngineConn的交互式计算任务                     |
| ComputationExecutor  | 定义了交互式Executor，具备状态查询、任务kill等交互式能力。 |
| TaskExecutionService | 提供对交互式计算任务的管理功能                             |

linkis-engineconn-common引擎连接器的通用模块
--------------------------------------------

1.  定义了引擎连接器中最基础的实体类和接口。EngineConn是用于创建一个底层计算存储引擎的连接会话Session，包含引擎与具体集群的会话信息，是与具体引擎通信的client。

| 核心Service           | 核心功能                                                             |
|-----------------------|----------------------------------------------------------------------|
| EngineCreationContext | 包含了EngineConn在启动期间的上下文信息                               |
| EngineConn            | 包含了EngineConn的具体信息，如类型、与层计算存储引擎的具体连接信息等 |
| EngineExecution       | 提供Executor的创建逻辑                                               |
| EngineConnHook        | 定义引擎启动各个阶段前后的操作                                       |

linkis-engineconn-core引擎连接器的核心逻辑
------------------------------------------

定义了EngineConn的核心逻辑涉及的接口。

| 核心类            | 核心功能                           |
|-------------------|------------------------------------|
| EngineConnManager | 提供创建、获取EngineConn的相关接口 |
| ExecutorManager   | 提供创建、获取Executor的相关接口   |
| ShutdownHook      | 定义引擎关闭阶段的操作             |

linkis-engineconn-launch引擎连接器启动模块
------------------------------------------

定义了如何启动EngineConn的逻辑。

| 核心类           | 核心功能                 |
|------------------|--------------------------|
| EngineConnServer | EngineConn微服务的启动类 |

linkis-executor-core执行器的核心逻辑
------------------------------------

>   定义了执行器相关的核心类。执行器是真正的计算场景执行器，负责将用户代码提交给EngineConn。

| 核心类                     | 核心功能                                                   |
|----------------------------|------------------------------------------------------------|
| Executor                   | 是实际的计算逻辑执行单元，并提供对引擎各种能力的顶层抽象。 |
| EngineConnAsyncEvent       | 定义了EngineConn相关的异步事件                             |
| EngineConnSyncEvent        | 定义了EngineConn相关的同步事件                             |
| EngineConnAsyncListener    | 定义了EngineConn相关异步事件监听器                         |
| EngineConnSyncListener     | 定义了EngineConn相关同步事件监听器                         |
| EngineConnAsyncListenerBus | 定义了EngineConn异步事件的监听器总线                       |
| EngineConnSyncListenerBus  | 定义了EngineConn同步事件的监听器总线                       |
| ExecutorListenerBusContext | 定义了EngineConn事件监听器的上下文                         |
| LabelService               | 提供标签上报功能                                           |
| ManagerService             | 提供与LinkisManager进行信息传递的功能                      |

linkis-callback-service回调逻辑
-------------------------------

| 核心类             | 核心功能                 |
|--------------------|--------------------------|
| EngineConnCallback | 定义EngineConn的回调逻辑 |

linkis-accessible-executor能够被访问的执行器
--------------------------------------------

能够被访问的Executor。可以通过RPC请求与它交互，从而获取它的状态、负载、并发等基础指标Metrics数据。

| 核心类                   | 核心功能                                        |
|--------------------------|-------------------------------------------------|
| LogCache                 | 提供日志缓存的功能                              |
| AccessibleExecutor       | 能够被访问的Executor，可以通过RPC请求与它交互。 |
| NodeHealthyInfoManager   | 管理Executor的健康信息                          |
| NodeHeartbeatMsgManager  | 管理Executor的心跳信息                          |
| NodeOverLoadInfoManager  | 管理Executor的负载信息                          |
| Listener                 | 提供与Executor相关的事件以及对应的监听器定义    |
| EngineConnTimedLock      | 定义Executor级别的锁                            |
| AccessibleService        | 提供Executor的启停、状态获取功能                |
| ExecutorHeartbeatService | 提供Executor的心跳相关功能                      |
| LockService              | 提供锁管理功能                                  |
| LogService               | 提供日志管理功能                                |
