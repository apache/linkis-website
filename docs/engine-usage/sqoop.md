---
title: Sqoop Engine
sidebar_position: 9
---

# Sqoop Engine usage documentation

This article mainly introduces the configuration, deployment and use of the Sqoop engine in Linkis1.X.

## 1.Sqoop engine Linkis system parameter configuration

The Sqoop engine mainly depends on the Hadoop basic environment. If the node needs to deploy the Sqoop engine, the Hadoop client environment needs to be deployed.

It is strongly recommended that you use the native Sqoop to execute the test task on the node before executing the Sqoop task to check whether the node environment is normal.

| Environment Variable Name | Environment Variable Content | Remark                             |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME       | JDK installation path | Required                           |
| HADOOP_HOME     | Hadoop installation path | Required                           |
| HADOOP_CONF_DIR | Hadoop installation path | Required                        |
| SQOOP_HOME | Sqoop installation path | Not Required                 |
| SQOOP_CONF_DIR | Sqoop config path | Not Required                    |
| HCAT_HOME | HCAT config path | Not Required                    |
| HBASE_HOME | HBASE config path | Not Required |

Table 1-1 Environment configuration list

| Linkis Parameter Name       | Parameter Content                                          | Remark                                                       |
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| wds.linkis.hadoop.site.xml  | Set sqoop to load hadoop parameter file location           | Required，Reference example："/etc/hadoop/conf/core-site.xml;/etc/hadoop/conf/hdfs-site.xml;/etc/hadoop/conf/yarn-site.xml;/etc/hadoop/conf/mapred-site.xml" |
| sqoop.fetch.status.interval | Set the interval time for obtaining sqoop execution status | Not required, the default value is 5s                        |



## 2.Sqoop Engine configuration and deployment

### 2.1 Sqoop Version selection and compilation 

Mainstream Sqoop versions 1.4.6 and 1.4.7 supported by Linkis 1.1.2 and above, and later versions may need to modify some code and recompile

### 2.2 Sqoop engineConn deploy and load
Note: Before compiling the sqoop engine, the linkis project needs to be fully compiled

```
Compile sqoop separately:
${linkis_code_dir}linkis-engineconn-plugins/sqoop/
mvn clean install
```
The installation method is to compile the compiled engine package, located in 
```bash
${linkis_code_dir}linkis-engineconn-plugins/sqoop/target/sqoop-engineconn.zip
```
and then deploy to 
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
and restart linkis-engineplugin 
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
More engineplugin details can be found in the following article [EngineConnPlugin Installation](../deployment/install-engineconn)   


## 3.Sqoop Engine Usage 


### 3.1 OnceEngineConn

OnceEngineConn is used by calling LinkisManager's createEngineConn interface through LinkisManagerClient, and sending the code to the created Sqoop engine, and then the Sqoop engine starts to execute. This method can be called by other systems, such as Exchange. The use of Client is also very simple, first create a new maven project, or introduce the following dependencies into your project
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
**Test Case：**

