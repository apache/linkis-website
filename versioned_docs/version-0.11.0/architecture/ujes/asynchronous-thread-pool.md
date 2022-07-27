---
title: Asynchronous Pool Call
sidebar_position: 3
---
> How UJES implements full asynchronous thread pool calls

## 1 Full Asynchronous Thread Pool for Advantage

- 5 Asynchronous Message Queue and Thread Pool

- Job's thread less than 1 ms per occupation

- You can accept more than 10,000 + TPS permanent Jobs per entry

## 2 How to Implement

![Full-asynchronous call thread pool](../../images/ch4/fully_asynchronous_call_thread_pool.png)

- **How can you improve the upper's request through?**

 Entrance WebSocket Processors, internalize a processing thread pool and handler queue to receive the top requests from Spring Cloud Gateway routes.

- **How to ensure that different users in different systems are segregated from one another?**

 Entrance Jobschedule, each user of each system has a dedicated thread to ensure isolation.

- **How to ensure job execution?**

 The Job Execution Pool is used only for the submission of Job, and once the Job is submitted to Engineering, the horse is placed in the Job's execution queue to ensure that each Job's occupation of the execution pool thread does not exceed 1 millisecond.

 The RPC requests the pool to receive and process engineered logs, progress, status and resultsets and to update the Job's information in real time.

- **How can Job's logs, progress, and status be pushed to the top of the system in real time?**

 WebSocket Send Pool, dedicated to processing Job's log, progress and state, and push information to the top system.