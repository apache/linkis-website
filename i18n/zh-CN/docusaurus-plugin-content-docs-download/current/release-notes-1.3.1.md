---
title: Release Notes 1.3.1
sidebar_position: 92
---

Apache Linkis 1.3.1 包括所有 [Project Linkis-1.3.1](https://github.com/apache/linkis/projects/23).

Linkis 1.3.1 版本主要支持 Trino 引擎 和 SeaTunnel 引擎。增加了管理台基础数据管理，能对部分基础的数据(数据源环境管理/token令牌管理/错误码管理/引擎物料管理等)进行方便界面配置操作。
并且对已有的数据源进行了增强，新增对 oracle、kingbase、 postgresql、sqlserver、db2、greenplum、dm 类型数据源的支持. 

主要功能如下：

* 新增对分布式SQL查询引擎 Trino 的支持
* 新增对数据集成平台 Seatunnel 引擎的支持
* 增加了管理台基础数据管理，能对部分基础的数据方便的进行界面化配置操作
* 新增 JDBC 引擎特性，支持 Trino 驱动查询执行进度
* 对已有的数据源进行了增强，新增 oracle、kingbase、postgresql、sqlserver、db2、greenplum、dm的数据源支持 

缩写：
- COMMON: Linkis Common
- ENTRANCE: Linkis Entrance
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM: Linkis Manager
- PS: Linkis Public Service
- PE: Linkis Public Enhancement
- RPC: Linkis Common RPC
- CG: Linkis Computation Governance
- DEPLOY: Linkis Deployment
- WEB: Linkis Web
- GATEWAY: Linkis Gateway
- EP: Engine Plugin

---

## 新特性

+ \[DMS][LINKIS-2961](https://github.com/apache/linkis/pull/2961) 数据源管理支持多环境
+ \[DMS][LINKIS-3839](https://github.com/apache/linkis/pull/3839) 为数据源的Api接口添加必要的审计日志 
+ \[MDS][LINKIS-3457](https://github.com/apache/linkis/pull/3457) Linkis元数据查询添加doris/clickhouse
+ \[EC-Trino][LINKIS-2639](https://github.com/apache/linkis/pull/2639) 增加对分布式SQL查询引擎 Trino 的支持
+ \[EC-Seatunnel][LINKIS-3458](https://github.com/apache/linkis/pull/3458)  新增对数据集成平台 Seatunnel 引擎的支持
+ \[EC][LINKIS-3381](https://github.com/apache/linkis/pull/3381) GetEngineNode 接口支持返回完整的 EC 信息，新增对 EC 状态的记录
+ \[ECP][LINKIS-3836](https://github.com/apache/linkis/pull/3836) 合并 cg-engineplugin 服务到 cg-linkismanager，减少服务数



## 增强点

+ \[EC][LINKIS-2663](https://github.com/apache/linkis/pull/2663) 移除子任务 subTask 相关的逻辑
+ \[EC-OnceEC][LINKIS-3552](https://github.com/apache/linkis/pull/3552) 优化Once job类型获取到的EC信息时，使用ticketId作为唯一key
+ \[EC-Shell][LINKIS-3939](https://github.com/apache/linkis/pull/3939) 优化 shell 引擎优化危险高危命令集 
+ \[COMMON][LINKIS-3349](https://github.com/apache/linkis/pull/3349) 添加工具类来确定 OS 用户是否存在
+ \[COMMON][LINKIS-3697](https://github.com/apache/linkis/pull/3697) 优化 Linkis 脚本，增加使用手册和指引提示 
+ \[MDS/DMS][LINKIS-3613](https://github.com/apache/linkis/pull/3613) 优化数据源，增加对HDFS类型的支持
+ \[DMS][LINKIS-3505](https://github.com/apache/linkis/pull/3505) 数据源增强，增加部分查询接口
+ \[DMS][LINKIS-3783](https://github.com/apache/linkis/pull/3783) 优化数据源:未发布的数据源版本，应该不可用
+ \[DMS][LINKIS-3803](https://github.com/apache/linkis/pull/3803) 优化数据源请求接口 DsmQueryProtocol，增加异常信息的返回
+ \[DMS][LINKIS-3881](https://github.com/apache/linkis/pull/3881) 优化数据源接口 增加配置项的默认值的填充 
+ \[DEPLOY][LINKIS-3500](https://github.com/apache/linkis/pull/3500) 服务启动脚本优化 以支持服务名参数的多种方式兼容
+ \[DEPLOY][LINKIS-3729](https://github.com/apache/linkis/pull/3729) 优化安装脚本对hadoop 版本的控制 
+ \[LM][LINKIS-3740](https://github.com/apache/linkis/pull/3740) EC的idle和exit状态时 增加对LM服务进行资源清理操作
+ \[LM-RM][LINKIS-3733](https://github.com/apache/linkis/pull/3733) 优化RM 资源操作锁的大小
+ \[ECM][LINKIS-3720](https://github.com/apache/linkis/pull/3720) 性能优化，去除标记缓存的同步等待操作
+ \[Entrance][LINKIS-3831](https://github.com/apache/linkis/pull/3831) 优化entrance 日志打印 增加时间信息 
+ \[Entrance][LINKIS-3833](https://github.com/apache/linkis/pull/3833) 优化 EntranceJob 状态变化逻辑 
+ \[PE][LINKIS-3440](https://github.com/apache/linkis/pull/3440) 优化部分 mapper xml的一些方法，以防止sql注入问题

## 修复功能
+ \[WEB][LINKIS-2921](https://github.com/apache/linkis/pull/2921) 修复批量 kill 任务 - 不正确的分组导致一些任务无法 kill 问题
+ \[COMMON][LINKIS-3430](https://github.com/apache/linkis/pull/3430) 修复引擎启动失败后，再次启动时错误的复用了之前引擎的配置的问题
+ \[COMMON][LINKIS-3234](https://github.com/apache/linkis/pull/3234) linkis-storage 新增 linkis.fs.hdfs.impl.disable.checksum 配置项，控制hdfs的checksum校验
+ \[COMMON][LINKIS-3352](https://github.com/apache/linkis/pull/3352) 修复结果集 excel导出时，decimalType 无法识别和计算的问题
+ \[EC][LINKIS-3752](https://github.com/apache/linkis/pull/3752) 修复 EC 历史列表查询结果不准确的问题
+ \[DEPLOY][LINKIS-3608](https://github.com/apache/linkis/pull/3608) 在脚本中统一使用 /usr/bin/env bash 以使代码更具可移植性
+ \[DEPLOY][LINKIS-3726](https://github.com/apache/linkis/pull/3726) 优化网关服务：保留所有注册服务实例
+ \[PE][LINKIS-3438](https://github.com/apache/linkis/pull/3438) 修复 udf 模块中的错误sql并消除冗余方法
+ \[EC][LINKIS-3552](https://github.com/apache/linkis/pull/3552) 优化ES EC 的包名命名
+ \[COMMON][LINKIS-3618](https://github.com/apache/linkis/pull/3618)统一mybatis使用规范 将mapper的注解方式 调整为 xml
+ \[COMMON][LINKIS-3274](https://github.com/apache/linkis/pull/3274) [LINKIS-3519](https://github.com/apache/linkis/pull/3519) [LINKIS-3794](https://github.com/apache/linkis/pull/3794) 移除对sun.misc.Unsafe的使用,以支持适配jdk11
+ \[COMMON-Storage][LINKIS-3347](https://github.com/apache/linkis/pull/3347) 修复StorageResultSetWriter close 方法不支持重复调用
+ \[COMMON-Storage][LINKIS-3620](https://github.com/apache/linkis/pull/3620) 修复 linkis-storage 可能存在的NPE问题 
+ \[COMMON-Storage][LINKIS-3710](https://github.com/apache/linkis/pull/3710) 修复 StorageResultSetWriter调用close方法后调用flush清空文件的问题 
+ \[COMMON-HttpClient][LINKIS-3815](https://github.com/apache/linkis/pull/3815) 修复 CloseableHttpResponse 没有关闭，导致httpclient连接异常
+ \[GATEWAY][LINKIS-3609](https://github.com/apache/linkis/pull/3609) 修复网关服务 DefaultGatewayRouter初始化时可能会出现的 NPE问题
+ \[GATEWAY][LINKIS-3747](https://github.com/apache/linkis/pull/3747) [LINKIS-3732](https://github.com/apache/linkis/pull/3732) 修复api接口的结果处理可能存在的npe问题以及状态码可能不正确的场景
+ \[GATEWAY][LINKIS-4031](https://github.com/apache/linkis/pull/4031) 修复 gateway 获取客户端真实ip不正确的问题 
+ \[EC-JDBC][LINKIS-3240](https://github.com/apache/linkis/pull/3240) 优化JDBC包名的命名
+ \[EC-JDBC][LINKIS-3796](https://github.com/apache/linkis/pull/3796) 修复 JDBC 引擎无法处理 链接协议中的大写问题
+ \[EC-Python][LINKIS-3465](https://github.com/apache/linkis/pull/3465) 修复 python 代码解析器无法兼容原生python装饰器的问题 
+ \[EC-Hive][LINKIS-3906](https://github.com/apache/linkis/pull/3906) 修复事务表查询下多次编译导致的 Txn 列表失效问题
+ \[Entrance][LINKIS-3694](https://github.com/apache/linkis/pull/3684) 修复EntranceRestfulApi 的日志接口可能丢失日志的问题 
+ \[Entrance][LINKIS-3713](https://github.com/apache/linkis/pull/3713) 修复日志打印中的错误拼接符
+ \[Label][LINKIS-4011](https://github.com/apache/linkis/pull/4011) 修复 label-server 标签服务mapper xml语句错误问题

## 安全相关
+ \[EC-JDBC][LINKIS-3826](https://github.com/apache/linkis/pull/3826) 数据源服务建立连接时，屏蔽部分不安全的参数连接参数

## 依赖变更
+ \[COMMON][LINKIS-3624](https://github.com/apache/linkis/pull/3624) 升级maven构建的schema 1.1.2.xsd升级至2.1.1.xsd
+ \[COMMON][LINKIS-2971](https://github.com/apache/linkis/pull/2971) 移除 netty-3.6.2.Final.jar 依赖


## 致谢
Apache Linkis 1.3.1 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下 Contributors（排名不分先后）:
Alexkun, Beacontownfc, Davidhua1996, GuoPhilipse, KangTomwk, QuintinTao, aiceflower, aiceflower, 
binbinCheng, casionone, chenmutime, dingsheng339, dlimeng, gdams, guoshupei, huangKai-2323,
huangxiaopingRD, hunter-cloud09, hzdhgf, jacktao007, jackxu2011, jefftlin, legendtkl, liuzhuang2017, 
lvjianhui, mayinrain, peacewong, pjfanning, ruY9527, utopianet, ws00428637, yyuser5201314,
zhangwejun, zhangxn8, zhaoyun006, 