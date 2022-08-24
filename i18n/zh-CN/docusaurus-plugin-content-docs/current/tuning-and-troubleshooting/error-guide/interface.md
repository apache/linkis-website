---
title: 接口错误排查
sidebar_position: 3
---

针对接口错误，如何快速定位接口，快速查询日志，进行介绍

##  如何定位

###  1. 前端F12 接口报错
**错误信息排查**
![](/Images/tuning-and-troubleshooting/error-guide/errorMsg.png)
发现错误信息，按F12--network--过滤请求信息Fetch/XHR--对单次请求进行检查--priview--定位报错请求

**查找url**
![](/Images/tuning-and-troubleshooting/error-guide/findUrl.png)
点击单次请求的Headers，就会看到general 这里将会看到请求地址：
>Request URL ：XXXXX /api/rest_j/v1/data-source-manager/op/connect/json

###  2. 找到应用名
某个接口请求报错，URL规范进行定位应用名。
Linkis接口URL遵循设计规范：
>/api/rest_j/v1/{applicationName}/.

applicationName是应用名，通过应用名查找归属的微服务，去对应的微服务下查看log日志。

####  应用名和微服务的对应关系

|ApplicationName（应用名）|Microservice（微服务）|
|:----:|:----:|
|linkismanager|cg-linkismanager|
|engineplugin|cg-engineplugin|
|cg-engineconnmanager|cg-engineconnmanager|
|entrance|cg-entrance|
|bml|ps-bml|
|contextservice|ps-cs|
|datasource|ps-datasource|
|configuration||
|microservice||
|jobhistory|ps-publicservice|
|variable||
|udf||


###  3. 找到日志路径
用户服务地址存在不一样的情况，我们需先定位日志地址
> ps -ef | grep  ps-datasource

![](/Images/tuning-and-troubleshooting/error-guide/logs.png)

- cg-linkismanager：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-linkismanager-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-linkismanager.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-linkismanager.out`

- cg-engineplugin：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineplugin-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineplugin.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineplugin.out`

- cg-engineconnmanager：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineconnmanager-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineconnmanager.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineconnmanager.out`

- cg-entrance：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-entrance-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-entrance.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-cg-entrance.out`

- ps-bml：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-bml-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-bml.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-bml.out`

- ps-cs：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-cs-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-cs.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-cs.out`

- ps-datasource：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-datasource-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-datasource.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-datasource.out`

- ps-publicservice：
>GC日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-publicservice-gc.log`
>
>服务日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-publicservice.log`
>
>服务的System.out日志：` /${LINKIS_HOME}/logs/linkis/linkis-ps-publicservice.out`

###  4. 查看日志
展示接口对应的报错信息

找到请求日志，日志中会展示出服务调用的其他服务，或者展示自己服务中处理的逻辑日志
>tail -fn200 linkis-ps-data-source-manager.log

![](/Images/tuning-and-troubleshooting/error-guide/datasourcemanager.png)

**上图展示的是服务调用其他服务的日志，可根据此信息查询另外服务的日志**

**下图展示的是真正报错的服务日志**

>tail -fn200 linkis-ps-metadataquery.log

![](/Images/tuning-and-troubleshooting/error-guide/errorMsgFromMeta.png)

前端报错展示

![](/Images/tuning-and-troubleshooting/error-guide/errorMsg.png)


### 5. 异常定位
`ECMResourceClear failed, ecm current resource:bdpuje
s110003:9102{"instance":0,"memory":"0.0 B","cpu":0} org.apache.linkis.manager.exception.PersistenceErrorException: errCode: 210001 ,desc: label not found, this label may be removed a
lready. , ip: bdpujes110003 ,port: 9101 ,serviceKind: linkis-cg-linkismanager`

其中IP和端口是对应的服务地址，serviceKind是对应的服务名称，如果是RPC调用的日志失败，可以通过这个信息找到对应的服务
