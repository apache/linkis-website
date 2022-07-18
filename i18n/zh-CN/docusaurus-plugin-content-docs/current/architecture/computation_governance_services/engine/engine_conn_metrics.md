---
title:  EngineConn Metrics 上报特性
sidebar_position: 5
tags: [Feature]
---


## 1. 功能需求
### 1.1 需求背景
Linkis上报信息缺少引擎信息、以及上报的资源和进度接口冗余降低了性能，需要对齐进行优化调整，并且在上报协议中增加扩展模块。

### 1.2 目标
- 增加包含资源、进度、额外信息的RPC 协议，支持一次请求上报这些信息
- 重构已有的资源、进度上报链路，合并为一个请求，上报相关信息

## 2. 总体设计

本次需求涉及`linkis-entrance、linkis-computation-orchestrator、linkis-orchestrator-ecm-plugin、linkis-computation-engineconn`模块。在`computation-engineconn`模块添加和重构上报信息，并且在entrance端解析这些信息和入库。

### 2.1 技术架构
引擎信息上报架构如图所示。用户提交任务到entrance后，entrance向linkismanager申请引擎。申请到引擎后，向申请提交任务，并接收任务的定时上报（资源、进度、状态）。直到任务执行完毕，entrance在用户查询时返回最终结果。本次需求修改，需要在entrance中新增引擎metrics信息入库；在Orchestrator中将Resource和Progress接口信息合并，并且增加metrics等额外信息；在交互式引擎ComputationEngineConn端将上报的资源和进度信息合并，并且额外上报引擎统计信息。

![engineconn-mitrics-1.png](/Images-zh/Architecture/EngineConn/engineconn-mitrics-1.png)


### 2.2 业务架构
此次特性涉及功能点模块如下：

|  组件名 |  一级模块 | 二级模块  | 功能点  |
| :------------ | :------------ | :------------ | :------------ |
| Linkis  |  Entrance |   | 合并资源和进度接口；解析新增引擎metrics  |
| Linkis |  Orchestrator |  orchestrator-core |  合并资源和进度接口；处理TaskRunningInfo消息 |
| Linkis  | Orchestrator  | orchestrator-plugin-ecm | 合并监听引擎信息的资源和进度接口 |
| Linkis  | Orchestrator  | computation-engineconn  | 合并资源和进度的上报接口；新增上报引擎示例metrics |


## 3. 模块设计
### 核心执行流程
-\[输入端]输入端为交互式引擎端computation-engineconn。引擎在执行任务时，上报运行信息TaskRunningInfo，包含原有的TaskProgressInfo和TaskResourceInfo，新增了引擎示例信息和引擎现有任务数信息。
- \[处理流程]orchestrator-plugin-ecm负责监听引擎运行任务时的上报信息，接收上报信息，并生成TaskRunningInfoEvent异步消息，发给OrchestratorAsyncListenerBus处理。注册到OrchestratorAsyncListener的TaskRunningInfoListener收到消息，触发listner方法，回调到Entrance的Job的TaskRunningInfo回调方法。回调方法解析出TaskRunningInfo中的资源、进度、引擎metrancs信息，分别进行持久化。

![engineconn-mitrics-2.png](/Images-zh/Architecture/EngineConn/engineconn-mitrics-2.png)

## 4. 数据结构

需求新增了RPC protocol TaskRunningInfo ，无新增db表

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








