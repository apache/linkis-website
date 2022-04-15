---
title: 如何下载安装包中默认没有的引擎插件
authors: [Casion]
tags: [engine,guide]
---
> _本文主要指引大家如何下载每个版本对应的非默认引擎安装插件包。_

考虑到发布包的大小和大家使用插件的情况，linkis发布的二进制安装包中只包含了部分常用引擎/hive/spark/python/shell，
非常用引擎，项目代码中有flink/io_file/pipeline/sqoop(不同版本之间可能有区别)，
为了方便大家使用，基于linkis每个版本的release分支代码: https://github.com/apache/incubator-linkis, 编译出这部分引擎，供大家选择使用。

## 1.0.3版本

| **引擎** | **对应的组件版本** | 官方安装包中是否默认有| **说明** |
|:---- |:---- |:---- |:---- |:---- |
|Spark|2.4.3|是|Spark EngineConn. 支持SQL, Scala, Pyspark 和R 代码.|
|Hive|2.3.3|是1|Hive EngineConn. 支持HiveQL 代码.|
|Shell||是|Shell EngineConn. 支持Bash shell 代码.|
|Python||是|Python EngineConn. 支持python 代码.|
|JDBC| |否|JDBC EngineConn. 已支持MySQL 和HiveQL，可快速扩展支持其他有JDBC Driver 包的引擎, 如Oracle.|
|Flink |1.12.2|否|	Flink EngineConn。支持FlinkSQL 代码，也支持以Flink Jar 形式启动一个新的Yarn 应用程序。|

非默认引擎下载链接
https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.0.3-engineconn-plugin.tar 


## 1.1.0 版本

| **引擎** | **对应的组件版本** | 官方安装包中是否默认有| **说明** |
|:---- |:---- |:---- |:---- |:---- |
|Spark|2.4.3|是|Spark EngineConn. 支持SQL, Scala, Pyspark 和R 代码.|
|Hive|2.3.3|是1|Hive EngineConn. 支持HiveQL 代码.|
|Shell||是|Shell EngineConn. 支持Bash shell 代码.|
|Python||是|Python EngineConn. 支持python 代码.|
|JDBC| |否|JDBC EngineConn. 已支持MySQL 和HiveQL，可快速扩展支持其他有JDBC Driver 包的引擎, 如Oracle.|
|Flink |1.12.2|否|	Flink EngineConn。支持FlinkSQL 代码，也支持以Flink Jar 形式启动一个新的Yarn 应用程序。|

非默认引擎下载链接
https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.0.1-engineconn-plugin.tar

## 安装引擎指引 

下载引擎的物料包后，解压包
```html
tar -xvf  1.0.3-engineconn-plugin.tar 
cd 1.0.3-engineconn-plugin 

```

将需要要使用的引擎物料包拷贝至linkis的引擎插件目录，然后刷新引擎物料即可


详细流程参考[安装 EngineConnPlugin 引擎](https://linkis.apache.org/zh-CN/docs/latest/deployment/engine_conn_plugin_installation)

