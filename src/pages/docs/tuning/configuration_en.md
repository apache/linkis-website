# Linkis1.0 Configurations

> The configuration of Linkis1.0 is simplified on the basis of Linkis0.x. A public configuration file linkis.properties is provided in the conf directory to avoid the need for common configuration parameters to be configured in multiple microservices at the same time. This document will list the parameters of Linkis1.0 in modules.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please be noticed: This article only lists all the configuration parameters related to Linkis that have an impact on operating performance or environment dependence. Many configuration parameters that do not need users to care about have been omitted. If users are interested, they can browse through the source code.

### 1 General configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The general configuration can be set in the global linkis.properties, one setting, each microservice can take effect.

#### 1.1 Global configurations

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.encoding | utf-8 | Linkis default encoding format |
| wds.linkis.date.pattern | yyyy-MM-dd'T'HH:mm:ssZ | Default date format |
| wds.linkis.test.mode | false | Whether to enable debugging mode, if set to true, all microservices support password-free login, and all EngineConn open remote debugging ports |
| wds.linkis.test.user | None | When wds.linkis.test.mode=true, the default login user for password-free login |
| wds.linkis.home | /appcom/Install/LinkisInstall | Linkis installation directory, if it does not exist, it will automatically get the value of LINKIS_HOME |
| wds.linkis.httpclient.default.connect.timeOut | 50000 | Linkis HttpClient default connection timeout |

#### 1.2 LDAP configurations

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.ldap.proxy.url | None | LDAP URL address |
| wds.linkis.ldap.proxy.baseDN | None | LDAP baseDN address |
| wds.linkis.ldap.proxy.userNameFormat | None | |

#### 1.3 Hadoop configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.hadoop.root.user | hadoop | HDFS super user |
| wds.linkis.filesystem.hdfs.root.path | None | User's HDFS default root path |
| wds.linkis.keytab.enable | false | Whether to enable kerberos |
| wds.linkis.keytab.file | /appcom/keytab | Kerberos keytab path, effective only when wds.linkis.keytab.enable=true |
| wds.linkis.keytab.host.enabled | false | |
| wds.linkis.keytab.host | 127.0.0.1 | |
| hadoop.config.dir | None | If not configured, it will be read from the environment variable HADOOP_CONF_DIR |
| wds.linkis.hadoop.external.conf.dir.prefix | /appcom/config/external-conf/hadoop | hadoop additional configuration |

#### 1.4 Linkis RPC configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.rpc.broadcast.thread.num | 10 | Linkis RPC broadcast thread number (**Recommended default value**) |
| wds.linkis.ms.rpc.sync.timeout | 60000 | Linkis RPC Receiver's default processing timeout time |
| wds.linkis.rpc.eureka.client.refresh.interval | 1s | Refresh interval of Eureka client's microservice list (**Recommended default value**) |
| wds.linkis.rpc.eureka.client.refresh.wait.time.max | 1m | Refresh maximum waiting time (**recommended default value**) |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 10 | Maximum number of Receiver Consumer threads (**If there are many online users, it is recommended to increase this parameter appropriately**) |
| wds.linkis.rpc.receiver.asyn.consumer.freeTime.max | 2m | Receiver Consumer maximum idle time |
| wds.linkis.rpc.receiver.asyn.queue.size.max | 1000 | The maximum number of buffers in the receiver consumption queue (**If there are many online users, it is recommended to increase this parameter appropriately**) |
| wds.linkis.rpc.sender.asyn.consumer.thread.max", 5 | Sender Consumer maximum number of threads |
| wds.linkis.rpc.sender.asyn.consumer.freeTime.max | 2m | Sender Consumer Maximum Free Time |
| wds.linkis.rpc.sender.asyn.queue.size.max | 300 | Sender consumption queue maximum buffer number |

### 2. Calculate governance configuration parameters

