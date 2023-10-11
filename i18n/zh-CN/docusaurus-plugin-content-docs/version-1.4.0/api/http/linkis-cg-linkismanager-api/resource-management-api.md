---
title: 资源管理
sidebar_position: 1
---
** RMMonitorRest 类 **




## 所有用户资源


**接口地址**:`/api/rest_j/v1/linkisManager/rm/allUserResource`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>所有用户资源</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|creator|query|false|string|
|engineType|engineType|query|false|string|
|page|page|query|false|integer(int32)|
|size|size|query|false|integer(int32)|
|username|username|query|false|string|


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
	"method": null,
	"status": 0,
	"message": "OK",
	"data": {
		"total": 34,
		"resources": [{
			"id": ,
			"username": "",
			"creator": "",
			"engineTypeWithVersion": "",
			"resourceType": "",
			"maxResource": {
				"memory": ,
				"cores": ,
				"instance": 
			},
			"minResource": {
				"memory": ,
				"cores": 
				"instance": 0
			},
			"usedResource": {
				"memory": ,
				"cores": ,
				"instance": 
			},
			"lockedResource": {
				"memory": 0,
				"cores": 0,
				"instance": 0
			},
			"expectedResource": null,
			"leftResource": {
				"memory": ,
				"cores": ,
				"instance": 
			},
			"createTime": ,
			"updateTime": ,
			"loadResourceStatus": "",
			"queueResourceStatus": 
		}]
	}
}
```


## 应用列表


**接口地址**:`/api/rest_j/v1/linkisManager/rm/applicationlist`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>获取资源管理中的应用引擎列表清单</p>

**请求示例**:
```javascript
{
	userCreator: ""
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userCreator|userCreator|query|true|String|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
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
	"method": ,
	"status": ,
	"message": "",
	"data": {
		"applications": [{
			"creator": "",
			"applicationList": {
				"usedResource": {
					"memory": ,
					"cores": ,
					"instance": 
				},
				"maxResource": {
					"memory": ,
					"cores": ,
					"instance": 
				},
				"lockedResource": {
					"memory": ,
					"cores": ,
					"instance": 
				},
				"minResource": {
					"memory": ,
					"cores": ,
					"instance": 
				},
				"engineInstances": [{
					"resource": {
						"resourceType": "",
						"maxResource": {
							"memory": ,
							"cores": ,
							"instance": 
						},
						"minResource": {
							"memory": ,
							"cores": ,
							"instance": 
						},
						"usedResource": {
							"memory": ,
							"cores": ,
							"instance": 
						},
						"lockedResource": {
							"memory": ,
							"cores": ,
							"instance": 
						},
						"expectedResource": null,
						"leftResource": {
							"memory": ,
							"cores": ,
							"instance": 
						}
					},
					"engineType": "",
					"owner": "",
					"instance": "",
					"creator": "",
					"startTime": "",
					"status": "",
					"label": ""
				}]
			}
		}]
	}
}
```


## 引擎类型


**接口地址**:`/api/rest_j/v1/linkisManager/rm/engineType`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>引擎类型</p>



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


## 引擎管理器


**接口地址**:`/api/rest_j/v1/linkisManager/rm/engines`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>引擎管理器</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|false|object|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
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


## 队列管理器


**接口地址**:`/api/rest_j/v1/linkisManager/rm/queueresources`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>队列管理器</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|true|object|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
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


## 队列


**接口地址**:`/api/rest_j/v1/linkisManager/rm/queues`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>队列</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|false|object|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
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


## 重置资源


**接口地址**:`/api/rest_j/v1/linkisManager/rm/resetResource`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>重置资源</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|resourceId|query|false|integer(int32)|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|204|No Content|
|401|Unauthorized|
|403|Forbidden|


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


## 资源信息


**接口地址**:`/api/rest_j/v1/linkisManager/rm/userresources`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>查询资源列表清单及资源详细数据如使用百分比</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|false|object|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
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
	"method": null,
	"status": 0,
	"message": "OK",
	"data": {
		"userResources": [{
			"userCreator": "",
			"engineTypes": [{
				"engineType": "",
				"percent": ""
			}],
			"percent": ""
		}]
	}
}
```

