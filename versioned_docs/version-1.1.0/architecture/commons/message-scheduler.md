---
title: Message Scheduler Module
sidebar_position: 1
---
## 1 Overview
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis-RPC can realize the communication between microservices. In order to simplify the use of RPC, Linkis provides the Message-Scheduler module, which is annotated by @Receiver Analyze, identify and call. At the same time, it also unifies the use of RPC and Restful interfaces, which has better scalability.
## 2. Architecture description
## 2.1. Architecture design diagram
![Module Design Drawing](/Images/Architecture/Commons/linkis-message-scheduler.png)
## 2.2. Module description
* ServiceParser: Parse the (Object) object of the Service module, and encapsulate the @Receiver annotated method into the ServiceMethod object.
* ServiceRegistry: Register the corresponding Service module, and store the ServiceMethod parsed by the Service in the Map container.
* ImplicitParser: parse the object of the Implicit module, and the method annotated with @Implicit will be encapsulated into the ImplicitMethod object.
* ImplicitRegistry: Register the corresponding Implicit module, and store the resolved ImplicitMethod in a Map container.
* Converter: Start to scan the non-interface non-abstract subclass of RequestMethod and store it in the Map, parse the Restful and match the related RequestProtocol.
* Publisher: Realize the publishing scheduling function, find the ServiceMethod matching the RequestProtocol in the Registry, and encapsulate it as a Job for submission scheduling.
* Scheduler: Scheduling implementation, using Linkis-Scheduler to execute the job and return the MessageJob object.
* TxManager: Complete transaction management, perform transaction management on job execution, and judge whether to commit or rollback after the job execution ends.