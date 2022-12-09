---
title: 库表结构
sidebar_position: 1
---

## 1. linkis_cg_ec_resource_info_record

> 历史引擎信息记录表  ec 为`engine conn` 缩写  ecm为 engineconn manager 服务缩写

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_value` | ec 的label标签 stringValue 如 `userCreator, engineType`->`hadoop-LINKISCLI,shell-1`| varchar(255) |  | NO |  |  |
| 3 | `create_user` | ec 的创建用户| varchar(128) |  | NO |  |  |
| 4 | `service_instance` | ec 实例信息 如 bdpdev01dss02:19756| varchar(128) |  | YES |  |  |
| 5 | `ecm_instance` | ecm 实例信息 如bdpdev01dss02:9102   | varchar(128) |  | YES |  |  |
| 6 | `ticket_id` | ec 的 ticket id | varchar(100) | MUL | NO |  |  |
| 7 | `log_dir_suffix` | ec 日志log所在的路径  | varchar(128) |  | YES |  |  |
| 8 | `request_times` | 资源请求次数 | int(8) |  | YES |  |  |
| 9 | `request_resource` | 请求的资源 | varchar(1020) |  | YES |  |  |
| 10 | `used_times` |  资源使用次数 | int(8) |  | YES |  |  |
| 11 | `used_resource` | 使用的资源信息 | varchar(1020) |  | YES |  |  |
| 12 | `release_times` | 释放资源次数 | int(8) |  | YES |  |  |
| 13 | `released_resource` | 释放的资源 | varchar(1020) |  | YES |  |  |
| 14 | `release_time` | 释放的时间  | datetime |  | YES |  |  |
| 15 | `used_time` | 使用时间 | datetime |  | YES |  |  |
| 16 | `create_time` | 创建时间| datetime |  | YES |  | CURRENT_TIMESTAMP |


**示例数据**

| id | label_value | create_user | service_instance | ecm_instance | ticket_id | status | log_dir_suffix | request_times | request_resource | used_times | used_resource | release_times | released_resource | release_time | used_time | create_time |
| ---: | --- | --- | --- | --- | --- | --- | --- | ---: | --- | ---: | --- | ---: | --- | --- | --- | --- |
| 1 | hadoop-LINKISCLI,shell-1 | hadoop | bdpdev01dss02:19756 | bdpdev01dss02:9102 | fc0d442d-7e18-49f6-a01e-a4f4685f0155 | ShuttingDown | hadoop/20221025/shell/fc0d442d-7e18-49f6-a01e-a4f4685f0155/logs | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 2022-10-25 17:55:41 | 2022-10-25 17:53:09 | 2022-10-25 17:52:56 |
| 2 | hadoop-LINKISCLI,hive-2.3.3 | hadoop | bdpdev01dss02:20903 | bdpdev01dss02:9102 | 63ea31dc-65b1-42c4-8963-5fe4468f0ae0 | ShuttingDown | hadoop/20221025/hive/63ea31dc-65b1-42c4-8963-5fe4468f0ae0/logs | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 2022-10-25 17:55:52 | 2022-10-25 17:54:36 | 2022-10-25 17:54:20 |
| 3 | hadoop-LINKISCLI,python-python2 | hadoop | bdpdev01dss02:21320 | bdpdev01dss02:9102 | 3f8a4f73-fdbb-407e-ae1b-0b14b9d08bcf | ShuttingDown | hadoop/20221025/python/3f8a4f73-fdbb-407e-ae1b-0b14b9d08bcf/logs | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 1 | {"instance":1,"memory":"1024.0 MB","cpu":1} | 2022-10-25 17:57:41 | 2022-10-25 17:55:55 | 2022-10-25 17:55:44 |


## 2. linkis_cg_engine_conn_plugin_bml_resources

> 引擎物料存储信息表 主要用于引擎实例启动时，根据对应的物料资源的进行下载，以及进行引擎物料刷新时会使用到。

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | Primary key | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `engine_conn_type` |引擎名 如 hive  | varchar(100) |  | NO |  |  |
| 3 | `version` | 物料版本 | varchar(100) |  | YES |  |  |
| 4 | `file_name` | 文件名 conf.zip/lib.zip | varchar(255) |  | YES |  |  |
| 5 | `file_size` | 大小 byte | bigint(20) |  | NO |  | 0 |
| 6 | `last_modified` |文件的md5值| bigint(20) |  | YES |  |  |
| 7 | `bml_resource_id` | Owning system | varchar(100) |  | NO |  |  |
| 8 | `bml_resource_version` | Resource owner | varchar(200) |  | NO |  |  |
| 9 | `create_time` | created time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 10 | `last_update_time` | updated time | datetime |  | NO |  | CURRENT_TIMESTAMP |

**示例数据**

| id | engine_conn_type | version | file_name | file_size | last_modified | bml_resource_id | bml_resource_version | create_time | last_update_time |
| ---: | --- | --- | --- | ---: | ---: | --- | --- | --- | --- |
| 3 | hive | v2.3.3 | conf.zip | 2363 | 1666683401000 | 8f9879b4-9950-43c9-8eca-5f570211e784 | v000001 | 2022-10-25 15:42:08 | 2022-10-25 15:42:08 |
| 4 | hive | v2.3.3 | lib.zip | 106319116 | 1666683401000 | ac77aa15-e873-4f5f-9ed1-17435cad390f | v000001 | 2022-10-25 15:42:13 | 2022-10-25 15:42:13 |
| 5 | elasticsearch | v7.6.2 | conf.zip | 1981 | 1666683401000 | f17874ca-54fa-4153-8edb-a4d31268847b | v000001 | 2022-10-25 15:42:14 | 2022-10-25 15:42:14 |
| 6 | elasticsearch | v7.6.2 | lib.zip | 15935016 | 1666683401000 | 2f340471-a495-4b93-a197-b8eb362d04bb | v000001 | 2022-10-25 15:42:15 | 2022-10-25 15:42:15 |



## 3. linkis_cg_manager_engine_em

>引擎实例engine conn 和归属的ecm(engine conn manager)实例的关系表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `engine_instance` | ec 实例信息 | varchar(128) |  | YES |  |  |
| 3 | `em_instance` | ecm 实例信息 | varchar(128) |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| id | engine_instance | em_instance | update_time | create_time |
| ---: | --- | --- | --- | --- |
| 223 | bdpujes110003:10394 | bdpujes110003:9102 | 2022-11-12 23:30:09 | 2022-11-12 23:30:09 |
| 224 | bdpujes110003:33483 | bdpujes110003:9102 | 2022-11-12 23:30:48 | 2022-11-12 23:30:48 |
| 226 | bdpujes110003:19782 | bdpujes110003:9102 | 2022-11-13 01:48:05 | 2022-11-13 01:48:05 |



## 4. linkis_cg_manager_label

> 标签记录表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_key` | 标签 label  | varchar(32) | MUL | NO |  |  |
| 3 | `label_value` | 标签值 json格式  | varchar(255) |  | NO |  |  |
| 4 | `label_feature` |  | varchar(16) |  | NO |  |  |
| 5 | `label_value_size` | 标签存储的元素个数 | int(20) |  | NO |  |  |
| 6 | `update_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 7 | `create_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |


**示例数据**

| id | label_key | label_value | label_feature | label_value_size | update_time | create_time |
| ---: | --- | --- | --- | ---: | --- | --- |
| 19 | combined_userCreator_engineType | *-nodeexecution,python-python2 | OPTIONAL | 2 | 2021-06-08 20:25:28 | 2021-06-08 20:25:28 |
| 21 | serverAlias | {"alias":"linkis-cg-engineconnmanager"} | OPTIONAL | 1 | 2021-06-08 20:27:07 | 2021-06-08 20:27:07 |
| 24 | combined_userCreator_engineType | {"creator":"IDE","user":"hadoop","engineType":"hive","version":"2.3.3"} | OPTIONAL | 4 | 2021-06-08 20:42:00 | 2021-06-08 20:42:00 |
| 26 | userCreator | {"creator":"IDE","user":"hadoop"} | OPTIONAL | 2 | 2021-06-08 20:42:07 | 2021-06-08 20:42:07 |
| 27 | engineType | {"engineType":"hive","version":"2.3.3"} | OPTIONAL | 2 | 2021-06-08 20:42:07 | 2021-06-08 20:42:07 |
| 28 | serverAlias | {"alias":"EngineConn"} | OPTIONAL | 1 | 2021-06-08 20:42:07 | 2021-06-08 20:42:07 |
| 29 | codeType | {"codeType":"hql"} | OPTIONAL | 1 | 2021-06-08 20:42:16 | 2021-06-08 20:42:16 |
| 30 | combined_userCreator_engineType | {"creator":"IDE","user":"root","engineType":"io_file","version":"1.0"} | OPTIONAL | 4 | 2021-06-08 20:50:47 | 2021-06-08 20:50:47 |
| 32 | userCreator | {"creator":"IDE","user":"root"} | OPTIONAL | 2 | 2021-06-08 20:50:52 | 2021-06-08 20:50:52 |
| 33 | concurrentEngineConn | {} | OPTIONAL | 0 | 2021-06-08 20:50:52 | 2021-06-08 20:50:52 |
| 34 | engineType | {"engineType":"io_file","version":"1.0"} | OPTIONAL | 2 | 2021-06-08 20:50:52 | 2021-06-08 20:50:52 |
| 35 | codeType | {"codeType":"io_file"} | OPTIONAL | 1 | 2021-06-08 20:50:59 | 2021-06-08 20:50:59 |
| 36 | combined_userCreator_engineType | johnnwang-*,*-* | OPTIONAL | 2 | 2021-06-08 22:07:07 | 2021-06-08 22:07:07 |
| 37 | combined_userCreator_engineType | {"creator":"IDE","user":"johnnwang","engineType":"flink","version":"1.11.1"} | OPTIONAL | 4 | 2021-06-08 22:07:20 | 2021-06-08 22:07:20 |
| 39 | userCreator | {"creator":"IDE","user":"johnnwang"} | OPTIONAL | 2 | 2021-06-08 22:07:26 | 2021-06-08 22:07:26 |
| 40 | engineType | {"engineType":"flink","version":"1.11.1"} | OPTIONAL | 2 | 2021-06-08 22:07:26 | 2021-06-08 22:07:26 |
| 41 | combined_userCreator_engineType | {"creator":"IDE","user":"johnnwang","engineType":"spark","version":"2.4.3"} | OPTIONAL | 4 | 2021-06-08 22:07:37 | 2021-06-08 22:07:37 |




## 5. linkis_cg_manager_label_resource

> 标签id 和资源id 的关联关系表  

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_id` | linkis_cg_manager_label的id | int(20) | UNI | YES |  |  |
| 3 | `resource_id` | linkis_cg_manager_linkis_resources对应的id | int(20) |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| id | label_id | resource_id | update_time | create_time |
| ---: | ---: | ---: | --- | --- |
| 14217 | 13266 | 14218 | 2022-11-12 23:09:36 | 2022-11-12 23:09:36 |
| 14218 | 24 | 14219 | 2022-11-12 23:30:09 | 2022-11-12 23:30:09 |
| 14219 | 13267 | 14220 | 2022-11-12 23:30:09 | 2022-11-12 23:30:09 |




## 6. linkis_cg_manager_label_service_instance

>引擎实例engine conn/ecm(engine conn manager)实例 标签记录表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_id` | linkis_cg_manager_label的id | int(20) | MUL | YES |  |  |
| 3 | `service_instance` | 实例信息  | varchar(128) |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |


**示例数据**

| id | label_id | service_instance | update_time | create_time |
| ---: | ---: | --- | --- | --- |
| 200 | 94 | bdpdev01dss02:33755 | 2022-11-14 17:11:26 | 2022-11-14 17:11:26 |
| 201 | 105 | bdpdev01dss02:9102 | 2022-11-15 14:54:56 | 2022-11-15 14:54:56 |
| 202 | 23 | bdpdev01dss02:9102 | 2022-11-15 14:54:56 | 2022-11-15 14:54:56 |



## 7. linkis_cg_manager_label_user

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `username` |  | varchar(255) |  | YES |  |  |
| 3 | `label_id` |  | int(20) |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |


