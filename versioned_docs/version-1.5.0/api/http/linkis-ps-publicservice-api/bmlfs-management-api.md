---
title: BMLFS Management
sidebar_position: 18
---
** BMLFsRestfulApi class **



## Open ScriptFromBML


**Interface address**:`/api/rest_j/v1/filesystem/openScriptFromBML`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>openScriptFromBML</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|fileName|File name|query|true|string|
|creator|Creator|query|false|string|
|projectName|Project name|query|false|string|
|resourceId|ResourceId|query|false|string|
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


## -product-openScriptFromBML


**Interface address**:`/api/rest_j/v1/filesystem/product/openScriptFromBML`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>/product/openScriptFromBML</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|fileName|File name|query|true|string|
|creator|Creator|query|false|string|
|resourceId|ResourceId|query|false|string|
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


## Save script from BML


**Interface address**:`/api/rest_j/v1/filesystem/saveScriptToBML`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Save script from BML</p>



**Request Parameters**:


| Parameter name | Parameter description | Required  | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|Creator|true|String|String|
|fileName|File name|true|String|String|
|metadata|metadata|true|String|String|
|projectName|Project Name|true|String|String|
|resourceId|Resource ID|true|String|String|
|scriptContent|Content|true|String|String|
|SaveScriptToBML|json|body|true|SaveScriptToBML|SaveScriptToBML|


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