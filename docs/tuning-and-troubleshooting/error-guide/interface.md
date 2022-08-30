---
title:  Interface error troubleshooting
sidebar_position: 3
---

How to quickly locate interfaces and query logs for interface errors

##  How to locate

###  1.Front end F12 interface error
**Error information troubleshooting**
![](/Images/tuning-and-troubleshooting/error-guide/errorMsg.png)
If an error message is found, press f12--network-- filter the request information fetch/xhr-- check the single request --priview-- locate the error reporting request

**Find URL**
![](/Images/tuning-and-troubleshooting/error-guide/findUrl.png)
Click the headers of a single request, and you will see general. Here you will see the request address:
>Request URL ：XXXXX /api/rest_j/v1/data-source-manager/op/connect/json

###  2. App name found
When an interface request reports an error, the URL specification locates the application name.
The linkis interface URL follows the design specification:
>/api/rest_j/v1/{applicationName}/.

ApplicationName is the application name. Find the microservice to which you belong through the application name, and view the log under the corresponding microservice.

####  Correspondence between application name and microservice

|ApplicationName|Microservice|
|:----:|:----:|
|linkismanager|cg-linkismanager|
|engineplugin|cg-engineplugin|
|cg-engineconnmanager|cg-engineconnmanager|
|entrance|cg-entrance|
|bml|ps-bml|
|contextservice|ps-cs|
|datasource|ps-datasource|
|configuration||
|microservice||
|jobhistory|ps-publicservice|
|variable||
|udf||


###  3. Find log path
The user service address is different. We need to locate the log address first
> ps -ef | grep  ps-datasource

![](/Images/tuning-and-troubleshooting/error-guide/logs.png)

- cg-linkismanager：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-linkismanager-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-linkismanager.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-linkismanager.out`

- cg-engineplugin：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineplugin-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineplugin.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineplugin.out`

- cg-engineconnmanager：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineconnmanager-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineconnmanager.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-engineconnmanager.out`

- cg-entrance：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-entrance-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-entrance.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-cg-entrance.out`

- ps-bml：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-bml-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-bml.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-bml.out`

- ps-cs：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-cs-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-cs.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-cs.out`

- ps-datasource：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-datasource-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-datasource.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-datasource.out`

- ps-publicservice：
>GC log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-publicservice-gc.log`
>
>Service log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-publicservice.log`
>
>System out log：` /${LINKIS_HOME}/logs/linkis/linkis-ps-publicservice.out`

###  4. view log
Display the error message corresponding to the interface

Find the request log, in which other services called by the service are displayed, or the logical logs processed in their own services are displayed
>tail -fn200 linkis-ps-data-source-manager.log

![](/Images/tuning-and-troubleshooting/error-guide/datasourcemanager.png)

**The above figure shows the logs of service calling other services. You can query the logs of other services based on this information**

**The following figure shows the service logs that actually report errors**

>tail -fn200 linkis-ps-metadataquery.log

![](/Images/tuning-and-troubleshooting/error-guide/errorMsgFromMeta.png)

Front end error reporting display

![](/Images/tuning-and-troubleshooting/error-guide/errorMsg.png)


### 5.Exception location
`ECMResourceClear failed, ecm current resource:bdpuje
s110003:9102{"instance":0,"memory":"0.0 B","cpu":0} org.apache.linkis.manager.exception.PersistenceErrorException: errCode: 210001 ,desc: label not found, this label may be removed a
lready. , ip: bdpujes110003 ,port: 9101 ,serviceKind: linkis-cg-linkismanager`

Where IP and port are the corresponding service addresses, and servicekind is the corresponding service name. If the RPC call log fails, you can use this information to find the corresponding service