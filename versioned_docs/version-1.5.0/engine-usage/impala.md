---
title: Impala
sidebar_position: 12
---

This article mainly introduces the installation, usage and configuration of the `Impala` engine plugin in `Linkis`.

## 1. Pre-work

### 1.1 Environment installation

If you want to use the Impala engine on your server, you need to prepare the Impala service and provide connection information, such as the connection address of the Impala cluster, SASL user name and password, etc.

### 1.2 Environment verification

Execute the impala-shell command to get the following output, indicating that the impala service is available.
```
[root@8f43473645b1 /]# impala-shell
Starting Impala Shell without Kerberos authentication
Connected to 8f43473645b1:21000
Server version: impalad version 2.12.0-cdh5.15.0 RELEASE (build 23f574543323301846b41fa5433690df32efe085)
***************************************************** *********************************
Welcome to the Impala shell.
(Impala Shell v2.12.0-cdh5.15.0 (23f5745) built on Thu May 24 04:07:31 PDT 2018)

When pretty-printing is disabled, you can use the '--output_delimiter' flag to set
the delimiter for fields in the same row. The default is ','.
***************************************************** *********************************
[8f43473645b1:21000] >
```

## 2. Engine plugin deployment

Before compiling the `Impala` engine, the `Linkis` project needs to be fully compiled, and the default installation and deployment package released by `Linkis` does not include this engine plug-in by default.

### 2.1 Engine plugin preparation (choose one) [non-default engine](./overview.md)

Method 1: Download the engine plug-in package directly

[Linkis Engine Plugin Download](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)

Method 2: Compile the engine plug-in separately (requires `maven` environment)

```
# compile
cd ${linkis_code_dir}/linkis-engineconn-plugins/impala/
mvn clean install
# The compiled engine plug-in package is located in the following directory
${linkis_code_dir}/linkis-engineconn-plugins/impala/target/out/
```
[EngineConnPlugin Engine Plugin Installation](../deployment/install-engineconn.md)

### 2.2 Upload and load engine plugins

Upload the engine package in 2.1 to the engine directory of the server
```bash 
${LINKIS_HOME}/lib/linkis-engineconn-plugins
```
The directory structure after uploading is as follows
```
linkis-engineconn-plugins/
├── impala
│   ├── dist
│ │ └── 3.4.0
│   │       ├── conf
│ │ └── lib
│   └── plugin
│ └── 3.4.0
```

### 2.3 Engine refresh

#### 2.3.1 Restart and refresh
Refresh the engine by restarting the `linkis-cg-linkismanager` service
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 Check whether the engine is refreshed successfully
You can check whether the `last_update_time` of the `linkis_engine_conn_plugin_bml_resources` table in the database is the time to trigger the refresh.

```sql
#login to `linkis` database
select * from linkis_cg_engine_conn_plugin_bml_resources;
```

## 3 Engine usage

### 3.1 Submit tasks through `Linkis-cli`

```shell
sh ./bin/linkis-cli -submitUser impala \
-engineType impala-3.4.0 -code 'show databases;' \
-runtimeMap linkis.es.http.method=GET \
-runtimeMap linkis.impala.servers=127.0.0.1:21050
```

More `Linkis-Cli` command parameter reference: [Linkis-Cli usage](../user-guide/linkiscli-manual.md)

## 4. Engine configuration instructions

### 4.1 Default Configuration Description

| Configuration | Default | Description | Required |
| ----------------------------------------- | ---------- ----------- | -------------------------------------- ----- | -------- |
| linkis.impala.default.limit | 5000 | Yes | The limit on the number of returned items in the query result set |
| linkis.impala.engine.user | ${HDFS_ROOT_USER} | yes | default engine startup user |
| linkis.impala.user.isolation.mode | false | yes | start the engine in multi-user mode |
| linkis.impala.servers | 127.0.0.1:21050 | is | Impala server address, separated by ',' |
| linkis.impala.maxConnections | 10 | Yes | Maximum number of connections to each Impala server |
| linkis.impala.ssl.enable | false | yes | whether to enable SSL connection |
| linkis.impala.ssl.keystore.type | JKS | No | SSL Keystore type |
| linkis.impala.ssl.keystore | null | No | SSL Keystore path |
| linkis.impala.ssl.keystore.password | null | No | SSL Keystore password |
| linkis.impala.ssl.truststore.type | JKS | No | SSL Truststore type |
| linkis.impala.ssl.truststore | null | No | SSL Truststore path |
| linkis.impala.ssl.truststore.password | null | No | SSL Truststore password |
| linkis.impala.sasl.enable | false | yes | whether to enable SASL authentication |
| linkis.impala.sasl.mechanism | PLAIN | 否 | SASL Mechanism |
| linkis.impala.sasl.authorizationId      | null                 |   否   | SASL AuthorizationId                     |
| linkis.impala.sasl.protocol | LDAP | 否 | SASL Protocol |
| linkis.impala.sasl.properties | null | No | SASL Properties: key1=value1,key2=value2 |
| linkis.impala.sasl.username | ${impala.engine.user}| 否 | SASL Username |
| linkis.impala.sasl.password | null | No | SASL Password |
| linkis.impala.sasl.password.cmd | null | No | SASL Password get command |
| linkis.impala.heartbeat.seconds | 1 | yes | task status update interval |
| linkis.impala.query.timeout.seconds | 0 | No | Task execution timeout |
| linkis.impala.query.batchSize | 1000 | yes | result set fetch batch size |
| linkis.impala.query.options | null | No | Query submission parameters: key1=value1,key2=value2 |

