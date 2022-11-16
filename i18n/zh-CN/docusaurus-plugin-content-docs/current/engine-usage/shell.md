---
title: Shell 引擎
sidebar_position: 6
---

本文主要介绍在 `Linkis` 中， `Shell` 引擎插件的安装、使用和配置。

## 1. 前置工作

### 1.1 环境安装
如果您希望在您的服务器上使用 `Shell` 引擎，您需要保证用户的 `PATH` 中是有 `bash` 的执行目录和执行权限。

### 1.2 环境验证
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

## 2. 引擎插件安装 [默认引擎](./overview.md)

`Linkis` 发布的二进制安装包中默认包含了 `Shell` 引擎插件，用户无需额外安装。

[EngineConnPlugin引擎插件安装](../deployment/install-engineconn.md)

## 3. 引擎的使用

### 3.1 通过 `Linkis-cli` 提交任务

```shell
sh ./bin/linkis-cli -engineType shell-1 \
-codeType shell -code "echo \"hello\" " \
-submitUser hadoop -proxyUser hadoop
```
更多 `Linkis-Cli` 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

### 3.2 通过Linkis SDK提交任务

`Linkis` 提供了 `Java` 和 `Scala` 的 `SDK` 向 `Linkis` 服务端提交任务。具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md)。 对于 `Shell` 任务您只需要修改 `Demo` 中的 `EngineConnType` 和 `CodeType` 参数即可:

```java
Map<String, Object> labels = new HashMap<String, Object>();
labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "shell-1"); // required engineType Label
labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "shell"); // required codeType
```
## 4. 引擎配置说明

`Shell` 引擎一般可以设置引擎 `JVM` 的最大内存。
