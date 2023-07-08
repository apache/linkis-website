---
title: DataSource 
sidebar_position: 7
---

> Introduce how to use the new feature function data source of version 1.1.0

## 1. Data source function introduction

### 1.1 Concept

- Data source: We call database services that can provide data storage as databases, such as mysql/hive/kafka. The data source defines the configuration information for connecting to the actual database. The configuration information is mainly the address required for connection and user authentication information , connection parameters, etc. Stored in the linkis_ps_dm_datasource_* table related to the linkis database
- Metadata: single refers to the metadata of the database, which refers to the data that defines the data structure and the data of various object structures of the database. For example, the database name, table name, column name, field length, type and other information data in the database.

### 1.2 Three main modules

**linkis-datasource-client**
Client module, DataSourceRemoteClient for basic management of user data sources, and MetaDataRemoteClient for metadata query operations.

**linkis-datasource-manager-server**
Data source management module, service name ps-data-source-manager. Perform basic management of data sources, and provide http interfaces such as adding, querying, modifying, and connection testing of external data sources. The rpc service is provided internally, which is convenient for the data element management module to call through rpc to query the necessary information needed to establish a connection to the database.

- [http interface documentation](/api/http/linkis-ps-publicservice-api/data-source-manager-api.md)
- http interface class org.apache.linkis.metadatamanager.server.restful
- rpc interface class org.apache.linkis.metadatamanager.server.receiver

**linkis-metedata-manager-server**
Data element management module, service name ps-metadatamanager. It provides the basic query function of the data metadata of the database, provides the http interface externally, and provides the rpc service internally, which is convenient for the data source management module to perform the connection test of the data source through the rpc call.
- [http interface documentation](/api/http/linkis-ps-publicservice-api/metadatamanager-api.md)
- http interface class org.apache.linkis.datasourcemanager.core.restful
- rpc interface class org.apache.linkis.datasourcemanager.core.receivers


### 1.3 Processing logic
#### 1.3.1 LinkisDataSourceRemoteClient
The functional structure diagram is as follows:
![datasource](/Images/deployment/datasource/datasource.png)

- The LinkisDataSourceRemoteClient client assembles the http request according to the request parameters,
- HTTP request sent to linkis-ps-data-source-manager
- linkis-ps-data-source-manager will perform basic parameter verification, some interfaces can only be operated by the administrator role
- linkis-ps-data-source-manager performs basic data operations with the database
- The data source test connection interface provided by linkis-ps-data-source-manager internally uses rpc to call the ps-metadatamanager method for connection test
- The data result after the http request is processed will be mapped and converted from the result set to the entity class by annotating the DWSHttpMessageResult function

LinkisDataSourceRemoteClient interface
- GetAllDataSourceTypesResult getAllDataSourceTypes(GetAllDataSourceTypesAction) Query all data source types
- QueryDataSourceEnvResult queryDataSourceEnv(QueryDataSourceEnvAction) Query the cluster configuration information that can be used by the data source
- GetInfoByDataSourceIdResult getInfoByDataSourceId(GetInfoByDataSourceIdAction): query data source information by data source id
- QueryDataSourceResult queryDataSource(QueryDataSourceAction) query data source information
- GetConnectParamsByDataSourceIdResult getConnectParams(GetConnectParamsByDataSourceIdAction) Get connection configuration parameters
- CreateDataSourceResult createDataSource(CreateDataSourceAction) to create a data source
- DataSourceTestConnectResult getDataSourceTestConnect(DataSourceTestConnectAction) to test whether the data source can be connected normally
- DeleteDataSourceResult deleteDataSource(DeleteDataSourceAction) deletes the data source
- ExpireDataSourceResult expireDataSource(ExpireDataSourceAction) sets the data source to expired state
- GetDataSourceVersionsResult getDataSourceVersions(GetDataSourceVersionsAction) Query the version list of the data source configuration
- PublishDataSourceVersionResult publishDataSourceVersion(PublishDataSourceVersionAction) publishes the data source configuration version
- UpdateDataSourceResult updateDataSource(UpdateDataSourceAction) to update the data source
- UpdateDataSourceParameterResult updateDataSourceParameter(UpdateDataSourceParameterAction) Update data source configuration parameters
- GetKeyTypeDatasourceResult getKeyDefinitionsByType(GetKeyTypeDatasourceAction) Query the configuration properties required by a data source type


