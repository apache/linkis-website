---
title: Release Notes 1.6.0
sidebar_position: 88
---

Apache Linkis 1.6.0 includes all [Project Linkis-1.6.0](https://github.com/apache/linkis/projects/28)

Linkis 1.6.0 version mainly adds the following features: Spring family bucket upgraded to the latest security version, Orchestrator supports pluggable, result set storage supports switching to ORC and Parquet format storage, supports task board function, Flink supports UDF function, etc.

The main functions are as follows:

- Spring family bucket upgraded to the latest security version (Spring Cloud gateway (3.1.8), Spring Boot (2.7.11))
- Orchestrator supports pluggable
- Result set storage supports switching to ORC and Parquet format storage
- Flink supports UDF function
- Support Doris engine
- Management console task board function

Abbreviation:
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

## New Features
- \[ORCHESTRATOR][LINKIS-5120](https://github.com/apache/linkis/pull/5120) Orchestrator supports pluggable
- \[WEB][LINKIS-5089](https://github.com/apache/linkis/pull/5089) Management console task board function
- \[EC-DORIS][LINKIS-5053](https://github.com/apache/linkis/pull/5053) Support Doris engine
- \[EC-SPARK][LINKIS-5058](https://github.com/apache/linkis/pull/5058) Spark ETL function supports Doris
- \[COMMON][LINKIS-5024](https://github.com/apache/linkis/pull/5024) Result set storage supports switching to ORC and Parquet format storage
- \[GATEWAY][LINKIS-4958](https://github.com/apache/linkis/pull/4958) Spring family bucket upgraded to the latest security version
- \[EC-FLINK][LINKIS-5067](https://github.com/apache/linkis/pull/5067) Flink supports UDF function
- \[PES][LINKIS-5134](https://github.com/apache/linkis/issues/5134) Global history supports department administrator function

## Enhancement points
- \[ENTRANCE][LINKIS-5126](https://github.com/apache/linkis/pull/5126) Result set storage is changed to a common path
- \[PE][LINKIS-5108](https://github.com/apache/linkis/pull/5108) Basic data management interface permissions are optimized
- \[COMMON][LINKIS-5103](https://github.com/apache/linkis/pull/5103) Add multiple system variables submit_user, execute_user and run_last_mon
- \[COMMON][LINKIS-5102](https://github.com/apache/linkis/issues/5102) Linkis-Mybatis module supports configuration of connection retention and other parameters
- \[EC-DORIS][LINKIS-5060](https://github.com/apache/linkis/pull/5060) Doris engine supports data source function
- \[JDBC-DRIVER][LINKIS-5054](https://github.com/apache/linkis/pull/5054) JDBC Driver supports smallint and tinyint
- \[ENTRANCE][LINKIS-5135](https://github.com/apache/linkis/issues/5135) Entrance memory usage optimization
- \[JDBC-DRIVER][LINKIS-5136](https://github.com/apache/linkis/issues/5136) JDBC Driver supports the use of default DB
- \[CLIENT][LINKIS-5137](https://github.com/apache/linkis/issues/5137) Support LinkisManager Client, support request engine, kill engine, etc.
- \[ECP][LINKIS-5138](https://github.com/apache/linkis/issues/5138) Support FS Client, support file-related operations, upload and download
- \[COMMON][LINKIS-5139](https://github.com/apache/linkis/issues/5139) Linkis http client supports HTTPS
- \[EC-SPARK][LINKIS-5140](https://github.com/apache/linkis/issues/5140) Spark tasks support printing Fetched columns and rows
- \[ECP][LINKIS-5106](https://github.com/apache/linkis/issues/5106) ECP paths should be judged as relative paths to prevent accidental file deletion when deleting engine materials

## Fixed functions
- \[GATEWAY][LINKIS-5133](https://github.com/apache/linkis/pull/5133) Fixed Spring Gateway upgrade to support fixed IP forwarding
- \[COMMON][LINKIS-5081](https://github.com/apache/linkis/pull/5081) Fixed the installation setting of non-HDFS mode requiring hdfs command
- \[COMMON][LINKIS-5098](https://github.com/apache/linkis/issues/5098) Memory usage optimization
- \[COMMON][LINKIS-5100](https://github.com/apache/linkis/issues/5100) HDFS should not perform FS close for scenarios using public users
- \[COMMON][LINKIS-5101](https://github.com/apache/linkis/issues/5101) linkis-httpClient repeated login problem
- \[ENTRANCE][LINKIS-5074](https://github.com/apache/linkis/pull/5074) Fix the dirty data problem in the task cancellation status
- \[COMMON][LINKIS-5072](https://github.com/apache/linkis/pull/5072) Fix the file writing bug when storing as S3
- \[EC-HBASE][LINKIS-5065](https://github.com/apache/linkis/pull/5065) Fix the Hbase command execution error, but the task status is successful
- \[MDS][LINKIS-5059](https://github.com/apache/linkis/pull/5059) Fix the Doris data source password cannot be empty
- \[EC-FLINK][LINKIS-5041](https://github.com/apache/linkis/pull/5041) Fix the Flink sql kill yarn task status acquisition failure problem
- \[ENTRANCE][LINKIS-5141](https://github.com/apache/linkis/issues/5141) Fixed the issue of missing logs when viewing logs in real time

## Acknowledgements
The release of Apache Linkis 1.6.0 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors