---
title: User Manual
sidebar_position: 3
---

# Linkis User Manual

> Linkis provides a convenient interface for calling JAVA and SCALA. It can be used only by introducing the linkis-computation-client module. After 1.0, the method of submitting with Label is added. The following will introduce both ways that compatible with 0.X and newly added in 1.0.

## 1. Introduce dependent modules
```
<dependency>
   <groupId>com.webank.wedatasphere.linkis</groupId>
   <artifactId>linkis-computation-client</artifactId>
   <version>${linkis.version}</version>
</dependency>
Such as:
<dependency>
   <groupId>com.webank.wedatasphere.linkis</groupId>
   <artifactId>linkis-computation-client</artifactId>
   <version>1.0.0-RC1</version>
</dependency>
```

## 2. Compatible with 0.X Execute method submission

### 2.1 Java test code

Create the Java test class UJESClientImplTestJ. Refer to the comments to understand the purposes of those interfaces:

```java
package com.webank.wedatasphere.linkis.client.test;

import com.webank.wedatasphere.linkis.common.utils.Utils;
import com.webank.wedatasphere.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy;
import com.webank.wedatasphere.linkis.httpclient.dws.authentication.TokenAuthenticationStrategy;
import com.webank.wedatasphere.linkis.httpclient.dws.config.DWSClientConfig;
import com.webank.wedatasphere.linkis.httpclient.dws.config.DWSClientConfigBuilder;
import com.webank.wedatasphere.linkis.ujes.client.UJESClient;
import com.webank.wedatasphere.linkis.ujes.client.UJESClientImpl;
import com.webank.wedatasphere.linkis.ujes.client.request.JobExecuteAction;
import com.webank.wedatasphere.linkis.ujes.client.request.ResultSetAction;
import com.webank.wedatasphere.linkis.ujes.client.response.JobExecuteResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobInfoResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobProgressResult;
import org.apache.commons.io.IOUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class LinkisClientTest {

    public static void main(String[] args){

        String user = "hadoop";
        String executeCode = "show databases;";

        // 1. Configure DWSClientBuilder, get a DWSClientConfig through DWSClientBuilder
        DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
                .addServerUrl("http://${ip}:${port}")  //Specify ServerUrl, the address of the linkis gateway, such as http://{ip}:{port}
                .connectionTimeout(30000)   //connectionTimeOut Client connection timeout
                .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES)  //Whether to enable registration discovery, if enabled, the newly launched Gateway will be automatically discovered
                .loadbalancerEnabled(true)  // Whether to enable load balancing, if registration discovery is not enabled, load balancing is meaningless
                .maxConnectionSize(5)   //Specify the maximum number of connections, that is, the maximum number of concurrent
                .retryEnabled(false).readTimeout(30000)   //Execution failed, whether to allow retry
                .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis login authentication method
                .setAuthTokenKey("${username}").setAuthTokenValue("${password}")))  //Authentication key, generally the user name; authentication value, generally the password corresponding to the user name
                .setDWSVersion("v1").build();  //The version of the linkis backend protocol, the current version is v1

        // 2. Obtain a UJESClient through DWSClientConfig
        UJESClient client = new UJESClientImpl(clientConfig);

        try {
            // 3. Start code execution
            System.out.println("user : " + user + ", code : [" + executeCode + "]");
            Map<String, Object> startupMap = new HashMap<String, Object>();
            startupMap.put("wds.linkis.yarnqueue", "default"); // A variety of startup parameters can be stored in startupMap, see linkis management console configuration
            JobExecuteResult jobExecuteResult = client.execute(JobExecuteAction.builder()
                    .setCreator("linkisClient-Test")  //creator，the system name of the client requesting linkis, used for system-level isolation
                    .addExecuteCode(executeCode)   //ExecutionCode Requested code
                    .setEngineType((JobExecuteAction.EngineType) JobExecuteAction.EngineType$.MODULE$.HIVE()) // The execution engine type of the linkis that you want to request, such as Spark hive, etc.
                    .setUser(user)   //User，Requesting users; used for user-level multi-tenant isolation
                    .setStartupParams(startupMap)
                    .build());
            System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());

            // 4. Get the execution status of the script
            JobInfoResult jobInfoResult = client.getJobInfo(jobExecuteResult);
            int sleepTimeMills = 1000;
            while(!jobInfoResult.isCompleted()) {
                // 5. Get the execution progress of the script
                JobProgressResult progress = client.progress(jobExecuteResult);
                Utils.sleepQuietly(sleepTimeMills);
                jobInfoResult = client.getJobInfo(jobExecuteResult);
            }

            // 6. Get the job information of the script
            JobInfoResult jobInfo = client.getJobInfo(jobExecuteResult);
            // 7. Get a list of result sets (if the user submits multiple SQL at a time, multiple result sets will be generated)
            String resultSet = jobInfo.getResultSetList(client)[0];
            // 8. Get a specific result set through a result set information
            Object fileContents = client.resultSet(ResultSetAction.builder().setPath(resultSet).setUser(jobExecuteResult.getUser()).build()).getFileContent();
            System.out.println("fileContents: " + fileContents);

        } catch (Exception e) {
            e.printStackTrace();
            IOUtils.closeQuietly(client);
        }
        IOUtils.closeQuietly(client);
    }
}
```

