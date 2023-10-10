---
title: LDAP
sidebar_position: 1
---
> LDAP(Lightweight Directory Access Protocol)配置，默认安装部署后，只支持配置的静态用户和密码登录（只能配置一个），如果需要支持多用户登录可以使用LDAP

## 1. 实现逻辑介绍

默认方式的配置`linkis-mg-gateway.properties`
 
```properties
#默认用户名
wds.linkis.admin.user=hadoop
#默认密码 
wds.linkis.admin.password=123456
```

登陆请求处理时`org.apache.linkis.gateway.security.UserPwdAbstractUserRestful#tryLogin`，
如果登陆用户名/用户密码和配置的默认值不一致，会走LDAP模式。 
LDAP核心处理 `org.apache.linkis.gateway.security.LDAPUserRestful#login` 通过调用jdk通用的ldap工具类进行认证。 
`javax.naming.ldap.InitialLdapContext#InitialLdapContext(java.util.Hashtable<?,?>, javax.naming.ldap.Control[])`


## 2. 使用方式  

> 前提是有可用的LADP服务

### 2.1 Step1 开启ladp登陆验密方式

修改`linkis-mg-gateway.properties`配置 

将LDAP相关参数填入 
```properties
##LDAP
#ldap服务地址
wds.linkis.ldap.proxy.url=ldap://localhost:1389/
#Directory Name(DN) ldap的目录构成
wds.linkis.ldap.proxy.baseDN==dc=linkis,dc=org
#用户名格式化 一般无需要配置
wds.linkis.ldap.proxy.userNameFormat=
```
### 2.2 Step2 重启linkis-mg-gateway 的服务 

修改配置后，需要重启`linkis-mg-gateway`服务 `sh sbin/linkis-daemon.sh start mg-mgtaeway`，才能生效

## 3  注意事项 

- 认证类型使用的是`java.naming.security.authentication`（安全类型，三个值：none，simple或strong。）中的simple模式

- 关于ldap的介绍可以参考[LDAP目录服务器介绍](https://juejin.cn/post/6844903857311449102)

