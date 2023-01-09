---
title: Token
sidebar_position: 2
---

> 通常第三方系统调用linkis服务时，一般是通过token的方式进行认证

## 1. 实现逻辑介绍

通过统一的认证处理filter:`org.apache.linkis.server.security.SecurityFilter` 来控制 

实现的伪代码 
```scala

val TOKEN_KEY = "Token-Code"
val TOKEN_USER_KEY = "Token-User"

/* TokenAuthentication.isTokenRequest 通过判断请求request中：
     1.请求头是否包含TOKEN_KEY和TOKEN_USER_KEY :getHeaders.containsKey(TOKEN_KEY) && getHeaders.containsKey(TOKEN_USER_KEY)
     2.或则请求cookies中是否包含TOKEN_KEY和TOKEN_USER_KEY:getCookies.containsKey(TOKEN_KEY) &&getCookies.containsKey(TOKEN_USER_KEY)
*/

if (TokenAuthentication.isTokenRequest(gatewayContext)) {
      /* 进行token认证 
        1. 确认是否开启token认证 配置项 `wds.linkis.gateway.conf.enable.token.auth`
        2. 提取token tokenUser host信息进行认证，校验合法性
      */
      TokenAuthentication.tokenAuth(gatewayContext)
    } else {
    //普通的用户名密码认证    
}
```
可用的token以及对应可使用的ip相关信息数据存储在表`linkis_mg_gateway_auth_token`中，
详细见[表解析说明](../development/table/all#16-linkis_mg_gateway_auth_token)，非实时更新，
会定期`wds.linkis.token.cache.expire.hour`(默认间隔12小时)刷新到服务内存中 


## 2. 使用方式 

### 2.1 新增 Token 

管理台 `基础数据管理> 令牌管理`进行新增 

```text
名称:token名称 对应 Token-Code，如:TEST-AUTH 
用户:该token对应的用户名，即感知到的请求用户，日志审计会使用到。如果不做限制可以配置为 *
主机:可访问的主机，会进行请求方的ip校验过滤。如果不做限制可以配置为 *
有效天数：如果永久有效,配置为-1
```

### 2.2 原生的方式
构建的http请求方式，需要在请求头中添加`Token-Code`,`Token-User`参数,

#### 示例

请求地址:
`http://127.0.0.1:9001/api/rest_j/v1/entrance/submit`

body参数:
```json
{
    "executionContent": {"code": "sleep 5s;echo pwd", "runType":  "shell"},
    "params": {"variable": {}, "configuration": {}},
    "source":  {"scriptPath": "file:///mnt/bdp/hadoop/1.hql"},
    "labels": {
        "engineType": "shell-1",
        "userCreator": "hadoop-IDE",
        "executeOnce":"false "
    }
}
```

请求头header: 
```text
Content-Type:application/json
Token-Code:BML-AUTH
Token-User:hadoop
```

### 2.3 客户端使用token认证 

linkis 提供的客户端认证方式都支持Token策略模式`new TokenAuthenticationStrategy()`

详细可以参考[SDK 方式](../user-guide/sdk-manual)

#### 示例
```java
// 1. build config: linkis gateway url
 DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
        .addServerUrl("http://127.0.0.1:9001/")   //set linkis-mg-gateway url: http://{ip}:{port}
        .connectionTimeout(30000)   //connectionTimeOut
        .discoveryEnabled(false) //disable discovery
        .discoveryFrequency(1, TimeUnit.MINUTES)  // discovery frequency
        .loadbalancerEnabled(true)  // enable loadbalance
        .maxConnectionSize(5)   // set max Connection
        .retryEnabled(false) // set retry
        .readTimeout(30000)  //set read timeout
        .setAuthenticationStrategy(new TokenAuthenticationStrategy()) // AuthenticationStrategy Linkis auth Token
        .setAuthTokenKey("Token-Code")  // set token key
        .setAuthTokenValue("DSM-AUTH") // set token value
        .setDWSVersion("v1") //linkis rest version v1
        .build();
```

## 3  注意事项 

### 3.1 token的配置 
支持的token，对应的可用的用户/可使用请求方ip 是通过表`linkis_mg_gateway_auth_token`来控制，加载是非实时更新，使用了缓存机制
 
### 3.2 管理员权限token 
对于高危操作的限制，需要管理员角色的token才能操作，管理员token,格式为 `admin-xxx`