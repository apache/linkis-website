---
title:  Overview
sidebar_position: 1
---

## 1 Overview
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis, as a powerful computing middleware, can easily interface with different computing engines. By shielding the usage details of different computing engines, it provides a The unified use interface greatly reduces the operation and maintenance cost of deploying and applying Linkis's big data platform. At present, Linkis has docked several mainstream computing engines, which basically cover the data requirements in production, in order to provide more With good scalability, Linkis also provides related interfaces for accessing new engines, which can be used to access new computing engines.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The engine is a component that provides users with data processing and analysis capabilities. Currently, it has been connected to Linkis's engine, including mainstream big data computing engines Spark, Hive, Presto, etc. , There are also engines with the ability to process data in scripts such as python and Shell. DataSphereStudio is a one-stop data operation platform docked with Linkis. Users can conveniently use the engine supported by Linkis in DataSphereStudio to complete interactive data analysis tasks and workflow tasks.

| Engine | Whether to support Scriptis | Whether to support workflow |
| ---- | ---- | ---- |
| Spark | Support | Support |
| Hive | Support | Support |
| Presto | Support | Support |
| ElasticSearch | Support | Support |
| Python | support | support |
| Shell | Support | Support |
| JDBC | Support | Support |
| MySQL | Support | Support |
| Flink | Support | Support |

## 2. Document structure
You can refer to the following documents for the related documents of the engines that have been accessed.
- [Spark Engine Usage](spark.md)
- [Hive Engine Usage](hive.md)
- [Python Engine Usage](python.md)
- [Shell Engine Usage](shell.md)
- [JDBC Engine Usage](jdbc.md)
- [Flink Engine Usage](flink.md)