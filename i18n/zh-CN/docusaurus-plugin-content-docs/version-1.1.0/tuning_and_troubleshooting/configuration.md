---
title: 参数列表
sidebar_position: 1
---

> Linkis1.0 在 Linkis0.x 配置基础上进行了简化，在conf目录提供了一个公共配置文件 linkis.properties，避免通用的配置参数需要同时在多个微服务里面配置。本文档将会把Linkis1.0的参数分模块列举出来。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请注意：本文只给出了 Linkis 所有对运行性能有影响或是环境依赖相关的配置参数，很多无需用户关心的配置参数已略去，如果用户感兴趣，可以翻阅源码查看。

### 1 通用配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通用配置可在全局的linkis.properties当中设置即可，一处设置，各个微服务都可生效。

#### 1.1 全局配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
|  wds.linkis.encoding  | utf-8 | Linkis默认编码格式 |
| wds.linkis.date.pattern | yyyy-MM-dd'T'HH:mm:ssZ | 默认日期格式 |
| wds.linkis.test.mode | false | 是否打开调试模式，如果设置为 true，所有微服务都支持免密登录，且所有EngineConn打开远程调试端口 |
| wds.linkis.test.user | 无 | 当wds.linkis.test.mode=true时，免密登录的默认登录用户 |
| wds.linkis.home | /appcom/Install/LinkisInstall | Linkis 安装目录，如果不存在，会自动获取 LINKIS_HOME的值 |
| wds.linkis.httpclient.default.connect.timeOut | 50000 | Linkis HttpClient的默认连接超时时间 |

#### 1.2 LDAP配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.ldap.proxy.url | 无 | LDAP URL地址 |
| wds.linkis.ldap.proxy.baseDN | 无 | LDAP baseDN地址 |
| wds.linkis.ldap.proxy.userNameFormat | 无 |  |

#### 1.3 Hadoop配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.hadoop.root.user | hadoop | HDFS super 用户 |
| wds.linkis.filesystem.hdfs.root.path | 无 | 用户的HDFS默认根路径 |
| wds.linkis.keytab.enable | false | 是否打开kerberos |
| wds.linkis.keytab.file | /appcom/keytab | kerberos的keytab路径，仅wds.linkis.keytab.enable=true时生效 |
| wds.linkis.keytab.host.enabled | false |  |
| wds.linkis.keytab.host | 127.0.0.1 |  |
| hadoop.config.dir | 无 | 如果不配置，将从环境变量 HADOOP_CONF_DIR读取 |
| wds.linkis.hadoop.external.conf.dir.prefix | /appcom/config/external-conf/hadoop | hadoop额外配置 |

#### 1.4 Linkis RPC配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.rpc.broadcast.thread.num | 10 | Linkis RPC 广播线程数量（**建议采用默认值**） |
| wds.linkis.ms.rpc.sync.timeout | 60000 | Linkis RPC Receiver端的默认处理超时时间 |
| wds.linkis.rpc.eureka.client.refresh.interval | 1s | Eureka client的微服务列表刷新间隔（**建议采用默认值**） |
| wds.linkis.rpc.eureka.client.refresh.wait.time.max | 1m | 刷新最大等待时间（**建议采用默认值**） |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 10 | Receiver Consumer最大线程数量（**如果在线用户多，建议适当调大该参数**） |
| wds.linkis.rpc.receiver.asyn.consumer.freeTime.max | 2m | Receiver Consumer最大空闲时间 |
| wds.linkis.rpc.receiver.asyn.queue.size.max | 1000 | Receiver 消费队列最大缓存数（**如果在线用户多，建议适当调大该参数**） |
| wds.linkis.rpc.sender.asyn.consumer.thread.max", 5 | Sender Consumer最大线程数量 |
| wds.linkis.rpc.sender.asyn.consumer.freeTime.max | 2m | Sender Consumer最大空闲时间 |
| wds.linkis.rpc.sender.asyn.queue.size.max | 300 | Sender 消费队列最大缓存数 |
| wds.linkis.rpc.cache.expire.time | 120000L | Linkis RPC 缓存失效时间 |

### 2. 计算治理配置参数

