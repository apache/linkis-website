---
title: 数据源功能使用
sidebar_position: 7
---

> 介绍一下如何使用1.1.0版本的新特性功能数据源

## 1.数据源功能介绍

### 1.1 概念

- 数据源:我们将能提供数据存储的数据库服务称为数据库，如mysql/hive/kafka，数据源定义的是连接到实际数据库的配置信息，配置信息主要是是连接需要的地址，用户认证信息，连接参数等。存储与linkis的数据库的linkis_ps_dm_datasource_*相关的表中
- 元数据:单指数据库的元数据，是指定义数据结构的数据，数据库各类对象结构的数据。 例如数据库中的数据库名，表名，列名，字段的长度、类型等信息数据。

### 1.2 三个主要模块 

** linkis-datasource-client **
客户端模块，用户数据源的基本管理的DataSourceRemoteClient，以及进行元数据的查询操作的MetaDataRemoteClient.

** linkis-datasource-manager-server **
数据源管理模块,服务名ps-data-source-manager。对数据源的进行基本的管理，对外提供数据源的新增，查询，修改，连接测试等http接口。对内提供了rpc服务 ，方便元数据查询模块通过rpc调用，查询数据库建立连接需要的必要信息。

- [http接口文档](/api/http/data-source-manager-api.md)
- http接口类 org.apache.linkis.metadatamanager.server.restful
- rpc接口类 org.apache.linkis.metadatamanager.server.receiver

** linkis-metedata-manager-server  **
元数据查询模块,服务名ps-metadatamanager。提供对数据库元数据的基本查询功能,对外提供了http接口，对内提供了rpc服务，方便数据源管理模块，通过rpc调用，进行该数据源的连通性测试。
- [http接口文档](/api/http/metadatamanager-api.md)
- http接口类 org.apache.linkis.datasourcemanager.core.restful
- rpc接口类 org.apache.linkis.datasourcemanager.core.receivers


### 1.3 处理逻辑
#### 1.3.1 LinkisDataSourceRemoteClient
功能结构图如下:
![datasource](/Images-zh/deployment/datasource/datasource.png)

- LinkisDataSourceRemoteClient客户端根据请求参数，组装http请求，
- HTTP请求发送到linkis-ps-data-source-manager
- linkis-ps-data-source-manager 会进行基本参数校验，部分接口只能管理员角色能操作 
- linkis-ps-data-source-manager 与数据库进行基本的数据操作
- linkis-ps-data-source-manager 提供的数据源测试连接的接口 内部通过rpc方式，调用ps-metadatamanager方法进行连接测试
- http请求处理后的数据结果，会通过注解DWSHttpMessageResult功能，进行结果集到实体类的映射转化

LinkisDataSourceRemoteClient接口 
- GetAllDataSourceTypesResult getAllDataSourceTypes(GetAllDataSourceTypesAction) 查询所有数据源类型
- QueryDataSourceEnvResult queryDataSourceEnv(QueryDataSourceEnvAction) 查询数据源可使用的集群配置信息
- GetInfoByDataSourceIdResult getInfoByDataSourceId(GetInfoByDataSourceIdAction): 通过数据源id查询数据源信息
- QueryDataSourceResult queryDataSource(QueryDataSourceAction)  查询数据源信息
- GetConnectParamsByDataSourceIdResult getConnectParams(GetConnectParamsByDataSourceIdAction) 获取连接配置参数
- CreateDataSourceResult createDataSource(CreateDataSourceAction) 创建数据源
- DataSourceTestConnectResult getDataSourceTestConnect(DataSourceTestConnectAction)  测试数据源是否能正常建立连接
- DeleteDataSourceResult deleteDataSource(DeleteDataSourceAction) 删除数据源
- ExpireDataSourceResult expireDataSource(ExpireDataSourceAction) 设置数据源为过期状态
- GetDataSourceVersionsResult getDataSourceVersions(GetDataSourceVersionsAction)  查询数据源配置的版本列表
- PublishDataSourceVersionResult publishDataSourceVersion(PublishDataSourceVersionAction) 发布数据源配置版本 
- UpdateDataSourceResult updateDataSource(UpdateDataSourceAction) 更新数据源 
- UpdateDataSourceParameterResult updateDataSourceParameter(UpdateDataSourceParameterAction) 更新数据源配置参数
- GetKeyTypeDatasourceResult getKeyDefinitionsByType(GetKeyTypeDatasourceAction) 查询某数据源类型需要的配置属性


#### 1.3.2 LinkisMetaDataRemoteClient
功能结构图如下:
![metadata](/Images-zh/deployment/datasource/metadata.png)

- LinkisMetaDataRemoteClient客户端，根据请求参数，组装http请求， 
- HTTP请求发送到ps-metadatamanager
- ps-metadatamanager 会进行基本参数校验，
- 请求会根据参数 datasourceId，发送RPC请求到linkis-ps-data-source-manager，获取该数据源的类型，连接参数如用户名密码等信息
- 拿到连接需要的信息后，根据数据源类型，加载对应目录下的lib包，通过反射机制调用对应的函数方法，从而查询到元数据信息
- http请求处理后的数据结果，会通过注解DWSHttpMessageResult功能，进行结果集到实体类的映射转化 

LinkisMetaDataRemoteClient接口 
- MetadataGetDatabasesResult getDatabases(MetadataGetDatabasesAction) 查询数据库列表
- MetadataGetTablesResult getTables(MetadataGetTablesAction) 查询table数据
- MetadataGetTablePropsResult getTableProps(MetadataGetTablePropsAction)
- MetadataGetPartitionsResult getPartitions(MetadataGetPartitionsAction) 查询分区表
- MetadataGetColumnsResult getColumns(MetadataGetColumnsAction) 查询数据表字段

