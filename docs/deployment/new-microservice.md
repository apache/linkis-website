---
title: How to register a new microservice
sidebar_position: 5.3
---
# How to register a new microservice

This article describes how to register a new microservice during local debugging and in the Linux environment to facilitate more lightweight learning, use and debugging.

### 1 Register a new microservice locally

This section documents how to configure and register a new microservice belonging to linkis in IDEA

Mind mapping:

![image](https://user-images.githubusercontent.com/106590848/201465730-f957c767-539b-4cce-9ffc-907b791f169c.png)
**Hardware requirements**
- jdk1.8
- maven3.5+

### 1.1 Create a new linkis-new-microservices submodule

**Note**: Under what module to create a new submodule, this is not fixed depending on the situation, here is just an example.

- Right mouse button under the linkis-public-enhancements module

![image](https://user-images.githubusercontent.com/106590848/201453748-0b8ada31-7190-4817-a1a2-32ba20db3743.png)

- Select maven and click Nex Next

![image](https://user-images.githubusercontent.com/106590848/201453787-55983124-c6b9-4893-89dd-e7542a27ef5e.png)

- Enter the module name and click Finsh

![image](https://user-images.githubusercontent.com/106590848/201453852-8d8a9364-4b00-418f-aee8-98fbc39020dd.png)

- created successfully

![image](https://user-images.githubusercontent.com/106590848/201453947-b029d666-d1dc-49a3-a49f-df8c9260b5da.png)


#### 1.1.1 Modify the pom.xml file of the linkis-new-microservice module

## Here is the pom.xml under the new module
**path**: linkis-public-enhancements/linkis-new-microservice/pom.xml

``` 
## 添加依赖
  <dependency>
      <groupId>org.apache.linkis</groupId>
      <artifactId>linkis-module</artifactId>
      <version>${project.version}</version>
      <exclusions>
        <exclusion>
          <groupId>org.ow2.asm</groupId>
          <artifactId>asm</artifactId>
        </exclusion>
      </exclusions>
  </dependency>

  <dependency>
      <groupId>org.apache.linkis</groupId>
      <artifactId>linkis-mybatis</artifactId>
      <version>${project.version}</version>
  </dependency>
```



#### 1.1.2 Added linkis-new-microservice.properties file

**path**: linkis-dist/package/conf/linkis-new-microservices.properties

``` properties
# 
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#


##restful
wds.linkis.server.restful.scan.packages=org.apache.linkis.newmicroservice.server.restful  ## 如不需提供接口Api则无需添加此配置

##mybatis
wds.linkis.server.mybatis.mapperLocations=classpath*:org/apache/linkis/newmicroservices/server/dao/mapper/*.xml 
wds.linkis.server.mybatis.typeAliasesPackage=org.apache.linkis.newmicroservices.server.domain
wds.linkis.server.mybatis.BasePackage=org.apache.linkis.newmicroservices.server.dao



##Spring
spring.server.port=9208 #Never use the same port as other services

```


#### 1.1.3 Modify distribution.xml

**path**: linkis-dist/src/main/assembly/distribution.xml


Add fileSet configuration, changing the configuration is mainly to control the output linkis-new-microservice service package when compiling and packaging

![image](https://user-images.githubusercontent.com/106590848/201454790-2c8ceade-91fe-43af-b69f-ad47fdb4b6b5.png)

Only the configuration content that needs to be added is posted here.

``` 

   <fileSet>
            <directory>
                ../linkis-public-enhancements/linkis-new-microservice/target/out/lib
            </directory>
            <outputDirectory>
                linkis-package/lib/linkis-public-enhancements/linkis-new-microservice
            </outputDirectory>
            <includes>
                <include>**/*</include>
            </includes>
   </fileSet>

```

#### 1.1.4 Modify linkis.properties configuration

**path**: linkis-dist/package/conf/linkis.properties

![image](https://user-images.githubusercontent.com/106590848/201456815-5d377a91-69ac-494e-9b76-f5d6393faf44.png)

Only the configuration content that needs to be added is posted here.

``` properties

wds.linkis.test.mode=true #Since the interface debugging needs to be carried out later, it needs to be changed to the test mode here

```


### 1.2 Code Development

To make it easier for everyone to learn, let's take creating a simple API interface as an example.

#### 1.2.1 New NewMicroservice class

![image](https://user-images.githubusercontent.com/106590848/201456425-242e2146-05ba-485c-81e4-3f432051b765.png)

``` Class
package org.apache.linkis.newmicroservice.server.restful;


import io.swagger.annotations.ApiOperation;
import org.apache.linkis.server.Message;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;

import java.util.HashMap;
import java.util.Map;

@Api(tags = "newMicroservices")
@RestController
@RequestMapping(path = "/newMicroservices")
public class NewMicroservice {


    @ApiOperation(value = "establish", httpMethod = "GET")
    @RequestMapping(path = "establish", method = RequestMethod.GET)
    public Message list() {
        Map&lt;String,String&gt; map=new HashMap&lt;&gt;();
        map.put("NewMicroservice","Hello! This is a new microservice I registered(这是我注册的一个新的微服务)");
        return Message.ok("").data("map", map);
    }

}
```

#### 1.2.2 Create a new LinkisNewMicroserviceApplication startup class

![image](https://user-images.githubusercontent.com/106590848/201456437-25d5280d-44e0-47fb-961f-1243d656092f.png)

``` Class

package org.apache.linkis.newmicroservice.server;

import org.apache.linkis.LinkisBaseServerApp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class LinkisNewMicroserviceApplication {

  private static final Log logger = LogFactory.getLog(LinkisNewMicroserviceApplication.class);

  public static void main(String[] args) throws ReflectiveOperationException {
    logger.info("Start to running LinkisNewMicroservicesApplication");
    LinkisBaseServerApp.main(args);
  }
}
```

### 1.3 Start the eureka service

The specific guidelines for this step have been written in the [Debugging Guide](../development/debug) document and can be accessed directly, so I will not introduce too much here.
### 1.4 Start the linkis-new-microservices service

Set the startup Application of linkis-new-microservices

![image](https://user-images.githubusercontent.com/106590848/201056682-660ecc73-e141-426c-8911-b52a744c975e.png)

Parameter explanation:

```shell
[Service Name]
linkis-new-microservices

[Module Name]
linkis-new-microservices

[VM Opitons]
-DserviceName=linkis-new-microservices -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf 

[main Class]
org.apache.linkis.newmicroservices.server.LinkisNewMicroservicesApplication

[Add provided scope to classpath]
By checking Include dependencies with “Provided” scope, you can introduce provided-level dependency packages during debugging.
```

After the above settings are completed, the Application can be run directly. After running successfully, open the browser and enter the url of the eureka registration center

``` url
    http://ip:port/ 
```

![image](https://user-images.githubusercontent.com/106590848/201058281-c73f99b5-71cf-4cfe-aded-ec2f5f35f447.png)

When the linkis-new-microservices service appears in the eureka registry, the new microservice is successfully registered locally.

### 1.5 Postman for interface debugging

**URL**: http://ip:port/api/rest_j/v1/newMicroservices/establish

![image](https://user-images.githubusercontent.com/106590848/201456985-f857d824-d8e9-4b84-9db4-e50cc647288d.png)

## 2. Register new microservices in linux environment

### 2.1 Linux server

hardware requirements
Install nearly 10 linkis microservices, at least 3G memory. **The default jvm -Xmx memory size of each microservice is 512M (if the memory is not enough, you can try to reduce it to 256/128M, and you can also increase it if the memory is enough)


#### 2.2 Add linkis-new-microservice file

![image](https://user-images.githubusercontent.com/106590848/201459625-76b0de2d-8869-48fc-8899-1779fcc5a100.png)

``` sh

#!/usr/bin/env bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# description:  manager start cmd
#
# Modified for Linkis 1.0.0


export SERVER_SUFFIX="linkis-public-enhancements/linkis-new-microservice"


export SERVER_CLASS=org.apache.linkis.newmicroservice.server.LinkisNewMicroserviceApplication

#export DEBUG_PORT=

export COMMON_START_BIN=$LINKIS_HOME/sbin/ext/linkis-common-start
if [[ ! -f "${COMMON_START_BIN}" ]]; then
    echo "The $COMMON_START_BIN  does not exist!"
    exit 1
else
    sh $COMMON_START_BIN
fi

```


#### 2.3 linkis-start-all.sh configuration modification

**path**: linkis-dist/package/sbin/linkis-start-all.sh


![image](https://user-images.githubusercontent.com/106590848/201459497-7c2e0752-5c85-4f79-a183-c7c3e83a2380.png)

Only the configuration content that needs to be added is posted here.

``` sh
	## startup script
    #linkis-new-microservice
    SERVER_NAME="new-microservice" 
    startApp

	## detection script
    #linkis-new-microservice
    SERVER_NAME="new-microservice"
    checkServer
```

#### 2.4 linkis-stop-all.sh configuration modification

**path**:linkis-dist/package/sbin/linkis-stop-all.sh

![image](https://user-images.githubusercontent.com/106590848/201459539-cf0eafea-10f6-424f-b2d3-670faf1d46d5.png)

Only the configuration content that needs to be added is posted here.

``` sh
	## stop script
    #linkis-new-microservice
    export SERVER_NAME="new-microservice"
    stopApp
```
### 2.5 Installation package preparation

The specific guidelines for this step have been written in the [backend compilation](../development/build) document and can be accessed directly, so I won't introduce too much here.

### 2.6 Upload the installation package to the server

Here is an example of single-machine deployment, and the specific instructions of this step have been written in the [Single-machine deployment](../deployment/deploy-quick) document and can be accessed directly, so I won’t introduce too much here.

When the installation and deployment are successful, you can directly access the eureka registration center in the browser to see whether the center has successfully registered the linkis-new-microservices service. If the registration is successful, the creation of a new microservice is successful.

![Microservices](https://user-images.githubusercontent.com/106590848/201459777-c41f3631-c434-4318-b7ca-dc92e75e721b.png)