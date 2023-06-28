---
title: Spark
sidebar_position: 1
---

本文主要介绍在 `Linkis` 中， `Spark` 引擎插件的安装、使用和配置。

## 1. 前置工作
### 1.1 引擎安装

如果您希望在您的服务器上使用 `Spark` 引擎，您需要保证以下的环境变量已经设置正确并且引擎的启动用户是有这些环境变量的。

强烈建议您在执行 `Spark` 任务之前，检查下执行用户的这些环境变量。

| 环境变量名      | 环境变量内容   | 备注                                   |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME       | JDK安装路径    | 必须                                   |
| HADOOP_HOME     | Hadoop安装路径 | 必须                                   |
| HADOOP_CONF_DIR | Hadoop配置路径 | 必须                                   |
| HIVE_CONF_DIR   | Hive配置路径   | 必须                                   |
| SPARK_HOME      | Spark安装路径  | 必须                                   |
| SPARK_CONF_DIR  | Spark配置路径  | 必须                                   |
| python          | python        | 建议使用anaconda的python作为默认python   |

### 1.2 环境验证
通过 `pyspark` 验证 `Spark` 是否安装成功
```
pyspark

#进入pyspark虚拟环境后，出现spark的logo则说明环境安装成功
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /__ / .__/\_,_/_/ /_/\_\   version 2.4.3
      /_/

Using Python version 2.7.13 (default, Sep 30 2017 18:12:43)
SparkSession available as 'spark'.
```

## 2. 引擎插件安装 [默认引擎](./overview.md)

`Linkis` 发布的二进制安装包中默认包含了 `Spark` 引擎插件，用户无需额外安装。

理论上 `Linkis` 支持的 `Spark2.x` 以上的所有版本。默认支持的版本为 `Spark2.4.3` 。如果您想使用其他的 `Spark` 版本，如 `Spark2.1.0` ，则您仅仅需要将插件 `Spark` 的版本进行修改，然后进行编译即可。具体的，您可以找到 `linkis-engineplugin-spark` 模块，将 `maven` 依赖中 `<spark.version>` 标签的值改成 2.1.0 ，然后单独编译此模块即可。

[EngineConnPlugin引擎插件安装](../deployment/install-engineconn.md)

## 3. 引擎的使用

### 3.1 通过 `Linkis-cli` 提交任务

```shell
# codeType对应关系 py-->pyspark  sql-->sparkSQL scala-->Spark scala
sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "show databases"  -submitUser hadoop -proxyUser hadoop

# 可以在提交参数通过-confMap wds.linkis.yarnqueue=dws  来指定yarn 队列
sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql  -confMap wds.linkis.yarnqueue=dws -code "show databases"  -submitUser hadoop -proxyUser hadoop
```
更多 `Linkis-Cli` 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

### 3.2 通过 `Linkis SDK` 提交任务

`Linkis` 提供了 `Java` 和 `Scala` 的 `SDK` 向 `Linkis` 服务端提交任务。具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md)。对于 `Spark` 任务你只需要修改 `Demo` 中的 `EngineConnType` 和 `CodeType` 参数即可:

```java
Map<String, Object> labels = new HashMap<String, Object>();
labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "sql"); // required codeType py,sql,scala
```

Spark还支持提交Scala代码和Pyspark代码：
````java

//scala 
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "scala");
code:
val df=spark.sql("show tables")
show(df)        
//pyspark
/labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py");
code:
df=spark.sql("show tables")
show(df)
````

### 3.3 通过提交jar包执行任务

