---
title: Spark Engine
sidebar_position: 2
---

## 1 Spark Engine Use
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis's Spark execution engine provides users with the ability to submit spark jobs to the Yarn cluster with feedback logs, progress, status and resultsets.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Spark execution engine supports user submissions of sparksql, pyspark and scala types of assignments, using the yarn-client method as default and maintaining one or more spark sessions for the user in the form of engine.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After the user downloads the Linkis release package and unpack installation, a number of specific services need to be correctly started to perform the spark job.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The following are concrete steps.

### Environment Variable Configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Spark engine relies on environmental variables: HADOOP_HOME, HADOOP_CONF_DIR, HIE_CONF_DIR, SARK_HOME, and SPARK_CONF_DIR.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Before starting SparkEngineManager's microservices, make sure the above environment variables are set.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you are not set, set first in the linkis.properties configuration file in /home/${USER}/.bash_rc or linkis-ujes-spark-enginemanager/conf.As shown below
```properties
  HADOOP_HOME=${真实的hadoop home}
  HADOOP_CONF_DIR=${真实的hadoop配置目录}
  HIVE_CONF_DIR=${真实的hive配置目录}
  SPARK_CONF_DIR_DIR_${真实的hive配置目录}
  SPARK_HOME=${真实的spark安装目录 }
```

### 1.2 Start Dependency Service

Start of the Spark engine, depends on the following Linkis microservices:

- 1), Eureka: for service registration for discovery.
- 2), Linkis-gateway: for user request forwarding.
- 3), Linkis-publicService: provision of basic functions such as persistence, udf and more.
- 4), Linkis-ResourceManager: Provides Linkis Resource Management features.

### 1.3 Custom Parameter Configuration

Before starting spark's related microservices, users can set the relevant configuration parameters for the spark engine.

Linkis, taking into account the user desire to be freer to set the parameters, provides many configuration parameters.

The following table contains some commonly used parameters, and the Spark engine supports the configuration of more parameters for better performance, such as you have the best needs and welcome reading the pamphlets.

Users can configure these parameters in linkis.properties.


| Parameter Name                                | Ref Value | Note                                                                         |
| --------------------------------------------- | --------- | ---------------------------------------------------------------------------- |
| wds.linkis.enginemanager.memori.max           | 40G       | Total memory for clients who specify all engines started by sparkEM          |
| wds.linkis.enginemanager.cores.max            | 20        | Total CPU nucleus used to specify clients for all engines started by sparkEM |
| wds.linkis.enginemanager.engine.instances.max | 10        | Specify the number of engines that sparkEM can start                         |




### 1.4 Frontend deployment

After the above microservice deployment is launched, users who need to submit their own sparkSQL, pyspark or Scala code via a webbrowser can deploy a front-end product[Scriptis](https://github.com/WeBankFinTech/Scriptis/blob/master/docs/zh_CN/ch1/%E5%89%8D%E5%8F%B0%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3.md)that allows users to edit, submit code on the webpage and receive background information in real time.

In addition, Scriptis has an admin function to configure the startup parameters of the spark engine.

### 1.5 spark start parameter configuration

The Scriptis page provides us with configuration pages that can set up startup parameters, which can set the memory size of driver, as well as the number of executors and memory and CPU nuclear points, which will be read to start a spark engine.

![Spark start parameter configuration chart](../images/ch6/spark_conf.png)<br/> Figure 1 Config UI

### 1.6 Run Instances

In the web browser, open the scriptis address, users can create sql, scala, or pyspark scripts in the workspace on the left side. Once the sql, scala or pyspark script is written in the scripting area. When the scripting area is written, then they can submit their code to the Linkis background for execution. Once submitted, the back office will give logs, progress, status, etc. in real time.and once finished, show the results to users.

![Spark Run Effect Chart 1](../images/ch6/spark_run1.png)<br/>
<center>
  Figure 2 Spark Function chart 1
</center>

![Spark Run Effect Chart 2](../images/ch6/spark_run2.png)<br/> Figure 3 Spark Function chart 2

![Spark Run Effect Chart 3](../images/ch6/spark_run3.png)<br/> Figure 4 Spark Function chart 3

## How the Spark engine will be implemented

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The implementation of the Linkis-Python execution engine is a necessary interface for Entrance, EngineManager, and Engineering modules based on[how to implement a new engine](/development/new_engine_conn.md)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the EngineManager module, we have chosen to start the java process using the spark-submit command, so Linkis has adopted a build method to rewrite ProcessEngineBuilder, integrating the startup parameters of the user configured spark with the spark-submit command, forming a command to start the spark engine, and then execute the command.

In the Engineering module, Linkis defaults to the yarn-client mode to start spark sessions.Spark's Driver process will exist as a Linkis engine and will be owned by startup users.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After retrieving the SparkSession instance we can get the SparkContext instance to the Driver process via the API provided by spark, the SparkContext instance we can make progress calculations, and the user's task can be canceled.

The Spark execution engine now supports three types of spark assignments, sparksql, scala and pyspark.Three SparkExecutor implementations were implemented in the code in the Engineering module, sql was submitted using SparkSession, scala was submitted in consolide, and pyspark was submitted in py4j.

## 3 spark version matching

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The releases of Linkis0.5.0 and Linkis0.6.0 are only supported for spark2.1.0.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starting with Linkis0.7.0, spark started matching spark2.4+.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Of course, if the spark version used in your cluster does not fit with our supported version, you may need to change the spark.version variable in top pom.xml, and then repackage the package.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you have problems starting up you can ask us in a group of questions.

![Microletter & QQ Group](../images/ch6/group.png)<br/>

## 4 Future objectives

- 1. Deployment is simpler and attempts to use containerization.
- 2. support the submission of the spark jar package
- 3. Better support the yarn-cluster submission of spark.