Run the above code to interact with Linkis

### 3. Scala test code:

```scala
package com.webank.wedatasphere.linkis.client.test

import java.util.concurrent.TimeUnit

import com.webank.wedatasphere.linkis.common.utils.Utils
import com.webank.wedatasphere.linkis.httpclient.dws.authentication.StaticAuthenticationStrategy
import com.webank.wedatasphere.linkis.httpclient.dws.config.DWSClientConfigBuilder
import com.webank.wedatasphere.linkis.ujes.client.UJESClient
import com.webank.wedatasphere.linkis.ujes.client.request.JobExecuteAction.EngineType
import com.webank.wedatasphere.linkis.ujes.client.request.{JobExecuteAction, ResultSetAction}
import org.apache.commons.io.IOUtils

object LinkisClientImplTest extends App {

  var executeCode = "show databases;"
  var user = "hadoop"

  // 1. Configure DWSClientBuilder, get a DWSClientConfig through DWSClientBuilder
  val clientConfig = DWSClientConfigBuilder.newBuilder()
    .addServerUrl("http://${ip}:${port}") //Specify ServerUrl, the address of the Linkis server-side gateway, such as http://{ip}:{port}
    .connectionTimeout(30000) //connectionTimeOut client connection timeout
    .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES) //Whether to enable registration discovery, if enabled, the newly launched Gateway will be automatically discovered
    .loadbalancerEnabled(true) // Whether to enable load balancing, if registration discovery is not enabled, load balancing is meaningless
    .maxConnectionSize(5) //Specify the maximum number of connections, that is, the maximum number of concurrent
    .retryEnabled(false).readTimeout(30000) //execution failed, whether to allow retry
    .setAuthenticationStrategy(new StaticAuthenticationStrategy()) //AuthenticationStrategy Linkis authentication method
    .setAuthTokenKey("${username}").setAuthTokenValue("${password}") //Authentication key, generally the user name; authentication value, generally the password corresponding to the user name
    .setDWSVersion("v1").build() //Linkis backend protocol version, the current version is v1

  // 2. Get a UJESClient through DWSClientConfig
  val client = UJESClient(clientConfig)
  
  try {
    // 3. Start code execution
    println("user: "+ user + ", code: [" + executeCode + "]")
    val startupMap = new java.util.HashMap[String, Any]()
    startupMap.put("wds.linkis.yarnqueue", "default") //Startup parameter configuration
    val jobExecuteResult = client.execute(JobExecuteAction.builder()
      .setCreator("LinkisClient-Test") //creator, requesting the system name of the Linkis client, used for system-level isolation
      .addExecuteCode(executeCode) //ExecutionCode The code to be executed
      .setEngineType(EngineType.SPARK) // The execution engine type of Linkis that you want to request, such as Spark hive, etc.
      .setStartupParams(startupMap)
      .setUser(user).build()) //User, request user; used for user-level multi-tenant isolation
    println("execId: "+ jobExecuteResult.getExecID + ", taskId:" + jobExecuteResult.taskID)
    
    // 4. Get the execution status of the script
    var jobInfoResult = client.getJobInfo(jobExecuteResult)
    val sleepTimeMills: Int = 1000
    while (!jobInfoResult.isCompleted) {
      // 5. Get the execution progress of the script
      val progress = client.progress(jobExecuteResult)
      val progressInfo = if (progress.getProgressInfo != null) progress.getProgressInfo.toList else List.empty
      println("progress: "+ progress.getProgress + ", progressInfo:" + progressInfo)
      Utils.sleepQuietly(sleepTimeMills)
      jobInfoResult = client.getJobInfo(jobExecuteResult)
    }
    if (!jobInfoResult.isSucceed) {
      println("Failed to execute job: "+ jobInfoResult.getMessage)
      throw new Exception(jobInfoResult.getMessage)
    }

    // 6. Get the job information of the script
    val jobInfo = client.getJobInfo(jobExecuteResult)
    // 7. Get the list of result sets (if the user submits multiple SQL at a time, multiple result sets will be generated)
    val resultSetList = jobInfoResult.getResultSetList(client)
    println("All result set list:")
    resultSetList.foreach(println)
    val oneResultSet = jobInfo.getResultSetList(client).head
    // 8. Get a specific result set through a result set information
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
```

