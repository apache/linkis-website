---
title: 版本总览
sidebar_position: 0.1
--- 

- [hadoop、spark、hive 默认版本升级为3.x](./upgrade-base-engine-version.md)
- [减少基础引擎不同版本兼容性问题](./base-engine-compatibilty.md)
- [Hive 引擎连接器支持并发任务](./hive-engine-support-concurrent.md)
- [linkis-storage 支持 S3 和 OSS 文件系统](./storage-add-support-oss.md)
- [支持更多的数据源](./spark-etl.md)
- [增加 postgresql 数据库支持](../deployment/deploy-quick.md)
- [ECM重启时不kill EC](./ecm-takes-over-ec.md)
- [Spark ETL 功能增强](./spark-etl.md)
- [版本号及分支修改说明](./version-and-branch-intro.md)
- [版本的 Release-Notes](/download/release-notes-1.4.0)

## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| mg-eureka | 新增 | eureka.instance.metadata-map.linkis.app.version  | ${linkis.app.version} | Eureka元数据上报Linkis应用版本信息|
| mg-eureka | 新增 | eureka.instance.metadata-map.linkis.conf.version | 无 | Eureka元数据上报Linkis服务版本信息 |
| mg-eureka | 修改 | eureka.client.registry-fetch-interval-seconds | 8 | Eureka Client拉取服务注册信息间隔时间（秒） |
| mg-eureka | 新增 | eureka.instance.lease-renewal-interval-in-seconds | 4 | eureka client发送心跳给server端的频率（秒）|
| mg-eureka | 新增 | eureka.instance.lease-expiration-duration-in-seconds | 12 | eureka 等待下一次心跳的超时时间（秒）|
| EC-shell  | 修改 | wds.linkis.engineconn.support.parallelism | true | 是否开启 shell 任务并行执行|
| EC-shell  | 修改 | linkis.engineconn.shell.concurrent.limit | 15 | shell 任务并发数 |


## 数据库表变化 
详细见代码仓库(https://github.com/apache/linkis) 对应分支中的升级schema`db/upgrade/1.4.0_schema`文件
