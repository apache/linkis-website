---
title:  EngineConn Metrics 上报特性
sidebar_position: 5
tags: [Feature]
---


## 1. 功能需求
### 1.1 需求背景
 上报信息缺少引擎信息、以及上报的资源和进度接口有冗余，降低了性能，需要对其进行优化调整，并且在上报协议中增加扩展模块。

### 1.2 目标
- 增加了包含资源、进度、额外信息的RPC 协议，支持在一次请求中上报这些信息
- 重构已有的资源、进度上报的链路，将上报相关信息的动作合并为一个请求

## 2. 总体设计

本次需求涉及`linkis-entrance、linkis-computation-orchestrator、linkis-orchestrator-ecm-plugin、linkis-computation-engineconn`模块。在`computation-engineconn`模块添加和重构上报信息，并且在entrance端解析这些信息和入库。

### 2.1 技术架构

引擎信息上报架构如图所示。用户提交任务到entrance后，entrance向linkismanager申请引擎。
申请到引擎后，向EngineConn提交任务，并接收任务的定时上报（资源、进度、状态）。直到任务执行完毕，entrance在用户查询时返回最终结果。
本次需求修改，需要在entrance中新增引擎metrics信息入库；
在Orchestrator中将Resource和Progress接口信息合并，并且增加metrics等额外信息；
在交互式引擎ComputationEngineConn端将上报的资源和进度信息合并，并且额外上报引擎统计信息。

![engineconn-mitrics-1.png](/Images-zh/Architecture/EngineConn/engineconn-mitrics-1.png)


### 2.2 业务架构
此次特性涉及功能点模块如下：

|  一级模块 | 二级模块  | 功能点  |
| :------------ | :------------ | :------------ |
|  Entrance |   | 合并资源和进度接口；解析新增引擎metrics  |
|  Orchestrator |  orchestrator-core |  合并资源和进度接口；处理TaskRunningInfo消息 |
| Orchestrator  | orchestrator-plugin-ecm | 合并监听引擎信息的资源和进度接口 |
| Orchestrator  | computation-engineconn  | 合并资源和进度的上报接口；新增上报引擎示例metrics |


## 3. 模块设计
### 核心执行流程
- [输入端]输入端为交互式引擎端`computation-engineconn`。引擎在执行任务时，上报运行信息`TaskRunningInfo`，包含原有的`TaskProgressInfo`和`TaskResourceInfo`，新增了引擎示例信息和引擎现有任务数信息。
- [处理流程]`orchestrator-plugin-ecm`负责监听引擎运行任务时的上报信息，接收上报信息，并生成`TaskRunningInfoEvent`异步消息，
发给`OrchestratorAsyncListenerBus`处理。注册到`OrchestratorAsyncListener`的`TaskRunningInfoListener`收到消息，触发`listener`方法，回调到`Entrance`的Job的`TaskRunningInfo`回调方法。
回调方法解析出`TaskRunningInfo`中的资源、进度、引擎`metrancs`信息，分别进行持久化。

![engineconn-mitrics-2.png](/Images-zh/Architecture/EngineConn/engineconn-mitrics-2.png)

## 4. 数据结构 

需求新增了`RPC protocol TaskRunningInfo` ，无新增db表

## 5. 接口设计
无对外接口

## 6. 非功能性设计：
### 6.1 安全
RPC接口内部鉴权，不涉及对外安全问题

### 6.2 性能
合并了两个RPC接口，减少上报次数，提升了性能

### 6.3 容量
metrics信息较少，无影响

### 6.4 高可用
不涉及








