## **Orchestrator Reheater架构**

### **一. Reheater概念**

Orchestrator-Reheater模块是Orchestrator的重放模块，用于在执行过程中，动态调整JobGroup的执行计划，为JobGroup动态添加Job、Stage和Task。从而避免网络等原因引起的子任务失败。目前主要有任务相关的TaskReheater，包含重试类型的RetryTaskReheater

### **二. Reheater架构图**

![](../../Images/Architecture/orchestrator/reheater/linkis-orchestrator-reheater-01.png)

Reheater在任务执行过程中，会收到ReheaterEvent，从而会对编排后的PhysicalTree进行调整，动态添加Job、Stage、Task。目前常用的有TaskReheater，包含重试类型的RetryTaskReheater、切换类型的SwitchTaskReheater，以及执行失败任务时的任务信息写入PlaybackService的PlaybackWrittenTaskReheater。

