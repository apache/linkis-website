---
title: Debug Guide
sidebar_position: 5.0
---

> Introduction: This article records in detail how to configure and start various microservices of Linkis in IDEA, and implement the submission and execution of scripts such as JDBC, Python, and Shell. On Mac OS, each microservice of Linkis supports local debugging.
> However, on Windows OS, the linkis-cg-engineconnmanager service does not support local debugging for the time being. You can refer to the remote debugging documentation in Section 4 below for debugging.

<h4><font color="red">Linkis before version 1.0.3 has not yet entered the apache incubation, the organization still belongs to webank, the package name of the main class is `com.webank.wedatasphere.linkis`, when debugging, pay attention to the distinction . </font></h4>

## 1. Code debugging environment

- jdk1.8
- maven3.5+

## 2. Prepare the code and compile

```shell
git clone git@github.com:apache/incubator-linkis.git
cd incubator-linkis
git checkout dev-1.2.0
````

Clone the source code of Linkis to the local and open it with IDEA. When you open the project for the first time, the dependency jar package required for the compilation of the Linkis project will be downloaded from the maven repository. When the dependent jar package is loaded, run the following compile and package command.

```shell
##If the corresponding version has been released, you can skip this step. The released version-related dependencies have been deployed to the maven central repository
mvn -N install
mvn clean install -DskipTests
````

After the compilation command runs successfully, the compiled installation package can be found in the directory incubator-linkis/linkis-dist/target/: apache-linkis-version-incubating-bin.tar.gz

## 3. Configure and start the service

### 3.1 add mysql-connector-java to the classpath

If the mysql driver class cannot be found during the service startup process, you can add mysql-connector-java-version.jar to the classpath of the corresponding service module.

At present, the services that rely on mysql and the corresponding pom.xml paths are as follows:

- linkis-mg-gateway: linkis-spring-cloud-services/linkis-service-gateway/linkis-gateway-server-support/pom.xml
- linkis-ps-publicservice: linkis-public-enhancements/pom.xml
- linkis-cg-linkismanage: linkis-computation-governance/linkis-manager/linkis-application-manager/pom.xml
- linkis-cg-engineplugin: linkis-computation-governance/linkis-engineconn/linkis-engineconn-plugin-server/pom.xml

The way to add to the dependency is as follows, modify the pom.xml file of the corresponding service to add the mysql dependency,
````xml
<dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.connector.version}</version>
</dependency>
````
At the same time, it is necessary to keep whether the scope of mysql-connector-java dependency is set to test according to the `<dependencyManagement>` of pom.xml. If so, comments are required for local debugging

### 3.2 Adjust log4j2.xml configuration

Under the Linkis source code folder, in the subdirectory linkis-dist/package/conf, are some default configuration files of Linkis. First, edit the log4j2.xml file, and add the configuration of log output to the console.

![log4j2.xml](/Images/development/debug/log4j.png)

Only the configuration content that needs to be added is posted here.

````xml
<configuration status="error" monitorInterval="30">
    <appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <ThresholdFilter level="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M - %msg%xEx%n"/>
        </Console>
    </appenders>
    <loggers>
        <root level="INFO">
            <appender-ref ref="Console"/>
        </root>
    </loggers>
</configuration>
````
__Note:__linkis.properties needs to modify the parameters of the corresponding jdbc

### 3.3 Start the eureka service

Linkis' services rely on Eureka as the registry, so we need to start the Eureka service first. The Eureka service can be started locally or remotely. After ensuring that each service can access Eureka's IP and port, you can start to start other microservices.

Inside Linkis, the application name and configuration file are set through the -DserviceName parameter, so -DserviceName is a VM startup parameter that must be specified.

You can use the "-Xbootclasspath/a: configuration file path" command to append the configuration file to the end of the bootstrap class path, that is, add the dependent configuration file to the classpath.

By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.

![eureka](/Images/development/debug/eureka.png)

Parameter explanation:

```shell
[service name]
linkis-mg-eureka

[Use classpath of module]
linkis-eureka

[Main Class]
org.apache.linkis.eureka.SpringCloudEurekaApplication

[VM Opitons]
-DserviceName=linkis-mg-eureka -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf

[Program arguments]
--spring.profiles.active=eureka --eureka.instance.preferIpAddress=true
````

Note that the local path involved in the debugging configuration needs to be modified to the path set by yourself;
The path writing rule in Windows is: D:\{YourPathPrefix}\incubator-linkis\linkis-dist\package\conf
(The same applies to the following microservices)

If you don't want the default 20303 port, you can modify the port configuration:

```shell
File path: conf/application-eureka.yml
Modify the port:
server:
  port: 8080 ##Starting port
````

After the above settings are completed, run the Application directly. After successful startup, you can view the eureka service list through http://localhost:20303/.

![eureka-web](/Images/development/debug/eureka-web.png)

### 3.4 Start linkis-mg-gateway

linkis-mg-gateway is the service gateway of Linkis, and all requests will be forwarded to the corresponding service through the gateway.
Before starting the server, you first need to edit the conf/linkis-mg-gateway.properties configuration file and add the administrator username and password. The username must be the same as the mac username you are currently logged in to.

````properties
wds.linkis.admin.user=leojie
wds.linkis.admin.password=123456
````

Set the startup Application of linkis-mg-gateway

![gateway-app](/Images/development/debug/gateway.png)

Parameter explanation:

```shell
[Service Name]
linkis-mg-gateway

[Use classpath of module]
linkis-gateway-server-support

[VM Opitons]
-DserviceName=linkis-mg-gateway -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf

[main Class]
org.apache.linkis.gateway.springcloud.LinkisGatewayApplication
````

After the above settings are completed, the Application can be run directly.

### 3.5 Start linkis-ps-publicservice

publicservice is a public enhancement service of Linkis, a module that provides functions such as unified configuration management, context service, material library, data source management, microservice management and historical task query for other microservice modules.

Set the startup Application of linkis-ps-publicservice

![publicservice-app](/Images/development/debug/publicservice.png)

Parameter explanation:
```shell
[Service Name]
linkis-ps-publicservice

[Module Name]
linkis-public-enhancements

[VM Opitons]
-DserviceName=linkis-ps-publicservice -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf

[main Class]
org.apache.linkis.filesystem.LinkisPublicServiceApp

[Add provided scope to classpath]
By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.
````

When starting publicservice directly, you may encounter the following errors:

![publicservice-debug-error](/Images/development/debug/publicservice-debug-error.png)

You need to add the publicly dependent modules to the classpath of the linkis-public-enhancements module, and modify the pom of pes to add the following dependencies:
linkis-public-enhancements/pom.xml
````xml
 <dependency>
      <groupId>org.apache.linkis</groupId>
      <artifactId>linkis-dist</artifactId>
      <version>${project.version}</version>
    </dependency>

    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.connector.version}</version>
</dependency>

````

After completing the above configuration, restart the Application of publicservice

### 3.6 Start linkis-cg-linkismanager

![cg-linkismanager-APP](/Images/development/debug/cg-linkismanager-APP.png)

Parameter explanation:

```shell
[Service Name]
linkis-cg-linkismanager

[Use classpath of module]
linkis-application-manager

[VM Opitons]
-DserviceName=linkis-cg-linkismanager -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf

[main Class]
org.apache.linkis.manager.am.LinkisManagerApplication

[Add provided scope to classpath]
By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.
````

### 3.7 Start linkis-cg-entrance

![cg-entrance-APP](/Images/development/debug/cg-entrance-APP.png)

Parameter explanation:

```shell
[Service Name]
linkis-cg-entrance

[Use classpath of module]
linkis-entrance

[VM Opitons]
-DserviceName=linkis-cg-entrance -Xbootclasspath/a:D:\yourDir\incubator-linkis\linkis-dist\package\conf

[main Class]
org.apache.linkis.entrance.LinkisEntranceApplication

[Add provided scope to classpath]
By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.
````

### 3.8 Start linkis-cg-engineplugin

![engineplugin-app](/Images/development/debug/engineplugin-app.png)

Parameter explanation:

```shell
[Service Name]
linkis-cg-engineplugin

[Use classpath of module]
linkis-engineconn-plugin-server

[VM Opitons]
-DserviceName=linkis-cg-engineplugin -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf

[main Class]
org.apache.linkis.engineplugin.server.LinkisEngineConnPluginServer

[Add provided scope to classpath]
By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.
````

When starting engineplugin, you may encounter the following error:

![engineplugin-debug-error](/Images/development/debug/engineplugin-debug-error.png)

You need to add the publicly dependent modules to the classpath of the ecp module, and modify the pom of pes to add the following dependencies:
linkis-computation-governance/linkis-engineconn/linkis-engineconn-plugin-server/pom.xml
````xml
 <dependency>
      <groupId>org.apache.linkis</groupId>
      <artifactId>linkis-dist</artifactId>
      <version>${project.version}</version>
    </dependency>

    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.connector.version}</version>
</dependency>

````

### 3.9 Start linkis-cg-engineconnmanager

![engineconnmanager-app](/Images/development/debug/engineconnmanager-app.png)

Parameter explanation:

```shell
[Service Name]
linkis-cg-engineconnmanager

[Use classpath of module]
linkis-engineconn-manager-server

[VM Opitons]
-DserviceName=linkis-cg-engineconnmanager -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf -DJAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/

[main Class]
org.apache.linkis.ecm.server.LinkisECMApplication

[Add provided scope to classpath]
By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.
````

-DJAVA_HOME is to specify the path of the java command used by ecm to start the engine. If the version in the default JAVA environment variable meets your needs, this configuration can be omitted.

Debugging the linkis-cg-engineconnmanager module only supports Mac OS and Linux systems.

### 3.10 Key Configuration Modifications

The above operation only completes the configuration of the application startup of each Linkis microservice. In addition, in the configuration file loaded when the Linkis service starts, some key configurations also need to be modified in a targeted manner, otherwise the process of starting the service or script execution Some errors will be encountered. The key configuration modifications are summarized as follows:

#### 3.10.1 conf/linkis.properties

````properties
# linkis underlying database connection parameter configuration
wds.linkis.server.mybatis.datasource.url=jdbc:mysql://yourip:3306/linkis?characterEncoding=UTF-8
wds.linkis.server.mybatis.datasource.username=your username
wds.linkis.server.mybatis.datasource.password=your password

# Set the bml material storage path to not hdfs
wds.linkis.bml.is.hdfs=false
wds.linkis.bml.local.prefix=/Users/leojie/software/linkis/data/bml

wds.linkis.home=/Users/leojie/software/linkis

# Set the administrator username, your local username
wds.linkis.governance.station.admin=leojie
````

Before configuring linkis underlying database connection parameters, please create linkis database and run linkis-dist/package/db/linkis_ddl.sql and linkis-dist/package/db/linkis_dml.sql to initialize all tables and data.

The directory structure of wds.linkis.home={YourPathPrefix}/linkis is as follows, only the lib directory and the conf directory are placed in it. When the engine process starts, the conf and lib paths in wds.linkis.home will be added to the classpath. If wds.linkis.home is not specified, an exception that the directory cannot be found may be encountered.

![linkis-home](/Images/development/debug/linkis-home.png)

#### 3.10.2 conf/linkis-cg-entrance.properties

````properties
# The log directory of the entrance service execution task
wds.linkis.entrance.config.log.path=file:///{YourPathPrefix}/linkis/data/entranceConfigLog

# The result set is saved in the directory, the local user needs read and write permissions
wds.linkis.resultSet.store.path=file:///{YourPathPrefix}/linkis/data/resultSetDir
````

#### 3.10.3 conf/linkis-cg-engineconnmanager.properties

````properties
wds.linkis.engineconn.root.dir={YourPathPrefix}/linkis/data/engineconnRootDir
````

If you do not modify it, you may encounter an exception that the path does not exist.

#### 3.10.4 conf/linkis-cg-engineplugin.properties

````properties
wds.linkis.engineconn.home={YourPathPrefix}/incubator-linkis/linkis-engineconn-plugins/shell/target/out

wds.linkis.engineconn.plugin.loader.store.path={YourPathPrefix}/incubator-linkis/linkis-engineconn-plugins/shell/target/out
````