### 1.3 源码模块目录结构 
```shell script
linkis-public-enhancements/linkis-datasource

├── linkis-datasource-client //客户端代码
├── linkis-datasource-manager //数据源管理模块
│   ├── common  //数据源管理公共模块
│   └── server  //数据源管理服务模块
├── linkis-metadata //旧版本已有的模块，保留
├── linkis-metadata-manager //元数据查询模块
│   ├── common //元数据查询公共模块
│   ├── server //元数据查询服务模块
│   └── service //支持的数据源类型 
│       ├── elasticsearch
│       ├── hive 
│       ├── kafka
│       └── mysql


```
### 1.4 安装包目录结构

```shell script
/lib/linkis-public-enhancements/

├── linkis-ps-data-source-manager
├── linkis-ps-metadatamanager
│   └── service
│       ├── elasticsearch
│       ├── hive
│       ├── kafka
│       └── mysql
```
`wds.linkis.server.mdm.service.lib.dir` 控制反射调用时加载的类路径，参数默认值是`/lib/linkis-public-enhancements/linkis-ps-metadatamanager/service`

### 1.5 配置参数 

参见[调优排障>参数列表#datasource配置参数](/docs/1.1.0/tuning-and-troubleshooting/configuration/#6-数据源及元数据服务配置参数)

## 2. 数据源功能的启用

linkis的启动脚本中默认不会启动数据源相关的服务两个服务（ps-data-source-manager，ps-metadatamanager），
如果想使用数据源服务，可以通过如下方式进行开启:
修改`$LINKIS_CONF_DIR/linkis-env.sh`中的 `export ENABLE_METADATA_MANAGER=true`值为true。
通过linkis-start-all.sh/linkis-stop-all.sh 进行服务启停时，会进行数据源服务的启动与停止。

通过eureka页面查看服务是否正常启动 

![datasource eureka](/Images-zh/deployment/datasource/eureka.png)

:::caution 注意
- 1.linkis的管理台web版本需要配合升级至1.1.0版本才能在linkis管理台上使用数据源管理页面功能。
- 2.目前数据源中已有mysql/hive/kafak/elasticsearch的jar包, 但是kafak/elasticsearch数据源未经过严格的测试，不保证功能的完整可用性。
:::

## 3.  数据源的使用
数据源的使用分为三步:
- step 1. 创建数据源/配置连接参数
- step 2. 发布数据源,选择要使用的连接配置版本
- step 3. 数据源使用，查询元数据信息
,hive/kafka/elasticsearch配置是关联对应的集群环境配置.

### 3.1  Mysql 数据源
#### 3.1.1 通过管理台创建
>只能创建配置数据源，以及测试数据源是否能正常连接，无法进行直接进行元数据查询

数据源管理>新增数据源>选择mysql类型


输入相关的配置信息

![create mysql](/Images-zh/deployment/datasource/create_mysql.png)

录入成功后可以通过连接测试验证是否能够正常进行连接


:::caution 注意
- 通过管理台创建的数据源归属的system是Linkis
- 创建成功后，还需要进行发布(发布时进行配置参数版本的切换和选择)，才能被正常使用
:::

配置的发布(使用那个配置进行数据源的建连):

点击版本后再弹窗页面选择合适的配置进行发布

![publish](/Images-zh/deployment/datasource/publish_version.png)


#### 3.1.2 使用客户端

scala 代码示例:
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

表`linkis_ps_dm_datasource_env`
```roomsql
INSERT INTO `linkis_ps_dm_datasource_env` 
(`env_name`, `env_desc`, `datasource_type_id`, `parameter`,`create_user`,`modify_user`) 
VALUES 
('testEnv', '测试环境', 4, 
'{\r\n    "uris": "thrift://clustername:9083",\r\n    "keytab": "4dd408ad-a2f9-4501-83b3-139290977ca2",\r\n    "principle":"hadoop@WEBANK.COM",\r\n    "hadoopConf":{"hive.metastore.execute.setugi":"true"}\r\n}',
'user','user');
```
主键id作为envId，在建立连接时，需要通过此envId参数，获取集群配置相关信息。
配置字段解释:
```
{
    "uris": "thrift://clustername:9083", # 必选 如果未开启kerberos认证 下列[keytab][principle]参数可以为空
    "keytab": "bml resource id",//keytab 存储再物料库中的resourceId,目前需要通过http接口手动上传。
    "principle":"hadoop@WEBANK.COM" //认证的principle
    "hadoopConf":{} //额外的连接参数 可选
}
```

keytab的resourceId获取方式，目前基础数据管理功能还在规划中，可以通过http接口请求获取到 
参考示例 
```shell script
curl --form "file=@文件路径"  \
--form system=子系统名   \
-H "Token-Code:认证token" \
-H "Token-User:认证用户名"  \
http://linkis-gatewayip:port/api/rest_j/v1/bml/upload

示例:
curl --form "file=@/appcom/keytab/hadoop.keytab"  \
--form system=ABCD   \
-H "Token-Code:QML-AUTH" \
-H "Token-User:hadoop"  \
http://127.0.0.1:9001/api/rest_j/v1/bml/upload

请求结果中的resourceId 即为对应的`bml resource id`值 
{"method":"/bml/upload","status":0,"message":"The task of submitting and uploading resources was successful(提交上传资源任务成功)","data":{"resourceId":"6e4e54fc-cc97-4d0d-8d5e-a311129ec84e","version":"v000001","taskId":35}}
```


web端创建:

![create_hive](/Images-zh/deployment/datasource/create_hive.png)

#### 3.2.2 使用客户端
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

