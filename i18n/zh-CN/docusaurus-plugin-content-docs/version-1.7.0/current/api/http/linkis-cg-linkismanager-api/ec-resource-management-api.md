---
title:  EC资源信息管理
sidebar_position: 4
---
** ECResourceInfoRestfulApi 类 **




## 删除EC信息


**接口地址**:`/api/rest_j/v1/linkisManager/ecinfo/delete/{ticketid}}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>删除EC信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ticketid|ticketid|path|true|string|


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


## 获取EC信息


**接口地址**:`/api/rest_j/v1/linkisManager/ecinfo/get`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>获取EC信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ticketid|ticketid|query|true|string|


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

## 搜索历史EC信息


**接口地址**:`/api/rest_j/v1/linkisManager/ecinfo/ecrHistoryList`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`application/json`


**接口描述**:<p>获取EC信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|instance|instance|query|false|string|
|creator|creator|query|false|string|
|startDate|startDate|query|false|string|
|endDate|endDate|query|false|string|
|engineType|engineType|query|false|string|
|pageNow|pageNow|query|false|Int|
|pageSize|pageSize|query|false|Int|


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
    {
        "message": "",
        "status": 0,
        "data": {
        "engineList": [
            {
                "id": -94209540.07806732,
                "requestResource": "consectetur dolor eiusmod ipsum",
                "releasedResource": "est in id Ut",
                "usedTimes": -51038117.02855969,
                "ticketId": "adipisicing in nostrud do",
                "ecmInstance": "id magna Lorem eiusmod",
                "engineType": "dolor",
                "usedTime": -38764910.74278392,
                "logDirSuffix": "sunt eiusmod aute et",
                "releaseTime": -33417043.232267484,
                "usedResource": "in amet veniam velit",
                "requestTimes": -15643696.319572791,
                "labelValue": "veniam incididunt magna",
                "releaseTimes": 96384811.3484546,
                "createTime": 38434279.49900183,
                "serviceInstance": "consequat aliqua in enim",
                "createUser": "Lorem Ut occaecat amet"
            },
            {
                "labelValue": "adipisicing deserunt do",
                "usedTimes": 49828407.223826766,
                "usedResource": "mollit laboris cupidatat enim",
                "releaseTimes": -73400915.22672182,
                "releasedResource": "est qui id ipsum mollit",
                "requestResource": "deserunt reprehenderit ut",
                "serviceInstance": "do laborum",
                "requestTimes": -33074164.700212136,
                "ecmInstance": "dolore",
                "logDirSuffix": "ea incididunt",
                "createUser": "Ut exercitation officia dolore ipsum",
                "usedTime": 25412456.522457644,
                "createTime": -93227549.70578489,
                "id": -84032815.0589972,
                "ticketId": "eu in mollit do",
                "engineType": "non Ut eu",
                "releaseTime": 34923394.9602966
            },
            {
                "releaseTime": -91057731.93164417,
                "usedTime": 99226623.97199354,
                "id": 59680041.603043556,
                "requestResource": "officia Ut enim nulla",
                "usedTimes": -14680356.219609797,
                "logDirSuffix": "proident amet reprehenderit tempor",
                "ticketId": "minim esse",
                "releaseTimes": 37270921.94107443,
                "serviceInstance": "enim adipisicing cupidatat",
                "createUser": "culpa",
                "requestTimes": -33504917.797325186,
                "releasedResource": "et dolore quis",
                "ecmInstance": "elit dolor adipisicing id",
                "createTime": -38827280.78902944,
                "engineType": "ullamco in eiusmod reprehenderit aute",
                "labelValue": "dolore qui labore nulla laboris",
                "usedResource": "irure sint nostrud Excepteur sunt"
            },
            {
                "requestResource": "deserunt incididunt enim",
                "releaseTimes": -16708903.732444778,
                "id": 80588551.12419662,
                "ecmInstance": "et veniam",
                "releaseTime": -50240956.63233949,
                "usedTimes": -5348294.728038415,
                "labelValue": "incididunt tempor reprehenderit quis eu",
                "createUser": "in in",
                "serviceInstance": "minim sit",
                "ticketId": "in dolore",
                "usedTime": -30138563.761232898,
                "logDirSuffix": "quis laborum ea",
                "createTime": 65920455.93896958,
                "requestTimes": 38810152.0160971,
                "engineType": "est in Ut proident",
                "usedResource": "nulla laboris Ut",
                "releasedResource": "cupidatat irure"
            },
            {
                "usedResource": "Lorem adipisicing dolor",
                "createTime": -11906770.11266476,
                "labelValue": "et id magna",
                "releaseTimes": 32546901.20497243,
                "id": -90442428.4679744,
                "logDirSuffix": "aute ut eu commodo",
                "ticketId": "cillum sint non deserunt",
                "requestResource": "non velit sunt consequat culpa",
                "requestTimes": -75282512.0022062,
                "usedTime": 6378131.554130778,
                "releasedResource": "Duis in",
                "serviceInstance": "dolore ut officia",
                "usedTimes": 70810503.51038182,
                "createUser": "voluptate sed",
                "ecmInstance": "laboris do sit dolore ipsum",
                "engineType": "id",
                "releaseTime": 37544575.30154848
            }
        ]
    }
    }
```

