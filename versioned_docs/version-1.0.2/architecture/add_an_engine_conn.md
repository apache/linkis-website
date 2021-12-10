---
title: Add an EngineConn
sidebar_position: 3
---
# How to add an EngineConn

Adding EngineConn is one of the core processes of the computing task preparation phase of Linkis computing governance. It mainly includes the following steps. First, client side (Entrance or user client) initiates a request for a new EngineConn to LinkisManager . Then LinkisManager initiates a request to EngineConnManager to start EngineConn based on demands and label rules. Finally,  LinkisManager returns the usable EngineConn to the client side.

Based on the figure below, let's explain the whole process in detail:

![Process of adding a EngineConn](/Images/Architecture/Add_an_EngineConn/add_an_EngineConn_flow_chart.png)

## 1. LinkisManger receives the requests from client side

**Glossary:**

- LinkisManager: The management center of Linkis computing governance capabilities. Its main responsibilities are:
  1. Based on multi-level combined tags, provide users with available EngineConn after complex routing, resource management and load balancing.

  2. Provide EC and ECM full life cycle management capabilities.

  3. Provide users with multi-Yarn cluster resource management functions based on multi-level combined tags. It is mainly divided into three modules: AppManager, ResourceManager and LabelManager , which can support multi-active deployment and have the characteristics of high availability and easy expansion.

After the AM module receives the Client’s new EngineConn request, it first checks the parameters of the request to determine the validity of the request parameters. Secondly, selects the most suitable EngineConnManager (ECM) through complex rules for use in the subsequent EngineConn startup. Next, it will apply to RM for the resources needed to start the EngineConn, Finally, it will request the ECM to create an EngineConn.

The four steps will be described in detail below.

### 1. Request parameter verification

After the AM module receives the engine creation request, it will check the parameters. First, it will check the permissions of the requesting user and the creating user, and then check the Label attached to the request. Since in the subsequent creation process of AM, Label will be used to find ECM and perform resource information recording, etc, you need to ensure that you have the necessary Label. At this stage, you must bring the Label with UserCreatorLabel (For example: hadoop-IDE) and EngineTypeLabel ( For example: spark-2.4.3).

### 2. Select  a EngineConnManager(ECM)

ECM selection is mainly to complete the Label passed through the client to select a suitable ECM service to start EngineConn. In this step, first, the LabelManager will be used to search in the registered ECM through the Label passed by the client, and return in the order according to the label matching degree. After obtaining the registered ECM list, rules will be selected for these ECMs. At this stage, rules such as availability check, resource surplus, and machine load have been implemented. After the rule is selected, the ECM with the most matching label, the most idle resource, and the low load will be returned.

### 3. Apply resources required for EngineConn

1. After obtaining the assigned ECM, AM will then request how many resources will be used by the client's engine creation request by calling the EngineConnPluginServer service. Here, the resource request will be encapsulated, mainly including Label, the EngineConn startup parameters passed by the Client, and the user configuration parameters obtained from the Configuration module. The resource information is obtained by calling the ECP service through RPC.

2. After the EngineConnPluginServer service receives the resource request, it will first find the corresponding engine tag through the passed tag, and select the EngineConnPlugin of the corresponding engine through the engine tag. Then use EngineConnPlugin's resource generator to calculate the engine startup parameters passed in by the client, calculate the resources required to apply for a new EngineConn this time, and then return it to LinkisManager. 

   **Glossary:**

