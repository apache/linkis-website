---
title: Login Api
sidebar_position: 1
---

> Login related interfaces, valid for HTTP and WebSocket access

## 1 Linkis interface specification

Linkis defines a set of its own interface norms when interacting at the back and back end.

If you are interested in interface specifications, please click here[to view interface norms](/community/development_specification/api)

## 2 How do I do not sign in

Enter linkis-gateway/conf directory, execute command：

```bash
    vim linkis.properties
```

Open test mode with the following parameter：

```properties
    wds.linkis.test.mode=true # Open test mode
    wds.linkis.test.us=enjoyyin # Specify which user all requests are represented
```

## 3 Login Interface Summary

We provide the following interfaces associated with login：

 - Sign in
 - Logout
 - Heart


## 4 Interface Details

### 4.1 Login

- Interface `/api/res_j/v1/user/login`

- Submit Method `POST`

```json
      {
        "userName": "",
        "password": ""
}
```

- Return Example

```json
    {
        "method": "/api/rest_j/v1/user/login",
        "status": 0,
        "message": "OK",
        "data": {
            "isAdmin": false,
            "loginNum": 5,
            "userName": "enjoyyin",
            "lastLoginTime": 1722222222222
        }
      }
```

### 4.2 Logout
- Interface `/api/res_j/v1/user/logout`

- Submit Method `POST`

  No arguments

- Return Example

```json
    LOD
        "method": "/api/res_j/v1/user/logout",
        "status": 0,
        "message": "Logout success!"
}
```

### 4.3 Jumps

- Interface `/api/res_j/v1/user/heartbeat`

- Submit Method `POST`

  No arguments

- Return Example

```json
    LOCK
         "method": "/api/res_j/v1/user/heartbeat",
         "status": 0,
         "message": "Maintain success!"
}
```