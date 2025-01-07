---
title: Release Notes 1.3.2
sidebar_position: 91
---

Apache Linkis 1.3.2 包括所有 [Project Linkis-1.3.2](https://github.com/apache/linkis/projects/24)

Linkis 1.3.2 版本，主要增加了如下功能：对 Spark 引擎进行了增强，支持 Spark 任务提交 jar 包功能；对 UDF 加载做了优化，支持通过 UDF ID 加载 UDF 功能；整合了 OceanBase 数据库，支持通过数据源功能使用 OceanBase 数据库；除此之外对标签和 Eureka 进行了增强，支持多任务固定 EC 执行和 Eureka 上报版本元数据功能。

主要功能如下：

- 支持通过 Spark 任务提交 Jar 包的功能
- 支持通过UDF ID 加载特定的 UDF
- 支持多任务固定 EC 执行
- 支持Eureka 版本元数据上报
- Linkis 整合 OceanBase

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

---

## 新特性
- \[EC-Spark][LINKIS-3421](https://github.com/apache/linkis/issues/3421)  Spark提交jar（engineConnMode 为 once）
- \[EC-UDF][LINKIS-3427](https://github.com/apache/linkis/issues/3427)  根据需要加载特定的 UDF
- \[ECM][LINKIS-3392](https://github.com/apache/linkis/issues/3392)  隔离新扩展的ECM
- \[LM][LINKIS-3393](https://github.com/apache/linkis/issues/3393)  关闭状态为“Unlock”的所有空闲 Engine
- \[ENTRANCE][LINKIS-3496](https://github.com/apache/linkis/issues/3496) 在创建组确定maxRunningJob时，排除状态为 offined 的 Entrance
- \[ENTRANCE][LINKIS-3807](https://github.com/apache/linkis/issues/3807)  linkis入口应支持创建者的ip白名单访问限制
- \[COMMON][LINKIS-3497](https://github.com/apache/linkis/issues/3497)  支持CommonVars 热加载功能

## 增强点
- \[ORCHESTRATOR][LINKIS-3717](https://github.com/apache/linkis/issues/3717)  性能优化，标记缓存时删除同步等待操作
- \[ECM][LINKIS-3760](https://github.com/apache/linkis/issues/3760)  添加清理一个 EngineConnManager 上所有 EngineConn 的功能
- \[LM][LINKIS-3719](https://github.com/apache/linkis/issues/3719)  RM资源操作优化，使用位分段锁
- \[ENTRANCE][LINKIS-3391](https://github.com/apache/linkis/issues/3391) 历史任务列表支持按 entrance 实例搜索
- \[ENTRANCE][LINKIS-3389](https://github.com/apache/linkis/issues/3389)  支持 userCreator 标签和 tenant 标签管理
- \[LM][LINKIS-3390](https://github.com/apache/linkis/issues/3390)  优化重试消息，去除资源数量为负数的情况
- \[DMS][LINKIS-2719](https://github.com/apache/linkis/issues/2719)  将 HDFS 数据源添加到数据源模块
- \[DMS][LINKIS-2718](https://github.com/apache/linkis/issues/2718) 数据源模块支持 Mongodb
- \[COMMON][LINKIS-3896](https://github.com/apache/linkis/issues/3896) 支持设置 run_today_h 变量
- \[EC][LINKIS-3899](https://github.com/apache/linkis/issues/3899)  当 EC 退出时，上报最终退出状态
- \[ORCHESTRATOR][LINKIS-3900](https://github.com/apache/linkis/issues/3900) 通过使用并发集合的方式优化Orchestrator中的实例和执行器缓存同步锁
- \[EC-Shell][LINKIS-3902](https://github.com/apache/linkis/issues/3902)  Shell EC 引擎 支持并发执行任务
- \[LM][LINKIS-3987](https://github.com/apache/linkis/issues/3987)  ECM 的最大资源，除配置资源模式，新增获取机器的实际资源模式
- \[GATEWAY][LINKIS-3988](https://github.com/apache/linkis/issues/3988)  Gateway 日志支持打印请求 IP 和路由 IP
- \[EUREKA][LINKIS-3989](https://github.com/apache/linkis/issues/3989)  Eureka 元数据支持上传版本信息
- \[ENTRANCE][LINKIS-3990](https://github.com/apache/linkis/issues/3990)  Entrance 支持在启动时重置正在运行的任务状态
- \[MDS][LINKIS-4012](https://github.com/apache/linkis/issues/4012)  元数据模块支持检查分区是否存在接口
- \[LM][LINKIS-4065](https://github.com/apache/linkis/issues/4065)  LinkisManager 支持显示 yarn 队列中 hive 资源的百分比
- \[ENTRANCE][LINKIS-4066](https://github.com/apache/linkis/issues/4066)  Entrance 支持查看更多任务和EngineConns的统计信息
- \[EC-JDBC][LINKIS-3521](https://github.com/apache/linkis/issues/3521)  优化JDBC EC 连接缓存 key 逻辑
- \[WEB][LINKIS-3446](https://github.com/apache/linkis/issues/3446)  全局历史结果集-结果集页面滑动 优化

## 修复功能
- \[EC][LINKIS-3718](https://github.com/apache/linkis/issues/3718)  客户端使用 ticketId 作为唯一凭证
- \[WEB][LINKIS-3444](https://github.com/apache/linkis/issues/3444)  修复UDF/Function 搜索时 会存在嵌入多层表头的问题
- \[WEB][LINKIS-3445](https://github.com/apache/linkis/issues/3445)  修复资源管理器，切换管理员视图时，某些实例数据显示为 undefined 问题
- \[GATEWAY][LINKIS-3898](https://github.com/apache/linkis/issues/3898) 修复token缓存 可能会导致的OOM问题
- \[PS][LINKIS-4050](https://github.com/apache/linkis/issues/4050)  启动节点时，上下文CS服务清理资源错误
- \[EC-Spark][LINKIS-4053](https://github.com/apache/linkis/issues/4053)  Spark EC metaspace 的 OutOfMemory 不会导致 EC 退出
- \[EC][LINKIS-4117](https://github.com/apache/linkis/issues/4117)  优化空闲引擎退出时仅判断状态的缺陷


## 致谢
Apache Linkis 1.3.2 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下 Contributors（排名不分先后）:
1Teng, aiceflower, Alexkun, Beacontownfc, binbinCheng, casionone, CharlieYan24, chenmutime, FinalTarget, geekmu9527, GuoPhilipse, guoshupei, huangKai-2323, hunter-cloud09, ichenfeiyang, jacktao007, jackxu2011, legendtkl, liaotian1005, mayinrain, peacewong, pjfanning, QuantumXiecao, rarexixi, utopianet, ws00428637。