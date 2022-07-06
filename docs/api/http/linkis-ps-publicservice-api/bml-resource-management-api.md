---
title: BML Resource Management
sidebar_position: 30
---
** BmlRestfulApi class **


## update owner


**Interface address**:`/api/rest_j/v1/bml/changeOwner`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Update owner</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|newOwner|Old Owner||false|String|String|
|oldOwner|New Owner||false|String|String|
|resourceId|ResourceId||false|String|String|


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

## Copy resources to other users


**Interface address**:`/api/rest_j/v1/bml/copyResourceToAnotherUser`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Copy resources to specified user</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|anotherUser|specified user||false|String|String|
|resourceId|ResourceId||false|String|String|


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
## delete resource


**Interface address**:`/api/rest_j/v1/bml/deleteResource`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete version</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|ResourceId||true|String|String|


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


## delete multiple resources


**Interface address**:`/api/rest_j/v1/bml/deleteResources`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete multiple resources</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceIds| Collection of resource IDs, delete multiple resources||true|List|List|


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
## delete version


**Interface address**:`/api/rest_j/v1/bml/deleteVersion`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete version</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|ResourceId||true|String|String|
|version|version||true|String|String|


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


## Download resources


**Interface address**:`/api/rest_j/v1/bml/download`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get the resources corresponding to download through the two parameters of resourceId and version</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|ResourceId|query|false|string||
|version|Resource version, if not specified, defaults to latest |query|false|string||


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
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

## Get Basic


**Interface address**:`/api/rest_j/v1/bml/getBasic`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get Basic</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|ResourceId|query|true|string||


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
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


## Get resource information


**Interface address**:`/api/rest_j/v1/bml/getResourceInfo`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get resource information</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|ResourceId|query|false|string||


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
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


## Get resource information


**Interface address**:`/api/rest_j/v1/bml/getResources`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get resource information</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|currentPage|page number|query|false|string||
|pageSize|page size|query|false|string||
|system|system|query|false|string||


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
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

## Get version information


**Interface address**: `/api/rest_j/v1/bml/getVersions`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get bml version information</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|currentPage|page number|query|false|string||
|pageSize|page size|query|false|string||
|resourceId|Resource ID|query|false|string||


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
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


## rollback version


**Interface address**:`/api/rest_j/v1/bml/rollbackVersion`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Rollback version</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resourceId|ResourceId||false|String|String|
|version|Rollback version||false|String|String|


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


## update resource


**Interface address**:`/api/rest_j/v1/bml/updateVersion`


**Request method**: `POST`


**Request data type**: `multipart/form-data`


**Response data type**: `*/*`


**Interface description**:<p>Users update resource files through http</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|file|filefile|formData|true|ref||
|resourceId|resourceId|query|true|string|| of the resource the user wishes to update


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


## upload resources


**Interface address**:`/api/rest_j/v1/bml/upload`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Upload resources</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|file|file|formData|true|array|file|
|expireTime|expireTime|query|false|string||
|expireType|expireType|query|false|string||
|isExpire|isExpire|query|false|string||
|maxVersion|maxVersion|query|false|integer(int32)||
|resourceHeader|resourceHeader|query|false|string||
|system|system|query|false|string||


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