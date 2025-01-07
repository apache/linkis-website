---
title: Flink 引擎
sidebar_position: 8
---

# Flink 引擎使用文档

本文主要介绍在Linkis1.0中，flink引擎的配置、部署和使用。

## 1.Flink引擎使用前的环境配置

如果您希望在您的服务器上使用Flink引擎，您需要保证以下的环境变量已经设置正确并且引擎的启动用户是有这些环境变量的。

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

表1-1 环境配置清单

## 2.Flink引擎的配置和部署

### 2.1 Flink版本的选择和编译

Linkis1.0.2及以上支持的Flink版本是Flink1.12.2,理论上Linkis1.0.2+可以支持各个版本的Flink,但是Flink各个版本之前的API变化太大,可能需要您按照API的变化修改Linkis中flink引擎的代码并重新编译。

### 2.2 Flink engineConn部署和加载

Linkis Flink引擎默认在Linkis1.0.2+不会安装，需要您手动进行编译并进行安装。

```
单独编译flink的方式
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/flink/
mvn clean install
```
安装方式是将编译出来的引擎包,位置在
```bash
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/flink/target/flink-engineconn.zip
```
然后部署到
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
并重启linkis-engineplugin
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon restart cg-engineplugin
```
engineplugin更详细的介绍可以参看下面的文章。
https://github.com/WeBankFinTech/Linkis/wiki/EngineConnPlugin%E5%BC%95%E6%93%8E%E6%8F%92%E4%BB%B6%E5%AE%89%E8%A3%85%E6%96%87%E6%A1%A3

### 2.3 Flink引擎的标签

Linkis1.0是通过标签来进行的，所以需要在我们数据库中插入数据，插入的方式如下文所示。

[EngineConnPlugin引擎插件安装](../deployment/engine-conn-plugin-installation) 

## 3.Flink引擎的使用

### 准备操作，队列设置

Linkis1.0的Flink引擎是通过flink on yarn的方式进行启动的,所以需要指定用户使用的队列。指定队列的方式如图3-1所示。

![](/Images/EngineUsage/queue-set.png)

图3-1 队列设置

### 准备知识,Flink引擎的两种使用方式
Linkis的Flink引擎有两种执行方式，一种是ComputationEngineConn方式，该方式主要是在DSS-Scriptis或者Streamis-Datasource进行使用，用于调试采样，验证flink代码的正确性;另一种方式是OnceEngineConn方式，该方式主要是用于在Streamis生产中心用于启动一个流式应用。

### 准备知识，FlinkSQL的Connector插件
FlinkSQL可以支持多种数据源,例如binlog,kafka,hive等,如果您想要在Flink代码中使用这些数据源，您需要将这些connector的插件jar包放置到flink引擎的lib中，并重启下Linkis的EnginePlugin服务。如你想要在您的FlinkSQL中使用binlog作为数据源，那么您需要将flink-connector-mysql-cdc-1.1.1.jar放置到flink引擎的lib中。
```bash 
cd ${LINKS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```

### 3.1 ComputationEngineConn方式

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


### 3.2 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，Hive的使用如下：
```shell
sh ./bin/linkis-cli -engineType flink-1.12.2 -codeType sql -code "show tables"  -submitUser hadoop -proxyUser hadoop
```

具体使用可以参考： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).


### 3.3 OnceEngineConn方式

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