---
title: Linkis-Client Architecture
sidebar_position: 4
---

Provide users with a lightweight client that submits tasks to Linkis for execution.

#### Linkis-Client architecture diagram

![img](/Images/Architecture/linkis-client-01.png)



#### Second-level module introduction

##### Linkis-Computation-Client

Provides an interface for users to submit execution tasks to Linkis in the form of SDK.

| Core Class | Core Function |
| ---------- | -------------------------------------- ---------- |
| Action | Defines the requested attributes, methods and parameters included |
| Result | Defines the properties of the returned result, the methods and parameters included |
| UJESClient | Responsible for request submission, execution, status, results and related parameters acquisition |

 

##### Linkis-Cli

Provides a way for users to submit tasks to Linkis in the form of a shell command terminal.

| Core Class | Core Function |
| ----------- | ------------------------------------- ----------------------- |
| Common | Defines the parent class and interface of the instruction template parent class, the instruction analysis entity class, and the task submission and execution links |
| Core | Responsible for parsing input, task execution and defining output methods |
| Application | Call linkis-computation-client to perform tasks, and pull logs and final results in real time |