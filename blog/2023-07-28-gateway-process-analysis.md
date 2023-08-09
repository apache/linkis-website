---
title: Linkis1.3.2 Gateway Process Analysis
authors: [Casion]
tags: [blog,linkis1.3.2,gateway]
---
### Linkis 1.3.2 Process diagram

GateWay adopts Reactive programming of webFlux, and its whole process is similar to spring mvc

| framework  | Gateway | spring mvc |
|-----|---------|------------|
| Request Distribution    | DispatcherHandler        | DispatcherServlet           |
| Request Mapping    | HandlerMapping        | HandlerMapping           |
| Request adaptation    | HanderAdaper        | HanderAdaper           |
| Request processing    | WebHander        | Hander           |
		
### flow chart

![](/static/Images/gateway/flow-chart.png)


### Linkis 1.3.2 Process Description

In fact, the core of the entire process is the filter process of GatewayAuthorizationFilter. The rest is easy to understand and will not be summarized.
There are roughly three stages in terms of functionality
```
Authenticate SecurityFilter. doFilter ->Parse phase to determine Application Name ->Route phase to determine Instance
```
Simplify the process as follows:

![](/static/Images/gateway/simplify-the-process.png)

### Authentication
In terms of functionality, the core SecurityFilter.doFilter method is separated from authentication, and the main operations include:
Verification class: IP whitelist, refer verification, URL whitelist
Authentication class: username and password authentication, token authentication, SSO authentication

### Parse stage
The Parse stage mainly determines the Application Name, and special cases also determine the Instance
Input: RequestURI, Output: ServiceInstance
Implementation principle: RequestURI is distributed to different parse implementation classes through regular matching
Special note: All parses are executed serially and will not interrupt, so the regularization between parses needs to be mutually exclusive.

#### Custom Parse processing
- EntranceExecutionGatewayParser
  I personally prefer to understand it as a post type request parser for Entrance, mainly targeting submit methods such as execute and submit. RequestBody needs to be verified, and there are no other operations. Instead, ServiceInstance (linkis cg entry, null) is directly returned
- EntranceRequestGatewayParser
  I personally prefer to understand it as an Entrance's get type request parser, which mainly targets query methods such as status, progress, log, metric, etc. There is no need to verify the requestBody, and different processing is mainly carried out based on different RequestURI paths to parse the Instance (which is quite special here, and the Instance is determined in the parse stage)

#### General Parse processing
- DefaultGatewayParser
  After calling the custom parse class for processing, it also performs general processing. When there is no ServiceInstance, it will match the ServiceInstance (publicservice, metadataquery, etc.) with general rules based on the RequestURI. Alternatively, it can be understood that if the parse implementation is written separately, it is a service that requires special processing.
  ![](/static/Images/gateway/general-parse-processing.png)

### Route stage
The Route stage mainly determines the Instance
Input: ServiceInstance (applicationName, null), Output: ServiceInstance (applicationName, instance)
There are also special cases where the instance is determined during the parse phase

#### Route processing
- DefaultLabelGatewayRouter(AbstractLabelGatewayRouter)
Route server whitelist verification: You can configure ROUTER_ SERVER_ LIST implementation, currently only the entry service is available
ServiceInstance instance selection logic:

  - Obtain the list of selected instances
  First, parse the routeLabel label from the parameters

  Case 1 If there is no routeLabel, the default logic is used to obtain the list of available ServiceInstances. The logic is:
  
    1） Obtain all applicationName instances from eureka, denoted as a

    2） Obtain an applicationName instance with any label from the database, denoted as b

    3）A - b Subtraction to obtain a list of available (unlabeled) instances

    case 2. If there is a routeLabel, obtain the instance list from the database

  Role of RouteLabel: Used for tenant isolation of services. When a request contains a RouteLabel, it will only forward the corresponding request to the labeled service. Main functions: 1. Tenant isolation of services 2 Elegant offline: It can quickly isolate services without being routed to them.
  Particular attention：
  case 1. It can be ensured that the instance obtained is the specified applicationName
  case 2. The obtained instances can be instances of different applicationNames

  - Select an instance from the list of pending instances

      1）If applicationName is specified in GatewayRoute.getServiceInstance, a list of selected instances needs to be filtered
    
      2）Filter out the list of surviving (registered) instances from the selected instance and Eureka
    
      3）Randomly select one from the list of surviving (registered) instances

#### ServiceInstance verification
Taking Eureka as an example, the main service name verification and instance verification

#### Route conversion
Using ServiceInstance to transition from gateway to target service Route
For example:

- Gateway request to go to Entrance
Route{id='api', uri=lb://linkis-mg-gateway} -> Route{id='api', uri=lb://merge-gw-18linkis-cg-entrance192--168--1--1---9104}
- Gateway request to go to PublicService
Route{id='api', uri=lb://linkis-mg-gateway} -> Route{id='api', uri=lb://linkis-ps-publicservice}

### Knowledge points
Scala Regular Matching Usage
```
- regular expression：
REGEX = ("rest_[a-zA-Z][a-zA-Z_0-9]/(v\d+)/entrance/([^/]+)/.+").r

- Correct use requires two variables
REGEX(version, execId)
OR
REGEX(_, _)

- Principle: There are two sets (), which means there are two variables. The given regularizations are (v d+) and ([^/]+), respectively

- If the regularization is modified to：
REGEX = ("rest_[a-zA-Z][a-zA-Z_0-9]/(v\d+)/entrance/([^/]+)/(.+)").r

- The correct use is：
REGEX(version, execId, method)
OR
REGEX(_, _, _)

```