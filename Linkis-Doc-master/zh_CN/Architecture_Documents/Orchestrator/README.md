## Orchestrator 架构设计

Linkis的计算编排模块，提供了全栈引擎和丰富的计算策略的支持，通过编排方式实现对双读、双写、AB等策略的支持；并且通过与标签系统整合实现对多种作业场景，例交互式计算作业、常驻式作业以及存储式作业等场景的支持。

#### 架构示意图

![Orchestrator架构图](../../Images/Architecture/orchestrator/linkis_orchestrator_architecture.png)  


#### 模块介绍

##### 1. Orchestrator-Core

核心模块，将任务编排拆分了约七个步骤，分别对应的接口为Converter(转换), Parser(解析)， Validator(校验)， Planner(计划), Optimizer(优化)，Execution(执行), Reheater(再热/重试)，之间的实体流转图见如下：  
![Orchestrator实体流转](../../Images/Architecture/orchestrator/overall/orchestrator_entity.png)

核心的接口定义如下:

| 核心顶层接口/类 | 核心功能 |
| --- | --- | 
| `ConverterTransform`| 完成对用户提交的req请求转换为编排的Job，同时会对请求做参数检查和信息补充 |
| `ParserTransform`| 完成对Job的解析和拆分，拆分成多个Stage阶段信息，构成AST树 |
| `ValidatorTransform` | 对Job和Stage的信息校验，例如对附带的Label信息的校验 |
| `PlannerTransform` | 将AST阶段的Job和Stage转换成逻辑计划，生成Logical树，其中Job和Stage分别转换为LogicalTask |
| `OptimizerTransform` | 完成Logical Tree到 Physical Tree的转换，既物理计划转换, 转换前还会对AST树做优化处理 |
| `Execution` | 调度执行物理计划的Physical Tree，处理执行子作业之间的依赖关系 |
| `ReheaterTransform` | 对Execution执行过程中可重试的失败作业的重新调度执行 |

##### 2. Computation-Orchestrator

是针对交互式计算场景下Orchestrator的标准实现，对抽象接口都做了默认实现，其中包含例如对SQL等语言代码的转换规则集合，以及请求执行交互式作业的具体逻辑。
典型的类定义如下：

| 核心顶层接口/类 | 核心功能 |
| --- | --- | 
| `CodeConverterTransform`| 针对请求中附带的代码信息的解析转换， 例如 Spark Sql, Hive Sql, Shell 和 Python|
| `CodeStageParserTransform` | 解析拆分Job，针对CodeJob，既附带代码信息的Job|
| `EnrichLabelParserTransform` | 解析拆分Job的同时填入标签信息 |
| `TaskPlannerTransform` | 交互式计算场景下，将Job拆分成的Stage信息转化为逻辑计划，即Logical Tree |
| `CacheTaskOptimizer` | 对逻辑计划中的AST树增加缓存节点，优化后续的执行 |
| `ComputePhysicalTransform` | 交互式计算场景下，将逻辑计划转化为物理计划 |
| `CodeLogicalUnitExecTask` | 交互式计算场景下，物理计划中的最小执行单元|
| `ComputationTaskExecutionReceiver` | Task执行的RPC回调类，接收任务的状态、进度等回调信息|

##### 3. Code-Orchestrator

是针对常驻型和存储型作业场景下Orchestrator的标准实现

##### 4. Plugins/Orchestrator-ECM-Plugin

提供了Orchestrator对接LinkisManager 和 EngineConn所需要的接口方法，简述如下：

| 核心顶层接口/类 | 核心功能 |
| --- | --- | 
| `EngineConnManager` | 提供了请求EngineConn资源，向EngineConn提交执行请求的方法，并主动缓存了可用的EngineConn|