---
title: Global Variable Api
sidebar_position: 23
---
** VariableRestfulApi class **


## add global variables


**Interface address**:`/api/rest_j/v1/variable/saveGlobalVariable`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Add global variables</p>

**Request example**:
````javascript
{
    globalVariables: [{
        keyID: ,
        key: "",
        valueID: ,
        value: ""
    }]
}
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|globalVariables|Added parameter data one-to-many key:globalVariables,value:List|Map|true|Map|
|key|Parameter name, belonging to globalVariables|String|true|String|
|value| variable value, and key belong to the key-value pair that is contained by globalVariables |List|true|List|


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
    "method": "/api/variable/saveGlobalVariable",
    "status": 0,
    "message": "OK",
    "data": {}
}
````