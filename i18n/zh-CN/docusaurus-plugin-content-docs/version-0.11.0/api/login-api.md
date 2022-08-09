---
title: 登陆 Api
sidebar_position: 1
---

> 登录相关的接口，对上层系统的HTTP接入和WebSocket接入都有效

## 1 Linkis接口规范

Linkis在前后端进行交互的时候，定义了一套自己的接口规范。

如果您对接口规范感兴趣，请点击这里[查看接口规范](/community/development-specification/api)

## 2 如何实现免登录

进入linkis-gateway/conf目录，执行命令：

```bash
    vim linkis.properties
```
    
将测试模式打开，参数如下：

```properties
    wds.linkis.test.mode=true   # 打开测试模式
    wds.linkis.test.user=enjoyyin  # 指定测试模式下，所有请求都代理给哪个用户
```

## 3 登录接口汇总

我们提供以下几个与登录相关的接口：

 - 登录
 - 登出
 - 心跳
 

## 4 接口详解

### 4.1 登录

- 接口 `/api/rest_j/v1/user/login`

- 提交方式 `POST`

```json
      {
        "userName": "",
        "password": ""
      }
```

- 返回示例

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

### 4.2 登出
- 接口 `/api/rest_j/v1/user/logout`

- 提交方式 `POST`

  无参数

- 返回示例

```json
    {
        "method": "/api/rest_j/v1/user/logout",
        "status": 0,
        "message": "退出登录成功！"
    }
```

### 4.3 心跳

- 接口 `/api/rest_j/v1/user/heartbeat`

- 提交方式 `POST`

  无参数

- 返回示例

```json
    {
         "method": "/api/rest_j/v1/user/heartbeat",
         "status": 0,
         "message": "维系心跳成功！"
    }
```