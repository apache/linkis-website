EngineConnManager architecture design
-------------------------

EngineConnManager (ECM): EngineConn's manager, provides engine lifecycle management, and reports load information and its own health status to RM.
###  ECM architecture

![](Images/ECM-01.png)

###  Introduction to the second-level module

**Linkis-engineconn-linux-launch**

The engine launcher, whose core class is LinuxProcessEngineConnLauch, is used to provide instructions for executing commands.

**Linkis-engineconn-manager-core**

The core module of ECM includes the top-level interface of ECM health report and EngineConn health report function, defines the relevant indicators of ECM service, and the core method of constructing EngineConn process.

| Core top-level interface/class     | Core function                                                            |
|------------------------------------|--------------------------------------------------------------------------|
| EngineConn                         | Defines the properties of EngineConn, including methods and parameters   |
| EngineConnLaunch                   | Define the start method and stop method of EngineConn                    |
| ECMEvent                           | ECM related events are defined                                           |
| ECMEventListener                   | Defined ECM related event listeners                                      |
| ECMEventListenerBus                | Defines the listener bus of ECM                                          |
| ECMMetrics                         | Defines the indicator information of ECM                                 |
| ECMHealthReport                    | Defines the health report information of ECM                             |
| NodeHealthReport                   | Defines the health report information of the node                        |

**Linkis-engineconn-manager-server**

The server side of ECM defines top-level interfaces and implementation classes such as ECM health information processing service, ECM indicator information processing service, ECM registration service, EngineConn start service, EngineConn stop service, EngineConn callback service, etc., which are mainly used for ECM to itself and EngineConn Life cycle management, health information reporting, heartbeat sending, etc.
Core Service and Features module are as follows:

| Core service                    | Core function                                        |
|---------------------------------|-------------------------------------------------|
| EngineConnLaunchService         | Contains core methods for generating EngineConn and starting the process          |
| BmlResourceLocallizationService | Used to download BML engine related resources and generate localized file directory |
| ECMHealthService                | Report your own healthy heartbeat to AM regularly                      |
| ECMMetricsService               | Report your own indicator status to AM regularly                      |
| EngineConnKillSerivce           | Provides related functions to stop the engine                          |
| EngineConnListService           | Provide caching and management engine related functions                    |
| EngineConnCallBackService       | Provide the function of the callback engine                              |


