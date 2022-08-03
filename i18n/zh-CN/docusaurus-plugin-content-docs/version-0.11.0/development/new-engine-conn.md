---
title: 如何实现一个新引擎
sidebar_position: 3
---


## 1 总体介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后台开发人员在使用Linkis的时候，不但可以直接使用Linkis已经开发的执行引擎，也可以根据自己的需求使用框架开发出自己的应用。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis可以抽象分成为Entrance，EngineManager和Engine几个模块，其中Entrance、EngineManager和Engine三个模块的作用和架构可以查看UJES架构设计文档。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户只需要实现三个模块的必要接口就可以实现自己的一个Linkis引擎。

## 2 接入操作

### 2.1 Entrance的接入

#### 2.1.1 maven依赖

```xml
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>linkis-ujes-entrance</artifactId>
  <version>0.5.0</version>
</dependency>
```

#### 2.1.2 需要实现的接口

 Entrance没有必须要实例化的接口，以下接口可以根据需要进行实现：
 
- EntranceParser。用于将前端传递过来的一个请求，一般是Json体，转换成一个可被持久化的Task。该类已提供了AbstractEntranceParser，用户只需实现parseToTask方法即可，系统默认提供了CommonEntranceParser实现。
 
 ![CommonEntranceParser](../images/ch6/CommonEntranceParser.png)<br/>

- EngineRequester。用于获得一个RequestEngine类，该类用于向EngineManager微服务请求一个新的Engine。Linkis已经有一个实现类。
 
 ![EngineRequesterImpl](../images/ch6/EngineRequesterImpl.png)<br/>

- Scheduler。用于实现调度，默认已实现了多用户并发、单个用户内FIFO执行的调度模式。
 
 ![FIFOScheduler](../images/ch6/FIFOScheduler.png)<br/>

### 2.2 EngineManager的接入

#### 2.2.1 maven依赖

```xml
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>linkis-ujes-enginemanager</artifactId>
  <version>0.5.0</version>
</dependency>
```

#### 2.2.2 需要实现的接口

 EngineManager需要对以下接口根据需要进行实现:

- EngineCreator，已存在AbstractEngineCreator，需实现createProcessEngineBuilder方法，用于创建一个EngineBuilder。

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里，ProcessEngineBuilder已默认提供了一个JavaProcessEngineBuilder类，这个类是一个abstract类，已默认将必要的classpath、JavaOpts、GC文件路径、日志文件路径，以及测试模式下DEBUG端口的开启已做好了。

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现JavaProcessEngineBuilder，只需要加入额外的classpath和JavaOpts即可。

 ![AbstractEngineCreator](../images/ch6/AbstractEngineCreator.png)<br/>

- EngineResourceFactory，已存在AbstractEngineResourceFactory，需实现getRequestResource方法，用于拿到用户的个性化资源请求。
 
 ![EngineResourceFactory](../images/ch6/EngineResourceFactory.png)<br/>

- hooks，这是一个spring实体bean，主要用于在创建并启动Engine的前后，加前置和后置hook，需要用户提供一个Array[EngineHook]，以供依赖注入。
 
 ![hooks](../images/ch6/hooks.png)<br/>
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具体实例可以参看Hive EngineManager的实现。

- resources，这是一个spring实体bean，主要用于像RM注册资源，resources是ModuleInfo的实例，需要用户提供一个，以供依赖注入。
 
 ![resources](../images/ch6/resources_bean.png)<br/>


### 2.3 Engine的接入

#### 2.3.1 maven依赖

```xml
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>Linkis-ujes-engine</artifactId>
  <version>0.5.0</version>
</dependency>
```

#### 2.3.2 需要实现的接口

1. Engine必须实现的接口如下：

- EngineExecutorFactory。用于创建一个EngineExecutor，需实现createExecutor方法，具体为通过一个存参数的Map，创建一个EngineExecutor。

![EngineExecutorFactory](../images/ch6/EngineExecutorFactory.png)<br/>

