---
title: Reference Guide for Production Deployment
sidebar_position: 4
---

### 1 Introduction

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis has been operating steadily for more than two years on the Big Data Production platform of the Micro Bank, and developers have drawn up a set of guidelines for the deployment of Linkis production to enable Linkis to maximize its performance on a stable operating basis, while saving server resources and reducing the cost of use.The guide includes the choice of deployment methods and the configuration of parameters. Finally, Linkis has long been tested in the test environment, and we will present our stress observations and experiences in chapter IV.

### 2 Deployment option selection

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis's one-machine deployment is simple, but cannot be used for the production environment, as too many processes on the same server can overpressure the server.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The choice of deployment options is linked to the size of the company, user's habit, clustering and the number of people used simultaneously. In general, we use Linkis together with the number of people and the user preference for the implementation engine as a basis for the choice of deployment modalities.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is detailed below by using the number of people at the same time, assuming that the user prefers spark to have the highest number of spark, followed by a recommendation for 64G or more of the server host.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**On the machine for the installation of EngineManager, the memory load of the machine will be higher and the load of other types of microservices will be relatively low because the user engine process will be initiated.**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**We generally recommend setting aside around 20G on the EMM installation server for use by Linux systems, EM's own processes, and other processes, such as 128G memory servers, except 20G memory and 100G memory for engine startup processes.For example, if a Spark Driver is a 4G memory, the server can start up up to 25 spark engines.**

Total Use Resources Calculation formula: Linkis Use Total Resources = Total Memory + Total Kernel =

Online counts\* (Driver or Hive client memory) + Online counts\* (Driver or Hive client nucleus)

For example, using 50 people at the same time, Spark's Driver memory 2G, Hive Client memory 2G, each using two nucleus, then 50 \* 2G + 50\* 2 core = 100G memory + 100 CPU nucleus

**The agreement before the parameter configuration (required):**

**Parameters are typically configured in linkis.properties of the conff directory in the microservice installation directory, in the form of key=value, such as wds.linkis.enginemanager.cores.max=20.The only exception is the configuration of the engine microservices that needs to be configured in linkis-engine.properties.**

**2. After configuration of parameters, restart of the microservice is required.Once the engine configuration of the engine, after the engine manager on the page has been key, the engine can be activated again**

A reference deployment programme is provided below.

#### 2.1 Simultaneous usage 10-50

**1). Server configuration optimally recommended**:4 servers, named S1, S2, S3, S4

| Service Name                  | Deploy selection | Note                                                                                                         |
| ----------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| Spark EngineManger            | S1               | SparkEM needs a sole server because it is assumed that the user prefers spark (this can be modified if hive) |
| SparkEntrance                 | S2               |                                                                                                              |
| HiveEngineManager             | S3               |                                                                                                              |
| HiveEntrance                  | S2               |                                                                                                              |
| PythonEngineManager           | S3               |                                                                                                              |
| PythonEntrance                | S2               |                                                                                                              |
| Other (Eureka, gateway, etc.) | S4               | If this machine is overstretched, one more server can be added and service deployed separately               |

**2. Server configuration minimum: 2 servers**

**Parameter configuration**

   If required, configuration needs to be made in the linkis.properties and linkis-engine.properties in the conf directory under the microservice installation directory.Parameter configuration is generally divided into Entrance and EngineManager parameters.

(a) Entrance Microservice

| Parameter Name                                   | Parameter action                                                              | Recommended Parameter Value |
| ------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------- |
| wds.linkis.rpc.receiver.asyn.queue.size.max      | Specifies the queue size of RPC messages received by the central microservice | 2000                        |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance Microservice RPC Consumption Thread Pool Size                | 100                         |

(b) Engineer Microservice

**Note: Linkis defines the concept of resource protection, which is intended to set aside a certain amount of resources and which EME will not exhaust its maximum resources to activate the protective machine.**

