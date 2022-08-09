---
title: Login Api
sidebar_position: 1
---

> Log in to the related interface, which is effective for both HTTP access and WebSocket access of the upper system

## 1 Linkis interface specification

Linkis defines its own set of interface specifications when interacting between the front and back ends.

If you are interested in the interface specification, please click here [view interface specification](/community/development-specification/api)

## 2 How to achieve login-free

Enter the linkis-gateway/conf directory and execute the command:

```bash
    vim linkis.properties
```
    
Turn on the test mode, the parameters are as follows:

```properties
    wds.linkis.test.mode=true # Turn on test mode
    wds.linkis.test.user=enjoyyin # Specify which user all requests are delegated to in test mode
```

## 3 Login interface summary

We provide the following login-related interfaces:

 - Log in
 - Sign out
 -Heartbeat
 

## 4 Interface details

### 4.1 Login

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
- Interface `/api/rest_j/v1/user/logout`

- Submission method `POST`

  No parameters

- Return to example

```json
    {
        "method": "/api/rest_j/v1/user/logout",
        "status": 0,
        "message": "Logout successfully!"
    }
```

### 4.3 Heartbeat

- Interface `/api/rest_j/v1/user/heartbeat`

- Submission method `POST`

  No parameters

- Return to example

```json
    {
         "method": "/api/rest_j/v1/user/heartbeat",
         "status": 0,
         "message": "Maintaining the heartbeat success!"
    }
```