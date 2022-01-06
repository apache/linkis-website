---
title: 全异步线程池调用
sidebar_position: 3
---
>UJES如何实现全异步线程池调用

## 1 全异步线程池调用的优势

- 5大异步消息队列和线程池

- Job每次占用线程不到1毫秒

- 每个入口可承接超1万+TPS常驻型Job请求

## 2 如何实现

![全异步调用线程池](../../images/ch4/fully_asynchronous_call_thread_pool.png)

- **如何提高上层的请求吞吐能力？**

 Entrance的WebSocket处理器，内置一个处理线程池和处理队列，接收Spring Cloud Gateway路由转发的上层请求。

- **如何保证不同系统不同用户的执行请求，互相隔离？**

 Entrance的Job调度池，每个系统的每个用户，都有一个专用线程，保证隔离度

- **如何保证Job执行高效？**

 Job执行池，只用于提交Job，一旦Job提交给了Engine端，则立马放入Job执行队列，保证每个Job占用执行池线程的时间不超过1毫秒。

 RPC请求接收池，用于接收和处理Engine端推来的日志、进度、状态和结果集，并实时更新Job的相关信息。

- **如何实时将Job的日志、进度和状态推给上层系统？**

 WebSocket发送池，专门用于处理Job的日志、进度和状态，将信息推给上层系统。