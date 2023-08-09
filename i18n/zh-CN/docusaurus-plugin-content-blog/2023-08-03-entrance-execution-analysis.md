---
title: 【源码解读】Linkis1.1.1 Entrance执行分析
authors: [Casion]
tags: [blog,linkis1.1.1,entrance]
---
### 前言

以下是基于Linkisv1.1.1源码分析得出的图解：Entrance服务执行流程。
后面所有的讲解都是围绕这一张图，所以在看讲解时，请参考整个图去理解。讲解思路是化整为零，积点成线，集线成面。
![](/static/Images/blog/entry-service-execution-process.jpg)

将上图进行大致划分，分为：
环境初始化区：整个Entrance服务启动时，需要初始化的EntranceContext
提交任务区：用户调用EntranceRestfulApi接口提交任务，以及Job构建，拦截器操作等
执行区：从提交区提交过来的Job， 包含了整个Job生命周期的所有操作
![](/static/Images/blog/entrance-context.png)

### 环境初始化区
![](/static/Images/blog/env-init.png)
```
Entrance功能拆分很细，各司其职，易于扩展。整个环境的注入可查看EntranceSpringConfiguration配置类，下面从左到右依次介绍

PersistenceManager(QueryPersistenceManager)持久化管理
：主要作用对象是job，已经定义好了state，progress，result等操作。QueryPersistenceEngine和EntranceResultSetEngine就是其中一种实现，如果存储类型有变更，只需要额外新增实现，在entrance注入更改注入类就可实现切换。

EntranceParser(CommonEntranceParser)参数解析器：主要有三个方法，parseToTask (json ->
request)，parseToJob (request -> job)，parseToJobRequest (job ->
request)，此过程大致可以表示为：json -> request <=> job

LogManager(CacheLogManager)日志管理: 打印日志以及更新错误码等

Scheduler(ParallelScheduler)调度器：负责job分发，job执行环境初始化等，linkis按同租户同任务类型进行分组，很多设置都是基于这个分组原则设置的，比如并行度，资源等。所以这里有三个重要功能组件，并抽象出一个SchedulerContext上下文环境管理：
1)GroupFactory(EntranceGroupFactory)group工厂：按分组创建group，并以groupName为key缓存group。group主要记录一些参数，如并发数，线程数等
2)ConsumerManager(ParallelConsumerManager)消费管理器：按分组创建consumer，并以groupName为key缓存consumer，并且初始化一个线程池，供所有consumer使用。consumer主要用于存放job，提交执行job等
3)ExecutorManager(EntranceExecutorManagerImpl)executor管理：为每一个job创建一个executor，负责job整个生命周期所有操作

EntranceInterceptor拦截器：entrance服务所有拦截器

EntranceEventListenerBus事件监听服务：一个通用事件监听服务，本质是个轮询线程，内置线程池，线程数5，添加event会向注册的listener按事件类型分发事件
```

### 提交任务区
![](/static/Images/blog/submit-task.png)
```
主要以用户调用EntranceRestfulApi的execute()方法讲解。主要有四个重要步骤

ParseToTask：接收到请求json后，先转化为request，依赖PersistenceManager保存到数据库，得到taskId
调用所有拦截器Interceptors
ParseToJob：将request转化为EntranceExecutionJob，并设置CodeParser，通过job.init()将job解析并构建SubJobInfo和SubJobDetail对象（v1.2.0已经没有SubJob了）
提交job到Scheduler，得到execId
```

### 执行区
![](/static/Images/blog/excute-area.png)
```
ParallelGroup：存放一些参数，FIFOUserConsumer会用到，参数变更应该不会实时生效

FIFOUserConsumer：
1. 内含ConsumeQueu(LoopArrayQueue)，环队列，大小为maxCapacity，添加job采用offer方法，如果队列满了则返回None，业务上报错。
2. 本质是个线程，轮询调用loop()方法，每次只取一个job，并通过ExecutorManager创建一个executor，使用线程池提交job
3. 并发数由ParallelGroup的maxRunningJobs决定，任务会优先获取需要重试的任务。

DefaultEntranceExecutor：executor负责监控整个Job提交，每次提交一个SubJobInfo。大致步骤总结：
1. 异步提交Orchestrator并返回orchestratorFuture
2. orchestratorFuture注册dealResponse函数，
dealResponse：subJob成功，有下一个继续提交SubJob,没有则调用notify告知Job成功，如果SubJob失败，则notify告知Job失败，判断重试，重新创建executor
3. 创建EngineExecuteAsyncReturn，注入orchestratorFuture

提交过程：

FIFOUserConsumer通过loop()获取一个job
获取一个DefaultEntranceExecutor，注入到job中
通过线程池调用job的run方法，job内触发DefaultEntranceExecutor的execute
提交Orchestrator并等待调用dealResponse，触发notify
更改job状态，判断重试，继续提交
```
