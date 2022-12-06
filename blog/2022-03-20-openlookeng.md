---
title: Implementation of OpenLookEng Engine
authors: [peacewong]
tags: [engine]
---

## Overview
openLooKeng is an "out of the box" engine that supports in-situ analysis of any data, anywhere, including geographically remote data sources. It provides a global view of all data through a SQL 2003 interface. openLooKeng features high availability, auto-scaling, built-in caching and indexing support, providing the reliability needed for enterprise workloads.

openLooKeng is used to support data exploration, ad hoc query and batch processing with near real-time latency of 100+ milliseconds to minutes without moving data. openLooKeng also supports hierarchical deployment, enabling geographically remote openLooKeng clusters to participate in the same query. With its cross-region query plan optimization capabilities, queries involving remote data can achieve near "local" performance.
Linkis implements the openLooKeng engine to enable Linkis to have the ability to virtualize data and support the submission of cross-source heterogeneous queries, cross-domain and cross-DC query tasks. As a computing middleware, Linkis can connect more low-level computing and storage components by using openLooKeng's connector based on the connectivity capability of Linkis' EngineConn.

## Development implementation
The implementation of openLooKeng ec is extended based on the EngineConn Plugin (ECP) of Linkis. Because the OpengLooKeng service supports multiple users to query through the Client, the implementation mode is the implementation mode of the multi-user concurrent engine.
That is, tasks submitted by multiple users can run in one EC process at the same time, which can greatly reuse EC resources and reduce resource waste. The specific class diagram is as follows:

【Missing picture】

The specific implementation is that openLooKengEngineConnExecutor inherits from ConcurrentComputationExecutor, supports multi-user multi-task concurrency, and supports docking to multiple different openLooKeng clusters.
## Architecture
Architecture diagram:
![image](https://user-images.githubusercontent.com/7869972/166736911-c0f50968-3996-40d0-afdf-52b35d4cd71c.png)


The task flow diagram is as follows:
  ![image](https://user-images.githubusercontent.com/7869972/166737177-57f8f84a-b16d-44bd-b7cf-a61fc2cc160c.png)

The capabilities based on Linkis and openLooKeng can provide the following capabilities:
- 1. The connection capability of the computing middleware layer based on Linkis allows upper-layer application tools to quickly connect to openLooKeng, submit tasks, and obtain logs, progress, and results.
- 2. Based on the public service capability of Linkis, it can complete custom variable substitution, UDF management, etc. for openLooKeng's sql
- 3. Based on the context capability of Linkis, the results of OpengLooKeng can be passed to downstream ECs such as Spark and Hive for query
- 4. Linkis-based resource management and multi-tenancy capabilities can isolate tasks from tenants and use openLooKeng resources
- 5. Based on OpengLooKeng's connector capability, the upper-layer application tool can complete the task of submitting cross-source heterogeneous query, cross-domain and cross-DC query type, and get a second-level return.

## Follow-up plans
In the future, the two communities will continue to cooperate and plan to launch the following functions:
- 1.Linkis supports openLooKeng on Yarn mode
- 2. Linkis has completed the resource management and control of openLooKeng, tasks can now be queued by Linkis, and submitted only when resources are sufficient
- 3. Based on the mixed computing ability of openLooKeng, the ability of Linkis Orchestrator is optimized to complete the mixed computing ability between ECs in the subsequent plan.