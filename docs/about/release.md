---
title: Version Overview
sidebar_position: 2
---

- [Supports spark task submission Jar package function](/engine-usage/spark.md)
- [Supports the Spark task to parse json configurations and perform ETL operations](/engine-usage/spark.md)
- [Supports loading specific UDFs by UDF ID](/user-guide/control-panel/udf-function.md)
- [Version Release-Notes](/download/release-notes-1.3.2)


## Parameter changes

| module name (service name) | type | parameter name | default value | description |
| ----------- | ----- | ------------------------- | ---------------- |-------------- |
| mg-eureka | new | eureka.instance.metadata-map.linkis.app.version  | ${linkis.app.version} | Eureka metadata Report Linkis application version information|
| mg-eureka | new | eureka.instance.metadata-map.linkis.conf.version | none | Eureka metadata Reports the Linkis service version |
| mg-eureka | update | eureka.client.registry-fetch-interval-seconds | 8 | Interval for the Eureka Client to retrieve service registration information (seconds) |
| mg-eureka | new | eureka.instance.lease-renewal-interval-in-seconds | 4 | Frequency at which the eureka client sends heartbeat messages to the server (in seconds) |
| mg-eureka | new | eureka.instance.lease-expiration-duration-in-seconds | 12 | eureka timeout for waiting for the next heartbeat (seconds) |

## Database table changes
For details, see the upgrade schema `db/upgrade/1.3.2_schema` file in the corresponding branch of the code warehouse (https://github.com/apache/linkis)
