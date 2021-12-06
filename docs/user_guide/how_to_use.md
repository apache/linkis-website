---
title: How to Use
sidebar_position: 3
---

# How to use Linkis?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In order to meet the needs of different usage scenarios, Linkis provides a variety of usage and access methods, which can be summarized into three categories, namely Client-side use, Scriptis-side use, and DataSphere It is used on the Studio side, among which Scriptis and DataSphere Studio are the open source data analysis platforms of the WeBank Big Data Platform Room. Since these two projects are essentially compatible with Linkis, it is easiest to use Linkis through Scriptis and DataSphere Studio.

## 1. Client side usage

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you need to connect to other applications on the basis of Linkis, you need to develop the interface provided by Linkis. Linkis provides a variety of client access interfaces. For detailed usage introduction, please refer to the following:
-[**Restful API Usage**](../api/Linkis task submission and execution RestAPI document.md)
-[**JDBC API Usage**](../api/Task Submit and Execute JDBC_API Document.md)
-[**How ​​to use Java SDK**](/Linkis1.0 user use document.md)

## 2. Scriptis uses Linkis

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you need to use Linkis to complete interactive online analysis and processing, and you do not need data analysis application tools such as workflow development, workflow scheduling, data services, etc., you can Install [**Scriptis**](https://github.com/WeBankFinTech/Scriptis) separately. For detailed installation tutorial, please refer to its corresponding installation and deployment documents.

## 2.1. Use Scriptis to execute scripts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Currently Scriptis supports submitting a variety of task types to Linkis, including Spark SQL, Hive SQL, Scala, PythonSpark, etc. In order to meet the needs of data analysis, the left side of Scriptis, Provides viewing user workspace information, user database and table information, user-defined functions, and HDFS directories. It also supports uploading and downloading, result set exporting and other functions. Scriptis is very simple to use Linkis, you can easily write scripts in the edit bar, and submit them to Linkis to run.
![Scriptis uses Linkis](/Images/EngineUsage/sparksql-run.png)

## 2.2. Scriptis Management Console

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis provides an interface for resource configuration and management. If you want to configure and manage task resources, you can set it on the Scriptis management console interface, including queue settings and resource configuration , The number of engine instances, etc. Through the management console, you can easily configure the resources for submitting tasks to Linkis, making it more convenient and faster.
![Scriptis uses Linkis](/Images/EngineUsage/queue-set.png)

## 3. DataSphere Studio uses Linkis

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[**DataSphere Studio**](https://github.com/WeBankFinTech/DataSphereStudio), referred to as DSS, is an open source part of WeBank’s big data platform Station-type data analysis and processing platform, the DSS interactive analysis module integrates Scriptis. Using DSS for interactive analysis is the same as Scriptis. In addition to providing the basic functions of Scriptis, DSS provides and integrates richer and more powerful data analysis functions, including Data services for data extraction, workflow for developing reports, visual analysis software Visualis, etc. Due to native support, DSS is currently the most integrated software with Linkis. If you want to use the complete Linkis function, it is recommended to use DSS with Linkis.
![DSS Run Workflow](/Images/EngineUsage/workflow.png)