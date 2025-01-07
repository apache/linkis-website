---
title:  Shell Engine
sidebar_position: 2
---

# Shell Engine Usage document

This article mainly introduces the configuration, deployment and use of Shell EngineConn in Linkis1.0
## 1. The environment configuration before using the Shell EngineConn

If you want to use the shell EngineConn on your server, you need to ensure that the user's PATH has the bash execution directory and execution permissions.

| Environment variable name | Environment variable content | Remarks             |
|---------------------------|------------------------------|---------------------|
| sh execution environment  | bash environment variables    | bash is recommended |

Table 1-1 Environmental configuration list

## 2. Shell EngineConn configuration and deployment

### 2.1 Shell version selection and compilation

The shell EngineConn does not need to be compiled by the user, and the compiled shell EngineConn plug-in package can be used directly.
### 2.2 shell engineConn deployment and loading

Here you can use the default loading method to be used normally.

### 2.3 Labels of the shell EngineConn

Here you can use the default dml.sql to insert it and it can be used normally.

## 3. Use of Shell EngineConn

### Ready to operate

Before submitting the shell on linkis, you only need to ensure that there is the path of the shell in your user's $PATH.

### 3.1 How to use Linkis SDK

Linkis  provides a client method to call shell tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](../user-guide/sdk-manual.md).
If you use Hive, you only need to make the following changes:
```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "shell-1"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "shell"); // required codeType
```

### 3.2 How to use Linkis-cli

After Linkis 1.0, you can submit tasks through cli. We only need to specify the corresponding EngineConn and CodeType tag types. The use of shell is as follows:
```shell
sh ./bin/linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" "  -submitUser hadoop -proxyUser hadoop
```
The specific usage can refer to [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 How to use Scriptis

The use of [Scriptis](https://github.com/WeBankFinTech/Scriptis) is the simplest. You can directly enter Scriptis, right-click the directory and create a new shell script, write shell code and click Execute.

The execution principle of the shell is that the shell EngineConn starts a system process to execute through the ProcessBuilder that comes with java, and redirects the output of the process to the EngineConn and writes it to the log.

![](/Images/EngineUsage/shell-run.png)

Figure 3-1 Screenshot of shell execution effect

## 4. Shell EngineConn user settings

The shell EngineConn can generally set the maximum memory of the EngineConn JVM.
