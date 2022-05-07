---
title: Engine Material Refresh Interface
sidebar_position: 0.1
---
>The material resources mainly used for the engine (under {LINKIS_INSTALL_HOME}/lib/linkis-engineconn-plugin, the jar package/configuration file of the engine) are updated to BML.

## refesh

**Interface address**:`/api/rest_j/v1/engineplugin/refesh`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**: Update the material resources of the specified engine


**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ecType|Engine Type|query|true|string||
|version|version can be empty or *|query|false|string||


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


##refeshAll


**Interface address**:`/api/rest_j/v1/engineplugin/refeshAll`


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