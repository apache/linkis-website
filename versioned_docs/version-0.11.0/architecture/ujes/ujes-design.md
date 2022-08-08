---
title: UJES Design
sidebar_position: 0
---

## 1 Document Overview

### 1.1 Project background

UJES (Unified Job Execution Service), one of Linkis's core components is the Integrated Job Enforcement Service.The project has provided a new generic framework programme for large data ecosystems in the way they are implemented in a microservice framework, which addresses some of the pain points in the use of existing open source projects of the same kind on the market.

This document is suitable for reading large data functional platforms, in particular the hadoop data ecosphere, with some work experience or interest in learning.

### 1.2 Interpretation of terms

These terms are explained in this section by the terminology used later in the document for some items.

1) Gateway:

 UJES's gateway, plugin enhancements based on Spring Cloud Gateway have been introduced, and WebSocket has been added to a multi-capacity gateway service, mainly for forwarding user requests to specified microservices.

2) Access microservices:

 UJES's Entrance Microservice is the manager of a user's class of assignments.From job generation to submission to execution engine, to assignment feedback to users and operations closed, access microservices managed the life cycle of an operation.

3) Engine manager:

 UJES's Engine Manager is a microservice that handles start-up engine requests, while also monitoring the life state of the engine.

4) Execution Engine:

 UJES's implementation engine is a truly microservice to perform user assignments, launched by the Engine Manager and interacts with the portals submitted to it, correctly executes operations and feeds the user needs information.

5) Application manager:

 UJES's Application Management Microservice is the maintainer of the implementation engine instance information in the cluster, and the entrance microservice always needs this information to get an available implementation engine.

## 2 Overall architecture

The correct and secure connection of users and data and the provision of powerful and easy data job submissions to users is the goal of the UJES project.

UJES is positioned as a bridge between the upper application system and the lower computing storage engine.

Users only need to submit their large data jobs to UJES; UJES will submit them to the lower computing storage engine for execution. The logs, status, progress, results of the operation will be returned from UJES to the user in real time.

The overall structure of UJES is shown in figure 2.1.

![UJES Overall Architecture](../../images/ch4/ujes_overall_architecture_diagram.png)<br/>

As shown in the graph above, the UJES framework, which is located between the upper and lower computing application systems, is the managerial role of the user operation, encapsulates data storage, computing and other functions of the large data cluster, provides a uniform operational submission framework, and users no longer need to distinguish between types such as spark or hive, but only to UJES, can properly put clusters at their own service and save for significant learning costs for users.

## 3 Logical architecture

The UJES's logical framework is designed based on the prevailing microservice architecture model.

The micro-service framework promotes the division of back-office services into a small group of services, which are coordinated and mutually reinforcing.

Minor scale communication mechanisms are used between micro-services and micro-services (usually HTTP-based Retful API).

This architecture model has the advantages of logic, simple deployment, extension, technical isomers, and high reliability.

The logical structure of UJES is shown in figure 3.1.

![UJES Logical Architecture](../../images/ch4/ujes_logical_architecture_diagram.png)<br/>

### 3.1 UJES Operational Main Process

A full example of the main process of describing the operation of the UJES project and the functionality of the diagram microservice component will be described in more detail after the main process.

- **1. user submission assignment, gateway forwarding**

  User A submits its own major data assignment to UJES's gateway microservice, such as through Restful or Websocket, which will forward users' requests to the specified entrance microservice in accordance with the specified type of operation, if the user submits a spark-sql code, the gateway will submit the assignment to Spark's entrance microservice.

  Since the access microservice can be deployed in multiple cases, the gateway is transferred to suitable microservices examples in accordance with the strategy of carrying equilibrium.

- **2.Entry procedure for parsing, checking**

  Once the user's job is forwarded to Spark's entrance microservice, the parser in the entrance resolves the user's submitted job into a running task and the persistent task is perpetuated into the database.

  Pre-set interceptors also perform custom variable replacements, malicious code checks, etc. of scripts.

  If a user's request is blocked, his code will not be submitted to the cluster for execution.

- **Setup for listener**

  Information generated by the operation of the task will need to be processed once it is produced, such as display to the user or perpetuation to the database, which generally requires the use of event aggregates and listeners, and therefore various types of listeners for the task.

- **4.Task Access Scheduler**

  Once the task is generated, it will enter the scheduler pending schedule.

  The core concept in the Scheduler is the consumer queue, which is identified by the consumer group, which is usually identified by both the user's system and the user, and the consumer group can be marked Test_Anna, if the user submits a task to UJES in the system Test.

  Once the task enters the scheduler it is placed in a different consumer queue waiting for the schedule, based on the group identifier.

  Consumer queue threads are generally implemented in a single thread.

- **Application management micro-service work - providing implementation engine**

  Once the task is deployed, the entrance microservice will require an application for implementation through the engine application to the application management microservice.

  The application management microservice will see whether there are engines that users can use in the cluster based on the user's consumer group information. If there is an implementation engine that can be used by the consumer group, the information from the engine will be returned to the entrance microservice and the entrance microservice will refer the task to the executive engine for implementation.

  If the application management microservice finds that there is no engine that the group can use in the cluster, a new implementation engine will be requested from the Engine Manager microservices.

  The consumption thread of the entrance microservice will wait until the app manages the microservice return engine for information that is successful, failed, or timed out.

- **6. Engine Manager Microservice - Start and Manage Engine**

  Engine manager microservice is a microservice that initiates and manages the execution engine.

  When the engine manager receives a request to launch a new engine for the application management microservice, the request will carry user's consumer group information. The engine manager will apply for resources from the resource manager based on the consumer group information. If the user still has sufficient resources, the resource manager will allow the engine manager to start a new engine for the user and broadcast to the application management service microservice.