## 8. linkis_cg_manager_label_value_relation

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_value_key` |  | varchar(255) | MUL | NO |  |  |
| 3 | `label_value_content` |  | varchar(255) |  | YES |  |  |
| 4 | `label_id` |  | int(20) |  | YES |  |  |
| 5 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 6 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |


**示例数据**

| label_value_key | label_value_content | label_id | update_time | create_time |
| --- | --- | ---: | --- | --- |
| creator | IDE | 7589 | 2022-05-16 19:31:13 | 2022-05-16 19:31:13 |
| user | owenxu | 7589 | 2022-05-16 19:31:13 | 2022-05-16 19:31:13 |
| creator | mide | 7511 | 2022-05-12 10:40:27 | 2022-05-12 10:40:27 |
| user | davidhua | 7511 | 2022-05-12 10:40:27 | 2022-05-12 10:40:27 |


## 9. linkis_cg_manager_linkis_resources

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `max_resource` |  | varchar(1020) |  | YES |  |  |
| 3 | `min_resource` |  | varchar(1020) |  | YES |  |  |
| 4 | `used_resource` |  | varchar(1020) |  | YES |  |  |
| 5 | `left_resource` |  | varchar(1020) |  | YES |  |  |
| 6 | `expected_resource` |  | varchar(1020) |  | YES |  |  |
| 7 | `locked_resource` |  | varchar(1020) |  | YES |  |  |
| 8 | `resourceType` |  | varchar(255) |  | YES |  |  |
| 9 | `ticketId` |  | varchar(255) |  | YES |  |  |
| 10 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 11 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 12 | `updator` |  | varchar(255) |  | YES |  |  |
| 13 | `creator` |  | varchar(255) |  | YES |  |  |

**示例数据**

| id | max_resource | min_resource | used_resource | left_resource | expected_resource | locked_resource | resourceType | ticketId | update_time | create_time | updator | creator |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 14219 | {"memory":21474836480,"cores":10,"instance":10} | {"memory":0,"cores":0,"instance":0} | {"memory":1073741824,"cores":1,"instance":1} | {"memory":20401094656,"cores":9,"instance":9} | \N | {"memory":0,"cores":0,"instance":0} | LoadInstance | \N | \N | 2022-11-12 23:30:09 | hadoop-IDE,hive-2.3.3 | hadoop-IDE,hive-2.3.3 |
| 14220 | {"memory":1073741824,"cores":1,"instance":1} | {"memory":1073741824,"cores":1,"instance":1} | {"memory":1073741824,"cores":1,"instance":1} | {"memory":0,"cores":0,"instance":0} | \N | {"memory":0,"cores":0,"instance":0} | LoadInstance | 24f8c8a8-d481-4976-a11a-5765f81d9795 | \N | 2022-11-12 23:30:09 | hadoop-IDE,hive-2.3.3 | hadoop-IDE,hive-2.3.3 |
| 14221 | {"DriverAndYarnResource":{"loadInstanceResource":{"memory":21474836480,"cores":10,"instances":5},"yarnResource":{"queueMemory":322122547200,"queueCores":150,"queueInstances":30,"queueName":"dws","applicationId":""}}} | {"DriverAndYarnResource":{"loadInstanceResource":{"memory":0,"cores":0,"instances":0},"yarnResource":{"queueMemory":0,"queueCores":0,"queueInstances":0,"queueName":"default","applicationId":""}}} | {"DriverAndYarnResource":{"loadInstanceResource":{"memory":1073741824,"cores":1,"instances":1},"yarnResource":{"queueMemory":6442450944,"queueCores":4,"queueInstances":0,"queueName":"dws","applicationId":""}}} | {"DriverAndYarnResource":{"loadInstanceResource":{"memory":20401094656,"cores":9,"instances":4},"yarnResource":{"queueMemory":315680096256,"queueCores":146,"queueInstances":30,"queueName":"dws","applicationId":""}}} | \N | {"DriverAndYarnResource":{"loadInstanceResource":{"memory":0,"cores":0,"instances":0},"yarnResource":{"queueMemory":0,"queueCores":0,"queueInstances":0,"queueName":"dws","applicationId":""}}} | DriverAndYarn | \N | \N | 2022-11-12 23:30:47 | hadoop-IDE,spark-2.4.3 | hadoop-IDE,spark-2.4.3 |


## 10. linkis_cg_manager_lock

> 通用的用于实现分布式锁

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `lock_object` |  | varchar(255) | UNI | YES |  |  |
| 3 | `time_out` |  | longtext |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |


## 11. linkis_cg_manager_metrics_history

//todo 可以移除？

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `instance_status` |  | int(20) |  | YES |  |  |
| 3 | `overload` |  | varchar(255) |  | YES |  |  |
| 4 | `heartbeat_msg` |  | varchar(255) |  | YES |  |  |
| 5 | `healthy_status` |  | int(20) |  | YES |  |  |
| 6 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 7 | `creator` |  | varchar(255) |  | YES |  |  |
| 8 | `ticketID` |  | varchar(255) |  | YES |  |  |
| 9 | `serviceName` |  | varchar(255) |  | YES |  |  |
| 10 | `instance` |  | varchar(255) |  | YES |  |  |


## 12. linkis_cg_manager_service_instance

> 引擎服务实例/引擎资源管理服务实例 信息表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `instance` | 实例信息 bdpdws110004:9102| varchar(128) | UNI | YES |  |  |
| 3 | `name` | 服务名 linkis-cg-engineconnmanager/linkis-cg-engineconn | varchar(32) |  | YES |  |  |
| 4 | `owner` |  服务实例的启动用户| varchar(32) |  | YES |  |  |
| 5 | `mark` | //todo | varchar(32) |  | YES |  |  |
| 6 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 7 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 8 | `updator` |  | varchar(32) |  | YES |  |  |
| 9 | `creator` |  | varchar(32) |  | YES |  |  |

**示例数据**

| id | instance | name | owner | mark | update_time | create_time | updator | creator |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 121637 | bdpdws110004:9102 | linkis-cg-engineconnmanager | hadoop | process | 2022-11-08 09:52:08 | 2022-11-08 09:52:08 | hadoop | hadoop |
| 121640 | bdpujes110002:9102 | linkis-cg-engineconnmanager | hadoop | process | 2022-11-08 09:52:16 | 2022-11-08 09:52:16 | hadoop | hadoop |
| 121686 | gz.xg.bdpdws110001.webank:35932 | linkis-cg-engineconn | neiljianliu | process | 2022-11-08 10:40:39 | 2022-11-08 10:40:23 | neiljianliu | neiljianliu |



## 13. linkis_cg_manager_service_instance_metrics

> 引擎服务实例/引擎资源管理服务的内存等信息 指标表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `instance` |  实例| varchar(128) | PRI | NO |  |  |
| 2 | `instance_status` |状态  | int(11) |  | YES |  |  |
| 3 | `overload` | 资源过载情况 | varchar(255) |  | YES |  |  |
| 4 | `heartbeat_msg` |  心跳信息| text |  | YES |  |  |
| 5 | `healthy_status` |  心跳状态| varchar(255) |  | YES |  |  |
| 6 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 7 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| instance | instance_status | overload | heartbeat_msg | healthy_status | update_time | create_time |
| --- | ---: | --- | --- | --- | --- | --- |
| bdpdws110003:9102 | 5 | {"maxMemory":67385790464,"usedMemory":3662913536,"systemCPUUsed":null,"systemLeftMemory":63722876928} |  | {"nodeHealthy":"Healthy","msg":""} | 2022-11-16 14:29:56 | 2022-11-15 15:59:17 |
| bdpdws110004:10781 | 1 | {"maxMemory":1073741824,"usedMemory":175014896,"systemCPUUsed":6.29,"systemLeftMemory":2746556416} | \N | {"nodeHealthy":"Healthy","msg":""} | 2022-11-16 14:30:18 | 2022-11-16 11:53:48 |
| bdpdws110004:12845 | 1 | {"maxMemory":1073741824,"usedMemory":104839664,"systemCPUUsed":6.29,"systemLeftMemory":2800877568} | \N | {"nodeHealthy":"Healthy","msg":""} | 2022-11-16 14:30:17 | 2022-11-16 12:03:20 |


## 14. linkis_cg_rm_external_resource_provider

> 资源扩展信息配置表  目前主要用于yarn资源信息的配置

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(10) | PRI | NO | auto_increment |  |
| 2 | `resource_type` |  资源类型 Yarn| varchar(32) |  | NO |  |  |
| 3 | `name` | 名称| varchar(32) |  | NO |  |  |
| 4 | `labels` | 标签| varchar(32) |  | YES |  |  |
| 5 | `config` | 连接信息 | text |  | NO |  |  |


```scala
//默认使用的为default  通过配置项wds.linkis.rm.default.yarn.cluster.name 控制
  val DEFAULT_YARN_CLUSTER_NAME = CommonVars("wds.linkis.rm.default.yarn.cluster.name", "default")
  val DEFAULT_YARN_TYPE = CommonVars("wds.linkis.rm.default.yarn.cluster.type", "Yarn")
```

**示例数据**

| id | resource_type | name | labels | config |
| ---: | --- | --- | --- | --- |
| 1 | Yarn | sit | \N | {"rmWebAddress": "http://127.0.0.1:8088","hadoopVersion": "2.7.2","authorEnable":true,"user":"hadoop","pwd":"123456"} |
| 2 | Yarn | DEV | \N | {"rmWebAddress": "http://127.0.0.1:8088","hadoopVersion": "2.7.2","authorEnable":true,"user":"hadoop","pwd":"123456"} |
| 3 | Yarn | PROD | \N | {"rmWebAddress": "http://127.0.0.1:8088","hadoopVersion": "2.7.2","authorEnable":true,"user":"hadoop","pwd":"123456"} |




## 15. linkis_cg_rm_resource_action_record


| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_value` |  | varchar(100) | MUL | NO |  |  |
| 3 | `ticket_id` |  | varchar(100) |  | NO |  |  |
| 4 | `request_times` |  | int(8) |  | YES |  |  |
| 5 | `request_resource_all` |  | varchar(100) |  | YES |  |  |
| 6 | `used_times` |  | int(8) |  | YES |  |  |
| 7 | `used_resource_all` |  | varchar(100) |  | YES |  |  |
| 8 | `release_times` |  | int(8) |  | YES |  |  |
| 9 | `release_resource_all` |  | varchar(100) |  | YES |  |  |
| 10 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 11 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| id | label_value | ticket_id | request_times | request_resource_all | used_times | used_resource_all | release_times | release_resource_all | update_time | create_time |
| ---: | --- | --- | ---: | --- | ---: | --- | ---: | --- | --- | --- |
| 6 | leebai-IDE,hive-2.3.3 | 0dff1547-6867-4e5c-8baa-4bb561d586e3 | 1 | {"memory":1073741824,"cores":2,"instance":1} | 0 | {"memory":0,"cores":0,"instance":0} | 0 | {"memory":0,"cores":0,"instance":0} | 2021-12-30 19:29:21 | 2021-12-30 19:29:21 |
| 7 | hadoop-Schedulis,spark-2.4.3 | e3a1aeeb-c04a-44cb-a94b-d84e54e55185 | 1 | {"memory":2147483648,"cores":1,"instance":1} | 0 | {"memory":0,"cores":0,"instance":0} | 0 | {"memory":0,"cores":0,"instance":0} | 2021-12-30 19:47:37 | 2021-12-30 19:47:37 |





## 16. linkis_mg_gateway_auth_token

> gateway 的token方式认证的 token令牌信息记录表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `token_name` | token 名 | varchar(128) | UNI | NO |  |  |
| 3 | `legal_users` | 合法可使用用户  * 为所有| text |  | YES |  |  |
| 4 | `legal_hosts` | 合法可请求的源ip * 为所有 | text |  | YES |  |  |
| 5 | `business_owner` | 业务归属方 | varchar(32) |  | YES |  |  |
| 6 | `create_time` |  | date |  | YES |  |  |
| 7 | `update_time` |  | date |  | YES |  |  |
| 8 | `elapse_day` |  过期天数 -1 为永久有效| bigint(20) |  | YES |  |  |
| 9 | `update_by` |  | varchar(32) |  | YES |  |  |


**示例数据**

| id | token_name | legal_users | legal_hosts | business_owner | create_time | update_time | elapse_day | update_by |
| ---: | --- | --- | --- | --- | --- | --- | ---: | --- |
| 2 | BML-AUTH | * | * | BDP | 2021-09-15 | 2021-09-15 | -1 | LINKIS |
| 3 | WS-AUTH | * | * | BDP | 2021-09-15 | 2021-09-15 | -1 | LINKIS |
| 4 | dss-AUTH | * | * | BDP | 2021-09-15 | 2021-09-15 | -1 | LINKIS |

## 17. linkis_ps_bml_project

> bml 物料管理工程项目记录 主要提供给dss 工程空间的项目列表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(10) | PRI | NO | auto_increment |  |
| 2 | `name` |  项目名| varchar(128) | UNI | YES |  |  |
| 3 | `system` | 使用系统 | varchar(64) |  | NO |  | dss |
| 4 | `source` |  | varchar(1024) |  | YES |  |  |
| 5 | `description` |  | varchar(1024) |  | YES |  |  |
| 6 | `creator` |  | varchar(128) |  | NO |  |  |
| 7 | `enabled` |  | tinyint(4) |  | YES |  | 1 |
| 8 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| id | name | system | source | description | creator | enabled | create_time |
| ---: | --- | --- | --- | --- | --- | ---: | --- |
| 2524 | metabase_test_ywz_1234 | dss | \N | jinyangrao 在bml创建的工程  | jinyangrao | 1 | 2022-11-16 09:36:58 |
| 2523 | metabase_test_tjg_345 | dss | \N | jinyangrao 在bml创建的工程  | jinyangrao | 1 | 2022-11-16 09:11:08 |
| 2522 | test_1114_54_copynull | dss | \N | stacyyan 在bml创建的工程  | stacyyan | 1 | 2022-11-15 10:44:27 |

## 18. linkis_ps_bml_project_resource

> bml项目和对应的资源id关系表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(10) | PRI | NO | auto_increment |  |
| 2 | `project_id` | 项目id | int(10) |  | NO |  |  |
| 3 | `resource_id` | 资源存储的resource id | varchar(128) |  | YES |  |  |


**示例数据**

| id | project_id | resource_id |
| ---: | ---: | --- |
| 1 | 1 | 103cb0cc-e12b-4c2e-b8de-a8f58ad17d75 |
| 2 | 1 | 86bcd05d-4ed9-46be-ab26-d8a76433138b |
| 3 | 1 | 01697abe-7658-4d3f-b49b-bac4c809a7ba |



## 19. linkis_ps_bml_project_user

> bml项目和用户关系表  

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(10) | PRI | NO | auto_increment |  |
| 2 | `project_id` | 项目id | int(10) |  | NO |  |  |
| 3 | `username` |  | varchar(64) | MUL | YES |  |  |
| 4 | `priv` | rwx 421 权限值为7。8为管理员，可以授权其他用户| int(10) |  | NO |  | 7 |
| 5 | `creator` | 创建者 | varchar(128) |  | NO |  |  |
| 6 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 7 | `expire_time` |  | datetime |  | YES |  |  |


**示例数据**

| id | project_id | username | priv | creator | create_time | expire_time |
| ---: | ---: | --- | ---: | --- | --- | --- |
| 22 | 21 | jianfuzhang | 7 | jianfuzhang | 2021-05-10 15:20:48 | \N |
| 23 | 22 | neiljianliu | 7 | neiljianliu | 2021-05-10 15:26:23 | \N |
| 24 | 22 | jianfuzhang | 5 | neiljianliu | 2021-05-10 15:26:23 | \N |



## 20. linkis_ps_bml_resources

> bml 物料资源存储信息表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | Primary key | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `resource_id` | 资源的 uuid | varchar(50) |  | NO |  |  |
| 3 | `is_private` | 资源是否私有，0表示私有，1表示公共 | tinyint(1) |  | YES |  | 0 |
| 4 | `resource_header` | 分类，0表示未分类，1表示分类 | tinyint(1) |  | YES |  | 0 |
| 5 | `downloaded_file_name` | 下载时的文件名 | varchar(200) |  | YES |  |  |
| 6 | `sys` | 归属系统 | varchar(100) |  | NO |  |  |
| 7 | `create_time` | 创建时间 | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 8 | `owner` | 资源所有则 | varchar(200) |  | NO |  |  |
| 9 | `is_expire` | 是否过期，0表示未过期，1表示过期| tinyint(1) |  | YES |  | 0 |
| 10 | `expire_type` | 到期类型，date指的是在指定的日期到期，TIME指的是时间| varchar(50) |  | YES |  |  |
| 11 | `expire_time` | 过期时间，默认一天 | varchar(50) |  | YES |  |  |
| 12 | `max_version` | 默认为10，表示保留最新的10个版本 | int(20) |  | YES |  | 10 |
| 13 | `update_time` | Updated time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 14 | `updator` | updator | varchar(50) |  | YES |  |  |
| 15 | `enable_flag` | 状态，1：正常，0：冻结 | tinyint(1) |  | NO |  | 1 |

**示例数据**

| id | resource_id | is_private | resource_header | downloaded_file_name | sys | create_time | owner | is_expire | expire_type | expire_time | max_version | update_time | updator | enable_flag |
| ---: | --- | ---: | ---: | --- | --- | --- | --- | ---: | --- | --- | ---: | --- | --- | ---: |
| 332800 | 72eac098-0d71-42c9-962c-e9580ac5ac0b | 1 | \N | 72eac098-0d71-42c9-962c-e9580ac5ac0b | WTSS | 2022-07-27 09:47:06 | hadoop | 0 | \N | \N | 10 | 2022-07-27 09:47:06 | \N | 1 |
| 398336 | 273611e6-e1be-480e-8556-c2534910e855 | 1 | \N | 273611e6-e1be-480e-8556-c2534910e855 | WTSS | 2022-07-29 06:31:44 | hadoop | 0 | \N | \N | 10 | 2022-07-29 06:31:44 | \N | 1 |
| 463872 | a111ab00-bafd-4341-a17b-ab9101970abd | 1 | \N | a111ab00-bafd-4341-a17b-ab9101970abd | WTSS | 2022-08-03 06:18:32 | hadoop | 0 | \N | \N | 10 | 2022-08-03 06:18:32 | \N | 1 |


