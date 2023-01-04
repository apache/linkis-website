---
title: RPC Module
sidebar_position: 2
---

## 1. Overview
The call of HTTP interface between Feign-based microservices can only satisfy a simple A microservice instance that randomly selects a service instance in B microservices according to simple rules, and if this B microservice instance wants to asynchronously return information To the caller, it is simply impossible to achieve.
At the same time, because Feign only supports simple service selection rules, it cannot forward the request to the specified microservice instance, and cannot broadcast a request to all instances of the recipient microservice.

## 2. Architecture description
## 2.1 Architecture design diagram
![Linkis RPC architecture diagram](/Images/Architecture/Commons/linkis-rpc.png)
## 2.2 Module description
The functions of the main modules are introduced as follows:
* Eureka: service registration center, user management service, service discovery.
* Sender: Service request interface, the sender uses Sender to request service from the receiver.
* Receiver: The service request receives the corresponding interface, and the receiver responds to the service through this interface.
* Interceptor: Sender will pass the user's request to the interceptor. The interceptor intercepts the request and performs additional functional processing on the request. The broadcast interceptor is used to broadcast operations on the request, the retry interceptor is used to retry the processing of failed requests, and the cache interceptor is used to read and cache simple and unchanged requests. , And the default interceptor that provides the default implementation.
* Decoder, Encoder: used for request encoding and decoding.
* Feign: is a lightweight framework for http request calls, a declarative WebService client program, used for Linkis-RPC bottom communication.
* Listener: monitor module, mainly used to monitor broadcast requests.