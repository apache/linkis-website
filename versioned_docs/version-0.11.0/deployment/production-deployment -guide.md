---
title: Production Deployment Reference Guide
sidebar_position: 4
---

### 1 Introduction

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis has been running stably on the WeBank big data production platform for more than two years. The development and operation personnel have summarized a set of Linkis production deployment guidelines to Let Linkis exert its maximum performance on the basis of stable operation, while also saving server resources and reducing usage costs. The guide includes two major categories: deployment method selection and parameter configuration. Finally, Linkis has also been tested in the test environment for a long time. We will give our stress test practice and experience in Chapter 4.

### 2 Deployment plan selection

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis's stand-alone deployment is simple, but it cannot be used in a production environment, because too many processes on the same server will make the server too stressful.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The choice of deployment plan is related to the company’s user scale, user habits, and the number of concurrent users in the cluster. Generally speaking, we will use Linkis At the same time, the number of users and the user's preference for the execution engine are used to make the choice based on the deployment method.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The following is a detailed description of the number of simultaneous users. Assuming that users prefer spark the most, hive is the second, and it is recommended that the server host memory is 64G or more.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**On the machine where EngineManager is installed, because the user's engine process will be started, the machine's memory load will be relatively high, and other types of microservices will affect the machine The load is relatively low. **

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**We generally recommend to reserve about 20G on the server where EM is installed for use by the Linux system, EM's own process and other processes, such as 128G memory For the server, after removing the 20G memory, there is still 100G of memory that can be used to start the engine process. For example, if a Spark Driver has 4G memory, then the server can start up to 25 spark engines. **

The formula for calculating the total resources used: Total resources used by Linkis = total memory + total number of cores =

Number of people online at the same time \* (Driver or Hive client memory) + number of people online at the same time \* (Driver or Hive client cores)

For example, if there are 50 people using at the same time, Spark's Driver memory is 2G, Hive Client memory is 2G, and each engine uses two cores, then it is 50 \* 2G + 50 \* 2 cores = 100G memory + 100 CPU cores

**Convention before parameter configuration (must see):**

**1. The parameters are generally configured in linkis.properties of the conf directory in the microservice installation directory, and configured in the form of key=value, such as wds.linkis.enginemanager.cores.max=20. The only exception is that the configuration of engine microservices needs to be configured in linkis-engine.properties. **

**2. After the parameter configuration, the microservice needs to be restarted to take effect. After the engine parameter configuration, after the engine manager of the page is killed, restart the engine to take effect**

A reference deployment plan is provided below.

#### 2.1 The number of simultaneous users 10-50

**1). The best recommendation for server configuration**: 4 servers, named S1, S2, S3, S4

| Service Name | Deployment Selection | Description |
| --- | --- | --- |
| SparkEngineManger | S1 | SparkEM requires an exclusive server, because it is assumed that the user most prefers spark (if hive is preferred, it can be modified) |
| SparkEntrance | S2 | |
| HiveEngineManager | S3 | |
| HiveEntrance | S2 | |
| PythonEngineManager | S3 | |
| PythonEntrance | S2 | |
| Others (Eureka, gateway, etc.) | S4 | If this machine is under too much pressure, you can add another server to deploy services separately |

**2). Minimum server configuration: 2 servers**

**3). Parameter configuration**

   If you need to do this, you need to configure it in linkis.properties and linkis-engine.properties in the conf directory under the microservice installation directory. Parameter configuration is generally divided into two parameter types, Entrance and EngineManager.

a) Entrance microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.rpc.receiver.asyn.queue.size.max | Specify the queue size of RPC messages received by the entrance microservice | 2000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance microservice RPC consumption thread pool size | 100 |

b) EngineManager microservice

**Note: Linkis defines the concept of protecting resources. The purpose of protecting resources is to reserve a certain amount of resources. EM will not use up the maximum resources and activate the role of protecting the machine. **

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | Used to specify the total memory of all engines started by the EM process | 40G (64) or 100G (128) |
| wds.linkis.enginemanager.cores.max | Used to specify the total number of cores of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.engine.instances.max | Used to specify the total number of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.protected.memory | Used to specify the memory used by the EM process for protection | 2G (meaning that up to 38 (40-2) G of memory can be used) |
| wds.linkis.enginemanager.protected.cores.max | Used to specify the number of cores used for protection by the EM process | 2 (meaning that up to 18 (20-2) cores can be used) |
| wds.linkis.enginemanager.protected.engine.instances | Used to specify the number of engines used for protection by the EM process | 1 (meaning that up to 19 (20-1) engines can be started) |

