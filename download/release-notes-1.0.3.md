---
title: Release Notes 1.0.3
sidebar_position: 9
--- 

Apache Linkis(incubating) 1.0.3 includes all of [Project Linkis-1.0.3](https://github.com/apache/incubator-linkis/projects/13).

This version is the first version of Linkis entering Apache incubation. It mainly completes the ASF infrastructure construction including license improvement/package name modification, etc., adds EngineConn support for Operator and other features, and fix community feedback about 1.0.2 version bugs.

The following key features are added: 
* the http restful api uses springmvc instead of jersey
* replace codehaus json with fastxml json
* support of EngineConn/OnceEngineConn common operators
* support proxy user with kerberos


Abbreviations:
- CGS: Computation Governance Services
- PES: Public Enhancement Services
- MGS: Microservice Governance Services
- EC: Engineconn
- ECM: EngineConnManager
---

## New Feature

* \[CGS&PES&MGS][[Linkis-1002]](https://github.com/apache/incubator-linkis/pull/1002) Http restful api style uses springmv mode to replace jersey, uses spring's DispatcherServletweb, web interface annotation method Unite
* \[CGS&PES&MGS][[Linkis-1038]](https://github.com/apache/incubator-linkis/pull/1038) Upgrade codehaus json to stable mainstream fastxml json version
* \[CGS-Engineconn][[Linkis-1027]](https://github.com/apache/incubator-linkis/pull/1027) Support using Hadoop's proxyuser mechanism to access kerberos-enabled Hadoop clusters
* \[CGS-EngineConnManager][[Linkis-1248]](https://github.com/apache/incubator-linkis/pull/1248) The function of ECM to get EC logs, you can get all logs of all ECs when EC is running or stopped
* \[CGS-LinkisManager][[Linkis-1043]](https://github.com/apache/incubator-linkis/pull/1043) Support engine operator, the client can perform specific operations on EngineConn through the engine operator and return result
* \[CGS-LinkisOnceEngineconn][[Linkis-946]](https://github.com/apache/incubator-linkis/pull/946) Support hostname and IP address for eureka service discovery and service invocation to satisfy k8s Containerized deployment scenarios
* \[CGS-LinkisOnceEngineconn][[Linkis-1078]](https://github.com/apache/incubator-linkis/pull/1078) Support EngineConn/OnceEngineConn general operator, providing basic capabilities for docking streaming computing engines


---

## Enhancement
* \[Commons][[Linkis-1026]](https://github.com/apache/incubator-linkis/pull/1026) Optimize of data export to excel, better support for numeric fields
* \[Commons][[Linkis-1036]](https://github.com/apache/incubator-linkis/pull/1036) File permission optimization of shared file system in LocalFileSystem mode
* \[Commons][[Linkis-1185]](https://github.com/apache/incubator-linkis/pull/1185) Add some scala code specification checking rules to automatically detect scala code specification
* \[Orchestrator][[Linkis-1183]](https://github.com/apache/incubator-linkis/pull/1183) Optimize the code with high cyclic complexity of the calculation orchestrator and the Map problem under high concurrency ,
* \[MGS-LinkisServiceGateway][[Linkis-1064]](https://github.com/apache/incubator-linkis/pull/1064) Supports the whitelist configuration of http api, which can be called without user login authentication
* \[CGS-EngineConnManager][[Linkis-1030]](https://github.com/apache/incubator-linkis/pull/1030) Transfer custom environment variables from ecm to engine
* \[CGS-EngineConnPlugin] [[Linkis-1083]](https://github.com/apache/incubator-linkis/pull/1083) Unify and optimize the engineConnPlugin exception class
* \[CGS-EngineConnPlugin][[Linkis-1203]](https://github.com/apache/incubator-linkis/pull/1203) Optimize tag update/delete logic
* \[CGS-EngineConnPlugin-JDBC] [[Linkis-1117]](https://github.com/apache/incubator-linkis/pull/1117) Support kerberos authentication type of linkis jdbc
* \[CGS-EngineConnPlugin-Flink] [[Linkis-1070]](https://github.com/apache/incubator-linkis/pull/1070) Optimize the submission of jar applications in prod mode, and optimize the kill of the calculation executor operate
* \[CGS-EngineConnPlugin-Flink] [[Linkis-1248]](https://github.com/apache/incubator-linkis/pull/1248) FlinkOnceJob supports executing collections, showing the syntax of flinkSQL
* \[CGS-EngineConnManager][[Linkis-1167]](https://github.com/apache/incubator-linkis/pull/1167) processEngineConnLaunch Add support for JAVA_HOME environment variable
* \[CGS-ComputationClient][[Linkis-1126]](https://github.com/apache/incubator-linkis/pull/1126) support python matplotlib to display images
* \[CGS-Entrance][[Linkis-1206]](https://github.com/apache/incubator-linkis/pull/1206) Optimize the logic of entry and add taskID to distinguish tasks
* \[CGS-LinkisManager][[Linkis-1209]](https://github.com/apache/incubator-linkis/pull/1209) Optimize multiple functions commonly used by manager: add update and startup time attributes to node objects /yarn resource acquisition method
* \[CGS-LinkisManager][[Linkis-1213]](https://github.com/apache/incubator-linkis/pull/1213) Optimize the relationship between long-lived tags and undeletable nodes
* \[PES-PublicService][[Linkis-1211]](https://github.com/apache/incubator-linkis/pull/1211) Optimize jobhistory database information update logic, remove practice, and add retry logic
* \[PES-Metadata][[Linkis-1224]](https://github.com/apache/incubator-linkis/pull/1224) Optimize the datasource/dbs http interface query result and the login user association limit, which can be configured by Whether the file is opened or not

---
## Bugs Fix
* \[DB][[Linkis-1053]](https://github.com/apache/incubator-linkis/pull/1053) Fix the problem that data insertion may fail due to too long database table field length
* \[DB][[Linkis-1087]](https://github.com/apache/incubator-linkis/pull/1087) Remove duplicate DDL statements
* \[Commons][[Linkis-1058]](https://github.com/apache/incubator-linkis/pull/1058) When uploading materials, when there are subdirectories, it cannot be compressed and the upload fails
* \[Commons][[Linkis-1223]](https://github.com/apache/incubator-linkis/pull/1223) Upgrade log4j version to 2.17.0
* \[Commons][[Linkis-1052]](https://github.com/apache/incubator-linkis/pull/1052) Fixed not getting route instance when hostname starts with application name
* \[CGS-LinkisManager][[Linkis-1014]](https://github.com/apache/incubator-linkis/pull/1014) Fix the wrong usage of object equality judgment
* \[CGS-LinkisManager][[Linkis-1054]](https://github.com/apache/incubator-linkis/pull/1054) Fix instance label parsing failure when hostname contains service name.
* \[CGS-LinkisManager][[Linkis-1074]](https://github.com/apache/incubator-linkis/pull/1074) Fix NPE issue with http api 'rm/userresources'
* \[CGS-LinkisManager][[Linkis-1101]](https://github.com/apache/incubator-linkis/pull/1101) Fix the problem that the monitor stops the engine when the engine does not exist
* \[CGS-LinkisManager][[Linkis-1210]](https://github.com/apache/incubator-linkis/pull/1210) Fix instance check and engine tag exclusion bug
* \[CGS-LinkisManager][[Linkis-1214]](https://github.com/apache/incubator-linkis/pull/1214) Fix multiple RM modules high concurrency bug
* \[CGS-LinkisManager][[Linkis-1216]](https://github.com/apache/incubator-linkis/pull/1216) Remove node monitor module from AM
* \[CGS-LinkisManager][[Linkis-1222]](https://github.com/apache/incubator-linkis/pull/1222) Add successful and failed ECM registration responses
* \[MGS-LinkisServiceGateway][[Linkis-1093]](https://github.com/apache/incubator-linkis/pull/1093) Fix the permission bypass bug that may be caused by empty characters in pass auth uri
* \[MGS-LinkisServiceGateway][[Linkis-1105]](https://github.com/apache/incubator-linkis/pull/1105) Modify linkis default test account weak password problem
* \[MGS-LinkisServiceGateway][[Linkis-1234]](https://github.com/apache/incubator-linkis/pull/1234) Fix SSO login memory leak problem
* \[CGS-Common][[Linkis-1199]](https://github.com/apache/incubator-linkis/pull/1199) Fix SqlCodeParser to escape the separator ";" into multiple SQL
* \[CGS-Entrance][[Linkis-1073]](https://github.com/apache/incubator-linkis/pull/1073) Fix http api 'entrance/{id}/killJobs' caused by unused parameters exception {ID}
* \[CGS-Entrance][[Linkis-1106]](https://github.com/apache/incubator-linkis/pull/1106) VarSubstitutionInterceptor get code type bug fix
* \[CGS-Entrance][[Linkis-1149]](https://github.com/apache/incubator-linkis/pull/1149) Fix the problem that the foreground cannot get the progress information after the job task is completed
* \[CGS-Entrance][[Linkis-1205]](https://github.com/apache/incubator-linkis/pull/1205) Fixed LogWirter's oom bug
* \[CGS-EngineConnPlugin][[Linkis-1113]](https://github.com/apache/incubator-linkis/pull/1113) Fix sql statement error when bml resource data record is updated
* \[CGS-EngineConnPlugin-JDBC] [[Linkis-923]](https://github.com/apache/incubator-linkis/pull/923) Fix the bug of connection url without JDBC engine
* \[CGS-EngineConnPlugin-Spark][[Linkis-1017]](https://github.com/apache/incubator-linkis/pull/1017) Fix spark3 engine compilation error
* \[CGS-EngineConnPlugin-Flink][[Linkis-1069]](https://github.com/apache/incubator-linkis/pull/1069) Fix Flink engine lack of dependencies such as hadoop-mapreduce-client-core ClassNotfoundException problem
* \[CGS-EngineConnPlugin-Flink][[Linkis-1128]](https://github.com/apache/incubator-linkis/pull/1129) Fix the data table information insertion problem of flink engine
* \[CGS-EngineConnPlugin-Flink][[Linkis-1304]](https://github.com/apache/incubator-linkis/pull/1304) Fix flink sql does not support multiple sql, use set, rest, drop Problems such as checkpoint failure during grammar
* \[CGS-EngineConnPlugins-Hive][[Linkis-1231]](https://github.com/apache/incubator-linkis/pull/1231) Fix the progress bug of engine pushing multiple subtasks
* \[PEC-BmlServer][[Linkis-1155]](https://github.com/apache/incubator-linkis/pull/1155) Fix the problem of using mysql reserved words in sql statements
* \[PEC-CSServer][[Linkis-1160]](https://github.com/apache/incubator-linkis/pull/1160) Fix NPE in CsJobListener
* \[Orchestrator][[Linkis-1179]](https://github.com/apache/incubator-linkis/pull/1179) Fix the bug caused by orchestrator concurrency
* \[Orchestrator][[Linkis-1186]](https://github.com/apache/incubator-linkis/pull/1186) Fix the problem that the tasks queued by Orchestrator cannot be killed
* \[Console][[Linkis-1121]](https://github.com/apache/incubator-linkis/pull/1121) Get the protocol from the current request, remove the hard code for 'http'

## other
*  ⚠ \[Commons&MGS-LinkisServiceGateway][[Linkis-1192]](https://github.com/apache/incubator-linkis/pull/1092)3rd party reliance on mysql-connector-java violates the Apache License Policy. Therefore, the dependency on mysql-connector-java has been removed from 1.0.3. If you only use it for your own project, you can add mysql-connector-java dependency to your project.
* \[Commons&MGS-LinkisEureka][[Linkis-1291]](https://github.com/apache/incubator-linkis/pull/1291) Remove the jar package io.github.x-stream with unclear license attribution category :mxparser
* \[Commons][[Linkis-1287]](https://github.com/apache/incubator-linkis/pull/1287) Split binary distribution package and source code LICENSE/NOTICE and other files
* \[Console][[Linkis-1301]](https://github.com/apache/incubator-linkis/pull/1301) Remove font files with unknown license authorization and front-end resource files such as unused image icons
* \[CGS-EngineConnPlugins-Python][[Linkis-1281]](https://github.com/apache/incubator-linkis/pull/1281) Remove the pyspark.zip in the source code and add the LICENSE.txt of py4j document

---------

## Credits 

The release of Apache Linkis(incubating) 1.0.3 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors! 