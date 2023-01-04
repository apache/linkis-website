---
title: 引擎管理
sidebar_position: 2
---
** EngineRestfulApi 类 **




## 创建引擎连接


**接口地址**:`/api/rest_j/v1/linkisManager/createEngineConn`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>创建引擎连接</p>



**请求参数**:


暂无


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


## 执行引擎连接操作


**接口地址**:`/api/rest_j/v1/linkisManager/executeEngineConnOperation`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>执行引擎连接操作</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|jsonNode|jsonNode|body|true|JsonNode|JsonNode|


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


## 获取引擎连接


**接口地址**:`/api/rest_j/v1/linkisManager/getEngineConn`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>获取引擎连接</p>



**请求参数**:


暂无


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


## kill引擎连接


**接口地址**:`/api/rest_j/v1/linkisManager/killEngineConn`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>kill引擎连接</p>



**请求参数**:


暂无


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


## 所有节点状态


**接口地址**:`/api/rest_j/v1/linkisManager/listAllNodeHealthyStatus`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>所有节点状态</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|onlyEditable|onlyEditable|query|false|boolean|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
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
	"method": "/api/linkisManager/listAllNodeHealthyStatus",
	"status": 0,
	"message": "OK",
	"data": {
		"nodeStatus": []
	}
}
```


## 列表引擎


**接口地址**:`/api/rest_j/v1/linkisManager/listEMEngines`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>列表引擎</p>

**请求示例**:
```javascript
{
	em: {
		serviceInstance: {
			applicationName: "linkis-cg-engineconnmanager",
			instance: "bdpdws110003:9102"
		}
	}
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|引擎标签名称，属于serviceInstance中的值|String|false|String|
|em|入参最外层|Map|false|Map|
|emInstance|引擎实例名称跟‘em’一个级别属于最外层|String|false|String|
|engineType|引擎类型跟‘em’一个级别属于最外层|String|false|String|
|instance|实例名称|String|false|String|
|nodeStatus|状态跟‘em’一个级别属于最外层,状态有以下枚举类型 ‘Healthy‘, ‘UnHealthy‘, ‘WARN‘, ’StockAvailable’, ‘StockUnavailable’|String|false|String|
|owner|创建者跟‘em’一个级别属于最外层|String|false|String|
|serviceInstance|入参属于‘’em|Map|false|Map|


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
	"method": "/api/linkisManager/listEMEngines",
	"status": 0,
	"message": "OK",
	"data": {
		"engines": []
	}
}
```


## 引擎用户集合


**接口地址**:`/api/rest_j/v1/linkisManager/listUserEngines`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>引擎用户集合</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
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


## 编辑引擎实例


**接口地址**:`/api/rest_j/v1/linkisManager/modifyEngineInfo`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>编辑引擎实例内容</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|引擎标签|false|String|String|
|emStatus|运行状态|false|String|String|
|instance|引擎实例名称|false|String|String|
|labelKey|添加内容里面的标签，属于labels集合 内 map里的key|false|String|String|
|labels|引擎实例更新参数内容，集合存放的是map类型的|false|List|List|
|stringValue|添加内容里面的标签对于的值，属于labels集合 内 map里的value|false|String|String|


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


## kill引擎


**接口地址**:`/api/rest_j/v1/linkisManager/rm/enginekill`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`application/json`


**接口描述**:<p>关闭引擎，可关闭一个也可关闭多个</p>


**请求示例**:
```javascript
    [
     {
         engineInstance: "",
         applicationName:""
      }
    ]

```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|应用名称，最外层是个数组和engineInstance参数是一个级别|false|String|String|
|engineInstance|引擎实例名称，最外层是个数组和applicationName参数是一个级别|false|String|String|


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


