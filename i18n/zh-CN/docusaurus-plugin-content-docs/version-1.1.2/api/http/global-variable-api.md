---
title: 添加全局变量
sidebar_position: 23
---
** VariableRestfulApi 类 **


## 添加全局变量


**接口地址**:`/api/rest_j/v1/variable/saveGlobalVariable`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>添加全局变量</p>

**请求示例**:
```javascript
{
	globalVariables: [{
		keyID: ,
		key: "",
		valueID: ,
		value: ""
	}]
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|globalVariables|新增参数数据一对多key:globalVariables,value:List||Map|true|Map|
|key|参数名称，属于globalVariables||String|true|String|
|value|变量值，跟key属于键值对 属于被globalVariables包含||List|true|List|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object||
|message|描述|string||
|method|请求url|string||
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"method": "/api/variable/saveGlobalVariable",
	"status": 0,
	"message": "OK",
	"data": {}
}
```

