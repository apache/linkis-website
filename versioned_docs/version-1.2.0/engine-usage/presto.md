---
title: Presto Engine
sidebar_position: 11
---

This article mainly introduces the configuration, deployment and use of the Presto engine in Linkis1.X.

## 1. Environment preparation

If you want to use the Presto engine on your server, you need to prepare the Presto connection information, such as the connection address, username and password of the Presto cluster, etc.

## 2. Deployment and configuration

### 2.1 version selection and compilation
Note: Before compiling the Presto engine, a full build of the Linkis project is required
This engine plug-in is not included in the released installation deployment package by default.
You can follow this guide to deploy and install https://linkis.apache.org/blog/2022/04/15/how-to-download-engineconn-plugin
 or follow the steps below to manually compile and deploy


Compile the Presto engine separately

```
${linkis_code_dir}linkis-engineconn-plugins/presto/
mvn clean install
```

### 2.2 Deployment and loading of materials

The engine package compiled in step 2.1 is located in
```bash
${linkis_code_dir}/linkis-engineconn-pluginsjdbc/target/out/presto
```
Upload to the engine directory of the server
```bash
${LINKIS_HOME}/lib/linkis-engineplugins
```
And restart linkis-engineplugin (or refresh through the engine interface)
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
Check whether the engine refresh is successful: You can check whether the last_update_time of the linkis_engine_conn_plugin_bml_resources table in the database is the time when the refresh is triggered.

```sql
#Login to the linkis database
select * from linkis_cg_engine_conn_plugin_bml_resources
```

### 2.3 Engine tags

Linkis1.X is done through tags, so we need to insert data into our database, and the insertion method is as follows.

```sql
-- set variable
SET @PRESTO_LABEL="presto-0.234";
SET @PRESTO_ALL=CONCAT('*-*,',@PRESTO_LABEL);
SET @PRESTO_IDE=CONCAT('*-IDE,',@PRESTO_LABEL);

SET @PRESTO_NAME="presto";

insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@PRESTO_ALL, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@PRESTO_IDE, 'OPTIONAL', 2, now(), now());

select @label_id := id from `linkis_cg_manager_label` where `label_value` = @PRESTO_IDE;
insert into `linkis_ps_configuration_category` (`label_id`, `level`) VALUES (@label_id, 2);

INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('wds.linkis.presto.url', 'Presto 集群连接', 'presto连接地址', 'http://127.0.0.1:8080', 'None', NULL, @PRESTO_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('wds.linkis.presto.catalog', '查询的 Catalog ', 'presto连接的catalog', 'hive', 'None', NULL, @PRESTO_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('wds.linkis.presto.schema', '查询的 Schema ', '数据库连接schema', '', 'None', NULL, @PRESTO_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('wds.linkis.presto.source', '查询使用的 source ', '数据库连接source', '', 'None', NULL, @PRESTO_NAME, 0, 0, 1, '数据源配置');

-- engine -*
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config
INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = @PRESTO_NAME and label_value = @PRESTO_IDE);

-- engine default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation
INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @PRESTO_IDE);
```

### 2.2 Presto engine related configuration

| Configuration | Default | Description | Required |
| -------------------------------------- | ---------- ----------- | -------------------------------------- ----- | -------- |
| wds.linkis.presto.url | http://127.0.0.1:8080 | Presto cluster connection | true |
| wds.linkis.presto.username | default | Presto cluster username | false |
| wds.linkis.presto.password | none | Presto cluster password | false |
| wds.linkis.presto.catalog | system | Catalog for queries | true |
| wds.linkis.presto.schema | None | Query Schema | true |
| wds.linkis.presto.source | global | source used by the query | false |
| presto.session.query_max_total_memory | 8GB | query uses maximum memory | false |
| wds.linkis.presto.http.connectTimeout | 60 | Presto client connect timeout (unit: seconds) | false |
| wds.linkis.presto.http.readTimeout | 60 | Presto client read timeout (unit: seconds) | false |
| wds.linkis.engineconn.concurrent.limit | 100 | The maximum number of concurrent Presto engines | false |
## 3. The use of the engine

### 3.1 Preparing for Operation

If the default parameters are not satisfied, there are three ways to configure some basic parameters.

#### 3.1.1 console configuration

![](/Images-zh/EngineUsage/presto-console.png)

#### 3.1.2 Task interface configuration
Submit the task interface and configure it through the parameter params.configuration.runtime

```shell
Example of http request parameters
{
    "executionContent": {"code": "show teblas;", "runType": "psql"},
    "params": {
                    "variable": {},
                    "configuration": {
                            "runtime": {
                                "wds.linkis.presto.url":"http://127.0.0.1:9090",
                                "wds.linkis.presto.catalog ":"hive",
                                "wds.linkis.presto.schema ":"default",
                                "wds.linkis.presto.source ":""
                                }
                            }
                    },
    "source": {"scriptPath": "file:///mnt/bdp/hadoop/1.sql"},
    "labels": {
        "engineType": "presto-0.234",
        "userCreator": "hadoop-IDE"
    }
}
````

#### 3.1.3 File configuration
Configure by modifying the linkis-engineconn.properties file in the directory install path/lib/linkis-engineconn-plugins/presto/dist/v0.234/conf/, as shown below:

![](/Images-zh/EngineUsage/presto-file.png)

### 3.2 Task submission via Linkis-cli

To submit a task through linkis-cli, you need to specify the corresponding EngineConn and CodeType tag types. The use of presto is as follows:

- Note that the `engineType presto-0.234` engine version setting is prefixed to `presto-0.234` if the `presto` version is `0.234`

```shell
 sh ./bin/linkis-cli -engineType presto-0.234 -codeType psql -code 'show tables;' -submitUser hadoop -proxyUser hadoop
```

If the management console, task interface, and configuration file are not configured, they can be configured in the cli client through the `-runtimeMap` property
```shell
sh ./bin/linkis-cli -engineType presto-0.234 -codeType tsql -code 'show tables;' -runtimeMap wds.linkis.presto.url=http://172.22.32.11:50070 -runtimeMap wds.linkis.presto. catalog=hive -runtimeMap wds.linkis.presto.schema=default -runtimeMap wds.linkis.presto.catalog=hive -submitUser hadoop -proxyUser hadoop
```

For specific usage, please refer to: [Linkis CLI Manual](..//user-guide/linkiscli-manual.md).

### 3.3 Using via Scriptis

Right-click the workspace module and select a new script of type `psql`

![](/Images-zh/EngineUsage/presto-psql.png)