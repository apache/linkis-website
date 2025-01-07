---
title: Parameter Configuration
sidebar_position: 24
---
** ConfigurationRestfulApi class **




## Add KeyForEngine


**Interface address**:`/api/rest_j/v1/configuration/addKeyForEngine`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Add KeyForEngine</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|engineType|engineType|query|false|string|
|keyJson|keyJson|query|false|string|
|token|token|query|false|string|
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


## Add application type


**Interface address**:`/api/rest_j/v1/configuration/createFirstCategory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Add application type tag</p>

**Request example**:
````javascript
{
    "categoryName": "",
    "description": ""
}
````

**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryName|Reference type label name|false|String|String|
|description|Description|false|String|STRing|


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
    "method": "/api/configuration/createFirstCategory",
    "status": 0,
    "message": "OK",
    "data": {}
}
````


## Add parameter configuration


**Interface address**:`/api/rest_j/v1/configuration/createSecondCategory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Add parameter configuration</p>

**Request example**:
````javascript
{
    categoryId: ,
    description: "",
    engineType: "",
    version: ""
}
````

**Request Parameters**:


| Parameter name | Parameter description |Required  | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|Parameter ConfigurationId|true|String|String|
|description|Description|true|String|String|
|engineType|Engine Type|true|String|String|
|version|version number|true|String|String|


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
    "method": "/api/configuration/createSecondCategory",
    "status": 0,
    "message": "OK",
    "data": {}
}
````


## delete configuration


**Interface address**: `/api/rest_j/v1/configuration/deleteCategory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete parameter configuration</p>

**Request example**:
````javascript
{
    categoryId:
}
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|Parameter ConfigurationId|String|true|String|


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
    "method": "/api/configuration/deleteCategory",
    "status": 0,
    "message": "OK",
    "data": {}
}
````


## Engine type list


**Interface address**:`/api/rest_j/v1/configuration/engineType`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get a list of engine types</p>



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
    "method": "/api/configuration/engineType",
    "status": 0,
    "message": "OK",
    "data": {
    "engineType": []
    }
}
````
## App types


**Interface address**: `/api/rest_j/v1/configuration/getCategory`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Apply type tag in parameter configuration</p>



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
	"method": "/api/configuration/getCategory",
	"status": 0,
	"message": "OK",
	"data": {
		"Category": [{
			"categoryId": ,
			"labelId": ,
			"categoryName": "",
			"childCategory": [],
			"description": null,
			"tag": null,
			"createTime": ,
			"updateTime": ,
			"level": ,
			"fatherCategoryName": ""
		}],
		"description": null,
		"tag": null,
		"createTime": ,
		"updateTime": ,
		"level": ,
		"fatherCategoryName":
	}]
}
}
````


## queue resources


**Interface address**:`/api/rest_j/v1/configuration/getFullTreesByAppName`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>The queue resource module in the parameter configuration returns the column and value of the queue resource</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|label name|query|false|string|
|engineType|engineType|query|false|string|
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
	"method": "/api/configuration/getFullTreesByAppName",
	"status": 0,
	"message": "OK",
	"data": {
		"fullTree": [{
			"name": "Queue Resource",
			"description": null,
			"settings": [{
				"id": ,
				"key": "",
				"description": "",
				"name": "",
				"defaultValue": "",
				"validateType": "",
				"validateRange": "[]",
				"level": 1,
				"engineType": ,
				"treeName": "",
				"valueId": ,
				"configValue": "",
				"configLabelId": ,
				"unit": null,
				"isUserDefined": ,
				"hidden": ,
				"advanced":
			}]
		}]
	}
}
````


## Get key value


**Interface address**:`/api/rest_j/v1/configuration/keyvalue`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get key value</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|configKey|configKey|query|true|string|
|creator|creator|query|false|string|
|engineType|engineType|query|false|string|
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
## save key value


**Interface address**:`/api/rest_j/v1/configuration/keyvalue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Save key value</p>



**Request Parameters**:


| Parameter name | Parameter description | Required |  Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|configKey|configKey|true|String|String|
|configValue|configValue|true|String|String|
|creator|creator|true|String|String|
|engineType|engineType|true|String|String|
|version|version|true|String|String|
|SaveKeyValue|json|body|true|SaveKeyValue|SaveKeyValue|


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


## delete key value


**Interface address**:`/api/rest_j/v1/configuration/keyvalue`


**Request method**: `DELETE`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Delete key value</p>



**Request Parameters**:


| Parameter name | Parameter description | Required  | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|configKey|configKey|true|String|String|
|creator|creator|true|String|String|
|engineType|engineType|true|String|String|
|version|version|true|String|String|


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


## rpc test


**Interface address**: `/api/rest_j/v1/configuration/rpcTest`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>rpc test</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|creator|query|false|string|
|engineType|engineType|query|false|string|
|username|username|query|false|string|
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


## Save queue resources


**Interface address**:`/api/rest_j/v1/configuration/saveFullTree`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Save queue resources</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|App Type Name|String|true|String|
|description|Description, belonging to the content in fullTree|String|true|String|
|engineType|Engine Type|String|true|String|
|fullTree|Details under Application Type|List|true|List|
|name|Queue resource name, which belongs to the content in fullTree|String|true|String|
|settings|Detailed content in the queue resource, belonging to the content in fullTree|List|true|List|


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
    "method": "/api/configuration/saveFullTree",
    "status": 0,
    "message": "OK",
    "data": {}
}
````


## Update category information


**Interface address**: `/api/rest_j/v1/configuration/updateCategoryInfo`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Update category information</p>


**Sample Response**:
````javascript
{
    description: "",
    categoryId:
}
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|categoryId|String|true|String|
|description|description|String|true|String|


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
    "method": "/api/configuration/updateCategoryInfo",
    "status": 0,
    "message": "OK",
    "data": {}
}
````