| Parameter Name                                       | Parameter action                                                                                  | Recommended Parameter Value                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| wds.linkis.enginemanager.memori.max                  | Total memory used to specify all engines started by this EMM process                              | 40G (64) or 100G (128)                                  |
| wds.linkis.enginemanager.cores.max                   | Use to specify the total number of all engines started by this EMM process                        | 20                                                      |
| wds.linkis.enginemanager.engine.instances.max        | The total number of engines used to specify the number of all engines started by this EMM process | 20                                                      |
| wds.linkis.enginemanager.protected.memory            | Used to specify the memory of the EMM process for protection                                      | 2G (meaning maximum use of 38(40-2) G) G)               |
| wds.linkis.enginemanager. protected.cores.max        | Use to specify the number of nucleus that this EMM process will use to protect                    | 2 (implying maximum use of 18 (20-2) nuclear numbers)   |
| wds.linkis.enginemanager. protected.engine.instances | Number of engines to be used to protect the EMM process                                           | 1 (means a maximum of 19 (20-1) engines can be started) |

#### 2.2 Number of simultaneous users 50-100

**1). Server configuration recommendation**:7 servers, named S1, S2.S7

| Service Name                       | Deploy selection | Note                                                  |
| ---------------------------------- | ---------------- | ----------------------------------------------------- |
| Spark EngineManger                 | S1, S2           |                                                       |
| SparkEntrance                      | S5               |                                                       |
| HiveEngineManager                  | S3, S4           |                                                       |
| HiveEntrance                       | S5               |                                                       |
| PythonEngineManager                | S4               |                                                       |
| PythonEntrance                     | S4               |                                                       |
| Eureka, Gateway, RM                | S6               | Eureka and RM require high availability of deployment |
| Publicservice,RM,Datasource,Eureka | S7               | Eureka and RM require high availability of deployment |

**2). Server configuration minimum configuration**:4 servers

**Parameter configuration**

(a) Entrance Microservice

| Parameter Name                                   | Parameter action                                                              | Recommended Parameter Value |
| ------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------- |
| wds.linkis.rpc.receiver.asyn.queue.size.max      | Specifies the queue size of RPC messages received by the central microservice | 3000                        |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance Microservice RPC Consumption Thread Pool Size                | 120                         |

(b) Engineer Microservice

| Parameter Name                                       | Parameter action                                                                                  | Recommended Parameter Value                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| wds.linkis.enginemanager.memori.max                  | Total memory used to specify all engines started by this EMM process                              | 40G (64) or 100G (128)                                  |
| wds.linkis.enginemanager.cores.max                   | Use to specify the total number of all engines started by this EMM process                        | 20                                                      |
| wds.linkis.enginemanager.engine.instances.max        | The total number of engines used to specify the number of all engines started by this EMM process | 20                                                      |
| wds.linkis.enginemanager.protected.memory            | Used to specify the memory of the EMM process for protection                                      | 2G (meaning maximum use of 38(40-2) G) G)               |
| wds.linkis.enginemanager. protected.cores.max        | Use to specify the number of nucleus that this EMM process will use to protect                    | 2 (implying maximum use of 18 (20-2) nuclear numbers)   |
| wds.linkis.enginemanager. protected.engine.instances | Number of engines to be used to protect the EMM process                                           | 1 (means a maximum of 19 (20-1) engines can be started) |

#### 2.3 Number of simultaneous users 100 - 300

**1). Server configuration recommendation**:11 servers, named S1, S2.S11

| Service Name                       | Deploy selection | Note                                                  |
| ---------------------------------- | ---------------- | ----------------------------------------------------- |
| Spark EngineManger                 | S1, S2, S3, S4   |                                                       |
| SparkEntrance                      | S8               |                                                       |
| HiveEngineManager                  | S5, S6, S7       |                                                       |
| HiveEntrance                       | S8               |                                                       |
| PythonEngineManager                | S9               |                                                       |
| PythonEntrance                     | S9               |                                                       |
| Eureka, Gateway, RM                | S10              | Eureka and RM require high availability of deployment |
| Publicservice,RM,Datasource,Eureka | s11              | Eureka and RM require high availability of deployment |

