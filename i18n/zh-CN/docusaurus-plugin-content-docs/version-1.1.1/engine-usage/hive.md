---
title: Hive 引擎
sidebar_position: 2
---

本文主要介绍在Linkis1.X 中，Hive引擎的配置、部署和使用。

## 1.Hive引擎使用前的环境配置

如果您希望在您的服务器上使用hive引擎，您需要保证以下的环境变量已经设置正确并且引擎的启动用户是有这些环境变量的。

强烈建议您在执行hive任务之前，检查下执行用户的这些环境变量。

| 环境变量名      | 环境变量内容   | 备注 |
|-----------------|----------------|------|
| JAVA_HOME       | JDK安装路径    | 必须 |
| HADOOP_HOME     | Hadoop安装路径 | 必须 |
| HADOOP_CONF_DIR | Hadoop配置路径 | 必须 |
| HIVE_CONF_DIR  | Hive配置路径   | 必须 |

表1-1 环境配置清单

## 2.Hive引擎的配置和部署

### 2.1 Hive版本的选择和编译

Hive的版本是支持hive1.x和hive2.x，默认是支持hive on MapReduce，如果您想改成Hive
on Tez，需要您按照此pr进行一下修改。

<https://github.com/apache/incubator-linkis/pull/541>

默认支持的hive版本是1.2.1,如果您想修改hive的版本，比如想要修改成2.3.3，您可以找到linkis-engineplugin-hive模块，将\<hive.version\>标签进行改成2.3.3，然后单独编译此模块即可

### 2.2 hive engineConn部署和加载

如果您已经编译完了您的hive引擎的插件已经编译完成，那么您需要将新的插件放置到指定的位置中才能加载，具体可以参考下面这篇文章

[EngineConnPlugin引擎插件安装](../deployment/engine-conn-plugin-installation) 

### 2.3 hive引擎的标签

Linkis1.X是通过标签来进行的，所以需要在我们数据库中插入数据，插入的方式如下文所示。

[EngineConnPlugin引擎插件安装 > 2.2 管理台Configuration配置修改（可选）](../deployment/engine-conn-plugin-installation) 

## 3.hive引擎的使用

### 准备操作，队列设置

hive的MapReduce任务是需要用到yarn的资源，所以需要您在一开始就设置队列

![yarn](https://user-images.githubusercontent.com/29391030/168044735-99bc50cb-2521-4bc9-badb-305fd7cb82d6.png)    

图3-1 队列设置

您也可以通过在提交参数的StartUpMap里面添加队列的值：`startupMap.put("wds.linkis.rm.yarnqueue", "dws")`

### 3.1 通过Linkis SDK进行使用

Linkis提供了Java和Scala 的SDK向Linkis服务端提交任务. 具体可以参考 [JAVA SDK Manual](../user-guide/sdk-manual.md).
对于Hive任务你只需要修改Demo中的EngineConnType和CodeType参数即可:

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "hive-2.3.3"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "hql"); // required codeType
```

### 3.2 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，Hive的使用如下：
```shell
sh ./bin/linkis-cli -engineType hive-2.3.3 -codeType hql -code "show tables"  -submitUser hadoop -proxyUser hadoop
```
具体使用可以参考： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

### 3.3 Scriptis的使用方式

[Scriptis](https://github.com/WeBankFinTech/Scriptis)的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建hive脚本并编写hivesql代码

hive引擎的实现方式通过实例化hive的Driver实例，然后由Driver来提交任务，并获取结果集并展示。

![](/Images-zh/EngineUsage/hive-run.png)

图3-2 hivesql的执行效果截图

## 4.Hive引擎的用户设置

除了以上引擎配置，用户还可以进行自定义的设置，包括hive Driver进程的内存大小等。

![hive](https://user-images.githubusercontent.com/29391030/168044822-f217e4bb-a323-4837-bb26-fbfb6c138512.png)  

图4-1 hive的用户自定义配置管理台

## 5.Hive修改日志展示
默认的日志界面是不显示application_id以及task完成数量的,用户可以根据需要输出该日志
引擎内的log4j2-engineconn.xml/log4j2.xml配置文件中需要修改的代码块如下
1.appenders组件下需要添加
```xml
        <Send name="SendPackage" >
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M - %msg%xEx%n"/>
        </Send>
