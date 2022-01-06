---
title: Source Code Directory Structure
sidebar_position: 5
---

> Linkis hierarchical directory structure explanation, if you want to detail Linkis, please check Linkis related architecture design documents

```shell script
├─assembly
├─bin
├─conf
├─core //Core abstraction, which contains all common modules
│ ├─cloudModule //Modules that must be introduced by microservices, embedded Jetty + WebSocket + SpringBoot + Jersey
│ ├─cloudMybatis //Mybatis module of SpringCloud
│ ├─cloudProtocol //General protocol, such as RPC communication between Entrance and Engine
│ ├─cloudRPC //RPC module, complex two-way communication based on Feign implementation
│ ├─common //Common module, built-in many common tools
│ ├─httpclient //Java SDK top-level interface
│ └─scheduler //General scheduling module
├─db //Database information
├─docs //All documents
├─eurekaServer //Eureka module
├─extensions //plugin
│ └─spark-excel //spark supports excel to DF/DF to excel plug-in
├─gateway //Gateway module
│ ├─core //Gateway core implementation, including authentication/analysis/routing of front-end interfaces
│ ├─gateway-httpclient-support //gateway support for Java SDK
│ ├─gateway-ujes-support //Analysis and routing support for UJES interface
│ └─springcloudgateway //Introduce spring cloud gateway, front-end requests are intercepted from here
├─publicService //public service
│ ├─application //application module
│ ├─bin
│ ├─conf
│ ├─configuration //Parameter module, get the engine parameters from here
│ ├─database //Provide Hive metadata query service
│ ├─query //Provide Job Manager and Job History
│ ├─udf //UDF module
│ ├─variable //User-defined variable module
│ └─workspace //Workspace module, manage user scripts
├─resourceManager //Resource management service
│ ├─resourcemanagerclient //resource management client
│ ├─resourcemanagercommon //Common module
│ └─resourcemanagerserver //Resource management server
├─storage //Unified storage service
│ ├─pesIO //Remote storage service
│ │ ├─io-engine //The engine side of remote storage, which actually accesses the bottom storage side
│ │ ├─io-enginemanager //engineManger for remote storage
│ │ └─io-entrance //Request entry for remote storage
│ └─storage //Unified external interface for unified storage
└─ujes //Unified operation execution service
│ ├─client //Java SDK, users can directly access Linkis through Client
│ ├─definedEngines //Implemented engines
│ │ ├─hive //Hive engine
│ │ │ ├─engine //The engine execution end of the actual docking with the underlying Hive
│ │ │ ├─enginemanager
│ │ │ └─entrance
│ │ ├─pipeline //Import and export engine for mutual conduction between storage systems
│ │ │ ├─engine
│ │ │ ├─enginemanager
│ │ │ └─entrance
│ │ ├─python //stand-alone Python engine
│ │ │ ├─engine //The engine execution end that actually docks with the underlying Python
│ │ │ ├─enginemanager
│ │ │ └─entrance
│ │ ├─spark //spark engine
│ │ │ ├─engine //The actual connection to the engine execution end of the underlying Spark
│ │ │ ├─enginemanager
│ │ │ └─entrance
│ │ └─tispark //TiSpark engine, actually docking with TiSpark engine
│ ├─engine //General low-level engine module
│ ├─enginemanager //General low-level enginemanager module
│ ├─entrance //General low-level entrance module
│ └─entranceclient //Simplified version of entrance
```