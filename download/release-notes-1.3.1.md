---
title: Release Notes 1.3.1-RC1
sidebar_position: 0.16
---

Apache Linkis(incubating) 1.3.1 includes all [Project Linkis-1.3.0](https://github.com/apache/incubator-linkis/projects/23).

Linkis 1.3.1 mainly supports Trino engine and SeaTunnel engine. Added management console data source management module. And enhanced data sources, including oracle, kingbase, postgresql, sqlserver, db2, greenplum, dm.

The main functions are as follows:

* Added support for Trino engine
* Added support for SeaTunnel engine
* Added management console data source management
* Added JDBC engine features to support Trino-driven query progress
* Data source enhancement oracle, kingbase, postgresql, sqlserver, db2, greenplum, dm

abbreviation:
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

## new features

+ \[DMS][LINKIS-2961](https://github.com/apache/incubator-linkis/pull/2961) Data source management supports multiple environments
+ \[EC][LINKIS-3458](https://github.com/apache/incubator-linkis/pull/3458) Add Seatunnel engine
+ \[MDS][LINKIS-3457](https://github.com/apache/incubator-linkis/pull/3457) Add doris/clickhouse to Linkis metadata query
+ \[DMS][LINKIS-3839](https://github.com/apache/incubator-linkis/pull/3839) Add necessary audit logs for data sources
+ \[EC-TRINO][LINKIS-2639](https://github.com/apache/incubator-linkis/pull/2639) add Trino engine
+ \[ECP][LINKIS-3836](https://github.com/apache/incubator-linkis/pull/3836) merge ECP service into appmanager
+ \[EC][LINKIS-3381](https://github.com/apache/incubator-linkis/pull/3381) The GetEngineNode interface supports returning complete EC information


## Enhancement points

+ \[EC][LINKIS-2663](https://github.com/apache/incubator-linkis/pull/2663) remove subtask logic
+ \[COMMON][LINKIS-3697](https://github.com/apache/incubator-linkis/pull/3697) optimize Linkis script
+ \[MDS/DMS][LINKIS-3613](https://github.com/apache/incubator-linkis/pull/3613) Adjust the metadata service architecture and add support for HDFS types in the data source
+ \[DMS][LINKIS-3803](https://github.com/apache/incubator-linkis/pull/3803) optimize DsmQueryProtocol
+ \[DMS][LINKIS-3505](https://github.com/apache/incubator-linkis/pull/3505) Add new interface for Qualitis
+ \[DEPLOY][LINKIS-3500](https://github.com/apache/incubator-linkis/pull/3500) support startup script compatible with multiple service names
+ \[COMMON/PE][LINKIS-3349](https://github.com/apache/incubator-linkis/pull/3349) Add a utility class to determine if OS user exists

## Repair function
+ \[WEB][LINKIS-2921](https://github.com/apache/incubator-linkis/pull/2921) batch close tasks
+ \[COMMON][LINKIS-2971](https://github.com/apache/incubator-linkis/pull/2971) remove netty-3.6.2.Final.jar dependency
+ \[EC-JDBC][LINKIS-3240](https://github.com/apache/incubator-linkis/pull/3240) fix JDBC executor directory
+ \[COMMON][LINKIS-3430](https://github.com/apache/incubator-linkis/pull/3430) After the repair engine fails to start, reuse the engine configuration when restarting
+ \[COMMON][LINKIS-3234](https://github.com/apache/incubator-linkis/pull/3234) fix link-storage hadoop checksum issue
+ \[][LINKIS-3347](https://github.com/apache/incubator-linkis/pull/3347) Fix StorageResultSetWriter close method does not support repeated calls
+ \[COMMON][LINKIS-3352](https://github.com/apache/incubator-linkis/pull/3352) Fix excel export: decimalType cannot be recognized and calculated
+ \[EC][LINKIS-3752] (https://github.com/apache/incubator-linkis/pull/3752) Fix the inaccurate query result of EC history list
+ \[DEPLOY][LINKIS-3726](https://github.com/apache/incubator-linkis/pull/3726) keep all registered service instances
+ \[EC-JDBC][LINKIS-3796](https://github.com/apache/incubator-linkis/pull/3796) handle the case where mysql link starts with JDBC
+ \[EC-JDBC][LINKIS-3826](https://github.com/apache/incubator-linkis/pull/3826) handle mysql connection parameters
+ \[PE/PS][LINKIS-3440](https://github.com/apache/incubator-linkis/pull/3440) Refactor some methods to prevent sql injection
+ \[PE][LINKIS-3438](https://github.com/apache/incubator-linkis/pull/3438) update error sql and remove redundant method
+ \[EC][LINKIS-3552](https://github.com/apache/incubator-linkis/pull/3552) fix ES EC actuator directory

## Acknowledgments
The release of Apache Linkis(incubating) 1.3.1 is inseparable from the contributors of the Linkis community, thanks to all community contributors, including but not limited to the following Contributors (in no particular order):
AaronLinOops, Alexkun, jacktao007, legendtkl, peacewong, casionone, QuintinTao, cydenghua, jackxu2011, ruY9527, huiyuanjjjjuice, binbinCheng, yyuser5201314, Beacontownfc, duhanmin, whiterxine, aiceflower, weipengfei-sj, zhaoyun006, CCweixiao, Beacontownfc, mayinrain