---
title: Upgrade From 0.9.0 To 0.9.1  Guide
sidebar_position: 0
---
> This paper provides a brief description of Linkis's upgrade from 0.9.0 to 0.9.1, Linkis has added many features and fixes multiple issues. If you have previously made a version, you don't need to install it according to the new setup. You can upgrade with this guide

## 1 download the upgrade package
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Download on the release page

wedataSphere-linkis-from-0.9.0-udpdate-0.9.1.zip

## 2 Upgrade Steps
### 2.1 Modules that do not require updating
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; eureka module does not need to be updated

### 2.2 Modules that require updates only
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Simply upgrade Linkis to the 0.9.1 module：
1. linkis-gateway
2. linkis-resourceManager
3. linkis-ujes-hive-enginemanager
4. linkis-ujes-hive-entry
5. linkis-ujes-jdbc-entry
6. linkis-ujes-python-entry
7. linkis-ujes-spark-entry

Upgrade step：

1. Delete package 0.9.0

2.Copy the directory of the service to which the service is extracted into the lib directory

linkis-gateway needs to change the configuration of linkis.properties：
```
#New parameter
wds.linkis.gateway.conf.enable.token.auth=true
#Modify parameter as follow
wds.linkis.gateway.conf.uf.pass.auth=/dws/
```
linkis-gateway requires a new copy agent configuration token.properties to the conf:

### 2.3 Add stock pack
> Modules requiring additional stock library related packages

1.linkis-publicservice added bml support to join bml customers
```
linkis-bmlclient-0.9.1.jar
linkis-bmlcommon-0.9.1.jar
linkis-gateway - httpclient-support-0.9.1.jar
linkis-httpclient-0.9.1.jar
```
added netty package：
```
nety-3.6.2.Final.jar
```
另外需要在linkis.properties 配置gateway的地址：
```
wds.linkis.gateway.ip=127.0.0.1
wds.linkis.gateway.port=9001
```
2.linkis-ujes-python-enginemanager and linkis-ujes-spark-enginemanager added bml support to join bml client
```
linkis-bmlclient-0.9.1.jar
linkis-bmlcommon-0.9.1.jar
linkis-bml-hook-0.9.1.jar
linkis-gateway - httpclient-support-0.9.1.jar
linkis-httpclient-0.9.1.jar
```
Upgrade step：

1. Delete package 0.9.0

2.Copy the directory of the service to which the service is extracted into the lib directory

### 2.4 Services required to update configuration and package
> Service required to update configuration and package：linkis-metadata

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解压linkis-metadata的安装包后，需要修改conf里面的配置：
1. application.yml modify the address of eureka
2. linkis.properties 配置Linkis的数据库和Hive元数据库地址的配置：
```
/Linkis Database Connection Information
wds.linkis.server.mybatis.database.url=jdbc:mysql://
wds.linkis.server.mybatis.database.username=
wds.linkis.server.mybatis.datasource.password=
/Hive Metadatabase address is not hiveServer2
hive.meta.url=
hive.meta.user=
hive.meta.password=

```

### 2.5 Newly added services

 > New service：linkis-bml

下载linkis-bml的安装包解压后，在conf里面修改配置：
1. application.yml modify the address of eureka
2. linkis.properties configure Mybatis associated with configuration：
```
wds.linkis.server.mybatis.database.url=jdbc:mysql:/
wds.linkis.server.mybatis.dataource.username=
wds.linkis.server.mybatis.database.password=
```
3. Import sql data from bml to mysql
```
cd db/;
source linkis-bml.sql
```