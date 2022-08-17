---
title: 版本总览
sidebar_position: 0.1
--- 
- [ElasticSearch引擎使用说明](/engine-usage/elasticsearch.md)
- [Presto引擎使用说明](/engine-usage/presto.md)
- [开启Prometheus监控](/deployment/involve-prometheus-into-linkis.md)
- [自定义变量设计&内置变量](/architecture/commons/variable.md)
- [EngineConn 历史信息记录特性](/architecture/computation-governance-services/engine/engine-conn-history.md)
- [EngineConn Metrics 上报特性](/architecture/computation-governance-services/engine/engine-conn-metrics.md)
- [ContextService 清理接口特性](/architecture/public-enhancement-services/context-service/content-service-cleanup.md)
- [版本的Release-Notes](/download/release-notes-1.1.3)

## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|eureka(application-eureka.yml) | 新增  | management.endpoints.web.exposure.include|refresh,info,health,metrics   | Spring Boot Actuator暴露端口范围|
|eureka(application-eureka.yml)  | 新增   |eureka.instance.metadata-map:.prometheus.path| ${prometheus.path:/actuator/prometheus} | 注册在eureka元数据中的微服务prometheus监控端口|
|common(application-linkis.yml) | 新增  | eureka.instance.metadata-map:.prometheus.path| ${prometheus.path:${prometheus.endpoint}}} | 同上|
|common       | 新增  |wds.linkis.prometheus.enable  | false|        |
|common  | 修改  | wds.linkis.server.user.restful.uri.pass.auth               | /api/rest_j/v1/actuator/prometheus|                                 |
|common | 修改  | spring.spring.cloud.config.enabled                   | false|                                |
|ec-es | 新增  | linkis.es.cluster        			| 127.0.0.1:9200    | ElasticSearch 集群，多个节点使用逗号分隔 |
|ec-es | 新增  | linkis.es.username       			| 无    			| ElasticSearch 集群用户名                 |
|ec-es | 新增  | linkis.es.password       			| 无       			| ElasticSearch 集群密码                   |
|ec-es | 新增  | linkis.es.auth.cache     			| false       		| 客户端是否缓存认证                       |
|ec-es | 新增  | linkis.es.sniffer.enable 			| false          	| 客户端是否开启 sniffer                   |
|ec-es | 新增  | linkis.es.http.method    			| GET               | 调用方式                                 |
|ec-es | 新增  | linkis.es.http.endpoint  			| /_search          | JSON 脚本调用的 Endpoint                 |
|ec-es | 新增  | linkis.es.sql.endpoint   			| /_sql             | SQL 脚本调用的 Endpoint                  |
|ec-es | 新增  | linkis.es.sql.format     			| {"query":"%s"} 	| SQL 脚本调用的模板，%s 替换成 SQL 作为请求体请求Es 集群 |
|ec-es | 新增  | linkis.es.headers.* 	            | 无 				| 客户端 Headers 配置 |
|ec-es | 新增  | linkis.engineconn.concurrent.limit | 100				| 引擎最大并发 |
|ec-presto | 新增  | wds.linkis.presto.url                  | http://127.0.0.1:8080 | Presto 集群连接                             | 
|ec-presto | 新增  | wds.linkis.presto.username             | default               | Presto 集群用户名                           | 
|ec-presto | 新增  | wds.linkis.presto.password             | 无                    | Presto 集群密码                             |
|ec-presto | 新增  | wds.linkis.presto.catalog              | system                | 查询的 Catalog                              | 
|ec-presto | 新增  | wds.linkis.presto.schema               | 无                    | 查询的 Schema                               | 
|ec-presto | 新增  | wds.linkis.presto.source               | global                | 查询使用的 source                           |
|ec-presto | 新增  | presto.session.query_max_total_memory  | 8GB                   | 查询使用最大的内存                          | 
|ec-presto | 新增  | wds.linkis.presto.http.connectTimeout  | 60                    | Presto 客户端的 connect timeout（单位：秒） |
|ec-presto | 新增  | wds.linkis.presto.http.readTimeout     | 60                    | Presto 客户端的 read timeout（单位：秒）    |
|ec-presto | 新增  | wds.linkis.engineconn.concurrent.limit | 100                   | Presto 引擎最大并发数                       | 
|ec-jdbc | 修改  | wds.linkis.jdbc.connect.url            | jdbc:mysql://127.0.0.1:3306/test	|	jdbc连接url				|
|ec-jdbc | 修改  | wds.linkis.jdbc.driver            		| com.mysql.jdbc.Driver			  	|	jdbc连接驱动包			|
|ec-jdbc | 修改  | wds.linkis.jdbc.username            	| 无								|	jdbc连接用户名			|
|ec-jdbc | 修改  | wds.linkis.jdbc.password            	| 无								|	jdbc连接密码			|

## 数据库表变化 
详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.2.0_schema`文件
