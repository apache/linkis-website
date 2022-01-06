---
title: Quick Deployment
sidebar_position: 1
---
#### Hint：If you want to experience the entire LINKIS bucke：DSS + Linkis + Qualitis + Visualis + Azkaban, visit[DSSS key deployment](https://github.com/WeBankFinTech/DataSphereStudio/blob/master/docs/zh_CN/ch2/DSS_LINKIS_Quick_Install.md)

## Determine the installation environment

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis根据安装的难易程度，提供了以下三种安装环境的准备方式，其区别如下：

----

**Streamlined version**：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minimum environmental dependence, single node installation mode contains only Python engines, only the user Linux environment supports Python.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please note that：is only allowed to submit Python scripts.


----

**Simple version**：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Depending on Python, Hadoop and Hive, distributed setup mode with Python and Hive engines and requiring the user Linux environment to first install Hadoop and Hive.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Simple version allows users to submit HiveQL and Python scripts.


----

**Standard Version**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Depends on Python, Hadoop, Hive and Spark, distributed setup modes, including Python, Hive Engine and Spark engines, requiring the user's Linux environments to first install Hadoop, Hive and Spark, Linkis machines that rely on cluster hadoop/hive/spark configuration files and do not need to deploy together with DataNode and NameNode machines on separate Client machines.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Standard versions allow users to submit Spark scripts (including SparkSQL, Pyspark and Scala), HiveQL and Python scripts. **请注意：安装标准版需要机器内存在10G以上** 如果机器内存不够，需要添加或者修改环境变量：`export SERVER_HEAP_SIZE="512M"`


----

## 2 Streamlining Linkis environment preparation

### Basic software installation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The following software must be loaded：

