---
title: Configurations
sidebar_position: 1
---

> A public configuration file linkis.properties is provided in the conf directory to avoid common configuration parameters needing to be configured in multiple microservices at the same time. This document will list the parameters by module.

Please note: This article only gives all the configuration parameters of Linkis that affect the running performance or depend on the environment. Many configuration parameters that do not need to be cared about by the user have been omitted. If the user is interested, you can browse the source code to view it.

## 1 General Configuration

The general configuration can be set in the global `linkis.properties`. One setting can take effect for each microservice.

### 1.1 Global Configuration 

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
|  wds.linkis.encoding  | utf-8 | Linkis default encoding format |
| wds.linkis.date.pattern | yyyy-MM-dd'T'HH:mm:ssZ | default date format |
| wds.linkis.test.mode | false | Whether to enable debugging mode, if set to true, all microservices support password-free login, and all EngineConn open remote debugging ports |
| wds.linkis.test.user | none | When wds.linkis.test.mode=true, the default login user for password-free login |
| wds.linkis.home | /appcom/Install/LinkisInstall | Linkis installation directory, if it does not exist, it will automatically get the value of LINKIS_HOME |
| wds.linkis.httpclient.default.connect.timeOut | 50000 | Default connection timeout of Linkis HttpClient |

### 1.2 LDAP Configuration 

| parameter name | default value | description |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.ldap.proxy.url | None | LDAP URL address |
| wds.linkis.ldap.proxy.baseDN | None | LDAP baseDN address |
| wds.linkis.ldap.proxy.userNameFormat | None | |

### 1.3 Hadoop Configuration 

| parameter name | default value | description                                                  |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.hadoop.root.user | hadoop | HDFS super user |
| wds.linkis.filesystem.hdfs.root.path | None | User's HDFS default root path |
| wds.linkis.keytab.enable | false | whether to enable kerberos |
| wds.linkis.keytab.file | /appcom/keytab | kerberos keytab path, only valid when wds.linkis.keytab.enable=true |
| wds.linkis.keytab.host.enabled | false | |
| wds.linkis.keytab.host | 127.0.0.1 | |
| hadoop.config.dir | None | If not configured, it will be read from the environment variable HADOOP_CONF_DIR |
| wds.linkis.hadoop.external.conf.dir.prefix | /appcom/config/external-conf/hadoop | hadoop extra configuration |

### 1.4 Linkis RPC Configuration 

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.rpc.broadcast.thread.num | 10 | Number of Linkis RPC broadcast threads (**recommended to use the default value**) |
| wds.linkis.ms.rpc.sync.timeout | 60000 | The default processing timeout of Linkis RPC Receiver |
| wds.linkis.rpc.eureka.client.refresh.interval | 1s | Eureka client's microservice list refresh interval (**recommended to use the default value**) |
| wds.linkis.rpc.eureka.client.refresh.wait.time.max | 1m | Refresh maximum waiting time (**recommended to use the default value**) |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 10 | Maximum number of threads for Receiver Consumer (**If there are many online users, it is recommended to increase this parameter**) |
| wds.linkis.rpc.receiver.asyn.consumer.freeTime.max | 2m | Receiver Consumer maximum idle time |
| wds.linkis.rpc.receiver.asyn.queue.size.max | 1000 | The maximum buffer size of the Receiver consumption queue (**If there are many online users, it is recommended to increase this parameter**) |
| wds.linkis.rpc.sender.asyn.consumer.thread.max", 5 | Maximum number of threads for Sender Consumer |
| wds.linkis.rpc.sender.asyn.consumer.freeTime.max | 2m | Sender Consumer maximum idle time |
| wds.linkis.rpc.sender.asyn.queue.size.max | 300 | Maximum buffer size of Sender consumption queue |

## 2. Calculate Governance Configuration 

