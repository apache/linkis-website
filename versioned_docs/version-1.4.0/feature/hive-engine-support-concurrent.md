---
title: hive engine supports concurrency and multiplexing
sidebar_position: 0.3
---

## 1. Requirement background
hiveEngineConn supports concurrency, reduces the resource consumption of starting the hive engine, and improves the engine reuse rate.

## 2. Instructions for use
First, modify the linkis-engineconn.properties file in the linkis-engineconn-plugins/hive/src/main/resources directory,
And set linkis.hive.engineconn.concurrent.support to true.
```
# Support parallel execution
wds.linkis.engineconn.support.parallelism=true

# Concurrency limit, the default is 10
linkis.hive.engineconn.concurrent.limit=10
```

Submit a hive job, and when the first job is complete, submit another job. You can see that the hive engine has been reused.

Restart the cg-linkismanager service after configuration modification, or make the configuration take effect through [Engine Refresh API](../api/http/linkis-cg-engineplugin-api/engineconn-plugin-refresh.md).
## 3. Precautions
1. Wait for the first hive task to execute successfully before submitting the second hive task. Submitting multiple tasks at the same time for the first time may cause multiple ECs to be started due to no available ECs.