**2). Server configuration minimum configuration**:6 servers

**Parameter configuration**

(a) Entrance Microservice

| Parameter Name                                   | Parameter action                                                              | Recommended Parameter Value |
| ------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------- |
| wds.linkis.rpc.receiver.asyn.queue.size.max      | Specifies the queue size of RPC messages received by the central microservice | 4000                        |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance Microservice RPC Consumption Thread Pool Size                | 150                         |

(b) Engineer Microservice

| Parameter Name                                       | Parameter action                                                                                  | Recommended Parameter Value                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| wds.linkis.enginemanager.memori.max                  | Total memory used to specify all engines started by this EMM process                              | 40G (64) or 100G (128)                                  |
| wds.linkis.enginemanager.cores.max                   | Use to specify the total number of all engines started by this EMM process                        | 20                                                      |
| wds.linkis.enginemanager.engine.instances.max        | The total number of engines used to specify the number of all engines started by this EMM process | 20                                                      |
| wds.linkis.enginemanager.protected.memory            | Used to specify the memory of the EMM process for protection                                      | 2G (meaning maximum use of 38(40-2) G) G)               |
| wds.linkis.enginemanager. protected.cores.max        | Use to specify the number of nucleus that this EMM process will use to protect                    | 2 (implying maximum use of 18 (20-2) nuclear numbers)   |
| wds.linkis.enginemanager. protected.engine.instances | Number of engines to be used to protect the EMM process                                           | 1 (means a maximum of 19 (20-1) engines can be started) |

#### 2.4 Number of simultaneous users 300-500

**1). Server configuration recommended**15 servers, named S1, S2, S3, S4

| Service Name                       | Deploy selection           | Note                                                  |
| ---------------------------------- | -------------------------- | ----------------------------------------------------- |
| Spark EngineManger                 | S1, S2, S3, S4, S5, S6, S7 |                                                       |
| SparkEntrance                      | S12                        |                                                       |
| HiveEngineManager                  | S8, S9, S10, S11           |                                                       |
| HiveEntrance                       | S12                        |                                                       |
| PythonEngineManager                | S13                        |                                                       |
| PythonEntrance                     | S13                        |                                                       |
| Eureka, Gateway, RM                | S14                        | Eureka and RM require high availability of deployment |
| Publicservice,RM,Datasource,Eureka | s15                        | Eureka and RM require high availability of deployment |

**2). Server configuration minimum configuration**:10 servers

**Parameter configuration**

(a) Entrance Microservice

| Parameter Name                                   | Parameter action                                                              | Recommended Parameter Value |
| ------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------- |
| wds.linkis.rpc.receiver.asyn.queue.size.max      | Specifies the queue size of RPC messages received by the central microservice | 5000                        |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance Microservice RPC Consumption Thread Pool Size                | 150                         |

(b) Engineer Microservice

| Parameter Name                                       | Parameter action                                                                                  | Recommended Parameter Value                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| wds.linkis.enginemanager.memori.max                  | Total memory used to specify all engines started by this EMM process                              | 40G (64) or 100G (128)                                  |
| wds.linkis.enginemanager.cores.max                   | Use to specify the total number of all engines started by this EMM process                        | 20                                                      |
| wds.linkis.enginemanager.engine.instances.max        | The total number of engines used to specify the number of all engines started by this EMM process | 20                                                      |
| wds.linkis.enginemanager.protected.memory            | Used to specify the memory of the EMM process for protection                                      | 2G (meaning maximum use of 38(40-2) G) G)               |
| wds.linkis.enginemanager. protected.cores.max        | Use to specify the number of nucleus that this EMM process will use to protect                    | 2 (implying maximum use of 18 (20-2) nuclear numbers)   |
| wds.linkis.enginemanager. protected.engine.instances | Number of engines to be used to protect the EMM process                                           | 1 (means a maximum of 19 (20-1) engines can be started) |

