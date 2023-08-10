---
title: Practical Experience-Deploying Linkis1.1.1 and DSS1.1.0 based on CDH6.3.2
---
### Preface

With the development of business and the updating and iteration of community products, we have found that Linkis1. X has significant performance improvements in resource management and engine management, which can better meet the needs of data center construction. Compared to version 0.9.3 and the platform we used before, the user experience has also been greatly improved, and issues such as the inability to view details on task failure pages have also been improved. Therefore, we have decided to upgrade Linkis and the WDS suite. The following are specific practical operations, hoping to provide reference for everyone.

### 一、Environment
CDH6.3.2 Version of each component
- hadoop:3.0.0-cdh6.3.2
- hive:2.1.1-cdh6.3.2
- spark：2.4.8

#### Hardware
2台 128G Cloud physics machine

### 二、Linkis Installation Deployment

#### 2.1Compile code or release installation package？

This installation and deployment is using the release installation package method. In order to adapt to the CDH6.3.2 version within the company, the dependency packages related to Hadoop and hive need to be replaced with the CDH6.3.2 version. Here, the installation package is directly replaced. The dependent packages and modules that need to be replaced are shown in the following list.```
--Modules involved
linkis-engineconn-plugins/spark
linkis-engineconn-plugins/hive
/linkis-commons/public-module
/linkis-computation-governance/
```
```
-----List of CDH packages that need to be replaced
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hive-shims-0.23-2.1.1-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hive-shims-scheduler-2.1.1-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hadoop-annotations-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hadoop-auth-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hadoop-common-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hadoop-hdfs-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/spark/dist/v2.4.8/lib/hadoop-hdfs-client-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-client-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-mapreduce-client-common-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-mapreduce-client-jobclient-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-yarn-api-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-yarn-client-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-yarn-server-common-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-hdfs-client-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-mapreduce-client-core-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-mapreduce-client-shuffle-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/hive/dist/v2.1.1/lib/hadoop-yarn-common-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/flink/dist/v1.12.2/lib/hadoop-annotations-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/flink/dist/v1.12.2/lib/hadoop-auth-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/flink/dist/v1.12.2/lib/hadoop-mapreduce-client-core-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/flink/dist/v1.12.2/lib/hadoop-yarn-api-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/flink/dist/v1.12.2/lib/hadoop-yarn-client-3.0.0-cdh6.3.2.jar
./lib/linkis-engineconn-plugins/flink/dist/v1.12.2/lib/hadoop-yarn-common-3.0.0-cdh6.3.2.jar
./lib/linkis-commons/public-module/hadoop-annotations-3.0.0-cdh6.3.2.jar
./lib/linkis-commons/public-module/hadoop-auth-3.0.0-cdh6.3.2.jar
./lib/linkis-commons/public-module/hadoop-common-3.0.0-cdh6.3.2.jar
./lib/linkis-commons/public-module/hadoop-hdfs-client-3.0.0-cdh6.3.2.jar
./lib/linkis-computation-governance/linkis-cg-linkismanager/hadoop-annotations-3.0.0-cdh6.3.2.jar
./lib/linkis-computation-governance/linkis-cg-linkismanager/hadoop-auth-3.0.0-cdh6.3.2.jar
./lib/linkis-computation-governance/linkis-cg-linkismanager/hadoop-yarn-api-3.0.0-cdh6.3.2.jar
./lib/linkis-computation-governance/linkis-cg-linkismanager/hadoop-yarn-client-3.0.0-cdh6.3.2.jar
./lib/linkis-computation-governance/linkis-cg-linkismanager/hadoop-yarn-common-3.0.0-cdh6.3.2.jar
```
#### 2.2Problems encountered during deployment
1、Kerberos configuration
Need to add in the public configuration of linkis.properties
Each engine conf also needs to be added
```
wds.linkis.keytab.enable=true
wds.linkis.keytab.file=/hadoop/bigdata/kerberos/keytab
wds.linkis.keytab.host.enabled=false
wds.linkis.keytab.host=your_host
```
2、Starting an error after replacing the Hadoop dependency package: java.lang.NoClassDefFoundError:org/apache/commons/configuration2/Configuration
![](/Images/blog/hadoop-start-error.png)