## 21. linkis_ps_bml_resources_permission

 // todo 未使用？  
 
| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | Primary key | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `resource_id` | Resource uuid | varchar(50) |  | NO |  |  |
| 3 | `permission` | permission | varchar(10) |  | NO |  |  |
| 4 | `create_time` | created time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 5 | `system` | creator | varchar(50) |  | YES |  | dss |
| 6 | `update_time` | updated time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 7 | `updator` | updator | varchar(50) |  | NO |  |  |


## 22. linkis_ps_bml_resources_task

> bml 物料资源操作记录表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `resource_id` | 资源uuid | varchar(50) |  | YES |  |  |
| 3 | `version` | 当前操作的资源版本号 | varchar(20) |  | YES |  |  |
| 4 | `operation` |操作类型。 上传 = 0，更新 = 1 | varchar(20) |  | NO |  |  |
| 5 | `state` | 任务当前状态:Schduled, Running, Succeed, Failed,Cancelled | varchar(20) |  | NO |  | Schduled |
| 6 | `submit_user` | 作业提交用户名 | varchar(20) |  | NO |  |  |
| 7 | `system` | 系统名称 如: wtss | varchar(20) |  | YES |  | dss |
| 8 | `instance` | 提供服务的实例| varchar(128) |  | NO |  |  |
| 9 | `client_ip` | 请求方ip | varchar(50) |  | YES |  |  |
| 10 | `extra_params` | 附加关键信息。 比如批量删除的资源ID和版本，资源下的所有版本都被删除 | text |  | YES |  |  |
| 11 | `err_msg` | 任务失败信息。e.getMessage | varchar(2000) |  | YES |  |  |
| 12 | `start_time` | 开始时间 | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 13 | `end_time` | 结束时间 | datetime |  | YES |  |  |
| 14 | `last_update_time` | 最后更新时间 | datetime |  | NO |  |  |

**示例数据**

| id | resource_id | version | operation | state | submit_user | system | instance | client_ip | extra_params | err_msg | start_time | end_time | last_update_time |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 183039 | 873513f8-9ad0-4473-b7b9-1cc2500abab7 | \N | copyResource | success | stacyyan | \N | bdphdp11ide01:9107 | 10.107.118.104 | \N | \N | 2022-03-24 20:11:18 | 2022-03-24 20:11:19 | 2022-03-24 20:11:19 |
| 259846 | 7ae110d2-5649-4c57-9e4c-b48bb62f3382 | \N | deleteResource | success | stacyyan | WTSS | bdphdp11ide01:9107 | 10.36.35.235 | delete resourceId:7ae110d2-5649-4c57-9e4c-b48bb62f3382, and delete versions is :v000001 | \N | 2022-06-01 14:38:42 | 2022-06-01 14:38:43 | 2022-06-01 14:38:43 |
| 12551 | 8678bbd5-cfc7-411b-a838-1b145dab8473 | \N | deleteResource | success | neiljianliu | WTSS | bdphdp11ide01:9107 | 10.58.34.204 | delete resourceId:8678bbd5-cfc7-411b-a838-1b145dab8473, and delete versions is :v000001 | \N | 2021-07-16 14:47:15 | 2021-07-16 14:47:15 | 2021-07-16 14:47:15 |
| 36360 | eadc8908-e00c-4604-ab30-6671f33e753e | \N | deleteResource | success | neiljianliu | WTSS | bdphdp11ide01:9107 | 127.0.0.1 | delete resourceId:eadc8908-e00c-4604-ab30-6671f33e753e, and delete versions is :v000001 | \N | 2021-10-26 17:46:15 | 2021-10-26 17:46:15 | 2021-10-26 17:46:15 |
| 549888 | dfbd7603-d513-413a-b491-d79a62a25407 | v000001 | upload | success | hadoop | dss | bdphdp11ide01:9107 | 10.107.116.246 | \N | \N | 2022-07-29 00:26:43 | 2022-07-29 00:26:43 | 2022-07-29 00:26:43 |
| 51775 | ba304c46-ab63-404e-b2aa-69f522ef3baa | v000004 | rollbackVersion | success | johnnwang | \N | bdphdp11ide01:9107 | 10.107.118.104 | \N | \N | 2021-11-27 17:04:28 | 2021-11-27 17:04:28 | 2021-11-27 17:04:28 |
| 28 | d07d8636-5415-418f-9aff-dde1b3a69569 | v000005 | update | success | hadoop | WTSS | bdphdp11ide01:9107 | 10.107.116.246 | \N | \N | 2021-04-29 14:24:36 | 2021-04-29 14:24:36 | 2021-04-29 14:24:36 |


## 23. linkis_ps_bml_resources_version

>资源和对应的版本信息关联表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | Primary key | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `resource_id` | 资源uuid | varchar(50) | MUL | NO |  |  |
| 3 | `file_md5` | 文件的md5摘要 | varchar(32) |  | NO |  |  |
| 4 | `version` | 资源版本（v 后面加五位数字） | varchar(20) |  | NO |  |  |
| 5 | `size` | 文件大小 | int(10) |  | NO |  |  |
| 6 | `start_byte` | 开始字节 | bigint(20) unsigned |  | NO |  | 0 |
| 7 | `end_byte` | 结束字节 | bigint(20) unsigned |  | NO |  | 0 |
| 8 | `resource` | 资源内容（文件信息包括路径和文件名） | varchar(2000) |  | NO |  |  |
| 9 | `description` | 说明 | varchar(2000) |  | YES |  |  |
| 10 | `start_time` | 开始时间 | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 11 | `end_time` | 停止时间 | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 12 | `client_ip` | 客户端ip | varchar(200) |  | NO |  |  |
| 13 | `updator` | updator | varchar(50) |  | YES |  |  |
| 14 | `enable_flag` | 状态，1：正常，0：冻结| tinyint(1) |  | NO |  | 1 |


**示例数据** 

| id | resource_id | file_md5 | version | size | start_byte | end_byte | resource | description | start_time | end_time | client_ip | updator | enable_flag |
| ---: | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | ---: |
| 1 | 863846e2-bd31-49ba-babe-9a2b96616d71 | b8fd956fd8f83d09d203bf9e4b40543f | v000001 | 1668 | 1 | 1668 | hdfs:///apps-data/hadoop/bml/20210429/863846e2-bd31-49ba-babe-9a2b96616d71 | \N | 2021-04-29 12:21:07 | 2021-04-29 12:21:07 | 10.107.118.104 | \N | 1 |
| 2 | 9d39cb8e-1447-46d5-a11d-b597b2e3200f | 46bf4ff26651c448efb85ffa9c54907f | v000001 | 58965932 | 1 | 58965932 | hdfs:///apps-data/hadoop/bml/20210429/9d39cb8e-1447-46d5-a11d-b597b2e3200f | \N | 2021-04-29 12:21:10 | 2021-04-29 12:21:10 | 10.107.118.104 | \N | 1 |
| 3 | bc620bfd-d3f4-4fa5-84f7-1c484fac2241 | 8e13ba687fa1ee04e113bff50290a5c6 | v000001 | 1745 | 1 | 1745 | hdfs:///apps-data/hadoop/bml/20210429/bc620bfd-d3f4-4fa5-84f7-1c484fac2241 | \N | 2021-04-29 12:21:14 | 2021-04-29 12:21:14 | 10.107.118.104 | \N | 1 |



## 24. linkis_ps_common_lock

> 通用的用于实现分布式锁

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `lock_object` |  | varchar(255) | UNI | YES |  |  |
| 3 | `time_out` |  | longtext |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |


## 25. linkis_ps_configuration_category

> 参数配置目录树表  对应于管理台的`参数配置页面`

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_id` | linkis_cg_manager_label 标签的id | int(20) | UNI | NO |  |  |
| 3 | `level` | 1为应用类型级别 2 为引擎类型级别  | int(20) |  | NO |  |  |
| 4 | `description` |  | varchar(200) |  | YES |  |  |
| 5 | `tag` |  | varchar(200) |  | YES |  |  |
| 6 | `update_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 7 | `create_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |


**示例数据** 

| id | label_id | level | description | tag | update_time | create_time |
| ---: | ---: | ---: | --- | --- | --- | --- |
| 101 | 46586 | 1 |  | \N | 2021-08-19 20:07:09 | 2021-08-19 20:07:09 |
| 102 | 46587 | 2 |  | \N | 2021-08-19 20:07:20 | 2021-08-19 20:07:20 |
| 103 | 47340 | 1 |  | \N | 2021-08-23 10:50:02 | 2021-08-23 10:50:02 |



## 26. linkis_ps_configuration_config_key

> 引擎相关参数的配置表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `key` | 配置项的key 如 spark.executor.instances | varchar(50) |  | YES |  |  |
| 3 | `description` | 描述 | varchar(200) |  | YES |  |  |
| 4 | `name` | 名称 | varchar(50) |  | YES |  |  |
| 5 | `default_value` | 当用户未进行设置时，使用默认值 | varchar(200) |  | YES |  |  |
| 6 | `validate_type` | 验证类型，以下之一：None、NumInterval、FloatInterval、Include、Regex、OPF、Custom Rules| varchar(50) |  | YES |  |  |
| 7 | `validate_range` | 验证范围 | varchar(50) |  | YES |  |  |
| 8 | `engine_conn_type` | 引擎类型，如 spark、hive 等| varchar(50) |  | YES |  |  |
| 9 | `is_hidden` | 是否对用户隐藏。 如果设置为 1(true)，则用户不能修改，但仍然可以在后端使用 | tinyint(1) |  | YES |  |  |
| 10 | `is_advanced` | 是否为高级参数。 如果设置为 1(true)，参数将仅在用户选择【显示高级参数】时显示  | tinyint(1) |  | YES |  |  |
| 11 | `level` | 前端显示排序的依据。 级别越高，参数优先显示| tinyint(1) |  | YES |  |  |
| 12 | `treeName` | 配置项的engineType的子目录分类 | varchar(20) |  | YES |  |  |


**示例数据**

| id | key | description | name | default_value | validate_type | validate_range | engine_conn_type | is_hidden | is_advanced | level | treeName |
| ---: | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | --- |
| 1 | wds.linkis.rm.yarnqueue | yarn队列名 | yarn队列名 | default | None | \N | \N | 0 | 0 | 1 | 队列资源 |
| 2 | wds.linkis.rm.yarnqueue.instance.max | 取值范围：1-128，单位：个 | yarn队列实例最大个数 | 30 | Regex | ^(?:[1-9]\d?|[1234]\d{2}|200)$ | \N | 1 | 0 | 1 | 队列资源 |
| 3 | wds.linkis.rm.yarnqueue.cores.max | 取值范围：1-1500，单位：个 | 队列CPU使用上限 | 150 | Regex | ^(?:[1-9]\d{0,2}|1[0-4]\d{2}|1500)$ | \N | 0 | 0 | 1 | 队列资源 |
| 4 | wds.linkis.rm.yarnqueue.memory.max | 取值范围：1-5000，单位：G | 队列内存使用上限 | 300G | Regex | ^([1-9]\d{0,2}|[1-4]\d{3}|5000)(G|g)$ | \N | 0 | 0 | 1 | 队列资源 |


## 27. linkis_ps_configuration_config_value

> 参数配置项key对应的配置值表 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `config_key_id` | linkis_ps_configuration_config_key的id | bigint(20) | MUL | YES |  |  |
| 3 | `config_value` | 设置的值 | varchar(200) |  | YES |  |  |
| 4 | `config_label_id` | 对应的linkis_cg_manager_label 的id | int(20) |  | YES |  |  |
| 5 | `update_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 6 | `create_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |

**示例数据**

| id | config_key_id | config_value | config_label_id | update_time | create_time |
| ---: | ---: | --- | ---: | --- | --- |
| 57 | 1 | dws | 25716 | 2022-04-08 16:35:37 | 2021-06-08 16:07:49 |
| 61 | 30 | python2 | 30819 | 2022-07-04 11:17:25 | 2021-06-08 16:35:23 |
| 62 | 1 | dws | 519 | 2022-11-07 19:13:29 | 2021-06-08 17:19:44 |
| 64 | 19 | python2 | 3300 | 2022-08-09 17:38:15 | 2021-06-08 20:15:04 |
| 65 | 5 | 50G | 1348 | 2022-05-16 15:39:44 | 2021-06-10 17:55:11 |



## 28. linkis_ps_configuration_key_engine_relation

>配置项和引擎的关联关系，设置引擎配置参数模板 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `config_key_id` | config key id | bigint(20) | MUL | NO |  |  |
| 3 | `engine_type_label_id` | 对应的linkis_cg_manager_label 的id | bigint(20) |  | NO |  |  |


**示例数据**

| id | config_key_id | engine_type_label_id |
| ---: | ---: | ---: |
| 1 | 1 | 5 |
| 73 | 1 | 46586 |
| 80 | 1 | 47340 |
| 2 | 2 | 5 |
| 74 | 2 | 46586 |
| 81 | 2 | 47340 |




## 29. linkis_ps_cs_context_history

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `context_id` |  | int(11) |  | YES |  |  |
| 3 | `source` |  | text |  | YES |  |  |
| 4 | `context_type` |  | varchar(32) |  | YES |  |  |
| 5 | `history_json` |  | text |  | YES |  |  |
| 6 | `keyword` |  | varchar(255) | MUL | YES |  |  |
| 7 | `update_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 8 | `create_time` | create time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 9 | `access_time` | last access time | datetime |  | NO |  | CURRENT_TIMESTAMP |




## 30. linkis_ps_cs_context_id

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `user` |  | varchar(32) |  | YES |  |  |
| 3 | `application` |  | varchar(32) |  | YES |  |  |
| 4 | `source` |  | varchar(255) |  | YES |  |  |
| 5 | `expire_type` |  | varchar(32) |  | YES |  |  |
| 6 | `expire_time` |  | datetime |  | YES |  |  |
| 7 | `instance` |  | varchar(128) | MUL | YES |  |  |
| 8 | `backup_instance` |  | varchar(255) | MUL | YES |  |  |
| 9 | `update_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 10 | `create_time` | create time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 11 | `access_time` | last access time | datetime |  | NO |  | CURRENT_TIMESTAMP |

**示例数据**

| id | user | application | source | expire_type | expire_time | instance | backup_instance | update_time | create_time | access_time |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 62131 | jinyangrao | \N | {"className":"org.apache.linkis.cs.common.entity.source.LinkisHAWorkFlowContextID","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | \N | \N | cs_1_dev | cs_1_dev | 2022-11-16 14:48:58 | 2022-11-16 14:48:58 | 2022-11-16 14:48:58 |
| 62126 | alexwu | \N | {"className":"org.apache.linkis.cs.common.entity.source.LinkisHAWorkFlowContextID","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | \N | \N | cs_1_dev | cs_1_dev | 2022-11-16 14:45:49 | 2022-11-16 14:45:49 | 2022-11-16 14:45:49 |
| 62122 | stacyyan | \N | {"className":"org.apache.linkis.cs.common.entity.source.LinkisHAWorkFlowContextID","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | \N | \N | cs_2_dev | cs_1_dev | 2022-11-16 14:43:54 | 2022-11-16 14:43:54 | 2022-11-16 14:43:54 |
| 62120 | alexwu | \N | {"className":"org.apache.linkis.cs.common.entity.source.LinkisHAWorkFlowContextID","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | \N | \N | cs_2_dev | cs_1_dev | 2022-11-16 14:32:16 | 2022-11-16 14:32:16 | 2022-11-16 14:32:16 |





## 31. linkis_ps_cs_context_listener

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `listener_source` |  | varchar(255) |  | YES |  |  |
| 3 | `context_id` |  | int(11) |  | YES |  |  |
| 4 | `update_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 5 | `create_time` | create time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 6 | `access_time` | last access time | datetime |  | NO |  | CURRENT_TIMESTAMP |


