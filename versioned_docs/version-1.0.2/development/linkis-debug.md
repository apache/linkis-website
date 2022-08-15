---
title: Linkis Debug
sidebar_position: 2
---

# Debugging related

> Because linkis itself has many modules, it is difficult to debug, the following will guide you how to perform a local service debugging (based on version 1.0.3).

<h4><font color="red">Before version 1.0.3, linkis has not yet entered apache incubation. The organization still belongs to webank. The package name of the main class is `org.apache.linkis`. Pay attention to the distinction when debugging. </font></h4>

## step 1 Prepare source code and compile

```plain
git clone https://github.com/apache/incubator-linkis.git
cd incubator-linkis
#If needed, you can switch to the corresponding branch
#git checkout dev-xxx
mvn -N install
mvn clean install
```

## step2 Necessary parameter configuration

For the configuration file under incubator-linkis/assembly-combined-package/assembly-combined/conf/, you need to configure the database and hive meta and other necessary startup parameters.




## step3 Adjust log4j.xml configuration

In order to facilitate the printing of logs to the console during debugging, you need to modify the default log4j2.xml file and modify the appender to default to console. You need to remove the append of the default RollingFile and add the appender of the console, as shown below:
![](/Images/development/debug_log.png)
log4j2.xml path incubator-linkis/assembly-combined-package/assembly-combined/conf/log4j2.xml

```plain
 <?xml version="1.0" encoding="UTF-8"?>
<configuration status="error" monitorInterval="30">
<appenders>
    <RollingFile name="RollingFile" append="false" fileName="logs/${sys:serviceName}.log"
                 filePattern="logs/$${date:yyyy-MM}/${sys:serviceName}/linkis-log-%d{yyyy-MM-dd}-%i.log">
        <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level] [%-40t] %c{1.} (%L) [%M]-%msg%xEx %n"/>
        <SizeBasedTriggeringPolicy size="100MB"/>
        <DefaultRolloverStrategy max="10"/>
    </RollingFile>
    
    <Console name="Console" target="SYSTEM_OUT">
        <ThresholdFilter level="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
        <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%t] %logger{36} %L %M-%msg%xEx%n"/>
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

## step 4 Overall debugging plan
Both Linkis and DSS services rely on Eureka, so you need to start the Eureka service first, and the Eureka service can also use the Eureka you have started. After Eureka is started, other services can be started.

Because linkis internally uses the -DserviceName parameter to set the application name and the configuration file used, so -DserviceName is a necessary startup VM parameter

You can use the "-Xbootclasspath/a: configuration file path" command. Append the configuration file to the end of the search path of the bootloader class, and add the dependent configuration file to the classpath

By checking Include dependencies with "Provided" scope, you can introduce provided-level dependency packages during debugging.

**Microservice Governance Services component**

### Start of linkis-mg-eureka

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
If you don’t want the default port 20303, you can modify the port configuration:
```yml
File path: conf/application-eureka.yml
Modify the port:
server:
  port: 8080 ##Started port
```
The specific configuration is as follows
![](/Images/development/debug_application.png)

After startup, you can view the list of eureka services through [http://localhost:20303/](http://localhost:20303/)
![](/Images/development/debug_eureka.png)

### Linkis-mg-gateway startup configuration

```plain
[main Class]
org.apache.linkis.gateway.springcloud.LinkisGatewayApplication

[VM Opitons]
-DserviceName=linkis-mg-gateway -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[User classpath of module]
linkis-gateway-server-support

```
Note If there is a problem of'org.apache.logging.log4j.LoggingException: log4j-slf4j-impl cannot be present with log4j-to-slf4j'
Please exclude, the dependency on spring-boot-starter-logging

**Public Enhancement Services component**
### Linkis-ps-publicservice startup configuration

```plain
[main Class]
org.apache.linkis.jobhistory.LinkisPublicServiceApp

[VM Opitons]
-DserviceName=linkis-ps-publicservice -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[User classpath of module]
linkis-jobhistory
```

### Linkis-ps-cs startup configuration

```plain
[main Class]
org.apache.linkis.cs.server.LinkisCSApplication

