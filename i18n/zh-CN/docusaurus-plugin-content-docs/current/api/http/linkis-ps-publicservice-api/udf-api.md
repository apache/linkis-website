---
title: UDF操作管理
sidebar_position: 16
---

** UDFApi 类 **

## 新增

**接口地址**:`/api/rest_j/v1/udf/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>新增</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|clusterName|clusterName|false|String|String|
|createTime|创建时间|false|Date|Date|
|createUser|创建者|false|String|String|
|description|描述|false|String|String|
|directory|分类，个人函数一级目录|false|String|String|
|isExpire|是否失效|false|Boolean|Boolean|
|isLoad|是否负载|false|Boolean|Boolean|
|isShared|是否共享|false|Boolean|Boolean|
|path|仅存储用户上一次上传的路径 作提示用|false|String|String|
|registerFormat|注册执行地址|false|String|String|
|sys|sys|false|String|String|
|treeId|treeId|false|Long|Long|
|udfName|udfName|false|String|String|
|udfType|udfType|false|Integer|Integer|
|updateTime|更新时间|false|Date|Date|
|useFormat|使用格式|false|String|String|


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


## udf树形菜单


**接口地址**:`/api/rest_j/v1/udf/all`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>获取udf树形菜单详细信息</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|请求路径|false|String|String|
|jsonString|jsonString|query|false|string|


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


## 获取udf用户列表


**接口地址**:`/api/rest_j/v1/udf/allUdfUsers`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取udf用户列表</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|json|json|body|true|JsonNode|JsonNode|


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


## 证实


**接口地址**:`/api/rest_j/v1/udf/authenticate`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>证明…是真实的</p>



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


## 删除


**接口地址**:`/api/rest_j/v1/udf/delete/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>删除</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|false|integer(int64)|


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


## udf文件下载到本地


**接口地址**:`/api/rest_j/v1/udf/downloadToLocal`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>根据版本参数下载UDF文件到本地</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


##  UDF查看源码


**接口地址**:`/api/rest_j/v1/udf/downloadUdf`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p> UDF查看源码</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## UDF共享用户列表


**接口地址**:`/api/rest_j/v1/udf/getSharedUsers`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>UDF共享用户列表</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|


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


## UDF移交


**接口地址**:`/api/rest_j/v1/udf/handover`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>UDF移交</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|handoverUser|切换用户|false|String|String|
|udfId|udfId|false|integer|


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


## 是否负载


**接口地址**:`/api/rest_j/v1/udf/isload`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>是否负载</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|isLoad|是否负载|query|false|boolean|
|udfId|udfId|query|false|integer(int64)|


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


**接口地址**:`/api/rest_j/v1/udf/list`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>获取函数列表</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ListUDF|json|body|true|ListUDF|ListUDF|
|category|类别|false|String|String|
|treeId|树形菜单Id|false|String|String|
|type|函数类型，比如expire,self,share等类型|false|String|String|


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


## 基本信息


**接口地址**:`/api/rest_j/v1/udf/managerPages`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>基本信息</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|curPage|页码|false|Integer|Integer|
|pageSize|页面大小|false|Integer|Integer|
|udfName|udf名称|false|String|String|
|udfType|udf类型|false|String|String|


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


## 出版


**接口地址**:`/api/rest_j/v1/udf/publish`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>UDF版本发布</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## 回退版本


**接口地址**:`/api/rest_j/v1/udf/rollback`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>回退版本</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|integer|
|version|version|false|String|String|


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


## 设置过期


**接口地址**:`/api/rest_j/v1/udf/setExpire`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>设置过期</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|false|Long|Long|


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


## UDF共享


**接口地址**:`/api/rest_j/v1/udf/shareUDF`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>UDF共享</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sharedUsers|sharedUsers|false|List|List|
|udfInfo|udfInfo|false|UDFInfo|UDFInfo|


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


## tree新增


**接口地址**:`/api/rest_j/v1/udf/tree/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>tree新增</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|category|category|false|String|String|
|childrens|childrens|false|List|List|
|clusterName|clusterName|false|String|String|
|createTime|createTime|false|Date|Date|
|description|description|false|String|String|
|id|id|false|Long|Long|
|name|name|false|String|String|
|parent|parent|false|Long|Long|
|udfInfos|udfInfos|false|List|List|
|updateTime|updateTime|false|Date|Date|
|userName|userName|false|String|String|


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


## tree删除


**接口地址**:`/api/rest_j/v1/udf/tree/delete/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>tree删除</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|false|integer(int64)|


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


## tree更新


**接口地址**:`/api/rest_j/v1/udf/tree/update`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>tree更新</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|category|category|false|String|String|
|childrens|childrens|false|List|List|
|clusterName|clusterName|false|String|String|
|createTime|createTime|false|Date|Date|
|description|description|false|String|String|
|id|id|false|Long|Long|
|name|name|false|String|String|
|parent|parent|false|Long|Long|
|udfInfos|udfInfos|false|List|List|
|updateTime|updateTime|false|Date|Date|
|userName|userName|false|String|String|


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


## 更新


**接口地址**:`/api/rest_j/v1/udf/update`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>UDF修改</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|description|描述|false|String|String|
|id|id|false|Long|Long|
|isLoad|是否负载|false|Boolean|Boolean|
|path|仅存储用户上一次上传的路径 作提示用|false|String|String|
|registerFormat|注册执行地址|false|String|String|
|udfName|udfName|false|String|String|
|udfType|udfType|false|Integer|Integer|
|useFormat|使用格式|false|String|String|


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


## 获取用户目录


**接口地址**:`/api/rest_j/v1/udf/userDirectory`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取用户个人函数的一级分类</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|category|获取指定集合类型用户目录，如类型为UDF即获取该类型下的用户目录|query|false|string|


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


## 版本列表


**接口地址**:`/api/rest_j/v1/udf/versionList`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>版本列表查看</p>



**请求参数**:


| 参数名称 | 参数说明 |  是否必须   | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|udfId|udfId|query|false|integer(int64)|


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
