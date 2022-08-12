---
title:  Source Code Directory Structure
sidebar_position: 5
---

# Source Code Directory Structure

> Linkis source code hierarchical directory structure description, if you want to learn more about Linkis modules, please check [Linkis related architecture design](architecture/overview.md)

```html
|-- linkis-dist //Compile the module of the entire project
|        |-- assembly-combined
|        |-- bin
|        |-- deploy-config
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
|-- license-doc //license details
|        |-- license //The license of the background project
|         - ui-license //License of linkis management desk
|-- tool //Tool script
|        |-- check.sh
|        |-- dependencies
|
|-- web //Management desk code of linkis
|
|-- scalastyle-config.xml //Scala code format check configuration file
|-- CONTRIBUTING.md
|-- CONTRIBUTING_CN.md
|-- DISCLAIMER-WIP
|-- LICENSE //LICENSE of the project source code
|-- LICENSE-binary //LICENSE of binary package
|-- LICENSE-binary-ui //LICENSE of the front-end compiled package
|-- NOTICE //NOTICE of project source code
|-- NOTICE-binary // NOTICE of binary package
|-- NOTICE-binary-ui // NOTICE of front-end binary package
|-- licenses-binary The detailed dependent license file of the binary package
|-- licenses-binary-ui //The license file that the front-end compilation package depends on in detail
|-- README.md
|-- README_CN.md