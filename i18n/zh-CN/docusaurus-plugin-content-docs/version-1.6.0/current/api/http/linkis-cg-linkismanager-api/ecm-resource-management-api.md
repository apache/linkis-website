---
title: ECM资源管理
sidebar_position: 3
---
** EMRestfulApi 类 **



## 执行ECM操作


**接口地址**:`/api/rest_j/v1/linkisManager/executeECMOperation`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:


**请求参数**:


暂无


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


## 执行ECM操作开始


**接口地址**:`/api/rest_j/v1/linkisManager/executeECMOperationByEC`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:


**请求参数**:


暂无


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


## ECM管理中状态列表


**接口地址**:`/api/rest_j/v1/linkisManager/listAllECMHealthyStatus`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>获取状态列表清单</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|onlyEditable|是否仅可编辑|query|false|boolean|


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
	"method": "/api/linkisManager/listAllECMHealthyStatus",
	"status": 0,
	"message": "OK",
	"data": {
		"nodeHealthy": []
	}
}
```


## ECM资源清单


**接口地址**:`/api/rest_j/v1/linkisManager/listAllEMs`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>获取所有ECM资源详细清单列表可根据条件查询，默认查询所有</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|instance|实例名称|query|false|string|
|nodeHealthy|状态，状态有以下枚举类型 ‘Healthy‘, ‘UnHealthy‘, ‘WARN‘, ’StockAvailable’, ‘StockUnavailable’|query|false|string|
|owner|创建者|query|false|string|


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
	"method": "/api/linkisManager/listAllEMs",
	"status": 0,
	"message": "OK",
	"data": {
		"EMs": [{
			"labels": [{
				"stringValue": "",
				"labelKey": "",
				"feature": "",
				"instance": "",
				"serviceInstance": {
					"instance": "",
					"applicationName": ""
				},
				"serviceName": "",
				"featureKey": "",
				"empty": 
			}],
			"applicationName": "",
			"instance": ":",
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
				"memory": 0,
				"cores": 0,
				"instance": 0
			},
			"expectedResource": {
				"memory": 0,
				"cores": 0,
				"instance": 0
			},
			"leftResource": {
				"memory": ,
				"cores": ,
				"instance": 
			},
			"owner": "",
			"runningTasks": null,
			"pendingTasks": null,
			"succeedTasks": null,
			"failedTasks": null,
			"maxMemory": ,
			"usedMemory": ,
			"systemCPUUsed": null,
			"systemLeftMemory": ,
			"nodeHealthy": "",
			"msg": "",
			"startTime": 
		}]
	}
}
```


## 编辑EMC实例


**接口地址**:`/api/rest_j/v1/linkisManager/modifyEMInfo`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>编辑或修改下编辑EMC管理下的实例</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|引擎标签|false|String|String|
|emStatus|实例状态,状态有以下枚举类型 ‘Healthy‘, ‘UnHealthy‘, ‘WARN‘, ’StockAvailable’, ‘StockUnavailable’|false|String|String|
|instance|引擎实例名称|false|String|String|
|labelKey|添加内容里面的标签，属于labels集合 内 map里的key|false|String|String|
|labels|引擎实例更新参数内容，集合存放的是map类型的|false|List|List|
|stringValue|添加内容里面的标签对于的值，属于labels集合 内 map里的value|false|String|String|


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
	"method": "/api/linkisManager/modifyEMInfo",
	"status": 0,
	"message": "success",
	"data": {}
}
```


## 打开引擎日志


**接口地址**:`/api/rest_j/v1/linkisManager/openEngineLog`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>打开引擎日志，默认打开stdout类型的引擎日志</p>

**请求示例**:
```javascript
{
	applicationName: ""
	emInstance: ""
	instance: ""
	parameters: {
		pageSize: ,
		fromLine: ,
		logType: ""
	}
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|引擎标签|String|false|String|
|emInstance|实例名称|String|false|String|
|fromLine|来自线路|String|false|String|
|instance|引擎实例名称|String|false|String|
|logType|日志类型，默认stdout类型，属于parameters|String|false|String|
|pageSize|页面大小|String|false|String|
|parameters|分页信息|Map|false|Map|


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
	"method": "/api/linkisManager/openEngineLog",
	"status": 0,
	"message": "OK",
	"data": {
		"result": {
			"logPath": "",
			"logs": [""],
			"endLine": ,
			"rows": 
		},
		"isError": false,
		"errorMsg": ""
	}
}
```

