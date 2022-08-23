---
title: Metadata Query Api
sidebar_position: 3
---
> The new interface after the optimization of the metadata query interface, see [Metadata Query API](./metadatamanager-api.md) for the old interface that has been abandoned. Compared with the old interface, mainly adjust the request path and interface parameter naming

#  MetadataQueryRestful class

## getColumns

**Interface address**:`/api/rest_j/v1//metadataQuery/getColumns`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Get the column information of the data table

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
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
        ]
    }
}
````


## getDatabases
**Interface address**:`/api/rest_j/v1//metadataQuery/getDatabases`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Get the list of database names of the data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
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

> return value adjusted to props -> partitions

**Interface address**:`/api/rest_j/v1//metadataQuery/getPartitions`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
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
        "partitions": {
            "partKeys": [
                "ds"
            ],
            "root": {}
        }
    }
}
````

## getTableProps

**Interface address**:`/api/rest_j/v1//metadataQuery/getTableProps`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:


**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
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


## getPartitionProps
**Interface address**:`/api/rest_j/v1//metadataQuery/getPartitionProps`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**:

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|partition|partition|path|true|string||
|system|system|query|true|string||
|table|table|path|true|string||


**Sample Response**:
````javascript
{
"data": {},
"message": "",
"method": "",
"status": 0
}
````


## getTables
**Interface address**:`/api/rest_j/v1//metadataQuery/getTables`

**Request method**: `GET`

**Request data type**: `application/x-www-form-urlencoded`

**Response data type**: `application/json`

**Interface description**: Get the list of data tables of a database of the data source

**Request Parameters**:

| Parameter name | Parameter description | Request type | Required | Data type | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|dataSourceName|dataSourceName|path|true|string||
|database|database|path|true|string||
|system|system|query|true|string||

**Sample Response**:
````javascript
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
````