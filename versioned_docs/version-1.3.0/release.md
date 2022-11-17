---
title: Version Overview
sidebar_position: 0.1
---

- [Build Linkis Docker Image](/development/build-docker.md)
- [Linkis Docker LDH Quick Deployment](/deployment/deploy-to-kubernetes.md)
- [Development & Debugging with Kubernetes](development/debug-with-helm-charts.md)
- [PES Public Service Group Service Merge Details](/blog/2022/10/09/linkis-service-merge)
- [Session supports Redis shared storage](/user-guide/sso-with-redis.md)


## Configuration Item

| Module Name (Service Name) | Type | Parameter Name | Default Value | Description |
| --------------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| common | ADD |linkis.session.redis.host| 127.0.0.1 | redis connection IP |
| common | ADD |linkis.session.redis.port| 6379 | redis connection port |
| common | ADD |linkis.session.redis.password| test123 | redis connection password |
| common | ADD |linkis.session.redis.cache.enabled| false | redis sso switch |
| ps-cs | ADD | wds.linkis.server.restful.scan.packages | org.apache.linkis.cs.server.restful | restful packages scan path |
| ps-cs | ADD | wds.linkis.server.mybatis.mapperLocations | classpath*:org/apache/linkis/cs/persistence/dao/impl/*.xml | mapper scan path |
| ps-cs | ADD | wds.linkis.server.mybatis.typeAliasesPackage | org.apache.linkis.cs.persistence.entity |  table map entity class package path |
| ps-cs | ADD | wds.linkis.server.mybatis.BasePackage | org.apache.linkis.cs.persistence.dao | Mybatis package scan path |
| ps-cs | ADD | spring.server.port | 9108 | server port |
| ps-cs | ADD | spring.eureka.instance.metadata-map.route | cs_1_dev | ps-cs route prefix(must be start with cs_) |
| ps-cs | ADD | wds.linkis.cs.deserialize.replace_package_header.enable |  false | Whether to replace the packet header during deserialization |
| ps-data-source-manager | ADD | wds.linkis.server.restful.scan.packages | org.apache.linkis.datasourcemanager.core.restful | restfu packages Scan path |
| ps-data-source-manager | ADD | wds.linkis.server.mybatis.mapperLocations | classpath:org/apache/linkis/datasourcemanager/core/dao/mapper/*.xml | Mapper Scan path |
| ps-data-source-manager | ADD | wds.linkis.server.mybatis.typeAliasesPackage | org.apache.linkis.datasourcemanager.common.domain,org.apache.linkis.datasourcemanager.core.vo |  table map entity class package path |
| ps-data-source-manager | ADD | wds.linkis.server.mybatis.BasePackage | org.apache.linkis.datasourcemanager.core.dao | Mybatis package scan path |
| ps-data-source-manager | ADD | hive.meta.url | None | hive connection ip |
| ps-data-source-manager | ADD | hive.meta.user | None | hive connection user |
| ps-data-source-manager | ADD | hive.meta.password | None | hive connection password |
| ps-data-source-manager | ADD | wds.linkis.metadata.hive.encode.enabled | false | Whether to enable BASE64 codec |
| ps-data-source-manager | ADD | spring.server.port | 9109 | server port |
| ps-data-source-manager | ADD | spring.spring.main.allow-bean-definition-overriding | true | Whether beans are allowed to define overrides |
| ps-data-source-manager | ADD | spring.jackson.serialization.FAIL_ON_EMPTY_BEANS | false | Whether empty beans are allowed |
| ps-data-source-manager | ADD | wds.linkis.server.mdm.service.instance.expire-in-seconds | 1800 | server instance expire time|
| ps-data-source-manager | ADD | wds.linkis.server.restful.scan.packages | org.apache.linkis.metadata.query.server.restful | restfu packages Scan path |
| ps-data-source-manager | ADD | wds.linkis.server.dsm.app.name | linkis-ps-data-source-manager | server name |
| ps-data-source-manager | ADD | spring.server.port | 9110 | server port |
| ps-publicservice | UPDATE | wds.linkis.server.restful.scan.packages | org.apache.linkis.cs.server.restful,org.apache.linkis.datasourcemanager.core.restful,org.apache.linkis.metadata.query.server.restful,org.apache.linkis.jobhistory.restful,org.apache.linkis.variable.restful,org.apache.linkis.configuration.restful,org.apache.linkis.udf.api,org.apache.linkis.filesystem.restful,org.apache.linkis.filesystem.restful,org.apache.linkis.instance.label.restful,org.apache.linkis.metadata.restful.api,org.apache.linkis.cs.server.restful,org.apache.linkis.bml.restful,org.apache.linkis.errorcode.server.restful | restfu packages Scan path |
|ps-publicservice|UPDATE|wds.linkis.server.mybatis.mapperLocations|classpath*:org/apache/linkis/cs/persistence/dao/impl/*.xml,classpath:org/apache/linkis/datasourcemanager/core/dao/mapper/*.xml,classpath:org/apache/linkis/jobhistory/dao/impl/*.xml,classpath:org/apache/linkis/variable/dao/impl/*.xml,classpath:org/apache/linkis/configuration/dao/impl/*.xml,classpath:org/apache/linkis/udf/dao/impl/*.xml,classpath:org/apache/linkis/instance/label/dao/impl/*.xml,classpath:org/apache/linkis/metadata/hive/dao/impl/*.xml,org/apache/linkis/metadata/dao/impl/*.xml,classpath:org/apache/linkis/bml/dao/impl/*.xml|Mapper Scan path|
|ps-publicservice|UPDATE|wds.linkis.server.mybatis.typeAliasesPackage|org.apache.linkis.cs.persistence.entity,org.apache.linkis.datasourcemanager.common.domain,org.apache.linkis.datasourcemanager.core.vo,org.apache.linkis.configuration.entity,org.apache.linkis.jobhistory.entity,org.apache.linkis.udf.entity,org.apache.linkis.variable.entity,org.apache.linkis.instance.label.entity,org.apache.linkis.manager.entity,org.apache.linkis.metadata.domain,org.apache.linkis.bml.entity|  table map entity class package path |
|ps-publicservice|UPDATE|wds.linkis.server.mybatis.BasePackage|org.apache.linkis.cs.persistence.dao,org.apache.linkis.datasourcemanager.core.dao,org.apache.linkis.jobhistory.dao,org.apache.linkis.variable.dao,org.apache.linkis.configuration.dao,org.apache.linkis.udf.dao,org.apache.linkis.instance.label.dao,org.apache.linkis.metadata.hive.dao,org.apache.linkis.metadata.dao,org.apache.linkis.bml.dao,org.apache.linkis.errorcode.server.dao,org.apache.linkis.publicservice.common.lock.dao|  Mybatis package scan path |
| ps-publicservice | ADD | wds.linkis.cs.deserialize.replace_package_header.enable | false | Whether to replace the packet header during deserialization |
| ps-publicservice | ADD | wds.linkis.rpc.conf.enable.local.message | true | enable local message |
| ps-publicservice | ADD | wds.linkis.rpc.conf.local.app.list | linkis-ps-publicservice | local app list |
| ps-publicservice | ADD | spring.server.port | 9105 | server port |
| ps-publicservice | ADD | spring.spring.main.allow-bean-definition-overriding | true | Whether beans are allowed to define overrides |
| ps-publicservice | ADD | spring.spring.jackson.serialization.FAIL_ON_EMPTY_BEANS | false | Whether empty beans are allowed |
| ps-publicservice | ADD | spring.eureka.instance.metadata-map.route | cs_1_dev | route prefix(must be start with cs_ |

## DB Table Changes
For details, see the upgrade schema`db/upgrade/1.3.0_schema` file in the corresponding branch of the 
code repository (https://github.com/apache/incubator-linkis).