#### 1.3.2 LinkisMetaDataRemoteClient
The functional structure diagram is as follows:
![metadata](/Images/deployment/datasource/metadata.png)

- LinkisMetaDataRemoteClient client, according to the request parameters, assemble the http request,
- HTTP request sent to ps-metadatamanager
- ps-metadatamanager will perform basic parameter verification,
- The request will send an RPC request to linkis-ps-data-source-manager based on the parameter datasourceId to obtain the type of the data source, connection parameters such as username and password, etc.
- After getting the information required for the connection, load the lib package in the corresponding directory according to the data source type, and call the corresponding function method through the reflection mechanism to query the metadata information
- The data result after the http request is processed will be mapped and converted from the result set to the entity class by annotating the DWSHttpMessageResult function

LinkisMetaDataRemoteClient interface
- MetadataGetDatabasesResult getDatabases(MetadataGetDatabasesAction) query database list
- MetadataGetTablesResult getTables(MetadataGetTablesAction) query table data
- MetadataGetTablePropsResult getTableProps(MetadataGetTablePropsAction)
- MetadataGetPartitionsResult getPartitions(MetadataGetPartitionsAction) query partition table
- MetadataGetColumnsResult getColumns(MetadataGetColumnsAction) query data table fields

### 1.3 Source module directory structure
```shell script
linkis-public-enhancements/linkis-datasource

├── linkis-datasource-client //client code
├── linkis-datasource-manager //Datasource management module
│ ├── common //Data source management common module
│ └── server //Data source management service module
├── linkis-metadata //Module existing in the old version, reserved
├── linkis-metadata-manager //Data Metadata Management Module
│ ├── common //Data element management common module
│ ├── server //Data element management service module
│ └── service //Supported data sources
│ ├── elasticsearch
│ ├── hive
│ ├── kafka
│ └── mysql


````
### 1.4 Installation package directory structure

```shell script
/lib/linkis-public-enhancements/

├── linkis-ps-data-source-manager
├── linkis-ps-metadatamanager
│ └── service
│ ├── elasticsearch
│ ├── hive
│ ├── kafka
│ └── mysql
````
`wds.linkis.server.mdm.service.lib.dir` controls the classpath loaded during reflection calls. The default value of the parameter is `/lib/linkis-public-enhancements/linkis-ps-metadatamanager/service`

### 1.5 Configuration Parameters

