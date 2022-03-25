---
title: 数据源接口
sidebar_position: 1
---


** DataSourceAdminRestfulApi 类 ** 

## queryDataSourceEnv
**接口地址**:`/api/rest_j/v1/data-source-manager/env`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**: 查询数据源配置的集群环境信息列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|currentPage|currentPage|query|false|integer(int32)||
|name|name|query|false|string||
|pageSize|pageSize|query|false|integer(int32)||
|typeId|typeId|query|false|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/env",
    "status": 0,
    "message": "OK",
    "data": {
        "queryList": [
            {
                "id": 2,
                "envName": "测试环境UAT",
                "envDesc": "测试环境UAT",
                "dataSourceTypeId": 4,
                "connectParams": {
                    "hadoopConf": {
                        "hive.metastore.execute.setugi": "true"
                    },
                    "uris": "thrift://localhost:9083"
                },
                "createTime": 1647249913000,
                "modifyTime": 1647249913000
            },
            {
                "id": 3,
                "envName": "开源测试环境",
                "envDesc": "开源测试环境",
                "dataSourceTypeId": 4,
                "connectParams": {
                    "keytab": "4dd408ad-a2f9-4501-83b3-139290977ca2",
                    "uris": "thrift://bdpclustername:9083",
                    "principle": "hadoop@WEBANK.COM"
                },
                "createTime": 1647249913000,
                "modifyTime": 1647249913000
            }
        ]
    }
}
```
## getAllEnvListByDataSourceType
**接口地址**:`/api/rest_j/v1/data-source-manager/env-list/all/type/{typeId}`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**: 查询某种数据源配置的集群信息列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|typeId|typeId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/env-list/all/type/4",
    "status": 0,
    "message": "OK",
    "data": {
        "envList": [
            {
                "id": 1,
                "envName": "测试环境SIT"
            },
            {
                "id": 2,
                "envName": "测试环境UAT"
            },
            {
                "id": 3,
                "envName": "开源测试环境"
            }
        ]
    }
}
```
## insertJsonEnv
**接口地址**:`/api/rest_j/v1/data-source-manager/env/json`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求示例**:
```javascript
{
  "connectParams": {},
  "createTime": "",
  "createUser": "",
  "dataSourceType": {
    "classifier": "",
    "description": "",
    "icon": "",
    "id": "",
    "layers": 0,
    "name": "",
    "option": ""
  },
  "dataSourceTypeId": 0,
  "envDesc": "",
  "envName": "",
  "id": 0,
  "modifyTime": "",
  "modifyUser": ""
}
```

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceEnv|dataSourceEnv|body|true|DataSourceEnv|DataSourceEnv|
|&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;dataSourceTypeId|||false|integer(int64)||
|&emsp;&emsp;envDesc|||false|string||
|&emsp;&emsp;envName|||false|string||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;modifyTime|||false|string(date-time)||
|&emsp;&emsp;modifyUser|||false|string||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```
## getEnvEntityById
**接口地址**:`/api/rest_j/v1/data-source-manager/env/{envId}`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:查询某环境详细信息

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|envId|envId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/env/1",
    "status": 0,
    "message": "OK",
    "data": {
        "env": {
            "id": 1,
            "envName": "测试环境SIT",
            "envDesc": "测试环境SIT",
            "connectParams": {
                "hadoopConf": {
                    "hive.metastore.execute.setugi": "true"
                },
                "uris": "thrift://localhost:9083"
            },
            "createTime": 1647249913000,
            "modifyTime": 1647249913000
        }
    }
}
```
## removeEnvEntity
**接口地址**:`/api/rest_j/v1/data-source-manager/env/{envId}`