- EngineExecutor。实际真正的执行器，用于提交执行entrance提交过来的代码。需要实现getActualUsedResources（该engine实际使用的资源）、executeLine（执行一行通过CodeParser解析过的代码）、executeCompletely（executeLine的补充方法，如果调用executeLine返回的是ExecuteIncomplete，这时会将新的Code和之前返回ExecuteIncomplete的代码同时传递给engine执行）

![EngineExecutor](../images/ch6/EngineExecutor.png)<br/>


2. Engine非必须实现的接口或bean如下:

- engineHooks: Array[EngineHook]，是一个spring bean。EngineHook是engine创建的前置和后置hook，目前系统已提供了2个hook：CodeGeneratorEngineHook用于加载UDF和函数，ReleaseEngineHook用于释放空闲的engine，如果不指定，系统默认会提供engineHooks=Array(ReleaseEngineHook)

![engineHooks](../images/ch6/engineHooks_bean.png)<br/>

- CodeParser。用于解析代码，以便一行一行执行。如果不指定，系统默认提供一个直接返回所有代码的CodeParser。

![CodeParser](../images/ch6/codeParser_bean.png)<br/>

- EngineParser，用于将一个RequestTask转换成可提交给Scheduler的Job，如果没有指定，系统会默认提供一个将RequestTask转换成CommonEngineJob的EngineParser。

![EngineParser](../images/ch6/engineParser_bean.png)<br/>


## 3 参考实例

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本节将通过介绍hive引擎的编写提供一个参考实例。  

### 3.1 HiveEntrance的接入

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据第二节中的描述，Entrance没有必须要实现的接口，linkis-0.5.0中的代码，hive的entrance也只有两个类，只是用来错误码扩展的。

### 3.2.HiveEngineManager的接入

- 1.EngineCreator接口的实现

![HiveEngineCreator](../images/ch6/HiveEngineCreator.png)<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从上图中我们可以看到HiveEM模块中有一个HiveEngineCreator类，继承了AbstractEngineCreator类，同时实现了 createProcessEngineBuilder的方法，返回了一个HiveQLProcessBuilder。

- 2.HiveQLProcessBuilder实现

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HiveEngineManager这个模块中有一个HiveQLProcessBuilder类，该类继承自JavaProcessEngineBuilder，该类实现了若干必须的接口，同时也覆写了build 方法，其实父类的build的方法已经足够完善，HiveQLProcessBuilder覆写 build 方法是为了将用户传入的参数进行获取，然后加入到启动命令当中。

![HiveQLProcessBuilder](../images/ch6/HiveQLProcessBuilder.png)<br/>

- 3.AbstractEngineResourceFactory接口实现

![HiveEngineResourceFactory](../images/ch6/hive_engineResourceFactory_bean.png)<br/>
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这个实例中，我们可以将用户每次请求引擎的时候，希望获取的CPU核数、内存大小、实例数通知到ResourceManager

- 4.resources 和 hooks bean的注入

![HiveBeans](../images/ch6/hive_beans.png)<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从上图中我们可以看到，通过注入一个Spring的配置Configuration，将resources和 hooks两个bean进行注入，UJES框架本身会提供@ConditionalMissingBean 注解注入默认的bean，开发者可以根据自身的需求进行注入自己的实体bean。这个类实例bean中，用户可以将EngineManager服务的总内存、总CPU核数、总共能起的实例数都注册到RM中

### 3.3 HiveEngine 的接入

- 1.EngineExecutorFactory 接口实现
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HiveEngine模块中有一个HiveEngineExecutorFactory，在createExecutor方法最后，返回了HiveEngineExecutor。

![HiveEngineExecutorFactory](../images/ch6/HiveEngineExecutorFactory.png)<br/>

- 2.EngineExecutor接口实现

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其中executeLine 是必须要实现的一个接口，该接口是传入经过CodeParser进行分隔后一行脚本，返回ExecuteResponse(成功或失败)。

![HiveEngineExecutor](../images/ch6/HiveEngineExecutor.png)<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外,executeCompletely也是需要实现的，这个是在executeLine返回IncompleteReponse 进行调用。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine在执行作业的时候，还有一些常用方法，如 close kill pause progress等方法可以根据自己的需求进行实现。

## 4 常见问题

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎大家加群提问。
 
![微信及QQ群](../images/ch6/group.png)<br/>