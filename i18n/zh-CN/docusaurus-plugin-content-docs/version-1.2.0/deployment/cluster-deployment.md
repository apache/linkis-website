---
title: 分布式部署
sidebar_position: 2
---

Linkis的单机部署方式简单，过多的进程在同一个服务器上会让服务器压力过大，生产环境为了保证服务的高可用，推荐使用分部署部署。 
部署方案的选择，和公司的用户规模、用户使用习惯、集群同时使用人数都有关，一般来说，我们会以使用Linkis的同时使用人数和用户对执行引擎的偏好来做依据进行部署方式的选择。

##  1 多节点部署方式计算模型参考

Linkis的每个微服务都支持多活的部署方案，当然不同的微服务在系统中承担的角色不一样，有的微服务调用频率很高，资源会处于高负荷的情况，
**在安装EngineConnManager的机器上，由于会启动用户的引擎进程，机器的内存负载会比较高，其他类型的微服务对机器的负载则相对不会很高，
**对于这类微服务我们建议启动多个进行分布式部署，Linkis动态使用的总资源可以按照如下方式计算。

**EngineConnManager**使用总资源<br/> 
= 总内存 + 总核数 <br/>
= **同时在线人数 \* (所有类型的引擎占用内存) \*单用户最高并发数+ 同时在线人数 \*
(所有类型的引擎占用核数) \*单用户最高并发数**

例如：
```html

只使用spark、hive、python引擎且单用户最高并发数为1的情况下，同时使用人数50人，
spark的Driver内存1G，hive client内存1G，python client 1G，每个引擎都使用1个核

EngineConnManager（ECM）使用总资源
= 50 *（1+1+1）G *1 + 50 *(1+1+1)核*1
= 150G 内存 + 150 CPU核
```


分布式部署时微服务本身占用的内存可以按照每个2G计算，对于使用人数较多的情况下建议调大ps-publicservice的内存至6G，同时建议预留10G内存作为buffer。

以下配置假设**每个用户同时启动两个引擎为例**，**对于64G内存的机器**，参考配置如下：

### 1.1 同时在线人数10-50
**EngineConnManager**使用总资源 = 总内存 + 总核数 =
**同时在线人数 \* (所有类型的引擎占用内存) \*单用户最高并发数+ 同时在线人数 \*
(所有类型的引擎占用核数) \*单用户最高并发数**

总内存:同时在线人数 50 * 单个引擎 1G内存 * 每个用户同时启动两个引擎 2 = 100G内存

>   **服务器配置推荐**4台服务器，分别命名为S1,S2,S3,S4

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1、S2(共128G)| 每台机器单独部署 |
| Other services       | S3、S4    | Eureka高可用部署 |

### 1.2 同时在线人数50-100

总内存:同时在线人数 100 * 单个引擎 1G内存 * 每个用户同时启动两个引擎 2 = 200G内存

>   **服务器配置推荐**:6台服务器，分别命名为S1,S2,S3,S4,S5,S6

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1-S4(共256G)| 每台机器单独部署 |
| Other services       | S5、S6    | Eureka高可用部署 |

### 1.3 同时使用人数 100-300


总内存:同时在线人数 300 * 单个引擎 1G内存 * 每个用户同时启动两个引擎 2 = 600G内存

**服务器配置推荐**:12台服务器，分别命名为S1,S2..S12

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1-S10(共640G)| 每台机器单独部署 |
| Other services       | S11、S12  | Eureka高可用部署 |

### 1.4 同时使用人数300-500

> **服务器配置推荐**：20台服务器，分别命名为S1,S2..S20

| Service              | Host name | Remark                                                                                       |
|----------------------|-----------|----------------------------------------------------------------------------------------------|
| cg-engineconnmanager | S1-S18    | 每台机器单独部署                                                                             |
| Other services       | S19、S20  | Eureka高可用部署，部分微服务如果请求量上万可以考虑扩容，目前双活部署可以支持行内上千用户使用 |

### 1.5 同时使用人数500以上
> 按照同时在线800人估算
> **服务器配置推荐**：34台服务器，分别命名为S1,S2..S34

| Service              | Host name | Remark                                                                                       |
|----------------------|-----------|----------------------------------------------------------------------------------------------|
| cg-engineconnmanager | S1-S32    | 每台机器单独部署                                                                             |
| Other services       | S33、S34  | Eureka高可用部署，部分微服务如果请求量上万可以考虑扩容，目前双活部署可以支持行内上千用户使用 |


##  2 分布式部署的流程

>以下只是一个参考样例，以两台服务器为例进行分布式部署。目前一键安装脚本对分布式部署还没有很好的支持，需要手动进行调整部署。

假如已经在服务器A上，成功以单机方式部署了linkis，现在想添加一台服务器B，进行分布式部署，可以参考以下步骤

模式：Eureka服务多活部署 ，部分服务部署在服务器A，部分服务部署在服务器B上 

### 2.1 分布式部署的环境准备  
和服务器A一样，服务器B需要进行基础的环境准备，请参考[Linkis环境准备](quick-deploy#3-linkis%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87)

### 2.2 Eureka多活配置调整 
注册中心Eureka服务，需要部署在服务器A和服务器B上，


修改Eureka配置文件,把两台Eureka的配置地址都加上，让Eureka服务之间相互注册。  
在服务器A上，进行如下配置修改  

```
修改 $LINKIS_HOME/conf/application-eureka.yml和$LINKIS_HOME/conf/application-linkis.yml配置

eureka:
  client:
    serviceUrl:
      defaultZone: http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/


修改 $LINKIS_HOME/conf/linkis.properties 配置
  
wds.linkis.eureka.defaultZone=http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/  
```

### 2.3 安装物料的同步
在服务器A上，将linkis的成功安装的目录`$LINKIS_HOME` 打包，然后拷贝并解压到服务器B的相同目录下。
此时，如果在服务器A上以及服务器B上，启动`sbin/linkis-start-all.sh`命令启动所有服务，那么所有服务都有两个实例。 可以访问eureka服务展示页面 `http:/eurekaIp1:port1，或http:/eurekaIp2:port2` 查看

### 2.4 调整启动脚本 
根据实际情况，确定服务器A和服务器B上需要部署的服务，
比如 微服务`linkis-cg-engineconnmanager` 不会部署在服务器A上，
则修改服务器A的一键启停脚本，`sbin/linkis-start-all.sh`，`sbin/linkis-stop-all.sh`，将`cg-engineconnmanager`服务相关的启停命令，注释掉 
```html
sbin/linkis-start-all.sh
#linkis-cg-linkismanage
#SERVER_NAME="cg-linkismanager"
#SERVER_IP=$MANAGER_INSTALL_IP
#startApp

sbin/linkis-stop-all.sh
#linkis-cg-engineconnmanager(ecm)
#SERVER_NAME="cg-engineconnmanager"
#SERVER_IP=$ENGINECONNMANAGER_INSTALL_IP
#stopApp

```


## 3 注意事项
- 分部署部署时，linkis的安装目录建议保持一致，方便统一管控，相关的配置文件最好也保持一致 
- 如果某些服务器，端口已被其他应用占用，无法使用时，需要调整该服务端口
- mg-gateway的多活部署，目前因为登陆session不支持分布式，用一个用户的请求，需要请求到同一个gateway实例上，可以通过nginx的ip hash负载均衡方式来支持
- 一键启停脚本，根据实际情况，进行调整，对于不再本本服务器上部署的微服务，需要在一键启动脚本中，将对应的启停命令注释掉。