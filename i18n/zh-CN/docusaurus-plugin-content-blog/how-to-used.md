# Q&A 
#### Q1, linkis startup error: NoSuchMethodErrorgetSessionManager()Lorg/eclipse/jetty/server/SessionManager

Specific stack:
```
Failed startup of context osbwejJettyEmbeddedWebAppContext@6c6919ff{application,/,[file:///tmp/jetty-docbase.9102.6375358926927953589/],UNAVAILABLE} java.lang.NoSuchMethodError: org.eclipse.jetty.server.session.SessionHandler.getSessionManager ()Lorg/eclipse/jetty/server/SessionManager;
at org.eclipse.jetty.servlet.ServletContextHandler\$Context.getSessionCookieConfig(ServletContextHandler.java:1415) ~[jetty-servlet-9.3.20.v20170531.jar:9.3.20.v20170531]
```

Solution: jetty-servlet and jetty-security versions need to be upgraded from 9.3.20 to 9.4.20;

#### Q2. When starting the microservice linkis-ps-cs, report DebuggClassWriter overrides final method visit

Specific exception stack:

![linkis-exception-01.png](/Images/Tuning_and_Troubleshooting/linkis-exception-01.png)

Solution: jar package conflict, delete asm-5.0.4.jar;

#### Q3. When starting the microservice linkis-ps-datasource, JdbcUtils.getDriverClassName NPE

Specific exception stack:

![linkis-exception-02.png](/Images/Tuning_and_Troubleshooting/linkis-exception-02.png)


Solution: caused by the Linkis-datasource configuration problem, modify the three parameters at the beginning of linkis.properties hive.meta:

![hive-config-01.png](/Images/Tuning_and_Troubleshooting/hive-config-01.png)


#### Q4. When starting the microservice linkis-ps-datasource, the following exception ClassNotFoundException HttpClient is reported:

Specific exception stack:

![linkis-exception-03.png](/Images/Tuning_and_Troubleshooting/linkis-exception-03.png)

Solution: There is a problem with linkis-metadata-dev-1.0.0.jar compiled in 1.0, and it needs to be recompiled and packaged.

#### Q5. Click scriptis-database, no data is returned, the phenomenon is as follows:

![page-show-01.png](/Images/Tuning_and_Troubleshooting/page-show-01.png)

Solution: The reason is that hive is not authorized to Hadoop users. The authorization data is as follows:

![db-config-01.png](/Images/Tuning_and_Troubleshooting/db-config-01.png)

#### Q6, shell engine scheduling execution, the page reports Insufficient resource, requesting available engine timeout, eneningeconnmanager linkis.out, and the following error is reported:

![linkis-exception-04.png](/Images/Tuning_and_Troubleshooting/linkis-exception-04.png)

Solution: The reason Hadoop did not create /appcom/tmp/hadoop/workDir. Create it in advance through the root user, and then authorize the Hadoop user.

#### Q7. When the shell engine is scheduled for execution, the engine execution directory reports the following error /bin/java: No such file or directory:

![shell-error-01.png](/Images/Tuning_and_Troubleshooting/shell-error-01.png)

Solution: There is a problem with the local java environment variables, and you need to make a symbolic link to the java command.

#### Q8, hive engine scheduling, the following error is reported EngineConnPluginNotFoundException:errorCode:70063

![linkis-exception-05.png](/Images/Tuning_and_Troubleshooting/linkis-exception-05.png)

Solution: It is caused by not modifying the version of the corresponding engine during installation, so the engine type inserted into the db by default is the default version, and the compiled version is not caused by the default version. Specific modification steps: cd /appcom/Install/dss-linkis/linkis/lib/linkis-engineconn-plugins/, modify the v2.1.1 directory name in the dist directory to v1.2.1 modify the subdirectory name in the plugin directory 2.1. 1 is 1.2.1 of the default version. If it is Spark, you need to modify dist/v2.4.3 and plugin/2.4.3 accordingly. Finally restart the engineplugin service.

#### Q9. After the linkis microservice is started, the following error is reported: Load balancer does not have available server for client:

![page-show-02.png](/Images/Tuning_and_Troubleshooting/page-show-02.png)

Solution: This is because the linkis microservice has just started and the registration has not been completed. Wait for 1~2 minutes and try again.

#### Q10. When the hive engine is scheduled for execution, the following error is reported: operation failed NullPointerException:

![linkis-exception-06.png](/Images/Tuning_and_Troubleshooting/linkis-exception-06.png)


Solution: The server lacks environment variables, add export HIVE_CONF_DIR=/etc/hive/conf in /etc/profile;

#### Q11. When hive engine is scheduled, the error log of engineConnManager is as follows method did not exist: SessionHandler:

![linkis-exception-07.png](/Images/Tuning_and_Troubleshooting/linkis-exception-07.png)

