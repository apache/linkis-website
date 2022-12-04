---
title: Session Supports Redis Shared Storage
sidebar_position: 8
---
## 1.Background
Because the original login session does not support distributed storage, for all requests from the same user, nginx needs to forward the requests to the same gateway instance to process the requests normally.
The common solution is to support it by configuring ip hash load balancing on the ingress nginx.
However, in the ip hash method, if there is an expansion or contraction of the server, the hash values ​​of all client ips need to be recalculated, which will result in session loss.
Secondly, it is easy to cause data skew problems due to uneven node distribution. 
In order to optimize the problems existing in the ip hash method, shared storage is implemented for the session in the login state.

## 2.Implementation plan
Because session information is mainly identified by ticketId, and all external entrances are gateways, only the gateway module needs to be modified.
For the underlying shared storage, choose the mainstream in-memory database redis. For whether to start redis session storage, it supports configuration file control.
The key code change is `userTicketIdToLastAccessTime` of `org.apache.linkis.server.security.SSOUtils`.

Request process:

`User request -> nginx -> linkis-gateway -> linkis backend service`


## 3.How to use
 
An available reids environment is required, and stand-alone redis and redis sentinel modes are supported.

After installing and deploying Linkis, modify the configuration file `${LINKIS_HOME}/conf/linkis.properties`
```shell script
#Open redis cache configuration
linkis.session.redis.cache.enabled=true


#single vision
linkis.session.redis.host=127.0.0.1
linkis.session.redis.port=6379
linkis.session.redis.password=test123

# sentinel mode
linkis.session.redis.sentinel.master=sentinel-master-name
linkis.session.redis.sentinel.nodes=192.168.1.1:6381,192.168.2.1:6381,192.168.3.1:6381
linkis.session.redis.password=test123

```

Just enable the gateway normally. After starting redis, for multiple gateway examples, you can use the nginx default load balancing mode when configuring on the nginx side.


