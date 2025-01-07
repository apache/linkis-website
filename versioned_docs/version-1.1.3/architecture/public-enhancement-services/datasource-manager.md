---
title: Data Source Management Service Architecture
sidebar_position: 3
---
## Background

Exchangis0.x and Linkis0.x in earlier versions both have integrated data source modules. In order to manage the ability to reuse data sources, Linkis reconstructs the data source module based on linkis-datasource (refer to related documents), and converts the data source Management unpacks into data source management services and metadata management services。

This article mainly involves the DataSource Manager Server data source management service, which provides the following functions:

1）、Linkis unified management service startup and deployment, does not increase operation and maintenance costs, reuse Linkis service capabilities;

2）、Provide management services of graphical interface through Linkis Web. The interface provides management services such as new data source, data source query, data source update, connectivity test and so on;

3）、 the service is stateless, multi-instance deployment, so that the service is highly available. When the system is deployed, multiple instances can be deployed. Each instance provides services independently to the outside world without interfering with each other. All information is stored in the database for sharing.

4）、Provide full life cycle management of data sources, including new, query, update, test, and expiration management.

5）、Multi-version data source management, historical data sources will be saved in the database, and data source expiration management is provided. 

6）、The Restful interface provides functions, a detailed list: data source type query, data source detailed information query, data source information query based on version, data source version query, get data source parameter list, multi-dimensional data source search, get data source environment query and Update, add data source, data source parameter configuration, data source expiration setting, data source connectivity test.

## Architecture Diagram

![datasource Architecture diagram](/Images/Architecture/datasource/linkis-datasource-server.png)

## Architecture Description

1、The service is registered in the Linkis-Eureak-Service service and managed in a unified manner with other Linkis microservices. The client can obtain the data source management service by connecting the Linkis-GateWay-Service service and the service name data-source-manager.

2、The interface layer provides other applications through the Restful interface, providing additions, deletions, and changes to data sources and data source environments, data source link and dual link tests, data source version management and expiration operations;

3、The Service layer is mainly for the service management of the database and the material library, and permanently retains the relevant information of the data source;

4、The link test of the data source is done through the linkis metastore server service, which now provides the mysql\es\kafka\hive service

### Core Process

1、To create a new data source, firstly, the user of the new data source will be obtained from the request to determine whether the user is valid. The next step will be to verify the relevant field information of the data source. The data source name and data source type cannot be empty. The data source name is used to confirm whether the data source exists. If it does not exist, it will be inserted in the database, and the data source ID number will be returned.

2、 To update the data source, firstly, the user of the new data source will be obtained from the request to determine whether the user is valid. The next step will be to verify the relevant field information of the new data source. The data source name and data source type cannot be empty. It will confirm whether the data source exists according to the data source ID number. If it does not exist, an exception will be returned. If it exists, it will be further judged whether the user has update permission for the data source. The user is the administrator or the owner of the data source. Only have permission to update. If you have permission, the data source will be updated and the data source ID will be returned.

3、 To update the data source parameters, firstly, the user of the new data source will be obtained from the request to determine whether the user is valid, and the detailed data source information will be obtained according to the passed parameter data source ID, and then it will be determined whether the user is the owner of the changed data source or not. For the administrator, if there is any, the modified parameters will be further verified, and the parameters will be updated after passing, and the versionId will be returned.

## Entity Object

| Class Name                   | Describe                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| DataSourceType               | Indicates the type of data source                            |
| DataSourceParamKeyDefinition | Declare data source property configuration definitions       |
| DataSource                   | Data source object entity class, including permission tags and attribute configuration definitions |
| DataSourceEnv                | Data source environment object entity class, which also contains attribute configuration definitions |
| DataSourceParameter          | Data source specific parameter configuration                 |
| DatasourceVersion            | Data source version details                                  |

## **Database Design**

##### Database Diagram：

![](/Images-zh/Architecture/datasource/dn-db.png)

##### Data Table Definition：

Table：linkis_ps_dm_datatsource <-->Object：DataSource

| Serial Number | Column               | Describe                               |
| ------------- | -------------------- | -------------------------------------- |
| 1             | id                   | Data source ID                         |
| 2             | datasource_name      | Data source name                       |
| 3             | datasource_desc      | Data source detailed description       |
| 4             | datasource_type_id   | Data source type ID                    |
| 5             | create_identify      | create identify                        |
| 6             | create_system        | System for creating data sources       |
| 7             | parameter            | Data source parameters                 |
| 8             | create_time          | Data source creation time              |
| 9             | modify_time          | Data source modification time          |
| 10            | create_user          | Data source create user                |
| 11            | modify_user          | Data source modify user                |
| 12            | labels               | Data source label                      |
| 13            | version_id           | Data source version ID                 |
| 14            | expire               | Whether the data source is out of date |
| 15            | published_version_id | Data source release version number     |

Table Name：linkis_ps_dm_datasource_type <-->Object：DataSourceType

| Serial Number | Column      | Describe                       |
| ------------- | ----------- | ------------------------------ |
| 1             | id          | Data source type ID            |
| 2             | name        | Data source type name          |
| 3             | description | Data source type description   |
| 4             | option      | Type of data source            |
| 5             | classifier  | Data source type classifier    |
| 6             | icon        | Data source image display path |
| 7             | layers      | Data source type hierarchy     |

Table：linkis_ps_dm_datasource_env <-->Object：DataSourceEnv

| Serial Number | Column             | Describe                              |
| ------------- | ------------------ | ------------------------------------- |
| 1             | id                 | Data source environment ID            |
| 2             | env_name           | Data source environment name          |
| 3             | env_desc           | Data source environment description   |
| 4             | datasource_type_id | Data source type ID                   |
| 5             | parameter          | Data source environment parameters    |
| 6             | create_time        | Data source environment creation time |
| 7             | create_user        | Data source environment create user   |
| 8             | modify_time        | Data source modification time         |
| 9             | modify_user        | Data source modify user               |

Table：linkis_ps_dm_datasource_type_key <-->Object：DataSourceParamKeyDefinition

| Serial Number | Column              | Describe                               |
| ------------- | ------------------- | -------------------------------------- |
| 1             | id                  | Key-value type ID                      |
| 2             | data_source_type_id | Data source type ID                    |
| 3             | key                 | Data source parameter key value        |
| 4             | name                | Data source parameter name             |
| 5             | default_value       | Data source parameter default value    |
| 6             | value_type          | Data source parameter type             |
| 7             | scope               | Data source parameter range            |
| 8             | require             | Is the data source parameter required? |
| 9             | description         | Data source parameter description      |
| 10            | value_regex         | Regular data source parameters         |
| 11            | ref_id              | Data source parameter association ID   |
| 12            | ref_value           | Data source parameter associated value |
| 13            | data_source         | Data source                            |
| 14            | update_time         | update time                            |
| 15            | create_time         | Create Time                            |

Table：linkis_ps_dm_datasource_version <-->Object：DatasourceVersion

| Serial Number | Column        | Describe                                 |
| ------------- | ------------- | ---------------------------------------- |
| 1             | version_id    | Data source version ID                   |
| 2             | datasource_id | Data source ID                           |
| 3             | parameter     | The version parameter of the data source |
| 4             | comment       | comment                                  |
| 5             | create_time   | Create Time                              |
| 6             | create_user   | Create User                              |

