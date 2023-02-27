---
title: Spark Engine
sidebar_position: 1
---

This article mainly introduces the installation, use and configuration of the `Spark` engine plugin in `Linkis`.

## 1. Preliminary work
### 1.1 Engine installation

If you wish to use the `spark` engine on your server, you need to ensure that the following environment variables are set correctly and that the engine's starting user has these environment variables.

It is strongly recommended that you check these environment variables for the executing user before executing a `spark` job.

| Environment variable name | Environment variable content | Remarks |
|-----------------|----------------|-------------- -----------------------------|
| JAVA_HOME | JDK installation path | Required |
| HADOOP_HOME | Hadoop installation path | Required |
| HADOOP_CONF_DIR | Hadoop configuration path | required |
| HIVE_CONF_DIR | Hive configuration path | required |
| SPARK_HOME | Spark installation path | Required |
| SPARK_CONF_DIR | Spark configuration path | Required |
| python | python | It is recommended to use anaconda's python as the default python |

### 1.2 Environment verification
Verify that `Spark` is successfully installed by `pyspark`
```
pyspark

#After entering the pyspark virtual environment, the spark logo appears, indicating that the environment is successfully installed
Welcome to
      ______
     /__/__ ___ _____/ /__
    _\ \/ _ \/ _ `/ __/ '_/
   /__ / .__/\_,_/_/ /_/\_\   version 2.4.3
      /_/

Using Python version 2.7.13 (default, Sep 30 2017 18:12:43)
SparkSession available as 'spark'.
```

## 2. Engine plugin installation [default engine](./overview.md)

The `Spark` engine plugin is included in the binary installation package released by `linkis` by default, and users do not need to install it additionally.

In theory `Linkis` supports all versions of `spark2.x` and above. The default supported version is `Spark2.4.3`. If you want to use another version of `spark`, such as `spark2.1.0`, you just need to modify the version of the plugin `spark` and compile it. Specifically, you can find the `linkis-engineplugin-spark` module, change the value of the `<spark.version>` tag in the `maven` dependency to 2.1.0, and then compile this module separately.

[EngineConnPlugin engine plugin installation](../deployment/install-engineconn.md)

## 3. Using the `spark` engine

### 3.1 Submitting tasks via `Linkis-cli`

```shell
# codeType correspondence py-->pyspark sql-->sparkSQL scala-->Spark scala
sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "show databases"  -submitUser hadoop -proxyUser hadoop

# You can specify the yarn queue in the submission parameter by -confMap wds.linkis.yarnqueue=dws
sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql  -confMap wds.linkis.yarnqueue=dws -code "show databases"  -submitUser hadoop -proxyUser hadoop
```
More `Linkis-Cli` command parameter reference: [Linkis-Cli usage](../user-guide/linkiscli-manual.md)

### 3.2 Submitting tasks through `Linkis SDK`

`Linkis` provides `SDK` of `Java` and `Scala` to submit tasks to `Linkis` server. For details, please refer to [JAVA SDK Manual](../user-guide/sdk-manual.md).
For `Spark` tasks you only need to modify the `EngineConnType` and `CodeType` parameters in `Demo`:

```java
Map<String, Object> labels = new HashMap<String, Object>();
labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "sql"); // required codeType py,sql,scala
```

Submit task by `OnceEngineConn`（spark-submit jar）, example: `org.apache.linkis.computation.client.SparkOnceJobTest`

```java
public class SparkOnceJobTest {

