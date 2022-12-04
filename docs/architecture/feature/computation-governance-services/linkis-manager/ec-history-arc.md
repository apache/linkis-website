---
title: EC History List Architecture Design
sidebar_position: 4
---

## 1. General
### 1.1 Requirements Background
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now LinkisManager only records the information and resource usage of the running EengineConn, but this information is lost after the task ends. It is inconvenient to do some statistics and view of historical ECs, or to view logs of ECs that have ended. It is more important to record the historical EC.
### 1.2 Target
1. Complete the persistence of EC information and resource information to DB storage
2. Support the viewing and searching of historical EC information through restful
3. Support to view the logs of EC that has ended

## 2. Design
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The main modification of this feature is the RM and AM modules under LinkisManager, and a new information record table is added. It will be described in detail below.

### 2.1 Technical Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Because this implementation needs to record EC information and resource information, and resource information is divided into three concepts, such as requesting resources, actual use of resources, and release of resources, and all need to be recorded. Therefore, this implementation is based on the life cycle of the EC in the ResourceManager. When the EC completes the above three stages, the update operation of the EC information is added. The whole is shown in the figure below
![arc](/Images/Architecture/LinkisManager/ecHistoryArc.png)

### 2.2 Business Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This feature is mainly to complete the information recording of historical EC and support the log viewing of historical technical EC. The modules designed by the function point are as follows:

| Component name | First-level module | Second-level module | Function point |
|---|---|---|---|
| Linkis | LinkisManager | ResourceManager| Complete the EC information record when the EC requests resources, reports the use of resources, and releases resources|
| Linkis | LinkisManager | AppManager| Provides an interface to list and search all historical EC information|

## 3. Module Design
### Core execution flow
[Input] The input is mainly the information input when creating the engine, requesting resources, reporting the actual use of resources after the engine starts, and releasing resources when the engine exits, mainly including the requested label, resource, ec unique ticketid, and resource type.
[Processing process] The information recording service processes the input data, and parses the corresponding engine information, user, creator, and log path through tags. Confirm the resource request, use, and release by the resource type. Then talk about the information stored in the DB.
The call sequence diagram is as follows:
![Time](/Images/Architecture/LinkisManager/ecHistoryTime.png)


## 4. DDL:
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
## 5. Interface design:
The API interface of the engine history management page, refer to the document Management console to add a history engine page
https://linkis.apache.org/docs/latest/api/http/linkis-cg-linkismanager-api/ec-resource-management-api

## 6. Non-functional design:

### 6.1 Security
No security issues are involved, restful requires login authentication

### 6.2 Performance
Less impact on engine life cycle performance

### 6.3 Capacity
Requires regular cleaning

### 6.4 High Availability
not involving