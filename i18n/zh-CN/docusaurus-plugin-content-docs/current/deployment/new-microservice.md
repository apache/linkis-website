---
title: 如何注册一个新的微服务
sidebar_position: 5.3
---

# 如何注册一个新的微服务

这篇文章介绍一下如何在本地调试时以及linux环境下注册一个新的微服务，以方便更轻量化的学习使用和调试。

思维导图：

![image](https://user-images.githubusercontent.com/106590848/201465421-0b237c0a-2fce-41e6-88a4-a5bacf8ba453.png)



### 1 本地注册新的微服务

该段记录了如何在IDEA中配置和以及注册一个属于linkis新的微服务

**硬件要求**
- jdk1.8
- maven3.5+

### 1.1 新建linkis-new-microservices子模块

**注意**:在什么模块下新建子模块，这个并不是固定的因情况而定，这里只是举例子。

- linkis-public-enhancements模块下鼠标右键

![image](https://user-images.githubusercontent.com/106590848/201453748-0b8ada31-7190-4817-a1a2-32ba20db3743.png)

- 选择maven点击Nex下一步

![image](https://user-images.githubusercontent.com/106590848/201453787-55983124-c6b9-4893-89dd-e7542a27ef5e.png)

- 输入模块名点击Finsh

![image](https://user-images.githubusercontent.com/106590848/201453852-8d8a9364-4b00-418f-aee8-98fbc39020dd.png)

- 创建成功

![image](https://user-images.githubusercontent.com/106590848/201453947-b029d666-d1dc-49a3-a49f-df8c9260b5da.png)


#### 1.1.1 修改linkis-new-microservice模块的pom.xml文件

##此处为新建模块下的pom.xml
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
spring.server.port=9208 #切勿与其他服务的端口相同

```


#### 1.1.3 修改distribution.xml

**path**: linkis-dist/src/main/assembly/distribution.xml


添加fileSet 配置，改配置主要是控制编译打包时的能输出linkis-new-microservice服务包

![image](https://user-images.githubusercontent.com/106590848/201454790-2c8ceade-91fe-43af-b69f-ad47fdb4b6b5.png)

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

![image](https://user-images.githubusercontent.com/106590848/201456815-5d377a91-69ac-494e-9b76-f5d6393faf44.png)

这里只贴出来需要新增的配置内容。

``` properties

wds.linkis.test.mode=true #由于后续需进行接口调试，因此这里需改为测试模式

```


### 1.2 代码开发

为方便大家学习，现以创建一个简单的API接口为示例。

#### 1.2.1 新建 NewMicroservice 类

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

#### 1.2.2 新建 LinkisNewMicroserviceApplication启动类

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

### 1.3 启动eureka服务

这一步骤的具体指引在 [调试指引](../development/debug)  文档中已有写 可直接访问，这里就不在过多介绍

### 1.4 启动linkis-new-microservices服务

设置linkis-new-microservices的启动Application

![image](https://user-images.githubusercontent.com/106590848/201056682-660ecc73-e141-426c-8911-b52a744c975e.png)

参数解释：

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
通过勾选Include dependencies with “Provided” scope ，可以在调试时，引入provided级别的依赖包。
```

上述设置完成之后，可直接运行此Application。运行成功后打开浏览器输入eureka注册中心的url

``` url
    http://ip:port/ 
```

![image](https://user-images.githubusercontent.com/106590848/201058281-c73f99b5-71cf-4cfe-aded-ec2f5f35f447.png)

当eureka注册中心出现linkis-new-microservices服务即为本地注册新的微服务成功。

### 1.5 Postman 进行接口调试

**URL**: http://ip:port/api/rest_j/v1/newMicroservices/establish

![image](https://user-images.githubusercontent.com/106590848/201456985-f857d824-d8e9-4b84-9db4-e50cc647288d.png)


## 2. linux环境下注册新的微服务

### 2.1 Linux服务器

硬件要求
安装linkis 微服务近10个，至少3G内存。**每个微服务默认配置启动的jvm -Xmx 内存大小为 512M(内存不够的情况下，可以尝试调小至256/128M，内存足够情况下也可以调大)


#### 2.2 新增linkis-new-microservice文件

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


#### 2.3 linkis-start-all.sh 配置修改

**path**: linkis-dist/package/sbin/linkis-start-all.sh


![image](https://user-images.githubusercontent.com/106590848/201459497-7c2e0752-5c85-4f79-a183-c7c3e83a2380.png)

这里只贴出来需要新增的配置内容。

``` sh
	## 启动脚本
    #linkis-new-microservice
    SERVER_NAME="new-microservice" 
    startApp

	##检测脚本
    #linkis-new-microservice
    SERVER_NAME="new-microservice"
    checkServer
```

#### 2.4 linkis-stop-all.sh 配置修改

**path**:linkis-dist/package/sbin/linkis-stop-all.sh

![image](https://user-images.githubusercontent.com/106590848/201459539-cf0eafea-10f6-424f-b2d3-670faf1d46d5.png)

这里只贴出来需要新增的配置内容。

``` sh
	## 停止脚本
    #linkis-new-microservice
    export SERVER_NAME="new-microservice"
    stopApp
```

### 2.5 安装包准备

这一步骤的具体指引在 [后端编译](../development/build)  文档中已有写 可直接访问，这里就不在过多介绍

### 2.6 安装包上传至服务器

这里为单机部署做示例，而该步骤的具体指引在 [单机部署](../deployment/deploy-quick)  文档中已有写 可直接访问，这里就不在过多介绍

当安装部署成功后可直接在浏览器中访问eureka注册中心，看中心是否已经成功注册linkis-new-microservices服务，如注册成功即为创建新的微服务成功。

![企业微信截图_16682327115719](https://user-images.githubusercontent.com/106590848/201459777-c41f3631-c434-4318-b7ca-dc92e75e721b.png)