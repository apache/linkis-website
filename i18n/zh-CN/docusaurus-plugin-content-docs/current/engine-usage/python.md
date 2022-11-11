---
title: Python 引擎
sidebar_position: 5
---

本文主要介绍在 Linkis 中，Python 引擎插件的安装、使用和配置。

## 1.前置工作
### 1.1环境安装

如果您希望在您的服务器上使用python引擎，您需要保证用户的PATH中是有python的执行目录和执行权限。

### 1.2环境验证
```
python --version
```
正常输出Python版本信息代表Python环境可用
```
Python 3.6.0
```

## 2.引擎插件安装

linkis发布的二进制安装包中默认包含了Python引擎插件，用户无需额外安装。

## 3.引擎的使用

### 3.1通过Linkis-cli提交任务

```shell
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop
```
更多 Linkis-Cli 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

### 3.2通过Linkis SDK提交任务

Linkis提供了Java和Scala的SDK向Linkis服务端提交任务。具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md)。对于Python任务您只需要修改EngineConnType和CodeType参数即可。

```java
Map<String, Object> labels = new HashMap<String, Object>();
labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "python-python2"); // required engineType Label
labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "python"); // required codeType 
```
### 3.3通过Scriptis提交任务

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建python脚本并编写python代码并点击执行。

python的执行逻辑是通过Py4j的方式，启动一个的python的gateway，然后Python引擎将代码提交到python的执行器进行执行。

![](/Images-zh/EngineUsage/python-run.png)

## 4.引擎配置说明

### 4.1配置修改
Python引擎插件支持python2 和 python3，您可以简单更改配置就可以完成Python版本的切换，不需要重新编译python的引擎版本。Python引擎支持多种配置修改方式，具体操作如下。

#### 4.1.1通过命令参数显示指定（仅当前命令生效）

```
#1：cli的方式提交任务进行版本切换,命令末端设置版本 python.version=python3 (python3：创建软连接时生成文件的名称，可自定义命名)
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=python3

#2：cli的方式提交任务进行版本切换,命令设置加入版本路径 python.version=/usr/bin/python (/usr/bin/python：创建软连接时生成文件的路径)
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=/usr/bin/python

```

#### 4.1.2管理台配置

![](/Images-zh/EngineUsage/python-config.png)

注意: 修改IDE标签下的配置后需要指定 -creator IDE 才会生效（其它标签类似），如：

```shell
sh ./bin/linkis-cli -creator IDE -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=python3
```

#### 4.2.2任务接口配置
提交任务接口，通过参数params.configuration.runtime进行配置

```shell
http 请求参数示例 
{
    "executionContent": {"code": "print(\"hello\")", "runType":  "python"},
    "params": {
                "variable": {},
                "configuration": {
                        "runtime": {
                                "python.version":"python2",
                                "wds.linkis.engineconn.max.free.time":"1h"
                        }
                }
        },
    "labels": {
        "engineType": "python-python2",
        "userCreator": "IDE"
    }
}
```

#### 4.2.3文件配置
通过修改目录 ${LINKIS_HOME}/lib/linkis-engineconn-plugins/python/dist/vpython2/conf/ 中的linkis-engineconn.properties 文件进行配置，如下图：

![](/Images-zh/EngineUsage/python-conf.png)
