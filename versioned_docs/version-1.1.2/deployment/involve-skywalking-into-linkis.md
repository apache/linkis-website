---
title: Involve SkyWaling into Linkis
sidebar_position: 7
---
This article describes how to enable SkyWalking when starting the Linkis service to facilitate subsequent distributed trace and troubleshooting.

## 1. Introduction to SkyWalking

### 1.1 What is SkyWalking

SkyWalking is an open source observability platform used to collect, analyze, aggregate and visualize data from services and cloud native infrastructures. SkyWalking provides an easy way to maintain a clear view of your distributed systems, even across Clouds. It is a modern APM, specially designed for cloud native, container based distributed systems.

### 1.2 SkyWalking Architecture

The following figure is the overall architecture of SkyWalking.

![](/Images/deployment/skywalking/SkyWalking_Architecture.png)

SkyWalking is logically split into four parts: Probes, Platform backend, Storage and UI.
- **Probe**s collect data and reformat them for SkyWalking requirements (different probes support different sources).
- **Platform backend** supports data aggregation, analysis and streaming process covers traces, metrics, and logs.
- **Storage** houses SkyWalking data through an open/plugable interface. You can choose an existing implementation, such as ElasticSearch, H2, MySQL, TiDB, InfluxDB, or implement your own. Patches for new storage implementors welcome!
- **UI** is a highly customizable web based interface allowing SkyWalking end users to visualize and manage SkyWalking data.

Using SkyWalking in Linkis requires that the user already has the Backend service and the corresponding Storage. The Probe can be integrated when the Linkis service is started. There are three main ways of Probe integration:

- **Language based native agent**. These agents run in target service user spaces, such as a part of user codes. For example, the SkyWalking Java agent uses the `-javaagent` command line argument to manipulate codes in runtime, where `manipulate` means to change and inject user’s codes. Another kind of agents uses certain hook or intercept mechanism provided by target libraries. As you can see, these agents are based on languages and libraries.
- **Service Mesh probes**. Service Mesh probes collect data from sidecar, control plane in service mesh or proxy. In the old days, proxy is only used as an ingress of the whole cluster, but with the Service Mesh and sidecar, we can now perform observability functions.
- **3rd-party instrument library**. SkyWalking accepts many widely used instrument libraries data formats. It analyzes the data, transfers it to SkyWalking’s formats of trace, metrics or both. This feature starts with accepting Zipkin span data. See [Receiver for Zipkin traces](https://skywalking.apache.org/docs/main/latest/en/setup/backend/zipkin-trace) for more information.

We used **Language based native agent** when Linkis integrated SkyWalking, that is, the method of java agent. Below we will show you how to enable SkyWalking in Linkis service.


## 2. Deploy the SkyWalking backend
The SkyWalking backend is a prerequisite for enabling SkyWalk. The following is a brief demonstration of how to install the SkyWalking backend.

First download SkyWalking APM from SkyWalking's [Downloads](https://skywalking.apache.org/downloads/) page.

![](/Images/deployment/skywalking/SkyWalking_APM_Download.png)

After downloading, unzip it directly, and we get the following directory structure.
```bash
$ ls
bin config config-examples LICENSE licenses logs NOTICE oap-libs README.txt tools webapp
````

The backend uses the H2 in-memory database as the backend storage by default, and does not need to modify the configuration. Start as follows.

Start Backend
```bash
$ bash bin/startup.sh
````

Start WebApp
```bash
$ bash bin/webappService.sh
````

The UI starts on port 8080 by default. You can also modify the listening port by modifying the webapp.yml file in the webapp directory.
````yaml
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
````

## 3. Linkis service start and enable SkyWalking

It is assumed here that the service deployment of Linkis is relatively clear. If it is not clear, it can be asynchronous:

To start SkyWalking in Linkis, you first need to download the Java agent of SkyWalking, we can download it from the [Downloads](https://skywalking.apache.org/downloads/) page.

![](/Images/deployment/skywalking/SkyWalking_Agent_Download.png)

After downloading, unzip it directly, the internal file structure is as follows:
```bash
tree skywalking-agent
$ skywalking-agent
├── LICENSE
├── NOTICE
├── activations
│ ├── apm-toolkit-kafka-activation-8.8.0.jar
│ ├── ...
├── bootstrap-plugins
│ ├── apm-jdk-http-plugin-8.8.0.jar
│ └── apm-jdk-threading-plugin-8.8.0.jar
├── config
│ └── agent.config
├── licenses
│ └── LICENSE-asm.txt
├── logs
├── optional-plugins
│ ├── apm-customize-enhance-plugin-8.8.0.jar
│ ├── ...
├── optional-reporter-plugins
│ ├── kafka-reporter-plugin-8.8.0.jar
│ ├── ...
├── plugins
│ ├── apm-activemq-5.x-plugin-8.8.0.jar
│ ├── ...
└── skywalking-agent.jar

````

Modify the configuration item `SKYWALKING_AGENT_PATH` in linkis-env.sh of Linkis. Set it to the path to `skywalking-agent.jar`.
```bash
SKYWALKING_AGENT_PATH=/path/to/skywalking-agent.jar
````

Then start Linkis.

```bash
$ bash linkis-start-all.sh
````

## 4. Result display

The UI port of Linkis starts at port 8080 by default. After Linkis opens SkyWalking and opens the UI, if you can see the following picture, it means success.

![](/Images/deployment/skywalking/SkyWalking_UI_Dashboard.png)

![](/Images/deployment/skywalking/SkyWalking_UI_Dashboard2.png)

![](/Images/deployment/skywalking/SkyWalking_Topology.png)