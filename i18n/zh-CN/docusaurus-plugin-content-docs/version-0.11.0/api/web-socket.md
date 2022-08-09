---
title: WebSocket
sidebar_position: 3
---
> Linkis提供了WebSocket的接入方式，前端只需要按照Linkis的WebSocket规范就可以实时和Linkis进行交互，不需要通过Restful进行轮询。


## 1 Linkis接口规范

Linkis在前后端进行交互的时候，定义了一套自己的接口规范。

如果您对接口规范感兴趣，请点击这里[查看接口规范](/community/development-specification/api)

## 2 WebSocket接口汇总

我们提供以下几个接口，方便用户快速提交执行Job，获取执行结果。

 - 建立WebSocket连接
 - 提交执行
 - 服务端主动推回状态、日志和进度

## 3 接口详解

### 3.1 建立连接

此接口是为了和Linkis建立一个WebSocket连接。

- `/api/rest_j/entrance/connect`

- 请求方式 **GET**

- 响应状态码 **101**

### 3.2 提交执行

请求执行任务是将用户的作业提交到Linkis进行执行的接口

- 接口 `/api/rest_j/entrance/execute`

- 提交方式 `POST`

- 请求JSON示例

```json
{
 	"method":"/api/rest_j/v1/entrance/execute",
 	"data":{
		"params": {
			"variable":{
				"k1":"v1"
			},
			"configuration":{
				"special":{
					"k2":"v2"
				},
				"runtime":{
					"k3":"v3"
				},
				"startup":{
					"k4":"v4"
				}
			}
		},
		"executeApplicationName":"spark",
		"executionCode":"show tables",
		"runType":"sql",
		"source":{
			"scriptPath": "/home/Linkis/Linkis.sql"
		},
    "websocketTag":"37fcbd8b762d465a0c870684a0261c6e"
	}
}
```

- 请求体data中的参数描述如下


|  参数名 | 参数定义 |  类型 | 备注   |
| ------------ | ------------ | ------------ | ------------ |
| executeApplicationName  | 用户所期望使用的引擎服务，如Spark、hive等|  String | 不可为空  |
| requestApplicationName  | 发起请求的系统名 |  String | 可以为空  |
| params  | 用户指定的运行服务程序的参数  |  Map | 必填，里面的值可以为空  |
| executionCode  | 用户提交的执行代码  |  String |不可为空  |
| runType  | 当用户执行如spark服务时，可以选择python、R、SQL等runType|  String | 不可为空  |
| scriptPath  | 用户提交代码脚本的存放路径  |  String | 如果是IDE的话，与executionCode不能同时为空  |


- 返回示例

```json
{
 "method": "/api/rest_j/v1/entrance/execute",
 "status": 0,
 "message": "请求执行成功",
 "data": {
   "execID": "030418IDEhivebdpdwc010004:10087IDE_johnnwang_21",
   "taskID": "123"  
 }
}
```

- execID是用户任务提交到UJES之后，为该任务生成的唯一标识的执行ID，为String类型，这个ID只在任务运行时有用，类似PID的概念。ExecID的设计为(requestApplicationName长度)(executeAppName长度1)(Instance长度2)${requestApplicationName}${executeApplicationName}${entranceInstance ip+port}${requestApplicationName}_${umUser}_${index}
- taskID 是表示用户提交task的唯一ID，这个ID由数据库自增生成，为Long 类型


### 3.3 任务状态、日志、进度主动推送

提交执行之后，服务器会主动推送任务的状态、日志、进度等信息，您也可以用WebSocket方式去主动请求状态、日志、进度。

服务器主动推送的内容如下：

- 日志

```json
{
  "method": "/api/rest_j/v1/entrance/${execID}/log",
  "status": 0,
  "message": "返回日志信息",
  "data": {
    "execID": "${execID}",
	"log": ["error日志","warn日志","info日志", "all日志"],
  "taskID":28594,
	"fromLine": 56
  },
  "websocketTag":"37fcbd8b762d465a0c870684a0261c6e"
}
```

- 状态

```json
{
  "method": "/api/rest_j/v1/entrance/${execID}/status",
  "status": 0,
  "message": "返回状态信息",
  "data": {
    "execID": "${execID}",
    "taskID":28594,
	  "status": "Running",
  },
  "websocketTag":"37fcbd8b762d465a0c870684a0261c6e"
}
```

- 进度

```json
{
  "method": "/api/rest_j/v1/entrance/${execID}/log",
  "status": 0,
  "message": "返回进度信息",
  "data": {
    "execID": "${execID}",
    "taskID":28594,
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
  },
  "websocketTag":"37fcbd8b762d465a0c870684a0261c6e"
}
```