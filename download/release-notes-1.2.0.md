---
title: Release Notes 1.2.0
sidebar_position: 0.18
---

Apache Linkis(incubating) 1.2.0 includes all of [Project Linkis-1.2.0](https://github.com/apache/incubator-linkis/projects/12).


This release mainly supports Presto and ElasticSearch engines for Linkis 1.X architecture, enhances JDBC engine to support configuration multiple data source, supports displaying historical engine information on web, reduced and optimized Linkis modules, improved test cases for some engines, and made a lot of bug fixes and feature improvements.

The main functions are as follows:

* Added support for Presto engine
* Added support for ElasticSearch engine
* Added features to JDBC engine to support data source mode
* Reduce and optimize Linkis modules
* Data source module interface optimization

Abbreviations:
- COMMON: Linkis Common
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

---
## New Feature
+ \[ECP-PRESTO][[LINKIS-1631]](https://github.com/apache/incubator-linkis/issues/1631) Enhance PrestoEngine, adatps to Linkis1.X architecture
+ \[ECP-ES][[LINKIS-1632]](https://github.com/apache/incubator-linkis/issues/1632) Enhance ElasticSearchEngine, adatps to Linkis1.X architecture
+ \[ECP-JDBC][[LINKIS-2092]](https://github.com/apache/incubator-linkis/issues/2092) Linkis jdbc engine supports multiple data source links
+ \[COMMON][[LINKIS-2191]](https://github.com/apache/incubator-linkis/issues/2191) Add common rest api offline for all services
+ \[CG][[LINKIS-2222]](https://github.com/apache/incubator-linkis/issues/2222) Single LinkisEntrance task metrics collection
+ \[CG][[LINKIS-2227]](https://github.com/apache/incubator-linkis/issues/2227) Add ECR history query interface
+ \[WEB][[LINKIS-2227]](https://github.com/apache/incubator-linkis/issues/2227) Support displaying history EngineConn information
+ \[CG][[LINKIS-2257]](https://github.com/apache/incubator-linkis/issues/2257) Gateway supports forwarding non-execution related requests of Entrance
+ \[CG][[LINKIS-2258]](https://github.com/apache/incubator-linkis/issues/2258) Added feature to clean up running tasks when the Entrance process exits normally
+ \[PE][[LINKIS-2277]](https://github.com/apache/incubator-linkis/pull/2277) In the workspace, files can be moved to another folder
+ \[CG][[LINKIS-2288]](https://github.com/apache/incubator-linkis/issues/2288) Added query interface for unfinished tasks
+ \[CG]\[PE][[LINKIS-2291]](https://github.com/apache/incubator-linkis/pull/2291) Entrance support isolation by routing labels
+ \[COMMON]\[CG]\[PE][[LINKIS-2320]](https://github.com/apache/incubator-linkis/issues/2320) Entrance adds restful interface to support modifying routelabel
+ \[CG]\[PE][[LINKIS-2326]](https://github.com/apache/incubator-linkis/pull/2326) Linkis tasks support automatic retry
+ \[COMMON][[LINKIS-2366]](https://github.com/apache/incubator-linkis/pull/2366) [[LINKIS-2434]](https://github.com/apache/incubator-linkis/pull/2434) Support knif4j
+ \[ECP-JDBC][[LINKIS-2392]](https://github.com/apache/incubator-linkis/pull/2392) Jdbc engine support trino
+ \[COMMON][[LINKIS-2415]](https://github.com/apache/incubator-linkis/pull/2415) Support variable operation

## Enhancement
+ \[COMMON][[LINKIS-1411]](https://github.com/apache/incubator-linkis/issues/1411) Remove sun.misc.BASE64
+ \[COMMON][[LINKIS-1475]](https://github.com/apache/incubator-linkis/issues/1475) Optimize code style
+ \[LM][[LINKIS-1763]](https://github.com/apache/incubator-linkis/issues/1763) Add non empty validation to the applicationlist interface
+ \[COMMON][[LINKIS-1824]](https://github.com/apache/incubator-linkis/issues/1824) Update commons-lang to commons-lang3
+ \[COMMON]\[CG]\[PE][[LINKIS-2077]](https://github.com/apache/incubator-linkis/issues/2077) Optimized to automatically refresh all LinkisManager caches after modifying parameters for the management console
+ \[DMS][[LINKIS-2082]](https://github.com/apache/incubator-linkis/issues/2082) DataSource Manager module optimization
+ \[ECP-JDBC][[LINKIS-2140]](https://github.com/apache/incubator-linkis/issues/2140) Consistent adjustment of JDBC connection parameters in the JDBC engine
+ \[ECP-JDBC][[LINKIS-2141]](https://github.com/apache/incubator-linkis/issues/2141) Change dbcp to druid in JDBC engine
+ \[DEPLOY][[LINKIS-2193]](https://github.com/apache/incubator-linkis/issues/2193) Add graceful upgrade script
+ \[ECP-JDBC][[LINKIS-2194]](https://github.com/apache/incubator-linkis/issues/2194) Cancel the supportedDBs in the jdbc engine ConnectionManager.java and add the parameter wds.linkis.jdbc.driver
+ \[DMS][[LINKIS-2212]](https://github.com/apache/incubator-linkis/issues/2212) Add the default DWSClientConfig constructor for LinkisDataSourceRemoteClient to simplify the client API for internal microservices to call data source services
+ \[ECP][[LINKIS-2214]](https://github.com/apache/incubator-linkis/issues/2214) In the engine material refresh interface, refeshAll and refesh are changed to refreshAll and refresh
+ \[ECP-PYTHON][[LINKIS-2216]](https://github.com/apache/incubator-linkis/issues/2216) The python plt show method directly supports display
+ \[CG][[LINKIS-2217]](https://github.com/apache/incubator-linkis/issues/2217) Added trino engine type
+ \[CG]\[ECP]\[PE][[LINKIS-2264]](https://github.com/apache/incubator-linkis/issues/2264) Module optimization reduces the number of modules
+ \[ECP-JDBC][[LINKIS-2278]](https://github.com/apache/incubator-linkis/pull/2278) Add test case for jdbc engine
+ \[DEPLOY][[LINKIS-2293]](https://github.com/apache/incubator-linkis/issues/2293) Add port check in install.sh
+ \[COMMON][[LINKIS-2299]](https://github.com/apache/incubator-linkis/pull/2299) Add built-in variables run_today_h and run_today_h_std
+ \[PE][[LINKIS-2344]](https://github.com/apache/incubator-linkis/issues/2344) Optimize metadata sql
+ \[PE][[LINKIS-2352]](https://github.com/apache/incubator-linkis/issues/2352) Optimize CS module and reduce the number of modules
+ \[CG][[LINKIS-2362]](https://github.com/apache/incubator-linkis/issues/2362) Move the linkis-engineconn-plugin-framework to linkis-cg module
+ \[PE][[LINKIS-2368]](https://github.com/apache/incubator-linkis/pull/2368) Automatically create workspace for newly added users
+ \[PACKAGE][[LINKIS-2374]](https://github.com/apache/incubator-linkis/issues/2374) Optimize of linkis assamble-combined-package module
+ \[COMMON][[LINKIS-2396]](https://github.com/apache/incubator-linkis/issues/2396) Remove the use of Logging's deprecated method
+ \[ECP-SPARK][[LINKIS-2405]](https://github.com/apache/incubator-linkis/pull/2405) Support scala multi-version of spark
+ \[ECP-SPARK][[LINKIS-2419]](https://github.com/apache/incubator-linkis/pull/2419) Remove the config SPARK_SCALA_VERSION and get the scalaVersion from env
+ \[COMMON][[LINKIS-2441]](https://github.com/apache/incubator-linkis/issues/2441) Knife4j interface document
+ \[PE-BML][[LINKIS-2450]](https://github.com/apache/incubator-linkis/issues/2450) The new storage path is optimized when the engine material is updated
+ \[PE-BML][[LINKIS-2475]](https://github.com/apache/incubator-linkis/issues/2475) Fix package name capitalization problem
+ \[CG][[LINKIS-2477]](https://github.com/apache/incubator-linkis/pull/2477) Optimize build out dependence of linkis-cg-engineconnplugin
+ \[CG]\[ECP][[LINKIS-2479]](https://github.com/apache/incubator-linkis/pull/2479) The ECM kill engine needs to be able to complete the kill of the yarn appid
+ \[MDS][[LINKIS-2481]](https://github.com/apache/incubator-linkis/issues/2481) Linkis-metadat-query-service-hive package name modification
+ \[COMMON]\[CG]\[GATEWAY][[LINKIS-2496]](https://github.com/apache/incubator-linkis/pull/2496) Opt refactor entrance bean conf
+ \[COMMON]\[CG]\[PE][[LINKIS-2508]](https://github.com/apache/incubator-linkis/pull/2508) Feature optimization that supports high concurrency
+ \[ECP-PRESTO][[LINKIS-2512]](https://github.com/apache/incubator-linkis/pull/2512) Optimize presto engineconn
+ \[WEB][[LINKIS-2524]](https://github.com/apache/incubator-linkis/pull/2524) Rename web to linkis-web
+ \[PE-BML][[LINKIS-2531]](https://github.com/apache/incubator-linkis/pull/2531) Update VersionServiceImplTest
+ \[COMMON][[LINKIS-2549]](https://github.com/apache/incubator-linkis/issues/2549) Optimize the read efficiency of the result set when the result set is output after the script is executed
+ \[ECP-SPARK]\[TEST][[LINKIS-2617]](https://github.com/apache/incubator-linkis/pull/2617) Add test case for factory launch extension
+ \[COMMON][[LINKIS-2618]](https://github.com/apache/incubator-linkis/pull/2618) Optimized module and plugin configuration
+ \[ECP-SHELL]\[TEST][[LINKIS-2620]](https://github.com/apache/incubator-linkis/pull/2620) Add test case for shell engine
+ \[ECP][[LINKIS-2628]](https://github.com/apache/incubator-linkis/issues/2628) EC Yarn app id logs should be printed to a separate log
+ \[PE-BML][[LINKIS-2633]](https://github.com/apache/incubator-linkis/issues/2633) The rollbackversion function modifies the case
+ \[PACKAGE][[LINKIS-2635]](https://github.com/apache/incubator-linkis/pull/2635) Add 1.2.0_schema file records to update changes to 1.2.0
+ \[PACKAGE][[LINKIS-2679]](https://github.com/apache/incubator-linkis/issues/2679) Optimize the default queue and hive default reduces parameters in dml
+ \[ECP-JDBC][[LINKIS-2741]](https://github.com/apache/incubator-linkis/issues/2741) The connection cache pool key value in the ConnectionManager is adjusted to the data source name and version number
+ \[ECP-JDBC][[LINKIS-2743]](https://github.com/apache/incubator-linkis/issues/2743) Jdbc data source configuration priority definition.

## Bugs Fix
+ \[PS-RM][[LINKIS-1850]](https://github.com/apache/incubator-linkis/pull/1850) Fix NullPointerException
+ \[PE][[LINKIS-1879]](https://github.com/apache/incubator-linkis/issues/1879) FileWriter and BufferedWriter are not closed in finally clause
+ \[CG][[LINKIS-1911]](https://github.com/apache/incubator-linkis/issues/1911) Fix linkis-computation-client failed to submit jobs
+ \[CG][[LINKIS-2040]](https://github.com/apache/incubator-linkis/issues/2040) Fix HDFSCacheLogWriter getOutPutStream NPE
+ \[DMS][[LINKIS-2255]](https://github.com/apache/incubator-linkis/issues/2255) The expired field is missing when querying information from a single data source
+ \[COMMON][[LINKIS-2269]](https://github.com/apache/incubator-linkis/pull/2269) Fix ddl sql bug
+ \[COMMON][[LINKIS-2314]](https://github.com/apache/incubator-linkis/issues/2314) Fix AbstractDiscovery delayTime calculate error
+ \[ECP-HIVE][[LINKIS-2321]](https://github.com/apache/incubator-linkis/issues/2321) For hive on tez tasks, the task cannot be ended correctly when canceled
+ \[PE][[LINKIS-2346]](https://github.com/apache/incubator-linkis/issues/2346) Fix the admin user get tables not return all tables
+ \[RPC][[LINKIS-2370]](https://github.com/apache/incubator-linkis/issues/2370) Fix linkis-rpc messageUtils.orderIsLast not correct
+ \[LM][[LINKIS-2372]](https://github.com/apache/incubator-linkis/pull/2372) Fix LM ec history restful bug
+ \[PE][[LINKIS-2273]](https://github.com/apache/incubator-linkis/issues/2273) Data source edit form supports Chinese and English
+ \[PACKAGE][[LINKIS-2389]](https://github.com/apache/incubator-linkis/issues/2389) Fixed the bug in the linkis-ps-metadataquery module that was missing after packaging
+ \[CG][[LINKIS-2412]](https://github.com/apache/incubator-linkis/issues/2412) Fix issue that querying ECM history, permission management fails
+ \[CG][[LINKIS-2418]](https://github.com/apache/incubator-linkis/pull/2418) Fixed the problem that the task state could not be flipped normally when thread unsafe SimpleDateFormat was used as a global variable
+ \[MDS][[LINKIS-2435]](https://github.com/apache/incubator-linkis/issues/2435) Fix NPE of metadata mysql query
+ \[GATEWAY][[LINKIS-2454]](https://github.com/apache/incubator-linkis/issues/2454) When linkis-gateway is debugged locally, knife4j-related class dependencies conflict
+ \[COMMON][[LINKIS-2456]](https://github.com/apache/incubator-linkis/issues/2456) Fix test bug
+ \[ECM][[LINKIS-2469]](https://github.com/apache/incubator-linkis/issues/2469) ECM logOperator uses wrong delimiter to get log path
+ \[PE][[LINKIS-2470]](https://github.com/apache/incubator-linkis/issues/2470) File upload Chinese name is garbled
+ \[CG][[LINKIS-2471]](https://github.com/apache/incubator-linkis/issues/2471) Orchestrator supports task wait timeout
+ \[PE][[LINKIS-2472]](https://github.com/apache/incubator-linkis/issues/2472) Throws an exception when the data is empty
+ \[ECP-SPARK][[LINKIS-2488]](https://github.com/apache/incubator-linkis/issues/2488) Fix the problem that 'CsvRelation' class cannot be serialized
+ \[COMMON][[LINKIS-2506]](https://github.com/apache/incubator-linkis/issues/2506) Upgrade 1.1.1 ddl,miss engine=innodb default charset=utf8 statement
+ \[COMMON][[LINKIS-2535]](https://github.com/apache/incubator-linkis/issues/2535) Fix call ExceptionUtils.getStackTrace NPE
+ \[PE-BML][[LINKIS-2543]](https://github.com/apache/incubator-linkis/pull/2543) Fix ps_bml_resources_version insert new version missing some information
+ \[CG]\[MDS][[LINKIS-2547]](https://github.com/apache/incubator-linkis/pull/2547) Fix MetadataQuery sql syntax error and LockManagerMapper method overload bug
+ \[COMMON][[LINKIS-2559]](https://github.com/apache/incubator-linkis/issues/2559) Fix variable substitution error
+ \[ECP-PRESTO][[LINKIS-2596]](https://github.com/apache/incubator-linkis/issues/2596) Fix presto missing dependencies when compiling package
+ \[ECP-ES][[LINKIS-2603]](https://github.com/apache/incubator-linkis/issues/2603) NoSuchMethodError for ES engine
+ \[ECP-ES][[LINKIS-2604]](https://github.com/apache/incubator-linkis/issues/2604) NumberFormatException for ES engine
+ \[PE][[LINKIS-2614]](https://github.com/apache/incubator-linkis/issues/2614) Fixed a NPE caused by a client request
+ \[COMMON][[LINKIS-2631]](https://github.com/apache/incubator-linkis/pull/2631) Fix the dead loop
+ \[ECP-SHELL][[LINKIS-2654]](https://github.com/apache/incubator-linkis/pull/2654) Fix test case for ShellEngineConnExecutor
+ \[LM][[LINKIS-2688]](https://github.com/apache/incubator-linkis/issues/2688) Upgrade the default EngineType version of the flink ec
+ \[TOOL][[LINKIS-2701]](https://github.com/apache/incubator-linkis/issues/2701) Fix github repos page License display with Unknown licenses found

## Security related
+ \[SPRING][[LINKIS-2395]](https://github.com/apache/incubator-linkis/issues/2395) SynchronossPartHttpMessageReader should only create temp directory when needed (CVE-2022-2296)

## Dependency changes
+ \[COMMON]\[CG]\[ECP][[LINKIS-2301]](https://github.com/apache/incubator-linkis/pull/2301) Update dependency to fix CVEs
+ \[CG][[LINKIS-2452]](https://github.com/apache/incubator-linkis/issues/2452) Upgrade oshi-core version

## Thanks
The release of Apache Linkis(incubating) 1.2.0 is inseparable from the contributors of the Linkis community. 
Thanks to all the community contributors, including but not limited to the following Contributors 
(in no particular order): CCweixiao, Dlimeng, QuintinTao, WenxiangFan, aiceflower, barry8023, binbinCheng,
 casionone, duhanmin, gabeng1996, huangKai-2323, huapan123456, huiyuanjjjjuice, hunter-cloud09, jackxu2011, 
 legendtkl, liangqilang, liuyou2, mindflow94, peacewong, ruY9527, seedscoder, wForget, yyuser5201314