- MySQL (5.5+),[how to install MySQL](https://www.runoob.com/mysql/mysql-install.html)
- JDK (1.8.0_more than 141),[how to install JDK](https://www.runoob.com/java/java-environment-setup.html)
- Python (2.x and 3.x supported),[how to install Python](https://www.runoob.com/python/python-install.html)

### 2.2 Create User

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g. **Deploy user is hadoop**

1. Create a deployment user on a deployment machine to install

```bash
    sudo useradd hadoop  
```

2. Since Linkis services are used to switch engines in the form of sudo -u ${linux-user} to perform assignments, deployment of users requires sudo permissions and is free from encryption.

```bash
    v/etc/sudoers
```


         hadoop ALL=(ALL) NOPASSWD: NOPASSWD: ALL

3. **If your Python wants to have drawing features, it will be necessary to install the node and install the image module**.Command below：

```bash
    python -m pip install match
```

### 2.3 Installation package preparation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Download the latest installation package from Linkis released ([click here to enter the download page](https://github.com/apache/incubator-linkis/releases)).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Uninstall the package to the installation directory before changing the configuration of the unpacked file.

```bash   
    tar -xvf wedatasphere-linkis-x.x.x-dist.tar.gz
```

   (1) Modify base configuration

```bash
    vi conf/config.sh   
```

```properties
    SSH_PORT=22 #Specify SSH port if one-machine version installation is unconfigured
    deEmployUser=hadoop #Designated Deployer
    LINKIS_INKIS_INSTAL_HOME=/appcom/Install/Linkis # Specified Installation Directory
    WORKSPACE_USER_ROOT_PATH=file://tmp/hadoop # Specify user roots, which are typically used to store user scripts files and log files, etc. are user's workspace.
    RESULT_SET_ROOT_PATH=file://tmp/linkis # resultset file path to store Job's resultset file
    #HDF_USER_ROOT_PATH=hdfs://tmp/linkis #Simplified installation requires comment on this parameter
```

   (2) Modify database configuration

```bash   
    vi conf/db.sh 
```

```properties         
    # Setup connection information for database
    # includes IP address, database name, username, port
    # primarily used to store user custom variables, configuration parameters, UDF and widgets, as well as to provide access to Job History bottom storage
    MYSQL_HOST=
    MYSQL_PORT=
    MYSQL_DB=
    MYSQL_USER=
    MYSQL_PASSWORD=

 ```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Environment is ready. Tap me to [5 - Install Deployment](#5-安装部署)


## 3 Simple version of Linkis Environment Preparedness

### 3.1 Basic Software Installation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The following software must be loaded：

- MySQL (5.5+),[how to install MySQL](https://www.runoob.com/mysql/mysql-install.html)
- JDK (1.8.0_more than 141),[how to install JDK](https://www.runoob.com/java/java-environment-setup.html)
- Python (2.x and 3.x supported),[how to install Python](https://www.runoob.com/python/python-install.html)
- Hadoop (**Community version and CDH3.0 are supported**
- Hive(1.2.1,**version 2.0 and above, there may be compatibility problems**

### 3.2 Create User

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g. **Deploy user is hadoop**

1. Create a deployment user on all machines that need to be deployed to install

```bash
    sudo useradd hadoop
```

2. Since Linkis services are used to switch engines in the form of sudo -u ${linux-user} to perform assignments, deployment of users requires sudo permissions and is free from encryption.

```bash
    v/etc/sudoers
```


         hadoop ALL=(ALL) NOPASSWD: NOPASSWD: ALL

3. **Sets the following global environment variables in each of the installed nodes to enable Linkis to use Hadoop and Hive properly**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Modify installed user .bash_rc, the following command is：

```bash     
    vim /home/hadoop/.bash_rc
```


    Below is an environmental variable example：

```bash
    #JDK
    export JAVA_HOME=/nemo/jdk1.8.0_141
    #HADOOP  
    export HADOOP_HOME=/appcom/Install/hadoop
    export HADOOP_CONF_DIR=/appcom/config/hadoop-config
    #Hive
    export HIVE_HOME=/appcom/Install/hive
    export HIVE_CONF_DIR=/appcom/config/hive-config
```

### 3.3 SSH decryption configuration (distribution mode must)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This step can be skipped if your Linkis is deployed on the same server.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If your Linkis is deployed on multiple servers, you also need to configure ssh/free login for these servers.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How to configure SSH free login](https://www.jianshu.com/p/0922095f69f3)

### 3.4 Package preparation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Download the latest installation package from Linkis released ([click here to enter the download page](https://github.com/apache/incubator-linkis/releases)).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Uninstall the package to the installation directory before changing the configuration of the unpacked file.

```bash   
    tar -xvf wedatasphere-linkis-x.x.x-dist.tar.gz
```

   (1) Modify base configuration

```bash
    vi /conf/config.sh   
```

```properties

    EmployerUser=hadoop #Designated Deployed User
    LINKIS_INSTAT_HOME=/appcom/Install/Linkis # Specify Installation Directory
    WORKSPACE_USER_ROOT_PATH=file:// tmp/hadoop # Specify User Root directory, commonly used to store user scripts and log files etc. are user's workspace.
    HDFS_USER_ROOT_PATH=hdfs:///tmp/linkis   # 指定用户的HDFS根目录，一般用于存储Job的结果集文件

    # 如果您想配合Scriptis一起使用，CDH版的Hive，还需要配置如下参数（社区版Hive可忽略该配置）
    HIVE_META_URL=jdbc://...   # HiveMeta元数据库的URL
    HIVE_META_USER=   # HiveMeta元数据库的用户
    HIVE_META_PASSWORD=    # HiveMeta元数据库的密码

    # 配置hadoop/hive/spark的配置目录 
    HADOOP_CONF_DIR=/appcom/config/hadoop-config  #hadoop的conf目录
    HIVE_CONF_DIR=/appcom/config/hive-config   #hive的conf目录
```

   (2) Modify database configuration

```bash   
       vi conf/db.sh 
```

```properties    

    # Setup connection information for database
    # includes IP address, database name, username, port
    # primarily used to store user custom variables, configuration parameters, UDF and widgets, as well as to provide access to Job History bottom storage
    MYSQL_HOST=
    MYSQL_PORT=
    MYSQL_DB=
    MYSQL_USER=
    MYSQL_PASSWORD=

 ```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Environment is ready. Tap me to  [5 - Install Deployment](#5-安装部署)


## 4 Standard version of Linkis Environment Preparedness

### 4.1 Basic Software Installation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The following software must be loaded：

- MySQL (5.5+),[how to install MySQL](https://www.runoob.com/mysql/mysql-install.html)
- JDK (1.8.0_more than 141),[how to install JDK](https://www.runoob.com/java/java-environment-setup.html)
- Python (2.x and 3.x supported),[how to install Python](https://www.runoob.com/python/python-install.html)
- Hadoop (**Community version and CDH3.0 are supported**
- Hive(1.2.1,**version 2.0 and above, there may be compatibility problems**
- Spark (**Linkis release0.7.0, supports Spark2.0 and above all version**


### 4.2 Create User

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g. **Deploy user is hadoop**

1. Create a deployment user on all machines that need to be deployed to install

```bash
    sudo useradd hadoop
```

2. Since Linkis services are used to switch engines in the form of sudo -u ${linux-user} to perform assignments, deployment of users requires sudo permissions and is free from encryption.

```bash
    v/etc/sudoers
```

```properties
    hadoop ALL=(ALL) NOPASSWD: NOPASSWD: ALL
```

3. **Sets the following global environment variables in each install node so that Linkis can use Hadoop, Hive, and Spark normally**

    Modify installed user .bash_rc, the following command is：

```bash     
    vim /home/hadoop/.bash_rc
```


    Below is an environmental variable example：

```bash
    #JDK
    export JAVA_HOME=/nemo/jdk1.8. _141
    #HADOOP  
    export HADOOP_HOME=/appcom/Install/hadop
    export HADOOP_CONF_DIR=/appcom/config/hadoop-config
    #Hive
    export HIVE_HOME=/appcom/Install/hive
    export HIVE_CONF_DIR=/appcom/config/hive-config
    #Spark
    export SPARK_HOME=/appcom/Install/spark
    export SPARK_CONF_DIR=/appcom/config/spark-park-sumit
    export PYSPARK_ALLOW_INSEECURE_GATEWAY=1 # Pyspark
```

4. **If your Pyspark wants to have graphic features, you need to install the image module at all your nods**Command below：

```bash
    python -m pip install match
```

### 4.3 SSH decryption configuration (distribution mode must)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This step can be skipped if your Linkis is deployed on the same server.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If your Linkis is deployed on multiple servers, you also need to configure ssh/free login for these servers.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How to configure SSH free login](https://www.jianshu.com/p/0922095f69f3)

### 4.4 Package preparation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Download the latest installation package from Linkis released ([click here to enter the download page](https://github.com/apache/incubator-linkis/releases)).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Uninstall the package to the installation directory before changing the configuration of the unpacked file.

```bash   
    tar -xvf wedatasphere-linkis-x.x.0-dist.tar.gz
```

   (1) Modify base configuration

```bash
    vi conf/config.sh   
```

```properties
    SSH_PORT=22 #Specify SSH port if one-machine version installation is unconfigured
    deEmployUser=hadoop #Designated Deployer
    LINKIS_INKIS_INSTAL_HOME=/appcom/Install/Linkis # Specified Installation Directory
    WORKSPACE_USER_ROOT_PATH=file://tmp/hadoop # Specify user roots, which are typically used to store user scripts files and log files, etc. are user's workspace.
    HDFS_USER_ROOT_PATH=hdfs:///tmp/linkis   # 指定用户的HDFS根目录，一般用于存储Job的结果集文件

    # 如果您想配合Scriptis一起使用，CDH版的Hive，还需要配置如下参数（社区版Hive可忽略该配置）
    HIVE_META_URL=jdbc://...   # HiveMeta元数据库的URL
    HIVE_META_USER=   # HiveMeta元数据库的用户
    HIVE_META_PASSWORD=    # HiveMeta元数据库的密码

    # 配置hadoop/hive/spark的配置目录 
    HADOOP_CONF_DIR=/appcom/config/hadoop-config  #hadoop的conf目录
    HIVE_CONF_DIR=/appcom/config/hive-config   #hive的conf目录
    SPARK_CONF_DIR=/appcom/config/spark-config #spark的conf目录
```

   (2) Modify database configuration

```bash   
    vi conf/db.sh 
```

```properties    

    # Setup connection information for database
    # includes IP address, database name, username, port
    # primarily used to store user custom variables, configuration parameters, UDF and widgets, as well as to provide access to Job History bottom storage
    MYSQL_HOST=
    MYSQL_PORT=
    MYSQL_DB=
    MYSQL_USER=
    MYSQL_PASSWORD=

 ```

## 5 Installation

### 5.1 Execute Installation Script：

```bash
    sh bin/install.sh
```

### 5.2 Installation steps

- install.sh script will ask you how to install it.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Installation mode is streamlined, simple or standard mode. Please select the appropriate installation mode depending on the environment you prepared.

- install.sh script will ask if you need to initialize the database and import metadata.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The user will be asked if they need to initialize the database and import metadata because of the fear that the user data in the database will be empty because of the fear that the user will repeat the install.sh script.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**First installation**must be selected.

### 5.3 Installation successfully：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check the console print to see if it is installed.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If there is an error message, you can see the reason for the specific error.


### 5.4 Quick Launch Linkis

#### (1), start service：

  Execute the following commands in the installation directory, start all services：

```bash  
  ./bin/start-all.sh > start.log 2>start_error.log
```

#### (2), see whether or not the start was successful

  You can view service startup success on the Eureka interface, see method：

  Use http://${EUREKA_INSTALL_IP}:${EUREKA_PORT}, open in browser, see whether the service was registered successfully.

  If you do not specify in config.sh, EUREKA_INSTAL_IP_SPECIAL L_IP, then HTTP address is：http://127.0.0.1:20303

  如下图，如您的Eureka主页出现以下微服务，则表示服务都启动成功，可以正常对外提供服务了：

  __NOTE:__ Rated for DSS; the rest for Linkis, if only the link is used to ignore the red portion

 ![Eureka](../images/ch1/Eureka_homepage.png)


## 6. Quickly use Linkis

### 6.1 Overview

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis provides JavaScript clients with implementation and allows users to use UJESClient for quick access to Linkis background.

### 6.2 Quick operation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们在ujes/client/src/test模块下，提供了UJESClient的两个测试类：

```
    com.webank.wedatasphere.linkis.ujes.client.UJESClientImplTestJ # Java-based test class
    com.webank.wedatasphere.linkis.ujes.UJESClientImplTest # based on Scala

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you clone the Linkis's source code you can run both test classes directly.


### 6.3 Rapid implementation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Below is a specific description of how to quickly implement a code submission for Linkis.**

#### 6.3.1 Maven dependency

```xml
<dependency>
  <groupId>com.webank.wedatasphere.Linkis</groupId>
  <artifactId>Linkis-ujes-client</artifactId>
  <version>0.11.0</version>
</dependency>
```

#### 6.3.2 Reference implementation

- **JAVA**

```java
package com.webank.bdp.dataworkcloud.ujes.client;

import com.webank.wedatasphere.Linkis.common.utils.Utils;
import com.webank.wedatasphere.Linkis.httpclient.dws.authentication.StaticAuthenticationStrategy;
import com.webank.wedatasphere.Linkis.httpclient.dws.config.DWSClientConfig;
import com.webank.wedatasphere.Linkis.httpclient.dws.config.DWSClientConfigBuilder;
import com.webank.wedatasphere.Linkis.ujes.client.UJESClient;
import com.webank.wedatasphere.Linkis.ujes.client.UJESClientImpl;
import com.webank.wedatasphere.Linkis.ujes.client.request.JobExecuteAction;
import com.webank.wedatasphere.Linkis.ujes.client.request.ResultSetAction;
import com.webank.wedatasphere.Linkis.ujes.client.response.JobExecuteResult;
import com.webank.wedatasphere.Linkis.ujes.client.response.JobInfoResult;
import com.webank.wedatasphere.Linkis.ujes.client.response.JobProgressResult;
import com.webank.wedatasphere.Linkis.ujes.client.response.JobStatusResult;
import org.apache.commons.io.IOUtils;

import java.util.concurrent.TimeUnit;


public class UJESClientImplTestJ{
    public static void main(String[] args){
        // 1. 配置DWSClientBuilder，通过DWSClientBuilder获取一个DWSClientConfig
        DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
                .addUJESServerUrl("http://${ip}:${port}")  //指定ServerUrl，Linkis服务器端网关的地址,如http://{ip}:{port}
                .connectionTimeout(30000)   //connectionTimeOut 客户端连接超时时间
                .discoveryEnabled(true).discoveryFrequency(1, TimeUnit.MINUTES)  //是否启用注册发现，如果启用，会自动发现新启动的Gateway
                .loadbalancerEnabled(true)  // 是否启用负载均衡，如果不启用注册发现，则负载均衡没有意义
                .maxConnectionSize(5)   //指定最大连接数，即最大并发数
                .retryEnabled(false).readTimeout(30000)   //执行失败，是否允许重试
                .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis认证方式
                .setAuthTokenKey("johnnwang").setAuthTokenValue("Abcd1234")))  //认证key，一般为用户名;  认证value，一般为用户名对应的密码
                .setDWSVersion("v1").build();  //Linkis后台协议的版本，当前版本为v1

        // 2. 通过DWSClientConfig获取一个UJESClient
        UJESClient client = new UJESClientImpl(clientConfig);

        // 3. 开始执行代码
        JobExecuteResult jobExecuteResult = client.execute(JobExecuteAction.builder()
                .setCreator("LinkisClient-Test")  //creator，请求Linkis的客户端的系统名，用于做系统级隔离
                .addExecuteCode("show tables")   //ExecutionCode 请求执行的代码
                .setEngineType(JobExecuteAction.EngineType$.MODULE$.HIVE()) // 希望请求的Linkis的执行引擎类型，如Spark hive等
                .setUser("johnnwang")   //User，请求用户；用于做用户级多租户隔离
                .build());
        System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());

        // 4. 获取脚本的执行状态
        JobStatusResult status = client.status(jobExecuteResult);
        while(!status.isCompleted()) {
            // 5. 获取脚本的执行进度
            JobProgressResult progress = client.progress(jobExecuteResult);
            Utils.sleepQuietly(500);
            status = client.status(jobExecuteResult);
        }

        // 6. 获取脚本的Job信息
        JobInfoResult jobInfo = client.getJobInfo(jobExecuteResult);
        // 7. 获取结果集列表（如果用户一次提交多个SQL，会产生多个结果集）
        String resultSet = jobInfo.getResultSetList(client)[0];
        // 8. 通过一个结果集信息，获取具体的结果集
        Object fileContents = client.resultSet(ResultSetAction.builder().setPath(resultSet).setUser(jobExecuteResult.getUser()).build()).getFileContent();
        System.out.println("fileContents: " + fileContents);
        IOUtils.closeQuietly(client);
    }
}
```

- **SCALA**

```scala

import java.util.concurrent.TimeUnit

import com.webank.wedatasphere.Linkis.common.utils.Utils
import com.webank.wedatasphere.Linkis.httpclient.dws.authentication.StaticAuthenticationStrategy
import com.webank.wedatasphere.Linkis.httpclient.dws.config.DWSClientConfigBuilder
import com.webank.wedatasphere.Linkis.ujes.client.request.JobExecuteAction.EngineType
import com.webank.wedatasphere.Linkis.ujes.client.request.{JobExecuteAction, ResultSetAction}
import org.apache.commons.io.IOUtils

object UJESClientImplTest extends App {

  // 1. 配置DWSClientBuilder，通过DWSClientBuilder获取一个DWSClientConfig
  val clientConfig = DWSClientConfigBuilder.newBuilder()
    .addUJESServerUrl("http://${ip}:${port}")  //指定ServerUrl，Linkis服务器端网关的地址,如http://{ip}:{port}
    .connectionTimeout(30000)  //connectionTimeOut 客户端连接超时时间
    .discoveryEnabled(true).discoveryFrequency(1, TimeUnit.MINUTES)  //是否启用注册发现，如果启用，会自动发现新启动的Gateway
    .loadbalancerEnabled(true)  // 是否启用负载均衡，如果不启用注册发现，则负载均衡没有意义
    .maxConnectionSize(5)   //指定最大连接数，即最大并发数
    .retryEnabled(false).readTimeout(30000)   //执行失败，是否允许重试
    .setAuthenticationStrategy(new StaticAuthenticationStrategy())  //AuthenticationStrategy Linkis认证方式
    .setAuthTokenKey("${username}").setAuthTokenValue("${password}")  //认证key，一般为用户名;  认证value，一般为用户名对应的密码
    .setDWSVersion("v1").build()  //Linkis后台协议的版本，当前版本为v1

  // 2. 通过DWSClientConfig获取一个UJESClient
  val client = UJESClient(clientConfig)

  // 3. 开始执行代码
  val jobExecuteResult = client.execute(JobExecuteAction.builder()
    .setCreator("LinkisClient-Test")  //creator，请求Linkis的客户端的系统名，用于做系统级隔离
    .addExecuteCode("show tables")   //ExecutionCode 请求执行的代码
    .setEngineType(EngineType.SPARK) // 希望请求的Linkis的执行引擎类型，如Spark hive等
    .setUser("${username}").build())  //User，请求用户；用于做用户级多租户隔离
  println("execId: " + jobExecuteResult.getExecID + ", taskId: " + jobExecuteResult.taskID)

  // 4. 获取脚本的执行状态
  var status = client.status(jobExecuteResult)
  while(!status.isCompleted) {
  // 5. 获取脚本的执行进度
    val progress = client.progress(jobExecuteResult)
    val progressInfo = if(progress.getProgressInfo != null) progress.getProgressInfo.toList else List.empty
    println("progress: " + progress.getProgress + ", progressInfo: " + progressInfo)
    Utils.sleepQuietly(500)
    status = client.status(jobExecuteResult)
  }

  // 6. 获取脚本的Job信息
  val jobInfo = client.getJobInfo(jobExecuteResult)
  // 7. 获取结果集列表（如果用户一次提交多个SQL，会产生多个结果集）
  val resultSet = jobInfo.getResultSetList(client).head
  // 8. 通过一个结果集信息，获取具体的结果集
  val fileContents = client.resultSet(ResultSetAction.builder().setPath(resultSet).setUser(jobExecuteResult.getUser).build()).getFileContent
  println("fileContents: " + fileContents)
  IOUtils.closeQuietly(client)
}
```