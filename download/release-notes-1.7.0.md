---
title: Release Notes 1.7.0
sidebar_position: 87
---

Apache Linkis 1.7.0 version mainly adds the following features: Linkis's RPC function supports automatic retries, introduces the Spring boot Admin module for monitoring and managing Linkis services, EC supports setting the status to unhealthy and automatically exiting when idle, and adds containerized mode in the ECM service, allowing specific IPs and ports for communication with the outside world to be assigned to specific engines in this mode.

Main features include:

- Spring suite upgraded to the latest secure version (Spring Cloud gateway(3.1.8), Spring Boot(2.7.11))
- Orchestrator supports pluggable
- Result set storage supports switching to ORC and Parquet format storage
- Flink supports UDF functions
- Support for Doris engine
- Management console task dashboard function

Abbreviations:

- COMMON: Linkis Common
- ENTRANCE: Linkis Entrance
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM: Linkis Manager
- PS: Linkis Public Service
- PE: Linkis Public Enhancement
- RPC: Linkis Common RPC
- CG: Linkis Computation Governance
- DEPLOY: Linkis Deployment
- WEB: Linkis Web
- GATEWAY: Linkis Gateway
- EP: Engine Plugin
- ORCHESTRATOR: Linkis Orchestrator
- CLIENT: Linkis Client

## New Features

- Linkis's RPC function supports automatic retries
- Introduction of Spring boot Admin module for monitoring and managing Linkis services
- EC supports setting the status to unhealthy and automatically exiting when idle
- Added support for SparkMeasure in the Spark engine for better monitoring of Spark performance
- Added containerized mode in the ECM service, allowing specific IPs and ports for communication with the outside world to be assigned to specific engines in this mode

## Enhancements

- The management console actively kills corresponding idle engines after modifying the configuration, allowing parameters to take effect immediately
- Support for users to specify a fixed engine instance for execution in scripts
- Addition of system-built-in date variables, supporting run_today_h, etc.
- Front-end global history adds the ability to view running code
- The data source service adds an interface to return Hive libraries with write permissions under the user
- Public enhancement service operations on HDFS support using the administrator's FS
- Public enhancement service adds an interface to query the MD5 value of the result set file
- Linkis Manager engine Ask increases delayed scheduling to prevent excessive concurrent requests to the engine
- Tasks in the queue support timed printing of queue information to help confirm if the task is abnormally hanging
- Optimization of log printing when resources are insufficient, specifying the exact parameters users need to modify
- Engine reuse optimization, intelligently judging the resource parameters carried by the current task to avoid complex tasks reusing small resources
- Historical tasks set departmental administrator permissions only support viewing historical tasks submitted by personnel in their own department
- The front-end global history page supports filtering jobs by ECM machine
- The front-end resource panel page categorizes support for displaying by application
- User result set display optimization limits the number of display columns
- Result set error message optimization when a field exceeds 1w
- Pipeline CSV file export parameter configuration adds vertical bar, semicolon separators
- Engine instances add task ID tags for driver engine startup
- Support for passing task source information to Yarn layer labels
- Linkis client SDK query Hive data returns results adapted to Map, Array, Struct complex data types
- Front-end management console ECM table adds a remark field
- Front-end historical task interface optimization supports time range queries accurate to minutes
- Hive task log printing displays Yarn's application address information
- The view log interface openLog adds a file size limit of 30M
- A new interface is added to determine if the resources for the executing task are sufficient
- LinkisManager engine application is adjusted to asynchronous mode, which can significantly improve the concurrency of engine application
- Linkis management console supports engine log download function
- Trino engine task log printing cluster URL, including Trino's queryId in linkis's taskid
- Public enhancement service file operations support file directory moving
- Engine task log proactive push adds a record of user-initiated kill operations in the task log after the user actively kills the engine

## Bug Fixes

- Fixed the display issue of engine remaining resource data on the resource management page
- Fixed the occasional ThreadDeath issue in Spark engine tasks
- Optimized the error message提示 for abnormal data query in pyspark scripts
- The engine log entry function is only open to administrators
- Fixed the OOM issue caused by excessive single-line data in the result set
- Fixed the error in the status transition of tasks when canceling Spark Scala tasks
- Fixed the occasional error "Failed to create a single-machine Python interpreter" when reusing engines after canceling Python tasks
- Optimized the FullGC issue that may occur when the number of HDFS file users is too large
- Fixed the type conversion error when the decimal field returned by Trino/presto contains spaces

## Acknowledgements

The release of Apache Linkis 1.7.0 would not have been possible without the contributors to the Linkis community. Thank you to all community contributors.
