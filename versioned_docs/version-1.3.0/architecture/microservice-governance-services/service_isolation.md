---
title: Service Isolation Design
sidebar_position: 2
---

## 1. General
### 1.1 Requirements Background
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis now performs load balancing based on the ribbon when it forwards services in the Gateway, but in some cases, there are some important business tasks that want to achieve service level isolation, if the service is based on the ribbon There will be problems in equilibrium. For example, tenant A wants his tasks to be routed to a specific Linkis-CG-Entrance service, so that when other instances are abnormal, the Entrance of service A will not be affected.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In addition, tenants and isolation of support services can also quickly isolate an abnormal service and support scenarios such as grayscale upgrades.

### 1.2 Target
1. Support forwarding the service according to the routing label by parsing the label of the request
2. Tag Registration and Modification of Support Services

## 2. Design
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This feature adds two modules, linkis-mg-gateway and instance-label, which are mainly modified points, designed to add the forwarding logic of Gateway, and instance-label to support services and labels register.

### 2.1 Technical Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The overall technical architecture mainly modifies the point. The RestFul request needs to carry label parameter information such as routing label, and then the corresponding label will be parsed when the Gateway forwards to complete the route forwarding of the interface. The whole is shown in the figure below
![arc](/Images/Architecture/Gateway/service_isolation_arc.png)

A few notes:
1. If there are multiple corresponding services marked with the same roteLabel, it will be forwarded randomly
2. If the corresponding routeLabel does not have a corresponding service, the interface fails directly
3. If the interface does not have a routeLabel, based on the original forwarding logic, it will not route to the service marked with a specific label

### 2.2 Business Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This feature is mainly to complete the Restful tenant isolation and forwarding function. The modules designed by the function point are as follows:

| Component name | First-level module | Second-level module | Function point |
|---|---|---|---|
| Linkis | MG | Gateway| Parse the route label in the restful request parameters, and complete the forwarding function of the interface according to the route label|
| Linkis | PS | InstanceLabel| InstanceLabel service, completes the association between services and labels|

## 3. Module Design
### 3.1 Core execution flow
[Input] The input is the restful request requesting Gatway, and only the request with the roure label to be used in the parameter will be processed.
[Processing process] The Gateway will determine whether the request has a corresponding RouteLabel, and if it exists, it will be forwarded based on the RouteLabel.
The call sequence diagram is as follows:

![Time](/Images/Architecture/Gateway/service_isolation_time.png)



## 4. DDL:
```sql
DROP TABLE IF EXISTS `linkis_ps_instance_label`;
CREATE TABLE `linkis_ps_instance_label` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `label_key` varchar(32) COLLATE utf8_bin NOT NULL COMMENT 'string key',
  `label_value` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'string value',
  `label_feature` varchar(16) COLLATE utf8_bin NOT NULL COMMENT 'store the feature of label, but it may be redundant',
  `label_value_size` int(20) NOT NULL COMMENT 'size of key -> value map',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'update unix timestamp',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'update unix timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_key_value` (`label_key`,`label_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `linkis_ps_instance_info`;
CREATE TABLE `linkis_ps_instance_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instance` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'structure like ${host|machine}:${port}',
  `name` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'equal application name in registry',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'update unix timestamp',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'create unix timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `instance` (`instance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `linkis_ps_instance_label_relation`;
CREATE TABLE `linkis_ps_instance_label_relation` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `label_id` int(20) DEFAULT NULL COMMENT 'id reference linkis_ps_instance_label -> id',
  `service_instance` varchar(128) NOT NULL COLLATE utf8_bin COMMENT 'structure like ${host|machine}:${port}',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'update unix timestamp',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'create unix timestamp',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

````
## 5. How to use:

### 5.1 add route label for entrance

````
echo "spring.eureka.instance.metadata-map.route=et1" >> $LINKIS_CONF_DIR/linkis-cg-entrance.properties
sh $LINKIS_HOME/sbin/linkis-damemon.sh restart cg-entrance
````

![Time](/Images/Architecture/Gateway/service_isolation_time.png)

### 5.2 Use route label
submit task:
````
url:/api/v1/entrance/submit
{
    "executionContent": {"code": "echo 1", "runType": "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source": {"scriptPath": "ip"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "peacewong-IDE",
        "route": "et1"
    }
}
````
will be routed to a fixed service:
````
{
    "method": "/api/entrance/submit",
    "status": 0,
    "message": "OK",
    "data": {
        "taskID": 45158,
        "execID": "exec_id018030linkis-cg-entrancelocalhost:9205IDE_peacewong_shell_0"
    }
}
````

or linkis-cli:

````
sh bin/linkis-cli -submitUser hadoop -engineType shell-1 -codeType shell -code "whoami" -labelMap route=et1 --gatewayUrl http://127.0.0.1:9101
````

### 5.3 Use non-existing label
submit task:
````
url:/api/v1/entrance/submit
{
    "executionContent": {"code": "echo 1", "runType": "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source": {"scriptPath": "ip"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "peacewong-IDE",
        "route": "et1"
    }
}
````

will get the error
````
{
    "method": "/api/rest_j/v1/entrance/submit",
    "status": 1,
    "message": "GatewayErrorException: errCode: 11011 ,desc: Cannot route to the corresponding service, URL: /api/rest_j/v1/entrance/submit RouteLabel: [{\"stringValue\":\"et2\",\" labelKey\":\"route\",\"feature\":null,\"modifiable\":true,\"featureKey\":\"feature\",\"empty\":false}] ,ip: localhost ,port: 9101 ,serviceKind: linkis-mg-gateway",
    "data": {
        "data": "{\r\n \"executionContent\": {\"code\": \"echo 1\", \"runType\": \"shell\"},\r\n \"params \": {\"variable\": {}, \"configuration\": {}},\r\n \"source\": {\"scriptPath\": \"ip\"},\r\ n \"labels\": {\r\n \"engineType\": \"shell-1\",\r\n \"userCreator\": \"peacewong-IDE\",\r\n \" route\": \"et2\"\r\n }\r\n}"
    }
}
````

### 5.4 without label
submit task:
````
url:/api/v1/entrance/submit
{
    "executionContent": {"code": "echo 1", "runType": "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source": {"scriptPath": "ip"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "peacewong-IDE"
    }
}
````

````

will route to untagged entranceservices
{
    "method": "/api/entrance/submit",
    "status": 0,
    "message": "OK",
    "data": {
        "taskID": 45159,
        "execID": "exec_id018018linkis-cg-entrancelocalhost2:9205IDE_peacewong_shell_0"
    }
}

````

## 6. Non-functional design:

### 6.1 Security
No security issues are involved, restful requires login authentication

### 6.2 Performance
It has little impact on Gateway forwarding performance, and caches the corresponding label and instance data

### 6.3 Capacity
not involving

### 6.4 High Availability
not involving