#### 2.5 Users more than 500

**1). Server configuration recommendation**:25 servers, named S1, S2.S19, S25

| Service Name       | Deploy selection           | Note |
| ------------------ | -------------------------- | ---- |
| Spark EngineManger | S1, S2, S3, S4, S5, S6, S7 |      |
 S8,S9,S10 |   | | SparkEntrance | S17 |   | | HiveEngineManager | S11,S12,S13,S14,S15, S16 |   | | HiveEntrance | S17 |   | | PythonEngineManager | S18,S19 |   | | PythonEntrance | S20 |   | | Eureka, RM | S21 | Eureka和RM需要高可用部署 | | RM, ,Eureka | S22 | Eureka和RM需要高可用部署 | | Eureka,PublicService | S23 | Eureka和RM需要高可用部署 | | Gateway, Datasource | S24 |   |

**2). Server minimum configuration**:15 servers

**Parameter configuration**

(a) Entrance Microservice

| Parameter Name                                   | Parameter action                                                              | Recommended Parameter Value |
| ------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------- |
| wds.linkis.rpc.receiver.asyn.queue.size.max      | Specifies the queue size of RPC messages received by the central microservice | 5000                        |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | Specify Entrance Microservice RPC Consumption Thread Pool Size                | 200                         |

(b) Engineer Microservice

| Parameter Name                                       | Parameter action                                                                                  | Recommended Parameter Value                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| wds.linkis.enginemanager.memori.max                  | Total memory used to specify all engines started by this EMM process                              | 40G (64) or 100G (128)                                  |
| wds.linkis.enginemanager.cores.max                   | Use to specify the total number of all engines started by this EMM process                        | 20                                                      |
| wds.linkis.enginemanager.engine.instances.max        | The total number of engines used to specify the number of all engines started by this EMM process | 20                                                      |
| wds.linkis.enginemanager.protected.memory            | Used to specify the memory of the EMM process for protection                                      | 2G (meaning maximum use of 38(40-2) G) G)               |
| wds.linkis.enginemanager. protected.cores.max        | Use to specify the number of nucleus that this EMM process will use to protect                    | 2 (implying maximum use of 18 (20-2) nuclear numbers)   |
| wds.linkis.enginemanager. protected.engine.instances | Number of engines to be used to protect the EMM process                                           | 1 (means a maximum of 19 (20-1) engines can be started) |

### 3 Other Common Parameters Configuration

In addition to the microservices of Entrance and EngineManager, there are other microservices that are configured by their own parameters.

#### 3.1 PublicService Custom Configuration

The public Service microservice carries a variety of auxiliary features run by Linkis, including file editing saving, results collection reading, etc.

| Parameter Name                                  | Parameter action                                                 | Recommended Parameter Value                   |
| ----------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------- |
| wds.linkis.workspace.filesystem.get.timeout     | Specify timeout for fetching filesystem                          | 10,000 (in ms)                                |
| wds.linkis.workspace.resultset.download.maxsize | Maximum number of lines to use to specify the download resultset | 5000 (maximum download) or -1 (full download) |

#### 3.2 Engineering Microservice

Microservices in the engine class are readily available and include spark, hive and python engines. The configuration parameters for microservices in the engine class need to be modified in linkis-engine.properties below the conf of EngineManager's installation directory.

| Parameter Name                  | Parameter action                                          | Recommended Parameter Value                                                                              |
| ------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| wds.linkis.engine.max.free.time | Used to specify how long an engine will be killed if idle | 3h (meaning that an engine will be automatically killed when it does not perform a task for three hours) |




### 4 Summary

Linkis's deployment programme and mode of use are closely intertwined and the use of people is the greatest influence. In order to allow users to use them comfortably while reducing the cost of cluster servers, it will be necessary to deploy developers to try and receive user feedback. If the deployed programme is not appropriate, changes to the deployment programme need to be properly implemented in due course.
