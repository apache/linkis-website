---
title:  Source Code Directory Structure
sidebar_position: 5
---

# Source Code Directory Structure

> Linkis source code hierarchical directory structure description, if you want to learn more about Linkis modules, please check [Linkis related architecture design](architecture/overview.md)

```html
|-- assembly-combined-package //Compile the module of the entire project
|        |-- assembly-combined
|        |-- bin
|        |-- config
|        |-- src
|-- linkis-commons //Core abstraction, which contains all common modules
|        |-- linkis-common //Common module, built-in many common tools
|        |-- linkis-hadoop-common
|        |-- linkis-httpclient //Java SDK top-level interface
|        |-- linkis-message-scheduler
|        |-- linkis-module
|        |-- linkis-mybatis //SpringCloud's Mybatis module
|        |-- linkis-protocol
|        |-- linkis-rpc //RPC module, complex two-way communication based on Feign
|        |-- linkis-scheduler //General scheduling module
|        |-- linkis-storage
|        |
|-- linkis-computation-governance //computing governance service
|        |-- linkis-client //Java SDK, users can directly access Linkis through Client
|        |-- linkis-computation-governance-common
|        |-- linkis-engineconn
|        |-- linkis-engineconn-manager
|        |-- linkis-entrance //General low-level entrance module
|        |-- linkis-entrance-client
|        |-- linkis-jdbc-driver
|        |-- linkis-manager
|
|-- linkis-engineconn-plugins
|        |-- engineconn-plugins
|        |-- linkis-engineconn-plugin-framework
|
|-- linkis-extensions
|        |-- linkis-io-file-client
|-- linkis-orchestrator
|        |-- linkis-code-orchestrator
|        |-- linkis-computation-orchestrator
|        |-- linkis-orchestrator-core
|        |-- plugin
|-- linkis-public-enhancements //Public enhancement services
|        |-- linkis-bml // Material library
|        |-- linkis-context-service //Unified context
|        |-- linkis-datasource //Data source service
|        |-- linkis-publicservice //Public Service
|-- linkis-spring-cloud-services //Microservice governance
|        |-- linkis-service-discovery
|        |-- linkis-service-gateway //Gateway
|-- db //Database information
|
|-- web //Management desk code of linkis