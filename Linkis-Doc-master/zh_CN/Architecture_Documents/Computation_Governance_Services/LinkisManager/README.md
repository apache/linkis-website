LinkisManager架构设计
====================

LinkisManager作为Linkis的一个独立微服务，对外提供了AppManager（应用管理）、ResourceManager（资源管理）、LabelManager（标签管理）的能力，能够支持多活部署，具备高可用、易扩展的特性。

## 一. 架构图

![01](../../../Images/Architecture/LinkisManager/LinkisManager-01.png)

### 名词解释
- EngineConnManager（ECM）： 引擎管理器，用于启动和管理引擎
- EngineConn（EC）：引擎连接器，用于连接底层计算引擎
- ResourceManager（RM）：资源管理器，用于管理节点资源

## 二. 二级模块介绍

### 1. 应用管理模块 linkis-application-manager

AppManager用于引擎的统一调度和管理

| 核心接口/类 | 主要功能 |
|------------|--------|
|EMInfoService | 定义了EngineConnManager信息查询、修改功能 |
|EMRegisterService| 定义了EngineConnManager注册功能 |
|EMEngineService | 定义了EngineConnManager对EngineConn的创建、查询、关闭功能 |
|EngineAskEngineService | 定义了查询EngineConn的功能 |
|EngineConnStatusCallbackService | 定义了处理EngineConn状态回调的功能 |
|EngineCreateService | 定义了创建EngineConn的功能 |
|EngineInfoService | 定义了EngineConn查询功能 |
|EngineKillService | 定义了EngineConn的停止功能 |
|EngineRecycleService | 定义了EngineConn的回收功能 |
|EngineReuseService | 定义了EngineConn的复用功能 |
|EngineStopService | 定义了EngineConn的自毁功能 |
|EngineSwitchService | 定义了引擎切换功能 |
|AMHeartbeatService | 提供了EngineConnManager和EngineConn节点心跳处理功能 |


通过AppManager申请引擎流程如下：
![](../../../Images/Architecture/LinkisManager/AppManager-01.png)

  
### 2. 标签管理模块 linkis-label-manager

LabelManager提供标签管理和解析能力

| 核心接口/类 | 主要功能 |
|------------|--------|
|LabelService | 提供了标签增删改查功能 |
|ResourceLabelService | 提供了资源标签管理功能 |
|UserLabelService | 提供了用户标签管理功能 |

LabelManager架构图如下：
![](../../../Images/Architecture/LinkisManager/LabelManager-01.png)



### 3. 资源管理模块 linkis-resource-manager

ResourceManager用于管理引擎和队列的所有资源分配

| 核心接口/类 | 主要功能 |
|------------|--------|
|RequestResourceService | 提供了EngineConn资源申请功能 |
|ResourceManagerService | 提供了EngineConn资源释放功能 |
|LabelResourceService | 提供了标签对应资源管理功能 |


ResourceManager架构图如下：

![](../../../Images/Architecture/LinkisManager/ResourceManager-01.png)

### 4. 监控模块 linkis-manager-monitor

Monitor提供了节点状态监控的功能
