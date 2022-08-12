---
title: 源码目录结构
sidebar_position: 5
---

> Linkis代码层级目录结构说明，如果想详细了解各个模块，请查看[Linkis的相关架构设计](architecture/overview.md)


```html
│-- assembly-combined-package //编译打包最后阶段步骤 整合所有lib包和安装部署脚本配置等
│        │-- assembly-combined
│        │-- bin  安装相关的脚本
│        │-- deploy-config //安装的配置
│        │-- src
│-- linkis-commons  //核心抽象，里面放有所有的公用模块
│        │-- linkis-common  //通用模块，内置很多通用工具类
│        │-- linkis-hadoop-common
│        │-- linkis-httpclient  //Java SDK顶层接口 对httpclient的进一步封装
│        │-- linkis-module  // linkis的服务顶层公用模块 涉及到服务启动时的参数和服务初始化 统一的Restful处理 登录态校验等
│        │-- linkis-mybatis  //SpringCloud的Mybatis模块
│        │-- linkis-protocol  //服务请求/响应的一些接口和实体类
│        │-- linkis-rpc      //RPC模块，基于Feign实现的复杂双向通信
│        │-- linkis-scheduler //通用调度模块
│        │-- linkis-storage   //文件操作工具集
│        │
│-- linkis-computation-governance //计算治理服务
│        │-- linkis-client  //Java SDK，用户通过Client可直接访问Linkis
│        │-- linkis-computation-governance-common
│        │-- linkis-engineconn
│        │-- linkis-engineconn-manager
│        │-- linkis-entrance //通用底层entrance模块
│        │-- linkis-entrance-client
│        │-- linkis-jdbc-driver  //可以类似jdbc sdk方式连接使用linkis
│        │-- linkis-manager
│
│-- linkis-engineconn-plugins // 引擎插件
│        │-- engineconn-plugins
│        │-- linkis-engineconn-plugin-framework
│
│-- linkis-extensions // 扩展功能增强插件模块
│        │-- linkis-io-file-client  // 对linkis-storage的功能扩展
│
│-- linkis-orchestrator  //服务的编排
│        │-- linkis-code-orchestrator
│        │-- linkis-computation-orchestrator
│        │-- linkis-orchestrator-core
│        │-- plugin
│
│-- linkis-public-enhancements //公共增强服务
│        │-- linkis-bml  // 物料库
│        │-- linkis-context-service //统一上下文
│        │-- linkis-datasource   //数据源服务
│        │   ├── linkis-datasource-client //客户端代码
│        │   ├── linkis-datasource-manager //数据源管理模块
│        │   │   ├── common  //数据源管理公共模块
│        │   │   └── server  //数据源管理服务模块
│        │   ├── linkis-metadata //旧版本已有的模块，保留
│        │   ├── linkis-metadata-manager //数据元管理模块
│        │       ├── common //数据元管理公共模块
│        │       ├── server //数据元管理服务模块
│        │       └── service //支持的数据源
│        │           ├── elasticsearch
│        │           ├── hive
│        │           ├── kafka
│        │           └── mysql
│        │-- linkis-publicservice  //公共服务
│
│-- linkis-spring-cloud-services //微服务治理
│        │-- linkis-service-discovery
│        │-- linkis-service-gateway //网关Gateway
│-- db  //数据库信息
│
│-- tool //工具脚本
│        │-- check.sh
│        │-- dependencies
│
│-- web  //linkis的管理台代码
│-- scalastyle-config.xml  //Scala 代码格式检查配置文件
│-- CONTRIBUTING.md
│-- CONTRIBUTING_CN.md
│-- DISCLAIMER-WIP
│-- LICENSE //项目源码的LICENSE
│-- LICENSE-binary //二进制包的LICENSE
│-- LICENSE-binary-ui //前端web编译包的LICENSE
│-- NOTICE  //项目源码的NOTICE
│-- NOTICE-binary //二进制包的NOTICE
│-- NOTICE-binary-ui //前端web二进制包的NOTICE
│-- licenses-binary  二进制包的详细依赖的license文件
│-- licenses-binary-ui //前端web编译包详细依赖的license文件
│-- README.md
│-- README_CN.md

```