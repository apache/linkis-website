---
title: Data Source Management Service Architecture
sidebar_position: 3
---
## Background

Exchangis0.x and Linkis0.x in earlier versions both have integrated data source modules. In order to manage the ability to reuse data sources, Linkis reconstructs the data source module based on linkis-datasource (refer to related documents), and converts the data source Management is unpacked into data source management services and metadata management services.

This article mainly involves the MetaData Manager Server data source management service, which provides the following functions:

1）、Linkis unified management service startup and deployment, does not increase operation and maintenance costs, and reuses Linkis service capabilities;

2）、The service is stateless and deployed in multiple instances to achieve high service availability. When the system is deployed, multiple instances can be deployed. Each instance provides services independently to the outside world without interfering with each other. All information is stored in the database for sharing.

3）、Provides full life cycle management of data sources, including new, query, update, test, and expiration management.

4）、Multi-version data source management, historical data sources will be saved in the database, and data source expiration management is provided.

5）、The Restful interface provides functions, a detailed list: database information query, database table information query, database table parameter information query, and data partition information query.

## Architecture Diagram

![Data Source Architecture Diagram](/Images-zh/Architecture/datasource/meta-server.png)

## Architecture Description

1、The service is registered in the Linkis-Eureak-Service service and managed in a unified manner with other Linkis microservices. The client can obtain the data source management service by connecting the Linkis-GateWay-Service service and the service name metamanager.

2、The interface layer provides database\table\partition information query to other applications through the Restful interface;

3、In the Service layer, the data source type is obtained in the data source management service through the data source ID number, and the specific supported services are obtained through the type. The first supported service is mysql\es\kafka\hive;

### Core Process

1、 The client enters the specified data source ID and obtains information through the restful interface. For example, to query the database list with the data source ID of 1, the url is `http://<meta-server-url>/metadatamanager/dbs/1`，

2、 According to the data source ID, access the data source service `<data-source-manager>` through RPC to obtain the data source type;

3、 According to the data source type, load the corresponding Service service [hive\es\kafka\mysql], perform the corresponding operation, and then return;