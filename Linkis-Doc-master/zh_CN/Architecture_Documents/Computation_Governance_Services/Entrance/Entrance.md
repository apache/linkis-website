Entrance架构设计
================

Links任务提交入口是用来负责计算任务的接收、调度、转发执行请求、生命周期管理的服务，并且能把计算结果、日志、进度返回给调用方，是从Linkis0.X的Entrance拆分出来的原生能力。

一、Entrance架构图

![](../../../Images/Architecture/linkis-entrance-01.png)

**二级模块介绍：**

EntranceServer
--------------

EntranceServer计算任务提交入口服务是Entrance的核心服务，负责Linkis执行任务的接收、调度、执行状态跟踪、作业生命周期管理等。主要实现了把任务执行请求转成可调度的Job，调度、申请Executor执行，Job状态管理，结果集管理，日志管理等。

| 核心类                  | 核心功能                                                                                                                                           |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| EntranceInterceptor     | Entrance拦截器用来对传入参数task进行信息的补充，使得这个task的内容更加完整， 补充的信息包括: 数据库信息补充、自定义变量替换、代码检查、limit限制等 |
| EntranceParser          | Entrance解析器用来把请求参数Map解析成Task,也可以将Task转成可调度的Job,或者把Job转成可存储的Task。                                                  |
| EntranceExecutorManager | Entrance执行器管理为EntranceJob的执行创建Executor,并维护Job和Executor的关系，且支持Job请求的标签能力                                               |
| PersistenceManager      | 持久化管理负责作业相关的持久化操作，如结果集路径、作业状态变化、进度等存储到数据库。                                                               |
| ResultSetEngine         | 结果集引擎负责作业运行后的结果集存储，以文件的形式保存到HDFS或者本地存储目录。                                                                     |
| LogManager              | 日志管理负责作业日志的存储并对接日志错误码管理。                                                                                                   |
| Scheduler               | 作业调度器负责所有Job的调度执行，主要通过调度作业队列实现。                                                                                        |
|                         |                                                                                                                                                    |
