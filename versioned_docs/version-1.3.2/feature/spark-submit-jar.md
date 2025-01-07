---
title: Spark-Submit Jar package task
sidebar_position: 0.2
---

## 1. Background
In some scenarios, tasks need to be executed in the form of jar packages submitted through spark-submit.

## 2. Instructions for use
Submit the Spark task through the SDK, the code example is as follows.
```java
public class SparkOnceJobTest {

    public static void main(String[] args) {

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
                        // Parameters obtained by the submitted jar package
                        .addJobContent("spark.app.args", "hdfs:///tmp/test_word_count.txt") // WordCount test file
                        .addLabel("engineType", engineType + "-2.4.3")
                        .addLabel("userCreator", submitUser + "-IDE")
                        .addLabel("engineConnMode", "once")
                        .addStartupParam("spark.app.name", "spark-submit-jar-test-linkis") // Application Name displayed on yarn
                        .addStartupParam("spark.executor.memory", "1g")
                        .addStartupParam("spark.driver.memory", "1g")
                        .addStartupParam("spark.executor.cores", "1")
                        .addStartupParam("spark.executor.instance", "1")
                        .addStartupParam("spark.app.resource", "hdfs:///tmp/spark/spark-examples_2.11-2.3.0.2.6.5.0-292.jar")
                        .addSource("jobName", "OnceJobTest")
                        .build();
        // endregion
        onceJob. submit();
        onceJob.waitForCompleted(); // Temporary network failure will cause exceptions. It is recommended to modify the SDK later. For current use, exception handling is required
    }
}
```
## 3. Precautions
1. The jar package or parameter file used in submitting tasks needs to be uploaded to hdfs or a shared directory in advance

2. spark-submit jar only supports Once task