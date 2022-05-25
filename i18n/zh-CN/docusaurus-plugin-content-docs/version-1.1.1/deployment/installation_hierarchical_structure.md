---
title: 安装后的程序目录结构
sidebar_position: 4
---

## 1. 目录结构
Linkis1.0简化后的目录结构如下，其中加`**`标注的文件，为用户安装使用时必定会使用的目录项，其他目录项初次使用无特殊情况无需关心：
```
├── bin 
│   ├── linkis-cli   
│   ├── linkis-cli-hive
│   ├── linkis-cli-pre
│   ├── linkis-cli-spark-sql
│   ├── linkis-cli-spark-submit
│   └── linkis-cli-sqoop
├── conf 配置目录
│   ├── application-eureka.yml 
│   ├── application-linkis.yml ──微服务通用yml  
│   ├── linkis-cg-engineconnmanager.properties
│   ├── linkis-cg-engineplugin.properties
│   ├── linkis-cg-entrance.properties
│   ├── linkis-cg-linkismanager.properties
│   ├── linkis-cli
│   │   ├── linkis-cli.properties
│   │   └── log4j2.xml
│   ├── linkis-env.sh
│   ├── linkis-mg-gateway.properties
│   ├── linkis.properties
│   ├── linkis-ps-cs.properties
│   ├── linkis-ps-data-source-manager.properties
│   ├── linkis-ps-metadatamanager.properties
│   ├── linkis-ps-publicservice.properties
│   ├── log4j2-console.xml
│   ├── log4j2.xml
│   └── token.properties(可选) 
├── db
│   ├── linkis_ddl.sql ──数据库表定义SQL  
│   ├── linkis_dml.sql ──数据库表初始化SQL    
│   ├── module ──包含各个微服务的DML和DDL文件 
├── lib lib目录   
│   ├── linkis-commons  ──公共依赖包 
│   ├── linkis-computation-governance ──计算治理模块的lib目录       
│   ├── linkis-engineconn-plugins  ──所有引擎插件的lib目录     
│   ├── linkis-public-enhancements ──公共增强服务的lib目录     
│   └── linkis-spring-cloud-services ──SpringCloud的lib目录         
├── logs logs 日志目录
│   ├── 2022-05
│   │   ├── linkis-cg-engineconnmanager
│   │   ├── linkis-cg-engineplugin
│   │   ├── linkis-cg-entrance
│   │   ├── linkis-cg-linkismanager
│   │   ├── linkis-mg-eureka
│   │   ├── linkis-mg-gateway
│   │   ├── linkis-ps-cs
│   │   └── linkis-ps-publicservice
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
│   │   ├── linkis-client.hadoop.log.20220506173421867398281
│   │   ├── linkis-client.hadoop.log.20220506174717309123214
│   │   ├── linkis-client.hadoop.log.20220506181154093620777
│   │   ├── linkis-client.hadoop.log.20220506222334715024110
│   │   └── linkis-client.hadoop.log.20220507100654982808251
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
├── pid 所有微服务的进程ID  
│   ├── linkis_cg-engineconnmanager.pid ──引擎管理器微服务
│   ├── linkis_cg-engineplugin.pid ──引擎插件微服务
│   ├── linkis_cg-entrance.pid ──引擎入口微服务
│   ├── linkis_cg-linkismanager.pid ──linkis管理器微服务
│   ├── linkis_mg-eureka.pid ──eureka微服务
│   ├── linkis_mg-gateway.pid ──gateway微服务  
│   ├── linkis_ps-cs.pid ──上下文微服务 
│   ├── linkis_ps-data-source-manager.pid ──数据源管理微服务 
│   ├── linkis_ps-metadatamanager.pid ──元数据查询微服务
│   └── linkis_ps-publicservice.pid ──公共微服务
└── sbin
    ├── common.sh
    ├── ext ──各个微服务的启停脚本目录
    ├── kill-process-by-pid.sh
    ├── **linkis-daemon.sh** ── **快捷启停、重启单个微服务脚本**  
    ├── **linkis-start-all.sh** ── **一键启动全部微服务脚本**  
    └── **linkis-stop-all.sh** ── **一键停止全部微服务脚本**

 ```
 
 ## 3. 配置项修改
 
 在执行完bin目录下的install.sh完成Linkis安装后，需要进行配置项修改，所有配置项位于con目录下，通常情况下需要修改db.sh、linkis.properties、linkis-env.sh三个配置文件，项目安装和配置可以参考文章《Linkis1.0安装》
 
 ## 4. 微服务启停
 
修改完配置项之后即可在sbin目录下启动微服务，所有微服务名称如下：
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
 
 以往启停单个微服务需要进入到各个微服务的bin目录下，执行start/stop脚本，在微服务较多的情况下启停比较麻烦，增加了很多额外的切换目录操作，Linkis1.0将所有的微服务启停相关的脚本放置在了sbin目录下，只需要执行单个入口脚本即可。
 
 **在Linkis/sbin目录下**：
 
``` 
 1.  一次性启动所有微服务：
 
     sh linkis-start-all.sh
 
 2.  一次性关停所有微服务
 
     sh linkis-stop-all.sh
 
 3.  启动单个微服务（服务名需要去掉linkis前缀如：mg-eureka）
 
     sh linkis-daemon.sh start service-name
 
     例如: sh linkis-daemon.sh start mg-eureka
 
 4.  关闭单个微服务
 
     sh linkis-daemon.sh stop service-name
 
     例如: sh linkis-daemon.sh stop mg-eureka
 
 5.  重启单个微服务
 
     sh linkis-daemon.sh restart service-name
 
     例如: sh linkis-daemon.sh restart mg-eureka
 
 6.  查看单个微服务的状态
 
     sh linkis-daemon.sh status service-name
 
     例如: sh linkis-daemon.sh status mg-eureka
```
