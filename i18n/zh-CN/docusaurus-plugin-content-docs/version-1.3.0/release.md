---
title: 版本总览
sidebar_position: 0.1
--- 
- [Linkis 容器化构建流程](/development/build-docker.md)
- [Linkis 容器化体验版 LDH 快速部署](/deployment/deploy-to-kubernetes.md)
- [Linkis 容器化开发调试](/development/debug-with-helm-charts.md)
- [PES 公共服务组服务合并详情](/blog/2022/10/09/linkis-service-merge)
- [Session 支持 Redis 共享存储](/user-guide/sso-with-redis.md)


## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| common | 新增 |linkis.session.redis.host| 127.0.0.1 | redis连接地址 |
| common | 新增 |linkis.session.redis.port| 6379 | redis连接端口 |
| common | 新增 |linkis.session.redis.password| test123 | redis连接密码 |
| common | 新增 |linkis.session.redis.cache.enabled| false | redis sso 开关 |
| ps-cs | 新增 | wds.linkis.server.restful.scan.packages | org.apache.linkis.cs.server.restful | restful包扫描路径 |
| ps-cs | 新增 | wds.linkis.server.mybatis.mapperLocations | classpath*:org/apache/linkis/cs/persistence/dao/impl/*.xml | mapper扫描路径 |
| ps-cs | 新增 | wds.linkis.server.mybatis.typeAliasesPackage | org.apache.linkis.cs.persistence.entity | 数据表映射实体类包路径 |
| ps-cs | 新增 | wds.linkis.server.mybatis.BasePackage | org.apache.linkis.cs.persistence.dao | Mybatis 包扫描路径 |
| ps-cs | 新增 | spring.server.port | 9108 | 服务端口 |
| ps-cs | 新增 | spring.eureka.instance.metadata-map.route | cs_1_dev | ps-cs路由前缀(必须以cs_打头) |
| ps-cs | 新增 | wds.linkis.cs.deserialize.replace_package_header.enable |  false | 反序列化时是否替换包头部 |
| ps-data-source-manager | 新增 | wds.linkis.server.restful.scan.packages | org.apache.linkis.datasourcemanager.core.restful | restful包扫描路径 |
| ps-data-source-manager | 新增 | wds.linkis.server.mybatis.mapperLocations | classpath:org/apache/linkis/datasourcemanager/core/dao/mapper/*.xml | mapper扫描路径 |
| ps-data-source-manager | 新增 | wds.linkis.server.mybatis.typeAliasesPackage | org.apache.linkis.datasourcemanager.common.domain,org.apache.linkis.datasourcemanager.core.vo | 数据表映射实体类包路径 |
| ps-data-source-manager | 新增 | wds.linkis.server.mybatis.BasePackage | org.apache.linkis.datasourcemanager.core.dao | Mybatis 包扫描路径 |
| ps-data-source-manager | 新增 | hive.meta.url | None | hive连接地址 |
| ps-data-source-manager | 新增 | hive.meta.user | None | hive连接用户 |
| ps-data-source-manager | 新增 | hive.meta.password | None | hive连接密码 |
| ps-data-source-manager | 新增 | wds.linkis.metadata.hive.encode.enabled | false | 是否启用BASE64编解码 |
| ps-data-source-manager | 新增 | spring.server.port | 9109 | 服务端口 |
| ps-data-source-manager | 新增 | spring.spring.main.allow-bean-definition-overriding | true | 是否允许Bean定义覆盖 |
| ps-data-source-manager | 新增 | spring.jackson.serialization.FAIL_ON_EMPTY_BEANS | false | 是否允许空beans |
| ps-data-source-manager | 新增 | wds.linkis.server.mdm.service.instance.expire-in-seconds | 1800 | 服务实例过期时间 |
| ps-data-source-manager | 新增 | wds.linkis.server.restful.scan.packages | org.apache.linkis.metadata.query.server.restful | restful包扫描路径 |
| ps-data-source-manager | 新增 | wds.linkis.server.dsm.app.name | linkis-ps-data-source-manager | 服务名称 |
| ps-data-source-manager | 新增 | spring.server.port | 9110 | 服务端口 |
| ps-publicservice | 修改 | wds.linkis.server.restful.scan.packages | org.apache.linkis.cs.server.restful,org.apache.linkis.datasourcemanager.core.restful,org.apache.linkis.metadata.query.server.restful,org.apache.linkis.jobhistory.restful,org.apache.linkis.variable.restful,org.apache.linkis.configuration.restful,org.apache.linkis.udf.api,org.apache.linkis.filesystem.restful,org.apache.linkis.filesystem.restful,org.apache.linkis.instance.label.restful,org.apache.linkis.metadata.restful.api,org.apache.linkis.cs.server.restful,org.apache.linkis.bml.restful,org.apache.linkis.errorcode.server.restful | restful包扫描路径 |
|ps-publicservice|修改|wds.linkis.server.mybatis.mapperLocations|classpath*:org/apache/linkis/cs/persistence/dao/impl/*.xml,classpath:org/apache/linkis/datasourcemanager/core/dao/mapper/*.xml,classpath:org/apache/linkis/jobhistory/dao/impl/*.xml,classpath:org/apache/linkis/variable/dao/impl/*.xml,classpath:org/apache/linkis/configuration/dao/impl/*.xml,classpath:org/apache/linkis/udf/dao/impl/*.xml,classpath:org/apache/linkis/instance/label/dao/impl/*.xml,classpath:org/apache/linkis/metadata/hive/dao/impl/*.xml,org/apache/linkis/metadata/dao/impl/*.xml,classpath:org/apache/linkis/bml/dao/impl/*.xml|mapper扫描路径|
|ps-publicservice|修改|wds.linkis.server.mybatis.typeAliasesPackage|org.apache.linkis.cs.persistence.entity,org.apache.linkis.datasourcemanager.common.domain,org.apache.linkis.datasourcemanager.core.vo,org.apache.linkis.configuration.entity,org.apache.linkis.jobhistory.entity,org.apache.linkis.udf.entity,org.apache.linkis.variable.entity,org.apache.linkis.instance.label.entity,org.apache.linkis.manager.entity,org.apache.linkis.metadata.domain,org.apache.linkis.bml.entity| 数据表映射实体类包路径 |
|ps-publicservice|修改|wds.linkis.server.mybatis.BasePackage|org.apache.linkis.cs.persistence.dao,org.apache.linkis.datasourcemanager.core.dao,org.apache.linkis.jobhistory.dao,org.apache.linkis.variable.dao,org.apache.linkis.configuration.dao,org.apache.linkis.udf.dao,org.apache.linkis.instance.label.dao,org.apache.linkis.metadata.hive.dao,org.apache.linkis.metadata.dao,org.apache.linkis.bml.dao,org.apache.linkis.errorcode.server.dao,org.apache.linkis.publicservice.common.lock.dao|  Mybatis 包扫描路径 |
| ps-publicservice | 新增 | wds.linkis.cs.deserialize.replace_package_header.enable | false | 反序列化时是否替换包头部 |
| ps-publicservice | 新增 | wds.linkis.rpc.conf.enable.local.message | true | 是否启用本地消息 |
| ps-publicservice | 新增 | wds.linkis.rpc.conf.local.app.list | linkis-ps-publicservice | 本地应用列表 |
| ps-publicservice | 新增 | spring.server.port | 9105 | 服务端口 |
| ps-publicservice | 新增 | spring.spring.main.allow-bean-definition-overriding | true | 是否允许Bean定义覆盖 |
| ps-publicservice | 新增 | spring.spring.jackson.serialization.FAIL_ON_EMPTY_BEANS | false | 是否允许空beans |
| ps-publicservice | 新增 | spring.eureka.instance.metadata-map.route | cs_1_dev | 路由前缀(必须以cs_打头 |


## 数据库表变化 
详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.3.0_schema`文件
