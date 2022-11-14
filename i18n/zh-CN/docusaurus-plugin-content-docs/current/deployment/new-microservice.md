---
title: 如何注册一个新的微服务
sidebar_position: 6
---

# 如何注册一个新的微服务

这篇文章介绍一下如何在本地调试时以及linux环境下注册一个新的微服务，以方便更轻量化的学习使用和调试。

思维导图：

![思维导图](/Images-zh/deployment/microservice/thinking.png)


## 1. 本地注册新的微服务

该段记录了如何在IDEA中配置和以及注册一个属于linkis新的微服务

**硬件要求**
- jdk1.8
- maven3.5+

### 1.1 新建linkis-new-microservice子模块

**注意**:在什么模块下新建子模块，这个并不是固定的因情况而定，这里只是举例子。

- linkis-public-enhancements模块下鼠标右键

![new-module](/Images-zh/deployment/microservice/new-module.png)

- 选择maven点击Nex下一步

![maven-module](/Images-zh/deployment/microservice/maven-module.png)

- 输入模块名点击Finsh

![name-module](/Images-zh/deployment/microservice/name-module.png)

- 创建成功

![created-successfully](/Images-zh/deployment/microservice/created-successfully.png)

#### 1.1.1 修改linkis-new-microservice模块的pom.xml文件

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



#### 1.1.2 新增linkis-new-microservice.properties文件

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
spring.server.port=9208 #切勿与其他服务的端口相同

```


#### 1.1.3 修改distribution.xml

**path**: linkis-dist/src/main/assembly/distribution.xml


添加fileSet 配置，改配置主要是控制编译打包时的能输出linkis-new-microservice服务包

![fileset](/Images-zh/deployment/microservice/fileset.png)

这里只贴出来需要新增的配置内容。

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

#### 1.1.4 修改linkis.properties  配置

**path**: linkis-dist/package/conf/linkis.properties

![test-mode](/Images-zh/deployment/microservice/test-mode.png)

这里只贴出来需要新增的配置内容。

``` properties

wds.linkis.test.mode=true #由于后续需进行接口调试，因此这里需改为测试模式

```


### 1.2 代码开发

为方便大家学习，现以创建一个简单的API接口为示例。

#### 1.2.1 新建 NewMicroservice 类

![new-microservice](/Images-zh/deployment/microservice/new-microservice.png)

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

#### 1.2.2 新建 LinkisNewMicroserviceApplication启动类

![maven-module](/Images-zh/deployment/microservice/start-up.png)

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

### 1.3 启动eureka服务

这一步骤的具体指引在 [调试指引](../development/debug)  文档中已有写 可直接访问，这里就不在过多介绍

### 1.4 启动linkis-new-microservice服务

设置linkis-new-microservice的启动Application

![commissioning-service](/Images-zh/deployment/microservice/commissioning-service.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

上述设置完成之后，可直接运行此Application。运行成功后打开浏览器输入eureka注册中心的url

``` url
    http://ip:port/ 
```

![new-service](/Images-zh/deployment/microservice/new-service.png)

当eureka注册中心出现linkis-new-microservice服务即为本地注册新的微服务成功。

### 1.5 Postman 进行接口调试

**URL**: http://ip:port/api/rest_j/v1/newmicroservice/establish

![postman-test](/Images-zh/deployment/microservice/postman-test.png)

## 2. linux环境下注册新的微服务

### 2.1 Linux服务器

硬件要求
安装linkis 微服务近10个，至少3G内存。**每个微服务默认配置启动的jvm -Xmx 内存大小为 512M(内存不够的情况下，可以尝试调小至256/128M，内存足够情况下也可以调大)


### 2.2 新增linkis-new-microservice文件

![new-configuration](/Images-zh/deployment/microservice/new-configuration.png)

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


### 2.3 linkis-start-all.sh 配置修改

**path**: linkis-dist/package/sbin/linkis-start-all.sh

![start-script](/Images-zh/deployment/microservice/start-script.png)

这里只贴出来需要新增的配置内容。

``` sh
	## 启动脚本
    #linkis-new-microservice
    SERVER_NAME="new-microservice" 
    startApp
```

![detection-script](/Images-zh/deployment/microservice/detection-script.png)

这里只贴出来需要新增的配置内容。

``` sh
	##检测脚本
    #linkis-new-microservice
    SERVER_NAME="new-microservice"
    checkServer
```

### 2.4 linkis-stop-all.sh 配置修改

**path**:linkis-dist/package/sbin/linkis-stop-all.sh

![stop-script](/Images-zh/deployment/microservice/stop-script.png)

这里只贴出来需要新增的配置内容。

``` sh
	## 停止脚本
    #linkis-new-microservice
    export SERVER_NAME="new-microservice"
    stopApp
```

### 2.5 安装包准备

这一步骤的具体指引在 [后端编译](../development/build)  文档中已有写 可直接访问，这里就不在过多介绍

### 2.6 服务器部署

这里为单机部署做示例，而该步骤的具体指引在 [单机部署](../deployment/deploy-quick)  文档中已有写 可直接访问，这里就不在过多介绍

当安装部署成功后可直接在浏览器中访问eureka注册中心，看中心是否已经成功注册linkis-new-microservice服务，如注册成功即为创建新的微服务成功。

![new-service](/Images-zh/deployment/microservice/new-service.png)