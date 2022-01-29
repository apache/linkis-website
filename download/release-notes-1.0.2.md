---
title: Release Notes 1.0.2
sidebar_position: 10
--- 
><font color='red'> This is Non-ASF Version </font>

Linkis-1.0.2 includes all of [Project Linkis-1.0.2](https://github.com/apache/incubator-linkis/projects/11).

This release mainly introduces Flink-support into Linkis ecosystem. 

The following key features are added: 
* Flink-EngineConn which offers solid support for Flink jobs. Executing, debugging and monitoring Flink SQL or applications are now available, together with SQL-enhancement ability powered by Linkis Orchestrator.
* LinkisManagerClient which enables direct access to LinkisManager.  Submitting and managing OnceJob rely on this feature.


Abbreviations:

CGS: Computation Governance Services

PES: Public Enhancement Services

MGS: Microservice Governance Services

---

## New Feature

#### EngineConn
* [Linkis-936](https://github.com/apache/incubator-linkis/pull/936)  [CGS-LinkisOnceEngineconn] supports OnceEngineExecutor

#### EnginePlugin
* [Linkis-935](https://github.com/apache/incubator-linkis/pull/935)  [CGS-EngineConnPlugin-Flink] supports Flink EngineConn
* [Linkis-947](https://github.com/apache/incubator-linkis/pull/947)  [CGS-EngineConnPlugin-Flink] supports executing Flink SQL and Flink applications
* [Linkis-948](https://github.com/apache/incubator-linkis/pull/948)  [CGS-EngineConnPlugin-Flink] multiple-datasource support for Flink EngineConn
* [Linkis-949](https://github.com/apache/incubator-linkis/pull/949)  [CGS-EngineConnPlugin-Flink] monitoring Flink Metrics

#### ComputationClient
* [Linkis-937](https://github.com/apache/incubator-linkis/pull/937)  [CGS-LinkisComputationClient] supports OnceEngineExecutor client

---

## Enhancement
* [Linkis-953](https://github.com/apache/incubator-linkis/pull/953)  [CGS-LinkisManager] label supports '-' in hostname
* [Linkis-925](https://github.com/apache/incubator-linkis/pull/925)  [MGS-LinkisServiceGateway] fix weak password in linkis gateway 
* [Linkis-950](https://github.com/apache/incubator-linkis/pull/950)  [CGS-LinkisEngineConnManager] support both ip address and hostname for service discovery
* [Linkis-967](https://github.com/apache/incubator-linkis/pull/967) [CGS-LinkisEntrance] remove instance-label client dependency, Solve the host name and ip judgment abnormality in the gateway router, exclude the pom dependency to pentaho-aggdesigner-algorithm jar.
* [Linkis-963](https://github.com/apache/incubator-linkis/pull/963)  [PES-LinkisBmlServer] default download user changed to jvm user, and supports to set default download user by configuration.

---
## Bugs Fix

* [Linkis-938](https://github.com/apache/incubator-linkis/pull/938)  [CGS-LimkisMnagager] fixes a serial execution bug
* [Linkis-952](https://github.com/apache/incubator-linkis/pull/952)  [CGS-LinkisEngineConn] fixes a redundant thread bug
* [Linkis-943](https://github.com/apache/incubator-linkis/pull/943)  [CGS-EngineConnPlugin-Hive] fixes a Hive3.0 compilation error
* [Linkis-961](https://github.com/apache/incubator-linkis/pull/961)  [CGS-EngineConnPlugin-Flink] fixes a Flink-EnginePlugin compilation bug
* [Linkis-966](https://github.com/apache/incubator-linkis/pull/966)  [CGS-EngineConnPlugin-Hive] [CGS-EnginePlugin-Spark] Solve Spark and hive compatibility issue

## Credits  

The release of Linkis 1.0.2 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors! 

