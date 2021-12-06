---
title: Cluster Deployment
sidebar_position: 1
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

In linkis1.0, we have optimized and integrated the startup parameters. Some important startup parameters of each microservice are loaded through the conf/linkis-env.sh file, such as the microservice IP, port, registry address, etc. The way to modify the parameters has changed a little. Take the active-active deployment of the machines **server1 and server2** as an example, in order to allow eureka to register with each other.

On the server1 machine, you need to change the value in **conf/linkis-env.sh**

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/
``

change into:

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/,http:/server2:port/eureka/
``

In the same way, on the server2 machine, you need to change the value in **conf/linkis-env.sh**

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/
``

change into:

``
EUREKA_URL=http://$EUREKA_INSTALL_IP:$EUREKA_PORT/eureka/,http:/server1:port/eureka/
``

After the modification, start the microservice, enter the eureka registration interface from the web side, you can see that the microservice has been successfully registered to eureka, and the DS
Replicas will also display the replica nodes adjacent to the cluster.

