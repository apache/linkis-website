---
title: OAuth
sidebar_position: 1
---
> OAuth (Open Authorization) is an open standard authorization protocol that allows third-party applications to access protected resources after user authorization, widely used in Single Sign-On (SSO) scenarios.

## 1. Implementation Logic

Controlled through a unified authentication filter: `org.apache.linkis.server.security.SecurityFilter`.

1. Authorization Request: Backend generates authorization link based on configuration, frontend redirects user to authentication server
2. User Authorization: After user authentication, authentication server returns authorization code
3. Token Acquisition: Backend exchanges authorization code for access token with authentication server
4. Resource Access: Backend accesses resource server with token to retrieve user information

## 2. Usage

Default compatibility with GitHub OAuth authentication interface.

### 2.1 Step 1 Configure Authorization Code Interface

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

If configuration is complete, the OAuth login button will automatically appear on the login page.

### 2.2 Step 2 Configure Authorization Callback

> [!NOTE]
> This needs to be configured on the authorization server.

Default callback address: `http://{web_host}:{web_port}/login/oauth/callback?code={code}`
