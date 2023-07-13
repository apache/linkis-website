---
title: 扩展linkis-storage以支持OSS文件系统
sidebar_position: 0.2
---

## 1. 需求背景
扩展linkis-storage以支持OSS文件系统。

## 2. 使用说明
为了在OSS中存储日志和resultSet，请在conf/linkis-cg-entrance.properties中添加以下配置。示例：
```
wds.linkis.entrance.config.log.path=oss://linkis/tmp/
wds.linkis.resultSet.store.path=oss://linkis/tmp/
wds.linkis.filesystem.hdfs.root.path=oss://taihao-linkis/tmp/
wds.linkis.fs.oss.endpoint=https://oss-cn-hangzhou.aliyuncs.com
wds.linkis.fs.oss.bucket.name=linkis
wds.linkis.fs.oss.accessKeyId=your accessKeyId
wds.linkis.fs.oss.accessKeySecret=your accessKeySecret
```

在engine engineconn插件conf中添加以下配置。以hive conf为例：修改linkis-engineconn-plugins/hive/src/main/resources/linkis-engineconn.properties，
并添加以下配置。示例：
```
wds.linkis.fs.oss.endpoint=https://oss-cn-hangzhou.aliyuncs.com
wds.linkis.fs.oss.bucket.name=linkis
wds.linkis.fs.oss.accessKeyId=your accessKeyId
wds.linkis.fs.oss.accessKeySecret=your accessKeySecret
```

## 3. 注意事项
1、您需要拥有一个OSS存储桶。
2、您需要accessKeyId和accessKeySecret以访问上述OSS存储桶。