- **7. Access microservice submission task to execution engine**

  After step 7, the application management microservice has acquired information on the newly launched engine, and the application management microservice returns information from the engine to the entrance microservice, which then submits tasks to the change engine.

- **8. Entrance interaction with engine**

  Once the task is submitted to the implementation engine, the task is run with logs, progress and results information, which is returned to the entrance micro service through the RPC. The return information is carried with the unique identification information of the mission, which is correctly processed by the entrance microservice.

- **Completion of the task**

  Once the task is run on the execution engine, the successful or failed state information is returned to the entrance microservice. After the task status in the entrance microservice, the consumer queue will continue to consume tasks in the queue.

### 3.2 Details of the architecture and optimization

In addition to the main processes described in sub-section 3.1, UJES has its own processes for cluster management and performance enhancement.

- **Task classification and diverse consumption patterns**

  Mandates can be categorized according to their own characteristics: completely new missions, retrial missions, duplication of tasks, etc.

  A new task is a new task submitted by the user, a retry task is a task that requires a retry to run a failure in certain circumstances, and a duplication of tasks is a task that is consistent with previous submissions.

  After the task enters the scheduler consumer queue, if it is a new task, it will enter the Consumer's (Consumer) of FIFO for consumption and, in case of duplication, will enter ReUse's consumer for consumption, which will do much more than FIFO and return the results of the previous task to the user.

- **Control of co-generation of engines**

  In UJES, an engine that a user can start is controlled, e.g. a user can start up up to three Spark engines.The control of concomitant traffic is ensured by the combination of microservices and microservices for resource managers.

  At most three active tasks per user in the access microservice will be used, so that only three engines will be used.The resource management microservice also provides assurances that if a user is to launch a fourth engine, the engine manager needs to request resources from the resource management microservice, the resource management microservice will refuse to provide resources to that user on the grounds that the number of engines exceeds the limit and the fourth engine will fail.

- **3. Execute engine heart and unhealthy engines**

  The application management microservice needs to perform a core leapfrogging with engines after they get information on the engine to ensure that the engine process is still alive.

  If the engine does not jump back for a period of time, it will be added to the unhealthy engine, so they will not be used when requesting the engine.

- **4. Natural demise of engines and active killing by users**

  The presence of engines will take up cluster resources, particularly the Spark engine, which will take more queue resources, so if the engine manager detects that an execution engine is not used for a long time, then it will be necessary to kill the engine, free the resources of the cluster, and then broadcast to the application manager after the correct killing of the engine.

  Users will also be willing to be active when using UJES. Users will submit a request to the gateway, the gateway will be forwarded to the engine manager, and the engine manager will kill the engine.

- **Tenant segregation**

  Multi-Tenant segregation is an important function of the Big Data Functional Platform, and UJES is structurally supportive of multi-tenant segregation, in conjunction with the Hadoop Ecoosphere component.

  User assignments are performed on the execution engine, and UJES's Resource Management Microservice switches to the user to execute system commands when launching a new execution engine, so that the execution engine process is the user's permission, which is completely isolated from engines initiated by other users, thus realizing the multi-tenant separation function.

- **Smart diagnosis**

  Smart Diagnostics is a UJES-fine-tuned module where large data operations are often performed with a large amount of data for calculations, as well as a large amount of resources in the cluster and a longer time for an operation.

  Users always want to receive feedback from clusters, such as whether data are tilted and whether queue resources are sufficient.

  Smart diagnostics are designed for this need, and diagnostic modules can analyze the resources and data of the user's job when the job is running, and transmit the content of the analysis to the user in real time.

## 4 Interface Design

### 4.1 External Interface Design

UJES External Interface means interfaces with users and clusters.

- **1 User Interface**

  UJES’s user access to UJES is usually in Retful and WebSocket.

  Users are required to encapsulate their requests into Json in the prescribed format, and then submit their requests through the post system.

  It is recommended that users access UJES using a web-based approach.The regulation of data exchange will be given after the text.

- **2 Cluster interface**

  UJES's interaction with clusters is determined by engine type.

  As shown in figure 2.1, UJES's implementation engine cuts across the UJES and cluster levels.

  As an example, the Spark execution engine interacts with clusters through the Driver API provided by Spark.

  When using the UJES framework, users can interface with clusters or other server resources according to their needs and characteristics.

### 4.2 Framework interface design

UJES serves as a framework in which framework developers can access development according to their needs.

Access to the framework is generally based on SDK, and the UJES framework needs to be implemented for the following interfaces after users have introduced the SDK to UJES via dependency management such as Maven or gradle.

1) Access interface to entrance microservices

2) Engine Manager Access Interface

3) Engine Access Interface

Allows you to view the UJES's access document.

### 4.3 Internal Functional Module Interface Design

Interactions between UJES internal functionality modules are based on the Fign-based RPC method. Linkis RPC schema please[click here](architecture/commons/rpc.md)

UJES's Entrance, EngineManager and Engineering all communicate via Linkis PRC.

In particular, the interaction between Entrance and Engineering.Entrance sends user requests via Sender to Engine's Receiver, Engine Receiver, saves the Sender, the sender of the sending terminal, and submits the executing user's request to send the message back to Entrance once the log/progress/state is in place.

![RPC Framework](../../images/ch4/rpc_framework.png)<br/>

## 5 Deployment structure

### 5.1 Traditional modes of deployment

Please view the[rapid deployment document](deployment/quick-deploy.md).


