---
title:  Directory Structure
sidebar_position: 0
---

> linkis code hierarchy structure, as well as package structure and deployment directory structure description description, if you explain, if you want to explain, if you want to know more about each module module module module

## 1. Source code directory structure

```html
├── docs
│ ├── configuration //linkis configuration item documents for all modules
│ ├── errorcode // error code document of all modules of linkis
│ ├── configuration-change-records.md
│ ├── index.md
│ ├── info-1.1.3.md
│ ├── info-1.2.1.md
│ ├── info-1.3.1.md
│ └── trino-usage.md
├── linkis-commons //Core abstraction, which contains all common modules
│ ├── linkis-common //Common module, many built-in common tools
│ ├── linkis-hadoop-common
│ ├── linkis-httpclient //Java SDK top-level interface further encapsulates httpclient
│ ├── linkis-module // The top-level public module of linkis service involves parameters and service initialization when the service starts, unified Restful processing, login status verification, etc.
│ ├── linkis-mybatis //Mybatis module of SpringCloud
│ ├── linkis-protocol //Some interfaces and entity classes of service request/response
│ ├── linkis-rpc //RPC module, complex two-way communication based on Feign
│ ├── linkis-scheduler //General scheduling module
│ ├── linkis-storage //File operation tool set
├── linkis-computation-governance //Computation governance service
│ ├── linkis-client //Java SDK, users can directly access Linkis through Client
│ ├── linkis-computation-governance-common
│ ├── linkis-engineconn
│ ├── linkis-engineconn-manager
│ ├── linkis-entrance //General underlying entrance module
│ ├── linkis-jdbc-driver //You can use linkis to connect in a similar way to jdbc sdk
│ ├── linkis-manager
├── linkis-dist //The final step of compiling and packaging, integrating all lib packages and installation and deployment script configuration, etc.
│ ├── bin
│ │ ├── checkEnv.sh
│ │ ├── common.sh
│ │ └── install.sh //Installation script
│ ├── deploy-config
│ │ ├── db.sh //database configuration
│ │ └── linkis-env.sh //linkis startup related configuration
│ ├── docker
│ │ └── scripts
│ ├── helm
│ │ ├── charts
│ │ ├── scripts
│ │ ├── README_CN.md
│ │ └── README.md
│ ├── package
│ │ ├── bin
│ │ ├── conf
│ │ ├── db
│ │ └── sbin
│ ├── release-docs
│ │ ├── licenses
│ │ ├── LICENSE
│ │ └── NOTICE
│ ├── src
│ └── pom.xml
├── linkis-engineconn-plugins // engine
│ ├── elasticsearch
│ ├── flink
│ ├──hive
│ ├── io_file
│ ├── jdbc
│ ├── open look
│ ├── pipeline
│ ├── presto
│ ├── python
│ ├── seat tunnel
│ ├── shell
│ ├── spark
│ ├── sqoop
├── linkis-extensions // extension function enhancement plug-in module
│ ├── linkis-io-file-client // function extension to linkis-storage
├── linkis-orchestrator //Service orchestration
│ ├── linkis-code-orchestrator
│ ├── linkis-computation-orchestrator
│ ├── linkis-orchestrator-core
├── linkis-public-enhancements //public enhancement services
│ ├── linkis-baseddata-manager
│ ├── linkis-bml // material library
│ ├── linkis-configuration
│ ├── linkis-context-service //unified context
│ ├── linkis-datasource //data source service
│ ├── linkis-error-code
│ ├── linkis-instance-label
│ ├── linkis-jobhistory
│ ├── linkis-ps-common-lock
│ ├── linkis-script-dev
│ ├── linkis-udf
│ ├── linkis-variable
├── linkis-spring-cloud-services //Microservice Governance
│ ├── linkis-service-discovery
│ ├── linkis-service-gateway //Gateway Gateway
├── linkis-web //linkis management console code
│ ├── release-docs
│ │ ├── licenses
│ │ └── LICENSE
│ ├── src
│ ├── config.sh
│ ├── install.sh
│ ├── package.json
│ ├── pom.xml
│ └── vue.config.js
├── tool
│ ├── dependencies
│ │ ├── known-dependencies.txt
│ │ └── regenerate_konwn_dependencies_txt.sh
│ ├── code-style-idea.xml
│ ├── license-header
│ └── modify_license.sh
├── CONTRIBUTING_CN.md
├── CONTRIBUTING.md
├── DISCLAIMER
├── linkis-tree.txt
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README_CN.md
├── README.md
└── scalastyle-config.xml

```

## 2. Installation package directory structure
```html

├── bin
│ ├── checkEnv.sh ── environment variable detection
│ ├── common.sh ── some public shell functions
│ └── install.sh ── Main script for Linkis installation
├── deploy-config
│ ├── db.sh //Database connection configuration
│ └── linkis-env.sh //Related environment configuration information
├── docker
├── helm
├── licenses
├── linkis-package //Microservice-related startup configuration files, dependencies, scripts, linkis-cli, etc.
│ ├── bin
│ ├── conf
│ ├── db
│ ├── lib
│ └── sbin
├── NOTICE
├── DISCLAIMER
├── LICENSE
├── README_CN.md
└── README.md

```

## 3. Directory structure after deployment


