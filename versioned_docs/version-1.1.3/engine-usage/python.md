---
title:  Python Engine Usage
sidebar_position: 2
---


This article mainly introduces the configuration, deployment and use of the Python EngineConn in Linkis1.0.

## 1. Environment configuration before using Python EngineConn

If you want to use the python EngineConn on your server, you need to ensure that the python execution directory and execution permissions are in the user's PATH.

| Environment variable name | Environment variable content | Remarks |
|------------|-----------------|--------------------------------|
| python | python execution environment | Anaconda's python executor is recommended |

Table 1-1 Environmental configuration list

## 2. Python EngineConn configuration and deployment

### 2.1 Python version selection and compilation

Python supports python2 and
For python3, you can simply change the configuration to complete the Python version switch, without recompiling the python EngineConn version.

```
#1: CLI to submit tasks for version switching, and set the version Python at the end of the command Version=python3 (python3: the name of the file generated when creating a soft connection, which can be customized)
sh ./ bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python. version=python3

#2: CLI to submit the task for version switching, and add the command setting to the version path python Version=/usr/bin/python (/usr/bin/python: the path of the generated file when creating the soft connection)
sh ./ bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python. version=/usr/bin/python

```
Page configuration:
![](/Images/EngineUsage/python-configure.png)

### 2.2 python engineConn deployment and loading

Here you can use the default loading method to be used normally.

### 2.3 tags of python EngineConn

Here you can use the default dml.sql to insert it and it can be used normally.

## 3. Use of Python EngineConn

### Ready to operate

Before submitting python on linkis, you only need to make sure that there is python path in your user's PATH.

### 3.1 How to use Linkis SDK

Linkis  provides a client method to call python tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](../user-guide/sdk-manual.md).
If you use Hive, you only need to make the following changes:
```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "python-python2"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "python"); // required codeType
```

### 3.2 How to use Linkis-cli

After Linkis 1.0, you can submit tasks through cli. We only need to specify the corresponding EngineConn and CodeType tag types. The use of Python is as follows:
```shell
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop
```
The specific usage can refer to [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 How to use Scriptis

The way to use [Scriptis](https://github.com/WeBankFinTech/Scriptis) is the simplest. You can directly enter Scriptis, right-click the directory and create a new python script, write python code and click Execute.

The execution logic of python is to start a python through Py4j
Gateway, and then the Python EngineConn submits the code to the python executor for execution.

![](/Images/EngineUsage/python-run.png)

Figure 3-1 Screenshot of the execution effect of python

## 4. Python EngineConn user settings

In addition to the above EngineConn configuration, users can also make custom settings, such as the version of python and some modules that python needs to load.

![](/Images/EngineUsage/python-config.png)

Figure 4-1 User-defined configuration management console of python