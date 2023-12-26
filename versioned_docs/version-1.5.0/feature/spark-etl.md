---
title: Support spark ETL data synchronization
sidebar_position: 0.4
---

## 1. Background
Using the Spark ETL function, users can synchronize Spark data by configuring json.

## 2. Supported types

currently supported types
```text
jdbc, file, redis, kafka, elasticsearch, mongo, datalake (hudi, delta)
```

## 3. General configuration instructions
```text
name: data source name
type: Contains `source`, `transformation`, `sink`, corresponding to input, transformation, and output respectively
options: configuration parameters
saveMode: save mode, currently supports: `overwrite` and `append`
path: file path, can be: 'file://' or 'hdfs://'(default)
`resultTable` needs to correspond to `sourceTable`
```

## 4. Instructions for use

### 4.1 Add the required jar package
When using the data source, you need to upload the corresponding spark connector jar to the spark/jars directory, the directory location is $SPARK_HOME/jars

The spark connector jar can be obtained by the following command

```text
git clone https://github.com/apache/linkis.git

cd link is

git checkout master

cd linkis-engineconn-plugins/spark/scala-2.12

mvn clean install -Dmaven.test.skip=true
```

The compiled spark connector jar is located in the following directory
```text
linkis/linkis-engineconn-plugins/spark/scala-2.12/target/out/spark/dist/3.2.1/lib
```

### 4.2 linkis-cli submit task example

Just pass in the specific json code in code, pay attention to the conversion of quotation marks.

```shell
sh /appcom/Install/linkis/bin/linkis-cli -engineType spark-3.2.1 -codeType data_calc -code "" -submitUser hadoop -proxyUser hadoop
```

Linkis-cli submits redis data synchronization task example
```shell
sh ./bin/linkis-cli -engineType spark-3.2.1 -codeType data_calc -code "{\"plugins\":[{\"name\":\"file\",\"type\":\" source\",\"config\":{\"resultTable\":\"test\",\"path\":\"hdfs://linkishdfs/tmp/linkis/spark_etl_test/etltest.dolphin\",\ "serializer\":\"csv\",\"options\":{\"header\":\"true\",\"delimiter\":\";\"},\"columnNames\":[ \"name\",\"age\"]}},{\"name\":\"redis\",\"type\":\"sink\",\"config\":{\"sourceTable \":\"test\",\"host\":\"wds07\",\"port\":\"6679\",\"auth\":\"password\",\"targetTable\" :\"spark_etl_test\",\"saveMode\":\"append\"}}]}" -submitUser hadoop -proxyUser hadoop
```
### 4.3 Synchronization json script description of each data source

#### 4.3.1 jdbc

Configuration instructions
```text
url: jdbc connection information
user: user name
password: password
query: sql query statement
```

json code

```json
{
    "sources": [
        {
            "name": "jdbc",
            "type": "source",
            "config": {
                "resultTable": "test1",
                "url": "jdbc:mysql://127.0.0.1:3306/dip_linkis?characterEncoding=UTF-8",
                "driver": "com.mysql.jdbc.Driver",
                "user": "root",
                "password": "123456",
                "query": "select * from dip_linkis.linkis_ps_udf_baseinfo",
                "options": {
                }
            }
        }
    ],
    "transformations": [
        {
            "name": "sql",
            "type": "transformation",
            "config": {
                "resultTable": "T1654611700631",
                "sql": "select * from test1"
            }
        }
    ],
    "sinks": [
        {
            "name": "jdbc",
            "type": "sink",
            "config": {
                "sourceTable": "T1654611700631",
                "url": "jdbc:mysql://127.0.0.1:3306/dip_linkis?characterEncoding=UTF-8",
                "driver": "com.mysql.jdbc.Driver",
                "user": "root",
                "password": "123456",
                "targetTable": "linkis_ps_udf_baseinfo2",
                "options": {
                }
            }
        }
    ]
}
```

A new jar needs to be added, and the corresponding jar should be selected according to the specific data source used
```text
DmJdbcDriver18.jar
kingbase8-8.6.0.jar
postgresql-42.3.8.jar
```

#### 4.3.2 file

Configuration instructions

```text
serializer: file format, can be `csv`, `parquet`, etc.
columnNames: column names
```


json code

