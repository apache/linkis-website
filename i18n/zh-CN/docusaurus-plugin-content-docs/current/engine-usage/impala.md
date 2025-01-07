---
title: Impala
sidebar_position: 12
---

本文主要介绍在 `Linkis` 中，`Impala` 引擎插件的安装、使用和配置。

## 1. 前置工作

### 1.1 环境安装

如果您希望在您的服务器上使用 Impala 引擎，您需要准备 Impala 服务并提供连接信息，如 Impala 集群的连接地址、SASL用户名和密码等

### 1.2 环境验证

执行 impala-shell 命令得到如下输出代表 impala 服务可用。
```
[root@8f43473645b1 /]# impala-shell
Starting Impala Shell without Kerberos authentication
Connected to 8f43473645b1:21000
Server version: impalad version 2.12.0-cdh5.15.0 RELEASE (build 23f574543323301846b41fa5433690df32efe085)
***********************************************************************************
Welcome to the Impala shell.
(Impala Shell v2.12.0-cdh5.15.0 (23f5745) built on Thu May 24 04:07:31 PDT 2018)

When pretty-printing is disabled, you can use the '--output_delimiter' flag to set
the delimiter for fields in the same row. The default is ','.
***********************************************************************************
[8f43473645b1:21000] >
```

## 2. 引擎插件部署

编译 `Impala` 引擎之前需要进行 `Linkis` 项目全量编译  , `Linkis` 默认发布的安装部署包中默认不包含此引擎插件。

### 2.1 引擎插件准备（二选一）[非默认引擎](./overview.md)

方式一：直接下载引擎插件包

[Linkis 引擎插件下载](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)

方式二：单独编译引擎插件（需要有 `maven` 环境）

```
# 编译
cd ${linkis_code_dir}/linkis-engineconn-plugins/impala/
mvn clean install
# 编译出来的引擎插件包，位于如下目录中
${linkis_code_dir}/linkis-engineconn-plugins/impala/target/out/
```
[EngineConnPlugin 引擎插件安装](../deployment/install-engineconn.md)

### 2.2 引擎插件的上传和加载

将 2.1 中的引擎包上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineconn-plugins
```
上传后目录结构如下所示
```
linkis-engineconn-plugins/
├── impala
│   ├── dist
│   │   └── 3.4.0
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 3.4.0
```

### 2.3 引擎刷新

#### 2.3.1 重启刷新
通过重启 `linkis-cg-linkismanager` 服务刷新引擎
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 检查引擎是否刷新成功
可以查看数据库中的 `linkis_engine_conn_plugin_bml_resources` 这张表的`last_update_time` 是否为触发刷新的时间。

```sql
#登陆到 `linkis` 的数据库 
select * from linkis_cg_engine_conn_plugin_bml_resources;
```

## 3 引擎的使用

### 3.1 通过 `Linkis-cli` 提交任务 

```shell
sh ./bin/linkis-cli -submitUser impala \
-engineType impala-3.4.0 -code 'show databases;' \
-runtimeMap linkis.es.http.method=GET \
-runtimeMap linkis.impala.servers=127.0.0.1:21050
```

更多 `Linkis-Cli` 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

## 4. 引擎配置说明

### 4.1 默认配置说明

| 配置                                   | 默认值                | 说明                                        | 是否必须 |
| -------------------------------------- | --------------------- | ------------------------------------------- | -------- |
| linkis.impala.default.limit             | 5000                 |   是   | 查询的结果集返回条数限制                    |
| linkis.impala.engine.user               | ${HDFS_ROOT_USER}    |   是   | 默认引擎启动用户                           |
| linkis.impala.user.isolation.mode       | false                |   是   | 以多用户模式启动引擎                        |
| linkis.impala.servers                   | 127.0.0.1:21050      |   是   | Impala服务器地址，','分隔                  |
| linkis.impala.maxConnections            | 10                   |   是   | 对每台Impala服务器的连接数上限               |
| linkis.impala.ssl.enable                | false                |   是   | 是否启用SSL连接                            |
| linkis.impala.ssl.keystore.type         | JKS                  |   否   | SSL Keystore类型                          |
| linkis.impala.ssl.keystore              | null                 |   否   | SSL Keystore路径                          |
| linkis.impala.ssl.keystore.password     | null                 |   否   | SSL Keystore密码                          |
| linkis.impala.ssl.truststore.type       | JKS                  |   否   | SSL Truststore类型                        |
| linkis.impala.ssl.truststore            | null                 |   否   | SSL Truststore路径                        |
| linkis.impala.ssl.truststore.password   | null                 |   否   | SSL Truststore密码                        |
| linkis.impala.sasl.enable               | false                |   是   | 是否启用SASL认证                           |
| linkis.impala.sasl.mechanism            | PLAIN                |   否   | SASL Mechanism                           |
| linkis.impala.sasl.authorizationId      | null                 |   否   | SASL AuthorizationId                     |
| linkis.impala.sasl.protocol             | LDAP                 |   否   | SASL Protocol                            |
| linkis.impala.sasl.properties           | null                 |   否   | SASL Properties: key1=value1,key2=value2 |
| linkis.impala.sasl.username             | ${impala.engine.user}|   否   | SASL Username                            |
| linkis.impala.sasl.password             | null                 |   否   | SASL Password                            |
| linkis.impala.sasl.password.cmd         | null                 |   否   | SASL Password获取命令                     |
| linkis.impala.heartbeat.seconds         | 1                    |   是   | 任务状态更新间隔                            |
| linkis.impala.query.timeout.seconds     | 0                    |   否   | 任务执行超时时间                           |
| linkis.impala.query.batchSize           | 1000                 |   是   | 结果集获取批次大小                          |
| linkis.impala.query.options             | null                 |   否   | 查询提交参数: key1=value1,key2=value2      |

### 4.2 配置修改

如果默认参数不满足时，有如下几中方式可以进行一些基础参数配置

#### 4.2.1 任务接口配置
提交任务接口，通过参数 `params.configuration.runtime` 进行配置

```shell
http 请求参数示例 
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

