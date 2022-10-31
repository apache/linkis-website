---
title: 容器化开发调试
sidebar_position: 2.1
---

## 前言

本文介绍如何使用 Kubernetes 技术来简化 Linkis 项目的开发调试工作。在没有引入 Kubernetes 工具前，调试 Linkis 是一个非常繁琐和复杂的工作，有时候可能需要搭建 Linkis 依赖的 Hadoop 环境。为了改善这个问题，本文使用了另一种方法，利用 Kubernetes 技术在开发机上创建一个 Hadoop 集群并拉起所有 Linkis 服务，这是个分布式的环境，并且可以随时拉起和销毁，开发者通过 JVM 远程调试功能连接这些服务并进行单步调试. 这里我们用到了如下几个技术:

* Docker: 一种容器化技术，用于支创建和使用 Linux 容器;
* Kubernetes: 一种可自动部署和管理 Linux 容器的开源平台，Kubernetes 还整合了网络、存储、安全性、遥测和其他服务，提供了全面的基于容器的基础设施;
* KinD: 一个使用Docker容器作为 "Kubernetes节点" 来运行本地 Kubernetes 集群的工具;
* Helm: Kubernetes 上一个开源的包管理工具, 通过 Helm 命令行工具和安装包(Chart)来管理 Kubernetes 上的用户资源;

## 依赖工具介绍

### 版本要求

