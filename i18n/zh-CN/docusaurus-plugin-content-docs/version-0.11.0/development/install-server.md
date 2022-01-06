---
title: 单个服务的安装
sidebar_position: 1
---



## 1 获取安装包并安装

&nbsp;&nbsp;&nbsp;&nbsp;通过在我们的release安装包里拿到对应模块的安装包：

````bash
 ## 1. 解压安装包
tar -xvzf wedatasphere-linkis-0.11.0-dist.tar.gz 
cd wedatasphere-linkis-0.11.0-dist 
 ## 2. 选择对应的服务安装包,到对应的安装目录：$SERVER_HOME
cp wedatasphere-linkis-0.11.0-dist/share/linkis/linkis-publicservice/linkis-publicservice.zip  $SERVER_HOME
 ## 3. 拷贝安装包到对应的安装目录比如：publicservice  需要拷贝 linkis-publicservice.zip
 ##    解压对应的服务
unzip $SERVERNAME.zip 
 ## 4. module包是公共包，除了gateway和Eureka不需要其他的都需要拷贝
cp ${workDir}/share/linkis/module/module.zip $SERVER_HOME
 ## 5. 解压module包
cd $SERVER_HOME/;unzip  module.zip > /dev/null;
 ## 6. 拷贝相应的安装包
cp module/lib/*  $SERVER_HOME/$SERVERNAME/lib/

````

## 2 修改配置

&nbsp;&nbsp;&nbsp;&nbsp;包准备好了后，就是修改配置，配置主要修改application.yml和linkis.properties，配置都在conf目录下面

### 2.1 修改application.yml

```yaml
server:
  port: $SERVER_PORT   #对应的服务端口
eureka:
  client:
    serviceUrl:
      defaultZone: $EUREKA_URL #对应的 EUREKA地址
```

### 2.2 修改linkis.properties

每个服务的linkis.properties修改都不一样，现在把所有的服务列到下面并进行解释：

- GateWay:

```properties
    wds.linkis.ldap.proxy.url=$LDAP_URL  #LDAP 地址，登录需要
    wds.linkis.ldap.proxy.baseDN=$LDAP_BASEDN
    wds.linkis.gateway.admin.user=$deployUser #部署用户，作为管理员的用户
```

- PublicService：

```properties
    ##数据库连接信息
    wds.linkis.server.mybatis.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?characterEncoding=UTF-8
    wds.linkis.server.mybatis.datasource.username=$MYSQL_USER
    wds.linkis.server.mybatis.datasource.password=$MYSQL_PASSWORD
    
    wds.linkis.workspace.filesystem.localuserrootpath=$WORKSPACE_USER_ROOT_PATH ##工作空间目录
    wds.linkis.workspace.filesystem.hdfsuserrootpath.prefix=$HDFS_USER_ROOT_PATH ##HDFS的用户根目录
```

- Linkis-Database

```properties
    ##数据库连接信息
    wds.linkis.server.mybatis.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?characterEncoding=UTF-8
    wds.linkis.server.mybatis.datasource.username=$MYSQL_USER
    wds.linkis.server.mybatis.datasource.password=$MYSQL_PASSWORD
```

- ResourceManager

```properties
    ##数据库连接信息
    wds.linkis.server.mybatis.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?characterEncoding=UTF-8
    wds.linkis.server.mybatis.datasource.username=$MYSQL_USER
    wds.linkis.server.mybatis.datasource.password=$MYSQL_PASSWORD
```

- Entrance：

```properties
    wds.linkis.entrance.config.logPath=$WORKSPACE_USER_ROOT_PATH
    wds.linkis.resultSet.store.path=$HDFS_USER_ROOT_PATH
```

- EngineManager:

```properties
    ##用户切换脚本
    wds.linkis.enginemanager.sudo.script=$SERVER_HOME/$SERVERNAME/bin/rootScript.sh 

```

- SparkEngineManager额外加的参数

```properties
    ## 配置engine的jar
    wds.linkis.enginemanager.core.jar=$SERVER_HOME/$SERVERNAME/lib/linkis-ujes-spark-engine-version.jar
    ##配置main jar
    wds.linkis.spark.driver.conf.mainjar=$SERVER_HOME/$SERVERNAME/conf:$SERVER_HOME/$SERVERNAME/lib/* 
```