### 2.1 Entrance Configuration 

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.spark.engine.version | 2.4.3 | When the user submits a script without specifying a version, the default Spark version used |
| wds.linkis.hive.engine.version | 1.2.1 | When the user submits a script without specifying a version, the default Hive version used |
| wds.linkis.python.engine.version | python2 | When the user submits a script without specifying a version, the default Python version used |
| wds.linkis.jdbc.engine.version | 4 | When the user submits a script without specifying a version, the default JDBC version used |
| wds.linkis.shell.engine.version | 1 | When the user submits a script without specifying a version, the default Shell version used |
| wds.linkis.appconn.engine.version | v1 | When the user submits a script without specifying a version, the default AppConn version used|
| wds.linkis.entrance.scheduler.maxParallelismUsers | 1000 | The maximum number of concurrent users supported by Entrance |
| wds.linkis.entrance.job.persist.wait.max | 5m | The maximum time that Entrance waits for JobHistory to persist a Job |
| wds.linkis.entrance.config.log.path | None | If not configured, the value of wds.linkis.filesystem.hdfs.root.path is used by default |
| wds.linkis.default.requestApplication.name | IDE | Default submission system when no submission system is specified |
| wds.linkis.default.runType | sql | default script type when no script type is specified |
| wds.linkis.warn.log.exclude | org.apache,hive.ql,hive.metastore,com.netflix,org.apache | Real-time WARN level logs not output to the client by default |
| wds.linkis.log.exclude | org.apache,hive.ql,hive.metastore,com.netflix,org.apache,com.webank | Real-time INFO-level logs that are not output to the client by default |
| wds.linkis.instance | 3 | The default number of concurrent jobs for each engine |
| wds.linkis.max.ask.executor.time | 5m | Maximum time to ask LinkisManager for available EngineConn |
| wds.linkis.hive.special.log.include | org.apache.hadoop.hive.ql.exec.Task | Which logs are not filtered by default when pushing Hive logs to the client |
| wds.linkis.spark.special.log.include | org.apache.linkis.engine.spark.utils.JobProgressUtil | Which logs are not filtered by default when pushing Spark logs to the client |
| wds.linkis.entrance.shell.danger.check.enabled | false | Whether to check and intercept Shell dangerous syntax |
| wds.linkis.shell.danger.usage | rm,sh,find,kill,python,for,source,hdfs,hadoop,spark-sql,spark-submit,pyspark,spark-shell,hive,yarn | Shell default Dangerous Grammar |
| wds.linkis.shell.white.usage | cd,ls | Shell whitelist syntax |
| wds.linkis.sql.default.limit | 5000 | SQL default maximum number of returned result set rows |


### 2.2 EngineConn Configuration 

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.engineconn.resultSet.default.store.path | hdfs:///tmp | Job result set default storage path |
| wds.linkis.engine.resultSet.cache.max | 0k | When the size of the result set is lower than the specified value, the EngineConn will return to the Entrance directly without placing the disk |
| wds.linkis.engine.default.limit | 5000 | |
| wds.linkis.engine.lock.expire.time | 120000 | The maximum idle time of the engine lock, that is, after the Entrance applies for the lock, how long it will be released without submitting the code to EngineConn |
| wds.linkis.engineconn.ignore.words | org.apache.spark.deploy.yarn.Client | When Engine pushes logs to Entrance, the logs ignored by default |
| wds.linkis.engineconn.pass.words | org.apache.hadoop.hive.ql.exec.Task | When Engine pushes logs to Entrance, the default logs must be pushed |
| wds.linkis.engineconn.heartbeat.time | 3m | Default heartbeat interval from EngineConn to LinkisManager |
| wds.linkis.engineconn.max.free.time | 1h | Maximum idle time of EngineConn |


### 2.3 EngineConnManager Configuration

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.ecm.memory.max | 80g | ECM's maximum bootable EngineConn memory |
| wds.linkis.ecm.cores.max | 50 | ECM's maximum number of CPUs that can start EngineConn |
| wds.linkis.ecm.engineconn.instances.max | 50 | The maximum number of EngineConn that can be started, it is generally recommended to set the same as wds.linkis.ecm.cores.max |
| wds.linkis.ecm.protected.memory | 4g | The protected memory of ECM, that is, the memory used by ECM to start EngineConn cannot exceed wds.linkis.ecm.memory.max - wds.linkis.ecm.protected.memory |
| wds.linkis.ecm.protected.cores.max | 2 | The number of ECM protected CPUs, the meaning is the same as wds.linkis.ecm.protected.memory |
| wds.linkis.ecm.protected.engine.instances | 2 | Number of protected instances of ECM |
| wds.linkis.engineconn.wait.callback.pid | 3s | Waiting time for EngineConn to return pid |

