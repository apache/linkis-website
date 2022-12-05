---
title: UDF 表结构
sidebar_position: 2
---

## 1.linkis_ps_udf_baseinfo

udf函数的基本信息表，存储udf名称/类型等基础信息

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | 主键自增id | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `create_user` | 创建用户 | varchar(50) |  | NO |  |  |
| 3 | `udf_name` | udf名称 | varchar(255) |  | NO |  |  |
| 4 | `udf_type` | udf类型 | int(11) |  | YES |  | 0 |
| 5 | `tree_id` | linkis_ps_udf_tree的id | bigint(20) |  | NO |  |  |
| 6 | `create_time` | 创建时间 | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 7 | `update_time` | 更新时间 | timestamp |  | NO |  | CURRENT_TIMESTAMP |
| 8 | `sys` | source system | varchar(255) |  | NO |  | ide |
| 9 | `cluster_name` | 集群名 ，暂时未使用到，默认都是all | varchar(255) |  | NO |  |  |
| 10 | `is_expire` | 是否过期 | bit(1) |  | YES |  |  |
| 11 | `is_shared` | 是否被分享 | bit(1) |  | YES |  |  |


udf_type
```
udf_type 0：udf函数-通用
udf_type 2: udf函数-spark

udf_type 3:自定义函数-python函数
udf_type 4:自定义函数-scala 函数
```

## 2.linkis_ps_udf_manager

udf函数的管理员用户表，具有共享权限，只有udf管理员 前端才有共享的入口

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `user_name` |  | varchar(20) |  | YES |  |  |

## 3.linkis_ps_udf_shared_info

udf共享的记录表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` | linkis_ps_udf_baseinfo的id | bigint(20) |  | NO |  |  |
| 3 | `user_name` | 共享使用的用户名 | varchar(50) |  | NO |  |  |

## 4.linkis_ps_udf_tree

udf分类的树形层级记录表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `parent` | 父级分类 | bigint(20) |  | NO |  |  |
| 3 | `name` | 函数的分类名称 | varchar(100) |  | YES |  |  |
| 4 | `user_name` | 用户名 | varchar(50) |  | NO |  |  |
| 5 | `description` | 描述信息 | varchar(255) |  | YES |  |  |
| 6 | `create_time` |  | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 7 | `update_time` |  | timestamp |  | NO |  | CURRENT_TIMESTAMP |
| 8 | `category` | 类别区分 udf / function | varchar(50) |  | YES |  |  |

## 5.linkis_ps_udf_user_load

udf是否默认加载的配置

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` | linkis_ps_udf_baseinfo的id | int(11) |  | NO |  |  |
| 3 | `user_name` | 归属用户 | varchar(50) |  | NO |  |  |

## 6.linkis_ps_udf_version

udf的版本信息表

| 序号 | 名称 | 描述 | 类型 | 键 | 为空 | 额外 | 默认值 |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` |  | bigint(20) | PRI | NO | auto_increment |  |
| 2 | `udf_id` | linkis_ps_udf_baseinfo的id | bigint(20) |  | NO |  |  |
| 3 | `path` | 上传的脚本/jar包的文件本地路径 | varchar(255) |  | NO |  |  |
| 4 | `bml_resource_id` | bml中的物料资源id | varchar(50) |  | NO |  |  |
| 5 | `bml_resource_version` | bml物料版本 | varchar(20) |  | NO |  |  |
| 6 | `is_published` | 是否发布 | bit(1) |  | YES |  |  |
| 7 | `register_format` | 注册格式 | varchar(255) |  | YES |  |  |
| 8 | `use_format` | 使用格式 | varchar(255) |  | YES |  |  |
| 9 | `description` | 版本描述 | varchar(255) |  | NO |  |  |
| 10 | `create_time` |  | timestamp |  | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 11 | `md5` |  | varchar(100) |  | YES |  |  |


## ER图

![image](/Images-zh/table/udf.png)