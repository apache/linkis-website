---
title: 版本总览
sidebar_position: 0.1
--- 


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
