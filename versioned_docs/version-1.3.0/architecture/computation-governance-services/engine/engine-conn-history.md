---
title: EngineConn History Features
sidebar_position: 5
tags: [Feature]
---

## 1. Functional requirements
### 1.1 Requirement Background
Before version 1.1.3, LinkisManager only recorded the information and resource usage of the running EngineConn, but the information was lost after the task was completed. If you need to do some statistics and view of historical ECs, or to view the logs of ECs that have ended, it is too cumbersome, so it is more important to record historical ECs.

### 1.2 Goals
- Complete the storage of EC information and resource information persistent to DB
- Supports viewing and searching of historical EC information through the restful interface
- Support to view logs of EC that has ended

## 2. Overall Design

The main changes in this feature are the RM and AM modules under LinkisManager, and an information record table has been added.

### 2.1 Technical Architecture
Because this implementation needs to record EC information and resource information, and resource information is divided into three concepts, such as requesting resources, actually using resources, and releasing resources, and all of them need to be recorded. Therefore, the general plan for this implementation is: based on the EC in the life cycle of the ResourceManager to implement, and when the EC completes the above three stages, the update operation of the EC information is added. The overall picture is shown below:

![engineconn-history-01.png](/Images-zh/Architecture/EngineConn/engineconn-history-01.png)



### 2.2 Business Architecture

This feature is mainly to complete the information recording of historical ECs and support the log viewing of historical technical ECs. The modules designed by the function point are as follows:

| First-level module | Second-level module | Function point |
|---|---|---|
| LinkisManager | ResourceManager| Complete the EC information record when the EC requests resources, reports the use of resources, and releases resources|
| LinkisManager | AppManager| Provides an interface to list and search all historical EC information|

## 3. Module Design
### Core execution flow

- \[Input] The input is mainly for the requested resource when the engine is created, the real used resource reported after the engine is started, and the information input when the resource is released when the engine exits, mainly including the requested label, resource, EC's unique ticketid, resource type etc.
- \[Processing process] Information recording service, which processes the input data, and parses the corresponding engine information, user, creator, and log path through tags. Confirm the resource request, use, and release by the resource type. Then talk about the information stored in the DB.

The call sequence diagram is as follows:
![engineconn-history-02.png](/Images-zh/Architecture/EngineConn/engineconn-history-02.png)



## 4. Data structure:
```sql
# EC information resource record table
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
    `released_resource` VARCHAR(255) COMMENT 'released resource',
    `release_time` datetime DEFAULT NULL COMMENT 'released time',
    `used_time` datetime DEFAULT NULL COMMENT 'used time',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    PRIMARY KEY (`id`),
    KEY (`ticket_id`),
    UNIQUE KEY `label_value_ticket_id` (`ticket_id`, `label_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
````

## 5. Interface Design
Engine history management page API interface, refer to the document Add history engine page to the management console

## 6. Non-functional design

### 6.1 Security
No security issues are involved, the restful interface requires login authentication

### 6.2 Performance
Less impact on engine life cycle performance

### 6.3 Capacity
Requires regular cleaning

### 6.4 High Availability
not involving