---
title: 版本总览
sidebar_position: 0.1
--- 
- [开启 Prometheus 监控](/deployment/involve-prometheus-into-linkis.md)
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
|common(application-linkis.yml) | 新增  | eureka.instance.metadata-map:.prometheus.path|${prometheus.path:${prometheus.endpoint}} | 同上|
|common       | 新增  |wds.linkis.prometheus.enable  | false|        |
|common  | 修改  | wds.linkis.server.user.restful.uri.pass.auth               | /api/rest_j/v1/actuator/prometheus|                                 |
|common | 修改  | spring.spring.cloud.config.enabled                   | false|                                |

## 数据库表变化 
详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.1.3_schema`文件
