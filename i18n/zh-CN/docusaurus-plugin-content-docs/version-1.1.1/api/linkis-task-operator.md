# 任务提交执行 Rest API 文档

- Linkis Restful接口的返回，都遵循以下的标准返回格式：

```json
{
  "method": "",
  "status": 0,
  "message": "",
  "data": {}
}
```

**约定**：

- method：返回请求的Restful API URI，主要是 WebSocket 模式需要使用。
- status：返回状态信息，其中：-1表示没有登录，0表示成功，1表示错误，2表示验证失败，3表示没该接口的访问权限。
- data：返回具体的数据。
- message：返回请求的提示信息。如果status非0时，message返回的是错误信息，其中data有可能存在stack字段，返回具体的堆栈信息。

更多关于 Linkis Restful 接口的规范，请参考：[Linkis Restful 接口规范](/community/development-specification/api)

### 1. 提交执行

- 接口 `/api/rest_j/v1/entrance/submit`

- 提交方式 `POST`

```json
{
  "executionContent": {
    "code": "show tables",
    "runType": "sql"
  },
  "params": {
    "variable": {// task variable 
      "testvar": "hello"
    },
    "configuration": {
      "runtime": {// task runtime params 
        "jdbc.url": "XX"
      },
      "startup": { // ec start up params 
        "spark.executor.cores": "4"
      }
    }
  },
  "source": { //task source information
    "scriptPath": "file:///tmp/hadoop/test.sql"
  },
  "labels": {
    "engineType": "spark-2.4.3",
    "userCreator": "hadoop-IDE"
  }
}
```

- 返回示例

```json
{
 "method": "/api/rest_j/v1/entrance/submit",
 "status": 0,
 "message": "请求执行成功",
 "data": {
   "execID": "030418IDEhivebdpdwc010004:10087IDE_hadoop_21",
   "taskID": "123"  
 }
}
```

- execID是用户任务提交到 Linkis 之后，为该任务生成的唯一标识执行ID，为 String 类型，这个ID只在任务运行时有用，类似PID的概念。ExecID 的设计为`(requestApplicationName长度)(executeAppName长度)(Instance长度)${requestApplicationName}${executeApplicationName}${entranceInstance信息ip+port}${requestApplicationName}_${umUser}_${index}`

- taskID 是表示用户提交task的唯一ID，这个ID由数据库自增生成，为 Long 类型


### 2. 获取状态

- 接口 `/api/rest_j/v1/entrance/${execID}/status`

- 提交方式 `GET`

- 返回示例

```json
{
 "method": "/api/rest_j/v1/entrance/{execID}/status",
 "status": 0,
 "message": "获取状态成功",
 "data": {
   "execID": "${execID}",
   "status": "Running"
 }
}
```

### 3. 获取日志

- 接口 `/api/rest_j/v1/entrance/${execID}/log?fromLine=${fromLine}&size=${size}`

- 提交方式 `GET`

- 请求参数fromLine是指从第几行开始获取，size是指该次请求获取几行日志

- 返回示例，其中返回的fromLine需要作为下次请求该接口的参数

```json
{
  "method": "/api/rest_j/v1/entrance/${execID}/log",
  "status": 0,
  "message": "返回日志信息",
  "data": {
    "execID": "${execID}",
	"log": ["error日志","warn日志","info日志", "all日志"],
	"fromLine": 56
  }
}
```

### 4. 获取进度

- 接口 `/api/rest_j/v1/entrance/${execID}/progress`

- 提交方式 `GET`

- 返回示例

```json
{
  "method": "/api/rest_j/v1/entrance/{execID}/progress",
  "status": 0,
  "message": "返回进度信息",
  "data": {
    "execID": "${execID}",
	"progress": 0.2,
	"progressInfo": [
		{
			"id": "job-1",
			"succeedTasks": 2,
			"failedTasks": 0,
			"runningTasks": 5,
			"totalTasks": 10
		},
		{
			"id": "job-2",
			"succeedTasks": 5,
			"failedTasks": 0,
			"runningTasks": 5,
			"totalTasks": 10
		}
	]
  }
}
```

### 5. kill任务

- 接口 `/api/rest_j/v1/entrance/${execID}/kill`

- 提交方式 `GET`

- 返回示例

```json
{
 "method": "/api/rest_j/v1/entrance/{execID}/kill",
 "status": 0,
 "message": "OK",
 "data": {
   "execID":"${execID}"
  }
}
```

