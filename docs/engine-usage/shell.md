---
title: Shell Engine
sidebar_position: 6
---

This article mainly introduces the installation, usage and configuration of the `Shell` engine plug-in in `Linkis`.

## 1. Preliminary work

### 1.1 Environment installation
If you want to use the `shell` engine on your server, you need to ensure that the user's `PATH` has the executable directory and execution permission of `bash`.

### 1.2 Environment verification
```
echo $SHELL
```
The following information is output to indicate that the shell environment is available
```
/bin/bash
```
or
```
/bin/sh
```

## 2. Engine plugin installation [default engine](./overview.md)

The `Shell` engine plugin is included in the binary installation package released by `linkis` by default, and users do not need to install it additionally.

[EngineConnPlugin engine plugin installation](../deployment/install-engineconn.md)

## 3. Engine usage

### 3.1 Submit tasks through `Linkis-cli`

```shell
sh ./bin/linkis-cli -engineType shell-1 \
-codeType shell -code "echo \"hello\" " \
-submitUser hadoop -proxyUser hadoop
```
More `Linkis-Cli` command parameter reference: [Linkis-Cli usage](../user-guide/linkiscli-manual.md)

### 3.2 Submit tasks through Linkis SDK

`Linkis` provides `SDK` for `Java` and `Scala` to submit tasks to the `Linkis` server. For details, please refer to [JAVA SDK Manual](../user-guide/sdk-manual.md). For the `Shell` task you only need to modify the `EngineConnType` and `CodeType` parameters in the `Demo`:

```java
Map<String, Object> labels = new HashMap<String, Object>();
labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "shell-1"); // required engineType Label
labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
labels.put(LabelKeyConstant.CODE_TYPE_KEY, "shell"); // required codeType
```
## 4. Engine configuration instructions

The `shell` engine can generally set the maximum memory of the engine `JVM`.