---
title: 元数据查询API(新)
sidebar_position: 3
---
> 元数据查询接口优化之后的新接口，已废弃的旧接口见[元数据查询API](./metadatamanager-api.md)，相对于旧接口，主要调整请求的路径和接口参数命名

** MetadataQueryRestful 类 **

## getColumns

**接口地址**:`/api/rest_j/v1//metadataQuery/getColumns`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**: 获取数据表的column信息

**请求参数**:

| 参数名称  | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||

**响应示例**:

```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "columns": [
            {
                "index": 1,
                "primaryKey": true,
                "name": "id",
                "type": "INT"
            },
            {
                "index": 2,
                "primaryKey": false,
                "name": "datasource_name",
                "type": "VARCHAR"
            },
            {
                "index": 3,
                "primaryKey": false,
                "name": "datasource_desc",
                "type": "VARCHAR"
            },
        ]
    }
}
```


## getDatabases
**接口地址**:`/api/rest_j/v1//metadataQuery/getDatabases`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:获取数据源的数据库名称列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|system|system|query|true|string||

**响应示例**:
```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "dbs": [
            "information_schema",
            "linkis",
            "linkis_sit"
        ]
    }
}
```


## getPartitions

> 返回值调整为 props -> partitions

**接口地址**:`/api/rest_j/v1//metadataQuery/getPartitions`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||
|traverse|traverse|query|false|boolean||

**响应示例**:
```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "partitions": {
            "partKeys": [
                "ds"
            ],
            "root": {}
        }
    }
}
```

## getTableProps
**接口地址**:`/api/rest_j/v1//metadataQuery/getTableProps`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:


**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||

**响应示例**:
```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "props": {
            "skip.header.line.count": "1",
            "columns.types": "int:int:string:string:string:string:string:string:string:string:string:string:string:string:string:string:string:string",
            "columns": "id,age,job,marital,education,default,balance,housing,loan,contact,day,month,duration,campaign,pdays,previous,poutcome,y",
            "field.delim": ",",
            "transient_lastDdlTime": "1646732554",
            "partition_columns.types": "string",
            "columns.comments": "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
            "bucket_count": "-1",
            "serialization.ddl": "struct demo_data { i32 id, i32 age, string job, string marital, string education, string default, string balance, string housing, string loan, string contact, string day, string month, string duration, string campaign, string pdays, string previous, string poutcome, string y}",
            "file.outputformat": "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat",
            "partition_columns": "ds",
            "colelction.delim": "-",
            "serialization.lib": "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe",
            "name": "dss_autotest.demo_data",
            "location": "hdfs://bdpdev01/user/hive/warehouse/hadoop/dss_autotest.db/demo_data",
            "mapkey.delim": ":",
            "file.inputformat": "org.apache.hadoop.mapred.TextInputFormat",
            "serialization.format": ",",
            "column.name.delimiter": ","
        }
    }
}
```


## getPartitionProps
**接口地址**:`/api/rest_j/v1//metadataQuery/getPartitionProps`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**:

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|partition|partition|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||


**响应示例**:
```javascript
{
	"data": {},
	"message": "",
	"method": "",
	"status": 0
}
```


## getTables
**接口地址**:`/api/rest_j/v1//metadataQuery/getTables`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`application/json`

**接口描述**: 获取数据源的某个数据库的数据表列表

**请求参数**:

| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||

**响应示例**:
```javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "tables": [
            "test",
            "test_0317a",
            "test_import_sqoop_1",
            "test_linkis_sqoop_1",
            "test_linkis_sqoop_2",
            "test_linkis_sqoop_3",
            "upload_test"
        ]
    }
}
```