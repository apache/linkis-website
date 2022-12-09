---
title: 版本特性
sidebar_position: 0.1
--- 
- [Trino 引擎使用说明](/engine-usage/trino.md)
- [Seatunnel 引擎使用说明](/engine-usage/seatunnel.md)
- [Linkis 管理台多数据源管理](/user-guide/control-panel/datasource-management.md)
- [多数据源使用](/user-guide/datasource-manual.md)
- [版本的 Release-Notes](/download/release-notes-1.3.1)


## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| es-trino | 新增 | linkis.trino.url                  | http://127.0.0.1:8080 | Trino 集群连接 URL                              |
| ec-trino | 新增 | linkis.trino.default.limit | 5000 | 结果集条数限制 |
| ec-trino | 新增 | linkis.trino.http.connectTimeout | 60 | 连接超时时间（秒） |
| ec-trino | 新增 | linkis.trino.http.readTimeout | 60 | 传输超时时间（秒）|
| ec-trino | 新增 | linkis.trino.resultSet.cache.max | 512k | 结果集缓冲区 |
| ec-trino | 新增 | linkis.trino.user | null | 用户名 |
| ec-trino | 新增 | linkis.trino.password | null | 密码 |
| ec-trino | 新增 | linkis.trino.passwordCmd | null | 密码回调命令 |
| ec-trino | 新增 | linkis.trino.catalog | system | Catalog |
| ec-trino | 新增 | linkis.trino.schema | null | Schema |
| ec-trino | 新增 | linkis.trino.ssl.insecured | false | 验证SSL证书 |
| ec-trino | 新增 | linkis.engineconn.concurrent.limit | 100 | 引擎最大并发数 |
| ec-trino | 新增 | linkis.trino.ssl.key.store | null | keystore路径 |
| ec-trino | 新增 | linkis.trino.ssl.keystore.password | null | keystore密码 |
| ec-trino | 新增 | linkis.trino.ssl.keystore.type | null | keystore类型 |
| ec-trino | 新增 | linkis.trino.ssl.truststore | null | truststore |
| ec-trino | 新增 | linkis.trino.ss..truststore.type | null  | trustore类型 |
| ec-trino | 新增 | linkis.trino.ssl.truststore.password | null | truststore密码 |
| ec-seatunnel | 新增 | wds.linkis.engine.seatunnel.plugin.home | /opt/linkis/seatunnel | Seatunnel安装路径 |

## 数据库表变化 
详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.3.1_schema`文件
