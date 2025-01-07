---
title:  JDBC Engine Usage
sidebar_position: 2
---

This article mainly introduces the configuration, deployment and use of JDBC EngineConn in Linkis1.0.

## 1. Environment configuration before using the JDBC EngineConn

If you want to use the JDBC EngineConn on your server, you need to prepare the JDBC connection information, such as the connection address, user name and password of the MySQL database, etc.

## 2. JDBC EngineConn configuration and deployment

### 2.1 JDBC version selection and compilation

The JDBC EngineConn does not need to be compiled by the user, and the compiled JDBC EngineConn plug-in package can be used directly. Drivers that have been provided include MySQL, PostgreSQL, etc.

### 2.2 JDBC EngineConn deployment and loading

Here you can use the default loading method to use it normally, just install it according to the standard version.

### 2.3 JDBC EngineConn Labels

Here you can use the default dml.sql to insert it and it can be used normally.

## 3. The use of JDBC EngineConn

### Ready to operate

You need to configure JDBC connection information, including connection address information and user name and password.

![](/Images/EngineUsage/jdbc-conf.png)

Figure 3-1 JDBC configuration information

You can also specify in the RuntimeMap of the submitted task
```shell
wds.linkis.jdbc.connect.url 
wds.linkis.jdbc.username
wds.linkis.jdbc.password
```

### 3.1 How to use Linkis SDK

Linkis provides a client method to call jdbc tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](../user-guide/sdk-manual.md).
If you use Hive, you only need to make the following changes:
```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "jdbc-4"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "jdbc"); // required codeType
```

### 3.2 How to use Linkis-cli

After Linkis 1.0, you can submit tasks through cli. We only need to specify the corresponding EngineConn and CodeType tag types. The use of JDBC is as follows:
```shell
sh ./bin/linkis-cli -engineType jdbc-4 -codeType jdbc -code "show tables"  -submitUser hadoop -proxyUser hadoop
```
The specific usage can refer to [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 How to use Scriptis

The way to use [Scriptis](https://github.com/WeBankFinTech/Scriptis)  is the simplest. You can go directly to Scriptis, right-click the directory and create a new JDBC script, write JDBC code and click Execute.

The execution principle of JDBC is to load the JDBC Driver and submit sql to the SQL server for execution and obtain the result set and return.

![](/Images/EngineUsage/jdbc-run.png)

Figure 3-2 Screenshot of the execution effect of JDBC

## 4. JDBC EngineConn user settings

JDBC user settings are mainly JDBC connection information, but it is recommended that users encrypt and manage this password and other information.