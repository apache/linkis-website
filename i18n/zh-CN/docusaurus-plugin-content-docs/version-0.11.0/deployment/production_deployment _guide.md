---
title: 生产部署参考指南
sidebar_position: 4
---

### 1 介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis已经在微众银行大数据生产平台稳定运行两年有余，开发运维人员总结出了一套Linkis生产部署的指南，以让Linkis在稳定运行的基础上发挥出它最大的性能，同时也能够节约服务器资源，降低使用成本。指南包括部署方式的选择和参数配置两大类，最后Linkis在测试环境中也久经压测考验，我们会将我们压测的实践和经验在第四章中给出。

### 2 部署方案选择

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis的单机部署方式简单，但是不能用于生产环境，因为过多的进程在同一个服务器上会让服务器压力过大。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;部署方案的选择，和公司的用户规模、用户使用习惯、集群同时使用人数都有关，一般来说，我们会以使用Linkis的同时使用人数和用户对执行引擎的偏好来做依据进行部署方式的选择。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下面以同时使用人数进行分段来进行详细阐述，假设用户偏好spark最多，hive其次，推荐服务器主机内存64G或以上。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**在安装EngineManager的机器上，由于会启动用户的引擎进程，机器的内存负载会比较高，其他类型的微服务对机器的负载则相对不会很高。**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**我们一般建议在安装EM的服务器上预留20G左右给Linux系统、EM自身进程以及其他进程进行使用，例如128G内存的服务器，除去20G内存之后，还有100G内存可以用于启动引擎进程。举个例子，如果一个Spark的Driver是4G内存，那么该服务器就可以最多启动25个spark引擎。**

总使用资源计算公式: Linkis使用总资源 = 总内存 + 总核数 =

同时在线人数 \* (Driver 或 Hive client内存) + 同时在线人数 \* (Driver或Hive client 核数)

例如，同时使用人数50人，Spark的Driver内存2G，Hive Client内存2G，每个引擎都使用两个核，那么就是 50 \* 2G + 50 \* 2核 = 100G 内存 + 100 CPU核数

**参数配置前的约定(必看):**

**1.参数一般是在微服务安装目录中的conf目录的linkis.properties进行配置，采用key=value 的形式进行配置，如 wds.linkis.enginemanager.cores.max=20。唯一例外的是engine微服务的配置需要在linkis-engine.properties进行配置。**

**2.参数配置之后，需要重启微服务才能生效。engine的参数配置之后，在页面的引擎管理器进行kill之后，再次启动引擎就可以生效**

下面提供一份参考部署方案。

#### 2.1 同时使用人数10-50

**1).服务器配置最优推荐**:4台服务器，分别命名为S1,S2,S3,S4

| 服务名 | 部署选择 | 说明 |
| --- | --- | --- |
| SparkEngineManger | S1 | SparkEM需要独占一台服务器，因为假定用户最偏好spark(如果是偏好hive，可以进行修改) |
| SparkEntrance | S2 |   |
| HiveEngineManager | S3 |   |
| HiveEntrance | S2 |   |
| PythonEngineManager | S3 |   |
| PythonEntrance | S2 |   |
| 其他(Eureka,gateway等) | S4 | 如果这台机器压力过大，可以再加一台服务器，将服务进行分开部署 |

**2). 服务器配置最低配置:2台服务器**

**3). 参数配置**

   如果需要进行，需要在微服务安装目录下的conf目录中的linkis.properties和linkis-engine.properties中进行配置。参数配置一般分为Entrance和EngineManager两种参数类型。

a)Entrance微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
|      wds.linkis.rpc.receiver.asyn.queue.size.max | 指定entrance微服务接收到的RPC消息的队列大小 | 2000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 指定Entrance微服务RPC消费线程池大小 | 100 |

b)EngineManager微服务

**注:其中Linkis定义了保护资源的概念，保护资源的目的在于预留出一定的资源，EM不会将最大资源用尽，启动保护机器的作用。**

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | 用于指定该EM进程启动的所有引擎的总内存 | 40G(64)或100G(128) |
| wds.linkis.enginemanager.cores.max | 用于指定该EM进程启动的所有引擎的总核数 | 20 |
| wds.linkis.enginemanager.engine.instances.max | 用于指定该EM进程启动的所有引擎的总个数 | 20 |
| wds.linkis.enginemanager.protected.memory | 用于指定该EM进程用于保护的内存 | 2G(意味着最多可以使用38(40-2)G内存) |
| wds.linkis.enginemanager.protected.cores.max | 用于指定该EM进程用于保护的核数 | 2(意味着最多可以使用18(20-2)核数) |
| wds.linkis.enginemanager.protected.engine.instances | 用于指定该EM进程用于保护的引擎个数 | 1(意味着最多可以启动19(20-1)个引擎) |

