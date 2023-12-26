---
title: Kerberos
sidebar_position: 5
---

## Kerberos 认证 

## 场景1 HDFS 存储

如果使用到的hadoop集群，如用来存储的结果集的文件
```shell script
# 结果集日志等文件路径，用于存储Job的结果集文件  wds.linkis.filesystem.hdfs.root.path(linkis.properties)
HDFS_USER_ROOT_PATH=hdfs:///tmp/linkis 
```
并且 开启了kerberos认证，需要进行对应的kerberos配置 

修改`linkis.properties` 对应的配置如下 
```properties
#是否开启了kerberos认证模式
wds.linkis.keytab.enable=true
#keytab放置目录，该目录存储的是多个用户的username.keytab的文件
wds.linkis.keytab.file=/appcom/keytab/ 
#是否带上principle客户端认证 默认值false
wds.linkis.keytab.host.enabled=false 
#principle认证需要带上的客户端IP
wds.linkis.keytab.host=127.0.0.1
```
修改后重启服务 

## 场景2  HDFS 存储 kerberos 代理认证 

Hadoop2.0版本开始支持ProxyUser的机制。含义是使用User A的用户认证信息，以User B的名义去访问hadoop集群。
对于服务端来说就认为此时是User B在访问集群，相应对访问请求的鉴权（包括HDFS文件系统的权限，YARN提交任务队列的权限）都以用户User B来进行。
User A被认为是superuser。

和场景1主要区别是，可以解决每个用户都需要生成一个keytab文件的问题，如果设置了 kerberos 代理认证，可以使用代理用户的keytab文件进行认证。 
修改`linkis.properties` 对应的配置如下 

```properties
#是否开启了kerberos认证模式
wds.linkis.keytab.enable=true
#keytab放置目录，该目录存储的是多个用户的username.keytab的文件
wds.linkis.keytab.file=/appcom/keytab/ 
#是否带上principle客户端认证 默认值false
wds.linkis.keytab.host.enabled=false 
#principle认证需要带上的客户端IP
wds.linkis.keytab.host=127.0.0.1

#开启kerberos的代理认证
wds.linkis.keytab.proxyuser.enable=true

#使用superuser 来验证用户认证信息的  
wds.linkis.keytab.proxyuser.superuser=hadoop



```
修改后重启服务 

## 场景3 队列管理器查看yarn资源信息 
![yarn-normal](/Images-zh/auth/yarn-normal.png)
会访问访问Yarn提供了ResourceManager的REST API 接口 
如果yarn的ResourceManager 开启了kerberos认证，需要配置kerberos相关的认证信息 

数据库表 `linkis_cg_rm_external_resource_provider`  
插入yarn数据信息  
```sql
INSERT INTO `linkis_cg_rm_external_resource_provider`
(`resource_type`, `name`, `labels`, `config`) VALUES
('Yarn', 'default', NULL,
'
    { 
        "rmWebAddress": "http://xx.xx.xx.xx:8088",
        "hadoopVersion": "2.7.2",
        "authorEnable":false,
        "user":"hadoop","pwd":"123456",
        "kerberosEnable":@YARN_KERBEROS_ENABLE,
        "principalName":"@YARN_PRINCIPAL_NAME",
        "keytabPath":"@YARN_KEYTAB_PATH"
        "krb5Path":"@YARN_KRB5_PATH"
    }
'
);

```
更新后，因为程序中有使用到缓存，想要立即生效，需要重启`linkis-cg-linkismanager`服务

```shell script
sh sbin/linkis-daemon.sh  restart cg-linkismanager
```



## 场景4 数据源功能中 HIVE 数据源 

如果需要连接的hive数据源，对应的 hive 集群环境，有开启kerberos认证，需要在配置集群环境时，将kerberos以及keytab认证文件信息上传。
![](/Images-zh/auth/dsm-kerberos.png)


