# Q&A
Linkis1.0常见问题和解决办法
：[https://docs.qq.com/doc/DWlN4emlJeEJxWlR0](https://docs.qq.com/doc/DWlN4emlJeEJxWlR0)
#### Q1、linkis启动报错：NoSuchMethodErrorgetSessionManager()Lorg/eclipse/jetty/server/SessionManager

具体堆栈： 
```
Failed startup of context o.s.b.w.e.j.JettyEmbeddedWebAppContext@6c6919ff{application,/,[file:///tmp/jetty-docbase.9102.6375358926927953589/],UNAVAILABLE} java.lang.NoSuchMethodError: org.eclipse.jetty.server.session.SessionHandler.getSessionManager()Lorg/eclipse/jetty/server/SessionManager;
at org.eclipse.jetty.servlet.ServletContextHandler\$Context.getSessionCookieConfig(ServletContextHandler.java:1415) ~[jetty-servlet-9.3.20.v20170531.jar:9.3.20.v20170531]
```

解法：jetty-servlet 和 jetty-security版本需要从9.3.20升级为9.4.20；

#### Q2、启动微服务linkis-ps-cs时，报DebuggClassWriter overrides final method visit

具体异常栈：

![linkis-exception-01.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-01.png)

解法:jar包冲突，删除asm-5.0.4.jar;

#### Q3、启动微服务linkis-ps-datasource时，JdbcUtils.getDriverClassName NPE

具体异常栈：

![linkis-exception-02.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-02.png)


解法：Linkis-datasource 配置问题导致的，修改linkis.properties  hive.meta开头的三个参数：

![hive-config-01.png](/Images-zh/Tuning_and_Troubleshooting/hive-config-01.png)


#### Q4、启动微服务linkis-ps-datasource时，报如下异常ClassNotFoundException HttpClient：

具体异常栈：

![linkis-exception-03.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-03.png)

解法：1.0编译的linkis-metadata-dev-1.0.0.jar存在问题，需要重新编译打包。

#### Q5、点击scriptis-数据库，不返回数据，现象如下：

![page-show-01.png](/Images-zh/Tuning_and_Troubleshooting/page-show-01.png)

解法：原因hive未授权给hadoop用户，授权数据如下：

![db-config-01.png](/Images-zh/Tuning_and_Troubleshooting/db-config-01.png)

#### Q6、shell引擎调度执行,页面报 Insufficient resource , requesting available engine timeout，eningeconnmanager的linkis.out，报如下错误：

![linkis-exception-04.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-04.png)

解法：原因hadoop没有创建/appcom/tmp/hadoop/workDir,通过root用户提前创建，然后给hadoop用户授权即可。

#### Q7、shell引擎调度执行时，引擎执行目录报如下错误/bin/java:No such file or directory：

![shell-error-01.png](/Images-zh/Tuning_and_Troubleshooting/shell-error-01.png)

解法：本地java的环境变量有问题，需要对java命令做下符号链接。

#### Q8、hive引擎调度时，报如下错误EngineConnPluginNotFoundException:errorCode:70063

![linkis-exception-05.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-05.png)

解法：安装的时候没有修改对应引擎的Version导致，所以默认插入到db里面的引擎类型为默认版本，而编译出来的版本不是默认版本导致。具体修改步骤：cd /appcom/Install/dss-linkis/linkis/lib/linkis-engineconn-plugins/，修改dist目录下的v2.1.1 目录名 修改为v1.2.1  修改plugin目录下的子目录名2.1.1 为默认版本的1.2.1。如果是Spark需要相应修改dist/v2.4.3 和plugin/2.4.3。最后重启engineplugin服务。

#### Q9、linkis微服务启动后，报如下错误Load balancer does not have available server for client：

![page-show-02.png](/Images-zh/Tuning_and_Troubleshooting/page-show-02.png)

解法：这个是因为linkis微服务刚启动，还未完成注册，等待1~2分钟，重试即可。

#### Q10、hive引擎调度执行时，报错如下opertion failed NullPointerException：

![linkis-exception-06.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-06.png)


解法：服务器缺少环境变量，/etc/profile增加export HIVE_CONF_DIR=/etc/hive/conf;

#### Q11、hive引擎调度时，engineConnManager的错误日志如下method did not exist:SessionHandler：

![linkis-exception-07.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-07.png)

解法：hive引擎lib下，jetty jar包冲突，jetty-security、 jetty-server替换为9.4.20；

#### Q12、hive引擎重启后，jetty 9.4的jar包总是被9.3的替换

解法：生成引擎实例时，会有jar包缓存，首先需要删除表linkis_engine_conn_plugin_bml_resources hive相关的记录，其次删除目录/appcom/Install/dss-linkis/linkis/lib/linkis-engineconn-plugins/hive/dist下的1.2.1.zip，最后重启engineplugin服务，lib的jar包才会更新成功。

#### Q13、hive引擎执行时，报如下错误Lcom/google/common/collect/UnmodifiableIterator：

```
2021-03-16 13:32:23.304 ERROR [pool-2-thread-1] com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor 140 run - query failed, reason : java.lang.IllegalAccessError: tried to access method com.google.common.collect.Iterators.emptyIterator() Lcom/google/common/collect/UnmodifiableIterator; from class org.apache.hadoop.hive.ql.exec.FetchOperator 
at org.apache.hadoop.hive.ql.exec.FetchOperator.<init>(FetchOperator.java:108) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.exec.FetchTask.initialize(FetchTask.java:86) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.compile(Driver.java:629) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.compileInternal(Driver.java:1414) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.runInternal(Driver.java:1543) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.run(Driver.java:1332) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.run(Driver.java:1321) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor$$anon$1.run(HiveEngineConnExecutor.scala:152) [linkis-engineplugin-hive-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor$$anon$1.run(HiveEngineConnExecutor.scala:126) [linkis-engineplugin-hive-dev-1.0.0.jar:?]
```

解法：guava包冲突，干掉hive/dist/v1.2.1/lib下的guava-25.1-jre.jar；

#### Q14、hive引擎执行时，报错误如下TaskExecutionServiceImpl 59 error - org/apache/curator/connection/ConnectionHandlingPolicy ：

```
2021-03-16 16:17:40.649 INFO  [pool-2-thread-1] com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor 42 info - com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor@36a7c96f change status Busy => Idle.
2021-03-16 16:17:40.661 ERROR [pool-2-thread-1] com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl 59 error - org/apache/curator/connection/ConnectionHandlingPolicy java.lang.NoClassDefFoundError: org/apache/curator/connection/ConnectionHandlingPolicy at org.apache.curator.framework.CuratorFrameworkFactory.builder(CuratorFrameworkFactory.java:78) ~[curator-framework-4.0.1.jar:4.0.1]
at org.apache.hadoop.hive.ql.lockmgr.zookeeper.CuratorFrameworkSingleton.getInstance(CuratorFrameworkSingleton.java:59) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.lockmgr.zookeeper.ZooKeeperHiveLockManager.setContext(ZooKeeperHiveLockManager.java:98) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.lockmgr.DummyTxnManager.getLockManager(DummyTxnManager.java:87) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.lockmgr.DummyTxnManager.acquireLocks(DummyTxnManager.java:121) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.acquireLocksAndOpenTxn(Driver.java:1237) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.runInternal(Driver.java:1607) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.run(Driver.java:1332) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at org.apache.hadoop.hive.ql.Driver.run(Driver.java:1321) ~[hive-exec-2.1.1-cdh6.1.0.jar:2.1.1-cdh6.1.0]
at com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor$$anon$1.run(HiveEngineConnExecutor.scala:152) ~[linkis-engineplugin-hive-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor$$anon$1.run(HiveEngineConnExecutor.scala:126) ~[linkis-engineplugin-hive-dev-1.0.0.jar:?]
at java.security.AccessController.doPrivileged(Native Method) ~[?:1.8.0_181]
at javax.security.auth.Subject.doAs(Subject.java:422) ~[?:1.8.0_181]
at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1875) ~[hadoop-common-3.0.0-cdh6.3.2.jar:?]
at com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor.executeLine(HiveEngineConnExecutor.scala:126) ~[linkis-engineplugin-hive-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9$$anonfun$apply$10.apply(ComputationExecutor.scala:145) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9$$anonfun$apply$10.apply(ComputationExecutor.scala:144) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.common.utils.Utils$.tryCatch(Utils.scala:48) ~[linkis-common-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9.apply(ComputationExecutor.scala:146) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9.apply(ComputationExecutor.scala:140) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at scala.collection.immutable.Range.foreach(Range.scala:160) ~[scala-library-2.11.8.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1.apply(ComputationExecutor.scala:139) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1.apply(ComputationExecutor.scala:114) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.common.utils.Utils$.tryFinally(Utils.scala:62) ~[linkis-common-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.acessible.executor.entity.AccessibleExecutor.ensureIdle(AccessibleExecutor.scala:42) ~[linkis-accessible-executor-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.acessible.executor.entity.AccessibleExecutor.ensureIdle(AccessibleExecutor.scala:36) ~[linkis-accessible-executor-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor.ensureOp(ComputationExecutor.scala:103) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor.execute(ComputationExecutor.scala:114) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1$$anonfun$run$1.apply$mcV$sp(TaskExecutionServiceImpl.scala:139) [linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1$$anonfun$run$1.apply(TaskExecutionServiceImpl.scala:138) [linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1$$anonfun$run$1.apply(TaskExecutionServiceImpl.scala:138) [linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.common.utils.Utils$.tryCatch(Utils.scala:48) [linkis-common-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.common.utils.Utils$.tryAndWarn(Utils.scala:74) [linkis-common-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1.run(TaskExecutionServiceImpl.scala:138) [linkis-computation-engineconn-dev-1.0.0.jar:?]
at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511) [?:1.8.0_181]
at java.util.concurrent.FutureTask.run(FutureTask.java:266) [?:1.8.0_181]
at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) [?:1.8.0_181]
at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) [?:1.8.0_181]
at java.lang.Thread.run(Thread.java:748) [?:1.8.0_181]
Caused by: java.lang.ClassNotFoundException: org.apache.curator.connection.ConnectionHandlingPolicy atjava.net.URLClassLoader.findClass(URLClassLoader.java:381) ~[?:1.8.0_181]
at java.lang.ClassLoader.loadClass(ClassLoader.java:424) ~[?:1.8.0_181]
at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:349) ~[?:1.8.0_181]
at java.lang.ClassLoader.loadClass(ClassLoader.java:357) ~[?:1.8.0_181]
... 39 more
```

解法：原因是Curator的版本和zookeeper的版本有对应关系。Curator2.X的吧，对于Curator2.X是支持Zookeeper3.4.X的，所以如果目前你是Zookeeper3.4.X的版本，还是使用Curator2.X的吧，比如：2.7.0。参考链接：https://blog.csdn.net/muyingmiao/article/details/100183768

#### Q15、python引擎调度时，报如下错误Python proces is not alive：

![linkis-exception-08.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-08.png)

解法：服务器安装anaconda3 包管理器，经过对python调试，发现两个问题：（1）缺乏pandas、matplotlib模块，需要手动安装;(2)新版python引擎执行时，依赖python高版本，首先安装python3，其次做下符号链接（如下图），重启engineplugin服务。

![shell-error-02.png](/Images-zh/Tuning_and_Troubleshooting/shell-error-02.png)

#### Q16、spark引擎执行时，报如下错误NoClassDefFoundError: org/apache/hadoop/hive/ql/io/orc/OrcFile：

```
2021-03-19 15:12:49.227 INFO  [dag-scheduler-event-loop] org.apache.spark.scheduler.DAGScheduler 57 logInfo -ShuffleMapStage 5 (show at <console>:69) failed in 21.269 s due to Job aborted due to stage failure: Task 1 in stage 5.0 failed 4 times, most recent failure: Lost task 1.3 in stage 5.0 (TID 139, cdh03, executor 6):java.lang.NoClassDefFoundError: org/apache/hadoop/hive/ql/io/orc/OrcFile 
at org.apache.spark.sql.hive.orc.OrcFileOperator$$anonfun$getFileReader$2.apply(OrcFileOperator.scala:75)
at org.apache.spark.sql.hive.orc.OrcFileOperator$$anonfun$getFileReader$2.apply(OrcFileOperator.scala:73)
at scala.collection.Iterator$$anon$11.next(Iterator.scala:410)
at scala.collection.TraversableOnce$class.collectFirst(TraversableOnce.scala:145)
at scala.collection.AbstractIterator.collectFirst(Iterator.scala:1334)
at org.apache.spark.sql.hive.orc.OrcFileOperator$.getFileReader(OrcFileOperator.scala:90)
at org.apache.spark.sql.hive.orc.OrcFileOperator$$anonfun$readSchema$2.apply(OrcFileOperator.scala:99)
at org.apache.spark.sql.hive.orc.OrcFileOperator$$anonfun$readSchema$2.apply(OrcFileOperator.scala:99)
at scala.collection.Iterator$$anon$11.next(Iterator.scala:410)
at scala.collection.TraversableOnce$class.collectFirst(TraversableOnce.scala:145)
at scala.collection.AbstractIterator.collectFirst(Iterator.scala:1334)
at org.apache.spark.sql.hive.orc.OrcFileOperator$.readSchema(OrcFileOperator.scala:99)
at org.apache.spark.sql.hive.orc.OrcFileFormat$$anonfun$buildReader$2.apply(OrcFileFormat.scala:160)
at org.apache.spark.sql.hive.orc.OrcFileFormat$$anonfun$buildReader$2.apply(OrcFileFormat.scala:151)
at org.apache.spark.sql.execution.datasources.FileFormat$$anon$1.apply(FileFormat.scala:148)
at org.apache.spark.sql.execution.datasources.FileFormat$$anon$1.apply(FileFormat.scala:132)
at org.apache.spark.sql.execution.datasources.FileScanRDD$$anon$1.org$apache$spark$sql$execution$datasources$FileScanRDD$$anon$$readCurrentFile(FileScanRDD.scala:126)
at org.apache.spark.sql.execution.datasources.FileScanRDD$$anon$1.nextIterator(FileScanRDD.scala:179)
at org.apache.spark.sql.execution.datasources.FileScanRDD$$anon$1.hasNext(FileScanRDD.scala:103)
at org.apache.spark.sql.catalyst.expressions.GeneratedClass$GeneratedIteratorForCodegenStage1.processNext(UnknownSource)
at org.apache.spark.sql.execution.BufferedRowIterator.hasNext(BufferedRowIterator.java:43)
at org.apache.spark.sql.execution.WholeStageCodegenExec$$anonfun$11$$anon$1.hasNext(WholeStageCodegenExec.scala:624)
at scala.collection.Iterator$$anon$11.hasNext(Iterator.scala:409)
at org.apache.spark.shuffle.sort.BypassMergeSortShuffleWriter.write(BypassMergeSortShuffleWriter.java:125)
at org.apache.spark.scheduler.ShuffleMapTask.runTask(ShuffleMapTask.scala:99)
at org.apache.spark.scheduler.ShuffleMapTask.runTask(ShuffleMapTask.scala:55)
at org.apache.spark.scheduler.Task.run(Task.scala:121)
at org.apache.spark.executor.Executor$TaskRunner$$anonfun$11.apply(Executor.scala:407)
at org.apache.spark.util.Utils$.tryWithSafeFinally(Utils.scala:1408)
at org.apache.spark.executor.Executor$TaskRunner.run(Executor.scala:413)
at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
at java.lang.Thread.run(Thread.java:748)
Caused by: java.lang.ClassNotFoundException: org.apache.hadoop.hive.ql.io.orc.OrcFile 
at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:349)
at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
... 33 more

```

解法：cdh6.3.2集群spark引擎classpath只有/opt/cloudera/parcels/CDH-6.3.2-1.cdh6.3.2.p0.1605554/lib/spark/jars，需要新增hive-exec-2.1.1-cdh6.1.0.jar，然后重启spark。

#### Q17、spark引擎启动时，报queue default is not exists in YARN,具体信息如下：

![linkis-exception-09.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-09.png)

解法：1.0的linkis-resource-manager-dev-1.0.0.jar拉取队列信息时，解析json有兼容问题，官方同学优化后，重新提供新包，jar包路径：/appcom/Install/dss-linkis/linkis/lib/linkis-computation-governance/linkis-cg-linkismanager/。

#### Q18、spark引擎启动时，报错 get the Yarn queue information excepiton.(获取Yarn队列信息异常)以及http链接异常

解法：yarn的地址配置迁移DB配置，需要增加如下配置：
 
![db-config-02.png](/Images-zh/Tuning_and_Troubleshooting/db-config-02.png)

#### Q19、spark引擎调度时，首次可以执行成功，再次执行报Spark application sc has already stopped, please restart it，具体错误如下：

![page-show-03.png](/Images-zh/Tuning_and_Troubleshooting/page-show-03.png)

解法：背景是linkis1.0引擎的架构体系有调整，spark session 创建后，为了避免开销、提升执行效率，session是复用的。当我们第一次执行spark.scala时，我们的脚本存在spark.stop()，这个命令会导致新创建的会话被关闭，当再次执行时，会提示会话已关闭，请重启。解决办法：首先所有脚本去掉stop(),其次是执行顺序：先执行default.sql，再执行scalaspark、pythonspark即可。

#### Q20、pythonspark调度执行，报错：initialize python executor failed ClassNotFoundException org.slf4j.impl.StaticLoggerBinder，具体如下：

![linkis-exception-10.png](/Images-zh/Tuning_and_Troubleshooting/linkis-exception-10.png)

解法：原因是spark服务端缺少 slf4j-log4j12-1.7.25.jar,copy上述jar报到/opt/cloudera/parcels/CDH-6.3.2-1.cdh6.3.2.p0.1605554/lib/spark/jars。

#### Q21、pythonspark调度执行，报错：initialize python executor failed，submit-version error，具体如下：

![shell-error-03.png](/Images-zh/Tuning_and_Troubleshooting/shell-error-03.png)

解法：原因是linkis1.0 pythonSpark引擎获取spark版本代码有bug，修复如下：

![code-fix-01.png](/Images-zh/Tuning_and_Troubleshooting/code-fix-01.png)

#### Q22、pythonspark调度执行时，报TypeError:an integer is required(got type bytes)(单独执行拉起引擎的命令跑出的)，具体如下：

![shell-error-04.png](/Images-zh/Tuning_and_Troubleshooting/shell-error-04.png)

解法：原因是系统spark和python版本不兼容，python是3.8，spark是2.4.0-cdh6.3.2,spark要求python version<=3.6，降低python至3.6，注释文件/opt/cloudera/parcels/CDH/lib/spark/python/lib/pyspark.zip/pyspark/context.py如下几行：

![shell-error-05.png](/Images-zh/Tuning_and_Troubleshooting/shell-error-05.png)

#### Q23、spark引擎是2.4.0+cdh6.3.2，python引擎之前因为缺少pandas、matplotlib升级的本地python到3.8，但是spark还不支持python3.8，仅支持3.6以下；

解法：重新安装python包管理器anaconda2,将python统一降到2.7,安装pandas、matplotlib模块，python引擎、spark引擎均可以正常调度。