通过 `OnceEngineConn` 提交任务（通过 spark-submit 提交 jar 包执行任务），提交方式参考 `org.apache.linkis.computation.client.SparkOnceJobTest`

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
                        // 提交的jar包获取的参数
                        .addJobContent("spark.app.args", "hdfs:///tmp/test_word_count.txt") // WordCount 测试文件
                        .addLabel("engineType", engineType + "-2.4.7")
                        .addLabel("userCreator", submitUser + "-IDE")
                        .addLabel("engineConnMode", "once")
                        .addStartupParam("spark.app.name", "spark-submit-jar-test-linkis") // yarn上展示的 Application Name
                        .addStartupParam("spark.executor.memory", "1g")
                        .addStartupParam("spark.driver.memory", "1g")
                        .addStartupParam("spark.executor.cores", "1")
                        .addStartupParam("spark.executor.instance", "1")
                        .addStartupParam("spark.app.resource", "hdfs:///tmp/spark/spark-examples_2.11-2.3.0.2.6.5.0-292.jar")
                        .addSource("jobName", "OnceJobTest")
                        .build();
        // endregion
        onceJob.submit();
        onceJob.waitForCompleted(); // 网络临时不通会导致异常，建议后期修改 SDK，现阶段使用，需要做异常处理
        // 网络临时不通会导致异常，建议后期修改 SDK，现阶段使用，需要做异常处理
        onceJob.waitForCompleted();
    }
}
```

### 3.4 通过 Restful API 提交任务

运行脚本类型包括 `sql`、`scala`、`python`、`data_calc(格式为json)`。

[任务提交执行Restful API文档](../api/linkis-task-operator.md)

```http request
POST /api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linkis

{
    "executionContent": {
        // 脚本内容，可以是sql，python，scala，json
        "code": "show databases",
        // 运行的脚本类型 sql, py（pyspark）, scala, data_calc
        "runType": "sql"
    },
    "params": {
        "variable": {
        },
        "configuration": {
            // spark 启动参数，非必填
            "startup": {
                "spark.executor.memory": "1g",
                "spark.driver.memory": "1g",
                "spark.executor.cores": "1",
                "spark.executor.instances": 1
            }
        }
    },
    "source":  {
        // 非必填，file:/// 或者 hdfs:///
        "scriptPath": "file:///tmp/hadoop/test.sql"
    },
    "labels": {
        // 格式为：引擎类型-版本
        "engineType": "spark-2.4.3",
        // userCreator: linkis 为用户名。IDE 是系统名，在 Linkis 后台管理。
        "userCreator": "linkis-IDE"
    }
}
```

## 4.引擎配置说明

### 4.1 默认配置说明
| 配置                     | 默认值          |是否必须    | 说明                                     |
| ------------------------ | ------------------- | ---|---------------------------------------- |
| wds.linkis.rm.instance        | 10    |否  | 引擎最大并发数 |
| spark.executor.cores        | 1            |否  | spark执行器核心个数 |
| spark.driver.memory       | 1g    |否              | spark执行器实例最大并发数 |
| spark.executor.memory       | 1g    |否              | spark执行器内存大小 |
| wds.linkis.engineconn.max.free.time       | 1h    |否              | 引擎空闲退出时间 |
| spark.python.version       | python2    |否              | python版本 |

### 4.2 队列资源配置
因为 `Spark` 任务的执行需要队列的资源，须要设置自己能够执行的队列。    

![yarn](./images/yarn-conf.png) 


### 4.3 配置修改
如果默认参数不满足时，有如下几中方式可以进行一些基础参数配置

#### 4.3.1 管理台配置
用户可以进行自定义的设置，比如 `Spark` 会话 `executor` 个数和 `executor` 的内存。这些参数是为了用户能够更加自由地设置自己的 `spark` 的参数，另外 `Spark` 其他参数也可以进行修改，比如的 `pyspark` 的 `python` 版本等。
![spark](./images/spark-conf.png)

注意: 修改 `IDE` 标签下的配置后需要指定 `-creator IDE` 才会生效（其它标签类似），如：

```shell
sh ./bin/linkis-cli -creator IDE \
-engineType spark-2.4.3 -codeType sql \
-code "show databases"  \
-submitUser hadoop -proxyUser hadoop
```

#### 4.3.2 任务接口配置
提交任务接口，通过参数 `params.configuration.runtime` 进行配置

```shell
http 请求参数示例 
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

### 4.4 引擎相关数据表

`Linkis` 是通过引擎标签来进行管理的，所涉及的数据表信息如下所示。

