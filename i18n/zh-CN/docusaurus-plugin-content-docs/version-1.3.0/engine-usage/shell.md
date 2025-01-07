---
title: Shell 引擎
sidebar_position: 6
---

本文主要介绍在Linkis1.X中，Shell引擎的配置、部署和使用。

## 1.Shell引擎使用前的环境配置

如果您希望在您的服务器上使用shell引擎，您需要保证用户的PATH中是有bash的执行目录和执行权限。

| 环境变量名 | 环境变量内容 | 备注         |
|------------|--------------|--------------|
| sh执行环境 | bash环境变量 | 建议使用bash |

表1-1 环境配置清单

## 2.Shell引擎的配置和部署

### 2.1 Shell版本的选择和编译

Shell引擎不需要用户自行编译，直接使用编译好的shell引擎插件包即可。

### 2.2 shell engineConn部署和加载

此处可以使用默认的加载方式即可正常使用。

### 2.3 shell引擎的标签

此处可以使用默认的dml.sql进行插入即可正常使用。

## 3.Shell引擎的使用

### 准备操作

在linkis上提交shell之前，您只需要保证您的用户的\$PATH中有shell的路径即可。

### 3.1 通过Linkis SDK进行使用

Linkis提供了Java和Scala 的SDK向Linkis服务端提交任务. 具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md).
对于Shell任务你只需要修改Demo中的EngineConnType和CodeType参数即可:

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "shell-1"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "shell"); // required codeType
```

### 3.2 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，Shell的使用如下：
```shell
sh ./bin/linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" "  -submitUser hadoop -proxyUser hadoop
```
具体使用可以参考： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 Scriptis的使用方式

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建shell脚本并编写shell代码并点击执行。

shell的执行原理是shell引擎通过java自带的ProcessBuilder启动一个系统进程来进行执行，并且将进程的输出重定向到引擎并写入到日志中。

![](/Images-zh/EngineUsage/shell-run.png)

图3-1 shell的执行效果截图

## 4.Shell引擎的用户设置

shell引擎一般可以设置引擎JVM的最大内存。
