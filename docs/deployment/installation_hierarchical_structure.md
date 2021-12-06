---
title: Installation directory structure
sidebar_position: 3
---
Installation directory structure
============

The directory structure of Linkis1.0 is very different from the 0.X version. Each microservice in 0.X has a root directory that exists independently. The main advantage of this directory structure is that it is easy to distinguish microservices and facilitate individual Microservices are managed, but there are some obvious problems:

1.	The microservice catalog is too complicated and it is not convenient to switch catalog management
2.	There is no unified startup script, which makes it more troublesome to start and stop microservices
3.	There are a large number of duplicate service configurations, and the same configuration often needs to be modified in many places
4.	There are a large number of repeated Lib dependencies, which increases the size of the installation package and the risk of dependency conflicts

Therefore, in Linkis 1.0, we have greatly optimized and adjusted the installation directory structure, reducing the number of microservice directories, reducing the jar packages that are repeatedly dependent, and reusing configuration files and microservice management scripts as much as possible. Mainly reflected in the following aspects:

1.The bin folder is no longer provided for each microservice, and modified to be shared by all microservices.
> The Bin folder is modified to the installation directory, which is mainly used to install Linkis1.0 and check the environment status. The new sbin directory provides one-click start and stop for Linkis, and provides independent start and stop for all microservices by changing parameters.

2.No longer provide a separate conf directory for each microservice, and modify it to be shared by all microservices.
> The Conf folder contains two aspects of content. On the one hand, it is the configuration information shared by all microservices. This type of configuration information contains information that users can customize configuration according to their own environment; on the other hand, it is the special characteristics of each microservice. Configuration, under normal circumstances, users do not need to change by themselves.

3.The lib folder is no longer provided for each microservice, and modified to be shared by all microservices
> The Lib folder also contains two aspects of content, on the one hand, the common dependencies required by all microservices; on the other hand, the special dependencies required by each microservice.

4.The log directory is no longer provided for each microservice, modified to be shared by all microservices
> The Log directory contains log files of all microservices.

The simplified directory structure of Linkis1.0 is as follows.

````
├── bin ──installation directory
│ ├── checkEnv.sh ── Environmental variable detection
│ ├── checkServices.sh ── Microservice status check
│ ├── common.sh ── Some public shell functions
│ ├── install-io.sh ── Used for dependency replacement during installation
│ └── install.sh ── Main script of Linkis installation
├── conf ──configuration directory
│ ├── application-eureka.yml 
│ ├── application-linkis.yml    ──Microservice general yml
│ ├── linkis-cg-engineconnmanager-io.properties
│ ├── linkis-cg-engineconnmanager.properties
│ ├── linkis-cg-engineplugin.properties
│ ├── linkis-cg-entrance.properties
│ ├── linkis-cg-linkismanager.properties
│ ├── linkis-computation-governance
│ │   └── linkis-client
│ │       └── linkis-cli
│ │           ├── linkis-cli.properties
│ │           └── log4j2.xml
│ ├── linkis-env.sh   ──linkis environment properties
│ ├── linkis-et-validator.properties
│ ├── linkis-mg-gateway.properties
│ ├── linkis.properties  ──linkis global properties
│ ├── linkis-ps-bml.properties
│ ├── linkis-ps-cs.properties
│ ├── linkis-ps-datasource.properties
│ ├── linkis-ps-publicservice.properties
│ ├── log4j2.xml
│ ├── proxy.properties(Optional)
│ └── token.properties(Optional)
├── db ──database DML and DDL file directory
│ ├── linkis\_ddl.sql ──Database table definition SQL
│ ├── linkis\_dml.sql ──Database table initialization SQL
│ └── module ──Contains DML and DDL files of each microservice
├── lib ──lib directory
│ ├── linkis-commons ──Common dependency package
│ ├── linkis-computation-governance ──The lib directory of the computing governance module
│ ├── linkis-engineconn-plugins ──lib directory of all EngineConnPlugins
│ ├── linkis-public-enhancements ──lib directory of public enhancement services
│ └── linkis-spring-cloud-services ──SpringCloud lib directory
├── logs ──log directory
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
│ ├── linkis-et-validator-gc.log
│ ├── linkis-et-validator.log
│ ├── linkis-et-validator.out
│ ├── linkis-mg-eureka-gc.log
│ ├── linkis-mg-eureka.log
│ ├── linkis-mg-eureka.out
│ ├── linkis-mg-gateway-gc.log
│ ├── linkis-mg-gateway.log
│ ├── linkis-mg-gateway.out
│ ├── linkis-ps-bml-gc.log
│ ├── linkis-ps-bml.log
│ ├── linkis-ps-bml.out
│ ├── linkis-ps-cs-gc.log
│ ├── linkis-ps-cs.log
│ ├── linkis-ps-cs.out
│ ├── linkis-ps-datasource-gc.log
│ ├── linkis-ps-datasource.log
│ ├── linkis-ps-datasource.out
│ ├── linkis-ps-publicservice-gc.log
│ ├── linkis-ps-publicservice.log
│ └── linkis-ps-publicservice.out
├── pid ──Process ID of all microservices
│ ├── linkis\_cg-engineconnmanager.pid ──EngineConnManager microservice
│ ├── linkis\_cg-engineconnplugin.pid ──EngineConnPlugin microservice
│ ├── linkis\_cg-entrance.pid ──Engine entrance microservice
│ ├── linkis\_cg-linkismanager.pid ──linkis manager microservice
│ ├── linkis\_mg-eureka.pid ──eureka microservice
│ ├── linkis\_mg-gateway.pid ──gateway microservice
│ ├── linkis\_ps-bml.pid ──material library microservice
│ ├── linkis\_ps-cs.pid ──Context microservice
│ ├── linkis\_ps-datasource.pid ──Data source microservice
│ └── linkis\_ps-publicservice.pid ──public microservice
└── sbin ──microservice start and stop script directory
    ├── ext ──Start and stop script directory of each microservice
    ├── linkis-daemon.sh ── Quick start and stop, restart a single microservice script
    ├── linkis-start-all.sh ── Start all microservice scripts with one click
    └── linkis-stop-all.sh ── Stop all microservice scripts with one click
