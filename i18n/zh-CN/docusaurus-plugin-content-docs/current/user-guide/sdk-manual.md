---
title: SDK 方式
sidebar_position: 3
---

> Linkis 提供了方便的JAVA和SCALA调用的接口，只需要引入linkis-computation-client的模块就可以进行使用，1.0后新增支持带Label提交的方式，下面将对 SDK 使用方式进行介绍。


**Linkis 支持的引擎版本及脚本类型**

<table>
  <tr>
	    <th>引擎插件</th>
      <th>默认支持的版本</th>
	    <th>脚本类型</th>
	    <th>类型说明</th>  
	</tr>
  <tr>
    <th rowspan="3">Spark</th>
    <th rowspan="3">2.4.3</th>
    <th>py</th>
    <th>python脚本</th>  
  </tr >
  <tr>
    <th>scala</th>
    <th>scala脚本</th>  
  </tr>
  <tr>
    <th>sql</th>
    <th>sql脚本</th>  
  </tr>
  <tr>
    <th>Hive</th>
    <th>2.3.3</th>
    <th>hql</th>
    <th>hql脚本</th>  
  </tr >
  <tr>
    <th>Python</th>
    <th>python2</th>
    <th>python</th>
    <th>python脚本</th>  
  </tr >
  <tr>
    <th>Shell</th>
    <th>1</th>
    <th>shell</th>
    <th>shell脚本</th>  
  </tr >
  <tr>
    <th>JDBC</th>
    <th>4</th>
    <th>jdbc</th>
    <th>sql脚本名</th>  
  </tr >
  <tr>
    <th>Flink</th>
    <th>1.12.2</th>
    <th>sql</th>
    <th>sql脚本</th>  
  </tr >
  <tr>
    <th>openLooKeng</th>
    <th>1.5.0</th>
    <th>sql</th>
    <th>sql脚本</th>  
  </tr >
  <tr>
    <th>Pipeline</th>
    <th>1</th>
    <th>pipeline</th>
    <th>文件导入导出</th>  
  </tr >
  <tr>
    <th>Presto</th>
    <th>0.234</th>
    <th>psql</th>
    <th>sql脚本</th>  
  </tr >
  <tr>
    <th>Sqoop</th>
    <th>1.4.6</th>
    <th>appconn</th>
    <th>文件导入导出</th>  
  </tr >
  <tr>
    <th rowspan="2">Elasticsearch</th>
    <th rowspan="2">7.6.2</th>
    <th>esjson</th>
    <th>json脚本</th>  
  </tr >
  <tr>
    <th>essql</th>
    <th>sql脚本</th>  
  </tr >
  <tr>
    <th>trino</th>
    <th>371</th>
    <th>tsql</th>
    <th>sql脚本</th>  
  </tr >
</table>

**Linkis 常用标签**

|标签键|标签值|说明|
|:-|:-|:-|
|engineType| spark-2.4.3 |  指定引擎类型和版本|
|userCreator|  user + "-AppName" | 指定运行的用户和您的APPName|
|codeType| sql | 指定运行的脚本类型|
|jobRunningTimeout| 10 | job运行10s没完成自动发起Kill，单位为s|
|jobQueuingTimeout| 10| job排队超过10s没完成自动发起Kill，单位为s|
|jobRetryTimeout|  10000| job因为资源等原因失败重试的等待时间，单位为ms，如果因为队列资源不足的失败，会默认按间隔发起10次重试|
|tenant| hduser02| 租户标签，设置前需要和BDP沟通需要单独机器进行隔离，则任务会被路由到单独的机器|


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
            .retryEnabled(false) // set retry
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

## 3. Scala测试代码

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

import org.apache.linkis.ujes.client.UJESClient

