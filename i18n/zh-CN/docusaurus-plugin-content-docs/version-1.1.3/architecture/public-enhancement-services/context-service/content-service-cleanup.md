---
title: CS 清理接口特性
sidebar_position: 7
tags: [Feature]
---

## 1. 功能需求
### 1.1 背景
1.1.3版本前，ContextService 统一上下文服务缺少清理机制，且缺少创建时间、更新时间字段以及批量清理的接口，
在长期累积情况下可能出现百万级数据，影响查询效率。

### 1.2 目标
- 修改1ContextService`底层库表，添加创建时间、修改时间、最后访问时间字段，完成`ContextID`和`ContextMap`相关数据的更新时间入库
- 添加清理清理的`restful`接口，支持按照时间范围、按照id列表的批零清理接口
- 添加对应的`cs-client`的`java sdk`接口

## 2. 总体设计
本次需求涉及`ContextService`下的`cs-client`、`cs-persistence`以及`cs-server`模块。
在`cs-persistence`模块添加已有表的3个字段；在`cs-server`模块添加3个`restful`接口，在`cs-client`模块添加3个`sdk api`。

### 2.1 技术架构

ContextService 整体架构可参考已有文档： [ContextService架构文档](overview.md)

ContestService各模块访问关系如下图所示
![linkis-contextservice-clean-01.png](/Images-zh/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-clean-01.png)


 表变更均在`cs-persistence`模块。此次变更涉及5张表`context_id、 context_map 、context_id_listener 、context_key_listener 、 context_history`表，均需要添加`create_time，update_time，access_time` 3个字段。其中`context_id 、context_map` 表已启用，其它3张表未启用。`create_time` 在persistence模块执行insert操作前，添加时间。`update_time` 和 `access_time` 由上游接口主动调用，在update接口中，`update_time` 和 `access_time` 互斥更新，即当`access_time` 存在（不为null）则不更新`update_time`，否则更新update_time。
 
`update_time`字段更新在cs-cache模块中，检测到从db加载新的`context_id`时的ADD消息，此时同步`access_time` 到db。
表中仅记录`context_id` 表的`create_time、update_time、access_time`。后续搜索清理，也是从context_id 表进行清理。

增加3个清理相关接口：`searchContextIDByTime、clearAllContextByID、clearAllContextByTime` 
- `searchContextIDByTime`按照3个时间起止范围搜索，返回contextID列表
- `clearAllContextByID`清理输入的contextID列表中ID对应的context_map表和context_id表内容
- `clearAllContextByTime` 按照3个时间起止范围搜索，并且清理所有搜索到的contextID对应的context_map表和context_id表的内容

### 2.2 业务架构
此次特性是给ContextService服务增加批量查询和清理的相关接口，以及增加底层数据表的更新时间等字段，便于根据访问情况清理过期数据。功能点涉及模块如下表。

| 一级模块  |  二级模块 | 功能点  |
| :------------ | :------------ | :------------ |
| linkis-ps-cs  | cs-client  |  增加批量清理接口相关java sdk api接口 |
| Linkis-ps-cs  |  cs-server |  增加批量清理接口相关restful接口 |
| linkis-ps-cs  |  cs-persistence |  增加底层表的3个时间相关字段 |


## 3. 模块设计
### 主要执行流程
- 创建ContextID。用户创建ContextID时，会记录create_time，后期不更新这个字段
- 更新ContextID。用户更新ContextID时，会更新update_time字段。注意此时更新如果是从cache中更新，则不会更新access_time字段；如果从db加载到cache，再更新contextID，则会先更新access_time，然后单独更新update_time
- 根据时间查询ContextID。用户查询对应时间范围的ContextID，仅会返回haid字符串列表。此接口有分页，默认仅限5000条数据
- 批量清理ContextID。会批量清理传入的idList对应的所有contextMap数据和contextID数据。传入数组最大5000条
- 查询并清理ContextID，先查询再批量清理

上述对应时序图如下： 
![linkis-contextservice-clean-02.png](/Images-zh/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-clean-02.png)

其中有两处需要额外注意：
①cs-server服务中restful api，会将请求封装成Job提交到队列并阻塞等待结果。新定义了CLEAR 的操作类型，便于匹配到清理相关接口。
②处理①中Job的Service服务，需要将名称定义为不包含ContextID，来避免HighAvailable模块的动态代理转换，这个转换仅对于请求内只有一个ContextID的接口，对于批量清理和批量查询接口无意义且影响性能。

## 4. 数据结构
```
# 主要涉及的context_id表结构如下，增加了create_time、update_time、expire_time字段
CREATE TABLE `linkis_ps_cs_context_id` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(32) DEFAULT NULL,
  `application` varchar(32) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `expire_type` varchar(32) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `instance` varchar(128) DEFAULT NULL,
  `backup_instance` varchar(255) DEFAULT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'update unix timestamp',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `access_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'last access time',
  PRIMARY KEY (`id`),
  KEY `instance` (`instance`(128)),
  KEY `backup_instance` (`backup_instance`(191)),
  KEY `instance_2` (`instance`(128),`backup_instance`(128))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 5. 接口设计
### 5.1 Restful接口


#### 搜索文本Id执行时间


**接口地址**:`/api/rest_j/v1/contextservice/searchContextIDByTime`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>搜索文本Id执行时间</p>



**请求参数**:


| 参数名称 | 参数说明 |     请求类型 | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|accessTimeEnd|访问结束时间|query|false|string|
|accessTimeStart|访问开始时间|query|false|string|
|createTimeEnd|创建结束时间|query|false|string|
|createTimeStart|创建时间|query|false|string|
|pageNow|页码|query|false|string|
|pageSize|页面大小|query|false|string|
|updateTimeEnd|更新结束时间|query|false|string|
|updateTimeStart|更新时间|query|false|string|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Message|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
    "method": "/api/contextservice/searchContextIDByTime",
    "status": 0,
    "message": "OK",
    "data": {
        "contextIDs": [
            "8-8--cs_1_devcs_2_dev10493",
            "8-8--cs_1_devcs_2_dev10494",
            "8-8--cs_1_devcs_2_dev10495",
            "8-8--cs_1_devcs_2_dev10496",
            "8-8--cs_1_devcs_2_dev10497",
            "8-8--cs_2_devcs_2_dev10498"
        ]
    }
}
```


