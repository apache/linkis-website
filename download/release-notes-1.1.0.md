---
title: Release Notes 1.1.0
sidebar_position: 8
--- 

Apache Linkis(incubating) 1.1.0 includes all of [Project Linkis-1.1.0](https://github.com/apache/incubator-linkis/projects/3).

This release mainly adds datasource and metadata source management services, supports metadata information query for hive/mysql/kafka/elasticsearch, and fixes bugs in version 1.0.3 reported by the community.

The following key features have been added:
* Provides Restful interface to add, delete, check, and modify data sources, as well as data source connection tests.
* Provides Restful interface for database, table, partition, column attribute query for metadata.
* Provides Java clients for data source and metadata service management.

Abbreviations:
- CGS: Computation Governance Services
- PES: Public Enhancement Services
- MGS: Microservice Governance Services
- EC: Engineconn
- ECM: EngineConnManager
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service

---


## New Feature

* \[DMS-Common][[Linkis-1335]](https://github.com/apache/incubator-linkis/pull/1335) Add a new module linkis-datasource-manager-common, add datasource data structure/exception class/util class.
* \[DMS-Common][[Linkis-1340]](https://github.com/apache/incubator-linkis/pull/1340) Add a new module linkis-metadata-manager-common, add metadata data structure/exception class/util class.
* \[MDS-Server][[Linkis-1352]](https://github.com/apache/incubator-linkis/pull/1352) Add a new module linkis-datasource-manager-server to provide data source management services, provides functions such as adding, deleting, checking, and modifying data sources through the restful interface.
* \[MDS-Server][[Linkis-1356]](https://github.com/apache/incubator-linkis/pull/1356) Add a new module linkis-metadata-manager-server to provide metadata management services, which provides database, table, and column queries of metadata through the restful interface.
* \[MDS-Services][[Linkis-1366]](https://github.com/apache/incubator-linkis/pull/1366) Add a new module linkis-metadata-manager-service-es to provide elasticsearch metadata management service.
* \[MDS-Services][[Linkis-1368]](https://github.com/apache/incubator-linkis/pull/1368) Add a new module linkis-metadata-manager-service-hive, providing for hive Metadata management service.
* \[MDS-Services][[Linkis-1371]](https://github.com/apache/incubator-linkis/pull/1371) Add a new module linkis-metadata-manager-service-kafka, providing for kafka Metadata management service.
* \[MDS-Services][[Linkis-1373]](https://github.com/apache/incubator-linkis/pull/1373) Add a new module linkis-metadata-manager-service-mysql, provide for mysql Metadata management service.
* \[DMS&MDS-Client][[Linkis-1418]](https://github.com/apache/incubator-linkis/pull/1418) [[Linkis-1434]](https://github.com/apache /incubator-linkis/pull/1434)[[Linkis-1438]](https://github.com/apache/incubator-linkis/pull/1438)[[Linkis-1441]](https://github.com /apache/incubator-linkis/pull/1441) Add a new data source management Java client module linkis-datasource-client to facilitate data source management through sdk.
* \[DMS&MDS-Web][[Linkis-1456]](https://github.com/apache/incubator-linkis/pull/1456) [[Linkis-1510] Added data source front-end management page, through which you can Simple creation and testing of the data source.
---

## Enhancement
* \[MGS-LinkisServiceGateway][[Linkis-1377]](https://github.com/apache/incubator-linkis/pull/1377) Introduce the Skywalking component to provide basic capabilities of distributed trace and troubleshooting
* \[CGS-EngineConnPlugin][[Linkis-1408]](https://github.com/apache/incubator-linkis/pull/1408) Adjust the default maximum idle time of engine resources to 0.5h to optimize multi-user scenarios Next, the problem of waiting time for resource competition
* \[CGS-EngineConnPlugin][[Linkis-1535]](https://github.com/apache/incubator-linkis/pull/1535) set JAVA_ENGINE_REQUEST_INSTANCE to constant 1
* \[DB][[Linkis-1554]](https://github.com/apache/incubator-linkis/pull/1554) Add DataSource DDL and DML SQL
* \[MDS][[Linkis-1583]](https://github.com/apache/incubator-linkis/pull/1583) Add functionality to get attributes of partitions in Hive datasources and fix connection issues
* \[MGS-LinkisServiceGateway][[Linkis-1636]](https://github.com/apache/incubator-linkis/pull/1636) use regular expression to match gateway URL, if it matches, it will pass normally
* \[Commons][[Linkis-1397]](https://github.com/apache/incubator-linkis/pull/1397) Add maven wrapper to support compiling and packaging using mvnw script
* \[EC][[Linkis-1425]](https://github.com/apache/incubator-linkis/pull/1425) Unify ec's log configuration file as log4j2.xml
* \[Install-Script][[Linkis-1563]](https://github.com/apache/incubator-linkis/pull/1563) Optimize linkis-cli client script, remove redundant linkis-cli- start script file
* \[Install-Script][[Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) Optimize the installation and deployment script, add a database connection test check when installing and deploying; Before initialization, print the information of the database so that the personnel can confirm again
* \[Install-Script][Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) Add necessary deployment log information and color identification of key information, such as execution steps/create directory log, etc.
* \[Install-Script][[Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) add basic environment check for spark/hadoop/hive
* \[Install-Script][[Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) Migrate hive metabase HIVE_META information configuration from linkis-env.sh to db. sh
* \[Commons][[Linkis-1557]](https://github.com/apache/incubator-linkis/issues/1557) Spring-boot/Spring-cloud version control uses the pom file method of the official dependency manager, Avoid introducing too many version configurations
* \[Commons][[Linkis-1621]](https://github.com/apache/incubator-linkis/pull/1621) Spring upgrade, Spring-boot upgrade to 2.3.12.RELEASE, Spring-cloud upgrade to Hoxton.SR12
* \[Commons][[Linkis-1558]](https://github.com/apache/incubator-linkis/issues/1558) Unit test JUnit 4 migration upgrade to JUnit 5
* \[Commons&MGS-Eureka][[Linkis-1313]](https://github.com/apache/incubator-linkis/issues/1313) Remove unnecessary third-party dependencies and reduce packaged materials to a certain extent package size
* \[Commons&MGS-LinkisServiceGateway][[Linkis-1660]](https://github.com/apache/incubator-linkis/pull/1660) Use spring-boot-starter-jetty to replace the direct introduction of jetty dependencies to avoid jetty version conflict
---

## Bugs Fix
* \[Deployment][[Linkis-1390]](https://github.com/apache/incubator-linkis/pull/1390) Fix the directory `wds.linkis.resultSet for storing Job result set files created during installation and deployment. store.path`, the problem of insufficient permissions after switching users during use
* \[Commons][[Linkis-1469]](https://github.com/apache/incubator-linkis/pull/1469) Fix the problem that SQL cannot be cut correctly when the ';' character is included in the sql script
* \[CGS-EngineConnPlugin-JDBC][[Linkis-1529]](https://github.com/apache/incubator-linkis/pull/1529) Fix the abnormal problem of NullPointerException in JDBC engine authentication type parameter
* \[CGS-Entrance][[Linkis-1540]](https://github.com/apache/incubator-linkis/pull/1540) Fix the "kill" method parameter long type in linkis-entrance, which causes the null value to be unrecognized question
* \[Commons][[Linkis-1600]](https://github.com/apache/incubator-linkis/pull/1600) Fix the lower version of commons-compress, resulting in an error when the result set is downloaded as excel
* \[CGS-Client][[Linkis-1603]](https://github.com/apache/incubator-linkis/pull/1603) Fix the problem that the client does not support the -runtimeMap parameter
* \[CGS-EngineConnPlugin-JDBC][[Linkis-1610]](https://github.com/apache/incubator-linkis/pull/1610) Fix jdbc engine cannot support "show databases;" statement problem for postgresql
* \[Commons][[Linkis-1618]](https://github.com/apache/incubator-linkis/pull/1618) Fix http response return result in xml format instead of json format
* \[CGS-EngineConnPlugin-JDBC][[Linkis-1646]](https://github.com/apache/incubator-linkis/pull/1646) When JDBC engine queries complex type fields, the value is displayed as object address.
* \[CGS-EngineConnPlugin-PYTHON][[Linkis-1731]](https://github.com/apache/incubator-linkis/pull/1731) Fix the problem of row inversion of the result set field of the python engine's showDF function
* \[PES-BML][[Linkis-1556]](https://github.com/apache/incubator-linkis/issues/1556) Fix the HttpMessageNotWritableException that may occur in the file download interface

---------

## Credits 

The release of Apache Linkis(incubating) 1.1.0 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors, including but not limited to the following contributors for this version: Alexkun, CCweixiao, Celebrate-future, Davidhua1996, FireFoxAhri, WenxiangFan , Zosimer, aleneZeng, casionone, dddyszy, det101, ganlangjie, huapan123456, huiyuanjjjjuice, husofskyzy, iture123, jianwei2, legendtkl, peacewong, pjfanning, silent-carbon, xiaojie19852006