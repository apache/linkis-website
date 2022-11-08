---
title: 开启 SkyWalking
sidebar_position: 5.0
---
这篇文章介绍一下如何在启动 Linkis 服务的时候开启 SkyWalking，以方便后续做分布式 trace 和 troubleshooting。

## 1. SkyWalking 介绍

### 1.1 SkyWalking 是什么

SkyWalking 是开源的可视化平台，可以从多种数据源采集数据，并提供分析、聚合以及可视化等功能。通过 SkyWalking，我们可以对分布式系统的拓扑结构，数据交互有一个更加清晰的视图。



### 1.2 SkyWalking 架构

下图是 SkyWalking 的整体架构图。

![](/Images-zh/deployment/skywalking/SkyWalking_Architecture.png)

从逻辑上可以划分成 4 个部分：
* **Probe**：可以理解为数据采集 agent，主要负责数据采集和格式化。
* **Platform Backend**：SkyWalking 的后端服务，支持数据聚合、分析以及流式处理等。
* **Storage**：负责数据存储，以 plugin 的方式支持多种存储引擎，比如 ElasticSearch, H2, MySQL, TiDB, InfluxDB 等。
* **UI**: 数据可视化。

在 Linkis 中使用 SkyWalking，需要用户已经存在 Backend 服务以及对应的 Storage。Linkis 服务启动的时候集成 Probe 即可。Probe 集成主要有三种方式：
* **Language based native agent**：这些 agent 和目标服务进程运行在相同的用户空间，从外部来看，agent 和目标服务的代码是一样的。一个典型的例子是 Java agent，在运行 Java 应用的时候我们可以通过 `-javaagent` 来指定 agent。
* **Service Mesh probes**：这种 Probe 通过 sidecar 或者 proxy 收集数据。
* **3rd-party intrument library**：简单来说就是第三方的数据，比如 zipkin。

我们在 Linkis 集成 SkyWalking 的时候采用第一种方式，也就是 java agent 的方式。下面我们为大家演示一下如何在 Linkis 服务中开启 SkyWalking。

## 2. 部署 SkyWalking 后端

SkyWalking 后端是开启 SkyWalk 的前置条件，下面先简单演示下如何安装 SkyWalking 的后端。

首先从 SkyWalking 的 [Downloads](https://skywalking.apache.org/downloads/) 页面下载 SkyWalking APM。

![](/Images-zh/deployment/skywalking/SkyWalking_APM_Download.png)

下载完，直接解压得到如下的目录结构。

```bash
$ ls
bin  config  config-examples  LICENSE  licenses  logs  NOTICE  oap-libs  README.txt  tools  webapp
```

后端默认使用 H2 内存数据库作为后端存储，不需要修改配置。按如下方式启动。

启动 Backend
```bash
$ sh bin/startup.sh
```

启动 WebApp
```bash
$ sh bin/webappService.sh
```

UI 默认启动在 8080 端口，也可以通过修改 webapp 目录下的 webapp.yml 文件修改监听端口。

```yaml
server:
  port: 8080

spring:
  cloud:
    gateway:
      routes:
        - id: oap-route
          uri: lb://oap-service
          predicates:
            - Path=/graphql/**
    discovery:
      client:
        simple:
          instances:
            oap-service:
              - uri: http://127.0.0.1:12800
            # - uri: http://<oap-host-1>:<oap-port1>
            # - uri: http://<oap-host-2>:<oap-port2>

  mvc:
    throw-exception-if-no-handler-found: true

  web:
    resources:
      add-mappings: true

management:
  server:
    base-path: /manage
```

## 3. Linkis 服务启动开启 SkyWalking

这里假定大家对 Linkis 的服务部署已经比较清晰，如果还不清晰，可以异步: 

在 Linkis 中开启 SkyWalking 首先需要下载 SkyWalking 的 Java agent，我们可以在 [Downloads](https://skywalking.apache.org/downloads/) 页面进行下载。

![](/Images-zh/deployment/skywalking/SkyWalking_Agent_Download.png)

下载之后解压，内部的文件结构如下：
```bash
tree skywalking-agent                                   
$ skywalking-agent
├── LICENSE
├── NOTICE
├── activations
│   ├── apm-toolkit-kafka-activation-8.8.0.jar
│   ├── ...
├── bootstrap-plugins
│   ├── apm-jdk-http-plugin-8.8.0.jar
│   └── apm-jdk-threading-plugin-8.8.0.jar
├── config
│   └── agent.config
├── licenses
│   └── LICENSE-asm.txt
├── logs
├── optional-plugins
│   ├── apm-customize-enhance-plugin-8.8.0.jar
│   ├── ...
├── optional-reporter-plugins
│   ├── kafka-reporter-plugin-8.8.0.jar
│   ├── ...
├── plugins
│   ├── apm-activemq-5.x-plugin-8.8.0.jar
│   ├── ...
└── skywalking-agent.jar
```

修改 Linkis 的 deploy-config/linkis-env.sh 中的配置项 `SKYWALKING_AGENT_PATH`。将其设置为 `skywalking-agent.jar` 的路径。
```bash
SKYWALKING_AGENT_PATH=/path/to/skywalking-agent.jar
```

然后启动 Linkis 即可。
```bash
$ sh linkis-start-all.sh
```

## 4. 结果展示
Linkis 的 UI 端口默认启动在 8080 端口，Linkis 开启 SkyWalking 之后打开 UI 如果能看到如下的图就表示成功了。  
如果看不到展示效果,可能是浏览器兼容性问题，尝试切换浏览器试试。

![](/Images-zh/deployment/skywalking/SkyWalking_UI_Dashboard.png)

![](/Images-zh/deployment/skywalking/SkyWalking_UI_Dashboard2.png)

![](/Images-zh/deployment/skywalking/SkyWalking_Topology.png)

