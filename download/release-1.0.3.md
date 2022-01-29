---
title: Linkis Release-1.0.3
sidebar_position: 9
--- 
Use the links below to download the Apache Linkis from one of our mirrors.

| Date | Version | Remarks | Download |
|:-----|:-------|:------|:-------|
| 2022-01-28| 1.0.3 | Source | [[Source](https://www.apache.org/dyn/closer.lua/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-src.tar.gz)] [[Sign](https://downloads.apache.org/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-src.tar.gz.asc)] [[SHA512](https://downloads.apache.org/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-src.tar.gz.sha512)] |
| | | Binary Package | [[Binary](https://www.apache.org/dyn/closer.lua/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-bin.tar.gz)] [[Sign](https://downloads.apache.org/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-bin.tar.gz.asc)] [[ SHA512](https://downloads.apache.org/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-bin.tar.gz.sha512)] |
| | | Web Package | [[Binary](https://www.apache.org/dyn/closer.lua/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-web-bin.tar.gz)] [[Sign](https://downloads.apache.org/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-web-bin.tar.gz.asc )] [[SHA512](https://downloads.apache.org/incubator/linkis/release-1.0.3/apache-linkis-1.0.3-incubating-web-bin.tar.gz.sha512)] |

## Release Notes

Apache Linkis(incubating) 1.0.3 includes all of [Project Linkis-1.0.3](https://github.com/apache/incubator-linkis/projects/13).

This version is the first version of Linkis entering Apache incubation. It mainly completes the ASF infrastructure construction including license improvement/package name modification, etc., adds EngineConn support for Operator and other features, and fixes community feedback about 1.0.2 version bugs.

The following key features are added: 
* the http restful api uses springmvc instead of jersey
* replace codehaus json with fastxml json
* support of EngineConn/OnceEngineConn common operators
* support proxy user with kerberos


Abbreviations:
- CGS: Computation Governance Services
- PES: Public Enhancement Services
- MGS: Microservice Governance Services

---

## New Feature

* \[CGS&PES&MGS][[Linkis-1002]](https://github.com/apache/incubator-linkis/pull/1002) the http restful api uses springmvc instead of jersey
* \[CGS&PES&MGS][[Linkis-1038]](https://github.com/apache/incubator-linkis/pull/1038) replace codehaus json with fastxml json
* \[CGS-Engineconn][[Linkis-1027]](https://github.com/apache/incubator-linkis/pull/1027) support proxy user with kerberos
* \[CGS-LinkisManager][[Linkis-1043]](https://github.com/apache/incubator-linkis/pull/1043) support engine operator
* \[CGS-LinkisOnceEngineconn][[Linkis-946]](https://github.com/apache/incubator-linkis/pull/946) support IP address for service discovery service call
* \[CGS-LinkisOnceEngineconn][[Linkis-1078]](https://github.com/apache/incubator-linkis/pull/1078) support of EngineConn/OnceEngineConn common operators



---

## Enhancement
* \[Commons][[Linkis-1026]](https://github.com/apache/incubator-linkis/pull/1026) enhancement of data export to excel 
* \[Commons][[Linkis-1036]](https://github.com/apache/incubator-linkis/pull/1036) file permission optimization of local file/IO proxy mode
* \[Commons][[Linkis-1185]](https://github.com/apache/incubator-linkis/pull/1185) add some code specification checking rules
* \[Orchestrator][[Linkis-1183]](https://github.com/apache/incubator-linkis/pull/1183) optimize computation orchestrator code
* \[MGS-LinkisServiceGateway][[Linkis-1064]](https://github.com/apache/incubator-linkis/pull/1064) support whitelist api configuration that can be called without user login verification 
* \[CGS-EngineConnManager][[Linkis-1030]](https://github.com/apache/incubator-linkis/pull/1030) transfer custom env from ecm to engine
* \[CGS-EngineConnPlugin] [[Linkis-1083]](https://github.com/apache/incubator-linkis/pull/1083) unify the exception class of engineConnPlugin in one package
* \[CGS-EngineConnPlugin][[Linkis-1203]](https://github.com/apache/incubator-linkis/pull/1203) optimize the logic of tag update/delete
* \[CGS-EngineConnPlugin-Flink][[Linkis-1069]](https://github.com/apache/incubator-linkis/pull/1069) add kafka,json and hadoop-mapreduce-client-core jar in flink engine
* \[CGS-EngineConnPlugin-JDBC] [[Linkis-1117]](https://github.com/apache/incubator-linkis/pull/1117) support kerberos auth type for linkis jdbc
* \[CGS-EngineConnManager][[Linkis-1167]](https://github.com/apache/incubator-linkis/pull/1167) processEngineConnLaunch add support for JAVA_HOME environment variable
* \[CGS-ComputationClient][[Linkis-1126]](https://github.com/apache/incubator-linkis/pull/1126) support python matplotlib to display pictures
* \[CGS-Entrance][[Linkis-1206]](https://github.com/apache/incubator-linkis/pull/1206) optimize entrance logic and add taskID to distinguish tasks
* \[CGS-LinkisManager][[Linkis-1209]](https://github.com/apache/incubator-linkis/pull/1209) optimize multiple features of manager common
* \[CGS-LinkisManager][[Linkis-1213]](https://github.com/apache/incubator-linkis/pull/1213) optimized support for relationship between the long-lived label and the node not be deleted
* \[PES-PublicService][[Linkis-1211]](https://github.com/apache/incubator-linkis/pull/1211) optimize the jobhistory update logic
* \[PES-Metadata][[Linkis-1224]](https://github.com/apache/incubator-linkis/pull/1224) optimize the login user association limit of the query results of the datasource/dbs http interface

---
## Bugs Fix
* \[DB][[Linkis-1053]](https://github.com/apache/incubator-linkis/pull/1053) fix the data insertion may fail due to the length of the database table field
* \[DB][[Linkis-1087]](https://github.com/apache/incubator-linkis/pull/1087) delete duplicate DDL
* \[Commons][[Linkis-1058]](https://github.com/apache/incubator-linkis/pull/1058) fix upload cannot be compressed when there are subdirectories
* \[Commons][[Linkis-1223]](https://github.com/apache/incubator-linkis/pull/1223) upgrade log4j version to 2.17.0
* \[Commons][[Linkis-1052]](https://github.com/apache/incubator-linkis/pull/1052) fix cause failure to get routing instances when the hostname starts with the application name
* \[CGS-LinkisManager][[Linkis-1014]](https://github.com/apache/incubator-linkis/pull/1014) fix wrong usage of object equality judgment
* \[CGS-LinkisManager][[Linkis-1054]](https://github.com/apache/incubator-linkis/pull/1054) fix instance label parase failed when hostname contains servicename.
* \[CGS-LinkisManager][[Linkis-1074]](https://github.com/apache/incubator-linkis/pull/1074) fixes a NPE of http api 'rm/userresources'
* \[CGS-LinkisManager][[Linkis-1101]](https://github.com/apache/incubator-linkis/pull/1101) fix the issue that the monitor stops the engine when the engine does not exist
* \[CGS-LinkisManager][[Linkis-1210]](https://github.com/apache/incubator-linkis/pull/1210) fix the bug about instance check and engine label exclusion
* \[CGS-LinkisManager][[Linkis-1214]](https://github.com/apache/incubator-linkis/pull/1214) fix multiple Bugs with high concurrency in RM　module
* \[CGS-LinkisManager][[Linkis-1216]](https://github.com/apache/incubator-linkis/pull/1216) remove node monitor moduler from am
* \[CGS-LinkisManager][[Linkis-1222]](https://github.com/apache/incubator-linkis/pull/1222) add successful and failed ecm registration responses 
* \[MGS-LinkisServiceGateway][[Linkis-1093]](https://github.com/apache/incubator-linkis/pull/1093) fix the permission bypass bug that may be caused by the pass auth uri being empty characters
* \[MGS-LinkisServiceGateway][[Linkis-1105]](https://github.com/apache/incubator-linkis/pull/1105) modify the weak password problem of the default test account of linkis
* \[MGS-LinkisServiceGateway][[Linkis-1234]](https://github.com/apache/incubator-linkis/pull/1234) fix this issue that memory leak problem of SSO login 
* \[CGS-Common][[Linkis-1199]](https://github.com/apache/incubator-linkis/pull/1199) fix issue SqlCodeParser has a bug that splits the escaped ";" into multiple SQL
* \[CGS-Entrance][[Linkis-1073]](https://github.com/apache/incubator-linkis/pull/1073) fix http api 'entrance/{id}/killJobs' exception caused by unused parameters {id}
* \[CGS-Entrance][[Linkis-1106]](https://github.com/apache/incubator-linkis/pull/1106) varSubstitutionInterceptor get code type bug fix
* \[CGS-Entrance][[Linkis-1149]](https://github.com/apache/incubator-linkis/pull/1149) fix the problem of after the job task completed,the front cannot obtain the progess info data
* \[CGS-Entrance][[Linkis-1205]](https://github.com/apache/incubator-linkis/pull/1205) fix oom bug for LogWirter
* \[CGS-EngineConnPlugin][[Linkis-1113]](https://github.com/apache/incubator-linkis/pull/1113) fix the sql statement error when the bml resource data record is updated
* \[CGS-EngineConnPlugin-JDBC] [[Linkis-923]](https://github.com/apache/incubator-linkis/pull/923) fix a bug that JDBC engine connection url is not configured
* \[CGS-EngineConnPlugin-Spark][[Linkis-1017]](https://github.com/apache/incubator-linkis/pull/1017) fixes a spark3 engine compilation error
* \[CGS-EngineConnPlugin-Flink][[Linkis-1128]](https://github.com/apache/incubator-linkis/pull/1129) fix flink engine insert problem 
* \[CGS-EngineConnPlugins-Hive][[Linkis-1231]](https://github.com/apache/incubator-linkis/pull/1231) fix the progress bug of the engine pushing multiple sub-job
* \[PEC-BmlServer][[Linkis-1155]](https://github.com/apache/incubator-linkis/pull/1155) fix the problem of using mysql reserved words in sql statement
* \[PEC-CSServer][[Linkis-1160]](https://github.com/apache/incubator-linkis/pull/1160) fix NPE in CsJobListener
* \[Orchestrator][[Linkis-1179]](https://github.com/apache/incubator-linkis/pull/1179) fix the bug caused by the concurrency of orchestrator
* \[Orchestrator][[Linkis-1186]](https://github.com/apache/incubator-linkis/pull/1186) fix the issue that the tasks queued by orchestrator cannot be killed
* \[Console][[Linkis-1121]](https://github.com/apache/incubator-linkis/pull/1121) get protocol from current request,remove hard code of 'http'



## Others
* \[Commons&MGS-LinkisServiceGateway][[Linkis-1192]](https://github.com/apache/incubator-linkis/pull/1092) third-party dependencies of mysql-connector-java which violates apache licensing policy, because of the apache licensing policy, project cannot dependency on mysql-connector-java, if only for your own project used, you can rely on mysql-connector-java in your own project.
* \[Commons&MGS-LinkisEureka][[Linkis-1291]](https://github.com/apache/incubator-linkis/pull/1291) remove the jar package io.github.x-stream with unclear license attribution category:mxparser
* \[Commons][[Linkis-1287]](https://github.com/apache/incubator-linkis/pull/1287) split binary distribution package and source code LICENSE/NOTICE and some other files
* \[Console][[Linkis-1301]](https://github.com/apache/incubator-linkis/pull/1301) remove font files with unknown license authorization and front-end resource files such as unused image icons
* \[CGS-EngineConnPlugins-Python][[Linkis-1281]](https://github.com/apache/incubator-linkis/pull/1281) remove pyspark.zip from source code and add py4j LICENSE.txt

---------

## Credits 

The release of Apache Linkis(incubating) 1.0.3 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors! 