```scala

package com.webank.wedatasphere.exchangis.job.server.log.client

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
        println(s"Metric Monitor: ${operator.apply()}")
        println(s"Progress: ${progressOperator.apply()}")
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

**Parameter Comparison table (with native parameters):****

```
sqoop.env.mapreduce.job.queuename<=>-Dmapreduce.job.queuename
sqoop.args.connection.manager<===>--connection-manager
sqoop.args.connection.param.file<===>--connection-param-file
sqoop.args.driver<===>--driver
sqoop.args.hadoop.home<===>--hadoop-home
sqoop.args.hadoop.mapred.home<===>--hadoop-mapred-home
sqoop.args.help<===>help
sqoop.args.password<===>--password
sqoop.args.password.alias<===>--password-alias
sqoop.args.password.file<===>--password-file
sqoop.args.relaxed.isolation<===>--relaxed-isolation
sqoop.args.skip.dist.cache<===>--skip-dist-cache
sqoop.args.username<===>--username
sqoop.args.verbose<===>--verbose
sqoop.args.append<===>--append
sqoop.args.as.avrodatafile<===>--as-avrodatafile
sqoop.args.as.parquetfile<===>--as-parquetfile
sqoop.args.as.sequencefile<===>--as-sequencefile
sqoop.args.as.textfile<===>--as-textfile
sqoop.args.autoreset.to.one.mapper<===>--autoreset-to-one-mapper
sqoop.args.boundary.query<===>--boundary-query
sqoop.args.case.insensitive<===>--case-insensitive
sqoop.args.columns<===>--columns
sqoop.args.compression.codec<===>--compression-codec
sqoop.args.delete.target.dir<===>--delete-target-dir
sqoop.args.direct<===>--direct
sqoop.args.direct.split.size<===>--direct-split-size
sqoop.args.query<===>--query
sqoop.args.fetch.size<===>--fetch-size
sqoop.args.inline.lob.limit<===>--inline-lob-limit
sqoop.args.num.mappers<===>--num-mappers
sqoop.args.mapreduce.job.name<===>--mapreduce-job-name
sqoop.args.merge.key<===>--merge-key
sqoop.args.split.by<===>--split-by
sqoop.args.table<===>--table
sqoop.args.target.dir<===>--target-dir
sqoop.args.validate<===>--validate
sqoop.args.validation.failurehandler<===>--validation-failurehandler
sqoop.args.validation.threshold<===> --validation-threshold
sqoop.args.validator<===>--validator
sqoop.args.warehouse.dir<===>--warehouse-dir
sqoop.args.where<===>--where
sqoop.args.compress<===>--compress
sqoop.args.check.column<===>--check-column
sqoop.args.incremental<===>--incremental
sqoop.args.last.value<===>--last-value
sqoop.args.enclosed.by<===>--enclosed-by
sqoop.args.escaped.by<===>--escaped-by
sqoop.args.fields.terminated.by<===>--fields-terminated-by
sqoop.args.lines.terminated.by<===>--lines-terminated-by
sqoop.args.mysql.delimiters<===>--mysql-delimiters
sqoop.args.optionally.enclosed.by<===>--optionally-enclosed-by
sqoop.args.input.enclosed.by<===>--input-enclosed-by
sqoop.args.input.escaped.by<===>--input-escaped-by
sqoop.args.input.fields.terminated.by<===>--input-fields-terminated-by
sqoop.args.input.lines.terminated.by<===>--input-lines-terminated-by
sqoop.args.input.optionally.enclosed.by<===>--input-optionally-enclosed-by
sqoop.args.create.hive.table<===>--create-hive-table
sqoop.args.hive.delims.replacement<===>--hive-delims-replacement
sqoop.args.hive.database<===>--hive-database
sqoop.args.hive.drop.import.delims<===>--hive-drop-import-delims
sqoop.args.hive.home<===>--hive-home
sqoop.args.hive.import<===>--hive-import
sqoop.args.hive.overwrite<===>--hive-overwrite
sqoop.args.hive.partition.value<===>--hive-partition-value
sqoop.args.hive.table<===>--hive-table
sqoop.args.column.family<===>--column-family
sqoop.args.hbase.bulkload<===>--hbase-bulkload
sqoop.args.hbase.create.table<===>--hbase-create-table
sqoop.args.hbase.row.key<===>--hbase-row-key
sqoop.args.hbase.table<===>--hbase-table
sqoop.args.hcatalog.database<===>--hcatalog-database
sqoop.args.hcatalog.home<===>--hcatalog-home
sqoop.args.hcatalog.partition.keys<===>--hcatalog-partition-keys
sqoop.args.hcatalog.partition.values<===>--hcatalog-partition-values
sqoop.args.hcatalog.table<===>--hcatalog-table
sqoop.args.hive.partition.key<===>--hive-partition-key
sqoop.args.map.column.hive<===>--map-column-hive
sqoop.args.create.hcatalog.table<===>--create-hcatalog-table
sqoop.args.hcatalog.storage.stanza<===>--hcatalog-storage-stanza
sqoop.args.accumulo.batch.size<===>--accumulo-batch-size
sqoop.args.accumulo.column.family<===>--accumulo-column-family
sqoop.args.accumulo.create.table<===>--accumulo-create-table
sqoop.args.accumulo.instance<===>--accumulo-instance
sqoop.args.accumulo.max.latency<===>--accumulo-max-latency
sqoop.args.accumulo.password<===>--accumulo-password
sqoop.args.accumulo.row.key<===>--accumulo-row-key
sqoop.args.accumulo.table<===>--accumulo-table
sqoop.args.accumulo.user<===>--accumulo-user
sqoop.args.accumulo.visibility<===>--accumulo-visibility
sqoop.args.accumulo.zookeepers<===>--accumulo-zookeepers
sqoop.args.bindir<===>--bindir
sqoop.args.class.name<===>--class-name
sqoop.args.input.null.non.string<===>--input-null-non-string
sqoop.args.input.null.string<===>--input-null-string
sqoop.args.jar.file<===>--jar-file
sqoop.args.map.column.java<===>--map-column-java
sqoop.args.null.non.string<===>--null-non-string
sqoop.args.null.string<===>--null-string
sqoop.args.outdir<===>--outdir
sqoop.args.package.name<===>--package-name
sqoop.args.conf<===>-conf
sqoop.args.D<===>-D
sqoop.args.fs<===>-fs
sqoop.args.jt<===>-jt
sqoop.args.files<===>-files
sqoop.args.libjars<===>-libjars
sqoop.args.archives<===>-archives
sqoop.args.update.key<===>--update-key
sqoop.args.update.mode<===>--update-mode
sqoop.args.export.dir<===>--export-dir
```
