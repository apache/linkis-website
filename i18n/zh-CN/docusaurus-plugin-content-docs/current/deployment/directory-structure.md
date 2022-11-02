---
title: 目录结构
sidebar_position: 3.0
---

# 源码目录结构

> Linkis代码层级目录结构说明，如果想详细了解各个模块，请查看[Linkis的相关架构设计](architecture/overview.md)


```html
│-- linkis-dist //编译打包最后阶段步骤 整合所有lib包和安装部署脚本配置等
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

# 安装包目录结构

> Linkis安装包解压后的目录结构

下载官方发布的[编译完整包](https://linkis.apache.org/zh-CN/download/main)，解压后的目录结构如下:

```html

├── bin
│   ├── checkEnv.sh ── 环境变量检测
│   ├── common.sh ── 部分公共shell函数
│   └── install.sh ── Linkis安装的主脚本
├── deploy-config
│   ├── db.sh       //数据库连接配置
│   └── linkis-env.sh //相关环境配置信息
├── DISCLAIMER
├── LICENSE
├── licenses  
├── linkis-package  //微服务相关的启动配置文件，依赖，脚本，linkis-cli等
│   ├── bin
│   ├── conf
│   ├── db
│   ├── lib
│   └── sbin
├── NOTICE
├── README_CN.md
└── README.md

```

# 部署后的目录结构

## 1 目录结构

安装后`${LINKIS_HOME}`目录结构

```html
├── bin              ──  linkis-cli  用于向Linkis提交任务的Shell命令行程序
│   ├── linkis-cli
│   ├── linkis-cli-hive
│   ├── linkis-cli-pre
│   ├── linkis-cli-spark-sql
│   ├── linkis-cli-spark-submit
│   └── linkis-cli-sqoop
├── conf 配置目录
│   ├── application-eureka.yml
│   ├── application-linkis.yml    ── 微服务通用yml
│   ├── linkis-cg-engineconnmanager.properties
│   ├── linkis-cg-engineplugin.properties
│   ├── linkis-cg-entrance.properties
│   ├── linkis-cg-linkismanager.properties
│   │── linkis-cli
│   │   ├── linkis-cli.properties
│   │   └── log4j2.xml
│   ├── linkis-env.sh    ── linkis 环境变量配置
│   ├── linkis-mg-gateway.properties
│   ├── linkis.properties  ── linkis 服务的全局配合，所有微服务启动都会加载使用
│   ├── linkis-ps-cs.properties
│   ├── linkis-ps-data-source-manager.properties
│   ├── linkis-ps-metadatamanager.properties
│   ├── linkis-ps-publicservice.properties
│   ├── log4j2.xml
│   ├── proxy.properties(可选)  proxy 代理用户模式的配置（>=1.1.1）
│   └── token.properties(可选)  token 模式认证的配置认证的token 1.1.1开始，用数据库存储
├── db 数据库DML和DDL文件目录
│   ├── linkis_ddl.sql ── 数据库表定义SQL
│   ├── linkis_dml.sql ── 数据库表初始化SQL
│   └── module    ── 包含各个微服务的DML和DDL文件
│   └── upgrade   ── 针对每个版本 增量DML/DDL
├── lib lib目录
│   ├── linkis-commons ── 公共依赖包 大多服务启动时(linkis-mg-gateway除外) -cp 路径参数 都会加载这个目录
│   ├── linkis-computation-governance ──计算治理模块的lib目录
│   ├── linkis-engineconn-plugins ──所有引擎插件的lib目录
│   ├── linkis-public-enhancements ──公共增强服务的lib目录
│   └── linkis-spring-cloud-services ──SpringCloud的lib目录
├── logs 日志目录
│   ├── linkis-cg-engineconnmanager-gc.log
│   ├── linkis-cg-engineconnmanager.log
│   ├── linkis-cg-engineconnmanager.out
│   ├── linkis-cg-engineplugin-gc.log
│   ├── linkis-cg-engineplugin.log
│   ├── linkis-cg-engineplugin.out
│   ├── linkis-cg-entrance-gc.log
│   ├── linkis-cg-entrance.log
│   ├── linkis-cg-entrance.out
│   ├── linkis-cg-linkismanager-gc.log
│   ├── linkis-cg-linkismanager.log
│   ├── linkis-cg-linkismanager.out
│   ├── linkis-cli
│   │   ├── linkis-client.hadoop.log.20220409162400037523664
│   │   ├── linkis-client.hadoop.log.20220409162524417944443
│   ├── linkis-mg-eureka-gc.log
│   ├── linkis-mg-eureka.log
│   ├── linkis-mg-eureka.out
│   ├── linkis-mg-gateway-gc.log
│   ├── linkis-mg-gateway.log
│   ├── linkis-mg-gateway.out
│   ├── linkis-ps-cs-gc.log
│   ├── linkis-ps-cs.log
│   ├── linkis-ps-cs.out
│   ├── linkis-ps-data-source-manager-gc.log
│   ├── linkis-ps-data-source-manager.log
│   ├── linkis-ps-data-source-manager.out
│   ├── linkis-ps-metadatamanager-gc.log
│   ├── linkis-ps-metadatamanager.log
│   ├── linkis-ps-metadatamanager.out
│   ├── linkis-ps-publicservice-gc.log
│   ├── linkis-ps-publicservice.log
│   └── linkis-ps-publicservice.out
├── pid 所有微服务的进程ID
│   ├── linkis_cg-engineconnmanager.pid ──引擎管理器微服务
│   ├── linkis_cg-engineconnplugin.pid ──引擎插件微服务
│   ├── linkis_cg-entrance.pid ──引擎入口微服务
│   ├── linkis_cg-linkismanager.pid ──linkis管理器微服务
│   ├── linkis_mg-eureka.pid ──eureka微服务
│   ├── linkis_mg-gateway.pid ──gateway微服务
│   ├── linkis_ps-cs.pid ──上下文微服务
│   ├── linkis_ps-data-source-manager.pid --数据源微服务
│   ├── linkis_ps-metadatamanager.pid  --元数据管理微服务
│   └── linkis_ps-publicservice.pid ──公共微服务
└── sbin 微服务启停脚本目录
     ├── ext ──各个微服务的启停脚本目录
     ├── linkis-daemon.sh ── 快捷启停、重启单个微服务脚本
     ├── linkis-start-all.sh ── 一键启动全部微服务脚本
     └── linkis-stop-all.sh ── 一键停止全部微服务脚本

