---
title: 抛出异常规范
sidebar_position: 1
---

## 如何定义新异常？

- 自定义的异常都必须继承自LinkisRetryException、WarnException、ErrorException或FatalException之一

- 自定义的异常必须包含错误码和错误描述，如有必要，也可将发生异常的ip地址和进程端口封装到异常当中

- 慎用WarnException！WarnException抛出来的异常，如果在Restful和RPC的Receiver端被捕获，不会给前端或sender端抛出执行失败，而是只返回一条警告信息！

- WARNException的异常级别为1，ErrorException的异常级别为2，FatalException的异常级别为3，LinkisRetryException的异常级别为4

|异常类|	所在服务|   错误码|    错误描述|
|:----  |:---   |:---   |:---   |
|LinkisException|	common| 无|	顶级父类，继承自Exception,不允许直接继承|
|LinkisRuntimeException|	common| 无|	顶级父类，继承自RuntimeException,不允许直接继承|
|WarnException|	common|	无|	次级父类，继承自LinkisRuntimeException。提示级的异常，必须直接或间接继承该类|
|ErrorException|	common|	无|	次级父类，继承自LinkisException。错误级的异常，必须直接或间接继承该类|
|FatalException|	common|	无|	次级父类，继承自LinkisException。致命级的异常，必须直接或间接继承该类|
|LinkisRetryException|	common|	无|	次级父类，继承自LinkisException。重试级的异常，必须直接或间接继承该类|

## 模块异常规范

linkis-commons:10000-11000
linkis-computattion-governace:11000-12000
linkis-engineconn-plugins:12000-13000
linkis-orchestrator:13000-14000
linkis-public-enghancements:14000-15000
linkis-spring-cloud-service:15100-15500
linkis-extensions:15500-16000
linkis-tuning:16100-16200
linkis-user-control:16200-16300
