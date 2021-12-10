---
title: 登录文档
sidebar_position: 2
---



## 1.对接LDAP服务

进入/conf目录，执行命令：

```bash
    vim linkis-mg-gateway.properties
```    

添加LDAP相关配置：
```bash
wds.linkis.ldap.proxy.url=ldap://127.0.0.1:389/ # 您的LDAP服务URL
wds.linkis.ldap.proxy.baseDN=dc=webank,dc=com # 您的LDAP服务的配置    
```    
    
## 2.如何打开测试模式，实现免登录

进入/conf目录，执行命令：

```bash
     vim linkis-mg-gateway.properties
```
    
    
将测试模式打开，参数如下：

```shell
    wds.linkis.test.mode=true   # 打开测试模式
    wds.linkis.test.user=hadoop  # 指定测试模式下，所有请求都代理给哪个用户
```

## 3.登录接口汇总

我们提供以下几个与登录相关的接口：

 - [登录](#1登录)

 - [登出](#2登出)

 - [心跳](#3心跳)
 

## 4.接口详解

- Linkis Restful接口的返回，都遵循以下的标准返回格式：

```json
{
 "method": "",
 "status": 0,
 "message": "",
 "data": {}
}
```

**约定**：

 - method：返回请求的Restful API URI，主要是 WebSocket 模式需要使用。
 - status：返回状态信息，其中：-1表示没有登录，0表示成功，1表示错误，2表示验证失败，3表示没该接口的访问权限。
 - data：返回具体的数据。
 - message：返回请求的提示信息。如果status非0时，message返回的是错误信息，其中data有可能存在stack字段，返回具体的堆栈信息。 
 
更多关于 Linkis Restful 接口的规范，请参考：[Linkis Restful 接口规范](https://github.com/WeBankFinTech/Linkis-Doc/blob/master/zh_CN/Development_Documents/Development_Specification/API.md)

### 1).登录

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
        "method": null,
        "status": 0,
        "message": "login successful(登录成功)！",
        "data": {
            "isAdmin": false,
            "userName": ""
        }
     }
```

其中：

 - isAdmin: Linkis只有admin用户和非admin用户，admin用户的唯一特权，就是支持在Linkis管理台查看所有用户的历史任务。

### 2).登出

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

### 3).心跳

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
