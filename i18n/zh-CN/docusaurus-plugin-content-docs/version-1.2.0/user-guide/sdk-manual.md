---
title: JAVA SDK 方式使用
sidebar_position: 3
---

> Linkis 提供了方便的JAVA和SCALA调用的接口，只需要引入linkis-computation-client的模块就可以进行使用，1.0后新增支持带Label提交的方式，下面将对兼容0.X的方式和1.0新增的方式进行介绍

## 1. 引入依赖模块
```
<dependency>
  <groupId>org.apache.linkis</groupId>
  <artifactId>linkis-computation-client</artifactId>
  <version>${linkis.version}</version>
</dependency>
如：
<dependency>
  <groupId>org.apache.linkis</groupId>
  <artifactId>linkis-computation-client</artifactId>
  <version>1.0.3</version>
</dependency>
```

## 2. Java测试代码
建立Java的测试类LinkisClientTest，具体接口含义可以见注释：
```java
package org.apache.linkis.client.test;

import org.apache.linkis.common.utils.Utils;
import org.apache.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy;
import org.apache.linkis.httpclient.dws.config.DWSClientConfig;
import org.apache.linkis.httpclient.dws.config.DWSClientConfigBuilder;
import org.apache.linkis.manager.label.constant.LabelKeyConstant;
import org.apache.linkis.protocol.constants.TaskConstant;
import org.apache.linkis.ujes.client.UJESClient;
import org.apache.linkis.ujes.client.UJESClientImpl;
import org.apache.linkis.ujes.client.request.JobSubmitAction;
import org.apache.linkis.ujes.client.request.JobExecuteAction;
import org.apache.linkis.ujes.client.request.ResultSetAction;
import org.apache.linkis.ujes.client.response.*;
import org.apache.commons.io.IOUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class LinkisClientTest {

    // 1. build config: linkis gateway url
    private static DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
            .addServerUrl("http://127.0.0.1:9001/")   //set linkis-mg-gateway url: http://{ip}:{port}
            .connectionTimeout(30000)   //connectionTimeOut
            .discoveryEnabled(false) //disable discovery
            .discoveryFrequency(1, TimeUnit.MINUTES)  // discovery frequency
            .loadbalancerEnabled(true)  // enable loadbalance
            .maxConnectionSize(5)   // set max Connection
            .retryEnabled(true) // set retry
            .readTimeout(30000)  //set read timeout
            .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis authen suppory static and Token
            .setAuthTokenKey("hadoop")  // set submit user
            .setAuthTokenValue("123456")))  // set passwd or token (setAuthTokenValue("test"))
            .setDWSVersion("v1") //linkis rest version v1
            .build();

    // 2. new Client(Linkis Client) by clientConfig
    private static UJESClient client = new UJESClientImpl(clientConfig);

    public static void main(String[] args) {

        String user = "hadoop"; // 用户需要和AuthTokenKey的值保持一致
        String executeCode = "df=spark.sql(\"show tables\")\n" +
                "show(df)"; // code support:sql/hql/py/scala
        try {

            System.out.println("user : " + user + ", code : [" + executeCode + "]");
            // 3. build job and execute
            JobExecuteResult jobExecuteResult = toSubmit(user, executeCode);
            System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());
            // 4. get job jonfo
            JobInfoResult jobInfoResult = client.getJobInfo(jobExecuteResult);
            int sleepTimeMills = 1000;
            int logFromLen = 0;
            int logSize = 100;
            while (!jobInfoResult.isCompleted()) {
                // 5. get progress and log
                JobProgressResult progress = client.progress(jobExecuteResult);
                System.out.println("progress: " + progress.getProgress());
                JobLogResult logRes = client.log(jobExecuteResult, logFromLen, logSize);
                logFromLen = logRes.fromLine();
                // 0: info 1: warn 2: error 3: all
                System.out.println(logRes.log().get(3));
                Utils.sleepQuietly(sleepTimeMills);
                jobInfoResult = client.getJobInfo(jobExecuteResult);
            }

            JobInfoResult jobInfo = client.getJobInfo(jobExecuteResult);
            // 6. Get the result set list (if the user submits multiple SQLs at a time,
            // multiple result sets will be generated)
            String resultSet = jobInfo.getResultSetList(client)[0];
            // 7. get resultContent
            ResultSetResult resultSetResult = client.resultSet(ResultSetAction.builder().setPath(resultSet).setUser(jobExecuteResult.getUser()).build());
            System.out.println("metadata: " + resultSetResult.getMetadata()); // column name type
            System.out.println("res: " + resultSetResult.getFileContent()); //row data
        } catch (Exception e) {
            e.printStackTrace();// please use log
            IOUtils.closeQuietly(client);
        }
        IOUtils.closeQuietly(client);
    }


    private static JobExecuteResult toSubmit(String user, String code) {
        // 1. build  params
        // set label map :EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel/Tenant
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-APPName");// required execute user and creator eg:hadoop-IDE
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py"); // required codeType
        // set start up map :engineConn start params
        Map<String, Object> startupMap = new HashMap<String, Object>(16);
        // Support setting engine native parameters,For example: parameters of engines such as spark/hive
        startupMap.put("spark.executor.instances", 2);
        // setting linkis params
        startupMap.put("wds.linkis.rm.yarnqueue", "dws");

        // 2. build jobSubmitAction
        JobSubmitAction jobSubmitAction = JobSubmitAction.builder()
                .addExecuteCode(code)
                .setStartupParams(startupMap)
                .setUser(user) //submit user
                .addExecuteUser(user)  // execute user
                .setLabels(labels)
                .build();
        // 3. to execute
        return client.submit(jobSubmitAction);
    }
}
```

