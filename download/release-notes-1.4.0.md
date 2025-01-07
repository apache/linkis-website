---
title: Release Notes 1.4.0
sidebar_position: 90
---

Apache Linkis 1.4.0 includes all [Project Linkis-1.4.0](https://github.com/apache/linkis/projects/26)

Linkis 1.4.0 version, the main new features are as follows: Adapted Hadoop, Hive, Spark The default version is upgraded to 3.x (Hadoop2.7.2-3.3.4, Hive2.3.3-3.1.3, spark2.4.3-3.2 .1 Supplement the specific version information), and support compilation parameters to control the version, so as to reduce the difficulty of transforming and adapting to the non-default base engine version; Hive EC supports running tasks in concurrent mode, which can greatly reduce the use of machine resources and improve the concurrency of hive tasks; ECM service does not kill EC when restarting, providing support for graceful restart; storage of task log result sets, new support for S3 and OSS file system modes; new support for data source services, such as: tidb, starrocks, Gaussdb, etc. ; Service support adapts to postgresql database mode deployment (experimental); Added Impala engine support (experimental); and enhanced Spark ETL functions, supporting Excel, Redis, Mongo, Elasticsearch, etc.;


The main functions are as follows:

- Upgrade the default versions of hadoop, spark, and hive to 3.x
- Reduce the compatibility issues of different versions of the base engine
- Support Hive EC to execute tasks concurrently
- Support not kill EC when restarting ECM service

- Support more data sources, such as: tidb, starrocks, Gaussdb, etc.
- Add postgresql database support (experimental)
- linkis-storage supports S3 and OSS filesystems (experimental)
- Added Impala engine connector support (experimental)
- Enhancements to Spark ETL
- Version number upgrade rules and submitted code default merge branch modification

abbreviation:
- ORCHESTRATOR: Linkis Orchestrator
- COMMON: Linkis Common
- ENTRANCE: Linkis Entrance
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM: Links Manager
- PS: Link Public Service
- PE: Link Public Enhancement
- RPC: Linkis Common RPC
- CG: Linkis Computation Governance
- DEPLOY: Linkis Deployment
- WEB: Linked Web
- GATEWAY: Linkis Gateway
- EP: Engine Plugin


## new features
- \[EC][LINKIS-4263](https://github.com/apache/linkis/pull/4263) upgrade the default version of Hadoop, Spark, Hive to 3.x
- \[EC-Hive][LINKIS-4359](https://github.com/apache/linkis/pull/4359) Hive EC supports concurrent tasks
- \[COMMON][LINKIS-4435](https://github.com/apache/linkis/pull/4435) linkis-storage supports S3 file system
- \[ECM][LINKIS-4452](https://github.com/apache/linkis/pull/4452) support not kill EC when restarting ECM service
- \[COMMON][LINKIS-4524](https://github.com/apache/linkis/pull/4524) supports postgresql database
- \[DMS][LINKIS-4486](https://github.com/apache/linkis/pull/4486) supports Tidb data source
- \[EC-Spark][LINKIS-4568](https://github.com/apache/linkis/pull/4568) Spark JDBC supports dm database
- \[EC-Spark][LINKIS-4539](https://github.com/apache/linkis/pull/4539) Spark etl supports excel
- \[EC-Spark][LINKIS-4534](https://github.com/apache/linkis/pull/4534) Spark etl supports redis
- \[EC-Spark][LINKIS-4560](https://github.com/apache/linkis/pull/4560) Spark etl supports mongo and es
- \[EC-Spark][LINKIS-4563](https://github.com/apache/linkis/pull/4563) Spark etl supports kafka
- \[EC-Spark][LINKIS-4538](https://github.com/apache/linkis/pull/4538) Spark etl supports data lake (hudi, delta)


## Enhancement points
- \[COMMON][LINKIS-4462](https://github.com/apache/linkis/pull/4462) code optimization, unified attribute name
- \[COMMON][LINKIS-4425](https://github.com/apache/linkis/pull/4425) code optimization, delete useless code
- \[COMMON][LINKIS-4368](https://github.com/apache/linkis/pull/4368) code optimization, remove json4s dependency
- \[COMMON][LINKIS-4357](https://github.com/apache/linkis/pull/4357) file upload interface optimization
- \[COMMON][LINKIS-4678](https://github.com/apache/linkis/pull/4678) Linkis JDBC Driver optimization supports docking different types of engines and tasks
- \[COMMON][LINKIS-4554](https://github.com/apache/linkis/pull/4554) Add task link tracking log to facilitate locating problems through unique task ID
- \[ECM][LINKIS-4449](https://github.com/apache/linkis/pull/4449) ECM code optimization
- \[EC][LINKIS-4341](https://github.com/apache/linkis/pull/4341) Optimize the code logic of CustomerDelimitedJSONSerDe
- \[EC-Openlookeng][LINKIS-](https://github.com/apache/linkis/pull/4474) Openlookeng EC code conversion to Java
- \[EC-Shell][LINKIS-4473](https://github.com/apache/linkis/pull/4473) Shell EC code conversion to Java
- \[EC-Python][LINKIS-4482](https://github.com/apache/linkis/pull/4482) Python EC code conversion to Java
- \[EC-Trino][LINKIS-4526](https://github.com/apache/linkis/pull/4526) Trino EC code conversion to Java
- \[EC-Presto][LINKIS-4514](https://github.com/apache/linkis/pull/4514) Presto EC code conversion to Java
- \[EC-Elasticsearch][LINKIS-4531](https://github.com/apache/linkis/pull/4531) Elasticsearch EC code conversion to Java
- \[COMMON][LINKIS-4475](https://github.com/apache/linkis/pull/4475) use latest mysql DDL in k8s deployment
- \[EC-Flink][LINKIS-4556](https://github.com/apache/linkis/pull/4556) Flink EC adds task interceptor
- \[GATEWAY][LINKIS-4548](https://github.com/apache/linkis/pull/4548) Clear all backend caches on user logout
- \[COMMON][LINKIS-4554](https://github.com/apache/linkis/pull/4554) Add MDC log format in Linkis to track JobID
- \[CG][LINKIS-4583](https://github.com/apache/linkis/pull/4583) When submitting an once task, you can get the result of creating the engine
- \[EC-Spark][LINKIS-4570](https://github.com/apache/linkis/pull/4570) Generate Spark sql based on jdbc data source
- \[COMMON][LINKIS-4601](https://github.com/apache/linkis/pull/4601) supports integration test Action
- \[EC-Seatunnel][LINKIS-4673](https://github.com/apache/linkis/pull/4673) Seatunnel version upgrade to 2.3.1


## Repair function
- \[EC-Hive][LINKIS-4246](https://github.com/apache/linkis/pull/4246) The Hive engine version number supports hyphens, such as hive3.1.2-cdh5.12.0
- \[COMMON][LINKIS-4438](https://github.com/apache/linkis/pull/4438) fixed nohup startup error
- \[EC][LINKIS-4429](https://github.com/apache/linkis/pull/4429) Fix CPU average load calculation bug
- \[PE][LINKIS-4457](https://github.com/apache/linkis/pull/4457) fix parameter validation issue configured by admin console
- \[DMS][LINKIS-4500](https://github.com/apache/linkis/pull/4500) Fixed type conversion failure between client and data source
- \[COMMON][LINKIS-4480](https://github.com/apache/linkis/pull/4480) fixed build default configuration file with jdk17
- \[CG][LINKIS-4663](https://github.com/apache/linkis/pull/4663) Fix the problem that engine reuse may throw NPE
- \[LM][LINKIS-4652](https://github.com/apache/linkis/pull/4652) fixed the problem that creating engine node throws NPE


## Acknowledgments
The release of Apache Linkis 1.4.0 is inseparable from the contributors of the Linkis community. Thanks to all community contributors, including but not limited to the following Contributors (in no particular order):
casionone,MrFengqin,zhangwejun,Zhao,ahaoyao,duhanmin,guoshupei,shixiutao,CharlieYan24,peacewong,GuoPhilipse,aiceflower,waynecookie,jacktao007,chenghuichen,ws00428637,ChengJie1053,dependabot,jackxu2011,s jgllgh,rarexixi,pjfanning,v-kkhuang,binbinCheng, stdnt-xiao, mayinrain.