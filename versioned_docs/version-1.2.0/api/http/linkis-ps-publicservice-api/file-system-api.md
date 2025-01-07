---
title: File System Api
sidebar_position: 27
---
** FsRestfulApi class **





## create new Dir


**Interface address**:`/api/rest_j/v1/filesystem/createNewDir`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Create a new Dir</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|path|true|String|String|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## create new file


**Interface address**: `/api/rest_j/v1/filesystem/createNewFile`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Create a new file</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|path|true|String|String|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## delete dir file or file


**Interface address**: `/api/rest_j/v1/filesystem/deleteDirOrFile`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Delete dir file or file</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|address|true|String|String|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
    }
````


## download


**Interface address**:`/api/rest_j/v1/filesystem/download`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Download</p>



**Request Parameters**:


| Parameter name | Parameter description | Required  | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|charset|Charset|true|String|String|
|path|address|true|String|String|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## file info


**Interface address**:`/api/rest_j/v1/filesystem/fileInfo`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface Description**:<p>File Information</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|address|query|true|string|
|pageSize|page size|query|false|ref|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## format


**Interface address**:`/api/rest_j/v1/filesystem/formate`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>resultsets converted to Excel</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|encoding|encoding|query|true|string|
|escapeQuotes|escapeQuotes|query|true|string|
|fieldDelimiter|Field Delimiter|query|true|string|
|hasHeader|Hash value|query|true|boolean|
|quote|quote|query|true|string|
|path|address|query|false|string|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````
## function list


**Interface address**:`/api/rest_j/v1/filesystem/getDirFileTrees`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get a list of udf functions</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|request path|query|true|string|


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
````


## root path


**Interface address**:`/api/rest_j/v1/filesystem/getUserRootPath`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Get root path</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pathType|FileType|query|false|string|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## does it exist


**Interface address**: `/api/rest_j/v1/filesystem/isExist`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**: <p>Whether it exists</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|address|query|true|string|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## open a file


**Interface address**: `/api/rest_j/v1/filesystem/openFile`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Open file</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|address|query|true|string|
|charset|Charset|query|false|string|
|page|page number|query|false|ref|
|pageSize|page size|query|false|ref|


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
````


## Turn on logging


**Interface address**:`/api/rest_j/v1/filesystem/openLog`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Open logging</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|address|query|false|string|
|proxyUser|Proxy User|query|false|string|


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
    "method": "/api/filesystem/openLog",
    "status": 0,
    "message": "OK",
    "data": {
        "log": ["", ""]
    }
}
````
## Rename


**Interface address**:`/api/rest_j/v1/filesystem/rename`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Rename the file</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|newDest|new name|false|String|String|
|oldDest|old name|false|String|String|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## Convert the result set to Excel


**Interface address**: `/api/rest_j/v1/filesystem/resultsetToExcel`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>Convert the result set to Excel</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|autoFormat|Auto |query|false|boolean|
|charset|result set|query|false|string|
|csvSeerator|csv Separator|query|false|string|
|limit|limit|query|false|ref|
|nullValue|null value|query|false|string|
|outputFileName|Output file name|query|false|string|
|outputFileType|Output file type|query|false|string|
|path|address|query|false|string|
|quoteRetouchEnable| Whether to quote modification|query|false|boolean|
|sheetName|sheet name|query|false|string|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## Convert resultsets to Excel


**Interface address**:`/api/rest_j/v1/filesystem/resultsetsToExcel`


**Request method**: `GET`


**Request data type**: `application/x-www-form-urlencoded`


**Response data type**: `*/*`


**Interface description**:<p>resultsets converted to Excel</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|autoFormat|Auto |query|true|boolean|
|limit|limit|query|true|ref|
|nullValue|null value|query|true|string|
|outputFileName|Output file name|query|true|string|
|path|address|query|false|string|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## save the script


**Interface address**:`/api/rest_j/v1/filesystem/saveScript`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Save script</p>



**Request Parameters**:


| Parameter name | Parameter description | Required | Request type | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|path|address|true|String|String|
|SaveScript|json|body|true|SaveScript|SaveScript|
|charset|Charset|false|String|String|
|params|Page Size|false|Object|Object|
|scriptContent|page number|false|String|String|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````


## upload


**Interface address**:`/api/rest_j/v1/filesystem/upload`


**Request method**: `POST`


**Request data type**: `application/json`


**Response data type**: `*/*`


**Interface description**:<p>Upload files, multiple files can be uploaded</p>



**Request Parameters**:


| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|file|file|formData|false|ref|
|path|address|query|false|string|


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
    "data": {},
    "message": "",
    "method": "",
    "status": 0
}
````