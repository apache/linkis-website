---
title: Cluster Deployment
sidebar_position: 1.1
---

The stand-alone deployment method of Linkis is simple. Too many processes on the same server will put too much pressure on the server. In order to ensure high service availability in the production environment, it is recommended to use split deployment.
The choice of deployment plan is related to the company's user scale, user usage habits, and the number of simultaneous users of the cluster. Generally speaking, we will use the number of simultaneous users who use Linkis and the user's preference for the execution engine to make the choice of deployment method. .

## 1. Computational model reference for multi-node deployment

Each microservice of Linkis supports a multi-active deployment solution. Of course, different microservices play different roles in the system. Some microservices are called frequently and resources will be under high load.
**On the machine where EngineConnManager is installed, since the user's engine process will be started, the memory load of the machine will be relatively high, and the load of other types of microservices on the machine will be relatively low.
** For this type of microservice, we recommend starting multiple distributed deployments. The total resources dynamically used by Linkis can be calculated as follows.

**EngineConnManager** uses total resources<br/>
= total memory + total cores <br/>
= **Number of people online at the same time \* (memory occupied by all types of engines) \*Maximum concurrent number of single user + number of people online at the same time \*
(The number of cores occupied by all types of engines) \*The maximum number of concurrency for a single user**

E.g:
```html

When only spark, hive, and python engines are used and the maximum number of concurrency for a single user is 1, the number of concurrent users is 50.
The driver memory of spark is 1G, the memory of hive client is 1G, and the python client is 1G. Each engine uses 1 core

Total resources used by EngineConnManager (ECM)
= 50 * (1+1+1) G *1 + 50 * (1+1+1) core *1
= 150G memory + 150 CPU cores
```

During distributed deployment, the memory occupied by the microservice itself can be calculated according to each 2G. For a large number of users, it is recommended to increase the memory of ps-publicservice to 6G, and it is recommended to reserve 10G of memory as a buffer.

The following configuration assumes **Each user starts two engines at the same time as an example**, **For a machine with 64G memory**, the reference configuration is as follows:

### 1.1 The number of people online at the same time is 10-50
**EngineConnManager** Total resources used = total memory + total cores =
** Simultaneous online users \* (All types of engines occupy memory) \* Maximum concurrent number of single user + simultaneous online users \*
(The number of cores occupied by all types of engines) \*The maximum number of concurrency for a single user**

Total memory: simultaneous online users 50 * single engine 1G memory * each user starts two engines at the same time 2 = 100G memory

> **Server Configuration Recommended** 4 servers, named as S1, S2, S3, S4

| Service              | Host name | Remark           |
|----------------------|-----------|------------------|
| cg-engineconnmanager | S1、S2(共128G)| Deploy each machine individually |
| Other services       | S3、S4    | Eureka High Availability Deployment |

### 1.2 The number of people online at the same time is 50-100

Total memory: number of people online at the same time 100 * single engine 1G memory * each user starts two engines at the same time 2 = 200G memory

> **Server configuration recommendation**: 6 servers named S1, S2, S3, S4, S5, S6

| Service | Host name | Remark |
|--------------------|-----------|------------- ----|
| cg-engineconnmanager | S1-S4 (total 256G) | Deploy each machine separately |
| Other services | S5, S6 | Eureka high availability deployment |

### 1.3 Simultaneous users 100-300


Total memory: 300 people online at the same time * 1G memory for a single engine * Each user starts two engines at the same time 2 = 600G memory

**Server configuration recommendation**: 12 servers, named S1, S2..S12 respectively

| Service | Host name | Remark |
|--------------------|-----------|------------- ----|
| cg-engineconnmanager | S1-S10 (total 640G) | Each machine is deployed separately |
| Other services | S11, S12 | Eureka high availability deployment |

### 1.4 Simultaneous users 300-500

> **Server configuration recommendation**: 20 servers, named S1, S2..S20 respectively

| Service | Host name | Remark |
|--------------------|-----------|------------- -------------------------------------------------- ---------------------------------|
| cg-engineconnmanager | S1-S18 | Each machine is deployed separately |
| Other services | S19, S20 | Eureka high-availability deployment, some microservices can consider expansion if the request volume is tens of thousands, and the current active-active deployment can support thousands of users in the line |

### 1.5 The number of simultaneous users is more than 500
> Estimated based on 800 people online at the same time
> **Server configuration recommendation**: 34 servers, named S1, S2..S34

| Service | Host name | Remark |
|--------------------|-----------|------------- -------------------------------------------------- ---------------------------------|
| cg-engineconnmanager | S1-S32 | Each machine is deployed separately |
| Other services | S33, S34 | Eureka high-availability deployment, some microservices can consider expansion if the request volume is tens of thousands, and the current active-active deployment can support thousands of users in the line |

## 2. Process of distributed deployment

>The following is just a reference example, taking two servers as an example for distributed deployment. At present, the one-click installation script does not have good support for distributed deployment, and manual adjustment and deployment are required.

If you have already successfully deployed linkis in a stand-alone mode on server A, and now you want to add a server B for distributed deployment, you can refer to the following steps

Mode: Eureka service multi-active deployment, some services are deployed on server A, and some services are deployed on server B

### 2.1 Environment preparation for distributed deployment
Like server A, server B needs basic environment preparation, please refer to [Linkis environment preparation](deploy-quick#3-linkis%E7%8E%AF%E5%A2%83%E5%87%86%E5% A4%87)

### 2.2 Eureka multi-active configuration adjustment
The registration center Eureka service needs to be deployed on server A and server B,


Modify the Eureka configuration file, add the configuration addresses of both Eurekas, and let the Eureka services register with each other.
On server A, make the following configuration changes

```
Revise $LINKIS_HOME/conf/application-eureka.yml和$LINKIS_HOME/conf/application-linkis.yml configuration

eureka:
  client:
    serviceUrl:
      defaultZone: http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/


Modify $LINKIS_HOME/conf/linkis.properties configuration
  
wds.linkis.eureka.defaultZone=http:/eurekaIp1:port1/eureka/,http:/eurekaIp2:port2/eureka/  
```

### 2.3 Synchronization of installation materials
On server A, package the successfully installed directory `$LINKIS_HOME` of linkis, then copy and decompress it to the same directory on server B.
At this point, if the `sbin/linkis-start-all.sh` command is started on server A and server B to start all services, then all services have two instances. You can visit the eureka service display page `http:/eurekaIp1:port1, or http:/eurekaIp2:port2` to view

### 2.4 Adjust startup script
According to the actual situation, determine the services that need to be deployed on server A and server B,
For example, the microservice `linkis-cg-engineconnmanager` will not be deployed on server A,
Then modify the one-click start-stop script of server A, `sbin/linkis-start-all.sh`, `sbin/linkis-stop-all.sh`, and comment out the start-stop commands related to the `cg-engineconnmanager` service
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

## 3. Notes
- When deploying separately, it is recommended to keep the installation directory of linkis consistent to facilitate unified management and control, and it is best to keep the relevant configuration files consistent
- If some servers and ports are occupied by other applications and cannot be used, you need to adjust the service port
- The multi-active deployment of mg-gateway currently does not support distributed login sessions, so a user’s request needs to be sent to the same gateway instance, which can be supported by nginx’s ip hash load balancing method
- The one-key start-stop script should be adjusted according to the actual situation. For microservices that are no longer deployed on the notebook server, the corresponding start-stop commands need to be commented out in the one-key start script.