### 2.4 LinkisManager Configuration

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.manager.am.engine.start.max.time" | 10m | The maximum start time for LinkisManager to start a new EngineConn |
| wds.linkis.manager.am.engine.reuse.max.time | 5m | The maximum selection time for LinkisManager to reuse an existing EngineConn |
| wds.linkis.manager.am.engine.reuse.count.limit | 10 | The maximum number of polls for LinkisManager to reuse an existing EngineConn |
| wds.linkis.multi.user.engine.types | jdbc,es,presto | When LinkisManager reuses an existing EngineConn, which engine users are not used as reuse rules |
| wds.linkis.rm.instance | 10 | Default maximum number of instances per engine per user |
| wds.linkis.rm.yarnqueue.cores.max | 150 | The maximum number of cores used by each user in each engine queue |
| wds.linkis.rm.yarnqueue.memory.max | 450g | The maximum memory used by each user in each engine |
| wds.linkis.rm.yarnqueue.instance.max | 30 | The maximum number of applications launched by each user in the queue of each engine |


## 3. Engine Configuration  

### 3.1 JDBC Engine Configuration 

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.jdbc.default.limit | 5000 | The default maximum number of returned result set rows |
| wds.linkis.jdbc.support.dbs | mysql=>com.mysql.jdbc.Driver,postgresql=>org.postgresql.Driver,oracle=>oracle.jdbc.driver.OracleDriver,hive2=>org.apache.hive .jdbc.HiveDriver,presto=>com.facebook.presto.jdbc.PrestoDriver | JDBC engine supported driver |
| wds.linkis.engineconn.jdbc.concurrent.limit | 100 | Maximum number of parallel SQL executions |


### 3.2 Python Engine Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| pythonVersion | /appcom/Install/anaconda3/bin/python | Python command path |
| python.path | None | Specifies an additional path for Python, which only accepts shared storage paths |

### 3.3 Spark Engine Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.engine.spark.language-repl.init.time | 30s | Maximum initialization time for Scala and Python command interpreters |
| PYSPARK_DRIVER_PYTHON | python | Python command path |
| wds.linkis.server.spark-submit | spark-submit | spark-submit command path |


## 4. PublicEnhancements Configuration  

### 4.1 BML Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.bml.dws.version | v1 | Version number of Linkis Restful request |
| wds.linkis.bml.auth.token.key | Validation-Code | Password-free token-key for BML requests |
| wds.linkis.bml.auth.token.value | BML-AUTH | Password-free token-value for BML requests |
| wds.linkis.bml.hdfs.prefix | /tmp/linkis | Prefix file path where BML files are stored on hdfs |

### 4.2 Metadata Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| hadoop.config.dir | /appcom/config/hadoop-config | If it does not exist, the value of the environment variable HADOOP_CONF_DIR will be used by default |
| hive.config.dir | /appcom/config/hive-config | If it does not exist, it will default to the value of the environment variable HIVE_CONF_DIR |
| hive.meta.url | None | The URL of the HiveMetaStore database. If hive.config.dir is not configured, the value must be configured |
| hive.meta.user | none | user of the HiveMetaStore database |
| hive.meta.password | none | password for the HiveMetaStore database |


### 4.3 JobHistory Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.jobhistory.admin | None | The default Admin account, which is used to specify which users can view everyone's execution history |


### 4.4 FileSystem Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.filesystem.root.path | file:///tmp/linkis/ | user's local Linux root directory |
| wds.linkis.filesystem.hdfs.root.path | hdfs:///tmp/ | user's HDFS root directory |
| wds.linkis.workspace.filesystem.hdfsuserrootpath.suffix | /linkis/ | The first-level prefix after the user's HDFS root directory. The actual root directory of the user is: ${hdfs.root.path}\${user}\${ hdfsuserrootpath.suffix} |
| wds.linkis.workspace.resultset.download.is.limit | true | When the client downloads the result set, whether to limit the number of downloads |
| wds.linkis.workspace.resultset.download.maxsize.csv | 5000 | When the result set is downloaded as a CSV file, the limited number of downloads |
| wds.linkis.workspace.resultset.download.maxsize.excel | 5000 | When the result set is downloaded as an Excel file, the limited number of downloads |
| wds.linkis.workspace.filesystem.get.timeout | 2000L | The maximum timeout for requests to the underlying filesystem. (**If the performance of your HDFS or Linux machine is low, it is recommended to increase the query number**) |

