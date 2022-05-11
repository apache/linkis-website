---
title: 引擎的安装
sidebar_position: 3
---

> 本文主要介绍Linkis引擎插件的使用，主要从编译、安装等方面进行介绍

## 1. 引擎插件的编译打包

linkis的引擎是由EngineConnManager进行管理的，引擎插件（EngineConnPlugin）支持实时生效。

为了方便 EngineConnManager 能够通过标签加载到对应的引擎插件，需要按照如下目录结构进行打包(以hive为例)：

**请注意： 因为现在标签是通过-来进行拆分值的所以版本里面不能出现-如果出现可以通过用其他符号代替，比如engineType：hive-cdh-2.3.3，会拆分错，您可以直接使用这个：hive-2.3.3，**
```
hive:引擎主目录，必须为引擎的名字
    └── dist  # 引擎启动需要的依赖和配置，引擎不同的版本需要在该目录防止对应的版本目录
      └── v2.3.3 #必须以v开头加上引擎版本号2.3.3
           └── conf # 引擎需要的配置文件目录
           └── lib  # 引擎插件需要的依赖包
    └── plugin #引擎插件目录，该目录用于引擎管理服务封装引擎的启动命令和资源申请
      └── 2.3.3 # 引擎版本,没有V开头
        └── linkis-engineplugin-hive-1.0.0.jar  #引擎模块包（只需要放置单独的引擎包）
```

如果您是新增引擎，你可以参考hive的assembly配置方式，源码目录：`linkis-engineconn-plugins/engineconn-plugins/hive/src/main/assembly/distribution.xml`

## 2. 引擎安装

### 2.1 插件包安装
```
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/{插件模块名}/
mvn clean install
```

### 2.2 物料的部署和加载

将 2.1 步编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/{插件模块名}/target/out/{插件模块名}
```
上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
### 2.3 引擎的资源目录
（默认是`${LINKIS_HOME}/lib/linkis-engineconn-plugins`），linkis-cg-engineconnplugin服务启动时，会自动检测物料(引擎的配置文件和第三方Jar包)是否需要更新BML（物料库）中,引擎的目录结构如下所示。    

```
${LINKIS_HOME}/lib/linkis-engineconn-plugins:
└── hive
   └── dist
   └── plugin
└── spark
   └── dist
   └── plugin
```

### 2.4 并配置默认的引擎版本，方便没有带版本的任务进行提交(可选)  
修改`$LINKIS_HOME/conf/linkis.properties` 配置文件  
```html
wds.linkis.hive.engine.version=2.3.3
```

### 2.5 管理台Configuration配置修改（可选）
管理台的配置是按照引擎标签来进行管理的，如果新增的引擎，有配置参数需要配置的话，需要修改对应的表的元数据  

```
linkis_ps_configuration_config_key:  插入引擎的配置参数的key和默认values
linkis_cg_manager_label：插入引擎label如：hive-2.3.3
linkis_ps_configuration_category： 插入引擎的目录关联关系
linkis_ps_configuration_config_value： 插入引擎需要展示的配置
linkis_ps_configuration_key_engine_relation:配置项和引擎的关联关系
```
以openlookeng引擎 1.5.0版本 为例 
```html

SET @OPENLOOKENG_LABEL="openlookeng-1.5.0";
SET @OPENLOOKENG_ALL=CONCAT('*-*,',@OPENLOOKENG_LABEL);
SET @OPENLOOKENG_IDE=CONCAT('*-IDE,',@OPENLOOKENG_LABEL);

insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@OPENLOOKENG_ALL, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@OPENLOOKENG_IDE, 'OPTIONAL', 2, now(), now());

select @label_id := id from linkis_cg_manager_label where `label_value` = @OPENLOOKENG_IDE;
insert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);


INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.openlookeng.url', '例如:http://127.0.0.1:8080', '连接地址', 'http://127.0.0.1:8080', 'Regex', '^\\s*http://([^:]+)(:\\d+)(/[^\\?]+)?(\\?\\S*)?$', 'openlookeng', 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.openlookeng.catalog', 'catalog', 'catalog', 'system', 'None', '', 'openlookeng', 0, 0, 1, '数据源配置');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.openlookeng.source', 'source', 'source', 'global', 'None', '', 'openlookeng', 0, 0, 1, '数据源配置');


-- openlookeng-*
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config
INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'openlookeng' and label_value = @OPENLOOKENG_ALL);

-- openlookeng default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation
INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @OPENLOOKENG_ALL);

```

### 2.6 引擎刷新

1. 引擎支持实时刷新，引擎放置到对应目录后，通过http接口向linkis-cg-engineconnplugin 服务发送刷新请求即可。

- 接口 `http://${engineconn-plugin-server-IP}:${port}/api/rest_j/v1/rpc/receiveAndReply`

- 请求方式 `POST`

```json
{
  "method": "/enginePlugin/engineConn/refreshAll"
}
```

2. 重启刷新：通过重启也可以强制刷新引擎目录

```bash
### cd到sbin目录下，重启linkis-cg-engineconnplugin服务

cd ${LINKIS_HOME}/sbin

## 执行linkis-daemon脚本

sh linkis-daemon.sh restart cg-engineplugin

```

3. 检查引擎是否刷新成功：如果在刷新过程中遇到问题，需要确认是否刷新成功，则可以查看数据库中的linkis_engine_conn_plugin_bml_resources这张表的last_update_time是否为触发刷新的时间。
```sql
#登陆到linkis的数据库 
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

正常如下： 
![bml](https://user-images.githubusercontent.com/29391030/156343249-9f6dca8f-4e0d-438b-995f-4f469270a22d.png)

查看引擎的物料记录是否存在(如果有更新,查看更新时间是否正确)。
