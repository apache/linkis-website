---
title: EngineConn 历史信息记录特性
sidebar_position: 4
tags: [Feature]
---

## 1. 功能需求
### 1.1 需求背景
 1.1.3版本前，LinkisManager只记录了在运行中的EngineConn的信息和资源使用，但是在任务结束后这些信息就丢失了。如果需要做历史EC的一些统计和查看，或者要去查看已经结束的EC的日志，过于繁琐，因此对于历史EC的记录显得较为重要。
 
### 1.2 目标
- 完成EC信息和资源信息持久化到DB的存储
- 支持通过restful接口完成历史EC信息的查看和搜索
- 支持查看已经结束EC的日志

## 2. 总体设计

此次特性新增主要修改为LinkisManager下的RM和AM模块，并新增了一种信息记录表。

### 2.1 技术架构
因为此次的实现需要记录EC的信息和资源信息，而资源信息分为请求资源、真实使用资源、释放资源等三个概念，而且都需要进行记录。所以此次实现大体方案是：基于EC在ResourceManager的生命周期去进行实现，在EC完成以上三个阶段时，都加上EC信息的更新操作。整体如下图所示:

![engineconn-history-01.png](/Images-zh/Architecture/EngineConn/engineconn-history-01.png)



### 2.2 业务架构

此次的特性主要是为了完成历史EC的信息记录和支持历史技术EC的日志查看。功能点设计的模块如下：

| 一级模块 | 二级模块 | 功能点 |
|---|---|---|
| LinkisManager | ResourceManager| 在EC请求资源、上报使用资源、释放资源时完成EC信息的记录|
| LinkisManager | AppManager| 提供list和搜索所有历史EC信息的接口|

## 3. 模块设计
### 核心执行流程

-  [输入端] 输入端主要为创建引擎时的请求资源、引擎启动后上报的真实使用资源、引擎退出时释放资源时输入的信息，主要包括请求的label、资源、EC唯一的ticketid、资源类型等.
-  [处理流程] 信息记录service，对输入的数据进行处理，通过标签会解析出对应的引擎信息、用户、creator，以及日志路径。通过资源类型确认是资源请求、使用、释放。接着将这些信息存储到DB中。

调用时序图如下：
![engineconn-history-02.png](/Images-zh/Architecture/EngineConn/engineconn-history-02.png)


## 4. 数据结构：
```sql
# EC信息资源记录表
DROP TABLE IF EXISTS `linkis_cg_ec_resource_info_record`;
CREATE TABLE `linkis_cg_ec_resource_info_record` (
    `id` INT(20) NOT NULL AUTO_INCREMENT,
    `label_value` VARCHAR(255) NOT NULL COMMENT 'ec labels stringValue',
    `create_user` VARCHAR(128) NOT NULL COMMENT 'ec create user',
    `service_instance` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'ec instance info',
    `ecm_instance` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'ecm instance info ',
    `ticket_id` VARCHAR(100) NOT NULL COMMENT 'ec ticket id',
    `log_dir_suffix` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'log path',
    `request_times` INT(8) COMMENT 'resource request times',
    `request_resource` VARCHAR(255) COMMENT 'request resource',
    `used_times` INT(8) COMMENT 'resource used times',
    `used_resource` VARCHAR(255) COMMENT 'used resource',
    `release_times` INT(8) COMMENT 'resource released times',
    `released_resource` VARCHAR(255)  COMMENT 'released resource',
    `release_time` datetime DEFAULT NULL COMMENT 'released time',
    `used_time` datetime DEFAULT NULL COMMENT 'used time',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    PRIMARY KEY (`id`),
    KEY (`ticket_id`),
    UNIQUE KEY `label_value_ticket_id` (`ticket_id`,`label_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

## 5. 接口设计
引擎历史管理页面API接口，参考文档  管理台添加历史引擎页面 

## 6. 非功能性设计

### 6.1 安全
不涉及安全问题，restful接口需要登录认证

### 6.2 性能
对引擎生命周期性能影响较小

### 6.3 容量
需要定期进行清理

### 6.4 高可用
不涉及

