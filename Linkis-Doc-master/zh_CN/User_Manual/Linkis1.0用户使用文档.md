> Linkis 提供了方便的JAVA和SCALA调用的接口，只需要引入linkis-computation-client的模块就可以进行使用，1.0后新增支持带Label提交的方式，下面将对兼容0.X的方式和1.0新增的方式进行介绍

## 1. 引入依赖模块
```
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>linkis-computation-client</artifactId>
  <version>${linkis.version}</version>
</dependency>
如：
<dependency>
  <groupId>com.webank.wedatasphere.linkis</groupId>
  <artifactId>linkis-computation-client</artifactId>
  <version>1.0.0</version>
</dependency>
```

## 2. 兼容0.X的Execute方法提交
### 2.1 Java测试代码
建立Java的测试类UJESClientImplTestJ，具体接口含义可以见注释：
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

        // 1. 配置DWSClientBuilder，通过DWSClientBuilder获取一个DWSClientConfig
        DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
                .addServerUrl("http://${ip}:${port}")  //指定ServerUrl，linkis服务器端网关的地址,如http://{ip}:{port}
                .connectionTimeout(30000)   //connectionTimeOut 客户端连接超时时间
                .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES)  //是否启用注册发现，如果启用，会自动发现新启动的Gateway 
                .loadbalancerEnabled(true)  // 是否启用负载均衡，如果不启用注册发现，则负载均衡没有意义
                .maxConnectionSize(5)   //指定最大连接数，即最大并发数
                .retryEnabled(false).readTimeout(30000)   //执行失败，是否允许重试
                .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis认证方式
                .setAuthTokenKey("${username}").setAuthTokenValue("${password}")))  //认证key，一般为用户名;  认证value，一般为用户名对应的密码
                .setDWSVersion("v1").build();  //linkis后台协议的版本，当前版本为v1

        // 2. 通过DWSClientConfig获取一个UJESClient
        UJESClient client = new UJESClientImpl(clientConfig);

        try {
            // 3. 开始执行代码
            System.out.println("user : " + user + ", code : [" + executeCode + "]");
            Map<String, Object> startupMap = new HashMap<String, Object>();
            startupMap.put("wds.linkis.yarnqueue", "default"); // 在startupMap可以存放多种启动参数，参见linkis管理台配置
            JobExecuteResult jobExecuteResult = client.execute(JobExecuteAction.builder()
                    .setCreator("linkisClient-Test")  //creator，请求linkis的客户端的系统名，用于做系统级隔离
                    .addExecuteCode(executeCode)   //ExecutionCode 请求执行的代码
                    .setEngineType((JobExecuteAction.EngineType) JobExecuteAction.EngineType$.MODULE$.HIVE()) // 希望请求的linkis的执行引擎类型，如Spark hive等
                    .setUser(user)   //User，请求用户；用于做用户级多租户隔离
                    .setStartupParams(startupMap)
                    .build());
            System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());

            // 4. 获取脚本的执行状态
            JobInfoResult jobInfoResult = client.getJobInfo(jobExecuteResult);
            int sleepTimeMills = 1000;
            while(!jobInfoResult.isCompleted()) {
                // 5. 获取脚本的执行进度
                JobProgressResult progress = client.progress(jobExecuteResult);
                Utils.sleepQuietly(sleepTimeMills);
                jobInfoResult = client.getJobInfo(jobExecuteResult);
            }

            // 6. 获取脚本的Job信息
            JobInfoResult jobInfo = client.getJobInfo(jobExecuteResult);
            // 7. 获取结果集列表（如果用户一次提交多个SQL，会产生多个结果集）
            String resultSet = jobInfo.getResultSetList(client)[0];
            // 8. 通过一个结果集信息，获取具体的结果集
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
运行上述的代码即可以和Linkis进行交互

