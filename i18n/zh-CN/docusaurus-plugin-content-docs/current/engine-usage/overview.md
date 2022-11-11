---
title: 总览
sidebar_position: 0
---
## 1. 概述
Linkis作为一款功能强大的计算中间件，可以方便的对接不同的计算引擎，通过屏蔽不同计算引擎的使用细节，并向上提供了一套统一的使用接口，
使得部署和应用Linkis的大数据平台的运维成本大大降低，目前，Linkis已经对接了几款主流的计算引擎，基本上涵盖了上生产上对数据的需求，
为了提供更好的可拓展性，Linkis同时提供了接入新引擎的相关接口，可以利用该接口接入新的计算引擎。 
 
引擎是提供给用户数据处理和分析能力的组件，目前已经接入Linkis的引擎，有主流的大数据计算引擎Spark、Hive、Presto等，也有python、Shell这些脚本处理数据能力的引擎。
DataSphereStudio作为对接了Linkis的一站式数据操作平台，用户可以方便的在DataSphereStudio中使用Linkis支持的引擎完成交互式数据分析任务和工作流任务。

| 引擎          | 默认引擎 | 默认版本 |
|-------------| -- | ----   |
| Spark       | 是 | 2.4.3 |
| Hive        | 是 | 2.3.3 |
| Python      | 是 | python2 |
| Shell       | 是 | 1 |
| JDBC        | 否 | 4 |
| Flink       | 否 | 1.12.2 |
| OpenLooKeng | 否 | 1.5.0 |
| Pipeline | 否 | 1 |
| Presto | 否 | 0.234 |
| Sqoop | 否 | 1.4.6 |
| Elasticsearch | 否 | 7.6.2 |