#### 2.1 Entrance配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.spark.engine.version | 2.4.3 | 当用户提交脚本没有指定版本时，采用的默认Spark版本 |
| wds.linkis.hive.engine.version | 1.2.1 | 当用户提交脚本没有指定版本时，采用的默认Hive版本 |
| wds.linkis.python.engine.version | python2 | 当用户提交脚本没有指定版本时，采用的默认Python版本 |
| wds.linkis.jdbc.engine.version | 4 | 当用户提交脚本没有指定版本时，采用的默认JDBC版本 |
| wds.linkis.shell.engine.version | 1 | 当用户提交脚本没有指定版本时，采用的默认Shell版本 |
| wds.linkis.appconn.engine.version | v1 | 当用户提交脚本没有指定版本时，采用的默认AppConn版本|
| wds.linkis.entrance.scheduler.maxParallelismUsers | 1000 | Entrance支持的最大并发用户数 |
| wds.linkis.entrance.job.persist.wait.max | 5m | Entrance等待JobHistory持久化Job的最大时间 |
| wds.linkis.entrance.config.log.path | 无 | 如果不配置，默认采用wds.linkis.filesystem.hdfs.root.path的值 |
| wds.linkis.default.requestApplication.name | IDE | 不指定提交系统时的默认提交系统 |
| wds.linkis.default.runType | sql | 不指定脚本类型时的默认脚本类型 |
| wds.linkis.warn.log.exclude | org.apache,hive.ql,hive.metastore,com.netflix,org.apache | 默认不向Client端输出的实时WARN级别日志 |
| wds.linkis.log.exclude | org.apache,hive.ql,hive.metastore,com.netflix,org.apache,com.webank | 默认不向Client端输出的实时INFO级别日志 |
| wds.linkis.instance | 3 | 用户每个引擎的默认并发Job数 |
| wds.linkis.max.ask.executor.time | 5m | 向LinkisManager申请可用EngineConn的最大时间 |
| wds.linkis.hive.special.log.include | org.apache.hadoop.hive.ql.exec.Task | 向Client端推送Hive日志时，默认不过滤哪些日志 |
| wds.linkis.spark.special.log.include | org.apache.linkis.engine.spark.utils.JobProgressUtil | 向Client端推送Spark日志时，默认不过滤哪些日志 |
| wds.linkis.entrance.shell.danger.check.enabled | false | 是否检查并拦截Shell危险语法 |
| wds.linkis.shell.danger.usage | rm,sh,find,kill,python,for,source,hdfs,hadoop,spark-sql,spark-submit,pyspark,spark-shell,hive,yarn | Shell默认的危险语法 |
| wds.linkis.shell.white.usage | cd,ls | Shell白名单语法 |
| wds.linkis.sql.default.limit | 5000 | SQL默认的最大返回结果集行数 |


#### 2.2 EngineConn配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.engineconn.resultSet.default.store.path | hdfs:///tmp | Job结果集默认存储路径 |
| wds.linkis.engine.resultSet.cache.max | 0k | 当结果集大小低于多少时，EngineConn端不落盘直接返回给Entrance |
| wds.linkis.engine.default.limit | 5000 |  |
| wds.linkis.engine.lock.expire.time | 120000 | 引擎锁的最大空闲时间，即Entrance申请到锁后，多久不向EngineConn提交代码则被释放 |
| wds.linkis.engineconn.ignore.words | org.apache.spark.deploy.yarn.Client | Engine向Entrance端推送日志时，默认忽略的日志 |
| wds.linkis.engineconn.pass.words | org.apache.hadoop.hive.ql.exec.Task | Engine向Entrance端推送日志时，默认必须推送的日志 |
| wds.linkis.engineconn.heartbeat.time | 3m | EngineConn向LinkisManager的默认心跳间隔 |
| wds.linkis.engineconn.max.free.time | 1h | EngineConn的最大空闲时间 |


#### 2.3 EngineConnManager的配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.ecm.memory.max | 80g | ECM的最大可启动EngineConn的内存 |
| wds.linkis.ecm.cores.max | 50 | ECM的最大可启动EngineConn的CPU个数 |
| wds.linkis.ecm.engineconn.instances.max | 50 | 最大可启动EngineConn个数，一般建议设置与wds.linkis.ecm.cores.max相同 |
| wds.linkis.ecm.protected.memory | 4g | ECM的保护内存，即ECM用于启动EngineConn的内存不能超过 wds.linkis.ecm.memory.max - wds.linkis.ecm.protected.memory |
| wds.linkis.ecm.protected.cores.max | 2 | ECM的保护CPU个数，意义与wds.linkis.ecm.protected.memory相同 |
| wds.linkis.ecm.protected.engine.instances | 2 | ECM的保护实例数 |
| wds.linkis.engineconn.wait.callback.pid | 3s | 等待EngineConn回传pid的等待时间 |

