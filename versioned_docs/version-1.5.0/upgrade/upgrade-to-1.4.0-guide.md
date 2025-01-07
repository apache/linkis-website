---
title: Upgrade Guide for 1.4.0
sidebar_position: 3
---

> Linkis1.4.0 has made many adjustments to Linkis services and codes. This article introduces the relevant precautions for upgrading to Linkis 1.4.0.

## 1. Precautions

**1) If you are using Linkis for the first time, you can ignore this chapter and refer to the [Single-machine deployment](../deployment/deploy-quick.md) guide to deploy Linkis. **

**2) If you have installed a version before Likis 1.4.0 but do not want to keep the original data, you can also refer to the [Stand-alone Deployment](../deployment/deploy-quick.md) guide to redeploy, and select 2 to clean up during installation All the data and rebuild the table (see the code below). **
```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 2
```
**3) If you have installed a version of Likis earlier than 1.4.0 but need to keep the original version data, you can refer to this document to upgrade. **

****

## 2. Environment upgrade

Linkis 1.4.0 upgrades the default dependent environments Hadoop, Hive, and Spark to 3.x. Hadoop was upgraded to 3.3.4, Hive was upgraded to 3.1.3, and Spark was upgraded to 3.2.1. Please upgrade these environments before performing subsequent operations.

Verify the upgraded version by the following command
```
echo $HADOOP_HOME
/data/hadoop-3.3.4
echo $HIVE_HOME
/data/apache-hive-3.1.3-bin
echo $SPARK_HOME
/data/spark-3.2.1-bin-hadoop3.2
```

Before installation, please modify the relevant configurations of Hadoop, Hive, and Spark in the deploy-config/linkis-env.sh file to the upgraded directory. The specific modification items are as follows:

```
#HADOOP
HADOOP_HOME=${HADOOP_HOME:-"/appcom/Install/hadoop"}
HADOOP_CONF_DIR=${HADOOP_CONF_DIR:-"/appcom/config/hadoop-config"}

## Hadoop env version
HADOOP_VERSION=${HADOOP_VERSION:-"3.3.4"}

#Hive
HIVE_HOME=/appcom/Install/hive
HIVE_CONF_DIR=/appcom/config/hive-config

#Spark
SPARK_HOME=/appcom/Install/spark
SPARK_CONF_DIR=/appcom/config/spark-config

```

## 3. Service upgrade installation

Because the 1.4.0 version has changed a lot, the service needs to be reinstalled when the old version is upgraded to 1.4.0.

If you need to keep the old version of data during installation, be sure to choose 1 to skip the table creation statement (see the code below).

Linkis 1.4.0 installation can refer to [How to install quickly](../deployment/deploy-quick.md)

```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
```

## 4. Database upgrade
  After the service installation is complete, the data tables of the database need to be modified, including table structure changes and table data updates. Execute the DDL and DML scripts corresponding to the upgraded version.
  ```
  # table structure changes
  linkis-dist\package\db\upgrade\${version}_schema\mysql\linkis_ddl.sql
  # table data changes
  linkis-dist\package\db\upgrade\${version}_schema\mysql\linkis_dml.sql
  ```
Note that when upgrading, please execute the upgrade script in sequence, such as upgrading from the current version 1.3.1 to version 1.4.0. You need to execute the DDL and DML scripts of 1.3.2 upgrade first, and then execute the DDL and DML scripts of 1.4.0 upgrade. This article takes the upgrade from 1.3.2 to 1.4.0 as an example to illustrate

### 4.1 Table structure modification part:

Connect to the mysql database and execute the linkis-dist\package\db\upgrade\1.3.2_schema\mysql\linkis_ddl.sql script content, the specific content is as follows:

```mysql-sql
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `identifier` varchar(32) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `ticketId` varchar(255) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_ec_resource_info_record` MODIFY COLUMN metrics TEXT DEFAULT NULL COMMENT 'ec metrics';
```

### 4.2 Newly executed sql is required:

Connect to the mysql database and execute the linkis-dist\package\db\upgrade\1.3.2_schema\mysql\linkis_dml.sql script content, the specific content is as follows:
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
INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('tidb', 'tidb Database', 'tidb', 'Relational Database', '', 3, 'TiDB Database', 'TiDB', 'Relational Database');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'tidb';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, ` ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', 'Address', 'Address', NULL, 'TEXT', NULL, 0, 'Address(host1:port1,host2:port2...)', 'Address(host1:port1, host2:port2...)', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, 'Driver class name (Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'params', 'Connection params', 'Connection params', NULL, 'TEXT', NULL, 0, 'Input JSON format): {"param":"value" }', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'username', 'Username', 'Username', NULL, 'TEXT', NULL, 1, 'Username', 'Username', '^[0-9A-Za -z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', 'Password', 'Password', NULL, 'PASSWORD', NULL, 0, 'Password', 'Password', '', NULL, NULL, NULL, now (), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('starrocks', 'starrocks` Database', 'starrocks', 'olap', '', 4, 'StarRocks Database', 'StarRocks', 'Olap');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'starrocks';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, ` ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', 'Address', 'Address', NULL, 'TEXT', NULL, 0, 'Address(host1:port1,host2:port2...)', 'Address(host1:port1, host2:port2...)', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, 'Driver class name (Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'params', 'Connection params', 'Connection params', NULL, 'TEXT', NULL, 0, 'Input JSON format): {"param":"value" }', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'username', 'Username', 'Username', NULL, 'TEXT', NULL, 1, 'Username', 'Username', '^[0-9A-Za -z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', 'Password', 'Password', NULL, 'PASSWORD', NULL, 0, 'Password', 'Password', '', NULL, NULL, NULL, now (), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('gaussdb', 'gaussdb Database', 'gaussdb', 'Relational Database', '', 3, 'GaussDB Database', 'GaussDB', 'Relational Database');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'gaussdb';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, ` ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', 'Address', 'Address', NULL, 'TEXT', NULL, 0, 'Address(host1:port1,host2:port2...)', 'Address(host1:port1, host2:port2...)', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'org.postgresql.Driver', 'TEXT', NULL, 1, 'Driver class name) ', 'Driver class name', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'params', 'Connection params', 'Connection params', NULL, 'TEXT', NULL, 0, 'Input JSON format): {"param":"value" }', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'username', 'Username', 'Username', NULL, 'TEXT', NULL, 1, 'Username', 'Username', '^[0-9A-Za -z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', 'Password', 'Password', NULL, 'PASSWORD', NULL, 1, 'Password', 'Password', '', NULL, NULL, NULL, now (), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());

INSERT INTO `linkis_ps_dm_datasource_type` (`name`, `description`, `option`, `classifier`, `icon`, `layers`, `description_en`, `option_en`, `classifier_en`) VALUES ('oceanbase', 'oceanbase` Database', 'oceanbase', 'olap', '', 4, 'oceanbase Database', 'oceanbase', 'Olap');

select @data_source_type_id := id from `linkis_ps_dm_datasource_type` where `name` = 'oceanbase';
INSERT INTO `linkis_ps_dm_datasource_type_key`
(`data_source_type_id`, `key`, `name`, `name_en`, `default_value`, `value_type`, `scope`, `require`, `description`, `description_en`, `value_regex`, `ref_id`, ` ref_value`, `data_source`, `update_time`, `create_time`)
VALUES (@data_source_type_id, 'address', 'Address', 'Address', NULL, 'TEXT', NULL, 0, 'Address(host1:port1,host2:port2...)', 'Address(host1:port1, host2:port2...)', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'host', 'Host', 'Host', NULL, 'TEXT', NULL, 1, 'Host', 'Host', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'port', 'Port', 'Port', NULL, 'TEXT', NULL, 1, 'Port', 'Port', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'driverClassName', 'Driver class name', 'Driver class name', 'com.mysql.jdbc.Driver', 'TEXT', NULL, 1, 'Driver class name (Driver class name)', 'Driver class name', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'params', 'Connection params', 'Connection params', NULL, 'TEXT', NULL, 0, 'Input JSON format): {"param":"value" }', 'Input JSON format: {"param":"value"}', NULL, NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'username', 'Username', 'Username', NULL, 'TEXT', NULL, 1, 'Username', 'Username', '^[0-9A-Za -z_-]+$', NULL, NULL, NULL, now(), now()),
       (@data_source_type_id, 'password', 'Password', 'Password', NULL, 'PASSWORD', NULL, 1, 'Password', 'Password', '', NULL, NULL, NULL, now (), now()),
       (@data_source_type_id, 'instance', 'Instance name (instance)', 'Instance', NULL, 'TEXT', NULL, 1, 'Instance name (instance)', 'Instance', NULL, NULL, NULL, NULL, now(), now());
```

## 4. Add mysql driver package
When linkis is upgraded to version 1.4.0, the mysql driver package needs to use version 8.x. Take version 8.0.28 as an example: [Download link](https://repo1.maven.org/maven2/mysql/mysql-connector-java /8.0.28/mysql-connector-java-8.0.28.jar) copy the driver package to the lib package

```
cp mysql-connector-java-8.0.28.jar ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
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
And add the following configuration in the spark engine configuration $LINKIS_HOME/lib/linkis-engineconn-plugins/spark/dist/3.2.1/conf/linkis-engineconn.properties, specify the python installation path
```
pyspark.python3.path=/usr/bin/python3
```
2. The Token value in the configuration file cannot be automatically unified with the original database Token value during upgrade. You need to manually modify the Token value in the `linkis.properties` and `linkis-cli/linkis-cli.properties` files to the Token value corresponding to the data table `linkis_mg_gateway_auth_token`.
3. When upgrading from a lower version to a higher version, execute the database upgrade script step by step.