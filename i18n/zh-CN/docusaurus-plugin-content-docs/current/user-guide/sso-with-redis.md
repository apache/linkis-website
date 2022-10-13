## 背景
因为原有的登陆 session 未支持分布式存储，对于用一个用户的请求，需要请求到同一个gateway实例上，才能正常处理请求。
常用的解决方式是通过在入口 nginx 上通过配置 ip hash 负载均衡的方式来支持。
但是ip hash 方式 如果存在服务器的扩容与缩容时，所有客户端ip的hash值都需要重新计算，会导致会话丢失，
其次容易因为节点分部不均匀⽽造成数据倾斜问题。为了优化ip hash方式存在的问题，对登陆态的 session 实现共享存储


## 实现大体思路
因为会话信息主要是通过 ticketId 来标识，所有对外入口为gateway，所以只需要对gateway 模块进行改造。
对于底层的共享存储，选择主流的内存数据库 redis。对于是否启动 redis 会话存储，支持通过配置文件控制。  
关键代码改动为 `org.apache.linkis.server.security.SSOUtils` 的 `userTicketIdToLastAccessTime`。

请求流程:
请求 -> nginx -> linkis-gateway -> linkis 后端服务


## 使用方式 
 
需要可用的 reids 环境，支持单机版redis和redis 哨兵模式。

安装部署Linkis 后，修改配置文件 `${LINKIS_HOME}/conf/linkis.properties`
```shell script
#开启redis cache配置
linkis.session.redis.cache.enabled=true


#单机版
linkis.session.redis.host=127.0.0.1
linkis.session.redis.port=6379
linkis.session.redis.password=test123

# 哨兵模式
linkis.session.redis.sentinel.master=sentinel-master-name
linkis.session.redis.sentinel.nodes=192.168.1.1:6381,192.168.2.1:6381,192.168.3.1:6381
linkis.session.redis.password=test123

```

正常启用 gateway 即可，启动redis后，对于多个gateway 示例，在nginx 侧配置时，可以使用nginx默认负载均衡模式。