## 3. Linkis1.0 new submit interface with Label support

Linkis1.0 adds the client.submit method, which is used to adapt with the new task execution interface of 1.0, and supports the input of Label and other parameters

### 3.1 Java Test Class

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
import com.webank.wedatasphere.linkis.ujes.client.request.JobSubmitAction;
import com.webank.wedatasphere.linkis.ujes.client.request.ResultSetAction;
import com.webank.wedatasphere.linkis.ujes.client.response.JobExecuteResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobInfoResult;
import com.webank.wedatasphere.linkis.ujes.client.response.JobProgressResult;
import org.apache.commons.io.IOUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class JavaClientTest {

    public static void main(String[] args){

        String user = "hadoop";
        String executeCode = "show tables";

        // 1. Configure ClientBuilder and get ClientConfig
        DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
                .addServerUrl("http://${ip}:${port}") //Specify ServerUrl, the address of the linkis server-side gateway, such as http://{ip}:{port}
                .connectionTimeout(30000) //connectionTimeOut client connection timeout
                .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES) //Whether to enable registration discovery, if enabled, the newly launched Gateway will be automatically discovered
                .loadbalancerEnabled(true) // Whether to enable load balancing, if registration discovery is not enabled, load balancing is meaningless
                .maxConnectionSize(5) //Specify the maximum number of connections, that is, the maximum number of concurrent
                .retryEnabled(false).readTimeout(30000) //execution failed, whether to allow retry
                .setAuthenticationStrategy(new StaticAuthenticationStrategy()) //AuthenticationStrategy Linkis authentication method
                .setAuthTokenKey("${username}").setAuthTokenValue("${password}"))) //Authentication key, generally the user name; authentication value, generally the password corresponding to the user name
                .setDWSVersion("v1").build(); //Linkis background protocol version, the current version is v1

        // 2. Get a UJESClient through DWSClientConfig
        UJESClient client = new UJESClientImpl(clientConfig);

        try {
            // 3. Start code execution
            System.out.println("user: "+ user + ", code: [" + executeCode + "]");
            Map<String, Object> startupMap = new HashMap<String, Object>();
            // A variety of startup parameters can be stored in startupMap, see linkis management console configuration
            startupMap.put("wds.linkis.yarnqueue", "q02");
            //Specify Label
            Map<String, Object> labels = new HashMap<String, Object>();
            //Add the label that this execution depends on: EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel
            labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "hive-1.2.1");
            labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");
            labels.put(LabelKeyConstant.ENGINE_RUN_TYPE_KEY, "hql");
            //Specify source
            Map<String, Object> source = new HashMap<String, Object>();
            source.put(TaskConstant.SCRIPTPATH, "LinkisClient-test");
            JobExecuteResult jobExecuteResult = client.submit( JobSubmitAction.builder()
                    .addExecuteCode(executeCode)
                    .setStartupParams(startupMap)
                    .setUser(user)//Job submit user
                    .addExecuteUser(user)//The actual execution user
                    .setLabels(labels)
                    .setSource(source)
                    .build()
            );
            System.out.println("execId: "+ jobExecuteResult.getExecID() + ", taskId:" + jobExecuteResult.taskID());

            // 4. Get the execution status of the script
            JobInfoResult jobInfoResult = client.getJobInfo(jobExecuteResult);
            int sleepTimeMills = 1000;
            while(!jobInfoResult.isCompleted()) {
                // 5. Get the execution progress of the script
                JobProgressResult progress = client.progress(jobExecuteResult);
                Utils.sleepQuietly(sleepTimeMills);
                jobInfoResult = client.getJobInfo(jobExecuteResult);
            }

            // 6. Get the job information of the script
            JobInfoResult jobInfo = client.getJobInfo(jobExecuteResult);
            // 7. Get the list of result sets (if the user submits multiple SQL at a time, multiple result sets will be generated)
            String resultSet = jobInfo.getResultSetList(client)[0];
            // 8. Get a specific result set through a result set information
            Object fileContents = client.resultSet(ResultSetAction.builder().setPath(resultSet).setUser(jobExecuteResult.getUser()).build()).getFileContent();
            System.out.println("fileContents: "+ fileContents);

        } catch (Exception e) {
            e.printStackTrace();
            IOUtils.closeQuietly(client);
        }
        IOUtils.closeQuietly(client);
    }
}

