---
title: Release Notes 1.8.0
sidebar_position: 86
---

Apache Linkis 1.8.0 版本，主要新增如下特性功能： Linkis任务支持事前和事后诊断、数据源展示支持Ranger，支持Azure对象存储、数据源管理支持Oracle和PostgreSQL、Token过期策略优化，支持OAuth2身份认证、修复了一些安全问题等

主要功能如下：

- 任务事前诊断和bad job拦截支持和任务事后诊断报告
- 数据源展示支持Ranger
- 支持Azure对象存储
- 数据源管理支持 Oracle 和 PostgreSQL
- Token 过期策略优化
- 在任务管理界面增加产看 UDF 日志栏
- 新增 OAuth2 身份认证支持
- 修复使用JDBC方式连接mysql安全漏洞
- 修复极端情况下日志文件可能暴露hive配置密码安全漏洞
- 修复容器化配置文件中使用不安全Token配置问题 

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

- 任务事前诊断和bad job拦截支持和任务事后诊断报告
- 数据源展示支持Ranger
- 支持Azure对象存储
- 在任务管理界面增加产看 UDF 日志栏
- 新增 OAuth2 身份认证支持

## 增强点

- 数据源管理支持 Oracle 和 PostgreSQL
- Token 过期策略优化

## 修复功能

- 修复使用JDBC方式连接mysql安全漏洞
- 修复极端情况下日志文件可能暴露hive配置密码安全漏洞
- 修复容器化配置文件中使用不安全Token配置问题 

## 致谢
Apache Linkis 1.8.0 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者
