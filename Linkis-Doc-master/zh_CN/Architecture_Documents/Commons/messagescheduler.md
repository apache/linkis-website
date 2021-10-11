# Linkis-Message-Scheduler
## 1. 概述
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis-RPC可以实现微服务之间的通信，为了简化RPC的使用方式，Linkis提供Message-Scheduler模块，通过如@Receiver注解的方式的解析识别与调用，同时，也统一了RPC和Restful接口的使用方式，具有更好的可拓展性。
## 2. 架构说明
## 2.1. 架构设计图
![模块设计图](./../../Images/Architecture/Commons/linkis-message-scheduler.png)
## 2.2. 模块说明
* ServiceParser：解析Service模块的(Object)对象，同时把@Receiver注解的方法封装到ServiceMethod对象中。
* ServiceRegistry：注册对应的Service模块，将Service解析后的ServiceMethod存储在Map容器中。
* ImplicitParser：将Implicit模块的对象进行解析，使用@Implicit标注的方法会被封装到ImplicitMethod对象中。
* ImplicitRegistry：注册对应的Implicit模块，将解析后的ImplicitMethod存储在一个Map容器中。
* Converter：启动扫描RequestMethod的非接口非抽象的子类，并存储在Map中，解析Restful并匹配相关的RequestProtocol。
* Publisher：实现发布调度功能，在Registry中找出匹配RequestProtocol的ServiceMethod，并封装为Job进行提交调度。
* Scheduler：调度实现，使用Linkis-Sceduler执行Job，返回MessageJob对象。
* TxManager：完成事务管理，对Job执行进行事务管理，在Job执行结束后判断是否进行Commit或者Rollback。
