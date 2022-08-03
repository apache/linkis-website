---
title: Python 引擎
sidebar_position: 5
---

本文主要介绍在Linkis1.X中，Python引擎的配置、部署和使用。

## 1.Python引擎使用前的环境配置

如果您希望在您的服务器上使用python引擎，您需要保证用户的PATH中是有python的执行目录和执行权限。

| 环境变量名 | 环境变量内容    | 备注                           |
|------------|-----------------|--------------------------------|
| python     | python执行环境  | 建议使用anaconda的python执行器 |

表1-1 环境配置清单

## 2.Python引擎的配置和部署

### 2.1 Python版本的选择和编译

Python是支持python2 和
python3的，您可以简单更改配置就可以完成Python版本的切换，不需要重新编译python的引擎版本，具体配置如下。


```
#1：cli的方式提交任务进行版本切换,命令末端设置版本 python.version=python3 (python3：创建软连接时生成文件的名称，可自定义命名)
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=python3

#2：cli的方式提交任务进行版本切换,命令设置加入版本路径 python.version=/usr/bin/python (/usr/bin/python：创建软连接时生成文件的路径)
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=/usr/bin/python

```
页面配置：
![](/Images/EngineUsage/python-configure.png)

### 2.2 python engineConn部署和加载

此处可以使用默认的加载方式即可正常使用。

## 3.Python引擎的使用

### 准备操作

在linkis上提交python之前，您只需要保证您的用户的$PATH中有python的路径即可。

### 3.1 通过Linkis SDK进行使用

Linkis提供了Java和Scala 的SDK向Linkis服务端提交任务. 具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md).
对于Python任务您只需要修改Demo中的EngineConnType和CodeType参数即可:

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "python-python2"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "python"); // required codeType 
```

### 3.2 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，Python的使用如下：
```shell
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop
```
具体使用可以参考： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 Scriptis的使用方式

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建python脚本并编写python代码并点击执行。

python的执行逻辑是通过 Py4j的方式，启动一个的python
的gateway，然后Python引擎将代码提交到python的执行器进行执行。

![](/Images-zh/EngineUsage/python-run.png)

图3-1 python的执行效果截图

## 4.Python引擎的用户设置

除了以上引擎配置，用户还可以进行自定义的设置，比如python的版本和以及python需要加载的一些module等。

![python](https://user-images.githubusercontent.com/29391030/168045185-f25c61b6-8727-434e-8150-e13cc4a04ade.png)  

图4-1 python的用户自定义配置管理台
