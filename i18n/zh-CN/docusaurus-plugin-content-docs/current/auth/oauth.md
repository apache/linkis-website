---
title: OAuth
sidebar_position: 1
---
> OAuth（Open Authorization）是一个开放标准授权协议，允许第三方应用在用户授权后访问受保护资源，广泛应用于单点登录（SSO）场景。

## 1. 实现逻辑介绍

通过统一的认证处理filter:`org.apache.linkis.server.security.SecurityFilter` 来控制。

1. 授权请求：后端根据配置生成授权链接，前端引导用户跳转至认证服务器
2. 用户授权：用户通过认证后，认证服务器返回授权码
3. 令牌获取：后端用授权码向认证服务器换取访问令牌
4. 资源访问：后端携带令牌访问资源服务器，读取用户信息


## 2. 使用方式

默认兼容 GitHub OAuth 认证接口。

### 2.1 Step 1 配置授权码接口

```properties
wds.linkis.oauth.enable=true
wds.linkis.oauth.url=https://github.com/login/oauth/authorize
wds.linkis.gateway.auth.oauth.exchange.url=https://github.com/login/oauth/access_token
wds.linkis.gateway.auth.oauth.validate.url=https://api.github.com/user
wds.linkis.gateway.auth.oauth.validate.field=login
wds.linkis.gateway.auth.oauth.client.id=YOUR_CLIENT_ID
wds.linkis.gateway.auth.oauth.client.secret=YOUR_CLIENT_SECRET
wds.linkis.gateway.auth.oauth.scope=user
```
如果配置完成，登录页面将会自动显示 OAuth 授权登录按钮。

### 2.2 Step 2 配置授权回调

> [!NOTE]
> 该项需要在授权服务器上配置。

默认回调地址为：`http://{web_host}:{web_port}/login/oauth/callback?code={code}`
