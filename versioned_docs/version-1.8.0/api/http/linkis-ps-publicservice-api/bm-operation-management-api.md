---
title: BM Project Operation Management
sidebar_position: 29
---

** BmlProjectRestful class **


## Attachment resource item


**Interface address**:`/api/rest_j/v1/bml/attachResourceAndProject`


**Request mode**:`POST`


**Request data type**:`application/json`


**Response data type**:`*/*`


**Interface description**:<p>Attachment resource item</p>



**Request parameters**:


|parameter name | parameter description | request type | must be | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|projectName | project name | string | false | string|
|resourceid | resource name | string | false | string|


**Response status**:

|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|data | dataset | object|
|message | description | string|
|method| request url|string|
|status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## Create BML project


**Interface address**:`/api/rest_j/v1/bml/createBmlProject`


**Request mode**:`POST`


**Request data type**:`application/json`


**Response data type**:`*/*`


**Interface description**:<p>Create BML project</p>



**Request parameters**:


|parameter name | parameter description | request type | must be | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|accessusers | access users | string | false | string|
|editusers | edit user | string | false | string|
|projectName | project name | string | false | string|


**Response status**:


|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|Parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|Data | dataset | object|
|Message | description | string|
|Method| request url|string|
|Status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## Download shared resources


**Interface address**:`/api/rest_j/v1/bml/downloadShareResource`


**Request mode**:`GET`


**Request data type**:`application/x-www-form-urlencoded`


**Response data type**:`*/*`


**Interface description**:<p>Download shared resources</p>



**Request parameters**:


|Parameter name | parameter description | request type | must be | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|Resourceid | resource ID | query | false | string|
|Version | version | query | false | string|


**Response status**:


|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|data | dataset | object|
|message | description | string|
|method| request url|string|
|status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## Project information


**Interface address**:`/api/rest_j/v1/bml/getProjectInfo`


**Request mode**:`GET`


**Request data type**:`application/x-www-form-urlencoded`


**Response data type**:`*/*`


**Interface description**:<p>Project information</p>



**Request parameters**:


|Parameter name | parameter description | request type | must be | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|ProjectName | project name | query | false | string|


**Response status**:


|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|Parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|Data | dataset | object|
|Message | description | string|
|Method| request url|string|
|Status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## Update project user


**Interface address**:`/api/rest_j/v1/bml/updateProjectUsers`


**Request mode**:`POST`


**Request data type**:`application/json`


**Response data type**:`*/*`


**Interface description**:<p>Update project users</p>



**Request parameters**:


|parameter name | parameter description | whether it is required | request type | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|accessusers | access users | false | string | string|
|editusers | edit user | false | string | string|
|projectName | project name | false | string | string|


**Response status**:


|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|Parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|Data | dataset | object|
|Message | description | string|
|Method| request url|string|
|Status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## Update shared resources


**Interface address**:`/api/rest_j/v1/bml/updateShareResource`


**Request mode**:`POST`


**Request data type**:`multipart/form-data`


**Response data type**:`*/*`


**Interface description**:<p>Update shared resources</p>



**Request parameters**:


|parameter name | parameter description | request type | must be | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|file | file | formdata | false | ref|
|resourceid | resource ID | query | false | string|

**Response status**:


|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|Parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|Data | dataset | object|
|Message | description | string|
|Method| request url|string|
|Status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## Upload shared resources


**Interface address**:`/api/rest_j/v1/bml/uploadShareResource`


**Request mode**:`POST`


**Request data type**:`application/json`


**Response data type**:`*/*`


**Interface description**:<p>Upload shared resources</p>



**Request parameters**:


|parameter name | parameter description | request type | must be | data type | schema|
| -------- | -------- | ----- | -------- | -------- | ------ |
|expireTime | expiration time | query | false | string|
|expiretype | failure type | query | false | string|
|file | file set | formdata | false | ref|
|isexpire | invalid | query | false | string|
|maxversion | MAV version | query | false | ref|
|projectName | project name | query | false | string|
|resourceheader | resource header | query | false | string|
|system | system | query | false | string|

**Response status**:


|Status code | description | schema|
| -------- | -------- | ----- | 
|200|OK|Message|
|201|Created|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**Response parameters**:


|Parameter name | parameter description | type | schema|
| -------- | -------- | ----- |----- | 
|Data | dataset | object|
|Message | description | string|
|Method| request url|string|
|Status | status | integer  | integer |


**Response example**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```

