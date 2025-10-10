---
title: Release Notes 1.3.1
sidebar_position: 92
---

Apache Linkis 1.3.1 includes all [Project Linkis-1.3.1](https://github.com/apache/linkis/projects/23).

Linkis 1.3.1 mainly supports Trino engine and SeaTunnel engine. The basic data management of the management console has been added, and it is possible to perform convenient interface configuration operations on some basic data (data source environment management/token token management/error code management/engine material management, etc.).
And the existing data sources have been enhanced, adding support for oracle, kingbase, postgresql, sqlserver, db2, greenplum, dm type data sources.

The main functions are as follows:

* Added support for distributed SQL query engine Trino
* Added support for Seatunnel engine, a data integration platform
* Added the basic data management of the management console, which can conveniently perform interface-based configuration operations on some basic data
* Added JDBC engine features to support Trino-driven query execution progress
* Enhanced the existing data sources, adding data source support for oracle, kingbase, postgresql, sqlserver, db2, greenplum, dm

Abbreviations:
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

---

## New Feature

+ \[DMS][LINKIS-2961](https://github.com/apache/linkis/pull/2961) Data source management supports multiple environments
+ \[DMS][LINKIS-3839](https://github.com/apache/linkis/pull/3839) Add necessary audit logs for the Api interface of the data source
+ \[MDS][LINKIS-3457](https://github.com/apache/linkis/pull/3457) Add doris/clickhouse to Linkis metadata query
+ \[EC-Trino][LINKIS-2639](https://github.com/apache/linkis/pull/2639) Add support for distributed SQL query engine Trino
+ \[EC-Seatunnel][LINKIS-3458](https://github.com/apache/linkis/pull/3458) Added support for the data integration platform Seatunnel engine
+ \[EC][LINKIS-3381](https://github.com/apache/linkis/pull/3381) The GetEngineNode interface supports returning complete EC information and adding a record of EC status
+ \[ECP][LINKIS-3836](https://github.com/apache/linkis/pull/3836) Merge cg-engineplugin service to cg-linkismanager to reduce the number of services

## Enhancement

+ \[EC][LINKIS-2663](https://github.com/apache/linkis/pull/2663) Remove subtask related logic
+ \[EC-OnceEC][LINKIS-3552](https://github.com/apache/linkis/pull/3552) When optimizing the EC information obtained by the Once job type, use ticketId as the unique key
+ \[EC-Shell][LINKIS-3939](https://github.com/apache/linkis/pull/3939) Optimize the shell engine to optimize the dangerous and high-risk command set
+ \[COMMON][LINKIS-3349](https://github.com/apache/linkis/pull/3349) Add utility class to determine if OS user exists
+ \[COMMON][LINKIS-3697](https://github.com/apache/linkis/pull/3697) Optimize Linkis script, add user manual and guide
+ \[MDS/DMS][LINKIS-3613](https://github.com/apache/linkis/pull/3613) optimize the data source, add support for HDFS type
+ \[DMS][LINKIS-3505](https://github.com/apache/linkis/pull/3505) Data source enhancement, adding some query interfaces
+ \[DMS][LINKIS-3783](https://github.com/apache/linkis/pull/3783) Optimize data source: unreleased data source version, should not be available
+ \[DMS][LINKIS-3803](https://github.com/apache/linkis/pull/3803) Optimize the data source request interface DsmQueryProtocol, increase the return of exception information
+ \[DMS][LINKIS-3881](https://github.com/apache/linkis/pull/3881) Optimize the data source interface and increase the filling of the default value of the configuration item
+ \[DEPLOY][LINKIS-3500](https://github.com/apache/linkis/pull/3500) service startup script optimization to support service name parameters in multiple ways compatible
+ \[DEPLOY][LINKIS-3729](https://github.com/apache/linkis/pull/3729) optimize the control of hadoop version by installation script
+ \[LM][LINKIS-3740](https://github.com/apache/linkis/pull/3740) When EC is in idle and exit state, add resource cleanup operation for LM service
+ \[LM-RM][LINKIS-3733](https://github.com/apache/linkis/pull/3733) Optimize the size of RM resource operation lock
+ \[ECM][LINKIS-3720](https://github.com/apache/linkis/pull/3720) performance optimization, remove the synchronous wait operation of tag cache
+ \[Entrance][LINKIS-3831](https://github.com/apache/linkis/pull/3831) Optimize entry log printing Add time information
+ \[Entrance][LINKIS-3833](https://github.com/apache/linkis/pull/3833) Optimize the state change logic of EntranceJob
+ \[PE][LINKIS-3440](https://github.com/apache/linkis/pull/3440) optimize some methods of mapper xml to prevent sql injection problem

## Bugs Fix
+ \[WEB][LINKIS-2921](https://github.com/apache/linkis/pull/2921) fix batch kill tasks - some tasks cannot be killed due to incorrect grouping
+ \[COMMON][LINKIS-3430](https://github.com/apache/linkis/pull/3430) After the engine failed to start, the problem of reusing the previous engine configuration was incorrectly restarted
+ \[COMMON][LINKIS-3234](https://github.com/apache/linkis/pull/3234) linkis-storage Add linkis.fs.hdfs.impl.disable.checksum configuration item to control hdfs checksum check
+ \[COMMON][LINKIS-3352](https://github.com/apache/linkis/pull/3352) Fix the problem that the decimalType cannot be recognized and calculated when the result set is exported to excel
+ \[EC][LINKIS-3752](https://github.com/apache/linkis/pull/3752) Fix the inaccurate query result of EC history list
+ \[DEPLOY][LINKIS-3608](https://github.com/apache/linkis/pull/3608) Unified use of /usr/bin/env bash in scripts to make code more portable
+ \[DEPLOY][LINKIS-3726](https://github.com/apache/linkis/pull/3726) Optimize gateway service: keep all registered service instances
+ \[PE][LINKIS-3438](https://github.com/apache/linkis/pull/3438) fix wrong sql in udf module and remove redundant methods
+ \[EC][LINKIS-3552](https://github.com/apache/linkis/pull/3552) Optimize ES EC package naming
+ \[COMMON][LINKIS-3618](https://github.com/apache/linkis/pull/3618) unified mybatis usage specification and adjusted the annotation method of mapper to xml
+ \[COMMON][LINKIS-3274](https://github.com/apache/linkis/pull/3274) [LINKIS-3519](https://github.com/apache/linkis/pull/3519) [ LINKIS-3794](https://github.com/apache/linkis/pull/3794) Remove the use of sun.misc.Unsafe to support jdk11 adaptation
+ \[COMMON-Storage][LINKIS-3347](https://github.com/apache/linkis/pull/3347) Fix StorageResultSetWriter close method does not support repeated calls
+ \[COMMON-Storage][LINKIS-3620](https://github.com/apache/linkis/pull/3620) fix the possible NPE problem of linkis-storage
+ \[COMMON-Storage][LINKIS-3710](https://github.com/apache/linkis/pull/3710) Fix the problem of calling flush to clear the file after calling the close method of StorageResultSetWriter
+ \[COMMON-HttpClient][LINKIS-3815](https://github.com/apache/linkis/pull/3815) Fix CloseableHttpResponse is not closed, resulting in httpclient connection exception
+ \[GATEWAY][LINKIS-3609](https://github.com/apache/linkis/pull/3609) Fix the NPE problem that may occur when the gateway service DefaultGatewayRouter is initialized
+ \[GATEWAY][LINKIS-3747](https://github.com/apache/linkis/pull/3747) [LINKIS-3732](https://github.com/apache/linkis/pull/3732) fixed The result of the api interface handles possible npe problems and scenarios where the status code may be incorrect
+ \[GATEWAY][LINKIS-4031](https://github.com/apache/linkis/pull/4031) Fix the problem that the gateway obtains the client's real ip incorrectly
+ \[EC-JDBC][LINKIS-3240](https://github.com/apache/linkis/pull/3240) Optimize the naming of JDBC package name
+ \[EC-JDBC][LINKIS-3796](https://github.com/apache/linkis/pull/3796) Fix JDBC engine can't handle uppercase in link protocol
+ \[EC-Python][LINKIS-3465](https://github.com/apache/linkis/pull/3465) Fix the problem that the python code parser cannot be compatible with native python decorators
+ \[EC-Hive][LINKIS-3906](https://github.com/apache/linkis/pull/3906) Fix the Txn list failure problem caused by multiple compilations under transaction table query
+ \[Entrance][LINKIS-3694](https://github.com/apache/linkis/pull/3684) Fix the problem that the log interface of EntranceRestfulApi may lose logs
+ \[Entrance][LINKIS-3713](https://github.com/apache/linkis/pull/3713) fix wrong concatenation in log printing
+ \[Label][LINKIS-4011](https://github.com/apache/linkis/pull/4011) Fix label-server label service mapper xml statement error

## Security Related
+ \[EC-JDBC][LINKIS-3826](https://github.com/apache/linkis/pull/3826) When the data source service establishes a connection, some unsafe parameters are shielded. Connection parameters

## Dependency Changes
+ \[COMMON][LINKIS-3624](https://github.com/apache/linkis/pull/3624) Upgrade the schema 1.1.2.xsd built by maven to 2.1.1.xsd
+ \[COMMON][LINKIS-2971](https://github.com/apache/linkis/pull/2971) remove netty-3.6.2.Final.jar dependency

## Thanks
The release of Apache Linkis 1.3.1 is inseparable from the contributors of the Linkis community, thanks to all community contributors, including but not limited to the following Contributors (in no particular order):
Alexkun, Beacontownfc, Davidhua1996, GuoPhilipse, KangTomwk, QuintinTao, aiceflower, aiceflower, 
binbinCheng, casionone, chenmutime, dingsheng339, dlimeng, gdams, guoshupei, huangKai-2323,
huangxiaopingRD, hunter-cloud09, hzdhgf, jacktao007, jackxu2011, jefftlin, legendtkl, liuzhuang2017, 
lvjianhui, mayinrain, peacewong, pjfanning, ruY9527, utopianet, ws00428637, yyuser5201314,
zhangwejun, zhangxn8, zhaoyun006, 