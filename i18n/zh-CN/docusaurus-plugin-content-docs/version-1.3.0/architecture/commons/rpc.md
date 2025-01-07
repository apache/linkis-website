---
title: RPC 模块
sidebar_position: 2
---

基于Feign的微服务之间HTTP接口调用，只能满足简单的A微服务实例根据简单的规则随机访问B微服务之中的某个服务实例，而这个B微服务实例如果想异步回传信息给调用方，是根本无法实现的。
同时，由于Feign只支持简单的服务选取规则，无法做到将请求转发给指定的微服务实例，无法做到将一个请求广播给接收方微服务的所有实例。
Linkis RPC是基于Spring Cloud + Feign实现的一套微服务间的异步请求和广播通信服务，可以独立于Linkis而使用。



## 1. 简介
Linkis RPC作为底层的通信方案，将提供SDK集成到有需要的微服务之中。
一个微服务既可以作为请求调用方，也可以作为请求接收方。

作为请求调用方时，将通过Sender请求目标接收方微服务的Receiver，作为请求接收方时，将提供Receiver用来处理请求接收方Sender发送过来的请求，以便完成同步响应或异步响应。
![](/Images/Architecture/RPC-01.png)

```
org.apache.linkis.rpc.Sender 
org.apache.linkis.rpc.Receiver
```

### 1.1 架构设计图
![Linkis RPC架构图](/Images-zh/Architecture/Commons/linkis-rpc.png)
### 1.2 模块说明
主要模块的功能介绍如下：
* Eureka：服务注册中心，用户管理服务，服务发现。
* Sender发送器：服务请求接口，发送端使用Sender向接收端请求服务。
* Receiver接收器：服务请求接收相应接口，接收端通过该接口响应服务。
* Interceptor拦截器：Sender发送器会将使用者的请求传递给拦截器。拦截器拦截请求，对请求做额外的功能性处理，分别是广播拦截器用于对请求广播操作、重试拦截器用于对失败请求重试处理、缓存拦截器用于简单不变的请求读取缓存处理、和提供默认实现的默认拦截器。
* Decoder，Encoder：用于请求的编码和解码。
* Feign：是一个http请求调用的轻量级框架，声明式WebService客户端程序，用于Linkis-RPC底层通信。
* Listener：监听模块，主要用于监听广播请求。



## 2. 实现

基于请求调用方的Sender体系和请求接收方的Receiver体系，构成了Linkis RPC的全部架构。
![](/Images/Architecture/RPC-01.png)

### 2.1 发送端
Linkis RPC作为底层的通信层，发送端无需调用者写任何的实际代码。

- 调用者通过调用Linkis RPC提供的SDK，通过微服务名（Service Name）或指定微服务实例（微服务名+微服务实例的IP和端口），获取一个Sender发送器。

Sender提供的可使用方法，见如下伪代码：
```
abstract class Sender {
	Object ask(Object message);
	Object ask(Object message, Duration timeout);
	void send(Object message);
	void deliver(Object message);
}

其中:
1. ask方法为同步请求响应方法，要求接收端必须同步返回响应；
2. send方法为同步请求方法，只负责同步将请求发送给接收端，不要求接收端给出答复；
3. deliver则为异步请求方法，只要发送端的进程不异常退出，在稍后会通过其它线程将请求发送给接收端。
```

- 调用者作为发送端，通过Sender发送器提供的请求方法，发送请求给接收端。
- Sender发送器会将调用者的请求传递给拦截器，进行一系列发送前的逻辑处理。

拦截器拦截请求，开始对请求做额外的功能性处理：

**广播拦截器**
```
org.apache.linkis.rpc.interceptor.common.BroadcastRPCInterceptor
```
广播拦截器只对需要进行广播的请求生效。
广播拦截器会提供特殊的广播接口，如果本次请求实现了该广播接口，且该请求不是正在广播中，广播拦截器则认为本次请求需要进行广播，这时会触发广播操作。

**重试拦截器**

```
org.apache.linkis.rpc.interceptor.common.RetryableRPCInterceptor
```

重试拦截器会对接下来的所有步骤提供重试功能。
如果接收端要求重试，或者发送请求时出现了ConnectException（连接异常），或者调用者指定某些异常需要重试，这时重试拦截器会自动进行重试。


**缓存拦截器**
```
org.apache.linkis.rpc.interceptor.common.CacheableRPCInterceptor
```

缓存拦截器是针对一些响应内容不大可能经常变动的同步请求而设定的。
缓存拦截器也会提供特殊的缓存接口，如果本次请求实现了缓存接口，会首先在缓存拦截器中寻找缓存，不存在缓存才会继续请求，并在拿到响应后，先将响应缓存起来，再将响应返回。

**公共默认拦截器**
```
org.apache.linkis.rpc.interceptor.common.CommonRPCInterceptor
```


公共默认拦截器用于调用接下来的处理步骤（示例参考:org.apache.linkis.rpc.BaseRPCSender#ask） 


- 请求编码器会先将用户请求的数据（实体Bean）转换成序列化的JSON字符串，然后传递给Feign客户端生成器。
- Feign客户端生成器，生成可访问接收端Restful请求接收器的Feign客户端。
- 生成的Feign客户端，会调用Eureka客户端，获取所有微服务列表，通过服务选择器，如果调用者指定微服务名，则通过Feign的负载均衡策略，
  选择一个合适的接收方微服务实例进行请求转发，否则服务选择器会重写Spring Cloud Feign的FeignLoadBalancer（Feign负载均衡器），
  在创建LoadBalancerCommand时，请求调用者指定的微服务实例（微服务名+微服务实例address）。
  调用Feign客户端，开始请求接收端的Restful请求接收器。

**自定义拦截器**

调用者也可以自己实现自定义拦截器(在linkis-commons/linkis-rpc/src/main/scala/org/apache/linkis/rpc/interceptor/common下实现RPCInterceptor接口，并通过@Component注入)，用于实现一些特定的功能。

### 2.2 接收端
接收端需要调用者**实现Receiver接口**，用于处理真正的业务逻辑。
- 1. RPCReceiveRestful请求接收器作为Linkis RPC内嵌的HTTP请求Web Service服务，负责接收发送端的请求
- 2. RPCReceiveRestful请求接收器接收到请求后，先调用请求解码器对请求进行解码，解析出实际的请求信息和发送端微服务信息（微服务名+微服务实例的IP和端口），如果解析失败，会直接响应解析请求失败。
- 3. 将解析后的请求信息和发送端微服务信息放入请求消息队列；
- 4. 请求消费器会消费请求消息队列里，已经解码的发送端请求。
- 5. 通过调用Receiver管理器获取一个合适的Receiver；同时通过发送端微服务信息，使用Sender生成器生成一个指向发送端的Sender。 然后请求消费器将实际的请求信息和生成的发送端Sender，传给Receiver进行处理。
- 6. Receiver作为用户请求的实际处理单元，要求调用者必须实现Receiver接口，完成对调用端请求的实际处理逻辑。
```
Receiver的伪代码如下：
public interface Receiver {
    void receive(Object message, Sender sender);
    Object receiveAndReply(Object message, Sender sender);
    Object receiveAndReply(Object message, Duration duration, Sender sender);
}
```
Receiver提供了处理同步请求和异步请求的方法。
- 如果本次请求是异步请求，则调用Receiver的receive方法，由上层业务决定是否需要通过发送端的Sender回传响应。
- 如果本次请求是同步请求，则调用 Receiver的receiveAndReply方法，将返回值作为响应结果，回传发送端。






