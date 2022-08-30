---
title: 版本总览
sidebar_position: 0.1
--- 

- [数据源管理服务架构文档](/architecture/public-enhancement-services/datasource-manager.md)
- [元数据查询服务架构文档](/architecture/public-enhancement-services/metadata-manager.md)
- [数据源介绍&功能使用指引](/deployment/start-metadatasource.md)
- [数据源客户端的使用指引](/user-guide/linkis-datasource-client.md)
- [数据源http接口文档](/api/http/data-source-manager-api.md)
- [元数据查询服务http接口文档](/api/http/metadatamanager-api.md)
- [开启SkyWalking功能](/deployment/involve-skywalking-into-linkis.md)
- [版本的release-notes](/download/release-notes-1.1.0)

## 参数变化 

| 模块名(服务名)| 类型  |     参数名                                                | 默认值                                                | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.lib.dir                    | /lib/linkis-public-enhancements/linkis-ps-metadatamanager/service | 设置需要加载数据源jar包的相对路径，会通过反射调用|
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.instance.expire-in-seconds | 60                                                    | 设置加载子服务的过期时间，超过该时间将不加载该服务           |
|ps-metadatamanager | 新增  | wds.linkis.server.dsm.app.name                           | linkis-ps-data-source-manager                         | 设置获取数据源信息的名称                                 |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.app.name                   | linkis-ps-metadatamanager                             | 设置元数据查询服务的服务名称                                  |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.kerberos.principle         | hadoop/HOST@EXAMPLE.COM                               | set kerberos principle for linkis-metadata hive service |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.user                       | hadoop                                                | 设置hive服务的访问用户                                    |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.kerberos.krb5.path         | ""                                                    | 设置hive服务使用的kerberos krb5 路径                     |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.temp.location              | classpath:/tmp                                        | 设置kafka与hive的临时路径                               |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.sql.driver                 | com.mysql.jdbc.Driver                                 | 设置mysql服务的驱动                                     |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.sql.url                    | jdbc:mysql://%s:%s/%s                                 | 设置mysql服务的url格式                                  |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.sql.connect.timeout        | 3000                                                  | 设置mysql服务连接mysql服务的连接超时时间                 |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.sql.socket.timeout         | 6000                                                  | 设置mysql服务打开mysql服务的socket超时时间              |
|ps-metadatamanager | 新增  | wds.linkis.server.mdm.service.temp.location              | /tmp/keytab                                           | 设置服务的本地临时存储路径，主要是存储从bml物料服务下载的认证文件 |
|ps-data-source-manager| 新增  | wds.linkis.server.dsm.auth.admin                      | hadoop                                                | datasourcemanager 部分接口权限验证用户  |
|cg-engineconnmanager| 修改  | wds.linkis.engineconn.max.free.time                     | 1h -> 0.5h                                           | EngineConn的最大空闲时间 从1h调至0.5h |

## 数据库表变化 

详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.1.0_schema`文件