```
2.root组件下需要添加
```xml
        <appender-ref ref="SendPackage"/>
```
3.loggers组件下需要添加
```xml
        <logger name="org.apache.hadoop.hive.ql.exec.StatsTask" level="info" additivity="true">
            <appender-ref ref="SendPackage"/>
        </logger>
```
进行如上相关修改后日志可以增加任务task进度信息，显示为如下样式
```
2022-04-08 11:06:50.228 INFO  [Linkis-Default-Scheduler-Thread-3] SessionState 1111 printInfo - Status: Running (Executing on YARN cluster with App id application_1631114297082_432445)
2022-04-08 11:06:50.248 INFO  [Linkis-Default-Scheduler-Thread-3] SessionState 1111 printInfo - Map 1: -/-	Reducer 2: 0/1	
2022-04-08 11:06:52.417 INFO  [Linkis-Default-Scheduler-Thread-3] SessionState 1111 printInfo - Map 1: 0/1	Reducer 2: 0/1	
2022-04-08 11:06:55.060 INFO  [Linkis-Default-Scheduler-Thread-3] SessionState 1111 printInfo - Map 1: 0(+1)/1	Reducer 2: 0/1	
2022-04-08 11:06:57.495 INFO  [Linkis-Default-Scheduler-Thread-3] SessionState 1111 printInfo - Map 1: 1/1	Reducer 2: 0(+1)/1	
2022-04-08 11:06:57.899 INFO  [Linkis-Default-Scheduler-Thread-3] SessionState 1111 printInfo - Map 1: 1/1	Reducer 2: 1/1	
```

完整xml配置文件范例如下：
```xml
<!--
  ~ Copyright 2019 WeBank
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  -->
  
<configuration status="error" monitorInterval="30">
    <appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <ThresholdFilter level="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M - %msg%xEx%n"/>
        </Console>

        <Send name="Send" >
            <Filters>
                <ThresholdFilter level="WARN" onMatch="ACCEPT" onMismatch="DENY" />
            </Filters>
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M - %msg%xEx%n"/>
        </Send>

        <Send name="SendPackage" >
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M - %msg%xEx%n"/>
        </Send>

        <Console name="stderr" target="SYSTEM_ERR">
            <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY" />
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n"/>
        </Console>
    </appenders>

    <loggers>
      <root level="INFO">
            <appender-ref ref="stderr"/>
            <appender-ref ref="Console"/>
            <appender-ref ref="Send"/>
            <appender-ref ref="SendPackage"/>
        </root>
        <logger name="org.apache.hadoop.hive.ql.exec.StatsTask" level="info" additivity="true">
            <appender-ref ref="SendPackage"/>
        </logger>
        <logger name="org.springframework.boot.diagnostics.LoggingFailureAnalysisReporter" level="error" additivity="true">
            <appender-ref ref="stderr"/>
        </logger>
        <logger name="com.netflix.discovery" level="warn" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.apache.hadoop.yarn" level="warn" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.springframework" level="warn" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.apache.linkis.server.security" level="warn" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.apache.hadoop.hive.ql.exec.mr.ExecDriver" level="fatal" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.apache.hadoop.hdfs.KeyProviderCache" level="fatal" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.spark_project.jetty" level="ERROR" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.eclipse.jetty" level="ERROR" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.springframework" level="ERROR" additivity="true">
            <appender-ref ref="Send"/>
        </logger>
        <logger name="org.reflections.Reflections" level="ERROR" additivity="true">
            <appender-ref ref="Send"/>
        </logger>

        <logger name="org.apache.hadoop.ipc.Client" level="ERROR" additivity="true">
            <appender-ref ref="Send"/>
        </logger>

   </loggers>
</configuration>
```
