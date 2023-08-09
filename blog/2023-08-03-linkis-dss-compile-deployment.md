---
title: [Development Experience] Compilation to Deployment of Apache Linkis+DSS
authors: [Casion]
tags: [blog,linkis,dss]
---
### Background

With the development of our business and the updating and iteration of community products, we have found that linkis1.2.0 and dss1.1.1 can better meet our needs for real-time data warehousing and machine learning. Compared to the currently used linkis 0.9.3 and dss 0.7.0, there have been significant structural adjustments and design optimizations in task scheduling and plugin access. Based on the above reasons, we now need to upgrade the existing version. Due to the large version span, our upgrade idea is to redeploy a new version and migrate the original business data. The following are specific practical operations, hoping to provide reference for everyone.

### Obtain source code
![](/static/Images/blog/resource-code.png)

```
 git clone git@github.com:yourgithub/incubator-linkis.git
 git clone git@github.com:yourgithub/DataSphereStudio.git
```
If there are no developers who plan to submit PR, you can also download the zip source package directly from the official website
### Compile and package

#### 1. Determine version matching
linkis: 1.2.0
dss: 1.1.0
hadoop: 3.1.1
spark: 2.3.2
hive: 3.1.0

#### 2. linkis1.2.0Compile and package
```
git checkout -b release-1.2.0 origin/release-1.2.0
mvn -N install
mvn clean install -DskipTests
```

Installation package path: injector linkis/linkis list/target/apache linkis-1.2.0-incubating bin.tar.gz
In order to adapt to our own version, we need to adjust the pom and recompile it

1. Annotate the scope of mysql driver mysql connector java (input linkis/pom.xml)
```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql.connector.version}</version>
<!-- <scope>test</scope> -->
</dependency>
```
2. Modify the Hadoop version number (incubator linkis/pom.xml)
```
<properties>
    <hadoop.version>3.1.1</hadoop.version>
</properties>
```

3. hadoop3需要调整hadoop-hdfs的artifactId值（孵化器linkis/linkis-commons/linkis-hadoop-commons/pom.xml）
```
<dependency>
    <groupId>org.apache.hadoop</groupId>
<!-- <artifactId>hadoop-hdfs</artifactId>-->
    <artifactId>hadoop-hdfs-client</artifactId>
</dependency>
```
4. Adjust the hive version of the hive engine (incubator linkis/linkis engine conn plugins/live/pom. xml)
```
<properties>
    <hive.version>3.1.0</hive.version>
</properties>
```
5. The hive and hadoop versions of linkis metadata query service live also need to be adjusted (invoice linkis/linkis public enhancements/linkis datasource/linkis metadata query service live/pom. xml)
```
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <hive.version>3.1.1</hive.version>
    <hadoop.version>3.1.0</hadoop.version>
    <datanucleus-api-jdo.version>4.2.4</datanucleus-api-jdo.version>
</properties>
```
6. Adjust the Spark version of the Spark engine (invoice linkis/linkis engine conn plugins/park/pom. xml)
```
<properties>
    <spark.version>2.3.2</spark.version>
</properties>
```
#### 3. links1.2.0 Management end packaging
```
cd incubator-linkis/linkis-web
npm install
npm run build
#If it's slow, you can use cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
```
Installation package path：incubator-linkis/linkis-web/apache-linkis-1.2.0-incubating-web-bin.tar.gz
#### 4. dss1.1.0 Compile and package
```
git checkout -b branch-1.1.0 origin/branch-1.1.0
mvn -N install
mvn clean install -DskipTests
```
Installation package path：DataSphereStudio/assembly/target/wedatasphere-dss-1.1.0-dist.tar.gz

#### 5. dss1.1.0 Front end compilation and packaging
```
cd web/
npm install lerna -g
lerna bootstrap # Installation dependencies
```
Installation package path：DataSphereStudio/web/dist/

### Deployment Installation
#### Environmental Description

| master             | slave1 | slave2 | slave3     | app                            |
|--------------------|--------|--------|------------|--------------------------------|
| linksi0.9.3,nginx  | mysql  |        | dss-0.7.0  |                                |
|                    |        |        |            | links1.20,dss1.1.0,nginx,mysql |
| hadoop             | hadoop | hadoop | hadoop     | hadoop                         |

