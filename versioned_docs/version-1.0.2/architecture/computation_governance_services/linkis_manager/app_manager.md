---
title: App Manager
sidebar_position: 3
---

## 1. Background
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Entrance module of the old version of Linkis is responsible for too much responsibilities, the management ability of the Engine is weak, and it is not easy to follow-up expansion, the AppManager module is newly extracted to complete the following responsibilities:  
1. Add the AM module to move the engine management function previously done by Entrance to the AM module.
2. AM needs to support operating Engine, including: adding, multiplexing, recycling, preheating, switching and other functions.
3. Need to connect to the Manager module to provide Engine management functions: including Engine status maintenance, engine list maintenance, engine information, etc.
4. AM needs to manage EM services, complete EM registration and forward the resource registration to RM.
5. AM needs to be connected to the Label module, including the addition and deletion of EM/Engine, the label manager needs to be notified to update the label.
6. AM also needs to dock the label module for label analysis, and need to obtain a list of serverInstances with a series of scores through a series of labels (How to distinguish between EM and Engine? the labels are completely different).
7. Need to provide external basic interface: including the addition, deletion and modification of engine and engine manager, metric query, etc.  
## Architecture diagram
![AppManager03](/Images-zh/Architecture/AppManager-03.png)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As shown in the figure above: AM belongs to the AppManager module in LinkisMaster and provides services.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New engine application flow chart:  
![AppManager02](/Images-zh/Architecture/AppManager-02.png)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From the above engine life cycle flow chart, it can be seen that Entrance is no longer doing the management of the Engine, and the startup and management of the engine are controlled by AM.  
## Architecture description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AppManager mainly includes engine service and EM service:
Engine service includes all operations related to EngineConn, such as engine creation, engine reuse, engine switching, engine recycling, engine stopping, engine destruction, etc.
EM service is responsible for information management of all EngineConnManager, and can perform service management on ECM online, including tag modification, suspension of ECM service, obtaining ECM instance information, obtaining ECM running engine information, killing ECM operation, and also according to EM Node information Query all EngineNodes, and also support searching by user, saving EM Node load information, node health information, resource usage information, etc.
The new EngineConnManager and EngineConn both support tag management, and the types of engines have also added offline, streaming, and interactive support.  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine creation: specifically responsible for the new engine function of the LinkisManager service. The engine startup module is fully responsible for the creation of a new engine, including obtaining ECM tag collections, resource requests, obtaining engine startup commands, notifying ECM to create new engines, updating engine lists, etc.
CreateEngienRequest->RPC/Rest -> MasterEventHandler ->CreateEngineService ->
->LabelContext/EnginePlugin/RMResourcevice->(RcycleEngineService)EngineNodeManager->EMNodeManager->sender.ask(EngineLaunchRequest)->EngineManager service->EngineNodeManager->EngineLocker->Engine->EngineNodeManager->EngineFactory=&gt;EngineService=&gt; ServerInstance
When creating an engine is the part that interacts with RM, EnginePlugin should return specific resource types through Labels, and then AM sends resource requests to RM.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine reuse: In order to reduce the time and resources consumed for engine startup, the principle of reuse must be given priority to the use of engines. Reuse generally refers to the reuse of engines that users have created. The engine reuse module is responsible for providing a collection of reusable engines. Election and lock the engine and start using it, or return that there is no engine that can be reused.
ReuseEngienRequest->RPC/Rest -> MasterEventHandler ->ReuseEngineService ->
->abelContext->EngineNodeManager->EngineSelector->EngineLocker->Engine->EngineNodeManager->EngineReuser->EngineService=>ServerInstance

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine switching: It mainly refers to the label switching of existing engines. For example, when the engine is created, it was created by Creator1. Now it can be changed to Creator2 by engine switching. At this time, you can allow the current engine to receive tasks with the tag Creator2.
SwitchEngienRequest->RPC/Rest -> MasterEventHandler ->SwitchEngineService ->LabelContext/EnginePlugin/RMResourcevice->EngineNodeManager->EngineLocker->Engine->EngineNodeManager->EngineReuser->EngineService=>ServerInstance.  
Engine manager: Engine manager is responsible for managing the basic information and metadata information of all engines.