````

# Configuration item modification

After executing the install.sh in the bin directory to complete the Linkis installation, you need to modify the configuration items. All configuration items are located in the con directory. Normally, you need to modify the three configurations of db.sh, linkis.properties, and linkis-env.sh For documentation, project installation and configuration, please refer to the article "Linkis1.0 Installation"

# Microservice start and stop

After modifying the configuration items, you can start the microservice in the sbin directory. The names of all microservices are as follows:

````
├── linkis-cg-engineconnmanager  ──engine management service
├── linkis-cg-engineplugin  ──EngineConnPlugin management service
├── linkis-cg-entrance  ──computing governance entrance service
├── linkis-cg-linkismanager  ──computing governance management service
├── linkis-mg-eureka  ──microservice registry service
├── linkis-mg-gateway  ──Linkis gateway service
├── linkis-ps-bml  ──material library service
├── linkis-ps-cs  ──context service
├── linkis-ps-datasource  ──data source service
└── linkis-ps-publicservice  ──public service
````
**Microservice abbreviation**:

| Abbreviation | Full English Name | Full Chinese Name |
|------|-------------------------|------------|
| cg | Computation Governance | Computing Governance |
| mg | Microservice Covernance | Microservice Governance |
| ps | Public Enhancement Service | Public Enhancement Service |

In the past, to start and stop a single microservice, you need to enter the bin directory of each microservice and execute the start/stop script. When there are many microservices, it is troublesome to start and stop. A lot of additional directory switching operations are added. Linkis1.0 will all The scripts related to the start and stop of microservices are placed in the sbin directory, and only a single entry script needs to be executed.

**Under the Linkis/sbin directory**:

1.Start all microservices at once:

````
sh linkis-start-all.sh
````

2.Shut down all microservices at once

````
sh linkis-stop-all.sh
````

3.Start a single microservice (the service name needs to be removed from the linkis prefix, such as mg-eureka)
````
sh linkis-daemon.sh start service-name
````
For example: 
````
sh linkis-daemon.sh start mg-eureka
````

4.Shut down a single microservice
````
sh linkis-daemon.sh stop service-name
````
For example: 
````
sh linkis-daemon.sh stop mg-eureka
````

5.Restart a single microservice
````
sh linkis-daemon.sh restart service-name
````
For example: 
````
sh linkis-daemon.sh restart mg-eureka
````

6.View the status of a single microservice
````
sh linkis-daemon.sh status service-name
````
For example: 
````
sh linkis-daemon.sh status mg-eureka
````
