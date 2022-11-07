---
title: 如何下载安装包中默认没有的引擎插件
authors: [Casion]
tags: [engine,guide]
---
> _本文主要指引大家如何下载每个版本对应的非默认引擎安装插件包。_

考虑到发布包的大小和大家使用插件的情况，linkis发布的二进制安装包中只包含了部分常用引擎/hive/spark/python/shell，
非常用引擎，项目代码中有对应的模块`flink/io_file/pipeline/sqoop`(不同版本之间可能有区别)，
为了方便大家使用，基于linkis每个版本的release分支代码: https://github.com/apache/incubator-linkis, 编译出这部分引擎，供大家选择使用。

 ## 下载链接  
| **linkis版本** |  **包含的引擎** |**引擎物料包下载链接** |
|:---- |:---- |:---- |
|1.3.0|jdbc<br/>pipeline<br/>io_file<br/>flink<br/>openlookeng<br/>sqoop<br/>presto<br/>elasticsearch<br/>|[1.3.0-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.3.0-engineconn-plugin.tar)|
|1.2.0|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>sqoop<br/>presto<br/>elasticsearch<br/>|[1.2.0-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.2.0-engineconn-plugin.tar)|
|1.1.3|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>sqoop|[1.1.3-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.3-engineconn-plugin.tar)|
|1.1.2|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>sqoop|[1.1.2-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.2-engineconn-plugin.tar)|
|1.1.1|jdbc<br/>pipeline<br/>flink<br/>openlookeng<br/>|[1.1.1-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.1-engineconn-plugin.tar)|
|1.1.0|jdbc<br/>pipeline<br/>flink<br/>|[1.1.0-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.1.0-engineconn-plugin.tar)|
|1.0.3|jdbc<br/>pipeline<br/>flink<br/>|[1.0.3-engineconn-plugin.tar](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/engineconn-plugin/1.0.3-engineconn-plugin.tar)|

## 引擎类型 

| **引擎名** | **支持底层组件版本<br/>(默认依赖版本)** | **Linkis 1.X 版本要求** | **是否默认包含在发布包中** | **说明** |
|:---- |:---- |:---- |:---- |:---- |
|Spark|Apache 2.0.0~2.4.7, <br/>CDH >= 5.4.0, <br/>（默认Apache Spark 2.4.3）|\>=1.0.3|是|Spark EngineConn， 支持SQL, Scala, Pyspark 和R 代码|
|Hive|Apache >= 1.0.0, <br/>CDH >= 5.4.0, <br/>（默认Apache Hive 2.3.3）|\>=1.0.3|是|Hive EngineConn， 支持HiveQL 代码|
|Python|Python >= 2.6, <br/>（默认Python2*）|\>=1.0.3|是|Python EngineConn， 支持python 代码|
|Shell|Bash >= 2.0|\>=1.0.3|是|Shell EngineConn， 支持Bash shell 代码|
|JDBC|MySQL >= 5.0, Hive >=1.2.1, <br/>(默认Hive-jdbc 2.3.4)|\>=1.0.3|否|JDBC EngineConn， 已支持MySQL 和HiveQL，可快速扩展支持其他有JDBC Driver 包的引擎, 如Oracle|
|Flink |Flink >= 1.12.2, <br/>(默认Apache Flink 1.12.2)|\>=1.0.2|否|Flink EngineConn， 支持FlinkSQL 代码，也支持以Flink Jar 形式启动一个新的Yarn 应用程序|
|Pipeline|-|\>=1.0.2|否|Pipeline EngineConn， 支持文件的导入和导出|
|openLooKeng|openLooKeng >= 1.5.0, <br/>(默认openLookEng 1.5.0)|\>=1.1.1|否|openLooKeng EngineConn， 支持用Sql查询数据虚拟化引擎openLooKeng|
|Sqoop| Sqoop >= 1.4.6, <br/>(默认Apache Sqoop 1.4.6)|\>=1.1.2|否|Sqoop EngineConn， 支持 数据迁移工具 Sqoop 引擎|
|Presto|Presto >= 0.180|\>=1.2.0|否|Presto EngineConn， 支持Presto SQL 代码|
|ElasticSearch|ElasticSearch >=6.0|\>=1.2.0|否|ElasticSearch EngineConn， 支持SQL 和DSL 代码|


## 安装引擎指引 

下载引擎的物料包后，解压包
```html
tar -xvf  1.0.3-engineconn-plugin.tar 
cd 1.0.3-engineconn-plugin 

```

将需要要使用的引擎物料包拷贝至linkis的引擎插件目录，然后刷新引擎物料即可

详细流程参考[安装 EngineConnPlugin 引擎](https://linkis.apache.org/zh-CN/docs/latest/deployment/install-engineconn)。

