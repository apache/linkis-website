---
title: hive engine支持并发，支持复用
sidebar_position: 0.2
---

## 1. 需求背景
hiveEngineConn支持并发，减少启动hive引擎的资源消耗。

## 2. 使用说明
首先，在linkis-engineconn-plugins/hive/src/main/resources目录下修改linkis-engineconn.properties文件，
并将linkis.hive.engineconn.concurrent.support设置为true。
```
# 支持并行执行
linkis.hive.engineconn.concurrent.support=true
```

第二，提交一个hive任务，当第一个任务完成后，再提交另一个任务。您可以看到hive引擎已被重用。

## 3. 注意事项
1、等第一个hive任务执行成功后，再提交第二个hive任务。