Note: A total of 5 machines have been installed in the basic environment of Big data, including hadoop, hive and spark
Install the new version of links1.2.0 and dss1.1.0 on the app machine first. Keep the original version of linkis available and wait for the new deployment before migrating the data from the old version

#### Collect installation package

![](/static/Images/blog/collect-installation-package.png)

#### Install MySQL
```
docker pull mysql:5.7.40
docker run -it -d -p 23306:3306 -e MYSQL_ROOT_PASSWORD=app123 -d mysql:5.7.40
```
#### Installing linkis
```
tar zxvf apache-linkis-1.2.0-incubating-bin.tar.gz -C linkis
cd linkis
vi deploy-config/db.sh # Configuration database
```
![](/static/Images/blog/install-linkis.png)

Key parameter configuration
```
deployUser=root
YARN_RESTFUL_URL=http://master:18088
#HADOOP
HADOOP_HOME=/usr/hdp/3.1.5.0-152/hadoop
HADOOP_CONF_DIR=/etc/hadoop/conf
#HADOOP_KERBEROS_ENABLE=true
#HADOOP_KEYTAB_PATH=/appcom/keytab/

#Hive
HIVE_HOME=/usr/hdp/3.1.5.0-152/hive
HIVE_CONF_DIR=/etc/hive/conf

#Spark
SPARK_HOME=/usr/hdp/3.1.5.0-152/spark2
SPARK_CONF_DIR=/etc/spark2/conf


## Engine version conf
#SPARK_VERSION
SPARK_VERSION=2.3.2

##HIVE_VERSION
HIVE_VERSION=3.1.0

## java application default jvm memory
export SERVER_HEAP_SIZE="256M"

##The decompression directory and the installation directory need to be inconsistent
#LINKIS_HOME=/root/linkis-dss/linkis
```
Implement safety insurance chekcEnv.sh
```
bin]# ./checkEnv.sh
```
![](/static/Images/blog/check-env.png)
Because I am using the Docker locally to install MySQL, I need to install an additional MySQL client
```
wget https://repo.mysql.com//mysql80-community-release-el7-7.noarch.rpm
rpm -Uvh mysql80-community-release-el7-7.noarch.rpm
yum-config-manager --enable mysql57-community
vi /etc/yum.repos.d/mysql-community.repo
#Set enable for mysql8 to 0
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/6/$basearch/
enabled=1
gpgcheck=1
#install
yum install mysql-community-server
```
Attempt to install linkis
```
 sh bin/install.sh
```
![](/static/Images/blog/sh-bin-install-sh.png)
Open the management interface of Spark2 in Ambari, add environment variables, and restart the related services of Spark2
![](/static/Images/blog/advanced-spark2-env.png)
Finally passed verification
![](/static/Images/blog/check-env1.png)
```
sh bin/install.sh
```
For the first installation, the database needs to be initialized. Simply select 2
![](/static/Images/blog/data-source-init-choose-2.png)

According to the official website prompt, you need to download the MySQL driver package yourself and place it in the corresponding directory. I used to check and found that there is already a MySQL package. It should be because the MySQL scope was removed during the previous compilation, but the version is incorrect. We are using 5.7 in production, but the driver is the MySQL 8 driver package. So it's best to adjust the MySQL driver version first when compiling.![](/static/Images/blog/choose-true-mysql-version.png)

Manually adjust the MySQL driver version to lower the previous higher version and comment it out

```
wget  https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar
cp mysql-connector-java-5.1.49.jar lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-5.1.49.jar lib/linkis-commons/public-module/
mv mysql-connector-java-8.0.28.jar mysql-connector-java-8.0.28.jar.bak#需要cd到对应的lib下执行
sh sbin/linkis-start-all.sh
```
Browser Open，http://app:20303/，There are a total of 10 services, and it seems like there is no problem
![](/static/Images/blog/open-eureka-service.png)

#### Installing linkis-web
```
tar -xvf apache-linkis-1.2.0-incubating-web-bin.tar.gz -C linkis-web/
cd linkis-web
sh install.sh
```
First visit http://app:8088/#/login Error 403 reported. After verification, it is necessary to modify the deployment of conf in nginx
```
cd /etc/nginx
vi nginx.conf
user  root; # Change the default user to their own root
nginx -s reload
```
Visiting again seems to be correct
![](/static/Images/blog/login.png)

View default username and password
```
cat LinkisInstall/conf/linkis-mg-gateway.properties
```
![](/static/Images/blog/linkis-mg-gateway.png)

