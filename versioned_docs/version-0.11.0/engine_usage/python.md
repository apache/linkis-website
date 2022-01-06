---
title: Python Engine
sidebar_position: 2
---

## 1 Python Engine Use

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Many users of the large data platform now choose to use python for data analysis, so Linkis implements the python execution engine.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Using the python engine provided by Linkis, users can submit a single-machine python program to the server and execute that the python engine shows the executed logs and printed results to users.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To implement the python program using Linkis, you need to download Linkis's release package and configure, install and start the specified microservices.

### Environment Variable Configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Python implementation is, in principle, not required to specify environmental variables in the hadoops. If you want to store the results set into hdfs, configuration information for HADOOP_HOME, and HADOOP_CONF_DIR.

You can set it in the linkis.properties configuration file in /home/${USER}/.bash_rc or linkis-ujes-spark-enginemanager/conf.

```properties
HADOOP_HOME=${真实的hadoop配置目录}
HADOOP_CONF_DIR=${真实的hadoop安装目录}
```

### 1.2 Dependency service activation

Launch of the Python engine, depends on the following Linkis microservices:

- 1), Eureka: for service registration for discovery.
- 2), Linkis-gateway: for user request forwarding.
- 3), Linkis-publicService: provision of basic functions such as persistence, udf and more.
- 4), Linkis-ResourceManager: Provides Linkis Resource Management features.

### 1.3 Custom Parameter Configuration

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis opened the interface, allowing users to set the relevant parameters of the engine to configure more freely based on cluster information.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For example, an engine manager can start up more than a few numbers of engines or how many memory can be used in total.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users can set the parameters of the table below:

| Parameter Name                                | Ref Value | Note                                                                     |
| --------------------------------------------- | --------- | ------------------------------------------------------------------------ |
| wds.linkis.enginemanager.memori.max           | 40G       | Total memory used to specify clients for all hiveEM-started engines      |
| wds.linkis.enginemanager.cores.max            | 20        | Total CPU nucleus used to specify clients for all hiveEM-started engines |
| wds.linkis.enginemanager.engine.instances.max | 10        | Specify the number of engines hiveEM can start                           |

### 1.4 python execution path determination

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The python environment in the user cluster is very different, and Links recommend users to use the anaconda release version.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another user can specify the path of python interpreter in the python Engineer's configuration file linkis-engine.properties

```
python.script=${Real python parser path e.g. /usr/bin/python}
```

### 1.5 Frontend deployment

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After the microservice launch started successfully, users need to submit their python code via a webbrowser.可以通过部署配置另一款开源的前端产品[Scriptis](https://github.com/WeBankFinTech/Scriptis/blob/master/docs/zh_CN/ch1/%E5%89%8D%E5%8F%B0%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3.md)，该产品可以让使用者能够在web页面上编辑、提交执行代码，并能够实时的接收后台给的信息。

### 1.6 Run Instances

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the web browser, open the scriptis' address and users can create new python scripts in the workspace on the left side and write scripts in the scripting area, and then click on the scripting area and forward their code to the Linkis background for execution. Once submitted, the background will give logs, progress, status, etc. in real time to the user via websocket.and once finished, show the results to users.

![Python Run Effect Graph 1](../images/ch6/python_run1.png)<br/> Figure 2 Python Run Figure 2

![Python Run Effect Graph 1](../images/ch6/python_run2.png)<br/> Figure 3 Spark Function chart 2

## How the 2 Python Engines can be implemented

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The implementation of the Linkis-Python execution engine is a necessary interface for Entrance, EngineManager, and Engineering modules based on[how to implement a new engine](/development/new_engine_conn.md)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The implementation of the implementation module is based on the py4j framework, whereby the python executor interacts with JVM. When the user submits the code, JVM submits the code to the python interpreter through the py4j framework for implementation and receives output or error information from the python process.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Specifically, you can see the python.python source code in python, which contains several python methods defined by Linkis for process interaction.


## 3 Future objectives

1. Deployment is simpler and attempts to use containerization. 2. support the submission of the spark jar package for 3. Better support for the yarn-cluster submission of spark.
