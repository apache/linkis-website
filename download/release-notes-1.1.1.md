---
title: Release Notes 1.1.1
sidebar_position: 7
---

Apache Linkis(incubating) 1.1.1 includes all of [Project Linkis-1.1.1](https://github.com/apache/incubator-linkis/projects/18).


This release mainly supports the functions of UDF multi-version control and UDF storage to BML; the submission task supports the collection and viewing of Yarn queue resource usage statistics; new support for the data virtualization engine openLooKeng; and known bugs reported by the community are fixed.

The following key features have been added:
* Support proxy user mode, user A can perform tasks on behalf of user B, one proxy user can proxy multiple users
* Support UDF multi-version control and UDF storage to BML features
* Submission of tasks supports the collection of Yarn queue resource usage statistics and the visual view of the management console page
* Added support for data virtualization engine openLooKeng

abbreviation:
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM: Linkis Manager

---

## New Feature

* \[Gateway&Entrance][[Linkis-1608]](https://github.com/apache/incubator-linkis/pull/1608) Support proxy user mode, user A can perform tasks on behalf of user B, query user B's Related data, a proxy user can proxy multiple users
* \[LM-ResourceManager][[Linkis-1616]](https://github.com/apache/incubator-linkis/pull/1616) The resource address configuration of YARN ResourceManager supports high-availability multi-address configuration, the current YARN ResourceManager conversion When the status or stop, the master node will be resolved from the high-availability address list to continue to provide services
* \[EC-openLooKeng][[Linkis-1639]](https://github.com/apache/incubator-linkis/issues/1639) Added support for data virtualization engine openLooKeng
* \[UDF][[Linkis-1534]](https://github.com/apache/incubator-linkis/pull/1534) Support UDF multi-version control and UDF storage to BML, submit tasks support Yarn queue resources Use statistics collection and management console page visualization
* \[Client][[Linkis-1718]](https://github.com/apache/incubator-linkis/issues/1718) The Linkis-cli client supports submitting Once type tasks, which will only run once after the engine process is started Task, automatically destroyed after the task is over
* \[ECP][[Linkis-1758]](https://github.com/apache/incubator-linkis/issues/1758) Add engine material refresh interface, support to refresh engine material resources through http interface call

## Enhancement

* \[Gateway][[Linkis-1430]](https://github.com/apache/incubator-linkis/issues/1430) For the Token authentication method, the Token acquisition is adjusted from the configuration file to the database table
* \[Entrance][[Linkis-1642]](https://github.com/apache/incubator-linkis/pull/1642) Optimize the excel export interface resultsetToExcel: support passing the number of rows of downloaded data
* \[Entrance][[Linkis-1733]](https://github.com/apache/incubator-linkis/pull/1733) Add support for more default time variables related to run_date
* \[Entrance][[Linkis-1794]](https://github.com/apache/incubator-linkis/pull/1794) Add to limit the data size of a single row in the result set, and optimize the OOM problem caused by large result sets
* \[DMS-Common][[Linkis-1757]](https://github.com/apache/incubator-linkis/issues/1757) Support to configure Hive metadata administrator, administrators can obtain hive's metadata through the interface Metadata information for all library tables
* \[Common][[Linkis-1799]](https://github.com/apache/incubator-linkis/pull/1799) Optimize the segmentation of service logs: adjust the log history segmentation time from one day to one hour
* \[Common][[Linkis-1921]](https://github.com/apache/incubator-linkis/pull/1921) Optimize Jackson's dependency management: manage jackson dependencies uniformly through jackson-bom, and upgrade to Version 2.11.4
* \[ECM][[Linkis-1779]](https://github.com/apache/incubator-linkis/issues/1779) Optimize the status monitoring logic of ECM instances, and increase the judgment of heartbeat reporting time. The fix may be due to Eureka performance issues leading to misjudgment issues
* \[ECM][[Linkis-1930]](https://github.com/apache/incubator-linkis/pull/1930) ECM resource is not checked when optimizing resource check
* \[Web][[Linkis-1596]](https://github.com/apache/incubator-linkis/issues/1596) Optimize the use of the interface for viewing the task log of the management console, and fix the log cannot be used for the running job Timely refresh display issues
* \[Web][[Linkis-1650]](https://github.com/apache/incubator-linkis/issues/1650) linkis console - global history page, support to filter historical task data by creator information search


## Bugs Fix

* \[Entrance][[Linkis-1623]](https://github.com/apache/incubator-linkis/issues/1623) Fix LogPath and ResultSetPath incorrectly use submitUser as executeUser
* \[Entrance][[Linkis-1640]](https://github.com/apache/incubator-linkis/issues/1640) Fix LogReader using singleton InputStream, there is log loss, unable to read the latest persistent log The problem
* \[Entrance][[Linkis-2009]](https://github.com/apache/incubator-linkis/issues/2009) Fix the problem of memory leak caused by not closing thread resources in Entrance service
* \[Entrance][[Linkis-1901]](https://github.com/apache/incubator-linkis/issues/1901) Replaced the cache in EntranceFactory with Guava Cache, fixed that the user modified the concurrency parameter and it could not take effect The problem
* \[Entrance][[Linkis-1986]](https://github.com/apache/incubator-linkis/issues/1986) Fix the abnormal number of lines obtained in the Entrance real-time log, resulting in the duplicated log obtained
* \[ECM][[Linkis-1714]](https://github.com/apache/incubator-linkis/pull/1714) Optimize EC by reducing EC Java default memory size and adding retry log for EC application The abnormal problem of "Cannot allocate memory" appears
* \[ECM][[Linkis-1806]](https://github.com/apache/incubator-linkis/pull/1806) Optimize the life cycle processing logic of EC, when ECM starts EC due to insufficient queue resources and timeout When the status is Failed, kill the EC process
* \[Common][[Linkis-1721]](https://github.com/apache/incubator-linkis/pull/1721) Fixed the issue that hdfsFileSystem was not refreshed when Kerberos authentication failed
* \[UDF][[Linkis-1728]](https://github.com/apache/incubator-linkis/pull/1728) Optimize /api/rest_j/v1/udf/all API interface for occasional queries time consuming problem
* \[Config][[Linkis-1859]](https://github.com/apache/incubator-linkis/issues/1859) Fix the problem of abnormal primary key duplication in the console parameter configuration saveFullTree interface
* \[Clinet][[Linkis-1739]](https://github.com/apache/incubator-linkis/pull/1739) Fix the ujes-client request, the parameter spelling error caused the parameter transmission to fail
* \[Client][[Linkis-1783]](https://github.com/apache/incubator-linkis/pull/1783) Fix the problem that the default configuration of the task creator creator parameter does not take effect
* \[Client][[Linkis-1821]](https://github.com/apache/incubator-linkis/pull/1821) Fix ujes-client request entity class GetTableStatisticInfoAction parameter is missing
* \[EC][[Linkis-1765]](https://github.com/apache/incubator-linkis/issues/1765) Fix the blocking problem that EC triggers tryShutdown when the task is running
* \[LM-AppManager][[Linkis-1814]](https://github.com/apache/incubator-linkis/pull/1814) Fix the response information returned by the createEngineConn interface of EngineRestfulApi is incorrect, resulting in NPE in client calls The problem.
* \[Web][[Linkis-1972]](https://github.com/apache/incubator-linkis/pull/1972) Remove the dss related interface code left but not used by the management console for historical reasons
* \[EC-Spark][[Linkis-1729]](https://github.com/apache/incubator-linkis/pull/1729) Add SparkPreExecutionHook function, compatible with the old package name before Linkis (com.webank.wedatasphere .linkis)
* \[EC-JDBC][[Linkis-1851]](https://github.com/apache/incubator-linkis/issues/1851) Fix the jdbc engine, the problem that there are multiple sql statements in one task execution cannot be executed normally
* \[EC-JDBC][[Linkis-1961]](https://github.com/apache/incubator-linkis/issues/1851) Fix the problem that the log cannot be printed normally due to the SLF4J dependency problem when the jdbc engine starts
* \[Gateway][[Linkis-1898]](https://github.com/apache/incubator-linkis/pull/1898) Fix the problem that the initial domain name cannot be set when the GatewaySSOUtils user successfully logs in to generate a cookie

## Others 
* \[License][[Linkis-2110]](https://github.com/apache/incubator-linkis/issues/2110) Removed the binary file .mvn/wrapper/maven-wrapper.jar in the source code, and adjusted the LICENSE content related to .mvn/*
* \[License][[Linkis-2113]](https://github.com/apache/incubator-linkis/pull/2113) Upgrade py4j-0.10.7-src.zip to py4j-0.10.9.5-src.zip, update the license files of py4j-*.src and adjust it location, from linkis-engineconn-plugins/engineconn-plugins/python /src/main/py4j/LICENSE-py4j-0.10.7-src.txt moved to licenses/LICENSE-py4j-0.10.9.5-src.txt for easy viewing
* Fixed the issue of using Window's line endings format CTRL in the release source code of shell script:mvnw


## Credits 

The release of Apache Linkis(incubating) 1.1.1 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors, including but not limited to the following Contributors: AbnerHung, Alexkun, barry8023, CCweixiao, Davidhua1996, Fuu3214, Liveipool, casinoone, demonray , husofskyzy, jackxu2011, legendtkl, lizheng920625, maidangdang44, peacewong, seedscoder