--- 
title: Version Overview 
sidebar_position: 0.1 
--- 

- [Supports Spark task submission Jar package function](./spark-submit-jar.md) 
- [Supports loading specific UDF by UDF ID](./load-udf-by-udfid.md) 
- [Multi-task fixed EC execution](./ec-fix-label.md) 
- [Eureka version metadata reporting](./eureka-version-metadata.md) 
- [Linkis Integration with OceanBase](/blog/2023/03/08/linkis-integration-with-oceanbase) 
- [version of Release-Notes](/download/release-notes-1.3.2) 



## Parameter change 

| module name (service name) | type | parameter name | default value | description | 
|------|-----|-------------------------------------|-----|------------------------------|
| mg-eureka | Add | eureka.instance.metadata-map.linkis.app.version | ${linkis.app.version} | Eureka metadata report Linkis application version information | 
| mg-eureka | Add | eureka. instance.metadata-map.linkis.conf.version | None | Eureka metadata report Linkis service version information | 
| mg-eureka | Modify | eureka.client.registry-fetch-interval-seconds | 8 | Eureka Client pull service registration Information interval time (seconds) | 
| mg-eureka | New | eureka.instance.lease-renewal-interval-in-seconds | 4 | The frequency (seconds) at which eureka client sends heartbeats to the server | | mg 
-eureka | New | eureka.instance.lease-expiration-duration-in-seconds | 12 | eureka waits for the next heartbeat timeout (seconds) | | 
EC-shell | modification | wds.linkis.engineconn.support.parallelism | true | whether to enable Parallel execution of shell tasks | 
| EC-shell | Modify | linkis.engineconn.shell.concurrent.limit | 15 | Concurrent number of shell tasks | 


## Database table changes
For details, see the upgrade schema `db/upgrade/1.3.2_schema` file in the corresponding branch of the code warehouse (https://github.com/apache/linkis)