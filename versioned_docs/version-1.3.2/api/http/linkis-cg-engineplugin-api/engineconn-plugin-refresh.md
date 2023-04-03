---
title: Engine Material Refresh Interface
sidebar_position: 0.1
---
>The material resources mainly used for the engine (under {LINKIS_INSTALL_HOME}/lib/linkis-engineconn-plugin, the jar package/configuration file of the engine) are updated to BML.

## refresh

**Interface address**:`/api/rest_j/v1/engineplugin/refresh`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**: Update the material resources of the specified engine


**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ecType|Engine Type|query|true|string||
|version|version can be empty or *|query|false|string||

**Sample Request**:
```
#url
http://ip:port/api/rest_j/v1/engineplugin/refresh?ecType=hive&version=v2.3.3 

#Request Header
Content-Type:application/json
Token-Code:BML-AUTH
Token-User:hadoop  
```


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|


**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "msg": "Refresh successfully"
    }
}
````


##refreshAll


**Interface address**:`/api/rest_j/v1/engineplugin/refreshAll`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**: Update material resources of all engines


**Request Parameters**:
none

**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|


**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "msg": "Refresh successfully"
    }
}
````