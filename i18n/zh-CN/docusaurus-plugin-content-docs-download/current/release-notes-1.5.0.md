---
title: Release Notes 1.5.0
sidebar_position: 89
---

Apache Linkis 1.5.0 包括所有 [Project Linkis-1.5.0](https://github.com/apache/linkis/projects/27)

Linkis 1.5.0 版本，主要新增如下特性功能：注册中心支持切换为Nacos，新增Hbase引擎支持hbase-shell语法、支持图数据库Nebula引擎、新增repl解释器引擎支持运行Java和Scala代码片段、Spark 引擎支持On Yarn Cluster模式、Spark和Flink引擎支持 on k8s提交Jar任务等功能特性。

主要功能如下：

- 注册中心支持切换为Nacos
- 新增Hbase引擎
- 新增Nebula引擎
- 新增Repl解释器引擎
- 支持 Spark on k8s  jar/py
- 支持 Flink on k8s  jar
- Spark 引擎支持on yarn cluster
- Linkis JDBC driver支持多引擎多版本选择
- 基础数据管理增加配置项管理
- 管理台增加运维工具，并新加入了用户配置管理
- Entrance支持任务接管（实验性）


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
- - ORCHESTRATOR: Linkis Orchestrator


## 新特性
- \[EC][LINKIS-5008](https://github.com/apache/linkis/pull/5008) 注册中心支持Nacos
- \[GATEWAY][LINKIS-4992](https://github.com/apache/linkis/pull/4992)  Gateway支持访问控制配置
- \[EC-REPL][LINKIS-4937](https://github.com/apache/linkis/pull/4937)  新增Repl解释器引擎，支持执行scala和Java代码
- \[EC-NEBULA][LINKIS-4903](https://github.com/apache/linkis/pull/4903) 新增nebula引擎
- \[EC-HBASE][LINKIS-4891](https://github.com/apache/linkis/pull/4891) 新增Hbase引擎
- \[EC-SPARK][LINKIS-4850](https://github.com/apache/linkis/pull/4850) Spark 支持On Yarn Cluster运行
- \[EC-Spark][LINKIS-4867](https://github.com/apache/linkis/pull/4867) Spark支持提交Jar任务on k8s
- \[EC-Spark][LINKIS-4906](https://github.com/apache/linkis/pull/4906) Spark支持提交pyspark job on k8s
- \[JDBC-DRIVER][LINKIS-4930](https://github.com/apache/linkis/pull/4930) JDBCDriver支持引擎多版本
- \[EC-FLINK][LINKIS-4753](https://github.com/apache/linkis/pull/4753) Flink升级为1.16.2并兼容多版本
- \[ENTRANCE[LINKIS-4282](https://github.com/apache/linkis/pull/4282) 实验性：Entrance服务支持HA
- \[MONITOR][LINKIS-4905](https://github.com/apache/linkis/pull/4905) 实验性：新增Linkis Monitor服务
- \[WEB][LINKIS-4940](https://github.com/apache/linkis/pull/4940) 实验性：管理台前端新架构升级


## 增强点
- \[ECM][LINKIS-4990](https://github.com/apache/linkis/pull/4990) 支持管理台下载EC的日志文件
- \[EC][LINKIS-4982](https://github.com/apache/linkis/pull/4982) EC指标丰富增加锁空闲等时间指标
- \[WEB][LINKIS-4954](https://github.com/apache/linkis/pull/4954) 管理台增加用户配置管理页面
- \[EC-SPARk][LINKIS-4961](https://github.com/apache/linkis/pull/4961) Pyspark 新增更多的默认class import
- \[EC-PYTHON][LINKIS-4835](https://github.com/apache/linkis/pull/4835) 优化打印Python引擎，错误信息打印优化
- \[EC-SPARK][LINKIS-4896](https://github.com/apache/linkis/pull/4896) Spark Once 任务支持EngineConnRuntimeMode标签配置
- \[LINKISManager][LINKIS-4914](https://github.com/apache/linkis/pull/4914) LinkisManager资源排序选择规则优化为从按大到小
- \[WEB][LINKIS-4935](https://github.com/apache/linkis/pull/4935) 管理台支持配置spark.conf参数，支持配置多个Spark的原生参数
- \[EC][LINKIS-4714](https://github.com/apache/linkis/pull/4714) EC 支持指定Debug端口范围
- \[EC-FLINK][LINKIS-5023](https://github.com/apache/linkis/pull/5023) Flink引擎支持读取用户自定义的log4j配置
- \[PES][LINKIS-4838](https://github.com/apache/linkis/pull/4838) 文件读取和写入接口支持更多参数和操作
- \[LINKISManager][LINKIS-4850](https://github.com/apache/linkis/pull/4852) LinkisManager支持管理K8s资源
- \[PE][LINKIS-4847](https://github.com/apache/linkis/pull/4847) 优化模块数合并公共数据源模块
- \[PE][LINKIS-4853](https://github.com/apache/linkis/pull/4853) 优化模块数合并公共客户端模块为pes-client模块
- \[PE][LINKIS-4854](https://github.com/apache/linkis/pull/4854) 优化模块数合并公共服务的多个模块
- \[PE][LINKIS-4934](https://github.com/apache/linkis/pull/4934) 数据源服务支持合并和单独部署
- \[EC-FLINK][LINKIS-5025](https://github.com/apache/linkis/pull/5025) Flink 支持加载默认配置
- \[EC-JDBC][LINKIS-5007](https://github.com/apache/linkis/pull/5007) JDBC支持多任务间的任务串联


## 修复功能
- \[EC-Flink][LINKIS-5041](https://github.com/apache/linkis/pull/5041)  修复交互式Flink SQL打印状态获取错误日志问题
- \[MDS][LINKIS-4998](https://github.com/apache/linkis/issues/4998) ES数据源兼容6.X和7.X 
- \[EC-Spark][LINKIS-4996](https://github.com/apache/linkis/pull/4996) Spark Scala任务支持将错误信息打印到任务日志中
- \[ENTRANCE][LINKIS-4967](https://github.com/apache/linkis/pull/4967) 修复SQL解析comment中带有分号导致的解析错误
- \[EC][LINKIS-4920](https://github.com/apache/linkis/pull/4920) 修复结果集null返回为字符串NULL问题
- \[CLI][LINKIS-4919](https://github.com/apache/linkis/pull/4919) Client修复并发的NPE问题
- \[CG][LINKIS-4915](https://github.com/apache/linkis/pull/4915) 修复LinkisManager的ECM选择逻辑存在错误选择负载高的问题
- \[LM][LINKIS-4860](https://github.com/apache/linkis/pull/4860) 修复linkis-httpclient post接口中文乱码问题
- \[LM][LINKIS-4771](https://github.com/apache/linkis/pull/4771) Linkis-Cli once job提交应该为Once模式
- \[LM][LINKIS-4731](https://github.com/apache/linkis/pull/4731) Kill EC脚本应该去跳过ECM的进程

## 致谢
Apache Linkis 1.5.0 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下 Contributors（排名不分先后）:Casion,ChengJie1053,CoderSerio,GuoPhilipse,LiuGuoHua,Yonghao,ZHANG,Zhen,aiceflower,chengrui1,dependabot,guoshupei,luxl@chinatelecom.cn,peacewong,peter.peng,sjgllgh,v-kkhuang,weixiao,yangwenzea,yijut2,zhangwejun,zhaowenkai111,zlucelia,赵文恺,jackxu2011。


