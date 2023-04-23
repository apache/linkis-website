---
title: 版本总览
sidebar_position: 0.1
--- 

- [支持 Spark 任务提交 Jar 包功能](./spark-submit-jar.md)
- [支持通过UDF ID 加载特定的 UDF](./load-udf-by-udfid.md)
- [多任务固定 EC 执行](./ec-fix-label.md)
- [Eureka 版本元数据上报](./eureka-version-metadata.md)
- [移除 dss-gateway-support 依赖](./remove-dss-support.md)
- [修改系统初始化默认 Token](./update-token.md)
- [Linkis 整合 OceanBase](/blog/2023/03/08/linkis-integration-with-oceanbase)
- [版本的 Release-Notes](/download/release-notes-1.3.2)



## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| mg-eureka | 新增 | eureka.instance.metadata-map.linkis.app.version  | ${linkis.app.version} | Eureka元数据上报Linkis应用版本信息|
| mg-eureka | 新增 | eureka.instance.metadata-map.linkis.conf.version | 无 | Eureka元数据上报Linkis服务版本信息 |
| mg-eureka | 修改 | eureka.client.registry-fetch-interval-seconds | 8 | Eureka Client拉取服务注册信息间隔时间（秒） |
| mg-eureka | 新增 | eureka.instance.lease-renewal-interval-in-seconds | 4 | eureka client发送心跳给server端的频率（秒）|
| mg-eureka | 新增 | eureka.instance.lease-expiration-duration-in-seconds | 12 | eureka 等待下一次心跳的超时时间（秒）|
| EC-shell | 修改 | wds.linkis.engineconn.support.parallelism | true | 是否开启 shell 任务并行执行|
| EC-shell | 修改 | linkis.engineconn.shell.concurrent.limit | 15 | shell 任务并发数 |


## 数据库表变化 
详细见代码仓库(https://github.com/apache/linkis) 对应分支中的升级schema`db/upgrade/1.3.2_schema`文件
