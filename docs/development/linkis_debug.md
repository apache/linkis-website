---
title: Linkis Debug
sidebar_position: 3
---

## 1 Preface
&nbsp; &nbsp; &nbsp; &nbsp; Every Linkis micro service supports debugging, most of them support local debugging, some of them only support remote debugging.

1. Services that support local debugging
- linkis-mg-eureka: set of debugging Main class is `com.webank.Wedatasphere.Linkis.Eureka.SpringCloudEurekaApplication`
- Other Linkis microservices have their own Main classes, as shown below
linkis-cg-manager: `com.webank.wedatasphere.linkis.manager.am.LinkisManagerApplication`
linkis-ps-bml: `com.webank.wedatasphere.linkis.bml.LinkisBMLApplication`
linkis-ps-cs: `com.webank.wedatasphere.linkis.cs.server.LinkisCSApplication`
linkis-cg-engineconnmanager: `com.webank.wedatasphere.linkis.ecm.server.LinkisECMApplication`
linkis-cg-engineplugin: `com.webank.wedatasphere.linkis.engineplugin.server.LinkisEngineConnPluginServer`
linkis-cg-entrance: `com.webank.wedatasphere.linkis.entrance.LinkisEntranceApplication`
linkis-ps-publicservice: `com.webank.wedatasphere.linkis.jobhistory.LinkisPublicServiceAppp`
linkis-ps-datasource: `com.webank.wedatasphere.linkis.metadata.LinkisDataSourceApplication`
linkis-mg-gateway: `com.webank.wedatasphere.linkis.gateway.springcloud.LinkisGatewayApplication`

2. Services that only support remote debugging:
The EngineConnManager service and the Engine service started by ECM only support remote debugging.

## 2. Local debugging service steps
&nbsp; &nbsp; &nbsp; &nbsp; Linkis and DSS both rely on Eureka for their services, so you need to start the Eureka service first. The Eureka service can also use the Eureka that you have already started. Once Eureka is started, you can start other services.

2.1 Eureka service start
1. If you do not want the default port 20303, you can modify the port configuration:

```yml
File path: conf/application-eureka.yml
Port to be modified in config file:

server:
    Port: 8080 # Port to setup
```

2. Then to add debug configuration in IDEA

You can do this by clicking Run or by clicking Add Configuration in the image below

![01](/Images/Tunning_and_Troubleshooting/debug-01.png)

3. Then click Add Application and modify the information

- Set the debug name first: Eureka, for example
- Then set the Main class:
`com.webank.wedatasphere.linkis.eureka.SpringCloudEurekaApplication`
- Finally, set the Class Path for the service. For Eureka, the classPath module is linkis-eureka

![02](/Images/Tunning_and_Troubleshooting/debug-02.png)

4. Click the Debug button to start the Eureka service and access the Eureka page through [http://localhost:8080/](at)

![03](.. /Images/Tunning_and_Troubleshooting/debug-03.png)

2.2 Other services

1. The Eureka configuration of the corresponding service needs to be modified. The Application.yml file needs to be modified

```
    conf/application-linkis.yml
```
Change the corresponding Eureka address to the Eureka service that has been started:

```
    eureka:
    client:
    serviceUrl:
    defaultZone: http://localhost:8080/eureka/
```

2. Modify the configuration related to Linkis. The general configuration file is in conf/linkis.properties, and the corresponding configuration of each module is in the properties file beginning with the module name in conf directory.

3. Then add debugging service

The Main Class is uniformly set to its own Main Class for each module, which is listed in the foreword.
The Class Path of the service is the corresponding module:

```
linkis-cg-manager: linkis-application-manager
linkis-ps-bml: linkis-bml
linkis-ps-cs: `com.webank.wedatasphere.linkis.cs.server.LinkisCSApplication`
linkis-cg-engineconnmanager: linkis-cs-server
linkis-cg-engineplugin: linkis-engineconn-plugin-server
linkis-cg-entrance: linkis-entrance
linkis-ps-publicservice: linkis-jobhistory
linkis-ps-datasource: linkis-metadata
linkis-mg-gateway: linkis-spring-cloud-gateway
```

And check provide:

![06](/Images/Tunning_and_Troubleshooting/debug-06.png)

4. Then start the service and you can see that the service is registered on the Eureka page:

![05](/Images/Tunning_and_Troubleshooting/debug-05.png)

Linkis-PS-PublicService should add a public-module Module to the POM.

```
<dependency>
    <groupId>com.webank.wedatasphere.linkis</groupId>
    <artifactId>public-module</artifactId>
    <version>${linkis.version}</version>
</dependency>
```

## 3. Steps of remote debugging service
&nbsp; &nbsp; &nbsp; &nbsp; Each service supports remote debugging, but you need to turn it on ahead of time. There are two types of remote debugging, one is the remote debugging of Linkis common service, and the other is the remote debugging of EngineConn, which are described as follows:

1. Remote debugging of common service:

A. First, modify the startup script file of the corresponding service under sbin/ext directory, and add debug port:

```
export $SERVER_JAVA_OPTS =" -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=10092"
```

Added: '-agentlib: JDWP = Transport = DT_Socket, Server = Y, Suspend = N, Address =10092' where ports may conflict and can be changed to available ports.

B. Create a new remote debug in IDEA. Select Remote first, then add host and port for the service, and then select the debug module

![07](/Images/Tunning_and_Troubleshooting/debug-07.png)

3. Then click the Debug button to complete the remote debugging

![08](/Images/Tunning_and_Troubleshooting/debug-08.png)

2. Remote debugging of engineConn:

A. Add the following configuration items to the linkis-engineconn.properties file corresponding to EngineConn
```
wds.linkis.engineconn.debug.enable=true
```

This configuration item will randomly assign a debug port when engineConn starts.

B. In the first line of the engineConn log, the actual assigned port is printed.
```
      Listening for transport dt_socket at address: 26072
```

C. Create a new remote debug in IDEA. The steps have been described in the previous section and will not be repeated here.