---
title: JDBC 引擎
sidebar_position: 7
---

本文主要介绍在Linkis1.0中，JDBC引擎的配置、部署和使用。

## 1.JDBC引擎使用前的环境配置

如果您希望在您的服务器上使用JDBC引擎，您需要准备JDBC连接信息，如MySQL数据库的连接地址、用户名和密码等

## 2.JDBC引擎的配置和部署

### 2.1 JDBC版本的选择和编译

JDBC引擎不需要用户自行编译，直接使用编译好的JDBC引擎插件包即可。已经提供的Driver包括有MySQL，PostgreSQL等

### 2.2 JDBC engineConn部署和加载

此处可以使用默认的加载方式即可正常使用，按照标准版本安装即可。

### 2.3 JDBC引擎的标签

此处可以使用默认的dml.sql进行插入即可正常使用。

## 3.JDBC引擎的使用

### 准备操作

您需要配置JDBC的连接信息，包括连接地址信息和用户名以及密码。

![](/Images-zh/EngineUsage/jdbc-conf.png)

图3-1 JDBC配置信息

您也可以才提交任务接口中的RuntimeMap进行修改即可
```shell
wds.linkis.jdbc.connect.url 
wds.linkis.jdbc.username
wds.linkis.jdbc.password
```

### 3.1 通过Linkis SDK进行使用

Linkis提供了Java和Scala 的SDK向Linkis服务端提交任务. 具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md).
对于JDBC任务您只需要修改Demo中的EngineConnType和CodeType参数即可:

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "jdbc-4"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "jdbc"); // required codeType
```

### 3.2 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，JDBC的使用如下：
```shell
sh ./bin/linkis-cli -engineType jdbc-4 -codeType jdbc -code "show tables"  -submitUser hadoop -proxyUser hadoop
```
具体使用可以参考： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 Scriptis的使用方式

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建JDBC脚本并编写JDBC代码并点击执行。

JDBC的执行原理是通过加载JDBC的Driver然后提交sql到SQL的server去执行并获取到结果集并返回。

![](/Images-zh/EngineUsage/jdbc-run.png)

图3-2 JDBC的执行效果截图

## 4.JDBC引擎的用户设置

JDBC的用户设置是主要是的JDBC的连接信息，但是建议用户将此密码等信息进行加密管理。
