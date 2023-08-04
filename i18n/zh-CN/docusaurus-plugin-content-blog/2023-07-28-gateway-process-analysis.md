---
title: Linkis1.3.2 Gateway流程分析
authors: [ahaoyao]
tags: [blog,linki1.3.2,gateway]
---
### Linkis 1.3.2 流程图解

GateWay采用的是webFlux的响应式编程，其整个流程与spring mvc 类似

| 框架    | Gateway            | spring mvc         |
|-------|--------------------|--------------------|
| 请求分发  | DispatcherHandler  | DispatcherServlet  |
| 请求映射  | HandlerMapping     | HandlerMapping     |
| 请求适配  | HanderAdaper       | HanderAdaper       |
| 请求处理  | WebHander          | Hander             |
		
### 流程图

![](/static/Images/gateway/flow-chart.png)


### Linkis 1.3.2 流程说明

其实整个流程核心为GatewayAuthorizationFilter的filter过程，其余的好理解，不做概述。
从功能上大致总结有三个阶段
```
认证SecurityFilter.doFilter -> Parse阶段确定ApplicationName -> Route阶段确定Instance
```
简化流程为：

![](/static/Images/gateway/simplify-the-process.png)

### 认证
从功能上单独把认证抽出来讲，核心SecurityFilter.doFilter方法，主要一些操作有：
校验类：ip白名单，refrere校验，url白名单
认证类：用户名密码认证，token认证，SSO认证

### Parse阶段
Parse阶段主要确定ApplicationName，特殊的也确定了Instance
Input：RequestURI， Output：ServiceInstance
实现原理：RequestURI通过正则匹配分发到不同的parse实现类
特别注意：所有parse是串行执行，不会中断，因此parse之间的正则需要具有互斥性。

#### 自定义Parse处理
- EntranceExecutionGatewayParser
我个人更愿意理解为Entrance的post类请求解析器，主要针对execute,submit等提交方法，需要校验requestBody，没有其他操作，直接返回ServiceInstance(linkis-cg-entrance, null)
- EntranceRequestGatewayParser
我个人更愿意理解为Entrance的get类请求解析器，主要针对status,progress,log,metric等查询方法，无需校验requestBody，主要根据RequestURI路径不同进行不同处理，解析出Instance（这里比较特殊，在parse阶段确定了Instance）

#### 通用Parse处理
- DefaultGatewayParser
  调用了自定义parse类处理后，同时也做了通用处理，当没有ServiceInstance时，会根据RequestURI匹配通用规则的ServiceInstance(publicservice,metadataquery等)，或者也可以理解为，单独写parse实现的，都是需要特殊处理的服务。
  ![](/static/Images/gateway/general-parse-processing.png)

### Route阶段
Route阶段主要确定Instance
Input：ServiceInstance(applicationName, null)， Output：ServiceInstance(applicationName, instance)
也有特殊的，在parse阶段就确定instance

#### Route处理
- DefaultLabelGatewayRouter(AbstractLabelGatewayRouter)
Route server白名单校验：可以通过配置ROUTER_SERVER_LIST实现，目前只有entrance服务
ServiceInstance实例选择逻辑：

  - 获取待选实例列表
  首先从参数解析出routeLabel标签
  
  case 1. 如果没有routeLabel, 则走默认逻辑获取可用的ServiceInstance列表，逻辑为：
  
    1） 从eureka获取所有applicationName实例, 记为a

    2） 从数据库获取有任意标签的applicationName实例, 记为b

    3）a - b 做差集获取到可用(无标签)实例列表 

    case 2. 如果有routeLabel，从数据库获取实例列表

  RouteLabel作用：用于做服务的租户隔离，当请求中带有routeLabel只会将对应的请求转发到对应打上了标签的服务。主要作用：1. 服务的租户隔离 2. 优雅下线：可以让服务快速被隔离，不会被路由到。
  特别注意：
  case 1. 可以保证获取的是指定applicationName的实例
  case 2. 获取的实例可以是不同applicationName的实例

  - 从待选实例列表中选择实例

      1）如果GatewayRoute.getServiceInstance中有指定applicationName，则需要待选实例列表进行过滤
    
      2）待选实例与eureka过滤出存活(注册)的实例列表
    
      3）从存活(注册)的实例列表随机选择一个

#### ServiceInstance校验
以eureka为例，主要服务名校验，实例校验

#### Route转换
利用ServiceInstance，从gateway转换到目标服务Route
例如：

- Gateway 请求转到 Entrance
Route{id='api', uri=lb://linkis-mg-gateway} -> Route{id='api', uri=lb://merge-gw-18linkis-cg-entrance192--168--1--1---9104}
- Gateway 请求转到 PublicService
Route{id='api', uri=lb://linkis-mg-gateway} -> Route{id='api', uri=lb://linkis-ps-publicservice}

### 知识小点
scala正则匹配使用
```
- 正则表达式：
REGEX = ("rest_[a-zA-Z][a-zA-Z_0-9]/(v\d+)/entrance/([^/]+)/.+").r

- 正确使用，必须是两个变量
REGEX(version, execId)
或者
REGEX(_, _)

- 原理：有两组()，也就是有两个变量。如给出的正则分别为(v\d+)和([^/]+)

- 如果正则修改为：
REGEX = ("rest_[a-zA-Z][a-zA-Z_0-9]/(v\d+)/entrance/([^/]+)/(.+)").r

- 则正确使用为：
REGEX(version, execId, method)
或者
REGEX(_, _, _)

```