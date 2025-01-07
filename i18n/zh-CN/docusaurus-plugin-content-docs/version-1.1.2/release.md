---
title: 版本总览
sidebar_position: 0.1
--- 
- [无HDFS模式的精简化部署指引](/deployment/deploy-linkis-without-hdfs.md)
- [Sqoop引擎的使用](/engine-usage/sqoop.md)
- [历史任务查询HTTP接口](/api/http/linkis-ps-publicservice-api/jobhistory-api.md)
- [工具Scriptis的安装部署](/deployment/linkis-scriptis-install.md)
- [版本的release-notes](/download/release-notes-1.1.2)

## 参数变化 


| 模块名(服务名)| 类型  |     参数名                                                | 默认值             | 描述                                                    |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|common   | 新增   |linkis.codeType.runType.relation             | sql=>sql\|hql\|jdbc\|hive\|psql\|fql,<br/>python=>python\|py\|pyspark,<br/>java=>java,scala=>scala,<br/>shell=>sh\|shell |codeType和runType的映射关系|
|rpc      | 新增  | linkis.rpc.spring.params.enable             | false   | 控制RPC模块的ribbon模式参数开关|
|ec       | 新增  | linkis.engineconn.max.parallelism           |300 |    异步执行支持设置并发作业组数     |
|ec       | 新增  | linkis.engineconn.async.group.max.running   | 10|                                   |
|ec-flink | 新增  | linkis.flink.execution.attached                 | true|                                 |
|ec-flink | 新增  | linkis.flink.kerberos.enable                    | false|                                |
|ec-flink | 新增  | linkis.flink.kerberos.login.contexts            | Client,KafkaClient|                  |
|ec-flink | 新增  | linkis.flink.kerberos.login.keytab              | |                                   |
|ec-flink | 新增  | linkis.flink.kerberos.login.principal           | |                                   |
|ec-flink | 新增  | linkis.flink.kerberos.krb5-conf.path            | |                                   |
|ec-flink | 新增  | linkis.flink.params.placeholder.blank           | \\0x001|                            |
|ec-sqoop | 新增  | sqoop.task.map.memory                           | 2|                                 |
|ec-sqoop | 新增  | sqoop.task.map.cpu.cores                        | 1|                                 |
|ec-sqoop | 新增  | sqoop.params.name.mode                         | sqoop.mode|                        |
|ec-sqoop | 新增  | sqoop.params.name.prefix                        | sqoop.args.|                     |
|ec-sqoop | 新增  | sqoop.params.name.env.prefix                    |sqoop.env.|                     |             
|ec-sqoop | 新增  | linkis.hadoop.site.xml                     |/etc/hadoop/conf/core-site.xml;<br/>/etc/hadoop/conf/hdfs-site.xml;<br/>/etc/hadoop/conf/yarn-site.xml;<br/>/etc/hadoop/conf/mapred-site.xml|  设置sqoop加载hadoop参数文件位置                   |          
|ec-sqoop | 新增  | sqoop.fetch.status.interval                    |5s|            设置获取sqoop执行状态的间隔时间         |                       

## 数据库表变化 

无变化
