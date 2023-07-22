---
title: 1.3.2 to 1.4.0 upgrade guide
sidebar_position: 3
---

> This article briefly introduces the precautions for upgrading Linkis from 1.3.2 to 1.4.0. Linkis 1.4.0 has adjusted multiple services of Linkis, with major changes. This article will introduce the precautions during the upgrade from 1.3.2 to 1.4.0.

## 1. Precautions

**1) If you are using Linkis for the first time, you can ignore this chapter and refer to the [Single-machine deployment](../deployment/deploy-quick.md) guide to deploy Linkis. **

**2) If you have installed Likis 1.3.2 and do not want to keep the data in 1.3.2, you can also refer to the [Single-machine deployment](../deployment/deploy-quick.md) guide to redeploy, choose 2 to clear all data and rebuild the table during installation (see the code below). **
```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 2
```

****

## 2. Environment upgrade

Linkis 1.4.0 upgrades the default dependent environments Hadoop, Hive, and Spark to 3.x. Hadoop was upgraded to 3.3.4, Hive was upgraded to 3.1.3, and Spark was upgraded to 3.2.1. Please upgrade these environments before performing subsequent operations.

## 3. Service upgrade installation

Because the 1.4.0 version has changed a lot, the service needs to be reinstalled when upgrading from 1.3.2 to 1.4.0.

If you need to keep the data of 1.3.2 during installation, you must choose 1 to skip the table creation statement (see the code below).

Linkis 1.4.0 installation can refer to [How to install quickly](../deployment/deploy-quick.md)

```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
```

## 4. Database upgrade

  After the service installation is complete, the structure of the database needs to be modified, including table structure changes and new tables and data:

### 4.1 Table structure modification part:

```mysql-sql
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `identifier` varchar(32) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `ticketId` varchar(255) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_ec_resource_info_record` MODIFY COLUMN metrics TEXT DEFAULT NULL COMMENT 'ec metrics';
```

### 4.2 Newly executed sql is required:

```sql
-- Default version upgrade
UPDATE linkis_ps_configuration_config_key SET default_value = 'python3' WHERE `key` = 'spark.python.version';
UPDATE linkis_cg_manager_label SET label_value = '*-*,hive-3.1.3' WHERE label_value = '*-*,hive-2.3.3';
UPDATE linkis_cg_manager_label SET label_value = '*-IDE,hive-3.1.3' WHERE label_value = '*-IDE,hive-2.3.3';
UPDATE linkis_cg_manager_label SET label_value = '*-nodeexecution,hive-3.1.3' WHERE label_value = '*-nodeexecution,hive-2.3.3';
UPDATE linkis_cg_manager_label SET label_value = '*-*,spark-3.2.1' WHERE label_value = '*-*,spark-2.4.3';
UPDATE linkis_cg_manager_label SET label_value = '*-IDE,spark-3.2.1' WHERE label_value = '*-IDE,spark-2.4.3';
UPDATE linkis_cg_manager_label SET label_value = '*-Visualis,spark-3.2.1' WHERE label_value = '*-Visualis,spark-2.4.3';
UPDATE linkis_cg_manager_label SET label_value = '*-nodeexecution,spark-3.2.1' WHERE label_value = '*-nodeexecution,spark-2.4.3';

-- Support for different data sources
INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('tidb', 'tidb database', 'tidb', 'relational database', '', 3, 'TiDB Database', 'TiDB', 'Relational Database');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'tidb';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, 'Driver class name', 'Driver class name', NULL, NULL, NULL, NULL, now(), now( )),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', 'Username (Username)', 'Username', NULL, 'TEXT', NULL, 1, 'Username (Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 0, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('starrocks', 'starrocks数据库', 'starrocks', 'olap', '', 4, 'StarRocks Database', 'StarRocks', 'Olap');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'starrocks';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, 'Driver class name', 'Driver class name', NULL, NULL, NULL, NULL, now(), now( )),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', 'Username (Username)', 'Username', NULL, 'TEXT', NULL, 1, 'Username (Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 0, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('gaussdb', 'gaussdb database', 'gaussdb', 'relational database', '', 3, 'GaussDB Database', 'GaussDB', 'Relational Database');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'gaussdb';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'org.postgresql.Driver', 'TEXT', NULL, 1, 'Driver class name', 'Driver class name', NULL, NULL, NULL, NULL, now(), now() ),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', 'Username (Username)', 'Username', NULL, 'TEXT', NULL, 1, 'Username (Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 1, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('oceanbase', 'oceanbase数据库', 'oceanbase', 'olap', '', 4, 'oceanbase Database', 'oceanbase', 'Olap');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'oceanbase';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, `ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', '地址', 'Address', NULL, 'TEXT', NULL, 0, '地址(host1:port1,host2:port2...)', 'Address(host1:port1,host2:port2...)', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, 'Driver class name', 'Driver class name', NULL, NULL, NULL, NULL, now(), now( )),
       (@data_source_type_id, 'params', '连接参数(Connection params)', 'Connection params', NULL, 'TEXT', NULL, 0, '输入JSON格式(Input JSON format): {"param":"value"}', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'username', 'Username (Username)', 'Username', NULL, 'TEXT', NULL, 1, 'Username (Username)', 'Username', '^[0-9A-Za-z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', '密码(Password)', 'Password', NULL, 'PASSWORD', NULL, 1, '密码(Password)', 'Password', '', NULL, NULL, NULL,  now(), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());
```

## 4. Add mysql driver package
After linkis is upgraded to 1.4.0, the mysql driver package needs to use version 8.x. Take version 8.0.28 as an example: [Download Link](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar) Copy the driver package to the lib package

```
cp mysql-connector-java-8.0.28.jar  ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-8.0.28.jar ${LINKIS_HOME}/lib/linkis-commons/public-module/
```

## 5. Start the service

```shell
sh linkis-start-all.sh
```

## 6. Precautions

1. After Spark is upgraded to 3.x, it is not compatible with python2, so you need to install python3 when executing pyspark tasks, and perform the following operations
```shell
sudo ln -snf /usr/bin/python3 /usr/bin/python2
```
2. The Token value in the configuration file cannot be automatically unified with the original database Token value during upgrade. You need to manually modify the Token value in the `linkis.properties` and `linkis-cli/linkis-cli.properties` files to the Token value corresponding to the data table `linkis_mg_gateway_auth_token`.
3. This document is a guide document for upgrading Linkis version 1.3.2 to version 1.4.0. If you need to upgrade other Linkis versions to 1.4.0, please perform a full installation or upgrade the original system to 1.3.2 first and then follow this guide to upgrade.