```html
├── bin ── linkis-cli Shell command line program used to submit tasks to Linkis
│ ├── linkis-cli
│ ├── linkis-cli-hive
│ ├── linkis-cli-pre
│ ├── linkis-cli-spark-sql
│ ├── linkis-cli-spark-submit
│ └── linkis-cli-sqoop
├── conf configuration directory
│ ├── application-eureka.yml
│ ├── application-linkis.yml ── Microservice general yml
│ ├── linkis-cg-engineconnmanager.properties
│ ├── linkis-cg-engineplugin.properties
│ ├── linkis-cg-linkismanager.properties
│ │── linkis-cli
│ │ ├── linkis-cli.properties
│ │ └── log4j2.xml
│ ├── linkis-env.sh ── linkis environment variable configuration
│ ├── linkis-mg-gateway.properties
│ ├── linkis.properties ── The global coordination of linkis services, all microservices will be loaded and used when starting
│ ├── linkis-ps-publicservice.properties
│ ├── log4j2.xml
├── db Database DML and DDL file directory
│ ├── linkis_ddl.sql ── database table definition SQL
│ ├── linkis_dml.sql ── database table initialization SQL
│ └── module ── Contains DML and DDL files of each microservice
│ └── upgrade ── Incremental DML/DDL for each version
├── lib lib directory
│ ├── linkis-commons ── Public dependency package When most services start (except linkis-mg-gateway) -cp path parameter will load this directory
│ ├── linkis-computation-governance ── lib directory of computing governance module
│ ├── linkis-engineconn-plugins ── lib directory of all engine plugins
│ ├── linkis-public-enhancements ── lib directory of public enhancement services
│ └── linkis-spring-cloud-services ── SpringCloud lib directory
├── logs log directory
│ ├── linkis-cg-engineconnmanager-gc.log
│ ├── linkis-cg-engineconnmanager.log
│ ├── linkis-cg-engineconnmanager.out
│ ├── linkis-cg-engineplugin-gc.log
│ ├── linkis-cg-engineplugin.log
│ ├── linkis-cg-engineplugin.out
│ ├── linkis-cg-entrance-gc.log
│ ├── linkis-cg-entrance.log
│ ├── linkis-cg-entrance.out
│ ├── linkis-cg-linkismanager-gc.log
│ ├── linkis-cg-linkismanager.log
│ ├── linkis-cg-linkismanager.out
│ ├── linkis-cli
│ │ ├── linkis-client.hadoop.log.20220409162400037523664
│ │ ├── linkis-client.hadoop.log.20220409162524417944443
│ ├── linkis-mg-eureka-gc.log
│ ├── linkis-mg-eureka.log
│ ├── linkis-mg-eureka.out
│ ├── linkis-mg-gateway-gc.log
│ ├── linkis-mg-gateway.log
│ ├── linkis-mg-gateway.out
│ ├── linkis-ps-publicservice-gc.log
│ ├── linkis-ps-publicservice.log
│ └── linkis-ps-publicservice.out
├── pid The process ID of all microservices
│ ├── linkis_cg-engineconnmanager.pid ── engine manager microservice
│ ├── linkis_cg-engineconnplugin.pid ── engine plugin microservice
│ ├── linkis_cg-entrance.pid ── engine entry microservice
│ ├── linkis_cg-linkismanager.pid ── linkis manager microservice
│ ├── linkis_mg-eureka.pid ── eureka microservice
│ ├── linkis_mg-gateway.pid ──gateway microservice
│ └── linkis_ps-publicservice.pid ── public microservice
└── sbin Microservice startup and shutdown script directory
├── ext ──The start and stop script directory of each microservice
  ├── linkis-daemon.sh ── Quickly start, stop, and restart a single microservice script
├── linkis-start-all.sh ── Start all microservice scripts with one click
└── linkis-stop-all.sh ── Stop all microservice scripts with one click
```
### 3.1 Configuration item modification

After executing Linkis installation, all configuration items are located in the conf directory,
If you need to modify the configuration items, after modifying the `${LINKIS_HOME}/conf/*properties` file, restart the corresponding service,
For example: `sh sbin/linkis-daemon.sh start ps-publicservice`.
If you modify the public configuration file `application-eureka.yml/application-linkis.yml/linkis.properties`, you need to restart all services `sh sbin/linkis-start-all.sh`

### 3.2 Microservice start and stop

All microservice names are as follows:
 ```
├── linkis-cg-engineconnmanager engine management service
├── linkis-cg-engineplugin engine plugin management service
├── linkis-cg-entrance computing governance entry service
├── linkis-cg-linkismanager computing governance management service
├── linkis-mg-eureka microservice registry service
├── linkis-mg-gateway Linkis gateway service
├── linkis-ps-publicservice public service
 ```

**Microservice Abbreviation**:

| Abbreviation | Full name in English | Full name in Chinese |
 |------|-------------------------|------------|
| cg | Computation Governance | Computing Governance |
| mg | Microservice Covernance | Microservice Governance |
| ps | Public Enhancement Service | Public Enhancement Service |



```
# Start all microservices at once:
 
     sh linkis-start-all.sh
 
# Shut down all microservices at once
 
     sh linkis-stop-all.sh
 
# Start a single microservice (the service name needs to remove the linkis prefix, such as: mg-eureka)
 
     sh linkis-daemon.sh start service-name
 
     For example: sh linkis-daemon.sh start mg-eureka
 
# Shut down a single microservice
 
     sh linkis-daemon.sh stop service-name
 
     For example: sh linkis-daemon.sh stop mg-eureka
 
# Restart a single microservice
 
     sh linkis-daemon.sh restart service-name
 
     For example: sh linkis-daemon.sh restart mg-eureka
# View the status of a single microservice
 
     sh linkis-daemon.sh status service-name
 
     For example: sh linkis-daemon.sh status mg-eureka
```