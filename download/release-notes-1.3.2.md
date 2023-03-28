---
title: Release Notes 1.3.2
sidebar_position: 0.15
---

Apache Linkis 1.3.2 includes all [Project Linkis-1.3.2](https://github.com/apache/linkis/projects/24)

Linkis 1.3.2 mainly enhanced Spark engine and added the function of ETL through json and jar package submission by Spark. In addition, the UDF loading was optimized.

The main functions are as follows:

- Added the function for Spark to submit Jar packages
- Allows the UDF to be loaded using the specified UDF ID configured in the background
- Support for multi-task fixed EC execution
- Support Eureka for reporting version metadata
- Linkis integrates the OceanBase database

Abbreviations:
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

---

## New Feature

- \[EC-Spark][LINKIS-3435](https://github.com/apache/linkis/issues/3435)  add a new Executor (json ETL)
- \[EC-Spark][LINKIS-3421](https://github.com/apache/linkis/issues/3421)  spark submit jar (engineConnMode is once)
- \[EC-UDF][LINKIS-3427](https://github.com/apache/linkis/issues/3427)  Load specific udfs as we needed
- \[ECM][LINKIS-3392](https://github.com/apache/linkis/issues/3392)  New expanded ECMs should be isolated
- \[LM][LINKIS-3393](https://github.com/apache/linkis/issues/3393)  Need a method to kill all idle engines with status 'Unlock'
- \[ENTRANCE][LINKIS-3496](https://github.com/apache/linkis/issues/3496) When determining the maxRunningJob on creating a group, offlined entrance nodes should be excluded
- \[ENTRANCE][LINKIS-3807](https://github.com/apache/linkis/issues/3807)  linkis-entrance should support restriction of visit by ip whitelist of creator
- \[COMMON][LINKIS-3497](https://github.com/apache/linkis/issues/3497)  CommonVars should support hot-reload feature

## Enhancement

- \[ORCHESTRATOR][LINKIS-3717](https://github.com/apache/linkis/issues/3717)  Performance optimization, remove the synchronization wait operation of mark cache
- \[ECM][LINKIS-3760](https://github.com/apache/linkis/issues/3760)  Add support for cleaning all EngineConns in one EngineConnManager
- \[WEB][LINKIS-3759](https://github.com/apache/linkis/issues/3759)  Some page English internationalization support
- \[WEB][LINKIS-3758](https://github.com/apache/linkis/issues/3758) Add support for searching history codes
- \[LM][LINKIS-3719](https://github.com/apache/linkis/issues/3719)  RM resource operation optimization lock bit segment lock
- \[ENTRANCE][LINKIS-3391](https://github.com/apache/linkis/issues/3391) Linkis job list should support search by entrance
- \[ENTRANCE][LINKIS-3389](https://github.com/apache/linkis/issues/3389)  Add link management of userCreator label and tenant label
- \[LM][LINKIS-3390](https://github.com/apache/linkis/issues/3390)  Retry message needs to be optimized
- \[DMS][LINKIS-2719](https://github.com/apache/linkis/issues/2719)  Add hdfs data source to the data source module
- \[DMS][LINKIS-2718](https://github.com/apache/linkis/issues/2718) Add mongodb data source to datasource module
- \[COMMON][LINKIS-3896](https://github.com/apache/linkis/issues/3896) The run_today_h variable should need to support setting
- \[EC][LINKIS-3899](https://github.com/apache/linkis/issues/3899)  Report the final exit status when EC exits
- \[ORCHESTRATOR][LINKIS-3900](https://github.com/apache/linkis/issues/3900) Synchronization locks optimized for concurrent collections
- \[EC-Shell][LINKIS-3902](https://github.com/apache/linkis/issues/3902)  Shell EC supports concurrent execution
- \[LM][LINKIS-3987](https://github.com/apache/linkis/issues/3987)  MaxResource of ECM should consider the machine's really resources
- \[GATEWAY][LINKIS-3988](https://github.com/apache/linkis/issues/3988)  Gateway should print the ip of request in logs
- \[EUREKA][LINKIS-3989](https://github.com/apache/linkis/issues/3989)  Eureka should support metadata like version
- \[ENTRANCE][LINKIS-3990](https://github.com/apache/linkis/issues/3990)  Entrance should reset the status of running tasks on startup
- \[MDS][LINKIS-4012](https://github.com/apache/linkis/issues/4012)  Metadata module should provide a method to examine whether a partition exists
- \[LM][LINKIS-4065](https://github.com/apache/linkis/issues/4065)  linkismanager should provide percentage of hive resource in the yarn queue
- \[ENTRANCE][LINKIS-4066](https://github.com/apache/linkis/issues/4066)  Need more statistics of task and EngineConns
- \[EC-JDBC][LINKIS-3521](https://github.com/apache/linkis/issues/3521)  JDBC EC connection cache key logic suggested optimization
- \[WEB][LINKIS-3446](https://github.com/apache/linkis/issues/3446)  Global History-Result Set - The result set supports left and right slider optimization

## Bugs Fix
- \[EC][LINKIS-3718](https://github.com/apache/linkis/issues/3718)  Once job client obtains EngineConn information, it should use ticketId as the unique key
- \[WEB][LINKIS-3444](https://github.com/apache/linkis/issues/3444)  UDF/Function Management-Enter any value in the name search box and press Enter，the embedded linkis header information will be displayed
- \[WEB][LINKIS-3445](https://github.com/apache/linkis/issues/3445)  Resource Manager-When switch administrator view, some instances data were displayed as undefined
- \[WEB][LINKIS-3443](https://github.com/apache/linkis/issues/3443)  kill the data service in the query, resubmit, and the result set returned by the new task is abnormal
- \[GATEWAY][LINKIS-3898](https://github.com/apache/linkis/issues/3898) Token authorization should not save session data
- \[PS][LINKIS-4050](https://github.com/apache/linkis/issues/4050)  context service clear wrong resource when initing the node
- \[EC-Spark][LINKIS-4053](https://github.com/apache/linkis/issues/4053)  Spark EC will not exit on OutOfMemory of metaspace
- \[EC][LINKIS-4117](https://github.com/apache/linkis/issues/4117)  The idle exit of the concurrent engine cannot only judge the state

## Thanks
The release of Apache Linkis 1.3.2 is inseparable from the contributors of the Linkis community, thanks to all community contributors, including but not limited to the following Contributors (in no particular order):1Teng, aiceflower, Alexkun, Beacontownfc, binbinCheng, casionone, CharlieYan24, chenmutime, FinalTarget, geekmu9527, GuoPhilipse, guoshupei, huangKai-2323, hunter-cloud09, ichenfeiyang, jacktao007, jackxu2011, legendtkl, liaotian1005, liaotian1005, mayinrain, peacewong, pjfanning, QuantumXiecao, rarexixi, utopianet, ws00428637.