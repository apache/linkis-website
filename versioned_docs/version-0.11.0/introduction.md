---
title: Introduction
sidebar_position: 0
---

> Linkis is an open source for micro-banks that addresses connectivity, access and reuse issues between front-office tools, applications, and various computing storage engines.

## Introduction

Linkis Github repo: https://github.com/apache/incubator-linkis

Linkis, a single computing storage engine such as Spark, TiSpark, Hive, Python and HBase, provides a unified REST/WebSocket/JDBC interface to submit data intermediaries for implementation of SQL, Pyspark, HiveQL, Scala.

Linkis, based on microservice structures, provides enterprise-level features such as financial multi-tenant segregation, resource controls, segregation of competencies, supports uniform variables, UDF, functionality, user resource document management, high-parallel, high-performance and high-availability large data operations/requests for life-cycle management capabilities.

## Background

The widespread use of large data technologies has led to a proliferation of upper-tier applications and lower computing engines.

Business needs are met through the introduction of multiple open source components, and the continuous updating and enrichment of the large data platform architecture is a common practice for almost all enterprises at this stage.

As shown in the graph below, when our upper-tier applications, tool systems and bottom computing storage components become more frequent, the entire data platform becomes a network structure as shown above.
<br/>

![Raw Data Ecological Map](images/big_data_ecological_map.jpg)

<br/>

Continuously introducing new components to achieve business needs, more and more pain points have also arisen:

1. Business needs vary from one end to another, upper layers of components are unique and users use them to break up with a strong sense of fragmentation and high learning costs.

2. The diversity of data, the complexity of storing and computing is such that a component usually solves only one problem and developers must have a well-developed technical stack.

3. The introduction of new components, such as multiple tenants segregation, user resource management and user permissions management, are not compatible with pre-existing data platforms, and customized development from the top down, not only works large but also replicates rotates.

4. The upper-tier application directly interfaces the bottom computing storage engine and will directly affect the normal use of business products as soon as the background changes occur.

## Original design intention

How to provide a uniform data intermediary, block all calls and usage details from the bottom, and really get business users to focus only on the realization of the business, even if the extension and overall relocation of the bottom platform is not affected, the Linkis's original design!

![Linkis Solution](images/solution.jpg)

## Technical architecture

![Technical architecture](images/ch4/ujes/technical_architecture_diagram.png)


As shown in the graph above, we have created several new microservice clusters based on SpringCloud microservice technology to build Linkis's intermediate capacity as well.

Each microservice cluster assumes a part of the functional responsibilities of the system, which we have clearly delineated as follows.e.g.：

- **Unified job execution service**：A distributed REST/WebSocket service to receive various access requests from the parent system.

  **Currently supported computing engines have**：Spark, Python, TiSpark, Hive and Shell.

  **Supported script languages include**：SparkSQL, Spark Scala, Pyspark, R, Python, HQL and Shell;


- **Resource management service**： supports real-time control of resource use by each system and user, limits resource usage and confluence of systems and users, and provides real-time resource dynamics graphs to facilitate access to and management of system and user resources;

  **Currently supported resource types**：Yarn queue resources, servers (CPU and memory), number of concurrent users etc.


- **Unified storage service**：Universal IO, capable of fast interfacing various storage systems, providing a uniform call entry, supporting all commonly used formats, having a high degree of integration, simple usage;


- **Unified context service**：Unify user and system resource files (user script, JAR, ZIP, Properties, etc.), for users, systems, computing engine parameters and variable management in one setting, automatically reference;


- **Repository services**：Systems and user level material management, shared and flowed to support automatic management throughout the life cycle;


- **Metadata service**：Real-time Hive Library Structure and Partition Show.


Building on the interaction of these microservice clusters, we have improved the way and process of external service across the large data platform.


## Business architecture

![Operational framework](images/ch4/ujes/business_architecture_diagram.png)

Name Explanation：

**1) Gateway gateway:**

 Plugins are enhanced based on Spring Cloud Gateway, adding more than 1 N support for front-end and background WebSocket Microservice ([detailed architecture implementation](architecture/websocket.md), mainly for parsing and routing users requests to specified microservices.

**2) Unified entry:**

 Unified entry is a job life cycle manager for a class of engines.

 Entrance manages the entire lifecycle of an operation from the receiving job, the assignment submission to the execution engine, the assignment execution feedback to the user and the assignment completion.

**3) Engine manager:**

 Engine managers manage the engine throughout its life cycle.

 It is responsible for requesting and locking resources from the resource management service and for instantiating new engines, as well as monitoring the life state of the engine.

**4) Execution Engine:**

 The execution engine is a microservice that truly executes user assignments. It is started by the engine manager.

 In order to enhance interaction, the execution engine interacts directly with the Unified Entrance and delivers the log, progress, status and results of the execution in real time to the Unified Entrance.

**5) Resource management services**

 Real-time controls the use of resources per system and per user, the use and actual load of the engine manager, and limits the use and concomitant use of resources by systems and users.