Reason: Configuration class conflict, add a commons configuration 2-2.1.1.jar under the linkis commons module to resolve the conflict

3、Running Spark, Python, etc. in the script reports an error of no plugin for XXX
Phenomenon: After modifying the Spark/Python version in the configuration file, starting the engine reports an error of no plugin for XXX

![](/Images/blog/no-plugin-error.png)

Reason: The versions of the engine have been written dead in the LabelCommonConfig.java and GovernanceCommonConf.scala classes. The corresponding versions have been modified, and after compilation, all jars containing these two classes (linkis computation governance common-1.1.1. jar and linkis label common-1.1.1. jar) have been replaced in linkis and other components (including schedules)

4、Python engine execution error, initialization failed

- Modify Python. py and remove the introduction of Pandas module
- Configure the Python loading directory and modify the linkis engine conn properties of the Python engine
```
pythonVersion=/usr/local/bin/python3.6
```
5、Failed to run pyspark task and reported an error
![](/Images/blog/pyspark-task-error.png)

Reason: PYSPARK not set VERSION
Solution:
Set two parameters under/etc/profile

6、Error in executing pyspark task
java.lang.NoSuchFieldError: HIVE_STATS_JDBC_TIMEOUT

![](/Images/blog/pyspark-no-such-field-error.png)

Reason: Spark2.4.8 uses the hive1.2.1 package, but our hive has been upgraded to version 2.1.1. This parameter has been removed from hive2, and the code in Spark-SQL still needs to call this parameter of hive, resulting in an error,
So HIVE was removed from the spark SQL/live code_ STATS_ JDBC_ The TIMEOUT parameter is recompiled and packaged to replace the spark hive in Spark2.4.8_ 2.11-2.4.8.jar

7、Proxy user exception during jdbc engine execution

Phenomenon: User A was used to execute a jdbc task 1, and the engine selected it for reuse. Then, I also used User B to execute a jdbc task 2, and found that the submitter of task 2 was A
Analyze the reason:
ConnectionManager::getConnection

![](/Images/blog/jdbc-connection-manager.png)
When creating a datasource here, it is determined whether to create it based on the key, which is a jdbc URL. However, this granularity may be a bit large because different users may access the same datasource, such as hive. Their URLs are the same, but their account passwords are different. Therefore, when the first user creates a datasource, the username is already specified, and when the second user enters, When this data source was found to exist, it was directly used instead of creating a new datasource, resulting in the code submitted by user B being executed through A.
Solution: Reduce the key granularity of the data source cache map and change it to jdbc. URL+jdbc. user.

### 三、DSS deployment
Refer to the official website documentation for installation and configuration during the installation process. Below are some issues encountered during installation and debugging.

#### 3.1 DSS The database list displayed on the left is incomplete
Analysis: The database information displayed by the DSS data source module comes from the hive metabase, but due to permission control through Sentry in CDH6, most of the hive table metadata information does not exist in the hive metastore, so the displayed data is missing.
Solution:
Transform the original logic into using jdbc to link hive and obtain table data display from jdbc.
Simple logical description:
The properties information of jdbc is obtained through the IDE jdbc configuration information configured on the linkis console.
DBS: Obtain schema through connection. getMetaData()
TBS: connection. getMetaData(). getTables() Get the tables under the corresponding db
COLUMNS: Obtain the columns information of the table by executing describe table

#### 3.2 DSS Error in executing jdbc script in workflow jdbc.name is empty
Analysis: The default creator executed in dss workflow is Schedulis. Due to the lack of configuration of Schedulis related engine parameters in the management console, all read parameters are empty.
An error occurred when adding Schedulis' Category 'to the console, ”The Schedule directory already exists. Due to the fact that the creator in the scheduling system is schedule, it is not possible to add a Schedule Category. In order to better identify each system, the default creator executed in the dss workflow is changed to nodeexception. This parameter can be configured by adding the line wds. linkis. flow. ob. creator. v1=nodeexecution to the dss flow execution server. properties.