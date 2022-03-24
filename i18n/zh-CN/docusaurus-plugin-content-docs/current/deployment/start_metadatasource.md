---
title: 元数据管理使用
sidebar_position: 7
---
这篇文章介绍一下如何使用1.1.0版本的元数据管理的新特性功能

## 1.数据源功能介绍

### 1.1 概念

- 数据源:我们将能提供数据存储的数据库服务称为数据库，如mysql/hive/kafka，数据源定义的是连接到实际数据库的配置信息，配置信息主要是是连接需要的地址，用户认证信息，连接参数等。存储与linkis的数据库的linkis_ps_dm_datasource_*相关的表中
- 元数据:单指数据库的元数据，是指定义数据结构的数据，数据库各类对象结构的数据。 例如数据库中的数据库名，表名，列名，字段的长度、类型等信息数据。

### 1.2 三个主要模块 

** linkis-datasource-client **
客户端模块，用户数据源的基本管理的DataSourceRemoteClient，以及进行元数据的查询操作的MetaDataRemoteClient.

** linkis-datasource-manager-server **
数据源管理模块,服务名ps-data-source-manager。对数据源的进行基本的管理，对外提数据源的新增，查询，修改，连接测试等http接口。对内提供了rpc服务 ，方便数据元管理模块通过rpc调用，查询数据库建立连接需要的必要信息。

- [http接口文档](/api/http/data-source-manager-api.md)
- http接口类 org.apache.linkis.metadatamanager.server.restful
- rpc接口类 org.apache.linkis.metadatamanager.server.receiver

** linkis-metedata-manager-server  **
数据元管理模块,服务名ps-metadatamanager。提供数据库的数据元数据的基本查询功能,对外提供了http接口，对内提供了rpc服务，方便数据源管理模块，通过rpc调用，进行数据源的连接测试。
- [http接口文档](/api/http/metadatamanager-api.md)
- http接口类 org.apache.linkis.datasourcemanager.core.restful
- rpc接口类 org.apache.linkis.datasourcemanager.core.receivers


## 2. 数据源功能的启用

linkis的启动脚本中默认不会启动数据源相关的服务两个服务（ps-data-source-manager，ps-metadatamanager），如果想使用数据源服务，可以通过如下方式进行
修改$LINKIS_CONF_DIR/linkis-env.sh中的 `export ENABLE_METADATA_MANAGER=true`值为true。
通过linkis-start-all.sh/linkis-stop-ll.sh 进行服务启停时，会进行数据源服务的启动与停止。
通过eureka页面查看服务是否正常启动 

![datasource eureka](/Images-zh/deployment/datasource/eureka.png)

linkis的管理台web版本需要配合升级至1.1.0版本才能在linkis管理台上使用数据源管理页面功能。

注意点:
1.目前数据源中已有mysql/hive/kafak/elasticsearch, 但是kafak/elasticsearch数据源未经过严格的测试，不保证功能的完整可用性。
2.

## 3.  数据源的使用
数据源的使用分为三步:
- step 1. 创建数据源/配置连接参数,hive/kafka/elasticsearch配置是关联对应的集群环境配置.
- step 2. 发布数据源,选择要使用的连接配置版本
- step 3. 数据源使用，查询元数据信息

### 3.1  Mysql 数据源
#### 3.1.1 通过管理台创建
>只能创建配置数据源，以及测试数据源是否能正常连接，无法进行直接进行元数据查询

数据源管理>新增数据源  选择mysql类型
录入相关的配置信息
![create mysql](/Images-zh/deployment/datasource/create_mysql.png)

录入成功后可以通过连接测试验证是否能够正常进行连接

通过管理台创建的数据源归属的system是Linkis

创建成功后，还需要进行发布(可以进行配置参数的切换和选择)，才能被正常使用
![publish](/Images-zh/deployment/datasource/publish_version.png)


#### 3.1.2 使用客户端

scala 代码示例:
```
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

    //创建数据源
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


    //设置连接参数
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

    //发布配置版本
    dataSourceclient.publishDataSourceVersion(
      PublishDataSourceVersionAction.builder()
        .setDataSourceId(dataSourceId)
        .setUser(user)
        .setVersion(version)
        .build())

     //使用示例
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

```

### 3.2  Hive 数据源

#### 3.2.1 通过管理台创建
>只能创建配置数据源，以及测试数据源是否能正常连接，无法进行直接进行元数据查询

先需要进行集群环境信息的配置

表 linkis_ps_dm_datasource_env
INSERT INTO `linkis_ps_dm_datasource_env`
(`env_name`, `env_desc`, `datasource_type_id`, `parameter`, `create_user`, `modify_user`)
VALUES
('testEnv', '测试环境', 4, '{\r\n    "keytab": "4dd408ad-a2f9-4501-83b3-139290977ca2",\r\n    "uris": "thrift://bdpdev01hdp01:9083",\r\n    "principle":"hadoop@WEBANK.COM"\r\n}',  'user','user');

id 作为envId 建立连接时，会通过envId获取集群配置相关信息

{
    "keytab": "bml resource id",
    "uris": "thrift://clustername:9083",
    "principle":"hadoop@WEBANK.COM"
}


![create_hive](/Images-zh/deployment/datasource/create_hive.png)

#### 3.2.2 使用客户端
```
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

   //创建数据源
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

     //设置连接参数
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

    //发布配置版本
    dataSourceclient.publishDataSourceVersion(
      PublishDataSourceVersionAction.builder()
        .setDataSourceId(dataSourceId)
        .setUser(user)
        .setVersion(version)
        .build())

    //使用示例
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

