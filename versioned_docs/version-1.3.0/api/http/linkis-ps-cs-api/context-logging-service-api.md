---
title: Context Logging Service
sidebar_position: 17
---
** ContextIDRestfulApi class **


## create text record


**Interface address**: `/api/rest_j/v1/contextservice/createContextID`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Create text record</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|jsonNode|jsonNode|body|true|JsonNode|JsonNode|
|contextID|ContextId|false|String|String|


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


## Get text ID


**Interface address**: `/api/rest_j/v1/contextservice/getContextID`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get text ID</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|contextId|ContextId|query|false|string|


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
## delete text ID


**Interface address**: `/api/rest_j/v1/contextservice/removeContextID`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete text ID</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|jsonNode|jsonNode|body|true|JsonNode|JsonNode|
|contextId|ContextId|false|String|String|


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


## reset text ID


**Interface address**: `/api/rest_j/v1/contextservice/resetContextID`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface Description**:<p>Reset Text ID</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|jsonNode|jsonNode|body|true|JsonNode|JsonNode|
|contextId|ContextId|false|String|String|


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


## Search text Id execution time


**Interface address**:`/api/rest_j/v1/contextservice/searchContextIDByTime`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Search text ID execution time</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|accessTimeEnd|Access end time|query|false|string|
|accessTimeStart|Access Start Time|query|false|string|
|createTimeEnd|Create end time|query|false|string|
|createTimeStart|create time|query|false|string|
|pageNow|page number|query|false|string|
|pageSize|page size|query|false|string|
|updateTimeEnd|Update end time|query|false|string|
|updateTimeStart|Update time|query|false|string|


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


## Modify text ID


**Interface address**: `/api/rest_j/v1/contextservice/updateContextID`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Modify text ID</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|jsonNode|jsonNode|body|true|JsonNode|JsonNode|
|contextId|ContextId|false|String|String|


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
