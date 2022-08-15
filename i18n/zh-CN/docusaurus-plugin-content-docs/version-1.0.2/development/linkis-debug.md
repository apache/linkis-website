---
title: 调试指引
sidebar_position: 2
---

# 调试相关 

> 因为linkis本身模块比较多，调试起来有一定的难度，下面就指导大家如何进行一次本地的服务调试(基于1.0.3版本)。

<h4><font color="red">linkis 1.0.3版本前，还未进入apache孵化，组织还是归属webank,主类的包名为`com.webank.wedatasphere.linkis`，调试时，注意区分。</font></h4>

## step 1 准备源码并编译

```plain
git clone https://github.com/apache/incubator-linkis.git
cd incubator-linkis
#如果需要 可以切换到对应的分支上
#git checkout dev-xxx
mvn -N install 
mvn clean install
```

## step2 必要的参数配置

对于incubator-linkis/assembly-combined-package/assembly-combined/conf/下的配置文件，需要对数据库以及hive meta等必要启动参数进行配置。 

## step3 调整log4j.xml配置

为了方便调试的时候将日志打印到控制台，需要修改下默认的log4j2.xml文件，修改appender默认为console。需要移除默认的RollingFile的append，增加console的appender,如下所示：
![](/Images/development/debug_log.png)
log4j2.xml 路径 incubator-linkis/assembly-combined-package/assembly-combined/conf/log4j2.xml

```plain
 <?xml version="1.0" encoding="UTF-8"?>
<configuration status="error" monitorInterval="30">
<appenders>
    <RollingFile name="RollingFile" append="false" fileName="logs/${sys:serviceName}.log"
                 filePattern="logs/$${date:yyyy-MM}/${sys:serviceName}/linkis-log-%d{yyyy-MM-dd}-%i.log">
        <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level] [%-40t] %c{1.} (%L) [%M] - %msg%xEx%n"/>
        <SizeBasedTriggeringPolicy size="100MB"/>
        <DefaultRolloverStrategy max="10"/>
    </RollingFile>
    
    <Console name="Console" target="SYSTEM_OUT">
        <ThresholdFilter level="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
        <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M - %msg%xEx%n"/>
    </Console>
</appenders>
<loggers>
    <root level="INFO">
        <appender-ref ref="RollingFile"/>
        <appender-ref ref="Console"/>
    </root>
</loggers>
</configuration>
```

## step 4 整体调试方案
Linkis和DSS的服务都依赖Eureka，所以需要首先启动Eureka服务，Eureka服务也可以用您已经启动的Eureka。Eureka启动后就可以启动其他服务了。

因为linkis内部通过-DserviceName参数设置应用名以及使用的配置文件，所以-DserviceName是必须的启动VM参数 

可以通过 “-Xbootclasspath/a:配置文件路径“命令。将配置文件，追加到引导程序类的搜索路劲末尾，即将依赖的配置文件加到classpath中

<font color="red"> 通过勾选Include dependencies with “Provided” scope ，这样可以在调试时，引入provided级别的依赖包。</font>
**Microservice Governance Services组件**

### linkis-mg-eureka的启动 

```plain
[main Class]
org.apache.linkis.eureka.SpringCloudEurekaApplication

[VM Opitons]
-DserviceName=linkis-mg-eureka -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[Program arguments]
--spring.profiles.active=eureka --eureka.instance.preferIpAddress=true

[User classpath of module]
linkis-eureka
```
如果不想默认的20303端口可以修改端口配置：
```yml
文件路径：conf/application-eureka.yml
修改端口：
server:
  port: 8080 ##启动的端口
```
##### 具体配置如下：
老版idea配置
![](/Images/development/old_debug_application.png)
新版idea配置
![](/Images/development/debug_application.png)