运行上述的代码即可以完成任务提交/执行/日志/结果集获取等

## 3. Scala测试代码：

```scala
package org.apache.linkis.client.test

import org.apache.commons.io.IOUtils
import org.apache.commons.lang3.StringUtils
import org.apache.linkis.common.utils.Utils
import org.apache.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy
import org.apache.linkis.httpclient.dws.config.DWSClientConfigBuilder
import org.apache.linkis.manager.label.constant.LabelKeyConstant
import org.apache.linkis.ujes.client.request._
import org.apache.linkis.ujes.client.response._

import java.util
import java.util.concurrent.TimeUnit

object LinkisClientTest {
  // 1. build config: linkis gateway url
  val clientConfig = DWSClientConfigBuilder.newBuilder()
    .addServerUrl("http://127.0.0.1:9001/") //set linkis-mg-gateway url: http://{ip}:{port}
    .connectionTimeout(30000) //connectionTimeOut
    .discoveryEnabled(false) //disable discovery
    .discoveryFrequency(1, TimeUnit.MINUTES) // discovery frequency
    .loadbalancerEnabled(true) // enable loadbalance
    .maxConnectionSize(5) // set max Connection
    .retryEnabled(false) // set retry
    .readTimeout(30000) //set read timeout
    .setAuthenticationStrategy(new StaticAuthenticationStrategy()) //AuthenticationStrategy Linkis authen suppory static and Token
    .setAuthTokenKey("hadoop") // set submit user
    .setAuthTokenValue("hadoop") // set passwd or token (setAuthTokenValue("BML-AUTH"))
    .setDWSVersion("v1") //linkis rest version v1
    .build();

  // 2. new Client(Linkis Client) by clientConfig
  val client = UJESClient(clientConfig)

  def main(args: Array[String]): Unit = {
    val user = "hadoop" // execute user 用户需要和AuthTokenKey的值保持一致
    val executeCode = "df=spark.sql(\"show tables\")\n" +
      "show(df)"; // code support:sql/hql/py/scala
    try {
      // 3. build job and execute
      println("user : " + user + ", code : [" + executeCode + "]")
      // 推荐使用submit，支持传递任务label
      val jobExecuteResult = toSubmit(user, executeCode)
      println("execId: " + jobExecuteResult.getExecID + ", taskId: " + jobExecuteResult.taskID)
      // 4. get job jonfo
      var jobInfoResult = client.getJobInfo(jobExecuteResult)
      var logFromLen = 0
      val logSize = 100
      val sleepTimeMills: Int = 1000
      while (!jobInfoResult.isCompleted) {
        // 5. get progress and log
        val progress = client.progress(jobExecuteResult)
        println("progress: " + progress.getProgress)
        val logObj = client.log(jobExecuteResult, logFromLen, logSize)
        logFromLen = logObj.fromLine
        val logArray = logObj.getLog
        // 0: info 1: warn 2: error 3: all
        if (logArray != null && logArray.size >= 4 && StringUtils.isNotEmpty(logArray.get(3))) {
          println(s"log: ${logArray.get(3)}")
        }
        Utils.sleepQuietly(sleepTimeMills)
        jobInfoResult = client.getJobInfo(jobExecuteResult)
      }
      if (!jobInfoResult.isSucceed) {
        println("Failed to execute job: " + jobInfoResult.getMessage)
        throw new Exception(jobInfoResult.getMessage)
      }

      // 6. Get the result set list (if the user submits multiple SQLs at a time,
      // multiple result sets will be generated)
      val jobInfo = client.getJobInfo(jobExecuteResult)
      val resultSetList = jobInfoResult.getResultSetList(client)
      println("All result set list:")
      resultSetList.foreach(println)
      val oneResultSet = jobInfo.getResultSetList(client).head
      // 7. get resultContent
      val resultSetResult: ResultSetResult = client.resultSet(ResultSetAction.builder.setPath(oneResultSet).setUser(jobExecuteResult.getUser).build)
      println("metadata: " + resultSetResult.getMetadata) // column name type
      println("res: " + resultSetResult.getFileContent) //row data
    } catch {
      case e: Exception => {
        e.printStackTrace() //please use log
      }
    }
    IOUtils.closeQuietly(client)
  }


  def toSubmit(user: String, code: String): JobExecuteResult = {
    // 1. build  params
    // set label map :EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel/Tenant
    val labels: util.Map[String, Any] = new util.HashMap[String, Any]
    labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
    labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-APPName"); // 请求的用户和应用名，两个参数都不能少，其中APPName不能带有"-"建议替换为"_"
    labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py"); // 指定脚本类型

    val startupMap = new java.util.HashMap[String, Any]()
    // Support setting engine native parameters,For example: parameters of engines such as spark/hive
    startupMap.put("spark.executor.instances", 2);
    // setting linkis params
    startupMap.put("wds.linkis.rm.yarnqueue", "default");
    // 2. build jobSubmitAction
    val jobSubmitAction = JobSubmitAction.builder
      .addExecuteCode(code)
      .setStartupParams(startupMap)
      .setUser(user) //submit user
      .addExecuteUser(user) //execute user
      .setLabels(labels)
      .build
    // 3. to execute
    client.submit(jobSubmitAction)
  }
}
```
