---
title: PPMC 成员如何开通Apache的github仓库权限
sidebar_position: 2
---

## 流程总览
1. 关联apache账号与github账号
2. github个人账号安全开启2FA认证
3. gitbox上开启权限申请

## 1、关联apache Id与github账号
### 方式1 
登陆  https://id.apache.org LDAP中的[Your GitHub Username]字段设置为自己的 GitHub ID。输入密码 点击submit changes 四小时内会收到邀请加入github 上apache organization 的组织的邀约。您的github 账号邮箱，应该会收到一封标题包含“asf-gitbox”的邮件。
如邀约已过期（7天过期），可以尝试把方式1、方式2都再尝试一下。看看github 账号关联邮箱中，能否重新收到加入ASF org 的邀约邮件(搜索"asf-gitbox")。
如还未收到邀约，可尝试如下：
1. 把方式1、2中的github账号先都删掉；
2. 等待1个扫描周期后(稳妥起见可等4个小时)，再重新把github 账号加回去；
3. 然后再等4小时，看看github 账号关联邮箱中，能否重新收到加入ASF org 的邀约邮件(搜索邮件标题"asf-gitbox")。


### 方式2 
访问https://whimsy.apache.org/roster/committer/xxx(替换成你的apache id)  修改对应的数据，四小时内会收到邀请加入apache的github组织的邀约。
注意查收邀请加入apache的github组织的邀约邮件。邀约有效期是7天

成功邀约后 个人github账户信息可以看到归属组织有了apache 

## 2、github个人账号安全 开启2FA认证（登陆令牌）
双因子验证（2FA）是指结合密码以及实物（信用卡、SMS手机、令牌或指纹等生物标志）两种条件对用户进行认证的方法。 为保证提交者账户的安全，我们需要您在GitHub上启用2FA来验证登录用户、并贡献代码。具体内容可参考2FA。
需在手机端安装TOTP 软件，应用市场搜索TOTP(安卓可用Microsoft Authenticator)，ios苹果手机个人推荐下载authy令牌软件 绑定手机可云端备份。手机短信也支持 但是github配置页面默认没有中国地区手机号+86可以选择，需要修改配置时的前端代码绕过见https://www.programmerall.com/article/5457100195/）。
step1.访问个人账号安全设置页面 https://github.com/settings/security 选择第四项[Account security]

step 2 选择【Set up using an app】 下一步

step3 进入二维码绑定页面，使用事先下载号的totp类型app 扫码，录入手机端显示的6为令牌

step4 下载recover codes ，然后进入成功页面 点击done 绑定成功

注意
当开启2FA验证后，需要使用用户名/密码 + 手机认证码的方式来登录GitHub。
当启用2FA认证后，需要生成私有访问Token来进行git提交等操作。此时，您将使用用户名 + 私有访问Token 来代替 用户名 + 密码的方式 进行代码的提交(后续按需配置)。
具体操作，请参考创建私有Token。

若后续关闭2FA，将会从本项目中除名，并且无法访问我们的仓库以及来自我们私有仓库的fork仓库。

## 3、gitbox上开启权限申请
step1 访问 https://gitbox.apache.org/setup/ 授权关联apache账号 

step 2  授权关联github账号

step3 mfa status校验

注意
执行成功后如下图。成功后大概一小时内会开通写权限。如果MFA Status 提示“User not a member of the ASF GitHub organisation. Please make sure you are a part of the ASF Organisation on GitHub and have 2FA enabled. Visit id.apache.org and set your GitHub ID to be invited to the org.” 请检查【关联apache与github账号】是否完成/2FA是否开启，如都正常请稍后在进行验证，因为新成员获取 MFA 状态有延迟。

## 4、其他链接文档
【github使用TOTP启用2FA认证】 https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication
【创建私有Token】   https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
【gitbox 介绍】          https://gitbox.apache.org
【apache 和github】  https://infra.apache.org/apache-github.html
【git github &gitbox 】https://cwiki.apache.org/confluence/display/INFRA/Git%2C+GitHub+and+Gitbox
