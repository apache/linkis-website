---
title: hive engine support concurrent
sidebar_position: 0.2
---

## 1. Requirement Background
hiveEngineConn supports concurrency, reducing the resource consumption of starting hive engine.

## 2. Instructions for use
First, modify linkis-engineconn.properties file in linkis-engineconn-plugins/hive/src/main/resources directory,
and set linkis.hive.engineconn.concurrent.support to true.
```
# support parallelism execution
linkis.hive.engineconn.concurrent.support=true
```

Second, submit a hive task ,when first task finished ,submit another task. Your could see hive engine has been reused.  


## 3. Precautions
1, Submit second hive task when first task has been finished.
