---
title: 【开发经验】Apache linkis +DSS 的编译到部署
authors: [huasir]
tags: [blog,linkis,dss]
---
### 背景

随着业务的发展，和社区产品的更新迭代，我们发现 linkis1.2.0和dss1.1.1能够更好的满足我们对实时数仓和机器学习需求。同时相较于我们目前使用的linkis0.9.3和dss0.7.0， 在任务调度方面和插件接入等方面也有很大的结构调整和设计优化。基于以上原因，我们现在需要将现有的版本进行升级，由于版本跨度较大，我们的升级思路是重部署新的版本，并将原有的业务数据进行迁移，如下是具体的实践操作，希望给大家带来参考。

### 获取源码
![](/static/Images/blog/resource-code.png)

```
 git clone git@github.com:yourgithub/incubator-linkis.git
 git clone git@github.com:yourgithub/DataSphereStudio.git
```
如果没有打算提交pr的开放人员，也可以在官方直接下载zip源码包

### 编译打包

#### 1. 确定版本配套
linkis: 1.2.0
dss: 1.1.0
hadoop: 3.1.1
spark: 2.3.2
hive: 3.1.0

#### 2. linkis1.2.0编译打包
```
git checkout -b release-1.2.0 origin/release-1.2.0
mvn -N install
mvn clean install -DskipTests
```

安装包路径：incubator-linkis/linkis-dist/target/apache-linkis-1.2.0-incubating-bin.tar.gz
为了适配我们自己的版本配套，需要调整pom并重新编译

1. 将mysql驱动mysql-connector-java的scope注释掉(incubator-linkis/pom.xml)
```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql.connector.version}</version>
<!-- <scope>test</scope> -->
</dependency>
```
2. 修改hadoop版本号(incubator-linkis/pom.xml)
```
<properties>
    <hadoop.version>3.1.1</hadoop.version>
</properties>
```

3. hadoop3 需要调整hadoop-hdfs的artifactId值(incubator-linkis/linkis-commons/linkis-hadoop-common/pom.xml)
```
<dependency>
    <groupId>org.apache.hadoop</groupId>
<!-- <artifactId>hadoop-hdfs</artifactId>-->
    <artifactId>hadoop-hdfs-client</artifactId>
</dependency>
```
4. 调整hive引擎的hive版本(incubator-linkis/linkis-engineconn-plugins/hive/pom.xml)
```
<properties>
    <hive.version>3.1.0</hive.version>
</properties>
```
5. linkis-metadata-query-service-hive的hive版本和hadoop版本也需要调整(incubator-linkis/linkis-public-enhancements/linkis-datasource/linkis-metadata-query/service/hive/pom.xml)
```
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <hive.version>3.1.1</hive.version>
    <hadoop.version>3.1.0</hadoop.version>
    <datanucleus-api-jdo.version>4.2.4</datanucleus-api-jdo.version>
</properties>
```
6. 调整spark引擎的spark版本(incubator-linkis/linkis-engineconn-plugins/spark/pom.xml)
```
<properties>
    <spark.version>2.3.2</spark.version>
</properties>
```
#### 3. links1.2.0管理端打包
```
cd incubator-linkis/linkis-web
npm install
npm run build
#如果比较慢可以用cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
```
安装包路径：incubator-linkis/linkis-web/apache-linkis-1.2.0-incubating-web-bin.tar.gz
#### 4. dss1.1.0编译打包
```
git checkout -b branch-1.1.0 origin/branch-1.1.0
mvn -N install
mvn clean install -DskipTests
```
安装包路径：DataSphereStudio/assembly/target/wedatasphere-dss-1.1.0-dist.tar.gz

#### 5. dss1.1.0前端编译打包
```
cd web/
npm install lerna -g
lerna bootstrap #安装依赖
```
安装包路径：DataSphereStudio/web/dist/

### 部署安装
#### 环境说明

| master             | slave1 | slave2 | slave3     | app                            |
|--------------------|--------|--------|------------|--------------------------------|
| linksi0.9.3,nginx  | mysql  |        | dss-0.7.0  |                                |
|                    |        |        |            | links1.20,dss1.1.0,nginx,mysql |
| hadoop             | hadoop | hadoop | hadoop     | hadoop                         |