- EgineConnPlugin: It is the interface that Linkis must implement when connecting a new computing storage engine. This interface mainly includes several capabilities that this EngineConn must provide during the startup process, including EngineConn resource generator, EngineConn startup command generator, EngineConn engine connection Device. Please refer to the Spark engine implementation class for the specific implementation: [SparkEngineConnPlugin](https://github.com/WeBankFinTech/Linkis/blob/master/linkis-engineconn-plugins/engineconn-plugins/spark/src/main/scala/com/webank/wedatasphere/linkis/engineplugin/spark/SparkEngineConnPlugin.scala).
- EngineConnPluginServer: It is a microservice that loads all the EngineConnPlugins and provides externally the required resource generation capabilities of EngineConn and EngineConn's startup command generation capabilities.
- EngineConnResourceFactory: Calculate the total resources needed when EngineConn starts this time through the parameters passed in.
- EngineConnLaunchBuilder: Through the incoming parameters, a startup command of the EngineConn is generated to provide the ECM to start the engine.
3. After AM obtains the engine resources, it will then call the RM service to apply for resources. The RM service will use the incoming Label, ECM, and the resources applied for this time to make resource judgments. First, it will judge whether the resources of the client corresponding to the Label are sufficient, and then judge whether the resources of the ECM service are sufficient, if the resources are sufficient, the resource application is approved this time, and the resources of the corresponding Label are added or subtracted.

### 4. Request ECM for engine creation

1. After completing the resource application for the engine, AM will encapsulate the engine startup request, send it to the corresponding ECM via RPC for service startup, and obtain the instance object of EngineConn.
2. AM will then determine whether EngineConn is successfully started and become available through the reported information of EngineConn. If it is, the result will be returned, and the process of adding an engine this time will end.

## 2. ECM initiates EngineConn

**Glossary:**

- EngineConnManager: EngineConn's manager. Provides engine life-cycle management, and at the same time reports load information and its own health status to RM.
- EngineConnBuildRequest: The start engine command passed by LinkisManager to ECM, which encapsulates all tag information, required resources and some parameter configuration information of the engine.
- EngineConnLaunchRequest: Contains the BML materials, environment variables, ECM required local environment variables, startup commands and other information required to start an EngineConn, so that ECM can build a complete EngineConn startup script based on this.

After ECM receives the EngineConnBuildRequest command passed by LinkisManager, it is mainly divided into three steps to start EngineConn: 

1. Request EngineConnPluginServer to obtain EngineConnLaunchRequest encapsulated by EngineConnPluginServer. 
2.  Parse EngineConnLaunchRequest and encapsulate it into EngineConn startup script.
3.  Execute startup script to start EngineConn.

### 2.1 EngineConnPluginServer encapsulates EngineConnLaunchRequest

Get the EngineConn type and corresponding version that actually needs to be started through the label information of EngineConnBuildRequest, get the EngineConnPlugin of the EngineConn type from the memory of EngineConnPluginServer, and convert the EngineConnBuildRequest into EngineConnLaunchRequest through the EngineConnLaunchBuilder of the EngineConnPlugin.

### 2.2 Encapsulate EngineConn startup script

After the ECM obtains the EngineConnLaunchRequest, it downloads the BML materials in the EngineConnLaunchRequest to the local, and checks whether the local necessary environment variables required by the EngineConnLaunchRequest exist. After the verification is passed, the EngineConnLaunchRequest is encapsulated into an EngineConn startup script.

### 2.3 Execute startup script

Currently, ECM only supports Bash commands for Unix systems, that is, only supports Linux systems to execute the startup script.

Before startup, the sudo command is used to switch to the corresponding requesting user to execute the script to ensure that the startup user (ie, JVM user) is the requesting user on the Client side.

After the startup script is executed, ECM will monitor the execution status and execution log of the script in real time. Once the execution status returns to non-zero, it will immediately report EngineConn startup failure to LinkisManager and the entire process is complete; otherwise, it will keep monitoring the log and status of the startup script until The script execution is complete.

## 3. EngineConn initialization

After ECM executed EngineConn's startup script, EngineConn microservice was officially launched.

**Glossary:**

- EngineConn microservice: Refers to the actual microservices that include an EngineConn and one or more Executors to provide computing power for computing tasks. When we talk about adding an EngineConn, we actually mean adding an EngineConn microservice.
- EngineConn: The engine connector is the actual connection unit with the underlying computing storage engine, and contains the session information with the actual engine. The difference between it and Executor is that EngineConn only acts as a connection and a client, and does not actually perform calculations. For example, SparkEngineConn, its session information is SparkSession.
- Executor: As a real computing storage scenario executor, it is the actual computing storage logic execution unit. It abstracts the various capabilities of EngineConn and provides multiple different architectural capabilities such as interactive execution, subscription execution, and responsive execution.

The initialization of EngineConn microservices is generally divided into three stages:

1. Initialize the EngineConn of the specific engine. First use the command line parameters of the Java main method to encapsulate an EngineCreationContext that contains relevant label information, startup information, and parameter information, and initialize EngineConn through EngineCreationContext to complete the establishment of the connection between EngineConn and the underlying Engine, such as: SparkEngineConn will initialize one at this stage SparkSession is used to establish a connection relationship with a Spark application.
2. Initialize the Executor. After the EngineConn is initialized, the corresponding Executor will be initialized according to the actual usage scenario to provide service capabilities for subsequent users. For example, the SparkEngineConn in the interactive computing scenario will initialize a series of Executors that can be used to submit and execute SQL, PySpark, and Scala code capabilities, and support the Client to submit and execute SQL, PySpark, Scala and other codes to the SparkEngineConn.
3. Report the heartbeat to LinkisManager regularly, and wait for EngineConn to exit. When the underlying engine corresponding to EngineConn is abnormal, or exceeds the maximum idle time, or Executor is executed, or the user manually kills, the EngineConn automatically ends and exits.

----

At this point, The process of how to add a new EngineConn is basically over. Finally, let's make a summary:

- The client initiates a request for adding EngineConn to LinkisManager.
- LinkisManager checks the legitimacy of the parameters, first selects the appropriate ECM according to the label, then confirms the resources required for this new EngineConn according to the user's request, applies for resources from the RM module of LinkisManager, and requires ECM to start a new EngineConn as required after the application is passed.
- ECM first requests EngineConnPluginServer to obtain an EngineConnLaunchRequest containing BML materials, environment variables, ECM required local environment variables, startup commands and other information needed to start an EngineConn, and then encapsulates the startup script of EngineConn, and finally executes the startup script to start the EngineConn.
- EngineConn initializes the EngineConn of a specific engine, and then initializes the corresponding Executor according to the actual usage scenario, and provides service capabilities for subsequent users. Finally, report the heartbeat to LinkisManager regularly, and wait for the normal end or termination by the user.

