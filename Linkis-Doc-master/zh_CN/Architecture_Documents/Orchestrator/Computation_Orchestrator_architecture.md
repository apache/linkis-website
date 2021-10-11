## **Computation-Orchestrator架构**

### **一. Computation-Orchestrator概念**

Computation-Orchestrator是Orchestrator的标准实现，支持交互式引擎的任务编排。Computation-Orchestrator提供了Converter、Parser、Validator、Planner、Optimizer、Execution、Reheater的常用实现方法。Computation-Orchestrator与AM对接，负责交互式任务执行，可以与Entrance对接，也可以与其它任务提交端直接对接，比如IOClient。Computation-Orchestrator同时支持同步和异步方式提交任务，并且支持获取多个Session实现隔离，

### **二. Computation-Orchestrator架构**

Entrance提交任务到Computation-Orchestrator执行，会同时注册日志、进度和结果集的Listener。任务执行过程中，会收到任务日志、任务进度，都会调用已注册的listener，将任务信息返回给Entrance。任务执行结束后，会生成结果集的Response，并调用结果集Listener。其中，Orchestrator支持Entrance提交绑定单个EngineConn的任务，通过任务中添加BindEngineLabel实现。

![](../../Images/Architecture/orchestrator/computation-orchestrator/linkis-computation-orchestrator-01.png)

### **三. Computation-Orchestrator执行流程**

Computation-Orchestrator执行流程如下图所示

![](../../Images/Architecture/orchestrator/computation-orchestrator/linkis-computation-orchestrator-02.png)

