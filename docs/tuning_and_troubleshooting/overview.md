---
title: Overview
sidebar_position: 1
---

## Tuning and troubleshooting

In the process of preparing for the release of a version, we will try our best to find deployment and installation problems in advance and then repair them. Because everyone has some differences in the deployment environments, we sometimes have no way to predict all the problems and solutions in advance. However, due to the existence of the community, many of your problems will overlap. Perhaps the installation and deployment problems you have encountered have already been discovered and solved by users. Therefore, for some problems that cannot be accurately located by themselves, the basic idea and priority of the recommended troubleshooting steps can be: **Search keywords in the community issue catalog —\>Check the "Q\&A Problem Summary" document in the community—\>Locate system log—\>Community user group consultation and communication—\>Locate source code and do remote debug**

### Ⅰ. How to locate the exception log

If an interface request reports an error, we can locate the problematic microservice based on the return of the interface. Under normal circumstances, we can **locate according to the URL specification. **URLs in the Linkis interface follow certain design specifications. That is, the format of **/api/rest_j/v1/{applicationName}/.+**, the application name can be located through applicationName. Some applications themselves are microservices. At this time, the application name is the same as the microservice name, and part of the application itself is a microservice, at this time, you should find the belonging microservice by the application name, and check the log under the corresponding microservice. The corresponding relationship between the microservice and the application name is given below.

| **ApplicationName** | **Microservice** |
| -------------------- | -------------------- |
| cg-linkismanager | cg-linkismanager |
| cg-engineplugin | cg-engineplugin |
| cg-engineconnmanager | cg-engineconnmanager |
| cg-entrance | cg-entrance |
| ps-bml | ps-bml |
| ps-cs | ps-cs |
| ps-datasource | ps-datasource |
| configuration | |
| instance-label | |
| jobhistory | ps-publicservice |
| variable | |
| udf | |

### Ⅱ. community issue column search keywords

On the homepage of the github community, the issue column retains some of the problems and solutions encountered by community users, which is very suitable for quickly finding solutions after encountering problems, just search for keywords that report errors in the filter filter.

### Ⅲ. "Q\&A Question Summary"

"Linkis 1.0 FAQ", this document contains a summary of common problems and solutions during the installation and deployment process.

### Ⅳ. Locating system log

Generally, errors can be divided into three stages: an error is reported when installing and executing install.sh, an error is reported when the microservice is started, and an error is reported when the engine is started.

1. **An error occurred when executing install.sh**, usually in the following situations

   1. Missing environment variables: For example, the environment of java/python/Hadoop/hive/spark needs to be configured under the standard version, and the corresponding verification operation will be performed when the script is installed. If you encounter this kind of problem, there will be a lot of problems. Clear prompts for missing environment variables, such as exception -bash
      spark-submit: command not found, etc.

   2. The system version does not match: Linkis currently supports most versions of Linux.
      The compatibility of the os version is the best, and some system versions may have command incompatibility. For example, the poor compatibility of yum in ubantu may cause yum-related errors in the installation and deployment. In addition, it is also recommended not to use windows as much as possible. Deploying linkis, currently no script is fully compatible with the .bat command.

   3. Missing configuration item: There are two configuration files that need to be modified in linkis1.0 version, linkis-env.sh and db.sh
   
      The former contains the environment parameters that linkis needs to load during execution, and the latter is the database information that linkis itself needs to store related tables. Under normal circumstances, if the corresponding configuration is missing, the error message will show an exception related to the Key value. For example, when db.sh does not fill in the relevant database configuration, unknow will appear mysql server host ‘-P’ is abnormal, which is caused by missing host.

