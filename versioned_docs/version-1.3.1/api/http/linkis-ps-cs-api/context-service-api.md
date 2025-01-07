---
title: Context API
sidebar_position: 15
---
** ContextRestfulApi class **



## Clear all context by ID


**Interface address**: `/api/rest_j/v1/contextservice/clearAllContextByID`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Clear all context by ID</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|idList|Context id collection|false|String|String|


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


## Clear all context by time


**Interface address**:`/api/rest_j/v1/contextservice/clearAllContextByTime`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Clear so context by time</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|bodyMap|bodyMap|body|true|object|
|accessTimeEnd|Access Time End|false|String|String|
|accessTimeStart|Access Time Start|false|String|String|
|createTimeEnd|Create time end|false|String|String|
|createTimeStart|Create Time|false|String|String|
|updateTimeStart|Update start time|false|String|String|


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
## Get context content


**Interface address**:`/api/rest_j/v1/contextservice/getContextValue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Get context content</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|context id|false|String|String|
|contextKey|contextKey|false|String|String|


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


## delete all values


**Interface address**:`/api/rest_j/v1/contextservice/removeAllValue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete all values</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|context id|false|String|String|
|contextKey|contextKey|false|String|String|


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


## Remove all values ​​by value prefix


**Interface address**:`/api/rest_j/v1/contextservice/removeAllValueByKeyPrefix`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Remove all values ​​by prefix and context type</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|contextID|false|String|String|
|keyPrefix|keyPrefix|false|String|String|


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


## Remove all values ​​by key prefix and context type


**Interface address**:`/api/rest_j/v1/contextservice/removeAllValueByKeyPrefixAndContextType`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Remove all values ​​by prefix and context type</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextKeyType|contextKeyType|false|String|String|
|keyPrefix|keyPrefix|false|String|String|


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

## delete value


**Interface address**:`/api/rest_j/v1/contextservice/removeValue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete value</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|context id|false|String|String|
|contextKey|contextKey|false|String|String|


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


## reset value


**Interface address**:`/api/rest_j/v1/contextservice/resetValue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Reset value</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|context id|false|String|String|
|contextKey|contextKey|false|String|String|


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


## search context content


**Interface address**:`/api/rest_j/v1/contextservice/searchContextValue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Search context content</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|condition|condition|false|String|String|
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


## set value


**Interface address**:`/api/rest_j/v1/contextservice/setValue`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Set value</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|context id|false|String|String|
|contextKeyValue|contextKeyValue|false|String|String|


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


## set key


**Interface address**:`/api/rest_j/v1/contextservice/setValueByKey`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Set key for value</p>



**Request Parameters**:


| Parameter name | Parameter description | Required   | Request type| Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|
|contextID|context id|false|String|String|
|contextKey|contextKey|false|String|String|


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