---
title: EngineConn 架构
sidebar_position: 1
---


## 1.总述

EngineConn：引擎连接器，用于连接底层的计算存储引擎，完成任务的执行、任务信息推送和结果返回等，是Linkis提供计算存储能力的基础。

## 2. 总体设计

    EngineConn的整体设计思路，启动的时候会完成底层引擎Session信息的获取和存储，完成EngineConn进程和底层引擎的连接，然后通过Executor执行器单元完成任务的调度到EngineConn存储的底层引擎Session中进行执行，并获取执行相关的信息。

### 2.1 技术架构

**关键名词介绍：**

**EngineConn：** 用于存储底层引擎的Session信息。来完成和底层引擎的连接，例如Spark引擎存储的是SparkSession。

**Executor：**用于接受调用方(如：Entrance)传过来的任务的调度执行器，并将任务最终提交给底层的引擎Session进行执行，不同的任务实现不同的Executor类。使用最多的是交互式ComputationExecutor，用于接受任务并实时推送任务信息给到调用方。以及非交互式的只接受一次任务的ManageableOnceExecutor，用于完成对EngineConn启动的任务的提交执行。

![arc](/Images/Architecture/engine/ec_arc_01.png)

### 2.2 业务架构

|组件名|一级模块|二级模块|功能点|
|:----|:----|:----|:----|
|Linkis|EngineConn|linkis-engineconn-common|引擎连接器的通用模块，定义了引擎连接器中最基础的实体类和接口。|
|Linkis|EngineConn|linkis-engineconn-core|引擎连接器的核心模块，定义了EngineConn的核心逻辑涉及的接口。|
|Linkis|EngineConn|linkis-executor-core|执行器的核心模块，定义了执行器相关的核心类。|
|Linkis|EngineConn|linkis-accessible-executor|能够被访问的Executor底层抽象。可以通过RPC请求与它交互，从而获取它的状态、负载、并发等基础指标Metrics数据|
|Linkis|EngineConn|linkis-computation-engineconn|提供交互式计算任务能力的相关类。|

## 3. 模块设计

输入：调用方执行任务

输出：返回执行状态、结果、日志等任务信息

关键逻辑：任务执行的关键逻辑的时序图

![time](/Images/Architecture/engine/ec_arc_02.png)

关键说明：

1. 如果是串行Executor，EngineConn接收到任务后就会将EngineConn标记为Busy状态，不能再接受其他任务，并且会判断任务的锁是否一致，防止EngineConn被多个调用方同时提交的情况。任务执行完变成Unlock状态
2. 如果是并行的Executor，EngineConn接收到任务后，状态还是Unlock状态，可以继续接受任务，只有当达到任务并发数或者机器指标异常才会标记为Busy状态
3. 如果是Once类型任务，EngineConn启动后就会自动执行任务，任务执行结束EngineConn进程退出

## 4. 数据结构/存储设计

不涉及

## 5. 接口设计

**其他类简要介绍：**

linkis-engineconn-common引擎连接器的通用模块，定义了引擎连接器中最基础的实体类和接口。

|核心Service|核心功能|
|:----|:----|
|EngineCreationContext|包含了EngineConn在启动期间的上下文信息|
|EngineConn|包含了EngineConn的具体信息，如类型、与底层计算存储引擎的具体连接信息等|
|EngineExecution|提供Executor的创建逻辑|
|EngineConnHook|定义引擎启动各个阶段前后的操作|

linkis-engineconn-core引擎连接器的核心模块，定义了EngineConn的核心逻辑涉及的接口。

|核心类|核心功能|
|:----|:----|
|EngineConnManager|提供创建、获取EngineConn的相关接口|
|ExecutorManager|提供创建、获取Executor的相关接口|
|ShutdownHook|定义引擎关闭阶段的操作|
|EngineConnServer|EngineConn微服务的启动类|

linkis-executor-core执行器的核心模块，定义了执行器相关的核心类。执行器是真正的计算执行单元，负责将用户代码提交给EngineConn进行执行。

|核心类|核心功能|
|:----|:----|
|Executor|是实际的计算逻辑执行单元，并提供对引擎各种能力的顶层抽象。|
|EngineConnAsyncEvent|定义了EngineConn相关的异步事件|
|EngineConnSyncEvent|定义了EngineConn相关的同步事件|
|EngineConnAsyncListener|定义了EngineConn相关异步事件监听器|
|EngineConnSyncListener|定义了EngineConn相关同步事件监听器|
|EngineConnAsyncListenerBus|定义了EngineConn异步事件的监听器总线|
|EngineConnSyncListenerBus|定义了EngineConn同步事件的监听器总线|
|ExecutorListenerBusContext|定义了EngineConn事件监听器的上下文|
|LabelService|提供标签上报功能|
|ManagerService|提供与LinkisManager进行信息传递的功能|

linkis-accessible-executor：能够被访问的Executor底层抽象。可以通过RPC请求与它交互，从而获取它的状态、负载、并发等基础指标Metrics数据。

|核心类|核心功能|
|:----|:----|
|LogCache|提供日志缓存的功能|
|AccessibleExecutor|能够被访问的Executor，可以通过RPC请求与它交互。|
|NodeHealthyInfoManager|管理Executor的健康信息|
|NodeHeartbeatMsgManager|管理Executor的心跳信息|
|NodeOverLoadInfoManager|管理Executor的负载信息|
|Listener相关|提供与Executor相关的事件以及对应的监听器定义|
|EngineConnTimedLock|定义Executor级别的锁|
|AccessibleService|提供Executor的启停、状态获取功能|
|ExecutorHeartbeatService|提供Executor的心跳相关功能|
|LockService|提供锁管理功能|
|LogService|提供日志管理功能|
|EngineConnCallback|定义EngineConn的回调逻辑|

提供交互式计算任务能力的相关类。

|核心类|核心功能|
|:----|:----|
|EngineConnTask|定义了提交给EngineConn的交互式计算任务|
|ComputationExecutor|定义了交互式Executor，具备状态查询、任务kill等交互式能力，默认每次只能执行一次任务。|
|ConcurrentComputationExecutor|交互式同步并发Executor，继承于ComputationExecutor，但是支持同时执行多个任务|
|AsyncConcurrentComputationExecutor|交互式异步并发Executor，继承ComputationExecutor，支持同时执行多个任务，并且任务不占用执行线程采用异步通知的形式|
|TaskExecutionService|提供对交互式计算任务的管理功能|


## 6. 非功能性设计

### 6.1 安全

1. 任务所有相关的信息，只能提交用户才能进行查询
2. EngineConn进程的默认启动用户为提交用户
### 6.2 性能

支持并发的EngineConn支持同时并发跑大量任务，如单个trino的EngineConn可以同时跑300多个trino任务

### 6.3 容量

不涉及

### 6.4 高可用

EngineConn是按需、按任务启动的进程。支持高可用

### 6.5 数据质量

不涉及

