---
title: Resource Management
sidebar_position: 12
---
** RMMonitorRest class **




## All user resources


**Interface address**:`/api/rest_j/v1/linkisManager/rm/allUserResource`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>All user resources</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|creator|query|false|string|
|engineType|engineType|query|false|string|
|page|page|query|false|integer(int32)|
|size|size|query|false|integer(int32)|
|username|username|query|false|string|


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
				"cores": "instance": 0
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
````


## Application List


**Interface address**: `/api/rest_j/v1/linkisManager/rm/applicationlist`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Get the list of application engines in resource management</p>

**Request example**:
````javascript
{
    userCreator: ""
}
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userCreator|userCreator|query|true|String|


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
````

## EngineType

**Interface address**: `/api/rest_j/v1/linkisManager/rm/engineType`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface Description**:<p>Engine Type</p>



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


## Engine manager


**Interface address**: `/api/rest_j/v1/linkisManager/rm/engines`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface Description**:<p>Engine Manager</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|false|object|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## queue manager


**Interface address**: `/api/rest_j/v1/linkisManager/rm/queueresources`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Queue Manager</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|true|object|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## queue


**Interface address**: `/api/rest_j/v1/linkisManager/rm/queues`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Queue</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|false|object|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````
## reset resources


**Interface address**:`/api/rest_j/v1/linkisManager/rm/resetResource`


**Request method**: `DELETE`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Reset resources</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|resourceId|query|false|integer(int32)|


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


## Resource information


**Interface address**: `/api/rest_j/v1/linkisManager/rm/userresources`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Query resource list and detailed resource data such as usage percentage</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|param|param|body|false|object|


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
````