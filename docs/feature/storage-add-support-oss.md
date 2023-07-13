---
title: Extend linkis-storage add support OSS filesystem
sidebar_position: 0.2
---

## 1. Requirement Background
Extend linkis-storage add support OSS filesystem

## 2. Instructions for use
To store log and resultSet in OSS, add the following configs in conf/linkis-cg-entrance.properties.
```
#eg:
wds.linkis.entrance.config.log.path=oss://linkis/tmp/
wds.linkis.resultSet.store.path=oss://linkis/tmp/
wds.linkis.filesystem.hdfs.root.path=oss://taihao-linkis/tmp/
wds.linkis.fs.oss.endpoint=https://oss-cn-hangzhou.aliyuncs.com
wds.linkis.fs.oss.bucket.name=linkis
wds.linkis.fs.oss.accessKeyId=your accessKeyId
wds.linkis.fs.oss.accessKeySecret=your accessKeySecret
```

Add the following configs in engine engineconn plugins conf. Let me use hive conf for example: 
modify linkis-engineconn-plugins/hive/src/main/resources/linkis-engineconn.properties and 
add the following configs.
```
#eg:
wds.linkis.fs.oss.endpoint=https://oss-cn-hangzhou.aliyuncs.com
wds.linkis.fs.oss.bucket.name=linkis
wds.linkis.fs.oss.accessKeyId=your accessKeyId
wds.linkis.fs.oss.accessKeySecret=your accessKeySecret
```


## 3. Precautions
1, you have an OSS bucket.
2, you have accessKeyId, accessKeySecret to access the above OSS bucket.