**请求方式**:`DELETE`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|envId|envId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```
## updateJsonEnv
**接口地址**:`/api/rest_j/v1/data-source-manager/env/{envId}/json`

**请求方式**:`PUT`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求示例**:
```javascript
{
  "connectParams": {},
  "createTime": "",
  "createUser": "",
  "dataSourceType": {
    "classifier": "",
    "description": "",
    "icon": "",
    "id": "",
    "layers": 0,
    "name": "",
    "option": ""
  },
  "dataSourceTypeId": 0,
  "envDesc": "",
  "envName": "",
  "id": 0,
  "modifyTime": "",
  "modifyUser": ""
}
```

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceEnv|dataSourceEnv|body|true|DataSourceEnv|DataSourceEnv|
|&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;dataSourceTypeId|||false|integer(int64)||
|&emsp;&emsp;envDesc|||false|string||
|&emsp;&emsp;envName|||false|string||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;modifyTime|||false|string(date-time)||
|&emsp;&emsp;modifyUser|||false|string||
|envId|envId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```

------
** DataSourceCoreRestfulApi类**

## queryDataSource
**接口地址**:`/api/rest_j/v1/data-source-manager/info`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:查询数据源具体信息

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|currentPage|currentPage|query|false|integer(int32)||
|identifies|identifies|query|false|string||
|name|name|query|false|string||
|pageSize|pageSize|query|false|integer(int32)||
|system|system|query|false|string||
|typeId|typeId|query|false|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/info",
    "status": 0,
    "message": "OK",
    "data": {
        "totalPage": 12,
        "queryList": [
            {
                "id": 11,
                "dataSourceName": "test1256",
                "dataSourceTypeId": 4,
                "createSystem": "Linkis",
                "createTime": 1647909291000,
                "createUser": "hadoop",
                "versionId": 1,
                "expire": false,
                "dataSourceType": {
                    "id": "11",
                    "name": "hive",
                    "layers": 0
                }
            },
            {
                "id": 10,
                "dataSourceName": "hive-test",
                "dataSourceDesc": "hive test",
                "dataSourceTypeId": 4,
                "createSystem": "Linkis",
                "createTime": 1647862455000,
                "modifyTime": 1647930476000,
                "modifyUser": "hadoop",
                "createUser": "hadoop",
                "versionId": 3,
                "publishedVersionId": 1,
                "expire": false,
                "dataSourceType": {
                    "id": "10",
                    "name": "hive",
                    "layers": 0
                }
            }
          
        ]
    }
}
```
## removeDataSource
**接口地址**:`/api/rest_j/v1/data-source-manager/info/delete/{dataSourceId}`

**请求方式**:`DELETE`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:删除某条数据源数据

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/info/delete/1",
    "status": 0,
    "message": "OK",
    "data": {
        "removeId": 1
    }
}
```
## insertJsonInfo
**接口地址**:`/api/rest_j/v1/data-source-manager/info/json`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求示例**:
```javascript
{
  "connectParams": {},
  "createIdentify": "",
  "createSystem": "",
  "createTime": "",
  "createUser": "",
  "dataSourceDesc": "",
  "dataSourceEnv": {
    "connectParams": {},
    "createTime": "",
    "createUser": "",
    "dataSourceType": {
      "classifier": "",
      "description": "",
      "icon": "",
      "id": "",
      "layers": 0,
      "name": "",
      "option": ""
    },
    "dataSourceTypeId": 0,
    "envDesc": "",
    "envName": "",
    "id": 0,
    "modifyTime": "",
    "modifyUser": ""
  },
  "dataSourceEnvId": 0,
  "dataSourceName": "",
  "dataSourceType": {
    "classifier": "",
    "description": "",
    "icon": "",
    "id": "",
    "layers": 0,
    "name": "",
    "option": ""
  },
  "dataSourceTypeId": 0,
  "expire": true,
  "id": 0,
  "labels": "",
  "modifyTime": "",
  "modifyUser": "",
  "publishedVersionId": 0,
  "versionId": 0,
  "versions": [
    {
      "comment": "",
      "connectParams": {},
      "createTime": "",
      "createUser": "",
      "datasourceId": 0,
      "parameter": "",
      "versionId": 0
    }
  ]
}
```

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSource|dataSource|body|true|DataSource|DataSource|
|&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;createIdentify|||false|string||
|&emsp;&emsp;createSystem|||false|string||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;dataSourceDesc|||false|string||
|&emsp;&emsp;dataSourceEnv|||false|DataSourceEnv|DataSourceEnv|
|&emsp;&emsp;&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;&emsp;&emsp;createTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;&emsp;&emsp;dataSourceTypeId|||false|integer||
|&emsp;&emsp;&emsp;&emsp;envDesc|||false|string||
|&emsp;&emsp;&emsp;&emsp;envName|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|integer||
|&emsp;&emsp;&emsp;&emsp;modifyTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;modifyUser|||false|string||
|&emsp;&emsp;dataSourceEnvId|||false|integer(int64)||
|&emsp;&emsp;dataSourceName|||false|string||
|&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;dataSourceTypeId|||false|integer(int64)||
|&emsp;&emsp;expire|||false|boolean||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;labels|||false|string||
|&emsp;&emsp;modifyTime|||false|string(date-time)||
|&emsp;&emsp;modifyUser|||false|string||
|&emsp;&emsp;publishedVersionId|||false|integer(int64)||
|&emsp;&emsp;versionId|||false|integer(int64)||
|&emsp;&emsp;versions|||false|array|DatasourceVersion|
|&emsp;&emsp;&emsp;&emsp;comment|||false|string||
|&emsp;&emsp;&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;&emsp;&emsp;createTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;&emsp;&emsp;datasourceId|||false|integer||
|&emsp;&emsp;&emsp;&emsp;parameter|||false|string||
|&emsp;&emsp;&emsp;&emsp;versionId|||false|integer||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```
## getInfoByDataSourceName
**接口地址**:`/api/rest_j/v1/data-source-manager/info/name/{dataSourceName}`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:通过datsourceName查询数据源信息

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/info/name/hive-test",
    "status": 0,
    "message": "OK",
    "data": {
        "info": {
            "id": 10,
            "dataSourceName": "hive-test",
            "dataSourceDesc": "hive test",
            "dataSourceTypeId": 4,
            "createSystem": "Linkis",
            "connectParams": {
                "envId": "3"
            },
            "createTime": 1647862455000,
            "modifyTime": 1647930476000,
            "modifyUser": "hadoop",
            "createUser": "hadoop",
            "versionId": 3,
            "publishedVersionId": 1,
            "expire": false,
            "dataSourceType": {
                "name": "hive",
                "layers": 0
            }
        }
    }
}
```
## getInfoByDataSourceId
**接口地址**:`/api/rest_j/v1/data-source-manager/info/{dataSourceId}`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/info/1",
    "status": 0,
    "message": "OK",
    "data": {
        "info": {
            "id": 1,
            "dataSourceName": "开源共建环境",
            "dataSourceDesc": "123",
            "dataSourceTypeId": 1,
            "createSystem": "Linkis",
            "connectParams": {
                "host": "127.0.0.1",
                "password": "xxxxx",
                "port": "9600",
                "username": "linkis"
            },
            "createTime": 1647258360000,
            "modifyTime": 1647437692000,
            "modifyUser": "hadoop",
            "createUser": "hadoop",
            "versionId": 1,
            "publishedVersionId": 1,
            "expire": false,
            "dataSourceType": {
                "name": "mysql",
                "icon": "https://uat.dongcha.weoa.com/static/img/logo.770c1525.png",
                "layers": 0
            }
        }
    }
}
```
## expireDataSource
**接口地址**:`/api/rest_j/v1/data-source-manager/info/{dataSourceId}/expire`

**请求方式**:`PUT`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/info/1/expire",
    "status": 0,
    "message": "OK",
    "data": {
        "expireId": 1
    }
}
```
## updateDataSourceInJson
**接口地址**:`/api/rest_j/v1/data-source-manager/info/{dataSourceId}/json`

