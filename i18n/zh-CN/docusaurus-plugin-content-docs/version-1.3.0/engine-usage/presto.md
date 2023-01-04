---
title: Presto 引擎
sidebar_position: 11
---

本文主要介绍在 Linkis1.X 中，Presto 引擎的配置、部署和使用。

## 1. 环境准备

如果您希望在您的服务器上使用 Presto 引擎，您需要准备 Presto 连接信息，如 Presto 集群的连接地址、用户名和密码等

## 2. 部署和配置

### 2.1 版本的选择和编译
注意: 编译 Presto 引擎之前需要进行 Linkis 项目全量编译发布的安装部署包中默认不包含此引擎插件， 你可以按此指引部署安装 
https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin
或者按以下流程，手动编译部署


单独编译 Presto 引擎 

```
${linkis_code_dir}/linkis-engineconn-plugins/presto/
mvn clean install
```

### 2.2 物料的部署和加载

将 2.1 步编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/jdbc/target/out/presto
```
上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
并重启linkis-engineplugin（或则通过引擎接口进行刷新）
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```

检查引擎是否刷新成功：可以查看数据库中的linkis_engine_conn_plugin_bml_resources这张表的last_update_time是否为触发刷新的时间。

```sql
#登陆到linkis的数据库 
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

### 2.3 引擎的标签

Linkis1.X是通过标签来进行的，所以需要在我们数据库中插入数据，插入的方式如下文所示。

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

### 2.2 Presto 引擎相关配置

| 配置                                   | 默认值                | 说明                                        | 是否必须 |
| -------------------------------------- | --------------------- | ------------------------------------------- | -------- |
| wds.linkis.presto.url                  | http://127.0.0.1:8080 | Presto 集群连接                             | true |
| wds.linkis.presto.username             | default               | Presto 集群用户名                           | false |
| wds.linkis.presto.password             | 无                    | Presto 集群密码                             | false |
| wds.linkis.presto.catalog              | system                | 查询的 Catalog                              | true |
| wds.linkis.presto.schema               | 无                    | 查询的 Schema                               | true |
| wds.linkis.presto.source               | global                | 查询使用的 source                           | false |
| presto.session.query_max_total_memory  | 8GB                   | 查询使用最大的内存                          | false |
| wds.linkis.presto.http.connectTimeout  | 60                    | Presto 客户端的 connect timeout（单位：秒） | false |
| wds.linkis.presto.http.readTimeout     | 60                    | Presto 客户端的 read timeout（单位：秒）    | false |
| wds.linkis.engineconn.concurrent.limit | 100                   | Presto 引擎最大并发数                       | false |

## 3. 引擎的使用

### 3.1 准备操作

如果默认参数不满足时，有三种方式可以进行一些基础参数配置。

#### 3.1.1 管理台配置

![](/Images-zh/EngineUsage/presto-console.png)

#### 3.1.2 任务接口配置
提交任务接口，通过参数params.configuration.runtime进行配置

```shell
http 请求参数示例 
{
    "executionContent": {"code": "show teblas;", "runType":  "psql"},
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
    "source":  {"scriptPath": "file:///mnt/bdp/hadoop/1.sql"},
    "labels": {
        "engineType": "presto-0.234",
        "userCreator": "hadoop-IDE"
    }
}
```

#### 3.1.3 文件配置
通过修改目录 install path/lib/linkis-engineconn-plugins/presto/dist/v0.234/conf/ 中的linkis-engineconn.properties 文件进行配置，如下图：

![](/Images-zh/EngineUsage/presto-file.png)

### 3.2 通过Linkis-cli进行任务提交 

通过linkis-cli的方式提交任务，需要指定对应的EngineConn和CodeType标签类型，presto的使用如下：

- 注意 `engineType presto-0.234` 引擎版本设置是有前缀的  如 `presto` 版本为`0.234` 则设置为 ` presto-0.234`

```shell
 sh ./bin/linkis-cli -engineType presto-0.234 -codeType  psql -code 'show tables;'   -submitUser hadoop -proxyUser hadoop
```

如果管理台，任务接口，配置文件，均未配置时可在 cli 客户端中通过`-runtimeMap`属性进行配置

```shell
sh ./bin/linkis-cli -engineType presto-0.234 -codeType  tsql -code 'show tables;'  -runtimeMap wds.linkis.presto.url=http://172.22.32.11:50070 -runtimeMap wds.linkis.presto.catalog=hive -runtimeMap  wds.linkis.presto.schema=default  -runtimeMap wds.linkis.presto.catalog=hive -submitUser hadoop -proxyUser hadoop
```

具体使用可以参考： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 通过 Scriptis 使用

工作空间模块右键选择新建一个类型为`psql`的脚本

![](/Images-zh/EngineUsage/presto-psql.png)