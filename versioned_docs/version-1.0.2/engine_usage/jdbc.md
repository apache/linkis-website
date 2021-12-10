---
title:  JDBC Engine Usage
sidebar_position: 2
---


# JDBC engine usage documentation

This article mainly introduces the configuration, deployment and use of JDBC engine in Linkis1.0.

## 1. Environment configuration before using the JDBC engine

If you want to use the JDBC engine on your server, you need to prepare the JDBC connection information, such as the connection address, user name and password of the MySQL database, etc.

## 2. JDBC engine configuration and deployment

### 2.1 JDBC version selection and compilation

The JDBC engine does not need to be compiled by the user, and the compiled JDBC engine plug-in package can be used directly. Drivers that have been provided include MySQL, PostgreSQL, etc.

### 2.2 JDBC engineConn deployment and loading

Here you can use the default loading method to use it normally, just install it according to the standard version.

### 2.3 JDBC engine tags

Here you can use the default dml.sql to insert it and it can be used normally.

## 3. The use of JDBC engine

### Ready to operate

You need to configure JDBC connection information, including connection address information and user name and password.

![](/Images/EngineUsage/jdbc-conf.png)

Figure 3-1 JDBC configuration information

### 3.1 How to use Scriptis

The way to use Scriptis is the simplest. You can go directly to Scriptis, right-click the directory and create a new JDBC script, write JDBC code and click Execute.

The execution principle of JDBC is to load the JDBC Driver and submit sql to the SQL server for execution and obtain the result set and return.

![](/Images/EngineUsage/jdbc-run.png)

Figure 3-2 Screenshot of the execution effect of JDBC

### 3.2 How to use workflow

DSS workflow also has a JDBC node, you can drag into the workflow node, then double-click to enter and edit the code, and then execute it in the form of a workflow.

### 3.3 How to use Linkis Client

Linkis also provides a client way to call JDBC tasks, the way to call is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to <https://github.com/WeBankFinTech/Linkis/wiki/Linkis1.0%E7%94%A8%E6%88%B7%E4 %BD%BF%E7%94%A8%E6%96%87%E6%A1%A3>.

## 4. JDBC engine user settings

JDBC user settings are mainly JDBC connection information, but it is recommended that users encrypt and manage this password and other information.