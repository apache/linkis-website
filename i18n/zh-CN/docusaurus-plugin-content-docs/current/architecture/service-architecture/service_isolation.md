---
title: 微服务租户隔离架构设计
sidebar_position: 9
---

## 1. 总述
### 1.1 需求背景
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis在Gateway进行服务转发时是基于ribbon进行负载均衡的，但是有些情况下存在一些重要业务的任务希望做到服务级别的隔离，如果基于ribbon进行服务在均衡就会存在问题。比如租户A希望他的任务都路由到特定的Linkis-CG-Entrance服务，这样当其他的实例出现异常时可以不会影响到A服务的Entrance。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外支持服务的租户及隔离也可以做到快速隔离某个异常服务，支持灰度升级等场景。

### 1.2 目标
1. 支持通过解析请求的标签按照路由标签对服务进行转发
2. 支持服务的标签注册和修改

## 2. 总体设计
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此次特性新增主要修改点位linkis-mg-gateway和instance-label两个模块，设计到新增Gateway的转发逻辑，以及instance-label支持服务和标签的注册。

### 2.1 技术架构
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;整体技术架构主要修改点位RestFul请求需要带上路由标签等标签参数信息，然后在Gateway进行转发时会解析对应的标签完成接口的路由转发。整体如下图所示
![arc](/Images/Architecture/Gateway/service_isolation_arc.png)

几点说明：
1. 如果存在多个对应的服务打上了同一个roteLabel则随机转发
2. 如果对应的routeLabel没有对应的服务，则接口直接失败
3. 如果接口没有routeLabel则基于原有的转发逻辑，不会路由到打上了特定标签的服务

### 2.2 业务架构
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此次的特性主要是为了完成Restful租户隔离转发功能。功能点设计的模块如下：

| 组件名| 一级模块 | 二级模块 | 功能点 |
|---|---|---|---|
| Linkis | MG | Gateway| 解析restful请求参数中的路由标签，完成接口按照路由标签的转发功能|
| Linkis | PS | InstanceLabel| InstanceLabel服务，完成服务和标签的关联|

## 3. 模块设计
### 3.1 核心执行流程
- [输入端] 输入端为请求Gatway的restful请求，且是参数中待用roure label的请求才会进行处理
- [处理流程] Gateway会判断请求是否带有对应的RouteLabel，如果存在则基于RouteLabel来进行转发。
调用时序图如下：

![Time](/Images/Architecture/Gateway/service_isolation_time.png)



## 4. 数据结构：
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

```
## 5. 如何使用：

### 5.1 add route label for entrance
```
echo "spring.eureka.instance.metadata-map.route=et1" >> $LINKIS_CONF_DIR/linkis-cg-entrance.properties 
sh  $LINKIS_HOME/sbin/linkis-damemon.sh restart cg-entrance
```
![Time](/Images/Architecture/Gateway/service_isolation_time.png)

### 5.2 Use route label
submit task:
```
url:/api/v1/entrance/submit
{
    "executionContent": {"code": "echo 1", "runType":  "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source":  {"scriptPath": "ip"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "peacewong-IDE",
        "route": "et1"
    }
}
```
will be routed to a fixed service：
```
{
    "method": "/api/entrance/submit",
    "status": 0,
    "message": "OK",
    "data": {
        "taskID": 45158,
        "execID": "exec_id018030linkis-cg-entrancelocalhost:9205IDE_peacewong_shell_0"
    }
}
```

or linkis-cli:

```
sh bin/linkis-cli -submitUser  hadoop  -engineType shell-1 -codeType shell  -code "whoami" -labelMap route=et1 --gatewayUrl http://127.0.0.1:9101
```

### 5.3 Use non-existing label
submit task:
```
url:/api/v1/entrance/submit
{
    "executionContent": {"code": "echo 1", "runType":  "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source":  {"scriptPath": "ip"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "peacewong-IDE",
        "route": "et1"
    }
}
```
will get the error
```
{
    "method": "/api/rest_j/v1/entrance/submit",
    "status": 1,
    "message": "GatewayErrorException: errCode: 11011 ,desc: Cannot route to the corresponding service, URL: /api/rest_j/v1/entrance/submit RouteLabel: [{\"stringValue\":\"et2\",\"labelKey\":\"route\",\"feature\":null,\"modifiable\":true,\"featureKey\":\"feature\",\"empty\":false}] ,ip: localhost ,port: 9101 ,serviceKind: linkis-mg-gateway",
    "data": {
        "data": "{\r\n    \"executionContent\": {\"code\": \"echo 1\", \"runType\":  \"shell\"},\r\n    \"params\": {\"variable\": {}, \"configuration\": {}},\r\n    \"source\":  {\"scriptPath\": \"ip\"},\r\n    \"labels\": {\r\n        \"engineType\": \"shell-1\",\r\n        \"userCreator\": \"peacewong-IDE\",\r\n        \"route\": \"et2\"\r\n    }\r\n}"
    }
}
```

### 5.4 without label
submit task:
```
url:/api/v1/entrance/submit
{
    "executionContent": {"code": "echo 1", "runType":  "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source":  {"scriptPath": "ip"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "peacewong-IDE"
    }
}
```

```

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

```

## 6. 非功能性设计：

### 6.1 安全
不涉及安全问题，restful需要登录认证

### 6.2 性能
对Gateway转发性能影响较小，有缓存相应的label和instance的数据

### 6.3 容量
不涉及

### 6.4 高可用
不涉及



