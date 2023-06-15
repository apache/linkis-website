---
title: 支持spark数据同步
sidebar_position: 0.2
--- 

## 1. 背景
用户可以通过配置json的方式进行spark数据同步

## 2. 支持的类型 

目前支持的类型
```text
jdbc、file、redis、kafka、elasticsearch、mongo、solr、rocketmq、datalake(hudi、delta)
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
常见的数据同步示例如下:

### jdbc

配置说明
```text
url: jdbc连接信息
user: 用户名称
password: 密码
query: sql查询语句
```

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

### file

配置说明
```text
serializer: 文件格式，可以是`csv`、`parquet`等
columnNames: 列名
```


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


### delta

配置说明
```text
tableFormat: 目前支持`hudi`和`delta`
```


数据写入
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

数据读取
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

### hudi

配置说明
```text
tableFormat: 目前支持`hudi`和`delta`
```


数据写入
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

数据读取
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


### kafka

配置说明
```text
servers: kafka连接信息
mode: 目前支持`batch`和`stream`
topic: kafka topic名称
```


数据写入
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

数据读取
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

### elasticsearch

配置说明
```text
node: elasticsearch ip
port: elasticsearch port
index: elasticsearch索引名称
```


数据写入
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

数据读取
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


### mongo

配置说明
```text
uri: mongo连接信息
database: mongo database
collection: mongo collection
```


数据写入
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

数据读取
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
