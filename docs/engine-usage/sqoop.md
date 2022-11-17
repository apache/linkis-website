---
title: Sqoop Engine
sidebar_position: 9
---

This article mainly introduces the installation, usage and configuration of the `Sqoop` engine plugin in `Linkis`.

## 1. Preliminary work
### 1.1 Environment Installation

The `Sqoop` engine mainly depends on the `Hadoop` basic environment. If the node needs to deploy the `Sqoop` engine, you need to deploy the `Hadoop` client environment, and ![Download](https://archive.apache.org/dist/sqoop /) Install the `Sqoop` client.

### 1.2 Environment verification
Before executing the `Sqoop` task, use the native `Sqoop` to execute the test task on the node to check whether the node environment is normal.
```shell script
#Verify whether the sqoop environment is available Reference example: Import the /user/hive/warehouse/hadoop/test_linkis_sqoop file data of hdfs into the mysql table test_sqoop

sqoop export \
--connect jdbc:mysql://10.10.10.10/test \
--username test \
--password test123\
--table test_sqoop \
--columns user_id,user_code,user_name,email,status \
--export-dir /user/hive/warehouse/hadoop/test_linkis_sqoop \
--update-mode allowinsert \
--verbose ;
```

| Environment variable name | Environment variable content | Remarks |
|-----------------|----------------|-------------- -----------------------------|
| JAVA_HOME | JDK installation path | Required |
| HADOOP_HOME | Hadoop installation path | Required |
| HADOOP_CONF_DIR | Hadoop configuration path | required |
| SQOOP_HOME | Sqoop installation path | Required |
| SQOOP_CONF_DIR | Sqoop configuration path | not required |
| HCAT_HOME | HCAT configuration path | not required |
| HBASE_HOME | HBASE configuration path | not required |


| Linkis System Parameters | Parameters | Remarks |
| ------------------------------------- | --------------------- ---------- | --------------------------------------- --------------------- |
| wds.linkis.hadoop.site.xml | Set sqoop to load hadoop parameter file location | Generally, no separate configuration is required, the default value is "core-site.xml;hdfs-site.xml;yarn-site.xml;mapred-site. xml" |
| sqoop.fetch.status.interval | Set the interval for obtaining sqoop execution status | Generally, no separate configuration is required, the default value is 5s |


## 2. Engine plugin deployment

### 2.1 Engine plugin preparation (choose one) [non-default engine](./overview.md)

Method 1: Download the engine plug-in package directly

[Linkis Engine Plugin Download](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)

Method 2: Compile the engine plug-in separately (requires a `maven` environment)

```
# compile
cd ${linkis_code_dir}/linkis-engineconn-plugins/sqoop/
mvn clean install
# The compiled engine plug-in package is located in the following directory
${linkis_code_dir}/linkis-engineconn-plugins/sqoop/target/out/
```

[EngineConnPlugin engine plugin installation](../deployment/install-engineconn.md)

### 2.2 Upload and load engine plugins

Upload the engine package in 2.1 to the engine directory of the server
```bash
${LINKIS_HOME}/lib/linkis-engineplugins
```
The directory structure after uploading is as follows
```
linkis-engineconn-plugins/
├── sqoop
│ ├── dist
│ │ └── v1.4.6
│ │ ├── conf
│ │ └── lib
│ └── plugin
│ └── 1.4.6
```

### 2.3 Engine refresh

#### 2.3.1 Restart and refresh
Refresh the engine by restarting the `linkis-cg-linkismanager` service
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 Check if the engine is refreshed successfully
You can check whether the `last_update_time` of the `linkis_engine_conn_plugin_bml_resources` table in the database is the time to trigger the refresh.

```sql
#Login to the `linkis` database
select * from linkis_cg_engine_conn_plugin_bml_resources;
```

## 3 `Sqoop` engine usage

### 3.1 Submitting tasks via `Linkis-cli`
#### 3.1.1 `hdfs` file export to `mysql`

```shell
sh linkis-cli-sqoop export \
-D mapreduce.job.queuename=ide\
--connect jdbc:mysql://10.10.10.10:9600/testdb\
--username password@123 \
--password password@123 \
--table test_sqoop_01_copy \
--columns user_id,user_code,user_name,email,status \
--export-dir /user/hive/warehouse/hadoop/test_linkis_sqoop_2 \
--update-mode allowinsert --verbose ;  
```

#### 3.1.2 `mysql` data import to `hive` library
```shell script
`mysql` is imported into `hive` library `linkis_test_ind.test_import_sqoop_1`, table `test_import_sqoop_1` does not exist, need to add parameter `--create-hive-table`

sh linkis-cli-sqoop import -D mapreduce.job.queuename=dws\
--connect jdbc:mysql://10.10.10.10:3306/casion_test\
--username hadoop\
--password password@123 \
--table test_sqoop_01 \
--columns user_id,user_code,user_name,email,status \
--fields-terminated-by ',' \
--hive-import --create-hive-table \
--hive-database casionxia_ind\
--hive-table test_import_sqoop_1 \
--hive-drop-import-delims \
--delete-target-dir \
--input-null-non-string '\\N' \
--input-null-string '\\N' \
--verbose ;


`mysql` is imported into the `hive` library `linkis_test_ind.test_import_sqoop_1`, the table `test_import_sqoop_1` exists to remove the parameter `--create-hive-table`

sh linkis-cli-sqoop import -D mapreduce.job.queuename=dws\
--connect jdbc:mysql://10.10.10.10:9600/testdb\
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

### 3.2 Submit tasks through `OnceEngineConn`

The usage of `OnceEngineConn` is to call the `createEngineConn` interface of `LinkisManager` through `LinkisManagerClient`, and send the code to the created `Sqoop` engine, and then the `Sqoop` engine starts to execute, which can be performed by other systems. Calls such as `Exchangeis`. The usage of `Client` is also very simple, first create a `maven` project, or introduce the following dependencies into your project
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
**Test case:**

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
  val startUpMap = new util. HashMap[String, Any]
  startUpMap.put("wds.linkis.engineconn.java.driver.memory", "1g")
   val builder = SimpleOnceJob. builder(). setCreateService("Linkis-Client")
     .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY, "sqoop-1.4.6")
     .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY, "Client")
     .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY, "once")
     .setStartupParams(startUpMap)
     .setMaxSubmitTime(30000)
     .addExecuteUser("freeuser")
  val onceJob = importJob(builder)
  val time = System. currentTimeMillis()
  onceJob.submit()

  println(onceJob. getId)
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
      Utils. tryQuietly{
        val logs = logOperator.apply()
        logs.logs.asScala.foreach( log => {
          println(log)
        })
        rowBefore = logs. logs. size
    }
    Thread.sleep(3000)
    Option(metricOperator).foreach( operator => {
      if (!onceJob.isCompleted){
        println(s"Metric monitoring: ${operator.apply()}")
        println(s"Progress: ${progressOperator.apply()}")
      }
    })
  }
  onceJob. isCompleted
  onceJob.waitForCompleted()
  println(onceJob. getStatus)
  println(TimeUnit. SECONDS. convert(System. currentTimeMillis() - time, TimeUnit. MILLISECONDS) + "s")
  System. exit(0)


   def importJob(jobBuilder: SimpleOnceJobBuilder): SubmittableSimpleOnceJob = {
     jobBuilder
       .addJobContent("sqoop.env.mapreduce.job.queuename", "queue_10")
       .addJobContent("sqoop. mode", "import")
       .addJobContent("sqoop.args.connect", "jdbc:mysql://127.0.0.1:3306/exchangis")
       .addJobContent("sqoop.args.username", "free")
       .addJobContent("sqoop.args.password", "testpwd")
       .addJobContent("sqoop.args.query", "select id as order_number, sno as time from" +
         "exchangis where sno =1 and $CONDITIONS")
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
          "exchangis_table where sno =1 and $CONDITIONS")
        .addJobContent("sqoop.args.hcatalog.database", "hadoop")
        .addJobContent("sqoop.args.hcatalog.table", "partition_33")
        .addJobContent("sqoop.args.hcatalog.partition.keys", "month")
        .addJobContent("sqoop.args.hcatalog.partition.values", "4")
        .addJobContent("sqoop.args.num.mappers", "1")
        .build()
   }
```


## 4 Engine configuration instructions
### 4.1 Default Configuration Description

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| | sqoop.mode | import/export/… |
| -Dmapreduce.job.queuename | sqoop.env.mapreduce.job.queuename | |
| \--connect <jdbc-uri\> | sqoop.args.connect | Specify JDBC connect string |
| \--connection-manager <class-name\> | sqoop.args.connection.manager | Specify connection manager class name |
| \--connection-param-file <properties-file\> | sqoop.args.connection.param.file | Specify connection parameters file |
| \--driver <class-name\> | sqoop.args.driver | Manually specify JDBC driver class to use |
| \--hadoop-home <hdir\> | sqoop.args.hadoop.home | Override $HADOOP\_MAPRED\_HOME\_ARG |
| \--hadoop-mapred-home <dir\> | sqoop.args.hadoop.mapred.home | Override $HADOOP\_MAPRED\_HOME\_ARG |
| \--help | sqoop.args.help | Print usage instructions |
| \-P | | Read password from console |
| \--password <password\> | sqoop.args.password | Set authentication password |
| \--password-alias <password-alias\> | sqoop.args.password.alias | Credential provider password alias |
| \--password-file <password-file\> | sqoop.args.password.file | Set authentication password file path |
| \--relaxed-isolation | sqoop.args.relaxed.isolation | Use read-uncommitted isolation for imports |
| \--skip-dist-cache | sqoop.args.skip.dist.cache | Skip copying jars to distributed cache |
| \--username <username\> | sqoop.args.username | Set authentication username |
| \--verbose | sqoop.args.verbose | Print more information while working |
| | | |
### 4.2 Import and export parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--batch | sqoop.args.batch | Indicates underlying statements to be executed in batch mode |
| \--call <arg\> | sqoop.args.call | Populate the table using this stored procedure (one call per row) |
| \--clear-staging-table | sqoop.args.clear.staging.table | Indicates that any data in staging table can be deleted |
| \--columns <col,col,col...\> | sqoop.args.columns | Columns to export to table |
| \--direct | sqoop.args.direct | Use direct export fast path |
| \--export-dir <dir\> | sqoop.args.export.dir | HDFS source path for the export |
| \-m,--num-mappers <n\> | sqoop.args.num.mappers | Use 'n' map tasks to export in parallel |
| \--mapreduce-job-name <name\> | sqoop.args.mapreduce.job.name | Set name for generated mapreduce job |
| \--staging-table <table-name\> | sqoop.args.staging.table | Intermediate staging table |
| \--table <table-name\> | sqoop.args.table | Table to populate |
| \--update-key <key\> | sqoop.args.update.key | Update records by specified key column |
| \--update-mode <mode\> | sqoop.args.update.mode | Specifies how updates are performed when new rows are found with non-matching keys in database |
| \--validate | sqoop.args.validate | Validate the copy using the configured validator |
| \--validation-failurehandler <validation-failurehandler\> | sqoop.args.validation.failurehandler | Validate the copy using the configured validator |
| \--validation-threshold <validation-threshold\> | sqoop.args.validation.threshold | Fully qualified class name for ValidationThreshold |
| \--validator <validator\> | sqoop.args.validator | Fully qualified class name for the Validator |
| | | |
### 4.3 Import control parameters
| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--append | sqoop.args.append | Imports data in append mode |
| \--as-avrodatafile | sqoop.args.as.avrodatafile | Imports data to Avro data files |
| \--as-parquetfile | sqoop.args.as.parquetfile | Imports data to Parquet files |
| \--as-sequencefile | sqoop.args.as.sequencefile | Imports data to SequenceFiles |
| \--as-textfile | sqoop.args.as.textfile | Imports data as plain text (default) |
| \--autoreset-to-one-mapper | sqoop.args.autoreset.to.one.mapper | Reset the number of mappers to one mapper if no split key available |
| \--boundary-query <statement\> | sqoop.args.boundary.query | Set boundary query for retrieving max and min value of the primary key |
| \--case-insensitive | sqoop.args.case.insensitive | Data Base is case insensitive, split where condition transfrom to lower case! |
| \--columns <col,col,col...\> | sqoop.args.columns | Columns to import from table |
| \--compression-codec <codec\> | sqoop.args.compression.codec | Compression codec to use for import |
| \--delete-target-dir | sqoop.args.delete.target.dir | Imports data in delete mode |
| \--direct | sqoop.args.direct | Use direct import fast path |
| \--direct-split-size <n\> | sqoop.args.direct.split.size | Split the input stream every 'n' bytes when importing in direct mode |
| \-e,--query <statement\> | sqoop.args.query | Import results of SQL 'statement' |
| \--fetch-size <n\> | sqoop.args.fetch.size | Set number 'n' of rows to fetch from the database when more rows are needed |
| \--inline-lob-limit <n\> | sqoop.args.inline.lob.limit | Set the maximum size for an inline LOB |
| \-m,--num-mappers <n\> | sqoop.args.num.mappers | Use 'n' map tasks to import in parallel |
| \--mapreduce-job-name <name\> | sqoop.args.mapreduce.job.name | Set name for generated mapreduce job |
| \--merge-key <column\> | sqoop.args.merge.key | Key column to use to join results |
| \--split-by <column-name\> | sqoop.args.split.by | Column of the table used to split work units |
| \--table <table-name\> | sqoop.args.table | Table to read |
| \--target-dir <dir\> | sqoop.args.target.dir | HDFS plain table destination |
| \--validate | sqoop.args.validate | Validate the copy using the configured validator |
| \--validation-failurehandler <validation-failurehandler\> | sqoop.args.validation.failurehandler | Fully qualified class name for ValidationFa ilureHandler |
| \--validation-threshold <validation-threshold\> | sqoop.args.validation.threshold | Fully qualified class name for ValidationThreshold |
| \--validator <validator\> | sqoop.args.validator | Fully qualified class name for the Validator |
| \--warehouse-dir <dir\> | sqoop.args.warehouse.dir | HDFS parent for table destination |
| \--where <where clause\> | sqoop.args.where | WHERE clause to use during import |
| \-z,--compress | sqoop.args.compress | Enable compression |
| | | |

### 4.4 Incremental import parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--check-column <column\> | sqoop.args.check.column | Source column to check for incremental change |
| \--incremental <import-type\> | sqoop.args.incremental | Define an incremental import of type 'append' or 'lastmodified' |
| \--last-value <value\> | sqoop.args.last.value | Last imported value in the incremental check column |
| | | |

### 4.5 Output line formatting parameters
| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--enclosed-by <char\> | sqoop.args.enclosed.by | Sets a required field enclosing character |
| \--escaped-by <char\> | sqoop.args.escaped.by | Sets the escape character |
| \--fields-terminated-by <char\> | sqoop.args.fields.terminated.by | Sets the field separator character |
| \--lines-terminated-by <char\> | sqoop.args.lines.terminated.by | Sets the end-of-line character |
| \--mysql-delimiters | sqoop.args.mysql.delimiters | Uses MySQL's default delimiter set: fields: , lines: \\n escaped-by: \\ optionally-enclosed-by: ' |
| \--optionally-enclosed-by <char\> | sqoop.args.optionally.enclosed.by | Sets a field enclosing character |
| | | |

### 4.6 Input parsing parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--input-enclosed-by <char\> | sqoop.args.input.enclosed.by | Sets a required field enclosure |
| \--input-escaped-by <char\> | sqoop.args.input.escaped.by | Sets the input escape character |
| \--input-fields-terminated-by <char\> | sqoop.args.input.fields.terminated.by | Sets the input field separator |
| \--input-lines-terminated-by <char\> | sqoop.args.input.lines.terminated.by | Sets the input end-of-line char |
| \--input-optionally-enclosed-by <char\> | sqoop.args.input.optionally.enclosed.by | Sets a field enclosing character |
| | | |

 ### 4.7 `Hive` parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--create-hive-table | sqoop.args.create.hive.table | Fail if the target hive table exists |
| \--hive-database <database-name\> | sqoop.args.hive.database | Sets the database name to use when importing to hive |
| \--hive-delims-replacement <arg\> | sqoop.args.hive.delims.replacement | Replace Hive record \\0x01 and row delimiters (\\n\\r) from imported string fields with user-defined string |
| \--hive-drop-import-delims | sqoop.args.hive.drop.import.delims | Drop Hive record \\0x01 and row delimiters (\\n\\r) from imported string fields |
| \--hive-home <dir\> | sqoop.args.hive.home | Override $HIVE\_HOME |
| \--hive-import | sqoop.args.hive.import | Import tables into Hive (Uses Hive's default delimiters if none are set.) |
| \--hive-overwrite | sqoop.args.hive.overwrite | Overwrite existing data in the Hive table |
| \--hive-partition-key <partition-key\> | sqoop.args.hive.partition.key | Sets the partition key to use when importing to hive |
| \--hive-partition-value <partition-value\> | sqoop.args.hive.partition.value | Sets the partition value to use when importing to hive |
| \--hive-table <table-name\> | sqoop.args.hive.table | Sets the table name to use when importing to hive |
| \--map-column-hive <arg\> | sqoop.args.map.column.hive | Override mapping for specific column to hive types. |


### 4.8 `HBase` parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--column-family <family\> | sqoop.args.column.family | Sets the target column family for the import |
| \--hbase-bulkload | sqoop.args.hbase.bulkload | Enables HBase bulk loading |
| \--hbase-create-table | sqoop.args.hbase.create.table | If specified, create missing HBase tables |
| \--hbase-row-key <col\> | sqoop.args.hbase.row.key | Specifies which input column to use as the row key |
| \--hbase-table <table\> | sqoop.args.hbase.table | Import to <table\>in HBase |
| | | |

### 4.9 `HCatalog` parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--hcatalog-database <arg\> | sqoop.args.hcatalog.database | HCatalog database name |
| \--hcatalog-home <hdir\> | sqoop.args.hcatalog.home | Override $HCAT\_HOME |
| \--hcatalog-partition-keys <partition-key\> | sqoop.args.hcatalog.partition.keys | Sets the partition keys to use when importing to hive |
| \--hcatalog-partition-values ​​<partition-value\> | sqoop.args.hcatalog.partition.values ​​| Sets the partition values ​​to use when importing to hive |
| \--hcatalog-table <arg\> | sqoop.args.hcatalog.table | HCatalog table name |
| \--hive-home <dir\> | sqoop.args.hive.home | Override $HIVE\_HOME |
| \--hive-partition-key <partition-key\> | sqoop.args.hive.partition.key | Sets the partition key to use when importing to hive |
| \--hive-partition-value <partition-value\> | sqoop.args.hive.partition.value | Sets the partition value to use when importing to hive |
| \--map-column-hive <arg\> | sqoop.args.map.column.hive | Override mapping for specific column to hive types. |
| | | |
| HCatalog import specific options: | | |
| \--create-hcatalog-table | sqoop.args.create.hcatalog.table | Create HCatalog before import |
| \--hcatalog-storage-stanza <arg\> | sqoop.args.hcatalog.storage.stanza | HCatalog storage stanza for table creation |
| | |                                                                                                                    
### 4.10 `Accumulo` parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--accumulo-batch-size <size\> | sqoop.args.accumulo.batch.size | Batch size in bytes |
| \--accumulo-column-family <family\> | sqoop.args.accumulo.column.family | Sets the target column family for the import |
| \--accumulo-create-table | sqoop.args.accumulo.create.table | If specified, create missing Accumulo tables |
| \--accumulo-instance <instance\> | sqoop.args.accumulo.instance | Accumulo instance name. |
| \--accumulo-max-latency <latency\> | sqoop.args.accumulo.max.latency | Max write latency in milliseconds |
| \--accumulo-password <password\> | sqoop.args.accumulo.password | Accumulo password. |
| \--accumulo-row-key <col\> | sqoop.args.accumulo.row.key | Specifies which input column to use as the row key |
| \--accumulo-table <table\> | sqoop.args.accumulo.table | Import to <table\>in Accumulo |
| \--accumulo-user <user\> | sqoop.args.accumulo.user | Accumulo user name. |
| \--accumulo-visibility <vis\> | sqoop.args.accumulo.visibility | Visibility token to be applied to all rows imported |
| \--accumulo-zookeepers <zookeepers\> | sqoop.args.accumulo.zookeepers | Comma-separated list of zookeepers (host:port) |
| | | |

### 4.11 Code Generation Parameters

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \--bindir <dir\> | sqoop.args.bindir | Output directory for compiled objects |
| \--class-name <name\> | sqoop.args.class.name | Sets the generated class name. This overrides --package-name. When combined with --jar-file, sets the input class. |
| \--input-null-non-string <null-str\> | sqoop.args.input.null.non.string | Input null non-string representation |
| \--input-null-string <null-str\> | sqoop.args.input.null.string | Input null string representation |
| \--jar-file <file\> | sqoop.args.jar.file | Disable code generation; use specified jar |
| \--map-column-java <arg\> | sqoop.args.map.column.java | Override mapping for specific columns to java types |
| \--null-non-string <null-str\> | sqoop.args.null.non.string | Null non-string representation |
| \--null-string <null-str\> | sqoop.args.null.string | Null string representation |
| \--outdir <dir\> | sqoop.args.outdir | Output directory for generated code |
| \--package-name <name\> | sqoop.args.package.name | Put auto-generated classes in this package |
| | | |
### 4.12 Generic `Hadoop` command line arguments
>must preceed any tool-specific arguments,Generic options supported are

| parameter | key | description |
| -------------------------------------------------- -------------------------------------------------- ------------------ | ------------------------------- -------- | ----------------------------------------- -------------------------------------------------- ----------------------- |
| \-conf <configuration file\> | sqoop.args.conf | specify an application configuration file |
| \-D <property=value\> | sqoop.args.D | use value for given property |
| \-fs <local|namenode:port\> | sqoop.args.fs | specify a namenode |
| \-jt <local|resourcemanager:port\> | sqoop.args.jt | specify a ResourceManager |
| \-files <comma separated list of files\> | sqoop.args.files | specify comma separated files to be copied to the map reduce cluster |
| \-libjars <comma separated list of jars\> | sqoop.args.libjars | specify comma separated jar files to include in the classpath. |
| \-archives <comma separated list of archives\> | sqoop.args.archives | specify comma separated archives to be unarchived on the compute machines. |