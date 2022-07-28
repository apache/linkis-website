---
title: Spark Engine
sidebar_position: 2
---

## 1 Use of Spark Engine
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis's Spark execution engine provides users with the ability to submit spark jobs to the Yarn cluster and feedback logs, progress, status, and result sets.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spark execution engine supports users to submit three types of jobs: sparksql, pyspark, and scala. By default, the job is submitted by yarn-client, and the engine is used to maintain users One or more spark sessions.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After the user downloads the Linkis release package and unzips and installs it, a number of specific services need to be started correctly before it can be used to execute spark operations.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here are the specific steps.

### 1.1 Environment variable configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Environmental variables that the Spark engine depends on: HADOOP_HOME, HADOOP_CONF_DIR, HIVE_CONF_DIR, SPARK_HOME, and SPARK_CONF_DIR.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Before starting the SparkEngineManager microservice, please make sure that the above environment variables have been set.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you have not set it, please first download linkis.properties in the /home/${USER}/.bash_rc or linkis-ujes-spark-enginemanager/conf directory Set in the configuration file. As shown below
```properties
  HADOOP_HOME=${real hadoop home}
  HADOOP_CONF_DIR=${Real hadoop configuration directory}
  HIVE_CONF_DIR=${Real hive configuration directory}
  SPARK_CONF_DIR=${Real hive configuration directory}
  SPARK_HOME=${Real spark installation directory}
```

### 1.2 Start dependent services

The startup of the Spark engine requires the following Linkis microservices:

-1), Eureka: Used for service registration and discovery.
-2), Linkis-gateway: used for user request forwarding.
-3) Linkis-publicService: Provides basic functions such as persistence and udf.
-4) Linkis-ResourceManager: Provides Linkis resource management functions.

### 1.3 Custom parameter configuration

Before starting spark related microservices, users can set related configuration parameters about the spark engine.

Considering that users want to be able to set parameters more freely, Linkis provides many configuration parameters.

The following table has some commonly used parameters. The Spark engine supports configuring more parameters for better performance. If you have tuning needs, welcome to read the tuning manual.

Users can configure these parameters in linkis.properties.


| Parameter name | Reference value | Description |
| ------------ | ------------ | ------------ |
| wds.linkis.enginemanager.memory.max | 40G| Used to specify the total memory of the client of all engines started by sparkEM |
| wds.linkis.enginemanager.cores.max | 20 | Used to specify the total number of CPU cores of the client for all engines started by sparkEM |
| wds.linkis.enginemanager.engine.instances.max | 10 | Used to specify the number of engines that sparkEM can start |




### 1.4 Front-end deployment

After the above microservice deployment is successfully started, if users need to submit their own sparkSQL, pyspark or Scala code through a web browser, they can deploy another open source front-end product of Weizhong [Scriptis](https://github.com) /WeBankFinTech/Scriptis/blob/master/docs/zh_CN/ch1/%E5%89%8D%E5%8F%B0%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1% A3.md), this product allows users to edit and submit codes on web pages, and receive information from the background in real time.

In addition, Scriptis also has a management console function for configuring the startup parameters of the spark engine.

### 1.5 spark startup parameter configuration

The Scriptis page provides us with a configuration page where we can set startup parameters. The memory size of the Driver, the number of executors, and the number of memory and CPU cores can be set. These parameters will be read and used to start a spark engine.

![Spark startup parameter configuration diagram](../images/ch6/spark_conf.png)<br/>
Figure 1 Management console configuration interface

### 1.6 Running examples

In the web browser, open the scriptis address, and the user can create a new sql, scala or pyspark script in the workspace on the left column. After writing the script code in the script editing area, click Run to submit your code to Linkis Execute in the background. After submission, the background will push the log, progress, status and other information to the user in real time through websocket. And after finishing, show the result to the user.

![Spark running effect chart 1](../images/ch6/spark_run1.png)<br/>
<center>Figure 2 Spark running effect Figure 1</center>

![Spark running effect chart 2](../images/ch6/spark_run2.png)<br/>
Figure 3 Spark running effect Figure 2

![Spark running effect chart 3](../images/ch6/spark_run3.png)<br/>
Figure 4 Spark running effect Figure 3

## 2 How the Spark engine is implemented

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The implementation of the Linkis-Python execution engine is based on [How to implement a new engine](/development/new-engine-conn.md) to implement the Entrance, EngineManager and Engine three The necessary interface of the module.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the EngineManager module, we chose to use the spark-submit command to start the java process, so Linkis took the rewrite of ProcessEngineBuilder's build method to configure the spark The startup parameters of is integrated with the spark-submit command to form a command to start the spark engine, and then the command is executed.

In the Engine module, Linkis uses the yarn-client mode by default to start spark sessions. Spark's Driver process will exist in the form of a Linkis engine and owned by the user who starts it.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After obtaining the SparkSession instance, the SparkContext instance of the Driver process can be obtained through the API provided by Spark. Through the SparkContext instance, we can calculate and obtain the progress. You can cancel the user's task.

Spark execution engine now supports three types of spark jobs, sparksql, scala and pyspark. The code in the Engine module implements three SparkExecutors to execute separately, SQL is submitted using SparkSession, scala is submitted using Console, and pyspark is submitted using py4j.

## 3 Spark version adaptation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The release version of Linkis0.5.0 and Linkis0.6.0 only supports spark2.1.0.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starting from Linkis0.7.0, spark began to adapt to spark2.4+.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Of course, if the spark version used in your cluster is not compatible with our supported version, you may need to change the spark.version variable in the top-level pom.xml , And then recompile and package.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you encounter problems starting up and running, you can join a group to consult us.

![WeChat group](../images/ch6/group.png)<br/>

## 4 Future goals

-1. The deployment method is simpler, try to use the containerized method.
-2. Support the submission of spark jar package
-3. Better support for spark's yarn-cluster submission.