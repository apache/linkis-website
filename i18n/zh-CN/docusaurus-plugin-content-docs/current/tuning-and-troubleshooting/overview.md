---
title: 总览
sidebar_position: 0
---
## 调优排障

> 建议的排查基本优先级可以按照：**社区issue专栏搜索关键词—\>在社区查阅《Q\&A问题总结》文档—\>定位系统日志—\>社区用户群咨询交流—\>定位源码远程debug**


## 1. 社区Issue搜索关键词

在[issue专栏](https://github.com/apache/incubator-linkis/issues), filter过滤器中搜索关键词。如：
filter:`is:issue spark3`
![](/Images-zh/tuning-and-troubleshooting/issue-searching-keywords.png)

<!--
在[Disscuess的Q&A专栏](https://github.com/apache/incubator-linkis/discussions/categories/q-a) 中进行关键字搜索
![](/Images-zh/tuning-and-troubleshooting/disscues-searching-keywords.png)
-->

## 2. 常见Q&A问题集

将issue中常见的问题以及解决方案整理成文档，放在了官网页面《 [常见问题](/faq/main) 》


## 3. 如何定位错误 

### 3.1 编译阶段异常排查 
> 如果是自行编译

通常会出现的问题:
- 编译前，未执行`mvn -N install`, 导致linkis自身依赖没法获取
- 升级部分依赖组件后，导致函数报错  如使用spark3 

定位异常的手段: 
可以在mvn 运行命令后面加上 -e 参数 如`mvn clean install -e`
 
### 3.2 安装阶段异常排查

如果出现报错，又不清楚具体是执行什么命令报错，可以加 -x 参数`sh -x bin/install.sh`，将shell脚本执行过程日志打印出来，方便定位问题

### 3.3 启动微服务阶段异常排查
所有微服务的日志文件统一放入了logs目录，日志目录层级如下：

```html
├── logs 日志目录
│   ├── linkis-cg-engineconnmanager-gc.log
│   ├── linkis-cg-engineconnmanager.log
│   ├── linkis-cg-engineconnmanager.out
│   ├── linkis-cg-engineplugin-gc.log
│   ├── linkis-cg-engineplugin.log
│   ├── linkis-cg-engineplugin.out
│   ├── linkis-cg-entrance-gc.log
│   ├── linkis-cg-entrance.log
│   ├── linkis-cg-entrance.out
│   ├── linkis-cg-linkismanager-gc.log
│   ├── linkis-cg-linkismanager.log
│   ├── linkis-cg-linkismanager.out
│   ├── linkis-cli
│   │   ├── linkis-client.hadoop.log.20220409162400037523664
│   │   ├── linkis-client.hadoop.log.20220409162524417944443
│   ├── linkis-mg-eureka-gc.log
│   ├── linkis-mg-eureka.log
│   ├── linkis-mg-eureka.out
│   ├── linkis-mg-gateway-gc.log
│   ├── linkis-mg-gateway.log
│   ├── linkis-mg-gateway.out
│   ├── linkis-ps-cs-gc.log
│   ├── linkis-ps-cs.log
│   ├── linkis-ps-cs.out
│   ├── linkis-ps-data-source-manager-gc.log
│   ├── linkis-ps-data-source-manager.log
│   ├── linkis-ps-data-source-manager.out
│   ├── linkis-ps-metadatamanager-gc.log
│   ├── linkis-ps-metadatamanager.log
│   ├── linkis-ps-metadatamanager.out
│   ├── linkis-ps-publicservice-gc.log
│   ├── linkis-ps-publicservice.log
│   └── linkis-ps-publicservice.out
```

包含计算治理、公共增强、微服务管理三大微服务模块。每个微服务下包含`linkis-xxx-gc.log`、`linkis-xxx.log`、``linkis-xxx.out`三个日志。
分别对应服务的GC日志、服务日志、服务的System.out日志。

通常情况下，启动某个微服务出错时，可以在log目录查看对应服务 查看详细日志排查问题

但因为服务之间是存在相互调用，linkis的微服务比较多，若对系统不熟悉，有时候无法定位到具体哪个模块出现了异常，可以通过全局日志搜索方式，拉取关键异常信息，进行排查 

```shell script
tail -f log/* |grep -5n exception(或则tail -f log/* |grep -5n ERROR)  
less log/* |grep -5n exception(或则less log/* |grep -5n ERROR)  
```


### 3.4 运行阶段 

#### 3.4.1 接口异常排查

如果某个接口请求报错，可以根据接口的返回加过中定位出现问题的微服务，
一般情况下可以**根据URL规范进行定位，**Linkis接口中的URL都遵循着一定的设计规范，
即**/api/rest_j/v1/{applicationName}/.+的格式**，通过applicationName可以定位应用名，部分应用本身是一个微服务，
这时候应用名和微服务名相同，部分应用归属于某个微服务，此时应该通过应用名查找归属的微服务，
去对应的微服务下查看log日志，下面给出微服务和应用名的对应关系。

| **请求路径中的ApplicationName**       | **服务的提供方**     |
|-------------------------------------|---------------------------------|
| /api/rest_j/v1/linkisManager/*      | linkis-cg-linkismanager         |
| /api/rest_j/v1/entrance/*           | linkis-cg-entrance              |
| /api/rest_j/v1/bml/*                | linkis-ps-publicservice         |
| /api/rest_j/v1/configuration/*      | linkis-ps-publicservice         |
| /api/rest_j/v1/jobhistory/*         | linkis-ps-publicservice         |
| /api/rest_j/v1/filesystem/*         | linkis-ps-publicservice         |
| /api/rest_j/v1/variable/*           | linkis-ps-publicservice         |
| /api/rest_j/v1/microservice/*       | linkis-ps-publicservice         |
| /api/rest_j/v1/errorcode/*          | linkis-ps-publicservice         |
| /api/rest_j/v1/udf/*                | linkis-ps-publicservice         |
| /api/rest_j/v1/datasource/*         | linkis-ps-publicservice         |
| /api/rest_j/v1/metadatamanager/*    | linkis-ps-metadatamanager       |
| /api/rest_j/v1/data-source-manager/*| linkis-ps-data-source-manager   |
| /api/rest_j/v1/engineplugin/*       | linkis-engineconn-plugin        |
| /api/rest_j/v1/contextservice/*(暂未使用到)     | linkis-ps-cs                    |

对于请求异常的定位，可以根据上表的对应关系，去对应的服务日志中进行查看

#### 3.4.2 执行引擎任务的异常排查

** step1:找到引擎的启动部署目录 **  

- 方式1：如果执行日志中有显示，可以在管理台上查看到 如下图:        
![engine-log](https://user-images.githubusercontent.com/29391030/156343802-9d47fa98-dc70-4206-b07f-df439b291028.png)
- 方式2:如果方式1中没有找到，可以通过找到`conf/linkis-cg-engineconnmanager.properties`配置的`wds.linkis.engineconn.root.dir`的参数，该值就是引擎启动部署的目录，子目录按执行引擎的用户进行了隔离

```shell script
# 如果不清楚taskid，可以按时间排序后进行选择 ll -rt /appcom/tmp/${执行的用户}/${日期}/${引擎}/  
cd /appcom/tmp/${执行的用户}/${日期}/${引擎}/${taskId}  
```
目录大体如下 
```shell script
conf -> /appcom/tmp/engineConnPublickDir/6a09d5fb-81dd-41af-a58b-9cb5d5d81b5a/v000002/conf #引擎的配置文件  
engineConnExec.sh #生成的引擎的启动脚本  
lib -> /appcom/tmp/engineConnPublickDir/45bf0e6b-0fa5-47da-9532-c2a9f3ec764d/v000003/lib #引擎依赖的包  
logs #引擎启动执行的相关日志  
```

** step2：查看引擎的日志 **
```shell script
less logs/stdout  
```

** step3：尝试手动执行脚本(如果需要) **  
可以通过尝试手动执行脚本，进行调试
``` 
sh -x engineConnExec.sh  
```

### 4. 问题反馈 

对于按上述排查方式排查后，仍然没解决的问题，可以通过[需求帮助](/community/how-to-ask-for-help)指引方式进行反馈和需求帮助 


### 5. 定位源码远程debug

通常情况下，对源码远程debug是定位问题最有效的方式，但相对查阅文档来说，需要用户对源码结构有一定的了解，
这里建议您在远程debug前查阅《 [Linkis源码层级结构详解](deployment/sourcecode-hierarchical-structure.md) 》,对项目的源码结构进行初步的了解，
有一定程度上的熟悉之后，可以参考《 [如何DebugLinkis](development/linkis-debug.md) 》一文 调试对应微服务下的代码。