#### 清理指定ID


**接口地址**:`/api/rest_j/v1/contextservice/clearAllContextByID`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`*/*`

**接口描述**:<p>通过ID清除所以上下文</p>

**请求参数**:


| 参数名称 | 参数说明 |   是否必须  | 请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|idList|上下文id集合|false|String|String|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
    "method": "/api/contextservice/clearAllContextByID",
    "status": 0,
    "message": "OK",
    "data": {
        "num": "1"
    }
}
```


## 通过时间清除所以上下文


**接口地址**:`/api/rest_j/v1/contextservice/clearAllContextByTime`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`*/*`

**接口描述**:<p>通过时间清除所以上下文</p>

**请求参数**:


| 参数名称 | 参数说明 | 是否必须    |  请求类型 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|accessTimeEnd|访问时间结束|false|String|String|
|accessTimeStart|访问时间开始|false|String|String|
|createTimeEnd|创建时间结束|false|String|String|
|createTimeStart|创建时间|false|String|String|
|updateTimeStart|更新开始时间|false|String|String|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|数据集|object|
|message|描述|string|
|method|请求url|string|
|status|状态|integer(int32)|integer(int32)|

**输入参数示例**
```javascript
{
	"createTimeStart": "2022-06-01 00:00:00",
	"createTimeEnd": "2022-06-30 00:00:00"
}
```


**响应示例**:
```javascript
{
    "method": "/api/contextservice/clearAllContextByTime",
    "status": 0,
    "message": "OK",
    "data": {
        "num": "1"
    }
}
```

### 5.2 JAVA SDK API
```
# 引入pom
<dependency>
     <groupId>org.apache.linkis</groupId>
     <artifactId>linkis-cs-client</artifactId>
     <version>1.1.3</version>
</dependency>

# 代码参考如下

		String createTimeStart = "2022-05-26 22:04:00";
        String createTimeEnd = "2022-06-01 24:00:00";

        ContextClient contextClient = ContextClientFactory.getOrCreateContextClient();
		
		# 接口1 searchHAIDByTime
        List<String> idList =
                contextClient.searchHAIDByTime(
                        createTimeStart, createTimeEnd, null, null, null, null, 0, 0);

        for (String id : idList) {
            System.out.println(id);
        }

        System.out.println("Got " + idList.size() + " ids.");

        if (idList.size() > 0) {
            String id1 = idList.get(0);
            System.out.println("will clear context of id : " + id1);
        }

		# 接口2 batchClearContextByHAID
        List<String> tmpList = new ArrayList<>();
        tmpList.add(id1);
        int num = contextClient.batchClearContextByHAID(tmpList);
        System.out.println("Succeed to clear  " + num + " ids.");
        
		# 接口3  batchClearContextByTime
        int num1 =
                contextClient.batchClearContextByTime(
                        createTimeStart, createTimeEnd, null, null, null, null);
        System.out.println("Succeed to clear  " + num1 + " ids by time.");

```


## 6. 非功能性设计
### 6.1 安全
resultful接口需要登录认证，且需要管理员才能操作，管理员用户配置在properties文件中

### 6.2 性能
- 查询ID接口searchContextIDByTime有分页，无性能影响
- 清理指定ID接口clearAllContextByID限制操作数据量，无性能影响
- 根据时间清理接口clearAllContextByTime，如果查询时间范围过大，可能会有查询超时，但不会任务失败。并且清理操作是单个操作，不会影响其他查询

### 6.3 容量
本需求提供了时间范围查询和批量清理接口，需要上层使用ContextService的应用主动清理数据。

### 6.4 高可用
接口复用ContextService微服务本身的高可用能力。