**请求方式**:`PUT`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求示例**:
```javascript
{
  "connectParams": {},
  "createIdentify": "",
  "createSystem": "",
  "createTime": "",
  "createUser": "",
  "dataSourceDesc": "",
  "dataSourceEnv": {
    "connectParams": {},
    "createTime": "",
    "createUser": "",
    "dataSourceType": {
      "classifier": "",
      "description": "",
      "icon": "",
      "id": "",
      "layers": 0,
      "name": "",
      "option": ""
    },
    "dataSourceTypeId": 0,
    "envDesc": "",
    "envName": "",
    "id": 0,
    "modifyTime": "",
    "modifyUser": ""
  },
  "dataSourceEnvId": 0,
  "dataSourceName": "",
  "dataSourceType": {
    "classifier": "",
    "description": "",
    "icon": "",
    "id": "",
    "layers": 0,
    "name": "",
    "option": ""
  },
  "dataSourceTypeId": 0,
  "expire": true,
  "id": 0,
  "labels": "",
  "modifyTime": "",
  "modifyUser": "",
  "publishedVersionId": 0,
  "versionId": 0,
  "versions": [
    {
      "comment": "",
      "connectParams": {},
      "createTime": "",
      "createUser": "",
      "datasourceId": 0,
      "parameter": "",
      "versionId": 0
    }
  ]
}
```

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSource|dataSource|body|true|DataSource|DataSource|
|&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;createIdentify|||false|string||
|&emsp;&emsp;createSystem|||false|string||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;dataSourceDesc|||false|string||
|&emsp;&emsp;dataSourceEnv|||false|DataSourceEnv|DataSourceEnv|
|&emsp;&emsp;&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;&emsp;&emsp;createTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;&emsp;&emsp;dataSourceTypeId|||false|integer||
|&emsp;&emsp;&emsp;&emsp;envDesc|||false|string||
|&emsp;&emsp;&emsp;&emsp;envName|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|integer||
|&emsp;&emsp;&emsp;&emsp;modifyTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;modifyUser|||false|string||
|&emsp;&emsp;dataSourceEnvId|||false|integer(int64)||
|&emsp;&emsp;dataSourceName|||false|string||
|&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;dataSourceTypeId|||false|integer(int64)||
|&emsp;&emsp;expire|||false|boolean||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;labels|||false|string||
|&emsp;&emsp;modifyTime|||false|string(date-time)||
|&emsp;&emsp;modifyUser|||false|string||
|&emsp;&emsp;publishedVersionId|||false|integer(int64)||
|&emsp;&emsp;versionId|||false|integer(int64)||
|&emsp;&emsp;versions|||false|array|DatasourceVersion|
|&emsp;&emsp;&emsp;&emsp;comment|||false|string||
|&emsp;&emsp;&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;&emsp;&emsp;createTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;&emsp;&emsp;datasourceId|||false|integer||
|&emsp;&emsp;&emsp;&emsp;parameter|||false|string||
|&emsp;&emsp;&emsp;&emsp;versionId|||false|integer||
|dataSourceId|dataSourceId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```
## getInfoByDataSourceIdAndVersion
**接口地址**:`/api/rest_j/v1/data-source-manager/info/{dataSourceId}/{version}`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|version|version|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/info/1/1",
    "status": 0,
    "message": "OK",
    "data": {
        "info": {
            "id": 1,
            "dataSourceName": "开源共建环境",
            "dataSourceDesc": "123",
            "dataSourceTypeId": 1,
            "createSystem": "Linkis",
            "connectParams": {
                "host": "127.0.0.1",
                "password": "xxxxx",
                "port": "9600",
                "username": "linkis"
            },
            "createTime": 1647258360000,
            "modifyTime": 1647437692000,
            "modifyUser": "hadoop",
            "createUser": "hadoop",
            "versionId": 1,
            "publishedVersionId": 1,
            "expire": false,
            "dataSourceType": {
                "name": "mysql",
                "icon": "https://uat.dongcha.weoa.com/static/img/logo.770c1525.png",
                "layers": 0
            }
        }
    }
}
```
## getKeyDefinitionsByType
**接口地址**:`/api/rest_j/v1/data-source-manager/key-define/type/{typeId}`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|typeId|typeId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/key-define/type/4",
    "status": 0,
    "message": "OK",
    "data": {
        "keyDefine": [
            {
                "id": 6,
                "key": "envId",
                "description": "集群环境",
                "name": "集群环境",
                "valueType": "SELECT",
                "require": true,
                "dataSource": "/data-source-manager/env-list/all/type/4"
            },
            {
                "id": 7,
                "key": "keyTabFile",
                "description": "KeyTab文件",
                "name": "keyTab文件",
                "valueType": "FILE",
                "require": false,
                "dataSource": "http://172.22.32.6:9001/api/rest_j/v1/bml/upload"
            }
        ]
    }
}
```
## getConnectParams
**接口地址**:`/api/rest_j/v1/data-source-manager/name/{dataSourceName}/connect-params`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/name/linkis_test256/connect-params",
    "status": 0,
    "message": "OK",
    "data": {
        "connectParams": {
            "host": "127.0.0.1",
            "password": "xxxxx",
            "port": "9600",
            "username": "linkis"
        }
    }
}
```
## insertJsonParameter
**接口地址**:`/api/rest_j/v1/data-source-manager/parameter/{dataSourceId}/json`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|params|params|body|true|object||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```
## publishByDataSourceId
**接口地址**:`/api/rest_j/v1/data-source-manager/publish/{dataSourceId}/{versionId}`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|versionId|versionId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/publish/3/2",
    "status": 0,
    "message": "OK",
    "data": {}
}
```
## getAllDataSourceTypes
**接口地址**:`/api/rest_j/v1/data-source-manager/type/all`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:
暂无
**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/type/all",
    "status": 0,
    "message": "OK",
    "data": {
        "typeList": [
            {
                "id": "1",
                "name": "mysql",
                "description": "mysql数据库",
                "option": "mysql数据库",
                "classifier": "关系型数据库",
                "icon": "https://uat.dongcha.weoa.com/static/img/logo.770c1525.png",
                "layers": 3
            },
            
            {
                "id": "4",
                "name": "hive",
                "description": "hive数据库",
                "option": "hive",
                "classifier": "大数据存储",
                "layers": 3
            }
            
        ]
    }
}
```
## getConnectParams
**接口地址**:`/api/rest_j/v1/data-source-manager/{dataSourceId}/connect-params`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/3/connect-params",
    "status": 0,
    "message": "OK",
    "data": {
        "connectParams": {
            "host": "127.0.0.1",
            "password": "xxxxx",
            "port": "9600",
            "username": "linkis"
        }
    }
}
```
## getVersionList
**接口地址**:`/api/rest_j/v1/data-source-manager/{dataSourceId}/versions`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/1/versions",
    "status": 0,
    "message": "OK",
    "data": {
        "versions": [
            {
                "versionId": 1,
                "datasourceId": 1,
                "connectParams": {
                    "host": "127.0.0.1",
                    "password": "xxxxx",
                    "port": "9600",
                    "username": "linkis"
                },
                "parameter": "{\"host\":\"127.0.0.1\",\"port\":\"9600\",\"username\":\"linkis\",\"password\":\"rO0ABXQACUFiY2RAMjAyMg==\"}",
                "comment": "初始化版本",
                "createUser": "hadoop"
            }
        ]
    }
}
```
## connectDataSource
**接口地址**:`/api/rest_j/v1/data-source-manager/{dataSourceId}/{version}/op/connect`

**请求方式**:`PUT`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|version|version|path|true|integer(int64)||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
    "method": "/api/data-source-manager/1/1/op/connect",
    "status": 0,
    "message": "OK",
    "data": {
        "ok": true
    }
}
```

