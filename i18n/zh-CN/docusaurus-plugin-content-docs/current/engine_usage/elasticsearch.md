---
title: ElasticSearch 引擎
sidebar_position: 11
---

本文主要介绍在 Linkis1.X 中，ElasticSearch 引擎的配置、部署和使用。

## 1. 环境准备

如果您希望在您的服务器上使用 ElasticSearch 引擎，您需要准备 ElasticSearch 连接信息，如 ElasticSearch 集群的连接地址、用户名和密码等

## 2. 部署和配置

### 2.1 版本的选择和编译
注意: 编译 ElasticSearch 引擎之前需要进行 Linkis 项目全量编译  
发布的安装部署包中默认不包含此引擎插件，
你可以按此指引部署安装 https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin
，或者按以下流程，手动编译部署

单独编译 ElasticSearch 引擎 

```
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/elasticsearch/
mvn clean install
```

### 2.2 物料的部署和加载

将 2.1 步编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/jdbc/target/out/elasticsearch
```
上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
并重启linkis-engineplugin（或则通过引擎接口进行刷新）
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
### 2.3 引擎的标签

Linkis1.X是通过标签来进行的，所以需要在我们数据库中插入数据，插入的方式如下文所示。

[EngineConnPlugin引擎插件安装](../deployment/engine_conn_plugin_installation) 

### 2.2 ElasticSearch 引擎相关配置

| 配置                     | 默认值              | 说明                                     |
| ------------------------ | ------------------- | ---------------------------------------- |
| linkis.es.cluster        | 127.0.0.1:9200      | ElasticSearch 集群，多个节点使用逗号分隔 |
| linkis.es.username       | 无                  | ElasticSearch 集群用户名                 |
| linkis.es.password       | 无                  | ElasticSearch 集群密码                   |
| linkis.es.auth.cache     | false               | 客户端是否缓存认证                       |
| linkis.es.sniffer.enable | false               | 客户端是否开启 sniffer                   |
| linkis.es.http.method    | GET                 | 调用方式                                 |
| linkis.es.http.endpoint  | /_search            | JSON 脚本调用的 Endpoint                 |
| linkis.es.sql.endpoint   | /_sql               | SQL 脚本调用的 Endpoint                  |
| linkis.es.sql.format     | {"query":"%s"} | SQL 脚本调用的模板，%s 替换成 SQL 作为请求体请求Es 集群 |
| linkis.es.headers.* | 无 | 客户端 Headers 配置 |
| linkis.engineconn.concurrent.limit | 100 | 引擎最大并发 |
