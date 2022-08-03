---
title: Release Notes 1.1.3
sidebar_position: 0.2
---

Apache Linkis(incubating) 1.1.3 includes all of [Project Linkis-1.1.3](https://github.com/apache/incubator-linkis/projects/19).


This release mainly integrates Prometheus to provide the basic capability of monitoring on linkis microservice; add task retries parameter for task submission; add records for the relationship between tasks and execution EC; Flink engine supports downloading Yarn logs to EC log directory; front-end page Support watermark; upgrade some security vulnerability components, etc.; fix known bugs reported by the community.

The main functions are as follows:
* Integrate prometheus to provide basic capability of monitoring on linkis microservice
* Task submission supports the parameter of the number of task retries
* Flink engine supports downloading Yarn logs to EC log directory
* Some dependency package upgrades and community-known bug fixes

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
* \[Common][[Linkis-1656]](https://github.com/apache/incubator-linkis/issues/1656) Integrate prometheus to provide basic capability for linkis microservice monitoring
* \[EC-Flink][[Linkis-2241]](https://github.com/apache/incubator-linkis/pull/2241) Add Yarn Log Operator to support downloading Yarn logs to EC log directory
* \[Web][[Linkis-2235]](https://github.com/apache/incubator-linkis/issues/2108) Front-end page supports watermark
* \[Entrance][[Linkis-2164]](https://github.com/apache/incubator-linkis/pull/2164) Entrance supports the parameter of task retry times
* \[EC][[Linkis-2163]](https://github.com/apache/incubator-linkis/pull/2163) Add task and execution EC records, EC information is recorded in the task's Metrics field

## Enhancement
* \[ECM][[Linkis-2243]](https://github.com/apache/incubator-linkis/pull/2243) Optimize the newly registered ECM service, optimize the service load selection logic, reduce the possible impact of new service availability issues
* \[PS-Jobhistory][[Linkis-2198]](https://github.com/apache/incubator-linkis/pull/2198) Optimize task code cache file name, increase time format length, to avoid conflicts in long tasks execution
* \[EC-Python][[Linkis-2175]](https://github.com/apache/incubator-linkis/pull/2175) Add py4j watchdog thread to monitor java process, preventing the case that java process quit abnormally, while python process doesn't quite
* \[Common][[Linkis-2150]](https://github.com/apache/incubator-linkis/pull/2150) Both common and entry modules have custom variable substitution logic, thus merge them into the common module as optimization
* \[EC-JDBC][[Linkis-2142]](https://github.com/apache/incubator-linkis/pull/2142) Fix the problem that the JDBC Engine console configuration cannot take effect immediately after modification (cache time is adjusted to configurable item)
* \[Entrance][[Linkis-2160]](https://github.com/apache/incubator-linkis/pull/2160) The consumption queue for task submission supports configuring specific high-volume users
* \[PE][[Linkis-2200]](https://github.com/apache/incubator-linkis/pull/2200) Tag code optimization, remove the persistence of tag key-value
* \[EC][[Linkis-1749]](https://github.com/apache/incubator-linkis/issues/1749) When EC starts, make it possible to limit the port segment of the specified service through parameters
* \[Common-Storage][[Linkis-2168]](https://github.com/apache/incubator-linkis/pull/2168) File type in FileSource supports variable configuration
* \[Common-Storage][[Linkis-2161]](https://github.com/apache/incubator-linkis/pull/2161) Added support for formatting parameters automatically when exporting the result set to an excel file
* \[Gateway][[Linkis-2249]](https://github.com/apache/incubator-linkis/pull/2249) Optimize the gateway's Parser logic code
* \[Web][[Linkis-2248]](https://github.com/apache/incubator-linkis/pull/2248) User resource display page is sorted by user and creator
* \[Web][[Linkis-2108]](https://github.com/apache/incubator-linkis/issues/2108) Optimize the front-end page layout, unify the basic style, and optimize the secondary menu display
* \[Install][[Linkis-2319]](https://github.com/apache/incubator-linkis/pull/2319) Adjust the datasource service deployment mode, and it is enabled by default; when installing, configure the initial login password
* \[Install][[Linkis-2421]](https://github.com/apache/incubator-linkis/pull/2421) When installing and deploying, configure kerberos-related authentication information
* \[EC][[Linkis-2159]](https://github.com/apache/incubator-linkis/pull/2159) EC log log supports scrolling by size and time
* \[Common-Scheduler][[Linkis-2272]](https://github.com/apache/incubator-linkis/pull/2272) Optimized code format and added LoopArray unit test
* \[PS-ContextService][[Linkis-2234]](https://github.com/apache/incubator-linkis/pull/2234) Added a method for batch cleaning context values ​​in contextservice

## Bugs Fix
* \[EC][[Linkis-2275]](https://github.com/apache/incubator-linkis/pull/2275) Fix the problem that the EC engine heartbeat report log feild is too long in abnormal scenarios to cause storage failure
* \[Web][[Linkis-2239]](https://github.com/apache/incubator-linkis/pull/2239) Fix yarm queue resource idle/busy state usage ratio ring chart is not displayed correctly
* \[PS-ContextService][[Linkis-2226]](https://github.com/apache/incubator-linkis/pull/2226) Fix FileReader and BufferedReader resources not released in final
* \[Install][[Linkis-2203]](https://github.com/apache/incubator-linkis/pull/2203) The problem of shell script authorization +x permission failure occurs when compiling in different systems
* \[Entrance][[Linkis-2237]](https://github.com/apache/incubator-linkis/pull/2237) Refactor JobQueueLabel and JobRunningLabel, fix task queue label and task running label bug
* \[Build][[Linkis-2354]](https://github.com/apache/incubator-linkis/pull/2354) Fix the ERROR level warning problem when compiling and packaging projects under WIN system
* \[Gateway][[Linkis-2329]](https://github.com/apache/incubator-linkis/pull/2329) Fix the configuration problem of LDAP integration
* \[Entrance][[Linkis-2238]](https://github.com/apache/incubator-linkis/pull/2238) Optimize the result set path to be separated by date to solve the problem of too many subdirectories in a single folder. The resustset path is in the same folder, such as "/tmp/linkis/hadoop/linkis/20220516_210525/IDE/40099", which may cause too many files in one folder
* \[Entrance][[Linkis-2162]](https://github.com/apache/incubator-linkis/pull/2162) Optimize the result set path to be separated by date to solve the problem of too many subdirectories in a single folder
* \[Common][[Linkis-2332]](https://github.com/apache/incubator-linkis/pull/2332) Close the SpringCloud default configuration center to reduce the interference of unnecessary log information
* \[Web][[Linkis-2295]](https://github.com/apache/incubator-linkis/pull/2295) remove redundant code in web install script

## Security related
* \[PS-Jobhistory][[Linkis-2248]](https://github.com/apache/incubator-linkis/pull/2248) Added parameter verification to the task query list interface to prevent sql injection security issues
* \[PS-PublicService][[Linkis-1949]](https://github.com/apache/incubator-linkis/pull/2235) /api/rest_j/v1/datasource/columns interface adds user permission check

## Dependency changes
* \[Common][[Linkis-2188]](https://github.com/apache/incubator-linkis/pull/2188) Bump poi 5.2.1 to poi 5.2.2, fix possible memory allocation problems
* \[Common][[Linkis-2182]](https://github.com/apache/incubator-linkis/pull/2182) Bump gson:2.8.5 to gson:2.8.9

## Thanks
The release of Apache Linkis(incubating) 1.1.3 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors, including but not limited to the following Contributors (in no particular order): Alexkun, CCweixiao, Davidhua1996, QuintinTao, caseone, det101 , doroxinrui, huiyuanjjjjuice, husofskyzy, hzdhgf, jackxu2011, legendtkl, liuyou2, peacewong, pjfanning, ruY9527, saLeox, seayi, wForget, wallezhang, yyuser5201314