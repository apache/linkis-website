---
title: 升级基础引擎版本到较新版本
sidebar_position: 0.2
---

## 1. 需求背景
目前我们已经支持不同版本的hadoop,hive,spark进行编译，并且低版本的引擎可能有潜在的风险点，我们可以升级默认的基础引擎版本到较新版本

## 2. 使用说明
默认hadoop版本从2.7.2升级到3.3.4,默认hive版本从2.3.3升级到3.1.3,默认spark版本从2.4.3升级到3.2.1

## 3. 注意事项
默认版本编译时，基础版本为：spark3.2.1+hadoop3.3.4+hive3.1.3
```
mvn install package
```
由于默认基础引擎的默认版本升级，`spark-3.2`、`hadoop-3.3`和`spark-2.4-hadoop-3.3` profile被移除，新增profile `hadoop-2.7` and `spark-2.4`.