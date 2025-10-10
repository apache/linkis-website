---
title: Release Notes 1.6.0
sidebar_position: 88
---

Apache Linkis 1.6.0 包括所有 [Project Linkis-1.6.0](https://github.com/apache/linkis/projects/28)

Linkis 1.6.0 版本，主要新增如下特性功能： Spring 全家桶升级为最新安全版本、Orchestrator支持可插拔、结果集存储支持切换为ORC和Parquet格式存储、支持任务看板功能、Flink支持UDF函数等

主要功能如下：

- Spring 全家桶升级为最新安全版本（Spring Cloud gateway(3.1.8)、Spring Boot(2.7.11)）
- Orchestrator支持可插拔
- 结果集存储支持切换为ORC和Parquet格式存储
- Flink支持UDF函数
- 支持Doris引擎
- 管理台任务看板功能

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
- ORCHESTRATOR: Linkis Orchestrator
- CLIENT： Linkis Client

## 新特性
- \[ORCHESTRATOR][LINKIS-5120](https://github.com/apache/linkis/pull/5120) Orchestrator支持可插拔
- \[WEB][LINKIS-5089](https://github.com/apache/linkis/pull/5089)  管理台任务看板功能
- \[EC-DORIS][LINKIS-5053](https://github.com/apache/linkis/pull/5053)  支持Doris引擎
- \[EC-SPARK][LINKIS-5058](https://github.com/apache/linkis/pull/5058) Spark ETL功能支持Doris
- \[COMMON][LINKIS-5024](https://github.com/apache/linkis/pull/5024) 结果集存储支持切换为ORC和Parquet格式存储
- \[GATEWAY][LINKIS-4958](https://github.com/apache/linkis/pull/4958) Spring 全家桶升级为最新安全版本
- \[EC-FLINK][LINKIS-5067](https://github.com/apache/linkis/pull/5067)  Flink 支持UDF功能
- \[PES][LINKIS-5134](https://github.com/apache/linkis/issues/5134)  全局历史支持部门管理员功能

## 增强点
- \[ENTRANCE][LINKIS-5126](https://github.com/apache/linkis/pull/5126) 结果集存储修改为通用路径
- \[PE][LINKIS-5108](https://github.com/apache/linkis/pull/5108) 基础数据管控接口权限优化
- \[COMMON][LINKIS-5103](https://github.com/apache/linkis/pull/5103) 增加多个系统变量 submit_user、execute_user 和 run_last_mon
- \[COMMON][LINKIS-5102](https://github.com/apache/linkis/issues/5102) Linkis-Mybatis模块支持配置连接保持等参数
- \[EC-DORIS][LINKIS-5060](https://github.com/apache/linkis/pull/5060) Doris引擎支持数据源功能
- \[JDBC-DRIVER][LINKIS-5054](https://github.com/apache/linkis/pull/5054) JDBC Driver支持smallint和tinyint
- \[ENTRANCE][LINKIS-5135](https://github.com/apache/linkis/issues/5135) Entrance内存使用优化
- \[JDBC-DRIVER][LINKIS-5136](https://github.com/apache/linkis/issues/5136) JDBC Driver支持使用默认DB
- \[CLIENT][LINKIS-5137](https://github.com/apache/linkis/issues/5137) 支持LinkisManager Client 支持请求引擎、kill引擎等
- \[ECP][LINKIS-5138](https://github.com/apache/linkis/issues/5138) 支持FS Client支持文件相关的操作，上传下载
- \[COMMON][LINKIS-5139](https://github.com/apache/linkis/issues/5139) Linkis http client 支持HTTPS
- \[EC-SPARK][LINKIS-5140](https://github.com/apache/linkis/issues/5140) Spark任务支持打印Fetched column和row
- \[ECP][LINKIS-5106](https://github.com/apache/linkis/issues/5106) ECP路径应做相对路径判断，防止在删除引擎材料时意外删除文件


## 修复功能
- \[GATEWAY][LINKIS-5133](https://github.com/apache/linkis/pull/5133)  修复Spring Gateway升级支持固定IP转发
- \[COMMON][LINKIS-5081](https://github.com/apache/linkis/pull/5081) 修复安装设置非HDFS模式需要hdfs命令
- \[COMMON][LINKIS-5098](https://github.com/apache/linkis/issues/5098) 内存使用优化
- \[COMMON][LINKIS-5100](https://github.com/apache/linkis/issues/5100) HDFS对于使用公共用户的场景，不应该进行FS close
- \[COMMON][LINKIS-5101](https://github.com/apache/linkis/issues/5101) linkis-httpClient 重复登录问题
- \[ENTRANCE][LINKIS-5074](https://github.com/apache/linkis/pull/5074) 修复任务取消状态脏数据问题
- \[COMMON][LINKIS-5072](https://github.com/apache/linkis/pull/5072) 修复存储为S3时的写文件bug
- \[EC-HBASE][LINKIS-5065](https://github.com/apache/linkis/pull/5065) 修复Hbase命令执行错误，但是任务状态为成功
- \[MDS][LINKIS-5059](https://github.com/apache/linkis/pull/5059) 修复Doris数据源密码不能为空
- \[EC-FLINK][LINKIS-5041](https://github.com/apache/linkis/pull/5041) 修复Flink sql kill yarn 任务获取状态失败问题
- \[ENTRANCE][LINKIS-5141](https://github.com/apache/linkis/issues/5141) 修复日志实时查看会少日志问题

## 致谢
Apache Linkis 1.6.0 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者
