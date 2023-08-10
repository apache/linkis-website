---
title: Source Code Interpretation-Linkis1.1.1 Entry Execution Analysis
---
### Preface

The following is a diagram based on the source code analysis of Linkisv1.1.1: Entry service execution process.
All subsequent explanations revolve around this picture, so when reading the explanation, please refer to the entire picture to understand. The explanation idea is to break the whole into parts, accumulate points into lines, and gather lines into surfaces.
![](/Images/blog/entry-service-execution-process.jpg)

Roughly divide the above figure into:
Environment initialization area: The EntranceContext that needs to be initialized when the entire Entrance service starts
Submit task area: Users call the EntranceRestfulApi interface to submit tasks, as well as job construction, interceptor operations, etc
Execution area: The job submitted from the submission area contains all operations throughout the entire job lifecycle
![](/Images/blog/entrance-context.png)

### Environment initialization area
![](/Images/blog/env-init.png)
```
The Entry function is finely divided and each performs its own duties, making it easy to expand. The injection of the entire environment can be viewed in the EnteranceSpringConfiguration configuration class, which is introduced from left to right in sequence below

PersistenceManager(QueryPersistenceManager)Persistence management
The main object of action is job, and operations such as state, progress, and result have been defined. QueryPersistenceEngine and EntranceResultSetEngine are one of the implementations. If there is a change in the storage type, an additional implementation needs to be added. By injecting the change injection class into the entry, the switch can be achieved.

EnteranceParser (CommonEnteranceParser) parameter parser: There are mainly three methods, parseToTask (JSON ->
Request), parseToJob (request ->job), parseToJobRequest (job ->
Request, this process can be roughly expressed as: JSON ->request<=>job

LogManager (CacheLogManager) log management: printing logs and updating error codes, etc
Scheduler (ParallelScheduler) scheduler: responsible for job distribution, job execution environment initialization, etc. Linkis is grouped according to the same tenant and task type. Many settings are based on this grouping principle, such as parallelism, resources, etc. So here are three important functional components and abstract a SchedulerContext context environment management:
1) GroupFactory (EntranceGroupFactory) group factory: Create groups by group and cache groups with groupName as the key. The group mainly records some parameters, such as concurrency, number of threads, etc
2) ConsumerManager (ParallelConsumerManager) consumption manager: create consumers by group, cache consumers with groupName as the key, and initialize a Thread pool for all consumers. Consumer is mainly used to store jobs, submit and execute jobs, etc
3) ExecutorManager (EntranceExecutorManagerImpl) executor management: Create an executor for each job, responsible for all operations throughout the job lifecycle

EntranceInterceptor Interceptor: All interceptors for the entrance service

EnteranceEventListenerBus event listener service: a general event listener service, which is essentially a polling thread, with a built-in Thread pool and 5 threads. Adding an event will distribute events to the registered listener according to the event type
```

### Submit Task Area
![](/Images/blog/submit-task.png)
```
Mainly explained by the user calling the execute() method of EnteranceRestfulApi. There are mainly four important steps

ParseToTask: After receiving the request JSON, it is first converted into a request and saved to the database using PersistenceManager to obtain the taskId
Call all interceptors Interceptors
ParseToJob: Convert request to EnteranceExecutionJob, set CodeParser, parse job through job. init(), and build SubJobInfo and SubJobDetail objects (v1.2.0 no longer has a SubJob)
Submit the job to the scheduler to obtain the execId
```

### Execution region
![](/Images/blog/excute-area.png)
```
ParallelGroup: Stores some parameters that FIFOUserConsumer will use, but parameter changes should not take effect in real time

FIFOUserConsumer:
1. It contains a ConsumeQueue (LoopArrayQueue), a ring queue with a size of maxCapacity, and an offer method is used to add jobs. If the queue is full, it returns None, and the business reports an error.
2. Essentially, it is a thread. It calls the loop() method by polling, takes only one job at a time, creates an executor through the ExecutorManager, and submits the job using the Thread pool
3. The concurrency count is determined by the maxRunningJobs of ParallelGroup, and tasks will prioritize obtaining tasks that need to be retried.

Default EntranceExecutor: The executor is responsible for monitoring the entire job submission, submitting one SubJobInfo at a time. Summary of general steps:
1. Asynchronously submit Orchestrator and return OrchestratorFuture
2. OrchestratorFuture registers the dealResponse function,
DealResponse: SubJob succeeded. If there is another sub job to continue submitting, call notify to inform the job of success. If the sub job fails, notify to inform the job of failure. Judge to retry and recreate the executor
3. Create an EngineExecuteAsyncReturn and inject OrchestratorFuture

Submission process:

FIFOUserConsumer obtains a job through loop()
Obtain a DefaultEntranceExecutor and inject it into the job
Call the run method of the job through the Thread pool, and the DefaultEntranceExecutor's execute will be triggered in the job
Submit Orchestrator and wait for dealResponse to be called, triggering notify
Change the job status, determine retry, and continue submitting
```
