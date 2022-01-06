---
title: 0.9.0 升级 0.9.1
sidebar_position: 0
---
> 本文简单介绍Linkis从0.9.0升级到0.9.1的注意事项，Linkis新增了许多功能并修复了多个Issue，如果之前做过版本适配，您不需要按照新的安装包进行安装，可以通过该指南进行升级

## 1 下载对应的升级包
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在release页面下载 wedataSphere-linkis-from-0.9.0-udpdate-0.9.1.zip

## 2 升级步骤 
### 2.1 不需要更新的模块
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
eureka模块不需要更新

### 2.2 只需要更新的模块
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;只需要升级Linkis相关到包到0.9.1即可的模块：
1. linkis-gateway
2. linkis-resourceManager
3. linkis-ujes-hive-enginemanager
4. linkis-ujes-hive-entrance
5. linkis-ujes-jdbc-entrance
6. linkis-ujes-python-entrance
7. linkis-ujes-spark-entrance

升级步骤：

1.删掉0.9.0的包  

2.解压对应的服务的目录拷贝包到对应的lib目录

linkis-gateway需要修改linkis.properties的配置：
```
#新加参数
wds.linkis.gateway.conf.enable.token.auth=true
#修改如下参数
wds.linkis.gateway.conf.url.pass.auth=/dws/
```
linkis-gateway需要新拷贝代理配置token.properties到conf目录:

### 2.3 增加物料库相关包
>需要增加物料库相关包的模块

1.linkis-publicservice增加了bml支持加入了bml client
```
linkis-bmlclient-0.9.1.jar
linkis-bmlcommon-0.9.1.jar
linkis-gateway-httpclient-support-0.9.1.jar
linkis-httpclient-0.9.1.jar
```
另外还增加了netty的包：
```
netty-3.6.2.Final.jar
```
另外需要在linkis.properties 配置gateway的地址：
```
wds.linkis.gateway.ip=127.0.0.1
wds.linkis.gateway.port=9001
```
2.linkis-ujes-python-enginemanager和linkis-ujes-spark-enginemanager增加了bml支持加入了bml client
```
linkis-bmlclient-0.9.1.jar
linkis-bmlcommon-0.9.1.jar
linkis-bml-hook-0.9.1.jar
linkis-gateway-httpclient-support-0.9.1.jar
linkis-httpclient-0.9.1.jar
```
升级步骤：

1.删掉0.9.0的包

2.解压对应的服务的目录拷贝包到对应的lib目录

### 2.4 需要更新配置和包的服务
>需要更新配置和包的服务：linkis-metadata

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解压linkis-metadata的安装包后，需要修改conf里面的配置：
1. application.yml 修改eureka的地址
2. linkis.properties 配置Linkis的数据库和Hive元数据库地址的配置：
```
//Linkis的数据库连接信息
wds.linkis.server.mybatis.datasource.url=jdbc:mysql://
wds.linkis.server.mybatis.datasource.username=
wds.linkis.server.mybatis.datasource.password=
//Hive元数据库地址 不是hiveServer2
hive.meta.url=
hive.meta.user=
hive.meta.password=
```

### 2.5 新加入的服务
 > 新加入的服务：linkis-bml

下载linkis-bml的安装包解压后，在conf里面修改配置：
1. application.yml 修改eureka的地址
2. linkis.properties 配置Mybatis相关的配置：
```
wds.linkis.server.mybatis.datasource.url=jdbc:mysql://
wds.linkis.server.mybatis.datasource.username=
wds.linkis.server.mybatis.datasource.password=
```
3. 在导入bml的sql数据到mysql
```
cd db/;
source linkis-bml.sql
```