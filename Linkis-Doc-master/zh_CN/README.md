Linkis
============

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](../README.md) | 中文

# 引言：

&nbsp; &nbsp; &nbsp; &nbsp;Linkis 在上层应用和底层引擎之间构建了一层计算中间件，上层应用只需对接 Linkis 提供的 REST/WS/JDBC 等标准接口，就能连接到 MySQL/Spark/Hive/Presto/Flink 等各种底层计算存储引擎，并实现上层应用间的互通。

&nbsp; &nbsp; &nbsp; &nbsp;作为计算中间件，提供强大的连通，复用，扩展和管控能力。并通过解耦应用层和引擎层，简化复杂的网状调用关系，降低整体复杂度和开发、运维成本。

&nbsp; &nbsp; &nbsp; &nbsp;自2019年开源以来，累计试用企业近 **700** 家，沙箱试用用户 **1000+**，涉及 互联网、金融、通信等多个行业，被很多企业用作大数据平台底层计算存储引擎组件的统一入口。

&nbsp; &nbsp; &nbsp; &nbsp;没有 Linkis 之前如下：

![原大数据生态图](Images/Architecture/linkis-intro-01.jpg)

&nbsp; &nbsp; &nbsp; &nbsp;有了 Linkis 之后如下：

![Linkis效果图](Images/Architecture/linkis-intro-02.jpg)
<br>
<br>

&nbsp; &nbsp; &nbsp; &nbsp;基于Linkis计算中间件的架构设计理念，我们在上层构建了很多的应用系统。目前已开源的有：

- [**DataSphere Studio - 数据应用开发管理门户**](https://github.com/WeBankFinTech/DataSphereStudio)

- [**Qualitis - 数据质量工具**](https://github.com/WeBankFinTech/Qualitis)

- [**Scriptis - 数据研发IDE工具**](https://github.com/WeBankFinTech/Scriptis)

- [**Visualis - 数据可视化工具**](https://github.com/WeBankFinTech/Visualis)

- [**Schedulis - 工作流调度工具**](https://github.com/WeBankFinTech/Schedulis)

&nbsp; &nbsp; &nbsp; &nbsp;更多工具准备开源中，敬请期待！

----

# 已集成引擎列表

| Engine     | Description                                                          | Contributor                                                           | Version    | 是否已发版? | 使用文档 |
| --------------- | -------------------------------------------------------------------- | ------------------ | ------------- | ------------ |  ---------------------- |
| **Flink**  | Flink引擎。支持提交 FlinkSQL 代码，也支持以 Flink Jar 的方式提交给 Linkis Manager 启动 Yarn 应用。 | [hui zhu](https://github.com/liangqilang) & WeDataSphere | Linkis-1.1.0 | 否，预计2021年中 | 待完善 |
| **Impala**     | Impala引擎。支持提交Impala SQL脚本。 | [hui zhu](https://github.com/liangqilang) | Linkis-0.12.0 | 否，预计4月 | 待完善 |
| **Presto**  | Presto引擎。支持提交PrestoSQL脚本。 | [wForget](https://github.com/wForget)  | Linkis-0.11.0 | 已开源 | [Presto 引擎使用文档](Engine_Usage_Documentations/Presto_User_Manual.md) |
| **ElasticSearch** | ElasticSearch引擎。支持提交 SQL 和 DSL语法。  | [wForget](https://github.com/wForget)  | Linkis-0.11.0 | 已开源 | [ElasticSearch 引擎使用文档](Engine_Usage_Documentations/ElasticSearch_User_Manual.md) |
| **Shell**  | Shell引擎。支持提交Shell脚本 | WeDataSphere | Linkis-0.9.3 | 已开源 | [Shell 引擎使用文档](Engine_Usage_Documentations/Shell_User_Manual.md) |
| **MLSQL**   | MLSQL引擎。支持提交MLSQL脚本。 | [WilliamZhu](https://github.com/allwefantasy) | Linkis-0.9.1 | 已开源 | [MLSQL 引擎使用文档](Engine_Usage_Documentations/MLSQL_User_Manual.md) |
| **JDBC**   | JDBC引擎。支持提交 MySQL、HiveSQL等脚本。 | WeDataSphere | Linkis-0.9.0 | 已开源 | [JDBC 引擎使用文档](Engine_Usage_Documentations/JDBC_User_Manual.md) |
| **Spark**   | Spark引擎。支持提交 SQL、Scala、Pyspark、R等脚本。 | WeDataSphere | Linkis-0.5.0 | 已开源 | [Spark 引擎使用文档](Engine_Usage_Documentations/Spark_User_Manual.md) |
| **Hive**   | Hive引擎。支持提交HiveQL脚本。 | WeDataSphere | Linkis-0.5.0 | 已开源 | [Hive 引擎使用文档](Engine_Usage_Documentations/Hive_User_Manual.md) |
| **Python**   | Python引擎。支持提交Python脚本。 | WeDataSphere | Linkis-0.5.0 | 已开源 | [Python 引擎使用文档](Engine_Usage_Documentations/Python_User_Manual.md) |
| **TiSpark**   | TiSpark引擎。支持以SparkSQL的方式查询TiDB数据 | WeDataSphere | Linkis-0.5.0 | 已开源 | 待完善 |

 ----

# 谁在使用 Linkis


 ----

# 文档说明

&nbsp; &nbsp; &nbsp; &nbsp;Linkis 统一使用 GitBook 进行管理，整个项目会整理成一个 GitBook 电子书，方便大家下载和使用。

&nbsp; &nbsp; &nbsp; &nbsp;WeDataSphere后续会提供统一的文档阅读入口，关于 GitBook 的使用方式，请参考：[GitBook文档](http://caibaojian.com/gitbook/)。

 ----

# 文档贡献

&nbsp; &nbsp; &nbsp; &nbsp;贡献文档和代码前，请先阅读 [Linkis贡献规范](Development%20Documents/Contributing.md)，了解如何贡献，并提交您的贡献。

 ----

# 社区交流

![交流](https://github.com/WeBankFinTech/Linkis/blob/dev-1.0.0/docs/zh_CN/images/introduction/introduction05.png)

 ----

# License

&nbsp; &nbsp; &nbsp; &nbsp;Linkis is under the Apache 2.0 license. See the [License](https://github.com/WeBankFinTech/Linkis/LICENSE) file for details.