### 4.2 Configuration modification

If the default parameters are not satisfied, there are the following ways to configure some basic parameters

#### 4.2.1 Task interface configuration
Submit the task interface and configure it through the parameter `params.configuration.runtime`

```shell
Example of http request parameters
{
    "executionContent": {"code": "show databases;", "runType":  "sql"},
    "params": {
                    "variable": {},
                    "configuration": {
                            "runtime": {
                                "linkis.impala.servers"="127.0.0.1:21050"
                            }
                    }
                },
    "labels": {
        "engineType": "impala-3.4.0",
        "userCreator": "hadoop-IDE"
    }
}
```

### 4.3 Engine related data table

`Linkis` is managed through engine tags, and the data table information involved is as follows.

```
linkis_ps_configuration_config_key: Insert the key and default values ​​​​of the configuration parameters of the engine
linkis_cg_manager_label: insert engine label such as: impala-3.4.0
linkis_ps_configuration_category: Insert the directory association of the engine
linkis_ps_configuration_config_value: Insert the configuration that the engine needs to display
linkis_ps_configuration_key_engine_relation: the relationship between configuration items and engines
```

The initial data related to the engine in the table is as follows


```sql
-- set variable
SET @ENGINE_LABEL="impala-3.4.0";
SET @ENGINE_IDE=CONCAT('*-IDE,',@ENGINE_LABEL);
SET @ENGINE_ALL=CONCAT('*-*,',@ENGINE_LABEL);
SET @ENGINE_NAME="impala";

-- add impala engine to IDE
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @ENGINE_ALL, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @ENGINE_IDE, 'OPTIONAL', 2, now(), now());
select @label_id := id from `linkis_cg_manager_label` where label_value = @ENGINE_IDE;
insert into `linkis_ps_configuration_category` (`label_id`, `level`) VALUES (@label_id, 2);

-- insert configuration key
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.default.limit', 'result result set limit of query', 'result set limit', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1 , 'Data Source Configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.engine.user', 'Default engine startup user', 'Default startup user', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'Data source configuration' );
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.user.isolation.mode', 'Start engine in multi-user mode', 'Multi-user mode', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, ' Datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.servers', 'Impala server address', 'service address', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'data source configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.maxConnections ', 'The maximum number of connections to each Impala server', 'Maximum number of connections', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'data source configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.enable', 'Enable SSL connection', 'Enable SSL', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'Data source configuration') ;
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.keystore.type', 'SSL Keystore类型', 'SSL Keystore类型', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.keystore', 'SSL Keystore路径', 'SSL Keystore路径', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.keystore.password', 'SSL Keystore密码', 'SSL Keystore密码', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.truststore.type', 'SSL Truststore类型', 'SSL Truststore类型', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.truststore', 'SSL Truststore路径', 'SSL Truststore路径', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.truststore.password', 'SSL Truststore密码', 'SSL Truststore密码', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.enable', 'whether to enable SASL authentication', 'enable SASL', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'data source configuration') ;
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.mechanism', 'SASL Mechanism', 'SASL Mechanism', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.authorizationId', 'SASL AuthorizationId', 'SASL AuthorizationId', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.protocol', 'SASL Protocol', 'SASL Protocol', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.properties', 'SASL Properties: key1=value1,key2=value2', 'SASL Properties', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.username', 'SASL Username', 'SASL Username', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.password', 'SASL Password', 'SASL Password', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.password.cmd', 'SASL Password get command', 'SASL Password get command', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'data source configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.heartbeat.seconds', 'Task status update interval', 'Task status update interval', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'Data source configuration ');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.query.timeout.seconds', 'Task execution timeout', 'Task execution timeout', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'data source configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.query.batchSize', 'result set acquisition batch size', 'result set acquisition batch size', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'Datasource Configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.query.options', 'Query submission parameters: key1=value1,key2=value2', 'Query submission parameters', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, 'Data source configuration');
-- impala engine -*
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as config_key_id, label.id AS engine_type_label_id FROM `linkis_ps_configuration_config_key` config
INNER JOIN `linkis_cg_manager_label` label ON config.engine_conn_type = @ENGINE_NAME and label_value = @ENGINE_ALL);
-- impala engine default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select relation.config_key_id AS config_key_id, '' AS config_value, relation.engine_type_label_id AS config_label_id FROM `linkis_ps_configuration_key_engine_relation` relation
INNER JOIN `linkis_cg_manager_label` label ON relation.engine_type_label_id = label.id AND label.label_value = @ENGINE_ALL);
```