See [Tuning and Troubleshooting>Parameter List#datasourceConfiguration Parameters](/docs/1.1.0/tuning-and-troubleshooting/configuration#6-datasource-and-metadata-service-configuration-parameters)

## 2. Enable data source function

In the startup script of linkis, the two services related to the data source (ps-data-source-manager, ps-metadatamanager) will not be started by default.
If you want to use the data source service, you can enable it in the following ways:
Modify `export ENABLE_METADATA_MANAGER=true` in `$LINKIS_CONF_DIR/linkis-env.sh` to true.
When the service is started and stopped through linkis-start-all.sh/linkis-stop-all.sh, the data source service will be started and stopped.

Check whether the service starts normally through the eureka page

![datasource eureka](/Images/deployment/datasource/eureka.png)

:::caution note
- 1. Management of linkis The web version needs to be upgraded to version 1.1.0 to use the data source management page function on the linkis console.
- 2. At present, there are jar packages of mysql/hive/kafak/elasticsearch in the data source, but the kafak/elasticsearch data source has not been strictly tested, and the complete availability of functions is not guaranteed.
:::

## 3. Use of data sources
The use of data sources is divided into three steps:
- step 1. Create data source/configure connection parameters
- step 2. Publish the data source and select the connection configuration version to use
- step 3. Data source usage, query metadata information
, hive/kafka/elasticsearch configuration is associated with the corresponding cluster environment configuration.

### 3.1 Mysql data source
#### 3.1.1 Created through the management console
> You can only create configuration data sources, and test whether the data sources can be connected normally, and cannot directly query metadata

Data Source Management > New Data Source > Select MySQL Type


Enter relevant configuration information

![create mysql](/Images/deployment/datasource/create_mysql.png)

After the entry is successful, you can pass the connection test to verify whether the connection can be made normally


:::caution note
- The system to which the data source created through the management console belongs is Linkis
- After the creation is successful, it needs to be published (switching and selecting the configuration parameter version when publishing) before it can be used normally
:::

Publishing of the configuration (using that configuration for the connection to the data source):

Click on the version and then pop up the page to select the appropriate configuration to publish

![publish](/Images/deployment/datasource/publish_version.png)


#### 3.1.2 Using the client

scala code example:
```scala
package org.apache.linkis.datasource.client
import java.util
import java.util.concurrent.TimeUnit

import org.apache.linkis.common.utils.JsonUtils
import org.apache.linkis.datasource.client.impl.{LinkisDataSourceRemoteClient, LinkisMetaDataRemoteClient}
import org.apache.linkis.datasource.client.request._
import org.apache.linkis.datasource.client.response._
import org.apache.linkis.datasourcemanager.common.domain.DataSource
import org.apache.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy
import org.apache.linkis.httpclient.dws.config.DWSClientConfigBuilder
import org.junit.jupiter.api.{Disabled, Test}

object TestMysqlClient {

  val gatewayUrl = "http://127.0.0.1:9001"
  val clientConfig = DWSClientConfigBuilder.newBuilder
    .addServerUrl(gatewayUrl)
    .connectionTimeout(30000)
    .discoveryEnabled(false)
    .discoveryFrequency(1, TimeUnit.MINUTES)
    .loadbalancerEnabled(true)
    .maxConnectionSize(1)
    .retryEnabled(false)
    .readTimeout(30000)
    .setAuthenticationStrategy(new StaticAuthenticationStrategy)
    .setAuthTokenKey("hadoop")
    .setAuthTokenValue("xxxxx")
    .setDWSVersion("v1")

  val dataSourceclient = new LinkisDataSourceRemoteClient(clientConfig.build())

  val clientConfig2 = DWSClientConfigBuilder.newBuilder
    .addServerUrl(gatewayUrl)
    .connectionTimeout(30000)
    .discoveryEnabled(false)
    .discoveryFrequency(1, TimeUnit.MINUTES)
    .loadbalancerEnabled(true)
    .maxConnectionSize(1)
    .retryEnabled(false)
    .readTimeout(30000)
    .setAuthenticationStrategy(new StaticAuthenticationStrategy)
    .setAuthTokenKey("hadoop")
    .setAuthTokenValue("xxxxx")
    .setDWSVersion("v1")

  val metaDataClient = new LinkisMetaDataRemoteClient(clientConfig2.build())

  @Test
  @Disabled
  def testCreateDataSourceMysql: Unit = {
    val user = "hadoop"
    val system = "Linkis"

    //create data source
    val dataSource = new DataSource();
    dataSource.setDataSourceName("for-mysql-test")
    dataSource.setDataSourceDesc("this is for mysql test")
    dataSource.setCreateSystem(system)
    dataSource.setDataSourceTypeId(1L)

    val map = JsonUtils.jackson.readValue(JsonUtils.jackson.writeValueAsString(dataSource), new util.HashMap[String, Any]().getClass)
    val createDataSourceAction: CreateDataSourceAction = CreateDataSourceAction.builder()
      .setUser(user)
      .addRequestPayloads(map)
      .build()
    val createDataSourceResult: CreateDataSourceResult = dataSourceclient.createDataSource(createDataSourceAction)
    val dataSourceId = createDataSourceResult.getInsertId


    // set connection parameters
    val params = new util.HashMap[String, Any]

    val connectParams = new util.HashMap[String, Any]
    connectParams.put("host", "127.0.0.1")
    connectParams.put("port", "36000")
    connectParams.put("username", "db username")
    connectParams.put("password", "db password")

    params.put("connectParams", connectParams)
    params.put("comment", "init")

    val updateParameterAction: UpdateDataSourceParameterAction = UpdateDataSourceParameterAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .addRequestPayloads(params)
      .build()
    val updateParameterResult: UpdateDataSourceParameterResult = dataSourceclient.updateDataSourceParameter(updateParameterAction)

    val version: Long = updateParameterResult.getVersion

    //publish configuration version
    dataSourceclient.publishDataSourceVersion(
      PublishDataSourceVersionAction.builder()
        .setDataSourceId(dataSourceId)
        .setUser(user)
        .setVersion(version)
        .build())

     // use example
    val metadataGetDatabasesAction: MetadataGetDatabasesAction = MetadataGetDatabasesAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .setSystem(system)
      .build()
    val metadataGetDatabasesResult: MetadataGetDatabasesResult = metaDataClient.getDatabases(metadataGetDatabasesAction)

    val metadataGetTablesAction: MetadataGetTablesAction = MetadataGetTablesAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .setDatabase("linkis")
      .setSystem(system)
      .build()
    val metadataGetTablesResult: MetadataGetTablesResult = metaDataClient.getTables(metadataGetTablesAction)

    val metadataGetColumnsAction = MetadataGetColumnsAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .setDatabase("linkis")
      .setSystem(system)
      .setTable("linkis_datasource")
      .build()
    val metadataGetColumnsResult: MetadataGetColumnsResult = metaDataClient.getColumns(metadataGetColumnsAction)
    
  }
}

````

### 3.2 Hive data source

#### 3.2.1 Created through the management console

> You can only create configuration data sources, and test whether the data sources can be connected normally, and cannot directly query metadata

First need to configure the cluster environment information
Table `linkis_ps_dm_datasource_env`
````roomsql
INSERT INTO `linkis_ps_dm_datasource_env`
(`env_name`, `env_desc`, `datasource_type_id`, `parameter`, `create_user`, `modify_user`)
VALUES
('testEnv', 'TestEnv', 4, '{\r\n "keytab": "4dd408ad-a2f9-4501-83b3-139290977ca2",\r\n "uris": "thrift://clustername:9083 ",\r\n "principle":"hadoop@WEBANK.COM"\r\n}', 'user','user');

````
The primary key id, used as the envId, needs to pass the envId parameter to obtain information about the cluster configuration when establishing a connection.
Explanation of configuration fields:
````
{
    "keytab": "bml resource id", //keytab stores the resourceId in the material library, which currently needs to be manually uploaded through the http interface.
    "uris": "thrift://clustername:9083",
    "principle":"hadoop@WEBANK.COM" //Authenticated principle
}
````

Create on the web side:

![create_hive](/Images/deployment/datasource/create_hive.png)

#### 3.2.2 Using the client
```scala
package org.apache.linkis.datasource.client

import java.util
import java.util.concurrent.TimeUnit

import org.apache.linkis.common.utils.JsonUtils
import org.apache.linkis.datasource.client.impl.{LinkisDataSourceRemoteClient, LinkisMetaDataRemoteClient}
import org.apache.linkis.datasource.client.request._
import org.apache.linkis.datasource.client.response._
import org.apache.linkis.datasourcemanager.common.domain.DataSource
import org.apache.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy
import org.apache.linkis.httpclient.dws.config.DWSClientConfigBuilder
import org.junit.jupiter.api.{Disabled, Test}

object TestHiveClient {
  val gatewayUrl = "http://127.0.0.1:9001"
  val clientConfig = DWSClientConfigBuilder.newBuilder
    .addServerUrl(gatewayUrl)
    .connectionTimeout(30000)
    .discoveryEnabled(false)
    .discoveryFrequency(1, TimeUnit.MINUTES)
    .loadbalancerEnabled(true)
    .maxConnectionSize(1)
    .retryEnabled(false)
    .readTimeout(30000)
    .setAuthenticationStrategy(new StaticAuthenticationStrategy)
    .setAuthTokenKey("hadoop")
    .setAuthTokenValue("xxxxx")
    .setDWSVersion("v1")

  val dataSourceclient = new LinkisDataSourceRemoteClient(clientConfig.build())

  val clientConfig2 = DWSClientConfigBuilder.newBuilder
    .addServerUrl(gatewayUrl)
    .connectionTimeout(30000)
    .discoveryEnabled(false)
    .discoveryFrequency(1, TimeUnit.MINUTES)
    .loadbalancerEnabled(true)
    .maxConnectionSize(1)
    .retryEnabled(false)
    .readTimeout(30000)
    .setAuthenticationStrategy(new StaticAuthenticationStrategy)
    .setAuthTokenKey("hadoop")
    .setAuthTokenValue("xxxxx")
    .setDWSVersion("v1")

  val metaDataClient = new LinkisMetaDataRemoteClient(clientConfig2.build())


  @Test
  @Disabled
  def testCreateDataSourceMysql: Unit = {
    val user = "hadoop"
    val system = "Linkis"

   //create data source
    val dataSource = new DataSource();
    dataSource.setDataSourceName("for-hive-test")
    dataSource.setDataSourceDesc("this is for hive test")
    dataSource.setCreateSystem(system)
    dataSource.setDataSourceTypeId(4L)

    val map = JsonUtils.jackson.readValue(JsonUtils.jackson.writeValueAsString(dataSource), new util.HashMap[String, Any]().getClass)
    val createDataSourceAction: CreateDataSourceAction = CreateDataSourceAction.builder()
      .setUser(user)
      .addRequestPayloads(map)
      .build()
    val createDataSourceResult: CreateDataSourceResult = dataSourceclient.createDataSource(createDataSourceAction)
    val dataSourceId = createDataSourceResult.getInsertId

     // set connection parameters
    val params = new util.HashMap[String, Any]
    val connectParams = new util.HashMap[String, Any]
    connectParams.put("envId", "3")
    params.put("connectParams", connectParams)
    params.put("comment", "init")

    val updateParameterAction: UpdateDataSourceParameterAction = UpdateDataSourceParameterAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .addRequestPayloads(params)
      .build()
    val updateParameterResult: UpdateDataSourceParameterResult = dataSourceclient.updateDataSourceParameter(updateParameterAction)

    val version: Long = updateParameterResult.getVersion

    //publish configuration version
    dataSourceclient.publishDataSourceVersion(
      PublishDataSourceVersionAction.builder()
        .setDataSourceId(dataSourceId)
        .setUser(user)
        .setVersion(version)
        .build())

    // use example
    val metadataGetDatabasesAction: MetadataGetDatabasesAction = MetadataGetDatabasesAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .setSystem(system)
      .build()
    val metadataGetDatabasesResult: MetadataGetDatabasesResult = metaDataClient.getDatabases(metadataGetDatabasesAction)

    val metadataGetTablesAction: MetadataGetTablesAction = MetadataGetTablesAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .setDatabase("linkis_test_ind")
      .setSystem(system)
      .build()
    val metadataGetTablesResult: MetadataGetTablesResult = metaDataClient.getTables(metadataGetTablesAction)



    val metadataGetColumnsAction = MetadataGetColumnsAction.builder()
      .setUser(user)
      .setDataSourceId(dataSourceId)
      .setDatabase("linkis_test_ind")
      .setSystem(system)
      .setTable("test")
      .build()
    val metadataGetColumnsResult: MetadataGetColumnsResult = metaDataClient.getColumns(metadataGetColumnsAction)

  }
}
```