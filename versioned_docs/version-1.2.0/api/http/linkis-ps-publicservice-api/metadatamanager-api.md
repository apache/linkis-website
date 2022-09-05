---
title: Metadata Query Api
sidebar_position: 3
---

# MetadataCoreRestful

## getColumns
**Interface address**: `/api/rest_j/v1/metadatamanager/columns/{dataSourceId}/db/{database}/table/{table}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Get the column information of the data table

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||

**Sample Response**:

````javascript
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
            {
                "index": 4,
                "primaryKey": false,
                "name": "datasource_type_id",
                "type": "INT"
            },
            {
                "index": 5,
                "primaryKey": false,
                "name": "create_identify",
                "type": "VARCHAR"
            },
            {
                "index": 6,
                "primaryKey": false,
                "name": "create_system",
                "type": "VARCHAR"
            },
            {
                "index": 7,
                "primaryKey": false,
                "name": "parameter",
                "type": "VARCHAR"
            },
            {
                "index": 8,
                "primaryKey": false,
                "name": "create_time",
                "type": "DATETIME"
            },
            {
                "index": 9,
                "primaryKey": false,
                "name": "modify_time",
                "type": "DATETIME"
            },
            {
                "index": 10,
                "primaryKey": false,
                "name": "create_user",
                "type": "VARCHAR"
            },
            {
                "index": 11,
                "primaryKey": false,
                "name": "modify_user",
                "type": "VARCHAR"
            },
            {
                "index": 12,
                "primaryKey": false,
                "name": "labels",
                "type": "VARCHAR"
            },
            {
                "index": 13,
                "primaryKey": false,
                "name": "version_id",
                "type": "INT"
            },
            {
                "index": 14,
                "primaryKey": false,
                "name": "expire",
                "type": "TINYINT"
            },
            {
                "index": 15,
                "primaryKey": false,
                "name": "published_version_id",
                "type": "INT"
            }
        ]
    }
}
````


## getDatabases
**Interface address**:`/api/rest_j/v1/metadatamanager/dbs/{dataSourceId}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Get the list of database names of the data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|string||
|system|system|query|true|string||

**Sample Response**:
````javascript
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
````


## getPartitions
**Interface address**:`/api/rest_j/v1/metadatamanager/partitions/{dataSourceId}/db/{database}/table/{table}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||
|traverse|traverse|query|false|boolean||

**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "props": {
            "partKeys": [
                "ds"
            ],
            "root": {}
        }
    }
}
````

## getTableProps
**Interface address**:`/api/rest_j/v1/metadatamanager/props/{dataSourceId}/db/{database}/table/{table}`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:


**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceId|dataSourceId|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||

**Sample Response**:
````javascript
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "props": {
            "skip.header.line.count": "1",
            "columns.types": "int:int:string:string:string:string:string:string:string:string:string:string:string:string:string:string:string:string:string:string",
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
````