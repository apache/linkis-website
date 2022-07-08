---
title: Release Notes 1.1.0
sidebar_position: 8
--- 

Apache Linkis(incubating) 1.1.0 包括所有 [Project Linkis-1.1.0](https://github.com/apache/incubator-linkis/projects/3)。

本次发布主要新增数据源及元数据源管理服务，支持对hive/mysql/kafka/elasticsearch的元数据信息查询，修复社区反馈的1.0.3版本中的bug。

添加了以下主要功能：
* 提供Restful接口针对数据源进行增删查改，以及数据源的连接测试。
* 提供Restful接口针对元数据进行数据库、表、分区、列属性查询。
* 提供针对数据源及元数据服务管理的Java客户端。

缩写：

- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service

---

## 新特性

* \[DMS-Common][[Linkis-1335]](https://github.com/apache/incubator-linkis/pull/1335) 增加新的模块 linkis-datasource-manager-common，新增数据源数据结构、异常类、工具类。
* \[MDS-Common][[Linkis-1340]](https://github.com/apache/incubator-linkis/pull/1340) 增加新的模块 linkis-metadata-manager-common，新增元数据数据结构、异常类、工具类。
* \[DMS-Server][[Linkis-1352]](https://github.com/apache/incubator-linkis/pull/1352) 增加新的模块 linkis-datasource-manager-server，提供数据源管理服务，通过restful接口提供了数据源的增删查改、连接测试等功能。
* \[MDS-Server][[Linkis-1356]](https://github.com/apache/incubator-linkis/pull/1356) 增加新的模块 linkis-metadata-manager-server，提供元数据管理服务，通过restful接口提供了元数据的数据库、表、列查询。
* \[MDS-Services][[Linkis-1366]](https://github.com/apache/incubator-linkis/pull/1366) 增加新的模块 linkis-metadata-manager-service-es，提供针对的elasticsearch元数据管理服务。
* \[MDS-Services][[Linkis-1368]](https://github.com/apache/incubator-linkis/pull/1368) 增加新的模块 linkis-metadata-manager-service-hive，提供针对hive的元数据管理服务。
* \[MDS-Services][[Linkis-1371]](https://github.com/apache/incubator-linkis/pull/1371) 增加新的模块 linkis-metadata-manager-service-kafka，提供针对kafka的元数据管理服务。
* \[MDS-Services][[Linkis-1373]](https://github.com/apache/incubator-linkis/pull/1373) 增加新的模块 linkis-metadata-manager-service-mysql，提供针对mysql的元数据管理服务。
* \[DMS&MDS-Client][[Linkis-1418]](https://github.com/apache/incubator-linkis/pull/1418) [[Linkis-1434]](https://github.com/apache/incubator-linkis/pull/1434)[[Linkis-1438]](https://github.com/apache/incubator-linkis/pull/1438)[[Linkis-1441]](https://github.com/apache/incubator-linkis/pull/1441) 增加新的数据源管理Java客户端模块 linkis-datasource-client，方便通过sdk方式进行数据源管理。
* \[DMS&MDS-Web][[Linkis-1456]](https://github.com/apache/incubator-linkis/pull/1456) [[Linkis-1510] 增加数据源前端管理页面，通过该页面可以对数据源进行简单的创建，测试。

---

## 增强点
* \[Install-Script][[Linkis-1377]](https://github.com/apache/incubator-linkis/pull/1377) 引入Skywalking组件, 提供分布式 trace 和 troubleshooting的基础能力
* \[ECP][[Linkis-1408]](https://github.com/apache/incubator-linkis/pull/1408) 调整引擎资源的默认的最大空闲时间为0.5h，优化多用户场景下，资源竞争等待的时长问题
* \[ECP][[Linkis-1535]](https://github.com/apache/incubator-linkis/pull/1535) 设置 JAVA_ENGINE_REQUEST_INSTANCE 的值为常量 1
* \[DB][[Linkis-1554]](https://github.com/apache/incubator-linkis/pull/1554) 添加 DataSource DDL 和 DML SQL 
* \[MDS][[Linkis-1583]](https://github.com/apache/incubator-linkis/pull/1583) 添加功能以获取 Hive 数据源中分区的属性并修复连接问题 
* \[Gateway][[Linkis-1636]](https://github.com/apache/incubator-linkis/pull/1636)使用正则表达式匹配网关 URL，如果匹配则正常通过
* \[Commons][[Linkis-1397]](https://github.com/apache/incubator-linkis/pull/1397) 添加maven wrapper，支持使用mvnw脚本进行编译打包
* \[EC][[Linkis-1425]](https://github.com/apache/incubator-linkis/pull/1425)将ec的日志配置文件统一为log4j2.xml 
* \[Install-Script][[Linkis-1563]](https://github.com/apache/incubator-linkis/pull/1563) 优化linkis-cli 客户端脚本，移除冗余的linkis-cli-start脚本文件
* \[Install-Script][[Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) 优化安装部署脚本，安装部署时，添加数据库连接测试检查;进行数据库初始化之前，打印数据库的信息，以便人员再次确认
* \[Install-Script][Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) 添加必要的部署日志信息以及关键信息的颜色标识，如执行步骤/创建目录的日志等。
* \[Install-Script][[Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559) 为spark/hadoop/hive 添加基本环境检查
* \[Install-Script][[Linkis-1559]](https://github.com/apache/incubator-linkis/issues/1559)将hive元数据库HIVE_META 信息配置从linkis-env.sh迁移到 db.sh
* \[Commons][[Linkis-1557]](https://github.com/apache/incubator-linkis/issues/1557)Spring-boot/Spring-cloud版本控制使用官方依赖管理器的pom文件方式，避免引入了太多的版本配置
* \[Commons][[Linkis-1621]](https://github.com/apache/incubator-linkis/pull/1621) Spring升级，Spring-boot升级至2.3.12.RELEASE，Spring-cloud升级至Hoxton.SR12
* \[Commons][[Linkis-1558]](https://github.com/apache/incubator-linkis/issues/1558) 单元测试JUnit 4 迁移升级至 JUnit 5
* \[Commons&Eureka][[Linkis-1313]](https://github.com/apache/incubator-linkis/issues/1313)移除不必要的第三方依赖，一定程度减小打包后的物料包大小
* \[Commons&Gateway][[Linkis-1660]](https://github.com/apache/incubator-linkis/pull/1660)使用spring-boot-starter-jetty替换直接引入jetty依赖方式，避免jetty版本冲突
---

## 修复功能
* \[Install-Script][[Linkis-1390]](https://github.com/apache/incubator-linkis/pull/1390) 修复安装部署时创建的存储Job结果集文件目录 `wds.linkis.resultSet.store.path`，使用过程中切换用户后存在的权限不足的问题 
* \[Commons][[Linkis-1469]](https://github.com/apache/incubator-linkis/pull/1469)  修复sql脚本中包含 ';'字符时，无法正确切割SQL问题
* \[EC-JDBC]][[Linkis-1529]](https://github.com/apache/incubator-linkis/pull/1529)  修复 JDBC 引擎认证类型参数存在的NullPointerException的异常问题
* \[Entrance][[Linkis-1540]](https://github.com/apache/incubator-linkis/pull/1540)  修复 linkis-entrance 中“kill”方法参数long类型导致null值无法识别问题
* \[Commons][[Linkis-1600]](https://github.com/apache/incubator-linkis/pull/1600)  修复低版本commons-compress，导致结果集下载为excel时出错
* \[Client][[Linkis-1603]](https://github.com/apache/incubator-linkis/pull/1603)  修复客户端不支持 -runtimeMap 参数问题
* \[EC-JDBC][[Linkis-1610]](https://github.com/apache/incubator-linkis/pull/1610)  修复 jdbc引擎 对于postgresql 无法支持"show databases;"语句问题
* \[Commons][[Linkis-1618]](https://github.com/apache/incubator-linkis/pull/1618)  修复 http response 返回结果为xml格式，而不是json格式问题
* \[EC-JDBC][[Linkis-1646]](https://github.com/apache/incubator-linkis/pull/1646)  修复 JDBC 引擎查询复杂类型字段时，值显示为对象地址。 
* \[EC-Python][[Linkis-1731]](https://github.com/apache/incubator-linkis/pull/1731) 修复python引擎的showDF函数结果集字段行反转的问题
* \[PES-BML][[Linkis-1556]](https://github.com/apache/incubator-linkis/issues/1556) 修复文件下载接口可能出现的HttpMessageNotWritableException异常

## 致谢 

Apache Linkis(incubating) 1.1.0的发布离不开Linkis社区的贡献者,感谢所有的社区贡献者，包括但不仅限于以下Contributors: Alexkun、CCweixiao、Celebrate-future、Davidhua1996、FireFoxAhri、WenxiangFan、Zosimer、aleneZeng、casionone、dddyszy、det101、ganlangjie、huapan123456、huiyuanjjjjuice、husofskyzy、iture123、jianwei2、legendtkl、peacewong、pjfanning、silly-carbon、xiaojie19852006