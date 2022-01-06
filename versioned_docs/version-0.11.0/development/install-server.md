---
title: Installation of Individual Services
sidebar_position: 1
---



## 1 Get Package and Install

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

## 2 Modify configuration

&nbsp;&nbsp;&nbsp;&nbsp;The package is ready to modify the configuration, which primarily modifies application.yml and linkis.properties, all below the conf directory

### 2.1 Modification of application.yml

```yaml
server:
  port: $SERVER_PORT   #corresponding service port
eureka:
  client:
    serviceUrl:
      defaultZone: $EUREKA_URL #corresponding EUREKA address
```

### 2.2 Modification of linkis.properties

每个服务的linkis.properties修改都不一样，现在把所有的服务列到下面并进行解释：

- GateWay:

```properties
    wds.linkis.ldap.proxy.url=$LDAP_URL  #LDAP address, login required
    wds.linkis.ldap.proxy.baseDN=$LDAP_BASEDN
    wds.linkis.gateway.admin.user=$deployUser #Deploy user as administrator
```

- PublicService：

```properties
    ## Database connection information
    wds.linkis.server.mybatis.database.url=jdbc:mysql:/${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?charactering=UTF-8
    wds.linkis.server.mybatis.dataource.username=$MYSQL_USER
    wds.linkis.server.mybatis.dasource.password=$MYSQL_PASSWORD

    wds.linkis.workspace.filesystem.localuserrootpath=$WORKSPACE_USER_ROOT_PATH ##Workspace directory
    wds.linkis.workspace.filesystem.hdfuserrootpath.prefix=$HDFS_USER_ROOT_PATH #HDFS users root directory
```

- Linkis-Database

```properties
    ## Database connection information
    wds.linkis.server.mybatis.database.url=jdbc:mysql:/${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?charactering=UTF-8
    wds.linkis.server.mybatis.dataresource.username=$MYSQL_USER
    wds.linkis.server.mybatis.dataource.password=$MYSQL_PASSWORD
```

- ResourceManager

```properties
    ## Database connection information
    wds.linkis.server.mybatis.database.url=jdbc:mysql:/${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?charactering=UTF-8
    wds.linkis.server.mybatis.dataresource.username=$MYSQL_USER
    wds.linkis.server.mybatis.dataource.password=$MYSQL_PASSWORD
```

- Entrance：

```properties
    wds.linkis.entrance.config.logPath=$WORKSPACE_USER_ROOT_PATH
    wds.linkis.resultSet.store.path=$HDFS_USER_ROOT_PATH
```

- EngineManager:

```properties
    #User switch script
    wds.linkis.enginemanager.sudo.script=$SERVER_HOME/$SERVERNAME/bin/rootScript.sh 

```

- Additional parameters for SparkEngineManager

```properties
    ## Configure jar in engine
    wds.linkis.enginemanager.core.jar=$SERVER_HOME/$SERVERNAME/lib/linkis-ujes-spark-engine-version.jar
    #Configure main jer
    wds.linkis.spark.driver.conf.mainjar=$SERVER_HOME/$SERVERNAME/conf:$SERVER_HOME/$SERVERNAME/lib/* 
```