#### 2.4 LinkisManager的配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.manager.am.engine.start.max.time" | 10m | LinkisManager启动一个新EngineConn的最大启动时间 |
| wds.linkis.manager.am.engine.reuse.max.time | 5m | LinkisManager复用一个已有的EngineConn的最大选择时间 |
| wds.linkis.manager.am.engine.reuse.count.limit | 10 | LinkisManager复用一个已有的EngineConn的最大轮询次数 |
| wds.linkis.multi.user.engine.types | jdbc,es,presto | LinkisManager在复用一个已有的EngineConn时，哪些引擎的用户不作为复用规则使用 |
| wds.linkis.rm.instance | 10 | 每个用户在每个引擎的默认最大实例数 |
| wds.linkis.rm.yarnqueue.cores.max | 150 | 每个用户在每个引擎的使用队列最大核数 |
| wds.linkis.rm.yarnqueue.memory.max | 450g | 每个用户在每个引擎的使用队列的最大内存数 |
| wds.linkis.rm.yarnqueue.instance.max | 30 | 每个用户在每个引擎的队列中最多启动的应用数 |


### 3. 各引擎配置参数

#### 3.1 JDBC引擎配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.jdbc.default.limit | 5000 | 默认的最大返回结果集行数 |
| wds.linkis.jdbc.support.dbs | mysql=>com.mysql.jdbc.Driver,postgresql=>org.postgresql.Driver,oracle=>oracle.jdbc.driver.OracleDriver,hive2=>org.apache.hive.jdbc.HiveDriver,presto=>com.facebook.presto.jdbc.PrestoDriver | JDBC引擎支持的驱动 |
| wds.linkis.engineconn.jdbc.concurrent.limit | 100 | 最大并行SQL执行数 |


#### 3.2 Python引擎配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| pythonVersion | /appcom/Install/anaconda3/bin/python | Python命令路径 |
| python.path | 无 | 指定Python额外的path，该路径只接受共享存储的路径 |

#### 3.3 Spark引擎配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.engine.spark.language-repl.init.time | 30s | Scala和Python命令解释器的最大初始化时间 |
| PYSPARK_DRIVER_PYTHON | python | Python命令路径 |
| wds.linkis.server.spark-submit | spark-submit | spark-submit命令路径 |


### 4. PublicEnhancements配置参数

#### 4.1 BML配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.bml.dws.version | v1 | Linkis Restful请求的版本号 |
| wds.linkis.bml.auth.token.key | Validation-Code | BML请求的免密token-key |
| wds.linkis.bml.auth.token.value | BML-AUTH | BML请求的免密token-value |
| wds.linkis.bml.hdfs.prefix | /tmp/linkis | BML文件存储在hdfs上的前缀文件路径 |

#### 4.2 Metadata配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| hadoop.config.dir | /appcom/config/hadoop-config | 如果不存在，则默认采用环境变量HADOOP_CONF_DIR的值 |
| hive.config.dir | /appcom/config/hive-config | 如果不存在，则默认采用环境变量HIVE_CONF_DIR的值 |
| hive.meta.url | 无 | HiveMetaStore数据库的URL。如果没有配置hive.config.dir，则该值必须配置 |
| hive.meta.user | 无 | HiveMetaStore数据库的user |
| hive.meta.password | 无 | HiveMetaStore数据库的password |


#### 4.3 JobHistory配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.jobhistory.admin | 无 | 默认的Admin账号，用于指定哪些用户可以查看所有人的执行历史 |


#### 4.4 FileSystem配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.filesystem.root.path | file:///tmp/linkis/ | 用户的Linux本地根目录 |
| wds.linkis.filesystem.hdfs.root.path | hdfs:///tmp/ | 用户的HDFS根目录 |
| wds.linkis.workspace.filesystem.hdfsuserrootpath.suffix | /linkis/ | 用户的HDFS根目录后的一级前缀，用户实际根目录为：${hdfs.root.path}\${user}\${hdfsuserrootpath.suffix} |
| wds.linkis.workspace.resultset.download.is.limit | true | Client下载结果集时，是否限制下载条数 |
| wds.linkis.workspace.resultset.download.maxsize.csv | 5000 | 当结果集下载为CSV文件时，限制的下载条数 |
| wds.linkis.workspace.resultset.download.maxsize.excel | 5000 | 当结果集下载为Excel文件时，限制的下载条数 |
| wds.linkis.workspace.filesystem.get.timeout | 2000L | 请求底层文件系统的最大超时时间。（**如果您的HDFS或Linux机器性能较低，建议适当调大该查数**） |

