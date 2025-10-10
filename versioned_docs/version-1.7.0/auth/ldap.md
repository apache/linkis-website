---
title: LDAP
sidebar_position: 1
---
> LDAP (Lightweight Directory Access Protocol) configuration, after the default installation and deployment, only supports configured static user and password login (only one can be configured), if you need to support multi-user login, you can use LDAP

## 1. Implementation logic introduction

The default way to configure `linkis-mg-gateway.properties`
 
```properties
#default username
wds.linkis.admin.user=hadoop
#default password 
wds.linkis.admin.password=123456
```

`org.apache.linkis.gateway.security.UserPwdAbstractUserRestful#tryLogin` during login request processing,
If the login user name/user password is inconsistent with the configured default value, LDAP mode will be used.
LDAP core processing `org.apache.linkis.gateway.security.LDAPUserRestful#login` is authenticated by calling jdk general ldap tool class.
`javax.naming.ldap.InitialLdapContext#InitialLdapContext(java.util.Hashtable<?,?>, javax.naming.ldap.Control[])`


## 2. How to use

> The premise is that there is an available LDAP service

### 2.1 Step1 Enable ladp login password verification method

Modify `linkis-mg-gateway.properties` configuration

Fill in LDAP related parameters
```properties
##LDAP
#ldap service address
wds.linkis.ldap.proxy.url=ldap://localhost:1389/
#Directory Name(DN) Directory composition of ldap
wds.linkis.ldap.proxy.baseDN==dc=linkis,dc=org
#Username formatting Generally, no configuration is required
wds.linkis.ldap.proxy.userNameFormat=
```
### 2.2 Step2 Restart the service of linkis-mg-gateway

After modifying the configuration, you need to restart the `linkis-mg-gateway` service `sh sbin/linkis-daemon.sh start mg-mgtaeway` to take effect

## 3 Notes

- The authentication type uses the simple mode in `java.naming.security.authentication` (security type, three values: none, simple or strong.)

- For the introduction of ldap, please refer to [LDAP directory server introduction] (https://juejin.cn/post/6844903857311449102)