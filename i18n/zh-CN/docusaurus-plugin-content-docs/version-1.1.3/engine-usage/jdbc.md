---
title: JDBC 引擎
sidebar_position: 7
---

本文主要介绍在Linkis1.X中，JDBC引擎的配置、部署和使用。

## 1. 环境准备

如果您希望在您的服务器上使用JDBC引擎，您需要准备JDBC连接信息，如MySQL数据库的连接地址、用户名和密码等

## 2. 部署和配置

### 2.1 版本的选择和编译
注意: 编译jdbc引擎之前需要进行linkis项目全量编译  
发布的安装部署包中默认不包含此引擎插件，
你可以按此指引部署安装 https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin
，或者按以下流程，手动编译部署


单独编译jdbc引擎 

```
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/jdbc/
mvn clean install
```

### 2.2 物料的部署和加载

将 2.1 步编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/jdbc/target/out/jdbc
```
上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
并重启linkis-engineplugin（或则通过引擎接口进行刷新）
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
### 2.3 引擎的标签

Linkis1.X是通过标签来进行的，所以需要在我们数据库中插入数据，插入的方式如下文所示。

[EngineConnPlugin引擎插件安装](../deployment/engine-conn-plugin-installation) 


## 3.JDBC引擎的使用

### 准备操作

您需要配置JDBC的连接信息，包括连接地址信息和用户名以及密码。

![jdbc](https://user-images.githubusercontent.com/29391030/168045539-9cea6c44-56a9-4b14-86fb-1e65f937ae54.png)  

图3-1 JDBC配置信息

您也可以再提交任务接口中的params.configuration.runtime进行修改即可
```shell
jdbc.url 
jdbc.username
jdbc.password
```

您也可以在提交任务接口，通过参数进行配置

```shell
http 请求参数示例 
{
    "executionContent": {"code": "show databases;", "runType":  "jdbc"},
    "params": {
                    "variable": {},
                    "configuration": {
                            "runtime": {
                                    "jdbc.url":"jdbc:mysql://127.0.0.1:3306/test",  
                                    "jdbc.username":"test",
                                    "jdbc.password":"test23"
                                }
                            }
                    },
    "source":  {"scriptPath": "file:///mnt/bdp/hadoop/1.sql"},
    "labels": {
        "engineType": "jdbc-4",
        "userCreator": "hadoop-IDE"
    }
}
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
