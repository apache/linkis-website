---
title: Microservice Division
sidebar_position: 0.2
---
## Introduction to the service

Linkis is developed based on the microservice architecture, and its services can be divided into three types of service groups (groups): computing governance service group, public enhanced service group, and microservice governance service group.
- Computation Governance Services (Computation Governance Services): the core service for processing tasks, supporting the three main stages of computing task/request processing (submit->prepare->execute);
- Public Enhancement Services group (Public Enhancement Services): Provide basic support services, including context services, engine/udf material management services, public services such as historical tasks, and data source management services;
- Microservice Governance Services: customized Spring Cloud Gateway, Eureka. Provides the basic foundation for microservices.

The microservices included in each service group (group) are as follows:

| Belonging microservice group (group) | Service name | Main function |
| ---- | ---- | ---- |
| MGS | linkis-mg-eureka | Responsible for service registration and discovery, other upstream components will also reuse the linkis registration center, such as dss|
| MGS | linkis-mg-gateway | As the gateway entrance of Linkis, it mainly undertakes request forwarding and user access authentication |
| CGS | linkis-cg-entrance | The task submission entry is a service responsible for receiving, scheduling, forwarding execution requests, and lifecycle management of computing tasks, and can return computing results, logs, and progress to the caller |
| CGS | linkis-cg-linkismanager|Provides the capabilities of AppManager (application management), ResourceManager (resource management), LabelManager (label management) |
| CGS | linkis-cg-engineconnplugin| engine connector plug-in, which provides free extension of the basic function support of the Linkis engine, allowing to introduce a new engine into the execution life cycle of the computing middleware by implementing the established plug-in interface, and can realize the new engine Rapid Deployment |
| CGS | linkis-cg-engineconnmanager | EngineConn's manager, which provides engine lifecycle management and reports load information and its own health status to ResourceManager |
| CGS | linkis-cg-engineconn| is the actual connection service with the underlying computing storage engine (Hive/Spark), including the session information with the actual engine. For the underlying computing and storage engine, it acts as a client |
| PES | linkis-ps-publicservice|Provides functions such as unified configuration management, context service, BML material library, data source management, microservice management and historical task query for other microservice modules |
| PES | linkis-ps-cs | Context service, solving a data application development process, sharing data and information across multiple services |
| PES | linkis-ps-metadatamanager| only provides metadata query service Provides the basic query function of data metadata in the database, provides http interface externally, and rpc service internally, which is convenient for the data source management module to call through rpc Data Source Connection Test |
| PES | linkis-ps-data-source-manager | Data source management service performs basic management of data sources, and provides http interfaces for adding, querying, modifying, and connecting to external data sources. The rpc service is provided internally, which is convenient for the data element management module to call through rpc and query the necessary information needed to establish a connection to the database|


## Explanation of basic terms
| Introduction | English Full Name | Chinese Full Name |
|-------- |-------------------------- |-------------- -------|
| CG/cg | Computation Governance | Computation Governance |
| MG/mg | Microservice Governance | Microservice Governance |
| PS/ps | Public Service | Public Service |
| CS/cs | Context Service | Unified Context |
| DSS/dss | DataSphere Studio | Data Application Integrated Development Framework |
| EC/ec | EngineConn | Engine Connector |
| ECM/ecm | EngineConnManager | Management of Engine Connectors |
| ECP/ecp | EngineConnPlugin | Engine Connector Plugin |
| RM/rm | ResourceManager | Resource Manager, used to manage node resources |
| PES/pes | Public Enhancement Services | Public Enhancement Services |
| DMS/dms | Data Source Manager Service | Data Source Management Service |
| MDS/mds | MetaData Manager Service | Metadata Management Service |
| BML/bml | BigData Material library | Big Data Material Library |
| UJES | Unified Job Execute Service | Unified Job Execution Service |
| DDL/ddl | Data Definition Language | Database Definition Language |
| DML/dml | Data Manipulation Language | Data Manipulation Language |