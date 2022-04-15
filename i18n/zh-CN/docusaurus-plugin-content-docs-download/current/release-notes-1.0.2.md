---
title: Release Notes 1.0.2
sidebar_position: 10
--- 
> <font color='red'> 这是Non-ASF版本 </font>

Linkis-1.0.2 包括所有 [Project Linkis-1.0.2](https://github.com/apache/incubator-linkis/projects/11)。

本次发布主要将 Flink-Support 引入 Linkis 工程中。

添加了以下主要功能：
* Flink-EngineConn 为 Flink 作业提供支持。现在可以执行、调试和监控 Flink SQL 或应用程序，以及由 Linkis Orchestrator 提供支持的 SQL 增强功能。
* LinkisManagerClient 可以直接访问 LinkisManager。提交和管理OnceJob 需要依赖此功能。


缩写：

CGS: Computation Governance Services

PES: Public Enhancement Services

MGS: Microservice Governance Services

---

## 新功能

#### EngineConn
* [Linkis-936](https://github.com/apache/incubator-linkis/pull/936) [CGS-LinkisOnceEngineconn] 支持OnceEngineExecutor

#### EnginePlugin
* [Linkis-935](https://github.com/apache/incubator-linkis/pull/935) [CGS-EngineConnPlugin-Flink] 支持 Flink EngineConn
* [Linkis-947](https://github.com/apache/incubator-linkis/pull/947) [CGS-EngineConnPlugin-Flink]支持执行Flink SQL和Flink应用
* [Linkis-948](https://github.com/apache/incubator-linkis/pull/948) [CGS-EngineConnPlugin-Flink] Flink EngineConn 的多数据源支持
* [Linkis-949](https://github.com/apache/incubator-linkis/pull/949) [CGS-EngineConnPlugin-Flink] 监控 Flink Metrics

#### ComputationClient
* [Linkis-937](https://github.com/apache/incubator-linkis/pull/937) [CGS-LinkisComputationClient] 支持OnceEngineExecutor 客户端

---

## 增强点
* [Linkis-953](https://github.com/apache/incubator-linkis/pull/953) [CGS-LinkisManager] 标签支持主机名中的“-”
* [Linkis-925](https://github.com/apache/incubator-linkis/pull/925) [MGS-LinkisServiceGateway] 修复linkis网关弱密码
* [Linkis-950](https://github.com/apache/incubator-linkis/pull/950) [CGS-LinkisEngineConnManager]同时支持ip地址和主机名进行服务发现
* [Linkis-967](https://github.com/apache/incubator-linkis/pull/967) [CGS-LinkisEntrance]去除instance-label客户端依赖，解决网关路由器主机名和ip判断异常，排除对 pentaho-aggdesigner-algorithm jar 的 pom 依赖。
* [Linkis-963](https://github.com/apache/incubator-linkis/pull/963) [PES-LinkisBmlServer]默认下载用户改为jvm用户，支持通过配置设置默认下载用户。

---
## 修复功能

* [Linkis-938](https://github.com/apache/incubator-linkis/pull/938) [CGS-LimkisMnagager] 修复了串行执行错误
* [Linkis-952](https://github.com/apache/incubator-linkis/pull/952) [CGS-LinkisEngineConn] 修复了一个冗余线程错误
* [Linkis-943](https://github.com/apache/incubator-linkis/pull/943) [CGS-EngineConnPlugin-Hive] 修复了 Hive3.0 编译错误
* [Linkis-961](https://github.com/apache/incubator-linkis/pull/961) [CGS-EngineConnPlugin-Flink] 修复了 Flink-EnginePlugin 编译错误
* [Linkis-966](https://github.com/apache/incubator-linkis/pull/966) [CGS-EngineConnPlugin-Hive] [CGS-EnginePlugin-Spark] 解决Spark和hive兼容性问题

## 致谢 

Linkis 1.0.2 的成功发布离不开 Linkis 社区的贡献者。感谢所有社区贡献者！
