---
title: CS Architecture
sidebar_position: 1
---

## **ContextService Architecture**

### **Horizontal Division**

Horizontally divided into three modules: Restful, Scheduler, Service

#### Restful Responsibilities:

    Encapsulate the request as httpjob and submit it to the Scheduler

#### Scheduler Responsibilities:

    Find the corresponding service through the ServiceName of the httpjob protocol to execute the job

#### Service Responsibilities:

    The module that actually executes the request logic, encapsulates the ResponseProtocol, and wakes up the wait thread in Restful

### **Vertical Division**
Vertically divided into 4 modules: Listener, History, ContextId, Context:

#### Listener responsibilities:

1. Responsible for the registration and binding of the client side (write to the database and register in the CallbackEngine)

2. Heartbeat interface, return Array[ListenerCallback] through CallbackEngine

#### History Responsibilities:
Create and remove history, operate Persistence for DB persistence

#### ContextId Responsibilities:
Mainly docking with Persistence for ContextId creation, update and removal, etc.

#### Context responsibility:

1. For removal, reset and other methods, first operate Persistence for DB persistence, and update ContextCache

2. Encapsulate the query condition and go to the ContextSearch module to obtain the corresponding ContextKeyValue data

The steps for requesting access are as follows:
![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-01.png)

## **UML Class Diagram**
![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-02.png)

## **Scheduler thread model**

Need to ensure that Restful's thread pool is not filled

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-03.png)

The sequence diagram is as follows:
![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-service-04.png)