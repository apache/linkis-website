---
title: 版本总览
sidebar_position: 0.1
--- 
- [代理用户模式介绍](/architecture/proxy-user.md)
- [UDF函数介绍和使用指引](/user-guide/udf.md)
- [引擎物料刷新HTTP接口](/api/http/engineconn-plugin-refesh.md)
- [UDF相关的HTTP接口](/api/http/udf-api.md)
- [UDF相关的表结构](/table/udf-table.md)
- [openLooKeng的引擎的实现](/blog/2022/03/20/openlookeng)
- [openLooKeng的使用](/engine-usage/openlookeng.md)
- [版本的release-notes](/download/release-notes-1.1.1)

## 参数变化 


| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|ec-openlookeng | 新增  | linkis.openlookeng.engineconn.concurrent.limit        | 100|并发限制 |
|ec-openlookeng | 新增  | linkis.openlookeng.http.connectTimeout        | 60L   | 客户端请求的超时时间 基于OKhttp构建的http请求          |
|ec-openlookeng | 新增  | linkis.openlookeng.http.readTimeout          |60L |    客户端读取超时 基于OKhttp构建的http请求                             |
|ec-openlookeng | 新增  | linkis.openlookeng.url                       | http://127.0.0.1:8080| openlookeng服务                                  |
|ec-openlookeng | 新增  | linkis.openlookeng.catalog                  | system| catalog|
|ec-openlookeng | 新增  | linkis.openlookeng.schema                  |         | schema    |
|ec-openlookeng | 新增  | linkis.openlookeng.source                 |global| source  |                            |              

## 数据库表变化 

详细见代码仓库(https://github.com/apache/incubator-linkis) 对应分支中的升级schema`db/upgrade/1.1.1_schema`文件