    public static void main(String[] args)  {

        LinkisJobClient.config().setDefaultServerUrl("http://127.0.0.1:9001");

        String submitUser = "linkis";
        String engineType = "spark";

        SubmittableSimpleOnceJob onceJob =
                // region
                LinkisJobClient.once().simple().builder()
                        .setCreateService("Spark-Test")
                        .setMaxSubmitTime(300000)
                        .setDescription("SparkTestDescription")
                        .addExecuteUser(submitUser)
                        .addJobContent("runType", "jar")
                        .addJobContent("spark.app.main.class", "org.apache.spark.examples.JavaWordCount")
                        // parameter
                        .addJobContent("spark.app.args", "hdfs:///tmp/test_word_count.txt") // WordCount test file
                        .addLabel("engineType", engineType + "-2.4.7")
                        .addLabel("userCreator", submitUser + "-IDE")
                        .addLabel("engineConnMode", "once")
                        .addStartupParam("spark.app.name", "spark-submit-jar-test-linkis") // Application Name on yarn 
                        .addStartupParam("spark.executor.memory", "1g")
                        .addStartupParam("spark.driver.memory", "1g")
                        .addStartupParam("spark.executor.cores", "1")
                        .addStartupParam("spark.executor.instance", "1")
                        .addStartupParam("spark.app.resource", "hdfs:///tmp/spark/spark-examples_2.11-2.3.0.2.6.5.0-292.jar")
                        .addSource("jobName", "OnceJobTest")
                        .build();
        // endregion
        onceJob.submit();
        // Temporary network failure will cause exceptions. It is recommended to modify the SDK later. For use at this stage, exception handling is required
        onceJob.waitForCompleted();
    }
}
```

### 3.3 Submitting tasks with `Restful API`

Scripts type includes `sql`、`scala`、`python`、`data_calc(content type is json)`.

[Restful API Usage](../api/linkis-task-operator.md)

```http request
POST /api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linkis

{
    "executionContent": {
        // script content, type: sql, python, scala, json
        "code": "show databases",
        // script type: sql, py（pyspark）, scala, data_calc(json)
        "runType": "sql"
    },
    "params": {
        "variable": {
        },
        "configuration": {
            // spark startup parameters, not required
            "startup": {
                "spark.executor.memory": "1g",
                "spark.driver.memory": "1g",
                "spark.executor.cores": "1",
                "spark.executor.instances": 1
            }
        }
    },
    "source":  {
        // not required, file:/// or hdfs:///
        "scriptPath": "file:///tmp/hadoop/test.sql"
    },
    "labels": {
        // pattern：engineType-version
        "engineType": "spark-2.4.3",
        // userCreator: linkis is username。IDE is system that be configed in Linkis。
        "userCreator": "linkis-IDE"
    }
}
```

**Load udf from parameter `ids`**

| parameter name             | introduction                 |  default|
|--------------------------- |------------------------------|---------|
|`linkis.user.udf.all.load`  | load user's all selected udf | true    |
|`linkis.user.udf.custom.ids`| udf ID list，split by `,`    |  -      |

example:

```http request
POST /api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linkis

