---
title: RPC Architecture
sidebar_position: 2
---

## 1. Background

The call of HTTP interface between Feign-based microservices can only satisfy a simple A microservice instance that randomly selects a service instance in B microservices according to simple rules, and if this B microservice instance wants to asynchronously return information To the caller, it is simply impossible to achieve.

At the same time, because Feign only supports simple service selection rules, it cannot forward the request to the specified microservice instance, and cannot broadcast a request to all instances of the recipient microservice.


## 2. Introduction

Linkis has implemented a set of its own underlying RPC communication scheme based on Feign.

As the underlying communication solution, Linkis RPC integrates the SDK into the microservices in need.

A microservice can be both a request caller and a request receiver.

As the request caller, the Receiver of the target receiver's microservice will be requested through the Sender. As the request receiver, the Receiver will be provided to process the request sent by the request receiver Sender in order to complete a synchronous response or an asynchronous response.

![Linkis RPC architecture diagram](../../images/ch4/rpc1.png)


## 3. Implementation

Based on the Sender system of the requesting party and the Receiver system of the requesting party, the entire structure of Linkis RPC is formed.

![Linkis RPC detailed architecture diagram](../../images/ch4/rpc2.png)

### 3.1 Sending end

As the underlying communication layer, Linkis RPC does not require users to write any actual code on the sending end.

-1) The user obtains a Sender by calling the SDK provided by Linkis RPC, using the microservice name (Service Name) or specifying the microservice instance (microservice name + IP and port of the microservice instance).

 &ensp; &ensp; &ensp; &ensp; Sender provides usable methods, see the following pseudo code:

```java
abstract class Sender {
Object ask(Object message);
Object ask(Object message, Duration timeout);
void send(Object message);
void deliver(Object message);
}
```

 &ensp; &ensp; &ensp; &ensp; where:

        1. The ask method is a synchronous request response method, requiring the receiving end to return a response synchronously;
        2. The send method is a synchronous request method, which is only responsible for sending the request to the receiving end synchronously, and does not require the receiving end to give a reply;
        3. Deliver is an asynchronous request method. As long as the process on the sending end does not exit abnormally, the request will be sent to the receiving end through other threads later.

-2) As the sender, the user sends a request to the receiver through the request method provided by the sender.

-3) The Sender sends the user's request to the interceptor. The interceptor intercepts the request and starts to do additional functional processing on the request:

     a) Broadcast interceptor.
     
     The broadcast interceptor only takes effect for requests that need to be broadcast.
     
     The broadcast interceptor will provide a special broadcast interface. If this request implements the broadcast interface and the request is not being broadcast, the broadcast interceptor thinks that this request needs to be broadcast, and the broadcast operation will be triggered at this time.
     
     The specific steps are: get all the microservice instances for which the request needs to be broadcasted. If it is empty, it will broadcast to all instances of the microservice by default; then mark the request as being broadcast and call step 1) to obtain the corresponding microservice instances. All Senders start to send requests in a multi-threaded manner; when all Senders in the thread pool have finished sending requests, the broadcast request is marked as successful and returned to the user to complete the processing.
     
     b) Retry the interceptor.
     
     The retry interceptor will provide a retry function for all the next steps.
     
     If the sender successfully sends the request, but the receiver returns an exception that requires a retry, the retry interceptor will be triggered to re-submit the request automatically; if the request does not specify a specific instance of the microservice receiver, send If a ConnectException (connection exception) occurs during the request, it will actively retry; or if the user has specified certain exceptions to be retryed, the retry interceptor will automatically retry at this time.
     
     c) Cache interceptor.
     
     The cache interceptor is set for synchronization requests whose response content is unlikely to change frequently.
     
     The cache interceptor will also provide a special cache interface. If this request implements the cache interface, it will first look for whether the request has cached the response from the receiving end in the cache interceptor. If so, it will directly return the cached response, otherwise continue to connect. After the pull-down step and the response is returned at the receiving end, the response is first cached, and then the response is returned to the user, and the processing is completed.
     
     d) The default interceptor.
     
     The default interceptor is used to call the next processing steps.
     
     e) Custom interceptor. Users can also implement their own custom interceptors to achieve some specific functions.
 
-4) The request encoder will first convert the data (entity bean) requested by the user into a serialized JSON string, and then pass it to the Feign client generator.


-5) Feign client generator, which generates Feign client that can access the receiver Restful request receiver.


-6) The generated Feign client will call the service discovery manager to obtain a list of all microservices. Through the service selector, if the user specifies the microservice name in step 1), then it will pass Feign's load balancing strategy. Select a suitable receiver microservice instance for request forwarding, otherwise the service selector will rewrite Spring Cloud Feign's FeignLoadBalancer (Feign load balancer). When creating LoadBalancerCommand, specify the corresponding microservice instance as step 1) Obtain The microservice instance specified when Sender.


-7) Call the Feign client to start requesting the Restful request receiver on the receiving end.


### 3.2 Receiver

 The receiving end requires users to implement the Receiver interface for processing real business logic.

1) The Restful request receiver, as an embedded HTTP request Web Service service in Linkis RPC, is responsible for receiving requests from the sender

2) After the Restful request receiver receives the request, it first calls the request decoder to decode the request, and parses out the actual request information and sender microservice information (microservice name + microservice instance IP and port), if the analysis fails , Will directly respond to the failure of the analysis request.

3) Put the parsed request information and sender microservice information into the request message queue;

4) The request consumer will consume the decoded sender request in the request message queue.

 Obtain a suitable Receiver by calling the Receiver manager; at the same time, use the Sender generator to generate a Sender pointing to the sender through the obtained sender microservice information. Then the request consumer sends the actual request information and the generated sender Sender to the Receiver for processing;

5) Receiver, as the actual processing unit of user requests, requires users to implement the Receiver interface to complete the actual processing logic of the caller request.

 The pseudo code of Receiver is as follows:

```java
public interface Receiver {
void receive(Object message, Sender sender);
Object receiveAndReply(Object message, Sender sender);
    Object receiveAndReply(Object message, Duration duration, Sender sender);
}
```

 Receiver provides methods to handle synchronous and asynchronous requests.

6) If this request is an asynchronous request, the Receive method of Receiver is called, and the upper-layer business decides whether it needs to send back the response through the Sender of the sender.

7) If this request is a synchronous request, call Receiver's receiveAndReply method, take the return value as the response result, and send back to the sender.