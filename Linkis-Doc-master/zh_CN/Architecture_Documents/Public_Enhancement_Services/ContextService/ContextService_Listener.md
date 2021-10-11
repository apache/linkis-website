## **Listener架构**

在DSS中，当某个节点更改了它的元数据信息后，则整个工作流的上下文信息就发生了改变，我们期望所有的节点都能感知到变化，并自动进行元数据更新。我们采用监听模式来实现，并使用心跳机制进行轮询，保持上下文信息的元数据一致性。

### **客户端 注册自己、注册CSKey及更新CSKey过程**

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-listener-01.png)

主要过程如下：

1、注册操作：客户端client1、client2、client3、client4通过HTPP请求分别向csserver注册自己以及想要监听的CSKey，Service服务通过对外接口获取到callback引擎实例，注册客户端及其对应的CSKeys。

2、更新操作：如ClientX节点更新了CSKey内容，Service服务则更新ContextCache缓存的CSKey，ContextCache将更新操作投递给ListenerBus，ListenerBus通知具体的listener进行消费（即ContextKeyCallbackEngine去更新Client对应的CSKeys），超时未消费的事件，会被自动移除。

3、心跳机制：

所有Client通过心跳信息探测ContextKeyCallbackEngine中CSKeys的值是否发生了变化。

ContextKeyCallbackEngine通过心跳机制返回更新的CSKeys值给所有已注册的客户端。如果有客户端心跳超时，则移除该客户端。

### **Listener UM类图**

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-02.png)

接口：ListenerManager

对外：提供ListenerBus，用于投递事件。

对内：提供 callback引擎，进行事件的具体注册、访问、更新，及心跳处理等逻辑

## **Listener callbackengine时序图**

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-03.png)