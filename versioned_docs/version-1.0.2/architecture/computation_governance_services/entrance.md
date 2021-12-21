---
title: Entrance Architecture Design
sidebar_position: 3
---

The Links task submission portal is used to receive, schedule, forward execution requests, life cycle management services for computing tasks, and can return calculation results, logs, and progress to the caller. It is split from the Entrance of Linkis0.X Native capabilities.

1. Entrance architecture diagram

![](/Images/Architecture/linkis-entrance-01.png)

**Introduction to the second-level module:**

EntranceServer
--------------

EntranceServer computing task submission portal service is the core service of Entrance, responsible for the reception, scheduling, execution status tracking, and job life cycle management of Linkis execution tasks. It mainly realizes the conversion of task execution requests into schedulable Jobs, scheduling, applying for Executor execution, job status management, result set management, log management, etc.

| Core Class | Core Function |
|-------------------------|-------|
| EntranceInterceptor | Entrance interceptor is used to supplement the information of the incoming parameter task, making the content of this task more complete. The supplementary information includes: database information supplement, custom variable replacement, code inspection, limit restrictions, etc. |
| EntranceParser | The Entrance parser is used to parse the request parameter Map into Task, and it can also convert Task into schedulable Job, or convert Job into storable Task. |
| EntranceExecutorManager | Entrance executor management creates an Executor for the execution of EntranceJob, maintains the relationship between Job and Executor, and supports the labeling capabilities requested by Job |
| PersistenceManager | Persistence management is responsible for job-related persistence operations, such as the result set path, job status changes, progress, etc., stored in the database. |
| ResultSetEngine | The result set engine is responsible for the storage of the result set after the job is run, and it is saved in the form of a file to HDFS or a local storage directory. |
| LogManager | Log Management is responsible for the storage of job logs and the management of log error codes. |
| Scheduler | The job scheduler is responsible for the scheduling and execution of all jobs, mainly through scheduling job queues. |
