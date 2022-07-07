---
title: 上下文历史记录服务
sidebar_position: 14
---
** ContextHistoryRestfulApi 类 **



## 创建历史记录


**接口地址**:`/api/rest_j/v1/contextservice/createHistory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建历史记录</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|contextHistory|历史上下文|false|String|String|
|contextID|上下文id|false|String|String|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## 获取多个历史记录


**接口地址**:`/api/rest_j/v1/contextservice/getHistories`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>获取多个历史记录</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|contextID|上下文id|String|false|String|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## 获取历史记录


**接口地址**:`/api/rest_j/v1/contextservice/getHistory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>获取历史记录</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须     | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|contextID|上下文Id|false|String|String|
|source|上下文源|false|String|String|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## 删除历史记录


**接口地址**:`/api/rest_j/v1/contextservice/removeHistory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>删除历史记录</p>



**请求参数**:


| 参数名称 | 参数说明 |    是否必须 | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|contextHistory|历史上下文|false|String|String|
|contextID|上下文id|false|String|String|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## 搜索历史记录


**接口地址**:`/api/rest_j/v1/contextservice/searchHistory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>搜索历史记录</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|contextID|上下文Id|false|String|String|
|keywords|关键词|false|String|String|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