### 6. 获取任务信息

- 接口 `/api/rest_j/v1/jobhistory/{id}/get`

- 提交方式 `GET`

- 请求参数

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|string||


- 返回示例

```json
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

### 7. 获取结果集信息

支持多结果集信息

- 接口 `/api/rest_j/v1/filesystem/getDirFileTrees`

- 提交方式 `GET`

- 请求参数

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|结果集目录路径|query|true|string||


- 返回示例

```json
{
  "method": "/api/filesystem/getDirFileTrees",
  "status": 0,
  "message": "OK",
  "data": {
    "dirFileTrees": {
      "name": "1946923",
      "path": "hdfs:///tmp/hadoop/linkis/2022-07-06/211446/IDE/1946923",
      "properties": null,
      "children": [
        {
          "name": "_0.dolphin",
          "path": "hdfs:///tmp/hadoop/linkis/2022-07-06/211446/IDE/1946923/_0.dolphin",//result set 1
          "properties": {
            "size": "7900",
            "modifytime": "1657113288360"
          },
          "children": null,
          "isLeaf": true,
          "parentPath": "hdfs:///tmp/hadoop/linkis/2022-07-06/211446/IDE/1946923"
        },
        {
          "name": "_1.dolphin",
          "path": "hdfs:///tmp/hadoop/linkis/2022-07-06/211446/IDE/1946923/_1.dolphin",//result set 2
          "properties": {
            "size": "7900",
            "modifytime": "1657113288614"
          },
          "children": null,
          "isLeaf": true,
          "parentPath": "hdfs:///tmp/hadoop/linkis/2022-07-06/211446/IDE/1946923"
        }
      ],
      "isLeaf": false,
      "parentPath": null
    }
  }
}
```

### 8. 获取结果集内容

- 接口 `/api/rest_j/v1/filesystem/openFile`

- 提交方式 `GET`

- 请求参数

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|结果集文件|query|true|string||
|charset|字符集|query|false|string||
|page|页码|query|false|ref||
|pageSize|页面大小|query|false|ref||


- 返回示例

```json
{
  "method": "/api/filesystem/openFile",
  "status": 0,
  "message": "OK",
  "data": {
    "metadata": [
      {
        "columnName": "count(1)",
        "comment": "NULL",
        "dataType": "long"
      }
    ],
    "totalPage": 0,
    "totalLine": 1,
    "page": 1,
    "type": "2",
    "fileContent": [
      [
        "28"
      ]
    ]
  }
}
```

### 9. 获取结果集按照文件流的方式

获取结果集为CSV和Excel按照流的方式

- 接口 `/api/rest_j/v1/filesystem/resultsetToExcel`

- 提交方式 `GET`

- 请求参数

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|autoFormat|是否自动转换格式|query|false|boolean||
|charset|字符集|query|false|string||
|csvSeperator|csv分隔栏|query|false|string||
|limit|获取行数|query|false|ref||
|nullValue|空值转换|query|false|string||
|outputFileName|输出文件名称|query|false|string||
|outputFileType|输出文件类型 csv 或者Excel|query|false|string||
|path|结果集路径|query|false|string||

- 返回示例

```json
文件流
```

### 10. 兼容0.X的任务执行接口

- 接口 `/api/rest_j/v1/entrance/execute`

- 提交方式 `POST`

```json
{
    "executeApplicationName": "hive", //Engine type
    "requestApplicationName": "dss", //Client service type
    "executionCode": "show tables",
    "params": {
      "variable": {// task variable 
        "testvar": "hello"
      },
      "configuration": {
        "runtime": {// task runtime params 
          "jdbc.url": "XX"
        },
        "startup": { // ec start up params 
          "spark.executor.cores": "4"
        }
      }
    },
    "source": { //task source information
      "scriptPath": "file:///tmp/hadoop/test.sql"
    },
    "labels": {
      "engineType": "spark-2.4.3",
      "userCreator": "hadoop-IDE"
    },
    "runType": "hql", //The type of script to run
    "source": {"scriptPath":"file:///tmp/hadoop/1.hql"}
}
```

- Sample Response

```json
{
 "method": "/api/rest_j/v1/entrance/execute",
 "status": 0,
 "message": "Request executed successfully",
 "data": {
   "execID": "030418IDEhivebdpdwc010004:10087IDE_hadoop_21",
   "taskID": "123"
 }
}
```