---
title: 1.4.0 的升级指南
sidebar_position: 3
---

> Linkis1.4.0 对 Linkis 的服务及代码进行了较多调整，本文介绍升级到 Linkis 1.4.0 的相关注意事项。

## 1. 注意事项

**1) 如果您是首次接触并使用Linkis，您可以忽略该章节，参考[单机部署](../deployment/deploy-quick.md)指南部署 Linkis 即可。**

**2) 如果您已安装 Likis 1.4.0 之前的版本但不想保留原有数据，也可参考[单机部署](../deployment/deploy-quick.md)指南重新部署，安装时选择 2 清理所有数据并重建表即可（见下面代码）。**
```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 2
```
**3) 如果您已安装 Likis 1.4.0 之前的版本但需要保留原有版本数据，可参考本文档指引进行升级。**

****

## 2. 环境升级 

Linkis 1.4.0 将默认的依赖环境 Hadoop、Hive、Spark 版本升级为 3.x。分别为 Hadoop 升级为 3.3.4、Hive 升级为 3.1.3、Spark升级为 3.2.1。请将这些环境进行升级后再进行后续操作。

通过如下命令验证升级后版本
```
echo $HADOOP_HOME
/data/hadoop-3.3.4
echo $HIVE_HOME
/data/apache-hive-3.1.3-bin
echo $SPARK_HOME
/data/spark-3.2.1-bin-hadoop3.2
```

安装前请修改 deploy-config/linkis-env.sh 文件中 Hadoop、Hive、Spark 相关配置为升级后目录，具体修改项如下：

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

## 3. 服务升级安装

因为 1.4.0 版本量改动较大，所以旧版本到 1.4.0 版本升级时服务需要进行重新安装。

在安装时如果需要保留旧版本的数据，一定要选择 1 跳过建表语句（见下面代码）。

Linkis 1.4.0 的安装可以参考[如何快速安装](../deployment/deploy-quick.md)

```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
```

## 4. 数据库升级
  服务安装完成后，需要对数据库的数据表进行修改，包括表结构变更和表数据更新。执行对应升级版本的 DDL 和 DML 脚本即可。
  ```
  #表结构变更
  linkis-dist\package\db\upgrade\${version}_schema\mysql\linkis_ddl.sql
  #表数据变更
  linkis-dist\package\db\upgrade\${version}_schema\mysql\linkis_dml.sql 
  ```
注意升级时请依次往上执行升级脚本，如从当前版本 1.3.1，升级到 1.4.0 版本。需要先执行 1.3.2 升级的 DDL 和 DML 脚本，再执行 1.4.0 升级的 DDL 和 DML脚本。本文以 1.3.2 升级到 1.4.0 为例进行说明 

### 4.1 表结构修改部分：

连接 mysql 数据库执行 linkis-dist\package\db\upgrade\1.3.2_schema\mysql\linkis_ddl.sql 脚本内容，具体内容如下：

```mysql-sql
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `identifier` varchar(32) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_manager_service_instance` ADD COLUMN `ticketId` varchar(255) COLLATE utf8_bin DEFAULT NULL;
ALTER TABLE `linkis_cg_ec_resource_info_record` MODIFY COLUMN metrics TEXT DEFAULT NULL COMMENT 'ec metrics';
```

### 4.2 需要新执行的sql：

连接 mysql 数据库执行 linkis-dist\package\db\upgrade\1.3.2_schema\mysql\linkis_dml.sql 脚本内容，具体内容如下：
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
linkis 升级为 1.4.0 版本时 mysql 驱动包需使用 8.x 版本，以 8.0.28 版本为例：[下载连接](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar)拷贝驱动包至lib包下

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
并且在 spark 引擎配置 $LINKIS_HOME/lib/linkis-engineconn-plugins/spark/dist/3.2.1/conf/linkis-engineconn.properties 中添加如下配置，指定python安装路径
```
pyspark.python3.path=/usr/bin/python3
```
2. 升级时配置文件中 Token 值没法自动与原数据库 Token 值统一。需要手动修改 `linkis.properties` 和 `linkis-cli/linkis-cli.properties` 文件中的Token 值为与数据表 `linkis_mg_gateway_auth_token` 相对应的 Token 值。
3. 低版本升级高版本时请逐级执行数据库升级脚本。