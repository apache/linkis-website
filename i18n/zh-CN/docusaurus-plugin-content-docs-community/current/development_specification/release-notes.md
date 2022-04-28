---
title: Release-Notes 编写规范
sidebar_position: 9
---
每次版本发布前，需要由发布经理或则开发者，整理好本次版本的release-notes，来简要地描述了新版本更新中包含的特定更改。

为保持统一和方便编写，制定如下规范: 
- 需要有版本的总结，几句话总结性的描述本版本的核心主要变动点
- 按变化的功能点 以 新特性/增强点/修复功能/其他 四大类进行分类罗列
- 包含致谢栏:有参与本此版本贡献的同学，除了issue/pr外，以及任何参与到此次版本讨论/社群答疑/意见建议的同学
- 每条note的规范:`[服务名缩写-L1 maven module名][Linkis-pr/issues序号] 本次变动简要描述信息，能通过描述信息，大体知道这个功能的变化` `[服务名缩写-L1 maven module名]`作为一个标签,示例如下
- 同一类别（新特性/增强点/修复功能/其他）下， 服务名相同的放在一起，按pr/issues序号升序排列 
- 需要有对应的英文文档

```
服务名缩写：此pr的变动，在代码层面上，主要归属的服务对应的服务名缩写
比如某pr是对JDBC引擎做了bug修复，在代码层面上，它是linkis-cg-engineconn 服务下的JDBC模块
EG:[EC-Jdbc][[Linkis-1851]](https://github.com/apache/incubator-linkis/issues/1851) 修复jdbc引擎，一次任务执行中存在多条sql语句时无法正常执行的问题
若 L1 maven module 不存在，或则是整个服务级别的调整，下级模块可以不写，比如Entrance
```

## 常见的notes 标签
```html
linkis-mg-eureka              Eureka 
linkis-mg-gateway             Gataway 
linkis-cg-linkismanager       LM
linkis-cg-engineconnplugin    ECP
linkis-cg-engineconnmanager   ECM
linkis-cg-engineconn          EC
linkis-cg-entrance            Entrance
linkis-ps-publicservice       PS
linkis-ps-cs                  CS
linkis-ps-metadatamanager     MDM
linkis-ps-data-source-query   DSQ

Web管理台                      Web
安装                          Install
安装-脚本                     Install-Scripts
安装-SQL                      Install-Sql
安装-Web                      Install-Web
公共模块                       Common
```
