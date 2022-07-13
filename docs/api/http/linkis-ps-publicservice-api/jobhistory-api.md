---
title: History Job Interface
sidebar_position: 3
---

** QueryRestfulApi class **

## governanceStationAdmin
**Interface address**:`/api/rest_j/v1/jobhistory/governanceStationAdmin`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Determine whether the user is an administrator

**Request Parameters**:
none

**Sample Response**:

````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "admin": true
    }
}
````


## getHistoryTask
**Interface address**:`/api/rest_j/v1/jobhistory/{id}/get`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Get the list of database names of the data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|string||

**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "task": {
                "taskID": 1,
                "instance": "xxx",
                "execId": "exec-id-xxx",
                "umUser": "test",
                "engineInstance": "xxx",
                "progress": "10%",
                "logPath": "hdfs://xxx/xxx/xxx",
                "resultLocation": "hdfs://xxx/xxx/xxx",
                "status": "FAILED",
                "createdTime": "2019-01-01 00:00:00",
                "updatedTime": "2019-01-01 01:00:00",
                "engineType": "spark",
                "errorCode": 100,
                "errDesc": "Task Failed with error code 100",
                "executeApplicationName": "hello world",
                "requestApplicationName": "hello world",
                "runType": "xxx",
                "paramJson": "{\"xxx\":\"xxx\"}",
                "costTime": 10000,
                "strongerExecId": "execId-xxx",
                "sourceJson": "{\"xxx\":\"xxx\"}"
        }
    }
}
````

## listHistoryTask
**Interface address**:`/api/rest_j/v1/jobhistory/list`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|startDate|startDate|path|false|Long||
|endDate|endDate|path|false|Long||
|status|status|path|false|string||
|pageNow|pageNow|path|false|Integer||
|pageSize|pageSize|path|false|Integer||
|taskID|taskID|path|false|Long||
|executeApplicationName|executeApplicationName|path|false|string||
|creator|creator|path|false|string||
|proxyUser|proxyUser|path|false|string||
|isAdminView|isAdminView|path|false|Boolean||

**Sample Response**:
````javascript
{
    "method": null,
        "status": 0,
        "message": "OK",
        "data": {
            "tasks": [{
                "taskID": 1,
                "instance": "xxx",
                "execId": "exec-id-xxx",
                "umUser": "test",
                "engineInstance": "xxx",
                "progress": "10%",
                "logPath": "hdfs://xxx/xxx/xxx",
                "resultLocation": "hdfs://xxx/xxx/xxx",
                "status": "FAILED",
                "createdTime": "2019-01-01 00:00:00",
                "updatedTime": "2019-01-01 01:00:00",
                "engineType": "spark",
                "errorCode": 100,
                "errDesc": "Task Failed with error code 100",
                "executeApplicationName": "hello world",
                "requestApplicationName": "hello world",
                "runType": "xxx",
                "paramJson": "{\"xxx\":\"xxx\"}",
                "costTime": 10000,
                "strongerExecId": "execId-xxx",
                "sourceJson": "{\"xxx\":\"xxx\"}"
            },
            {
                "taskID": 2,
                "instance": "xxx",
                "execId": "exec-id-xxx",
                "umUser": "test",
                "engineInstance": "xxx",
                "progress": "10%",
                "logPath": "hdfs://xxx/xxx/xxx",
                "resultLocation": "hdfs://xxx/xxx/xxx",
                "status": "FAILED",
                "createdTime": "2019-01-01 00:00:00",
                "updatedTime": "2019-01-01 01:00:00",
                "engineType": "spark",
                "errorCode": 100,
                "errDesc": "Task Failed with error code 100",
                "executeApplicationName": "hello world",
                "requestApplicationName": "hello world",
                "runType": "xxx",
                "paramJson": "{\"xxx\":\"xxx\"}",
                "costTime": 10000,
                "strongerExecId": "execId-xxx",
                "sourceJson": "{\"xxx\":\"xxx\"}"
            }],
            "totalPage": 1
    }
}
````

## listUndoneHistoryTask
**Interface address**:`/api/rest_j/v1/jobhistory/listundone`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|startDate|startDate|path|false|Long||
|endDate|endDate|path|false|Long||
|status|status|path|false|string||
|pageNow|pageNow|path|false|Integer||
|pageSize|pageSize|path|false|Integer||
|startTaskID|startTaskID|path|false|Long||
|engineType|engineType|path|false|string||
|creator|creator|path|false|string||

**Sample Response**:
````javascript
{
    "method": null,
        "status": 0,
        "message": "OK",
        "data": {
            "tasks": [{
                "taskID": 1,
                "instance": "xxx",
                "execId": "exec-id-xxx",
                "umUser": "test",
                "engineInstance": "xxx",
                "progress": "10%",
                "logPath": "hdfs://xxx/xxx/xxx",
                "resultLocation": "hdfs://xxx/xxx/xxx",
                "status": "Running",
                "createdTime": "2019-01-01 00:00:00",
                "updatedTime": "2019-01-01 01:00:00",
                "engineType": "spark",
                "errorCode": 100,
                "errDesc": "Task Failed with error code 100",
                "executeApplicationName": "hello world",
                "requestApplicationName": "hello world",
                "runType": "xxx",
                "paramJson": "{\"xxx\":\"xxx\"}",
                "costTime": 10000,
                "strongerExecId": "execId-xxx",
                "sourceJson": "{\"xxx\":\"xxx\"}"
            },
            {
                "taskID": 2,
                "instance": "xxx",
                "execId": "exec-id-xxx",
                "umUser": "test",
                "engineInstance": "xxx",
                "progress": "10%",
                "logPath": "hdfs://xxx/xxx/xxx",
                "resultLocation": "hdfs://xxx/xxx/xxx",
                "status": "Running",
                "createdTime": "2019-01-01 00:00:00",
                "updatedTime": "2019-01-01 01:00:00",
                "engineType": "spark",
                "errorCode": 100,
                "errDesc": "Task Failed with error code 100",
                "executeApplicationName": "hello world",
                "requestApplicationName": "hello world",
                "runType": "xxx",
                "paramJson": "{\"xxx\":\"xxx\"}",
                "costTime": 10000,
                "strongerExecId": "execId-xxx",
                "sourceJson": "{\"xxx\":\"xxx\"}"
            }],
            "totalPage": 1
    }
}
````