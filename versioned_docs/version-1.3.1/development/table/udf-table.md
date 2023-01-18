---
title: UDF Table Structure
sidebar_position: 2
---

## 1. linkis_ps_udf_baseinfo

The basic information table of udf function, which stores basic information such as udf name/type

| number | name | description | type | key | empty | extra | default value |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | primary key auto-increment id | bigint(20) | PRI | NO | auto_increment | |
| 2 | `create_user` | create user | varchar(50) | | NO | | |
| 3 | `udf_name` | udf name | varchar(255) | | NO | | |
| 4 | `udf_type` | udf type | int(11) | | YES | | 0 |
| 5 | `tree_id` | id of linkis_ps_udf_tree | bigint(20) | | NO | | |
| 6 | `create_time` | creation time | timestamp | | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 7 | `update_time` | update time | timestamp | | NO | | CURRENT_TIMESTAMP |
| 8 | `sys` | source system | varchar(255) | | NO | | ide |
| 9 | `cluster_name` | Cluster name, not used yet, default is all | varchar(255) | | NO | | |
| 10 | `is_expire` | Expired or not | bit(1) | | YES | | |
| 11 | `is_shared` | Is it shared | bit(1) | | YES | | |


udf_type
````
udf_type 0: udf function - generic
udf_type 2: udf function - spark

udf_type 3: custom function - python function
udf_type 4: custom function - scala function
````

## 2. linkis_ps_udf_manager

The administrator user table of the udf function, with sharing permissions, only the front end of the udf administrator has a shared entry

| number | name | description | type | key | empty | extra | default value |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | | bigint(20) | PRI | NO | auto_increment | |
| 2 | `user_name` | | varchar(20) | | YES | | |

## 3. linkis_ps_udf_shared_info

udf shared record table

| number | name | description | type | key | empty | extra | default value |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | | bigint(20) | PRI | NO | auto_increment | |
| 2 | `udf_id` | id of linkis_ps_udf_baseinfo | bigint(20) | | NO | | |
| 3 | `user_name` | username used by the share | varchar(50) | | NO | | |

## 4. linkis_ps_udf_tree

Tree-level record table for udf classification

| number | name | description | type | key | empty | extra | default value |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | | bigint(20) | PRI | NO | auto_increment | |
| 2 | `parent` | parent category | bigint(20) | | NO | | |
| 3 | `name` | Class name of the function | varchar(100) | | YES | | |
| 4 | `user_name` | username | varchar(50) | | NO | | |
| 5 | `description` | description information | varchar(255) | | YES | | |
| 6 | `create_time` | | timestamp | | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 7 | `update_time` | | timestamp | | NO | | CURRENT_TIMESTAMP |
| 8 | `category` | category distinction udf / function | varchar(50) | | YES | | |

## 5. linkis_ps_udf_user_load

Whether udf is the configuration loaded by default

| number | name | description | type | key | empty | extra | default value |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | | bigint(20) | PRI | NO | auto_increment | |
| 2 | `udf_id` | id of linkis_ps_udf_baseinfo | int(11) | | NO | | |
| 3 | `user_name` | user owned | varchar(50) | | NO | | |

## 6. linkis_ps_udf_version

udf version information table

| number | name | description | type | key | empty | extra | default value |
|------ |------ |------ |------ |------ |------ |------ |------ |
| 1 | `id` | | bigint(20) | PRI | NO | auto_increment | |
| 2 | `udf_id` | id of linkis_ps_udf_baseinfo | bigint(20) | | NO | | |
| 3 | `path` | The local path of the uploaded script/jar package | varchar(255) | | NO | | |
| 4 | `bml_resource_id` | Material resource id in bml | varchar(50) | | NO | | |
| 5 | `bml_resource_version` | bml material version | varchar(20) | | NO | | |
| 6 | `is_published` | whether to publish | bit(1) | | YES | | |
| 7 | `register_format` | registration format | varchar(255) | | YES | | |
| 8 | `use_format` | use format | varchar(255) | | YES | | |
| 9 | `description` | Version description | varchar(255) | | NO | | |
| 10 | `create_time` | | timestamp | | NO | on update CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| 11 | `md5` | | varchar(100) | | YES | | |


## ER diagram

![image](/Images-zh/table/udf.png)