---
title: RPC Interface
sidebar_position: 13
---
** RPCReceiveRestful class **



## take over


**Interface address**:`/api/rest_j/v1/rpc/receive`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>rpc receive</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object||
|message|Description|string||
|method|request url|string||
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


## Receive and reply


**Interface address**: `/api/rest_j/v1/rpc/receiveAndReply`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>rpc receive and reply</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object||
|message|Description|string||
|method|request url|string||
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


## Reply


**Interface address**: `/api/rest_j/v1/rpc/replyInMills`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>rpc reply</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object||
|message|Description|string||
|method|request url|string||
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