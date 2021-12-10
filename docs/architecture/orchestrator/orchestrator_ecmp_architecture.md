EngineConnPlugin架构设计
------------------------

EngineConnPlugin用于将原本实现一个新引擎，需要实现的相关接口和类，以及需要拆分的Entrance-EngineManager-Engine三层模块体系，融合到了一个接口之中，简化用户实现新引擎的流程和代码，真正做到只要实现一个类，就能接入一个新引擎。

### EngineConnPlugin 架构实现

1、Linkis 0.X版本痛点与思考

Linkis
0.X版本没有Plugin的概念，用户新增一个引擎，需要同时实现Entrance、EngineManager、Engine相关接口，开发工作量和维护工作量都较大，修改也比较复杂。

以下是用户Linkis0.X实现一个新引擎需要实现的相关接口和类：

![](Images/相关接口和类.png)

2、新版本的改进

Linkis
1.0版本重构了引擎从创建到任务执行的整个逻辑，将Entrance简化为一个服务，通过标签来对接不同的Engine、EngineManager也会简化为一个。Engine定义为EngineConn连接器+Executor执行器，并且抽象成多个服务和模块，由用户根据需要灵活选取需要的服务和模块。这样大大减少了新增引擎的开发和维护工作量。并且plugin会将引擎的lib和conf动态添加到bml进行版本管理。

以下为Linkis1.0.0，实现一个新引擎，用户需实现的接口和类：

![](Images/1.0中用户需实现的接口和类.png)

其中EngineConnResourceFactory和EngineLaunchBuilder为非必需实现接口，只有EngineConnFactory为必需实现接口。

### EngineConnPlugin交互流程

EngineConnPlugin提供了Server服务，用于启动和加载所有的引擎插件，以下给出了一个新引擎启动，访问了EngineConnPlugin-Server的全部流程：

![](Images/交互流程.png)