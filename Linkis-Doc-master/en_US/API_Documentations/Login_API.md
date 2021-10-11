# Login Document
## 1. Docking With LDAP Service

Enter the /conf/linkis-spring-cloud-services/linkis-mg-gateway directory and execute the command:  
```bash
    vim linkis-server.properties
```    

Add LDAP related configuration:  
```bash
wds.linkis.ldap.proxy.url=ldap://127.0.0.1:389/ #LDAP service URL
wds.linkis.ldap.proxy.baseDN=dc=webank,dc=com #Configuration of LDAP service    
```    

## 2. How To Open The Test Mode To Achieve Login-Free

Enter the /conf/linkis-spring-cloud-services/linkis-mg-gateway directory and execute the command:
```bash
    vim linkis-server.properties
```
    
    
Turn on the test mode and the parameters are as follows:
```bash
    wds.linkis.test.mode=true   # Open test mode
    wds.linkis.test.user=hadoop  # Specify which user to delegate all requests to in test mode
```

## 3.Log In Interface Summary
We provide the following login-related interfaces:
 - [Login In](#1LoginIn)

 - [Login Out](#2LoginOut)

 - [Heart Beat](#3HeartBeat)
 

## 4. Interface details

- The return of the Linkis Restful interface follows the following standard return format:

```json
{
 "method": "",
 "status": 0,
 "message": "",
 "data": {}
}
```

**Protocol**：

- method: Returns the requested Restful API URI, which is mainly used in WebSocket mode.
- status: returns status information, where: -1 means no login, 0 means success, 1 means error, 2 means verification failed, 3 means no access to the interface.
- data: return specific data.
- message: return the requested prompt message. If the status is not 0, the message returns an error message, and the data may have a stack field, which returns specific stack information.
 
For more information about the Linkis Restful interface specification, please refer to: [Linkis Restful Interface Specification](https://github.com/WeBankFinTech/Linkis-Doc/blob/master/en_US/Development_Documents/Development_Specification/API.md)

### 1). Login In

- Interface `/api/rest_j/v1/user/login`

- Submission method `POST`

```json
      {
        "userName": "",
        "password": ""
      }
```

- Return to example

```json
    {
        "method": null,
        "status": 0,
        "message": "login successful(登录成功)！",
        "data": {
            "isAdmin": false,
            "userName": ""
        }
     }
```

Among them:

-isAdmin: Linkis only has admin users and non-admin users. The only privilege of admin users is to support viewing the historical tasks of all users in the Linkis management console.

### 2). Login Out

- Interface `/api/rest_j/v1/user/logout`

- Submission method `POST`

  No parameters

- Return to example

```json
    {
        "method": "/api/rest_j/v1/user/logout",
        "status": 0,
        "message": "退出登录成功！"
    }
```

### 3). Heart Beat

- Interface `/api/rest_j/v1/user/heartbeat`

- Submission method `POST`

  No parameters

- Return to example

```json
    {
         "method": "/api/rest_j/v1/user/heartbeat",
         "status": 0,
         "message": "维系心跳成功！"
    }
```