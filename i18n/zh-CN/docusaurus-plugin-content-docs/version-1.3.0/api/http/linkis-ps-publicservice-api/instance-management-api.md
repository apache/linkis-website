---
title: 实例管理
sidebar_position: 6
---
** InstanceRestful 类 **




## 微服务实例列表


**接口地址**:`/api/rest_j/v1/microservice/allInstance`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取微服务管理模块实例列表可获取单个或多个默认全部</p>



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
	"method": null,
	"status": 0,
	"message": "OK",
	"data": {
		"instances": [{
			"id": ,
			"updateTime": ,
			"createTime": ,
			"applicationName": ",
			"instance": "",
			"labels": [{
				"stringValue": "",
				"labelKey": "",
				"feature": "",
				"id": 5,
				"labelValueSize": 0,
				"modifiable": true,
				"updateTime": ,
				"createTime": ,
				"featureKey": "",
				"empty": 
			}]
		}]
	}
}
```


## 获取eurekaURL


**接口地址**:`/api/rest_j/v1/microservice/eurekaURL`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>返回eurekaURL</p>



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
	"method": null,
	"status": 0,
	"message": "OK",
	"data": {
		"url": ""
	}
}
```


## 编辑微服务实例


**接口地址**:`/api/rest_j/v1/microservice/instanceLabel`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>编辑或修改下微服务管理中的实例</p>

**请求示例**:
```javascript
｛
    applicationName: "linkis-ps-cs"
    instance: "bdpdws110004:9108"
    labels: [{
        labelKey: "route",
        stringValue: "cs_2_dev"
}]｝
```

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|引擎标签|String|false|String|
|instance|引擎实例名称|String|String|String|
|labelKey|添加内容里面的标签，属于labels集合 内 map里的key|String|String|String|
|labels|引擎实例更新参数内容，集合存放的是map类型的|List|String|List|
|stringValue|添加内容里面的标签对于的值，属于labels集合 内 map里的value|String|String|String|


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
	"method": null,
	"status": 0,
	"message": "success",
	"data": {
		"labels": [{
			"stringValue": "",
			"labelKey": "",
			"feature": null,
			"modifiable": ,
			"featureKey": "",
			"empty": 
		}]
	}
}
```


## 可以修改的label 类型


**接口地址**:`/api/rest_j/v1/microservice/modifiableLabelKey`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取可以修改的label类型列表，列表数据如‘userCreator，route’</p>



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
	"method": null,
	"status": 0,
	"message": "OK",
	"data": {
		"keyList": []
	}
}
```
