---
title:  Flink Engine Usage
sidebar_position: 8
---

This article mainly introduces the configuration, deployment and use of the flink engine in Linkis1.0.

## 1. Environment configuration before Flink engine use

If you want to use the Flink engine on your server, you need to ensure that the following environment variables have been set correctly and that the user who started the engine has these environment variables.

It is strongly recommended that you check these environment variables of the executing user before executing flink tasks. The specific way is
```
sudo su-${username}
echo ${JAVA_HOME}
echo ${FLINK_HOME}
```

| Environment variable name | Environment variable content | Remarks |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME | JDK installation path | Required |
| HADOOP_HOME | Hadoop installation path | Required |
| HADOOP_CONF_DIR | Hadoop configuration path | Linkis starts the Flink on yarn mode used by the Flink engine, so yarn support is required. |
| FLINK_HOME | Flink installation path | Required |
| FLINK_CONF_DIR | Flink configuration path | Required, such as ${FLINK_HOME}/conf |
| FLINK_LIB_DIR | Flink package path | Required, ${FLINK_HOME}/lib |

Table 1-1 Environmental configuration list

## 2. Flink engine configuration and deployment

### 2.1 Flink version selection and compilation

The Flink version supported by Linkis 1.0.2 and above is Flink 1.12.2. In theory, Linkis 1.0.2+ can support various versions of Flink, but the API before each version of Flink has changed too much, and you may need to modify the flink engine in Linkis according to the API changes. Code and recompile.

### 2.2 Flink engineConn deployment and loading

The Linkis Flink engine will not be installed in Linkis 1.0.2+ by default, and you need to compile and install it manually.

```
The way to compile flink separately
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/flink/
mvn clean install
```
The installation method is to compile the engine package, the location is
```bash
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/flink/target/flink-engineconn.zip
```
Then deploy to
```bash
${LINKIS_HOME}/lib/linkis-engineplugins
```
And restart linkis-engineplugin
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon restart cg-engineplugin
```
A more detailed introduction to engineplugin can be found in the following article.
[EngineConnPlugin Installation](../deployment/engine-conn-plugin-installation) 

### 2.3 Flink engine tags

Linkis1.0 is done through tags, so we need to insert data in our database, the way of inserting is shown below.

[EngineConnPlugin Installation > 2.2 Configuration modification of management console (optional)](../deployment/engine-conn-plugin-installation) 

## 3. The use of Flink engine

### Preparation operation, queue setting

The Flink engine of Linkis 1.0 is started by flink on yarn, so you need to specify the queue used by the user. The way to specify the queue is shown in Figure 3-1.

![](/Images/EngineUsage/queue-set.png)

Figure 3-1 Queue settings

### Prepare knowledge, two ways to use Flink engine
Linkis’ Flink engine has two execution methods. One is the ComputationEngineConn method, which is mainly used in DSS-Scriptis or Streamis-Datasource for debugging sampling and verifying the correctness of the flink code; the other is the OnceEngineConn method , This method is mainly used to start a streaming application in the Streamis production center.

### Prepare knowledge, Connector plug-in of FlinkSQL
FlinkSQL can support a variety of data sources, such as binlog, kafka, hive, etc. If you want to use these data sources in Flink code, you need to put the plug-in jar packages of these connectors into the lib of the flink engine, and restart Linkis EnginePlugin service. If you want to use binlog as a data source in your FlinkSQL, then you need to put flink-connector-mysql-cdc-1.1.1.jar into the lib of the flink engine.
```bash
cd ${LINKS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```

### 3.1 ComputationEngineConn method

In order to facilitate sampling and debugging, we have added a script type of fql to Scriptis, which is specifically used to execute FlinkSQL. But you need to ensure that your DSS has been upgraded to DSS1.0.0. After upgrading to DSS1.0.0, you can directly enter Scriptis and create a new fql script for editing and execution.

FlinkSQL writing example, taking binlog as an example
```sql
CREATE TABLE mysql_binlog (
 id INT NOT NULL,
 name STRING,
 age INT
) WITH (
 'connector' ='mysql-cdc',
 'hostname' ='ip',
 'port' ='port',
 'username' ='username',
 'password' ='password',
 'database-name' ='dbname',
 'table-name' ='tablename',
 'debezium.snapshot.locking.mode' ='none' - It is recommended to add, otherwise the table will be locked
);
select * from mysql_binlog where id> 10;
```
When debugging with select syntax in Scriptis, the Flink engine will have an automatic cancel mechanism, that is, when the specified time is reached or the number of sampled rows reaches the specified number, the Flink engine will actively cancel the task, and it will have been obtained The result set of is persisted, and then the front end will call the interface to open the result set to display the result set on the front end.

### 3.2 Task submission via Linkis-cli

After Linkis 1.0, a cli method is provided to submit tasks. We only need to specify the corresponding EngineConn and CodeType tag types. The use of Hive is as follows:
```shell
sh ./bin/linkis-cli -engineType flink-1.12.2 -codeType sql -code "show tables" -submitUser hadoop -proxyUser hadoop
```

For specific usage, please refer to: [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 OnceEngineConn method

The use of OnceEngineConn is to officially start Flink's streaming application. Specifically, it calls LinkisManager's createEngineConn interface through LinkisManagerClient, and sends the code to the created Flink engine, and then the Flink engine starts to execute. This method can be used by other systems. Make a call, such as Streamis. The use of Client is also very simple, first create a new maven project, or introduce the following dependencies in your project
```xml
<dependency>
    <groupId>com.webank.wedatasphere.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
Then create a new scala test file, click Execute to complete the analysis from one binlog data and insert it into another mysql database table. But it should be noted that you must create a new resources directory in the maven project, place a linkis.properties file, and specify the gateway address and api version of linkis, such as
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