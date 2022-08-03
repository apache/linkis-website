---
title: Python Engine
sidebar_position: 2
---

## 1 Use of Python Engine

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Many users of the current big data platform choose to use python for data analysis, so Linkis natively implements the python execution engine.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users use the python engine provided by Linkis to submit a stand-alone python program to the server and execute it, and the python engine will display the executed log and printed results to the user Check.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you want to use the Linkis system to execute the python program, you need to download the Linkis release installation package and configure, install and start the specified microservice.

### 1.1 Environment variable configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The execution of Python in principle does not need to specify the environment variables of the hadoop ecosystem. If you want to store the result set in hdfs, you also need to configure HADOOP_HOME and HADOOP_CONF_DIR Configuration information.

You can set it in the linkis.properties configuration file in the /home/${USER}/.bash_rc or linkis-ujes-spark-enginemanager/conf directory.

```properties
HADOOP_HOME=${Real hadoop configuration directory}
HADOOP_CONF_DIR=${Real hadoop installation directory}
```

### 1.2 Dependent service startup

The startup of the Python engine requires the following Linkis microservices:

-1), Eureka: Used for service registration and discovery.
-2), Linkis-gateway: used for user request forwarding.
-3) Linkis-publicService: Provides basic functions such as persistence and udf.
-4) Linkis-ResourceManager: Provides Linkis resource management functions.

### 1.3 Custom parameter configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis has opened an interface, allowing users to set the relevant parameters of the engine, so as to more freely configure according to the cluster information.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For example, how many engines can be started by an engine manager or how much memory can be used in total, etc.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users can do this by setting the parameters in the following table:

| Parameter name | Reference value | Description |
| ------------ | ------------ | ------------ |
| wds.linkis.enginemanager.memory.max | 40G| Used to specify the total memory of the client of all engines started by hiveEM |
| wds.linkis.enginemanager.cores.max | 20 | Used to specify the total number of CPU cores of the clients of all engines started by hiveEM |
| wds.linkis.enginemanager.engine.instances.max | 10 | Used to specify the number of engines that hiveEM can start |

### 1.4 Determination of python execution path

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The python environment in the user cluster is very different. Liniks recommends that users use the anaconda release version.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In addition, users can specify the path of the python interpreter in the configuration file linkis-engine.properties of pythonEngineManger. The specific method is

```
python.script=$(Real python parser path, such as /usr/bin/python)
```

### 1.5 Front-end deployment

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After the above microservices are successfully launched and deployed, users need to submit their python code through a web browser. You can deploy another open source front-end product [Scriptis](https://github.com/WeBankFinTech/Scriptis/blob/master/docs/zh_CN/ch1/%E5%89%8D%E5%8F%B0% E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3.md), this product allows users to edit and submit execution codes on web pages, and receive the background in real time Information given.

### 1.6 running examples

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the web browser, open the address of scriptis, the user can create a new python script in the workspace on the left column and write the script code in the script editing area, and the writing is complete After that, click Run to submit your code to the Linkis background for execution. After submission, the background will push the log, progress, status and other information to the user in real time via websocket. And after finishing, show the result to the user.

![Python running effect chart 1](../images/ch6/python_run1.png)<br/>
Figure 2 Python running effect figure 2

![Python running effect chart 1](../images/ch6/python_run2.png)<br/>
Figure 3 Spark running effect Figure 2

## 2 Implementation of Python engine

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The implementation of the Linkis-Python execution engine is based on [How to implement a new engine](/development/new-engine-conn.md) to implement the Entrance, EngineManager and Engine three The necessary interface of the module.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The implementation of the execution module uses the py4j framework to allow the python executor to interact with the JVM. After the user submits the code, the JVM submits the code to the py4j framework The python interpreter executes and gets the output or error message from the python process.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Specifically, you can view the python.py source code in the python execution source code. There are several python methods defined by Linkis for process interaction.


## 3 Future goals

1. The deployment method is simpler, try to use the containerized method.
2. Support the submission of spark jar package
3. Better support the submission of spark's yarn-cluster mode.