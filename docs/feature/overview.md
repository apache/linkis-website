--- 
title: Version Feature 
sidebar_position: 0.1 
--- 

- [hadoop, spark, hive default version upgraded to 3.x](./upgrade-base-engine-version.md)
- [Reduce compatibility issues of different versions of the base engine](./base-engine-compatibilty.md)
- [Hive engine connector supports concurrent tasks](./hive-engine-support-concurrent.md)
- [linkis-storage supports S3 and OSS file systems](./storage-add-support-oss.md)
- [Support more data sources](./spark-etl.md)
- [Add postgresql database support](/docs/deployment/deploy-quick.md)
- [Do not kill EC when ECM restarts](./ecm-takes-over-ec.md)
- [Spark ETL enhancements](./spark-etl.md)
- [version number and branch modification instructions](./version-and-branch-intro.md)
- [version of Release-Notes](/download/release-notes-1.4.0)

## Parameter changes

| module name (service name) | type | parameter name | default value | description |
| ----------- | ----- | ------------------------------- ------------------------- | ---------------- | ------- --------------------------------------------------- |
| mg-eureka | New | eureka.instance.metadata-map.linkis.app.version | ${linkis.app.version} | Eureka metadata reports Linkis application version information|
| mg-eureka | Add | eureka.instance.metadata-map.linkis.conf.version | None | Eureka metadata report Linkis service version information |
| mg-eureka | Modify | eureka.client.registry-fetch-interval-seconds | 8 | Eureka Client pull service registration information interval (seconds) |
| mg-eureka | New | eureka.instance.lease-renewal-interval-in-seconds | 4 | The frequency (seconds) at which the eureka client sends heartbeats to the server |
| mg-eureka | new | eureka.instance.lease-expiration-duration-in-seconds | 12 | eureka waits for the next heartbeat timeout (seconds) |
| EC-shell | Modify | wds.linkis.engineconn.support.parallelism | true | Whether to enable parallel execution of shell tasks |
| EC-shell | Modify | linkis.engineconn.shell.concurrent.limit | 15 | Concurrent number of shell tasks |


## Database table changes
For details, see the upgrade schema `db/upgrade/1.4.0_schema` file in the corresponding branch of the code warehouse (https://github.com/apache/linkis)