* [Docker](https://docs.docker.com/get-docker/), 最低版本 v20.10.8+
* [Kubernetes](https://kubernetes.io/docs/setup/), 最低版本 v1.21.0+
* [Helm](https://helm.sh/docs/intro/install/), 最低版本 v3.0.0+.
* [KinD](https://kind.sigs.k8s.io/docs/user/quick-start/), 最低版本 v0.11.0+.

### Helm Charts 介绍

Helm 是 Kubernetes 上一个开源的包管理工具，Helm 最初的目标是为用户提供一种更好的方式来管理在 Kubernetes 上创建的所有 Kubernetes YAML 文件。Helm 使用 Charts 这个方式来解决上述问题，Chart 是一组文本文件，使用 Helm 模版语言编写，用来描述一个或者多个 Kubernetes 资源文件，Chart 直接依赖或者引用其他 Chart. 在使用 Charts 时，用户需要提供一个 变量文件，Helm 使用这个变量文件中定义的变量来渲染相应的 Chart， 生产 Kubernetes YAML 文件， 然后调用 Kubernetes api 提交到 Kubernetes 上。每一个发布到 Kubernetes 的 Charts 被称为 Release，一个 Chart 通常可以被多次安装到同一个集群中，而每次安装时，都会创建一个新的 Release。

Helm 的安装方式比较简单，请参考官方文档进行安装: [Installing Helm](https://helm.sh/docs/intro/install/)

### KinD 介绍

在本地创建一个 Kubernetes 测试环境是一个非常普遍的需求，Kubernetes 社区提供了多种解决方案，如 MiniKube 或 MicroK8s 等，KinD 是一个相对较新的工具，KinD 是 Kubernetes IN Docker 的缩写，顾名思义，它使用 Docker 托管节点来创建一个面向测试的 Kubernetes 集群。

KinD 系统架构

![](/Images/development/kind-arc.png)

部署 KinD 也非常简单，请参考官方部署文档: [KinD Installation](https://kind.sigs.k8s.io/docs/user/quick-start/#installation), 部署 KinD 前请先安装 Docker .

> ⚠️注意:
> KinD 是面向测试的用途的工具，不能用于生产部署。同时，KinD 利用 Docker 带来的便利的同时，也引入了一些限制， 比如，开发机重启后，KinD 集群无法继续使用，需要重新创建（因为 KinD 在创建 Node 容器后会进行一系列的初始化工作，这些工作在机器重启后无法自动回复）。

## Linkis 容器化组件

### Linkis 镜像

Linkis 提供了多个镜像，所有镜像的 Dockerfile 和相关脚本都在 `linkis-dist/docker` 目录下。 可以通过 Maven 命令和 `docker build` 命令来制作相应的镜像。Linkis 镜像主要包括如下几个：

* `linkis`: Linkis 服务镜像，镜像中包含了 Apache Linkis 的所有组件的二进制包和各类脚本。
* `linkis-web`: Linkis Web 控制台镜像，镜像中包含了 Apache Linkis Web 控制台的的二进制包和各类脚本，本镜像使用 nginx 作为 Web 服务器。
* `linkis-ldh`: LDH 是一个面向测试用途的镜像，LDH 镜像提供了一套完整的、伪分布式模式的 Apache Hadoop 运行环境，包含了 HDFS, YARN, HIVE, Spark, Flink 和 Zookeeper, 可以很方便的在开发环境中拉起一个全真的 Hadoop 环境用来测试 Linkis 的功能。

具体请参考: [Linkis Docker 镜像打包](https://linkis.apache.org/zh-CN/docs/latest/development/linkis_docker_build_instrument). 

### Linkis Helm Chart

Linkis Helm Chart 是遵循 Helm Chart 规范开发的 Helm 安装包，在 `linkis-dist/helm` 目录下. 模块目录结构如下:

``` shell
linkis-dist/helm
├── charts                                         # Charts 目录， 目前仅包含 Linkis Helm Chart
│   └── linkis                                     #   Linkis Helm Chart 目录
│       ├── Chart.yaml                             #   - Chart 元数据
│       ├── templates                              #   - Chart 模版文件，包含了所有 linkis 组件的 Kubernetes YAML 模版
│       │   ├── NOTES.txt                          #     - Chart 提示信息
│       │   ├── _helpers.tpl                       #     - Chart 变量辅助模版
│       │   ├── configmap-init-sql.yaml            #     - 数据库初始化 SQL 脚本模版
│       │   ├── configmap-linkis-config.yaml       #     - Linkis 服务配置文件模版
│       │   ├── configmap-linkis-web-config.yaml   #     - Linkis Web 控制台配置文件模版
│       │   ├── jobs.yaml                          #     - Kubernetes Job 模版，目前仅包括一个数据库初始化作业, 数据库初始化 SQL 脚本会在这个
|       |   |                                      #       作业中被执行
│       │   ├── linkis-cg-engineconnmanager.yaml   #     - Linkis EngineConnManager 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   ├── linkis-cg-engineplugin.yaml        #     - Linkis EngineConn 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   ├── linkis-cg-entrance.yaml            #     - Linkis Entrance 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   ├── linkis-cg-linkismanager.yaml       #     - Linkis Manager 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   ├── linkis-mg-eureka.yaml              #     - Linkis Eureka 部署模版，是一个 Kubernetes Statefulset 类型的工作负载
│       │   ├── linkis-mg-gateway.yaml             #     - Linkis Gateway 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   ├── linkis-ps-publicservice.yaml       #     - Linkis PublicService 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   ├── linkis-web.yaml                    #     - Linkis Web Console 部署模版，是一个 Kubernetes Deployment 类型的工作负载
│       │   └── serviceaccount.yaml                #     - Linkis 相关的 Kubernetes Service Account 模版
│       └── values.yaml                            #   - Linkis Helm Chart 变量文件，默认提供了 Linkis Local 模式相关的变量
├── scripts                                        # 一些用于简化开发调试的工具脚本
│   ├── common.sh                                  #   - 公共脚本，定义了一些公共方法和变量
│   ├── create-kind-cluster.sh                     #   - 创建 KinD 集群
│   ├── install-charts-with-ldh.sh                 #   - 在 KinD 集群上部署 Linkis 服务，使用 On-LDH 的部署方式, 调用 install-linkis.sh 实现
│   ├── install-charts.sh                          #   - 在 KinD 集群上部署 Linkis 服务，使用 Local 的部署方式, 调用 install-linkis.sh 实现
│   ├── install-ldh.sh                             #   - 在 KinD 集群上部署 LDH 部署
│   ├── install-linkis.sh                          #   - 在 KinD 集群上部署 Linkis 服务，可以为 Local 或者 On-LDH 的模式
│   ├── install-mysql.sh                           #   - 在 KinD 集群上部署一个 MySQL 实例
│   ├── login-pod.sh                               #   - 登入一个 Pod，打开 Bash 进行交互
│   ├── remote-debug-proxy.sh                      #   - 开启 JVM 远程调试代理，开启后，可以在 IDE 上连接相应的端口进行调试
│   └── resources                                  #   - 一些资源文件
│       ├── kind-cluster.yaml                      #     - KinD 集群配置，默认为单个 Node 
│       ├── ldh                                    #     - LDH 相关资源文件
│       │   ├── configmaps                         #       - LDH 各个组件的配置文件
│       │   │   ├── configmap-flink.yaml           #         - Flink 配置文件
│       │   │   ├── configmap-hadoop.yaml          #         - Hdfs & Yarn 配置文件
│       │   │   ├── configmap-hive.yaml            #         - Hive 配置文件
│       │   │   ├── configmap-spark.yaml           #         - Spark 配置文件
│       │   │   └── configmap-zookeeper.yaml       #         - Zookeeper 配置文件
│       │   └── ldh.yaml                           #       - LDH Kubernetes YAML, 用于在 KinD 上部署 LDH 实例
│       └── mysql.yaml                             #     - MySQL Kubernetes YAML, 用于在 KinD 上部署 MySQL 实例

```

本项目提供了一组工具脚本，用于快速创建一个用于开发测试的 Linkis 环境。在生产部署中，需要根据集群的实际情况，修改 `values.yaml` 文件，再使用 Helm CLI 进行部署。使用 Helm CLI 进行部署时，通常有如下两种比较常见的做法:
1. 使用 `helm install` 命令直接部署。适用于非定制化的部署方式；
2. 使用 `helm template` 命令选生成 Kubernetes YAML 文件，然后手动修改这些文件，添加自定义配置，然后使用`kubectl apply`命令进行部署。适用于需要定制 Linkis Helm Charts 不支持的 Kubernetes 特性的高阶用户， 如需要使用特定的 StorageClass 或者 PV 等；

### LDH

LDH 是一个面向测试用途的 Hadoop 集群镜像，它提供了一个伪分布式的 hadoop 集群，方便快速测试 On Hadoop 的部署模式。
这个镜像包含以下多个 hadoop 组件，LDH 中引擎的默认模式是 on-yarn 的。
* Hadoop 2.7.2 , 包括 HDFS 和 YARN
* Hive 2.3.3
* Spark 2.4.3
* Flink 1.12.2
* ZooKeeper 3.5.9

LDH 启动时会进行一些初始化操作，比如 format hdfs， 在 HDFS 上创建初始化目录等，这些操作定义在`linkis-dist/docker/scripts/entry-point-ldh.sh`这个文件中，添加、修改、删除一些初始化操作需要重新制作 LDH 镜像才能生效。 

另外，LDH 中的 Hive 组件依赖外部的 MySQL 实例，需要先部署 MySQL 实例才能使用 LDH 中的 Hive 组件。

```shell
# 创建 KinD 集群，并部署 Linkis 和 LDH 实例
$> sh ./scripts/create-kind-cluster.sh \
   && sh ./scripts/install-mysql.sh \
   && sh ./scripts/install-ldh.sh

# 快速体验 LDH
$> kubectl exec -it -n ldh $(kubectl get pod -n ldh -o jsonpath='{.items[0].metadata.name}') -- bash

[root@ldh-96bdc757c-dnkbs /]# hdfs dfs -ls /
Found 4 items
drwxrwxrwx   - root supergroup          0 2022-07-31 02:48 /completed-jobs
drwxrwxrwx   - root supergroup          0 2022-07-31 02:48 /spark2-history
drwxrwxrwx   - root supergroup          0 2022-07-31 02:49 /tmp
drwxrwxrwx   - root supergroup          0 2022-07-31 02:48 /user

[root@ldh-96bdc757c-dnkbs /]# beeline -u jdbc:hive2://ldh.ldh.svc.cluster.local:10000/ -n hadoop
Connecting to jdbc:hive2://ldh.ldh.svc.cluster.local:10000/
Connected to: Apache Hive (version 2.3.3)
Driver: Hive JDBC (version 2.3.3)
Transaction isolation: TRANSACTION_REPEATABLE_READ
Beeline version 2.3.3 by Apache Hive
0: jdbc:hive2://ldh.ldh.svc.cluster.local:100> create database demo;
No rows affected (1.306 seconds)
0: jdbc:hive2://ldh.ldh.svc.cluster.local:100> use demo;
No rows affected (0.046 seconds)
0: jdbc:hive2://ldh.ldh.svc.cluster.local:100> create table t1 (id int, data string);
No rows affected (0.709 seconds)
0: jdbc:hive2://ldh.ldh.svc.cluster.local:100> insert into t1 values(1, 'linikis demo');
WARNING: Hive-on-MR is deprecated in Hive 2 and may not be available in the future versions. Consider using a different execution engine (i.e. spark, tez) or using Hive 1.X releases.
No rows affected (5.491 seconds)
0: jdbc:hive2://ldh.ldh.svc.cluster.local:100> select * from t1;
+--------+---------------+
| t1.id  |    t1.data    |
+--------+---------------+
| 1      | linikis demo  |
+--------+---------------+
1 row selected (0.39 seconds)
0: jdbc:hive2://ldh.ldh.svc.cluster.local:100> !q

[root@ldh-96bdc757c-dnkbs /]# spark-sql
22/07/31 02:53:18 INFO hive.metastore: Trying to connect to metastore with URI thrift://ldh.ldh.svc.cluster.local:9083
22/07/31 02:53:18 INFO hive.metastore: Connected to metastore.
...
22/07/31 02:53:19 INFO spark.SparkContext: Running Spark version 2.4.3
22/07/31 02:53:19 INFO spark.SparkContext: Submitted application: SparkSQL::10.244.0.6
...
22/07/31 02:53:27 INFO yarn.Client: Submitting application application_1659235712576_0001 to ResourceManager
22/07/31 02:53:27 INFO impl.YarnClientImpl: Submitted application application_1659235712576_0001
22/07/31 02:53:27 INFO cluster.SchedulerExtensionServices: Starting Yarn extension services with app application_1659235712576_0001 and attemptId None
22/07/31 02:53:28 INFO yarn.Client: Application report for application_1659235712576_0001 (state: ACCEPTED)
...
22/07/31 02:53:36 INFO yarn.Client: Application report for application_1659235712576_0001 (state: RUNNING)
...
Spark master: yarn, Application Id: application_1659235712576_0001
22/07/31 02:53:46 INFO thriftserver.SparkSQLCLIDriver: Spark master: yarn, Application Id: application_1659235712576_0001
spark-sql> use demo;
Time taken: 0.074 seconds
22/07/31 02:58:02 INFO thriftserver.SparkSQLCLIDriver: Time taken: 0.074 seconds
spark-sql> select * from t1;
...
1       linikis demo
2       linkis demo spark sql
Time taken: 3.352 seconds, Fetched 2 row(s)
spark-sql> quit;

[root@ldh-96bdc757c-dnkbs /]# zkCli.sh
Connecting to localhost:2181
Welcome to ZooKeeper!
JLine support is enabled
WATCHER::

WatchedEvent state:SyncConnected type:None path:null

[zk: localhost:2181(CONNECTED) 0] get -s /zookeeper/quota

cZxid = 0x0
ctime = Thu Jan 01 00:00:00 UTC 1970
mZxid = 0x0
mtime = Thu Jan 01 00:00:00 UTC 1970
pZxid = 0x0
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 0
[zk: localhost:2181(CONNECTED) 1] quit

# 以 per-job cluster 模式启动 Flink 作业
[root@ldh-96bdc757c-dnkbs /]# HADOOP_CLASSPATH=`hadoop classpath` flink run -t yarn-per-job /opt/ldh/current/flink/examples/streaming/TopSpeedWindowing.jar
# 以 session 模式启动 Flink 作业,
# Flink session 在 LDH Pod 启动时会被启动了一个.
[root@ldh-96bdc757c-dnkbs /]# flink run /opt/ldh/current/flink/examples/streaming/TopSpeedWindowing.jar
Executing TopSpeedWindowing example with default input data set.
Use --input to specify file input.
Printing result to stdout. Use --output to specify output path.
...
```

### KinD 集群

Linkis 项目默认使用的 KinD 集群描述文件是`linkis-dist/helm/scripts/resources/kind-cluster.yaml`, 默认会创建一个包含一个节点的 KinD 集群。打开文件中注释的内容可以添加多个节点。

> ⚠️注意，KinD 集群仅用于测试用途。

``` yaml
# linkis-dist/helm/scripts/resources/kind-cluster.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraMounts:
      - hostPath: ${KIND_CLUSTER_HOST_PATH}     # 指向开发机上的一个目录。这个目录会被映射到 Kind Node 容器中的 `/data` 目录，
                                                # Linkis Helm Charts 默认会使用这个目录作为数据目录挂载到各个 Linkis 组件的
                                                # Pod 中。当 Linkis 使用 Local 模式进行部署时，所有组件实际上使用了开发机上的
                                                # 同一个目录，就和在同一台机器上一样，从而模拟了 Local 模式的行为。当使用 
                                                # On-Hadoop 模式进行部署时，这个目录不会被使用。
        containerPath: /data
#  - role: worker                               # 打开注释可以添加2个 KinD 节点。添加 KinD 节点会增加加载 Docker 镜像到 KinD
#                                               # 集群的时间，所以默认不打开。 
#    extraMounts:
#      - hostPath: ${KIND_CLUSTER_HOST_PATH}
#        containerPath: /data
#  - role: worker
#    extraMounts:
#      - hostPath: ${KIND_CLUSTER_HOST_PATH}
#        containerPath: /data

```

## 使用 Linkis 容器化组件开发调试

下面介绍使用 Linkis 容器化组件开发调试的步骤（目前仅支持 Linux 和 MacOS）。在进行本步骤前请确认如下事项：
1. 开发机上是否已经安装了 Docker 引擎
2. 开发机上是否已经安装了 Helm 
3. 开发机上是否已经安装了 KinD 
4. 是否已经按照 [Linkis Docker 镜像打包](https://linkis.apache.org/zh-CN/docs/latest/development/linkis_docker_build_instrument) 所述的方式制作了 Linkis 镜像

### 创建调试环境

本步骤会创建一个 KinD 集群，并在其上部署 MySQL、 Linkis 和 LDH 实例。

``` shell
$> cd linkis-dist/helm
$> sh ./scripts/create-kind-cluster.sh \
>    && sh ./scripts/install-mysql.sh \
>    && sh ./scripts/install-ldh.sh \
>    && sh ./scripts/install-charts-with-ldh.sh

# Creating KinD cluster ...
- kind cluster config: /var/folders/9d/bb6ggdm177j25q40yf5d50dm0000gn/T/kind-XXXXX.Fc2dFJbG/kind-cluster.yaml
...
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraMounts:
      - hostPath: /var/folders/9d/bb6ggdm177j25q40yf5d50dm0000gn/T/kind-XXXXX.Fc2dFJbG/data
        containerPath: /data
...
Creating cluster "test-helm" ...
 ✓ Ensuring node image (kindest/node:v1.21.1) 🖼 
 ✓ Preparing nodes 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
Set kubectl context to "kind-test-helm"
You can now use your cluster with:

kubectl cluster-info --context kind-test-helm

Have a nice day! 👋
# Loading MySQL image ...
Image: "mysql:5.7" with ID "sha256:3147495b3a5ce957dee2319099a8808c1418e0b0a2c82c9b2396c5fb4b688509" not yet present on node "test-helm-control-plane", loading...
# Deploying MySQL ...
namespace/mysql created
service/mysql created
deployment.apps/mysql created
# LDH version: dev
# Loading LDH image ...
Image: "linkis-ldh:dev" with ID "sha256:aa3bde0a31bf704413fb75673fc2894b03a0840473d8fe15e2d7f7dd22f1f854" not yet present on node "test-helm-control-plane", loading...
# Deploying LDH ...
namespace/ldh created
configmap/flink-conf created
configmap/hadoop-conf created
configmap/hive-conf created
configmap/spark-conf created
configmap/zookeeper-conf created
service/ldh created
deployment.apps/ldh created
# Loading Linkis image ...
Image: "linkis:dev" with ID "sha256:0dfa7882c4216305a80cf57efa8cfb483d006bae5ba931288ffb8025e1db4e58" not yet present on node "test-helm-control-plane", loading...
Image: "linkis-web:dev" with ID "sha256:1dbe0e9319761dbe0e93197665d38077cb2432b8b755dee834928694875c8a22" not yet present on node "test-helm-control-plane", loading...
# Installing linkis, image tag=dev,local mode=false ...
NAME: linkis-demo
NAMESPACE: linkis
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
...

---
Welcome to Apache Linkis (v1.3.0)!

.___    .___ .______  .____/\ .___ .________
|   |   : __|:      \ :   /  \: __||    ___/
|   |   | : ||       ||.  ___/| : ||___    \
|   |/\ |   ||   |   ||     \ |   ||       /
|   /  \|   ||___|   ||      \|   ||__:___/
|______/|___|    |___||___\  /|___|   : v1.3.0
                           \/

Linkis builds a layer of computation middleware between upper applications and underlying engines.
Please visit https://linkis.apache.org/ for details.

Enjoy!
configmap/flink-conf created
configmap/hadoop-conf created
configmap/hive-conf created
configmap/spark-conf created
configmap/zookeeper-conf created

$> kubectl get pods -n ldh -o wide
NAME                   READY   STATUS    RESTARTS   AGE     IP           NODE                      NOMINATED NODE   READINESS GATES
ldh-6648554447-ml2bn   1/1     Running   0          6m25s   10.244.0.6   test-helm-control-plane   <none>           <none>

$> kubectl get pods -n linkis -o wide
NAME                                                READY   STATUS             RESTARTS   AGE     IP            NODE                      NOMINATED NODE   READINESS GATES
init-db-bcp85                                       0/1     Completed          0          4m52s   10.244.0.14   test-helm-control-plane   <none>           <none>
linkis-demo-cg-engineconnmanager-659bf85689-ddvhw   1/1     Running            1          4m52s   10.244.0.7    test-helm-control-plane   <none>           <none>
linkis-demo-cg-engineplugin-98bd6945-tsgjl          1/1     Running            1          4m52s   10.244.0.10   test-helm-control-plane   <none>           <none>
linkis-demo-cg-entrance-858f74c868-xrd82            1/1     Running            0          4m52s   10.244.0.12   test-helm-control-plane   <none>           <none>
linkis-demo-cg-linkismanager-6f96f69b8b-ns6st       1/1     Running            0          4m52s   10.244.0.11   test-helm-control-plane   <none>           <none>
linkis-demo-mg-eureka-0                             1/1     Running            0          4m52s   10.244.0.13   test-helm-control-plane   <none>           <none>
linkis-demo-mg-gateway-68ddb8c547-xgvhn             1/1     Running            0          4m52s   10.244.0.15   test-helm-control-plane   <none>           <none>
linkis-demo-ps-publicservice-6bbf99fcd7-sc922       1/1     Running            0          4m52s   10.244.0.8    test-helm-control-plane   <none>           <none>
linkis-demo-web-554bd7659f-nmdjl                    1/1     Running            0          4m52s   10.244.0.9    test-helm-control-plane   <none>           <none>

```

### 调试组件

#### 打开端口转发

每个组件在容器内的 JVM 远程调试端口均为 5005， 这些端口会被映射到宿主机上的不同端口，具体如下：
* mg-eureka: 5001
* mg-gateway: 5002
* ps-publicservice: 5004
* cg-linkismanager: 5007
* cg-entrance: 5008
* cg-engineconnmanager: 5009
* cg-engineplugin: 5010

另外，Web Console 会被映射到宿主机上的 8087 端口，可以在浏览器上输入`http://localhost:8087`进行访问.

``` shell
$> ./scripts/remote-debug-proxy.sh start      
- starting port-forwad for [web] with mapping [local->8087:8087->pod] ...
- starting port-forwad for [mg-eureka] with mapping [local->5001:5005->pod] ...
- starting port-forwad for [mg-gateway] with mapping [local->5002:5005->pod] ...
- starting port-forwad for [ps-publicservice] with mapping [local->5004:5005->pod] ...
- starting port-forwad for [cg-linkismanager] with mapping [local->5007:5005->pod] ...
- starting port-forwad for [cg-entrance] with mapping [local->5008:5005->pod] ...
- starting port-forwad for [cg-engineconnmanager] with mapping [local->5009:5005->pod] ...
- starting port-forwad for [cg-engineplugin] with mapping [local->5010:5005->pod] ..

$> ./scripts/remote-debug-proxy.sh list 
user            10972   0.0  0.1  5052548  31244 s001  S    12:57AM   0:00.10 kubectl port-forward -n linkis pod/linkis-demo-cg-engineplugin-98bd6945-tsgjl 5010:5005 --address=0.0.0.0
user            10970   0.0  0.1  5053060  30988 s001  S    12:57AM   0:00.12 kubectl port-forward -n linkis pod/linkis-demo-cg-engineconnmanager-659bf85689-ddvhw 5009:5005 --address=0.0.0.0
user            10968   0.0  0.1  5054084  30428 s001  S    12:57AM   0:00.10 kubectl port-forward -n linkis pod/linkis-demo-cg-entrance-858f74c868-xrd82 5008:5005 --address=0.0.0.0
user            10966   0.0  0.1  5053316  30620 s001  S    12:57AM   0:00.11 kubectl port-forward -n linkis pod/linkis-demo-cg-linkismanager-6f96f69b8b-ns6st 5007:5005 --address=0.0.0.0
user            10964   0.0  0.1  5064092  31152 s001  S    12:57AM   0:00.10 kubectl port-forward -n linkis pod/linkis-demo-ps-publicservice-6bbf99fcd7-sc922 5004:5005 --address=0.0.0.0
user            10962   0.0  0.1  5051012  31244 s001  S    12:57AM   0:00.12 kubectl port-forward -n linkis pod/linkis-demo-mg-gateway-68ddb8c547-xgvhn 5002:5005 --address=0.0.0.0
user            10960   0.0  0.1  5053060  31312 s001  S    12:57AM   0:00.13 kubectl port-forward -n linkis pod/linkis-demo-mg-eureka-0 5001:5005 --address=0.0.0.0

...

# 在调试完成后，可以使用如下命令停止端口转发
$> ./scripts/remote-debug-proxy.sh stop 
- stopping port-forward for [web] with mapping [local->8087:8087->pod] ...
- stopping port-forward for [mg-eureka] with mapping [local->5001:5005->pod] ...
- stopping port-forward for [mg-gateway] with mapping [local->5002:5005->pod] ...
- stopping port-forward for [ps-publicservice] with mapping [local->5004:5005->pod] ...
- stopping port-forward for [cg-linkismanager] with mapping [local->5007:5005->pod] ...
- stopping port-forward for [cg-entrance] with mapping [local->5008:5005->pod] ...
- stopping port-forward for [cg-engineconnmanager] with mapping [local->5009:5005->pod] ...
- stopping port-forward for [cg-engineplugin] with mapping [local->5010:5005->pod] ...
```

#### 配置 IDE 进行远程调试

在 IDE 上进行如下配置，开启远程调试:

![](/Images/development/kube-jvm-remote-debug.png)

开启远程调试
![](/Images/development/kube-jvm-remote-debug-start.png)

设置断点，提交一个作业，进行调试

``` shell
$> ./scripts/login-pod.sh mg-gateway

- login [mg-gateway]'s bash ...
bash-4.2$ ./bin/./linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" "  -submitUser hadoop -proxyUser hadoop
=====Java Start Command=====
exec /etc/alternatives/jre/bin/java -server -Xms32m -Xmx2048m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/opt/linkis/logs/linkis-cli -XX:ErrorFile=/opt/linkis/logs/linkis-cli/ps_err_pid%p.log -XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=80 -XX:+DisableExplicitGC    -classpath /opt/linkis/conf/linkis-cli:/opt/linkis/lib/linkis-computation-governance/linkis-client/linkis-cli/*:/opt/linkis/lib/linkis-commons/public-module/*: -Dconf.root=/etc/linkis-conf -Dconf.file=linkis-cli.properties -Dlog.path=/opt/linkis/logs/linkis-cli -Dlog.file=linkis-client..log.20220925171540947077800  org.apache.linkis.cli.application.LinkisClientApplication '-engineType shell-1 -codeType shell -code echo "hello"  -submitUser hadoop -proxyUser hadoop'
...
```
![](/Images/development/kube-jvm-remote-debug-breakpoint.png)


### 清理环境

调试完成后，可以使用如下命令清理整个环境:

``` shell
$> kind delete clusters test-helm                                              
Deleted clusters: ["test-helm"]
```

### 其他常用操作

#### 查看组件日志

``` bash
$> kubectl logs -n linkis linkis-demo-cg-engineconnmanager-659bf85689-ddvhw -f

+ RUN_IN_FOREGROUND=true
+ /opt/linkis/sbin/linkis-daemon.sh start cg-engineconnmanager
Start to check whether the cg-engineconnmanager is running
Start server, startup script:  /opt/linkis/sbin/ext/linkis-cg-engineconnmanager
=====Java Start Command=====
java   -DserviceName=linkis-cg-engineconnmanager -Xmx512M -XX:+UseG1GC -Xloggc:/var/logs/linkis/linkis-cg-engineconnmanager-gc.log -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005  -cp /etc/linkis-conf:/opt/linkis/lib/linkis-commons/public-module/*:/opt/linkis/lib/linkis-computation-governance/linkis-cg-engineconnmanager/* org.apache.linkis.ecm.server.LinkisECMApplication  --eureka.instance.prefer-ip-address=true  --eureka.instance.instance-id=${spring.cloud.client.ip-address}:${spring.application.name}:${server.port} 2>&1
OpenJDK 64-Bit Server VM warning: If the number of processors is expected to increase from one, then you should configure the number of parallel GC threads appropriately using -XX:ParallelGCThreads=N
Listening for transport dt_socket at address: 5005
16:32:41.101 [main] INFO  org.apache.linkis.common.conf.BDPConfiguration$ - ******************* Notice: The Linkis configuration file is linkis.properties ! *******************
16:32:41.130 [main] INFO  org.apache.linkis.common.conf.BDPConfiguration$ - *********************** Notice: The Linkis serverConf file is linkis-cg-engineconnmanager.properties ! ******************
16:32:41.222 [main] INFO  org.apache.linkis.LinkisBaseServerApp - Ready to start linkis-cg-engineconnmanager with args: --eureka.instance.prefer-ip-address=true
--eureka.instance.instance-id=${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}
...
```

#### 进入组件 Pod 内
使用`./scripts/login-pod.sh <组件名>`可以进入组件的 Pod 打开一个 Bash 实例进行交互式操作，其中组件名可以为:
* cg-engineconnmanager
* cg-engineplugin
* cg-entrance
* cg-linkismanager
* mg-eureka
* mg-gateway
* ps-publicservice
* web

``` bash
$> ./scripts/login-pod.sh cg-engineconnmanager
- login [cg-engineconnmanager]'s bash ...
bash-4.2$ pwd
/opt/linkis
bash-4.2$  env |grep LINKIS
LINKIS_DEMO_PS_PUBLICSERVICE_SERVICE_HOST=10.96.93.45
LINKIS_DEMO_CG_LINKISMANAGER_PORT_9101_TCP_PROTO=tcp
LINKIS_DEMO_WEB_PORT_8087_TCP_PORT=8087
...
LINKIS_CLIENT_CONF_DIR=/etc/linkis-conf
bash-4.2$ ps aux |grep linkis
hadoop         1  0.0  0.0  11708  2664 ?        Ss   16:32   0:00 /bin/bash /opt/linkis/sbin/linkis-daemon.sh start cg-engineconnmanager
hadoop        10  0.0  0.0  11708  2624 ?        S    16:32   0:00 sh /opt/linkis/sbin/ext/linkis-cg-engineconnmanager
hadoop        11  0.0  0.0  11712  2536 ?        S    16:32   0:00 sh /opt/linkis/sbin/ext/linkis-common-start
hadoop        12  4.0  3.2 4146404 400084 ?      Sl   16:32   0:35 java -DserviceName=linkis-cg-engineconnmanager -Xmx512M -XX:+UseG1GC -Xloggc:/var/logs/linkis/linkis-cg-engineconnmanager-gc.log -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -cp /etc/linkis-conf:/opt/linkis/lib/linkis-commons/public-module/*:/opt/linkis/lib/linkis-computation-governance/linkis-cg-engineconnmanager/* org.apache.linkis.ecm.server.LinkisECMApplication --eureka.instance.prefer-ip-address=true --eureka.instance.instance-id=${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}
bash-4.2$ exit
exit
```

