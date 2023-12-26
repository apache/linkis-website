---
title: HBase
sidebar_position: 15
---

# HBase 引擎使用文档

本文主要介绍在 `Linkis` 中，`HBase` 引擎插件的安装、使用和配置。

## 1. 前置工作

### 1.1 引擎验证

强烈建议您在执行 `HBase` 任务之前，检查下执行用户的这些环境变量。具体方式是
```
sudo su - ${username}
echo ${JAVA_HOME}
```

## 2. 引擎插件安装

### 2.1 引擎插件准备 [非默认引擎](./overview.md)

单独编译引擎插件（需要有 `maven` 环境）

```
# 编译
cd ${linkis_code_dir}/linkis-engineconn-plugins/hbase/
mvn clean install -DskipTests -Dhbase.profile=1.2|1.4|2.2|2.5

# hbase.profile 支持1.2|1.4|2.2|2.5，对应的HBase版本是1.2.0，1.4.3，2.2.6，2.5.3
# 默认hbase.profile=2.5，按需编译不同HBase版本的插件
# 编译出来的引擎插件包，位于如下目录中
${linkis_code_dir}/linkis-engineconn-plugins/hbase/target/out/
```

[EngineConnPlugin 引擎插件安装](../deployment/install-engineconn.md)

### 2.2 引擎插件的上传和加载

将 2.1 中的引擎插件包上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
上传后目录结构如下所示
```
linkis-engineconn-plugins/
├── hbase
│   ├── dist
│   │   └── 2.5.3
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 2.5.3
```
### 2.3 引擎刷新

#### 2.3.1 重启刷新
通过重启 `linkis-cg-linkismanager` 服务刷新引擎
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 检查引擎是否刷新成功
可以查看数据库中的 `linkis_engine_conn_plugin_bml_resources` 这张表的 `last_update_time` 是否为触发刷新的时间。

```sql
#登陆到linkis的数据库 
select * from linkis_cg_engine_conn_plugin_bml_resources;
```


## 3. HBase引擎的使用

`Linkis` 的 `HBase` 引擎是通过后台运行一个Jruby环境来执行hbase-shell中的指令，完全兼容hbase-shell的指令。


### 3.1 通过 `Linkis-cli` 提交任务

```shell
 sh bin/linkis-cli -engineType hbase-2.5.3 -code "list" \
  -codeType shell -runtimeMap linkis.hbase.zookeeper.quorum=zk1,zk2,zk3
```

更多 `Linkis-Cli` 命令参数参考： [`Linkis-Cli` 使用](../user-guide/linkiscli-manual.md)

HBase引擎，支持的连接参数有：

| 配置名称      | 备注及默认值信息   | 是否必须                                   |
|-----------------|----------------|----------------------------------------|
| linkis.hbase.zookeeper.quorum       | 连接hbase的zk地址，如：zk1,zk2,zk3， 默认值：localhost    | 必须                                   |
| linkis.hbase.zookeeper.property.clientPort     | 连接hbase的zk端口，默认值：2181 | 非必须，一般就是默认值                                     |
| linkis.zookeeper.znode.parent | 连接HBase的zk znode path，默认值：/hbase | 非必须，一般就是默认值                                   |
| linkis.hbase.rootdir      | HBase集群的hdfs根目录，默认值：/hbase  | 非必须，一般就是默认值                                     |
| linkis.hbase.security.authentication  | HBase集群连接的认证方式：simple|kerberos，默认值：simple  | 非必须，视自己集群情况定                                   |
| linkis.hbase.kerberos.principal  | HBase kerberos认证principal，如：hbase@HADOOP.LINKIS.COM  | kerberos认证方式下必须                                   |
| linkis.hbase.keytab.file  | HBase kerberos认证所需keytab文件地址，如：/tmp/hbase.keytab  | kerberos认证方式下必须                                 |
| linkis.hbase.kerberos.proxy.user  | kerberos代理用户，需保证kerberos认证用户有代理普通用户的权限  | 非必须，可以不用代理用户                                  |
| linkis.hbase.regionserver.kerberos.principal  | 如：hbase/_HOST@HADOOP.LINKIS.COM，自行从集群配置文件中获取  | kerberos认证方式下必须                                    |
| linkis.hbase.master.kerberos.principal  | 如：hbase/_HOST@HADOOP.LINKIS.COM，自行从集群配置文件中获取  | kerberos认证方式下必须                                    |
