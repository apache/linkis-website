# Linkis 任务提交执行Rest API文档

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
 
更多关于 Linkis Restful 接口的规范，请参考：[Linkis Restful 接口规范](https://github.com/WeBankFinTech/Linkis-Doc/blob/master/zh_CN/Development_Documents/Development_Specification/API.md)

### 1).提交执行

- 接口 `/api/rest_j/v1/entrance/execute`

- 提交方式 `POST`

```json
{
    "executeApplicationName": "hive", //引擎类型
    "requestApplicationName": "dss", //客户端服务类型
    "executionCode": "show tables",
    "params": {"variable": {}, "configuration": {}},
    "runType": "hql", //运行的脚本类型
   "source": {"scriptPath":"file:///tmp/hadoop/1.hql"}
}
```

- 接口 `/api/rest_j/v1/entrance/submit`

- 提交方式 `POST`

```json
{
    "executionContent": {"code": "show tables", "runType":  "sql"},
    "params": {"variable": {}, "configuration": {}},
    "source":  {"scriptPath": "file:///mnt/bdp/hadoop/1.hql"},
    "labels": {
        "engineType": "spark-2.4.3",
        "userCreator": "hadoop-IDE"
    }
}
```


- 返回示例

```json
{
 "method": "/api/rest_j/v1/entrance/execute",
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


### 2).获取状态

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

### 3).获取日志

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

### 4).获取进度

- 接口 `/api/rest_j/v1/entrance/${execID}/progress`

- 提交方式 `GET`<br>

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

### 5).kill任务

- 接口 `/api/rest_j/v1/entrance/${execID}/kill`

- 提交方式 `GET`

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

