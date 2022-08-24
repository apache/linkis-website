---
title: CS 清理架构设计
sidebar_position: 10
---

##1. 综述
###1.1 需求背景
Linkis ContextService统一上下文服务目前缺少清理机制，且缺少创建时间、更新时间字段以及批量清理的接口，在长期累积情况下可能出现百万级数据影响查询效率。
###1.2 目标
1. 修改ContextService底层库表，添加创建时间、修改时间、最后访问时间字段，完成ContextID和ContextMap相关数据的更新时间入库
2. 添加清理清理的restful接口，支持按照时间范围、按照id列表的批零清理接口
3. 添加对应的cs-client的java sdk接口

##2. 总体设计
本次需求涉及ContextService下的cs-client、cs-persistence以及cs-server模块。在cs-persistence模块添加已有表的3个字段；在cs-server模块添加3个restful接口，在cs-client模块添加3个sdk api。

###2.1 技术架构
ContextService整体架构可参考已有文档： [ContextService架构文档](https://linkis.apache.org/zh-CN/docs/latest/architecture/public_enhancement_services/context_service/overview  "ContextService架构文档")

ContestService各模块访问关系如下图所示
![arc](/Images/Architecture/Public_Enhancement_Service/ContextService/cs_clear_01.png)


表变更均在cs-persistence模块。此次变更涉及5张表，context_id、 context_map 、context_id_listener 、context_key_listener 、 context_history 表，均需要添加 create_time，update_time，access_time 3个字段。其中context_id 、context_map 表已启用，其它3张表未启用。create_time 在persistence模块执行insert操作前，添加时间。update_time 和 access_time 由上游接口主动调用，在update接口中，update_time 和 access_time 互斥更新，即当access_time 存在（不为null）则不更新update_time，否则更新update_time。

update_time字段更新在cs-cache模块中，检测到从db加载新的context_id时的ADD消息，此时同步access_time 到db。表中仅记录context_id 表的create_time  update_time  access_time。后续搜索清理，也是从context_id 表进行清理。

增加3个清理相关接口：searchContextIDByTime、clearAllContextByID、clearAllContextByTime 。searchContextIDByTime按照3个时间起止范围搜索，返回contextID列表；clearAllContextByID清理输入的contextID列表中ID对应的context_map表和context_id表内容；clearAllContextByTime 按照3个时间起止范围搜索，并且清理所有搜索到的contextID对应的context_map表和context_id表的内容。

###2.2 业务架构
此次特性是给ContextService服务增加批量查询和清理的相关接口，以及增加底层数据表的更新时间等字段，便于根据访问情况清理过期数据。功能点涉及模块如下表。

|  组件名 | 一级模块  |  二级模块 | 功能点  |
| :------------ | :------------ | :------------ | :------------ |
|  Linkis | linkis-ps-cs  | cs-client  |  增加批量清理接口相关java sdk api接口 |
|  Linkis | Linkis-ps-cs  |  cs-server |  增加批量清理接口相关restful接口 |
| Linkis  | linkis-ps-cs  |  cs-persistence |  增加底层表的3个时间相关字段 |


##3. 模块设计
###主要执行流程
- 创建ContextID。用户创建ContextID时，会记录create_time，后期不更新这个字段。
- 更新ContextID。用户更新ContextID时，会更新update_time字段。注意此时更新如果是从cache中更新，则不会跟新access_time字段；如果从db加载到cache，再跟新contextID，则会先更新access_time，然后单独跟新update_time。
- 根据时间查询ContextID。用户查询对应时间范围的ContextID，仅会返回haid字符串列表。此接口有分页，默认仅限5000条数据。
- 批量清理ContextID。会批量清理传入的idList对应的所有contextMap数据和contextID数据。传入数组最大5000条。
- 查询并清理ContextID。先查询再批量清理。
  上述对应时序图如下：
  ![time](/Images/Architecture/Public_Enhancement_Service/ContextService/cs_clear_02.jpg)

其中有两处需要额外注意：
①cs-server服务中restful api，会将请求封装成Job提交到队列并阻塞等待结果。新定义了CLEAR 的操作类型，便于匹配到清理相关接口。
②处理①中Job的Service服务，需要将名称定义为不包含ContextID，来避免HighAvailable模块的动态代理转换，这个转换仅对于请求内只有一个ContextID的接口，对于批量清理和批量查询接口无意义且影响性能。

##4. 数据结构
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

##5. 接口设计
###5.1 Restful接口
1， 查询ID接口searchContextIDByTime

①接口名称   
GET   /api/rest_j/v1/contextservice/searchContextIDByTime

②输入参数
GET接口路径参数：
![](/storage/img/b5949932490640c2a8f5610d9eea36e3XXX315DE)

③输出参数实例
```
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


2，清理指定ID接口clearAllContextByID
①接口名   POST    /api/rest_j/v1/contextservice/clearAllContextByID
②输入参数示例
```
{
	"idList" : [
		"8-8--cs_1_devcs_1_dev2236"
		]
}
```

③输出参数示例
```
{
    "method": "/api/contextservice/clearAllContextByID",
    "status": 0,
    "message": "OK",
    "data": {
        "num": "1"
    }
}
```

3，根据时间清理接口clearAllContextByTime
①接口名称
POST   /api/rest_j/v1/contextservice/clearAllContextByTime
②输入参数示例
{
"createTimeStart": "2022-06-01 00:00:00",
"createTimeEnd": "2022-06-30 00:00:00"
}
③输出参数示例
```
{
    "method": "/api/contextservice/clearAllContextByTime",
    "status": 0,
    "message": "OK",
    "data": {
        "num": "1"
    }
}
```

###5.2 JAVA SDK API
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


##6. 非功能性设计
###6.1 安全
resultful接口需要登录认证，且需要管理员才能操作。管理员用户配置在properties文件中。

###6.2 性能
- 查询ID接口searchContextIDByTime有分页，无性能影响。
- 清理指定ID接口clearAllContextByID限制操作数据量，无性能影响。
- 根据时间清理接口clearAllContextByTime，如果查询时间范围过大，可能会有查询超时，但不会任务失败。并且清理操作是单个操作，不会影响其他查询。

###6.3 容量
本需求提供了时间范围查询和批量清理接口，需要上层使用ContextService的应用主动清理数据。

###6.4 高可用
接口复用ContextService微服务本身的高可用能力。