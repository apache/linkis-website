---
title: UDF Operations Management
sidebar_position: 16
---

** UDFApi class **

## new

**Interface address**:`/api/rest_j/v1/udf/add`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Added</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|clusterName|clusterName|false|String|String|
|createTime|CreateTime|false|Date|Date|
|createUser|Creator|false|String|String|
|description|Description|false|String|String|
|directory|Category, personal function first-level directory|false|String|String|
|isExpire| is invalid|false|Boolean|Boolean|
|isLoad|Whether to load|false|Boolean|Boolean|
|isShared|Shared|false|Boolean|Boolean|
|path|Only store the last uploaded path of the user for prompting|false|String|String|
|registerFormat|register execution address|false|String|String|
|sys|sys|false|String|String|
|treeId|treeId|false|Long|Long|
|udfName|udfName|false|String|String|
|udfType|udfType|false|Integer|Integer|
|updateTime|Update time|false|Date|Date|
|useFormat|Use Format|false|String|String|


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


## udf tree menu


**Interface address**:`/api/rest_j/v1/udf/all`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Get detailed information of udf tree menu</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|Request Path|false|String|String|
|jsonString|jsonString|false|string|string|


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


## Get udf user list


**Interface address**:`/api/rest_j/v1/udf/allUdfUsers`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get udf user list</p>



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


## confirmed


**Interface address**: `/api/rest_j/v1/udf/authenticate`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Prove...is real</p>



**Request Parameters**:


No


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

## delete


**Interface address**:`/api/rest_j/v1/udf/delete/{id}`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|false|integer|integer(int64)|


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


## udf file download to local


**Interface address**:`/api/rest_j/v1/udf/downloadToLocal`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Download UDF file to local according to version parameters</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## UDF View source code


**Interface address**:`/api/rest_j/v1/udf/downloadUdf`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p> UDF view source code</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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

## delete


**Interface address**:`/api/rest_j/v1/udf/delete/{id}`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|false|integer|integer(int64)|


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


## udf file download to local


**Interface address**:`/api/rest_j/v1/udf/downloadToLocal`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Download UDF file to local according to version parameters</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## UDF View source code


**Interface address**:`/api/rest_j/v1/udf/downloadUdf`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p> UDF view source code</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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

## Publish


**Interface address**:`/api/rest_j/v1/udf/publish`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>UDF version released</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## fallback version


**Interface address**:`/api/rest_j/v1/udf/rollback`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Back to version</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## set expiration


**Interface address**:`/api/rest_j/v1/udf/setExpire`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Setting expired</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|Long|Long|


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


## UDF sharing


**Interface address**: `/api/rest_j/v1/udf/shareUDF`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>UDF sharing</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sharedUsers|sharedUsers|false|List|List|
|udfInfo|udfInfo|false|UDFInfo|UDFInfo|


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


## tree new


**Interface address**:`/api/rest_j/v1/udf/tree/add`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>tree added</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|category|category|false|String|String|
|childrens|childrens|false|List|List|
|clusterName|clusterName|false|String|String|
|createTime|createTime|false|Date|Date|
|description|description|false|String|String|
|id|id|false|Long|Long|
|name|name|false|String|String|
|parent|parent|false|Long|Long|
|udfInfos|udfInfos|false|List|List|
|updateTime|updateTime|false|Date|Date|
|userName|userName|false|String|String|


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

## tree delete


**Interface address**:`/api/rest_j/v1/udf/tree/delete/{id}`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>tree delete</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|false|integer|integer(int64)|


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


## tree update


**Interface address**:`/api/rest_j/v1/udf/tree/update`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>tree update</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|category|category|false|String|String|
|childrens|childrens|false|List|List|
|clusterName|clusterName|false|String|String|
|createTime|createTime|false|Date|Date|
|description|description|false|String|String|
|id|id|false|Long|Long|
|name|name|false|String|String|
|parent|parent|false|Long|Long|
|udfInfos|udfInfos|false|List|List|
|updateTime|updateTime|false|Date|Date|
|userName|userName|false|String|String|


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


## renew


**Interface address**:`/api/rest_j/v1/udf/update`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>UDF modification</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|description|Description|false|String|String|
|id|id|false|Long|Long|
|isLoad|Whether to load|false|Boolean|Boolean|
|path|Only store the last uploaded path of the user for prompting|false|String|String|
|registerFormat|register execution address|false|String|String|
|udfName|udfName|false|String|String|
|udfType|udfType|false|Integer|Integer|
|useFormat|Use Format|false|String|String|


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


## Get user directory


**Interface address**: `/api/rest_j/v1/udf/userDirectory`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get the first-level classification of the user's personal function</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|category|Get the user directory of the specified collection type, if the type is UDF, get the user directory under this type |false|string|string|


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


## version list


**Interface address**:`/api/rest_j/v1/udf/versionList`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>View version list</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|integer(int64)|


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