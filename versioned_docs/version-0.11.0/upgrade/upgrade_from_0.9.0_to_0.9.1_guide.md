---
title: Upgrade From 0.9.0 To 0.9.1 Guide
sidebar_position: 0
---
> This article briefly introduces the precautions for upgrading Linkis from 0.9.0 to 0.9.1. Linkis has added many new functions and fixed multiple issues. If you have done version adaptation before, you do not need to install according to the new installation package. Can be upgraded through this guide

## 1 Download the corresponding upgrade package
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;download on the release page wedataSphere-linkis-from-0.9.0-udpdate-0.9.1.zip

## 2 Upgrade steps
### 2.1 Modules that do not need to be updated
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
The eureka module does not need to be updated

### 2.2 Only modules that need to be updated
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You only need to upgrade the Linkis-related modules to 0.9.1:
1. linkis-gateway
2. linkis-resourceManager
3. linkis-ujes-hive-enginemanager
4. linkis-ujes-hive-entrance
5. linkis-ujes-jdbc-entrance
6. linkis-ujes-python-entrance
7. linkis-ujes-spark-entrance

Upgrade steps:

1. Delete the 0.9.0 package

2. Unzip the corresponding service directory and copy the package to the corresponding lib directory

Linkis-gateway needs to modify the configuration of linkis.properties:
```
#Add parameters
wds.linkis.gateway.conf.enable.token.auth=true
#Modify the following parameters
wds.linkis.gateway.conf.url.pass.auth=/dws/
```
Linkis-gateway needs to copy the proxy configuration token.properties to the conf directory:

### 2.3 Add material library related packages
>Need to increase the module of the material library related package

1.linkis-publicservice added bml support and added bml client
```
linkis-bmlclient-0.9.1.jar
linkis-bmlcommon-0.9.1.jar
linkis-gateway-httpclient-support-0.9.1.jar
linkis-httpclient-0.9.1.jar
```
In addition, the netty package has been added:
```
netty-3.6.2.Final.jar
```
In addition, you need to configure the gateway address in linkis.properties:
```
wds.linkis.gateway.ip=127.0.0.1
wds.linkis.gateway.port=9001
```
2. linkis-ujes-python-enginemanager and linkis-ujes-spark-enginemanager added bml support and added bml client
```
linkis-bmlclient-0.9.1.jar
linkis-bmlcommon-0.9.1.jar
linkis-bml-hook-0.9.1.jar
linkis-gateway-httpclient-support-0.9.1.jar
linkis-httpclient-0.9.1.jar
```
Upgrade steps:

1. Delete the 0.9.0 package

2. Unzip the corresponding service directory and copy the package to the corresponding lib directory

### 2.4 Services that need to update configuration and package
>The service that needs to update the configuration and package: linkis-metadata

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After decompressing the linkis-metadata installation package, you need to modify the configuration in the conf:
1. Application.yml modify eureka address
2. linkis.properties configure Linkis database and Hive metadata database address configuration:
```
//Linkis database connection information
wds.linkis.server.mybatis.datasource.url=jdbc:mysql://
wds.linkis.server.mybatis.datasource.username=
wds.linkis.server.mybatis.datasource.password=
//Hive metabase address is not hiveServer2
hive.meta.url=
hive.meta.user=
hive.meta.password=
```

### 2.5 Newly added services
 > Newly added service: linkis-bml

After downloading the linkis-bml installation package and decompressing it, modify the configuration in conf:
1. Application.yml modify eureka address
2. linkis.properties configure Mybatis related configuration:
```
wds.linkis.server.mybatis.datasource.url=jdbc:mysql://
wds.linkis.server.mybatis.datasource.username=
wds.linkis.server.mybatis.datasource.password=
```
3. Import the sql data of bml to mysql
```
cd db/;
source linkis-bml.sql
```