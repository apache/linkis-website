---
title: 总览
sidebar_position: 0
---
## 1. 概述
`Linkis` 作为一款功能强大的计算中间件，可以方便的对接不同的计算引擎，通过屏蔽不同计算引擎的使用细节，并向上提供了一套统一的使用接口，
使得部署和应用 `Linkis` 的大数据平台的运维成本大大降低，目前， `Linkis` 已经对接了几款主流的计算引擎，基本上涵盖了上生产上对数据的需求，
为了提供更好的可拓展性， `Linkis` 同时提供了接入新引擎的相关接口，可以利用该接口接入新的计算引擎。 
 
引擎是提供给用户数据处理和分析能力的组件，目前已经接入 `Linkis` 的引擎，有主流的大数据计算引擎 `Spark` 、 `Hive` 、 `Presto` 等，也有 `python` 、 `Shell` 这些脚本处理数据能力的引擎。
`DataSphereStudio` 作为对接了 `Linkis` 的一站式数据操作平台，用户可以方便的在 `DataSphereStudio` 中使用 `Linkis` 支持的引擎完成交互式数据分析任务和工作流任务。

支持引擎及版本信息如下：

| 引擎          | 默认引擎 | 默认版本 |
|-------------| -- | ----   |
| [Spark](./spark.md)       | 是 | 2.4.3 |
| [Hive](./hive.md)        | 是 | 2.3.3 |
| [Python](./python.md)      | 是 | python2 |
| [Shell](./shell.md)       | 是 | 1 |
| [JDBC](./jdbc.md)        | 否 | 4 |
| [Flink](./flink.md)       | 否 | 1.12.2 |
| [openLooKeng](./openlookeng.md) | 否 | 1.5.0 |
| [Pipeline](./pipeline.md) | 否 | 1 |
| [Presto](./presto.md) | 否 | 0.234 |
| [Sqoop](./sqoop.md) | 否 | 1.4.6 |
| [Elasticsearch](./elasticsearch.md) | 否 | 7.6.2 |