[VM Opitons]
-DserviceName=linkis-ps-cs -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[User classpath of module]
linkis-cs-server

```

**Computation Governance Services component**
### linkis-cg-linkismanager start

```plain
[main Class]
org.apache.linkis.manager.am.LinkisManagerApplication

[VM Opitons]
-DserviceName=linkis-cg-linkismanager -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[User classpath of module]
linkis-application-manager
```
### linkis-cg-entrance start
```plain
[main Class]
org.apache.linkis.entrance.LinkisEntranceApplication

[VM Opitons]
-DserviceName=linkis-cg-entrance -Xbootclasspath/a:D:\yourDir\incubator-linkis\assembly-combined-package\assembly-combined\conf

[User classpath of module]
linkis-entrance
```

<h4><font color="red">Note: Windows local debugging service is not currently supported</font></h4>

linkis-cg-engineplugin(ecp): Need to read local ecp materials, local debugging needs to prepare the corresponding materials first, it is recommended to debug remotely

linkis-cg-engineconnmanager(ecm): temporarily ecm starts the engine using the unix method and does not support the windows environment

```
The following are the specific detailed command parameters for starting the linkis service after a normal and successful installation

LinkisInstallDir: complete linkis installation directory

[linkis-mg-eureka]
nohup java -DserviceName=linkis-mg-eureka -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-mg-eureka-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-spring-cloud-services/linkis-mg-eureka/* org.apache.linkis.eureka.SpringCloudEurekaApplication --eureka.instance.hostname=bdpujes110001 --spring.profiles.active=eureka 2>&1> / data/LinkisInstallDir/logs/linkis-mg-eureka.out &

[linkis-mg-gateway]
nohup java -DserviceName=linkis-mg-gateway -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-mg-gateway-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-spring-cloud-services/linkis-mg-gateway/* org.apache.linkis.gateway.springcloud.LinkisGatewayApplication 2>&1> /data/LinkisInstallDir/logs/linkis-mg-gateway.out &

[linkis-ps-publicservice]
nohup java -DserviceName=linkis-ps-publicservice -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-ps-publicservice-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-public-enhancements/linkis-ps-publicservice/* org.apache.linkis.jobhistory.LinkisPublicServiceApp 2>&1> /data/LinkisInstallDir /logs/linkis-ps-publicservice.out &

[linkis-cg-linkismanager]
nohup java -DserviceName=linkis-cg-linkismanager -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-linkismanager-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-linkismanager/* org.apache.linkis.manager.am.LinkisManagerApplication 2>&1> /data /LinkisInstallDir/logs/linkis-cg-linkismanager.out &

[linkis-ps-cs]
nohup java -DserviceName=linkis-ps-cs -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-ps-cs-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-public-enhancements/linkis-ps-cs/* org.apache.linkis.cs.server.LinkisCSApplication 2>&1> /data /LinkisInstallDir/logs/linkis-ps-cs.out &

[linkis-cg-entrance]
nohup java -DserviceName=linkis-cg-entrance -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-entrance-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-entrance/* org.apache.linkis.entrance.LinkisEntranceApplication 2>&1> /data/LinkisInstallDir /logs/linkis-cg-entrance.out &

[linkis-cg-engineconnmanager]
nohup java -DserviceName=linkis-cg-engineconnmanager -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-engineconnmanager-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-engineconnmanager/* org.apache.linkis.ecm.server.LinkisECMApplication 2>&1> /data /LinkisInstallDir/logs/linkis-cg-engineconnmanager.out &

[linkis-cg-engineplugin]
nohup java -DserviceName=linkis-cg-engineplugin -Xmx512M -XX:+UseG1GC -Xloggc:/data/LinkisInstallDir/logs/linkis-cg-engineplugin-gc.log -cp /data/LinkisInstallDir/conf/:/data/LinkisInstallDir /lib/linkis-commons/public-module/*:/data/LinkisInstallDir/lib/linkis-computation-governance/linkis-cg-engineplugin/* org.apache.linkis.engineplugin.server.LinkisEngineConnPluginServer 2>&1> /data /LinkisInstallDir/logs/linkis-cg-engineplugin.out &
```

## Remote debugging service steps

todo