#### 2.1 Entrance configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.spark.engine.version | 2.4.3 | The default Spark version used when the user submits a script without specifying a version |
| wds.linkis.hive.engine.version | 1.2.1 | The default Hive version used when the user submits a script without a specified version |
| wds.linkis.python.engine.version | python2 | The default Python version used when the user submits a script without specifying a version |
| wds.linkis.jdbc.engine.version | 4 | The default JDBC version used when the user submits the script without specifying the version |
| wds.linkis.shell.engine.version | 1 | The default shell version used when the user submits a script without specifying a version |
| wds.linkis.appconn.engine.version | v1 | The default AppConn version used when the user submits a script without a specified version |
| wds.linkis.entrance.scheduler.maxParallelismUsers | 1000 | Maximum number of concurrent users supported by Entrance |
| wds.linkis.entrance.job.persist.wait.max | 5m | Maximum time for Entrance to wait for JobHistory to persist a Job |
| wds.linkis.entrance.config.log.path | None | If not configured, the value of wds.linkis.filesystem.hdfs.root.path is used by default |
| wds.linkis.default.requestApplication.name | IDE | The default submission system when the submission system is not specified |
| wds.linkis.default.runType | sql | The default script type when the script type is not specified |
| wds.linkis.warn.log.exclude | org.apache,hive.ql,hive.metastore,com.netflix,com.webank.wedatasphere | Real-time WARN-level logs that are not output to the client by default |
| wds.linkis.log.exclude | org.apache, hive.ql, hive.metastore, com.netflix, com.webank.wedatasphere, com.webank | Real-time INFO-level logs that are not output to the client by default |
| wds.linkis.instance | 3 | User's default number of concurrent jobs per engine |
| wds.linkis.max.ask.executor.time | 5m | Apply to LinkisManager for the maximum time available for EngineConn |
| wds.linkis.hive.special.log.include | org.apache.hadoop.hive.ql.exec.Task | When pushing Hive logs to the client, which logs are not filtered by default |
| wds.linkis.spark.special.log.include | com.webank.wedatasphere.linkis.engine.spark.utils.JobProgressUtil | When pushing Spark logs to the client, which logs are not filtered by default |
| wds.linkis.entrance.shell.danger.check.enabled | false | Whether to check and block dangerous shell syntax |
| wds.linkis.shell.danger.usage | rm,sh,find,kill,python,for,source,hdfs,hadoop,spark-sql,spark-submit,pyspark,spark-shell,hive,yarn | Shell default Dangerous grammar |
| wds.linkis.shell.white.usage | cd,ls | Shell whitelist syntax |
| wds.linkis.sql.default.limit | 5000 | SQL default maximum return result set rows |


#### 2.2 EngineConn configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.engineconn.resultSet.default.store.path | hdfs:///tmp | Job result set default storage path |
| wds.linkis.engine.resultSet.cache.max | 0k | When the size of the result set is lower than how much, EngineConn will return to Entrance without placing the disk. |
| wds.linkis.engine.default.limit | 5000 | |
| wds.linkis.engine.lock.expire.time | 120000 | The maximum idle time of the engine lock, that is, after Entrance applies for the lock, how long does it take to submit code to EngineConn will be released |
| wds.linkis.engineconn.ignore.words | org.apache.spark.deploy.yarn.Client | Logs that are ignored by default when the Engine pushes logs to the Entrance side |
| wds.linkis.engineconn.pass.words | org.apache.hadoop.hive.ql.exec.Task | The log that must be pushed by default when the Engine pushes logs to the Entrance side |
| wds.linkis.engineconn.heartbeat.time | 3m | Default heartbeat interval from EngineConn to LinkisManager |
| wds.linkis.engineconn.max.free.time | 1h | EngineConn's maximum free time |


#### 2.3 EngineConnManager configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.ecm.memory.max | 80g | ECM's maximum bootable EngineConn memory |
| wds.linkis.ecm.cores.max | 50 | ECM's maximum number of CPUs that can start EngineConn |
| wds.linkis.ecm.engineconn.instances.max | 50 | The maximum number of EngineConn that can be started, it is generally recommended to set the same as wds.linkis.ecm.cores.max |
| wds.linkis.ecm.protected.memory | 4g | ECM protected memory, that is, the memory used by ECM to start EngineConn cannot exceed wds.linkis.ecm.memory.max-wds.linkis.ecm.protected.memory |
| wds.linkis.ecm.protected.cores.max | 2 | The number of protected CPUs of ECM, the meaning is the same as wds.linkis.ecm.protected.memory |
| wds.linkis.ecm.protected.engine.instances | 2 | Number of protected instances of ECM |
| wds.linkis.engineconn.wait.callback.pid | 3s | Waiting time for EngineConn to return pid |

#### 2.4 LinkisManager configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.manager.am.engine.start.max.time" | 10m | The maximum start time for LinkisManager to start a new EngineConn |
| wds.linkis.manager.am.engine.reuse.max.time | 5m | LinkisManager reuses an existing EngineConn's maximum selection time |
| wds.linkis.manager.am.engine.reuse.count.limit | 10 | LinkisManager reuses an existing EngineConn's maximum polling times |
| wds.linkis.multi.user.engine.types | jdbc,es,presto | When LinkisManager reuses an existing EngineConn, which engine users are not used as reuse rules |
| wds.linkis.rm.instance | 10 | The default maximum number of instances per user per engine |
| wds.linkis.rm.yarnqueue.cores.max | 150 | Maximum number of cores per user in each engine usage queue |
| wds.linkis.rm.yarnqueue.memory.max | 450g | The maximum amount of memory per user in each engine's use queue |
| wds.linkis.rm.yarnqueue.instance.max | 30 | The maximum number of applications launched by each user in the queue of each engine |

### 3. Each engine configuration parameter

