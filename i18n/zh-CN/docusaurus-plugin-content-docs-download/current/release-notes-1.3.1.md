---
title: Release Notes 1.3.1-RC1
sidebar_position: 0.16
---

Apache Linkis(incubating) 1.3.1 包括所有 [Project Linkis-1.3.0](https://github.com/apache/incubator-linkis/projects/23).

Linkis 1.3.1 版本主要支持 Trino 引擎 和 SeaTunnel 引擎。增加了管理台数据源管理模块。并且对数据源进行了增强，包括 oracle、kingbase、 postgresql、sqlserver、db2、greenplum、dm. 

主要功能如下：

* 新增对 Trino 引擎的支持 
* 新增对 SeaTunnel 引擎的支持
* 新增管理台数据源管理
* 新增 JDBC 引擎特性，支持 Trino 驱动查询进度
* 数据源增强 oracle、kingbase、postgresql、sqlserver、db2、greenplum、dm 

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

+ \[DMS][LINKIS-2961](https://github.com/apache/incubator-linkis/pull/2961) 数据源管理支持多环境
+ \[EC][LINKIS-3458](https://github.com/apache/incubator-linkis/pull/3458) 增加 Seatunnel 引擎
+ \[MDS][LINKIS-3457](https://github.com/apache/incubator-linkis/pull/3457) Linkis元数据查询添加doris/clickhouse
+ \[DMS][LINKIS-3839](https://github.com/apache/incubator-linkis/pull/3839) 为数据源添加必要的审计日志 
+ \[EC-TRINO][LINKIS-2639](https://github.com/apache/incubator-linkis/pull/2639) 增加 Trino 引擎
+ \[ECP][LINKIS-3836](https://github.com/apache/incubator-linkis/pull/3836) 合并 ECP 服务到 appmanager
+ \[EC][LINKIS-3381](https://github.com/apache/incubator-linkis/pull/3381) GetEngineNode 接口支持返回完整的 EC 信息


## 增强点

+ \[EC][LINKIS-2663](https://github.com/apache/incubator-linkis/pull/2663) 移除子任务逻辑
+ \[COMMON][LINKIS-3697](https://github.com/apache/incubator-linkis/pull/3697) 优化 Linkis 脚本
+ \[MDS/DMS][LINKIS-3613](https://github.com/apache/incubator-linkis/pull/3613) 调整元数据服务架构，在数据源中增加对HDFS类型的支持
+ \[DMS][LINKIS-3803](https://github.com/apache/incubator-linkis/pull/3803) 优化 DsmQueryProtocol
+ \[DMS][LINKIS-3505](https://github.com/apache/incubator-linkis/pull/3505) 为Qualitis添加新接口
+ \[DEPLOY][LINKIS-3500](https://github.com/apache/incubator-linkis/pull/3500) 支持与多个服务名兼容的启动脚本
+ \[COMMON/PE][LINKIS-3349](https://github.com/apache/incubator-linkis/pull/3349) 添加一个工具类来确定 OS 用户是否存在

## 修复功能
+ \[WEB][LINKIS-2921](https://github.com/apache/incubator-linkis/pull/2921) 批量关闭任务
+ \[COMMON][LINKIS-2971](https://github.com/apache/incubator-linkis/pull/2971) 移除 netty-3.6.2.Final.jar 依赖
+ \[EC-JDBC][LINKIS-3240](https://github.com/apache/incubator-linkis/pull/3240) 修复JDBC执行器目录
+ \[COMMON][LINKIS-3430](https://github.com/apache/incubator-linkis/pull/3430) 修复引擎启动失败后，再次启动时复用引擎配置
+ \[COMMON][LINKIS-3234](https://github.com/apache/incubator-linkis/pull/3234) 修复link-storage hadoop 校验和问题
+ \[][LINKIS-3347](https://github.com/apache/incubator-linkis/pull/3347) 修复StorageResultSetWriter close 方法不支持重复调用
+ \[COMMON][LINKIS-3352](https://github.com/apache/incubator-linkis/pull/3352) 修复excel导出:decimalType无法识别和计算
+ \[EC][LINKIS-3752] (https://github.com/apache/incubator-linkis/pull/3752) 修复 EC 历史列表查询结果不准确的问题
+ \[DEPLOY][LINKIS-3726](https://github.com/apache/incubator-linkis/pull/3726) 保留所有注册服务实例
+ \[EC-JDBC][LINKIS-3796](https://github.com/apache/incubator-linkis/pull/3796) 处理mysql链接以JDBC打头的情况
+ \[EC-JDBC][LINKIS-3826](https://github.com/apache/incubator-linkis/pull/3826) 处理mysql连接参数
+ \[PE/PS][LINKIS-3440](https://github.com/apache/incubator-linkis/pull/3440) 重构一些方法以防止sql注入
+ \[PE][LINKIS-3438](https://github.com/apache/incubator-linkis/pull/3438) 更新错误sql并消除冗余方法
+ \[EC][LINKIS-3552](https://github.com/apache/incubator-linkis/pull/3552) 修复 ES EC 的执行器目录

## 致谢
Apache Linkis(incubating) 1.3.1 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下 Contributors（排名不发先后）:
AaronLinOops, Alexkun, jacktao007, legendtkl, peacewong, casionone, QuintinTao, cydenghua, jackxu2011, ruY9527, huiyuanjjjjuice, binbinCheng, yyuser5201314, Beacontownfc, duhanmin, whiterxine, aiceflower, weipengfei-sj, zhaoyun006, CCweixiao, Beacontownfc, mayinrain