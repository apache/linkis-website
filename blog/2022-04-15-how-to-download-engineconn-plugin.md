---
title: How to Download Engine Plugins Not Included in the Installation Package By Default
authors: [Casion]
tags: [engine,guide]
---
> _This article mainly guides you how to download the non-default engine installation plug-in package corresponding to each version. _

Considering the size of the release package and the use of plug-ins, the binary installation package released by linkis only contains some common engines /hive/spark/python/shell.
Very useful engine, there are flink/io_file/pipeline/sqoop in the project code (there may be differences between different versions),
In order to facilitate everyone's use, based on the release branch code of each version of linkis: https://github.com/apache/incubator-linkis, this part of the engine is compiled for everyone to choose and use.

## 1.0.3 version

| **Engine** | **Corresponding component version** | Is there default in the official installation package | **Description** |
|:---- |:---- |:---- |:---- |:---- |
|Spark|2.4.3|Yes|Spark EngineConn. Supports SQL, Scala, Pyspark and R code.|
|Hive|2.3.3|is 1|Hive EngineConn. Supports HiveQL code.|
|Shell||Yes |Shell EngineConn. Supports Bash shell code.|
|Python||Yes |Python EngineConn. Supports python code.|
|JDBC| |No|JDBC EngineConn. Already supports MySQL and HiveQL, and can be quickly extended to support other engines with JDBC Driver packages, such as Oracle.|
|Flink |1.12.2|No | Flink EngineConn. Supports FlinkSQL code, and also supports launching a new Yarn application in the form of Flink Jar. |

Non-default engine download link
https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.0.3-engineconn-plugin.tar


## Version 1.1.0

| **Engine** | **Corresponding component version** | Is there default in the official installation package | **Description** |
|:---- |:---- |:---- |:---- |:---- |
|Spark|2.4.3|Yes|Spark EngineConn. Supports SQL, Scala, Pyspark and R code.|
|Hive|2.3.3|is 1|Hive EngineConn. Supports HiveQL code.|
|Shell||Yes |Shell EngineConn. Supports Bash shell code.|
|Python||Yes |Python EngineConn. Supports python code.|
|JDBC| |No|JDBC EngineConn. Already supports MySQL and HiveQL, and can be quickly extended to support other engines with JDBC Driver packages, such as Oracle.|
|Flink |1.12.2|No | Flink EngineConn. Supports FlinkSQL code, and also supports launching a new Yarn application in the form of Flink Jar. |

Non-default engine download link
https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.0.1-engineconn-plugin.tar

## Install engine guide

After downloading the material package of the engine, unzip the package
```html
tar -xvf 1.0.3-engineconn-plugin.tar
cd 1.0.3-engineconn-plugin

````

Copy the engine material package to be used to the engine plug-in directory of linkis, and then refresh the engine material.


Detailed process reference[Installing EngineConnPlugin engine](https://linkis.apache.org/zh-CN/docs/latest/deployment/engine_conn_plugin_installation)