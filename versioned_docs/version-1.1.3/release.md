---
title: Version overview
sidebar_position: 0.1
---

- [Enable Prometheus monitoring](/deployment/involve-prometheus-into-linkis.md)
- [Custom Variable Design & Built-in Variables](/architecture/commons/variable.md)
- [EngineConn History Information Recording Features](/architecture/computation-governance-services/engine/engine-conn-history.md)
- [EngineConn Metrics Reporting Feature](/architecture/computation-governance-services/engine/engine-conn-metrics.md)
- [ContextService cleanup interface features](/architecture/public-enhancement-services/context-service/content-service-cleanup.md)
- [Release-Notes](/download/release-notes-1.1.3)

## Configuration Item

| Module Name (Service Name) | Type | Parameter Name | Default Value | Description |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|eureka(application-eureka.yml) | New | management.endpoints.web.exposure.include|refresh,info,health,metrics | The endpoint exposure range for Spring Boot Actuator|
|eureka(application-eureka.yml) | New |eureka.instance.metadata-map:.prometheus.path| ${prometheus.path:/actuator/prometheus} | Prometheus monitoring endpoint for microservices registered in Eureka metadata|
|common(application-linkis.yml) | New | eureka.instance.metadata-map:.prometheus.path|${prometheus.path:${prometheus.endpoint}} | ditto|
|common | New |wds.linkis.prometheus.enable | false| |
|common | Modify | wds.linkis.server.user.restful.uri.pass.auth | /api/rest_j/v1/actuator/prometheus| |
|common | modify | spring.spring.cloud.config.enabled | false | |

## DB Table Changes
For details, see the upgrade schema`db/upgrade/1.1.3_schema` file in the corresponding branch of the code repository (https://github.com/apache/incubator-linkis).