The two configurations here are mainly to specify the root directory of the engine storage, and the main purpose of specifying it as target/out is that after the engine-related code or configuration changes, the engineplugin service can be restarted directly to take effect.

### 3.11 Set sudo password-free for the current user

When the engine is started, sudo needs to be used to execute the shell command to start the engine process. The current user on the mac generally needs to enter a password when using sudo. Therefore, it is necessary to set the sudo password-free for the current user. The setting method is as follows:

```shell
sudo chmod u-w /etc/sudoers
sudo visudo
Replace #%admin ALL=(ALL) AL with %admin ALL=(ALL) NOPASSWD: ALL
save file exit
````

### 3.12 Service Test

Make sure that the above services are all successfully started, and then test and submit the shell script job in postman.

First visit the login interface to generate a cookie:

![login](/Images/development/debug/login.png)

Then submit the shell code for execution

POST: http://127.0.0.1:9001/api/rest_j/v1/entrance/submit

body parameter:

````json
{
  "executionContent": {
    "code": "echo 'hello'",
    "runType": "shell"
  },
  "params": {
    "variable": {
      "testvar": "hello"
    },
    "configuration": {
      "runtime": {},
      "startup": {}
    }
  },
  "source": {
    "scriptPath": "file:///tmp/hadoop/test.sql"
  },
  "labels": {
    "engineType": "shell-1",
    "userCreator": "leojie-IDE"
  }
}
````

Results of the:

````json
{
    "method": "/api/entrance/submit",
    "status": 0,
    "message": "OK",
    "data": {
        "taskID": 1,
        "execID": "exec_id018017linkis-cg-entrance192.168.3.13:9104IDE_leojie_shell_0"
    }
}
````

Finally, check the running status of the task and get the running result set:

GET http://127.0.0.1:9001/api/rest_j/v1/entrance/exec_id018017linkis-cg-entrance192.168.3.13:9104IDE_leojie_shell_0/progress

````json
{
    "method": "/api/entrance/exec_id018017linkis-cg-entrance192.168.3.13:9104IDE_leojie_shell_0/progress",
    "status": 0,
    "message": "OK",
    "data": {
        "progress": 1,
        "progressInfo": [],
        "execID": "exec_id018017linkis-cg-entrance192.168.3.13:9104IDE_leojie_shell_0"
    }
}
````

GET http://127.0.0.1:9001/api/rest_j/v1/jobhistory/1/get

GET http://127.0.0.1:9001/api/rest_j/v1/filesystem/openFile?path=file:///Users/leojie/software/linkis/data/resultSetDir/leojie/linkis/2022-07-16/ 214859/IDE/1/1_0.dolphin

````json
{
    "method": "/api/filesystem/openFile",
    "status": 0,
    "message": "OK",
    "data": {
        "metadata": "NULL",
        "totalPage": 0,
        "totalLine": 1,
        "page": 1,
        "type": "1",
        "fileContent": [
            [
                "hello"
            ]
        ]
    }
}
````

## 4. Remote debugging service guide

### 4.1 Open the remote debugging port

Identify the service where the package that needs to be debugged is located, and determine the service to which it belongs according to the location of the code to be debugged

### 4.2 Enter {LINKIS_HOME}/sbin/ext, modify the module configuration file to open the remote call port
![c-port](https://user-images.githubusercontent.com/29391030/167364775-4f5d2774-b6b9-4a65-b69c-69319db870c4.png)

### 4.3 Restart the service that needs to be debugged

```shell
sh linkis-daemon.sh restart ps-publicservice
````

(If you are not sure about the service name, check in {LINKIS_HOME}/sbin/linkis-start-all.sh )

### 4.4 Compiler configuration remote debugging

Open the window as shown below and configure the remote debugging port, service, and module
![c-debug](https://user-images.githubusercontent.com/29391030/167364896-29805938-157f-47a2-baf4-f52cb63c64d1.png)

### 4.5 Start debugging

Click the debug button, and the following information appears, indicating that you can start debugging
![debug](https://user-images.githubusercontent.com/29391030/163559920-05aba3c3-b146-4f62-8e20-93f94a65158d.png)