{
    "executionContent": {
        "code": "show databases",
        "runType": "sql"
    },
    "params": {
        "configuration": {
            "startup": {
                "linkis.user.udf.all.load": false
                "linkis.user.udf.custom.ids": "1,2,3"
            }
        }
    },
    "labels": {
        "engineType": "spark-2.4.3",
        "userCreator": "linkis-IDE"
    }
}
```

## 4. Engine configuration instructions

### 4.1 Default Configuration Description
| Configuration | Default | Required | Description |
| ------------------------ | ------------------- | ---| ------------------------------------------- |
| wds.linkis.rm.instance | 10 |No| Maximum number of concurrent engines |
| spark.executor.cores | 1 |No| Number of spark executor cores |
| spark.driver.memory | 1g | no | maximum concurrent number of spark executor instances |
| spark.executor.memory | 1g | No | spark executor memory size |
| wds.linkis.engineconn.max.free.time | 1h | No | Engine idle exit time |
| spark.python.version | python2 | no | python version |

### 4.2 Queue resource configuration
Because the execution of `spark` requires queue resources, you need to set up a queue that you can execute.    

![yarn](./images/yarn-conf.png) 


### 4.3 Configuration modification
If the default parameters are not satisfied, there are the following ways to configure some basic parameters

#### 4.3.1 Management Console Configuration
Users can customize settings, such as the number of `spark` sessions `executor` and `executor` memory. These parameters are for users to set their own `spark` parameters more freely, and other `spark` parameters can also be modified, such as the `python` version of `pyspark`, etc.
![spark](./images/spark-conf.png)

Note: After modifying the configuration under the `IDE` tag, you need to specify `-creator IDE` to take effect (other tags are similar), such as:

```shell
sh ./bin/linkis-cli -creator IDE \
-engineType spark-2.4.3 -codeType sql \
-code "show databases"  \
-submitUser hadoop -proxyUser hadoop
```

#### 4.3.2 Task interface configuration
Submit the task interface, configure it through the parameter `params.configuration.runtime`

```shell
Example of http request parameters
{
    "executionContent": {"code": "show databases;", "runType":  "sql"},
    "params": {
                    "variable": {},
                    "configuration": {
                            "runtime": {
                                "wds.linkis.rm.instance":"10"
                                }
                            }
                    },
    "labels": {
        "engineType": "spark-2.4.3",
        "userCreator": "hadoop-IDE"
    }
}
```

### 4.4 Engine related data sheet

`Linkis` is managed through the engine tag, and the data table information involved is shown below.

```
linkis_ps_configuration_config_key: Insert the key and default values ​​​​of the configuration parameters of the engine
linkis_cg_manager_label: insert engine label such as: spark-2.4.3
linkis_ps_configuration_category: The directory association relationship of the insertion engine
linkis_ps_configuration_config_value: The configuration that the insertion engine needs to display
linkis_ps_configuration_key_engine_relation: The relationship between the configuration item and the engine
```

The initial data in the table related to the `spark` engine is as follows

```sql
-- set variable
SET @SPARK_LABEL="spark-2.4.3";
SET @SPARK_ALL=CONCAT('*-*,',@SPARK_LABEL);
SET @SPARK_IDE=CONCAT('*-IDE,',@SPARK_LABEL);

-- engine label
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @SPARK_ALL, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @SPARK_IDE, 'OPTIONAL', 2, now(), now());

select @label_id := id from linkis_cg_manager_label where `label_value` = @SPARK_IDE;
insert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);

-- configuration key
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.rm.instance', 'Range: 1-20, unit: each', 'Maximum concurrent number of spark engine', '10', 'NumInterval', '[1,20]', '0 ', '0', '1', 'queue resources', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.instances', 'value range: 1-40, unit: individual', 'maximum concurrent number of spark executor instances', '1', 'NumInterval', '[1,40]', '0', '0', '2', 'spark resource settings', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.cores', 'Value range: 1-8, unit: number', 'Number of spark executor cores', '1', 'NumInterval', '[1,8]', ' 0', '0', '1','spark resource settings', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.memory', 'value range: 1-15, unit: G', 'spark executor memory size', '1g', 'Regex', '^([1-9]|1 [0-5])(G|g)$', '0', '0', '3', 'spark resource settings', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.driver.cores', 'Value range: only 1, unit: number', 'Number of spark driver cores', '1', 'NumInterval', '[1,1]', '0 ', '1', '1', 'spark resource settings', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.driver.memory', 'value range: 1-15, unit: G', 'spark driver memory size','1g', 'Regex', '^([1-9]|1[ 0-5])(G|g)$', '0', '0', '1', 'spark resource settings', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.engineconn.max.free.time', 'Value range: 3m,15m,30m,1h,2h', 'Engine idle exit time','1h', 'OFT', '[\ "1h\",\"2h\",\"30m\",\"15m\",\"3m\"]', '0', '0', '1', 'spark engine settings', ' spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.pd.addresses', NULL, NULL, 'pd0:2379', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.addr', NULL, NULL, 'tidb', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.password', NULL, NULL, NULL, 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.port', NULL, NULL, '4000', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.user', NULL, NULL, 'root', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.python.version', 'Value range: python2,python3', 'python version','python2', 'OFT', '[\"python3\",\"python2\"]', ' 0', '0', '1', 'spark engine settings', 'spark');

-- key engine relation
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config
INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'spark' and label.label_value = @SPARK_ALL);

