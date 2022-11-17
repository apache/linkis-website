---
title: Release Notes 1.3.0
sidebar_position: 0.17
---

Apache Linkis(incubating) 1.3.0 includes all [Project Linkis-1.3.0](https://github.com/apache/incubator-linkis/projects/14).

The release of Linkis 1.3.0 mainly merge some services in the PES(Public Enhancement Services) service group; 
SSO login session information supports redis memory shared storage, and supports distributed deployment of gateway services;
supports the deployment of Linkis services in the Kubernetes environment, including unified image construction, complete Helm Charts, and complete testing peripherals based on Kind. In addition, some functional optimizations and bug fixes have been made.

The main functions are as follows:
* Merge ps-cs/ps-data-source-manager/ps-metadataquery services into ps-publicservice to reduce the number of services
* SSO login session information supports redis memory shared storage, and supports distributed deployment of gateway services
* Linkis unified image construction for multiple microservices, and adding actions for automatic image construction
* Added Helm Charts for deploying Linkis as a whole to Kubernetes environment
* Kind-based local Kubernetes test environment support
* Linkis microservice Remote Debug support on Kubernetes environment
* Added mirror LDH (Linkis Distribution, including Apache Hadoop) build of Hadoop ecosystem All-in-one, which supports one-click deployment of Hive/Spark and other environments and linkis services
* Optimize the performance of distributed locks of Manager, and fix the problem of slow SQL query caused by high concurrency scenarios

abbreviation:
- COMMON: Linkis Common
- ENTRANCE: Linkis Entrance
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
- DEPLOY: Linkis Deployment
- WEB: Linkis Web
- GATEWAY: Linkis Gateway
- EP: Engine Plugin

---
## New Features
+ \[DEPLOY][[LINKIS-2447]](https://github.com/apache/incubator-linkis/pull/2447) Add Dockerfile for Linkis backend and frontend service, and add maven profile to build image
+ \[DEPLOY][[LINKIS-2465]](https://github.com/apache/incubator-linkis/pull/2465) Added login-pod and remote-proxy to facilitate quick login and debugging in k8s environment
+ \[DEPLOY][[LINKIS-2478]](https://github.com/apache/incubator-linkis/pull/2478) Added Git Action for automatic image building and publishing when publishing
+ \[DEPLOY][[LINKIS-2540]](https://github.com/apache/incubator-linkis/pull/2540) Introduce LDH (Linkis Distribution, including Hadoop) image, integrate Hadoop/Spark/Flink/Hive Basic big data environment for easy experience and trial
+ \[DEPLOY][[LINKIS-3441]](https://github.com/apache/incubator-linkis/pull/3441) Add base image and introduce image cache mechanism to accelerate image build
+ \[ECP][[LINKIS-2916]](https://github.com/apache/incubator-linkis/pull/2916) Add EnginePlugin management module
+ \[CG][[LINKIS-3201]](https://github.com/apache/incubator-linkis/pull/3201) Added configuration item to support skipping Python code parsing processing
+ \[Gateway][[LINKIS-2996]](https://github.com/apache/incubator-linkis/pull/2996) SSO login session information supports Redis memory shared storage, and supports distributed deployment of gateway services
+ \[COMMON][[LINKIS-3231]](https://github.com/apache/incubator-linkis/pull/3231) Added automatic verification of SQL DDL/DML Git Action
+ \[EC-JDBC][[LINKIS-3239]](https://github.com/apache/incubator-linkis/pull/3239) Optimize the logic of JDBC parameter filling
+ \[EC-JDBC][[LINKIS-2927]](https://github.com/apache/incubator-linkis/pull/2927) Merged some services in the Public Enhancement Services service group


## Enhancement
+ \[LM][[LINKIS-2930]](https://github.com/apache/incubator-linkis/pull/2930) Optimize the performance of the Manager's distributed locks and fix slow SQL queries caused by high concurrency scenarios question
+ \[EC][[LINKIS-2709]](https://github.com/apache/incubator-linkis/pull/2709) EC log is added, which can be pushed according to fixed time interval
+ \[EC][[LINKIS-2976]](https://github.com/apache/incubator-linkis/pull/2976) Refactoring the configuration items of EngineConn
+ \[ENTRANCE][[LINKIS-2713]](https://github.com/apache/incubator-linkis/pull/2713) Optimize Entrance concurrency
+ \[Gateway][[LINKIS-2699]](https://github.com/apache/incubator-linkis/pull/2699) After the user logs in, clear the expired cookies of the Gateway to solve the problem of authentication failure
+ \[WEB][[LINKIS-2483]](https://github.com/apache/incubator-linkis/pull/2483) Linkis Web added dependencies install
+ \[EC-Python][[LINKIS-2898]](https://github.com/apache/incubator-linkis/pull/2898) Modify the implementation of PY4J_HOME to increase the testability of Python
+ \[COMMON][[LINKIS-2761]](https://github.com/apache/incubator-linkis/pull/2761) Code formatting enhancements, including scalafmt, spotless, parent pom adjustments, etc.
+ \[CG][[LINKIS-2711]](https://github.com/apache/incubator-linkis/pull/2711) SparkPreExecutionHook code refactoring

## Bugs Fix
+ \[COMMON][[LINKIS-2769]](https://github.com/apache/incubator-linkis/pull/2769) fix WebMvcConfigurer issue caused by package conflict
+ \[WEB][[LINKIS-2498]](https://github.com/apache/incubator-linkis/pull/2499) fix Apache Rat Check bug
+ \[LM][[LINKIS-2892]](https://github.com/apache/incubator-linkis/pull/2892) Fix Yarn resource capacity calculation error
+ \[CG][[LINKIS-2764]](https://github.com/apache/incubator-linkis/pull/2764) Fix Python code parser's parsing failure issue
+ \[COMMON][[LINKIS-2756]](https://github.com/apache/incubator-linkis/pull/2756) fix ResultSet may fail to read
+ \[COMMON][[LINKIS-3156]](https://github.com/apache/incubator-linkis/pull/3156) fix custom variable substitution bug
+ \[COMMON][[LINKIS-3307]](https://github.com/apache/incubator-linkis/pull/3307) Fix the NPE problem when the FsPath tool class gets the path
+ \[EC-Python][[LINKIS-3202]](https://github.com/apache/incubator-linkis/pull/3156) fix python watchdog_thread using old method
+ \[EC-Presto][[LINKIS-3342]](https://github.com/apache/incubator-linkis/pull/3342) Optimize the problem that kill presto engine does not take effect and support BackQuoted
+ \[EC][[LINKIS-3298]](https://github.com/apache/incubator-linkis/pull/3298) fix EC indicator update delay

## Thanks
The release of Apache Linkis(incubating) 1.3.0 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors, including but not limited to the following Contributors (in no particular order):
AaronLinOops, Alexkun, jacktao007, legendtkl, peacewong, casionone, QuintinTao, cydenghua, jackxu2011, ruY9527, huiyuanjjjjuice,
binbinCheng, yyuser5201314, Beacontownfc, duhanmin, whiterxine, aiceflower, weipengfei-sj, zhaoyun006, CCweixiao, Beacontownfc, mayinrain