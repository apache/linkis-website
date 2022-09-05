---
title: Instance Management Api
sidebar_position: 26
---
** InstanceRestful class **




## Microservice instance list


**Interface address**: `/api/rest_j/v1/microservice/allInstance`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get the list of microservice management module instances to get single or multiple default all</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object|
|message|Description|string|
|method|request url|string|
|status|Status|integer(int32)|integer(int32)|


**Sample Response**:
````javascript
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
````


## Get eurekaURL


**Interface address**: `/api/rest_j/v1/microservice/eurekaURL`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>return eurekaURL</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object|
|message|Description|string|
|method|request url|string|
|status|Status|integer(int32)|integer(int32)|


**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "url": ""
    }
}
````


## Edit the microservice instance


**Interface address**: `/api/rest_j/v1/microservice/instanceLabel`


**Request method**: `PUT`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Edit or modify the instance in microservice management</p>

**Request example**:
````javascript
{
	applicationName: "linkis-ps-cs"
	instance: "bdpdws110004:9108"
	labels: [{
		labelKey: "route",
		stringValue: "cs_2_dev"
	}]
}
````

**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|applicationName|Engine Label|String|false|String|
|instance|Engine instance name|String|false|String|
|labelKey|The label in the added content belongs to the key in the map in the labels collection|String|false|String|
|labels|The engine instance updates the parameter content, and the collection stores the map type |List|false|List|
|stringValue|The value of the label in the added content belongs to the value in the map in the labels collection|String|false|String|


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object|
|message|Description|string|
|method|request url|string|
|status|Status|integer(int32)|integer(int32)|


**Sample Response**:
````javascript
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
````


## Modifiable label types


**Interface address**:`/api/rest_j/v1/microservice/modifiableLabelKey`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get a list of label types that can be modified, such as 'userCreator, route'</p>



**Request Parameters**:


No


**Response Status**:


| Status code | Description | schema |
| -------- | -------- | ----- |
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


| parameter name | parameter description | type | schema |
| -------- | -------- | ----- |----- |
|data|Dataset|object|
|message|Description|string|
|method|request url|string|
|status|Status|integer(int32)|integer(int32)|


**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
    "keyList": []
    }
}
````