---
title: EngineConn Metrics Reporting Feature
sidebar_position: 6
tags: [Feature]
---


## 1. Functional requirements
### 1.1 Requirement Background
The reported information lacks engine information, and the reported resources and progress interfaces are redundant, which reduces performance. It needs to be aligned for optimization and adjustment, and an extension module should be added to the reporting protocol.

### 1.2 Goals
- Added RPC protocol containing resources, progress, and additional information, supporting reporting of these information in one request
- Reconstruct existing resources and progress reporting links, and combine the actions of reporting related information into one request

## 2. Overall Design

This requirement involves the `linkis-entrance, linkis-computation-orchestrator, linkis-orchestrator-ecm-plugin, linkis-computation-engineconn` modules. Add and refactor the reporting information in the `computation-engineconn` module, and parse the information and store it on the entry side.

### 2.1 Technical Architecture

The engine information reporting architecture is shown in the figure. After the user submits the task to the entry, the entry applies to the linkismanager for an engine.
After applying to the engine, submit tasks to the application, and receive regular reports of tasks (resources, progress, status). Until the task is executed, the entry returns the final result when the user queries.
For this modification, the engine metrics information needs to be added to the entry into the database;
Combine Resource and Progress interface information in Orchestrator, and add additional information such as metrics;
On the ComputationEngineConn side of the interactive engine, the reported resources and progress information are combined, and engine statistics are additionally reported.

![engineconn-mitrics-1.png](/Images-zh/Architecture/EngineConn/engineconn-mitrics-1.png)


### 2.2 Business Architecture
This feature involves the following function point modules:

| First-level module | Second-level module | Function point |
| :------------ | :------------ | :------------ |
| Entrance | | Merge resource and progress interfaces; parse new engine metrics |
| Orchestrator | orchestrator-core | Merge resource and progress interfaces; handle TaskRunningInfo messages |
| Orchestrator | orchestrator-plugin-ecm | Resource and progress interfaces for merging monitor engine information |
| Orchestrator | computation-engineconn | Reporting interface for combining resources and progress; new reporting engine example metrics |


## 3. Module Design
### Core execution flow
-\[input] The input is the interactive engine `computation-engineconn`. When the engine executes a task, it reports the running information `TaskRunningInfo`, including the original `TaskProgressInfo` and `TaskResourceInfo`, and adds the engine example information and the information about the number of existing tasks of the engine.
- \[Processing process] `orchestrator-plugin-ecm` is responsible for monitoring the reporting information when the engine runs tasks, receiving the reporting information, and generating the `TaskRunningInfoEvent` asynchronous message,
  Sent to `OrchestratorAsyncListenerBus` for processing. The `TaskRunningInfoListener` registered to the `OrchestratorAsyncListener` receives the message, triggers the `listener` method, and calls back to the `TaskRunningInfo` callback method of the `Entrance` Job.
  The callback method parses the resource, progress, and engine `metrancs` information in `TaskRunningInfo` and persists them respectively.

![engineconn-mitrics-2.png](/Images-zh/Architecture/EngineConn/engineconn-mitrics-2.png)

## 4. Data structure

`RPC protocol TaskRunningInfo` has been added to the requirement, no db table has been added

## 5. Interface Design
No external interface

## 6. Non-functional design:
### 6.1 Security
RPC interface internal authentication, does not involve external security issues

### 6.2 Performance
Combined two RPC interfaces to reduce the number of reports and improve performance

### 6.3 Capacity
Less metrics information, no impact

### 6.4 High Availability
not involving







