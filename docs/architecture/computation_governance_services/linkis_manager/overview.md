---
title: Overview
sidebar_position: 1
---

LinkisManager Architecture Design
====================
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As an independent microservice of Linkis, LinkisManager provides AppManager (application management), ResourceManager (resource management), and LabelManager (label management) capabilities. It can support multi-active deployment and has the characteristics of high availability and easy expansion.  
## 1. Architecture Diagram
![Architecture Diagram](/Images-zh/Architecture/LinkisManager/LinkisManager-01.png)  
### Noun explanation
- EngineConnManager (ECM): Engine Manager, used to start and manage engines.
- EngineConn (EC): Engine connector, used to connect the underlying computing engine.
- ResourceManager (RM): Resource Manager, used to manage node resources.
## 2. Introduction to the second-level module
### 2.1. Application management module linkis-application-manager
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AppManager is used for unified scheduling and management of engines:  
| Core Interface/Class | Main Function |
|------------|--------|
|EMInfoService | Defines EngineConnManager information query and modification functions |
|EMRegisterService| Defines EngineConnManager registration function |
|EMEngineService | Defines EngineConnManager's creation, query, and closing functions of EngineConn |
|EngineAskEngineService | Defines the function of querying EngineConn |
|EngineConnStatusCallbackService | Defines the function of processing EngineConn status callbacks |
|EngineCreateService | Defines the function of creating EngineConn |
|EngineInfoService | Defines EngineConn query function |
|EngineKillService | Defines the stop function of EngineConn |
|EngineRecycleService | Defines the recycling function of EngineConn |
|EngineReuseService | Defines the reuse function of EngineConn |
|EngineStopService | Defines the self-destruct function of EngineConn |
|EngineSwitchService | Defines the engine switching function |
|AMHeartbeatService | Provides EngineConnManager and EngineConn node heartbeat processing functions |

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The process of applying for an engine through AppManager is as follows:  
![AppManager](/Images-zh/Architecture/LinkisManager/AppManager-01.png)  
### 2. Label management module linkis-label-manager
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LabelManager provides label management and analysis capabilities.  
| Core Interface/Class | Main Function |
|------------|--------|
|LabelService | Provides the function of adding, deleting, modifying and checking labels |
|ResourceLabelService | Provides resource label management functions |
|UserLabelService | Provides user label management functions |  
The LabelManager architecture diagram is as follows:  
![ResourceManager](/Images-zh/Architecture/LinkisManager/ResourceManager-01.png)  
### 4. Monitoring module linkis-manager-monitor
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monitor provides the function of node status monitoring.
