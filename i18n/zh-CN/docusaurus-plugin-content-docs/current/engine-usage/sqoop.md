---
title: Sqoop 引擎
sidebar_position: 9
---

本文主要介绍在 `Linkis` 中， `Sqoop` 引擎插件的安装、使用和配置。

## 1. 前置工作
### 1.1 环境安装

`Sqoop` 引擎主要依赖 `Hadoop` 基础环境，如果该节点需要部署 `Sqoop` 引擎，需要部署 `Hadoop` 客户端环境，以及[下载](https://archive.apache.org/dist/sqoop/)安装 `Sqoop` 客户端。

### 1.2 环境验证
在执行 `Sqoop` 任务之前，先在该节点使用原生的 `Sqoop` 执行测试任务，以检测该节点环境是否正常。
```shell script
#验证sqoop环境是否可用 参考示例：将hdfs的/user/hive/warehouse/hadoop/test_linkis_sqoop文件数据导入到mysql表 test_sqoop中

sqoop export \
--connect  jdbc:mysql://10.10.10.10/test \
--username test \
--password test123\
--table test_sqoop \
--columns user_id,user_code,user_name,email,status \
--export-dir /user/hive/warehouse/hadoop/test_linkis_sqoop  \
--update-mode allowinsert  \
--verbose ;
```

| 环境变量名      | 环境变量内容   | 备注                                   |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME       | JDK安装路径    | 必须                                   |
| HADOOP_HOME     | Hadoop安装路径 | 必须                                   |
| HADOOP_CONF_DIR | Hadoop配置路径 | 必须                                |
| SQOOP_HOME | Sqoop安装路径 | 必须                             |
| SQOOP_CONF_DIR | Sqoop配置路径 | 非必须                                |
| HCAT_HOME | HCAT配置路径 | 非必须                                |
| HBASE_HOME | HBASE配置路径 | 非必须 |


| Linkis系统参数              | 参数                            | 备注                                                         |
| --------------------------- | ------------------------------- | ------------------------------------------------------------ |
| wds.linkis.hadoop.site.xml  | 设置sqoop加载hadoop参数文件位置 | 一般不需要单独配置，默认值"core-site.xml;hdfs-site.xml;yarn-site.xml;mapred-site.xml" |
| sqoop.fetch.status.interval | 设置获取sqoop执行状态的间隔时间 | 一般不需要单独配置，默认值为5s                                           |


## 2. 引擎插件部署

### 2.1 引擎插件准备（二选一）[非默认引擎](./overview.md)

方式一：直接下载引擎插件包

[Linkis 引擎插件下载](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)

方式二：单独编译引擎插件（需要有 `maven` 环境）

```
# 编译
cd ${linkis_code_dir}/linkis-engineconn-plugins/sqoop/
mvn clean install
# 编译出来的引擎插件包，位于如下目录中
${linkis_code_dir}/linkis-engineconn-plugins/sqoop/target/out/
```

[EngineConnPlugin 引擎插件安装](../deployment/install-engineconn.md)

### 2.2 引擎插件的上传和加载

将 2.1 中的引擎包上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
上传后目录结构如下所示
```
linkis-engineconn-plugins/
├── sqoop
│   ├── dist
│   │   └── v1.4.6
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 1.4.6
```

### 2.3 引擎刷新

#### 2.3.1 重启刷新
通过重启 `linkis-cg-linkismanager` 服务刷新引擎
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 检查引擎是否刷新成功
可以查看数据库中的 `linkis_engine_conn_plugin_bml_resources` 这张表的 `last_update_time` 是否为触发刷新的时间。

```sql
#登陆到 `linkis` 的数据库 
select * from linkis_cg_engine_conn_plugin_bml_resources;
```

## 3 引擎的使用

### 3.1 通过 `Linkis-cli` 提交任务
#### 3.1.1 `hdfs` 文件导出到 `mysql`

```shell
sh linkis-cli-sqoop export \
-D mapreduce.job.queuename=ide \
--connect jdbc:mysql://10.10.10.10:9600/testdb \
--username password@123 \
--password password@123  \
--table test_sqoop_01_copy \
--columns user_id,user_code,user_name,email,status \
--export-dir /user/hive/warehouse/hadoop/test_linkis_sqoop_2 \
--update-mode allowinsert --verbose ;  
```

#### 3.1.2 `mysql` 数据导入到 `hive` 库
```shell script
`mysql` 导入到 `hive` 库 `linkis_test_ind.test_import_sqoop_1` ,表 `test_import_sqoop_1` 不存在 需要添加参数 `--create-hive-table` 

sh linkis-cli-sqoop import -D mapreduce.job.queuename=dws \
--connect jdbc:mysql://10.10.10.10:3306/casion_test \
--username hadoop \
--password password@123 \
--table test_sqoop_01 \
--columns user_id,user_code,user_name,email,status \
--fields-terminated-by ',' \
--hive-import --create-hive-table \
--hive-database casionxia_ind \
--hive-table test_import_sqoop_1 \
--hive-drop-import-delims \
--delete-target-dir \
--input-null-non-string '\\N' \
--input-null-string '\\N' \
--verbose ;


`mysql` 导入到 `hive` 库 `linkis_test_ind.test_import_sqoop_1` ,表 `test_import_sqoop_1` 存在 移除参数 `--create-hive-table `

sh linkis-cli-sqoop import -D mapreduce.job.queuename=dws \
--connect jdbc:mysql://10.10.10.10:9600/testdb \
--username testdb \
--password password@123 \
--table test_sqoop_01 \
--columns user_id,user_code,user_name,email,status \
--fields-terminated-by ',' \
--hive-import \
--hive-database linkis_test_ind \
--hive-table test_import_sqoop_1 \
--hive-overwrite \
--hive-drop-import-delims \
--delete-target-dir \
--input-null-non-string '\\N' \
--input-null-string '\\N' \
--verbose ;

```

### 3.2 通过 OnceEngineConn 提交任务

`OnceEngineConn` 的使用方式是通过 `LinkisManagerClient` 调用 `LinkisManager` 的 `createEngineConn` 的接口，并将代码发给创建的 `Sqoop` 引擎，然后 `Sqoop` 引擎就开始执行，此方式可以被其他系统进行调用，比如 `Exchangis` 。 `Client` 的使用方式也很简单，首先新建一个 `maven` 项目，或者在您的项目中引入以下的依赖
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
**测试用例：**

```java

import java.util.concurrent.TimeUnit

import java.util

import org.apache.linkis.computation.client.LinkisJobBuilder
import org.apache.linkis.computation.client.once.simple.{SimpleOnceJob, SimpleOnceJobBuilder, SubmittableSimpleOnceJob}
import org.apache.linkis.computation.client.operator.impl.{EngineConnLogOperator, EngineConnMetricsOperator, EngineConnProgressOperator}
import org.apache.linkis.computation.client.utils.LabelKeyUtils

import scala.collection.JavaConverters._

object SqoopOnceJobTest extends App {
  LinkisJobBuilder.setDefaultServerUrl("http://127.0.0.1:9001")
  val logPath = "C:\\Users\\resources\\log4j.properties"
  System.setProperty("log4j.configurationFile", logPath)
  val startUpMap = new util.HashMap[String, Any]
  startUpMap.put("wds.linkis.engineconn.java.driver.memory", "1g")
   val builder = SimpleOnceJob.builder().setCreateService("Linkis-Client")
     .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY, "sqoop-1.4.6")
     .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY, "Client")
     .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY, "once")
     .setStartupParams(startUpMap)
     .setMaxSubmitTime(30000)
     .addExecuteUser("freeuser")
  val onceJob = importJob(builder)
  val time = System.currentTimeMillis()
  onceJob.submit()

  println(onceJob.getId)
  val logOperator = onceJob.getOperator(EngineConnLogOperator.OPERATOR_NAME).asInstanceOf[EngineConnLogOperator]
  println(onceJob.getECMServiceInstance)
  logOperator.setFromLine(0)
  logOperator.setECMServiceInstance(onceJob.getECMServiceInstance)
  logOperator.setEngineConnType("sqoop")
  logOperator.setIgnoreKeywords("[main],[SpringContextShutdownHook]")
  var progressOperator = onceJob.getOperator(EngineConnProgressOperator.OPERATOR_NAME).asInstanceOf[EngineConnProgressOperator]
  var metricOperator = onceJob.getOperator(EngineConnMetricsOperator.OPERATOR_NAME).asInstanceOf[EngineConnMetricsOperator]
  var end = false
  var rowBefore = 1
  while (!end || rowBefore > 0){
       if(onceJob.isCompleted) {
         end = true
         metricOperator = null
       }
      logOperator.setPageSize(100)
      Utils.tryQuietly{
        val logs = logOperator.apply()
        logs.logs.asScala.foreach( log => {
          println(log)
        })
        rowBefore = logs.logs.size
    }
    Thread.sleep(3000)
    Option(metricOperator).foreach( operator => {
      if (!onceJob.isCompleted){
        println(s"Metric监控: ${operator.apply()}")
        println(s"进度: ${progressOperator.apply()}")
      }
    })
  }
  onceJob.isCompleted
  onceJob.waitForCompleted()
  println(onceJob.getStatus)
  println(TimeUnit.SECONDS.convert(System.currentTimeMillis() - time, TimeUnit.MILLISECONDS) + "s")
  System.exit(0)


   def importJob(jobBuilder: SimpleOnceJobBuilder): SubmittableSimpleOnceJob = {
     jobBuilder
       .addJobContent("sqoop.env.mapreduce.job.queuename", "queue_10")
       .addJobContent("sqoop.mode", "import")
       .addJobContent("sqoop.args.connect", "jdbc:mysql://127.0.0.1:3306/exchangis")
       .addJobContent("sqoop.args.username", "free")
       .addJobContent("sqoop.args.password", "testpwd")
       .addJobContent("sqoop.args.query", "select id as order_number, sno as time from" +
         " exchangis where sno =1 and $CONDITIONS")
       .addJobContent("sqoop.args.hcatalog.database", "freedb")
       .addJobContent("sqoop.args.hcatalog.table", "zy_test")
       .addJobContent("sqoop.args.hcatalog.partition.keys", "month")
       .addJobContent("sqoop.args.hcatalog.partition.values", "3")
       .addJobContent("sqoop.args.num.mappers", "1")
       .build()
   }

   def exportJob(jobBuilder: SimpleOnceJobBuilder): SubmittableSimpleOnceJob = {
      jobBuilder
        .addJobContent("sqoop.env.mapreduce.job.queuename", "queue1")
        .addJobContent("sqoop.mode", "import")
        .addJobContent("sqoop.args.connect", "jdbc:mysql://127.0.0.1:3306/exchangis")
        .addJobContent("sqoop.args.query", "select id as order, sno as great_time from" +
          " exchangis_table where sno =1 and $CONDITIONS")
        .addJobContent("sqoop.args.hcatalog.database", "hadoop")
        .addJobContent("sqoop.args.hcatalog.table", "partition_33")
        .addJobContent("sqoop.args.hcatalog.partition.keys", "month")
        .addJobContent("sqoop.args.hcatalog.partition.values", "4")
        .addJobContent("sqoop.args.num.mappers", "1")
        .build()
   }
```


## 4 引擎配置说明
### 4.1 默认配置说明

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
|                                                                                                                       | sqoop.mode                              | import/export/…                                                                                                    |
| -Dmapreduce.job.queuename                                                                                             | sqoop.env.mapreduce.job.queuename       |                                                                                         |
| \--connect <jdbc-uri\>                                                                                                | sqoop.args.connect                      | Specify JDBC connect string                                                                                        |
| \--connection-manager <class-name\>                                                                                   | sqoop.args.connection.manager           | Specify connection manager class name                                                                              |
| \--connection-param-file <properties-file\>                                                                           | sqoop.args.connection.param.file        | Specify connection parameters file                                                                                 |
| \--driver <class-name\>                                                                                               | sqoop.args.driver                       | Manually specify JDBC driver class to use                                                                          |
| \--hadoop-home <hdir\>                                                                                                | sqoop.args.hadoop.home                  | Override $HADOOP\_MAPRED\_HOME\_ARG                                                                                |
| \--hadoop-mapred-home <dir\>                                                                                          | sqoop.args.hadoop.mapred.home           | Override $HADOOP\_MAPRED\_HOME\_ARG                                                                                |
| \--help                                                                                                               | sqoop.args.help                         | Print usage instructions                                                                                           |
| \-P                                                                                                                   |                                         | Read password from console                                                                                         |
| \--password <password\>                                                                                               | sqoop.args.password                     | Set authentication password                                                                                        |
| \--password-alias <password-alias\>                                                                                   | sqoop.args.password.alias               | Credential provider password alias                                                                                 |
| \--password-file <password-file\>                                                                                     | sqoop.args.password.file                | Set authentication password file path                                                                              |
| \--relaxed-isolation                                                                                                  | sqoop.args.relaxed.isolation            | Use read-uncommitted isolation for imports                                                                         |
| \--skip-dist-cache                                                                                                    | sqoop.args.skip.dist.cache              | Skip copying jars to distributed cache                                                                             |
| \--username <username\>                                                                                               | sqoop.args.username                     | Set authentication username                                                                                        |
| \--verbose                                                                                                            | sqoop.args.verbose                      | Print more information while working                                                                               |
|                                                                                                                       |                                         |                                                                                                                    |
### 4.2 导入导出参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--batch                                                                                                              | sqoop.args.batch                        |  Indicates underlying statements to be executed in batch mode                                                      |
| \--call <arg\>                                                                                                        | sqoop.args.call                         | Populate the table using this stored procedure (one call  per row)                                                 |
| \--clear-staging-table                                                                                                | sqoop.args.clear.staging.table          | Indicates that any data in staging table can be deleted                                                            |
| \--columns <col,col,col...\>                                                                                          | sqoop.args.columns                      | Columns to export to table                                                                                         |
| \--direct                                                                                                             | sqoop.args.direct                       | Use direct export fast path                                                                                        |
| \--export-dir <dir\>                                                                                                  | sqoop.args.export.dir                   | HDFS source path for the export                                                                                    |
| \-m,--num-mappers <n\>                                                                                                | sqoop.args.num.mappers                  | Use 'n' map tasks to export in parallel                                                                            |
| \--mapreduce-job-name <name\>                                                                                         | sqoop.args.mapreduce.job.name           | Set name for generated mapreduce job                                                                               |
| \--staging-table <table-name\>                                                                                        | sqoop.args.staging.table                | Intermediate staging  table                                                                                        |
| \--table <table-name\>                                                                                                | sqoop.args.table                        | Table to populate                                                                                                  |
| \--update-key <key\>                                                                                                  | sqoop.args.update.key                   | Update records by specified key column                                                                             |
| \--update-mode <mode\>                                                                                                | sqoop.args.update.mode                  | Specifies how updates are  performed  when new   rows are  found with non-matching keys in database                |
| \--validate                                                                                                           | sqoop.args.validate                     | Validate the copy using the configured validator                                                                   |
| \--validation-failurehandler <validation-failurehandler\>                                                             | sqoop.args.validation.failurehandler    | Validate the  copy using the configured validator                                                                  |
| \--validation-threshold <validation-threshold\>                                                                       | sqoop.args.validation.threshold         |  Fully qualified class name for ValidationThreshold                                                                |
| \--validator <validator\>                                                                                             | sqoop.args.validator                    | Fully qualified class name for the Validator                                                                       |
|                                                                                                                       |                                         |                                                                                                                    |
### 4.3 导入控制参数
| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--append                                                                                                             | sqoop.args.append                       | Imports data in append mode                                                                                        |
| \--as-avrodatafile                                                                                                    | sqoop.args.as.avrodatafile              | Imports data to Avro data files                                                                                    |
| \--as-parquetfile                                                                                                     | sqoop.args.as.parquetfile               | Imports data to Parquet files                                                                                      |
| \--as-sequencefile                                                                                                    | sqoop.args.as.sequencefile              | Imports data to SequenceFiles                                                                                      |
| \--as-textfile                                                                                                        | sqoop.args.as.textfile                  | Imports data as plain text (default)                                                                               |
| \--autoreset-to-one-mapper                                                                                            | sqoop.args.autoreset.to.one.mapper      | Reset the number of mappers to one mapper if no split key available                                                |
| \--boundary-query <statement\>                                                                                        | sqoop.args.boundary.query               | Set boundary query for retrieving max and min value of the primary key                                             |
| \--case-insensitive                                                                                                   | sqoop.args.case.insensitive             | Data Base is case insensitive, split where condition transfrom to lower case!                                      |
| \--columns <col,col,col...\>                                                                                          | sqoop.args.columns                      | Columns to import from table                                                                                       |
| \--compression-codec <codec\>                                                                                         | sqoop.args.compression.codec            | Compression codec to use for import                                                                                |
| \--delete-target-dir                                                                                                  | sqoop.args.delete.target.dir            | Imports data in delete mode                                                                                        |
| \--direct                                                                                                             | sqoop.args.direct                       | Use direct import fast path                                                                                        |
| \--direct-split-size <n\>                                                                                             | sqoop.args.direct.split.size            | Split the input stream every 'n' bytes when importing in direct mode                                               |
| \-e,--query <statement\>                                                                                              | sqoop.args.query                        | Import results of SQL 'statement'                                                                                  |
| \--fetch-size <n\>                                                                                                    | sqoop.args.fetch.size                   | Set number 'n' of rows to fetch from the database when more rows are needed                                        |
| \--inline-lob-limit <n\>                                                                                              | sqoop.args.inline.lob.limit             | Set the maximum size for an inline LOB                                                                             |
| \-m,--num-mappers <n\>                                                                                                | sqoop.args.num.mappers                  | Use 'n' map tasks to import in parallel                                                                            |
| \--mapreduce-job-name <name\>                                                                                         | sqoop.args.mapreduce.job.name           | Set name for generated mapreduce job                                                                               |
| \--merge-key <column\>                                                                                                | sqoop.args.merge.key                    | Key column to use to join results                                                                                  |
| \--split-by <column-name\>                                                                                            | sqoop.args.split.by                     | Column of the table used to split work units                                                                       |
| \--table <table-name\>                                                                                                | sqoop.args.table                        | Table to read                                                                                                      |
| \--target-dir <dir\>                                                                                                  | sqoop.args.target.dir                   | HDFS plain table destination                                                                                       |
| \--validate                                                                                                           | sqoop.args.validate                     | Validate the copy using the configured validator                                                                   |
| \--validation-failurehandler <validation-failurehandler\>                                                             | sqoop.args.validation.failurehandler    | Fully qualified class name for ValidationFa ilureHandler                                                           |
| \--validation-threshold <validation-threshold\>                                                                       | sqoop.args.validation.threshold         | Fully qualified class name for ValidationTh reshold                                                                |
| \--validator <validator\>                                                                                             | sqoop.args.validator                    | Fully qualified class name for the Validator                                                                       |
| \--warehouse-dir <dir\>                                                                                               | sqoop.args.warehouse.dir                | HDFS parent for table destination                                                                                  |
| \--where <where clause\>                                                                                              | sqoop.args.where                        | WHERE clause to use during import                                                                                  |
| \-z,--compress                                                                                                        | sqoop.args.compress                     | Enable compression                                                                                                 |
|                                                                                                                       |                                         |                                                                                                                    |

### 4.4 增量导入参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--check-column <column\>                                                                                             | sqoop.args.check.column                 | Source column to check for incremental change                                                                      |
| \--incremental <import-type\>                                                                                         | sqoop.args.incremental                  | Define an incremental import of type 'append' or 'lastmodified'                                                    |
| \--last-value <value\>                                                                                                | sqoop.args.last.value                   | Last imported value in the incremental check column                                                                |
|                                                                                                                       |                                         |                                                                                                                    |

### 4.5 输出行格式化参数
| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--enclosed-by <char\>                                                                                                | sqoop.args.enclosed.by                  | Sets a required field enclosing character                                                                          |
| \--escaped-by <char\>                                                                                                 | sqoop.args.escaped.by                   | Sets the escape character                                                                                          |
| \--fields-terminated-by <char\>                                                                                       | sqoop.args.fields.terminated.by         | Sets the field separator character                                                                                 |
| \--lines-terminated-by <char\>                                                                                        | sqoop.args.lines.terminated.by          | Sets the end-of-line character                                                                                     |
| \--mysql-delimiters                                                                                                   | sqoop.args.mysql.delimiters             | Uses MySQL's default delimiter set: fields: , lines: \\n escaped-by: \\ optionally-enclosed-by: '                  |
| \--optionally-enclosed-by <char\>                                                                                     | sqoop.args.optionally.enclosed.by       | Sets a field enclosing character                                                                                   |
|                                                                                                                       |                                         |                                                                                                                    |

### 4.6 输入解析参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--input-enclosed-by <char\>                                                                                          | sqoop.args.input.enclosed.by            | Sets a required field encloser                                                                                     |
| \--input-escaped-by <char\>                                                                                           | sqoop.args.input.escaped.by             | Sets the input escape character                                                                                    |
| \--input-fields-terminated-by <char\>                                                                                 | sqoop.args.input.fields.terminated.by   | Sets the input field separator                                                                                     |
| \--input-lines-terminated-by <char\>                                                                                  | sqoop.args.input.lines.terminated.by    | Sets the input end-of-line char                                                                                    |
| \--input-optionally-enclosed-by <char\>                                                                               | sqoop.args.input.optionally.enclosed.by | Sets a field enclosing character                                                                                   |
|                                                                                                                       |                                         |                                                                                                                    |

 ### 4.7 Hive 参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--create-hive-table                                                                                                  | sqoop.args.create.hive.table            | Fail if the target hive table exists                                                                               |
| \--hive-database <database-name\>                                                                                     | sqoop.args.hive.database                | Sets the database name to use when importing to hive                                                               |
| \--hive-delims-replacement <arg\>                                                                                     | sqoop.args.hive.delims.replacement      | Replace Hive record \\0x01 and row delimiters (\\n\\r) from imported string fields with user-defined string        |
| \--hive-drop-import-delims                                                                                            | sqoop.args.hive.drop.import.delims      | Drop Hive record \\0x01 and row delimiters (\\n\\r) from imported string fields                                    |
| \--hive-home <dir\>                                                                                                   | sqoop.args.hive.home                    | Override $HIVE\_HOME                                                                                               |
| \--hive-import                                                                                                        | sqoop.args.hive.import                  | Import tables into Hive (Uses Hive's default delimiters if none are set.)                                          |
| \--hive-overwrite                                                                                                     | sqoop.args.hive.overwrite               | Overwrite existing data in the Hive table                                                                          |
| \--hive-partition-key <partition-key\>                                                                                | sqoop.args.hive.partition.key           | Sets the partition key to use when importing to hive                                                               |
| \--hive-partition-value <partition-value\>                                                                            | sqoop.args.hive.partition.value         | Sets the partition value to use when importing to hive                                                             |
| \--hive-table <table-name\>                                                                                           | sqoop.args.hive.table                   | Sets the table name to use when importing to hive                                                                  |
| \--map-column-hive <arg\>                                                                                             | sqoop.args.map.column.hive              | Override mapping for specific column to hive types.                                                                |


### 4.8 HBase 参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--column-family <family\>                                                                                            | sqoop.args.column.family                | Sets the target column family for the import                                                                       |
| \--hbase-bulkload                                                                                                     | sqoop.args.hbase.bulkload               | Enables HBase bulk loading                                                                                         |
| \--hbase-create-table                                                                                                 | sqoop.args.hbase.create.table           | If specified, create missing HBase tables                                                                          |
| \--hbase-row-key <col\>                                                                                               | sqoop.args.hbase.row.key                | Specifies which input column to use as the row key                                                                 |
| \--hbase-table <table\>                                                                                               | sqoop.args.hbase.table                  | Import to <table\>in HBase                                                                                         |
|                                                                                                                       |                                         |                                                                                                                    |

### 4.9 HCatalog 参数 

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--hcatalog-database <arg\>                                                                                           | sqoop.args.hcatalog.database            | HCatalog database name                                                                                             |
| \--hcatalog-home <hdir\>                                                                                              | sqoop.args.hcatalog.home                | Override $HCAT\_HOME                                                                                               |
| \--hcatalog-partition-keys <partition-key\>                                                                           | sqoop.args.hcatalog.partition.keys      | Sets the partition keys to use when importing to hive                                                              |
| \--hcatalog-partition-values <partition-value\>                                                                       | sqoop.args.hcatalog.partition.values    | Sets the partition values to use when importing to hive                                                            |
| \--hcatalog-table <arg\>                                                                                              | sqoop.args.hcatalog.table               | HCatalog table name                                                                                                |
| \--hive-home <dir\>                                                                                                   | sqoop.args.hive.home                    | Override $HIVE\_HOME                                                                                               |
| \--hive-partition-key <partition-key\>                                                                                | sqoop.args.hive.partition.key           | Sets the partition key to use when importing to hive                                                               |
| \--hive-partition-value <partition-value\>                                                                            | sqoop.args.hive.partition.value         | Sets the partition value to use when importing to hive                                                             |
| \--map-column-hive <arg\>                                                                                             | sqoop.args.map.column.hive              | Override mapping for specific column to hive types.                                                                |
|                                                                                                                       |                                         |                                                                                                                    |
| HCatalog import specific options:                                                                                     |                                         |                                                                                                                    |
| \--create-hcatalog-table                                                                                              | sqoop.args.create.hcatalog.table        | Create HCatalog before import                                                                                      |
| \--hcatalog-storage-stanza <arg\>                                                                                     | sqoop.args.hcatalog.storage.stanza      | HCatalog storage stanza for table creation                                                                         |
|                                                                                                                       |                                         |                                                                                                                    
### 4.10 Accumulo 参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--accumulo-batch-size <size\>                                                                                        | sqoop.args.accumulo.batch.size          | Batch size in bytes                                                                                                |
| \--accumulo-column-family <family\>                                                                                   | sqoop.args.accumulo.column.family       | Sets the target column family for the import                                                                       |
| \--accumulo-create-table                                                                                              | sqoop.args.accumulo.create.table        | If specified, create missing Accumulo tables                                                                       |
| \--accumulo-instance <instance\>                                                                                      | sqoop.args.accumulo.instance            | Accumulo instance name.                                                                                            |
| \--accumulo-max-latency <latency\>                                                                                    | sqoop.args.accumulo.max.latency         | Max write latency in milliseconds                                                                                  |
| \--accumulo-password <password\>                                                                                      | sqoop.args.accumulo.password            | Accumulo password.                                                                                                 |
| \--accumulo-row-key <col\>                                                                                            | sqoop.args.accumulo.row.key             | Specifies which input column to use as the row key                                                                 |
| \--accumulo-table <table\>                                                                                            | sqoop.args.accumulo.table               | Import to <table\>in Accumulo                                                                                      |
| \--accumulo-user <user\>                                                                                              | sqoop.args.accumulo.user                | Accumulo user name.                                                                                                |
| \--accumulo-visibility <vis\>                                                                                         | sqoop.args.accumulo.visibility          | Visibility token to be applied to all rows imported                                                                |
| \--accumulo-zookeepers <zookeepers\>                                                                                  | sqoop.args.accumulo.zookeepers          | Comma-separated list of zookeepers (host:port)                                                                     |
|                                                                                                                       |                                         |                                                                                                                    |

### 4.11 代码生成参数

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \--bindir <dir\>                                                                                                      | sqoop.args.bindir                       | Output directory for compiled objects                                                                              |
| \--class-name <name\>                                                                                                 | sqoop.args.class.name                   | Sets the generated class name. This overrides --package-name. When combined with --jar-file, sets the input class. |
| \--input-null-non-string <null-str\>                                                                                  | sqoop.args.input.null.non.string        | Input null non-string representation                                                                               |
| \--input-null-string <null-str\>                                                                                      | sqoop.args.input.null.string            | Input null string representation                                                                                   |
| \--jar-file <file\>                                                                                                   | sqoop.args.jar.file                     | Disable code generation; use specified jar                                                                         |
| \--map-column-java <arg\>                                                                                             | sqoop.args.map.column.java              | Override mapping for specific columns to java types                                                                |
| \--null-non-string <null-str\>                                                                                        | sqoop.args.null.non.string              | Null non-string representation                                                                                     |
| \--null-string <null-str\>                                                                                            | sqoop.args.null.string                  | Null string representation                                                                                         |
| \--outdir <dir\>                                                                                                      | sqoop.args.outdir                       | Output directory for generated code                                                                                |
| \--package-name <name\>                                                                                               | sqoop.args.package.name                 | Put auto-generated classes in this package                                                                         |
|                                                                                                                       |                                         |                                                                                                                    |
### 4.12 通用 Hadoop 命令行参数
>must preceed any tool-specific arguments,Generic options supported are 

| 参数                                                                                                                    | key                                     | 说明                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \-conf <configuration file\>                                                                                          | sqoop.args.conf                         | specify an application configuration file                                                                          |
| \-D <property=value\>                                                                                                 | sqoop.args.D                            | use value for given property                                                                                       |
| \-fs <local|namenode:port\>                                                                                           | sqoop.args.fs                           | specify a namenode                                                                                                 |
| \-jt <local|resourcemanager:port\>                                                                                    | sqoop.args.jt                           | specify a ResourceManager                                                                                          |
| \-files <comma separated list of files\>                                                                              | sqoop.args.files                        | specify comma separated files to be copied to the map reduce cluster                                               |
| \-libjars <comma separated list of jars\>                                                                             | sqoop.args.libjars                      | specify comma separated jar files to include in the classpath.                                                     |
| \-archives <comma separated list of archives\>                                                                        | sqoop.args.archives                     | specify comma separated archives to be unarchived on the compute machines.                                         |