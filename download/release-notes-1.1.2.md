---
title: Release Notes 1.1.2
sidebar_position: 6
---

Apache Linkis(incubating) 1.1.2 includes all of [Project Linkis-1.1.2](https://github.com/apache/incubator-linkis/projects/20).


This release mainly supports simplified deployment in an environment without HDFS (supports some engines), which is convenient for more lightweight learning, use and debugging; new support for data migration tool Sqoop engine; exception handling log optimization; some security vulnerabilities Component upgrades, etc.; fix known bugs reported by the community

The main functions are as follows:
* Supports simplified deployment in an environment without HDFS (supports some engines), which is convenient for more lightweight learning, use and debugging
* Added support for data migration tool Sqoop engine
* Optimize logs, etc. to improve the efficiency of troubleshooting
* Fix the security issues of interfaces such as user unauthorized access
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
-

---
## New Feature
* \[Deployment][[Linkis-1804,1811,1841,1843,1846,1933]](https://github.com/apache/incubator-linkis/pull/1804) Support for downsizing without HDFS Deployment (supports some engines), which is convenient for more lightweight learning, use and debugging.
* \[PS][[Linkis-1949]](https://github.com/apache/incubator-linkis/pull/1949) Add the list interface (/listundone) of unfinished jobs, and optimize query performance by timing scheduling
* \[BML][[Linkis-1811,1843]](https://github.com/apache/incubator-linkis/pull/1843) BML material service adds support for local file system storage mode deployment
* \[Common][[Linkis-1887]](https://github.com/apache/incubator-linkis/pull/1887) RPC module Sender supports modifying parameters such as load balancing Ribbon
* \[Common][[Linkis-2059]](https://github.com/apache/incubator-linkis/issues/2059) use task task id as trace id in logs
* \[EC][[Linkis-1971]](https://github.com/apache/incubator-linkis/pull/1971) EC AsyncExecutor supports setting the number of parallel Job Groups
* \[Engine][[Linkis-2109]](https://github.com/apache/incubator-linkis/pull/2109) Added support for data migration tool Sqoop engine

## Enhancement
* \[ECP][[Linkis-2074]](https://github.com/apache/incubator-linkis/issues/2074) Flink engine supports custom configuration
* \[Deployment][[Linkis-1841]](https://github.com/apache/incubator-linkis/pull/1841) Support user deployment to disable Spark/Hive/HDFS environment detection
* \[Deployment][[Linkis-1971]](https://github.com/apache/incubator-linkis/pull/1989) Fix the problem of automatically getting ip error when deploying on multiple NIC machines
* \[Entrance][[Linkis-1941]](https://github.com/apache/incubator-linkis/pull/1941) Entrance supports passing raw jobId to EngineConn and LinkisManager
* \[Entrance][[Linkis-2045]](https://github.com/apache/incubator-linkis/issues/2045) Refactor the matching relationship between script type and run type in EntranceInterceptor implementation class
* \[RPC][[Linkis-1903]](https://github.com/apache/incubator-linkis/pull/1903/files) Modify the exception handling logic of the RPC module to transparently transmit the original error message of the EngineConnPlugin exception
* \[RPC][[Linkis-1905]](https://github.com/apache/incubator-linkis/pull/1905) Add parameters to support passing LoadBalancer parameters, such as Ribbon
* \[Orchestrator][[Linkis-1937]](https://github.com/apache/incubator-linkis/pull/1937) The orchestrator task scheduler creator configuration parameter supports configuring multiple creator values
* \[PE][[Linkis-1959](https://github.com/apache/incubator-linkis/pull/1959) ContextService adds necessary log printing to facilitate error troubleshooting
* \[EC][[Linkis-1942]](https://github.com/apache/incubator-linkis/pull/1942) EC supports inserting taskID into the conf of the underlying engine, which is convenient for task bloodline analysis Associated with a specific linkis task
* \[EC][[Linkis-1973]](https://github.com/apache/incubator-linkis/pull/1973) The execution error log acquisition method of Task is changed from cat to tail -1000 to control the number of logs and avoid Load large files in full
* \[CG,PE][[Linkis-2014]](https://github.com/apache/incubator-linkis/pull/2014) Add configuration add/get/delete, optimize synchronization lock
* \[Common][[Linkis-2016]](https://github.com/apache/incubator-linkis/pull/2016) Adjust the use of cglib dependencies, replace cglib dependencies with spring built-in cglib
* \[Gateway][[Linkis-2071]](https://github.com/apache/incubator-linkis/issues/2071) Add GatewayURL attribute value to HTTP request Header

## Bugs Fix
* \[Engine][[Linkis-1931]](https://github.com/apache/incubator-linkis/pull/1931) Fix Python error loading is the function of Pyspark, not the function problem of stand-alone Python itself
* \[Deployment][[Linkis-1853]](https://github.com/apache/incubator-linkis/pull/1853) Fix the problem of DDL error during installation initialization
* \[UDF][[Linkis-1893]](https://github.com/apache/incubator-linkis/pull/1893) Add user permission check for udf related interfaces
* \[EC][[Linkis-1933]](https://github.com/apache/incubator-linkis/pull/1933) Increase the write permission of resultSet for users who are not in the deploy user group to execute jobs
* \[EC][[Linkis-1846]](https://github.com/apache/incubator-linkis/pull/1846) Fix ResultSet configuration local path is invalid
* \[EC][[Linkis-1966]](https://github.com/apache/incubator-linkis/pull/1966) Replace System.ev with System.properties
* \[EC-Python][[Linkis-2131]](https://github.com/apache/incubator-linkis/pull/2131) Fix Python engine exception caused by pandas
* \[PS][[Linkis-1840]](https://github.com/apache/incubator-linkis/pull/1840) When downloading data in csv format, add flexible options to prevent data format disorder
* \[Orchestrator][[Linkis-1992]](https://github.com/apache/incubator-linkis/pull/1992) fix concurrency issue with Orchestrator Reheater module
* \[PE][[Linkis-2032]](https://github.com/apache/incubator-linkis/pull/2032) The configuration interface is optimized. When obtaining the configuration parameters of the Label, modify it to directly obtain the Key-value right
* \[Web][[Linkis-2036]](https://github.com/apache/incubator-linkis/pull/2036) Instance display problem of ECM page of management console is fixed
* \[Web][[Linkis-1895]](https://github.com/apache/incubator-linkis/pull/1895) Resource page display bug fix
* \[ECP][[Linkis-2027]](https://github.com/apache/incubator-linkis/pull/2027) Fix abnormal error caused by ECP material download byte interception
* \[ECP][[Linkis-2088]](https://github.com/apache/incubator-linkis/pull/2088) Fix the problem of progress rollback during hive task running
* \[ECP][[Linkis-2090]](https://github.com/apache/incubator-linkis/pull/2090) Fix Python3 can't find the problem
* \[CG][[Linkis-1751]](https://github.com/apache/incubator-linkis/pull/1751) Script custom variable run type and suffix constraint configuration
* \[CG][[Linkis-2034]](https://github.com/apache/incubator-linkis/pull/2034) fix for mismatched descriptions of timed out tasks
* \[CG][[Linkis-2100]](https://github.com/apache/incubator-linkis/pull/2100) Optimize db deadlock problem under high concurrency


## Security related
* \[UDF][[Linkis-1893]](https://github.com/apache/incubator-linkis/pull/1893) Fix some udf interfaces (/udf/list, /udf/tree/add, /udf /tree/update) user override problem
* \[PS][[Linkis-1869]](https://github.com/apache/incubator-linkis/pull/1869) Fix Linkis PlublicService related interface override issue
* \[PS][[Linkis-2086]](https://github.com/apache/incubator-linkis/pull/2086) The method /updateCategoryInfo adds permission check

## Dependency changes
* \[MDS][[Linkis-1947]](https://github.com/apache/incubator-linkis/pull/1947) mysql-connector-java upgraded from 5.1.34 to 8.0.16
* \[ECP][[Linkis-1951]](https://github.com/apache/incubator-linkis/pull/1951) hive-jdbc upgraded from 1.2.1 to 2.3.3
* \[ECP][[Linkis-1968]](https://github.com/apache/incubator-linkis/pull/1974) protobuf-java version upgrade to 3.15.8
* \[ECP][[Linkis-2021]](https://github.com/apache/incubator-linkis/pull/2021) remove some redundant dependencies of Flink module
* \[RPC][[Linkis-2018]](https://github.com/apache/incubator-linkis/pull/2018) unified version of json4s
* \[Web][[Linkis-2336]](https://github.com/apache/incubator-linkis/pull/2336) Introduce the dependency of the web component jsencrypt-3.2.1 as a login password encryption and decryption tool

## Thanks
The release of Apache Linkis(incubating) 1.1.2 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors, including but not limited to the following Contributors (in no particular order): Alexyang, Casion, David hua, GodfreyGuo, Jack Xu , Zosimer, allenlliu, casionone, ericlu, huapan123456, husofskyzy, iture123, legendtkl, luxl@chinatelecom.cn, maidangdang44, peacewong, pengfeiwei, seedscoder, weixiao, xiaojie19852006, めぐみん, Li Wei