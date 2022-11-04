---
title: 引擎的安装
sidebar_position: 4.0
---

> 本文主要介绍对于官方安装包中，未包含的引擎物料(jdbc/sqoop/flink等)/或则自定义实现的新引擎，如何进行安装部署，以支持对应的任务

## 1 引擎插件目录结构 

Linkis的引擎物料包安装目录为`${LINKIS_HOME}/lib/linkis-engineconn-plugins`，目录结构如下:

```html
hive #引擎主目录，必须为引擎的名字
│   ├──  dist  # 引擎启动需要的jar包依赖和配置，不同的版本需要在该目录放置对应的版本目录
│   │   └── v2.3.3 # 版本号，必须以v开头加上引擎版本号，注意 不能出现-; 版本为2.3.3  任务请求参数的engineType 为hive-2.3.3
│   │       └── conf # 引擎需要的配置文件目录
│   │       └── lib  # 引擎插件需要的依赖包
│   ├── plugin #引擎插件目录，该目录用于引擎管理服务封装引擎的启动命令和资源申请
│       └── 2.3.3 # 引擎版本,没有v开头
│           └── linkis-engineplugin-hive-1.0.0.jar  #引擎模块包（只需要放置单独的引擎包）
├── python
│   ├── dist
│   │   └── vpython2
│   └── plugin
│       └── python2 #版本为python2 任务请求参数的engineTypee 为python-python2

```

这里的物料包文件会在Linkis服务启动时候，会根据目录，解析出引擎和版本号，进行引擎物料的持久化存储(HDFS/本地文件系统中)，并将持久化存储信息(引擎类型和版本资源索引）
记录到数据库表`linkis_cg_engine_conn_plugin_bml_resources`中。

示例数据如下:

| engine_conn_type | version | file_name | file_size | last_modified | bml_resource_id | bml_resource_version | create_time | last_update_time | 
| --- | --- | --- | ---: | ---: | --- | --- | --- | --- | 
| hive | v2.3.4 | conf.zip | 2046 | 1651925378000 | 4f0353ac-5703-4b4d-942d-dbaead38b506 | v000001 | 2022-05-07 20:17:45 | 2022-05-07 20:17:45 | 
| hive | v2.3.4 | lib.zip | 137715715 | 1651925379000 | 762595b5-a6d3-4311-8133-4f8d4e0c3aa0 | v000001 | 2022-05-07 20:17:52 | 2022-05-07 20:17:52 | 

提交任务执行时，会通过请求的参数`engineType`，从`linkis_cg_engine_conn_plugin_bml_resources`中查询到对应的资源索引，
通过索引下载对应的引擎物料，并部署启动对应的引擎进程，再进行任务的处理。 

如 linkis-cli 提交hive查询示例 
```shell
sh ./bin/linkis-cli -engineType hive-2.3.3 -codeType hql -code "show tables"  -submitUser hadoop -proxyUser hadoop
``` 

:::caution 注意
因为引擎执行时传递的参数`engineType:hive-2.3.3` 是通过-来进行拆分出引擎和版本的，所以版本号里面不能出现`-`，
如果出现可以通过用其他符号代替，比如`engineType：hive-cdh-2.3.3`，会拆分错，可以直接使用这个：2.3.3 或则cdh_2.3.3 来命名引擎目录
:::


Linkis项目中包含的引擎模块`linkis-engineconn-plugins/engineconn-plugins`都是按这个目录进行打包配置的，
如果是自己实现的新增引擎，需要按照上述的目录结构进行打包，可以参考hive的assembly配置方式来配置打包流程和配置，
源码目录：`linkis-engineconn-plugins/hive/src/main/assembly/distribution.xml`

## 2. 引擎的安装

### 2.1 引擎包的准备

#### 方式1  
如果  [非默认引擎物料包](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)中有满足条件的，可以直接下载使用 

#### 方式2 手动编译获取 

全量编译(首次编译时需要) 
```shell script
cd  ${linkis_code_dir} 
mvn -N  install 
mvn clean install  
```

编译引擎 
```shell script
cd linkis-enginepconn-pugins/engineconn-plugins/pipeline/
mvn clean install
```

编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/{插件模块名}/target/out/{插件模块名}
```

### 2.2 部署和加载

将 2.1 步编译出来的引擎包，上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```

### 2.4 并配置默认的引擎版本(可选)

> 主要是配置默认版本，当请求未带版本时 会使用默认版本 

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
以openLooKeng引擎 1.5.0版本 为例 
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

#### 2.6.1 方式1 接口刷新 
引擎支持实时刷新，引擎放置到对应目录后，通过http接口向`linkis-cg-engineconnplugin` 服务发送刷新请求即可。

- 接口 `http://${engineconn-plugin-server-IP}:${port}/api/rest_j/v1/rpc/receiveAndReply`

- 请求方式 `POST`

```json
{
  "method": "/enginePlugin/engineConn/refreshAll"
}
```

#### 2.6.2 方式2 重启刷新

通过重启`linkis-cg-engineconnplugin` 服务，也可以强制刷新引擎目录

```bash
### cd到sbin目录下，重启linkis-cg-engineconnplugin服务

cd ${LINKIS_HOME}/sbin

## 执行linkis-daemon脚本

sh linkis-daemon.sh restart cg-engineplugin

```

#### 2.6.3  检查引擎是否刷新成功 

如果在刷新过程中遇到问题，需要确认是否刷新成功，则可以查看数据库中的`linkis_engine_conn_plugin_bml_resources`这张表的last_update_time是否为触发刷新的时间。
```sql
#登陆到linkis的数据库 
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

正常如下： 
![bml](https://user-images.githubusercontent.com/29391030/156343249-9f6dca8f-4e0d-438b-995f-4f469270a22d.png)

查看引擎的物料记录是否存在(如果有更新,查看更新时间是否正确)。
