>Linkis0.x version runs stably on the production environment of WeBank, and supports various businesses. Linkis1.0 is an optimized version of 0.x, and the related tuning logic has not changed, so this document will introduce several Linkis deployment and tuning suggestions. Due to limited space, this article cannot cover all optimization scenarios. Related tuning guides will also be supplemented and updated. Of course, we also hope that community users will provide suggestions for Linkis1.0 tuning documents.

## 1. Overview

This document will introduce several tuning methods based on production experience, namely the selection of Jvm heap size during deployment in production, the setting of concurrency for task submission, and the introduction of task running resource application parameters. The parameter settings described in the document are not recommended parameter values. Users need to select the parameters according to their actual production environment.

## 2. Jvm heap size tuning 

When installing Linkis, you can find the following variables in linkis-env.sh:

```shell
SERVER_HEAP_SIZE="512M"
```

After setting this variable, it will be added to the java startup parameters of each microservice during installation to control the Jvm startup heap size. Although the xms and xmx parameters need to be set when java is started, they are usually set to the same value. In production, as the number of users increases, this parameter needs to be adjusted larger to meet the needs. Of course, setting a larger stack memory requires a larger server configuration. Also, single-machine deployment has limitations. In production, a distributed deployment method can be used to deploy different Linkis and DSS microservices on multiple servers. Meanwhile, you can adjust the stack size to meet production requirements.

## 3. Tuning the concurrency of task submission

Some Linkis task concurrency parameters will have a default value. In most scenarios, the default value can meet the demand, but sometimes it cannot, so it needs to be adjusted. This article will introduce several parameters for adjusting the concurrency of tasks to facilitate users to optimize concurrent tasks in production.

Since tasks are submitted by RPC, in the linkis-common/linkis-rpc module, you can configure the following parameters to increase the number of concurrent rpc:

```shell
wds.linkis.rpc.receiver.asyn.consumer.thread.max=400
wds.linkis.rpc.receiver.asyn.queue.size.max=5000
wds.linkis.rpc.sender.asyn.consumer.thread.max=100
wds.linkis.rpc.sender.asyn.queue.size.max=2000
```

In the Linkis source code, we set a default value for the number of concurrent tasks, which can meet the needs in most scenarios. However, when a large number of concurrent tasks are submitted for execution in some scenarios, such as when Qualitis (another open source project of WeBank) is used for mass data verification, initCapacity and maxCapacity have not been upgraded to a configurable item in the current version. Users need to modify, by increasing the values of these two parameters, the number of concurrency. Of course, this also requires a higher server configuration.

```java
  private val groupNameToGroups = new JMap[String, Group]
  private val labelBuilderFactory = LabelBuilderFactoryContext.getLabelBuilderFactory

  override def getOrCreateGroup(groupName: String): Group = {
    if (!groupNameToGroups.containsKey(groupName)) synchronized {
      val initCapacity = 100
      val maxCapacity = 100
      // 其它代码...
        }
      }
```

## 4. Resource settings related to task runtime

When submitting a task to run on Yarn, Yarn provides a configurable interface. As a highly scalable framework, Linkis can also be configured to set resource configuration.

The related configuration of Spark and Hive are as follows:

Part of the Spark configuration in linkis-engineconn-plugins/engineconn-plugins, you can adjust the configuration to change the runtime environment of tasks submitted to Yarn. Due to limited space, such as more about Hive, Yarn configuration requires users to refer to the source code and the parameters documentation.

```shell
"spark.driver.memory" = 2 //单位为G
"wds.linkis.driver.cores" = 1
"spark.executor.memory" = 4 //单位为G
"spark.executor.cores" = 2
"spark.executor.instances" = 3
"wds.linkis.rm.yarnqueue" = "default"
```