```

### 3.2 Scala Test Class

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
import com.webank.wedatasphere.linkis.ujes.client.request.{JobSubmitAction, ResultSetAction}
import org.apache.commons.io.IOUtils


object ScalaClientTest {

  def main(args: Array[String]): Unit = {
    val executeCode = "show tables"
    val user = "hadoop"

    // 1. Configure DWSClientBuilder, get a DWSClientConfig through DWSClientBuilder
    val clientConfig = DWSClientConfigBuilder.newBuilder()
      .addServerUrl("http://${ip}:${port}") //Specify ServerUrl, the address of the Linkis server-side gateway, such as http://{ip}:{port}
      .connectionTimeout(30000) //connectionTimeOut client connection timeout
      .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES) //Whether to enable registration discovery, if enabled, the newly launched Gateway will be automatically discovered
      .loadbalancerEnabled(true) // Whether to enable load balancing, if registration discovery is not enabled, load balancing is meaningless
      .maxConnectionSize(5) //Specify the maximum number of connections, that is, the maximum number of concurrent
      .retryEnabled(false).readTimeout(30000) //execution failed, whether to allow retry
      .setAuthenticationStrategy(new StaticAuthenticationStrategy()) //AuthenticationStrategy Linkis authentication method
      .setAuthTokenKey("${username}").setAuthTokenValue("${password}") //Authentication key, generally the user name; authentication value, generally the password corresponding to the user name
      .setDWSVersion("v1").build() //Linkis backend protocol version, the current version is v1

    // 2. Get a UJESClient through DWSClientConfig
    val client = UJESClient(clientConfig)

    try {
      // 3. Start code execution
      println("user: "+ user + ", code: [" + executeCode + "]")
      val startupMap = new java.util.HashMap[String, Any]()
      startupMap.put("wds.linkis.yarnqueue", "q02") //Startup parameter configuration
      //Specify Label
      val labels: util.Map[String, Any] = new util.HashMap[String, Any]
      //Add the label that this execution depends on, such as engineLabel
      labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "hive-1.2.1")
      labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE")
      labels.put(LabelKeyConstant.ENGINE_RUN_TYPE_KEY, "hql")
      //Specify source
      val source: util.Map[String, Any] = new util.HashMap[String, Any]
      source.put(TaskConstant.SCRIPTPATH, "LinkisClient-test")
      val jobExecuteResult = client.submit(JobSubmitAction.builder
          .addExecuteCode(executeCode)
          .setStartupParams(startupMap)
          .setUser(user) //Job submit user
          .addExecuteUser(user) //The actual execution user
          .setLabels(labels)
          .setSource(source)
          .build) //User, requesting user; used for user-level multi-tenant isolation
      println("execId: "+ jobExecuteResult.getExecID + ", taskId:" + jobExecuteResult.taskID)

      // 4. Get the execution status of the script
      var jobInfoResult = client.getJobInfo(jobExecuteResult)
      val sleepTimeMills: Int = 1000
      while (!jobInfoResult.isCompleted) {
        // 5. Get the execution progress of the script
        val progress = client.progress(jobExecuteResult)
        val progressInfo = if (progress.getProgressInfo != null) progress.getProgressInfo.toList else List.empty
        println("progress: "+ progress.getProgress + ", progressInfo:" + progressInfo)
        Utils.sleepQuietly(sleepTimeMills)
        jobInfoResult = client.getJobInfo(jobExecuteResult)
      }
      if (!jobInfoResult.isSucceed) {
        println("Failed to execute job: "+ jobInfoResult.getMessage)
        throw new Exception(jobInfoResult.getMessage)
      }

      // 6. Get the job information of the script
      val jobInfo = client.getJobInfo(jobExecuteResult)
      // 7. Get the list of result sets (if the user submits multiple SQL at a time, multiple result sets will be generated)
      val resultSetList = jobInfoResult.getResultSetList(client)
      println("All result set list:")
      resultSetList.foreach(println)
      val oneResultSet = jobInfo.getResultSetList(client).head
      // 8. Get a specific result set through a result set information
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

}

```
