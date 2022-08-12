---
title: Linkis Client 架构设计
sidebar_position: 4
---

为用户提供向Linkis提交执行任务的轻量级客户端。

#### Linkis-Client架构图

![img](/Images-zh/Architecture/linkis-client-01.png)



#### 二级模块介绍

##### Linkis-Computation-Client

以SDK的形式为用户提供向Linkis提交执行任务的接口。

| 核心类     | 核心功能                                         |
| ---------- | ------------------------------------------------ |
| Action     | 定义了请求的属性，包含的方法和参数               |
| Result     | 定义了返回结果的属性，包含的方法和参数           |
| UJESClient | 负责请求的提交，执行，状态、结果和相关参数的获取 |

 

#####  Linkis-Cli

以shell命令端的形式为用户提供向Linkis提交执行任务的方式。

| 核心类      | 核心功能                                                     |
| ----------- | ------------------------------------------------------------ |
| Common      | 定义了指令模板父类、指令解析实体类、任务提交执行各环节的父类和接口 |
| Core        | 负责解析输入、任务执行和定义输出方式                         |
| Application | 调用linkis-computation-client执行任务，并实时拉取日志和最终结果 |

 