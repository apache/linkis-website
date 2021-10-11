## Gateway 架构设计

#### 简述
Gateway网关是Linkis接受客户端以及外部请求的首要入口，例如接收作业执行请求，而后将执行请求转发到具体的符合条件的Entrance服务中去。
整个架构底层基于SpringCloudGateway做扩展实现，上层叠加了与Http请求解析，会话权限，标签路由和WebSocket多路转发等相关的模组设计，整体架构可见如下。

### 整体架构示意图

![Gateway整体架构示意图](../../Images/Architecture/Gateway/gateway_server_global.png)

#### 架构说明
- gateway-core: Gateway的核心接口定义模块，主要定义了GatewayParser和GatewayRouter接口，分别对应请求的解析和根据请求进行路由选择；同时还提供了SecurityFilter的权限校验工具类。
- spring-cloud-gateway: 该模块集成了所有与SpringCloudGateway相关的依赖，对HTTP和WebSocket两种协议类型的请求分别进行了处理转发。
- gateway-server-support: Gateway的服务驱动模块，依赖spring-cloud-gateway模块，对GatewayParser、GatewayRouter分别做了实现，其中DefaultLabelGatewayRouter提供了请求标签路由的功能。
- gateway-httpclient-support: 提供了Http访问Gateway服务的客户端通用类，z可以基于做多实现。
- instance-label: 外联的实例标签模块，提供InsLabelService服务接口，用于路由标签的创建以及与应用实例关联。

涉及的详细设计如下：

#### 一、请求路由转发（带标签信息）
请求的链路首先经SpringCloudGateway的Dispatcher分发后，进入网关的过滤器链表，进入GatewayAuthorizationFilter 和 SpringCloudGatewayWebsocketFilter 两大过滤器逻辑，过滤器集成了DefaultGatewayParser和DefaultGatewayRouter。
从Parser到Router，执行相应的parse和route方法，DefaultGatewayParser和DefaultGatewayRouter内部还包含了自定义的Parser和Router，按照优先级顺序执行。最后由DefaultGatewayRouter输出路由选中的服务实例ServiceInstance，交由上层进行转发。
现我们以具有标签信息的作业执行请求转发为例子，绘制如下流程图：  
![Gateway请求路由转发](../../Images/Architecture/Gateway/gateway_server_dispatcher.png)


#### 二、WebSocket连接转发管理
默认情况下SpringCloudGateway对WebSocket请求只做一次路由转发，无法做动态的切换，而在Linkis Gateway架构下，每次信息的交互都会附带相应的uri地址，引导路由到不同的后端服务。
除了负责与前端、客户端连接的webSocketService以及负责和后台服务连接的webSocketClient, 中间会缓存一系列GatewayWebSocketSessionConnection列表，一个GatewayWebSocketSessionConnection代表一个session会话与多个后台ServiceInstance的连接。  
![Gateway的WebSocket转发管理](../../Images/Architecture/Gateway/gatway_websocket.png)
