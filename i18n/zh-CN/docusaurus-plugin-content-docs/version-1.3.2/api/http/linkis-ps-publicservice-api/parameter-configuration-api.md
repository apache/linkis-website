---
title: 参数配置
sidebar_position: 3
---
** ConfigurationRestfulApi 类 **




## 添加KeyForEngine


**接口地址**:`/api/rest_j/v1/configuration/addKeyForEngine`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>添加KeyForEngine</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|engineType|engineType|query|false|string|
|keyJson|keyJson|query|false|string|
|token|token|query|false|string|
|version|version|query|false|string|


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


## 新增应用类型


**接口地址**:`/api/rest_j/v1/configuration/createFirstCategory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>新增应用类型标签</p>

**请求示例**:
```javascript
{
	"categoryName": “”,
	"description": ""
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryName|引用类型标签名称|String|false|String|
|description|描述|String|false|String|


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
	"method": "/api/configuration/createFirstCategory",
	"status": 0,
	"message": "OK",
	"data": {}
}
```


## 新增参数配置


**接口地址**:`/api/rest_j/v1/configuration/createSecondCategory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>添加参数配置</p>

**请求示例**:
```javascript
{
	categoryId: ,
	description: "",
	engineType: "",
	version: ""
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|参数配置Id|String|true|String|
|description|描述|String|true|String|
|engineType|引擎类型|String|true|String|
|version|版本号|String|true|String|


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
	"method": "/api/configuration/createSecondCategory",
	"status": 0,
	"message": "OK",
	"data": {}
}
```


## 删除配置


**接口地址**:`/api/rest_j/v1/configuration/deleteCategory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>删除参数配置</p>

**请求示例**:
```javascript
{
	categoryId: 
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|参数配置Id|String|true|String|


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
	"method": "/api/configuration/deleteCategory",
	"status": 0,
	"message": "OK",
	"data": {}
}
```


## 引擎类型列表


**接口地址**:`/api/rest_j/v1/configuration/engineType`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取引擎类型列表</p>



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
	"method": "/api/configuration/engineType",
	"status": 0,
	"message": "OK",
	"data": {
		"engineType": []
	}
}
```


## 应用类型


**接口地址**:`/api/rest_j/v1/configuration/getCategory`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>参数配置中应用类型标签</p>



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
	"method": "/api/configuration/getCategory",
	"status": 0,
	"message": "OK",
	"data": {
		"Category": [{
				"categoryId": ,
				"labelId": ,
				"categoryName": "",
				"childCategory": [],
				"description": null,
				"tag": null,
				"createTime": ,
				"updateTime": ,
				"level": ,
				"fatherCategoryName": ""
			}],
			"description": null,
			"tag": null,
			"createTime": ,
			"updateTime": ,
			"level": ,
			"fatherCategoryName": 
		}]
	}
}
```


## 队列资源


**接口地址**:`/api/rest_j/v1/configuration/getFullTreesByAppName`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>参数配置中的队列资源模块返回队列资源的列及值</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|标签名称|query|false|string|
|engineType|engineType|query|false|string|
|version|version|query|false|string|


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
	"method": "/api/configuration/getFullTreesByAppName",
	"status": 0,
	"message": "OK",
	"data": {
		"fullTree": [{
			"name": "队列资源",
			"description": null,
			"settings": [{
				"id": ,
				"key": "",
				"description": "",
				"name": "",
				"defaultValue": "",
				"validateType": "",
				"validateRange": "[]",
				"level": 1,
				"engineType": ,
				"treeName": "",
				"valueId": ,
				"configValue": "",
				"configLabelId": ,
				"unit": null,
				"isUserDefined": ,
				"hidden": ,
				"advanced": 
			}]
		}]
	}
}
```


## 获取键值


**接口地址**:`/api/rest_j/v1/configuration/keyvalue`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取键值</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|configKey|configKey|query|true|string|
|creator|creator|query|false|string|
|engineType|engineType|query|false|string|
|version|version|query|false|string|


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


## 保存键值


**接口地址**:`/api/rest_j/v1/configuration/keyvalue`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>保存键值</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|configKey|configKey|true|String|String|
|configValue|configValue|true|String|String|
|creator|creator|true|String|String|
|engineType|engineType|true|String|String|
|version|version|true|String|String|
|SaveKeyValue|json|body|true|SaveKeyValue|SaveKeyValue|


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


## 删除键值


**接口地址**:`/api/rest_j/v1/configuration/keyvalue`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除键值</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须  | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|configKey|configKey|true|String|String|
|creator|creator|true|String|String|
|engineType|engineType|true|String|String|
|version|version|true|String|String|
|DeleteKeyValue|json|body|true|DeleteKeyValue|DeleteKeyValue|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|204|No Content|
|401|Unauthorized|
|403|Forbidden|


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


## rpc测试


**接口地址**:`/api/rest_j/v1/configuration/rpcTest`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>rpc测试</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|creator|query|false|string|
|engineType|engineType|query|false|string|
|username|username|query|false|string|
|version|version|query|false|string|


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


## 保存队列资源


**接口地址**:`/api/rest_j/v1/configuration/saveFullTree`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>保存队列资源</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|creator|应用类型名称|String|true|String|
|description|描述，属于fullTree中的内容|String|true|String|
|engineType|引擎类型|String|true|String|
|fullTree|应用类型下的详细信息|List|true|List|
|name|队列资源名称,属于fullTree中的内容|String|true|String|
|settings|队列资源中的详细内容，属于fullTree中的内容|List|true|List|


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
	"method": "/api/configuration/saveFullTree",
	"status": 0,
	"message": "OK",
	"data": {}
}
```


## 更新类别信息


**接口地址**:`/api/rest_j/v1/configuration/updateCategoryInfo`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新类别信息</p>


**响应示例**:
```javascript
{
	description: "",
	categoryId: 
}
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|categoryId|String|true|String|
|description|description|String|true|String|


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
	"method": "/api/configuration/updateCategoryInfo",
	"status": 0,
	"message": "OK",
	"data": {}
}
```