-- engine default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation
INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @SPARK_ALL);

```

## 5. introduction for data_calc（data calculate）

Spark ETL operation by parsing json, and the design:

![data_calc](/Images/EngineUsage/data_calc.svg)

data_calc json configuration, tow mode：*array*(:default) and *group*

The type of plugin: source, transformation, sink

**data_calc example**

```
POST http://localhost:8087/api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linkis

{
  "executionContent": {
    // Code is the escaped json. See the following for detailed configuration instructions
    "code": "{\"plugins\":[{\"type\":\"source\",\"name\":\"jdbc\",\"config\":{\"resultTable\":\"spark_source_01\",\"url\":\"jdbc:mysql://localhost:3306/\",\"driver\":\"com.mysql.jdbc.Driver\",\"user\":\"xi_root\",\"password\":\"123456\",\"query\":\"select * from linkis.linkis_cg_manager_label\",\"options\":{}}},{\"type\":\"transformation\",\"name\":\"sql\",\"config\":{\"resultTable\":\"spark_transform_01\",\"sql\":\"select * from spark_source_01 limit 100\"}},{\"type\":\"sink\",\"name\":\"file\",\"config\":{\"sourceTable\":\"spark_transform_01\",\"path\":\"hdfs:///tmp/data/testjson\",\"serializer\":\"json\",\"partitionBy\":[\"label_key\"],\"saveMode\":\"overwrite\"}}]}",
    "runType": "data_calc"
  },
  "params": {
    "variable": {},
    "configuration": {
      // Startup parameter
      "startup": {
        "spark.executor.memory": "1g",
        "spark.driver.memory": "1g",
        "spark.executor.cores": "1",
        "spark.executor.instances": 1
      }
    }
  },
  "labels": {
    "engineType": "spark-2.4.3",
    "userCreator": "linkis-IDE"
  }
}
```

### 5.1 Mode Array

Plugin has 3 field, name is the plugin's name, type is the plugin's type, config is the plugin's configuration

```json
{
    "plugins": [
        {
            "type": "source",
            "name": "jdbc",
            "config": {
                "resultTable": "spark_source_01",
                "url": "jdbc:mysql://localhost:3306/",
                "driver": "com.mysql.jdbc.Driver",
                "user": "xi_root",
                "password": "123456",
                "query": "select * from linkis.linkis_cg_manager_label",
                "options": {
                }
            }
        },
        {
            "type": "transformation",
            "name": "sql",
            "config": {
                "resultTable": "spark_transform_01",
                "sql": "select * from spark_source_01 limit 100"
            }
        },
        {
            "type": "sink",
            "name": "file",
            "config": {
                "sourceTable": "spark_transform_01",
                "path": "hdfs:///tmp/data/testjson",
                "serializer": "json",
                "partitionBy": [
                    "label_key"
                ],
                "saveMode": "overwrite"
            }
        }
    ]
}