### 4.3 引擎相关数据表

`Linkis` 是通过引擎标签来进行管理的，所涉及的数据表信息如下所示。

```
linkis_ps_configuration_config_key:  插入引擎的配置参数的key和默认values
linkis_cg_manager_label：插入引擎label如：impala-3.4.0
linkis_ps_configuration_category： 插入引擎的目录关联关系
linkis_ps_configuration_config_value： 插入引擎需要展示的配置
linkis_ps_configuration_key_engine_relation:配置项和引擎的关联关系
```

表中与引擎相关的初始数据如下


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
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.default.limit', '查询的结果集返回条数限制', '结果集条数限制', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.engine.user', '默认引擎启动用户', '默认启动用户', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.user.isolation.mode', '以多用户模式启动引擎', '多用户模式', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.servers', 'Impala服务器地址', '服务地址', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.maxConnections ', '对每台Impala服务器的连接数上限', '最大连接数', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.enable', '是否启用SSL连接', '启用SSL', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.keystore.type', 'SSL Keystore类型', 'SSL Keystore类型', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.keystore', 'SSL Keystore路径', 'SSL Keystore路径', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.keystore.password', 'SSL Keystore密码', 'SSL Keystore密码', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.truststore.type', 'SSL Truststore类型', 'SSL Truststore类型', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.truststore', 'SSL Truststore路径', 'SSL Truststore路径', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.ssl.truststore.password', 'SSL Truststore密码', 'SSL Truststore密码', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.enable', '是否启用SASL认证', '启用SASL', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.mechanism', 'SASL Mechanism', 'SASL Mechanism', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.authorizationId', 'SASL AuthorizationId', 'SASL AuthorizationId', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.protocol', 'SASL Protocol', 'SASL Protocol', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.properties', 'SASL Properties: key1=value1,key2=value2', 'SASL Properties', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.username', 'SASL Username', 'SASL Username', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.password', 'SASL Password', 'SASL Password', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.sasl.password.cmd', 'SASL Password获取命令', 'SASL Password获取命令', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.heartbeat.seconds', '任务状态更新间隔', '任务状态更新间隔', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.query.timeout.seconds', '任务执行超时时间', '任务执行超时时间', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.query.batchSize', '结果集获取批次大小', '结果集获取批次大小', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.impala.query.options', '查询提交参数: key1=value1,key2=value2', '查询提交参数', 'null', 'None', '', @ENGINE_NAME, 0, 0, 1, '数据源配置');
-- impala engine -*
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as config_key_id, label.id AS engine_type_label_id FROM `linkis_ps_configuration_config_key` config
INNER JOIN `linkis_cg_manager_label` label ON config.engine_conn_type = @ENGINE_NAME and label_value = @ENGINE_ALL);
-- impala engine default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select relation.config_key_id AS config_key_id, '' AS config_value, relation.engine_type_label_id AS config_label_id FROM `linkis_ps_configuration_key_engine_relation` relation
INNER JOIN `linkis_cg_manager_label` label ON relation.engine_type_label_id = label.id AND label.label_value = @ENGINE_ALL);
```