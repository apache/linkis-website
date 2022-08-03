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

在linkis1.0中，我们对启动参数进行了优化和整合，各个微服务的部分重要的启动参数都通过conf/linkis-env.sh文件加载，例如微服务IP、端口、注册中心地址等，因此修改参数的方式发生了一点变化，以机器server1，server2双活部署为例，为了让eureka之间相互注册。

在server1的机器上，需要将**conf/linkis-env.sh**中的
``
EUREKA\_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/
``

修改为：

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/,http:/server2:port/eureka/
``

同理，在server2的机器上，需要将**conf/linkis-env.sh**中的

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/
``

修改为：

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/,http:/server1:port/eureka/
``

修改完之后启动微服务，从web端进入eureka注册界面，可以看到已经成功注册到eureka的微服务，并且DS
Replicas也会显示集群相邻的副本节点。

![](/Images-zh/deployment/Linkis1.0_combined_eureka.png)
