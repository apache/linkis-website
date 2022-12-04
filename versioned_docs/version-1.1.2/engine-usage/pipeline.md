---
title: pipeline engine
sidebar_position: 10
---

This article mainly introduces the configuration, deployment and use of pipeline (>=1.1.0 version support) engine.


## 1. Configuration and deployment

### 1.1 Version selection and compilation
Note: before compiling the `pipeline`engine, you need to compile the linkis project in full
Currently, the `pipeline` engine needs to be installed and deployed by itself

This engine plug-in is not included in the published installation and deployment package by default,
You can follow this guide to deploy the installation https://linkis.apache.org/blog/2022/04/15/how-to-download-engineconn-plugin
Or manually compile the deployment according to the following process

Compile separately`pipeline` 

```
${linkis_code_dir}/linkis-enginepconn-pugins/engineconn-plugins/pipeline/
mvn clean install
```

### 1.2 Material deployment and loading

The engine package compiled in step 1.1 is located in

```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/pipeline/target/out/pipeline
```
Upload to the engine directory of the server

```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```

And restart the `linkis engineplugin` to refresh the engine
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
Or refresh through the engine interface. After the engine is placed in the corresponding directory, send a refresh request to the `linkis CG engineconplugin service` through the HTTP interface.
- Interface`http://${engineconn-plugin-server-IP}:${port}/api/rest_j/v1/rpc/receiveAndReply`

- Request mode `POST`

```json
{
  "method": "/enginePlugin/engineConn/refreshAll"
}
```
Check whether the engine is refreshed successfully: if you encounter problems during the refresh process and need to confirm whether the refresh is successful, you can view the`linkis_engine_conn_plugin_bml_resources`Of this table`last_update_time`Whether it is the time when the refresh is triggered.

```sql
#Log in to the database of linkis
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

### 1.3 Engine label

Linkis1.XIt is carried out through labels, so it is necessary to insert data into our database. The insertion method is shown below.

[EngineConnPlugin Engine plug-in installation](../deployment/engine-conn-plugin-installation) 


## 2. Use of engine

### 2.1 Task submission via linkis cli

Link 1.0 provides cli to submit tasks. We only need to specify the corresponding enginecon and codetype tag types. The use of pipeline is as follows:
- Note that the enginetype pipeline-1 engine version setting is prefixed. If the pipeline version is V1 , it is set to pipeline-1 
```shell
sh bin/linkis-cli -submitUser  hadoop  -engineType pipeline-1  -codeType pipeline  -code "from hdfs:///000/000/000/A.dolphin  to file:///000/000/000/B.csv"
```
from hdfs:///000/000/000/A.dolphin  to file:///000/000/000/B.csv 3.3 Explained

For specific use, please refer to： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).

because`pipeline`The engine is mainly used to import and export files. Now let's assume that importing files from a to B is the most introduced case

### 2.2 New script
Right click the workspace module and select Create a new workspace of type`storage`Script for

![](/Images-zh/EngineConnNew/new_pipeline_script.png)

### 2.3 Script

##### Syntax is：from path to path

The syntax is file copy rule:`dolphin`Suffix type files are result set files that can be converted to`.csv`Type and`.xlsx`Type file, other types can only be copied from address a to address B, referred to as handling

```bash
#dolphin type
from hdfs:///000/000/000/A.dolphin to file:///000/000/000/B.csv
from hdfs:///000/000/000/A.dolphin to file:///000/000/000/B.xlsx

#Other types
from hdfs:///000/000/000/A.txt to file:///000/000/000/B.txt
```


A file importing script to B folder
```bash
from hdfs:///000/000/000/A.csv to file:///000/000/B/
```
- `from` grammar，`to`：grammar
- `hdfs:///000/000/000/A.csv`：Input file path
- `file:///000/000/B/`： Output path

file B is exported as file A
```bash
from hdfs:///000/000/000/B.csv to file:///000/000/000/A.CSV
```
- `hdfs:///000/000/000/B.csv`： Input file path
- `file:///000/000/000/A.CSV`： Output file path

![](/Images-zh/EngineConnNew/to_write.png)

Note: no semicolon is allowed at the end of the syntax; Otherwise, the syntax is incorrect.

### 2.4 result
speed of progress

![](/Images-zh/EngineConnNew/job_state.png)

historical information
![](/Images-zh/EngineConnNew/historical_information.png)
