---
title: 服务调试指引
sidebar_position: 2
---

> 导语：本文详细记录了如何在IDEA中配置和启动Linkis的各个微服务，并实现JDBC、Python、Shell等脚本的提交和执行。在Mac OS上，Linkis的各个微服务都支持本地调试。
> 但在Windows OS上，linkis-cg-engineconnmanager服务暂不支持在本地进行调试，可参考下文第4小节的远程调试文档进行调试。

<h4><font color="red">linkis 1.0.3版本前，还未进入apache孵化，组织还是归属webank,主类的包名为`com.webank.wedatasphere.linkis`，调试时，注意区分。</font></h4>

## 1. 代码调试环境

- jdk1.8
- maven3.5+

## 2. 准备代码并编译

```shell
git clone git@github.com:apache/incubator-linkis.git
cd incubator-linkis
git checkout dev-1.2.0
```

克隆Linkis的源码到本地，并用IDEA打开，首次打开项目会从maven仓库中下载Linkis项目编译所需的依赖jar包。当依赖jar包加载完毕之后，运行如下编译打包命令。

```shell
##如果对应版本已经发布，则可以跳过该步骤。发布的版本相关依赖已经deploy到maven中央仓库
mvn -N install
mvn clean install -DskipTests
```

编译命令运行成功之后，在目录incubator-linkis/linkis-dist/target/下可找到编译好的安装包：apache-linkis-版本号-incubating-bin.tar.gz

## 3. 配置并启动服务

### 3.1 add mysql-connector-java到classpath中

服务启动过程中如果遇到mysql驱动类找不到的情况，可以把mysql-connector-java-版本号.jar添加到对应服务模块的classpath下。

目前依赖mysql的服务有和对应的pom.xml路径如下：

- linkis-mg-gateway：linkis-spring-cloud-services/linkis-service-gateway/linkis-gateway-server-support/pom.xml
- linkis-ps-publicservice：linkis-public-enhancements/pom.xml
- linkis-cg-linkismanage：linkis-computation-governance/linkis-manager/linkis-application-manager/pom.xml
- linkis-cg-engineplugin: linkis-computation-governance/linkis-engineconn/linkis-engineconn-plugin-server/pom.xml

增加到依赖的方式如下，修改对应服务的pom.xml文件讲mysql依赖加入进去，
```xml
<dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.connector.version}</version>
</dependency>
```

### 3.2 调整log4j2.xml配置

在Linkis源码文件夹下，子目录linkis-dist/package/conf中，是Linkis的一些默认配置文件，首先对log4j2.xml文件进行编辑，在其中增加日志输出到控制台的配置。

![log4j2.xml](/Images/development/debug/log4j.png)

这里只贴出来需要新增的配置内容。

```xml
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
```
__注意：__ linkis.properties需要修改对应的jdbc的参数

### 3.3 启动eureka服务

Linkis的服务依赖Eureka作为注册中心，所以我们需要首先启动Eureka服务，Eureka服务可以在本地启动，也可以使用远程启动的服务。保证各个服务都能访问到Eureka的IP和端口之后，就可以开始着手启动其他微服务了。

在Linkis内部是通过-DserviceName参数设置应用名以及使用配置文件，所以-DserviceName是必须要指定的VM启动参数。

可以通过 “-Xbootclasspath/a:配置文件路径”命令，将配置文件追加到引导程序类的路径末尾，即将依赖的配置文件加到classpath中。

通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。

![eureka](/Images/development/debug/eureka.png)

参数解释：

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
```

注意调试配置中涉及到的本地路径，需要要修改成自己设置的路径；
在Windows中路径书写规则是：D:\{YourPathPrefix}\incubator-linkis\linkis-dist\package\conf
（针对以下微服务同样适用）

如果不想默认的20303端口可以修改端口配置：

```shell
文件路径：conf/application-eureka.yml
修改端口：
server:
  port: 8080 ##启动的端口