## 32. linkis_ps_cs_context_map

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `key` |  | varchar(128) | MUL | YES |  |  |
| 3 | `context_scope` |  | varchar(32) |  | YES |  |  |
| 4 | `context_type` |  | varchar(32) |  | YES |  |  |
| 5 | `props` |  | text |  | YES |  |  |
| 6 | `value` |  | mediumtext |  | YES |  |  |
| 7 | `context_id` |  | int(11) |  | YES |  |  |
| 8 | `keywords` |  | varchar(255) | MUL | YES |  |  |
| 9 | `update_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 10 | `create_time` | create time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 11 | `access_time` | last access time | datetime |  | NO |  | CURRENT_TIMESTAMP |

**示例数据**

| id | key | context_scope | context_type | props | value | context_id | keywords | update_time | create_time | access_time |
| ---: | --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| 45 | node.sql_1742.jobID | PUBLIC | DATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisJobData","value":"{\"jobID\":3735}"} | 1 | ["node.sql_1742.jobID"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 51 | node.widget_1508.jobID | PUBLIC | DATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisJobData","value":"{\"jobID\":5167}"} | 1 | ["node.widget_1508.jobID"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 170 | node.display_3009.jobID | PUBLIC | DATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisJobData","value":"{\"jobID\":3738}"} | 1 | ["node.display_3009.jobID"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 172 | node.dashboard_7941.jobID | PUBLIC | DATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisJobData","value":"{\"jobID\":3740}"} | 1 | ["node.dashboard_7941.jobID"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 166 | node.sql_1742.table.cs_tmp_sql_1742_rs1 | PUBLIC | METADATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"CSTable","value":"{\"name\":\"cs_tmp_sql_1742_rs1\",\"alias\":null,\"creator\":\"jianfuzhang\",\"comment\":\"cs temp table\",\"createTime\":\"2021-05-15T19:18:05+0800\",\"productName\":null,\"projectName\":null,\"usage\":null,\"lifecycle\":null,\"useWay\":null,\"isImport\":false,\"modelLevel\":null,\"isExternalUse\":true,\"isPartitionTable\":false,\"isAvailable\":true,\"isView\":true,\"location\":\"hdfs:///tmp/linkis/jianfuzhang/linkis/20210515_191700/nodeexecution/3735/_0.dolphin\",\"columns\":[{\"name\":\"id\",\"alias\":null,\"type\":\"int\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"name\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"sex\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"age\",\"alias\":null,\"type\":\"int\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"class\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"lesson\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"city\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"teacher\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"score\",\"alias\":null,\"type\":\"double\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"fee\",\"alias\":null,\"type\":\"double\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"birthday\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"exam_date\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null}],\"partitions\":null,\"db\":null}"} | 1 | ["cs_tmp_sql_1742_rs1","hdfs:///tmp/linkis/jianfuzhang/linkis/20210515_191700/nodeexecution/3735/_0.dolphin","node.sql_1742.table.cs_tmp_sql_1742_rs1"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 1744 | node.widget_1508.table.cs_tmp_widget_1508_rs1 | PUBLIC | METADATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"CSTable","value":"{\"name\":\"cs_tmp_widget_1508_rs1\",\"alias\":null,\"creator\":\"jianfuzhang\",\"comment\":\"cs temp table\",\"createTime\":\"2021-05-18T11:38:47+0800\",\"productName\":null,\"projectName\":null,\"usage\":null,\"lifecycle\":null,\"useWay\":null,\"isImport\":false,\"modelLevel\":null,\"isExternalUse\":true,\"isPartitionTable\":false,\"isAvailable\":true,\"isView\":true,\"location\":\"hdfs:///tmp/linkis/jianfuzhang/linkis/20210518_113844/nodeexecution/5167/_0.dolphin\",\"columns\":[{\"name\":\"birthday\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null}],\"partitions\":null,\"db\":null}"} | 1 | ["hdfs:///tmp/linkis/jianfuzhang/linkis/20210518_113844/nodeexecution/5167/_0.dolphin","cs_tmp_widget_1508_rs1","node.widget_1508.table.cs_tmp_widget_1508_rs1"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 173 | flow.variable.user.to.proxy | PUBLIC | OBJECT | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisVariable","value":"{\"key\":\"user.to.proxy\",\"value\":\"jianfuzhang\"}"} | 1 | ["user.to.proxy","flow.variable.user.to.proxy"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 174 | flow.infos | PUBLIC | OBJECT | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"CSFlowInfos","value":"{\"infos\":{\"parent\":\"null\",\"id_nodeName\":{\"3c72ebe1-6fa1-4093-9da6-c3d8b0fe26f1\":\"sql_1742\",\"a1dfd377-32a1-4b34-b70c-7123a9890bd8\":\"widget_1508\",\"fa7334ed-5811-48a4-9a26-7498e83348dd\":\"display_3009\",\"c5cc7633-a3ef-42dc-8103-550ca4a3d3ce\":\"dashboard_7941\"},\"edges\":[{\"source\":\"3c72ebe1-6fa1-4093-9da6-c3d8b0fe26f1\",\"target\":\"a1dfd377-32a1-4b34-b70c-7123a9890bd8\",\"sourceLocation\":\"bottom\",\"targetLocation\":\"top\"},{\"source\":\"a1dfd377-32a1-4b34-b70c-7123a9890bd8\",\"target\":\"fa7334ed-5811-48a4-9a26-7498e83348dd\",\"sourceLocation\":\"bottom\",\"targetLocation\":\"top\"},{\"source\":\"fa7334ed-5811-48a4-9a26-7498e83348dd\",\"target\":\"c5cc7633-a3ef-42dc-8103-550ca4a3d3ce\",\"sourceLocation\":\"bottom\",\"targetLocation\":\"top\"}]}}"} | 1 | ["flow.infos"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 42 | node.sql_1742.resource.3c72ebe1-6fa1-4093-9da6-c3d8b0fe26f1.sql | PUBLIC | RESOURCE | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"linkisBMLResource","value":"{\"resourceId\":\"850d6dc7-4489-4b06-90f4-1d2b5b65d0b7\",\"version\":\"v000001\",\"isPrivate\":null,\"resourceHeader\":null,\"downloadedFileName\":\"3c72ebe1-6fa1-4093-9da6-c3d8b0fe26f1.sql\",\"sys\":null,\"createTime\":null,\"isExpire\":null,\"expireType\":null,\"expireTime\":null,\"updateTime\":null,\"updator\":null,\"maxVersion\":null,\"user\":null,\"system\":null,\"enableFlag\":null}"} | 1 | ["v000001","3c72ebe1-6fa1-4093-9da6-c3d8b0fe26f1.sql","850d6dc7-4489-4b06-90f4-1d2b5b65d0b7","node.sql_1742.resource.3c72ebe1-6fa1-4093-9da6-c3d8b0fe26f1.sql"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 79 | flow.infos | PUBLIC | RESOURCE | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"CSFlowInfos","value":"{\"infos\":{\"parent\":\"flow2\",\"id_nodeName\":{\"90a6ee94-4bd6-47d9-a536-f92660c4c051\":\"sql\",\"90a6ee94-4bd6-47d9-a536-f92660c4c052\":\"hql\"},\"edges\":[{\"sourceLocation\":\"bottom\",\"source\":\"sql \",\"targetLocation\":\"top\",\"target\":\"hql\"}]}}"} | 2 | ["flow.infos"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 199 | node.sql_3999.jobID | PUBLIC | DATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisJobData","value":"{\"jobID\":344064}"} | 3 | ["node.sql_3999.jobID"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 210 | node.widget_654.jobID | PUBLIC | DATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisJobData","value":"{\"jobID\":3808}"} | 3 | ["node.widget_654.jobID"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 31327 | node.sql_3999.table.cs_tmp_sql_3999_rs1 | PUBLIC | METADATA | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"CSTable","value":"{\"name\":\"cs_tmp_sql_3999_rs1\",\"alias\":null,\"creator\":\"hadoop\",\"comment\":\"cs temp table\",\"createTime\":\"2021-07-28T17:55:56+0800\",\"productName\":null,\"projectName\":null,\"usage\":null,\"lifecycle\":null,\"useWay\":null,\"isImport\":false,\"modelLevel\":null,\"isExternalUse\":true,\"isPartitionTable\":false,\"isAvailable\":true,\"isView\":true,\"location\":\"hdfs:///apps-data/hadoop/linkis/20210728_175555/nodeexecution/344064/_0.dolphin\",\"columns\":[{\"name\":\"database\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"tableName\",\"alias\":null,\"type\":\"string\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null},{\"name\":\"isTemporary\",\"alias\":null,\"type\":\"boolean\",\"comment\":null,\"express\":null,\"rule\":null,\"isPrimary\":null,\"length\":null}],\"partitions\":null,\"db\":null}"} | 3 | ["node.sql_3999.table.cs_tmp_sql_3999_rs1","hdfs:///apps-data/hadoop/linkis/20210728_175555/nodeexecution/344064/_0.dolphin","cs_tmp_sql_3999_rs1"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 31325 | flow.variable.user.to.proxy | PUBLIC | OBJECT | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"LinkisVariable","value":"{\"key\":\"user.to.proxy\",\"value\":\"alexyang\"}"} | 3 | ["user.to.proxy","flow.variable.user.to.proxy"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |
| 31326 | flow.infos | PUBLIC | OBJECT | {"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKeyValue","subs":[{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextKey","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]},{"className":"com.webank.wedatasphere.linkis.cs.common.entity.source.CommonContextValue","subs":[],"fieldNames":[],"fieldValues":[],"fieldTypes":[]}],"fieldNames":[],"fieldValues":[],"fieldTypes":[]} | {"type":"CSFlowInfos","value":"{\"infos\":{\"parent\":\"null\",\"id_nodeName\":{\"b08c3f5e-f5d7-4209-866b-f4f963196b3d\":\"sql_3999\",\"4b9b446b-304d-451f-90b6-67d9ad5d3e49\":\"widget_654\"},\"edges\":[{\"source\":\"b08c3f5e-f5d7-4209-866b-f4f963196b3d\",\"target\":\"4b9b446b-304d-451f-90b6-67d9ad5d3e49\",\"sourceLocation\":\"right\",\"targetLocation\":\"left\"}]}}"} | 3 | ["flow.infos"] | 2022-06-01 11:38:30 | 2022-06-01 11:38:32 | 2022-06-06 15:37:42 |


## 33. linkis_ps_cs_context_map_listener

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `listener_source` |  | varchar(255) |  | YES |  |  |
| 3 | `key_id` |  | int(11) |  | YES |  |  |
| 4 | `update_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 5 | `create_time` | create time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 6 | `access_time` | last access time | datetime |  | NO |  | CURRENT_TIMESTAMP |



## 34. linkis_ps_datasource_access

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `table_id` |  | bigint(20) |  | NO |  |  |
| 3 | `visitor` |  | varchar(16) |  | NO |  |  |
| 4 | `fields` |  | varchar(255) |  | YES |  |  |
| 5 | `application_id` |  | int(4) |  | NO |  |  |
| 6 | `access_time` |  | datetime |  | NO |  |  |


## 35. linkis_ps_datasource_field

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `table_id` |  | bigint(20) |  | NO |  |  |
| 3 | `name` |  | varchar(64) |  | NO |  |  |
| 4 | `alias` |  | varchar(64) |  | YES |  |  |
| 5 | `type` |  | varchar(64) |  | NO |  |  |
| 6 | `comment` |  | varchar(255) |  | YES |  |  |
| 7 | `express` |  | varchar(255) |  | YES |  |  |
| 8 | `rule` |  | varchar(128) |  | YES |  |  |
| 9 | `is_partition_field` |  | tinyint(1) |  | NO |  |  |
| 10 | `is_primary` |  | tinyint(1) |  | NO |  |  |
| 11 | `length` |  | int(11) |  | YES |  |  |


**示例数据**

| id | table_id | name | alias | type | comment | express | rule | is_partition_field | is_primary | length | mode_info |
| ---: | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | --- |
| 4396 | 216 | ds |  | string |  | \N | \N | 1 | 0 | 8 | \N |
| 4395 | 216 | b |  | string |  | \N |  | 0 | 0 | \N | \N |
| 4394 | 216 | a |  | string |  | \N |  | 0 | 0 | \N | \N |
| 4393 | 215 | ds |  | string |  | \N | \N | 1 | 0 | 8 | \N |
| 4392 | 215 | col_3 |  | string |  |  |  | 0 | 0 | \N | \N |
| 4391 | 215 | col_2 |  | string |  |  |  | 0 | 0 | \N | \N |
| 4390 | 215 | col_1 |  | string |  |  |  | 0 | 0 | \N | \N |



## 36. linkis_ps_datasource_import

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `table_id` |  | bigint(20) |  | NO |  |  |
| 3 | `import_type` |  | int(4) |  | NO |  |  |
| 4 | `args` |  | varchar(255) |  | NO |  |  |


**示例数据**

| id | table_id | import_type | args |
| ---: | ---: | ---: | --- |
| 94 | 215 | 1 | {"exportPath":"/mnt/bdap/stacyyan/aa/aaa125.csv","type":"share","separator":",","chartset":"utf-8","quote":"","isHasHeader":"false"} |
| 93 | 214 | 0 | {"database":"stacyyan_ind","table":"00153d26da1a11eb8c30813d0f05b1af1"} |
| 92 | 213 | 2 | {"exportPath":"/mnt/bdap/stacyyan/aa/studentInfo.xlsx","type":"share","isHasHeader":"false"} |
| 88 | 170 | 1 | {"exportPath":"/mnt/bdap/janicegong/file测试/上传文件/orc.csv","type":"share","separator":",","chartset":"utf-8","quote":"","isHasHeader":"false"} |
| 87 | 169 | 1 | {"exportPath":"/mnt/bdap/johnnwang/test1_hql__1652150994191.csv","type":"share","separator":",","chartset":"utf-8","quote":"","isHasHeader":"false"} |



