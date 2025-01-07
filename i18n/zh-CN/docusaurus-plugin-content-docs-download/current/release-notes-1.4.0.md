---
title: Release Notes 1.4.0
sidebar_position: 90
---

Apache Linkis 1.4.0 包括所有 [Project Linkis-1.4.0](https://github.com/apache/linkis/projects/26)

Linkis 1.4.0 版本，主要新增如下特性功能：适配的 Hadoop、Hive、Spark 默认版本升级为3.x (Hadoop2.7.2-3.3.4， Hive2.3.3-3.1.3，spark2.4.3-3.2.1 补充下具体的版本信息), 并支持编译参数控制版本，以降低改造适配非默认基础引擎版本的难度；Hive EC 支持并发模式运行任务，可大幅降低机器资源使用，提高hive任务并发；ECM 服务重启时不 kill EC，为优雅重启提供支持；任务日志结果集的存储，新增对S3 和 OSS 文件系统模式的支持；数据源服务新增对，如：tidb、starrocks、Gaussdb等的支持；服务支持适配postgresql 数据库模式部署（实验性）；新增Impala引擎支持（实验性）;以及对Spark ETL 功能增强，支持 Excel、Redis、Mongo、Elasticsearch等；


主要功能如下：

- 将 hadoop、spark、hive 默认版本升级为3.x
- 减少基础引擎不同版本兼容性问题
- 支持 Hive EC 并发执行任务
- 支持 ECM 服务重启时不 kill EC

- 支持更多的数据源，如：tidb、starrocks、Gaussdb等
- 增加 postgresql 数据库支持（实验性）
- linkis-storage 支持 S3 和 OSS 文件系统（实验性）
- 新增 Impala 引擎连接器支持（实验性）
- 对Spark ETL 功能增强
- 版本号升级规则及提交代码默认合并分支修改

缩写：
- ORCHESTRATOR: Linkis Orchestrator
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


## 新特性
- \[EC][LINKIS-4263](https://github.com/apache/linkis/pull/4263) 将 Hadoop、Spark、Hive 默认版本升级为3.x
- \[EC-Hive][LINKIS-4359](https://github.com/apache/linkis/pull/4359)  Hive EC 支持并发任务
- \[COMMON][LINKIS-4435](https://github.com/apache/linkis/pull/4435)  linkis-storage 支持 S3 文件系统
- \[ECM][LINKIS-4452](https://github.com/apache/linkis/pull/4452) ECM 无状态化，重启时不 kill EC
- \[COMMON][LINKIS-4524](https://github.com/apache/linkis/pull/4524) 支持 postgresql 数据库
- \[DMS][LINKIS-4486](https://github.com/apache/linkis/pull/4486) 支持 Tidb 数据源 
- \[EC-Spark][LINKIS-4568](https://github.com/apache/linkis/pull/4568) Spark JDBC支持 dm 数据库
- \[EC-Spark][LINKIS-4539](https://github.com/apache/linkis/pull/4539) Spark etl 支持 excel
- \[EC-Spark][LINKIS-4534](https://github.com/apache/linkis/pull/4534) Spark etl 支持 redis
- \[EC-Spark][LINKIS-4560](https://github.com/apache/linkis/pull/4560) Spark etl 支持 mongo and es
- \[EC-Spark][LINKIS-4563](https://github.com/apache/linkis/pull/4563) Spark etl 支持 kafka
- \[EC-Spark][LINKIS-4538](https://github.com/apache/linkis/pull/4538) Spark etl 支持数据湖 (hudi、delta)


## 增强点
- \[COMMON][LINKIS-4462](https://github.com/apache/linkis/pull/4462) 代码优化，统一属性名称
- \[COMMON][LINKIS-4425](https://github.com/apache/linkis/pull/4425) 代码优化，删除了无用的代码
- \[COMMON][LINKIS-4368](https://github.com/apache/linkis/pull/4368) 代码优化，移除 json4s 依赖
- \[COMMON][LINKIS-4357](https://github.com/apache/linkis/pull/4357) 文件上传接口优化
- \[COMMON][LINKIS-4678](https://github.com/apache/linkis/pull/4678) Linkis JDBC Driver优化支持对接不同类型的引擎和任务
- \[COMMON][LINKIS-4554](https://github.com/apache/linkis/pull/4554) 增加任务链路跟踪日志，方便通过唯一任务ID定位问题
- \[ECM][LINKIS-4449](https://github.com/apache/linkis/pull/4449) ECM 代码优化
- \[EC][LINKIS-4341](https://github.com/apache/linkis/pull/4341) 优化 CustomerDelimitedJSONSerDe 代码逻辑
- \[EC-Openlookeng][LINKIS-](https://github.com/apache/linkis/pull/4474) Openlookeng EC 代码转换为 Java
- \[EC-Shell][LINKIS-4473](https://github.com/apache/linkis/pull/4473) Shell EC 代码转换为 Java
- \[EC-Python][LINKIS-4482](https://github.com/apache/linkis/pull/4482) Python EC 代码转换为 Java
- \[EC-Trino][LINKIS-4526](https://github.com/apache/linkis/pull/4526) Trino EC 代码转换为 Java
- \[EC-Presto][LINKIS-4514](https://github.com/apache/linkis/pull/4514) Presto EC 代码转换为 Java
- \[EC-Elasticsearch][LINKIS-4531](https://github.com/apache/linkis/pull/4531) Elasticsearch EC 代码转换为 Java
- \[COMMON][LINKIS-4475](https://github.com/apache/linkis/pull/4475) 在 k8s 部署中使用最新的 mysql DDL
- \[EC-Flink][LINKIS-4556](https://github.com/apache/linkis/pull/4556) Flink EC 增加任务拦截器
- \[GATEWAY][LINKIS-4548](https://github.com/apache/linkis/pull/4548) 用户注销时清除所有后端缓存
- \[COMMON][LINKIS-4554](https://github.com/apache/linkis/pull/4554) 在Linkis中增加MDC日志格式，用于跟踪JobID
- \[CG][LINKIS-4583](https://github.com/apache/linkis/pull/4583) 提交一个 once 任务时可以得到创建引擎的结果
- \[EC-Spark][LINKIS-4570](https://github.com/apache/linkis/pull/4570) 基于jdbc数据源生成 Spark sql
- \[COMMON][LINKIS-4601](https://github.com/apache/linkis/pull/4601) 支持集成测试 Action
- \[EC-Seatunnel][LINKIS-4673](https://github.com/apache/linkis/pull/4673) Seatunnel 版本升级到 2.3.1


## 修复功能
- \[EC-Hive][LINKIS-4246](https://github.com/apache/linkis/pull/4246)  Hive 引擎版本号支持连字符，如hive3.1.2-cdh5.12.0
- \[COMMON][LINKIS-4438](https://github.com/apache/linkis/pull/4438) 修正了nohup启动错误
- \[EC][LINKIS-4429](https://github.com/apache/linkis/pull/4429) 修复 CPU 平均负载计算bug
- \[PE][LINKIS-4457](https://github.com/apache/linkis/pull/4457) 修复由管理控制台配置的参数验证问题
- \[DMS][LINKIS-4500](https://github.com/apache/linkis/pull/4500) 修复客户端与数据源之间类型转换失败问题
- \[COMMON][LINKIS-4480](https://github.com/apache/linkis/pull/4480) 修复了使用 jdk17 构建默认配置文件的问题
- \[CG][LINKIS-4663](https://github.com/apache/linkis/pull/4663) 修复引擎复用可能会抛出 NPE 的问题
- \[LM][LINKIS-4652](https://github.com/apache/linkis/pull/4652) 修复了创建引擎节点抛出 NPE 的问题


## 致谢
Apache Linkis 1.4.0 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下 Contributors（排名不分先后）:
casionone,MrFengqin,zhangwejun,Zhao,ahaoyao,duhanmin,guoshupei,shixiutao,CharlieYan24,peacewong,GuoPhilipse,aiceflower,waynecookie,jacktao007,chenghuichen,ws00428637,ChengJie1053,dependabot,jackxu2011,sjgllgh,rarexixi,pjfanning,v-kkhuang,binbinCheng,stdnt-xiao,mayinrain。