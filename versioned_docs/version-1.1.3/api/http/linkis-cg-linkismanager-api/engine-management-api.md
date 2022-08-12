---
title: Engine Management
sidebar_position: 11
---
** EngineRestfulApi class **




## create engine connection


**Interface address**:`/api/rest_j/v1/linkisManager/createEngineConn`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Create engine connection</p>



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


## Execute engine connection operation


**Interface address**: `/api/rest_j/v1/linkisManager/executeEngineConnOperation`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Execute engine connection operation</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|jsonNode|jsonNode|body|true|JsonNode|JsonNode|


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
## Get engine connection


**Interface address**: `/api/rest_j/v1/linkisManager/getEngineConn`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Get engine connection</p>



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


##kill engine connection


**Interface address**: `/api/rest_j/v1/linkisManager/killEngineConn`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>kill engine connection</p>



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


## All node states


**Interface address**:`/api/rest_j/v1/linkisManager/listAllNodeHealthyStatus`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `application/json`


**Interface description**:<p>All node status</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|onlyEditable|onlyEditable|query|false|boolean|


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
    "method": "/api/linkisManager/listAllNodeHealthyStatus",
    "status": 0,
    "message": "OK",
    "data": {
    "nodeStatus": []
    }
}
````


## List engine


**Interface address**: `/api/rest_j/v1/linkisManager/listEMEngines`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>List Engine</p>

**Request example**:
````javascript
{
    em: {
    serviceInstance: {
    applicationName: "linkis-cg-engineconnmanager",
    instance: "bdpdws110003:9102"
         }
    }
}
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|Engine tag name, which belongs to the value in serviceInstance|String|false|String|
|em|The outermost layer of the input parameter|Map|false|Map|
|emInstance|The name of the engine instance and the level of 'em' belong to the outermost layer|String|false|String|
|engineType|The engine type belongs to the outermost level with the same level as 'em'|String|false|String|
|instance|Instance name|String|false|String|
|nodeStatus|The status is the outermost level with 'em', and the status has the following enumeration types 'Healthy', 'UnHealthy', 'WARN', 'StockAvailable', 'StockUnavailable'|String|false|String|
|owner|The creator is at the same level as 'em' and belongs to the outermost layer|String|false|String|
|serviceInstance|The input parameter belongs to ''em|Map|false|Map|


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
    "method": "/api/linkisManager/listEMEngines",
    "status": 0,
    "message": "OK",
    "data": {
        "engines": []
    }
}
````
## Engine user collection


**Interface address**:`/api/rest_j/v1/linkisManager/listUserEngines`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `application/json`


**Interface description**:<p>Engine user set</p>



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


## Edit engine instance


**Interface address**:`/api/rest_j/v1/linkisManager/modifyEngineInfo`


**Request method**: `PUT`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Edit engine instance content</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|Engine Label|false|String|String|
|emStatus|Running Status|false|String|String|
|instance|Engine instance name|false|String|String|
|labelKey|The label in the added content belongs to the key in the map in the labels collection|false|String|String|
|labels|The engine instance updates the parameter content, and the collection stores the map type |false|List|List|
|stringValue|The value of the label in the added content belongs to the value in the map in the labels collection|false|String|String|


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


##kill engine


**Interface address**: `/api/rest_j/v1/linkisManager/rm/enginekill`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `application/json`


**Interface description**:<p>Close the engine, one or more can be closed</p>


**Request example**:
````javascript
    [
     {
         engineInstance: "",
         applicationName:""
      }
    ]

````

**Request Parameters**:


| Parameter name | Parameter description | Required | Request type  | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|The application name, the outermost layer is an array and the engineInstance parameter is a level|false|String|String|
|engineInstance|The name of the engine instance, the outermost layer is an array and the applicationName parameter is a level|false|String|String|


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