#### 2.2 同时使用人数 50-100

**1).服务器配置推荐**:7台服务器，分别命名为S1,S2..S7

| 服务名 | 部署选择 | 说明 |
| --- | --- | --- |
| SparkEngineManger | S1,S2 |   |
| SparkEntrance | S5 |   |
| HiveEngineManager | S3,S4 |   |
| HiveEntrance | S5 |   |
| PythonEngineManager | S4 |   |
| PythonEntrance | S4 |   |
| Eureka,Gateway,RM | S6 | Eureka和RM需要高可用部署 |
| PublicService,RM,Datasource,Eureka | S7 | Eureka和RM需要高可用部署 |

**2). 服务器配置最低配置**:4台服务器

**3). 参数配置**

a)Entrance微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
|      wds.linkis.rpc.receiver.asyn.queue.size.max | 指定entrance微服务接收到的RPC消息的队列大小 | 3000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 指定Entrance微服务RPC消费线程池大小 | 120 |

b)EngineManager微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | 用于指定该EM进程启动的所有引擎的总内存 | 40G(64)或100G(128) |
| wds.linkis.enginemanager.cores.max | 用于指定该EM进程启动的所有引擎的总核数 | 20 |
| wds.linkis.enginemanager.engine.instances.max | 用于指定该EM进程启动的所有引擎的总个数 | 20 |
| wds.linkis.enginemanager.protected.memory | 用于指定该EM进程用于保护的内存 | 2G(意味着最多可以使用38(40-2)G内存) |
| wds.linkis.enginemanager.protected.cores.max | 用于指定该EM进程用于保护的核数 | 2(意味着最多可以使用18(20-2)核数) |
| wds.linkis.enginemanager.protected.engine.instances | 用于指定该EM进程用于保护的引擎个数 | 1(意味着最多可以启动19(20-1)个引擎) |

#### 2.3 同时使用人数 100-300

**1).服务器配置推荐**:11台服务器，分别命名为S1,S2..S11

| 服务名 | 部署选择 | 说明 |
| --- | --- | --- |
| SparkEngineManger | S1,S2,S3,S4 |   |
| SparkEntrance | S8 |   |
| HiveEngineManager | S5,S6,S7 |   |
| HiveEntrance | S8 |   |
| PythonEngineManager | S9 |   |
| PythonEntrance | S9 |   |
| Eureka,Gateway,RM | S10 | Eureka和RM需要高可用部署 |
| PublicService,RM,Datasource,Eureka | s11 | Eureka和RM需要高可用部署 |

**2). 服务器配置最低配置**:6台服务器

**3). 参数配置**

a)Entrance微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
|      wds.linkis.rpc.receiver.asyn.queue.size.max | 指定entrance微服务接收到的RPC消息的队列大小 | 4000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 指定Entrance微服务RPC消费线程池大小 | 150 |

b)EngineManager微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | 用于指定该EM进程启动的所有引擎的总内存 | 40G(64)或100G(128) |
| wds.linkis.enginemanager.cores.max | 用于指定该EM进程启动的所有引擎的总核数 | 20 |
| wds.linkis.enginemanager.engine.instances.max | 用于指定该EM进程启动的所有引擎的总个数 | 20 |
| wds.linkis.enginemanager.protected.memory | 用于指定该EM进程用于保护的内存 | 2G(意味着最多可以使用38(40-2)G内存) |
| wds.linkis.enginemanager.protected.cores.max | 用于指定该EM进程用于保护的核数 | 2(意味着最多可以使用18(20-2)核数) |
| wds.linkis.enginemanager.protected.engine.instances | 用于指定该EM进程用于保护的引擎个数 | 1(意味着最多可以启动19(20-1)个引擎) |

#### 2.4 同时使用人数 300-500

**1).服务器配置推荐**15台服务器，分别命名为S1,S2,S3,S4

| 服务名 | 部署选择 | 说明 |
| --- | --- | --- |
| SparkEngineManger | S1,S2,S3,S4,S5,S6,S7 |   |
| SparkEntrance | S12 |   |
| HiveEngineManager | S8,S9,S10,S11 |   |
| HiveEntrance | S12 |   |
| PythonEngineManager | S13 |   |
| PythonEntrance | S13 |   |
| Eureka,Gateway,RM | S14 | Eureka和RM需要高可用部署 |
| PublicService,RM,Datasource,Eureka | s15 | Eureka和RM需要高可用部署 |

**2). 服务器配置最低配置**:10台服务器

**3). 参数配置**

