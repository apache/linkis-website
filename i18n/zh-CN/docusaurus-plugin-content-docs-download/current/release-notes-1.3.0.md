---
title: Release Notes 1.3.0
sidebar_position: 11
---

Apache Linkis(incubating) 1.3.0 包括所有 [Project Linkis-1.3.0](https://github.com/apache/incubator-linkis/projects/14).

Linkis 1.3.0 版本发布主要支持 Linkis 服务部署在 Kubernetes 环境中，包括统一镜像构建、完整 Helm Charts、基于 Kind 的完整测试周边等。除此之外还做了一些功能的优化和 bug 修复。

主要功能如下：
* Linkis 多个微服务的统一镜像构建，以及增加 action 进行镜像自动构建
* 增加将 Linkis 整体部署到 Kubernetes 环境中的 Helm Charts
* 基于 Kind 的本地 Kubernetes 测试环境支持
* Kubernetes 环境上 Linkis 微服务 Remote Debug 支持
* 增加 Hadoop 生态 All-in-one 的镜像 LDH(Linkis Distribution, including Apache Hadoop) 构建
* 优化 Manager 的分布式锁的性能，修复高并发场景下导致的 SQL 慢查询问题

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
+ \[DEPLOY][[LINKIS-2478]](https://github.com/apache/incubator-linkis/pull/2478) 增加 git action 用于发布时镜像自动构建和发布
+ \[DEPLOY][[LINKIS-3441]](https://github.com/apache/incubator-linkis/pull/3441) 增加 base 镜像，并引入镜像缓存机制用于镜像加速
+ \[DEPLOY][[LINKIS-2447]](https://github.com/apache/incubator-linkis/pull/2447) 为 Linkis 的后端和前端服务增加 Dockerfile，并增加 maven profile 来 build 镜像
+ \[DEPLOY][[LINKIS-2446]](https://github.com/apache/incubator-linkis/pull/2446) 为 Linkis 的后端和前端服务增加 Helm Charts，以及数据库初始化 Job 的 Charts
+ \[DEPLOY][[LINKIS-2465]](https://github.com/apache/incubator-linkis/pull/2465) 增加 login-pod 和 remote-debug-proxy 方便 k8s 环境下进行调试
+ \[DEPLOY][[LINKIS-2540]](https://github.com/apache/incubator-linkis/pull/2540) 引入 LDH (Linkis Distribution, including Hadoop) 镜像，集成 Hadoop/Spark/Flink/Hive 等方便测试
+ \[EP][[LINKIS-2916]](https://github.com/apache/incubator-linkis/pull/2916) 增加 EnginePlugin 管理模块
+ \[COMMON][[LINKIS-3231]](https://github.com/apache/incubator-linkis/pull/3231) 增加 SQL DDL/DML 的 git action 的校验
+ \[CG][[LINKIS-3201]](https://github.com/apache/incubator-linkis/pull/3201) 增加配置项支持跳过 Python 代码解析
+ \[ECP][[LINKIS-3239]](https://github.com/apache/incubator-linkis/pull/3239) 优化 JDBC 参数填充的逻辑 

## Enhancement
+ \[LM][[LINKIS-2930]](https://github.com/apache/incubator-linkis/pull/2930) 优化 Manager 的分布式锁的性能，修复高并发场景下导致的 SQL 慢查询问题
+ \[EC][[LINKIS-2709]](https://github.com/apache/incubator-linkis/pull/2709) EC 日志增加，可以根据固定时间间隔进行推送
+ \[ENTRANCE][[LINKIS-2713]](https://github.com/apache/incubator-linkis/pull/2713) 优化 Entrance 的并发
+ \[Gateway][[LINKIS-2699]](https://github.com/apache/incubator-linkis/pull/2699) 等用户登录之后清除 Gateway 的过期 cookie 解决验证失败的问题
+ \[WEB][[LINKIS-2483]](https://github.com/apache/incubator-linkis/pull/2483) Linkis Web 增加 dependencies install
+ \[ECP][[LINKIS-2898]](https://github.com/apache/incubator-linkis/pull/2898) 增强 Python 的测试性
+ \[COMMON][[LINKIS-2761]](https://github.com/apache/incubator-linkis/pull/2761) 代码格式增强，包括 scalafmt, spotless, parent pom 调整等
+ \[CG][[LINKIS-2711]](https://github.com/apache/incubator-linkis/pull/2711) SparkPreExecutionHook 重构
+ \[EC][[LINKIS-2976]](https://github.com/apache/incubator-linkis/pull/2976) EngineConn 的配置项整理重构

## Bugs Fix
+ \[COMMON][[LINKIS-2769]](https://github.com/apache/incubator-linkis/pull/2769) 修复包冲突导致的 WebMvcConfigurer 问题
+ \[WEB][[LINKIS-2498]](https://github.com/apache/incubator-linkis/pull/2499) 修复 Apache Rat Check 的 bug
+ \[LM][[LINKIS-2892]](https://github.com/apache/incubator-linkis/pull/2892) 修复 Yarn 资源 capacity 计算错误的问题
+ \[CG][[LINKIS-2764]](https://github.com/apache/incubator-linkis/pull/2764) 修复 Python 代码解析器的解析失败问题
+ \[COMMON][[LINKIS-2756]](https://github.com/apache/incubator-linkis/pull/2756) 修复 ResultSet 可能读取失败的问题
+ \[COMMON][[LINKIS-3156]](https://github.com/apache/incubator-linkis/pull/3156) 修复变量替换的 bug
+ \[COMMON][[LINKIS-3307]](https://github.com/apache/incubator-linkis/pull/3307) 修复 FsPath 的 NPE 问题
+ \[EC][[LINKIS-3298]](https://github.com/apache/incubator-linkis/pull/3298) 修复 EC 的指标更新延迟的问题

## 致谢
Apache Linkis(incubating) 1.3.0的发布离不开Linkis社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下Contributors（排名不发先后）:
AaronLinOops, Alexkun, jacktao007, legendtkl, peacewong, casionone, QuintinTao, cydenghua, jackxu2011, ruY9527, huiyuanjjjjuice,
binbinCheng, yyuser5201314, Beacontownfc, duhanmin, whiterxine, aiceflower, weipengfei-sj, zhaoyun006, CCweixiao, Beacontownfc, mayinrain