---
title: 名词解释和服务介绍
sidebar_position: 0.3
---

## 1.名词解释

Linkis 基于微服务架构开发，其服务可以分为3类服务群（组）:计算治理服务组、公共增强服务组和微服务治理服务组。
- 计算治理服务组（Computation Governance Services）:处理任务的核心服务，支持计算任务/请求处理流程的4个主要阶段(提交->准备->执行->结果);
- 公共增强服务组（Public Enhancement Services）:提供基础的支撑服务,包括上下文服务、引擎/udf物料的管理服务、历史任务等公共服务及数据源的管理服务等;
- 微服务治理服务组（Microservice Governance Services）:定制化的Spring Cloud Gateway、Eureka。提供微服务的基础底座

下面将对这三组服务的关键名词和服务进行介绍：

### 1.1 关键模块名词

首先我们了解下关键模块的名词

| 简称     | 全称                        | 主要功能            |
|-------- |-------------------------        |---------------------|
| MG/mg   | Microservice Governance         | 微服务治理           |
| CG/cg   | Computation Governance          | 计算治理             |
| EC/ec   | EngineConn                      | 引擎连接器           |
| -   | Engine                      | 底层计算存储引擎，如spark、hive、shell           |
| ECM/ecm | EngineConnManager               | 引擎连接器的管理      |
| ECP/ecp | EngineConnPlugin                | 引擎连接器插件        |
| RM/rm   | ResourceManager                 | 资源管理器，用于管控任务资源和用户资源使用和控制     |
| AM/am   | AppManager                      | 应用管理器，用于管控EngineConn和ECM服务    |
| LM/lm   | LinkisManager                 | Linkis管理器服务，包含了：RM、AM、LabelManager等模块     |
| PES/pes | Public Enhancement Services  | 公共增强服务             |
| - | Orchestrator  | 编排器，用于Linkis任务编排，任务多活、混算、AB等策略支持             |
| UJES    | Unified Job Execute Service     | 统一作业执行服务      |
| DDL/ddl | Data Definition Language        | 数据库定义语言        |
| DML/dml | Data Manipulation Language      | 数据操纵语言          |

### 1.2 任务关键名词

- JobRequest: 任务请求，对应Client提交给Linkis的任务，包含任务的执行内容、用户、标签等信息
- RuntimeMap: 任务运行时参数，任务的运行时参数，任务级别生效，如放置多数据源的数据源信息
- StartupMap： 引擎连接器启动参数，用于EngineConn连机器启动的参数，EngineConn进程生效，如设置spark.executor.memory=4G
- UserCreator： 任务创建者信息：包含用户信息User和Client提交的应用信息Creator，用于任务和资源的租户隔离
- submitUser： 任务提交用户
- executeUser: 任务真实执行用户
- JobSource: 任务来源信息，记录任务的IP或者脚本地址
- errorCode： 错误码，任务错误码信息
- JobHistory: 任务历史持久化模块，提供任务的历史信息查询
- ResultSet: 结果集，任务对应的结果集，默认以.dolphin文件后缀进行保存
- JobInfo： 任务运行时信息，如日志、进度、资源信息等
- Resource： 资源信息，每个任务都会消耗资源
- RequestTask： EngineConn的最小执行单元，传输给EngineConn执行的任务单元



## 2. 服务介绍

本节主要对Linkis的服务进行介绍，了解Linkis启动后会有哪些服务，以及服务的作用。

### 2.1 服务列表

Linkis启动后各个服务群(组)下包括的微服务如下:

|   归属的微服务群(组)   |  服务名    |    主要功能  |
| ----        | ----              | ----              |
|     MGS      | linkis-mg-eureka | 负责服务注册与发现，上游其他组件也会复用linkis的注册中心，如dss|
|     MGS      | linkis-mg-gateway | 作为Linkis的网关入口，主要承担了请求转发、用户访问认证 |
|     CGS      | linkis-cg-entrance | 任务提交入口是用来负责计算任务的接收、调度、转发执行请求、生命周期管理的服务，并且能把计算结果、日志、进度返回给调用方                  |
|     CGS      | linkis-cg-linkismanager|提供了AppManager（应用管理）、ResourceManager（资源管理）、LabelManager（标签管理）、引擎连接器插件管理的能力                   |
|     CGS      | linkis-cg-engineconnmanager | EngineConn的管理器，提供引擎的生命周期管理  |
|     CGS      | linkis-cg-engineconn| 引擎连接器服务，是与底层计算存储引擎(Hive/Spark)的实际连接的服务，包含了与实际引擎的会话信息。对于底层计算存储引擎来说 它充当了一个客户端的角色，由任务触发启动|
|     PES      | linkis-ps-publicservice|公共增强服务组模块服务，为其他微服务模块提供统一配置管理、上下文服务、BML物料库、数据源管理、微服务管理和历史任务查询等功能                   |

启动后开源看到的所有服务如下图：
![Linkis_Eureka](/Images/deployment/Linkis_combined_eureka.png)

### 2.1 公共增强服务详解
公共增强服务组（PES）在1.3.1版本后默认将相关模块服务合并为一个服务linkis-ps-publicservice提供相关功能，当然如果你希望分开部署也支持的。您只需要将对应模块的服务打包部署即可。
合并后的公共增强服务，主要包含了以下功能：

| 简称     | 全称                        | 主要功能            |
|-------- |-------------------------        |---------------------|
| CS/cs   | Context Service                 | 上下文服务，用于任务间传递结果集、变量、文件等          |
| UDF/udf   | UDF                | UDF管理模块，提供UDF和函数的管理功能，支持共享和版本控制          |
| variable   | Variable                | 全局自定义模块，提供全局自定变量的管理功能          |
| script   | Script-dev                |  脚本文件操作服务，提供脚本编辑保存、脚本目录管理功能        |
| jobHistory   | JobHistory              |  任务历史持久化模块，提供任务的历史信息查询        |
| BML/bml | BigData Material library        | 大数据物料库          |
| -   | Configuration              | 配置管理，提供配置参数的管理和查看的功能      |
| -   | instance-label              | 微服务管理服务，提供微服务和路由标签的映射管理功能      |
| -   | error-code              | 错误码管理，提供通过错误码管理的功能      |
| DMS/dms | Data Source Manager Service     | 数据源管理服务        |
| MDS/mds | MetaData Manager Service        | 元数据管理服务        |
| - | linkis-metadata       | 提供Hive元数据信息查看功能，后续将会合并到到MDS        |
| -   | basedata-manager                  | 基础数据管理，用于管理Linkis自身的基础元数据信息          |

## 3 模块介绍
本节主要对Linkis的大模块和功能进行主要介绍

- linkis-commons: linkis的公共模块，包含了公共的工具类模块、RPC模块、微服务基础等模块
- linkis-computation-governance： 计算治理模块，包含了计算治理多个服务的模块：Entrance、LinkisManager、EngineConnManager、EngineConn等
- linkis-engineconn-plugins： 引擎连接器插件模块，包含了所有的引擎连接器插件实现
- linkis-extensions: Linkis的扩展增强模块，不是必要功能模块，现在主要包含了文件代理操作的IO模块
- linkis-orchestrator: 编排模块，用于Linkis任务编排，任务多活、混算、AB等高级策略支持
- linkis-public-enhancements： 公共增强模块，包含了所有的公共服务用于给到linkis内部和上层应用组件进行调用
- linkis-spring-cloud-services： spring cloud相关的服务模块，包含了gateway、注册中心等
- linkis-web： 前端模块