-----
** DataSourceOperateRestfulApi类 ** 

## connect
**接口地址**:`/api/rest_j/v1/data-source-manager/op/connect/json`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`application/json`

**接口描述**:

**请求示例**:
```javascript
{
  "connectParams": {},
  "createIdentify": "",
  "createSystem": "",
  "createTime": "",
  "createUser": "",
  "dataSourceDesc": "",
  "dataSourceEnv": {
    "connectParams": {},
    "createTime": "",
    "createUser": "",
    "dataSourceType": {
      "classifier": "",
      "description": "",
      "icon": "",
      "id": "",
      "layers": 0,
      "name": "",
      "option": ""
    },
    "dataSourceTypeId": 0,
    "envDesc": "",
    "envName": "",
    "id": 0,
    "modifyTime": "",
    "modifyUser": ""
  },
  "dataSourceEnvId": 0,
  "dataSourceName": "",
  "dataSourceType": {
    "classifier": "",
    "description": "",
    "icon": "",
    "id": "",
    "layers": 0,
    "name": "",
    "option": ""
  },
  "dataSourceTypeId": 0,
  "expire": true,
  "id": 0,
  "labels": "",
  "modifyTime": "",
  "modifyUser": "",
  "publishedVersionId": 0,
  "versionId": 0,
  "versions": [
    {
      "comment": "",
      "connectParams": {},
      "createTime": "",
      "createUser": "",
      "datasourceId": 0,
      "parameter": "",
      "versionId": 0
    }
  ]
}
```

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSource|dataSource|body|true|DataSource|DataSource|
|&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;createIdentify|||false|string||
|&emsp;&emsp;createSystem|||false|string||
|&emsp;&emsp;createTime|||false|string(date-time)||
|&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;dataSourceDesc|||false|string||
|&emsp;&emsp;dataSourceEnv|||false|DataSourceEnv|DataSourceEnv|
|&emsp;&emsp;&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;&emsp;&emsp;createTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;&emsp;&emsp;dataSourceTypeId|||false|integer||
|&emsp;&emsp;&emsp;&emsp;envDesc|||false|string||
|&emsp;&emsp;&emsp;&emsp;envName|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|integer||
|&emsp;&emsp;&emsp;&emsp;modifyTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;modifyUser|||false|string||
|&emsp;&emsp;dataSourceEnvId|||false|integer(int64)||
|&emsp;&emsp;dataSourceName|||false|string||
|&emsp;&emsp;dataSourceType|||false|DataSourceType|DataSourceType|
|&emsp;&emsp;&emsp;&emsp;classifier|||false|string||
|&emsp;&emsp;&emsp;&emsp;description|||false|string||
|&emsp;&emsp;&emsp;&emsp;icon|||false|string||
|&emsp;&emsp;&emsp;&emsp;id|||false|string||
|&emsp;&emsp;&emsp;&emsp;layers|||false|integer||
|&emsp;&emsp;&emsp;&emsp;name|||false|string||
|&emsp;&emsp;&emsp;&emsp;option|||false|string||
|&emsp;&emsp;dataSourceTypeId|||false|integer(int64)||
|&emsp;&emsp;expire|||false|boolean||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;labels|||false|string||
|&emsp;&emsp;modifyTime|||false|string(date-time)||
|&emsp;&emsp;modifyUser|||false|string||
|&emsp;&emsp;publishedVersionId|||false|integer(int64)||
|&emsp;&emsp;versionId|||false|integer(int64)||
|&emsp;&emsp;versions|||false|array|DatasourceVersion|
|&emsp;&emsp;&emsp;&emsp;comment|||false|string||
|&emsp;&emsp;&emsp;&emsp;connectParams|||false|object||
|&emsp;&emsp;&emsp;&emsp;createTime|||false|string||
|&emsp;&emsp;&emsp;&emsp;createUser|||false|string||
|&emsp;&emsp;&emsp;&emsp;datasourceId|||false|integer||
|&emsp;&emsp;&emsp;&emsp;parameter|||false|string||
|&emsp;&emsp;&emsp;&emsp;versionId|||false|integer||

**响应参数**:

| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```
