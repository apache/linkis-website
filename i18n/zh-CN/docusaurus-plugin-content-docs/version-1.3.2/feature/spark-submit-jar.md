---
title: Spark-Submit 提交 Jar 包任务
sidebar_position: 0.2
--- 

## 1. 背景
在一些场景下需要通过 通过 spark-submit 提交 jar 包的形式执行任务。 

## 2. 使用说明
通过 SDK 的方式提交 Spark 任务，代码示例如下。
```java
public class SparkOnceJobTest {

    public static void main(String[] args)  {

        LinkisJobClient.config().setDefaultServerUrl("http://127.0.0.1:9001");

        String submitUser = "linkis";
        String engineType = "spark";

        SubmittableSimpleOnceJob onceJob =
                // region
                LinkisJobClient.once().simple().builder()
                        .setCreateService("Spark-Test")
                        .setMaxSubmitTime(300000)
                        .setDescription("SparkTestDescription")
                        .addExecuteUser(submitUser)
                        .addJobContent("runType", "jar")
                        .addJobContent("spark.app.main.class", "org.apache.spark.examples.JavaWordCount")
                        // 提交的jar包获取的参数
                        .addJobContent("spark.app.args", "hdfs:///tmp/test_word_count.txt") // WordCount 测试文件
                        .addLabel("engineType", engineType + "-2.4.3")
                        .addLabel("userCreator", submitUser + "-IDE")
                        .addLabel("engineConnMode", "once")
                        .addStartupParam("spark.app.name", "spark-submit-jar-test-linkis") // yarn上展示的 Application Name
                        .addStartupParam("spark.executor.memory", "1g")
                        .addStartupParam("spark.driver.memory", "1g")
                        .addStartupParam("spark.executor.cores", "1")
                        .addStartupParam("spark.executor.instance", "1")
                        .addStartupParam("spark.app.resource", "hdfs:///tmp/spark/spark-examples_2.11-2.3.0.2.6.5.0-292.jar")
                        .addSource("jobName", "OnceJobTest")
                        .build();
        // endregion
        onceJob.submit();
        onceJob.waitForCompleted(); // 网络临时不通会导致异常，建议后期修改 SDK，现阶段使用，需要做异常处理
    }
}
```
## 3. 注意事项
1. 提交任务中使用的 jar 包或参数文件需要提前上传到 hdfs 或共享目录中

2. spark-submit jar 仅支持 Once 任务