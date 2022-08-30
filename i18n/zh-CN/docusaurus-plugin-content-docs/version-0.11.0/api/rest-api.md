---
title: Restful Api
sidebar_position: 2
---
> Linkis 提供了方便的HTTP接口方便前端上层应用或者后台通过Restful接口进行调用


## 1 Linkis接口规范

Linkis在前后端进行交互的时候，定义了一套自己的接口规范。

如果您对接口规范感兴趣，请点击这里[查看接口规范](/community/development-specification/api)

## 2 HTTP接口汇总

我们提供以下几个接口，方便用户快速提交执行Job，获取执行结果。

 - 提交执行
 - 获取状态
 - 获取日志
 - 获取进度
 - Kill任务

## 3 接口详解

### 3.1 提交执行

- 接口 `/api/rest_j/v1/entrance/execute`

- 提交方式 `POST`

```json
{
 	"method":"/api/rest_j/v1/entrance/execute",
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

- execID是用户任务提交到UJES之后，为该任务生成的唯一标识的执行ID，为String类型，这个ID只在任务运行时有用，类似PID的概念。ExecID的设计为(requestApplicationName长度)(executeAppName长度1)(Instance长度2)${requestApplicationName}${executeApplicationName}${entranceInstance信息ip+port}${requestApplicationName}_${umUser}_${index}
- taskID 是表示用户提交task的唯一ID，这个ID由数据库自增生成，为Long 类型


### 3.2 获取状态

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

### 3.3 获取日志

- 接口 `/api/rest_j/v1/entrance/${execID}/log?fromLine=${fromLine}&size=${size}`

- 提交方式 `GET`

- 请求参数fromLine是指从第几行开始获取，size是指该次请求获取几行日志

- 返回示例，其中返回的fromLine需要下次日志请求的参数

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

### 3.4 获取进度

- 接口 `/api/rest_j/v1/entrance/${execID}/progress`

- 提交方式 `GET`<br/>

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

### 3.5 kill任务

- 接口 `/api/rest_j/v1/entrance/${execID}/kill`

- 提交方式 `GET`

- 返回示例，其中返回的fromLine需要下次日志请求的参数

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

### 3.6 系统用户代理设置

- gateway代理设置

  在gateway安装目录conf中修改proxy.properties文件，添加内容：
  token=user1,user2
  
  说明：token为给到系统用户的秘钥，右边为系统用户可以代理的其它用户，如token=*，则不限制用户。

- http请求代理设置

  在请求的Headers参数中添加两个参数设置
  
 ```
    Proxy-User = 代理用户xxx
    Validation-Code = gateway配置的系统token

 ```