#### 3.1 JDBC engine configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.jdbc.default.limit | 5000 | The default maximum return result set rows |
| wds.linkis.jdbc.support.dbs | mysql=>com.mysql.jdbc.Driver,postgresql=>org.postgresql.Driver,oracle=>oracle.jdbc.driver.OracleDriver,hive2=>org.apache.hive .jdbc.HiveDriver,presto=>com.facebook.presto.jdbc.PrestoDriver | Drivers supported by JDBC engine |
| wds.linkis.engineconn.jdbc.concurrent.limit | 100 | Maximum number of concurrent SQL executions |


#### 3.2 Python engine configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| pythonVersion | /appcom/Install/anaconda3/bin/python | Python command path |
| python.path | None | Specify an additional path for Python, which only accepts shared storage paths |

#### 3.3 Spark engine configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.engine.spark.language-repl.init.time | 30s | Maximum initialization time for Scala and Python command interpreters |
| PYSPARK_DRIVER_PYTHON | python | Python command path |
| wds.linkis.server.spark-submit | spark-submit | spark-submit command path |

### 4. PublicEnhancements configuration parameters

#### 4.1 BML configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.bml.dws.version | v1 | Version number requested by Linkis Restful |
| wds.linkis.bml.auth.token.key | Validation-Code | Password-free token-key for BML request |
| wds.linkis.bml.auth.token.value | BML-AUTH | Password-free token-value requested by BML |
| wds.linkis.bml.hdfs.prefix | /tmp/linkis | The prefix file path of the BML file stored on hdfs |
 
#### 4.2 Metadata configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| hadoop.config.dir | /appcom/config/hadoop-config | If it does not exist, the value of the environment variable HADOOP_CONF_DIR is used by default |
| hive.config.dir | /appcom/config/hive-config | If it does not exist, the value of the environment variable HIVE_CONF_DIR is used by default |
| hive.meta.url | None | The URL of the HiveMetaStore database. If hive.config.dir is not configured, this value must be configured |
| hive.meta.user | None | User of the HiveMetaStore database |
| hive.meta.password | None | Password of the HiveMetaStore database |


#### 4.3 JobHistory configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.jobhistory.admin | None | The default Admin account is used to specify which users can view the execution history of everyone |


#### 4.4 FileSystem configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.filesystem.root.path | file:///tmp/linkis/ | User's Linux local root directory |
| wds.linkis.filesystem.hdfs.root.path | hdfs:///tmp/ | User's HDFS root directory |
| wds.linkis.workspace.filesystem.hdfsuserrootpath.suffix | /linkis/ | The first-level prefix after the user's HDFS root directory. The user's actual root directory is: ${hdfs.root.path}\${user}\${ hdfsuserrootpath.suffix} |
| wds.linkis.workspace.resultset.download.is.limit | true | When Client downloads the result set, whether to limit the number of downloads |
| wds.linkis.workspace.resultset.download.maxsize.csv | 5000 | When the result set is downloaded as a CSV file, the number of downloads is limited |
| wds.linkis.workspace.resultset.download.maxsize.excel | 5000 | When the result set is downloaded as an Excel file, the number of downloads is limited |
| wds.linkis.workspace.filesystem.get.timeout | 2000L | The maximum timeout period for requesting the underlying file system. (**If the performance of your HDFS or Linux machine is low, it is recommended to increase the check number appropriately**) |

#### 4.5 UDF configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.udf.share.path | /mnt/bdap/udf | The storage path of the shared UDF, it is recommended to set it to the HDFS path |

### 5. MicroService configuration parameters

#### 5.1 Gateway configuration parameters

| Parameter name | Default value | Description |
| ------------------------- | ------- | --------------- --------------------------------------------|
| wds.linkis.gateway.conf.enable.proxy.user | false | Whether to enable proxy user mode, if enabled, the login user’s request will be proxied to the proxy user for execution |
| wds.linkis.gateway.conf.proxy.user.config | proxy.properties | Storage file of proxy rules |
| wds.linkis.gateway.conf.proxy.user.scan.interval | 600000 | Proxy file refresh interval |
| wds.linkis.gateway.conf.enable.token.auth | false | Whether to enable the Token login mode, if enabled, allow access to Linkis in the form of tokens |
| wds.linkis.gateway.conf.token.auth.config | token.properties | Token rule storage file |
| wds.linkis.gateway.conf.token.auth.scan.interval | 600000 | Token file refresh interval |
| wds.linkis.gateway.conf.url.pass.auth | /dws/ | Request for default release without login verification |
| wds.linkis.gateway.conf.enable.sso | false | Whether to enable SSO user login mode |
| wds.linkis.gateway.conf.sso.interceptor | None | If the SSO login mode is enabled, the user needs to implement SSOInterceptor to jump to the SSO login page |
| wds.linkis.admin.user | hadoop | Administrator user list |
| wds.linkis.login_encrypt.enable | false | When the user logs in, does the password enable RSA encryption transmission |
| wds.linkis.enable.gateway.auth | false | Whether to enable the Gateway IP whitelist mechanism |
| wds.linkis.gateway.auth.file | auth.txt | IP whitelist storage file |