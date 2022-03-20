---
title: Release Notes 1.0.1-RC1
sidebar_position: 8
--- 

Linkis-1.1.0 包括所有 [Project Linkis-1.1.0](https://github.com/apache/incubator-linkis/projects/3)。

本次发布主要将数据源及元数据源管理作为服务正式引入 Linkis 工程中。

添加了以下主要功能：
* 提供Restful接口针对数据源进行增删查改，以及数据源的连接测试。
* 提供Restful接口针对元数据进行数据库、表、分区、列属性查询。
* 提供针对数据源及元数据服务管理的客户端。


缩写：

CGS: Computation Governance Services

PES: Public Enhancement Services

MGS: Microservice Governance Services

CGS: Computation Governance Services

EC:  Engineconn

ECM: EngineConnManager

DMS: Data Source Manager Service

MDS: MetaData Manager Service

---

## 新功能

#### Data Source Manager Service
* [[Linkis-1335]](https://github.com/apache/incubator-linkis/pull/1335) 增加新的模块 linkis-datasource-manager-common
* [[Linkis-1352]](https://github.com/apache/incubator-linkis/pull/1352)  增加新的模块 linkis-datasource-manager-server 

#### MetaData Manager Service
* [[Linkis-1356]](https://github.com/apache/incubator-linkis/pull/1356) 增加新的模块 linkis-metadata-manager-server
* [[Linkis-1366]](https://github.com/apache/incubator-linkis/pull/1366) 增加新的模块 linkis-metadata-manager-service-es
* [[Linkis-1368]](https://github.com/apache/incubator-linkis/pull/1368) 增加新的模块 linkis-metadata-manager-service-hive
* [[Linkis-1371]](https://github.com/apache/incubator-linkis/pull/1371) 增加新的模块 linkis-metadata-manager-service-kafka
* [[Linkis-1373]](https://github.com/apache/incubator-linkis/pull/1373) 增加新的模块 linkis-metadata-manager-service-mysql

#### Data Source Client

- [[Linkis-1418]](https://github.com/apache/incubator-linkis/pull/1418) [[Linkis-1434]](https://github.com/apache/incubator-linkis/pull/1434)[[Linkis-1438]](https://github.com/apache/incubator-linkis/pull/1438)[[Linkis-1441]](https://github.com/apache/incubator-linkis/pull/1441) 增加新的数据源管理客户端模块 linkis-datasource-client

#### Data Source Web

- [[Linkis-1456]](https://github.com/apache/incubator-linkis/pull/1456) [[Linkis-1510] 增加数据源前端管理页面

---

## 增强点
* [Linkis-1339](https://github.com/apache/incubator-linkis/pull/1339) \[Commons] 在linkis中添加knife4j，方便用户在开发调试代码时使用apiDoc
* [Linkis-1377](https://github.com/apache/incubator-linkis/pull/1377) \[MGS-LinkisServiceGateway] 将Skywalking 代理引入linkis中 
* [Linkis-1408](https://github.com/apache/incubator-linkis/pull/1408) \[CGS-EngineConnPlugin] 减少引擎资源的最大空闲时间
* [Linkis-1535](https://github.com/apache/incubator-linkis/pull/1535) \[CGS-EngineConnPlugin] 设置 JAVA_ENGINE_REQUEST_INSTANCE 的值为常量 1
* [Linkis-1554](https://github.com/apache/incubator-linkis/pull/1554) [Linkis-1651](https://github.com/apache/incubator-linkis/pull/1651) \[DB]  添加 DataSource DDL 和 DML SQL 
* [Linkis-1583](https://github.com/apache/incubator-linkis/pull/1583) \[MDS] 添加功能以获取 Hive 数据源中分区的属性并修复连接问题 
* [Linkis-1636](https://github.com/apache/incubator-linkis/pull/1636) \[MGS-LinkisServiceGateway] 使用正则表达式匹配网关 URL，如果匹配则正常通过
* [Linkis-1637](https://github.com/apache/incubator-linkis/pull/1637) \[DMS&MDS] 为DataSource相关模块添加单元测试 
* [Linkis-1643](https://github.com/apache/incubator-linkis/pull/1643) \[DMS&MDS-Client] 优化数据源客户端不必要的参数和统一的dataSourceId参数名称
* [Linkis-1660](https://github.com/apache/incubator-linkis/pull/1660) \[DMS&MDS] 使用 spring-boot-starter-jetty(wip)
* [Linkis-1717](https://github.com/apache/incubator-linkis/pull/1717) \[DMS&MDS] 调整模块顺序避免丢失server/* 数据源相关lib
* [Linkis-1397](https://github.com/apache/incubator-linkis/pull/1397) [Commons] 添加maven wrapper
* [Linkis-1425](https://github.com/apache/incubator-linkis/pull/1425) \[EC] 将ec的日志配置文件统一为log4j2.xml 
* [Linkis-1571](https://github.com/apache/incubator-linkis/pull/1571) \[ALL] 调整distribution.xml:排除不必要的依赖 
* [Linkis-1599](https://github.com/apache/incubator-linkis/pull/1599) \[MDS&DMS] 为新的第三方应用程序添加许可证文件 

---
## 修复功能

* [Linkis-1390](https://github.com/apache/incubator-linkis/pull/1390) \[Deployment] 修复问题 1314 这是一个错误，在安装脚本中创建结果集路径以确保所有 dss 用户都可以访问此路径
* [Linkis-1469](https://github.com/apache/incubator-linkis/pull/1469) [Commons] 修复 issue #1358，当 sql 包含 ';' 时，无法正确剪切 SQL
* [Linkis-1508](https://github.com/apache/incubator-linkis/pull/1508) \[MGS-LinkisServiceGateway] 修复knife4j会导致网关启动异常的问题
* [Linkis-1529](https://github.com/apache/incubator-linkis/pull/1529) \[CGS-EngineConnPlugin-JDBC] 修复 JDBC 引擎执行 error:21304, Task is Failed,errorMsg: NullPointerException: #1421 的问题
* [Linkis-1530](https://github.com/apache/incubator-linkis/pull/1530) \[Commons] 修复 jetty 冲突问题，排除 spring-jetty 中的 jetty 导入 
* [Linkis-1540](https://github.com/apache/incubator-linkis/pull/1540) \[CGS-Entrance] 修复 linkis-entrance 中“kill”方法的错误以支持空参数“taskID”，修复 #1538 
* [Linkis-1600](https://github.com/apache/incubator-linkis/pull/1600) \[Commons] 修复commons-compress低版本导致的这个问题
* [Linkis-1603](https://github.com/apache/incubator-linkis/pull/1603) \[CGS-Client] 修复客户端不支持 -runtimeMap 参数
* [Linkis-1610](https://github.com/apache/incubator-linkis/pull/1610) \[CGS-EngineConnPlugin-JDBC] 修复 jdbc 引擎 postgresql 不支持 sql "show databases;"导致执行失败
* [Linkis-1618](https://github.com/apache/incubator-linkis/pull/1618) \[Commons] 修复 [Bug] Message 对象的 xml 注解应该被移除 #1607
* [Linkis-1646](https://github.com/apache/incubator-linkis/pull/1646) \[CGS-EngineConnPlugin-JDBC] 修复 JDBC 引擎查询复杂类型字段时，值显示为对象地址。 
* [Linkis-1731](https://github.com/apache/incubator-linkis/pull/1731) \[CGS-EngineConnPlugin-PYTHON] 修复python引擎的showDF函数结果集字段行反转的问题

## 致谢 

Linkis 1.1.0 的成功发布离不开 Linkis 社区的贡献者。感谢所有社区贡献者！