```json
{
    "sources": [
        {
            "name": "file",
            "type": "source",
            "config": {
                "resultTable": "test2",
                "path": "hdfs:///tmp/test_new_no_partition",
                "serializer": "csv",
                "columnNames": ["id", "create_user", "udf_name", "udf_type", "tree_id", "create_time", "update_time", "sys", "cluster_name", "is_expire", "is_shared"]
            }
        }
    ],
    "sinks": [
        {
            "name": "file",
            "config": {
                "sourceTable": "test2",
                "path": "hdfs:///tmp/test_new",
                "partitionBy": ["create_user"],
                "saveMode": "overwrite",
                "serializer": "csv"
            }
        }
    ]
}
```

Need to add new jar
```
spark-excel-2.12.17-3.2.2_2.12-3.2.2_0.18.1.jar
```

#### 4.3.3 redis

```text
sourceTable: source table,
host: ip address,
port": port,
auth": password,
targetTable: target table,
saveMode: support append
```

json code
```json
{
  "plugins":[
    {
      "name": "file",
      "type": "source",
      "config": {
        "resultTable": "test",
        "path": "hdfs://linkishdfs/tmp/linkis/spark_etl_test/etltest.dolphin",
        "serializer": "csv",
        "options": {
          "header": "true",
          "delimiter": ";"
        },
        "columnNames": ["name", "age"]
      }
    },
    {
      "name": "redis",
      "type": "sink",
      "config": {
        "sourceTable": "test",
        "host": "wds07",
        "port": "6679",
        "auth": "password",
        "targetTable": "spark_etl_test",
        "saveMode": "append"
      }
    }
  ]
}
```

Need to add new jar
```text
jedis-3.2.0.jar
commons-pool2-2.8.1.jar
spark-redis_2.12-2.6.0.jar
```

#### 4.3.4 kafka

Configuration instructions
```text
servers: kafka connection information
mode: currently supports `batch` and `stream`
topic: kafka topic name
```

Data written to json code
```json
{
    "sources": [
        {
            "name": "file",
            "type": "source",
            "config": {
                "resultTable": "T1654611700631",
                "path": "file://{filePath}/etltest.dolphin",
                "serializer": "csv",
                "options": {
                "header": "true",
                "delimiter": ";"
                },
                "columnNames": ["name", "age"]
            }
        }
    ],
    "sinks": [
        {
            "name": "kafka",
            "config": {
                "sourceTable": "T1654611700631",
                "servers": "localhost:9092",
                "mode": "batch",
                "topic": "test121212"
            }
        }
    ]
}
```

Data read json code
```json
{
    "sources": [
        {
            "name": "kafka",
            "type": "source",
            "config": {
                "resultTable": "T1654611700631",
                "servers": "localhost:9092",
                "topic": "test121212"
            }
        }
    ],
    "sinks": [
        {
            "name": "kafka",
            "config": {
                "sourceTable": "T1654611700631",
                "servers": "localhost:9092",
                "mode": "stream",
                "topic": "test55555"
            }
        }
    ]
}
```

Need to add new jar
```
kafka-clients-2.8.0.jar
spark-sql-kafka-0-10_2.12-3.2.1.jar
spark-token-provider-kafka-0-10_2.12-3.2.1.jar
```

#### 4.3.5 elasticsearch

Configuration instructions
```text
node: elasticsearch ip
port: elasticsearch port
index: elasticsearch index name
```


Data written to json code
```json
{
    "sources": [
        {
            "name": "file",
            "type": "source",
            "config": {
                "resultTable": "T1654611700631",
                "path": "file://{filePath}/etltest.dolphin",
                "serializer": "csv",
                "options": {
                "header": "true",
                "delimiter": ";"
                },
                "columnNames": ["name", "age"]
            }
        }
    ],
    "sinks": [
        {
            "name": "elasticsearch",
            "config": {
                "sourceTable": "T1654611700631",
                "node": "localhost",
                "port": "9200",
                "index": "estest",
                "saveMode": "overwrite"
            }
        }
    ]
}
```

Data read json code
```json
{
    "sources": [
        {
            "name": "elasticsearch",
            "type": "source",
            "config": {
                "resultTable": "T1654611700631",
                "node": "localhost",
                "port": "9200",
                "index": "estest"
            }
        }
    ],
    "sinks": [
        {
            "name": "file",
            "config": {
                "sourceTable": "T1654611700631",
                "path": "file://{filePath}/csv",
                "saveMode": "overwrite",
                "serializer": "csv"
            }
        }
    ]
}
```

Need to add new jar
```
elasticsearch-spark-30_2.12-7.17.7.jar
```

#### 4.3.6 mongo

Configuration instructions
```text
uri: mongo connection information
database: mongo database
collection: mongo collection
```


