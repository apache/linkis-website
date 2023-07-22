---
title: 1.3.2 到 1.4.0 的升级指南
sidebar_position: 3
---

> 本文简单介绍Linkis从1.3.2升级到1.4.0的注意事项，Linkis1.4.0 对Linkis的多个服务进行了调整，改动较大，本文将介绍从1.3.2到1.4.0升级过程中的注意事项。

## 1. 注意事项

**1) 如果您是首次接触并使用Linkis，您可以忽略该章节，参考[单机部署](../deployment/deploy-quick.md)指南部署 Linkis 即可。**

**2) 如果您已安装 Likis 1.3.2 且不想保留 1.3.2 中的数据，也可参考[单机部署](../deployment/deploy-quick.md)指南重新部署，安装时选择 2 清理所有数据并重建表即可（见下面代码）。**
```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 2
```

****

## 2. 环境升级 

Linkis 1.4.0 将默认的依赖环境 Hadoop、Hive、Spark 版本升级为 3.x。分别为 Hadoop 升级为 3.3.4、Hive 升级为 3.1.3、Spark升级为 3.2.1。请将这些环境进行升级后再进行后续操作。

## 3. 服务升级安装

因为 1.4.0 版本量改动较大，所以 1.3.2 到 1.4.0 升级时服务需要进行重新安装。

在安装时如果需要保留 1.3.2 的数据，一定要选择 1 跳过建表语句（见下面代码）。

Linkis 1.4.0 的安装可以参考[如何快速安装](../deployment/deploy-quick.md)

```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
```

## 4. 数据库升级

  服务安装完成后，需要对数据库进行结构修改，包括进行表结构变更和新增表和数据：

### 4.1 表结构修改部分：

```mysql-sql
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `identifier` varchar(32) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `ticketId` varchar(255) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_ec_resource_info_record` MODIFY COLUMN metrics TEXT DEFAULT NULL COMMENT 'ec metrics';
```

### 4.2 需要新执行的sql：

```sql
-- 默认版本升级
UPDATE linkis_ps_configuration_config_key SET default_value = 'python3' WHERE `key` = 'spark.python.version';
UPDATE linkis_cg_manager_label SET label_value = '*-*,hive-3.1.3' WHERE label_value = '*-*,hive-2.3.3';
UPDATE linkis_cg_manager_label SET label_value = '*-IDE,hive-3.1.3' WHERE label_value = '*-IDE,hive-2.3.3';
UPDATE linkis_cg_manager_label SET label_value = '*-nodeexecution,hive-3.1.3' WHERE label_value = '*-nodeexecution,hive-2.3.3';
UPDATE linkis_cg_manager_label SET label_value = '*-*,spark-3.2.1' WHERE label_value = '*-*,spark-2.4.3';
UPDATE linkis_cg_manager_label SET label_value = '*-IDE,spark-3.2.1' WHERE label_value = '*-IDE,spark-2.4.3';
UPDATE linkis_cg_manager_label SET label_value = '*-Visualis,spark-3.2.1' WHERE label_value = '*-Visualis,spark-2.4.3';
UPDATE linkis_cg_manager_label SET label_value = '*-nodeexecution,spark-3.2.1' WHERE label_value = '*-nodeexecution,spark-2.4.3';

-- 支持不同的数据源
INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('tidb', 'tidb数据库', 'tidb', '关系型数据库', '', 3, 'TiDB Database', 'TiDB', 'Relational Database');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'tidb';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', '主机名(Host)', 'Host', NULL, 'TEXT', NULL, 1, '主机名(Host)', 'Host', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'port', '端口号(Port)', 'Port', NULL, 'TEXT', NULL, 1, '端口号(Port)', 'Port', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'driverClassName', '驱动类名(Driver class name)', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, '驱动类名(Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', '用户名(Username)', 'Username', NULL, 'TEXT', NULL, 1, '用户名(Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 0, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', '实例名(instance)', 'Instance', NULL, 'TEXT', NULL, 1, '实例名(instance)', 'Instance', NULL, NULL, NULL, NULL,  now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('starrocks', 'starrocks数据库', 'starrocks', 'olap', '', 4, 'StarRocks Database', 'StarRocks', 'Olap');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'starrocks';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', '主机名(Host)', 'Host', NULL, 'TEXT', NULL, 1, '主机名(Host)', 'Host', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'port', '端口号(Port)', 'Port', NULL, 'TEXT', NULL, 1, '端口号(Port)', 'Port', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'driverClassName', '驱动类名(Driver class name)', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, '驱动类名(Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', '用户名(Username)', 'Username', NULL, 'TEXT', NULL, 1, '用户名(Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 0, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', '实例名(instance)', 'Instance', NULL, 'TEXT', NULL, 1, '实例名(instance)', 'Instance', NULL, NULL, NULL, NULL,  now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('gaussdb', 'gaussdb数据库', 'gaussdb', '关系型数据库', '', 3, 'GaussDB Database', 'GaussDB', 'Relational Database');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'gaussdb';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', '主机名(Host)', 'Host', NULL, 'TEXT', NULL, 1, '主机名(Host)', 'Host', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'port', '端口号(Port)', 'Port', NULL, 'TEXT', NULL, 1, '端口号(Port)', 'Port', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'driverClassName', '驱动类名(Driver class name)', 'Driver class name', 'org.postgresql.Driver', 'TEXT', NULL, 1, '驱动类名(Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', '用户名(Username)', 'Username', NULL, 'TEXT', NULL, 1, '用户名(Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 1, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', '实例名(instance)', 'Instance', NULL, 'TEXT', NULL, 1, '实例名(instance)', 'Instance', NULL, NULL, NULL, NULL,  now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('oceanbase', 'oceanbase数据库', 'oceanbase', 'olap', '', 4, 'oceanbase Database', 'oceanbase', 'Olap');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'oceanbase';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', '主机名(Host)', 'Host', NULL, 'TEXT', NULL, 1, '主机名(Host)', 'Host', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'port', '端口号(Port)', 'Port', NULL, 'TEXT', NULL, 1, '端口号(Port)', 'Port', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'driverClassName', '驱动类名(Driver class name)', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, '驱动类名(Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', '用户名(Username)', 'Username', NULL, 'TEXT', NULL, 1, '用户名(Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 1, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', '实例名(instance)', 'Instance', NULL, 'TEXT', NULL, 1, '实例名(instance)', 'Instance', NULL, NULL, NULL, NULL,  now(), now());
```

## 4. 添加mysql驱动包
linkis 升级为 1.4.0 后mysql 驱动包需使用 8.x 版本，以 8.0.28 版本为例：[下载连接](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar)拷贝驱动包至lib包下

```
cp mysql-connector-java-8.0.28.jar  ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-8.0.28.jar  ${LINKIS_HOME}/lib/linkis-commons/public-module/
```

## 5. 启动服务

```shell
sh linkis-start-all.sh
```

## 6. 注意事项

1. Spark 升级为 3.x 后，不兼容 python2，因此在执行 pyspark 任务时需要安装 python3，并执行如下操作
```shell
sudo ln -snf /usr/bin/python3 /usr/bin/python2
```
2. 升级时配置文件中 Token 值没法自动与原数据库 Token 值统一。需要手动修改 `linkis.properties` 和 `linkis-cli/linkis-cli.properties` 文件中的Token 值为与数据表 `linkis_mg_gateway_auth_token` 相对应的 Token 值。
3. 该文档为 Linkis 1.3.2 版本升级为 1.4.0 版本指引文档。如需将其它 Linkis 版本升级为 1.4.0，请进行全量安装或先将原系统升级为 1.3.2 后再按本指引文档进行升级操作。