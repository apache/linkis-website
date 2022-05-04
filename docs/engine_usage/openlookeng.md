---
title: OpenLookEng 引擎
sidebar_position: 8
---

本文主要介绍openlookeng(>=1.1.1版本支持)引擎的配置、部署和使用，发布的安装部署包中默认不包含此引擎插件。
如需使用，请按此指引部署安装 https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin


## 1. openlookeng 引擎使用前的环境配置

如果您希望部署使用openlookeng引擎，您需要准备一套可用的openlookeng环境。

## 2. openlookeng引擎的配置和部署

### 2.1 openlookeng版本的选择和编译

目前openlookeng引擎，客户端默认使用的版本为 io.hetu.core:presto-client:1.5.0

该引擎默认不在发布的安装包中，需要您手动进行编译并进行安装。

单独编译openlookeng 
```
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/openlookeng/
mvn clean install
```

### 2.2 openlookeng部署和加载

将 2.1 步编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/openlookeng/target/out/openlookeng
```
上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
并重启linkis-engineplugin（或则通过引擎接口进行刷新）
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon restart cg-engineplugin
```


### 2.3 openlookeng引擎的标签

此处可以使用默认的dml.sql进行插入即可正常使用。

## 3.openlookeng引擎的使用

### 准备操作

您需要配置openlookeng的连接信息，包括连接地址信息和用户名以及密码。

![](/Images-zh/EngineUsage/jdbc-conf.png)

图3-1 openlookeng配置信息

您也可以才提交任务接口中的RuntimeMap进行修改即可
```shell
wds.linkis.jdbc.connect.url 
wds.linkis.jdbc.username
wds.linkis.jdbc.password
```

### 3.1 通过Linkis SDK进行使用

Linkis提供了Java和Scala 的SDK向Linkis服务端提交任务. 具体可以参考 [JAVA SDK Manual](user_guide/sdk_manual.md).
对于openlookeng任务您只需要修改Demo中的EngineConnType和CodeType参数即可:

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "jdbc-4"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "jdbc"); // required codeType
```

### 3.2 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，openlookeng的使用如下：
```shell
sh ./bin/linkis-cli -engineType jdbc-4 -codeType jdbc -code "show tables"  -submitUser hadoop -proxyUser hadoop
```
具体使用可以参考： [Linkis CLI Manual](user_guide/linkiscli_manual.md).

### 3.3 Scriptis的使用方式

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建openlookeng脚本并编写openlookeng代码并点击执行。

openlookeng的执行原理是通过加载openlookeng的Driver然后提交sql到SQL的server去执行并获取到结果集并返回。

![](/Images-zh/EngineUsage/jdbc-run.png)

图3-2 openlookeng的执行效果截图

## 4.openlookeng引擎的用户设置

openlookeng的用户设置是主要是的openlookeng的连接信息，但是建议用户将此密码等信息进行加密管理。
