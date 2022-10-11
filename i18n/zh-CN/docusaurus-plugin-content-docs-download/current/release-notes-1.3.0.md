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

---
## 新特性
+ \[DEPLOY][[LINKIS-2478]](https://github.com/apache/incubator-linkis/pull/2478) 增加 git action 用于发布时镜像自动构建和发布
+ \[DEPLOY][[LINKIS-3441]](https://github.com/apache/incubator-linkis/pull/3441) 增加 base 镜像，并引入镜像缓存机制用于镜像加速
+ \[DEPLOY][[LINKIS-2447]](https://github.com/apache/incubator-linkis/pull/2447) 为 Linkis 的后端和前端服务增加 Dockerfile，并增加 maven profile 来 build 镜像
+ \[DEPLOY][[LINKIS-2446]](https://github.com/apache/incubator-linkis/pull/2446) 为 Linkis 的后端和前端服务增加 Helm Charts，以及数据库初始化 Job 的 Charts
+ \[DEPLOY][[LINKIS-2465]](https://github.com/apache/incubator-linkis/pull/2465) 增加 login-pod 和 remote-debug-proxy 方便 k8s 环境下进行调试
+ \[DEPLOY][[LINKIS-2540]](https://github.com/apache/incubator-linkis/pull/2540) 引入 LDH (Linkis Distribution, including Hadoop) 镜像，集成 Hadoop/Spark/Flink/Hive 等方便测试


## Enhancement
+ \[LM][[LINKIS-2930]](https://github.com/apache/incubator-linkis/pull/2930) 优化 Manager 的分布式锁的性能，修复高并发场景下导致的 SQL 慢查询问题
+ \[EC][[LINKIS-2709]](https://github.com/apache/incubator-linkis/pull/2709) EC 日志增加，可以根据固定时间间隔进行推送
+ \[ENTRANCE][[LINKIS-2713]](https://github.com/apache/incubator-linkis/pull/2713) 优化 Entrance 的并发

## Bugs Fix
+ \[COMMON][[LINKIS-2769]](https://github.com/apache/incubator-linkis/pull/2769) 修复包冲突导致的 WebMvcConfigurer 问题

## 致谢
Apache Linkis(incubating) 1.3.0的发布离不开Linkis社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下Contributors（排名不发先后）:
AaronLinOops, Alexkun, jacktao007, legendtkl, peacewong