Data written to json code
```json
{
    "sources": [
        {
            "name": "file",
            "type": "source",
            "config": {
                "resultTable": "T1654611700631",
                "path": "file://{filePath}/etltest.dolphin",
                "serializer": "csv",
                "options": {
                "header": "true",
                "delimiter": ";"
                },
                "columnNames": ["name", "age"]
            }
        }
    ],
    "sinks": [
        {
            "name": "mongo",
            "config": {
                "sourceTable": "T1654611700631",
                "uri": "mongodb://localhost:27017/test",
                "database": "test",
                "collection": "test",
                "saveMode": "overwrite"
            }
        }
    ]
}
```

Data read json code
```json
{
    "sources": [
        {
            "name": "mongo",
            "type": "source",
            "config": {
                "resultTable": "T1654611700631",
                "uri": "mongodb://localhost:27017/test",
                "database": "test",
                "collection": "test"
            }
        }
    ],
    "sinks": [
        {
            "name": "file",
            "config": {
                "sourceTable": "T1654611700631",
                "path": "file://{filePath}/json",
                "saveMode": "overwrite",
                "serializer": "json"
            }
        }
    ]
}
```

Need to add new jar
```
bson-3.12.8.jar
mongo-spark-connector_2.12-3.0.1.jar
mongodb-driver-core-3.12.8.jar
mongodb-driver-sync-3.12.8.jar
```

#### 4.3.7 delta

Configuration instructions
```text
tableFormat: currently supports `hudi` and `delta`
```


Data written to json code
```json
{
  "sources": [
    {
      "name": "file",
      "type": "source",
      "config": {
        "resultTable": "T1654611700631",
        "path": "file://{filePath}/etltest.dolphin",
        "serializer": "csv",
        "options": {
          "header": "true",
          "delimiter": ";"
        },
        "columnNames": ["name", "age"]
      }
    }
  ],
  "sinks": [
    {
      "name": "datalake",
      "config": {
        "sourceTable": "T1654611700631",
        "tableFormat": "delta",
        "path": "file://{filePath}/delta",
        "saveMode": "overwrite"
      }
    }
  ]
}
```

Data read json code
```json
{
  "sources": [
    {
      "name": "datalake",
      "type": "source",
      "config": {
        "resultTable": "T1654611700631",
        "tableFormat": "delta",
        "path": "file://{filePath}/delta",
      }
    }
  ],
  "sinks": [
    {
      "name": "file",
      "config": {
        "sourceTable": "T1654611700631",
        "path": "file://{filePath}/csv",
        "saveMode": "overwrite",
        "options": {
          "header": "true"
        },
        "serializer": "csv"
      }
    }
  ]
}
```

Need to add new jar
```
delta-core_2.12-2.0.2.jar
delta-storage-2.0.2.jar
```

#### 4.3.8 hudi

Configuration instructions
```text
tableFormat: currently supports `hudi` and `delta`
```


Data written to json code
```json
{
  "sources": [
    {
      "name": "file",
      "type": "source",
      "config": {
        "resultTable": "T1654611700631",
        "path": "file://{filePath}/etltest.dolphin",
        "serializer": "csv",
        "options": {
          "header": "true",
          "delimiter": ";"
        },
        "columnNames": ["name", "age"]
      }
    }
  ],
  "transformations": [
    {
      "name": "sql",
      "type": "transformation",
      "config": {
        "resultTable": "T111",
        "sql": "select * from T1654611700631"
      }
    }
  ],
  "sinks": [
    {
      "name": "datalake",
      "config": {
        "sourceTable": "T1654611700631",
        "tableFormat": "hudi",
        "options": {
          "hoodie.table.name": "huditest",
          "hoodie.datasource.write.recordkey.field": "age",
          "hoodie.datasource.write.precombine.field":"age"
        },
        "path": "file://{filePath}/hudi",
        "saveMode": "append"
      }
    }
  ]
}
```

Data read json code
```json
{
  "sources": [
    {
      "name": "datalake",
      "type": "source",
      "config": {
        "resultTable": "T1654611700631",
        "tableFormat": "hudi",
        "path": "file://{filePath}/hudi",
      }
    }
  ],
  "transformations": [
    {
      "name": "sql",
      "type": "transformation",
      "config": {
        "resultTable": "T111",
        "sql": "select * from T1654611700631"
      }
    }
  ],
  "sinks": [
    {
      "name": "file",
      "config": {
        "sourceTable": "T1654611700631",
        "path": "file://{filePath}/csv",
        "saveMode": "overwrite",
        "options": {
          "header": "true"
        },
        "serializer": "csv"
      }
    }
  ]
}
```

Need to add new jar
```
hudi-spark3.2-bundle_2.12-0.13.0.jar
```