#### 2.2 Number of concurrent users 50-100

**1). Recommended server configuration**: 7 servers, named S1, S2...S7

| Service Name | Deployment Selection | Description |
| --- | --- | --- |
| SparkEngineManger | S1, S2 | |
| SparkEntrance | S5 | |
| HiveEngineManager | S3, S4 | |
| HiveEntrance | S5 | |
| PythonEngineManager | S4 | |
| PythonEntrance | S4 | |
| Eureka, Gateway, RM | S6 | Eureka and RM require high availability deployment |
| PublicService, RM, Datasource, Eureka | S7 | Eureka and RM require high availability deployment |

**2). Minimum server configuration**: 4 servers

**3). Parameter configuration**

a) Entrance microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.rpc.receiver.asyn.queue.size.max | Specify the queue size of RPC messages received by the entrance microservice | 3000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance microservice RPC consumption thread pool size | 120 |

b) EngineManager microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | Used to specify the total memory of all engines started by the EM process | 40G (64) or 100G (128) |
| wds.linkis.enginemanager.cores.max | Used to specify the total number of cores of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.engine.instances.max | Used to specify the total number of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.protected.memory | Used to specify the memory used by the EM process for protection | 2G (meaning that up to 38 (40-2) G of memory can be used) |
| wds.linkis.enginemanager.protected.cores.max | Used to specify the number of cores used for protection by the EM process | 2 (meaning that up to 18 (20-2) cores can be used) |
| wds.linkis.enginemanager.protected.engine.instances | Used to specify the number of engines used for protection by the EM process | 1 (meaning that up to 19 (20-1) engines can be started) |

#### 2.3 Number of simultaneous users 100-300

**1). Recommended server configuration**: 11 servers, named S1, S2...S11

| Service Name | Deployment Selection | Description |
| --- | --- | --- |
| SparkEngineManger | S1, S2, S3, S4 | |
| SparkEntrance | S8 | |
| HiveEngineManager | S5, S6, S7 | |
| HiveEntrance | S8 | |
| PythonEngineManager | S9 | |
| PythonEntrance | S9 | |
| Eureka, Gateway, RM | S10 | Eureka and RM require high availability deployment |
| PublicService, RM, Datasource, Eureka | s11 | Eureka and RM require high availability deployment |

**2). Minimum server configuration**: 6 servers

**3). Parameter configuration**

a) Entrance microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.rpc.receiver.asyn.queue.size.max | Specify the queue size of RPC messages received by the entrance microservice | 4000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance microservice RPC consumption thread pool size | 150 |

b) EngineManager microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | Used to specify the total memory of all engines started by the EM process | 40G (64) or 100G (128) |
| wds.linkis.enginemanager.cores.max | Used to specify the total number of cores of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.engine.instances.max | Used to specify the total number of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.protected.memory | Used to specify the memory used by the EM process for protection | 2G (meaning that up to 38 (40-2) G of memory can be used) |
| wds.linkis.enginemanager.protected.cores.max | Used to specify the number of cores used for protection by the EM process | 2 (meaning that up to 18 (20-2) cores can be used) |
| wds.linkis.enginemanager.protected.engine.instances | Used to specify the number of engines used for protection by the EM process | 1 (meaning that up to 19 (20-1) engines can be started) |

#### 2.4 Number of concurrent users 300-500

**1). Recommended server configuration** 15 servers, named S1, S2, S3, S4

| Service Name | Deployment Selection | Description |
| --- | --- | --- |
| SparkEngineManger | S1, S2, S3, S4, S5, S6, S7 | |
| SparkEntrance | S12 | |
| HiveEngineManager | S8, S9, S10, S11 | |
| HiveEntrance | S12 | |
| PythonEngineManager | S13 | |
| PythonEntrance | S13 | |
| Eureka, Gateway, RM | S14 | Eureka and RM require high availability deployment |
| PublicService, RM, Datasource, Eureka | s15 | Eureka and RM require high availability deployment |

