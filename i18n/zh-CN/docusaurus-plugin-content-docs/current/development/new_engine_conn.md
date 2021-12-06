## 如何快速实现一个新引擎

实现一个新的引擎其实就是实现一个新的EngineConnPlugin（ECP）引擎插件。具体步骤如下：

1. 新建一个maven模块，并引入ECP的maven依赖：
```
<dependency>
<groupId>com.webank.wedatasphere.linkis</groupId>
<artifactId>linkis-engineconn-plugin-core</artifactId>
<version>${linkis.version}</version>
</dependency>
```
2. 实现ECP的主要接口：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a)EngineConnPlugin，启动EngineConn时，先找到对应的EngineConnPlugin类，以此为入口，获取其它核心接口的实现，是必须实现的主要接口。
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b)EngineConnFactory，实现如何启动一个引擎连接器，和如何启动一个引擎执行器的逻辑，是必须实现的接口。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.a 实现createEngineConn方法：返回一个EngineConn对象，其中，getEngine返回一个封装了与底层引擎连接信息的对象，同时包含Engine类型信息。
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.b 对于只支持单一计算场景的引擎，继承SingleExecutorEngineConnFactory，实现createExecutor，返回对应的Executor。
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.c 对于支持多计算场景的引擎，需要继承MultiExecutorEngineConnFactory，并为每种计算类型实现一个ExecutorFactory。EngineConnPlugin会通过反射获取所有的ExecutorFactory，根据实际情况返回对应的Executor。
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c)EngineConnResourceFactory，用于限定启动一个引擎所需要的资源，引擎启动前，将以此为依 据 向 Linkis Manager 申 请 资 源。非必须，默认可以使用GenericEngineResourceFactory。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d)EngineLaunchBuilder，用于封装EngineConnManager可以解析成启动命令的必要信息。非必须，可以直接继承JavaProcessEngineConnLaunchBuilder。

3. 实现Executor。Executor为执行器，作为真正的计算场景执行器，是实际的计算逻辑执行单元，也对引擎各种具体能力的抽象，提供加锁、访问状态、获取日志等多种不同的服务。根据实际的使用需要，Linkis默认提供以下的派生Executor基类，其类名和主要作用如下：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) SensibleExecutor：
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i. Executor存在多种状态，允许Executor切换状态
         
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. Executor切换状态后，允许做通知等操作
         
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) YarnExecutor：指Yarn类型的引擎，能够获取得到applicationId和applicationURL和队列。
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c) ResourceExecutor: 指引擎具备资源动态变化的能力，配合提供requestExpectedResource方法，用于每次希望更改资源时，先向RM申请新的资源；而resourceUpdate方法，用于每次引擎实际使用资源发生变化时，向RM汇报资源情况。
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d) AccessibleExecutor：是一个非常重要的Executor基类。如果用户的Executor继承了该基类，则表示该Engine是可以被访问的。这里需区分SensibleExecutor的state()和 AccessibleExecutor 的 getEngineStatus()方法：state()用于获取引擎状态，getEngineStatus()会获取引擎的状态、负载、并发等基础指标Metric数据。
       
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e) 同时，如果继承了 AccessibleExecutor，会触发Engine 进程实例化多个EngineReceiver方法。EngineReceiver用于处理Entrance、EM和LinkisMaster的RPC请求，使得该引擎变成了一个可被访问的引擎，用户如果有特殊的RPC需求，可以通过实现RPCService接口，进而实现与AccessibleExecutor通信。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f) ExecutableExecutor：是一个常驻型的Executor基类，常驻型的Executor包含：生产中心的Streaming应用、提交给Schedulis后指定要以独立模式运行的脚步、业务用户的业务应用等。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;g) StreamingExecutor：Streaming为流式应用，继承自ExecutableExecutor，需具备诊断、do checkpoint、采集作业信息、监控告警的能力。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;h) ComputationExecutor：是常用的交互式引擎Executor，处理交互式执行任务，并且具备状态查询、任务kill等交互式能力。

             
## 实际案例          
以下将以Hive引擎为案例，说明各个接口的实现方式。下图就是实现一个Hive引擎所需要
实现的所有核心类。

Hive引擎是一个交互式引擎，因此在实现Executor时，继承了ComputationExecutor，并做
了以下maven依赖的引入：

```
<dependency>
<groupId>com.webank.wedatasphere.linkis</groupId>
<artifactId>linkis-computation-engineconn</artifactId>
<version>${linkis.version}</version>
</dependency>
```
             
作为ComputationExecutor的子类，HiveEngineConnExecutor实现了executeLine方法，该方法接收一行执行语句，调用Hive的接口进行执行后，返回不同的ExecuteResponse表示成功或失败。同时在该方法中，通过参engineExecutorContext中提供的接口，实现了结果集、日志和进度的传输。

Hive 引擎只需要执行 HQL 的 Executor，是一个单一执行器的引擎，因此，在定义HiveEngineConnFactory时，继承的是SingleExecutorEngineConnFactory，实现了以下两个接口：
a) createEngineConn：创建了一个包含 UserGroupInformation、SessionState 和HiveConf的对象，作为与底层引擎的连接信息的封装，set到EngineConn对象中返回。
b) createExecutor：根据当前的引擎连接信息，创建一个HiveEngineConnExecutor执行器对象。

Hive引擎是一个普通的Java进程，因此在实现EngineConnLaunchBuilder时，直接继承了JavaProcessEngineConnLaunchBuilder。像内存大小、Java参数和classPath，可以通过配置进行调整，具体参考EnvConfiguration类。

Hive引擎使用的是LoadInstanceResource资源，因此不需要实现EngineResourceFactory，直接使用默认的GenericEngineResourceFactory，通过配置调整资源的数量，具体参考EngineConnPluginConf类。

实现HiveEngineConnPlugin，提供以上实现类的创建方法。


