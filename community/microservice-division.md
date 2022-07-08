---
title: Division of Microservices
sidebar_position: 11
---
## Introduction to service

Linkis is developed based on the microservice architecture, and its services can be divided into 3 types of service groups (groups): computing governance service group, public enhancement service group and microservice governance service group.
- Computation Governance Services: The core service for processing tasks, supporting the 3 main stages of the computing task/request processing flow (submit->prepare->execute);
- Public Enhancement Services: Provide basic support services, including context services, engine/udf material management services, historical tasks and other public services and data source management services;
- Microservice Governance Services: Customized Spring Cloud Gateway, Eureka. Provides a base for microservices.

The microservices included in each service group (group) are as follows:

| Belonging to the microservice group (group) | Service name | Main functions |
| ---- | ---- | ---- |
| MGS | linkis-mg-eureka | Responsible for service registration and discovery, other upstream components will also reuse the linkis registry, such as dss|
| MGS | linkis-mg-gateway | As the gateway entrance of Linkis, it is mainly responsible for request forwarding and user access authentication |
| CGS | linkis-cg-entrance | The task submission entry is a service responsible for receiving, scheduling, forwarding execution requests, and life cycle management of computing tasks, and can return calculation results, logs, and progress to the caller |
| CGS | linkis-cg-linkismanager| Provides AppManager (application management), ResourceManager (resource management), LabelManager (label management) capabilities |
| CGS | linkis-cg-engineconnplugin| The engine connector plug-in provides the basic function support for freely extending the Linkis engine, and allows the introduction of new engines into the execution life cycle of computing middleware by implementing the established plug-in interfaces, enabling new engines to be implemented Rapid Deployment |
| CGS | linkis-cg-engineconnmanager | The manager of EngineConn, which provides the life cycle management of the engine, and reports the load information and its own health status to the ResourceManager |
| CGS | linkis-cg-engineconn| is the actual connection service with the underlying computing storage engine (Hive/Spark), and contains session information with the actual engine. For the underlying computing storage engine, it acts as a client |
| PES | linkis-ps-publicservice|Provide functions such as unified configuration management, context service, BML material library, data source management, microservice management and historical task query for other microservice modules |
| PES | linkis-ps-cs | Context service, solving a data application development process, data and information sharing across multiple services |
| PES | linkis-ps-metadatamanager| Only provides metadata query service Provides the basic query function of database data metadata, provides http interface externally, and provides rpc service internally, which is convenient for the data source management module to call through rpc to conduct Data source connection test |
| PES | linkis-ps-data-source-manager | Data source management service Perform basic management of data sources, and provide http interfaces such as adding, querying, modifying, and connection testing of external data sources. The rpc service is provided internally, which is convenient for the data element management module to call through rpc and query the necessary information needed to establish a connection to the database|


## Basic terms explained
| Introduction | Full name in English | Full name in Chinese |
|--------- |------------------------- |--------------- -------|
| CG/cg | Computation Governance | Computation Governance |
| MG/mg | Microservice Governance | Microservice Governance |
| PS/ps | Public Service | Public Service |
| CS/cs | Context Service | Unified Context |
| DSS/dss | DataSphere Studio | Data Application Integrated Development Framework |
| EC/ec | EngineConn | Engine Connector |
| ECM/ecm | EngineConnManager | Management of Engine Connectors |
| ECP/ecp | EngineConnPlugin | Engine Connector Plugin |
| RM/rm | ResourceManager | Resource manager for managing node resources |
| PES/pes | Public Enhancement Services |
| DMS/dms | Data Source Manager Service | Data Source Management Service |
| MDS/mds | MetaData Manager Service | Metadata Management Service |
| BML/bml | BigData Material library |
| UJES | Unified Job Execute Service | Unified Job Execute Service |
| DDL/ddl | Data Definition Language | Database Definition Language |
| DML/dml | Data Manipulation Language | Data Manipulation Language |