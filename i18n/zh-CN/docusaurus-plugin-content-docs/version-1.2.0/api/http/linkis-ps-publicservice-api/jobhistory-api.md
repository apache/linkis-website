---
title: 历史作业API
sidebar_position: 1
---

** QueryRestfulApi 类 **

## 判断用户是否是管理员
**接口地址**:`/api/rest_j/v1/jobhistory/governanceStationAdmin`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**: 判断用户是否是管理员

**请求参数**:
无

**响应示例**:

```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "admin": true
    }
}
```


## 获取数据源的数据库名称列表
**接口地址**:`/api/rest_j/v1/jobhistory/{id}/get`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:获取数据源的数据库名称列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|string||

**响应示例**:
```javascript
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
```

## 历史任务列表
**接口地址**:`/api/rest_j/v1/jobhistory/list`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:历史任务列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
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

**响应示例**:
```javascript
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
```

## 未完成的历史任务列表
**接口地址**:`/api/rest_j/v1/jobhistory/listundone`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:未完成的历史任务列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|startDate|startDate|path|false|Long||
|endDate|endDate|path|false|Long||
|status|status|path|false|string||
|pageNow|pageNow|path|false|Integer||
|pageSize|pageSize|path|false|Integer||
|startTaskID|startTaskID|path|false|Long||
|engineType|engineType|path|false|string||
|creator|creator|path|false|string||

**响应示例**:
```javascript
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
```
