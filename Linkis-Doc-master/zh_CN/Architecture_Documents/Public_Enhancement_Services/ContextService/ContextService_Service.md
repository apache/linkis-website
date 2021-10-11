## **ContextService架构**

### **水平划分**

从水平上划分为三个模块：Restful，Scheduler，Service

#### Restful职责：

    将请求封装为httpjob提交到Scheduler

#### Scheduler职责：

    通过httpjob的protocol的ServiceName找到相应的服务执行这个job

#### Service职责：

    真正执行请求逻辑的模块，封装ResponseProtocol，并唤醒Restful中wait的线程

### **垂直划分**
从垂直上划分为4个模块：Listener，History，ContextId，Context：

#### Listener职责：

1.  负责Client端的注册和绑定（写入数据库和在CallbackEngine中进行注册）

2.  心跳接口，通过CallbackEngine返回Array[ListenerCallback]

#### History职责：
创建和移除history，操作Persistence进行DB持久化

#### ContextId职责：
主要是对接Persistence进行ContextId的创建，更新移除等操作

#### Context职责：

1.  对于移除，reset等方法，先操作Persistence进行DB持久化，并更新ContextCache

2.  封装查询condition去ContextSearch模块获取相应的ContextKeyValue数据

请求访问步骤如下图：
![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-01.png)

## **UML类图** 
![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-02.png)

## **Scheduler线程模型**

需要保证Restful的线程池不被填满

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-03.png)

时序图如下：
![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-04.png)


