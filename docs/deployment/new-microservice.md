---
title: How to register a new microservice
sidebar_position: 6
---
# How to register a new microservice

This article introduces how to register a new microservice during local debugging and in the Linux environment, so as to facilitate lighter learning, use and debugging.

mind Mapping:

![Mind Map](/Images/deployment/microservice/thinking.png)


## 1. Register a new microservice locally

This paragraph records how to configure and register a new microservice belonging to linkis in IDEA

**Hardware Requirements**
-jdk1.8
- maven3.5+

### 1.1 Create a new linkis-new-microservice submodule
**Note**: The new sub-module under which module is not fixed and depends on the situation, here is just an example.

- Right mouse button under the linkis-public-enhancements module

![new-module](/Images/deployment/microservice/new-module.png)

- Select maven and click Nex to next step

![maven-module](/Images/deployment/microservice/maven-module.png)

- Enter the module name and click Finsh

![name-module](/Images/deployment/microservice/name-module.png)

- created successfully

![created-successfully](/Images/deployment/microservice/created-successfully.png)

#### 1.1.1 Modify the pom.xml file of the linkis-new-microservice module

**path**: linkis-public-enhancements/linkis-new-microservice/pom.xml

``` 
## add dependencies
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


#### 1.1.2 Add linkis-new-microservice.properties file

**path**: linkis-dist/package/conf/linkis-new-microservice.properties

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
wds.linkis.server.mybatis.mapperLocations=classpath*:org/apache/linkis/newmicroservice/server/dao/mapper/*.xml 
wds.linkis.server.mybatis.typeAliasesPackage=org.apache.linkis.newmicroservice.server.domain
wds.linkis.server.mybatis.BasePackage=org.apache.linkis.newmicroservice.server.dao



##Spring
spring.server.port=9208 #Never use the same port as other services

```


#### 1.1.3 modify distribution.xml

**path**: linkis-dist/src/main/assembly/distribution.xml


Add fileSet configuration, changing the configuration is mainly to control the output linkis-new-microservice service package when compiling and packaging

![fileset](/Images/deployment/microservice/fileset.png)

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

![test-mode](/Images/deployment/microservice/test-mode.png)

Only the configuration content that needs to be added is posted here.

``` properties

wds.linkis.test.mode=true #Since the interface debugging needs to be carried out later, it needs to be changed to the test mode here

```

### 1.2 Code Development

To make it easier for everyone to learn, let's take creating a simple API interface as an example.

#### 1.2.1 New NewMicroservice class

![new-microservice](/Images/deployment/microservice/new-microservice.png)

``` Class
package org.apache.linkis.newmicroservice.server.restful;


import io.swagger.annotations.ApiOperation;
import org.apache.linkis.server.Message;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;

import java.util.HashMap;
import java.util.Map;

@Api(tags = "newmicroservice")
@RestController
@RequestMapping(path = "/newmicroservice")
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

![maven-module](/Images/deployment/microservice/start-up.png)

``` Class

package org.apache.linkis.newmicroservice.server;

import org.apache.linkis.LinkisBaseServerApp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class LinkisNewMicroserviceApplication {

  private static final Log logger = LogFactory.getLog(LinkisNewMicroserviceApplication.class);

  public static void main(String[] args) throws ReflectiveOperationException {
    logger.info("Start to running LinkisNewmicroserviceApplication");
    LinkisBaseServerApp.main(args);
  }
}
```
### 1.3 Start eureka service

The specific guidelines for this step have been written in the [Debugging Guidelines](../development/debug) document and can be directly accessed, so I won’t introduce too much here

### 1.4 Start the linkis-new-microservice service

Set the startup Application of linkis-new-microservice

![commissioning-service](/Images/deployment/microservice/commissioning-service.png)

Parameter explanation:

```shell
[Service Name]
linkis-new-microservice

[Module Name]
linkis-new-microservice

[VM Opitons]
-DserviceName=linkis-new-microservice -Xbootclasspath/a:{YourPathPrefix}/incubator-linkis/linkis-dist/package/conf 

[main Class]
org.apache.linkis.newmicroservice.server.LinkisNewmicroserviceApplication

[Add provided scope to classpath]
By checking Include dependencies with “Provided” scope, you can introduce provided-level dependency packages during debugging.
```

After the above settings are completed, the Application can be run directly. After the operation is successful, open the browser and enter the url of the eureka registry

``` url
    http://ip:port/ 
```

![new-service](/Images/deployment/microservice/new-service.png)

When the linkis-new-microservice service appears in the eureka registration center, the local registration of the new microservice is successful.

### 1.5 Postman for interface debugging
**URL**: http://ip:port/api/rest_j/v1/newmicroservice/establish

![postman-test](/Images/deployment/microservice/postman-test.png)

## 2. Register new microservice in linux environment

### 2.1 Linux server

hardware requirements
Install nearly 10 linkis microservice, at least 3G memory. **The default jvm -Xmx memory size of each microservice is 512M (if the memory is not enough, you can try to reduce it to 256/128M, and you can also increase it if the memory is enough)


### 2.2 Add linkis-new-microservice file

![new-configuration](/Images/deployment/microservice/new-configuration.png)

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


### 2.3 linkis-start-all.sh configuration modification

**path**: linkis-dist/package/sbin/linkis-start-all.sh


![start-script](/Images/deployment/microservice/start-script.png)

Only the configuration content that needs to be added is posted here.

``` sh
	## startup script
    #linkis-new-microservice
    SERVER_NAME="new-microservice" 
    startApp
```

![detection-script](/Images/deployment/microservice/detection-script.png)

Only the configuration content that needs to be added is posted here.

``` sh
	##detection script
    #linkis-new-microservice
    SERVER_NAME="new-microservice"
    checkServer
```

### 2.4 linkis-stop-all.sh Configuration modification

**path**:linkis-dist/package/sbin/linkis-stop-all.sh

![stop-script](/Images/deployment/microservice/stop-script.png)

Only the configuration content that needs to be added is posted here

``` sh
	## stop script
    #linkis-new-microservice
    export SERVER_NAME="new-microservice"
    stopApp
```
### 2.5 Installation package preparation

The specific guidelines for this step have been written in the [backend compilation](../development/build) document and can be directly accessed, so I won’t introduce too much here

### 2.6 Server Deployment

Here is an example of single-machine deployment, and the specific guidance of this step has been written in the [Single-machine deployment](../deployment/deploy-quick) document and can be accessed directly, so I won’t introduce it here

After the installation and deployment is successful, you can directly visit the eureka registration center in the browser to see whether the center has successfully registered the linkis-new-microservice service. If the registration is successful, the creation of a new microservice is successful.

![new-service](/Images/deployment/microservice/new-service.png)