说明：总共5台机器，大数据基础环境都已安装，hadoop，hive，spark等
先在app机器安装新版本links1.2.0, dss1.1.0.保留原有的linkis版本可用，待新的部署好以后，再对老版本的的数据进行迁移

#### 归集安装包

![](/static/Images/blog/collect-installation-package.png)

#### 安装mysql
```
docker pull mysql:5.7.40
docker run -it -d -p 23306:3306 -e MYSQL_ROOT_PASSWORD=app123 -d mysql:5.7.40
```
#### 安装linkis
```
tar zxvf apache-linkis-1.2.0-incubating-bin.tar.gz -C linkis
cd linkis
vi deploy-config/db.sh # 配置数据库
```
![](/static/Images/blog/install-linkis.png)

关键参数配置
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
安全保险执行一下chekcEnv.sh
```
bin]# ./checkEnv.sh
```
![](/static/Images/blog/check-env.png)
因为我本地使用的docker安装的mysql，所以需要额外安装一个mysql客户端
```
wget https://repo.mysql.com//mysql80-community-release-el7-7.noarch.rpm
rpm -Uvh mysql80-community-release-el7-7.noarch.rpm
yum-config-manager --enable mysql57-community
vi /etc/yum.repos.d/mysql-community.repo
#将mysql8的enable设置为0
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/6/$basearch/
enabled=1
gpgcheck=1
#安装
yum install mysql-community-server
```
尝试安装linkis
```
 sh bin/install.sh
```
![](/static/Images/blog/sh-bin-install-sh.png)
打开ambari的spark2的管理界面添加环境变量并重启spark2的相关服务
![](/static/Images/blog/advanced-spark2-env.png)
终于通过验证
![](/static/Images/blog/check-env1.png)
```
sh bin/install.sh
```
第一次安装，数据库需要初始化，直接选择2
![](/static/Images/blog/data-source-init-choose-2.png)

根据官网提示，需要自己下载mysql驱动包并放到对应目录下，我习惯查了一下，发现已经有mysql包了额，应当是之前编译的时候去掉了mysql scope的原因，但是版本不对，我们生产使用的是5.7，但是驱动是mysql8的驱动包。所以大家在编译的时候最好先调整mysql驱动版本。
![](/static/Images/blog/choose-true-mysql-version.png)

手动调整一下mysql驱动版本，降原来的高版本注释掉
```
wget  https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar
cp mysql-connector-java-5.1.49.jar lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-5.1.49.jar lib/linkis-commons/public-module/
mv mysql-connector-java-8.0.28.jar mysql-connector-java-8.0.28.jar.bak#需要cd到对应的lib下执行
sh sbin/linkis-start-all.sh
```
浏览器打开，http://app:20303/，共10个服务，好像没问题
![](/static/Images/blog/open-eureka-service.png)

#### 安装linkis-web
```
tar -xvf apache-linkis-1.2.0-incubating-web-bin.tar.gz -C linkis-web/
cd linkis-web
sh install.sh
```
第一次访问http://app:8088/#/login 报错403，经过查证需要修改nginx中conf个的部署用
```
cd /etc/nginx
vi nginx.conf
user  root; # 降默认的用户改成自己的root
nginx -s reload
```
再次访问，好像正确了额
![](/static/Images/blog/login.png)

查看默认的用户名和密码
```
cat LinkisInstall/conf/linkis-mg-gateway.properties
```
![](/static/Images/blog/linkis-mg-gateway.png)

登录linkis管理台
![](/static/Images/blog/linkis-console.png)

使用linkis-cli进行快速验证
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

管理台查看日志信息
![](/static/Images/blog/console-log-info.png)

我的的hive使用的是tez引擎，需要手动将tez引擎相关的包拷贝到hive插件的lib下
```
cp -r /usr/hdp/current/tez-client/tez-* ./lib/linkis-engineconn-plugins/hive/dist/v3.1.0/
sh sbin/linkis-daemon.sh restart cg-engineplugin
sh bin/linkis-cli -submitUser root -engineType hive-3.1.0 -codeType hql -code "show tables"
```

