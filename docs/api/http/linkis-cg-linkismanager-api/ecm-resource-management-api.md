---
title: ECM Resource Information Management
sidebar_position: 10
---
** ECResourceInfoRestfulApi class **




## delete EC info


**Interface address**:`/api/rest_j/v1/linkisManager/ecinfo/delete/{ticketid}}`


**Request method**: `DELETE`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `application/json`


**Interface description**:<p>Delete EC information</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ticketid|ticketid|path|true|string|


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|204|No Content|
|401|Unauthorized|
|403|Forbidden|


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


## Get EC information


**Interface address**: `/api/rest_j/v1/linkisManager/ecinfo/get`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `application/json`


**Interface description**:<p>Get EC information</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ticketid|ticketid|query|true|string|


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
## ECM resource list


**Interface address**: `/api/rest_j/v1/linkisManager/listAllEMs`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `application/json`


**Interface description**:<p>Get a detailed list of all ECM resources, which can be queried according to conditions, and query all by default</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|instance|instance name|query|false|string|
|nodeHealthy|Status, the status has the following enumeration types 'Healthy', 'UnHealthy', 'WARN', 'StockAvailable', 'StockUnavailable'|query|false|string|
|owner|Creator|query|false|string|


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
````


## Edit EMC instance


**Interface address**: `/api/rest_j/v1/linkisManager/modifyEMInfo`


**Request method**: `PUT`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Edit or modify the instance under EMC management</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|Engine Label|false|String|String|
|emStatus|Instance status, the status has the following enumeration types 'Healthy', 'UnHealthy', 'WARN', 'StockAvailable', 'StockUnavailable'|false|String|String|
|instance|Engine instance name|false|String|String|
|labelKey|The label in the added content belongs to the key in the map in the labels collection|false|String|String|
|labels|The engine instance updates the parameter content, and the collection stores the map type |false|List|List|
|stringValue|The value of the label in the added content belongs to the value in the map in the labels collection|false|String|String|


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|201|Created|
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
    "method": "/api/linkisManager/modifyEMInfo",
    "status": 0,
    "message": "success",
    "data": {}
}
````


## Open engine log


**Interface address**: `/api/rest_j/v1/linkisManager/openEngineLog`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Open the engine log, the stdout type engine log is opened by default</p>

**Request example**:
````javascript
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
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|Engine Label|String|false|String|
|emInstance|Instance name|String|false|String|
|fromLine|From Line|String|false|String|
|instance|Engine instance name|String|false|String|
|logType|Log type, default stdout type, belonging to parameters|String|false|String|
|pageSize|Page Size|String|false|String|
|parameters|Pagination information|Map|false|Map|


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|201|Created|
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
````