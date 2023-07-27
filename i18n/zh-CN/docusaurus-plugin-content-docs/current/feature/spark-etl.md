---
title: 支持 spark ETL 数据同步
sidebar_position: 0.4
--- 

## 1. 背景
使用 Spark ETL 功能，用户可以通过配置 json 的方式进行 Spark 数据同步。

## 2. 支持的类型 

目前支持的类型
```text
jdbc、file、redis、kafka、elasticsearch、mongo、datalake(hudi、delta)
```

## 3. 通用配置说明
```text
name: 数据源名称
type: 包含`source`、`transformation`、`sink`，分别对应输入、转换、输出
options: 配置参数
saveMode: 保存模式，目前支持:`overwrite`和`append`
path: 文件路径，可以是: 'file://' or 'hdfs://'(default)
`resultTable`需要和`sourceTable`对应
```

## 4. 使用说明

### 4.1 添加所需的 jar 包
使用数据源时需要将对应的 spark connector jar 上传至 spark/jars目录，目录位置 $SPARK_HOME/jars

spark connector jar 可以通过以下命令获取

```text
git clone https://github.com/apache/linkis.git

cd linkis

git checkout master

cd linkis-engineconn-plugins/spark/scala-2.12

mvn clean install  -Dmaven.test.skip=true
```

编译完成的spark connector jar位于以下目录中
```text
linkis/linkis-engineconn-plugins/spark/scala-2.12/target/out/spark/dist/3.2.1/lib
```

### 4.2 linkis-cli 提交任务示例

在 code 传入具体的 json 代码即可，注意引号格式转换。

```shell
sh /appcom/Install/linkis/bin/linkis-cli -engineType spark-3.2.1  -codeType data_calc -code ""  -submitUser hadoop -proxyUser hadoop
```

linkis-cli 提交 redis 数据同步任务示例
```shell
sh ./bin/linkis-cli -engineType spark-3.2.1  -codeType data_calc -code "{\"plugins\":[{\"name\":\"file\",\"type\":\"source\",\"config\":{\"resultTable\":\"test\",\"path\":\"hdfs://linkishdfs/tmp/linkis/spark_etl_test/etltest.dolphin\",\"serializer\":\"csv\",\"options\":{\"header\":\"true\",\"delimiter\":\";\"},\"columnNames\":[\"name\",\"age\"]}},{\"name\":\"redis\",\"type\":\"sink\",\"config\":{\"sourceTable\":\"test\",\"host\":\"wds07\",\"port\":\"6679\",\"auth\":\"password\",\"targetTable\":\"spark_etl_test\",\"saveMode\":\"append\"}}]}"  -submitUser hadoop -proxyUser hadoop
```
### 4.3 各数据源同步 json 脚本说明

### 4.3.1 jdbc

配置说明
```text
url: jdbc连接信息
user: 用户名称
password: 密码
query: sql查询语句
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

需要新增的jar，根据具体使用的数据源选择对应的 jar
```text
DmJdbcDriver18.jar
kingbase8-8.6.0.jar
postgresql-42.3.8.jar 
```

### 4.3.2 file

配置说明

```text
serializer: 文件格式，可以是`csv`、`parquet`等
columnNames: 列名
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

需要新增的 jar
```
spark-excel-2.12.17-3.2.2_2.12-3.2.2_0.18.1.jar
```

### 4.3.3 redis

```text
sourceTable: 源表,
host: ip地址,
port": 端口,
auth": 密码,
targetTable: 目标表,
saveMode: 支持 append
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
          "header":"true",
          "delimiter":";"
        },
        "columnNames": ["name", "age"]
      }
    },
    {
      "name": "redis",
      "type":"sink",
      "config": {
        "sourceTable": "test",
        "host": "wds07",
        "port": "6679",
        "auth":"password",
        "targetTable":"spark_etl_test",
        "saveMode": "append"
      }
    }
  ]
}
```

需要新增的jar
```text
jedis-3.2.0.jar
commons-pool2-2.8.1.jar
spark-redis_2.12-2.6.0.jar
```

### 4.3.4 kafka

配置说明
```text
servers: kafka连接信息
mode: 目前支持`batch`和`stream`
topic: kafka topic名称
```

数据写入 json code
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
                "header":"true",
                "delimiter":";"
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

数据读取 json code
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

需要新增的 jar
```
kafka-clients-2.8.0.jar
spark-sql-kafka-0-10_2.12-3.2.1.jar
spark-token-provider-kafka-0-10_2.12-3.2.1.jar
```

### elasticsearch

配置说明
```text
node: elasticsearch ip
port: elasticsearch port
index: elasticsearch索引名称
```


数据写入 json code
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
                "header":"true",
                "delimiter":";"
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

数据读取 json code
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

需要新增的jar
```
elasticsearch-spark-30_2.12-7.17.7.jar
```

### mongo

配置说明
```text
uri: mongo连接信息
database: mongo database
collection: mongo collection
```


数据写入 json code
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
                "header":"true",
                "delimiter":";"
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

数据读取 json code 
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

需要新增的 jar
```
bson-3.12.8.jar
mongo-spark-connector_2.12-3.0.1.jar
mongodb-driver-core-3.12.8.jar
mongodb-driver-sync-3.12.8.jar
```

### delta

配置说明
```text
tableFormat: 目前支持`hudi`和`delta`
```


数据写入 json code
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
          "header":"true",
          "delimiter":";"
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

数据读取 json code 
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
          "header":"true"
        },
        "serializer": "csv"
      }
    }
  ]
}
```

需要新增的 jar
```
delta-core_2.12-2.0.2.jar
delta-storage-2.0.2.jar
```

### hudi

配置说明
```text
tableFormat: 目前支持`hudi`和`delta`
```


数据写入 json code
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
          "header":"true",
          "delimiter":";"
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
          "hoodie.table.name":"huditest",
          "hoodie.datasource.write.recordkey.field":"age",
          "hoodie.datasource.write.precombine.field":"age"
        },
        "path": "file://{filePath}/hudi",
        "saveMode": "append"
      }
    }
  ]
}
```

数据读取 json code
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
          "header":"true"
        },
        "serializer": "csv"
      }
    }
  ]
}
```

需要新增的 jar
```
hudi-spark3.2-bundle_2.12-0.13.0.jar
```
