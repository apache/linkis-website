---
title: Installation Of A Single Service
sidebar_position: 1
---



## 1 Obtain the installation package and install it

&nbsp;&nbsp;&nbsp;&nbsp;By getting the installation package of the corresponding module in our release installation package:

````bash
 ## 1. Unzip the installation package
tar -xvzf wedatasphere-linkis-0.11.0-dist.tar.gz
cd wedatasphere-linkis-0.11.0-dist
 ## 2. Select the corresponding service installation package and go to the corresponding installation directory: $SERVER_HOME
cp wedatasphere-linkis-0.11.0-dist/share/linkis/linkis-publicservice/linkis-publicservice.zip $SERVER_HOME
 ## 3. Copy the installation package to the corresponding installation directory. For example: publicservice needs to copy linkis-publicservice.zip
 ## Decompress the corresponding service
unzip $SERVERNAME.zip
 ## 4. The module package is a public package, except for gateway and Eureka, everything else needs to be copied.
cp ${workDir}/share/linkis/module/module.zip $SERVER_HOME
 ## 5. Unzip the module package
cd $SERVER_HOME/;unzip module.zip> /dev/null;
 ## 6. Copy the corresponding installation package
cp module/lib/* $SERVER_HOME/$SERVERNAME/lib/

````

## 2 Modify configuration

&nbsp;&nbsp;&nbsp;&nbsp;After the package is ready, it is to modify the configuration, the configuration mainly modify application.yml and linkis.properties, the configuration is under the conf directory

### 2.1 Modify application.yml

```yaml
server:
  port: $SERVER_PORT #corresponding service port
eureka:
  client:
    serviceUrl:
      defaultZone: $EUREKA_URL #corresponding EUREKA address
```

### 2.2 Modify linkis.properties

The linkis.properties modification of each service is different, now all services are listed below and explained:

- GateWay:

```properties
    wds.linkis.ldap.proxy.url=$LDAP_URL #LDAP address, login required
    wds.linkis.ldap.proxy.baseDN=$LDAP_BASEDN
    wds.linkis.gateway.admin.user=$deployUser #Deployment user, as the administrator user
```

- PublicService:

```properties
    ##Database connection information
    wds.linkis.server.mybatis.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?characterEncoding=UTF-8
    wds.linkis.server.mybatis.datasource.username=$MYSQL_USER
    wds.linkis.server.mybatis.datasource.password=$MYSQL_PASSWORD
    
    wds.linkis.workspace.filesystem.localuserrootpath=$WORKSPACE_USER_ROOT_PATH ##Workspace directory
    wds.linkis.workspace.filesystem.hdfsuserrootpath.prefix=$HDFS_USER_ROOT_PATH ##HDFS user root directory
```

- Linkis-Database

```properties
    ##Database connection information
    wds.linkis.server.mybatis.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?characterEncoding=UTF-8
    wds.linkis.server.mybatis.datasource.username=$MYSQL_USER
    wds.linkis.server.mybatis.datasource.password=$MYSQL_PASSWORD
```

- ResourceManager

```properties
    ##Database connection information
    wds.linkis.server.mybatis.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?characterEncoding=UTF-8
    wds.linkis.server.mybatis.datasource.username=$MYSQL_USER
    wds.linkis.server.mybatis.datasource.password=$MYSQL_PASSWORD
```

- Entrance:

```properties
    wds.linkis.entrance.config.logPath=$WORKSPACE_USER_ROOT_PATH
    wds.linkis.resultSet.store.path=$HDFS_USER_ROOT_PATH
```

- EngineManager:

```properties
    ##User switching script
    wds.linkis.enginemanager.sudo.script=$SERVER_HOME/$SERVERNAME/bin/rootScript.sh

```

- Additional parameters added by SparkEngineManager

```properties
    ## Configure engine jar
    wds.linkis.enginemanager.core.jar=$SERVER_HOME/$SERVERNAME/lib/linkis-ujes-spark-engine-version.jar
    ##Configure main jar
    wds.linkis.spark.driver.conf.mainjar=$SERVER_HOME/$SERVERNAME/conf:$SERVER_HOME/$SERVERNAME/lib/*
```