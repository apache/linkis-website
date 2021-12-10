---
title:  Python Engine Usage
sidebar_position: 2
---


# Python engine usage documentation

This article mainly introduces the configuration, deployment and use of the Python engine in Linkis1.0.

## 1. Environment configuration before using Python engine

If you want to use the python engine on your server, you need to ensure that the python execution directory and execution permissions are in the user's PATH.

| Environment variable name | Environment variable content | Remarks |
|------------|-----------------|--------------------------------|
| python | python execution environment | Anaconda's python executor is recommended |

Table 1-1 Environmental configuration list

## 2. Python engine configuration and deployment

### 2.1 Python version selection and compilation

Python supports python2 and
For python3, you can simply change the configuration to complete the Python version switch, without recompiling the python engine version.

### 2.2 python engineConn deployment and loading

Here you can use the default loading method to be used normally.

### 2.3 tags of python engine

Here you can use the default dml.sql to insert it and it can be used normally.

## 3. Use of Python engine

### Ready to operate

Before submitting python on linkis, you only need to make sure that there is python path in your user's PATH.

### 3.1 How to use Scriptis

The way to use Scriptis is the simplest. You can directly enter Scriptis, right-click the directory and create a new python script, write python code and click Execute.

The execution logic of python is to start a python through Py4j
Gateway, and then the Python engine submits the code to the python executor for execution.

![](/Images/EngineUsage/python-run.png)

Figure 3-1 Screenshot of the execution effect of python

### 3.2 How to use workflow

The DSS workflow also has a python node, you can drag into the workflow node, then double-click to enter and edit the code, and then execute it in the form of a workflow.

### 3.3 How to use Linkis Client

Linkis also provides a client method to call spark tasks, the call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to <https://github.com/WeBankFinTech/Linkis/wiki/Linkis1.0%E7%94%A8%E6%88%B7%E4 %BD%BF%E7%94%A8%E6%96%87%E6%A1%A3>.

## 4. Python engine user settings

In addition to the above engine configuration, users can also make custom settings, such as the version of python and some modules that python needs to load.

![](/Images/EngineUsage/jdbc-conf.png)

Figure 4-1 User-defined configuration management console of python