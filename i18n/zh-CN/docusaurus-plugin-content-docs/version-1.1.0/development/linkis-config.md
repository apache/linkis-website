---
title: Linkis 配置参数介绍
sidebar_position: 1
---

## 1. 参数分类

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis参数主要分为以下三个部分：
1. Linkis 服务端参数，主要包含Linkis本身的参数和Spring的参数
2. Linkis SDK、Restful等客户端端调用提交的参数
3. Linkis 管理台参数


## 2. Linkis 服务端参数

1. Linkis本身的参数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;linkis本身的参数支持在配置文件里面进行设置，也支持通过环境变量和系统属性进行设置，推荐使用配置文件进行设置。
Linkis配置文件格式如下所示：
```shell
├── conf 配置目录  
│   ├── application-eureka.yml  
│   ├── application-linkis.yml     
│   ├── linkis-cg-engineconnmanager-io.properties        
│   ├── linkis-cg-engineconnmanager.properties    
│   ├── linkis-cg-engineplugin.properties          
│   ├── linkis-cg-entrance.properties                   
│   ├── linkis-cg-linkismanager.properties                                            
│   ├── linkis.properties  ──linkis global properties                                            
│   ├── linkis-ps-bml.properties                                            
│   ├── linkis-ps-cs.properties                                            
│   ├── linkis-ps-datasource.properties                                            
│   ├── linkis-ps-publicservice.properties                                            
│   ├── log4j2.xml                                                                                                 
```
每个服务会加载两个属性配置文件，一个为公用的主配置文件linkis.properties，以及服务配置文件linkis-serviceName.properties。设置的优先级为服务配置文件高于主配置文件
建议通用的参数放置在主配置文件，个性话配置文件放在服务配置文件

2. Spring 参数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis服务是基于SpringBoot应用的，Spring相关的参数支持在application-linkis.yml进行设置，也支持在linkis配置文件里面进行配置。在linkis配置文件里面配置需要加上spring.的前缀。如下：

```shell
# spring port default 
server.port=9102
# in linkis conf need spring prefix
spring.server.port=9102

```

## 3. Linkis 客户端参数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis客户端参数主要是指任务提交时的参数，主要在提交接口里面进行指定的参数。
1.restful 如何设置参数：

```shell
{
    "executionContent": {"code": "show tables", "runType":  "sql"},
    "params": { // 提交参数
                        "variable":{  //代码中需要的自定义变量
                                "k1":"v1"
                        },
                        "configuration":{
                                "special":{ //特殊配置参数 如日志路径，结果集路径等
                                        "k2":"v2"
                                },
                                "runtime":{ //运行时参数，执行配置参数，如JDBC引擎的的数据库连接参数，presto引擎的数据源参数
                                        "k3":"v3"
                                },
                                "startup":{ //启动参数,如启动EC的内存参数，spark引擎参数、hive引擎参数等
                                        "k4":"v4" 如：spark.executor.memory:5G 设置Spark的执行器内存，底层Spark、hive等引擎参数keyName是和原生参数一致的
                                }
                        }
                },
    "labels": { //标签参数，支持设置引擎版本、用户和提应用
        "engineType": "spark-2.4.3",
        "userCreator": "hadoop-IDE"
    }
}
```
2.SDK如何设置参数：

```java
JobSubmitAction jobSubmitAction = JobSubmitAction.builder()
                .addExecuteCode(code)
                .setStartupParams(startupMap) //启动参数,如启动EC的内存参数，spark引擎参数、hive引擎参数等， 如：spark.executor.memory:5G 设置Spark的执行器内存，底层Spark、hive等引擎参数keyName是和原生参数一致的
                .setRuntimeParams(runTimeMap) //引擎，执行配置参数，如JDBC引擎的的数据库连接参数，presto引擎的数据源参数
                .setVariableMap(varMap) //代码中需要的自定义变量
                .setLabels(labels) //标签参数，支持设置引擎版本、用户和提应用等
                .setUser(user) //submit user
                .addExecuteUser(user)  // execute user
                .build();
```
3.linkis-cli如何设置参数

```shell
linkis-cli -runtieMap key1=value -runtieMap key2=value 
          -labelMap key1=value
          -varMap key1=value
          -startUpMap key1=value

```
注意: 客户端参数提交时，只有引擎相关参数和标签参数，以及Yarn队列设置可以生效，其他Linkis服务端参数和资源限制参数，如任务和引擎并发参数wds.linkis.rm.instances不支持任务设置

4.常用标签参数：

```shell
    Map<String, Object> labels = new HashMap<String, Object>();
     labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // 指定引擎类型和版本
     labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-IDE");// 指定运行的用户和您的APPName
     labels.put(LabelKeyConstant.CODE_TYPE_KEY, "sql"); // 指定运行的脚本类型：spark支持：sql、scala、py；Hive：hql；shell：sh；python：python；presto：psql
     labels.put(LabelKeyConstant.JOB_RUNNING_TIMEOUT_KEY, "10000");//job运行10s没完成自动发起Kill，单位为ms
     labels.put(LabelKeyConstant.JOB_QUEUING_TIMEOUT_KEY, "10000");//job排队超过10s没完成自动发起Kill，单位为ms
     labels.put(LabelKeyConstant.RETRY_TIMEOUT_KEY, "10000");//job因为资源等原因失败重试的等待时间，单位为ms，如因为队列资源不足的失败，会默认按间隔发起10次重试
     labels.put(LabelKeyConstant.TENANT_KEY,"hduser02");//租户标签，任务如果指定了租户参数则任务会被路由到单独的ECM机器
     labels.put(LabelKeyConstant.EXECUTE_ONCE_KEY,"");//执行一次标签，该参数不建议设置，设置后引擎不会复用任务运行完就会结束引擎，只有某个任务参数有特殊化的可以进行设置
```

## 4. Linkis 管理台参数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis管理台参数时方便用户指定资源限制参数和默认的任务参数提供的Web界面，如下：
全局配置参数：
![](/Images/development/linkis_global_conf.png)
主要包含了全局队列参数[wds.linkis.rm.yarnqueue],任务默认采用的Yarn队列，支持在客户端StartUPMap里面另外进行指定
资源限制参数，这些参数不支持任务设置，支持管理台进行调整。
```shell
队列CPU使用上限[wds.linkis.rm.yarnqueue.cores.max],现阶段只支持限制Spark类型任务总队列资源的使用
队列内存使用上限[wds.linkis.rm.yarnqueue.memory.max]
全局各个引擎内存使用上限[wds.linkis.rm.client.memory.max] 该参数不是指总共只能使用的内存，而是指定某个Creator特定引擎总的内存使用，如限制IDE-SPARK任务只能使用10G内存
全局各个引擎核心个数上限[wds.linkis.rm.client.core.max]该参数不是指总共只能使用的CPU，而是指定某个Creator特定引擎总的内存使用，如限制IDE-SPARK任务只能使用10Cores
全局各个引擎最大并发数[wds.linkis.rm.instance]，该参数有两层含义，一个是限制某个Creator特定引擎总共能启动多少个，以及限制某个Creator特定引擎任务同时能运行的任务数
```
引擎配置参数：
![](/Images/development/linkis_creator_ec_conf.png)
主要指定引擎的启动参数和运行时参数，这些参数支持在客户端进行设置，建议使用客户端进行个性化提交设置，页面只设置默认值