启动后可以通过[http://localhost:20303/](http://localhost:20303/) 查看eureka服务列表
![](/Images/development/debug_eureka.png)

###  linkis-mg-gateway的启动配置 

```plain
[main Class]
org.apache.linkis.gateway.springcloud.LinkisGatewayApplication

[VM Opitons]
-DserviceName=linkis-mg-gateway -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[User classpath of module]
linkis-gateway-server-support

```
注意 若出现'org.apache.logging.log4j.LoggingException: log4j-slf4j-impl cannot be present with log4j-to-slf4j' 问题 
请exclude掉，对spring-boot-starter-logging的依赖

**Public Enhancement Services组件**
### linkis-ps-publicservice的启动配置

```plain
[main Class]
org.apache.linkis.jobhistory.LinkisPublicServiceApp

[VM Opitons]
-DserviceName=linkis-ps-publicservice -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[Use classpath of module]
#linkis < 1.1.0  为linkis-jobhistory  
#linkis >= 1.1.0 为linkis-storage-script-dev-server
linkis-jobhistory
```

### linkis-ps-cs的启动配置

```plain
[main Class]
org.apache.linkis.cs.server.LinkisCSApplication

[VM Opitons]
-DserviceName=linkis-ps-cs -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[Use classpath of module]
linkis-cs-server

```
**Computation Governance Services 组件**
### linkis-cg-linkismanager启动

```plain
[main Class]
org.apache.linkis.manager.am.LinkisManagerApplication

[VM Opitons]
-DserviceName=linkis-cg-linkismanager -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[Use classpath of module]
linkis-application-manager
```
### linkis-cg-entrance启动
```plain
[main Class]
org.apache.linkis.entrance.LinkisEntranceApplication

[VM Opitons]
-DserviceName=linkis-cg-entrance -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[Use classpath of module]
linkis-entrance
```

<h4><font color="red">注：暂不支持Windows本地调试的服务</font></h4>

linkis-cg-engineplugin(ecp)：需要读取本地的ecp物料，本地调试需要先准备好对应的物料，建议在远程进行调试

linkis-cg-engineconnmanager(ecm)：暂时ecm启动引擎使用的是unix的方式，不支持windows环境

```
下面是通过正常成功安装后，linkis服务启动具体的详细命令参数 

LinkisInstallDir:完整linkis的安装目录

[linkis-mg-eureka]
nohup java  -DserviceName=linkis-mg-eureka -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-mg-eureka-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-spring-cloud-services/linkis-mg-eureka/* org.apache.linkis.eureka.SpringCloudEurekaApplication  --eureka.instance.hostname=bdpujes110001 --spring.profiles.active=eureka 2>&1 > /data/LinkisInstallDir/logs/linkis-mg-eureka.out &

[linkis-mg-gateway]
nohup java  -DserviceName=linkis-mg-gateway -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-mg-gateway-gc.log  -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-spring-cloud-services/linkis-mg-gateway/* org.apache.linkis.gateway.springcloud.LinkisGatewayApplication  2>&1 >  /data/LinkisInstallDir/logs/linkis-mg-gateway.out &

[linkis-ps-publicservice]
nohup java  -DserviceName=linkis-ps-publicservice -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-ps-publicservice-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-public-enhancements/linkis-ps-publicservice/* org.apache.linkis.jobhistory.LinkisPublicServiceApp  2>&1 > /data/LinkisInstallDir/logs/linkis-ps-publicservice.out &

[linkis-cg-linkismanager]
nohup java  -DserviceName=linkis-cg-linkismanager -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-linkismanager-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-linkismanager/* org.apache.linkis.manager.am.LinkisManagerApplication  2>&1 > /data/LinkisInstallDir/logs/linkis-cg-linkismanager.out &

[linkis-ps-cs]
nohup java  -DserviceName=linkis-ps-cs -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-ps-cs-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-public-enhancements/linkis-ps-cs/* org.apache.linkis.cs.server.LinkisCSApplication  2>&1 > /data/LinkisInstallDir/logs/linkis-ps-cs.out &

[linkis-cg-entrance] 
nohup java  -DserviceName=linkis-cg-entrance -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-entrance-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-entrance/* org.apache.linkis.entrance.LinkisEntranceApplication  2>&1 > /data/LinkisInstallDir/logs/linkis-cg-entrance.out &

[linkis-cg-engineconnmanager]
nohup java  -DserviceName=linkis-cg-engineconnmanager -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-engineconnmanager-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-engineconnmanager/* org.apache.linkis.ecm.server.LinkisECMApplication  2>&1 > /data/LinkisInstallDir/logs/linkis-cg-engineconnmanager.out &

[linkis-cg-engineplugin]
nohup java  -DserviceName=linkis-cg-engineplugin -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-engineplugin-gc.log   -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir/lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-engineplugin/* org.apache.linkis.engineplugin.server.LinkisEngineConnPluginServer  2>&1 > /data/LinkisInstallDir/logs/linkis-cg-engineplugin.out &
```

## 远程调试服务步骤

todo