## 37. linkis_ps_datasource_lineage

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `table_id` |  | bigint(20) |  | YES |  |  |
| 3 | `source_table` |  | varchar(64) |  | YES |  |  |
| 4 | `update_time` |  | datetime |  | YES |  |  |

**示例数据**

| id | table_id | source_table | update_time |
| ---: | ---: | --- | --- |
| 40 | 214 | stacyyan_ind.00153d26da1a11eb8c30813d0f05b1af1 | 2022-11-08 21:14:41 |
| 39 | 162 | janicegong_ind.aa | 2022-09-04 17:28:46 |
| 38 | 156 | jin_ind.test_0902j | 2022-09-02 19:47:20 |



## 38. linkis_ps_datasource_table

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(255) | PRI | NO | auto_increment |  |
| 2 | `database` |  | varchar(64) | MUL | NO |  |  |
| 3 | `name` |  | varchar(64) |  | NO |  |  |
| 4 | `alias` |  | varchar(64) |  | YES |  |  |
| 5 | `creator` |  | varchar(16) |  | NO |  |  |
| 6 | `comment` |  | varchar(255) |  | YES |  |  |
| 7 | `create_time` |  | datetime |  | NO |  |  |
| 8 | `product_name` |  | varchar(64) |  | YES |  |  |
| 9 | `project_name` |  | varchar(255) |  | YES |  |  |
| 10 | `usage` |  | varchar(128) |  | YES |  |  |
| 11 | `lifecycle` |  | int(4) |  | NO |  |  |
| 12 | `use_way` |  | int(4) |  | NO |  |  |
| 13 | `is_import` |  | tinyint(1) |  | NO |  |  |
| 14 | `model_level` |  | int(4) |  | NO |  |  |
| 15 | `is_external_use` |  | tinyint(1) |  | NO |  |  |
| 16 | `is_partition_table` |  | tinyint(1) |  | NO |  |  |
| 17 | `is_available` |  | tinyint(1) |  | NO |  |  |


**示例数据**

| id | database | name | alias | creator | comment | create_time | product_name | project_name | usage | lifecycle | use_way | is_import | model_level | is_external_use | is_partition_table | is_available |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 216 | stacyyan_ind | aa_1109 | 表别名_1109 | stacyyan |  | 2022-11-09 16:15:03 |  |  |  | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| 215 | jin_ind | test_1109aaa | test_1109aaa | stacyyan |  | 2022-11-09 09:51:41 |  |  |  | 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| 214 | stacyyan_ind | test_1108ar | test_1108ar | stacyyan |  | 2022-11-08 21:14:41 |  |  |  | 0 | 0 | 1 | 0 | 0 | 1 | 1 |


## 39. linkis_ps_datasource_table_info

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `table_id` |  | bigint(20) |  | NO |  |  |
| 3 | `table_last_update_time` |  | datetime |  | NO |  |  |
| 4 | `row_num` |  | bigint(20) |  | NO |  |  |
| 5 | `file_num` |  | int(11) |  | NO |  |  |
| 6 | `table_size` |  | varchar(32) |  | NO |  |  |
| 7 | `partitions_num` |  | int(11) |  | NO |  |  |
| 8 | `update_time` |  | datetime |  | NO |  |  |
| 9 | `field_num` |  | int(11) |  | NO |  |  |


## 40. linkis_ps_dm_datasource

> 配置的数据源信息表 
 
| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `datasource_name` | 数据源名称  | varchar(255) |  | NO |  |  |
| 3 | `datasource_desc` | 数据源描述 | varchar(255) |  | YES |  |  |
| 4 | `datasource_type_id` |数据源类型ID  linkis_ps_dm_datasource_type对应的id  | int(11) |  | NO |  |  |
| 5 | `create_identify` |标识  | varchar(255) |  | YES |  |  |
| 6 | `create_system` | 创建数据源的系统 | varchar(255) |  | YES |  |  |
| 7 | `parameter` | 数据源参数,注意 不做存储，实体类parameter字段通过linkis_ps_dm_datasource_version的parameter获取 | varchar(255) |  | YES |  |  |
| 8 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 9 | `modify_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 10 | `create_user` |  | varchar(255) |  | YES |  |  |
| 11 | `modify_user` |  | varchar(255) |  | YES |  |  |
| 12 | `labels` | 数据源标签 | varchar(255) |  | YES |  |  |
| 13 | `version_id` | 数据源版本ID | int(11) |  | YES |  |  |
| 14 | `expire` | 数据源是否过期 | tinyint(1) |  | YES |  | 0 |
| 15 | `published_version_id` |数据源发布版本号   | int(11) |  | YES |  |  |


**示例数据**

| id | datasource_name | datasource_desc | datasource_type_id | create_identify | create_system | parameter | create_time | modify_time | create_user | modify_user | labels | version_id | expire | published_version_id |
| ---: | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| 243 | mongodb_test_20221020101428 | create | 6 | \N | Linkis | {"dataSourceTypeId":"6","host":"10.107.102.231","port":"20500","params":"{\"connectTimeout\":\"100\"}","database":"dpvcs-dev","username":"dpvcsopr","password":"dpvcsopr"} | 2022-10-20 10:14:36 | 2022-10-20 10:14:36 | janicegong | \N | auto_test20220801 | 2 | 0 | 1 |
| 244 | elasticsearch_test__20221020101428 | create | 7 | \N | Linkis | {"dataSourceTypeId":"7","username":"test","password":"123456","elasticUrls":"[\"http://127.0.0.1:9101\"]"} | 2022-10-20 10:14:38 | 2022-10-20 10:14:38 | janicegong | \N | auto_test20220801 | 2 | 1 | 1 |
| 245 | mysql_test_1027 | mysql | 1 |  | MYSQL | {"host":"10.108.161.105","port":"15304","params":"{\"tinyInt1isBit\":\"false\"}","username":"test","password":"123456"} | 2022-10-27 20:35:05 | 2022-10-27 20:35:05 | stacyyan | \N | demo，勿删 | 1 | 0 | 1 |
| 246 | hive_test_sit | demo，勿删 | 4 |  | HIVE | {"envId":"2"} | 2022-10-27 20:35:55 | 2022-10-27 20:35:55 | stacyyan | \N |  | 1 | 0 | 1 |



## 41. linkis_ps_dm_datasource_env

> 数据源环境信息 主要用户hive类型数据源的配置 通过hive集群环境进行数据源连接配置的选择 

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `env_name` |  环境名| varchar(32) |  | NO |  |  |
| 3 | `env_desc` | 环境描述 | varchar(255) |  | YES |  |  |
| 4 | `datasource_type_id` | 数据源类型ID  linkis_ps_dm_datasource_type对应的id | int(11) |  | NO |  |  |
| 5 | `parameter` |   数据源环境参数| varchar(255) |  | YES |  |  |
| 6 | `create_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 7 | `create_user` |  | varchar(255) |  | YES |  |  |
| 8 | `modify_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 9 | `modify_user` |  | varchar(255) |  | YES |  |  |


**示例数据** 

| id | env_name | env_desc | datasource_type_id | parameter | create_time | create_user | modify_time | modify_user |
| ---: | --- | --- | ---: | --- | --- | --- | --- | --- |
| 1 | BDP-UAT | BDP-UAT测试环境 | 4 | {"uris":"thrift://bdphdp100001:9083", "hadoopConf":{"hive.metastore.execute.setugi":"true"}} | 2022-04-12 22:34:11 | \N | 2022-04-12 22:34:11 | \N |
| 2 | BDAP-UAT | BDAP-UAT测试环境 | 4 | {"uris":"thrift://bdphdp110001:9083", "hadoopConf":{"hive.metastore.execute.setugi":"true"}} | 2022-04-12 22:34:11 | \N | 2022-04-12 22:34:11 | \N |




## 42. linkis_ps_dm_datasource_type

> 数据源类型表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `name` | 数据源类型名称 | varchar(32) |  | NO |  |  |
| 3 | `description` | 数据源类型描述 | varchar(255) |  | YES |  |  |
| 4 | `option` |  数据源所属类型| varchar(32) |  | YES |  |  |
| 5 | `classifier` | 数据源类型分类词 | varchar(32) |  | NO |  |  |
| 6 | `icon` |  数据源图片显示路径| varchar(255) |  | YES |  |  |
| 7 | `layers` | 数据源类型层次 | int(3) |  | NO |  |  |

**示例数据**

| id | name | description | option | classifier | icon | layers |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1 | mysql | mysql数据库 | mysql数据库 | 关系型数据库(Relational DB) |  | 3 |
| 2 | kafka | kafka | kafka | 消息队列(Message DB) |  | 2 |
| 3 | presto | presto SQL | presto | 大数据存储(BigData) |  | 3 |
| 4 | hive | hive数据库 | hive | 大数据存储(BigData) |  | 3 |
| 6 | mongodb | mongodb 数据源 | mongodb | 半结构化数据库 | \N | 3 |
| 7 | elasticsearch | ES description | es无结构存储 | 分布式全文索引 | \N | 3 |
| 8 | oracle | This is oracle datasource | oracle关系型数据库 | 关系型数据库 | \N | 3 |




## 43. linkis_ps_dm_datasource_type_key

> 不同数据源类型所需要进行配置的参数

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `data_source_type_id` | 数据源类型ID  linkis_ps_dm_datasource_type对应的id | int(11) |  | NO |  |  |
| 3 | `key` |  数据源参数key值| varchar(32) |  | NO |  |  |
| 4 | `name` | 数据源参数名称 用于前端展示 | varchar(32) |  | NO |  |  |
| 5 | `name_en` | 数据源参数名称 英文  用于前端展示 | varchar(32) |  | NO |  |  |
| 6 | `default_value` | 数据源参数默认值 | varchar(50) |  | YES |  |  |
| 7 | `value_type` |  数据源参数类型  | varchar(50) |  | NO |  |  |
| 8 | `scope` | 数据源参数范围 一般未使用到 | varchar(50) |  | YES |  |  |
| 9 | `require` | 数据源参数是否必须 | tinyint(1) |  | YES |  | 0 |
| 10 | `description` | 数据源参数描述 用于前端展示| varchar(200) |  | YES |  |  |
| 11 | `description_en` |  数据源参数描述 英文 用于前端展示| varchar(200) |  | YES |  |  |
| 12 | `value_regex` |  数据源参数正则| varchar(200) |  | YES |  |  |
| 13 | `ref_id` |  | bigint(20) |  | YES |  |  |
| 14 | `ref_value` |  | varchar(50) |  | YES |  |  |
| 15 | `data_source` |数据来源 可以从是一个接口获取  | varchar(200) |  | YES |  |  |
| 16 | `update_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 17 | `create_time` |  | datetime |  | NO |  | CURRENT_TIMESTAMP |

**示例数据**

| id | data_source_type_id | key | name | default_value | value_type | scope | require | description | value_regex | ref_id | ref_value | data_source | update_time | create_time |
| ---: | ---: | --- | --- | --- | --- | --- | ---: | --- | --- | ---: | --- | --- | --- | --- |
| 1 | 1 | host | Host | \N | TEXT | \N | 1 | mysql Host  | \N | \N | \N | \N | 2022-04-12 22:34:11 | 2022-04-12 22:34:11 |
| 2 | 1 | port | 端口 | \N | TEXT | \N | 1 | 端口 | \N | \N | \N | \N | 2022-04-12 22:34:11 | 2022-04-12 22:34:11 |
| 3 | 1 | params | 连接参数 | \N | TEXT | \N | 0 | 输入JSON格式: {"param":"value"} | \N | \N | \N | \N | 2022-04-12 22:34:11 | 2022-04-12 22:34:11 |
| 4 | 1 | username | 用户名 | \N | TEXT | \N | 1 | 用户名 | ^[0-9A-Za-z_-]+$ | \N | \N | \N | 2022-04-12 22:34:11 | 2022-04-12 22:34:11 |
| 5 | 1 | password | 密码 | \N | PASSWORD | \N | 1 | 密码 |  | \N | \N | \N | 2022-04-12 22:34:11 | 2022-04-12 22:34:11 |
| 6 | 4 | envId | 集群环境 | \N | SELECT | \N | 1 | 集群环境 | \N | \N | \N | /data-source-manager/env-list/all/type/4 | 2022-04-12 22:34:11 | 2022-04-12 22:34:11 |



## 44. linkis_ps_dm_datasource_version

> 数据源版本信息表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `version_id` | 数据源版本ID  | int(11) | PRI | NO | auto_increment |  |
| 2 | `datasource_id` | 数据源ID linkis_ps_dm_datasourc 对应的id | int(11) | PRI | NO |  |  |
| 3 | `parameter` | 数据源该版本参数 | varchar(2048) |  | YES |  |  |
| 4 | `comment` |  | varchar(255) |  | YES |  |  |
| 5 | `create_time` |  | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 6 | `create_user` |  | varchar(255) |  | YES |  |  |


**示例数据** 

| version_id | datasource_id | parameter | comment | create_time | create_user |
| ---: | ---: | --- | --- | --- | --- |
| 1 | 41 | {"envId":"2"} | 初始化版本 | 2022-05-25 12:26:44 | neiljianliu |
| 1 | 42 | {"password":"1234123213","subSystem":"","port":"123","appid":null,"host":"123","authType":null,"objectid":null,"username":"123","mkPrivate":null,"timestamp":null} | qualitis | 2022-05-27 19:56:41 | allenzhou |
| 1 | 43 | {"host":"333","port":"333","username":"333","password":"1234123213"} | 初始化版本 | 2022-05-30 12:31:42 | janicegong |



## 45. linkis_ps_error_code

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `error_code` |  | varchar(50) |  | NO |  |  |
| 3 | `error_desc` |  | varchar(1024) |  | NO |  |  |
| 4 | `error_regex` |  | varchar(1024) |  | YES |  |  |
| 5 | `error_type` |  | int(3) |  | YES |  | 0 |


**示例数据** 

| id | error_code | error_desc | error_regex | error_type |
| ---: | --- | --- | --- | ---: |
| 1 | 01001 | 您的任务没有路由到后台ECM，请联系管理员 | The em of labels | 0 |
| 2 | 01002 | Linkis服务负载过高，请联系管理员扩容 | Unexpected end of file from server | 0 |
| 3 | 01003 | Linkis服务负载过高，请联系管理员扩容 | failed to ask linkis Manager Can be retried SocketTimeoutException | 0 |
| 4 | 01004 | 引擎在启动时被Kill，请联系管理员 |  [0-9]+ Killed | 0 |

