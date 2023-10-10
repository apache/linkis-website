---
title: version overview
sidebar_position: 0.1
---

- [Base engine dependencies, compatibility, default version optimization](./base-engine-compatibilty.md)
- [Hive engine connector supports concurrent tasks](./hive-engine-support-concurrent.md)
- [Support more datasources](../user-guide/datasource-manual#31-jdbc-datasource)
- [Spark ETL enhancements](./spark-etl.md)
- [Generate SQL from data source](./datasource-generate-sql.md)
- [linkis-storage supports S3 file system (experimental version)](../deployment/deploy-quick#343-s3-mode)
- [add postgresql database support (experimental version)](../deployment/deploy-quick#22-configuration database information)
- [Add impala engine support (experimental version)](../engine-usage/impala.md)
- [Other feature description](./other.md)
- [version of Release-Notes](/download/release-notes-1.4.0)

## Parameter changes

| module name (service name) | type | parameter name | default value | description |
| ----------- | ----- | ------------------------------- ------------------------- | ---------------- | ------- --------------------------------------------------- |
| mg-eureka | New | eureka.instance.metadata-map.linkis.app.version | ${linkis.app.version} | Eureka metadata reports Linkis application version information|
| mg-eureka | Add | eureka.instance.metadata-map.linkis.conf.version | None | Eureka metadata report Linkis service version information |
| mg-eureka | Modify | eureka.client.registry-fetch-interval-seconds | 8 | Eureka Client pull service registration information interval (seconds) |
| mg-eureka | New | eureka.instance.lease-renewal-interval-in-seconds | 4 | The frequency (seconds) at which the eureka client sends heartbeats to the server |
| mg-eureka | new | eureka.instance.lease-expiration-duration-in-seconds | 12 | eureka waits for the next heartbeat timeout (seconds)|
| EC-shell | Modify | wds.linkis.engineconn.support.parallelism | true | Whether to enable parallel execution of shell tasks |
| EC-shell | Modify | linkis.engineconn.shell.concurrent.limit | 15 | Concurrent number of shell tasks |
| Entrance | Modify | linkis.entrance.auto.clean.dirty.data.enable | true | Whether to clean dirty data at startup |



## Database table changes
For details, see the upgrade schema `db/upgrade/1.4.0_schema` file in the corresponding branch of the code warehouse (https://github.com/apache/linkis)