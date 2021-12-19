---
title:  Hive Engine Usage
sidebar_position: 2
---

# Hive engine usage documentation

This article mainly introduces the configuration, deployment and use of Hive engine in Linkis1.0.

## 1. Environment configuration before Hive engine use

If you want to use the hive engine on your server, you need to ensure that the following environment variables have been set correctly and that the user who started the engine has these environment variables.

It is strongly recommended that you check these environment variables of the executing user before executing hive tasks.

| Environment variable name | Environment variable content | Remarks |
|-----------------|----------------|------|
| JAVA_HOME | JDK installation path | Required |
| HADOOP_HOME | Hadoop installation path | Required |
| HADOOP_CONF_DIR | Hadoop configuration path | Required |
| HIVE_CONF_DIR | Hive configuration path | Required |

Table 1-1 Environmental configuration list

## 2. Hive engine configuration and deployment

### 2.1 Hive version selection and compilation

The version of Hive supports hive1.x and hive2.x, the default is to support hive on MapReduce, if you want to change to Hive
on Tez, you need to make some changes in accordance with this pr.

<https://github.com/apache/incubator-linkis/pull/541>

The hive version supported by default is 1.2.1. If you want to modify the hive version, such as 2.3.3, you can find the linkis-engineplugin-hive module and change the \<hive.version\> tag to 2.3 .3, then compile this module separately

### 2.2 hive engineConn deployment and loading

If you have already compiled your hive engine plug-in has been compiled, then you need to put the new plug-in in the specified location to load, you can refer to the following article for details

[EngineConnPlugin Installation](deployment/engine_conn_plugin_installation.md) 

### 2.3 Hive engine tags

Linkis1.0 is done through tags, so we need to insert data in our database, the way of inserting is shown below.

[EngineConnPlugin Installation > 2.2 Configuration modification of management console (optional)](deployment/engine_conn_plugin_installation.md) 

## 3. Use of hive engine

### Preparation for operation, queue setting

Hive's MapReduce task requires yarn resources, so you need to set up the queue at the beginning

![](/Images/EngineUsage/queue-set.png)

Figure 3-1 Queue settings

### 3.1 How to use Scriptis

The use of Scriptis is the simplest. You can directly enter Scriptis, right-click the directory and create a new hive script and write hivesql code.

The implementation of the hive engine is by instantiating the driver instance of hive, and then the driver submits the task, and obtains the result set and displays it.

![](/Images/EngineUsage/hive-run.png)

Figure 3-2 Screenshot of the execution effect of hivesql

### 3.2 How to use workflow

DSS workflow also has a hive node, you can drag in the workflow node, then double-click to enter and edit the code, and then execute it in the form of a workflow.

![](/Images/EngineUsage/workflow.png)

Figure 3-5 The node where the workflow executes hive

### 3.3 How to use Linkis Client

Linkis also provides a client method to call hive tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](user_guide/sdk_manual.md).

## 4. Hive engine user settings

In addition to the above engine configuration, users can also make custom settings, including the memory size of the hive Driver process, etc.

![](/Images/EngineUsage/hive-config.png)

Figure 4-1 User-defined configuration management console of hive