---
title: 单个服务的启动
sidebar_position: 1
---

## 1 跳转到到对应的服务目录

比如PublicService

```bash
    cd linkis-publicservice
```

## 2 执行启动

```bash
    sh start-publicservice.sh
```

## 3 启动成功检查

- (1). 判断日志可以通过查看linkis.out

```bash
    less -i logs/linkis.out
```

- (2). 通过查看Eureka界面

在Eureka界面查看服务启动成功情况，查看方法：

使用http://${EUREKA_INSTALL_IP}:${EUREKA_PORT}, 在浏览器中打开，查看服务是否注册成功。

如下图，如您的Eureka主页出现了相应的微服务，则表示服务启动成功，可以正常对外提供服务了： 

 ![Eureka](../images/ch1/Eureka_homepage.png)