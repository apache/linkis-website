---
title: CS Client Design
sidebar_position: 3
---

## **CSClient design ideas and implementation**


CSClient is a client that interacts with each microservice and CSServer group. CSClient needs to meet the following functions.

1. The ability of microservices to apply for a context object from cs-server

2. The ability of microservices to register context information with cs-server

3. The ability of microservices to update context information to cs-server

4. The ability of microservices to obtain context information from cs-server

5. Certain special microservices can sniff operations that have modified context information in cs-server

6. CSClient can give clear instructions when the csserver cluster fails

7. CSClient needs to provide a copy of all the context information of csid1 as a new csid2 for scheduling execution

> The overall approach is to send http requests through the linkis-httpclient that comes with linkis, and send requests and receive responses by implementing various Action and Result entity classes.

### 1. The ability to apply for context objects

To apply for a context object, for example, if a user creates a new workflow on the front end, dss-server needs to apply for a context object from dss-server. When applying for a context object, the identification information (project name, workflow name) of the workflow needs to be passed through CSClient Send it to the CSServer (the gateway should be sent to one randomly at this time, because no csid information is carried at this time), once the application context returns the correct result, it will return a csid and bind the workflow.

### 2. Ability to register contextual information

> The ability to register context, for example, the user uploads a resource file on the front-end page, uploads the file content to dss-server, dss-server stores the content in bml, and then needs to register the resourceid and version obtained from bml to cs-server In this case, you need to use the ability of csclient to register. The ability to register is to pass in csid and cskey
> Register with csvalue (resourceid and version).

### 3. Ability to update registered context

> The ability to update contextual information. For example, if a user uploads a resource file test.jar, csserver already has registered information. If the user updates the resource file when editing the workflow, then cs-server needs to update this content Update. At this time, you need to call the updated interface of csclient

### 4. The ability to get context

The context information registered to csserver needs to be read when variable replacement, resource file download, and downstream nodes call upstream nodes to generate information. For example, when the engine side executes code, it needs to download bml resources. When you need to interact with csclient and csserver, get the resourceid and version of the file in bml and then download it.

### 5. Certain special microservices can sniff operations that have modified context information in cs-server

This operation is based on the following example. For example, a widget node has a strong linkage with the upstream sql node. The user writes a sql in the sql node, and the metadata of the sql result set is a, b, and c. Field, the widget node behind is bound to this sql, you can edit these three fields on the page, and then the user changes the sql statement, the metadata becomes a, b, c, d four fields, this When the user needs to refresh manually. We hope that if the script is changed, the widget node can automatically update the metadata. This generally uses the listener mode. For simplicity, the heartbeat mechanism can also be used for polling.

### 6. CSClient needs to provide a copy of all context information of csid1 as a new csid2 for scheduling execution

Once the user publishes a project, he hopes to tag all the information of the project similar to git. The resource files and custom variables here will not change anymore, but there are some dynamic information, such as the result set generated. The content of csid will still be updated. So csclient needs to provide an interface for csid1 to copy all context information for microservices to call

## **Implementation of ClientListener Module**

For a client, sometimes you want to know that a certain csid and cskey have changed in the cs-server as soon as possible. For example, the csclient of visualis needs to be able to know that the previous sql node has changed, then it needs to be notified , The server has a listener module, and the client also needs a listener module. For example, a client wants to be able to monitor the changes of a certain cskey of a certain csid, then he needs to register the cskey to the callbackEngine in the corresponding csserver instance, Subsequent, for example, another client changes the content of the cskey. When the first client performs a heatbeat, the callbackengine needs to notify all the cskeys that the client has listened to. In this case, the first client knows it. The content of the cskey has changed. When heatbeat returns data, we should notify all listeners registered to ContextClientListenerBus to use the on method

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-client-01.png)

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-client-02.png)

## **Implementation of GatewayRouter**


The Gateway plug-in implements Context forwarding. The forwarding logic of the Gateway plug-in is carried out through the GatewayRouter. It needs to be divided into two ways. The first is to apply for a context object. At this time, the information carried by the CSClient does not contain csid. For the information, the judgment logic at this time should be through the registration information of eureka, and the first request sent will randomly enter a microservice instance.
The second case is that the content of the ContextID is carried. We need to parse the csid. The way of parsing is to obtain the information of each instance through the method of string cutting, and then use eureka to determine whether this micro-channel still exists through the instance information. Service, if it exists, send it to this microservice instance

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-client-03.png)