---
title: Linkis 去 HDFS 部署
sidebar_position: 8
---

这篇文章介绍一下如何在没有部署 HDFS 的环境中部署 Linkis 服务，以方便更轻量化的学习使用和调试。

部署整体流程参考 "快速部署"，需要修改如下少许内容。

去HDFS模式部署不支持hive/spark/flink引擎等任务

## 1. 配置修改
修改 `linkis-env.sh` 文件，修改以下内容：
```bash
#使用[file://]路径模式代替[hdfs://]模式 
WORKSPACE_USER_ROOT_PATH=file:///tmp/linkis/ 
HDFS_USER_ROOT_PATH=file:///tmp/linkis 
RESULT_SET_ROOT_PATH=file:///tmp/linkis 

export ENABLE_HDFS=false
export ENABLE_HIVE=false
export ENABLE_SPARK=false
```

将上述的配置修改为 false 之后，就不需要再单独配置 HDFS/HIVE/SPARK 等环境了, 安装部署时也会跳过这些基础环境的检查。

## 2. 拷贝 jar 包
因为 mysql-connector-java 驱动是 GPL2.0 协议，不满足Apache开源协议关于license的政策，所以需要我们手动将其拷贝到如下两个目录下
```bash
${LINKIS_HOME}/lib/linkis-commons/public-module/
${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
```

可以直接从 maven 仓库下载，比如 https://mvnrepository.com/artifact/mysql/mysql-connector-java/5.1.49

## 3. 部署和启动
参考 "快速部署" 部分，通过执行 `sh bin/install.sh` 命令完成部署。
参考 "快速部署" 部分，通过执行 `${LINKIS_HOME}/sbin/linkis-start-all.sh` 命令启动 Linkis 服务。


## 4. 运行作业验证
目前 1.1.2 版本只支持 shell 作业在非 HDFS 环境中运行，执行命令如下

```bash
$ cd ./bin
$ chmod +x linkis-cli
$ ./linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" "  -submitUser <submitUser> -proxyUser <proxyUser>
```

正常会输出如下类似内容
```bash
=====Java Start Command=====
exec /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.312.b07-2.el8_5.x86_64/jre/bin/java -server -Xms32m -Xmx2048m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/Linkis/linkis03/logs/linkis-cli -XX:ErrorFile=/Linkis/linkis03/logs/linkis-cli/ps_err_pid%p.log -XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=80 -XX:+DisableExplicitGC    -classpath /Linkis/linkis03/conf/linkis-cli:/Linkis/linkis03/lib/linkis-computation-governance/linkis-client/linkis-cli/*:/Linkis/linkis03/lib/linkis-commons/public-module/*: -Dconf.root=/Linkis/linkis03/conf/linkis-cli -Dconf.file=linkis-cli.properties -Dlog.path=/Linkis/linkis03/logs/linkis-cli -Dlog.file=linkis-client.root.log.20220418221952287912946  org.apache.linkis.cli.application.LinkisClientApplication '-engineType shell-1 -codeType shell -code echo "hello"  -submitUser test -proxyUser test'
[INFO] LogFile path: /Linkis/linkis03/logs/linkis-cli/linkis-client.root.log.20220418221952287912946
[INFO] User does not provide usr-configuration file. Will use default config
[INFO] connecting to linkis gateway:http://127.0.0.1:9001
JobId:6
TaskId:6
ExecId:exec_id018028linkis-cg-entranceiZbp19q51jb8p984yk2jxdZ:9104LINKISCLI_test_shell_1
[INFO] Job is successfully submitted!

2022-04-18 22:19:53.019 INFO Program is substituting variables for you
2022-04-18 22:19:53.019 INFO Variables substitution ended successfully
2022-04-18 22:19:53.019 WARN The code you submit will not be limited by the limit
Job with jobId : LINKISCLI_test_shell_1 and execID : LINKISCLI_test_shell_1 submitted 
2022-04-18 22:19:53.019 INFO You have submitted a new job, script code (after variable substitution) is
************************************SCRIPT CODE************************************
echo "hello"
************************************SCRIPT CODE************************************
2022-04-18 22:19:53.019 INFO Your job is accepted,  jobID is LINKISCLI_test_shell_1 and jobReqId is 6 in ServiceInstance(linkis-cg-entrance, iZbp19q51jb8p984yk2jxdZ:9104). Please wait it to be scheduled
job is scheduled.
2022-04-18 22:19:53.019 INFO Your job is Scheduled. Please wait it to run.
Your job is being scheduled by orchestrator.
2022-04-18 22:19:53.019 INFO job is running.
2022-04-18 22:19:53.019 INFO Your job is Running now. Please wait it to complete.
2022-04-18 22:19:53.019 INFO Job with jobGroupId : 6 and subJobId : 5 was submitted to Orchestrator.
2022-04-18 22:19:53.019 INFO Background is starting a new engine for you,execId astJob_4_codeExec_4 mark id is mark_4, it may take several seconds, please wait
2022-04-18 22:20:01.020 INFO Task submit to ec: ServiceInstance(linkis-cg-engineconn, iZbp19q51jb8p984yk2jxdZ:43213) get engineConnExecId is: 1
2022-04-18 22:20:01.020 INFO EngineConn local log path: ServiceInstance(linkis-cg-engineconn, iZbp19q51jb8p984yk2jxdZ:43213) /appcom1/tmp/test/20220418/shell/cc21fbb5-3a33-471b-a565-8407ff8ebd80/logs
iZbp19q51jb8p984yk2jxdZ:43213_0 >> echo "hello"
2022-04-18 22:20:01.438 WARN  [Linkis-Default-Scheduler-Thread-1] org.apache.linkis.engineconn.computation.executor.hook.executor.ExecuteOnceHook 50 warn - execute once become effective, register lock listener
hello
2022-04-18 22:20:01.020 INFO Your subjob : 5 execue with state succeed, has 1 resultsets.
2022-04-18 22:20:01.020 INFO Congratuaions! Your job : LINKISCLI_test_shell_1 executed with status succeed and 0 results.
2022-04-18 22:20:01.020 INFO job is completed.
2022-04-18 22:20:01.020 INFO Task creation time(任务创建时间): 2022-04-18 22:19:53, Task scheduling time(任务调度时间): 2022-04-18 22:19:53, Task start time(任务开始时间): 2022-04-18 22: Mission end time(任务结束时间): 2022-04-18 22:20:01
2022-04-18 22:20:01.020 INFO Your mission(您的任务) 6 The total time spent is(总耗时时间为): 8.3 秒
2022-04-18 22:20:01.020 INFO Congratulations. Your job completed with status Success.

[INFO] Job execute successfully! Will try get execute result
============Result:================
TaskId:6
ExecId: exec_id018028linkis-cg-entranceiZbp19q51jb8p984yk2jxdZ:9104LINKISCLI_test_shell_1
User:test
Current job status:SUCCEED
extraMsg: 
result: 

[INFO] Retrieving result-set, may take time if result-set is large, please do not exit program.
============ RESULT SET 1 ============
hello   
############Execute Success!!!########

```