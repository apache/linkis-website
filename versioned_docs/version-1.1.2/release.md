---
title: Version Overview
sidebar_position: 0.1
---

- [Lite Deployment Without HDFS Mode](/deployment/deploy-linkis-without-hdfs.md)
- [Sqoop Engine Usage](/engine-usage/sqoop.md)
- [History Task Query HTTP Interface](/api/http/linkis-ps-publicservice-api/jobhistory-api.md)
- [Installation And Deployment of Tool Scriptis](/deployment/linkis-scriptis-install.md)
- [Release-Notes](/download/release-notes-1.1.2)

## Configuration Item 


| Module Name (Service Name) | Type | Parameter Name | Default Value | Description |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|common | New |linkis.codeType.runType.relation | sql=>sql\|hql\|jdbc\|hive\|psql\|fql,<br/>python=>python\|py\|pyspark,< br/>java=>java,scala=>scala,<br/>shell=>sh\|shell |mapping relationship between codeType and runType|
|rpc | New | linkis.rpc.spring.params.enable | false | Controls the ribbon mode parameter switch of the RPC module|
|ec | New | linkis.engineconn.max.parallelism |300 | Asynchronous execution supports setting the number of concurrent job groups |
|ec | New | linkis.engineconn.async.group.max.running | 10| |
|ec-flink | New | linkis.flink.execution.attached | true| |
|ec-flink | New | linkis.flink.kerberos.enable | false| |
|ec-flink | New | linkis.flink.kerberos.login.contexts | Client,KafkaClient| |
|ec-flink | New | linkis.flink.kerberos.login.keytab | | |
|ec-flink | New | linkis.flink.kerberos.login.principal | | |
|ec-flink | New | linkis.flink.kerberos.krb5-conf.path | | |
|ec-flink | New | linkis.flink.params.placeholder.blank | \\0x001| |
|ec-sqoop | New | sqoop.task.map.memory | 2| |
|ec-sqoop | New | sqoop.task.map.cpu.cores | 1| |
|ec-sqoop | New | sqoop.params.name.mode | sqoop.mode| |
|ec-sqoop | New | sqoop.params.name.prefix | sqoop.args.| |
|ec-sqoop | New | sqoop.params.name.env.prefix |sqoop.env.| |
|ec-sqoop | New | linkis.hadoop.site.xml |/etc/hadoop/conf/core-site.xml;<br/>/etc/hadoop/conf/hdfs- site.xml;<br/>/etc/hadoop/conf/yarn-site.xml;<br/>/etc/hadoop/conf/mapred-site.xml| set sqoop to load hadoop parameter file location|
|ec-sqoop | New | sqoop.fetch.status.interval |5s| Sets the interval for obtaining sqoop execution status |

## DB Table Changes
no change