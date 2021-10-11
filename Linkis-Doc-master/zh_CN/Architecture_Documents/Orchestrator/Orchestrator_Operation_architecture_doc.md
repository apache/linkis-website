Orchestrator-Operation架构设计
===

## 一. Operation概念
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operation操作是用于扩展异步执行期间对任务的额外操作，在调用Orchestration的异步执行后，调用者获取到的是OrchestrationFuture，该接口里面只提供了cancel、waitForCompleted、getResponse等操作任务的方法。但是当我们需要获取任务日志、进度、暂停任务时没有调用人口，这也是Operation定义的初衷，用于对外扩展更多对异步运行的任务的额外能力。定义如下：


## 二. Operation类图
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operation采用的是用户扩展的方式，用户需要扩展操作时，只需要按照我们的Operation接口实现对应的类，然后注册到Orchestrator，不需要改动底层代码即可以拥有对应的操作。整体类图如下：

![operation_class](../../Images/Architecture/orchestrator/operation/operation_class.png)


## 三. Operation使用
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operation的使用主要分为两步，首先是Operation注册，然后是Operation调用：
1. 注册方式，首先是按照第二章的Operation接口实现对应的Operation实现类，然后通过`OrchestratorSessionBuilder`完成Operation的注册，这样通过`OrchestratorSessionBuilder`创建出来的OrchestratorSession中的SessionState是持有Operation的；
2. Operation的使用需要在使用通过OrchestratorSession完成编排后，调用Orchestration的异步执行方法asyncExecute获取OrchestrationFuture才可以进行；
3. 接着通过Operation操作name，如“LOG”日志，调用`OrchestrationFuture.operate("LOG")` 进行操作获取对应Operation的返回对象，

## 四. Operation例子
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以下通过日志操作来为例进行说明，LogOperation的定义在第二章有说明，LogOperation通过实现Operation和TaskLogListener两个接口。整体日志获取流程如下：
1. 当Orchestrator接收到任务日志后，会通过listenerBus推送event给到LogOperation进行消费；
2. 当LogOperation获取到日志后，会调用日志处理器LogProcessor进行写日志（writeLog），该LogProcessor会通过调用方调用方法`OrchestrationFuture.operate("LOG")`获取到；
3. LogProcessor有两种给到外部获取日志的方式，一种是通知模式，外部调用方可以注册日志listener方法给到日志处理器，当日志处理器的writeLog方法被调用后后会调用所有的listener进行通知
4. 一种是主动拉取模式，通过调用LogProcessor的getLog方法主动获取日志