**2). Minimum server configuration**: 10 servers

**3). Parameter configuration**

a) Entrance microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.rpc.receiver.asyn.queue.size.max | Specify the queue size of RPC messages received by the entrance microservice | 5000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance microservice RPC consumption thread pool size | 150 |

b) EngineManager microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | Used to specify the total memory of all engines started by the EM process | 40G (64) or 100G (128) |
| wds.linkis.enginemanager.cores.max | Used to specify the total number of cores of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.engine.instances.max | Used to specify the total number of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.protected.memory | Used to specify the memory used by the EM process for protection | 2G (meaning that up to 38 (40-2) G of memory can be used) |
| wds.linkis.enginemanager.protected.cores.max | Used to specify the number of cores used for protection by the EM process | 2 (meaning that up to 18 (20-2) cores can be used) |
| wds.linkis.enginemanager.protected.engine.instances | Used to specify the number of engines used for protection by the EM process | 1 (meaning that up to 19 (20-1) engines can be started) |

#### 2.5 The number of simultaneous users is more than 500

**1). Recommended server configuration**: 25 servers, named S1, S2.. S19, S25

| Service Name | Deployment Selection | Description |
| --- | --- | --- |
| SparkEngineManger | S1, S2, S3, S4, S5, S6, S7
S8, S9, S10 | |
| SparkEntrance | S17 | |
| HiveEngineManager | S11,S12,S13,S14,S15,
S16 | |
| HiveEntrance | S17 | |
| PythonEngineManager | S18, S19 | |
| PythonEntrance | S20 | |
| Eureka, RM | S21 | Eureka and RM require high availability deployment |
| RM, ,Eureka | S22 | Eureka and RM require high availability deployment |
| Eureka, PublicService | S23 | Eureka and RM require high availability deployment |
| Gateway, Datasource | S24 | |

**2). Minimum server configuration**: 15 servers

**3). Parameter configuration**

a) Entrance microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.rpc.receiver.asyn.queue.size.max | Specify the queue size of RPC messages received by the entrance microservice | 5000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance microservice RPC consumption thread pool size | 200 |

b) EngineManager microservice

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | Used to specify the total memory of all engines started by the EM process | 40G (64) or 100G (128) |
| wds.linkis.enginemanager.cores.max | Used to specify the total number of cores of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.engine.instances.max | Used to specify the total number of all engines started by the EM process | 20 |
| wds.linkis.enginemanager.protected.memory | Used to specify the memory used by the EM process for protection | 2G (meaning that up to 38 (40-2) G of memory can be used) |
| wds.linkis.enginemanager.protected.cores.max | Used to specify the number of cores used for protection by the EM process | 2 (meaning that up to 18 (20-2) cores can be used) |
| wds.linkis.enginemanager.protected.engine.instances | Used to specify the number of engines used for protection by the EM process | 1 (meaning that up to 19 (20-1) engines can be started) |

### 3 Other general parameter configuration

In addition to the two types of microservices, Entrance and EngineManager, Linkis has other microservices that also have their own parameters for configuration.

#### 3.1 PublicService custom configuration

The publicService microservice carries various auxiliary functions run by Linkis, including file editing and saving, and result set reading.

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.workspace.filesystem.get.timeout | Used to specify the timeout time for obtaining the file system | 10000 (unit is ms) |
| wds.linkis.workspace.resultset.download.maxsize | Used to specify the maximum number of rows of the download result set | 5000 (up to 5000 downloads) or -1 (full download) |

#### 3.2 Engine Microservice

Engine microservices are available at any time, including spark, hive and python engines. The configuration parameters of engine microservices need to be modified in linkis-engine.properties under conf in the EngineManager installation directory.

| Parameter name | Parameter function | Suggested parameter value |
| --- | --- | --- |
| wds.linkis.engine.max.free.time | Used to specify how long an engine will be killed if idle | 3h (meaning that an engine will be automatically killed after three hours of not performing a task) |




### 4 Summary

The deployment plan of Linkis is closely related to how it is used. At the same time, the number of users is the biggest influencing factor. In order to enable users to use it comfortably and reduce the cost of cluster servers, it is necessary for operation and maintenance developers to try and listen to user feedback. If it has been deployed The plan is inappropriate, and the deployment plan needs to be changed in a timely and appropriate manner.