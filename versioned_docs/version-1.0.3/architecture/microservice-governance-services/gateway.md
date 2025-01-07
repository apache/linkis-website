---
title: Gateway Design
sidebar_position: 3
---

## Gateway Architecture Design

#### Brief
The Gateway is the primary entry point for Linkis to accept client and external requests, such as receiving job execution requests, and then forwarding the execution requests to specific eligible Entrance services.
The bottom layer of the entire architecture is implemented based on "SpringCloudGateway". The upper layer is superimposed with module designs related to Http request parsing, session permissions, label routing and WebSocket multiplex forwarding. The overall architecture can be seen as follows.
### Architecture Diagram

![Gateway diagram of overall architecture](/Images/Architecture/Gateway/gateway_server_global.png)

#### Architecture Introduction
- gateway-core: Gateway's core interface definition module, mainly defines the "GatewayParser" and "GatewayRouter" interfaces, corresponding to request parsing and routing according to the request; at the same time, it also provides the permission verification tool class named "SecurityFilter".
- spring-cloud-gateway: This module integrates all dependencies related to "SpringCloudGateway", process and forward requests of the HTTP and WebSocket protocol types respectively.
- gateway-server-support: The driver module of Gateway, relies on the spring-cloud-gateway module to implement "GatewayParser" and "GatewayRouter" respectively, among which "DefaultLabelGatewayRouter" provides the function of label routing.
- gateway-httpclient-support: Provides a client-side generic class for Http to access Gateway services, which can be implemented based on more.
- instance-label: External instance label module, providing service interface named "InsLabelService" which used to create routing labels and associate with application instances.

The detailed design involved is as follows：

#### 1、Request Routing And Forwarding (With Label Information)
First, after the dispatcher of "SpringCloudGateway", the request enters the filter list of the gateway, and then enters the two main logic of "GatewayAuthorizationFilter" and "SpringCloudGatewayWebsocketFilter". 
The filter integrates "DefaultGatewayParser" and "DefaultGatewayRouter" classes. From Parser to Router, execute the corresponding parse and route methods. 
"DefaultGatewayParser" and "DefaultGatewayRouter" classes also contain custom Parser and Router, which are executed in the order of priority.
Finally, the service instance selected by the "DefaultGatewayRouter" is handed over to the upper layer for forwarding.
Now, we take the job execution request forwarding with label information as an example, and draw the following flowchart:  
![Gateway Request Routing](/Images/Architecture/Gateway/gateway_server_dispatcher.png)


#### 2、WebSocket Connection Forwarding Management
By default, "Spring Cloud Gateway" only routes and forwards WebSocket request once, and cannot perform dynamic switching. 
But under the Linkis's gateway architecture, each information interaction will be accompanied by a corresponding uri address to guide routing to different backend services.
In addition to the "WebSocketService" which is responsible for connecting with the front-end and the client, 
and the "WebSocketClient" which is responsible for connecting with the backend service, a series of "GatewayWebSocketSessionConnection" lists are cached in the middle.
A "GatewayWebSocketSessionConnection" represents the connection between a session and multiple backend service instances.  
![Gateway WebSocket Forwarding](/Images/Architecture/Gateway/gatway_websocket.png)