```
linkis_ps_configuration_config_key:  插入引擎的配置参数的key和默认values
linkis_cg_manager_label：插入引擎label如：spark-2.4.3
linkis_ps_configuration_category： 插入引擎的目录关联关系
linkis_ps_configuration_config_value： 插入引擎需要展示的配置
linkis_ps_configuration_key_engine_relation:配置项和引擎的关联关系
```

表中与引擎相关的初始数据如下

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
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.rm.instance', '范围：1-20，单位：个', 'spark引擎最大并发数', '10', 'NumInterval', '[1,20]', '0', '0', '1', '队列资源', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.instances', '取值范围：1-40，单位：个', 'spark执行器实例最大并发数', '1', 'NumInterval', '[1,40]', '0', '0', '2', 'spark资源设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.cores', '取值范围：1-8，单位：个', 'spark执行器核心个数',  '1', 'NumInterval', '[1,8]', '0', '0', '1','spark资源设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.memory', '取值范围：1-15，单位：G', 'spark执行器内存大小', '1g', 'Regex', '^([1-9]|1[0-5])(G|g)$', '0', '0', '3', 'spark资源设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.driver.cores', '取值范围：只能取1，单位：个', 'spark驱动器核心个数', '1', 'NumInterval', '[1,1]', '0', '1', '1', 'spark资源设置','spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.driver.memory', '取值范围：1-15，单位：G', 'spark驱动器内存大小','1g', 'Regex', '^([1-9]|1[0-5])(G|g)$', '0', '0', '1', 'spark资源设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.engineconn.max.free.time', '取值范围：3m,15m,30m,1h,2h', '引擎空闲退出时间','1h', 'OFT', '[\"1h\",\"2h\",\"30m\",\"15m\",\"3m\"]', '0', '0', '1', 'spark引擎设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.pd.addresses', NULL, NULL, 'pd0:2379', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.addr', NULL, NULL, 'tidb', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.password', NULL, NULL, NULL, 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.port', NULL, NULL, '4000', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.user', NULL, NULL, 'root', 'None', NULL, '0', '0', '1', 'tidb设置', 'spark');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.python.version', '取值范围：python2,python3', 'python版本','python2', 'OFT', '[\"python3\",\"python2\"]', '0', '0', '1', 'spark引擎设置', 'spark');

-- key engine relation
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config
INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'spark' and label.label_value = @SPARK_ALL);

-- engine default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation
INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @SPARK_ALL);

```

## 5. data_calc（数据计算，data calculate）功能说明

spark 解析 json 配置进行 ETL 操作的功能，整体设计如下图

![data_calc](/Images-zh/EngineUsage/data_calc.svg)

data_calc json 配置文件内容，有两种配置模式：数组模式和分组模式，默认为数组模式

插件类型包括 source，transformation，sink

**data_calc 调用样例**

```
POST http://localhost:8087/api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linkis

