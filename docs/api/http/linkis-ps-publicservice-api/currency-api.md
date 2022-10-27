---
title: Public API
sidebar_position: 6
---
** CommonRestfulApi class **

## offline


**Interface address**:`/api/rest_j/v1/offline`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Offline</p>



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