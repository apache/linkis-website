---
title: Overview
sidebar_position: 0
---

Linkis 1.0 divides all microservices into three categories: public enhancement services, computing governance services, and microservice governance services. The following figure shows the architecture of Linkis 1.0.

![Linkis1.0 Architecture Figure](/Images/Architecture/Linkis1.0-architecture.png)

The specific responsibilities of each category are as follows:

1. Public enhancement services are the material library services, context services, data source services and public services that Linkis 0.X has provided.
2. The microservice governance services are Spring Cloud Gateway, Eureka and Open Feign already provided by Linkis 0.X, and Linkis 1.0 will also provide support for Nacos
3. Computing governance services are the core focus of Linkis 1.0, from submission, preparation to execution, overall three stages to comprehensively upgrade Linkis's ability to perform control over user tasks.

The following is a directory listing of Linkis1.0 architecture documents:

1. The characteristics of Linkis1.0's architecture , please read [The difference between Linkis1.0 and Linkis0.x](difference-between-1.0-and-0.x.md).
2. Linkis1.0 public enhancement service related documents, please read [Public Enhancement Service](public-enhancement-services/overview.md).
3. Linkis1.0 microservice governance related documents, please read [Microservice Governance](microservice-governance-services/overview.md).
4. Linkis1.0 computing governance service related documents, please read [Computation Governance Service](computation-governance-services/overview.md).