```
 
 ## 2  配置项修改
 
 在执行完Linkis安装后，所有配置项位于conf目录下，
 如果需要进行配置项修改，修改配置`${LINKIS_HOME}/conf/*properties`文件后，重启对应的服务，
 如：`sh sbin/linkis-daemon.sh start ps-publicservice`。
 如果修改的是公共配置文件`application-eureka.yml/application-linkis.yml/linkis.properties`，需要重启所有服务`sh sbin/linkis-start-all.sh` 
 


 
 ## 3 微服务启停
 
所有微服务名称如下：
 ```
├── linkis-cg-engineconnmanager 引擎管理服务  
├── linkis-cg-engineplugin 引擎插件管理服务  
├── linkis-cg-entrance 计算治理入口服务  
├── linkis-cg-linkismanager 计算治理管理服务  
├── linkis-mg-eureka 微服务注册中心服务  
├── linkis-mg-gateway Linkis网关服务  
├── linkis-ps-cs 上下文服务 
├── linkis-ps-publicservice 公共服务 
├── linkis-ps-data-source-manager 数据源管理服务 
├── linkis-ps-metadatamanager  元数据查询服务
 ```

**微服务简称**：
 
 | 简称 | 英文全称                | 中文全称   |
 |------|-------------------------|------------|
 | cg   | Computation Governance  | 计算治理   |
 | mg   | Microservice Covernance | 微服务治理 |
 | ps   | Public Enhancement Service  | 公共增强服务   |
 


``` 
# 一次性启动所有微服务：
 
     sh linkis-start-all.sh
 
# 一次性关停所有微服务
 
     sh linkis-stop-all.sh
 
# 启动单个微服务（服务名需要去掉linkis前缀如：mg-eureka）
 
     sh linkis-daemon.sh start service-name
 
     例如: sh linkis-daemon.sh start mg-eureka
 
# 关闭单个微服务
 
     sh linkis-daemon.sh stop service-name
 
     例如: sh linkis-daemon.sh stop mg-eureka
 
# 重启单个微服务
 
     sh linkis-daemon.sh restart service-name
 
     例如: sh linkis-daemon.sh restart mg-eureka
# 查看单个微服务的状态
 
     sh linkis-daemon.sh status service-name
 
     例如: sh linkis-daemon.sh status mg-eureka
```
