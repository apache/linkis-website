---
title: pipline engine
sidebar_position: 10
---

This article mainly introduces the configuration, deployment and use of pipline (>=1.1.0 version support) engine.

## 1 Environmental requirements

If you want to deploy the ‘pipline’ engine, you need to prepare a set of available pipline environments.

## 2 Configuration and deployment

### 2.1 Version selection and compilation
Note: before compiling the `pipline`engine, you need to compile the linkis project in full
Currently, the `pipline` engine needs to be installed and deployed by itself

This engine plug-in is not included in the published installation and deployment package by default,
You can follow this guide to deploy the installation https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin
Or manually compile the deployment according to the following process

Compile separately`pipline` 

```
${linkis_code_dir}/linkis-enginepconn-pugins/engineconn-plugins/pipline/
mvn clean install
```

### 2.2 Material deployment and loading

将 2.1 The engine package compiled in step, located in

```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/pipline/target/out/pipline
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

### 2.3 Engine label

Linkis1.XIt is carried out through labels, so it is necessary to insert data into our database. The insertion method is shown below.

[EngineConnPlugin Engine plug-in installation](deployment/engine_conn_plugin_installation.md) 


## 3 Use of engine

because`pipline`The engine is mainly used to import and export files. Now let's assume that importing files from a to B is the most introduced case

### 3.1 New script
Right click the workspace module and select Create a new workspace of type`storage`Script for

![](/Images-zh/EngineConnNew/new_pipline_script.png)

### 3.2 Script
A file importing script to B folder
```bash
from hdfs:///000/000/000/A.csv to file:///000/000/B/
```
- `from` grammar，`to`：grammar
- `hdfs:///000/000/000/A.csv`： Output file path
- `file:///000/000/B/`： Enter file path

B file import script to a folder
```bash
from hdfs:///000/000/000/B.csv to file:///000/000/A/
```
- `hdfs:///000/000/000/B.csv`： Output file path
- `file:///000/000/A/`： Enter file path

![](/Images-zh/EngineConnNew/to_write.png)
### 3.2 result
speed of progress

![](/Images-zh/EngineConnNew/job_state.png)

historical information
![](/Images-zh/EngineConnNew/historical_information.png)
