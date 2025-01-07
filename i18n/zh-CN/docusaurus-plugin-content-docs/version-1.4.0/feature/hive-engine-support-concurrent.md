---
title: hive engine支持并发，支持复用
sidebar_position: 0.3
---

## 1. 需求背景
hiveEngineConn支持并发，减少启动hive引擎的资源消耗，提高引擎复用率。

## 2. 使用说明
首先，在linkis-engineconn-plugins/hive/src/main/resources目录下修改linkis-engineconn.properties文件，
并将linkis.hive.engineconn.concurrent.support设置为true。
```
# 支持并行执行
wds.linkis.engineconn.support.parallelism=true

# 并发数限制，默认为 10
linkis.hive.engineconn.concurrent.limit=10
```

提交一个hive任务，当第一个任务完成后，再提交另一个任务。您可以看到hive引擎已被重用。

配置修改后重启 cg-linkismanager 服务，或通过 [引擎刷新接口](../api/http/linkis-cg-engineplugin-api/engineconn-plugin-refresh.md) 使配置生效。
## 3. 注意事项
1、等待第一个hive任务执行成功后，再提交第二个hive任务。初次同时提交多个任务可能由于暂无可用的 EC 导致启动多个 EC。