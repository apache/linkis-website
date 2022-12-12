---
title: Glossary
sidebar_position: 4
---

## 1. Glossary

Linkis is developed based on the microservice architecture, and its services can be divided into 3 types of service groups (groups): computing governance service group, public enhancement service group and microservice governance service group.
- Computation Governance Services: The core service for processing tasks, supporting the 4 main stages of the computing task/request processing flow (submit->prepare->execute->result);
- Public Enhancement Services: Provide basic support services, including context services, engine/udf material management services, job history and other public services and data source management services;
- Microservice Governance Services: Customized Spring Cloud Gateway, Eureka. Provides a base for microservices

The following will introduce the key Glossary and services of these three groups of services:

### 1.1 Key module nouns

| Abbreviation | Name | Main Functions |
|--------- |------------------------- |--------------- -------|
| MG/mg | Microservice Governance | Microservice Governance |
| CG/cg | Computation Governance | Computation Governance |
| EC/ec | EngineConn | Engine Connector |
| - | Engine | The underlying computing storage engine, such as spark, hive, shell |
| ECM/ecm | EngineConnManager | Management of Engine Connectors |
| ECP/ecp | EngineConnPlugin | Engine Connector Plugin |
| RM/rm | ResourceManager | Resource manager for managing task resource and user resource usage and control |
| AM/am | AppManager | Application Manager to manage EngineConn and ECM services |
| LM/lm | LinkisManager | Linkis manager service, including: RM, AM, LabelManager and other modules |
| PES/pes | Public Enhancement Services |
| - | Orchestrator | Orchestrator, used for Linkis task orchestration, task multi-active, mixed calculation, AB and other policy support |
| UJES | Unified Job Execute Service | Unified Job Execute Service |
| DDL/ddl | Data Definition Language | Database Definition Language |
| DML/dml | Data Manipulation Language | Data Manipulation Language |

### 1.2 Mission key nouns

- JobRequest: job request, corresponding to the job submitted by the Client to Linkis, including the execution content, user, label and other information of the job
- RuntimeMap: task runtime parameters, task level take effect, such as data source information for placing multiple data sources
- StartupMap: Engine connector startup parameters, used to start the EngineConn connected machine, the EngineConn process takes effect, such as setting spark.executor.memory=4G
- UserCreator: Task creator information: contains user information User and Client submitted application information Creator, used for tenant isolation of tasks and resources
- submitUser: task submit user
- executeUser: the real execution user of the task
- JobSource: Job source information, record the IP or script address of the job
- errorCode: error code, task error code information
- JobHistory: task history persistence module, providing historical information query of tasks
- ResultSet: The result set, the result set corresponding to the task, is saved with the .dolphin file suffix by default
- JobInfo: Job runtime information, such as logs, progress, resource information, etc.
- Resource: resource information, each task consumes resources
- RequestTask: The smallest execution unit of EngineConn, the task unit transmitted to EngineConn for execution



## 2. Service Introduction

This section mainly introduces the services of Linkis, what services will be available after Linkis is started, and the functions of the services.

## 2.1 Service List

After Linkis is started, the microservices included in each service group (group) are as follows:

| Belonging to the microservice group (group) | Service name | Main functions |
| ---- | ---- | ---- |
| MGS | linkis-mg-eureka | Responsible for service registration and discovery, other upstream components will also reuse the linkis registry, such as dss|
| MGS | linkis-mg-gateway | As the gateway entrance of Linkis, it is mainly responsible for request forwarding and user access authentication |
| CGS | linkis-cg-entrance | The task submission entry is a service responsible for receiving, scheduling, forwarding execution requests, and life cycle management of computing tasks, and can return calculation results, logs, and progress to the caller |
| CGS | linkis-cg-linkismanager| Provides AppManager (application management), ResourceManager (resource management), LabelManager (label management), Engine connector plug-in manager capabilities |
| CGS | linkis-cg-engineconnmanager | Manager for EngineConn, providing lifecycle management of engines |
| CGS | linkis-cg-engineconn| The engine connector service is the actual connection service with the underlying computing storage engine (Hive/Spark), including session information with the actual engine. For the underlying computing storage engine, it acts as a client and is triggered and started by tasks|
| PES | linkis-ps-publicservice|Public Enhanced Service Group Module Service, which provides functions such as unified configuration management, context service, BML material library, data source management, microservice management, and historical task query for other microservice modules |

All services seen by open source after startup are as follows:
![Linkis_Eureka](/Images/deployment/Linkis_combined_eureka.png)

## 2.1 Detailed explanation of public enhanced services
After version 1.3.1, the Public Enhanced Service Group (PES) merges related module services into one service linkis-ps-publicservice by default to provide related functions. Of course, if you want to deploy separately, it is also supported. You only need to package and deploy the services of the corresponding modules.
The combined public enhanced service mainly includes the following functions:

| Abbreviation | Service Name | Main Functions |
|--------- |------------------------- |--------------- -------|
| CS/cs | Context Service | Context Service, used to transfer result sets, variables, files, etc. between tasks |
| UDF/udf | UDF | UDF management module, provides management functions for UDF and functions, supports sharing and version control |
| variable | Variable | Global custom module, providing management functions for global custom variables |
| script | Script-dev | Script file operation service, providing script editing and saving, script directory management functions |
| jobHistory | JobHistory | Task history persistence module, providing historical information query of tasks |
| BML/bml | BigData Material library |
| - | Configuration | Configuration management, providing management and viewing of configuration parameters |
| - | instance-label | Microservice management service, providing mapping management functions for microservices and routing labels |
| - | error-code | Error code management, providing the function of managing through error codes |
| DMS/dms | Data Source Manager Service | Data Source Management Service |
| MDS/mds | MetaData Manager Service | Metadata Management Service |
| - | linkis-metadata | Provides Hive metadata information viewing function, which will be merged into MDS later |
| - | basedata-manager | Basic data management, used to manage Linkis' own basic metadata information |

### 3 Module Introduction
This section mainly introduces the major modules and functions of Linkis.

- linkis-commons: The public modules of linkis, including public tool modules, RPC modules, microservice foundation and other modules
- linkis-computation-governance: Computing governance module, including modules for computing governance multiple services: Entrance, LinkisManager, EngineConnManager, EngineConn, etc.
- linkis-engineconn-plugins: Engine connector plugin module, contains all engine connector plugin implementations
- linkis-extensions: The extension enhancement module of Linkis, not a necessary function module, now mainly includes the IO module for file proxy operation
- linkis-orchestrator: Orchestration module for Linkis task orchestration, advanced strategy support such as task multi-active, mixed calculation, AB, etc.
- linkis-public-enhancements: public enhancement module, which contains all public services for invoking linkis internal and upper-layer application components
- linkis-spring-cloud-services: Spring cloud related service modules, including gateway, registry, etc.
- linkis-web: front-end module