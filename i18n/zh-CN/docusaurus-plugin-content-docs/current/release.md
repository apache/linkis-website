---
title: 版本总览
sidebar_position: 0.1
--- 
- [开启Prometheus监控](/deployment/involve_prometheus_into_linkis.md)
- [自定义变量设计&内置变量](/architecture/commons/variable.md)
- [EngineConn 历史信息记录特性](/architecture/computation_governance_services/engine/engine_conn_history.md)
- [EngineConn Metrics 上报特性](/architecture/computation_governance_services/engine/engine_conn_metrics.md)
- [ContextService 清理接口特性](/architecture/public_enhancement_services/context_service/content_service_cleanup.md)
- [版本的Release-Notes](release-notes-1.1.3)

## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|eureka(application-eureka.yml)  | 新增   |eureka.instance.metadata-map:.prometheus.path| ${prometheus.path:/actuator/prometheus} |codeType和runType的映射关系|
|eureka(application-eureka.yml) | 新增  | management.endpoints.web.exposure.include|refresh,info,health,metrics   | 控制RPC模块的ribbon模式参数开关|
|common(application-linkis.yml) | 新增  | eureka.instance.metadata-map:.prometheus.path|${prometheus.path:${prometheus.endpoint}} |    异步执行支持设置并发作业组数     |
|common       | 新增  |wds.linkis.prometheus.enable  | false|        |
|common  | 修改  | wds.linkis.server.user.restful.uri.pass.auth               | /api/rest_j/v1/actuator/prometheus|                                 |
|common | 修改  | spring.spring.cloud.config.enabled                   | false|                                |

## 数据库表变化 
详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.1.3_schema`文件
