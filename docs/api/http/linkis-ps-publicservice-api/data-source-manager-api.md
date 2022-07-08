# DataSourceAdminRestfulApi 

## queryDataSourceEnv
**Interface address**: `/api/rest_j/v1/data-source-manager/env`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Query the list of cluster environment information configured by the data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|currentPage|currentPage|query|false|integer(int32)||
|name|name|query|false|string||
|pageSize|pageSize|query|false|integer(int32)||
|typeId|typeId|query|false|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/env",
    "status": 0,
    "message": "OK",
    "data": {
        "queryList": [
            {
                "id": 2,
                "envName": "Test Environment UAT",
                "envDesc": "Test Environment UAT",
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
                "envName": "Open Source Test Environment",
                "envDesc": "Open Source Test Environment",
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
````
## getAllEnvListByDataSourceType
**Interface address**: `/api/rest_j/v1/data-source-manager/env-list/all/type/{typeId}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Query a list of cluster information configured by a data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|typeId|typeId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/env-list/all/type/4",
    "status": 0,
    "message": "OK",
    "data": {
        "envList": [
            {
                "id": 1,
                "envName": "Test Environment SIT"
            },
            {
                "id": 2,
                "envName": "Test Environment UAT"
            },
            {
                "id": 3,
                "envName": "Open Source Test Environment"
            }
        ]
    }
}
````
## insertJsonEnv
**Interface address**: `/api/rest_j/v1/data-source-manager/env/json`

**Request method**: `POST`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request example**:
````javascript
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
````

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
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

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````
## getEnvEntityById
**Interface address**:`/api/rest_j/v1/data-source-manager/env/{envId}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Query the detailed information of an environment

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|envId|envId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/env/1",
    "status": 0,
    "message": "OK",
    "data": {
        "env": {
            "id": 1,
            "envName": "Test Environment SIT",
            "envDesc": "Test Environment SIT",
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
````
## removeEnvEntity
**Interface address**:`/api/rest_j/v1/data-source-manager/env/{envId}`

**Request method**: `DELETE`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|envId|envId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/env/4",
    "status": 0,
    "message": "OK",
    "data": {
        "removeId": 4
    }
}
````
##updateJsonEnv
**Interface address**: `/api/rest_j/v1/data-source-manager/env/{envId}/json`

**Request method**: `PUT`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request example**:
````javascript
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
````

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
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

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````
# DataSourceCoreRestfulApi

## queryDataSource
**Interface address**:`/api/rest_j/v1/data-source-manager/info`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Query the specific information of the data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|currentPage|currentPage|query|false|integer(int32)||
|identifies|identifies|query|false|string||
|name|name|query|false|string||
|pageSize|pageSize|query|false|integer(int32)||
|system|system|query|false|string||
|typeId|typeId|query|false|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
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
````
## removeDataSource
**Interface address**:`/api/rest_j/v1/data-source-manager/info/delete/{dataSourceId}`

**Request method**: `DELETE`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: delete a data source data

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/info/delete/1",
    "status": 0,
    "message": "OK",
    "data": {
        "removeId": 1
    }
}
````
## insertJsonInfo
**Interface address**:`/api/rest_j/v1/data-source-manager/info/json`

**Request method**: `POST`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request example**:
````javascript
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
````

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
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

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````
## getInfoByDataSourceName
**Interface address**: `/api/rest_j/v1/data-source-manager/info/name/{dataSourceName}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Query data source information through datsourceName

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
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
````
## getInfoByDataSourceId
**Interface address**:`/api/rest_j/v1/data-source-manager/info/{dataSourceId}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/info/1",
    "status": 0,
    "message": "OK",
    "data": {
        "info": {
            "id": 1,
            "dataSourceName": "Open source co-construction environment",
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
````
## expireDataSource
**Interface address**: `/api/rest_j/v1/data-source-manager/info/{dataSourceId}/expire`

**Request method**: `PUT`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/info/1/expire",
    "status": 0,
    "message": "OK",
    "data": {
        "expireId": 1
    }
}
````
##updateDataSourceInJson
**Interface address**: `/api/rest_j/v1/data-source-manager/info/{dataSourceId}/json`

**Request method**: `PUT`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request example**:
````javascript
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
````

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
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

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````
## getInfoByDataSourceIdAndVersion
**Interface address**: `/api/rest_j/v1/data-source-manager/info/{dataSourceId}/{version}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|version|version|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/info/1/1",
    "status": 0,
    "message": "OK",
    "data": {
        "info": {
            "id": 1,
            "dataSourceName": "Open source co-construction environment",
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
````
## getKeyDefinitionsByType
**Interface address**:`/api/rest_j/v1/data-source-manager/key-define/type/{typeId}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|typeId|typeId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/key-define/type/4",
    "status": 0,
    "message": "OK",
    "data": {
        "keyDefine": [
            {
                "id": 6,
                "key": "envId",
                "description": "Cluster Environment",
                "name": "Cluster Environment",
                "valueType": "SELECT",
                "require": true,
                "dataSource": "/data-source-manager/env-list/all/type/4"
            },
            {
                "id": 7,
                "key": "keyTabFile",
                "description": "KeyTab file",
                "name": "keyTab file",
                "valueType": "FILE",
                "require": false,
                "dataSource": "http://172.22.32.6:9001/api/rest_j/v1/bml/upload"
            }
        ]
    }
}
````
## getConnectParams
**Interface address**: `/api/rest_j/v1/data-source-manager/name/{dataSourceName}/connect-params`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
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
````
## insertJsonParameter
**Interface address**:`/api/rest_j/v1/data-source-manager/parameter/{dataSourceId}/json`

**Request method**: `POST`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|params|params|body|true|object||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````
## publishByDataSourceId
**Interface address**: `/api/rest_j/v1/data-source-manager/publish/{dataSourceId}/{versionId}`

**Request method**: `POST`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|versionId|versionId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/publish/3/2",
    "status": 0,
    "message": "OK",
    "data": {}
}
````
## getAllDataSourceTypes
**Interface address**:`/api/rest_j/v1/data-source-manager/type/all`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:
No
**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/type/all",
    "status": 0,
    "message": "OK",
    "data": {
        "typeList": [
            {
                "id": "1",
                "name": "mysql",
                "description": "mysql database",
                "option": "mysql database",
                "classifier": "Relational Database",
                "icon": "https://uat.dongcha.weoa.com/static/img/logo.770c1525.png",
                "layers": 3
            },
            
            {
                "id": "4",
                "name": "hive",
                "description": "hive database",
                "option": "hive",
                "classifier": "Big Data Storage",
                "layers": 3
            }
            
        ]
    }
}
````
## getConnectParams
**Interface address**:`/api/rest_j/v1/data-source-manager/{dataSourceId}/connect-params`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:
**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
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
````
## getVersionList
**Interface address**: `/api/rest_j/v1/data-source-manager/{dataSourceId}/versions`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
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
                "parameter": "{\"host\":\"127.0.0.1\",\"port\":\"9600\",\"username\":\"linkis\",\"password\": \"rO0ABXQACUFiY2RAMjAyMg==\"}",
                "comment": "Initialization Version",
                "createUser": "hadoop"
            }
        ]
    }
}
````
## connectDataSource
**Interface address**: `/api/rest_j/v1/data-source-manager/{dataSourceId}/{version}/op/connect`

**Request method**: `PUT`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|integer(int64)||
|version|version|path|true|integer(int64)||

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
    "method": "/api/data-source-manager/1/1/op/connect",
    "status": 0,
    "message": "OK",
    "data": {
        "ok": true
    }
}
````
# data-source-operate-restful-api
## connect
**Interface address**:`/api/rest_j/v1/data-source-manager/op/connect/json`

**Request method**: `POST`

**Request data type**: `application/json`

**Response data type**: `application/json`

**Interface description**:

**Request example**:
````javascript
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
````

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
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

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|

**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````