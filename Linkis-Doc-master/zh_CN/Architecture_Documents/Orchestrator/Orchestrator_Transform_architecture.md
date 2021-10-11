## **Orchestrator-Transform架构**

### **一. Transtform概念**

Orchestrator中定义了任务调度编排不同阶段的结构，从ASTTree到LogicalTree，再到PhysicalTree，这些不同结构的转换，需要用到Transform模块。Transform模块定义了转换过程，Convert需要调用各种Transform，来进行任务结构的转换和生成。

## **二. Transform架构**

Transform嵌入在整个转换过程中，从Parser到Execution，每个阶段间会有Transform的实现类，分别将初始的JobReq转换成ASTTree、LogicalTree和PhysicalTree，PhysicalTree提交Execution执行。

![](../../Images/Architecture/orchestrator/transform/linkis-orchestrator-transform-01.png)

