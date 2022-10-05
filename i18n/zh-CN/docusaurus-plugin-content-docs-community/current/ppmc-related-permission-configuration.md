---
title: PPMC/Committer 相关权限配置
sidebar_position: 8
---
> PPMC(Podling Project Management Committee)成员,绑定github账号流程/以及主要邮件订阅

## 1. 绑定github账号流程

### 1.1 流程总览
1. 关联apache账号与github账号
2. github个人账号安全开启2FA认证
3. gitbox上开启权限申请

### 1.2关联apache Id与github账号  
关联apache Id与github账号后，直接进入1.3操作  
**方式1** 
登陆  https://id.apache.org LDAP中的[Your GitHub Username]字段设置为自己的 GitHub ID。输入密码 点击submit changes 。

![Open-Apache's-GitHub-warehouse1](https://user-images.githubusercontent.com/29391030/153324492-cc4e4348-5e4b-450f-a23f-6c208e1a26fb.png)

**方式2** 
访问https://whimsy.apache.org/roster/committer/xxx (替换成你的apache id)  修改对应的数据

### 1.3 开启2FA认证（登陆令牌）
>github个人账号安全 开启2FA认证（登陆令牌）

双因子验证（2FA）是指结合密码以及实物（信用卡、SMS手机、令牌或指纹等生物标志）两种条件对用户进行认证的方法。 为保证提交者账户的安全，我们需要您在GitHub上启用2FA来验证登录用户、并贡献代码。具体内容可参考2FA。
需在手机端安装TOTP 软件，应用市场搜索TOTP(安卓可用Microsoft Authenticator)，ios苹果手机个人推荐下载authy令牌软件 绑定手机可云端备份。手机短信也支持 但是github配置页面默认没有中国地区手机号+86可以选择，需要修改配置时的前端代码绕过见https://www.programmerall.com/article/5457100195/ 。

step1 访问个人账号安全设置页面 https://github.com/settings/security 选择第四项[Account security]

![open-Apache's-GitHub-warehouse4](https://user-images.githubusercontent.com/29391030/153325044-4b68a5c0-959a-4077-abdf-5ad5e67aa26a.png)

step2 选择【Set up using an app】 下一步

![open-Apache's-GitHub-warehouse5](https://user-images.githubusercontent.com/29391030/153325063-ea61ad8c-cbbc-4053-8a37-35d315dc3b00.png)

step3 进入二维码绑定页面，使用事先下载好的totp类型app（如：Google 身份验证器、Microsoft Authenticator）扫码，录入手机端显示的6为令牌

![open-Apache's-GitHub-warehouse6](https://user-images.githubusercontent.com/29391030/153325084-b57d3647-a6a5-4e15-9e9c-3c2f632c0655.png)

step4 下载recover codes ，然后进入成功页面 点击done 绑定成功

![open-Apache's-GitHub-warehouse7](https://user-images.githubusercontent.com/29391030/153325124-a523bd8c-f6d5-44ce-8372-3804d9c693c6.png)

注意
当开启2FA验证后，需要使用用户名/密码 + 手机认证码的方式来登录GitHub。
当启用2FA认证后，需要生成私有访问Token来进行git提交等操作。此时，您将使用用户名 + 私有访问Token 来代替 用户名 + 密码的方式 进行代码的提交(后续按需配置)。
具体操作，请参考创建私有Token。

若后续关闭2FA，将会从本项目中除名，并且无法访问我们的仓库以及来自我们私有仓库的fork仓库。

### 1.4 gitbox上开启权限申请
step1 访问 https://gitbox.apache.org/setup/ 授权关联apache账号 

![open-Apache's-GitHub-warehouse8](https://user-images.githubusercontent.com/29391030/153325227-f917e9c3-16ea-42d4-8432-4b63fd5849da.png)

step 2  授权关联github账号

![open-Apache's-GitHub-warehouse9](https://user-images.githubusercontent.com/29391030/153325245-e2eea319-278f-4254-afb8-7e1ec418f004.png)

step3 mfa status校验

![open-Apache's-GitHub-warehouse10](https://user-images.githubusercontent.com/29391030/153325267-71761576-9467-49a1-809b-2a5c0fc1a681.png)

注意
执行成功后如下图。成功后大概一小时内会开通写权限。如果MFA Status 提示“User not a member of the ASF GitHub organisation. Please make sure you are a part of the ASF Organisation on GitHub and have 2FA enabled. Visit id.apache.org and set your GitHub ID to be invited to the org.” 请检查【关联apache与github账号】是否完成/2FA是否开启，如都正常请稍后在进行验证，因为新成员获取 MFA 状态有延迟。

![open-Apache's-GitHub-warehouse11](https://user-images.githubusercontent.com/29391030/153325293-654c1cd4-7b2c-44be-94b0-9520e2ea05c1.png)


成功邀约后 个人github账户信息可以看到归属组织有了apache 

![open-Apache's-GitHub-warehouse3](https://user-images.githubusercontent.com/29391030/153324664-6633b5be-a5b5-400a-b9db-685c4eeab8ad.png)

### 1.5 相关链接文档
【github使用TOTP启用2FA认证】https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication

【创建私有Token】   https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

【gitbox 介绍】    https://gitbox.apache.org

【apache 和github】  https://infra.apache.org/apache-github.html

【git github &gitbox 】https://cwiki.apache.org/confluence/display/INFRA/Git%2C+GitHub+and+Gitbox

## 2. 配置邮件与邮件订阅

### 2.1 关联自己的邮箱
>详细见 https://infra.apache.org/committer-email.html
- 方式1：登陆https://id.apache.org/ ,在`Forwarding email address`栏中填写自己的邮件地址(通常是在您提供的独立贡献者许可协议 (ICLA)中提供的地址),保存修改
- 方式2：登陆https://whimsy.apache.org/roster/committer/__self__ 双击`Email forwarded to` 进行编辑 

### 2.2 配置转发地址
您不能直接使用您的 Apache 电子邮件地址。您必须为此地址设置转发。当写信到您的 ASF 地址时，系统会将电子邮件转发到您的转发地址。当您回复时，消息会通过 ASF 系统返回，因此与您一起写信的人会看到它来自您的 ASF 地址
。在您的电子邮件环境中进行配置
```shell script
Server: mail-relay.apache.org Port: 587 (STARTTLS), 465 (SSL) User/Pass: {Your LDAP credentials}
```
![image](/img/community/mail-relay.png)


### 2.2 订阅相关邮件列表
作为PPMC一员 需要积极参与到社区建设中，推动社区健康发展，承当项目的责任和治理工作,这部分工作很多时候是通过邮件方式进行（讨论/投票/答疑等）,
每一位PPMC成员都需要订阅以下邮件列表:

|名称|描述|订阅邮件|退订邮件|邮件归档|
|:-----|:--------|:------|:-------|:-----|
| [dev@linkis.apache.org](mailto:dev@linkis.apache.org) | linkis的社区活动信息,项目的讨论公告等 | [订阅](mailto:dev-subscribe@linkis.apache.org)   | [退订](mailto:dev-unsubscribe@linkis.apache.org)   | [归档](http://mail-archives.apache.org/mod_mbox/linkis-dev)   |
| [private@linkis.apache.org](mailto:private@linkis.apache.org) |此邮件列表是不公开的，PPMC内部可见，主要用于内部讨论 | [订阅](mailto:private-subscribe@linkis.apache.org)   | [退订](mailto:private-unsubscribe@linkis.apache.org)   | [归档](http://mail-archives.apache.org/mod_mbox/linkis-private)   |
| [general@incubator.apache.org](mailto:general@incubator.apache.org) | 孵化社区的公开邮件，主要是孵化项目的相关动态 | [订阅](mailto:general-subscribe@incubator.apache.org)   | [退订](mailto:general-unsubscribe@incubator.apache.org)   | [归档](http://mail-archives.apache.org/mod_mbox/incubator-general)   |

订阅操作可以见指引[订阅邮件列表](how-to-subscribe.md)
:::caution 注意
注意:private@linkis.apache.org订阅需要邮件版主(shaofengshi@apache.org)审核，所以订阅时请在邮件内容中附上个人姓名信息，以便版主审核。
:::
如果上述订阅不成功可以尝试使用网页端工具:https://whimsy.apache.org/committers/subscribe.cgi

![image](/img/community/subscribe.png)


邮件列表订阅情况，PPMC成员可以在此查看:https://whimsy.apache.org/roster/ppmc/linkis