#### 4.5 UDF配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.udf.share.path | /mnt/bdap/udf | 共享UDF的存储路径，建议设置为HDFS路径 |

### 5. MicroService配置参数

#### 5.1 Gateway配置参数

|           参数名          | 默认值   |  描述                                                       |
| ------------------------- | -------  | -----------------------------------------------------------|
| wds.linkis.gateway.conf.enable.proxy.user | false | 是否开启代理用户模式，如果开启，则登录用户的请求都会代理到代理用户去执行 |
| wds.linkis.gateway.conf.proxy.user.config | proxy.properties | 代理规则的存储文件 |
| wds.linkis.gateway.conf.proxy.user.scan.interval | 600000 | 代理文件的刷新间隔 |
| wds.linkis.gateway.conf.enable.token.auth | false | 是否开启Token登录模式，如果开启，则允许以token的方式访问Linkis |
| wds.linkis.gateway.conf.token.auth.config | token.properties | Token规则的存储文件 |
| wds.linkis.gateway.conf.token.auth.scan.interval | 600000 | Token文件的刷新间隔 |
| wds.linkis.gateway.conf.url.pass.auth | /dws/ | 默认放行、不作登录校验的请求 |
| wds.linkis.gateway.conf.enable.sso | false | 是否开启SSO用户登录模式 |
| wds.linkis.gateway.conf.sso.interceptor | 无 | 如果开启了SSO登录模式，则需要用户实现SSOInterceptor，用于跳转SSO登录页面 |
| wds.linkis.admin.user | hadoop | 管理员用户列表 |
| wds.linkis.login_encrypt.enable | false | 用户登录时，密码是否开启RSA加密传输 |
| wds.linkis.enable.gateway.auth | false | 是否开启Gateway IP白名单机制 |
| wds.linkis.gateway.auth.file | auth.txt | IP白名单存储文件 |

### 6. 数据源及元数据服务配置参数

#### 6.1 元数据服务配置参数

|引入版本| 参数名                                                   | 默认值                                                   | 描述                                                    |
|-------| -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
|v1.1.0 | wds.linkis.server.mdm.service.lib.dir                    | /lib/linkis-public-enhancements/linkis-ps-metadatamanager/service | 设置需要加载数据源jar包的相对路径，会通过反射调用|
|v1.1.0 | wds.linkis.server.mdm.service.instance.expire-in-seconds | 60                                                    | 设置加载子服务的过期时间，超过该时间将不加载该服务    |
|v1.1.0 | wds.linkis.server.dsm.app.name                           | linkis-ps-data-source-manager                         | 设置获取数据源信息的服务                              |
|v1.1.0 | wds.linkis.server.mdm.service.kerberos.principle         | hadoop/HOST@EXAMPLE.COM   | set kerberos principle for linkis-metadata hive service |
|v1.1.0 | wds.linkis.server.mdm.service.user                       | hadoop                                                | 设置hive服务的访问用户                                  |
|v1.1.0 | wds.linkis.server.mdm.service.kerberos.krb5.path         | ""                                                    | 设置hive服务使用的kerberos krb5 路径                    |
|v1.1.0 | wds.linkis.server.mdm.service.temp.location              | classpath:/tmp                                        | 设置kafka与hive的临时路径                               |
|v1.1.0 | wds.linkis.server.mdm.service.sql.driver                 | com.mysql.jdbc.Driver                                 | 设置mysql服务的驱动                                     |
|v1.1.0 | wds.linkis.server.mdm.service.sql.url                    | jdbc:mysql://%s:%s/%s                                 | 设置mysql服务的url格式                                  |
|v1.1.0 | wds.linkis.server.mdm.service.sql.connect.timeout        | 3000                                                  | 设置mysql服务连接mysql服务的连接超时时间                |
|v1.1.0 | wds.linkis.server.mdm.service.sql.socket.timeout         | 6000                                                  | 设置mysql服务打开mysql服务的socket超时时间              |
|v1.1.0 | wds.linkis.server.mdm.service.temp.location              | /tmp/keytab                                           | 设置服务的本地临时存储路径，主要是存储从bml物料服务下载的认证文件|
