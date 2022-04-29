---
title: Cluster Deployment
sidebar_position: 2
---

Introduction to Distributed Deployment Scheme
==================

Linkis's stand-alone deployment is simple, but it cannot be used in a production environment, because too many processes on the same server will make the server too stressful. The choice of deployment plan is related to the company's user scale, user habits, and the number of simultaneous users of the cluster. Generally speaking, we will choose the deployment method based on the number of simultaneous users using Linkis and the user's preference for the execution engine.

1.Multi-node deployment method reference
------------------------------------------

Linkis1.0 still maintains the SpringCloud-based microservice architecture, in which each microservice supports multiple active deployment schemes. Of course, different microservices play different roles in the system. Some microservices are called frequently, and more It may be in a high load situation. **On the machine where EngineConnManager is installed, the memory load of the machine will be relatively high because the user's engine process will be started, and the load of other types of microservices on the machine will be relatively low.* *For this kind of microservices, we recommend starting multiple distributed deployments. The total resources dynamically used by Linkis can be calculated as follows.

EngineConnManager Total resources used = total memory + total number of cores =
Number of people online at the same time \* (All types of engines occupy memory) \*maximum concurrency per user + number of people online at the same time \*
(total memory occupied by all types of engine conns) \*maximum concurrency per user

For example, when only spark, hive, and python engines are used and the maximum concurrency of a single user is 1, 50 people are used at the same time, Spark's driver memory is 1G, and Hive
Client memory 1G, python client 1G, each engine uses 1 core, then it is 50 \*(1+1+1)G \*
1 + 50 \*(1+1+1) cores\*1 = 150G memory + 150 CPU cores.

During distributed deployment, the memory occupied by the microservice itself can be calculated according to each 2G memory. In the case of a large number of users, it is recommended to increase the memory of ps-publicservice to 6G, and it is recommended to reserve 10G of memory as a buffer.
The following configuration assumes that **each user starts two engines at the same time as an example**. **For a machine with 64G memory**, the reference configuration is as follows:

- 10-50 people online at the same time

> **Server configuration recommended** 4 servers, named S1, S2, S3, S4

| Service | Host name | Remark |
|---------------|-----------|------------------|
| cg-engineconnmanager | S1, S2 | Each machine is deployed separately |
| Other services | S3, S4 | Eureka high availability deployment |

- 50-100 people online at the same time

> **Server configuration recommendation**: 6 servers, named S1, S2, S3, S4, S5, S6

| Service | Host name | Remark |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1-S4 | Each machine is deployed separately |
| Other services | S5, S6 | Eureka high availability deployment |

- The number of simultaneous users 100-300

**Recommended server configuration**: 12 servers, named S1, S2...S12

| Service | Host name | Remark |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1-S10 | Each machine is deployed separately |
| Other services | S11, S12 | Eureka high availability deployment |

- 300-500 people at the same time

> **Server configuration recommendation**: 20 servers, named S1, S2...S20

| Service | Host name | Remark |
|----------------------|-----------|-----------------|
| cg-engineconnmanager | S1-S18 | Each machine is deployed separately |
| Other services | S19, S20 | Eureka high-availability deployment, some microservices can be expanded if the request volume is tens of thousands, and the current active-active deployment can support thousands of users in the industry |

- More than 500 users at the same time (estimated based on 800 people online at the same time)

> **Server configuration recommendation**: 34 servers, named S1, S2...S34

| Service | Host name | Remark |
|----------------------|-----------|------------------------------|
| cg-engineconnmanager | S1-S32 | Each machine is deployed separately |
| Other services | S33, S34 | Eureka high-availability deployment, some microservices can be expanded if the request volume is tens of thousands, and the current active-active deployment can support thousands of users in the industry |

2.Linkis microservices distributed deployment configuration parameters
---------------------------------

### 1. Preparation for distributed deployment
Download the jar package to be deployed and prepare the development environment (mysql, Hadoop, hive and other development environments)  

### 2. Distributed deployment process
#### 2.1 modify the Eureka configuration file and add the configuration addresses of both Eureka  
You can decide whether to deploy Eureka service according to the actual situation  
Take the dual active deployment of machine Server1 and server2 as an example, in order to make Eureka register with each other.  
Make the following configuration changes for Server1/server2  

```
$LINKIS_ HOME/conf/application-eureka. yml
$LINKIS_ HOME/conf/application-linkis. yml
eureka:
client:
serviceUrl:
defaultZone: http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/

$LINKIS_ HOME/conf/linkis  Properties configuration modification
wds. linkis. eureka. defaultZone=http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/

```

#### 2.2 deploy all services on server a and use SBIN / links start all The SH command starts  
#### 2.3 copy the content deployed on server a to server B, and use sh links daemon for the services that need to be started The SH restart command starts the command that needs to be started on server B  
For example, start the linkis PS CS service sh linkis daemon SH restart PS CS, and the specific service name can be linkis start all Find in SH file  

#### 2.4 testing on deployed front-end projects    
Test the interface of the service on server A  
Test the interface of the service on server B   

### 3. Start and stop of distributed deployment services  
Linux port occupies netstat - tunlp | grep port number  
Linux clear process sudo kill - 9 process number  



### 4. matters needing attention
#### 4.1 It is best to start all services at the beginning, because there are dependencies between services. If some services do not exist and the corresponding backup cannot be found through Eureka, the service will fail to start. After the service fails to start, it will not restart automatically. Wait until the alternative service is added, and then close the relevant services