## 46. linkis_ps_instance_info

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(11) | PRI | NO | auto_increment |  |
| 2 | `instance` | structure like ${host\|machine}:${port} | varchar(128) | UNI | YES |  |  |
| 3 | `name` | equal application name in registry | varchar(128) |  | YES |  |  |
| 4 | `update_time` | update unix timestamp | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` | create unix timestamp | datetime |  | YES |  | CURRENT_TIMESTAMP |


## 47. linkis_ps_instance_label

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_key` | string key | varchar(32) | MUL | NO |  |  |
| 3 | `label_value` | string value | varchar(255) |  | NO |  |  |
| 4 | `label_feature` | store the feature of label, but it may be redundant | varchar(16) |  | NO |  |  |
| 5 | `label_value_size` | size of key -> value map | int(20) |  | NO |  |  |
| 6 | `update_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 7 | `create_time` | update unix timestamp | datetime |  | NO |  | CURRENT_TIMESTAMP |


**示例数据**

| id | label_key | label_value | label_feature | label_value_size | update_time | create_time |
| ---: | --- | --- | --- | ---: | --- | --- |
| 68 | route | offline | OPTIONAL | 0 | 2022-11-15 12:51:48 | 2022-11-08 21:58:36 |
| 64 | route | cs_1_dev | OPTIONAL | 0 | 2022-11-08 09:51:26 | 2022-02-16 17:28:31 |
| 5 | route | cs_2_dev | OPTIONAL | 0 | 2022-11-08 09:51:23 | 2021-05-26 14:46:00 |
| 58 | route | auto_test | OPTIONAL | 0 | 2022-11-04 16:51:04 | 2021-09-08 14:19:23 |
| 67 | route | cs_1_dev1 | OPTIONAL | 0 | 2022-10-31 15:58:07 | 2022-10-31 15:58:07 |
| 66 | route | et1 | OPTIONAL | 0 | 2022-08-07 21:39:55 | 2022-08-07 21:39:55 |
| 65 | route | test114 | OPTIONAL | 0 | 2022-07-05 00:18:52 | 2022-07-05 00:18:52 |
| 39 | route | test | OPTIONAL | 0 | 2022-06-28 13:24:19 | 2021-08-02 15:30:03 |
| 62 | route | gjy_test | OPTIONAL | 0 | 2022-02-24 19:25:11 | 2022-01-05 17:27:46 |
| 6 | route | cs_3_dev | OPTIONAL | 0 | 2022-02-17 14:20:33 | 2021-05-26 14:57:12 |
| 63 | route | test_A | OPTIONAL | 0 | 2022-01-06 15:04:35 | 2022-01-06 15:04:35 |
| 61 | userCreator | auto-test | OPTIONAL | 2 | 2021-12-22 14:36:33 | 2021-12-22 14:36:33 |



**示例数据**

| id | instance | name | update_time | create_time |
| ---: | --- | --- | --- | --- |
| 1527 | bdpdws110004:8008 | visualis-prod | 2022-06-28 14:14:36 | 2022-06-28 14:14:36 |
| 1537 | bdpdws110004:9008 | visualis-dev | 2022-06-30 15:39:19 | 2022-06-30 15:39:18 |
| 1702 | bdpdws110004:9108 | linkis-ps-cs | 2022-11-08 09:51:23 | 2022-11-08 09:51:23 |


## 48. linkis_ps_instance_label_relation

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_id` | id reference linkis_ps_instance_label -> id | int(20) | MUL | YES |  |  |
| 3 | `service_instance` | structure like ${host\|machine}:${port} | varchar(128) |  | NO |  |  |
| 4 | `update_time` | update unix timestamp | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 5 | `create_time` | create unix timestamp | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| id | label_id | service_instance | update_time | create_time |
| ---: | ---: | --- | --- | --- |
| 562 | 2 | bdpujes110002:9108 | 2022-02-14 11:58:57 | 2022-02-14 11:58:57 |
| 875 | 5 | bdpdws110004:9108 | 2022-11-08 09:51:23 | 2022-11-08 09:51:23 |
| 876 | 64 | bdphdp11ide01:9108 | 2022-11-08 09:51:26 | 2022-11-08 09:51:26 |


## 49. linkis_ps_instance_label_value_relation

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | int(20) | PRI | NO | auto_increment |  |
| 2 | `label_value_key` | value key | varchar(255) | MUL | NO |  |  |
| 3 | `label_value_content` | value content | varchar(255) |  | YES |  |  |
| 4 | `label_id` | id reference linkis_ps_instance_label -> id | int(20) |  | YES |  |  |
| 5 | `update_time` | update unix timestamp | datetime |  | YES |  | CURRENT_TIMESTAMP |
| 6 | `create_time` | create unix timestamp | datetime |  | YES |  | CURRENT_TIMESTAMP |

**示例数据**

| label_value_key | label_value_content | label_id | update_time | create_time |
| --- | --- | ---: | --- | --- |
| creator | test | 61 | 2021-12-22 14:36:33 | 2021-12-22 14:36:33 |
| user | auto | 61 | 2021-12-22 14:36:33 | 2021-12-22 14:36:33 |
| creator | a | 50 | 2021-08-03 19:40:48 | 2021-08-03 19:40:48 |
| user | a | 50 | 2021-08-03 19:40:48 | 2021-08-03 19:40:48 |



## 50. linkis_ps_job_history_detail

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | Primary Key, auto increment | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `job_history_id` | ID of JobHistory | bigint(20) |  | NO |  |  |
| 3 | `result_location` | File path of the resultsets | varchar(500) |  | YES |  |  |
| 4 | `execution_content` | The script code or other execution content executed by this Job | text |  | YES |  |  |
| 5 | `result_array_size` | size of result array | int(4) |  | YES |  | 0 |
| 6 | `job_group_info` | Job group info/path | text |  | YES |  |  |
| 7 | `created_time` | Creation time | datetime(3) |  | YES |  | CURRENT_TIMESTAMP(3) |
| 8 | `updated_time` | Update time | datetime(3) |  | YES |  | CURRENT_TIMESTAMP(3) |
| 9 | `status` | status | varchar(32) |  | YES |  |  |
| 10 | `priority` | order of subjob | int(4) |  | YES |  | 0 |

**示例数据**

| id | job_history_id | result_location | execution_content | result_array_size | job_group_info | created_time | updated_time | status | priority |
| ---: | ---: | --- | --- | ---: | --- | --- | --- | --- | ---: |
| 1700001 | 1561337 | hdfs:///apps-data/neiljianliu/linkis/20211225_201252/nodeexecution/1561337 | select * from default.dwc_vsbi_students_demo limit 5000 | 1 |  | 2021-12-25 20:12:52 | 2021-12-25 20:12:54 | Succeed | 0 |
| 1700002 | 1561339 | \N | {"configuration":{},"variable":{"user.to.proxy":"neiljianliu","run_date":"20211224"},"run_date":"20211224","labels":{"labels":"{\"route\":\"prod\"}"}} | \N |  | 2021-12-25 20:15:51 | 2021-12-25 20:15:52 | Failed | 0 |
| 1700003 | 1561338 | hdfs:///apps-data/neiljianliu/linkis/20211225_201551/nodeexecution/1561338 | {"config":"","description":"","id":380.0,"model":"","name":"view_3142","projectId":864.0,"roles":"","source":{"id":318.0,"name":"hiveDataSource"},"sourceId":318.0,"sql":"","variable":""} | 1 |  | 2021-12-25 20:15:51 | 2021-12-25 20:15:55 | Succeed | 0 |
| 1700004 | 1561340 | hdfs:///apps-data/neiljianliu/linkis/20211225_201552/nodeexecution/1561340 | select * from default.dwc_vsbi_students_demo limit 5000 | 1 |  | 2021-12-25 20:15:52 | 2021-12-25 20:15:54 | Succeed | 0 |
| 1700005 | 1561341 | hdfs:///apps-data/neiljianliu/linkis/20211225_201852/nodeexecution/1561341 | {"config":"","description":"","id":380.0,"model":"","name":"view_3142","projectId":864.0,"roles":"","source":{"id":318.0,"name":"hiveDataSource"},"sourceId":318.0,"sql":"","variable":""} | 1 |  | 2021-12-25 20:18:52 | 2021-12-25 20:18:56 | Succeed | 0 |
| 1700006 | 1561342 | \N | {"configuration":{},"variable":{"user.to.proxy":"neiljianliu","run_date":"20211224"},"run_date":"20211224","labels":{"labels":"{\"route\":\"prod\"}"}} | \N |  | 2021-12-25 20:18:52 | 2021-12-25 20:18:52 | Failed | 0 |





## 51. linkis_ps_job_history_group_history

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | Primary Key, auto increment | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `job_req_id` | job execId | varchar(64) |  | YES |  |  |
| 3 | `submit_user` | who submitted this Job | varchar(50) | MUL | YES |  |  |
| 4 | `execute_user` | who actually executed this Job | varchar(50) |  | YES |  |  |
| 5 | `source` | job source | text |  | YES |  |  |
| 6 | `labels` | job labels | text |  | YES |  |  |
| 7 | `params` | job params | text |  | YES |  |  |
| 8 | `progress` | Job execution progress | varchar(32) |  | YES |  |  |
| 9 | `status` | Script execution status, must be one of the following: Inited, WaitForRetry, Scheduled, Running, Succeed, Failed, Cancelled, Timeout | varchar(50) |  | YES |  |  |
| 10 | `log_path` | File path of the job log | varchar(200) |  | YES |  |  |
| 11 | `error_code` | Error code. Generated when the execution of the script fails | int(11) |  | YES |  |  |
| 12 | `error_desc` | Execution description. Generated when the execution of script fails | varchar(1000) |  | YES |  |  |
| 13 | `created_time` | Creation time | datetime(3) | MUL | YES |  | CURRENT_TIMESTAMP(3) |
| 14 | `updated_time` | Update time | datetime(3) |  | YES |  | CURRENT_TIMESTAMP(3) |
| 15 | `instances` | Entrance instances | varchar(250) |  | YES |  |  |
| 16 | `metrics` | Job Metrics | text |  | YES |  |  |
| 17 | `engine_type` | Engine type | varchar(32) |  | YES |  |  |
| 18 | `execution_code` | Job origin code or code path | text |  | YES |  |  |
| 19 | `result_location` | File path of the resultsets | varchar(500) |  | YES |  |  |


**示例数据**

