---
title: Release Notes 1.1.0-RC1
sidebar_position: 8
--- 

Apache Linkis(incubating) 1.1.0 includes all of [Project Linkis-1.1.0](https://github.com/apache/incubator-linkis/projects/14).

This version is the first version of Linkis entering Apache incubation. It mainly completes the ASF infrastructure construction, including license improvement/package name modification, etc. In addition, features such as EngineConn support for Operators are added, and bugs in version 1.0.3 reported by the community are fixed.

The following key features are added: 
* Provide data-source management service, support CURD operation and connectivity test of data source through RestFul API;
* Provide metadata management service, support querying metadata through RestFul interface, components include [hive\kafka\mysql\es];
* Provide data-source and metadata management client;
* Provide linkis web for data-source manage;
* Add spotless plugin to format java code


Abbreviations:
- CGS: Computation Governance Services
- PES: Public Enhancement Services
- MGS: Microservice Governance Services
- EC:  Engineconn
- ECM: EngineConnManager
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
---

## New Feature

* \[DMS-Common][[Linkis-1335]](https://github.com/apache/incubator-linkis/pull/1335) Add new module linkis-datasource-manager-common
* \[Commons][[Linkis-1339]](https://github.com/apache/incubator-linkis/pull/1339)  Add knife4j to linkis so that user can use apiDoc during development and debugging code
* \[DMS-Server][[Linkis-1352]](https://github.com/apache/incubator-linkis/pull/1352)  Add new module linkis-datasource-manager-server 
* \[MDS-Common][[Linkis-1356]](https://github.com/apache/incubator-linkis/pull/1356) Add new module linkis-metadata-manager-common
* \[MDS-Server][[Linkis-1356]](https://github.com/apache/incubator-linkis/pull/1356) Add new module linkis-metadata-manager-server
* \[MDS-Services][[Linkis-1366]](https://github.com/apache/incubator-linkis/pull/1366) Add new module linkis-metadata-manager-service-es
* \[MDS-Services][[Linkis-1368]](https://github.com/apache/incubator-linkis/pull/1368) Add new module linkis-metadata-manager-service-hive
* \[MDS-Services][[Linkis-1371]](https://github.com/apache/incubator-linkis/pull/1371) Add new module linkis-metadata-manager-service-kafka
* \[MDS-Services][[Linkis-1373]](https://github.com/apache/incubator-linkis/pull/1373) Add new module linkis-metadata-manager-service-mysql
* \[DMS&MDS-Client][[Linkis-1418]](https://github.com/apache/incubator-linkis/pull/1418) [[Linkis-1434]](https://github.com/apache/incubator-linkis/pull/1434)[[Linkis-1438]](https://github.com/apache/incubator-linkis/pull/1438)[[Linkis-1441]](https://github.com/apache/incubator-linkis/pull/1441) Add new module linkis-datasource-client
* \[DMS&MDS-Web][[Linkis-1456]](https://github.com/apache/incubator-linkis/pull/1456) [[Linkis-1510]](https://github.com/apache/incubator-linkis/pull/1510)add linkis datasource web

---

## Enhancement
* \[MGS-LinkisServiceGateway][[Linkis-1377]](https://github.com/apache/incubator-linkis/pull/1377) involve skywalking agent for linkis services 
* \[Commons][[Linkis-1378]](https://github.com/apache/incubator-linkis/pull/1378)[[Linkis-1389]](https://github.com/apache/incubator-linkis/pull/1389)  add spotless plugin to format code
* \[CGS-EngineConnPlugin][[Linkis-1408]](https://github.com/apache/incubator-linkis/pull/1408) Reduce the maximum idle time of engine resources
* \[CGS-EngineConnPlugin][[Linkis-1535]](https://github.com/apache/incubator-linkis/pull/1535) set the value of JAVA_ENGINE_REQUEST_INSTANCE is constant 1 
* \[DB][[Linkis-1554]](https://github.com/apache/incubator-linkis/pull/1554)[[Linkis-1651]](https://github.com/apache/incubator-linkis/pull/1651)  Add DataSource DDL and DML SQL
* \[MDS] [[Linkis-1583]](https://github.com/apache/incubator-linkis/pull/1583) Add feature to fetch properties of partition in Hive datasource and fix connection problem
* \[MGS-LinkisServiceGateway][[Linkis-1636]](https://github.com/apache/incubator-linkis/pull/1636) Use regex to match against gateway URLs, if matched, let them pass
* \[DMS&MDS] [[Linkis-1637]](https://github.com/apache/incubator-linkis/pull/1637) Add Unit Test For DataSource-1.1.0
* \[DMS&MDS-Client] [[Linkis-1643]](https://github.com/apache/incubator-linkis/pull/1643)  optimize datasource client unnecessary parameters and uniform dataSourceId parameter name 
* \[DMS&MDS] [[Linkis-1660]](https://github.com/apache/incubator-linkis/pull/1660) use spring-boot-starter-jetty(wip) 
* \[DMS&MDS] [[Linkis-1717]](https://github.com/apache/incubator-linkis/pull/1717) adjust module order to avoid missing server/* datasource lib

---
## Bugs Fix
* \[Deployment][[Linkis-1390]](https://github.com/apache/incubator-linkis/pull/1390)  fix the issue 1314 which is a bug, create the resultset path in install script to make sure all dss users can access this path
* \[Commons][[Linkis-1469]](https://github.com/apache/incubator-linkis/pull/1469) fix issue #1358, when sql contains ';', the SQL cannot be cut correctly  
* \[MGS-LinkisServiceGateway][[Linkis-1508]](https://github.com/apache/incubator-linkis/pull/1508) Fix issue knife4j will cause an exception to the gateway startup
* \[CGS-EngineConnPlugin-JDBC][[Linkis-1529]](https://github.com/apache/incubator-linkis/pull/1529) Fix the issue of JDBC engine execution error:21304, Task is Failed,errorMsg: NullPointerException: #1421
* \[Commons][[Linkis-1530]](https://github.com/apache/incubator-linkis/pull/1530) Fix jetty conflict issue,exclude jetty import in spring-jetty
* \[CGS-Entrance][[Linkis-1540]](https://github.com/apache/incubator-linkis/pull/1540) [fix #1538] Fix bug of "kill" method in linkis-entrance to support null param "taskID"
* \[Commons][[Linkis-1600]](https://github.com/apache/incubator-linkis/pull/1600) Fix this isse caused by the low version of commons-compress
* \[CGS-Client][[Linkis-1603]](https://github.com/apache/incubator-linkis/pull/1603) fix client unsupport -runtimeMap param 
* \[CGS-EngineConnPlugin-JDBC][[Linkis-1610]](https://github.com/apache/incubator-linkis/pull/1610) fix jdbc engine postgresql unsupport sql "show databases;" lead to exec fail
* \[Commons][[Linkis-1618]](https://github.com/apache/incubator-linkis/pull/1618) fix [Bug] The xml annotation of the Message object should be removed #1607
* \[CGS-EngineConnPlugin-JDBC][[Linkis-1646]](https://github.com/apache/incubator-linkis/pull/1646) fix the value is displayed as the object address when the JDBC engine queries complex type fields.
* \[CGS-EngineConnPlugin-PYTHON][[Linkis-1731]](https://github.com/apache/incubator-linkis/pull/1731) Fix the problem that the result set field row of the python engine's showDF function is reversed 

## other
*  \[Commons][[Linkis-1397]](https://github.com/apache/incubator-linkis/pull/1397) Add maven wrapper
* \[EC][[Linkis-1425]](https://github.com/apache/incubator-linkis/pull/1425) unify the log config file of ec to log4j2.xml
* \[ALL][[Linkis-1571]](https://github.com/apache/incubator-linkis/pull/1571) adjust distribution.xml:exclude unnecessary dependency
* \[MDS&DMS][[Linkis-1599]](https://github.com/apache/incubator-linkis/pull/1599)  Add new 3rd party apps add license file   

---------

## Credits 

The release of Apache Linkis(incubating) 1.1.0 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors! 