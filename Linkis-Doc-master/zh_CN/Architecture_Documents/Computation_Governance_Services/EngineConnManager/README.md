EngineConnManager架构设计
-------------------------

EngineConnManager（ECM）：EngineConn的管理器，提供引擎的生命周期管理，同时向RM汇报负载信息和自身的健康状况。

### 一、ECM架构

![](Images/ECM架构图.png)

### 二、二级模块介绍

**Linkis-engineconn-linux-launch**

引擎启动器，核心类为LinuxProcessEngineConnLauch，用于提供执行命令的指令。

**Linkis-engineconn-manager-core**

ECM的核心模块，包含ECM健康上报、EngineConn健康上报功能的顶层接口，定义了ECM服务的相关指标，以及构造EngineConn进程的核心方法。

| 核心顶层接口/类     | 核心功能                                 |
|---------------------|------------------------------------------|
| EngineConn          | 定义了EngineConn的属性，包含的方法和参数 |
| EngineConnLaunch    | 定义了EngineConn的启动方法和停止方法     |
| ECMEvent            | 定义了ECM相关事件                        |
| ECMEventListener    | 定义了ECM相关事件监听器                  |
| ECMEventListenerBus | 定义了ECM的监听器总线                    |
| ECMMetrics          | 定义了ECM的指标信息                      |
| ECMHealthReport     | 定义了ECM的健康上报信息                  |
| NodeHealthReport    | 定义了节点的健康上报信息                 |

**Linkis-engineconn-manager-server**

ECM的服务端，定义了ECM健康信息处理服务、ECM指标信息处理服务、ECM注册服务、EngineConn启动服务、EngineConn停止服务、EngineConn回调服务等顶层接口和实现类，主要用于ECM对自己和EngineConn的生命周期管理以及健康信息上报、发送心跳等。

模块中的核心Service和功能简介如下：

| 核心service                     | 核心功能                                        |
|---------------------------------|-------------------------------------------------|
| EngineConnLaunchService         | 包含生成EngineConn和启动进程的核心方法          |
| BmlResourceLocallizationService | 用于将BML的引擎相关资源下载并生成本地化文件目录 |
| ECMHealthService                | 向AM定时上报自身的健康心跳                      |
| ECMMetricsService               | 向AM定时上报自身的指标状况                      |
| EngineConnKillSerivce           | 提供停止引擎的相关功能                          |
| EngineConnListService           | 提供缓存和管理引擎的相关功能                    |
| EngineConnCallBackService       | 提供回调引擎的功能                              |

ECM构建EngineConn启动流程：

![](Images/创建EngineConn请求流程.png)