{
  "executionContent": {
    // code 为转译之后的 json，具体配置说明详见下文
    "code": "{\"plugins\":[{\"type\":\"source\",\"name\":\"jdbc\",\"config\":{\"resultTable\":\"spark_source_01\",\"url\":\"jdbc:mysql://localhost:3306/\",\"driver\":\"com.mysql.jdbc.Driver\",\"user\":\"xi_root\",\"password\":\"123456\",\"query\":\"select * from linkis.linkis_cg_manager_label\",\"options\":{}}},{\"type\":\"transformation\",\"name\":\"sql\",\"config\":{\"resultTable\":\"spark_transform_01\",\"sql\":\"select * from spark_source_01 limit 100\"}},{\"type\":\"sink\",\"name\":\"file\",\"config\":{\"sourceTable\":\"spark_transform_01\",\"path\":\"hdfs:///tmp/data/testjson\",\"serializer\":\"json\",\"partitionBy\":[\"label_key\"],\"saveMode\":\"overwrite\"}}]}",
    "runType": "data_calc"
  },
  "params": {
    "variable": {},
    "configuration": {
      // 启动参数设置
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

### 5.1 数组模式

插件有三个字段，name 为插件名，type 为插件类型，config 为具体配置

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

### 5.2 分组模式

插件有两个字段，name 为插件名，config 为具体配置

配置分为**3部分**：

1. sources：配置数据源，对应source类型插件
2. transformations：配置具体操作，对应transform类型插件
3. sinks：配置输出操作，对应sink类型插件

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

### 5.3 插件类型说明

#### 5.3.1 Source 插件配置

对应数据读取操作，可以从文件，jdbc读取文件，**仅能使用当前源的表，不能使用当前配置之前注册的临时表**

**公共配置**

| **字段名**   | **说明**                                                     | **字段类型**        | **是否必须** | **默认值**      |
| ------------ | ------------------------------------------------------------ | ------------------- | ------------ | --------------- |
| resultTable  | 注册表名，供 transform / sink 使用                           | String              | 是           | -               |
| persist      | 是否缓存                                                     | Boolean             | 否           | false           |
| storageLevel | 缓存级别                                                     | String              | 否           | MEMORY_AND_DISK |
| options      | 参考 [spark 官方文档](https://spark.apache.org/docs/latest/sql-data-sources.html) | Map<String, String> | 否           |                 |

##### 5.3.1.1 file

**配置字段**

| **字段名**  | **说明**                 | **字段类型** | **是否必须** | **默认值** |
| ----------- | ------------------------ | ------------ | ------------ | ---------- |
| path        | 文件路径，默认为 hdfs    | String       | 是           | -          |
| serializer  | 文件格式，默认为 parquet | String       | 是           | parquet    |
| columnNames | 映射的字段名             | String[]     | 否           | -          |

**样例**

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

**配置字段**

| **字段名** | **说明**                                             | **字段类型** | **是否必须** | **默认值** |
| ---------- | ---------------------------------------------------- | ------------ | ------------ | ---------- |
| url        | jdbc url                                 | String       | 是           | -          |
| driver     | 驱动类（完全限定名）                                 | String       | 是           | -          |
| user       | 用户名                                               | String       | 是           | -          |
| password   | 密码                                                 | String       | 是           | -          |
| query      | 查询语句，查询中使用的函数必须符合选中的数据库的规范 | String       | 是           | -          |

**样例**

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

linkis 中配置的 jdbc 数据源，会从 linkis 中获取数据源连接信息，并转为 jdbc 执行

**配置字段**

| **字段名** | **说明**                     | **字段类型** | **是否必须** | **默认值** |
| ---------- |----------------------------| ------------ | ------------ | ---------- |
| datasource | Linkis 中配置的数据源名称                       | String       | 是           | -          |
| query      | 查询语句，查询中使用的函数必须符合选中的数据库的规范 | String       | 是           | -          |

**样例**

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

#### 5.3.2 Transform 插件配置

数据加工相关逻辑，**可以使用当前配置之前注册的所有临时表**

**公共配置**

| **字段名**   | **说明**                                       | **字段类型** | **是否必须** | **默认值**      |
| ------------ | ---------------------------------------------- | ------------ | ------------ | --------------- |
| sourceTable  | 来源表名，使用 source / transform 注册的结果表 | String       | 否           | -               |
| resultTable  | 注册表名，供 transform / sink 使用             | String       | 是           | -               |
| persist      | 是否缓存                                       | Boolean      | 否           | false           |
| storageLevel | 缓存级别                                       | String       | 否           | MEMORY_AND_DISK |

##### 5.3.2.1 sql

**配置字段**

| **字段名** | **说明**                                                     | **字段类型** | **是否必须** | **默认值** |
| ---------- | ------------------------------------------------------------ | ------------ | ------------ | ---------- |
| sql        | 查询的 sql，可以使用前面 sosurces 和 transformations 中的注册表名 | String       | 是           | -          |

**样例**

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

#### 5.3.3 Sink 插件配置

可以把结果写入到文件或者表，**可以使用当前配置之前注册的所有临时表**

**公共变量**

| **字段名**                | **说明**                                                     | **字段类型**        | **是否必须** | **默认值**                                                   |
| ------------------------- | ------------------------------------------------------------ | ------------------- | ------------ | ------------------------------------------------------------ |
| sourceTable / sourceQuery | soruce / transform 中的结果表名或者查询的sql语句 作为结果输出         | String              | 否           | sourceTable 和 sourceQuery 必须有一个不为空 sourceQuery 优先级更高 |
| options                   | 参考 [spark 官方文档](https://spark.apache.org/docs/latest/sql-data-sources.html) | Map<String, String> | 否           |                                                              |
| variables                 | 变量替换，类似 `dt="${day}"`                                   | Map<String, String> | 否           | {    "dt": "${day}",     "hour": "${hour}", }                |

##### 5.3.3.1 hive

**配置字段**

| **字段名**     | **说明**                                                     | **字段类型** | **是否必须** | **默认值** |
| -------------- | ------------------------------------------------------------ | ------------ | ------------ | ---------- |
| targetDatabase | 待写入数据的表所在的数据库                                   | String       | 是           | -          |
| targetTable    | 待写入数据的表                                               | String       | 是           | -          |
| saveMode       | 写入模式，参考 spark，默认为 `overwrite`                       | String       | 是           | overwrite    |
| strongCheck    | 强校验，字段名，字段顺序，字段类型必须一致                   | Boolean      | 否           | true       |
| writeAsFile    | 按文件方式写入，可以提高效率，此时 `variables` 中必须包含所有的分区变量 | Boolean      | 否           | false      |
| numPartitions  | 分区个数，`Dataset.repartition`                                | Integer      | 否           | 10         |

**样例**

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

**配置字段**

| **字段名**     | **说明**                   | **字段类型** | **是否必须** | **默认值** |
| -------------- |--------------------------| ------------ | ------------ | ---------- |
| url            | jdbc url               | String       | 是           | -          |
| driver         | 驱动类（完全限定名）               | String       | 是           | -          |
| user           | 用户名                      | String       | 是           | -          |
| password       | 密码                       | String       | 是           | -          |
| targetDatabase | 待写入数据的表所在的数据库            | String       | 否           | -          |
| targetTable    | 待写入数据的表                  | String       | 是           | -          |
| preQueries     | 写入前执行的sql语句              | String[]     | 否           | -          |
| numPartitions  | 分区个数，`Dataset.repartition` | Integer      | 否           | 10         |

**样例**

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

linkis 中配置的 jdbc 数据源，会从 linkis 中获取数据源连接信息，并转为 jdbc 执行

**配置字段**

| **字段名**          | **说明**                   | **字段类型** | **是否必须** | **默认值** |
|------------------|--------------------------| ------------ | ------------ | ---------- |
| targetDatasource | Linkis 中配置的数据源名称           | String       | 否           | -          |
| targetDatabase   | 待写入数据的表所在的数据库            | String       | 否           | -          |
| targetTable      | 待写入数据的表                  | String       | 是           | -          |
| preQueries       | 写入前执行的sql语句              | String[]     | 否           | -          |
| numPartitions    | 分区个数，`Dataset.repartition` | Integer      | 否           | 10         |

**样例**

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

**配置字段**

| **字段名**  | **说明**                               | **字段类型** | **是否必须** | **默认值** |
| ----------- | -------------------------------------- | ------------ | ------------ | ---------- |
| path        | 文件路径，默认为 `hdfs`                  | String       | 是           | -          |
| serializer  | 文件格式，默认为 `parquet`               | String       | 是           | `parquet`    |
| partitionBy |                                        | String[]     | 否           |            |
| saveMode    | 写入模式，参考 spark，默认为 `overwrite` | String       | 否           |   `overwrite`         |

**样例**

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

### 5.4 使用样例

1. jdbc读取，写入hive表

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

2. hive读取，写入hive表

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

3. 文件读取，写入hive表

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

4. Hive 读取，写入jdbc

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