Solution: Under the hive engine lib, the jetty jar package conflicts, replace jetty-security and jetty-server with 9.4.20;

#### After Q12, hive engine restarts, the jar package of jetty 9.4 is always replaced by 9.3

Solution: When the engine instance is generated, there will be a jar package cache. First, you need to delete the records related to the table linkis_engine_conn_plugin_bml_resources hive, and then delete the records under the directory /appcom/Install/dss-linkis/linkis/lib/linkis-engineconn-plugins/hive/dist 1.2.1.zip, finally restart the engineplugin service, the jar package of lib will be updated successfully.

#### Q13. When the hive engine is executed, the following error is reported: Lcom/google/common/collect/UnmodifiableIterator:

```
2021-03-16 13:32:23.304 ERROR [pool-2-thread-1] com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor 140 run-query failed, reason: java.lang.IllegalAccessError: tried to access method com.google.common.collect.Iterators.emptyIterator() Lcom/google/common/collect/UnmodifiableIterator; from class org.apache.hadoop.hive.ql.exec.FetchOperator
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

Solution: guava package conflict, kill guava-25.1-jre.jar under hive/dist/v1.2.1/lib;

#### Q14. When the hive engine is executed, the error is reported as follows: TaskExecutionServiceImpl 59 error-org/apache/curator/connection/ConnectionHandlingPolicy:

```
2021-03-16 16:17:40.649 INFO [pool-2-thread-1] com.webank.wedatasphere.linkis.engineplugin.hive.executor.HiveEngineConnExecutor 42 info-com.webank.wedatasphere.linkis.engineplugin.hive. executor.HiveEngineConnExecutor@36a7c96f change status Busy => Idle.
2021-03-16 16:17:40.661 ERROR [pool-2-thread-1] com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl 59 error-org/apache/curator/connection/ConnectionHandlingPolicy java .lang.NoClassDefFoundError: org/apache/curator/connection/ConnectionHandlingPolicy at org.apache.curator.framework.CuratorFrameworkFactory.builder(CuratorFrameworkFactory.java:78) ~[curator-framework-4.0.1.jar:4.0.1]
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
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9$$anonfun$apply$10.apply(ComputationExecutor.scala:145) ~[linkis-computation -engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9$$anonfun$apply$10.apply(ComputationExecutor.scala:144) ~[linkis-computation -engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.common.utils.Utils$.tryCatch(Utils.scala:48) ~[linkis-common-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9.apply(ComputationExecutor.scala:146) ~[linkis-computation-engineconn-dev-1.0 .0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1$$anonfun$apply$9.apply(ComputationExecutor.scala:140) ~[linkis-computation-engineconn-dev-1.0 .0.jar:?]
at scala.collection.immutable.Range.foreach(Range.scala:160) ~[scala-library-2.11.8.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1.apply(ComputationExecutor.scala:139) ~[linkis-computation-engineconn-dev-1.0.0.jar:? ]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor$$anonfun$execute$1.apply(ComputationExecutor.scala:114) ~[linkis-computation-engineconn-dev-1.0.0.jar:? ]
at com.webank.wedatasphere.linkis.common.utils.Utils$.tryFinally(Utils.scala:62) ~[linkis-common-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.acessible.executor.entity.AccessibleExecutor.ensureIdle(AccessibleExecutor.scala:42) ~[linkis-accessible-executor-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.acessible.executor.entity.AccessibleExecutor.ensureIdle(AccessibleExecutor.scala:36) ~[linkis-accessible-executor-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor.ensureOp(ComputationExecutor.scala:103) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.execute.ComputationExecutor.execute(ComputationExecutor.scala:114) ~[linkis-computation-engineconn-dev-1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1$$anonfun$run$1.apply$mcV$sp(TaskExecutionServiceImpl.scala:139) [linkis-computation-engineconn-dev- 1.0.0.jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1$$anonfun$run$1.apply(TaskExecutionServiceImpl.scala:138) [linkis-computation-engineconn-dev-1.0.0. jar:?]
at com.webank.wedatasphere.linkis.engineconn.computation.executor.service.TaskExecutionServiceImpl$$anon$1$$anonfun$run$1.apply(TaskExecutionServiceImpl.scala:138) [linkis-computation-engineconn-dev-1.0.0. jar:?]
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

Solution: The reason is that there is a corresponding relationship between the version of Curator and the version of zookeeper. For Curator2.X, it supports Zookeeper3.4.X for Curator2.X, so if you are currently Zookeeper3.4.X, you should still use Curator2.X, for example: 2.7.0. Reference link: https://blog.csdn.net/muyingmiao/article/details/100183768

#### Q15. When the python engine is scheduled, the following error is reported: Python proces is not alive:

![linkis-exception-08.png](/Images/Tuning_and_Troubleshooting/linkis-exception-08.png)

Solution: The server installed the anaconda3 package manager. After debugging python, two problems were found: (1) lack of pandas and matplotlib modules, which need to be installed manually; (2) when the new version of the python engine is executed, it depends on the higher version of python, first install python3, Next, make a symbolic link (as shown in the figure below) and restart the engineplugin service.

![shell-error-02.png](/Images/Tuning_and_Troubleshooting/shell-error-02.png)

#### Q16. When the spark engine is executed, the following error NoClassDefFoundError: org/apache/hadoop/hive/ql/io/orc/OrcFile is reported:

```
2021-03-19 15:12:49.227 INFO [dag-scheduler-event-loop] org.apache.spark.scheduler.DAGScheduler 57 logInfo -ShuffleMapStage 5 (show at <console>:69) failed in 21.269 s due to Job aborted due to stage failure: Task 1 in stage 5.0 failed 4 times, most recent failure: Lost task 1.3 in stage 5.0 (TID 139, cdh03, executor 6): java.lang.NoClassDefFoundError: org/apache/hadoop/hive/ql /io/orc/OrcFile
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

Solution: cdh6.3.2 cluster spark engine classpath only has /opt/cloudera/parcels/CDH-6.3.2-1.cdh6.3.2.p0.1605554/lib/spark/jars, need to add hive-exec-2.1.1- cdh6.1.0.jar, then restart spark.

#### Q17. When the spark engine starts, it reports queue default is not exists in YARN, the specific information is as follows:

![linkis-exception-09.png](/Images/Tuning_and_Troubleshooting/linkis-exception-09.png)

Solution: When the 1.0 linkis-resource-manager-dev-1.0.0.jar pulls queue information, there is a compatibility problem in parsing json. After the official classmates optimize it, re-provide a new package. The jar package path: /appcom/Install/dss- linkis/linkis/lib/linkis-computation-governance/linkis-cg-linkismanager/.

#### Q18, when the spark engine starts, an error is reported get the Yarn queue information excepiton. (get the Yarn queue information abnormal) and http link abnormal

Solution: To migrate the address configuration of yarn to the DB configuration, the following configuration needs to be added:
 
![db-config-02.png](/Images/Tuning_and_Troubleshooting/db-config-02.png)

#### Q19. When the spark engine is scheduled, it can be executed successfully for the first time, and if executed again, it will report Spark application sc has already stopped, please restart it. The specific errors are as follows:

![page-show-03.png](/Images/Tuning_and_Troubleshooting/page-show-03.png)

Solution: The background is that the architecture of the linkis1.0 engine has been adjusted. After the spark session is created, in order to avoid overhead and improve execution efficiency, the session is reused. When we execute spark.scala for the first time, there is spark.stop() in our script. This command will cause the newly created session to be closed. When executed again, it will prompt that the session is closed, please restart it. Solution: first remove stop() from all scripts, and then execute the order: execute default.sql first, then execute scalaspark and pythonspark.

#### Q20, pythonspark scheduling execution, error: initialize python executor failed ClassNotFoundException org.slf4j.impl.StaticLoggerBinder, as follows:

![linkis-exception-10.png](/Images/Tuning_and_Troubleshooting/linkis-exception-10.png)

Solution: The reason is that the spark server lacks slf4j-log4j12-1.7.25.jar, copy the above jar and report to /opt/cloudera/parcels/CDH-6.3.2-1.cdh6.3.2.p0.1605554/lib/spark/jars .

#### Q21, pythonspark scheduling execution, error: initialize python executor failed, submit-version error, as follows:

![shell-error-03.png](/Images/Tuning_and_Troubleshooting/shell-error-03.png)

Solution: The reason is that the linkis1.0 pythonSpark engine has a bug in obtaining the spark version code. The fix is ​​as follows:

![code-fix-01.png](/Images/Tuning_and_Troubleshooting/code-fix-01.png)

#### Q22. When pythonspark is scheduled to execute, it reports TypeError: an integer is required (got type bytes) (executed separately from the command to pull up the engine), the details are as follows:

![shell-error-04.png](/Images/Tuning_and_Troubleshooting/shell-error-04.png)

Solution: The reason is that the system spark and python versions are not compatible, python is 3.8, spark is 2.4.0-cdh6.3.2, spark requires python version<=3.6, reduce python to 3.6, comment file /opt/cloudera/parcels/CDH/ The following lines of lib/spark/python/lib/pyspark.zip/pyspark/context.py:

![shell-error-05.png](/Images/Tuning_and_Troubleshooting/shell-error-05.png)

#### Q23, spark engine is 2.4.0+cdh6.3.2, python engine was previously lacking pandas, matplotlib upgraded local python to 3.8, but spark does not support python3.8, only supports below 3.6;

Solution: reinstall the python package manager anaconda2, reduce python to 2.7, install pandas, matplotlib modules, python engine and spark engine can be scheduled normally.