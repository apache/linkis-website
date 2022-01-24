---
title:  Hive Engine Usage
sidebar_position: 2
---

This article mainly introduces the configuration, deployment and use of Hive engineConn in Linkis1.0.

## 1. Environment configuration before Hive engineConn use

If you want to use the hive engineConn on your linkis server, you need to ensure that the following environment variables have been set correctly and that the user who started the engineConn has these environment variables.

It is strongly recommended that you check these environment variables of the executing user before executing hive tasks.

| Environment variable name | Environment variable content | Remarks |
|-----------------|----------------|------|
| JAVA_HOME | JDK installation path | Required |
| HADOOP_HOME | Hadoop installation path | Required |
| HADOOP_CONF_DIR | Hadoop configuration path | Required |
| HIVE_CONF_DIR | Hive configuration path | Required |

Table 1-1 Environmental configuration list

## 2. Hive engineConn configuration and deployment

### 2.1 Hive version selection and compilation

The version of Hive supports hive1.x/hive2.x/hive3.x. The hive version supported by default is 2.3.3. If you want to modify the hive version, such as 2.3.3, you can find the linkis-engineConnplugin-hive module and change the \<hive.version\> tag to 2.3 .3, then compile this module separately.
The default is to support hive on MapReduce, if you want to change to Hive on Tez, You need to copy all the jars prefixed with tez-* to the directory: `${LINKIS_HOME}/lib/linkis-engineconn-plugins/hive/dist/version/lib`.
Other hive operating modes are similar, just copy the corresponding dependencies to the lib directory of Hive EngineConn.

### 2.2 hive engineConnConn deployment and loading

If you have already compiled your hive engineConn plug-in has been compiled, then you need to put the new plug-in in the specified location to load, you can refer to the following article for details

[EngineConnPlugin Installation](deployment/engine_conn_plugin_installation.md) 

### 2.3 Linkis adds Hive console parameters(optional)

Linkis can configure the corresponding EngineConn parameters on the management console. If your newly added EngineConn needs this feature, you can refer to the following documents:

[EngineConnPlugin Installation > 2.2 Configuration modification of management console (optional)](deployment/engine_conn_plugin_installation.md) 

## 3. Use of hive engineConn

### Preparation for operation, queue setting

Hive's MapReduce task requires yarn resources, so you need to set up the queue at the beginning

![](/Images/EngineUsage/queue-set.png)

Figure 3-1 Queue settings

You can also add the queue value in the StartUpMap of the submission parameter: `startupMap.put("wds.linkis.rm.yarnqueue", "dws")`

### 3.1 How to use Linkis SDK

Linkis  provides a client method to call hive tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](user_guide/sdk_manual.md).
If you use Hive, you only need to make the following changes:
```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "hive-2.3.3"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "hql"); // required codeType
```

### 3.2 How to use Linkis-cli

After Linkis 1.0, you can submit tasks through cli. We only need to specify the corresponding EngineConn and CodeType tag types. The use of Hive is as follows:
```shell
sh ./bin/linkis-cli -engineType jdbc-4 -codeType jdbc -code "show tables"  -submitUser hadoop -proxyUser hadoop
```
The specific usage can refer to [Linkis CLI Manual](user_guide/linkiscli_manual.md).

### 3.3 How to use Scriptis

The use of [Scriptis](https://github.com/WeBankFinTech/Scriptis) is the simplest. You can directly enter Scriptis, right-click the directory and create a new hive script and write hivesql code.

The implementation of the hive engineConn is by instantiating the driver instance of hive, and then the driver submits the task, and obtains the result set and displays it.

![](/Images/EngineUsage/hive-run.png)

Figure 3-2 Screenshot of the execution effect of hql

## 4. Hive engineConn user settings

In addition to the above engineConn configuration, users can also make custom settings, including the memory size of the hive Driver process, etc.

![](/Images/EngineUsage/hive-config.png)

Figure 4-1 User-defined configuration management console of hive