### 4.5 UDF Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.udf.share.path | /mnt/bdap/udf | Shared UDF storage path, it is recommended to set it to HDFS path |

## 5. MicroService Configuration  

### 5.1 Gateway Configuration  

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.gateway.conf.enable.proxy.user | false | Whether to enable the proxy user mode, if enabled, the login user's request will be proxied to the proxy user for execution |
| wds.linkis.gateway.conf.proxy.user.config | proxy.properties | storage file for proxy rules |
| wds.linkis.gateway.conf.proxy.user.scan.interval | 600000 | Refresh interval for proxy files |
| wds.linkis.gateway.conf.enable.token.auth | false | Whether to enable the Token login mode, if enabled, access to Linkis in the form of token is allowed |
| wds.linkis.gateway.conf.token.auth.config | token.properties | Storage file for Token rules |
| wds.linkis.gateway.conf.token.auth.scan.interval | 600000 | Token file refresh interval |
| wds.linkis.gateway.conf.url.pass.auth | /dws/ | By default, no request for login verification |
| wds.linkis.gateway.conf.enable.sso | false | Whether to enable SSO user login mode |
| wds.linkis.gateway.conf.sso.interceptor | None | If the SSO login mode is enabled, the user needs to implement SSOInterceptor to jump to the SSO login page |
| wds.linkis.admin.user | hadoop | list of admin users |
| wds.linkis.login_encrypt.enable | false | When the user logs in, whether to enable RSA encrypted transmission |
| wds.linkis.enable.gateway.auth | false | Whether to enable the Gateway IP whitelist mechanism |
| wds.linkis.gateway.auth.file | auth.txt | IP whitelist storage file |

## 6. Data Source and Metadata Service Configuration  

### 6.1 Metadata Service Configuration  

|Introduced Version| Parameter Name | Default Value | Description |
|-------| -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
|v1.1.0 | wds.linkis.server.mdm.service.lib.dir | /lib/linkis-public-enhancements/linkis-ps-metadatamanager/service | Set the relative path of the data source jar package that needs to be loaded, which will be reflected call |
|v1.1.0 | wds.linkis.server.mdm.service.instance.expire-in-seconds | 60 | Set the expiration time for loading sub-services, the service will not be loaded after this time |
|v1.1.0 | wds.linkis.server.dsm.app.name | linkis-ps-data-source-manager | Set the service for obtaining data source information |
|v1.1.0 | wds.linkis.server.mdm.service.kerberos.principle | hadoop/HOST@EXAMPLE.COM | set kerberos principle for linkis-metadata hive service |
|v1.1.0 | wds.linkis.server.mdm.service.user | hadoop | set the access user of hive service |
|v1.1.0 | wds.linkis.server.mdm.service.kerberos.krb5.path | ""    | Set the kerberos krb5 path used by the hive service |
|v1.1.0 | wds.linkis.server.mdm.service.temp.location | classpath:/tmp | Set the temporary path of kafka and hive |
|v1.1.0 | wds.linkis.server.mdm.service.sql.driver | com.mysql.jdbc.Driver | Set the driver of mysql service |
|v1.1.0 | wds.linkis.server.mdm.service.sql.url | jdbc:mysql://%s:%s/%s | Set the url format of mysql service |
|v1.1.0 | wds.linkis.server.mdm.service.sql.connect.timeout | 3000 | Set the connection timeout for mysql service to connect to mysql service |
|v1.1.0 | wds.linkis.server.mdm.service.sql.socket.timeout | 6000 | Set the socket timeout time for the mysql service to open the mysql service |
|v1.1.0 | wds.linkis.server.mdm.service.temp.location | /tmp/keytab | Set the local temporary storage path of the service, mainly to store the authentication files downloaded from the bml material service|

## 7. Common Scene Parameters

### 7.1 Open Test Mode
The development process requires a password-free interface, which can be replaced or appended to `linkis.properties`

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.test.mode | false | Whether to enable debugging mode, if set to true, all microservices support password-free login, and all EngineConn open remote debugging ports |
| wds.linkis.test.user | hadoop | When wds.linkis.test.mode=true, the default login user for password-free login |


