---
title: git仓库同步指引
sidebar_position: 3
---

# linkis私服仓库与开源仓库同步指引

本文将介绍如何在企业公司搭建的gitlab私服或者自己搭建的私服去同步linkis开源仓库。

流程图:


![image](https://user-images.githubusercontent.com/106590848/211200771-71f7fcdc-c9d3-49d9-b8cb-7fe091ae7af8.png)

## 1. 准备工作

- github 账号。
- gitee 账号。
- gitlab 企业内搭建git私服环境（如没有可直接通过gitee操作）

## 2.配置WeDataSphere镜像库

### 2.1 登录gitee

**登录网址**：https://gitee.com/login?from=indexpage#lang=zh-CN

![image](https://user-images.githubusercontent.com/106590848/210959828-1cfc39e8-415e-4100-95da-c1d2e54e480d.png)

### 2.2 创建需要使用镜像功能的仓库

![image](https://user-images.githubusercontent.com/106590848/210959305-ad2b3edd-c2a0-4ca0-a353-78e7a1b3d5f5.png)

如果在其他网站已经有仓库，可直接导入便可。

![image](https://user-images.githubusercontent.com/106590848/210960272-3962765c-fc9d-446c-9d3f-fae39a0160aa.png)

比如自己的github上已fork过linkis的源仓库便可以直接导入。

![image](https://user-images.githubusercontent.com/106590848/210961344-57d5f1e2-aac9-40d8-9f14-5fdcd85b57bd.png)

**注意**：如果你还没有绑定 GitHub 帐号，请根据弹窗提示绑定 GitHub 帐号。

![image](https://user-images.githubusercontent.com/106590848/210979119-329bca92-e969-43df-be84-7c218cb69f7a.png)

### 2.3 配置仓库镜像


#### 2.3.1 添加 Pull 方向的镜像

**作用**： 用于将 GitHub 的仓库镜像到 Gitee。

##### 1.进入需要使用镜像功能的仓库，进入「管理」找到「仓库镜像管理」选项，点击「添加镜像」按键。

![image](https://user-images.githubusercontent.com/106590848/210978788-b8ac138d-94f6-426d-9b3e-5ea6f522e8ce.png)

##### 2.添加镜像


![image](https://user-images.githubusercontent.com/106590848/211193864-c87e4aac-587c-493a-963c-ede6f6bf7d89.png)

2.1 在「镜像方向」中选择 Pull 方向；

2.2 在「镜像仓库」下拉列表中选择需要镜像的仓库；

2.3 在「个人令牌」中输入你的 GitHub 私人令牌；[如何获取令牌](https://gitee.com/help/articles/4336#article-header10)

- 私人令牌中必须包含对 repo 的访问授权，否则添加后镜像不可用；

2.4 根据自身需求选择是否勾选「自动从 GitHub 同步仓库」；

- 勾选后，我们将会在镜像仓库中自动生成 webhook 用于实现自动镜像；
- 此功能需要你的个人令牌中包含对 admin:repo_hook 的访问授权，否则会添加失败；

2.5 点击「添加」保存镜像配置；

- 如果添加失败，请根据 如何申请 GitHub 私人令牌 提供的流程重新申请私人令牌；
- 如果重新申请私人令牌后仍然添加失败，请取消勾选「自动从 GitHub 同步仓库」后点击「添加」保存镜像，并 手动配置 webhook。

配置完成后，可以通过以下方式触发镜像操作（Gitee 从 GitHub 同步仓库）：

- 自动镜像：当你提交代码到 GitHub 镜像仓库时，Gitee 会自动从 GitHub 同步仓库
- 手动镜像：只有你手动点击更新按键时，Gitee 才会从 GitHub 同步仓库。

## 3.同步到gitlab
 
通过脚本同步到gitlab

## 4.常见问题

- 未找到此仓库：请检查镜像仓库是否被删除或更改名称。

- 无效的私人令牌：请检查私人令牌是否输入正确。

- 无权限的私人令牌：请检查私人令牌是否包含 repo 授权；

- 仓库正在读写中，请稍后重试：Pull 或 Push 镜像正在更新中，请在更新结束后重试即可。
