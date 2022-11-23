

# Seatunnel引擎使用文档

本文主要介绍Seatunnel引擎在Linkis1.X中的配置、部署和使用。

## 1.Seatunnel引擎Linkis系统参数配置

Seatunnel是依赖Spark或Flink环境，使用linkis-seatunnel引擎前，强烈建议本地跑通Seatunnel环境

| 环境变量名称 | 环境变量内容 | 是否需要                             |
|-----------------|----------------|----------------------------------------|
| JAVA_HOME       | JDK安装路径 | 需要                           |
| SEATUNNEL_HOME     | Seatunnel安装路径 | 需要                           |
|SPARK_HOME| Spark安装路径 | Seatunnel执行基于Spark就需要 |
|FLINK_HOME| Flink安装路径 | Seatunnel执行基于Flink就需要 |

表1-1 环境配置清单

| Linkis变量名称      | 变量内容                                       | 是否需要                                                       |
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| wds.linkis.engine.seatunnel.plugin.home | Seatunnel安装路径           | 需要 |



## 2.Seatunnel引擎配置和部署

### 2.1 Seatunnel版本选择和编译

Seatunnel 2.1.2 版本
下载地址：https://dlcdn.apache.org/incubator/seatunnel/2.1.2/apache-seatunnel-incubating-2.1.2-bin.tar.gz

### 2.2 Seatunnel engineConn部署和加载
注意：在编译Seatunnel引擎之前，需要完全编译linkis项目

```
Compile Seatunnel separately:
${linkis_code_dir}linkis-engineconn-plugins/seatunnel/
mvn clean install
```
安装方法是编译编译的引擎包，位于
```bash
${linkis_code_dir}linkis-engineconn-plugins/seatunnel/target/out.zip
```
然后部署到
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
最后重启 linkis-cg-linkismanager
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```
更多engineplugin详细信息可以在以下文章中找到 [EngineConnPlugin Installation](../deployment/install-engineconn)   


## 3.Seatunnel 引擎使用情况


### 3.1 OnceEngineConn

OnceEngineConn 通过LinkisManagerClient调用LinkisManager的createEngineConn接口，并将代码发送到创建的Seatunnel引擎，然后Seatunnel引擎开始执行。Client的使用也非常简单，首先创建一个新的maven项目，或者在项目中引入以下依赖项
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
**测试用例：**

```java
package org.apache.linkis.computation.client;

import org.apache.linkis.common.conf.Configuration;
import org.apache.linkis.computation.client.once.simple.SubmittableSimpleOnceJob;
import org.apache.linkis.computation.client.utils.LabelKeyUtils;

public class SeatunnelOnceJobTest {
    public static void main(String[] args) {
        LinkisJobClient.config().setDefaultServerUrl("http://ip:9001");
        String code =
                "\n"
                        + "env {\n"
                        + "  spark.app.name = \"SeaTunnel\"\n"
                        + "  spark.executor.instances = 2\n"
                        + "  spark.executor.cores = 1\n"
                        + "  spark.executor.memory = \"1g\"\n"
                        + "}\n"
                        + "\n"
                        + "source {\n"
                        + "  Fake {\n"
                        + "    result_table_name = \"my_dataset\"\n"
                        + "  }\n"
                        + "\n"
                        + "}\n"
                        + "\n"
                        + "transform {\n"
                        + "}\n"
                        + "\n"
                        + "sink {\n"
                        + "  Console {}\n"
                        + "}";
        SubmittableSimpleOnceJob onceJob =
                LinkisJobClient.once()
                        .simple()
                        .builder()
                        .setCreateService("seatunnel-Test")
                        .setMaxSubmitTime(300000)
                        .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY(), "seatunnel-2.1.2")
                        .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY(), "hadoop-seatunnel")
                        .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY(), "once")
                        .addStartupParam(Configuration.IS_TEST_MODE().key(), true)
                        .addExecuteUser("hadoop")
                        .addJobContent("runType", "sspark")
                        .addJobContent("code", code)
                        .addJobContent("master", "local[4]")
                        .addJobContent("deploy-mode", "client")
                        .addSource("jobName", "OnceJobTest")
                        .build();
        onceJob.submit();
        System.out.println(onceJob.getId());

        onceJob.waitForCompleted();
        System.out.println(onceJob.getStatus());
        LinkisJobMetrics jobMetrics = onceJob.getJobMetrics();
        System.out.println(jobMetrics.getMetrics());
    }
}
```

**参数比较表（带本地参数）:**

```
Spark 环境参数，左侧是linkis-seatunnel引擎参数，右侧是本地环境参数
master=》--master
deploy-mode=》--deploy-mode
config=》--config

Flink 环境参数
run-mode=》--run-mode
config=》--config
```
