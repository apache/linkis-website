---
title: Flink 引擎
sidebar_position: 8
---

# Flink 引擎使用文档

本文主要介绍在 Linkis 中，flink 引擎插件的安装、使用和配置。

## 1. 前置工作
### 1.1 引擎环境配置

如果您希望在您的服务器上使用Flink引擎，您需要保证以下的环境变量已经设置正确并且引擎的启动用户是有这些环境变量的。

### 1.2引擎验证

强烈建议您在执行flink任务之前，检查下执行用户的这些环境变量。具体方式是
```
sudo su - ${username}
echo ${JAVA_HOME}
echo ${FLINK_HOME}
```

| 环境变量名      | 环境变量内容   | 备注                                   |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME       | JDK安装路径    | 必须                                   |
| HADOOP_HOME     | Hadoop安装路径 | 必须                                   |
| HADOOP_CONF_DIR | Hadoop配置路径 | Linkis启动Flink引擎采用的Flink on yarn的模式,所以需要yarn的支持。                                   |
| FLINK_HOME      | Flink安装路径  | 必须                                   |
| FLINK_CONF_DIR  | Flink配置路径  | 必须,如 ${FLINK_HOME}/conf                                   |
| FLINK_LIB_DIR  | Flink包路径  | 必须,${FLINK_HOME}/lib                                   |


## 2.引擎插件安装

### 2.1 引擎插件准备（二选一）

方式一：直接下载引擎插件包

[Linkis 引擎插件下载](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)

方式二：单独编译引擎插件（需要有 maven 环境）

```
# 编译
cd ${linkis_code_dir}/linkis-engineconn-plugins/flink/
mvn clean install
# 编译出来的引擎插件包，位于如下目录中
${linkis_code_dir}/linkis-engineconn-plugins/flink/target/out/
```

### 2.2 引擎插件的上传和加载

将 2.1 中的引擎插件包上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
上传后目录结构如下所示
```
linkis-engineconn-plugins/
├── flink
│   ├── dist
│   │   └── v1.12.2
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 1.12.2
```
### 2.3 引擎刷新

#### 2.3.1 重启刷新
通过重启 linkis-cg-linkismanager 服务刷新引擎
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 检查引擎是否刷新成功
可以查看数据库中的linkis_engine_conn_plugin_bml_resources这张表的last_update_time是否为触发刷新的时间。

```sql
#登陆到linkis的数据库 
select * from linkis_cg_engine_conn_plugin_bml_resources;
```


## 3.Flink引擎的使用

Linkis的Flink引擎是通过flink on yarn的方式进行启动的,所以需要指定用户使用的队列，如下图所示。

![yarn](./images/yarn-conf.png)  

### 3.1 通过Linkis-cli提交任务

```shell
sh ./bin/linkis-cli -engineType flink-1.12.2 -codeType sql -code "show tables"  -submitUser hadoop -proxyUser hadoop
```

更多 Linkis-Cli 命令参数参考： [Linkis-Cli 使用](../user-guide/linkiscli-manual.md)

### 3.2 通过ComputationEngineConn提交任务

FlinkSQL可以支持多种数据源,例如binlog,kafka,hive等,如果您想要在Flink代码中使用这些数据源，您需要将这些connector的插件jar包放置到flink引擎的lib中，并重启下Linkis的EnginePlugin服务。如你想要在您的FlinkSQL中使用binlog作为数据源，那么您需要将flink-connector-mysql-cdc-1.1.1.jar放置到flink引擎的lib中。

为了方便大家进行采样调试，我们在Scriptis新增了fql的脚本类型，专门用于执行FlinkSQL。但是需要保证您的DSS已经升级到DSS1.0.0。升级到DSS1.0.0之后，您可以直接进入Scriptis，新建fql脚本进行编辑和执行。

FlinkSQL的编写示例,以binlog为例
```sql
CREATE TABLE mysql_binlog (
 id INT NOT NULL,
 name STRING,
 age INT
) WITH (
 'connector' = 'mysql-cdc',
 'hostname' = 'ip',
 'port' = 'port',
 'username' = 'username',
 'password' = 'password',
 'database-name' = 'dbname',
 'table-name' = 'tablename',
 'debezium.snapshot.locking.mode' = 'none' --建议添加,不然会要求锁表
);
select * from mysql_binlog where id > 10;
```
在Scriptis中使用select语法进行调试的时候，Flink引擎会有一个自动cancel的机制，即到了指定的时间或者采样的行数到了指定的数量，Flink引擎将会主动将任务cancel，并且将已经获取到的结果集持久化，然后前端会调用打开结果集的接口将结果集在前端进行展示。

### 3.3 通过OnceEngineConn提交任务

OnceEngineConn的使用方式是用于正式启动Flink的流式应用,具体的是通过LinkisManagerClient调用LinkisManager的createEngineConn的接口，并将代码发给创建的Flink引擎，然后Flink引擎就开始执行，此方式可以被其他系统进行调用，比如Streamis。Client的使用方式也很简单，首先新建一个maven项目，或者在您的项目中引入以下的依赖
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
然后新建scala测试文件,点击执行，就完成了从一个binlog数据进行解析并插入到另一个mysql数据库的表中。但是需要注意的是，您必须要在maven项目中新建一个resources目录，放置一个linkis.properties文件，并指定linkis的gateway地址和api版本，如
```properties
wds.linkis.server.version=v1
wds.linkis.gateway.url=http://ip:9001/
```
```scala
object OnceJobTest {
  def main(args: Array[String]): Unit = {
    val sql = """CREATE TABLE mysql_binlog (
                | id INT NOT NULL,
                | name STRING,
                | age INT
                |) WITH (
                | 'connector' = 'mysql-cdc',
                | 'hostname' = 'ip',
                | 'port' = 'port',
                | 'username' = '${username}',
                | 'password' = '${password}',
                | 'database-name' = '${database}',
                | 'table-name' = '${tablename}',
                | 'debezium.snapshot.locking.mode' = 'none'
                |);
                |CREATE TABLE sink_table (
                | id INT NOT NULL,
                | name STRING,
                | age INT,
                | primary key(id) not enforced
                |) WITH (
                |  'connector' = 'jdbc',
                |  'url' = 'jdbc:mysql://${ip}:port/${database}',
                |  'table-name' = '${tablename}',
                |  'driver' = 'com.mysql.jdbc.Driver',
                |  'username' = '${username}',
                |  'password' = '${password}'
                |);
                |INSERT INTO sink_table SELECT id, name, age FROM mysql_binlog;
                |""".stripMargin
    val onceJob = SimpleOnceJob.builder().setCreateService("Flink-Test").addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY, "flink-1.12.2")
      .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY, "hadoop-Streamis").addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY, "once")
      .addStartupParam(Configuration.IS_TEST_MODE.key, true)
      //    .addStartupParam("label." + LabelKeyConstant.CODE_TYPE_KEY, "sql")
      .setMaxSubmitTime(300000)
      .addExecuteUser("hadoop").addJobContent("runType", "sql").addJobContent("code", sql).addSource("jobName", "OnceJobTest")
      .build()
    onceJob.submit()
    println(onceJob.getId)
    onceJob.waitForCompleted()
    System.exit(0)
  }
}
```
