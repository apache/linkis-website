---
title: 引擎插件API
sidebar_position: 3
---

** EnginePluginRestful 类 **

## 刷新


**接口地址**:`/api/rest_j/v1/engineplugin/refresh`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>刷新单个资源</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ecType|类型|query|false|string|
|version|版本|query|false|string|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## 刷新所有


**接口地址**:`/api/rest_j/v1/engineplugin/refreshAll`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>刷新所有ec resource</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## 回滚

**接口地址**:`/api/rest_j/v1/engineplugin/rollBack`

**请求方式**:`POST`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

回滚当前引擎插件的物料版本

**请求参数**:

| 参数名称              | 参数说明                  | 请求类型 | 是否必须 | 数据类型              | schema |
| --------------------- | ------------------------- | -------- | -------- | --------------------- | ------ |
| engineConnBmlResource | EngineConnBmlResource实体 | body     | true     | EngineConnBmlResource |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

```
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {}
}
```

## 获取引擎在物料中的所有版本

**接口地址**:/api/rest_j/v1/engineplugin/getVersionList

**请求方式**:GET

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

获取引擎插件在物料管理系统中的所有版本

**请求参数**:

| 参数名称      | 参数说明         | 请求类型 | 是否必须 | 数据类型              | schema |
| ------------- | ---------------- | -------- | -------- | --------------------- | ------ |
| bmlResourceId | 引擎的物料资源id | body     | true     | EngineConnBmlResource |        |
| ecType        | 引擎名称         | body     | false    | String                |        |
| version       | 引擎版本         | body     | false    | String                |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

```
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {}
}
```



## 获取所有引擎名称

**接口地址**:/api/rest_j/v1/engineplugin/getTypeList

**请求方式**:GET

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

获取所有类型的引擎名称

**请求参数**



**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

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
            "openlookeng",
            "python",
            "shell",
            "spark"
        ]
    }
}
```



## 获取引擎的所有版本

**接口地址**:/api/rest_j/v1/engineplugin/getTypeVersionList/{type}

**请求方式**:GET

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

获取所有类型的引擎名称

**请求参数**:

| 参数名称 | 参数说明       | 请求类型 | 是否必须 | 数据类型 | schema |
| -------- | -------------- | -------- | -------- | -------- | ------ |
| type     | 引擎的类型名称 | path     | true     | String   |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

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



## 更新引擎插件

**接口地址**:/api/rest_j/v1/engineplugin/updateEnginePluginBML

**请求方式**:POST

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

更新指定引擎插件

**请求参数**:

| 参数名称 | 参数说明     | 请求类型 | 是否必须 | 数据类型      | schema |
| -------- | ------------ | -------- | -------- | ------------- | ------ |
| file     | 引擎物料文件 | body     | true     | MultipartFile |        |
| ecType   | 引擎类型名称 | body     | true     | String        |        |
| version  | 引擎版本     | body     | true     | String        |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

```
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "mes": "upload file success"
    }
}
```



## 引擎插件

**接口地址**:/api/rest_j/v1/engineplugin/list

**请求方式**:GET

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

请求所有引擎插件信息

**请求参数**:

| 参数名称    | 参数说明     | 请求类型 | 是否必须 | 数据类型       | schema |
| ----------- | ------------ | -------- | -------- | -------------- | ------ |
| currentPage | 当前页面     | qurey    | true     | integer(int32) |        |
| ecType      | 引擎类型名称 | qurey    | false    | String         |        |
| version     | 引擎版本     | qurey    | false    | String         |        |
| pageSize    | 页面大小     | qurey    | true     | integer(int32) |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

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



## 新增引擎插件

**接口地址**:/api/rest_j/v1/engineplugin/uploadEnginePluginBML

**请求方式**:POST

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

上传新增一个引擎插件

**请求参数**:

| 参数名称 | 参数说明           | 请求类型 | 是否必须 | 数据类型      | schema |
| -------- | ------------------ | -------- | -------- | ------------- | ------ |
| file     | 引擎物料文件压缩包 | body     | true     | MultipartFile |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

```
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "mes": "upload file success"
    }
}
```



## 删除引擎插件

**接口地址**:/api/rest_j/v1/engineplugin/deleteEnginePluginBML

**请求方式**:GET

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:

删除指定引擎插件

**请求参数**:

| 参数名称 | 参数说明     | 请求类型 | 是否必须 | 数据类型 | schema |
| -------- | ------------ | -------- | -------- | -------- | ------ |
| ecType   | 引擎类型名称 | qurey    | true     | String   |        |
| version  | 引擎版本     | qurey    | false    | String   |        |

**响应状态**:

| 状态码 | 说明         | schema  |
| ------ | ------------ | ------- |
| 200    | OK           | Message |
| 401    | Unauthorized |         |
| 403    | Forbidden    |         |
| 404    | Not Found    |         |

**响应参数**:

| 参数名称 | 参数说明 | 类型           | schema         |
| -------- | -------- | -------------- | -------------- |
| data     | 数据集   | object         |                |
| message  | 描述     | string         |                |
| method   | 请求url  | string         |                |
| status   | 状态     | integer(int32) | integer(int32) |

**响应示例**:

```
{"method":null,"status":0,"message":"OK","data":{"msg":"delete successfully"}}
```