| id | job_req_id | submit_user | execute_user | source | labels | params | progress | status | log_path | error_code | error_desc | created_time | updated_time | instances | metrics | engine_type | execution_code | result_location |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 3400407 | nodeexecution_owenxu_spark_29 | owenxu | owenxu | {"nodeName":"sql_9024","requestIP":"127.0.0.1","projectName":"testpubauthority","flowName":"test01"} | {"codeType":"sql","engineType":"spark-2.4.3","userCreator":"owenxu-nodeexecution"} | {"configuration":{"runtime":{"nodeName":"sql_9024","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"+PHsmq+A1AkWQ3olJILCuFspWs9RflbL2HLiVea4FcQ\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","wds.dss.workflow.submit.user":"owenxu","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"owenxu\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"testpubauthority\\\",\\\"flow\\\":\\\"test01\\\",\\\"contextId\\\":\\\"8-8--cs_1_devcs_1_dev58211\\\",\\\"version\\\":\\\"v000003\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","nodeType":"sql","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/owenxu/linkis/2022-11-16/155518/nodeexecution/3400407","source":{"nodeName":"sql_9024","projectName":"testpubauthority","flowName":"test01","requestIP":"127.0.0.1"},"jobId":"3400407","job":{"#rt_rs_store_path":"hdfs:///apps-data/owenxu/linkis/2022-11-16/155518/nodeexecution/3400407"}},"startup":{"jobId":"3400407"}},"variable":{"user.to.proxy":"owenxu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"owenxu-schedulis","codeType":"sql","engineType":"spark-2.4.3","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/owenxu/3400407.log | 0 |  | 2022-11-16 15:55:18.000 | 2022-11-16 15:55:20.387 | bdphdp11ide01:9205 | {"scheduleTime":"2022-11-16T15:55:19+0800","timeToOrchestrator":"2022-11-16T15:55:19+0800","engineconnMap":{"gz.xg.bdpdws110001.webank:27735":{"engineInstance":"gz.xg.bdpdws110001.webank:27735","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400407_otJobId_astJob_647_codeExec_647","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_647"}},"submitTime":"2022-11-16T15:55:18+0800","yarnResource":{},"completeTime":"2022-11-16T15:55:20+0800"} | spark | select 1| hdfs:///apps-data/owenxu/linkis/2022-11-16/155518/nodeexecution/3400407 |
| 3400406 | nodeexecution_johnnwang_spark_42 | johnnwang | johnnwang | {"nodeName":"sql_2947","requestIP":"127.0.0.1","projectName":"hmh0901","flowName":"flow001"} | {"codeType":"sql","engineType":"spark-2.4.3","userCreator":"johnnwang-nodeexecution"} | {"configuration":{"startup":{"spark.executor.memory":"3G","spark.driver.memory":"3G","spark.executor.cores":"2","spark.executor.instances":"2","wds.linkis.rm.yarnqueue":"dws","ReuseEngine":"true","jobId":"3400406"},"runtime":{"nodeName":"sql_2947","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"Lg76z9Wq/bjKI3Kp1nTKBNZnRJ6dDz3v5E4e2cL2cD4\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","wds.dss.workflow.submit.user":"johnnwang","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"johnnwang\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"hmh0901\\\",\\\"flow\\\":\\\"flow001\\\",\\\"contextId\\\":\\\"8-8--cs_1_devcs_1_dev61373\\\",\\\"version\\\":\\\"v000005\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","nodeType":"sql","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/johnnwang/linkis/2022-11-16/155217/nodeexecution/3400406","source":{"nodeName":"sql_2947","projectName":"hmh0901","flowName":"flow001","requestIP":"127.0.0.1"},"jobId":"3400406","job":{"#rt_rs_store_path":"hdfs:///apps-data/johnnwang/linkis/2022-11-16/155217/nodeexecution/3400406"}}},"variable":{"user.to.proxy":"johnnwang","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"johnnwang-schedulis","codeType":"sql","engineType":"spark-2.4.3","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/johnnwang/3400406.log | 0 |  | 2022-11-16 15:52:17.000 | 2022-11-16 15:52:19.328 | bdphdp11ide01:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"gz.xg.bdpdws110001.webank:35637":{"engineInstance":"gz.xg.bdpdws110001.webank:35637","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400406_otJobId_astJob_646_codeExec_646","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_646"}},"submitTime":"2022-11-16T15:52:17+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:19+0800"} | spark | show tables;| hdfs:///apps-data/johnnwang/linkis/2022-11-16/155217/nodeexecution/3400406 |
| 3400405 | nodeexecution_johnnwang_appconn_42 | johnnwang | johnnwang | {"nodeName":"sqoop_6588","requestIP":"127.0.0.1","projectName":"hmh0901","flowName":"flow001"} | {"codeType":"exchangis.sqoop","engineType":"appconn-1","userCreator":"johnnwang-nodeexecution"} | {"configuration":{"runtime":{"nodeName":"sqoop_6588","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"Lg76z9Wq/bjKI3Kp1nTKBNZnRJ6dDz3vupd1m5IsFA0\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","variables":{"user.to.proxy":"johnnwang","run_today_h":"2022111615","run_date":"20221115"},"wds.dss.workflow.submit.user":"johnnwang","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"johnnwang\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"hmh0901\\\",\\\"flow\\\":\\\"flow001\\\",\\\"contextId\\\":\\\"8-8--cs_1_devcs_1_dev61373\\\",\\\"version\\\":\\\"v000005\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","nodeType":"exchangis.sqoop","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/johnnwang/linkis/2022-11-16/155217/nodeexecution/3400405","source":{"nodeName":"sqoop_6588","projectName":"hmh0901","flowName":"flow001","requestIP":"127.0.0.1"},"jobId":"3400405","job":{"#rt_rs_store_path":"hdfs:///apps-data/johnnwang/linkis/2022-11-16/155217/nodeexecution/3400405"}},"startup":{"jobId":"3400405"}},"variable":{"user.to.proxy":"johnnwang","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"johnnwang-schedulis","codeType":"exchangis.sqoop","engineType":"appconn-1","labels":"{\"route\":\"prod\"}"}} | 1.0 | Failed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/johnnwang/3400405.log | \N | 21304, Task(codeExec_645) status not succeed,is Failed | 2022-11-16 15:52:17.000 | 2022-11-16 15:52:18.475 | bdphdp11ide01:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"bdpdws110004:10781":{"engineInstance":"bdpdws110004:10781","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400405_otJobId_astJob_645_codeExec_645","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_645"}},"submitTime":"2022-11-16T15:52:17+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:18+0800"} | appconn | {"id":5924} | hdfs:///apps-data/johnnwang/linkis/2022-11-16/155217/nodeexecution/3400405 |
| 3400404 | nodeexecution_allenlliu_shell_25 | allenlliu | allenlliu | {"nodeName":"shell_4441","requestIP":"127.0.0.1","projectName":"mytest_xq_0032","flowName":"test_workflow001"} | {"codeType":"shell","engineType":"shell-1","userCreator":"allenlliu-nodeexecution"} | {"configuration":{"runtime":{"nodeName":"shell_4441","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"y4h8zre1zbG7a5OlwX8oULazMLTJJpelCaiwk84RsEk\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","wds.dss.workflow.submit.user":"allenlliu","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"allenlliu\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"mytest_xq_0032\\\",\\\"flow\\\":\\\"test_workflow001\\\",\\\"contextId\\\":\\\"8-8--cs_2_devcs_2_dev10489\\\",\\\"version\\\":\\\"v000009\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","nodeType":"sh","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155217/nodeexecution/3400404","source":{"nodeName":"shell_4441","projectName":"mytest_xq_0032","flowName":"test_workflow001","requestIP":"127.0.0.1"},"jobId":"3400404","job":{"#rt_rs_store_path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155217/nodeexecution/3400404"}},"startup":{"jobId":"3400404"}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"allenlliu-schedulis","codeType":"shell","engineType":"shell-1","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/allenlliu/3400404.log | 0 |  | 2022-11-16 15:52:17.000 | 2022-11-16 15:52:18.359 | bdpujes110002:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"bdpdws110004:14499":{"engineInstance":"bdpdws110004:14499","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400404_otJobId_astJob_532_codeExec_532","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_532"}},"submitTime":"2022-11-16T15:52:17+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:18+0800"} | shell | echo  'hello'| hdfs:///apps-data/allenlliu/linkis/2022-11-16/155217/nodeexecution/3400404 |
| 3400403 | nodeexecution_allenlliu_appconn_111 | allenlliu | allenlliu | {"nodeName":"datachecker_90101_copy_copy","requestIP":"127.0.0.1","projectName":"mytest_xq_0032","flowName":"test_workflow001"} | {"codeType":"datachecker","engineType":"appconn-1","userCreator":"allenlliu-nodeexecution"} | {"configuration":{"startup":{"ReuseEngine":"true","jobId":"3400403"},"runtime":{"max.check.hours":"1","nodeName":"datachecker_90101_copy_copy","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"y4h8zre1zbG7a5OlwX8oUNZnRJ6dDz3vcFfovQF97E8\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","variables":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"wds.dss.workflow.submit.user":"allenlliu","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"allenlliu\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"mytest_xq_0032\\\",\\\"flow\\\":\\\"test_workflow001\\\",\\\"contextId\\\":\\\"8-8--cs_2_devcs_2_dev10489\\\",\\\"version\\\":\\\"v000009\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","check.object":"allenlliu_ind.a","nodeType":"datachecker","source.type":"hivedb","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155217/nodeexecution/3400403","source":{"nodeName":"datachecker_90101_copy_copy","projectName":"mytest_xq_0032","flowName":"test_workflow001","requestIP":"127.0.0.1"},"jobId":"3400403","job":{"#rt_rs_store_path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155217/nodeexecution/3400403"}}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"allenlliu-schedulis","codeType":"datachecker","engineType":"appconn-1","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/allenlliu/3400403.log | 0 |  | 2022-11-16 15:52:17.000 | 2022-11-16 15:52:18.060 | bdphdp11ide01:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"bdpdws110004:10781":{"engineInstance":"bdpdws110004:10781","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400403_otJobId_astJob_644_codeExec_644","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_644"}},"submitTime":"2022-11-16T15:52:17+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:18+0800"} | appconn | {"configuration":{"startup":{"ReuseEngine":"true"},"runtime":{"max.check.hours":"1","check.object":"allenlliu_ind.a","source.type":"hivedb"}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"labels":"{\"route\":\"prod\"}"}} | hdfs:///apps-data/allenlliu/linkis/2022-11-16/155217/nodeexecution/3400403 |
| 3400402 | nodeexecution_allenlliu_spark_32 | allenlliu | allenlliu | {"nodeName":"sql_3520","requestIP":"127.0.0.1","projectName":"mytest_xq_0032","flowName":"test_workflow001"} | {"codeType":"sql","engineType":"spark-2.4.3","userCreator":"allenlliu-nodeexecution"} | {"configuration":{"runtime":{"nodeName":"sql_3520","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"y4h8zre1zbG7a5OlwX8oULazMLTJJpelslfPQ0jh9bw\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","wds.dss.workflow.submit.user":"allenlliu","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"allenlliu\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"mytest_xq_0032\\\",\\\"flow\\\":\\\"test_workflow001\\\",\\\"contextId\\\":\\\"8-8--cs_2_devcs_2_dev10489\\\",\\\"version\\\":\\\"v000009\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","nodeType":"sql","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400402","source":{"nodeName":"sql_3520","projectName":"mytest_xq_0032","flowName":"test_workflow001","requestIP":"127.0.0.1"},"jobId":"3400402","job":{"#rt_rs_store_path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400402"}},"startup":{"jobId":"3400402"}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"allenlliu-schedulis","codeType":"sql","engineType":"spark-2.4.3","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/allenlliu/3400402.log | 0 |  | 2022-11-16 15:52:16.000 | 2022-11-16 15:52:18.436 | bdpujes110002:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"bdpdws110004:25145":{"engineInstance":"bdpdws110004:25145","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400402_otJobId_astJob_531_codeExec_531","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_531"}},"submitTime":"2022-11-16T15:52:16+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:18+0800"} | spark | show tables| hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400402 |
| 3400401 | nodeexecution_allenlliu_appconn_85 | allenlliu | allenlliu | {"nodeName":"datachecker_90101","requestIP":"127.0.0.1","projectName":"mytest_xq_0032","flowName":"test_workflow001"} | {"codeType":"datachecker","engineType":"appconn-1","userCreator":"allenlliu-nodeexecution"} | {"configuration":{"startup":{"ReuseEngine":"true","jobId":"3400401"},"runtime":{"max.check.hours":"1","nodeName":"datachecker_90101","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"y4h8zre1zbG7a5OlwX8oULazMLTJJpelHY1ioj7PF6w\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","variables":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"wds.dss.workflow.submit.user":"allenlliu","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"allenlliu\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"mytest_xq_0032\\\",\\\"flow\\\":\\\"test_workflow001\\\",\\\"contextId\\\":\\\"8-8--cs_2_devcs_2_dev10489\\\",\\\"version\\\":\\\"v000009\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","check.object":"allenlliu_ind.a","nodeType":"datachecker","source.type":"hivedb","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400401","source":{"nodeName":"datachecker_90101","projectName":"mytest_xq_0032","flowName":"test_workflow001","requestIP":"127.0.0.1"},"jobId":"3400401","job":{"#rt_rs_store_path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400401"}}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"allenlliu-schedulis","codeType":"datachecker","engineType":"appconn-1","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/allenlliu/3400401.log | 0 |  | 2022-11-16 15:52:16.000 | 2022-11-16 15:52:17.718 | bdpujes110002:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"bdpdws110004:10781":{"engineInstance":"bdpdws110004:10781","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400401_otJobId_astJob_530_codeExec_530","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_530"}},"submitTime":"2022-11-16T15:52:16+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:17+0800"} | appconn | {"configuration":{"startup":{"ReuseEngine":"true"},"runtime":{"max.check.hours":"1","check.object":"allenlliu_ind.a","source.type":"hivedb"}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"labels":"{\"route\":\"prod\"}"}} | hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400401 |
| 3400400 | nodeexecution_allenlliu_appconn_110 | allenlliu | allenlliu | {"nodeName":"datachecker_90101_copy","requestIP":"127.0.0.1","projectName":"mytest_xq_0032","flowName":"test_workflow001"} | {"codeType":"datachecker","engineType":"appconn-1","userCreator":"allenlliu-nodeexecution"} | {"configuration":{"startup":{"ReuseEngine":"true","jobId":"3400400"},"runtime":{"max.check.hours":"1","nodeName":"datachecker_90101_copy","workspace":"{\"workspaceId\":224,\"workspaceName\":\"bdapWorkspace\",\"cookies\":{\"linkis_user_session_ticket_id_v1\":\"y4h8zre1zbG7a5OlwX8oULazMLTJJpelBtBXO2lr2rM\u003d\",\"dataworkcloud_inner_request\":\"true\",\"workspaceName\":\"bdapWorkspace\",\"workspaceId\":\"224\"},\"dssUrl\":\"http://bdphdp11ide01:9001\"}","variables":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"wds.dss.workflow.submit.user":"allenlliu","contextID":"{\"type\":\"HAWorkFlowContextID\",\"value\":\"{\\\"instance\\\":null,\\\"backupInstance\\\":null,\\\"user\\\":\\\"allenlliu\\\",\\\"workspace\\\":\\\"bdapWorkspace\\\",\\\"project\\\":\\\"mytest_xq_0032\\\",\\\"flow\\\":\\\"test_workflow001\\\",\\\"contextId\\\":\\\"8-8--cs_2_devcs_2_dev10489\\\",\\\"version\\\":\\\"v000009\\\",\\\"env\\\":\\\"BDAP_DEV\\\"}\"}","check.object":"allenlliu_ind.a","nodeType":"datachecker","source.type":"hivedb","labels":"{\"route\":\"prod\"}","wds.linkis.resultSet.store.path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400400","source":{"nodeName":"datachecker_90101_copy","projectName":"mytest_xq_0032","flowName":"test_workflow001","requestIP":"127.0.0.1"},"jobId":"3400400","job":{"#rt_rs_store_path":"hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400400"}}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"userCreator":"allenlliu-schedulis","codeType":"datachecker","engineType":"appconn-1","labels":"{\"route\":\"prod\"}"}} | 1.0 | Succeed | hdfs:///appcom/logs/linkis/log/2022-11-16/nodeexecution/allenlliu/3400400.log | 0 |  | 2022-11-16 15:52:16.000 | 2022-11-16 15:52:17.736 | bdphdp11ide01:9205 | {"scheduleTime":"2022-11-16T15:52:17+0800","timeToOrchestrator":"2022-11-16T15:52:17+0800","engineconnMap":{"bdpdws110004:10781":{"engineInstance":"bdpdws110004:10781","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400400_otJobId_astJob_643_codeExec_643","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_643"}},"submitTime":"2022-11-16T15:52:16+0800","yarnResource":{},"completeTime":"2022-11-16T15:52:17+0800"} | appconn | {"configuration":{"startup":{"ReuseEngine":"true"},"runtime":{"max.check.hours":"1","check.object":"allenlliu_ind.a","source.type":"hivedb"}},"variable":{"user.to.proxy":"allenlliu","run_today_h":"2022111615","run_date":"20221115"},"run_today_h":"2022111615","run_date":"20221115","labels":{"labels":"{\"route\":\"prod\"}"}} | hdfs:///apps-data/allenlliu/linkis/2022-11-16/155216/nodeexecution/3400400 |
| 3400399 | IDE_connorliuyude_spark_1 | connorliuyude | connorliuyude | {"DSS-Scriptis":"import_to_connorliuyude_qml.peter_100w_1000_a_1668585127900.scala","requestIP":"10.107.116.246"} | {"codeType":"scala","engineType":"spark-2.4.3","userCreator":"connorliuyude-IDE"} | {"configuration":{"special":{},"runtime":{"args":"","env":[],"wds.linkis.resultSet.store.path":"hdfs:///apps-data/connorliuyude/linkis/2022-11-16/155208/IDE/3400399","source":{"DSS-Scriptis":"import_to_connorliuyude_qml.peter_100w_1000_a_1668585127900.scala","requestIP":"10.107.116.246"},"jobId":"3400399","job":{"#rt_rs_store_path":"hdfs:///apps-data/connorliuyude/linkis/2022-11-16/155208/IDE/3400399"}},"startup":{"jobId":"3400399"}},"variable":{}} | 0.7191358 | Running | hdfs:///appcom/logs/linkis/log/2022-11-16/IDE/connorliuyude/3400399.log | \N | \N | 2022-11-16 15:52:08.000 | 2022-11-16 15:55:38.556 | bdphdp11ide01:9205 | {"scheduleTime":"2022-11-16T15:52:09+0800","timeToOrchestrator":"2022-11-16T15:52:09+0800","engineconnMap":{"gz.xg.bdpdws110001.webank:33228":{"engineInstance":"gz.xg.bdpdws110001.webank:33228","taskClassname":"CodeLogicalUnitExecTask","idInfo":"TaskID_3400399_otJobId_astJob_642_codeExec_642","taskName":"CodeLogicalUnitExecTask","execId":"codeExec_642"}},"submitTime":"2022-11-16T15:52:08+0800","yarnResource":{"application_1662051718074_332612":{"queueMemory":107374182400,"queueCores":20,"queueInstances":0,"jobStatus":"COMPLETED","queue":"queue_0701_01"}}} | spark | val source = """{"path":"/apps-data/connorliuyude/peter_100w_1000_a.csv","pathType":"hdfs","encoding":"utf-8","fieldDelimiter":",","hasHeader":true,"sheet":"","quote":"","escapeQuotes":false}""" val destination = """hdfs:///tmp/bdp-ide/connorliuyude/executionCode/20221116/_bgservice;454023#74026""" org.apache.linkis.engineplugin.spark.imexport.LoadData.loadDataToTableByFile(spark,destination,source) | hdfs:///apps-data/connorliuyude/linkis/2022-11-16/155208/IDE/3400399 |



## 52. linkis_ps_resources_download_history

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` | primary key | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `start_time` | start time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 3 | `end_time` | stop time | datetime |  | NO |  | CURRENT_TIMESTAMP |
| 4 | `client_ip` | client ip | varchar(200) |  | NO |  |  |
| 5 | `state` | Download status, 0 download successful, 1 download failed | tinyint(1) |  | NO |  |  |
| 6 | `resource_id` |  | varchar(50) |  | NO |  |  |
| 7 | `version` |  | varchar(20) |  | NO |  |  |
| 8 | `downloader` | Downloader | varchar(50) |  | NO |  |  |


**示例数据**

| id | start_time | end_time | client_ip | state | resource_id | version | downloader |
| ---: | --- | --- | --- | ---: | --- | --- | --- |
| 1859617 | 2022-11-16 15:56:17 | 2022-11-16 15:56:18 | 10.107.118.104 | 0 | 11b8ca20-3437-4f31-a808-915a6f016a87 | v000001 | owenxu |
| 1859614 | 2022-11-16 15:55:18 | 2022-11-16 15:55:18 | 10.107.118.104 | 0 | 836ba735-3a46-4303-8e9f-c4276a356386 | v000001 | owenxu |
| 1859613 | 2022-11-16 15:53:06 | 2022-11-16 15:53:07 | 172.21.193.229 | 0 | cb407155-242b-4303-8365-1da6256a01e3 | v000173 | hadoop |
| 1859612 | 2022-11-16 15:52:17 | 2022-11-16 15:52:17 | 10.107.118.104 | 0 | 665fe5ce-fdc6-4b9a-ab08-955e48b1f8d4 | v000001 | owenxu |


## 53. linkis_ps_udf

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `create_user` |  | varchar(50) |  | NO |  |  |
| 3 | `udf_name` |  | varchar(255) |  | NO |  |  |
| 4 | `udf_type` |  | int(11) |  | YES |  | 0 |
| 5 | `path` | Path of the referenced function | varchar(255) |  | YES |  |  |
| 6 | `register_format` |  | varchar(255) |  | YES |  |  |
| 7 | `use_format` |  | varchar(255) |  | YES |  |  |
| 8 | `description` |  | varchar(255) |  | YES |  |  |
| 9 | `is_expire` |  | bit(1) |  | YES |  |  |
| 10 | `is_shared` |  | bit(1) |  | YES |  |  |
| 11 | `tree_id` |  | bigint(20) |  | NO |  |  |
| 12 | `create_time` |  | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 13 | `update_time` |  | timestamp |  | NO |  | CURRENT_TIMESTAMP |


**示例数据**

| id | create_user | udf_name | udf_type | path | register_format | use_format | description | is_expire | is_shared | tree_id | create_time | update_time |
| ---: | --- | --- | ---: | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| 204 | neiljianliu | jar_udf | 0 | /mnt/bdap/neiljianliu/zy_test/Wbjar_1.0.0.jar | create temporary function jar_udf as "com.webank.bdp.mask.udf.BdpBankCardNoFirstEightMask" | String jar_udf(String) |  | 0 | 0 | 145 | 2021-11-09 09:52:31 | 2021-11-09 09:52:31 |
| 205 | neiljianliu | jar_udf1 | 0 | /mnt/bdap/neiljianliu/zy_test/Wbjar_1.1.jar | create temporary function jar_udf1 as "com.webank.bdp.mask.udf.BdpBankCardNoFirstEightMask" | String jar_udf1(String) |  | 0 | 0 | 145 | 2021-11-09 09:43:28 | 2021-11-09 09:43:28 |




## 54. linkis_ps_udf_baseinfo

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `create_user` |  | varchar(50) |  | NO |  |  |
| 3 | `udf_name` |  | varchar(255) |  | NO |  |  |
| 4 | `udf_type` |  | int(11) |  | YES |  | 0 |
| 5 | `tree_id` |  | bigint(20) |  | NO |  |  |
| 6 | `create_time` |  | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 7 | `update_time` |  | timestamp |  | NO |  | CURRENT_TIMESTAMP |
| 8 | `sys` | source system | varchar(255) |  | NO |  | ide |
| 9 | `cluster_name` |  | varchar(255) |  | NO |  |  |
| 10 | `is_expire` |  | bit(1) |  | YES |  |  |
| 11 | `is_shared` |  | bit(1) |  | YES |  |  |


**示例数据**

| id | create_user | udf_name | udf_type | tree_id | create_time | update_time | sys | cluster_name | is_expire | is_shared |
| ---: | --- | --- | ---: | ---: | --- | --- | --- | --- | ---: | ---: |
| 318 | neiljianliu | h01 | 3 | 1370 | 2022-08-08 19:39:39 | 2021-11-04 20:36:46 | IDE | all | 0 | 1 |
| 321 | neiljianliu | h14 | 1 | 1331 | 2021-11-01 23:28:25 | 2021-10-29 10:39:08 | IDE | all | 0 | 0 |
| 324 | stacyyan | udf_jar_834 | 0 | 133 | 2021-10-29 11:28:10 | 2021-10-29 11:28:10 | ide | all | 0 | 0 |

## 55. linkis_ps_udf_manager

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `user_name` |  | varchar(20) |  | YES |  |  |

**示例数据**

| id | user_name |
| ---: | --- |
| 1 | stacyyan |
| 2 | johnnwang |
| 3 | neiljianliu |




## 56. linkis_ps_udf_shared_group

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` |  | bigint(20) |  | NO |  |  |
| 3 | `shared_group` |  | varchar(50) |  | NO |  |  |

**示例数据**

| id | udf_id | user_name |
| ---: | ---: | --- |
| 1 | 36 | jianfuzhang |
| 2 | 36 | stacyyan |
| 3 | 38 | shanhuang |
| 4 | 38 | stacyyan |




## 57. linkis_ps_udf_shared_info

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` |  | bigint(20) |  | NO |  |  |
| 3 | `user_name` |  | varchar(50) |  | NO |  |  |


## 58. linkis_ps_udf_shared_user

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` |  | bigint(20) |  | NO |  |  |
| 3 | `user_name` |  | varchar(50) |  | NO |  |  |

**示例数据**

| id | udf_id | user_name |
| ---: | ---: | --- |
| 63 | 117 | jianfuzhang |
| 64 | 119 | neiljianliu |
| 65 | 119 | johnnwang |
| 66 | 126 | jianfuzhang |



## 59. linkis_ps_udf_tree

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `parent` |  | bigint(20) |  | NO |  |  |
| 3 | `name` | Category name of the function. It would be displayed in the front-end | varchar(100) |  | YES |  |  |
| 4 | `user_name` |  | varchar(50) |  | NO |  |  |
| 5 | `description` |  | varchar(255) |  | YES |  |  |
| 6 | `create_time` |  | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 7 | `update_time` |  | timestamp |  | NO |  | CURRENT_TIMESTAMP |
| 8 | `category` | Used to distinguish between udf and function | varchar(50) |  | YES |  |  |


**示例数据**

| id | parent | name | user_name | description | create_time | update_time | category |
| ---: | ---: | --- | --- | --- | --- | --- | --- |
| 21 | -1 | 系统函数 | sys |  | 2021-04-29 19:22:07 | 2021-04-29 19:22:07 | function |
| 22 | -1 | BDAP函数 | bdp |  | 2021-04-29 19:22:07 | 2021-04-29 19:22:07 | function |
| 23 | -1 | 共享函数 | share |  | 2021-04-29 19:22:07 | 2021-04-29 19:22:07 | function |
| 24 | -1 | 个人函数 | jianfuzhang |  | 2021-04-29 19:22:07 | 2021-04-29 19:22:07 | function |
| 25 | -1 | 个人函数 | hduser05 |  | 2021-04-30 10:15:14 | 2021-04-30 10:15:14 | udf |
| 26 | -1 | 系统函数 | sys |  | 2021-04-30 11:21:13 | 2021-04-30 11:21:13 | udf |
| 27 | -1 | BDAP函数 | bdp |  | 2021-04-30 11:21:13 | 2021-04-30 11:21:13 | udf |
| 28 | -1 | 共享函数 | share |  | 2021-04-30 11:21:13 | 2021-04-30 11:21:13 | udf |
| 29 | -1 | 个人函数 | alexyang |  | 2021-05-06 20:41:48 | 2021-05-06 20:41:48 | function |
| 30 | -1 | 个人函数 | johnnwang |  | 2021-05-06 21:47:52 | 2021-05-06 21:47:52 | udf |
| 1587 | -1 | 个人函数 | aronlv |  | 2022-11-15 10:47:27 | 2022-11-15 10:47:27 | udf |
| 1586 | -1 | 个人函数 | aronlv |  | 2022-11-15 10:47:26 | 2022-11-15 10:47:26 | function |
| 1585 | -1 | 个人函数 | jackyxxie |  | 2022-11-14 14:59:44 | 2022-11-14 14:59:44 | udf |
| 1584 | 36 | 自定义分类1 | stacyyan |  | 2022-11-11 17:10:56 | 2022-11-11 17:10:56 | udf |
| 1583 | -1 | 个人函数 | alvinzhou |  | 2022-11-09 11:23:04 | 2022-11-09 11:23:04 | function |
| 1582 | 36 | qualitis自定义分类 | stacyyan |  | 2022-11-08 16:22:31 | 2022-11-08 16:22:31 | udf |
| 1581 | 36 | qualitis测试 | stacyyan |  | 2022-11-07 12:21:30 | 2022-11-07 12:21:30 | udf |
| 1580 | 29 | fun自动化测试 | alexyang |  | 2022-11-04 19:16:29 | 2022-11-04 19:16:29 | function |
| 1579 | 20 | udf自动化测试 | alexyang |  | 2022-11-04 19:16:25 | 2022-11-04 19:16:25 | udf |
| 1578 | 20 | 测试 | alexyang |  | 2022-11-01 11:05:46 | 2022-11-01 11:05:46 | udf |
| 1577 | -1 | 个人函数 | jeromepeng |  | 2022-10-31 10:54:33 | 2022-10-31 10:54:33 | function |
| 1576 | -1 | 个人函数 | jeromepeng |  | 2022-10-31 10:54:31 | 2022-10-31 10:54:31 | udf |


## 60. linkis_ps_udf_user_load

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` |  | bigint(20) |  | NO |  |  |
| 3 | `user_name` |  | varchar(50) |  | NO |  |  |

**示例数据**

| udf_id | user_name |
| ---: | --- |
| 34 | johnnwang |
| 53 | johnnwang |
| 34 | neiljianliu |
| 109 | stacyyan |
| 110 | stacyyan |





## 61. linkis_ps_udf_user_load_info

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` |  | int(11) |  | NO |  |  |
| 3 | `user_name` |  | varchar(50) |  | NO |  |  |


**示例数据**

| id | udf_id | user_name | 
| ---: | ---: | --- | 
| 1 | 13 | hadoop | 
| 2 | 14 | bob | 
| 3 | 18 | testuser | 



## 62. linkis_ps_udf_version

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` |  | bigint(20) |  | NO |  |  |
| 3 | `path` | Source path for uploading files | varchar(255) |  | NO |  |  |
| 4 | `bml_resource_id` |  | varchar(50) |  | NO |  |  |
| 5 | `bml_resource_version` |  | varchar(20) |  | NO |  |  |
| 6 | `is_published` | is published | bit(1) |  | YES |  |  |
| 7 | `register_format` |  | varchar(255) |  | YES |  |  |
| 8 | `use_format` |  | varchar(255) |  | YES |  |  |
| 9 | `description` | version desc | varchar(255) |  | NO |  |  |
| 10 | `create_time` |  | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 11 | `md5` |  | varchar(100) |  | YES |  |  |

**示例数据**

| id | udf_id | path | bml_resource_id | bml_resource_version | is_published | register_format | use_format | description | create_time | md5 |
| ---: | ---: | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| 80 | 34 | file:///mnt/bdap/johnnwang/wds_functions1_0_0.jar | aee4698a-0aad-4dfe-9e3c-0d2c674c81f9 | v000001 | 0 | create temporary function cf_charcount_s as "com.webank.wedatasphere.willink.bdp.udf.CountTotalCharInStr" | int cf_charcount_s(string,string) |  | 2021-10-20 16:50:57 | \N |
| 93 | 34 | file:///mnt/bdap/johnnwang/wds_functions1_0_0.jar | aee4698a-0aad-4dfe-9e3c-0d2c674c81f9 | v000002 | 1 | create temporary function cf_charcount_s as "com.webank.wedatasphere.willink.bdp.udf.CountTotalCharInStr" | int cf_charcount_s(string,string) |  | 2021-10-20 18:53:59 | \N |
| 205 | 96 | file:///mnt/bdap/stacyyan/tm_client_1.6_cp.jar | 759c6179-060e-4c61-9ff9-8f6e18d0efaf | v000001 | 0 | create temporary function udf_jar_834 as "com.webank.bdp.mask.udf.BdpBankCardNoFirstEightMask" | udf_jar_834() |  | 2021-10-23 16:57:00 | \N |
| 250 | 109 | file:///mnt/bdap/stacyyan/scala系统函数调用.scala | 4519f563-ac8a-48a3-a487-36b0d629bc59 | v000001 | 0 | \N | String aadfdff() |  | 2021-10-25 16:56:04 | \N |
| 251 | 110 | file:///mnt/bdap/stacyyan/scala系统函数调用.scala | e0caa4a5-754e-4517-9d0d-5610c7712d82 | v000001 | 0 | \N | String df78() |  | 2021-10-25 16:56:28 | \N |
| 257 | 116 | file:///mnt/bdap/udf/udf_pyspark_011621477729461.py | 2917d57a-0078-455f-8eda-45d18d90adb3 | v000001 | 1 | udf.register("udf_hello_0518",hello) | String udf_hello_0518(String) | aaaad | 2021-10-25 17:31:43 | \N |


## 63. linkis_ps_variable_key

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `key` | Key of the global variable | varchar(50) |  | YES |  |  |
| 3 | `description` | Reserved word | varchar(200) |  | YES |  |  |
| 4 | `name` | Reserved word | varchar(50) |  | YES |  |  |
| 5 | `application_id` | Reserved word | bigint(20) | MUL | YES |  |  |
| 6 | `default_value` | Reserved word | varchar(200) |  | YES |  |  |
| 7 | `value_type` | Reserved word | varchar(50) |  | YES |  |  |
| 8 | `value_regex` | Reserved word | varchar(100) |  | YES |  |  |

**示例数据**

| id | key | description | name | application_id | default_value | value_type | value_regex |
| ---: | --- | --- | --- | ---: | --- | --- | --- |
| 1 | di_marw_warn_flow_dcn_d | \N | \N | -1 | \N | \N | \N |
| 2 | table_a | \N | \N | -1 | \N | \N | \N |
| 3 | table_a | \N | \N | -1 | \N | \N | \N |
| 4 | aaaa | \N | \N | -1 | \N | \N | \N |



## 64. linkis_ps_variable_key_user

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `application_id` | Reserved word | bigint(20) | MUL | YES |  |  |
| 3 | `key_id` |  | bigint(20) | MUL | YES |  |  |
| 4 | `user_name` |  | varchar(50) |  | YES |  |  |
| 5 | `value` | Value of the global variable | varchar(200) |  | YES |  |  |


**示例数据**

| id | application_id | key_id | user_name | value |
| ---: | ---: | ---: | --- | --- |
| 1 | -1 | 1 | neiljianliu | d |
| 2 | -1 | 2 | stacyyan | student |
| 3 | -1 | 3 | jianfuzhang | a_01 |