### 7.2 Login User Settings
Apache Linkis uses configuration files to manage admin users by default, and this configuration can be replaced or appended to `linkis-mg-gateway.properties`. For multi-user access LDAP implementation.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.admin.user | hadoop | admin username |
| wds.linkis.admin.password | 123456 | Admin user password |

### 7.3 LDAP Settings
Apache Linkis can access LDAP through parameters to achieve multi-user management, and this configuration can be replaced or added in `linkis-mg-gateway.properties`.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.ldap.proxy.url | None | LDAP URL address |
| wds.linkis.ldap.proxy.baseDN | None | LDAP baseDN address |
| wds.linkis.ldap.proxy.userNameFormat | None | |

### 7.4 Turn off Resource Checking
Apache Linkis sometimes debugs exceptions when submitting tasks, such as: insufficient resources; you can replace or append this configuration in `linkis-cg-linkismanager.properties`.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.manager.rm.request.enable | true | resource check |

### 7.5 Turn on Engine Debugging
Apache Linkis EC can enable debugging mode, and this configuration can be replaced or added in `linkis-cg-linkismanager.properties`.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.engineconn.debug.enable | false | Whether to enable engine debugging |

### 7.6 Hive Metadata Configuration
The public-service service of Apache Linkis needs to read hive metadata; this configuration can be replaced or appended in `linkis-ps-publicservice.properties`.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| hive.meta.url | None | The URL of the HiveMetaStore database. |
| hive.meta.user | none | user of the HiveMetaStore database |
| hive.meta.password | none | password for the HiveMetaStore database |

### 7.7 Linkis Database Configuration
Apache Linkis access uses Mysql as data storage by default, you can replace or append this configuration in `linkis.properties`.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.server.mybatis.datasource.url | None | Database connection string, for example: jdbc:mysql://127.0.0.1:3306/dss?characterEncoding=UTF-8 |
| wds.linkis.server.mybatis.datasource.username | none | database user name, for example: root |
| wds.linkis.server.mybatis.datasource.password | None | Database password, for example: root |

### 7.8 Linkis Session Cache Configuration
Apache Linkis supports using redis for session sharing; this configuration can be replaced or appended in `linkis.properties`.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| linkis.session.redis.cache.enabled | None | Whether to enable |
| linkis.session.redis.host | 127.0.0.1 | hostname |
| linkis.session.redis.port | 6379 | Port, eg |
| linkis.session.redis.password | None | password |



### 7.9 Linkis Module Development Configuration
When developing Apache Linkis, you can use this parameter to customize the database, Rest interface, and entity objects of the loading module; you can modify it in `linkis-ps-publicservice.properties`, and use commas to separate multiple modules.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.server.restful.scan.packages | none | restful scan packages, for example: org.apache.linkis.basedatamanager.server.restful |
| wds.linkis.server.mybatis.mapperLocations | None | Mybatis mapper file path, for example: classpath*:org/apache/linkis/basedatamanager/server/dao/mapper/*.xml|
| wds.linkis.server.mybatis.typeAliasesPackage | None | Entity alias scanning package, for example: org.apache.linkis.basedatamanager.server.domain |
| wds.linkis.server.mybatis.BasePackage | None | Database dao layer scan, for example: org.apache.linkis.basedatamanager.server.dao |

### 7.10 Linkis Module Development Configuration
This parameter can be used to customize the route of loading modules during Apache Linkis development; it can be modified in `linkis.properties`, and commas are used to separate multiple modules.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.gateway.conf.publicservice.list | cs,contextservice,data-source-manager,metadataQuery,metadatamanager,query,jobhistory,application,configuration,filesystem,udf,variable,microservice,errorcode,bml,datasource,basedata -manager | publicservice services support routing modules |

### 7.11 Linkis File System And Material Storage Path
This parameter can be used to customize the route of loading modules during Apache Linkis development; it can be modified in `linkis.properties`, and commas are used to separate multiple modules.

| parameter name | default value | description                                                    |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.filesystem.root.path | file:///tmp/linkis/ | Local user directory, a folder named after the user name needs to be created under this directory |
| wds.linkis.filesystem.hdfs.root.path | hdfs:///tmp/ | HDFS user directory |
| wds.linkis.bml.is.hdfs | true | Whether to enable hdfs |
| wds.linkis.bml.hdfs.prefix | /apps-data | hdfs path |
| wds.linkis.bml.local.prefix | /apps-data | local path |