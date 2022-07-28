---
title: JAVA SDK Manual
sidebar_position: 2
---

> Linkis provides a convenient interface for calling JAVA and SCALA. It can be used only by introducing the linkis-computation-client module. After 1.0, the method of submitting with Label is added. The following will introduce both ways that compatible with 0.X and newly added in 1.0.

## 1. Introduce dependent modules
```
<dependency>
   <groupId>org.apache.linkis</groupId>
   <artifactId>linkis-computation-client</artifactId>
   <version>${linkis.version}</version>
</dependency>
Such as:
<dependency>
   <groupId>org.apache.linkis</groupId>
   <artifactId>linkis-computation-client</artifactId>
   <version>1.0.2</version>
</dependency>
```

## 2. Java test code

Create the Java test class LinkisClientTest. Refer to the comments to understand the purposes of those interfaces:

```java
package com.webank.wedatasphere.linkis.client.test;

import com.webank.wedatasphere.linkis.common.utils.Utils;
import com.webank.wedatasphere.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy;
import com.webank.wedatasphere.linkis.httpclient.dws.config.DWSClientConfig;
import com.webank.wedatasphere.linkis.httpclient.dws.config.DWSClientConfigBuilder;
import com.webank.wedatasphere.linkis.manager.label.constant.LabelKeyConstant;
import com.webank.wedatasphere.linkis.protocol.constants.TaskConstant;
import com.webank.wedatasphere.linkis.ujes.client.UJESClient;
import com.webank.wedatasphere.linkis.ujes.client.UJESClientImpl;
import com.webank.wedatasphere.linkis.ujes.client.request.JobExecuteAction;
import com.webank.wedatasphere.linkis.ujes.client.request.JobSubmitAction;
import com.webank.wedatasphere.linkis.ujes.client.request.ResultSetAction;
import com.webank.wedatasphere.linkis.ujes.client.response.JobExecuteResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobInfoResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobLogResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobProgressResult;
import org.apache.commons.io.IOUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class JavaClientTest {

    // 1. build config: linkis gateway url
    private static DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
            .addServerUrl("http://10.107.118.104:9001/")   //set linkis-mg-gateway url: http://{ip}:{port}
            .connectionTimeout(30000)   //connectionTimeOut
            .discoveryEnabled(false) //disable discovery
            .discoveryFrequency(1, TimeUnit.MINUTES)  // discovery frequency
            .loadbalancerEnabled(true)  // enable loadbalance
            .maxConnectionSize(5)   // set max Connection
            .retryEnabled(false) // set retry
            .readTimeout(30000)  //set read timeout
            .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis authen suppory static and Token
            .setAuthTokenKey("hadoop")  // set submit user
            .setAuthTokenValue("hadoop")))  // set passwd or token (setAuthTokenValue("BML-AUTH"))
            .setDWSVersion("v1") //linkis rest version v1
            .build();

    // 2. new Client(Linkis Client) by clientConfig
    private static UJESClient client = new UJESClientImpl(clientConfig);

    public static void main(String[] args){

        String user = "hadoop"; // execute user
        String executeCode = "df=spark.sql(\"show tables\")\n" +
                "show(df)"; // code support:sql/hql/py/scala
        try {

            System.out.println("user : " + user + ", code : [" + executeCode + "]");
            // 3. build job and execute
            JobExecuteResult jobExecuteResult = toSubmit(user, executeCode);
            //0.x:JobExecuteResult jobExecuteResult = toExecute(user, executeCode);
            System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());
            // 4. get job jonfo
            JobInfoResult jobInfoResult = client.getJobInfo(jobExecuteResult);
            int sleepTimeMills = 1000;
            int logFromLen = 0;
            int logSize = 100;
            while(!jobInfoResult.isCompleted()) {
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
            Object fileContents = client.resultSet(ResultSetAction.builder().setPath(resultSet).setUser(jobExecuteResult.getUser()).build()).getFileContent();
            System.out.println("res: " + fileContents);
        } catch (Exception e) {
            e.printStackTrace();
            IOUtils.closeQuietly(client);
        }
        IOUtils.closeQuietly(client);
    }

    /**
     * Linkis 1.0 recommends the use of Submit method
     */
    private static JobExecuteResult toSubmit(String user, String code) {
        // 1. build  params
        // set label map :EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel/Tenant
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-IDE");// required execute user and creator
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

    /**
     * Compatible with 0.X execution mode
     */
    private static JobExecuteResult toExecute(String user, String code) {
        // 1. build  params
        // set label map :EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel/Tenant
        Map<String, Object> labels = new HashMap<String, Object>();
        // labels.put(LabelKeyConstant.TENANT_KEY, "fate");
        // set start up map :engineConn start params
        Map<String, Object> startupMap = new HashMap<String, Object>(16);
        // Support setting engine native parameters,For example: parameters of engines such as spark/hive
        startupMap.put("spark.executor.instances", 2);
        // setting linkis params
        startupMap.put("wds.linkis.rm.yarnqueue", "dws");

        // 2. build JobExecuteAction (0.X old way of using)
        JobExecuteAction executionAction = JobExecuteAction.builder()
                .setCreator("IDE")  //creator, the system name of the client requesting linkis, used for system-level isolation
                .addExecuteCode(code)   //Execution Code
                .setEngineTypeStr("spark") // engineConn type
                .setRunTypeStr("py") // code type
                .setUser(user)   //execute user
                .setStartupParams(startupMap) // start up params
                .build();
        executionAction.addRequestPayload(TaskConstant.LABELS, labels);
        String body = executionAction.getRequestPayload();
        System.out.println(body);

        // 3. to execute
        return client.execute(executionAction);
    }
}

```

