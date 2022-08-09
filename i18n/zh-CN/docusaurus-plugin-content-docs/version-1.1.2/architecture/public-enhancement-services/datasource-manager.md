---
title: DataSource Manager Server 架构
sidebar_position: 3
---
## 背景

早期版本中的Exchangis0.x和Linkis0.x都有整合数据源模块，为复用数据源的管理能力，Linkis以linkis-datasource为蓝本(可以参阅相关的文档)重构数据源模块，将数据源管理拆封成数据源管理服务与元数据查询服务。

本文主要涉及DataSource Manager Server数据源管理服务，提供如下功能：

1）、Linkis统一管理服务启动与部署，不增加运维成本，复用Linkis服务能力；

2）、通过Linkis Web提供图形界面的管理服务，界面提供了新增数据源，数据源查询、数据源更新，连通性测试等管理服务；

3）、服务无状态，多实例部署，做到服务高可用。本系统在部署的时候，可以进行多实例部署，每个实例对外独立提供服务，不会互相干扰，所有的信息都是存储在数据库中进行共享。

4）、提供数据源全生命周期管理，包括新建、查询、更新、测试、过期管理。

5）、多版本数据源管理，历史数据源会保存在数据库中，并提供数据源过期管理。 

6）、Restful接口提供功能，详细列表：数据源类型查询、数据源详细信息查询、基于版本进行数据源信息查询、数据源版本查询、获取数据源参数列表、多维度数据源搜索、获数据源环境查询及更新、新增数据源、数据源参数配置、数据源过期设置、数据源连通性测试。

## 架构图

![datasource结构图](/Images-zh/Architecture/datasource/linkis-datasource-server.png)

## 架构说明

1、服务登记在Linkis-Eureak-Service服务中，与Linkis其他微服务统一管理，客户端可以通过连接Linkis-GateWay-Service服务与服务名 data-source-manager获取数据源管理服务。 

2、接口层，通过Restful接口向其他应用，提供了针对数据源、数据源环境的增删查改、数据源链接与双链接测试、数据源版本管理及过期操作;

3、Service层，主要针对数据库与物料库的服务管理，永久保留数据源相关信息;

4、数据源的链接测试都是通过linkis metastore server服务完成的，该服务现在提供mysql\es\kafka\hive服务

### 核心流程

1、 新建数据源，首先会从请求中获取新建数据源的用户，判断用户是否有效，下一步会对数据源相关字段信息进行校验，数据源名称和数据源类型不能为空，再下一步会根据数据源名称进行确认该数据源是否存在，如果不存在则将在数据库中进行插入，同时数据源ID号返回。

2、 更新数据源，首先会从请求中获取新建数据源的用户，判断用户是否有效，下一步会对新的数据源相关字段信息进行校验，数据源名称和数据源类型不能为空，再下一步会根据数据源ID号进行确认该数据源是否存在，如果不存在返回异常，如果存在将进一步判断该用户是否对该数据源有更新权限，用户是管理员或者数据源owner才有权限更新，如果有权限则将更新该数据源，并返回数据源ID。

3、 更新数据源参数，首先会从请求中获取新建数据源的用户，判断用户是否有效，根据所传参数数据源ID获取详细的数据源信息，接着会判断用户是否是改数据源的owner后者是否为管理员，如果有则进一步校验修改的参数，通过后则会更新参数，并返回versionId。

## 实体对象

| 类名                         | 作用                                         |
| ---------------------------- | -------------------------------------------- |
| DataSourceType               | 表示数据源的类型                             |
| DataSourceParamKeyDefinition | 声明数据源属性配置定义                       |
| DataSource                   | 数据源对象实体类，包含权限标签和属性配置定义 |
| DataSourceEnv                | 数据源环境对象实体类，也包含属性配置定义     |
| DataSourceParameter          | 数据源具体参数配置                           |
| DatasourceVersion            | 数据源版本详细信息                           |

## **数据库设计**

##### 数据库关系图：

![](/Images-zh/Architecture/datasource/dn-db.png)

##### 数据表定义：

表名：linkis_ps_dm_datatsource <-->实体：DataSource

| 序号 | 字段                 | 字段描述         |
| ---- | -------------------- | ---------------- |
| 1    | id                   | 数据源ID         |
| 2    | datasource_name      | 数据源名称       |
| 3    | datasource_desc      | 数据源详细描述   |
| 4    | datasource_type_id   | 数据源类型ID     |
| 5    | create_identify      | 标识             |
| 6    | create_system        | 创建数据源的系统 |
| 7    | parameter            | 数据源参数,注意 不做存储，实体类parameter字段通过linkis_ps_dm_datasource_version的parameter获取       |
| 8    | create_time          | 数据源创建时间   |
| 9    | modify_time          | 数据源修改时间   |
| 10   | create_user          | 数据源创建用户   |
| 11   | modify_user          | 数据源修改用户   |
| 12   | labels               | 数据源标签       |
| 13   | version_id           | 数据源版本ID     |
| 14   | expire               | 数据源是否过期   |
| 15   | published_version_id | 数据源发布版本号 |

表名：linkis_ps_dm_datasource_type <-->实体：DataSourceType

| 序号 | 字段        | 字段描述           |
| ---- | ----------- | ------------------ |
| 1    | id          | 数据源类型ID       |
| 2    | name        | 数据源类型名称     |
| 3    | description | 数据源类型描述     |
| 4    | option      | 数据源所属类型     |
| 5    | classifier  | 数据源类型分类词   |
| 6    | icon        | 数据源图片显示路径 |
| 7    | layers      | 数据源类型层次     |

表名：linkis_ps_dm_datasource_env <-->实体：DataSourceEnv

| 序号 | 字段               | 字段描述           |
| ---- | ------------------ | ------------------ |
| 1    | id                 | 数据源环境ID       |
| 2    | env_name           | 数据源环境名称     |
| 3    | env_desc           | 数据源环境描述     |
| 4    | datasource_type_id | 数据源类型ID       |
| 5    | parameter          | 数据源环境参数     |
| 6    | create_time        | 数据源环境创建时间 |
| 7    | create_user        | 数据源环境创建用户 |
| 8    | modify_time        | 数据源修改时间     |
| 9    | modify_user        | 数据源修改用户     |

表名：linkis_ps_dm_datasource_type_key <-->实体：DataSourceParamKeyDefinition

| 序号 | 字段                | 字段描述           |
| ---- | ------------------- | ------------------ |
| 1    | id                  | 键值类型ID         |
| 2    | data_source_type_id | 数据源类型ID       |
| 3    | key                 | 数据源参数key值    |
| 4    | name                | 数据源参数名称     |
| 5    | default_value       | 数据源参数默认值   |
| 6    | value_type          | 数据源参数类型     |
| 7    | scope               | 数据源参数范围     |
| 8    | require             | 数据源参数是否必须 |
| 9    | description         | 数据源参数描述     |
| 10   | value_regex         | 数据源参数正则     |
| 11   | ref_id              | 数据源参数关联ID   |
| 12   | ref_value           | 数据源参数关联值   |
| 13   | data_source         | 数据源             |
| 14   | update_time         | 更新时间           |
| 15   | create_time         | 创建时间           |

表名：linkis_ps_dm_datasource_version <-->实体：DatasourceVersion

| 序号 | 字段          | 字段描述         |
| ---- | ------------- | ---------------- |
| 1    | version_id    | 数据源版本ID     |
| 2    | datasource_id | 数据源ID         |
| 3    | parameter     | 数据源该版本参数 |
| 4    | comment       | 内容             |
| 5    | create_time   | 创建时间         |
| 6    | create_user   | 创建用户         |

