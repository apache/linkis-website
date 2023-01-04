---
title: openLooKeng 的引擎的实现
authors: [peacewong]
tags: [engine]
---

## 概述
openLooKeng是一种"开箱即用"的引擎，支持在任何地点（包括地理上的远程数据源）对任何数据进行原位分析。它通过SQL 2003接口提供了所有数据的全局视图。openLooKeng具有高可用性、自动伸缩、内置缓存和索引支持，为企业工作负载提供了所需的可靠性。

openLooKeng用于支持数据探索、即席查询和批处理，具有100+毫秒至分钟级的近实时时延，而无需移动数据。openLooKeng还支持层次化部署，使地理上远程的openLooKeng集群能够参与相同的查询。利用其跨区域查询计划优化能力，涉及远程数据的查询可以达到接近“本地”的性能。
Linkis实现openLooKeng引擎可以让Linkis拥有数据虚拟化的能力，支持提交跨源异构查询、跨域跨DC查询型任务。Linkis作为计算中间件通过利用openLooKeng的连接器基于Linkis的EngineConn的连通通能力可以做到连接更多的底层计算存储组件。

## 开发实现方式
openLooKeng ec的实现基于Linkis的EngineConn Plugin（ECP）进行扩展，因为OpengLooKeng服务支持多用户通过Client进行查询，所以实现模式为采用多用户并发引擎的实现模式。
也就是多个用户提交的任务，可以同时在一个EC进程里面进行运行，可以极大的复用EC资源，减少资源浪费。具体类图如下：

【缺图】

具体实现为openLooKengEngineConnExecutor继承于ConcurrentComputationExecutor，支持多用户多任务并发，并且支持对接到多个不同的openLooKeng集群。
## 架构
架构图：
![image](https://user-images.githubusercontent.com/7869972/166736911-c0f50968-3996-40d0-afdf-52b35d4cd71c.png)


任务流转图如下：
  ![image](https://user-images.githubusercontent.com/7869972/166737177-57f8f84a-b16d-44bd-b7cf-a61fc2cc160c.png)

基于Linkis和openLooKeng的能力可以提供如下能力：
- 1.基于Linkis的计算中间件层的连接能力可以让上层应用工具快速对接使用openLooKeng，提交任务，并获取日志、进度、结果。
- 2.基于Linkis的公共服务能力可以做到对openLooKeng的sql完成自定义变量替换、UDF管理等
- 3.基于Linkis的上下文能力可以打通OpengLooKeng的结果传递给下游Spark、Hive等EC进行查询
- 4.基于Linkis的资源管控和多租户能力可以将任务进行租户隔离和openLooKeng资源的使用
- 5.基于OpengLooKeng的连接器能力上层应用工具可以做到完成提交跨源异构查询、跨域跨DC查询型任务，并获得秒级返回。

## 后续计划
后续两个社区将继续进行合作，计划推出以下功能：
- 1.Linkis支持openLooKeng on Yarn模式
- 2.Linkis完成对openLooKeng的资源管控，任务可以现在Linkis进行排队，资源足够才进行提交
- 3.基于openLooKeng的混算能力优化Linkis Orchestrator的能力去完成后续计划的EC间的混算能力。
