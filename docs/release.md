---
title: Version overview
sidebar_position: 0.1
---

- [Enable Prometheus monitoring](/deployment/involve_prometheus_into_linkis.md)
- [Custom Variable Design & Built-in Variables](/architecture/commons/variable.md)
- [EngineConn History Information Recording Features](/architecture/computation_governance_services/engine/engine_conn_history.md)
- [EngineConn Metrics reporting feature](/architecture/computation_governance_services/engine/engine_conn_metrics.md)
- [ContextService cleanup interface features](/architecture/public_enhancement_services/context_service/content_service_cleanup.md)
- [Release-Notes](release-notes-1.1.3)

## Configuration Item

| module name (service name) | type | parameter name | default value | description |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|eureka(application-eureka.yml) | New | management.endpoints.web.exposure.include|refresh,info,health,metrics | The endpoint exposure range for Spring Boot Actuator|
|eureka(application-eureka.yml) | New |eureka.instance.metadata-map:.prometheus.path| ${prometheus.path:/actuator/prometheus} | Prometheus monitoring endpoint for microservices registered in Eureka metadata|
|common(application-linkis.yml) | New | eureka.instance.metadata-map:.prometheus.path|${prometheus.path:${prometheus.endpoint}} | ditto|
|common | New |wds.linkis.prometheus.enable | false| |
|common | Modify | wds.linkis.server.user.restful.uri.pass.auth | /api/rest_j/v1/actuator/prometheus| |
|common | modify | spring.spring.cloud.config.enabled | false | |

## DB Table Changes
For details, see the upgrade schema`db/upgrade/1.1.3_schema` file in the corresponding branch of the code repository (https://github.com/apache/incubator-linkis).