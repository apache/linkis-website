---
title: Presto 引擎
sidebar_position: 11
---

本文主要介绍在 Linkis1.X 中，Presto 引擎的配置、部署和使用。

## 1. 环境准备

如果您希望在您的服务器上使用 Presto 引擎，您需要准备 Presto 连接信息，如 Presto 集群的连接地址、用户名和密码等

## 2. 部署和配置

### 2.1 版本的选择和编译
注意: 编译 Presto 引擎之前需要进行 Linkis 项目全量编译  
发布的安装部署包中默认不包含此引擎插件，
你可以按此指引部署安装 https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin
，或者按以下流程，手动编译部署


单独编译 Presto 引擎 

```
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/presto/
mvn clean install
```

### 2.2 物料的部署和加载

将 2.1 步编译出来的引擎包,位于
```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/jdbc/target/out/presto
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

[EngineConnPlugin引擎插件安装](../deployment/engine-conn-plugin-installation) 

### 2.2 Presto 引擎相关配置

| 配置                                   | 默认值                | 说明                                        |
| -------------------------------------- | --------------------- | ------------------------------------------- |
| wds.linkis.presto.url                  | http://127.0.0.1:8080 | Presto 集群连接                             |
| wds.linkis.presto.username             | default               | Presto 集群用户名                           |
| wds.linkis.presto.password             | 无                    | Presto 集群密码                             |
| wds.linkis.presto.catalog              | system                | 查询的 Catalog                              |
| wds.linkis.presto.schema               | 无                    | 查询的 Schema                               |
| wds.linkis.presto.source               | global                | 查询使用的 source                           |
| presto.session.query_max_total_memory  | 8GB                   | 查询使用最大的内存                          |
| wds.linkis.presto.http.connectTimeout  | 60                    | Presto 客户端的 connect timeout（单位：秒） |
| wds.linkis.presto.http.readTimeout     | 60                    | Presto 客户端的 read timeout（单位：秒）    |
| wds.linkis.engineconn.concurrent.limit | 100                   | Presto 引擎最大并发数                       |

