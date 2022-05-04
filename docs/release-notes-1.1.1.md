---
title: Release Notes 1.1.1-RC1
sidebar_position: 0.2
--- 

Apache Linkis(incubating) 1.1.1 包括所有 [Project Linkis-1.1.1](https://github.com/apache/incubator-linkis/projects/18)。


本次发布主要支持UDF多版本控制、UDF存储到HDFS的功能特性；提交任务支持Yarn队列资源使用统计采集和查看；新增对数据虚拟化引擎OpenLooKeng的支持；修复社区反馈的已知bug。

添加了以下主要功能：
* 支持代理用户模式，A用户可以代理给B用户执行任务,一个代理用户可以代理多个用户
* 支持UDF多版本控制和UDF存储到HDFS的功能特性
* 提交任务支持Yarn队列资源使用统计采集和管理台页面页面可视化查看
* 新增对数据虚拟化引擎OpenLooKeng的支持

缩写：
- CGS: Computation Governance Services
- PES: Public Enhancement Services
- MGS: Microservice Governance Services
- EC:  Engineconn
- ECM: EngineConnManager
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service

---

## 新特性

* \[MGS-Gateway&CGS-Entrance][[Linkis-1608]](https://github.com/apache/incubator-linkis/pull/1608) 支持代理用户模式，A用户可以代理给B用户执行任务，查询B用户的相关数据，一个代理用户可以代理多个用户。  component=SpringCloudServices/Gateway
* \[CGS-Manager][[Linkis-1616]](https://github.com/apache/incubator-linkis/pull/1616) YARN ResourceManager的资源地址配置支持高可用多地址配置，当前YARN ResourceManager转换状态或者停止时，将会从高可用地址中解析出主节点继续提供服务
* \[CGS-EC-OpenLooKeng][[Linkis-1639]](https://github.com/apache/incubator-linkis/issues/1639) 新增对数据虚拟化引擎OpenLooKeng的支持
* \[PES-Udf][[Linkis-1534]](https://github.com/apache/incubator-linkis/pull/1534) 支持UDF多版本控制和UDF存储到BML，提交任务支持Yarn队列资源使用统计采集和管理台页面页面可视化查看
* \[Client][[Linkis-1718]](https://github.com/apache/incubator-linkis/issues/1718) linkis-cli支持提交once类型的任务，引擎进程只运行一次任务，任务结束后自动销毁
* \[CGS-ECP][[Linkis-1758]](https://github.com/apache/incubator-linkis/issues/1758) 新增引擎物料刷新接口，支持通过http接口调用方式刷新引擎物料资源

## 增强点

* \[CGS-Entrance][[Linkis-1642]](https://github.com/apache/incubator-linkis/pull/1642) 优化excel导出接口resultsetToExcel，支持传递下载数据的行数
* \[Web][[Linkis-1650]](https://github.com/apache/incubator-linkis/issues/1650) linkis管理台全局历史页面支持通过创建者搜索过滤历史任务数据
* \[DMS-Common][[Linkis-1757]](https://github.com/apache/incubator-linkis/issues/1757) 支持配置Hive的元数据管理员，管理员通过接口可以获取hive的所有库表的元数据信息 Metadata
* \[CGS-ECM][[Linkis-1930]](https://github.com/apache/incubator-linkis/pull/1930) 优化资源检查时未检查 ECM 的资源的问题
* \[Common][[Linkis-1921]](https://github.com/apache/incubator-linkis/pull/1921)  优化jackson的依赖管理方式，通过jackson-bom统一管理jackson依赖，并升级至2.11.4版本
* \[Common][[Linkis-1799]](https://github.com/apache/incubator-linkis/pull/1799) 优化服务日志的分割 将日志历史切分从一天调整为一小时
* \[CGS-ECM][[Linkis-1779]](https://github.com/apache/incubator-linkis/issues/1779) 优化ECM实例的状态监控逻辑，增加心跳上报时间的判断，修复可能因为eureka的性能问题导致错误判断问题
* \[CGS-Entrance][[Linkis-1794]](https://github.com/apache/incubator-linkis/pull/1794) 添加写入限制结果集单行的数据大小，优化大结果集会导致的oom问题
* \[CGS-Entrance][[Linkis-1733]](https://github.com/apache/incubator-linkis/pull/1733) 添加支持更多与run_date 相关的默认时间变量
* \[Web][[Linkis-1596]](https://github.com/apache/incubator-linkis/issues/1596) 优化管理台任务日志查看的接口使用，修复对于运行中的job，日志无法及时刷新显示的问题


## 修复功能
* \[CGS-Entrance][[Linkis-1640]](https://github.com/apache/incubator-linkis/issues/1640)  修复LogReader使用单例inputStream，存在日志丢失，无法读取最新的持久化日志的问题
* \[CGS-Entrance][[Linkis-1623]](https://github.com/apache/incubator-linkis/issues/1623)  修复LogPath 和 ResultSetPath 错误的将submitUserr使用为executeUse
* \[CGS-ECM][[Linkis-1714]](https://github.com/apache/incubator-linkis/pull/1714) 通过减少EC Java 默认内存以及添加EC应用程序的重试日志，优化EC出现的"Cannot allocate memory"的异常问题  ECM
* \[Common][[Linkis-1721]](https://github.com/apache/incubator-linkis/pull/1721)   修复Kerberos认证失败时, hdfsFileSystem未进行刷新的问题  linkis-storage
* \[PES-Udf][[Linkis-1728]](https://github.com/apache/incubator-linkis/pull/1728)  优化/api/rest_j/v1/udf/all API接口偶发的查询耗时高的问题
* \[CGS-EC-Spark][[Linkis-1729]](https://github.com/apache/incubator-linkis/pull/1729) 添加SparkPreExecutionHook函数，修复excel导出时，因为包名修改，导致无法正常序列化问题
* \[Clinet][[Linkis-1739]](https://github.com/apache/incubator-linkis/pull/1739) 修复ujes-client的请求中，存在的参数拼写错误导致参数传递失败问题
* \[DMS-Common][[Linkis-1744]](https://github.com/apache/incubator-linkis/pull/1744) 调整update hive unique column default true 默认值未true
* \[CGS-EC][[Linkis-1765]](https://github.com/apache/incubator-linkis/issues/1765) 修复EC 在任务运行时触发tryShutdown存在的阻塞问题
* \[CGS-Manager][[Linkis-1781]](https://github.com/apache/incubator-linkis/issues/1781) ECTaskEntranceMonitorService should be configurable to shut down
* \[Client][[Linkis-1783]](https://github.com/apache/incubator-linkis/pull/1783) 修复任务创建人creator参数默认配置不生效的问题 
* \[CGS-ECM][[Linkis-1806]](https://github.com/apache/incubator-linkis/pull/1806) 优化EC的生命周期处理逻辑，当ECM 启动ec 因为队列资源不足超时等原因导致状态为Failed时候，将EC进程kill掉
* \[CGS-Manager][[Linkis-1814]](https://github.com/apache/incubator-linkis/pull/1814) 修复EngineRestfulApi的createEngineConn接口返回response信息有误，导致客户端调用出现NPE的问题。
* \[Client][[Linkis-1821]](https://github.com/apache/incubator-linkis/pull/1821)  修复ujes-client 请求实体类GetTableStatisticInfoAction参数缺失问题
* \[CGS-Entrance][[Linkis-2009]](https://github.com/apache/incubator-linkis/issues/2009) 修复Entrance 服务存在的线程资源未关闭导致的内存泄漏的问题
* \[CGS-Entrance][[Linkis-1986]](https://github.com/apache/incubator-linkis/issues/1986) 修复Entrance实时日志获取行数异常，导致获取的日志重复问题
* \[PES-Config][[Linkis-1859]](https://github.com/apache/incubator-linkis/issues/1859) 修复管理台参数配置saveFullTree接口，主键重复异常问题
* \[Web][[Linkis-1972]](https://github.com/apache/incubator-linkis/pull/1972) 管理台移除历史原因遗留但未使用的dss相关接口代码
* \[CGS-EC-Jdbc][[Linkis-1851]](https://github.com/apache/incubator-linkis/issues/1851) 修复jdbc引擎，一次任务执行中存在多条sql语句时无法正常执行的问题
* \[CGS-Entrance][[Linkis-1901]](https://github.com/apache/incubator-linkis/issues/1901) 将EntranceFactory中的缓存被替换为Guava Cache，修复用户修改了并发参数后无法生效的问题
* \[MGS-Gateway][[Linkis-1898]](https://github.com/apache/incubator-linkis/pull/1898)  修复GatewaySSOUtils用户成功登录生成cookie时，无法设置初始域名的问题

## 致谢 

Apache Linkis(incubating) 1.1.1的发布离不开Linkis社区的贡献者,感谢所有的社区贡献者，包括但不仅限于以下Contributors: AbnerHung、Alexkun、CCweixiao 、Davidhua1996、Fuu3214、Liveipool、casionone、demonray、husofskyzy、jackxu2011 、legendtkl、lizheng920625、maidangdang44、peacewong、seedscoder