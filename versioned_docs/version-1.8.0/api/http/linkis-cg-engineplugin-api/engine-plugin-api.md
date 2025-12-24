---
title: Engine Plugin API
sidebar_position: 5
---

** EnginePluginRestful class **

## refresh


**Interface address**:`/api/rest_j/v1/engineplugin/refresh`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Refresh a single resource</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ecType|type|query|false|string|
|version|version|query|false|string|


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object|
|message|Description|string|
|method|request url|string|
|status|Status|integer(int32)|integer(int32)|


**Sample Response**:
````javascript
{
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## refresh all


**Interface address**:`/api/rest_j/v1/engineplugin/refreshAll`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Refresh all ec resources</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object|
|message|Description|string|
|method|request url|string|
|status|Status|integer(int32)|integer(int32)|


**Sample Response**:
````javascript
{
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## rollback

**Interface address**: `/api/rest_j/v1/engineplugin/rollBack`

**Request method**:`POST`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Roll back the material version of the current engine plugin

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| --------------------- | ------------------------- | - ------- | -------- | --------------------- | ------ |
| engineConnBmlResource | EngineConnBmlResource entity | body | true | EngineConnBmlResource | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {}
}
```

## Get all versions of the engine in the material

**Interface address**:/api/rest_j/v1/engineplugin/getVersionList

**Request method**: GET

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Get all versions of the engine plugin in the material management system

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| ------------- | ---------------- | -------- | -------- | --------------------- | ------ |
| bmlResourceId | engine material resource id | body | true | EngineConnBmlResource | |
| ecType | engine name | body | false | String | |
| version | engine version | body | false | String | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {}
}
```



## Get all engine names

**Interface address**:/api/rest_j/v1/engineplugin/getTypeList

**Request method**: GET

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Get all types of engine names

**Request parameters**



**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {
         "typeList": [
             "hive",
             "io_file",
             "jdbc",
             "open look",
             "python",
             "shell",
             "spark"
         ]
     }
}
```



## Get all versions of the engine

**Interface address**: /api/rest_j/v1/engineplugin/getTypeVersionList/{type}

**Request method**: GET

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Get all types of engine names

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------------- | -------- | -------- | ------- - | ------ |
| type | type name of the engine | path | true | String | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {
         "queryList": [
             "v4"
         ]
     }
}
```



## Update engine plugin

**Interface address**:/api/rest_j/v1/engineplugin/updateEnginePluginBML

**Request method**: POST

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Update specific engine plugins

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | ------------ | -------- | -------- | --------- ---- | ------ |
| file | engine material file | body | true | MultipartFile | |
| ecType | engine type name | body | true | String| |
| version | engine version | body | true | String | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {
         "mess": "upload file success"
     }
}
```



## Engine Plugins

**Interface address**: /api/rest_j/v1/engineplugin/list

**Request method**: GET

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Request all engine plugin information

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| ----------- | ------------ | -------- | -------- | ------ -------- | ------ |
| currentPage | current page | qurey | true | integer(int32) | |
| ecType | engine type name | qurey | false | String | |
| version | engine version | qurey | false | String | |
| pageSize | page size | qurey | true | integer(int32) | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {
         "totalPage": 17,
         "queryList": [
             {
                 "id": 239,
                 "engineConnType": "python",
                 "version": "python2",
                 "fileName": "lib.zip",
                 "lastModified": 1661950452000,
                 "fileSize": 6093507,
                 "bmlResourceId": "8edb8e88-fc75-4ce3-a330-3ece9ec533cb",
                 "bmlResourceVersion": "v000001",
                 "createTime": "2022-08-31 20:56:59",
                 "lastUpdateTime": "2022-08-31 20:56:59"
             },
             {
                 "id": 238,
                 "engineConnType": "python",
                 "version": "python2",
                 "fileName": "conf.zip",
                 "lastModified": 1661950450000,
                 "fileSize": 43841,
                 "bmlResourceId": "a46beb9b-7368-4900-a2a6-241f1ec49002",
                 "bmlResourceVersion": "v000001",
                 "createTime": "2022-08-31 20:56:54",
                 "lastUpdateTime": "2022-08-31 20:56:54"
             }
         ]
     }
}
```



## New engine plugin

**Interface address**:/api/rest_j/v1/engineplugin/uploadEnginePluginBML

**Request method**: POST

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Upload a new engine plugin

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | ------------------ | -------- | -------- | --- ---------- | ------ |
| file | engine material file compression package | body | true | MultipartFile | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | dataset | object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{
     "method": null,
     "status": 0,
     "message": "OK",
     "data": {
         "mess": "upload file success"
     }
}
```



## Remove engine plugins

**Interface address**:/api/rest_j/v1/engineplugin/deleteEnginePluginBML

**Request method**: GET

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**:`*/*`

**Interface Description**:

Delete the specified engine plugin

**Request parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | ------------ | -------- | -------- | -------- | ------ |
| ecType | engine type name | qurey | true | String | |
| version | engine version | qurey | false | String | |

**Response Status**:

| status code | description | schema |
| ------ | ------------ | ------- |
| 200 | OK | Message |
| 401 | Unauthorized | |
| 403 | Forbidden | |
| 404 | Not Found | |

**Response parameters**:

| parameter name | parameter description | type | schema |
| -------- | -------- | -------------- | -------------- |
| data | data set| object | |
| message | description | string | |
| method | request url | string | |
| status | status | integer(int32) | integer(int32) |

**Response Example**:

```
{"method":null,"status":0,"message":"OK","data":{"msg":"delete successfully"}}
```