---
title: Hive 引擎
sidebar_position: 2
---
## 1 Hive引擎的使用
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis实现的Hive执行引擎现在支持HiveQL的提交，用户通过Linkis使用文档中的三种接口方式(SDK, HTTP, WebSocket)提交自己的执行代码，就可以将自己的HiveQL提交到的集群中进行执行。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;想要使用Linkis系统执行HiveQL程序，需要下载Linkis的release安装包并配置、安装并启动指定的指定的微服务。

### 1.1 环境变量配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hive引擎依赖的环境变量:HADOOP_HOME、HADOOP_CONF_DIR、HIVE_HOME以及HIVE_CONF_DIR。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在启动hive执行引擎相关的微服务之前，请确保以上环境变量是已经设置的，如果没有设置的话，请先在/home/${USER}/.bash_rc 或 linkis-ujes-spark-enginemanager/conf目录中的 linkis.properties配置文件中设置。如以下所示

```properties
  HADOOP_HOME=${真实的hadoop安装目录}
  HADOOP_CONF_DIR=${真实的hadoop配置目录}
  HIVE_CONF_DIR=${真实的hive配置目录}
  HIVE_HOME=${真实的hive安装目录 }
```

### 1.2 依赖服务启动

Hive引擎的启动，需要依赖以下的Linkis微服务:

- 1)、Eureka: 用于服务注册于发现。
- 2)、Linkis-gateway: 用于用户请求转发。
- 3)、Linkis-publicService: 提供持久化、udf等基础功能。
- 4)、Linkis-ResourceManager:提供Linkis的资源管理功能。

### 1.3	自定义参数配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正常使用hive，还需要启动HiveEntrance 和 HiveEngineManager。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HiveEntrance是hive作业的接受者，HiveEngineManager是HiveEngine的启动者。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启动之前，用户可以设置关于hive引擎的自定义参数。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis考虑到用户希望能够更自由地设置参数，提供了许多的配置参数。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下表有一些常用的参数，Hive引擎支持配置更多的参数以获得更好的性能，如您有调优需求，欢迎阅读调优手册。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户可以在linkis.properties中配置这些参数。

|  参数名称 | 参考值 |  说明 |
| ------------ | ------------ | ------------ |
| wds.linkis.enginemanager.memory.max  | 40G|  用于指定hiveEM启动的所有引擎的客户端的总内存 |
| wds.linkis.enginemanager.cores.max  | 20 |  用于指定hiveEM启动的所有引擎的客户端的总CPU核数 |
| wds.linkis.enginemanager.engine.instances.max  | 10  |  用于指定hiveEM可以启动的引擎个数 |

### 1.4 前端部署

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上述微服务启动部署启动成功之后，用户如需要通过web浏览器来提交自己的HiveQL代码。可以通过部署配置微众另一款开源的前端产品[Scriptis](https://github.com/WeBankFinTech/Scriptis/blob/master/docs/zh_CN/ch1/%E5%89%8D%E5%8F%B0%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3.md)，该产品让用户能在web页面上编辑、提交代码，并能够实时接收后台给的信息。

**1.5运行效果图**

![Hive运行效果图1](../images/ch6/hive_run1.png)<br/>
图1 Hive运行效果图1

![Hive运行效果图2](../images/ch6/hive_run2.png)<br/>
图2 Hive运行效果图2

## 2 Hive引擎实现方式

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hive执行引擎的实现，是参照Linkis开发文档实现了Entrance、EngineManager和Engine三个模块的必要接口，其中Engine模块是最特殊的，Hive实现的方式也有自己的一套逻辑。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis现在提供的Release版本基于的hadoop版本是2.7.2， hive版本是1.2.1，两者都是apache版本。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis的Hive引擎与底层hive进行交互主要是通过HiveEngineExecutor这个类，该类是由HiveEngineExecutorFactory这个bean进行实例化。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HiveEngineExecutor实现的executeLine接口中，Linkis通过使用的hive提供的CommandProcessorFactory类，传入本地的hive的配置信息，得到一个org.apache.hadoop.hive.ql.Driver类，Driver类提供了API帮助提交用户的脚本代码到集群中执行。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Driver在提交hive sql代码之后，有提供执行是否成功以及获取成功之后获取结果集的API。如果执行成功,借助Linkis提供的统一存储服务，将结果集存储到指定的目录当中以供用户查看。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外，Driver在提交hive sql之后，如果产生了mapreduce任务，我们也可以通过HadoopJobExecHelper提供的killRunningJobs的API将已经提交的hive查询任务杀死，这就是用户前台kill任务的逻辑。<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;还有一点，Linkis的hive引擎还实现了进度功能。具体是通过HadoopJobExecHelper的runningJobs字段，获取正在运行的MR任务，然后这些MR任务都有相应map和reduce的进度，将他们做一个数学计算就可以获得任务的总进度，需要注意的是runningJobs是正在运行的MR job，一旦执行完就会从List中删除，所以最开始还需要获取sql的执行计划，具体可以参看代码的实现。

## 3 适配自己的hive版本
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于Linkis现在的版本是支持1.2.1的apache版本，很多用户的集群可能并不和我们公司一致，所以需要自己重新编译Hive执行引擎。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;举一个例子，如果用户使用的是1.1.0的cdh版本，他需要在顶层的pom.xml将hive.version改成指定的版本然后进行编译。

我们在适配的时候，也发现有jar包有冲突，这需要用户查看日志来进行排除，如果还是无法确定原因，欢迎加群咨询。

![微信及QQ群](../images/ch6/group.png)<br/>

## 4 未来的目标

1.无缝地适配更多的hive版本。
2.部署方式更加简单，尝试使用容器化的方式。
3.功能更加完善，在执行进度、数据精度等方面做的更加准确和完备