```

上述设置完成之后，直接运行此Application，成功启动后可以通过http://localhost:20303/ 查看eureka服务列表。

![eureka-web](/Images/development/debug/eureka-web.png)

### 3.4 启动linkis-mg-gateway

linkis-mg-gateway是Linkis的服务网关，所有的请求都会经由gateway来转发到对应的服务上。
启动服务器前，首先需要编辑conf/linkis-mg-gateway.properties配置文件，增加管理员用户名和密码，用户名需要与你当前登录的mac用户名保持一致。

```properties
wds.linkis.admin.user=leojie
wds.linkis.admin.password=123456
```

设置 linkis-mg-gateway的启动Application

![gateway-app](/Images/development/debug/gateway.png)

参数解释：

```shell
[Service Name]
linkis-mg-gateway

[Use classpath of module]
linkis-gateway-server-support

[VM Opitons]
-DserviceName=linkis-mg-gateway -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf

[main Class]
org.apache.linkis.gateway.springcloud.LinkisGatewayApplication
```

上述设置完成之后，可直接运行此Application。

### 3.5 启动linkis-ps-publicservice

publicservice是Linkis的公共增强服务，为其他微服务模块提供统一配置管理、上下文服务、物料库、数据源管理、微服务管理和历史任务查询等功能的模块。

设置linkis-ps-publicservice的启动Application

![publicservice-app](/Images/development/debug/publicservice.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

直接启动publicservice时，可能会遇到如下报错：

![publicservice-debug-error](/Images/development/debug/publicservice-debug-error.png)

需要把公共依赖的模块加到linkis-public-enhancements模块的classpath下，修改pes的pom增加以下依赖：
linkis-public-enhancements/pom.xml
```xml
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

```

做完上述配置后重新启动publicservice的Application

### 3.6 启动linkis-cg-linkismanager

![cg-linkismanager-APP](/Images/development/debug/cg-linkismanager-APP.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

### 3.7 启动linkis-cg-entrance

![cg-entrance-APP](/Images/development/debug/cg-entrance-APP.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

### 3.8 启动linkis-cg-engineplugin

![engineplugin-app](/Images/development/debug/engineplugin-app.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

启动engineplugin的时候可能会遇到如下报错：

![engineplugin-debug-error](/Images/development/debug/engineplugin-debug-error.png)

需要把公共依赖的模块加到ecp模块的classpath下，修改pes的pom增加以下依赖：
linkis-computation-governance/linkis-engineconn/linkis-engineconn-plugin-server/pom.xml
```xml
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

```

### 3.9 启动linkis-cg-engineconnmanager

![engineconnmanager-app](/Images/development/debug/engineconnmanager-app.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

-DJAVA_HOME是为了指定ecm启动引擎时所使用的java命令所在的路径，如果你默认JAVA环境变量中的版本满足需要，此配置可以不加

针对linkis-cg-engineconnmanager模块调试暂只支持Mac OS 和 Linux系统




### 3.10 关键配置修改

以上操作只是完成了对Linkis各个微服务启动Application的配置，除此之外，Linkis服务启动时所加载的配置文件中，有些关键配置也需要做针对性地修改，否则启动服务或脚本执行的过程中会遇到一些报错。关键配置的修改归纳如下：

####  3.10.1 conf/linkis.properties

```properties
# linkis底层数据库连接参数配置
wds.linkis.server.mybatis.datasource.url=jdbc:mysql://yourip:3306/linkis?characterEncoding=UTF-8
wds.linkis.server.mybatis.datasource.username=your username
wds.linkis.server.mybatis.datasource.password=your password

# 设置bml物料存储路径不为hdfs
wds.linkis.bml.is.hdfs=false
wds.linkis.bml.local.prefix=/Users/leojie/software/linkis/data/bml

wds.linkis.home=/Users/leojie/software/linkis

# 设置管理员用户名，你的本机用户名
wds.linkis.governance.station.admin=leojie
```

在配置linkis底层数据库连接参数之前，请创建linkis数据库，并运行linkis-dist/package/db/linkis_ddl.sql和linkis-dist/package/db/linkis_dml.sql来初始化所有表和数据。

其中wds.linkis.home={YourPathPrefix}/linkis的目录结构如下，里面只放置了lib目录和conf目录。引擎进程启动时会把wds.linkis.home中的conf和lib路径，加到classpath下，如果wds.linkis.home不指定，可能会遇到目录找不到的异常。

![linkis-home](/Images/development/debug/linkis-home.png)

#### 3.10.2 conf/linkis-cg-entrance.properties

```properties
# entrance服务执行任务的日志目录
wds.linkis.entrance.config.log.path=file:///{YourPathPrefix}/linkis/data/entranceConfigLog

