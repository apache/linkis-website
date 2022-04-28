---
title: 微服务的划分
sidebar_position: 11
---
## 服务的简介

Linkis 基于微服务架构开发，其服务可以分为3类服务群（组）:计算治理服务组、公共增强服务组和微服务治理服务组。
- 计算治理服务组（Computation Governance Services）:处理任务的核心服务，支持计算任务/请求处理流程的3个主要阶段(提交->准备->执行);
- 公共增强服务组（Public Enhancement Services）:提供基础的支撑服务,包括上下文服务、引擎/udf物料的管理服务、历史任务等公共服务及数据源的管理服务等;
- 微服务治理服务组（Microservice Governance Services）:定制化的Spring Cloud Gateway、Eureka。提供微服务的基础底座。

各个服务群(组)下包括的微服务如下:

|   归属的微服务群(组)   |  服务名    |    主要功能  |
| ----        | ----              | ----              |
|     MGS      | linkis-mg-eureka | 负责服务注册与发现，上游其他组件也会复用linkis的注册中心，如dss|
|     MGS      | linkis-mg-gateway | 作为Linkis的网关入口，主要承担了请求转发、用户访问认证 |
|     CGS      | linkis-cg-entrance | 任务提交入口是用来负责计算任务的接收、调度、转发执行请求、生命周期管理的服务，并且能把计算结果、日志、进度返回给调用方                  |
|     CGS      | linkis-cg-linkismanager|提供了AppManager（应用管理）、ResourceManager（资源管理）、LabelManager（标签管理）的能力                   |
|     CGS      | linkis-cg-engineconnplugin| 引擎连接器插件，提供自由扩展Linkis引擎的基础功能支持,允许以实现既定的插件化接口的方式引入新引擎到计算中间件的执行生命周期，能够实现新引擎的快速部署 |
|     CGS      | linkis-cg-engineconnmanager | EngineConn的管理器，提供引擎的生命周期管理，同时向ResourceManager汇报负载信息和自身的健康状况  |
|     CGS      | linkis-cg-engineconn| 是与底层计算存储引擎(Hive/Spark)的实际连接的服务，包含了与实际引擎的会话信息。对于底层计算存储引擎来说 它充当了一个客户端的角色                  |
|     PES      | linkis-ps-publicservice|为其他微服务模块提供统一配置管理、上下文服务、BML物料库、数据源管理、微服务管理和历史任务查询等功能                   |
|     PES      | linkis-ps-cs | 上下文服务，解决一个数据应用开发流程，跨多个服务间的数据和信息共享问题                  |
|     PES      | linkis-ps-metadatamanager|       只提供元数据查询服务 提供数据库的数据元数据的基本查询功能,对外提供了http接口，对内提供了rpc服务，方便数据源管理模块，通过rpc调用，进行数据源的连接测试           |
|     PES      | linkis-ps-data-source-manager | 数据源管理服务 对数据源的进行基本的管理，对外提数据源的新增，查询，修改，连接测试等http接口。对内提供了rpc服务 ，方便数据元管理模块通过rpc调用，查询数据库建立连接需要的必要信息|


## 基本名词解释
| 简介     | 英文全称                        | 中文全称             |
|-------- |-------------------------        |---------------------|
| CG/cg   | Computation Governance          | 计算治理             |
| MG/mg   | Microservice Governance         | 微服务治理           |
| PS/ps      | Public Service                  | 公共服务             |
| CS/cs      | Context Service                 | 统一上下文           |
| DSS/dss     | DataSphere Studio               | 数据应用集成开发框架  |
| EC/ec   | EngineConn                      | 引擎连接器           |
| ECM/ecm | EngineConnManager               | 引擎连接器的管理      |
| ECP/ecp | EngineConnPlugin                | 引擎连接器插件        |
| RM/rm   | ResourceManager                 | 资源管理器，用于管理节点资源     |
| PES/pes | Public Enhancement Services      | 公共增强服务          |
| DMS/dms | Data Source Manager Service     | 数据源管理服务        |
| MDS/mds | MetaData Manager Service        | 元数据管理服务        |
| BML/bml | BigData Material library        | 大数据物料库          |
| UJES    | Unified Job Execute Service     | 统一作业执行服务      |
| DDL/ddl | Data Definition Language        | 数据库定义语言        |
| DML/dml | Data Manipulation Language      | 数据操纵语言          |