Log in to the linkis management console
![](/static/Images/blog/linkis-console.png)

Quick verification using linkis cli
```
sh bin/linkis-cli -submitUser root -engineType hive-3.1.0 -codeType hql -code "show tables"

============Result:================
TaskId:5
ExecId: exec_id018008linkis-cg-entranceapp:9104LINKISCLI_root_hive_0
User:root
Current job status:FAILED
extraMsg:
errDesc: 21304, Task is Failed,errorMsg: errCode: 12003 ,desc: app:9101_4 Failed  to async get EngineNode AMErrorException: errCode: 30002 ,desc: ServiceInstance(linkis-cg-engineconn, app:34197) ticketID:24ab8eed-2a9b-4012-9052-ec1f64b85b5f 初始化引擎失败,原因: ServiceInsta

[INFO] JobStatus is not 'success'. Will not retrieve result-set.
```

Management Console View Log Information
![](/static/Images/blog/console-log-info.png)

My hive uses the Tez engine, and I need to manually copy the Tez engine related packages to the hive plugin's lib
```
cp -r /usr/hdp/current/tez-client/tez-* ./lib/linkis-engineconn-plugins/hive/dist/v3.1.0/
sh sbin/linkis-daemon.sh restart cg-engineplugin
sh bin/linkis-cli -submitUser root -engineType hive-3.1.0 -codeType hql -code "show tables"
```

Running again, but still not running, seems to be missing Jackson's library
![](/static/Images/blog/miss-jackson-jar.png)

```
// Links commons/links hadoop common needs to be added manually, dependencies need to be added and repackaged
       <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-yarn-common</artifactId>
            <version>${hadoop.version}</version>
        </dependency>
```

Running again, but still not running, the log is as follows:
```
2022-11-09 18:09:44.009 ERROR Job with execId-LINKISCLI_root_hive_0 + subJobId : 51  execute failed,21304, Task is Failed,errorMsg: errCode: 12003 ,desc: app:9101_0 Failed  to async get EngineNode AMErrorException: errCode: 30002 ,desc: ServiceInstance(linkis-cg-engineconn, app:42164) ticketID:91f72f2a-598c-4384-9132-09696012d5b5 初始化引擎失败,原因: ServiceInstance(linkis-cg-engineconn, app:42164): log dir: /appcom/tmp/root/20221109/hive/91f72f2a-598c-4384-9132-09696012d5b5/logs,SessionNotRunning: TezSession has already shutdown. Application application_1666169891027_0067 failed 2 times due to AM Container for appattempt_1666169891027_0067_000002 exited with  exitCode: 1
```

