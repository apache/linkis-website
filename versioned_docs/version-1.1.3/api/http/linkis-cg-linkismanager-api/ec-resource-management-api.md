---
title: EC Resource Information Management
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