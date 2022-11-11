---
title: Shell 引擎
sidebar_position: 6
---

本文主要介绍在 Linkis 中，Shell 引擎插件的安装、使用和配置。

## 1.前置工作

### 1.1环境安装
如果您希望在您的服务器上使用shell引擎，您需要保证用户的PATH中是有bash的执行目录和执行权限。

### 1.2环境验证
```
echo $SHELL
```
输出如下信息代表shell环境可用
```
/bin/bash
```
或
```
/bin/sh
```

## 2.引擎插件安装

linkis发布的二进制安装包中默认包含了Shell引擎插件，用户无需额外安装。

## 3.引擎的使用

### 3.1通过Linkis-cli提交任务

```shell
sh ./bin/linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" " -submitUser hadoop -proxyUser hadoop
```
更多 Linkis-Cli 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

### 3.2通过Linkis SDK提交任务

Linkis提供了Java和Scala 的SDK向Linkis服务端提交任务. 具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md).
对于Shell任务你只需要修改Demo中的EngineConnType和CodeType参数即可:

```java
Map<String, Object> labels = new HashMap<String, Object>();
labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "shell-1"); // required engineType Label
labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "shell"); // required codeType
```

### 3.3通过Scriptis提交任务

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建shell脚本并编写shell代码并点击执行。

shell的执行原理是shell引擎通过java自带的ProcessBuilder启动一个系统进程来进行执行，并且将进程的输出重定向到引擎并写入到日志中。

![](/Images-zh/EngineUsage/shell-run.png)

## 4.引擎配置说明

shell引擎一般可以设置引擎JVM的最大内存。