2. **Report error when starting microservice**

    Linkis puts the log files of all microservices into the logs directory. The log directory levels are as follows:

    ````
    ├── linkis-computation-governance
    │ ├── linkis-cg-engineconnmanager
    │ ├── linkis-cg-engineplugin
    │ ├── linkis-cg-entrance
    │ └── linkis-cg-linkismanager
    ├── linkis-public-enhancements
    │ ├── linkis-ps-bml
    │ ├── linkis-ps-cs
    │ ├── linkis-ps-datasource
    │ └── linkis-ps-publicservice
    └── linkis-spring-cloud-services
    │ ├── linkis-mg-eureka
    └─├── linkis-mg-gateway
    ````

    It includes three microservice modules: computing governance, public enhancement, and microservice management. Each microservice contains three logs, linkis-gc.log, linkis.log, and linkis.out, corresponding to the service's GC log, service log, and service System.out log.
    
    Under normal circumstances, when an error occurs when starting a microservice, you can cd to the corresponding service in the log directory to view the related log to troubleshoot the problem. Generally, the most frequently occurring problems can also be divided into three categories:

    1.	**Port Occupation**: Since the default port of Linkis microservices is mostly concentrated at 9000, it is necessary to check whether the port of each microservice is occupied by other microservices before starting. If it is occupied, you need to change conf/ The microservice port corresponding to the linkis-env.sh file
    
    2.	**Necessary configuration parameters are missing**: For some microservices, certain user-defined parameters must be loaded before they can be started normally. For example, the linkis-cg-engineplugin microservice will load conf/ when it starts. For the configuration related to wds.linkis.engineconn.\* in linkis.properties, if the user changes the Linkis path after installation, if the configuration does not correspond to the modification, an error will be reported when the linkis-cg-engineplugin microservice is started.
    
    3.	**System environment is not compatible**: It is recommended that users refer to the recommended system and application versions in the official documents as much as possible when deploying and installing, and install necessary system plug-ins, such as expect, yum, etc. If the application version is not compatible, It may cause errors related to the application. For example, the incompatibility of SQL statements in the mysql5.7 version may cause errors in the linkis.ddl and linkis.dml files when initializing the db during the installation process. You need to refer to the "Q\&A Problem Summary" or the deployment documentation to make the corresponding settings.
    
3. **Report error during microservice execution period**

    The situation of error reporting during the execution of microservices is more complicated, and the situations encountered are also different depending on the environment, but the troubleshooting methods are basically the same. Starting from the corresponding microservice error catalog, we can roughly divide it into three situations:
    
    1. **Manually installed and deployed microservices report errors**: The logs of this type of microservice are unified under the log/ directory. After locating the microservice, enter the corresponding directory to view it.
    
    2. **engine start failure**: insufficient resources, request engine failure: When this type of error occurs, it is not necessarily due to insufficient resources, because the front end will only grab the logs after the Spring project is started, for errors before the engine is started cannot be fetched well. There are three kinds of high-frequency problems found in the actual use process of internal test users:
    
        a. **The engine cannot be created because there is no engine directory permission**: The log will be printed to the linkis.out file under the cg-engineconnmanager microservice. You need to enter the file to view the specific reason.
        
        b. **There is a dependency conflict in the engine lib package**, **The server cannot start normally because of insufficient memory resources: **Since the engine directory has been created, the log will be printed to the stdout file under the engine, and the engine path can refer to c
        
        c. **Errors reported during engine execution**: Each started engine is a microservice that is dynamically loaded and started during runtime. When the engine is started, if an error occurs, you need to find the corresponding log of the engine in the corresponding startup user directory. The corresponding root path is **ENGINECONN_ROOT_PATH** filled in **linkis-env** before installation. If you need to modify the path after installation, you need to modify wds.linkis.engineconn.root.dir in linkis.properties.
        
### Ⅴ. Community user group consultation and communication

For problems that cannot be resolved according to the above process positioning during the installation and deployment process, you can send error messages in our community group. In order to facilitate community partners and developers to help solve them and improve efficiency, it is recommended that when you ask questions, You can describe the problem phenomenon, related log information, and the places that have been checked are sent out together. If you think it may be an environmental problem, you need to list the corresponding application version together**. We provide two online groups: WeChat group and QQ group. The communication channels and specific contact information can be found at the bottom of the Linkis github homepage.

### Ⅵ. locate the source code by remote debug

Under normal circumstances, remote debugging of source code is the most effective way to locate problems, but compared to document review, users need to have a certain understanding of the source code structure. It is recommended that you check the [Linkis source code level detailed structure](https://github.com/WeBankFinTech/Linkis/wiki/Linkis%E6%BA%90%E7%A0%81%E5%B1%82%E7%BA%A7%E7%BB%93%E6%9E%84%E8%AF%A6%E8%A7%A3) in the Linkis WIKI before remote debugging.After having a certain degree of familiarity to the the source code structure of the project, after a certain degree of familiarity, you can refer to [How to Debug Linkis](https://github.com/WeBankFinTech/Linkis/wiki/Linkis%E5%92%8CDSS%E8%B0%83%E8%AF%95%E6%96%87%E6%A1%A3).