### 3. Scala测试代码：
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

  // 1. 配置DWSClientBuilder，通过DWSClientBuilder获取一个DWSClientConfig
  val clientConfig = DWSClientConfigBuilder.newBuilder()
    .addServerUrl("http://${ip}:${port}")  //指定ServerUrl，Linkis服务器端网关的地址,如http://{ip}:{port}
    .connectionTimeout(30000)  //connectionTimeOut 客户端连接超时时间
    .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES)  //是否启用注册发现，如果启用，会自动发现新启动的Gateway
    .loadbalancerEnabled(true)  // 是否启用负载均衡，如果不启用注册发现，则负载均衡没有意义
    .maxConnectionSize(5)   //指定最大连接数，即最大并发数
    .retryEnabled(false).readTimeout(30000)   //执行失败，是否允许重试
    .setAuthenticationStrategy(new StaticAuthenticationStrategy())  //AuthenticationStrategy Linkis认证方式
    .setAuthTokenKey("${username}").setAuthTokenValue("${password}")  //认证key，一般为用户名;  认证value，一般为用户名对应的密码
    .setDWSVersion("v1").build()  //Linkis后台协议的版本，当前版本为v1

  // 2. 通过DWSClientConfig获取一个UJESClient
  val client = UJESClient(clientConfig)
  
  try {
    // 3. 开始执行代码
    println("user : " + user + ", code : [" + executeCode + "]")
    val startupMap = new java.util.HashMap[String, Any]()
    startupMap.put("wds.linkis.yarnqueue", "default") //启动参数配置
    val jobExecuteResult = client.execute(JobExecuteAction.builder()
      .setCreator("LinkisClient-Test")  //creator，请求Linkis的客户端的系统名，用于做系统级隔离
      .addExecuteCode(executeCode)   //ExecutionCode 请求执行的代码
      .setEngineType(EngineType.SPARK) // 希望请求的Linkis的执行引擎类型，如Spark hive等
      .setStartupParams(startupMap)
      .setUser(user).build())  //User，请求用户；用于做用户级多租户隔离
    println("execId: " + jobExecuteResult.getExecID + ", taskId: " + jobExecuteResult.taskID)
    
    // 4. 获取脚本的执行状态
    var jobInfoResult = client.getJobInfo(jobExecuteResult)
    val sleepTimeMills : Int = 1000
    while (!jobInfoResult.isCompleted) {
      // 5. 获取脚本的执行进度   
      val progress = client.progress(jobExecuteResult)
      val progressInfo = if (progress.getProgressInfo != null) progress.getProgressInfo.toList else List.empty
      println("progress: " + progress.getProgress + ", progressInfo: " + progressInfo)
      Utils.sleepQuietly(sleepTimeMills)
      jobInfoResult = client.getJobInfo(jobExecuteResult)
    }
    if (!jobInfoResult.isSucceed) {
      println("Failed to execute job: " + jobInfoResult.getMessage)
      throw new Exception(jobInfoResult.getMessage)
    }

    // 6. 获取脚本的Job信息
    val jobInfo = client.getJobInfo(jobExecuteResult)
    // 7. 获取结果集列表（如果用户一次提交多个SQL，会产生多个结果集）
    val resultSetList = jobInfoResult.getResultSetList(client)
    println("All result set list:")
    resultSetList.foreach(println)
    val oneResultSet = jobInfo.getResultSetList(client).head
    // 8. 通过一个结果集信息，获取具体的结果集
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

## 3. 1.0新增的支持带Label提交的Submit方式
1.0 新增了client.submit方法，用于对接1.0新的任务执行接口，支持传入Label等参数
### 3.1 Java测试类
```
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

        // 1. 配置ClientBuilder，获取ClientConfig
        DWSClientConfig clientConfig = ((DWSClientConfigBuilder) (DWSClientConfigBuilder.newBuilder()
                .addServerUrl("http://${ip}:${port}")  //指定ServerUrl，linkis服务器端网关的地址,如http://{ip}:{port}
                .connectionTimeout(30000)   //connectionTimeOut 客户端连接超时时间
                .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES)  //是否启用注册发现，如果启用，会自动发现新启动的Gateway
                .loadbalancerEnabled(true)  // 是否启用负载均衡，如果不启用注册发现，则负载均衡没有意义
                .maxConnectionSize(5)   //指定最大连接数，即最大并发数
                .retryEnabled(false).readTimeout(30000)   //执行失败，是否允许重试
                .setAuthenticationStrategy(new StaticAuthenticationStrategy())   //AuthenticationStrategy Linkis认证方式
                .setAuthTokenKey("${username}").setAuthTokenValue("${password}")))  //认证key，一般为用户名;  认证value，一般为用户名对应的密码
                .setDWSVersion("v1").build();  //linkis后台协议的版本，当前版本为v1

        // 2. 通过DWSClientConfig获取一个UJESClient
        UJESClient client = new UJESClientImpl(clientConfig);

        try {
            // 3. 开始执行代码
            System.out.println("user : " + user + ", code : [" + executeCode + "]");
            Map<String, Object> startupMap = new HashMap<String, Object>();
            // 在startupMap可以存放多种启动参数，参见linkis管理台配置
            startupMap.put("wds.linkis.yarnqueue", "q02");
            //指定Label
            Map<String, Object> labels = new HashMap<String, Object>();
            //添加本次执行所依赖的的标签:EngineTypeLabel/UserCreatorLabel/EngineRunTypeLabel
            labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "hive-1.2.1");
            labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");
            labels.put(LabelKeyConstant.CODE_TYPE_KEY, "hql");
            //指定source
            Map<String, Object> source = new HashMap<String, Object>();
            source.put(TaskConstant.SCRIPTPATH, "LinkisClient-test");
            JobExecuteResult jobExecuteResult = client.submit( JobSubmitAction.builder()
                    .addExecuteCode(executeCode)
                    .setStartupParams(startupMap)
                    .setUser(user)//Job提交用户
                    .addExecuteUser(user)//实际执行用户
                    .setLabels(labels)
                    .setSource(source)
                    .build()
            );
            System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());

            // 4. 获取脚本的执行状态
            JobInfoResult jobInfoResult = client.getJobInfo(jobExecuteResult);
            int sleepTimeMills = 1000;
            while(!jobInfoResult.isCompleted()) {
                // 5. 获取脚本的执行进度
                JobProgressResult progress = client.progress(jobExecuteResult);
                Utils.sleepQuietly(sleepTimeMills);
                jobInfoResult = client.getJobInfo(jobExecuteResult);
            }

            // 6. 获取脚本的Job信息
            JobInfoResult jobInfo = client.getJobInfo(jobExecuteResult);
            // 7. 获取结果集列表（如果用户一次提交多个SQL，会产生多个结果集）
            String resultSet = jobInfo.getResultSetList(client)[0];
            // 8. 通过一个结果集信息，获取具体的结果集
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
### 3.2 Scala 测试类

```
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

    // 1. 配置DWSClientBuilder，通过DWSClientBuilder获取一个DWSClientConfig
    val clientConfig = DWSClientConfigBuilder.newBuilder()
      .addServerUrl("http://${ip}:${port}") //指定ServerUrl，Linkis服务器端网关的地址,如http://{ip}:{port}
      .connectionTimeout(30000)  //connectionTimeOut 客户端连接超时时间
      .discoveryEnabled(false).discoveryFrequency(1, TimeUnit.MINUTES)  //是否启用注册发现，如果启用，会自动发现新启动的Gateway
      .loadbalancerEnabled(true)  // 是否启用负载均衡，如果不启用注册发现，则负载均衡没有意义
      .maxConnectionSize(5)   //指定最大连接数，即最大并发数
      .retryEnabled(false).readTimeout(30000)   //执行失败，是否允许重试
      .setAuthenticationStrategy(new StaticAuthenticationStrategy())  //AuthenticationStrategy Linkis认证方式
      .setAuthTokenKey("${username}").setAuthTokenValue("${password}") //认证key，一般为用户名;  认证value，一般为用户名对应的密码
      .setDWSVersion("v1").build()  //Linkis后台协议的版本，当前版本为v1

    // 2. 通过DWSClientConfig获取一个UJESClient
    val client = UJESClient(clientConfig)

    try {
      // 3. 开始执行代码
      println("user : " + user + ", code : [" + executeCode + "]")
      val startupMap = new java.util.HashMap[String, Any]()
      startupMap.put("wds.linkis.yarnqueue", "q02") //启动参数配置
      //指定Label
      val labels: util.Map[String, Any] = new util.HashMap[String, Any]
      //添加本次执行所依赖的的标签，如engineLabel
      labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "hive-1.2.1")
      labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE")
      labels.put(LabelKeyConstant.CODE_TYPE_KEY, "hql")
      //指定source
      val source: util.Map[String, Any] = new util.HashMap[String, Any]
      source.put(TaskConstant.SCRIPTPATH, "LinkisClient-test")
      val jobExecuteResult = client.submit(JobSubmitAction.builder
          .addExecuteCode(executeCode)
          .setStartupParams(startupMap)
          .setUser(user) //Job提交用户
          .addExecuteUser(user) //实际执行用户
          .setLabels(labels)
          .setSource(source)
          .build)  //User，请求用户；用于做用户级多租户隔离
      println("execId: " + jobExecuteResult.getExecID + ", taskId: " + jobExecuteResult.taskID)

      // 4. 获取脚本的执行状态
      var jobInfoResult = client.getJobInfo(jobExecuteResult)
      val sleepTimeMills : Int = 1000
      while (!jobInfoResult.isCompleted) {
        // 5. 获取脚本的执行进度
        val progress = client.progress(jobExecuteResult)
        val progressInfo = if (progress.getProgressInfo != null) progress.getProgressInfo.toList else List.empty
        println("progress: " + progress.getProgress + ", progressInfo: " + progressInfo)
        Utils.sleepQuietly(sleepTimeMills)
        jobInfoResult = client.getJobInfo(jobExecuteResult)
      }
      if (!jobInfoResult.isSucceed) {
        println("Failed to execute job: " + jobInfoResult.getMessage)
        throw new Exception(jobInfoResult.getMessage)
      }

      // 6. 获取脚本的Job信息
      val jobInfo = client.getJobInfo(jobExecuteResult)
      // 7. 获取结果集列表（如果用户一次提交多个SQL，会产生多个结果集）
      val resultSetList = jobInfoResult.getResultSetList(client)
      println("All result set list:")
      resultSetList.foreach(println)
      val oneResultSet = jobInfo.getResultSetList(client).head
      // 8. 通过一个结果集信息，获取具体的结果集
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
