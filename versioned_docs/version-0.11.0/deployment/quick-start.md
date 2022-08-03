---
title: Quick Start
sidebar_position: 2
---

> Start script needs to be executed after installation

## 1 Start Service

Execute the following commands in the installation directory, start all services：

```bash  
  ./bin/start-all.sh > start.log 2>start_error.log
```

## 2 View successful startup

You can view service startup success on the Eureka interface, see method：

Use http://${EUREKA_INSTALL_IP}:${EUREKA_PORT}, open in browser, see whether the service was registered successfully.

If you do not specify in config.sh, EUREKA_INSTAL_IP_SPECIALL_IP, then HTTP address is：http://127.0.0.1:20303

As shown in the figure below, if the following microservices appear on your Eureka homepage, it means that the services have been started successfully and you can provide services to the outside world normally:

![Eureka](../images/ch1/Eureka_homepage.png)

## 3 Quick Use Linkis

Please refer to[to quickly use Linkis](quick-deploy#5-快速使用linkis)