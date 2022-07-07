---
title: 管理台首页API
sidebar_position: 7
---
** QueryRestfulApi 类 **


## 管理员验证


**接口地址**:`/api/rest_j/v1/jobhistory/governanceStationAdmin`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>用来验证是否为管理员，如果是则返回true不是则false</p>



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
	data: {solution: null, admin: true}
        message: "OK"
        method: "/api/jobhistory/governanceStationAdmin"
        status: 0
}
```


## 全局历史


**接口地址**:`/api/rest_j/v1/jobhistory/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据条件获取全局历史数据列表默认获取全部</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|创建者|query|false|string|
|endDate|结束时间|query|false|integer(int64)|
|executeApplicationName|操作人|query|false|string|
|isAdminView|是否为管理员模式或者普通模式|query|false|boolean|
|pageSize|页面数量|query|false|ref|
|proxyUser|代理用户|query|false|string|
|startDate|开始时间|query|false|integer(int64)|
|status|结束时间|query|false|string|
|taskID|ID|query|false|integer(int64)|
|tpageNow|页码|query|false|ref|
|pageNow|pageNow|query|false|integer(int32)|


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
	{
	"method": "/api/jobhistory/list",
	"status": 0,
	"message": "OK",
	"data": {
		"solution": null,
		"totalPage": 90,
		"tasks": [{
			"taskID": ,
			"instance": ",
			"execId": "",
			"umUser": "",
			"engineInstance": null,
			"executionCode": "",
			"progress": "",
			"logPath": "",
			"resultLocation": "",
			"status": "",
			"createdTime": ,
			"updatedTime": ,
			"engineType": "",
			"errCode": 0,
			"errDesc": "",
			"executeApplicationName": "",
			"requestApplicationName": "",
			"runType": "datachecker",
			"paramsJson": "",
			"costTime": 1000,
			"strongerExecId": "",
			"sourceJson": "",
			"sourceTailor": "",
			"engineStartTime": null,
			"labels": [],
			"canRetry": ,
			"subJobs": 
		}]
	}
}
}
```


## 获取未完成任务列表


**接口地址**:`/api/rest_j/v1/jobhistory/listundone`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取未完成任务列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|creator|query|false|string|
|endDate|结束时间|query|false|integer(int64)|
|engineType|engineType|query|false|string|
|pageNow|pageNow|query|false|ref|
|pageSize|pageSize|query|false|ref|
|startDate|开始时间|query|false|ref|
|startTaskID|startTaskID|query|false|integer(int64)|
|status|status|query|false|string|


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


## job任务详细记录


**接口地址**:`/api/rest_j/v1/jobhistory/{id}/get`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>job任务详细记录</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|历史记录Id|query|false|integer(int64)|


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
	"method": "/api/jobhistory/1928730/get",
	"status": 0,
	"message": "OK",
	"data": {
		"task": {
			"taskID": ,
			"instance": "",
			"execId": "",
			"umUser": "",
			"engineInstance": "",
			"executionCode": "",
			"progress": "",
			"logPath": "",
			"resultLocation": "",
			"status": "",
			"createdTime":,
			"updatedTime": ,
			"engineType": "",
			"errCode": ,
			"errDesc": "",
			"executeApplicationName": "",
			"requestApplicationName": "",
			"runType": "hql",
			"paramsJson": "",
			"costTime": ,
			"strongerExecId": "",
			"sourceJson": "",
			"sourceTailor": "",
			"engineStartTime": null,
			"labels": [""],
			"canRetry": false,
			"subJobs": null
		}
	}
}
```



