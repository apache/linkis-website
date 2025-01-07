---
title: Eureka 上报版本元数据
sidebar_position: 0.2
--- 

## 1. 需求背景
eureka metadata添加版本等额外信息。 支持读取配置文件，跟配置文件版本号统一，配置文件用小版本号。 考虑在eureka metadata中添加两个版本信息，一个是配置文件版本，一个是程序软件版本。不同服务的配置文件版本可能不一样，同一个集群中相同服务的配置文件版本应该一致，同一个集群中所有程序的软件版本应该一致。

## 2. 使用说明
**程序版本配置**

将程序版本配置添加到linkis_env.sh中，用于控制程序版本，添加内容如下:
```
linkis.app.version=${version}
```
上报eureka metadata后版本格式 版本+编译时间如:1.3.2-20230304
```xml
<metadata>
    <linkis.app.version>${appVersion}</linkis.app.version>
</metadata>
```

**服务版本配置**

在每个服务的配置文件中增加服务版本配置，添加内容如下：
```
linkis.conf.version=版本号
```
上报eureka metadata后版本格式
```xml
<metadata>
    <linkis.conf.version>${serviceVersion}</linkis.conf.version>
</metadata>
```
