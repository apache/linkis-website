---
title: How to Download Engine Plugins Not Included in the Installation Package By Default
authors: [Casion]
tags: [engine,guide]
---
> _This article mainly guides you how to download the non-default engine installation plug-in package corresponding to each version. _

Considering the size of the release package and the use of plug-ins, the binary installation package released by linkis only contains some common engines /hive/spark/python/shell.
Very useful engine, there are corresponding modules `flink/io_file/pipeline/sqoop` in the project code (there may be differences between different versions),
In order to facilitate everyone's use, based on the release branch code of each version of linkis: https://github.com/apache/incubator-linkis, this part of the engine is compiled for everyone to choose and use.

 ## Download link
| **linkis version** | **engines included** |**engine material package download link** |
|:---- |:---- |:---- |
|1.3.0|jdbc<br/>pipeline<br/>io_file<br/>flink<br/>openlookeng<br/>sqoop<br/>presto<br/>elasticsearch<br/>|[1.3.0-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.3.0-engineconn-plugin.tar)|
|1.2.0|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>sqoop<br/>presto<br/>elasticsearch<br/>|[1.2.0-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.2.0-engineconn-plugin.tar)|
|1.1.3|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>sqoop|[1.1.3-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.3-engineconn-plugin.tar)|
|1.1.2|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>sqoop|[1.1.2-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.2-engineconn-plugin.tar)|
|1.1.1|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>|[1.1.1-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.1-engineconn-plugin.tar)|
|1.1.0|jdbc<br/>pipeline<br/>flink<br/>|[1.1.0-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.0-engineconn-plugin.tar)|
|1.0.3|jdbc<br/>pipeline<br/>flink<br/>|[1.0.3-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.0.3-engineconn-plugin.tar)|

## engine type

| **Engine name** | **Support underlying component version<br/>(default dependency version)** | **Linkis 1.X version requirements** | **Whether it is included in the release package by default** | **Description** |
|:---- |:---- |:---- |:---- |:---- |
|Spark|Apache 2.0.0~2.4.7, <br/>CDH >= 5.4.0, <br/>(default Apache Spark 2.4.3)|\>=1.0.3|Yes|Spark EngineConn, supports SQL , Scala, Pyspark and R code|
|Hive|Apache >= 1.0.0, <br/>CDH >= 5.4.0, <br/>(default Apache Hive 2.3.3)|\>=1.0.3|Yes|Hive EngineConn, supports HiveQL code|
|Python|Python >= 2.6, <br/>(default Python2*)|\>=1.0.3|Yes|Python EngineConn, supports python code|
|Shell|Bash >= 2.0|\>=1.0.3|Yes|Shell EngineConn, supports Bash shell code|
|JDBC|MySQL >= 5.0, Hive >=1.2.1, <br/>(default Hive-jdbc 2.3.4)|\>=1.0.3|No |JDBC EngineConn, already supports MySQL and HiveQL, can be extended quickly Support other engines with JDBC Driver package, such as Oracle|
|Flink |Flink >= 1.12.2, <br/>(default Apache Flink 1.12.2)|\>=1.0.2|No |Flink EngineConn, supports FlinkSQL code, also supports starting a new Yarn in the form of Flink Jar Application|
|Pipeline|-|\>=1.0.2|No|Pipeline EngineConn, supports file import and export|
|openLooKeng|openLooKeng >= 1.5.0, <br/>(default openLookEng 1.5.0)|\>=1.1.1|No|openLooKeng EngineConn, supports querying data virtualization engine with Sql openLooKeng|
|Sqoop| Sqoop >= 1.4.6, <br/>(default Apache Sqoop 1.4.6)|\>=1.1.2|No|Sqoop EngineConn, support data migration tool Sqoop engine|
|Presto|Presto >= 0.180|\>=1.2.0|No|Presto EngineConn, supports Presto SQL code|
|ElasticSearch|ElasticSearch >=6.0|\>=1.2.0|No|ElasticSearch EngineConn, supports SQL and DSL code|


## Install engine guide

After downloading the material package of the engine, unzip the package
```html
tar -xvf 1.0.3-engineconn-plugin.tar
cd 1.0.3-engineconn-plugin

````

Copy the engine material package to be used to the engine plug-in directory of linkis, and then refresh the engine material.

For the detailed process, refer to [Installing the EngineConnPlugin Engine](https://linkis.apache.org/zh-CN/docs/latest/deployment/install-engineconn).