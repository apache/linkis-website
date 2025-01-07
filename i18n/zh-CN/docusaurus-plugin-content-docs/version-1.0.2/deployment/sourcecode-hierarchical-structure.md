---
title: 源码目录结构
sidebar_position: 5
---

# Linkis源码目录结构

> Linkis代码层级目录结构说明，如果您想详细了解Linkis各个模块，请查看[Linkis的相关架构设计](architecture/overview.md)


```html

|-- assembly-combined-package //编译整个项目的模块
|        |-- assembly-combined
|        |-- bin
|        |-- config
|        |-- src
|-- linkis-commons  //核心抽象，里面放有所有的公用模块
|        |-- linkis-common  //通用模块，内置很多通用工具类
|        |-- linkis-hadoop-common
|        |-- linkis-httpclient  //Java SDK顶层接口
|        |-- linkis-message-scheduler
|        |-- linkis-module
|        |-- linkis-mybatis  //SpringCloud的Mybatis模块
|        |-- linkis-protocol
|        |-- linkis-rpc      //RPC模块，基于Feign实现的复杂双向通信
|        |-- linkis-scheduler //通用调度模块
|        |-- linkis-storage
|        |
|-- linkis-computation-governance //计算治理服务
|        |-- linkis-client  //Java SDK，用户通过Client可直接访问Linkis
|        |-- linkis-computation-governance-common
|        |-- linkis-engineconn
|        |-- linkis-engineconn-manager
|        |-- linkis-entrance //通用底层entrance模块
|        |-- linkis-entrance-client
|        |-- linkis-jdbc-driver
|        |-- linkis-manager
|    
|-- linkis-engineconn-plugins
|        |-- engineconn-plugins
|        |-- linkis-engineconn-plugin-framework
|    
|-- linkis-extensions
|        |-- linkis-io-file-client
|-- linkis-orchestrator
|        |-- linkis-code-orchestrator
|        |-- linkis-computation-orchestrator
|        |-- linkis-orchestrator-core
|        |-- plugin  
|-- linkis-public-enhancements //公共增强服务
|        |-- linkis-bml  // 物料库
|        |-- linkis-context-service //统一上下文
|        |-- linkis-datasource   //数据源服务
|        |-- linkis-publicservice  //公共服务
|-- linkis-spring-cloud-services //微服务治理
|        |-- linkis-service-discovery
|        |-- linkis-service-gateway //网关Gateway
|-- db  //数据库信息
|
|-- web  //linkis的管理台代码

```