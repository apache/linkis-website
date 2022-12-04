---
title: RPC架构
sidebar_position: 2
---

## 1. 背景

基于Feign的微服务之间HTTP接口的调用，只能满足简单的A微服务实例根据简单的规则随机选择B微服务之中的某个服务实例，而这个B微服务实例如果想异步回传信息给调用方，是根本无法实现的。

同时，由于Feign只支持简单的服务选取规则，无法做到将请求转发给指定的微服务实例，无法做到将一个请求广播给接收方微服务的所有实例。


## 2. 简介

Linkis基于Feign实现了一套自己的底层RPC通信方案。

Linkis RPC作为底层的通信方案，将提供SDK集成到有需要的微服务之中。

一个微服务既可以作为请求调用方，也可以作为请求接收方。

作为请求调用方时，将通过Sender请求目标接收方微服务的Receiver，作为请求接收方时，将提供Receiver用来处理请求接收方Sender发送过来的请求，以便完成同步响应或异步响应。

![Linkis RPC架构图](../../images/ch4/rpc1.png)


## 3. 实现

基于请求调用方的Sender体系和请求接收方的Receiver体系，构成了Linkis RPC的全部架构。

![Linkis RPC详细架构图](../../images/ch4/rpc2.png)

### 3.1 发送端

Linkis RPC作为底层的通信层，发送端无需使用者写任何的实际代码。

- 1) 使用者通过调用Linkis RPC提供的SDK，通过微服务名（Service Name）或指定微服务实例（微服务名+微服务实例的IP和端口），获取一个Sender发送器。

 &ensp; &ensp; &ensp; &ensp; Sender提供的可使用方法，见如下伪代码：

```java
abstract class Sender {
	Object ask(Object message);
	Object ask(Object message, Duration timeout);
	void send(Object message);
	void deliver(Object message);
}
```

 &ensp; &ensp; &ensp; &ensp;其中:

        1. ask方法为同步请求响应方法，要求接收端必须同步返回响应；
        2. send方法为同步请求方法，只负责同步将请求发送给接收端，不要求接收端给出答复；
        3. deliver则为异步请求方法，只要发送端的进程不异常退出，在稍后会通过其它线程将请求发送给接收端。

- 2) 使用者作为发送端，通过Sender发送器提供的请求方法，发送请求给接收端。

- 3) Sender发送器会将使用者的请求传递给拦截器。拦截器拦截请求，开始对请求做额外的功能性处理：

     a)	广播拦截器。
     
     广播拦截器只对需要进行广播的请求生效。
     
     广播拦截器会提供特殊的广播接口，如果本次请求实现了该广播接口，且该请求不是正在广播中，广播拦截器则认为本次请求需要进行广播，这时会触发广播操作。
     
     具体步骤为：获取请求需要进行广播的所有微服务实例，如果为空则默认广播给该微服务的所有实例；然后将请求标记为广播中，调用步骤1)，获取对应的所有微服务实例的所有Sender，通过多线程的方式开始进行请求发送；等到线程池中的Sender都发送完请求，将本次广播请求标记为成功，返回给使用者，处理完毕。
     
     b)	重试拦截器。
     
     重试拦截器会对接下来的所有步骤提供重试功能。
     
     如果发送端成功发送了请求，但是接收端返回了要求重试的异常，这时会触发重试拦截器的重试，重新自动提交请求；如果本次请求没有指定微服务接收端的特定实例，发送请求时出现了ConnectException（连接异常），也会主动进行重试；或者使用者指定了某些异常需要重试，这时重试拦截器也会自动进行重试。
     
     c)	缓存拦截器。
     
     缓存拦截器是针对一些响应内容不大可能经常变动的同步请求而设定的。
     
     缓存拦截器也会提供特殊的缓存接口，如果本次请求实现了该缓存接口，会首先在缓存拦截器中寻找该请求是否已缓存了接收端的响应，如果有则直接返回缓存响应，否则继续接下拉的步骤，并在接收端返回响应后，先将响应缓存起来，再将响应返回使用者，处理完毕。
     
     d)	默认拦截器。
     
     默认拦截器用于调用接下来的处理步骤。
     
     e)	自定义拦截器。使用者也可以自己实现自定义拦截器，用于实现一些特定的功能。
 
- 4) 请求编码器会先将用户请求的数据（实体Bean）转换成序列化的JSON字符串，然后传递给Feign客户端生成器。


- 5) Feign客户端生成器，生成可访问接收端Restful请求接收器的Feign客户端。


- 6) 生成的Feign客户端，会调用服务发现管理器，获取所有的微服务列表，通过服务选择器，如果使用者在步骤1)指定的是微服务名，则通过Feign的负载均衡策略，为请求选择一个合适的接收方微服务实例进行请求转发，否则服务选择器会重写Spring Cloud Feign的FeignLoadBalancer（Feign负载均衡器），在创建LoadBalancerCommand时，指定对应的微服务实例为步骤1）获取Sender时指定的微服务实例。


- 7) 调用Feign客户端，开始请求接收端的Restful请求接收器。


### 3.2 接收端

 接收端需要使用者实现Receiver接口，用于处理真正的业务逻辑。

1)	Restful请求接收器作为Linkis RPC内嵌的HTTP请求Web Service服务，负责接收发送端的请求

2)	Restful请求接收器接收到请求后，先调用请求解码器对请求进行解码，解析出实际的请求信息和发送端微服务信息（微服务名+微服务实例的IP和端口），如果解析失败，会直接响应解析请求失败。

3)	将解析后的请求信息和发送端微服务信息放入请求消息队列；

4)	请求消费器会消费请求消息队列里，已经解码的发送端请求。

 通过调用Receiver管理器获取一个合适的Receiver；同时通过获取到的发送端微服务信息，使用Sender生成器生成一个指向发送端的Sender。然后请求消费器将实际的请求信息和生成的发送端Sender，传给Receiver进行处理； 

5)	Receiver作为用户请求的实际处理单元，要求使用者必须实现Receiver接口，完成对调用端请求的实际处理逻辑。

 Receiver的伪代码如下：

```java
public interface Receiver {
	void receive(Object message, Sender sender);
	Object receiveAndReply(Object message, Sender sender);
    Object receiveAndReply(Object message, Duration duration, Sender sender);
}
```

 Receiver提供了处理同步请求和异步请求的方法。

6)	 如果本次请求是异步请求，则调用Receiver的receive方法，由上层业务决定是否需要通过发送端的Sender回传响应。

7)	如果本次请求是同步请求，则调用 Receiver的receiveAndReply方法，将返回值作为响应结果，回传发送端。
