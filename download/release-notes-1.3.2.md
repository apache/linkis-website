---
title: Release Notes 1.3.2
sidebar_position: 91
---

Apache Linkis 1.3.2 includes all [Project Linkis-1.3.2](https://github.com/apache/linkis/projects/24)

Linkis 1.3.2 mainly adds the following functions: the Spark engine is enhanced to support the Spark task submission jar package function; The UDF loading is optimized to support loading UDF function through UDF ID. Integrated OceanBase database and supported the use of OceanBase database through data source function; In addition, tags and Eureka have been enhanced to support multi-task fixed EC execution and Eureka reporting version metadata.

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

## new features
- \[EC-Spark][LINKIS-3421](https://github.com/apache/linkis/issues/3421) Spark submits jar (engineConnMode is once)
- \[EC-UDF][LINKIS-3427](https://github.com/apache/linkis/issues/3427) Load specific UDFs as needed
- \[ECM][LINKIS-3392](https://github.com/apache/linkis/issues/3392) isolate new extended ECM
- \[LM][LINKIS-3393](https://github.com/apache/linkis/issues/3393) Close all idle Engines whose status is "Unlock"
- \[ENTRANCE][LINKIS-3496](https://github.com/apache/linkis/issues/3496) When creating a group to determine maxRunningJob, exclude Entrance whose status is offned
- \[ENTRANCE][LINKIS-3807](https://github.com/apache/linkis/issues/3807) The linkis entry should support the creator's ip whitelist access restriction
- \[COMMON][LINKIS-3497](https://github.com/apache/linkis/issues/3497) supports CommonVars hot loading function

## Enhancement points
- \[ORCHESTRATOR][LINKIS-3717](https://github.com/apache/linkis/issues/3717) performance optimization, delete synchronous waiting operation when marking cache
- \[ECM][LINKIS-3760](https://github.com/apache/linkis/issues/3760) Added the ability to clean up all EngineConns on an EngineConnManager
- \[LM][LINKIS-3719](https://github.com/apache/linkis/issues/3719) RM resource operation optimization, using bit segment lock
- \[ENTRANCE][LINKIS-3391](https://github.com/apache/linkis/issues/3391) The historical task list supports searching by entrance instance
- \[ENTRANCE][LINKIS-3389](https://github.com/apache/linkis/issues/3389) support userCreator tag and tenant tag management
- \[LM][LINKIS-3390](https://github.com/apache/linkis/issues/3390) Optimize the retry message and remove the case where the number of resources is negative
- \[DMS][LINKIS-2719](https://github.com/apache/linkis/issues/2719) Add HDFS datasource to datasource module
- \[DMS][LINKIS-2718](https://github.com/apache/linkis/issues/2718) data source module supports Mongodb
- \[COMMON][LINKIS-3896](https://github.com/apache/linkis/issues/3896) support setting run_today_h variable
- \[EC][LINKIS-3899](https://github.com/apache/linkis/issues/3899) When EC exits, report the final exit status
- \[ORCHESTRATOR][LINKIS-3900](https://github.com/apache/linkis/issues/3900) Optimize instance and executor cache synchronization locks in Orchestrator by using concurrent collections
- \[EC-Shell][LINKIS-3902](https://github.com/apache/linkis/issues/3902) Shell EC engine supports concurrent execution of tasks
- \[LM][LINKIS-3987](https://github.com/apache/linkis/issues/3987) The maximum resource of ECM, in addition to the configuration resource mode, add the actual resource mode of the machine
- \[GATEWAY][LINKIS-3988](https://github.com/apache/linkis/issues/3988) Gateway log supports printing request IP and routing IP
- \[EUREKA][LINKIS-3989](https://github.com/apache/linkis/issues/3989) Eureka metadata supports uploading version information
- \[ENTRANCE][LINKIS-3990](https://github.com/apache/linkis/issues/3990) Entrance supports resetting running task state on startup
- \[MDS][LINKIS-4012](https://github.com/apache/linkis/issues/4012) metadata module supports checking if partition exists interface
- \[LM][LINKIS-4065](https://github.com/apache/linkis/issues/4065) LinkisManager supports displaying the percentage of hive resources in the yarn queue
- \[ENTRANCE][LINKIS-4066](https://github.com/apache/linkis/issues/4066) Entrance supports viewing more tasks and EngineConns statistics
- \[EC-JDBC][LINKIS-3521](https://github.com/apache/linkis/issues/3521) optimize JDBC EC connection cache key logic
- \[WEB][LINKIS-3446](https://github.com/apache/linkis/issues/3446) Global historical result set - result set page sliding optimization

## Bugs function
- \[EC][LINKIS-3718](https://github.com/apache/linkis/issues/3718) client uses ticketId as unique credential
- \[WEB][LINKIS-3444](https://github.com/apache/linkis/issues/3444) Fixed the problem of embedding multi-layer headers when searching for UDF/Function
- \[WEB][LINKIS-3445](https://github.com/apache/linkis/issues/3445) Fix Explorer, when switching administrator view, some instance data is displayed as undefined
- \[GATEWAY][LINKIS-3898](https://github.com/apache/linkis/issues/3898) Fix the OOM problem that may be caused by token cache
- \[PS][LINKIS-4050](https://github.com/apache/linkis/issues/4050) When starting the node, the context CS service cleans up the resource error
- \[EC-Spark][LINKIS-4053](https://github.com/apache/linkis/issues/4053) OutOfMemory of Spark EC metaspace does not cause EC to exit
- \[EC][LINKIS-4117](https://github.com/apache/linkis/issues/4117) Optimize the defect of only judging the state when the idle engine exits

## Thanks
The release of Apache Linkis 1.3.2 is inseparable from the contributors of the Linkis community, thanks to all community contributors, including but not limited to the following Contributors (in no particular order):1Teng, aiceflower, Alexkun, Beacontownfc, binbinCheng, casionone, CharlieYan24, chenmutime, FinalTarget, geekmu9527, GuoPhilipse, guoshupei, huangKai-2323, hunter-cloud09, ichenfeiyang, jacktao007, jackxu2011, legendtkl, liaotian1005, mayinrain, peacewong, pjfanning, QuantumXiecao, rarexixi, utopianet, ws00428637.