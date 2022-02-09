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


## 2、github个人账号安全 开启2FA认证（登陆令牌）

## 3、gitbox上开启权限申请

## 4、其他链接文档
