---
title: Token
sidebar_position: 2
---

> Usually when the third-party system calls the linkis service, it usually authenticates through token

## 1. Implementation logic introduction

Control through unified authentication processing filter: `org.apache.linkis.server.security.SecurityFilter`

Implemented pseudocode
```scala

val TOKEN_KEY = "Token-Code"
val TOKEN_USER_KEY = "Token-User"

/* TokenAuthentication.isTokenRequest by judging the request request:
      1. Whether the request header contains TOKEN_KEY and TOKEN_USER_KEY: getHeaders.containsKey(TOKEN_KEY) && getHeaders.containsKey(TOKEN_USER_KEY)
      2. Or request whether TOKEN_KEY and TOKEN_USER_KEY are included in the cookies: getCookies.containsKey(TOKEN_KEY) &&getCookies.containsKey(TOKEN_USER_KEY)
*/

if (TokenAuthentication.isTokenRequest(gatewayContext)) {
       /* Perform token authentication
         1. Confirm whether to enable the token authentication configuration item `wds.linkis.gateway.conf.enable.token.auth`
         2. Extract the token tokenUser host information for authentication and verify the validity
       */
       TokenAuthentication. tokenAuth(gatewayContext)
     } else {
     //Common username and password authentication
}
```
Available tokens and corresponding ip-related information data are stored in the table `linkis_mg_gateway_auth_token`, 
see [table analysis description] (../development/table/all#16-linkis_mg_gateway_auth_token) for details, non-real-time update,
Periodically `wds.linkis.token.cache.expire.hour` (default interval 12 hours) is refreshed into the service memory


## 2. How to use

### 2.1 New Token

Management console `Basic Data Management > Token Management` to add

```text
Name: token name corresponds to Token-Code, such as: TEST-AUTH
User: The username corresponding to the token, that is, the perceived requesting user, will be used for log auditing. If there is no limit, it can be configured as *
Host: The host that can be accessed will perform the IP verification and filtering of the requester. If there is no limit, it can be configured as *
Valid days: If it is permanently valid, configure it as -1
```

### 2.2 Native way
The constructed http request method needs to add `Token-Code`, `Token-User` parameters in the request header,

#### Example

Request address:
`http://127.0.0.1:9001/api/rest_j/v1/entrance/submit`

body parameter:
```json
{
     "executionContent": {"code": "sleep 5s;echo pwd", "runType": "shell"},
     "params": {"variable": {}, "configuration": {}},
     "source": {"scriptPath": "file:///mnt/bdp/hadoop/1.hql"},
     "labels": {
         "engineType": "shell-1",
         "userCreator": "hadoop-IDE",
         "executeOnce": "false"
     }
}
```

Request header header:
```text
Content-Type: application/json
Token-Code: BML-AUTH
Token-User: hadoop
```

### 2.3 The client uses token authentication

The client authentication methods provided by linkis all support the Token strategy mode `new TokenAuthenticationStrategy()`

For details, please refer to [SDK method](../user-guide/sdk-manual)

#### Example
```java
// 1. build config: linkis gateway url
  DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
         .addServerUrl("http://127.0.0.1:9001/") //set linkis-mg-gateway url: http://{ip}:{port}
         .connectionTimeout(30000) //connectionTimeOut
         .discoveryEnabled(false) //disable discovery
         .discoveryFrequency(1, TimeUnit.MINUTES) // discovery frequency
         .loadbalancerEnabled(true) // enable loadbalance
         .maxConnectionSize(5) // set max Connection
         .retryEnabled(false) // set retry
         .readTimeout(30000) //set read timeout
         .setAuthenticationStrategy(new TokenAuthenticationStrategy()) // AuthenticationStrategy Linkis auth Token
         .setAuthTokenKey("Token-Code") // set token key
         .setAuthTokenValue("DSM-AUTH") // set token value
         .setDWSVersion("v1") //linkis rest version v1
         .build();
```

## 3 Notes

### 3.1 token configuration
Supported tokens, the corresponding available users/applicable requester ip are controlled by the table `linkis_mg_gateway_auth_token`, 
the loading is not updated in real time, and the caching mechanism is used
 
### 3.2 Administrator permission token
For the restriction of high-risk operations, the token of the administrator role is required to operate, 
and the format of the administrator token is `admin-xxx`