a)Entrance微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
|      wds.linkis.rpc.receiver.asyn.queue.size.max | 指定entrance微服务接收到的RPC消息的队列大小 | 5000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 指定Entrance微服务RPC消费线程池大小 | 150 |

b)EngineManager微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | 用于指定该EM进程启动的所有引擎的总内存 | 40G(64)或100G(128) |
| wds.linkis.enginemanager.cores.max | 用于指定该EM进程启动的所有引擎的总核数 | 20 |
| wds.linkis.enginemanager.engine.instances.max | 用于指定该EM进程启动的所有引擎的总个数 | 20 |
| wds.linkis.enginemanager.protected.memory | 用于指定该EM进程用于保护的内存 | 2G(意味着最多可以使用38(40-2)G内存) |
| wds.linkis.enginemanager.protected.cores.max | 用于指定该EM进程用于保护的核数 | 2(意味着最多可以使用18(20-2)核数) |
| wds.linkis.enginemanager.protected.engine.instances | 用于指定该EM进程用于保护的引擎个数 | 1(意味着最多可以启动19(20-1)个引擎) |

#### 2.5 同时使用人数 500以上

**1).服务器配置推荐**:25台服务器，命名为S1,S2..S19,S25

| 服务名 | 部署选择 | 说明 |
| --- | --- | --- |
| SparkEngineManger | S1,S2,S3,S4,S5,S6,S7
S8,S9,S10 |   |
| SparkEntrance | S17 |   |
| HiveEngineManager | S11,S12,S13,S14,S15,
S16 |   |
| HiveEntrance | S17 |   |
| PythonEngineManager | S18,S19 |   |
| PythonEntrance | S20 |   |
| Eureka, RM | S21 | Eureka和RM需要高可用部署 |
| RM, ,Eureka | S22 | Eureka和RM需要高可用部署 |
| Eureka,PublicService | S23 | Eureka和RM需要高可用部署 |
| Gateway, Datasource | S24 |   |

**2). 服务器最低配置**:15台服务器

**3). 参数配置**

a)Entrance微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
|      wds.linkis.rpc.receiver.asyn.queue.size.max | 指定entrance微服务接收到的RPC消息的队列大小 | 5000 |
| wds.linkis.rpc.receiver.asyn.consumer.thread.max | 指定Entrance微服务RPC消费线程池大小 | 200 |

b)EngineManager微服务

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.enginemanager.memory.max | 用于指定该EM进程启动的所有引擎的总内存 | 40G(64)或100G(128) |
| wds.linkis.enginemanager.cores.max | 用于指定该EM进程启动的所有引擎的总核数 | 20 |
| wds.linkis.enginemanager.engine.instances.max | 用于指定该EM进程启动的所有引擎的总个数 | 20 |
| wds.linkis.enginemanager.protected.memory | 用于指定该EM进程用于保护的内存 | 2G(意味着最多可以使用38(40-2)G内存) |
| wds.linkis.enginemanager.protected.cores.max | 用于指定该EM进程用于保护的核数 | 2(意味着最多可以使用18(20-2)核数) |
| wds.linkis.enginemanager.protected.engine.instances | 用于指定该EM进程用于保护的引擎个数 | 1(意味着最多可以启动19(20-1)个引擎) |

### 3 其他通用参数配置

Linkis除了Entrance和EngineManager两类微服务外,还有其他的微服务也有自身的参数进行配置。

#### 3.1 PublicService自定义配置

publicService微服务承载了Linkis运行的各类辅助性功能，包括文件编辑保存，结果集读取等内容。

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.workspace.filesystem.get.timeout | 用于指定获取文件系统的超时时间 | 10000(单位是ms) |
| wds.linkis.workspace.resultset.download.maxsize | 用于指定下载结果集的最多行数 | 5000(最多下载5000)或-1(全量下载) |

#### 3.2 Engine类微服务

引擎类的微服务是随时启随时用的，包括spark、hive以及python引擎，引擎类的微服务的配置参数需要在EngineManager的安装目录中的conf下面的linkis-engine.properties中进行修改。

| 参数名称 | 参数作用 | 建议参数值 |
| --- | --- | --- |
| wds.linkis.engine.max.free.time | 用于指定一个引擎如果空闲多久会被kill | 3h(意味着一个引擎没有执行任务三小时后，就会被自动kill) |




### 4 总结

Linkis的部署方案和使用方式息息相关，同时使用人数是最大的影响因素，为了能够让使用者能够舒适地使用，同时降低集群服务器成本，需要运维开发人员进行尝试，听取用户反馈，如果已经部署的方案不合适，需要适时恰当地进行部署方案的更改。
