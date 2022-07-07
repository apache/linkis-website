---
title: Admin Console Home Page Interface
sidebar_position: 28
---
** QueryRestfulApi class **


## admin authentication


**Interface address**:`/api/rest_j/v1/jobhistory/governanceStationAdmin`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Used to verify whether it is an administrator, if it is, it will return true if it is not false</p>



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
	data: {
		solution: null,
		admin: true
	}
	message: "OK"
	method: "/api/jobhistory/governanceStationAdmin"
	status: 0
}
````


## global history


**Interface address**:`/api/rest_j/v1/jobhistory/list`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Acquire global historical data list according to conditions and get all by default</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|Creator|query|false|string|
|endDate|End time|query|false|integer(int64)|
|executeApplicationName|operator|query|false|string|
|isAdminView|Whether it is in administrator mode or normal mode|query|false|boolean|
|pageSize|Number of pages|query|false|ref|
|proxyUser|Proxy User|query|false|string|
|startDate|Start time|query|false|integer(int64)|
|status|end time|query|false|string|
|taskID|ID|query|false|integer(int64)|
|tpageNow|page number|query|false|ref|
|pageNow|pageNow|query|false|integer(int32)|


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
````
## list undo


**Interface address**:`/api/rest_j/v1/jobhistory/listundone`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Undo list</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|creator|query|false|string|
|endDate|End time|query|false|integer(int64)|
|engineType|engineType|query|false|string|
|pageNow|pageNow|query|false|ref|
|pageSize|pageSize|query|false|ref|
|startDate|Start time|query|false|ref|
|startTaskID|startTaskID|query|false|integer(int64)|
|status|status|query|false|string|


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


## History details


**Interface address**:`/api/rest_j/v1/jobhistory/{id}/get`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get the detailed information of a history through the history ID</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|HistoryId|query|false|integer(int64)|


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



