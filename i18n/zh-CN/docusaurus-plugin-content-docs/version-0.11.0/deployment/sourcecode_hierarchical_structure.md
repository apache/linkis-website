---
title: 源码目录结构
sidebar_position: 5
---

> Linkis层级目录结构解释，如果您想详细Linkis，请查看Linkis的相关架构设计文档

```shell script
├─assembly
├─bin
├─conf
├─core  //核心抽象，里面放有所有的公用模块
│  ├─cloudModule   //微服务必须引入的模块，内嵌Jetty + WebSocket + SpringBoot + Jersey
│  ├─cloudMybatis    //SpringCloud的Mybatis模块
│  ├─cloudProtocol    //通用协议，如Entrance与Engine的RPC通信
│  ├─cloudRPC   //RPC模块，基于Feign实现的复杂双向通信
│  ├─common   //通用模块，内置很多通用工具类
│  ├─httpclient    //Java SDK顶层接口
│  └─scheduler    //通用调度模块
├─db    //数据库信息
├─docs    //所有文档
├─eurekaServer     //Eureka模块
├─extensions     //插件
│  └─spark-excel     //spark支持excel转DF/DF导成excel的插件
├─gateway    //网关模块
│  ├─core    //网关核心实现，包括前端接口的鉴权/解析/路由
│  ├─gateway-httpclient-support    //gateway对Java SDK的支持
│  ├─gateway-ujes-support    //对UJES接口的解析和路由支持
│  └─springcloudgateway    //引入spring cloud gateway，前端请求都从这里拦截
├─publicService    //公共服务
│  ├─application    //应用模块
│  ├─bin
│  ├─conf
│  ├─configuration    //参数模块，各引擎参数从这里获取
│  ├─database    //提供Hive元数据查询服务
│  ├─query    //提供Job Manager和Job History
│  ├─udf    //UDF模块
│  ├─variable    //用户自定义变量模块
│  └─workspace    //工作空间模块，管理用户脚本
├─resourceManager    //资源管理服务
│  ├─resourcemanagerclient    //资源管理客户端
│  ├─resourcemanagercommon    //通用模块
│  └─resourcemanagerserver    //资源管理服务端
├─storage  //统一存储服务
│  ├─pesIO  //远程存储服务
│  │  ├─io-engine    //远程存储的engine端，实际访问底层存储端
│  │  ├─io-enginemanager    //远程存储的engineManger
│  │  └─io-entrance   //远程存储的请求入口
│  └─storage    //统一存储的对外统一接口
└─ujes    //统一作业执行服务
│  ├─client    //Java SDK，用户通过Client可直接访问Linkis   
│  ├─definedEngines    //已经实现的引擎  
│  │  ├─hive    //Hive引擎
│  │  │  ├─engine    //实际对接底层Hive的engine执行端
│  │  │  ├─enginemanager
│  │  │  └─entrance  
│  │  ├─pipeline    //导入导出引擎，用于存储系统之间互导
│  │  │  ├─engine
│  │  │  ├─enginemanager
│  │  │  └─entrance
│  │  ├─python    //单机版Python引擎
│  │  │  ├─engine    //实际对接底层Python的engine执行端
│  │  │  ├─enginemanager
│  │  │  └─entrance
│  │  ├─spark    //spark引擎
│  │  │  ├─engine    //实际对接底层Spark的engine执行端
│  │  │  ├─enginemanager   
│  │  │  └─entrance   
│  │  └─tispark    //TiSpark引擎，实际对接TiSpark的engine端
│  ├─engine    //通用底层engine模块   
│  ├─enginemanager    //通用底层enginemanager模块  
│  ├─entrance    //通用底层entrance模块  
│  └─entranceclient    //简化版的entrance
```
