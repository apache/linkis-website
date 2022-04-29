---
title: 分布式部署
sidebar_position: 2
---

分布式部署方案介绍
==================

Linkis的单机部署方式简单，但是不能用于生产环境，因为过多的进程在同一个服务器上会让服务器压力过大。 部署方案的选择，和公司的用户规模、用户使用习惯、集群同时使用人数都有关，一般来说，我们会以使用Linkis的同时使用人数和用户对执行引擎的偏好来做依据进行部署方式的选择。

1、多节点部署方式参考
---------------------

Linkis1.0仍然保持着基于SpringCloud的微服务架构，其中每个微服务都支持多活的部署方案，当然不同的微服务在系统中承担的角色不一样，有的微服务调用频率很高，更可能会处于高负荷的情况，**在安装EngineConnManager的机器上，由于会启动用户的引擎进程，机器的内存负载会比较高，其他类型的微服务对机器的负载则相对不会很高，**对于这类微服务我们建议启动多个进行分布式部署，Linkis动态使用的总资源可以按照如下方式计算。

**EngineConnManager**使用总资源 = 总内存 + 总核数 =

**同时在线人数 \* (所有类型的引擎占用内存) \*单用户最高并发数+ 同时在线人数 \*
(所有类型的引擎占用核数) \*单用户最高并发数**

例如：
只使用spark、hive、python引擎且单用户最高并发数为1的情况下，同时使用人数50人，Spark的Driver内存1G，Hive
Client内存1G，python client 1G，每个引擎都使用1个核，那么就是 50 \*（1+1+1）G \*
1 + 50 \*(1+1+1)核\*1 = 150G 内存 + 150 CPU核数。

分布式部署时微服务本身占用的内存可以按照每个2G计算，对于使用人数较多的情况下建议调大ps-publicservice的内存至6G，同时建议预留10G内存作为buffer。

以下配置假设**每个用户同时启动两个引擎为例**，**对于64G内存的机器**，参考配置如下：

-   同时在线人数10-50

>   **服务器配置推荐**4台服务器，分别命名为S1,S2,S3,S4

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1、S2    | 每台机器单独部署 |
| Other services       | S3、S4    | Eureka高可用部署 |

-   同时在线人数50-100

>   **服务器配置推荐**:6台服务器，分别命名为S1,S2,S3,S4,S5,S6

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1-S4     | 每台机器单独部署 |
| Other services       | S5、S6    | Eureka高可用部署 |

-   同时使用人数 100-300

**服务器配置推荐**:12台服务器，分别命名为S1,S2..S12

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1-S10    | 每台机器单独部署 |
| Other services       | S11、S12  | Eureka高可用部署 |

-   同时使用人数300-500

>   **服务器配置推荐**：20台服务器，分别命名为S1,S2..S20

| Service              | Host name | Remark                                                                                       |
|----------------------|-----------|----------------------------------------------------------------------------------------------|
| cg-engineconnmanager | S1-S18    | 每台机器单独部署                                                                             |
| Other services       | S19、S20  | Eureka高可用部署，部分微服务如果请求量上万可以考虑扩容，目前双活部署可以支持行内上千用户使用 |

-   同时使用人数500以上（按照同时在线800人估算）

>   **服务器配置推荐**：34台服务器，分别命名为S1,S2..S34

| Service              | Host name | Remark                                                                                       |
|----------------------|-----------|----------------------------------------------------------------------------------------------|
| cg-engineconnmanager | S1-S32    | 每台机器单独部署                                                                             |
| Other services       | S33、S34  | Eureka高可用部署，部分微服务如果请求量上万可以考虑扩容，目前双活部署可以支持行内上千用户使用 |

2、Linkis微服务分布式部署配置参数
---------------------------------
### 1.分布式部署的准备  
下载需要部署的jar包,准备好开发需要的环境(mysql,hadoop,hive等开发环境)  

### 2.分布式部署的流程  
#### 2.1 修改eureka配置文件,把两台eureka的配置地址都加上  
可以根据实际情况 决定是否Eureka服务多活部署  
以机器server1，server2双活部署为例，为了让eureka之间相互注册。  
server1/server2进行如下配置修改  

```
$LINKIS_HOME/conf/application-eureka.yml
$LINKIS_HOME/conf/application-linkis.yml
eureka:
  client:
    serviceUrl:
      defaultZone: http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/

$LINKIS_HOME/conf/linkis.properties 配置修改  
wds.linkis.eureka.defaultZone=http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/  
```

#### 2.2 在服务器A上部署所有服务并且使用sbin/linkis-start-all.sh命令启动  

#### 2.3 将服务器A上部署的内容拷贝到服务器B上,根据需要启动的服务使用sh linkis-daemon.sh restart (服务名) 命令启动需要在服务器B上启动的命令  
比如启动linkis-ps-cs服务 sh linkis-daemon.sh restart ps-cs,具体服务名可以再linkis-start-all.sh文件中查找  

#### 2.4 在部署的前端项目上测试  
测试服务器A上服务的接口    
测试服务器B上服务的接口    

### 3. 分布式部署服务的启停  
Linux端口占用 netstat -tunlp | grep 端口号  
Linux清除进程 sudo kill -9 进程号  

### 4. 注意事项
#### 4.1 最好在一开始启动所有服务,因为服务之间存在依赖,如果有的服务不存在也不能通过eureka找到对应备份会出现服务启动失败,服务启动失败之后不会自动重启,等到替代服务加入之后再关闭相关服务  

