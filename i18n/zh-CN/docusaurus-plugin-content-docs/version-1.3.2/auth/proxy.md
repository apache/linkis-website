---
title: 代理认证
sidebar_position: 4
---


> 这种方式允许登录用户和实际使用的用户不同，主要作用：控制用户登录时必须为实名用户，但是实际使用大数据平台时，是非实名用户，方便进行权限的校验和管控。
>  比如：linkis在执行用户提交的任务时，linkis主要进程服务会通过sudo -u ${submit user} 切换到对应用户下，然后执行对应的引擎启动命令， 
>  这就需要为每个${submit user} 提前创建对应的系统用户，并且配置好相关的环境变量。 对于新用户，需要一系列的环境的初始化准备工作，
>  如果频繁的用户变化，会增大运维成本，而且用户过多，没法针对单个用户配置资源，资源之间无法很好的管控。如果能够实现A代理给指定的代理用户执行，可以将执行入口统一收敛，解决需要初始化环境的问题。

## 1. 实现逻辑介绍


- 登陆用户：通过用户名密码直接登陆系统的用户
- 代理用户：作为登陆用户实际执行操作的用户称之为代理用户，代理登陆用户的执行相关操作

对于登陆cookie处理，解析出登录用户和代理用户

```html
代理用户的cookie的key为：linkis_user_session_proxy_ticket_id_v1
登录用户的cookie: linkis_user_session_ticket_id_v1

```
linkis的相关接口能在基于UserName信息，识别出代理用户信息，使用代理用户进行各项操作。并记录审计日志，包含用户的任务执行操作，下载操作
任务提交执行的时候，entrance入口服务修改执行的用户为代理用户

## 2. 使用方式  

### 2.1 Step1 开启代理模式
在 `linkis.properties` 指定如下参数：
```shell script
# 打开代理模式
    wds.linkis.gateway.conf.enable.proxy.user=true
    # 指定代理配置文件
    wds.linkis.gateway.conf.proxy.user.config=proxy.properties
```

    
在 conf 目录下，创建`proxy.properties` 文件，内容如下：
```shell script
# 格式如下：
    ${LOGIN_USER}=${PROXY_USER}
    # 例如：
    enjoyyin=hadoop
``` 
如果现有的代理模式不能满足您的需求，也可以对：`org.apache.linkis.gateway.security.ProxyUserUtils`进一步改造。

### 2.2 Step2 重启linkis-mg-gateway 的服务 

修改配置后，需要重启`linkis-mg-gateway`服务 `sh sbin/linkis-daemon.sh start mg-mgtaeway`，才能生效

## 3  注意事项 

- 用户分为代理用户和非代理用户，代理类型的用户不能进行再次代理到其他用户执行
- 需要控制登陆用户与可代理的系统用户列表，禁止出现任意代理的情况，避免权限不可控。最好支持数据库表来配置，并可以直接修改生效，不需要重启服务
- 单独记录日志文件包含代理用户的操作，如代理执行、函数更新等PublicService的代理用户操作全部记录到日志中，方便审计


