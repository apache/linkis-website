---
title: Introduction to Linkis Configuration Parameters
sidebar_position: 1
---

## 1. Parameter classification

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis parameters are mainly divided into the following three parts:
1. Linkis server parameters, mainly including the parameters of Linkis itself and the parameters of Spring
2. Parameters submitted by client calls such as Linkis SDK and Restful
3. Linkis console parameters


## 2. Linkis server parameters

1. Parameters of Linkis itself
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The parameters of linkis itself can be set in the configuration file, or through environment variables and system properties. It is recommended to use the configuration file to set.
   The Linkis configuration file format is as follows:
```shell
├── conf configuration directory
│ ├── application-eureka.yml
│ ├── application-linkis.yml
│ ├── linkis-cg-engineconnmanager-io.properties
│ ├── linkis-cg-engineconnmanager.properties
│ ├── linkis-cg-engineplugin.properties
│ ├── linkis-cg-entrance.properties
│ ├── linkis-cg-linkismanager.properties
│ ├── linkis.properties ── linkis global properties
│ ├── linkis-ps-bml.properties
│ ├── linkis-ps-cs.properties
│ ├── linkis-ps-datasource.properties
│ ├── linkis-ps-publicservice.properties
│ ├── log4j2.xml
````
Each service loads two property configuration files, a common main configuration file linkis.properties, and a service configuration file linkis-serviceName.properties. The priority of settings is that the service profile is higher than the main profile
It is recommended that common parameters be placed in the main configuration file, and individual configuration files are placed in the service configuration file

2. Spring parameters
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis service is based on SpringBoot application, Spring related parameters can be set in application-linkis.yml or in linkis configuration file. The configuration in the linkis configuration file needs to be prefixed with spring. as follows:

```shell
# spring port default
server.port=9102
# in linkis conf need spring prefix
spring.server.port=9102

````

## 3. Linkis client parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis client parameters mainly refer to the parameters when the task is submitted, mainly the parameters specified in the submission interface.
1. How restful sets parameters:

```shell
{
    "executionContent": {"code": "show tables", "runType": "sql"},
    "params": { // submit parameters
                        "variable":{ //Custom variables needed in the code
                                "k1":"v1"
                        },
                        "configuration":{
                                "special":{ //Special configuration parameters such as log path, result set path, etc.
                                        "k2":"v2"
                                },
                                "runtime":{ //Runtime parameters, execution configuration parameters, such as database connection parameters of JDBC engine, data source parameters of presto engine
                                        "k3":"v3"
                                },
                                "startup":{ //Startup parameters, such as memory parameters for starting EC, spark engine parameters, hive engine parameters, etc.
                                        "k4":"v4" For example: spark.executor.memory:5G Set the Spark executor memory, the underlying Spark, hive and other engine parameters keyName are consistent with the native parameters
                                }
                        }
                },
    "labels": { //Label parameters, support setting engine version, user and application
        "engineType": "spark-2.4.3",
        "userCreator": "hadoop-IDE"
    }
}
````
2. How to set parameters in SDK:

````java
JobSubmitAction jobSubmitAction = JobSubmitAction.builder()
                .addExecuteCode(code)
                .setStartupParams(startupMap) //Startup parameters, such as memory parameters for starting EC, spark engine parameters, hive engine parameters, etc., such as: spark.executor.memory:5G Set the Spark executor memory, the underlying Spark, hive and other engine parameters keyName is the same as the original parameter
                .setRuntimeParams(runTimeMap) //Engine, execute configuration parameters, such as database connection parameters of JDBC engine, data source parameters of presto engine
                .setVariableMap(varMap) //Custom variables needed in the code
                .setLabels(labels) //Label parameters, support setting engine version, user and application, etc.
                .setUser(user) //submit user
                .addExecuteUser(user) // execute user
                .build();
````
3. How linkis-cli sets parameters

```shell
linkis-cli -runtieMap key1=value -runtieMap key2=value
          -labelMap key1=value
          -varMap key1=value
          -startUpMap key1=value

````
Note: When submitting client parameters, only engine-related parameters, tag parameters, and Yarn queue settings can take effect. Other Linkis server-side parameters and resource limit parameters, such as task and engine concurrency parameters wds.linkis.rm.instances do not support task settings

4. Common label parameters:

```shell
    Map<String, Object> labels = new HashMap<String, Object>();
     labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // Specify engine type and version
     labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-IDE");// Specify the running user and your APPName
     labels.put(LabelKeyConstant.CODE_TYPE_KEY, "sql"); // Specify the type of script to run: spark supports: sql, scala, py; Hive: hql; shell: sh; python: python; presto: psql
     labels.put(LabelKeyConstant.JOB_RUNNING_TIMEOUT_KEY, "10000");//The job runs for 10s and automatically initiates Kill, the unit is s
     labels.put(LabelKeyConstant.JOB_QUEUING_TIMEOUT_KEY, "10000");//The job is queued for more than 10s and automatically initiates Kill, the unit is s
     labels.put(LabelKeyConstant.RETRY_TIMEOUT_KEY, "10000");//The waiting time for the job to retry due to resources and other reasons, the unit is ms. If it fails due to insufficient queue resources, it will initiate 10 retries at intervals by default
     labels.put(LabelKeyConstant.TENANT_KEY,"hduser02");//Tenant label, if the tenant parameter is specified for the task, the task will be routed to a separate ECM machine
     labels.put(LabelKeyConstant.EXECUTE_ONCE_KEY,"");//Execute the label once, this parameter is not recommended to be set. After setting, the engine will not reuse the task and the engine will end after running. Only a certain task parameter can be specialized. set up
````

## 4. Linkis console parameters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis management console parameters are convenient for users to specify resource limit parameters and default task parameters. The web interface provided is as follows:
Global configuration parameters:
![](/Images/development/linkis_global_conf.png)
It mainly includes the global queue parameter [wds.linkis.rm.yarnqueue], the Yarn queue used by the task by default, which can be specified in the client StartUPMap.
Resource limit parameters, these parameters do not support task settings, but can be adjusted by the management console.
```shell
Queue CPU usage upper limit [wds.linkis.rm.yarnqueue.cores.max], currently only supports limit the usage of total queue resources for Spark type tasks
Queue memory usage limit [wds.linkis.rm.yarnqueue.memory.max]
The upper limit of the global memory usage of each engine [wds.linkis.rm.client.memory.max] This parameter does not refer to the total memory that can only be used, but specifies the total memory usage of a specific engine of a Creator, such as limiting the IDE-SPARK task to only Can use 10G memory
The maximum number of global engine cores [wds.linkis.rm.client.core.max] This parameter does not refer to the total number of CPUs that can only be used, but specifies the total memory usage of a specific engine of a Creator, such as limiting IDE-SPARK tasks Can only use 10Cores
The maximum concurrent number of each engine in the world [wds.linkis.rm.instance], this parameter has two meanings, one is to limit how many a Creator-specific engine can start in total, and to limit the tasks that a Creator-specific engine task can run at the same time number
````
Engine configuration parameters:
![](/Images/development/linkis_creator_ec_conf.png)
It mainly specifies the startup parameters and runtime parameters of the engine. These parameters can be set on the client side. It is recommended to use the client side for personalized submission settings. Only the default values ​​are set on the page.