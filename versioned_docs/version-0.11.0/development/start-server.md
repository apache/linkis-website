---
title: Start Of A Single Service
sidebar_position: 1
---

## 1 jump to corresponding service directory

e.g. PublicService

```bash
    cd linkis-publicservice
```

## 2 Execute Launch

```bash
    sh start-publicservice.sh
```

## 3 Startup Success Check

- (1) Judging logs can be viewed by looking at linkis.out

```bash
    less -i logs/linkis.out
```

- By viewing the Eureka interface

View service startup on Eureka interface, see method：

Use http://${EUREKA_INSTALL_IP}:${EUREKA_PORT}, open in browser, see whether the service was registered successfully.

If your Eureka home page shows a microservice, it indicates that the service is started successfully and can be provided externally：

 ![Eureka](../images/ch1/Eureka_homepage.png)