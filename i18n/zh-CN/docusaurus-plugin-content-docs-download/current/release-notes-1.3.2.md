---
title: Release Notes 1.3.2
sidebar_position: 0.15
---


Apache Linkis 1.3.2 包括所有 [Project Linkis-1.3.2](https://github.com/apache/linkis/projects/24).

Linkis 1.3.2 版本，主要对 Spark 引擎进行了增强，添加了通过 json 进行 ETL 的功能和Spark 提交 jar 包的功能，除此之外还对 UDF 加载做了优化。

主要功能如下：

- 新增 Spark 通过 json 进行 ETL 的功能，支持通过 Linkis 中配置的 JDBC 数据源读写数据（包括 MySQL、PostgreSQL、SqlServer、Oracle、DB2、TiDB、ClickHouse、Doris）
- 新增 Spark 提交 Jar 包的功能
- 允许通过指定后台配置的 UDF ID 加载对应的 UDF

## 新特性

- [EC-Spark] [Linkis-3715](https://github.com/apache/linkis/pull/3715)、[Linkis-4048](https://github.com/apache/linkis/pull/4048)  通过 json 配置进行 ETL，添加 Linkis 中配置的 JDBC 数据源进行读取写入
- [EC-Spark] [Linkis-3966](https://github.com/apache/linkis/pull/3966) Spark 提交 Jar 包

## 增强点

- [UDF] [Linkis-3756](https://github.com/apache/linkis/pull/3756) 通过指定的 UDF ID 加载对应的 UDF

## 修复功能

## 安全相关

## 依赖变更

## 致谢
