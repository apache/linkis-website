---
title: Exception Throws
sidebar_position: 1
---


## How to define a new exception?



- Customized exceptions must inherit one of LinkisretryException, WarnException, ErroException, or FatalException



- Customized exceptions must contain error codes and error descriptions. If necessary, the IP address and process port where the exception occurred can also be encapsulated in the exception



- Be careful with WarnException! An exception thrown by WarnException, if caught in a RESTful or RPC Receiver, does not throw a failure to the front end or sender, but only returns a warning message!



- WarnException has an exception level of 1, ErroException has an exception level of 2, FatalException has an exception level of 3, and LinkisretryException has an exception level of 4



| exception class| service |  error code  | error description|
|:----  |:---   |:---   |:---   |
| LinkisException | common | None | top level parent class inherited from the Exception, does not allow direct inheritance |
| LinkisRuntimeException | common | None | top level parent class, inherited from RuntimeException, does not allow direct inheritance
| WarnException | common | None | secondary level parent classes, inherit from LinkisRuntimeException. Warn level exception, must inherit this class directly or indirectly |
| ErrorException | common | None | secondary level parent classes, inherited from LinkisException. Error exception, must inherit this class directly or indirectly |
| FatalException | common | None | secondary level parent classes, inherited from LinkisException. Fatal level exception, must inherit this class directly or indirectly |
| LinkisRetryException | common | None | secondary level parent classes, inherited from LinkisException. Retryable exceptions, must inherit this class directly or indirectly |



## Module exception specification



linkis-commons:10000-11000

linkis-computattion-governace:11000-12000

linkis-engineconn-plugins:12000-13000

linkis-orchestrator:13000-14000

linkis-public-enghancements:14000-15000

linkis-spring-cloud-service:15100-15500

linkis-extensions:15500-16000

linkis-tuning:16100-16200

linkis-user-control:16200-16300