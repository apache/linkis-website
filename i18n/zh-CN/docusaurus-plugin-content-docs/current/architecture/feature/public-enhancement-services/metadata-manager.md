---
title: MetaData Manager Server 架构
sidebar_position: 3
---
## 背景

早期版本中的Exchangis0.x和Linkis0.x都有整合数据源模块，为复用数据源的管理能力，Linkis以linkis-datasource为蓝本(可以参阅相关的文档)重构数据源模块，将数据源管理拆封成数据源管理服务与元数据查询服务。

本文主要涉及MetaData Manager Server数据源管理服务，提供如下功能：

1）、Linkis统一管理服务启动与部署，不增加运维成本，复用Linkis服务能力；

2）、服务无状态，多实例部署，做到服务高可用。本系统在部署的时候，可以进行多实例部署，每个实例对外独立提供服务，不会互相干扰，所有的信息都是存储在数据库中进行共享。

3）、提供数据源全生命周期管理，包括新建、查询、更新、测试、过期管理。

4）、多版本数据源管理，历史数据源会保存在数据库中，并提供数据源过期管理。 

5）、Restful接口提供功能，详细列表：数据库信息查询、数据库表信息查询、数据库表参数信息查询、数据分区信息查询。

## 架构图

![BML架构图](/Images-zh/Architecture/datasource/meta-server.png)

## 架构说明

1、服务登记在Linkis-Eureak-Service服务中，与Linkis其他微服务统一管理，客户端可以通过连接Linkis-GateWay-Service服务与服务名 metamanager获取数据源管理服务。 

2、接口层，通过Restful接口向其他应用，提供了数据库\表\分区信息查询;

3、Service层，通过数据源ID号在数据源管理服务中获取到数据源类型，通过类型获取具体支持的服务，支持的服务为mysql\es\kafka\hive;

### 核心流程

1、 客户端输入指定的数据源ID，通过restful接口获取信息，如查询数据源ID为1的数据库列表，，则url为`http://<meta-server-url>/metadatamanager/dbs/1`，

2、 根据数据源ID，通过RPC访问数据源服务`<data-source-manager>`获取到数据源类型

3、 根据数据源类型，加载对应的Service服务[hive\es\kafka\mysql]，执行对应的操作，然后返回；