object LinkisClientTest {
  // 1. build config: linkis gateway url
  val clientConfig = DWSClientConfigBuilder.newBuilder()
    .addServerUrl("http://127.0.0.1:8088/") //set linkis-mg-gateway url: http://{ip}:{port}
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
    val labels: util.Map[String, AnyRef] = new util.HashMap[String, AnyRef]
    labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-2.4.3"); // required engineType Label
    labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-APPName"); // 请求的用户和应用名，两个参数都不能少，其中APPName不能带有"-"建议替换为"_"
    labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py"); // 指定脚本类型

    val startupMap = new java.util.HashMap[String, AnyRef]()
    // Support setting engine native parameters,For example: parameters of engines such as spark/hive
    val instances: Integer = 2
    startupMap.put("spark.executor.instances", instances)
    // setting linkis params
    startupMap.put("wds.linkis.rm.yarnqueue", "default")
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

## 4. Once SDK 使用
Linkis-cli客户端支持提交Once类型的任务，引擎进程启动后只运行一次任务，任务结束后自动销毁

OnceEngineConn 通过 LinkisManagerClient 调用 LinkisManager 的 createEngineConn 接口，并将代码发送到用户创建的引擎，然后引擎开始执行


## Once模式使用：

1.首先创建一个新的 maven 项目或者在项目中引入以下依赖项

```plain
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-computation-client</artifactId>
    <version>${linkis.version}</version>
</dependency>
```
2.编写一个测试类
使用clien条件

```plain
1.配置正确可用的gatew地址：
LinkisJobClient.config().setDefaultServerUrl("http://ip:9001");
2.将引擎参数，配置项，执行code写在code里面：
 String code = "env {
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
3.创建Once模式对象：SubmittableSimpleOnceJob ：
SubmittableSimpleOnceJob = LinkisJobClient.once()
                .simple()
                .builder()
                .setCreateService("seatunnel-Test")
                .setMaxSubmitTime(300000)   超时时间
                .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY(), "seatunnel-2.1.2")    引擎标签
                .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY(), "hadoop-seatunnel")   用户标签
                .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY(), "once")              引擎模式标签
                .addStartupParam(Configuration.IS_TEST_MODE().key(), true)                是否开启测试模式
                .addExecuteUser("hadoop")      执行用户
                .addJobContent("runType", "spark")  执行引擎
                .addJobContent("code", code)    执行代码  
                .addJobContent("master", "local[4]")
                .addJobContent("deploy-mode", "client")
                .addSource("jobName", "OnceJobTest")  名称
                .build();
```
## 测试类示例代码：

```plain
package org.apache.linkis.ujes.client

import org.apache.linkis.common.utils.Utils
import java.util.concurrent.TimeUnit
import java.util
import org.apache.linkis.computation.client.LinkisJobBuilder
import org.apache.linkis.computation.client.once.simple.{SimpleOnceJob, SimpleOnceJobBuilder, SubmittableSimpleOnceJob}
import org.apache.linkis.computation.client.operator.impl.{EngineConnLogOperator, EngineConnMetricsOperator, EngineConnProgressOperator}
import org.apache.linkis.computation.client.utils.LabelKeyUtils
import scala.collection.JavaConverters._
@Deprecated
object SqoopOnceJobTest extends App {
  LinkisJobBuilder.setDefaultServerUrl("http://gateway地址:9001")
  val logPath = "C:\\Users\\resources\\log4j.properties"
  System.setProperty("log4j.configurationFile", logPath)
  val startUpMap = new util.HashMap[String, AnyRef]
  startUpMap.put("wds.linkis.engineconn.java.driver.memory", "1g")
  val builder = SimpleOnceJob.builder().setCreateService("Linkis-Client")
    .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY, "sqoop-1.4.6")
    .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY, "hadoop-Client")
    .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY, "once")
    .setStartupParams(startUpMap)
    .setMaxSubmitTime(30000)
    .addExecuteUser("hadoop")
  val onceJob = importJob(builder)
  val time = System.currentTimeMillis()
  onceJob.submit()
  println(onceJob.getId)
  val logOperator = onceJob.getOperator(EngineConnLogOperator.OPERATOR_NAME).asInstanceOf[EngineConnLogOperator]
  println(onceJob.getECMServiceInstance)
  logOperator.setFromLine(0)
  logOperator.setECMServiceInstance(onceJob.getECMServiceInstance)
  logOperator.setEngineConnType("sqoop")
  logOperator.setIgnoreKeywords("[main],[SpringContextShutdownHook]")
  var progressOperator = onceJob.getOperator(EngineConnProgressOperator.OPERATOR_NAME).asInstanceOf[EngineConnProgressOperator]
  var metricOperator = onceJob.getOperator(EngineConnMetricsOperator.OPERATOR_NAME).asInstanceOf[EngineConnMetricsOperator]
  var end = false
  var rowBefore = 1
  while (!end || rowBefore > 0) {
    if (onceJob.isCompleted) {
      end = true
      metricOperator = null
    }
    logOperator.setPageSize(100)
    Utils.tryQuietly {
      val logs = logOperator.apply()
      logs.logs.asScala.foreach(log => {
        println(log)
      })
      rowBefore = logs.logs.size
    }
    Thread.sleep(3000)
    Option(metricOperator).foreach(operator => {
      if (!onceJob.isCompleted) {
        println(s"Metric监控: ${operator.apply()}")
        println(s"进度: ${progressOperator.apply()}")
      }
    })
  }
  onceJob.isCompleted
  onceJob.waitForCompleted()
  println(onceJob.getStatus)
  println(TimeUnit.SECONDS.convert(System.currentTimeMillis() - time, TimeUnit.MILLISECONDS) + "s")
  System.exit(0)

  def importJob(jobBuilder: SimpleOnceJobBuilder): SubmittableSimpleOnceJob = {
    jobBuilder
      .addJobContent("sqoop.env.mapreduce.job.queuename", "queue_1003_01")
      .addJobContent("sqoop.mode", "import")
      .addJobContent("sqoop.args.connect", "jdbc:mysql://数据库地址/库名")
      .addJobContent("sqoop.args.username", "数据库账户")
      .addJobContent("sqoop.args.password", "数据库密码")
      .addJobContent("sqoop.args.query", "select * from linkis_ps_udf_manager where 1=1 and  $CONDITIONS") 
       #表一定要存在 $CONDITIONS不可缺少
      .addJobContent("sqoop.args.hcatalog.database", "janicegong_ind")
      .addJobContent("sqoop.args.hcatalog.table", "linkis_ps_udf_manager_sync2")
      .addJobContent("sqoop.args.hcatalog.partition.keys", "ds")
      .addJobContent("sqoop.args.hcatalog.partition.values", "20220708")
      .addJobContent("sqoop.args.num.mappers", "1")
      .build()
  }
  def exportJob(jobBuilder: SimpleOnceJobBuilder): SubmittableSimpleOnceJob = {
      jobBuilder
      .addJobContent("sqoop.env.mapreduce.job.queuename", "queue_1003_01")
      .addJobContent("sqoop.mode", "import")
      .addJobContent("sqoop.args.connect", "jdbc:mysql://数据库地址/库名")
      .addJobContent("sqoop.args.username", "数据库账户")
      .addJobContent("sqoop.args.password", "数据库密码")
      .addJobContent("sqoop.args.query", "select * from linkis_ps_udf_manager where 1=1 and  $CONDITIONS") 
       #表一定要存在 $CONDITIONS不可缺少
      .addJobContent("sqoop.args.hcatalog.database", "janicegong_ind")
      .addJobContent("sqoop.args.hcatalog.table", "linkis_ps_udf_manager_sync2")
      .addJobContent("sqoop.args.hcatalog.partition.keys", "ds")
      .addJobContent("sqoop.args.hcatalog.partition.values", "20220708")
      .addJobContent("sqoop.args.num.mappers", "1")
      .build
  }
}
```
3.测试程序完成，引擎会自动销毁，不用手动清除