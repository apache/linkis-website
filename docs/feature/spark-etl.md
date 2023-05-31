---
title: Supports spark etl
sidebar_position: 0.2
--- 

## 1. Background
You can configure json for spark etl

## 2. Instructions for use
Common etl examples are as follows:

### jdbc

```json
{
    "sources": [
        {
            "name": "jdbc",
            "type": "",
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

Data write
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

Data read
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

Data write
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

Data read
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

Data write
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

Data read
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

Data write
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

Data read
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

Data write
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

Data read
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
