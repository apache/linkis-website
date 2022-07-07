---
title: 文件系统
sidebar_position: 10
---
** FsRestfulApi 类 **





## 创建新的Dir


**接口地址**:`/api/rest_j/v1/filesystem/createNewDir`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新的Dir</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|路径|true|String|String|


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


## 创建新的文件


**接口地址**:`/api/rest_j/v1/filesystem/createNewFile`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新的文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|路径|true|String|String|


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


## 删除dir文件或者文件


**接口地址**:`/api/rest_j/v1/filesystem/deleteDirOrFile`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>删除dir文件或者文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|地址|true|String|String|


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


## 下载


**接口地址**:`/api/rest_j/v1/filesystem/download`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>下载</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|charset|字符集|true|String|String|
|path|地址|true|String|String|
|json|json|body|true||


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


## 文件信息


**接口地址**:`/api/rest_j/v1/filesystem/fileInfo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>文件信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|地址|query|true|string|
|pageSize|页面大小|query|false|ref|


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


## formate


**接口地址**:`/api/rest_j/v1/filesystem/formate`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>resultsets转换成Excel</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|encoding|编码|query|true|string|
|escapeQuotes|escapeQuotes|query|true|string|
|fieldDelimiter|字段分隔符|query|true|string|
|hasHeader|哈希值|query|true|boolean|
|quote|引用|query|true|string|
|path|地址|query|false|string|


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


## 函数列表


**接口地址**:`/api/rest_j/v1/filesystem/getDirFileTrees`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取udf函数列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|请求路径|query|true|string|


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
	"method": "/api/filesystem/getDirFileTrees",
	"status": 0,
	"message": "OK",
	"data": {
		"dirFileTrees": {
			"name": "",
			"path": "",
			"properties": null,
			"children": [{
				"name": "",
				"path": "",
				"properties": {
					"size": "",
					"modifytime": ""
				},
				"children": ,
				"isLeaf": ,
				"parentPath": ""
			}],
			"isLeaf": ,
			"parentPath": 
		}
	}
}
```


## 根路径


**接口地址**:`/api/rest_j/v1/filesystem/getUserRootPath`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取根路径</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pathType|文件类型|query|false|string|


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


## 是否存在


**接口地址**:`/api/rest_j/v1/filesystem/isExist`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>是否存在</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|地址|query|true|string|


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


## 打开文件


**接口地址**:`/api/rest_j/v1/filesystem/openFile`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>打开文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|地址|query|true|string|
|charset|字符集|query|false|string|
|page|页码|query|false|ref|
|pageSize|页面大小|query|false|ref|


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
	"method": "/api/filesystem/openFile",
	"status": 0,
	"message": "OK",
	"data": {
		"metadata": [{
			"columnName": "_c0",
			"comment": "NULL",
			"dataType": ""
		}],
		"totalPage": ,
		"totalLine": ,
		"page": ,
		"type": "",
		"fileContent": [
			[""]
		]
	}
}
```


## 打开日志记录


**接口地址**:`/api/rest_j/v1/filesystem/openLog`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>打开日志记录</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|地址|query|false|string|
|proxyUser|代理用户|query|false|string|


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
	"method": "/api/filesystem/openLog",
	"status": 0,
	"message": "OK",
	"data": {
		"log": ["", ""]
	}
}
```


## 重新命名


**接口地址**:`/api/rest_j/v1/filesystem/rename`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>重新给文件命名</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|newDest|新名称|false|String|String|
|oldDest|旧名称|false|String|String|


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


## 结果集转换成Excel


**接口地址**:`/api/rest_j/v1/filesystem/resultsetToExcel`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>结果集转换成Excel</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|autoFormat|是否自动|query|false|boolean|
|charset|结果集|query|false|string|
|csvSeperator|csv分隔栏|query|false|string|
|limit|限度|query|false|ref|
|nullValue|空值|query|false|string|
|outputFileName|输出文件名称|query|false|string|
|outputFileType|输出文件类型|query|false|string|
|path|地址|query|false|string|
|quoteRetouchEnable|是否引用修饰|query|false|boolean|
|sheetName|sheet名称|query|false|string|


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


## resultsets转换成Excel


**接口地址**:`/api/rest_j/v1/filesystem/resultsetsToExcel`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>resultsets转换成Excel</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|autoFormat|是否自动|query|true|boolean|
|limit|限度|query|true|ref|
|nullValue|空值|query|true|string|
|outputFileName|输出文件名称|query|true|string|
|path|地址|query|false|string|


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


## 保存脚本


**接口地址**:`/api/rest_j/v1/filesystem/saveScript`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>保存脚本</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|地址|true|String|String|
|SaveScript|json|body|true|SaveScript|SaveScript|
|charset|字符集|false|String|String|
|params|页面大小|false|Object|Object|
|scriptContent|页码|false|String|String|


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


## 上传


**接口地址**:`/api/rest_j/v1/filesystem/upload`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>上传文件，可传多个文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 是否必须    | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|file|文件|formData|false|ref|
|path|地址|query|false|string|


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

