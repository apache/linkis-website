---
title: Sqoop 引擎
sidebar_position: 9
---

# Sqoop 引擎使用文档

本文主要介绍在Linkis1.X中，Sqoop引擎的配置、部署和使用。

## 1.Sqoop引擎Linkis系统参数配置

Sqoop引擎主要依赖Hadoop基础环境，如果该节点需要部署Sqoop引擎，需要部署Hadoop客户端环境。

强烈建议您在执行Sqoop任务之前，先在该节点使用原生的Sqoop执行测试任务，以检测该节点环境是否正常。

| 环境变量名      | 环境变量内容   | 备注                                   |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME       | JDK安装路径    | 必须                                   |
| HADOOP_HOME     | Hadoop安装路径 | 必须                                   |
| HADOOP_CONF_DIR | Hadoop配置路径 | 必须                                |
| SQOOP_HOME | Sqoop安装路径 | 非必须                             |
| SQOOP_CONF_DIR | Sqoop配置路径 | 非必须                                |
| HCAT_HOME | HCAT配置路径 | 非必须                                |
| HBASE_HOME | HBASE配置路径 | 非必须 |

表1-1 环境配置清单

| Linkis系统参数              | 参数                            | 备注                                                         |
| --------------------------- | ------------------------------- | ------------------------------------------------------------ |
| wds.linkis.hadoop.site.xml  | 设置sqoop加载hadoop参数文件位置 | 必须，参考示例："/etc/hadoop/conf/core-site.xml;/etc/hadoop/conf/hdfs-site.xml;/etc/hadoop/conf/yarn-site.xml;/etc/hadoop/conf/mapred-site.xml" |
| sqoop.fetch.status.interval | 设置获取sqoop执行状态的间隔时间 | 非必须，默认值为5s                                           |



## 2.Sqoop引擎的配置和部署

### 2.1 Sqoop版本的选择和编译

Linkis 1.1.2及以上支持的主流Sqoop版本1.4.6与1.4.7，更高版本可能需要修改部分代码重新编译。

### 2.2 Sqoop engineConn部署和加载
注意: 编译sqoop引擎之前需要进行linkis项目全量编译  

```
单独编译sqoop的方式
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/sqoop/
mvn clean install
```
安装方式是将编译出来的引擎包,位置在
```bash
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/sqoop/target/sqoop-engineconn.zip
```
然后部署到
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
并重启linkis-engineplugin
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
engineplugin更详细的介绍可以参看下面的文章。  
https://linkis.apache.org/zh-CN/docs/1.1.1/deployment/engine_conn_plugin_installation

## 3.Sqoop引擎的使用


### 3.1 OnceEngineConn方式

OnceEngineConn的使用方式是通过LinkisManagerClient调用LinkisManager的createEngineConn的接口，并将代码发给创建的Sqoop引擎，然后Sqoop引擎就开始执行，此方式可以被其他系统进行调用，比如Exchangis。Client的使用方式也很简单，首先新建一个maven项目，或者在您的项目中引入以下的依赖
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
**测试用例：**

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

**参数对照表（与原生参数）：**

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

