---
title: Nebula
sidebar_position: 17
---

本文主要介绍在 `Linkis` 中，`Nebula` 引擎插件的安装、使用和配置。


## 1. 前置工作

### 1.1 引擎安装

如果您希望在您的 `Linkis` 服务上使用 `Nebula` 引擎，您需要安装 `Nebula` 服务并保证服务可用。

### 1.2 服务验证

```shell
#  执行任务
./usr/local/bin/nebula-console -u root -p password --address=graphd --port=9669

CREATE SPACE IF NOT EXISTS my_space_1 (vid_type=FIXED_STRING(30));SHOW SPACES;

# 得到如下输出代表服务可用
+--------------+
| Name         |
+--------------+
| "my_space_1" |
+--------------+
```

## 2. 引擎插件部署

### 2.1 引擎插件准备[非默认引擎](./overview.md)

单独编译引擎插件（需要有 `maven` 环境）

```
# 编译
cd ${linkis_code_dir}/linkis-engineconn-plugins/nebula/
mvn clean install
# 编译出来的引擎插件包，位于如下目录中
${linkis_code_dir}/linkis-engineconn-plugins/nebula/target/out/
```
[EngineConnPlugin 引擎插件安装](../deployment/install-engineconn.md)

### 2.2 引擎插件的上传和加载

将 2.1 中的引擎包上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
上传后目录结构如下所示
```
linkis-engineconn-plugins/
├── nebula
│   ├── dist
│   │   └── 3.0.0
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 3.0.0
```

### 2.3 引擎刷新

#### 2.3.1 重启刷新
通过重启 `linkis-cg-linkismanager` 服务刷新引擎
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 检查引擎是否刷新成功
可以查看数据库中的 `linkis_engine_conn_plugin_bml_resources` 这张表的`last_update_time` 是否为触发刷新的时间。

```sql
#登陆到 `linkis` 的数据库 
select * from linkis_cg_engine_conn_plugin_bml_resources;
```

## 3 引擎的使用

### 3.1 通过 `Linkis-cli` 提交任务 

```shell
sh ./bin/linkis-cli  -engineType nebula-3.0.0 -codeType nebula \
 -code 'CREATE SPACE IF NOT EXISTS my_space_1 (vid_type=FIXED_STRING(30));SHOW SPACES;' \
 -runtimeMap linkis.nebula.port=9669  -runtimeMap linkis.nebula.host=wds07
```

更多 `Linkis-Cli` 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

## 4. 引擎配置说明

### 4.1 默认配置说明

| 配置                                   | 默认值       | 是否必须          | 说明     |
| -------------------------------------- |-----------|-------------|--------|
| linkis.nebula.host               | 127.0.0.1 | 否 | host   |
| linkis.nebula.port | 9669      | 否           | 端口     |
| linkis.nebula.username | root      | 否           | 用户名    |
| linkis.nebula.password | nebula    | 否           | 密码     |
| linkis.nebula.max.conn.size | 100       | 否           | 最大连接数  |
| linkis.nebula.reconnect.enabled | false    | 否           | 连接断开后是否重试 |
| linkis.engineconn.concurrent.limit | 100       | 否           | 引擎最大并发数 |
| linkis.nebula.default.limit | 5000      | 否           | 结果集条数限制 |