Run the above code to interact with Linkis

## 3. Scala test code
Create the Scala test class LinkisClientTest. Refer to the comments to understand the purposes of those interfaces:

```scala
package com.webank.wedatasphere.linkis.client.test

import java.util
import java.util.concurrent.TimeUnit

import com.webank.wedatasphere.linkis.common.utils.Utils
import com.webank.wedatasphere.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy
import com.webank.wedatasphere.linkis.httpclient.dws.config.DWSClientConfigBuilder
import com.webank.wedatasphere.linkis.manager.label.constant.LabelKeyConstant
import com.webank.wedatasphere.linkis.protocol.constants.TaskConstant
import com.webank.wedatasphere.linkis.ujes.client.UJESClient
import com.webank.wedatasphere.linkis.ujes.client.request.{JobExecuteAction, JobSubmitAction, ResultSetAction}
import com.webank.wedatasphere.linkis.ujes.client.response.JobExecuteResult
import org.apache.commons.io.IOUtils
import org.apache.commons.lang.StringUtils


object ScalaClientTest {

  // 1. build config: linkis gateway url
  val clientConfig = DWSClientConfigBuilder.newBuilder()
    .addServerUrl("http://10.107.118.104:9001/")   //set linkis-mg-gateway url: http://{ip}:{port}
    .connectionTimeout(30000)   //connectionTimeOut
    .discoveryEnabled(false) //disable discovery
    .discoveryFrequency(1, TimeUnit.MINUTES)  // discovery frequency
    .loadbalancerEnabled(true)  // enable loadbalance
    .maxConnectionSize(5)   // set max Connection
    .retryEnabled(false) // set retry
    .readTimeout(30000)  //set read timeout
    .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis authen suppory static and Token
    .setAuthTokenKey("hadoop")  // set submit user
    .setAuthTokenValue("hadoop")  // set passwd or token (setAuthTokenValue("BML-AUTH"))
    .setDWSVersion("v1") //linkis rest version v1
    .build();

  // 2. new Client(Linkis Client) by clientConfig
  val client = UJESClient(clientConfig)

  def main(args: Array[String]): Unit = {
    val user = "hadoop" // execute user
    val executeCode = "df=spark.sql(\"show tables\")\n" +
      "show(df)"; // code support:sql/hql/py/scala
    try {
      // 3. build job and execute
      println("user : " + user + ", code : [" + executeCode + "]")
      val jobExecuteResult = toSubmit(user, executeCode)
      //0.X: val jobExecuteResult = toExecute(user, executeCode) 
      println("execId: " + jobExecuteResult.getExecID + ", taskId: " + jobExecuteResult.taskID)
      // 4. get job jonfo
      var jobInfoResult = client.getJobInfo(jobExecuteResult)
      var logFromLen = 0
      val logSize = 100
      val sleepTimeMills : Int = 1000
      while (!jobInfoResult.isCompleted) {
        // 5. get progress and log
        val progress = client.progress(jobExecuteResult)
        println("progress: " + progress.getProgress)
        val logObj = client .log(jobExecuteResult, logFromLen, logSize)
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
      val fileContents = client.resultSet(ResultSetAction.builder().setPath(oneResultSet).setUser(jobExecuteResult.getUser).build()).getFileContent
      println("First fileContents: ")
      println(fileContents)
    } catch {
      case e: Exception => {
        e.printStackTrace()
      }
    }
    IOUtils.closeQuietly(client)
  }

  /**
   * Linkis 1.0 recommends the use of Submit method
   */
  def toSubmit(user: String, code: String): JobExecuteResult = {
    // 1. build  params
    // set label map :EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel/Tenant
    val labels: util.Map[String, Any] = new util.HashMap[String, Any]
    labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
    labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-IDE");// required execute user and creator
    labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py"); // required codeType

    val startupMap = new java.util.HashMap[String, Any]()
    // Support setting engine native parameters,For example: parameters of engines such as spark/hive
    startupMap.put("spark.executor.instances", 2);
    // setting linkis params
    startupMap.put("wds.linkis.rm.yarnqueue", "dws");
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


  /**
   * Compatible with 0.X execution mode
   */
  def toExecute(user: String, code: String): JobExecuteResult = {
    // 1. build  params
    // set label map :EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel/Tenant
    val labels = new util.HashMap[String, Any]
    // labels.put(LabelKeyConstant.TENANT_KEY, "fate");

    val startupMap = new java.util.HashMap[String, Any]()
    // Support setting engine native parameters,For example: parameters of engines such as spark/hive
    startupMap.put("spark.executor.instances", 2)
    // setting linkis params
    startupMap.put("wds.linkis.rm.yarnqueue", "dws")
    // 2. build JobExecuteAction (0.X old way of using)
    val  executionAction = JobExecuteAction.builder()
      .setCreator("IDE")  //creator, the system name of the client requesting linkis, used for system-level isolation
      .addExecuteCode(code)   //Execution Code
      .setEngineTypeStr("spark") // engineConn type
      .setRunTypeStr("py") // code type
      .setUser(user)   //execute user
      .setStartupParams(startupMap) // start up params
      .build();
    executionAction.addRequestPayload(TaskConstant.LABELS, labels);
    // 3. to execute
    client.execute(executionAction)
  }


}


```