# 结果集保存目录，本机用户需要读写权限
wds.linkis.resultSet.store.path=file:///{YourPathPrefix}/linkis/data/resultSetDir
```

#### 3.10.3 conf/linkis-cg-engineconnmanager.properties

```properties
wds.linkis.engineconn.root.dir={YourPathPrefix}/linkis/data/engineconnRootDir
```

不修改可能会遇到路径不存在异常。

#### 3.10.4 conf/linkis-cg-engineplugin.properties

```properties
wds.linkis.engineconn.home={YourPathPrefix}/incubator-linkis/linkis-engineconn-plugins/shell/target/out

wds.linkis.engineconn.plugin.loader.store.path={YourPathPrefix}/incubator-linkis/linkis-engineconn-plugins/shell/target/out
```

这里两个配置主要为了指定引擎存储的根目录，指定为target/out的主要目的是，引擎相关代码或配置改动后可以直接重启engineplugin服务后生效。

### 3.11 为当前用户设置sudo免密

引擎拉起时需要使用sudo来执行启动引擎进程的shell命令，mac上当前用户使用sudo时一般都需要输入密码，因此，需要为当前用户设置sudo免密，设置方法如下：

```shell
sudo chmod u-w /etc/sudoers
sudo visudo
将#%admin ALL=(ALL) AL替换为 %admin ALL=(ALL) NOPASSWD: ALL
保存文件退出
```

### 3.12 服务测试

保证上述服务都是成功启动状态，然后在postman中测试提交运行shell脚本作业。

首先访问登录接口来生成Cookie:

![login](/Images/development/debug/login.png)

然后提交执行shell代码

POST: http://127.0.0.1:9001/api/rest_j/v1/entrance/submit

body参数：

```json
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
```

执行结果：

```json
{
    "method": "/api/entrance/submit",
    "status": 0,
    "message": "OK",
    "data": {
        "taskID": 1,
        "execID": "exec_id018017linkis-cg-entrance192.168.3.13:9104IDE_leojie_shell_0"
    }
}
```

最后检查任务运行状态和获取运行结果集：

GET http://127.0.0.1:9001/api/rest_j/v1/entrance/exec_id018017linkis-cg-entrance192.168.3.13:9104IDE_leojie_shell_0/progress

```json
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
```

GET http://127.0.0.1:9001/api/rest_j/v1/jobhistory/1/get

GET http://127.0.0.1:9001/api/rest_j/v1/filesystem/openFile?path=file:///Users/leojie/software/linkis/data/resultSetDir/leojie/linkis/2022-07-16/214859/IDE/1/1_0.dolphin

```json
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
```

## 4. 远程调试服务指引

### 4.1 打开远程调试端口

明确需要调试的包所在的服务，并根据需要调试的代码位置,确定其所属的服务

### 4.2 进入{LINKIS_HOME}/sbin/ext,修改模块配置文件开启远程调用端口
![c-port](https://user-images.githubusercontent.com/29391030/167364775-4f5d2774-b6b9-4a65-b69c-69319db870c4.png)

### 4.3 重启需要调试的服务

```shell
sh linkis-daemon.sh restart ps-publicservice
```

(如果不确定服务名称,在 {LINKIS_HOME}/sbin/linkis-start-all.sh 内查询)

### 4.4 编译器配置远程调试

如下图所示打开窗口并配置远程调试的端口,服务,以及模块  
![c-debug](https://user-images.githubusercontent.com/29391030/167364896-29805938-157f-47a2-baf4-f52cb63c64d1.png)

### 4.5 开始调试

点击调试按钮,出现如下信息代表可以开始调试  
![debug](https://user-images.githubusercontent.com/29391030/163559920-05aba3c3-b146-4f62-8e20-93f94a65158d.png)