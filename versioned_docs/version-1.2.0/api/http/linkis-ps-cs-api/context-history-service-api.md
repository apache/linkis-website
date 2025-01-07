---
title: Context History Service
sidebar_position: 14
---
** ContextHistoryRestfulApi class **



## create history


**Interface address**:`/api/rest_j/v1/contextservice/createHistory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface Description**:<p>Create History</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
| Parameter name | Parameter description | Required   | Request type| Data type | schema |
|contextHistory|History context|false|String|String|
|contextID|context id|false|String|String|


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


## Get multiple histories


**Interface address**:`/api/rest_j/v1/contextservice/getHistories`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Get multiple history records</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
| Parameter name | Parameter description | Required   | Request type| Data type | schema |
|contextID|context id|false|String|String|


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


## Get history


**Interface address**:`/api/rest_j/v1/contextservice/getHistory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Get history records</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
| Parameter name | Parameter description | Required   | Request type| Data type | schema |
|contextID|ContextId|false|String|String|
|source|Context Source|false|String|String|


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


## delete history


**Interface address**:`/api/rest_j/v1/contextservice/removeHistory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete history records</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
| Parameter name | Parameter description | Required   | Request type| Data type | schema |
|contextHistory|History context|false|String|String|
|contextID|context id|false|String|String|


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


## search history


**Interface address**:`/api/rest_j/v1/contextservice/searchHistory`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Search history</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
| Parameter name | Parameter description | Required   | Request type| Data type | schema |
|contextID|ContextId|false|String|String|
|keywords|Keywords|false|String|String|


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