**6) Eureka**

 Eureka is the service discovery framework developed by Netflix, and SpringCloud is integrated into its subproject spring-cloud-netflix to achieve SpringCloud service discovery features.

 Eureka Client is built into each microservice and has access to Eureka Server and ability to find service in real time.


 ## Processes

 How does Linkis handle a SparkSQL submission from the parent system?

 ![Process time series](images/ch4/ujes/process_sequence_diagram.png)

 1. Users of the upper system submit a SQL, first passing through Gateway, Gateway, which resolves user requests and routes them to the appropriate Unified Entry Entrance

 2. The entry will first look for whether the user of the system has the available Spark engine service and, if so, will submit the request directly to the Spark Engine Service

 3. No Spark Engine service available, start finding features via Eureka service registration, get a list of all engine managers and get the actual load of engine managers by requesting RM in real time

 4. Entrance gets the lowest payload engine manager, starting to require the engine manager to start a Spark engine service

 5. The Engine Manager received a request and started asking the user under RM if the new engine could be started

 6. Start requesting resources and locking if you can start; otherwise return the failed exception gives Entrance

 7. Successfully locked the resource. Start the new spark engine service; return the new Spark engine to Entrance after successful startup

 8. When Entrance gets a new engine, start requesting SQL execution from the new engine

 9. Spark new engine received SQL requests, started submitting SQL to Yarn, and sent logs, progress and status to Entrance in real time

 10. Entrance delivers logs, progress and status to Gateway in real time

 11. Gateway Back Logs, Progress, and Status to Frontend

 12. Once SQL has been successfully executed, Engineering has taken the initiative to push the results set to Entrance, Entrance notifies the frontend to obtain the results.


 ## How to ensure high real-time

 It is well known that Spring Cloud is integrated as a communication tool between microservices.

 HTTP interface calls between Feign-based microservices only support an instance of random access to BMS under simple rules.

 But what does Linkis do to do with the implementation engine of Linkis, which can directly push logs, progress and status to the single entry for which it is requested?

 Linkis has implemented its own base RPC communication program based on Feign.

 ![Linkis RPC Architecture](images/ch4/rpc1.png)

 As shown in the graph above, we have encapsulated Sender and Receiver on the basis of Feign.

 Sender is directly available as a sender. Users can specify a microservice instance or randomly access it, and support broadcasts.

 Receiver, as the receiving end, requires users to implement the Receiver-interface to handle the true business logic.

 Sender offers three types of visits, as follows:：

 1. The ask method is the synchronous request response method, which requires the receiving end to be synchronized with the response;

 2. Send's method is syncing the request method, only for synchronizing sending requests to the receiving end and not requesting answers from the receiving end;

 3. Delivery is an asynchronous request method, as long as the process at the sending end does not exit, the request will be sent to the receiving end later through other threads.

## How to support high concurrency

Linkis designed 5 Asynchronous Message Queue and Thread Pools, with Jobs using less than 1 milliseconds per occupation to ensure that more than 10,000 + TPS Resident Job requests can be accepted per single entry.

![Full-asynchronous call thread pool](images/ch4/fully_asynchronous_call_thread_pool.png)

- **How can you improve the upper's request through?**

 Entrance WebSocket Processors, internalize a processing thread pool and handler queue to receive the top requests from Spring Cloud Gateway routes.

- **How to ensure that different users in different systems are segregated from one another?**

 Entrance Jobschedule, each user of each system has a dedicated thread to ensure isolation.

- **How to ensure job execution?**

 The Job Execution Pool is used only for the submission of Job, and once the Job is submitted to Engineering, the horse is placed in the Job's execution queue to ensure that each Job's occupation of the execution pool thread does not exceed 1 millisecond.

 The RPC requests the pool to receive and process engineered logs, progress, status and resultsets and to update the Job's information in real time.

- **How can Job's logs, progress, and status be pushed to the top of the system in real time?**

 WebSocket Send Pool, dedicated to processing Job's log, progress and state, and push information to the top system.

## User-Level Isolation and Scheduling Timeliness

Linkis has designed the Scheduler module, the group schedule consumption module that can be intelligently monitored and expanded to achieve Linkis’s high combined capacity.

![Group Scheduler Cost Architecture](images/ch4/commons/scheduler.png)


Each user of each system is grouped separately to ensure segregation at system level and user level.

Each consumer has an independent control thread, measuring the length of the consumer waiting queue, the number of events being implemented and the proportion of time spent growing.

The consumer conglomerates set thresholds and warning ratios for these indicators, and the control thread is immediately extended as soon as an indicator exceeds the threshold, and the ratio between or between indicators exceeds the limit (e.g., monitoring to the average implementation time is greater than the distribution interval parameter).

When extended, the above reference process is fully utilized, with a specific parameter being targeted and other parameters automatically extended.

## Summary

Linkis, as a data intermediary, has made many attempts and efforts to block details of lower level calls.

Like：Linkis, how to implement the Unified Storage Service?How can Linkis unify UDF, function and user variables?

Due to space limitations, this paper is no longer discussed in detail, and you are welcome to visit our[official network](https://linkis.apache.org/)：https://linkis.apache.org

Is there a set of truly open-source, self-developed and well-developed financial production environments and scenes that can be returned to the middle of data in the open source communities so that people can be relatively comfortable taking services for production, supporting financial-grade operations, and securing business-class characteristics?

**We want Linkis to be the answer.**

At the same time, we look forward to more community strength to work together to promote Linkis's growth.