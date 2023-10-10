---
title: 集成 Knife4j
sidebar_position: 5.2
---

## 1.knife4j介绍
knife4j是为Java MVC框架集成Swagger生成Api文档的增强解决方案,前身是swagger-bootstrap-ui,取名knife4j是希望它能像一把匕首一样小巧,轻量,并且功能强悍!其底层是对Springfox的封装，使用方式也和Springfox一致，只是对接口文档UI进行了优化
**核心功能：**

- 文档说明：根据Swagger的规范说明，详细列出接口文档的说明，包括接口地址、类型、请求示例、请求参数、响应示例、响应参数、响应码等信息，对该接口的使用情况一目了然。
- 在线调试：提供在线接口联调的强大功能，自动解析当前接口参数,同时包含表单验证，调用参数可返回接口响应内容、headers、响应时间、响应状态码等信息，帮助开发者在线调试。
## 2.Linkis集成knif4j
### 2.1 测试模式下启动knif4j
修改application-linkis.yml文件设置knife4j.production=false
```shell
knife4j:
  enable: true
  production: false
```
修改 linkis.properties文件打开测试模式
```shell
wds.linkis.test.mode=true
wds.linkis.test.user=hadoop
```
重启所有服务后，可以通过http://ip:port/api/rest_j/v1/doc.html 访问knife4j页面
```shell
http://ip:port/api/rest_j/v1/doc.html 
```
### 2.2 非测试模式下启动knif4j
修改application-linkis.yml文件设置knife4j.production=false
```shell
knife4j:
  enable: true
  production: false
```
修改 linkis.properties文件添加wds.linkis.server.user.restful.uri.pass.auth
```shell
wds.linkis.server.user.restful.uri.pass.auth=/api/rest_j/v1/doc.html,/api/rest_j/v1/swagger-resources,/api/rest_j/v1/webjars,/api/rest_j/v1/v2/api-docs
```
重启所有服务后，可以通过http://ip:port/api/rest_j/v1/doc.html 访问knife4j页面
```shell
http://ip:port/api/rest_j/v1/doc.html 
```
由于knife4j调试各接口时，需要进行身份认证，需手工在浏览器添加如下cookie信息
```shell
#用户登录ticket-id
bdp-user-ticket-id=
#工作空间ID
workspaceId=
#内部请求开关
dataworkcloud_inner_request=true
```
以Chrome浏览器为例
![](/Images-zh/deployment/knife4j/Knife4j_addcookie.png)
## 3.进入Knife4j页面
通过http://ip:port/api/rest_j/v1/doc.html 访问knife4j页面
![](/Images-zh/deployment/knife4j/Knife4j_home.png)
点击接口名称可展示详细的接口文档
![](/Images-zh/deployment/knife4j/Knife4j_interface.png)
点击“调试”并录入参数可对接口进行调试
![](/Images-zh/deployment/knife4j/Knife4j_debug.png)

详细使用指南可浏览knife4j官网查看：[https://doc.xiaominfo.com/knife4j/](https://doc.xiaominfo.com/knife4j/)