```

### 5.2 Mode Group

Plugin has 2 field, name is the plugin's name, config is the plugin's configuration

The configuration is divided into three parts：

1. sources：Config data source
2. transformations：Config data transformations
3. sinks：Config data sink

```json
{
    "sources": [
        {
            "name": "jdbc",
            "config": {
                "resultTable": "spark_source_table_00001",
                "url": "jdbc:mysql://localhost:3306/",
                "driver": "com.mysql.jdbc.Driver",
                "user": "test_db_rw",
                "password": "123456",
                "query": "select * from test_db.test_table",
                "options": {
                }
            }
        },
        {
           "name": "file",
           "config": {
              "resultTable": "spark_source_table_00002",
              "path": "hdfs:///data/tmp/testfile.csv",
              "serializer": "csv",
              "columnNames": ["type", "name"],
              "options": {
              }
           }
        }
    ],
    "transformations": [
        {
            "name": "sql",
            "config": {
                "resultTable": "spark_transform_00001",
                "sql": "select * from spark_source_table_00001 t1 join spark_source_table_00002 t2 on t1.type=t2.type where t1.id > 100 limit 100"
            }
        }
    ],
    "sinks": [
        {
            "name": "file",
            "config": {
                "sourceTable": "spark_transform_00001",
                "path": "hdfs:///tmp/data/test_json",
                "serializer": "json",
                "partitionBy": [
                    "label_key"
                ],
                "saveMode": "overwrite"
            }
        }
    ]
}
```

### 5.3 Plugin type description

#### 5.3.1 Source configuration

Corresponding data reading operations can read files from files and jdbc. * * Only the current source table can be used, and the temporary table registered before the current configuration cannot be used**

**Public configuration**

| **field name**   | **introduction**                                                     | **field type**        | **required** | **default**      |
| ------------ | ------------------------------------------------------------ | ------------------- | ------------ | --------------- |
| resultTable  | register table name for `transform` / `sink`                         | String              | Yes           | -               |
| persist      | spark persist                                                     | Boolean             | No           | false           |
| storageLevel | spark storageLevel                                                     | String              | No           | MEMORY_AND_DISK |
| options      | [spark official](https://spark.apache.org/docs/latest/sql-data-sources.html) | Map<String, String> | No           |                 |

##### 5.3.1.1 file

**Fields**

| **field name**   | **introduction**    | **field type**        | **required** | **default**      |
| ----------- | ------------------------ | ------------ | ------------ | ---------- |
| path        | File path, default is `hdfs`                 | String       | Yes           | -          |
| serializer  | file format, default is   `parquet`          | String       | Yes           | `parquet`    |
| columnNames | Mapped field name             | String[]     | No           | -          |

**Exemples**

```JSON
{
    "name": "file",
    "config": {
        "resultTable": "spark_source_table_00001",
        "path": "hdfs:///data/tmp/test_csv_/xxx.csv",
        "serializer": "csv",
        "columnNames": ["id", "name"],
        "options": {
            "key": "value"
        }
    }
}
```

##### 5.3.1.2 jdbc

**Fields**

| **field name**   | **introduction**                                                     | **field type**        | **required** | **default**      |
| ---------- | ---------------------------------------------------- | ------------ | ------------ | ---------- |
| url        | jdbc url                                 | String       | Yes           | -          |
| driver     | driver class                                | String       | Yes           | -          |
| user       | username                                               | String       | Yes           | -          |
| password   | password                                                 | String       | Yes           | -          |
| query      | The functions used in the query must be supported by the datasource | String       | Yes           | -          |

**Exemples**

```JSON
{
    "name": "jdbc",
    "config": {
        "resultTable": "spark_source_table_00001",
        "url": "jdbc:mysql://localhost:3306/",
        "driver": "com.mysql.jdbc.Driver",
        "user": "local_root",
        "password": "123456",
        "query": "select a.xxx, b.xxxx from test_table where id > 100",
        "options": {
            "key": "value"
        }
    }
}
```

##### 5.3.1.3 managed_jdbc

Data source configured in Linkis. The data source connection information will be obtained from linkis and converted to jdbc for execution.

**Fields**

| **field name**   | **introduction**     | **field type**        | **required** | **default**      |
| ---------- |----------------------------| ------------ | ------------ | ---------- |
| datasource | Data source name configured in Linkis                      | String       | Yes           | -          |
| query      | The functions used in the query must be supported by the selected datasource | String       | Yes           | -          |

**Exemples**

```JSON
{
    "name": "jdbc",
    "config": {
        "datasource": "mysql_test_db",
        "query": "select a.xxx, b.xxxx from table where id > 100",
        "options": {
            "key": "value"
        }
    }
}
```

#### 5.3.2 Transform Configuration

The logic of data transformation, **All `resultTable` registered before the current configuration can be used**

**Public configuration**

| **field name**   | **introduction**                    | **field type**        | **required** | **default**      |
| ------------ | ---------------------------------------------- | ------------ | ------------ | --------------- |
| sourceTable  | `resultTable` registered by the above `source` / `transform` | String       | No           | -               |
| resultTable  | Register `resultTable` for the below `transform` / `sink`            | String       | Yes           | -               |
| persist      | spark persist                                                     | Boolean             | No           | false           |
| storageLevel | spark storageLevel                                                     | String              | No           | MEMORY_AND_DISK |

##### 5.3.2.1 sql

**Fields**

| **field name**   | **introduction**                    | **field type**        | **required** | **default**      |
| ---------- | ------------------------------------------------------------ | ------------ | ------------ | ---------- |
| sql        | `resultTable` registered by the above `source` / `transform` can be used | String       | Yes           | -          |

**Exemples**

```JSON
{
    "name": "sql",
    "config": {
        "resultTable": "spark_transform_table_00001",
        "sql": "select * from ods.ods_test_table as a join spark_source_table_00001 as b on a.vin=b.vin",
        "cache": true
    }
}
```

#### 5.3.3 Sink Configuration

Write the `resultTable` to a file or table, **All `resultTable` registered before the current configuration can be used**

**Public configuration**

| **field name**   | **introduction**                    | **field type**        | **required** | **default**      |
| ------------------------- | ------------------------------------------------------------ | ------------------- | ------------ | ------------------------------------------------------------ |
| sourceTable / sourceQuery | `resultTable` from `soruce` / `transform` or select sql, which will be written         | String              | No           | sourceTable 和 sourceQuery 必须有一个不为空 sourceQuery 优先级更高 |
| options                   | [spark official](https://spark.apache.org/docs/latest/sql-data-sources.html) | Map<String, String> | No           |                                                              |
| variables                 | Variables can be replaced in file, example: `dt="${day}"`                                   | Map<String, String> | No           | {    "dt": "${day}",     "hour": "${hour}", }                |

##### 5.3.3.1 hive

**Fields**

| **field name**   | **introduction**                    | **field type**        | **required** | **default**      |
| -------------- | ------------------------------------------------------------ | ------------ | ------------ | ---------- |
| targetDatabase | The database of the table to be written                        | String       | Yes           | -          |
| targetTable    | The table to be written                                        | String       | Yes           | -          |
| saveMode       | Write mode, refer to Spark, the default is `overwrite`          | String       | Yes           | `overwrite`    |
| strongCheck    | field name, field order, field type must be same                  | Boolean      | No           | true       |
| writeAsFile    | Write as a file, it can improve efficiency. All partition variables should be in `variables` | Boolean      | No           | false      |
| numPartitions  | Number of partitions, `Dataset.repartition`                                | Integer      | No           | 10         |

**Exemples**

```JSON
{
    "name": "hive",
    "config": {
        "sourceTable": "spark_transform_table_00001",
        "targetTable": "dw.result_table",
        "saveMode": "append",
        "options": {
            "key": "value"
        }
    }
}
```

##### 5.3.3.2 jdbc

**Fields**

| **field name**   | **introduction**                    | **field type**        | **required** | **default**      |
| -------------- |--------------------------| ------------ | ------------ | ---------- |
| url            | jdbc url               | String       | Yes           | -          |
| driver         | driver class（fully-qualified name）               | String       | Yes           | -          |
| user           | username                      | String       | Yes           | -          |
| password       | password                       | String       | Yes           | -          |
| targetDatabase | The database of the table to be written             | String       | No           | -          |
| targetTable    | The table to be written                       | String       | Yes           | -          |
| preQueries     | SQL executed before writing                 | String[]     | No           | -          |
| numPartitions  | Number of partitions, `Dataset.repartition` | Integer      | No           | 10         |

**Exemples**

```JSON
{
    "name": "jdbc",
    "config": {
        "sourceTable": "spark_transform_table_00001",
        "database": "mysql_test_db",
        "targetTable": "test_001",
        "preQueries": ["delete from test_001 where dt='${exec_date}'"],
        "options": {
            "key": "value"
        }
    }
}
```

##### 5.3.3.3 managed_jdbc

Data source configured in Linkis. The data source connection information will be obtained from linkis and converted to jdbc for execution.

**Fields**

| **field name**   | **introduction**                    | **field type**        | **required** | **default**      |
|------------------|--------------------------| ------------ | ------------ | ---------- |
| targetDatasource | Data source name configured in Linkis           | String       | No           | -          |
| targetDatabase   | The database of the table to be written            | String       | No           | -          |
| targetTable      | The table to be written                  | String       | Yes           | -          |
| preQueries       | SQL executed before writing              | String[]     | No           | -          |
| numPartitions    | Number of partitions, `Dataset.repartition` | Integer      | No           | 10         |

**Exemples**

```JSON
{
    "name": "jdbc",
    "config": {
        "targetDatasource": "spark_transform_table_00001",
        "targetDatabase": "mysql_test_db",
        "targetTable": "test_001",
        "preQueries": ["delete from test_001 where dt='${exec_date}'"],
        "options": {
            "key": "value"
        }
    }
}
```

##### 5.3.3.4 file

**Fields**

| **field name**   | **introduction**                        | **field type**        | **required** | **default**      |
| ----------- | -------------------------------------------- | ------------ | ------------ | ---------- |
| path        | File path, default is `hdfs`                 | String       | Yes           | -          |
| serializer  | file format, default is   `parquet`          | String       | Yes           | `parquet`    |
| partitionBy |                                              | String[]     | No           |            |
| saveMode    | Write mode, refer to Spark, the default is `overwrite` | String       | No           |   `overwrite`  |

**Exemples**

```JSON
{
    "name": "file",
    "config": {
        "sourceTable": "spark_transform_table_00001",
        "path": "hdfs:///data/tmp/test_json/",
        "serializer": "json", 
        "variables": {
            "key": "value"
        },
        "options": {
            "key": "value"
        }
    }
}
```

### 5.4 Exemples

1. Read from jdbc, write to hive

```json
{
    "sources": [
        {
            "name": "jdbc",
            "config": {
                "resultTable": "spark_source_0001",
                "database": "mysql_test_db",
                "query": "select * from test_table limit 100"
            }
        }
    ],
    "transformations": [
    ],
    "sinks": [
        {
            "name": "hive",
            "config": {
                "sourceTable": "spark_source_0001",
                "targetTable": "ods.ods_test_table",
                "saveMode": "overwrite"
            }
        }
    ]
}
```

2. Read from hive, write to hive

```json
{
    "sources": [
    ],
    "transformations": [
        {
            "name": "sql",
            "config": {
                "resultTable": "spark_transform_00001",
                "sql": "select * from ods.ods_test_table limit 100"
            }
        }
    ],
    "sinks": [
        {
            "name": "hive",
            "config": {
                "sourceTable": "spark_transform_00001",
                "targetTable": "dw.dw_test_table",
                "saveMode": "overwrite"
            }
        }
    ]
}
```

3. Read from file, write to hive

```json
{
    "sources": [
        {
            "name": "file",
            "config": {
                "path": "hdfs:///data/tmp/test_csv/",
                "resultTable": "spark_file_0001",
                "serializer": "csv",
                "columnNames": ["col1", "col2", "col3"],
                "options": {
                    "delimiter": ",",
                    "header", "false"
                }
            }
        }
    ],
    "transformations": [
    ],
    "sinks": [
        {
            "name": "hive",
            "config": {
                "sourceQuery": "select col1, col2 from spark_file_0001",
                "targetTable": "ods.ods_test_table",
                "saveMode": "overwrite",
                "variables": {
                }
            }
        }
    ]
}
```

4. Read from hive, write to jdbc

```json
{
    "sources": [
    ],
    "transformations": [
    ],
    "sinks": [
        {
            "name": "jdbc",
            "config": {
                "sourceQuery": "select * from dm.dm_result_table where dt=${exec_date}",
                "database": "mysql_test_db",
                "targetTable": "mysql_test_table",
                "preQueries": ["delete from mysql_test_table where dt='${exec_date}'"],
                "options": {
                    "key": "value"
                }
            }
        }
    ]
}
```