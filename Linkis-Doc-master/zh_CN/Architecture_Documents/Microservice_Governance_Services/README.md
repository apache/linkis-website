## **背景**

微服务治理包含了Gateway、Eureka、Open Feign等三个主要的微服务。用来解决Linkis的服务发现与注册、统一网关、请求转发、服务间通信、负载均衡等问题。同时Linkis1.0还会提供对Nacos的支持；整个Linkis是一个完全的微服务架构，每个业务流程都是需要多个微服务协同完成的。

## **架构图**

![](../../Images/Architecture/linkis-microservice-gov-01.png)

## **架构描述**

1. Linkis Gateway作为Linkis的网关入口，主要承担了请求转发、用户访问认证、WebSocket通信等职责。Linkis1.0的Gateway还新增了基于Label的路由转发能力。Linkis在Spring
Cloud Gateway中，实现了WebSocket路由转发器，用于与客户端建立WebSocket连接，建立连接成功后，会自动分析客户端的WebSocket请求，通过规则判断出请求该转发给哪个后端微服务，从而将WebSocket请求转发给对应的后端微服务实例。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[进入Linkis Gateway](Gateway.md)

2. Linkis Eureka
主要负责服务注册与发现，Eureka由多个instance(服务实例)组成，这些服务实例可以分为两种：Eureka Server和Eureka Client。为了便于理解，我们将Eureka client再分为Service
Provider和Service Consumer。Eureka Server 提供服务注册和发现，Service Provider服务提供方，将自身服务注册到Eureka，从而使服务消费方能够找到Service
Consumer服务消费方，从Eureka获取注册服务列表，从而能够消费服务。

3. Linkis基于Feign实现了一套自己的底层RPC通信方案。Linkis RPC作为底层的通信方案，将提供SDK集成到有需要的微服务之中。一个微服务既可以作为请求调用方，也可以作为请求接收方。作为请求调用方时，将通过Sender请求目标接收方微服务的Receiver，作为请求接收方时，将提供Receiver用来处理请求接收方Sender发送过来的请求，以便完成同步响应或异步响应。
   
   ![](../../Images/Architecture/linkis-microservice-gov-03.png)