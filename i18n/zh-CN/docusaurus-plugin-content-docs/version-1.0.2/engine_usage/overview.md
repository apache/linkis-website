---
title: 总览
sidebar_position: 0
---
## 1. 概述
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis作为一款功能强大的计算中间件，可以方便的对接不同的计算引擎，通过屏蔽不同计算引擎的使用细节，并向上提供了一套统一的使用接口，使得部署和应用Linkis的大数据平台的运维成本大大降低，目前，Linkis已经对接了几款主流的计算引擎，基本上涵盖了上生产上对数据的需求，为了提供更好的可拓展性，Linkis同时提供了接入新引擎的相关接口，可以利用该接口接入新的计算引擎。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;引擎是提供给用户数据处理和分析能力的组件，目前已经接入Linkis的引擎，有主流的大数据计算引擎Spark、Hive、Presto等，也有python、Shell这些脚本处理数据能力的引擎。DataSphereStudio作为对接了Linkis的一站式数据操作平台，用户可以方便的在DataSphereStudio中使用Linkis支持的引擎完成交互式数据分析任务和工作流任务。

|  引擎   | 是否支持Scriptis |   是否支持工作流   |
|  ----  | ----  | ---- |
| Spark  | 支持 |  支持 |
| Hive  | 支持 | 支持 |
| Presto  | 支持 | 支持 |
| ElasticSearch  | 支持 | 支持 |
| python  | 支持 | 支持 |
| Shell  | 支持 | 支持 |
| JDBC  | 支持 | 支持 |
| MySQL  | 支持 | 支持 |

## 2. 文档结构
已经接入的引擎相关文档可以参考如下文档。  
- [Spark 引擎使用](spark.md)  
- [Hive 引擎使用](hive.md)  
- [Python 引擎使用](python.md)  
- [Shell 引擎使用](shell.md)  
- [JDBC 引擎使用](jdbc.md)  