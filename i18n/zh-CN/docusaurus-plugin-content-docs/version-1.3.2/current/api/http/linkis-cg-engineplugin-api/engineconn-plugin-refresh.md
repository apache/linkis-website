---
title: 引擎物料刷新API
sidebar_position: 2
--- 
>主要用于引擎的物料资源({LINKIS_INSTALL_HOME}/lib/linkis-engineconn-plugin 下，引擎的jar包/配置文件 )更新至BML中。

## refresh

**接口地址**:`/api/rest_j/v1/engineplugin/refresh`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:更新指定引擎的物料资源


**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ecType|引擎类型|query|true|string||
|version|版本 可以为空或则*|query|false|string||

**请求示例**:
```
#url
http://ip:port/api/rest_j/v1/engineplugin/refresh?ecType=hive&version=v2.3.3 

#请求头部
Content-Type:application/json
Token-Code:BML-AUTH
Token-User:hadoop  
```

**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "msg": "Refresh successfully"
    }
}
```


## refreshAll


**接口地址**:`/api/rest_j/v1/engineplugin/refreshAll`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:更新所有引擎的物料资源


**请求参数**:
无

**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data||object||
|message||string||
|method||string||
|status||integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "msg": "Refresh successfully"
    }
}
```