再次跑动，还是没运行起来，好像是缺失jackson的库
![](/static/Images/blog/miss-jackson-jar.png)

```
// 需要添linkis-commons/linkis-hadoop-common需要手动添加依赖，重新打包
       <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-yarn-common</artifactId>
            <version>${hadoop.version}</version>
        </dependency>
```

再次跑动，还是没运行起来，日志如下：
```
2022-11-09 18:09:44.009 ERROR Job with execId-LINKISCLI_root_hive_0 + subJobId : 51  execute failed,21304, Task is Failed,errorMsg: errCode: 12003 ,desc: app:9101_0 Failed  to async get EngineNode AMErrorException: errCode: 30002 ,desc: ServiceInstance(linkis-cg-engineconn, app:42164) ticketID:91f72f2a-598c-4384-9132-09696012d5b5 初始化引擎失败,原因: ServiceInstance(linkis-cg-engineconn, app:42164): log dir: /appcom/tmp/root/20221109/hive/91f72f2a-598c-4384-9132-09696012d5b5/logs,SessionNotRunning: TezSession has already shutdown. Application application_1666169891027_0067 failed 2 times due to AM Container for appattempt_1666169891027_0067_000002 exited with  exitCode: 1
```

从日志上看，是yarn的app运行异常，查看yarn的container日志：
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
日志上看结合百度相关资料，提示是guava的版本问题，首先先确认是否hive引擎中的guava版本和hadoop里的guava版本一致，如果一致
还有一种可能就是hive-exec的版本问题，因为我是用的ambari部署的hive，所以最好用ambari中的hive相关的jar替换掉插件引擎中相关的hive包。遇到的问题是后一种，花了很长时间才排查出。
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
再次跑动，运行成功，到此，linkis部署好像没有问题了额

### 安装DSS
说明：DSS因为是另外以为同事安装的，这里我就不再展示，具体可以参考官网的安装，这里我主要说明一下dss和linkis集成时遇到的问题。
1. dss 登录时，linkis-mg-gateway的日志显示 TooManyServiceException
   如图：
   ![](/static/Images/blog/install-dss.png)
   具体gateway中日志如下
```
2022-11-11 11:27:06.194 [WARN ] [reactor-http-epoll-6                    ] o.a.l.g.r.DefaultGatewayRouter (129) [apply] - org.apache.linkis.gateway.exception.TooManyServiceException: errCode: 11010 ,desc: Cannot find a correct serviceId for parsedServiceId dss, service list is: List(dss-framework-project-server, dss-apiservice-server, dss-scriptis-server, dss-framework-orchestrator-server-dev, dss-flow-entrance, dss-guide-server, dss-workflow-server-dev) ,ip: app ,port: 9001 ,serviceKind: linkis-mg-gateway
        at org.apache.linkis.gateway.route.DefaultGatewayRouter$$anonfun$org$apache$linkis$gateway$route$DefaultGatewayRouter$$findCommonService$1.apply(GatewayRouter.scala:101) ~[linkis-gateway-core-1.2.0.jar:1.2.0]
        at org.apache.linkis.gateway.route.DefaultGatewayRouter$$anonfun$org$apache$linkis$gateway$route$DefaultGatewayRouter$$findCommonService$1.apply(GatewayRouter.scala:100) ~[linkis-gateway-core-1.2.0.jar:1.2.0]
        at org.apache.linkis.gateway.route.AbstractGatewayRouter.findService(GatewayRouter.scala:70) ~[linkis-gatew
```
大概的意思就是找不到dss，无独有偶，我在dss中的plugin下面发现有一段gaeway parser代码，尝试拷贝到GatewayParser的parse方法的case COMMON_REGEX的前面，再根据编译提示引入需要依赖的方法，变量和包。如图：
![](/static/Images/blog/gateway-parse-code.png)

顺利登录（记得要重启linkis的mg-geteway服务）。

登录进去后如果发现报错，提示需要管理创建工作目录，可以在linkis-ps-publicservice.properties中配置如下属性，然后重启ps-publicservice服务
```
#LinkisInstall/conf/linkis-ps-publicservice.properties
#Workspace
linkis.workspace.filesystem.auto.create=true
```
