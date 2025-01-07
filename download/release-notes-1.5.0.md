---
title: Release Notes 1.5.0
sidebar_position: 89
---

Apache Linkis 1.5.0 includes all [Project Linkis-1.5.0](https://github.com/apache/linkis/projects/27)

Linkis version 1.5.0 mainly adds the following features and functions: the registration center supports switching to Nacos, the new Hbase engine supports hbase-shell syntax, supports the graph database Nebula engine, and the new repl interpreter engine supports running Java and Scala code snippets. The Spark engine supports On Yarn Cluster mode, and the Spark and Flink engines support on k8s submission of Jar tasks and other functional features.

The main functions are as follows:

- The registration center supports switching to Nacos
- Added Hbase engine
- Added Nebula engine
- Added Repl interpreter engine
- Support Spark on k8s jar/py
- Support Flink on k8s jar
- Spark engine support on yarn cluster
- Linkis JDBC driver supports multi-engine and multi-version selection
- Basic data management adds configuration item management
- The management console adds operation and maintenance tools and adds new user configuration management
- Entrance supports task takeover (experimental)


abbreviation:
-COMMON: Linkis Common
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


## New features
- \[EC][LINKIS-5008](https://github.com/apache/linkis/pull/5008) The registration center supports Nacos
- \[GATEWAY][LINKIS-4992](https://github.com/apache/linkis/pull/4992) Gateway supports access control configuration
- \[EC-REPL][LINKIS-4937](https://github.com/apache/linkis/pull/4937) Added Repl interpreter engine to support execution of scala and Java code
- \[EC-NEBULA][LINKIS-4903](https://github.com/apache/linkis/pull/4903) Added nebula engine
- \[EC-HBASE][LINKIS-4891](https://github.com/apache/linkis/pull/4891) Added Hbase engine
- \[EC-SPARK][LINKIS-4850](https://github.com/apache/linkis/pull/4850) Spark supports On Yarn Cluster operation
- \[EC-Spark][LINKIS-4867](https://github.com/apache/linkis/pull/4867) Spark supports submitting Jar tasks on k8s
- \[EC-Spark][LINKIS-4906](https://github.com/apache/linkis/pull/4906) Spark supports submitting pyspark job on k8s
- \[JDBC-DRIVER][LINKIS-4930](https://github.com/apache/linkis/pull/4930) JDBCDriver supports multiple engine versions
- \[EC-FLINK][LINKIS-4753](https://github.com/apache/linkis/pull/4753) Flink is upgraded to 1.16.2 and is compatible with multiple versions
- \[ENTRANCE[LINKIS-4282](https://github.com/apache/linkis/pull/4282) Experimental: Entrance service supports HA
- \[MONITOR][LINKIS-4905](https://github.com/apache/linkis/pull/4905) Experimental: Add Linkis Monitor service
- \[WEB][LINKIS-4940](https://github.com/apache/linkis/pull/4940) Experimental: Upgrading the new architecture of the management console front-end


## Enhancement points
- \[ECM][LINKIS-4990](https://github.com/apache/linkis/pull/4990) Supports the management station to download EC log files
- \[EC][LINKIS-4982](https://github.com/apache/linkis/pull/4982) Rich EC indicators and increase lock idle and other time indicators
- \[WEB][LINKIS-4954](https://github.com/apache/linkis/pull/4954) Add user configuration management page to the management console
- \[EC-SPARk][LINKIS-4961](https://github.com/apache/linkis/pull/4961) Pyspark adds more default class imports
- \[EC-PYTHON][LINKIS-4835](https://github.com/apache/linkis/pull/4835) Optimize printing Python engine, optimize error message printing
- \[EC-SPARK][LINKIS-4896](https://github.com/apache/linkis/pull/4896) Spark Once task supports EngineConnRuntimeMode label configuration
- \[LINKISManager][LINKIS-4914](https://github.com/apache/linkis/pull/4914) LinkisManager resource sorting and selection rules are optimized from large to small
- \[WEB][LINKIS-4935](https://github.com/apache/linkis/pull/4935) The management console supports configuring spark.conf parameters and supports configuring multiple Spark native parameters.
- \[EC][LINKIS-4714](https://github.com/apache/linkis/pull/4714) EC supports specifying the Debug port range
- \[EC-FLINK][LINKIS-5023](https://github.com/apache/linkis/pull/5023) The Flink engine supports reading user-defined log4j configuration
- \[PES][LINKIS-4838](https://github.com/apache/linkis/pull/4838) The file reading and writing interface supports more parameters and operations
- \[LINKISManager][LINKIS-4850](https://github.com/apache/linkis/pull/4852) LinkisManager supports management of K8s resources
- \[PE][LINKIS-4847](https://github.com/apache/linkis/pull/4847) Optimize the number of modules and merge public data source modules
- \[PE][LINKIS-4853](https://github.com/apache/linkis/pull/4853) Optimize the number of modules and merge the public client module into the pes-client module
- \[PE][LINKIS-4854](https://github.com/apache/linkis/pull/4854) Optimize the number of modules and merge multiple modules of public services
- \[PE][LINKIS-4934](https://github.com/apache/linkis/pull/4934) The data source service supports merging and separate deployment
- \[EC-FLINK][LINKIS-5025](https://github.com/apache/linkis/pull/5025) Flink supports loading default configuration
- \[EC-JDBC][LINKIS-5007](https://github.com/apache/linkis/pull/5007) JDBC supports task concatenation between multiple tasks


## Repair function
- \[EC-Flink][LINKIS-5041](https://github.com/apache/linkis/pull/5041) Fixed the problem of interactive Flink SQL printing status acquisition error log
- \[MDS][LINKIS-4998](https://github.com/apache/linkis/issues/4998) ES data source is compatible with 6.X and 7.X
- \[EC-Spark][LINKIS-4996](https://github.com/apache/linkis/pull/4996) Spark Scala tasks support printing error information to the task log
- \[ENTRANCE][LINKIS-4967](https://github.com/apache/linkis/pull/4967) Fixed parsing error caused by semicolon in SQL parsing comment
- \[EC][LINKIS-4920](https://github.com/apache/linkis/pull/4920) Fix the problem that the result set null is returned as a string NULL
- \[CLI][LINKIS-4919](https://github.com/apache/linkis/pull/4919) Client fixes concurrent NPE issues
- \[CG][LINKIS-4915](https://github.com/apache/linkis/pull/4915) Fixed the problem of high incorrect selection load in the ECM selection logic of LinkisManager
- \[LM][LINKIS-4860](https://github.com/apache/linkis/pull/4860) Fix the Chinese garbled problem of linkis-httpclient post interface
- \[LM][LINKIS-4771](https://github.com/apache/linkis/pull/4771) Linkis-Cli once job submission should be in Once mode
- \[LM][LINKIS-4731](https://github.com/apache/linkis/pull/4731) Kill EC script should skip the ECM process

## Acknowledgments
The release of Apache Linkis 1.5.0 is inseparable from the contributors of the Linkis community. Thanks to all community contributors, including but not limited to the following Contributors (listed in no particular order): Casion, ChengJie1053, CoderSerio, GuoPhilipse, LiuGuoHua, Yonghao, ZHANG, Zhen,aiceflower,chengrui1,dependabot,guoshupei,luxl@chinatelecom.