From the log, it appears that Yarn's app is running abnormally. Check Yarn's container log:
```
Log Type: syslog

Log Upload Time: Wed Nov 09 18:09:41 +0800 2022

Log Length: 1081

2022-11-09 18:09:39,073 [INFO] [main] |app.DAGAppMaster|: Creating DAGAppMaster for applicationId=application_1666169891027_0067, attemptNum=1, AMContainerId=container_e19_1666169891027_0067_01_000001, jvmPid=25804, userFromEnv=root, cliSessionOption=true, pwd=/hadoop/yarn/local/usercache/root/appcache/application_1666169891027_0067/container_e19_1666169891027_0067_01_000001, localDirs=/hadoop/yarn/local/usercache/root/appcache/application_1666169891027_0067, logDirs=/hadoop/yarn/log/application_1666169891027_0067/container_e19_1666169891027_0067_01_000001
2022-11-09 18:09:39,123 [ERROR] [main] |app.DAGAppMaster|: Error starting DAGAppMaster
java.lang.NoSuchMethodError: com.google.common.base.Preconditions.checkArgument(ZLjava/lang/String;Ljava/lang/Object;)V
	at org.apache.hadoop.conf.Configuration.set(Configuration.java:1358)
	at org.apache.hadoop.conf.Configuration.set(Configuration.java:1339)
	at org.apache.tez.common.TezUtilsInternal.addUserSpecifiedTezConfiguration(TezUtilsInternal.java:94)
	at org.apache.tez.dag.app.DAGAppMaster.main(DAGAppMaster.java:2432)
```
According to the logs combined with relevant information from Baidu, it is suggested that there is a version issue with Guava. First, confirm whether the Guava version in the hive engine is consistent with the Guava version in Hadoop. If it is consistent
Another possibility is the issue with the version of hive exec, as I deployed hive using Ambari. Therefore, it is best to replace the hive package in the plugin engine with the hive related jar in Ambari. The problem encountered was the latter, which took a long time to troubleshoot.
```
(base) [root@app lib]# pwd
/root/linkis-dss/linkis/LinkisInstall/lib/linkis-engineconn-plugins/hive/dist/v3.1.0/lib
(base) [root@app lib]# ls -l | grep hive
-rw-r--r-- 1 root root   140117 Nov 10 13:44 hive-accumulo-handler-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       43 Nov 10 13:44 hive-accumulo-handler.jar -> hive-accumulo-handler-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root   161078 Nov 10 13:44 hive-beeline-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       34 Nov 10 13:44 hive-beeline.jar -> hive-beeline-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root    11508 Nov 10 13:44 hive-classification-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       41 Nov 10 13:44 hive-classification.jar -> hive-classification-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root    45753 Nov 10 13:44 hive-cli-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       30 Nov 10 13:44 hive-cli.jar -> hive-cli-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root   509029 Nov 10 13:44 hive-common-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       33 Nov 10 13:44 hive-common.jar -> hive-common-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root   127200 Nov 10 13:44 hive-contrib-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       34 Nov 10 13:44 hive-contrib.jar -> hive-contrib-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root 51747254 Nov 10 13:44 hive-druid-handler-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       40 Nov 10 13:44 hive-druid-handler.jar -> hive-druid-handler-3.1.0.3.1.5.0-152.jar
-rw-r--r-- 1 root root 42780917 Nov 10 13:44 hive-exec-3.1.0.3.1.5.0-152.jar
lrwxrwxrwx 1 root root       31 Nov 10 13:44 hive-exec.jar -> hive-exec-3.1.0.3.1.5.0-152.jar
..................
```
Run again, run successfully, and there seems to be no problem with the deployment of Linkis

### Installing DSS
Explanation: Since DSS was installed by another colleague, I will not show it here. For details, please refer to the installation on the official website. Here, I will mainly explain the problems encountered during the integration of DSS and Linkis.
1. When logging in to dss, the log of linkis mg gateway displays TooManyServiceException
   As shown in the figure：
   ![](/static/Images/blog/install-dss.png)
   The specific logs in the gateway are as follows
```
2022-11-11 11:27:06.194 [WARN ] [reactor-http-epoll-6                    ] o.a.l.g.r.DefaultGatewayRouter (129) [apply] - org.apache.linkis.gateway.exception.TooManyServiceException: errCode: 11010 ,desc: Cannot find a correct serviceId for parsedServiceId dss, service list is: List(dss-framework-project-server, dss-apiservice-server, dss-scriptis-server, dss-framework-orchestrator-server-dev, dss-flow-entrance, dss-guide-server, dss-workflow-server-dev) ,ip: app ,port: 9001 ,serviceKind: linkis-mg-gateway
        at org.apache.linkis.gateway.route.DefaultGatewayRouter$$anonfun$org$apache$linkis$gateway$route$DefaultGatewayRouter$$findCommonService$1.apply(GatewayRouter.scala:101) ~[linkis-gateway-core-1.2.0.jar:1.2.0]
        at org.apache.linkis.gateway.route.DefaultGatewayRouter$$anonfun$org$apache$linkis$gateway$route$DefaultGatewayRouter$$findCommonService$1.apply(GatewayRouter.scala:100) ~[linkis-gateway-core-1.2.0.jar:1.2.0]
        at org.apache.linkis.gateway.route.AbstractGatewayRouter.findService(GatewayRouter.scala:70) ~[linkis-gatew
```
The general idea is that the dss cannot be found. Coincidentally, I found a piece of gawayParser code under the plugin in the dss and tried to copy it to the case COMMON of the parse method in the GatewayParser_ Before REGEX, introduce dependent methods, variables, and packages based on compilation prompts. As shown in the figure:
![](/static/Images/blog/gateway-parse-code.png)

Successfully logged in (remember to restart the mg geteway service on linkis).

If you find an error after logging in, you will be prompted to manage and create a Working directory. You can configure the following properties in linkis-ps-publicservice.properties, and then restart the ps publicservice service
```
#LinkisInstall/conf/linkis-ps-publicservice.properties
#Workspace
linkis.workspace.filesystem.auto.create=true
```
