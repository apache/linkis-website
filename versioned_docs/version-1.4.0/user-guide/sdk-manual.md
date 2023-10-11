---
title: Linkis SDK Manual
sidebar_position: 3
---

> Linkis provides a convenient interface for JAVA and SCALA calls. You only need to import the linkis-computation-client module to use it. After 1.0, it supports the method of submitting with Label. The following will introduce the way to use the SDK.


**Engine version and script type supported by Linkis**

<table>
  <tr>
	    <th>Engine plugin</th>
      <th>Default supported versions</th>
	    <th>Script type</th>
	    <th>Type Description</th>  
	</tr>
  <tr>
    <th rowspan="3">Spark</th>
    <th rowspan="3">2.4.3</th>
    <th>py</th>
    <th>python script</th>  
  </tr >
  <tr>
    <th>scala</th>
    <th>scala script</th>  
  </tr>
  <tr>
    <th>sql</th>
    <th>sql script</th>  
  </tr>
  <tr>
    <th>Hive</th>
    <th>2.3.3</th>
    <th>hql</th>
    <th>hql script</th>  
  </tr >
  <tr>
    <th>Python</th>
    <th>python2</th>
    <th>python</th>
    <th>python script</th>  
  </tr >
  <tr>
    <th>Shell</th>
    <th>1</th>
    <th>shell</th>
    <th>shell script</th>  
  </tr >
  <tr>
    <th>JDBC</th>
    <th>4</th>
    <th>jdbc</th>
    <th>sql script name</th>  
  </tr >
  <tr>
    <th>Flink</th>
    <th>1.12.2</th>
    <th>sql</th>
    <th>sql script</th>  
  </tr >
  <tr>
    <th>openLooKeng</th>
    <th>1.5.0</th>
    <th>sql</th>
    <th>sql script</th>  
  </tr >
  <tr>
    <th>Pipeline</th>
    <th>1</th>
    <th>pipeline</th>
    <th>File import and export</th>  
  </tr >
  <tr>
    <th>Presto</th>
    <th>0.234</th>
    <th>psql</th>
    <th>sql script</th>  
  </tr >
  <tr>
    <th>Sqoop</th>
    <th>1.4.6</th>
    <th>appconn</th>
    <th>File import and export</th>  
  </tr >
  <tr>
    <th rowspan="2">Elasticsearch</th>
    <th rowspan="2">7.6.2</th>
    <th>esjson</th>
    <th>json script</th>  
  </tr >
  <tr>
    <th>essql</th>
    <th>sql script</th>  
  </tr >
  <tr>
    <th>trino</th>
    <th>371</th>
    <th>tsql</th>
    <th>sql script</th>  
  </tr >
</table>


**Linkis common label**

|label key|label value|description|
|:-|:-|:-|
|engineType| spark-2.4.3 | the engine type and version |
|userCreator|  user + "-AppName" |  the running user and your AppName |
|codeType| sql | script type|
|jobRunningTimeout| 10 | If the job does not finish for 10s, it will automatically initiate Kill. The unit is s |
|jobQueuingTimeout| 10|If the job queue exceeds 10s and fails to complete, Kill will be automatically initiated. The unit is s|
|jobRetryTimeout|  10000| The waiting time for a job to fail due to resources or other reasons is ms. If a job fails due to insufficient queue resources, the retry is initiated 10 times by default |
|tenant| hduser02|  tenant label  |

## 1. Import dependent modules
```
<dependency>
  <groupId>org.apache.linkis</groupId>
  <artifactId>linkis-computation-client</artifactId>
  <version>${linkis.version}</version>
</dependency>
```

## 2. Java test code
Create a Java test class LinkisClientTest, the specific interface meaning can be found in the notes:

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
        // The user needs to be consistent with the value of AuthTokenKey
        String user = "hadoop"; 
        String executeCode = "df=spark.sql(\"show tables\")\n" +
                "show(df)"; // code support:sql/hql/py/scala
        try {

            System.out.println("user : " + user + ", code : [" + executeCode + "]");
            // 3. build job and execute
            JobExecuteResult jobExecuteResult = toSubmit(user, executeCode);
            System.out.println("execId: " + jobExecuteResult.getExecID() + ", taskId: " + jobExecuteResult.taskID());
            // 4. get job info
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
                .setLabels(labels) .
                .build();
        // 3. to execute
        return client.submit(jobSubmitAction);
    }
}
```
Run the above code to complete task submission/execution/log/result set acquisition, etc.

## 3. Scala test code

```java
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
        .setDWSVersion("v1") //link rest version v1
        .build();

        // 2. new Client(Linkis Client) by clientConfig
        val client = UJESClient(clientConfig)

        def main(args: Array[String]): Unit = {
        val user = "hadoop" // execute user user needs to be consistent with the value of AuthTokenKey
        val executeCode = "df=spark.sql(\"show tables\")\n" +
        "show(df)"; // code support:sql/hql/py/scala
        try {
        // 3. build job and execute
        println("user : " + user + ", code : [" + executeCode + "]")
        // It is recommended to use submit, which supports the transfer of task labels
        val jobExecuteResult = toSubmit(user, executeCode)
        println("execId: " + jobExecuteResult.getExecID + ", taskId: " + jobExecuteResult.taskID)
        // 4. get job info
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
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, user + "-APPName"); // The requested user and application name, both parameters must be missing, where APPName cannot contain "-", it is recommended to replace it with "_"
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py"); // specify the script type

        val startupMap = new java.util.HashMap[String, AnyRef]()
        // Support setting engine native parameters,For example: parameters of engines such as spark/hive
        val instances: Integer = 2
        startupMap.put("spark.executor.instances", instances)
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


## 4. Once SDK Usage
The Linkis-cli client supports submitting tasks of the Once type. After the engine process is started, the task will only be run once, and it will be automatically destroyed after the task ends.

OnceEngineConn calls LinkisManager's createEngineConn interface through LinkisManagerClient, and sends the code to the engine created by the user, and then the engine starts to execute

write a test class
Use clien conditions

```java
1. Configure the correct and available gateway address:
LinkisJobClient.config().setDefaultServerUrl("http://ip:9001");
2. Write the engine parameters, configuration items, and execution code in the code:
  String code = "env {
                           + " spark.app.name = \"SeaTunnel\"\n"
                           + "spark.executor.instances = 2\n"
                           + "spark.executor.cores = 1\n"
                           + " spark.executor.memory = \"1g\"\n"
                           + "}\n"
                           + "\n"
                           + "source {\n"
                           + "Fake {\n"
                           + " result_table_name = \"my_dataset\"\n"
                           + " }\n"
                           + "\n"
                           + "}\n"
                           + "\n"
                           + "transform {\n"
                           + "}\n"
                           + "\n"
                           + "sink {\n"
                           + " Console {}\n"
                           + "}";
3. Create an Once mode object: SubmittableSimpleOnceJob:
SubmittableSimpleOnceJob = LinkisJobClient.once()
                 .simple()
                 .builder()
                 .setCreateService("seatunnel-Test")
                 .setMaxSubmitTime(300000) timeout
                 .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY(), "seatunnel-2.1.2") engine label
                 .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY(), "hadoop-seatunnel") user label
                 .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY(), "once") engine mode label
                 .addStartupParam(Configuration.IS_TEST_MODE().key(), true) Whether to enable the test mode
                 .addExecuteUser("hadoop") execute user
                 .addJobContent("runType", "spark") execution engine
                 .addJobContent("code", code) execute code
                 .addJobContent("master", "local[4]")
                 .addJobContent("deploy-mode", "client")
                 .addSource("jobName", "OnceJobTest") name
                 .build();

```

Test class sample code:

```java
package org.apache.linkis.ujes.client

import org.apache.linkis.common.utils.Utils
import java.util.concurrent.TimeUnit
import java.util
import org.apache.linkis.computation.client.LinkisJobBuilder
import org.apache.linkis.computation.client.once.simple.{SimpleOnceJob, SimpleOnceJobBuilder, SubmittableSimpleOnceJob}
import org.apache.linkis.computation.client.operator.impl.{EngineConnLogOperator, EngineConnMetricsOperator, EngineConnProgressOperator}
import org.apache.linkis.computation.client.utils.LabelKeyUtils
import scala.collection.JavaConverters._

object SqoopOnceJobTest extends App {
        LinkisJobBuilder.setDefaultServerUrl("http://gateway address:9001")
        val logPath = "C:\\Users\\resources\\log4j.properties"
        System.setProperty("log4j.configurationFile", logPath)
        val startUpMap = new util. HashMap[String, AnyRef]
        startUpMap.put("wds.linkis.engineconn.java.driver.memory", "1g")
        val builder = SimpleOnceJob. builder(). setCreateService("Linkis-Client")
        .addLabel(LabelKeyUtils.ENGINE_TYPE_LABEL_KEY, "sqoop-1.4.6")
        .addLabel(LabelKeyUtils.USER_CREATOR_LABEL_KEY, "hadoop-Client")
        .addLabel(LabelKeyUtils.ENGINE_CONN_MODE_LABEL_KEY, "once")
        .setStartupParams(startUpMap)
        .setMaxSubmitTime(30000)
        .addExecuteUser("hadoop")
        val onceJob = importJob(builder)
        val time = System. currentTimeMillis()
        onceJob. submit()
        println(onceJob. getId)
        val logOperator = onceJob.getOperator(EngineConnLogOperator.OPERATOR_NAME).asInstanceOf[EngineConnLogOperator]
        println(onceJob. getECMServiceInstance)
        logOperator. setFromLine(0)
        logOperator.setECMServiceInstance(onceJob.getECMServiceInstance)
        logOperator.setEngineConnType("sqoop")
        logOperator.setIgnoreKeywords("[main],[SpringContextShutdownHook]")
        var progressOperator = onceJob.getOperator(EngineConnProgressOperator.OPERATOR_NAME).asInstanceOf[EngineConnProgressOperator]
        var metricOperator = onceJob.getOperator(EngineConnMetricsOperator.OPERATOR_NAME).asInstanceOf[EngineConnMetricsOperator]
        var end = false
        var rowBefore = 1
        while (!end || rowBefore > 0) {
        if (onceJob. isCompleted) {
        end = true
        metricOperator = null
        }
        logOperator. setPageSize(100)
        Utils. tryQuietly {
        val logs = logOperator.apply()
        logs. logs. asScala. foreach(log => {
        println(log)
        })
        rowBefore = logs. logs. size
        }
        Thread. sleep(3000)
        Option(metricOperator).foreach(operator => {
        if (!onceJob.isCompleted) {
        println(s"Metric monitoring: ${operator.apply()}")
        println(s"Progress: ${progressOperator.apply()}")
        }
        })
        }
        onceJob. isCompleted
        onceJob. waitForCompleted()
        println(onceJob. getStatus)
        println(TimeUnit. SECONDS. convert(System. currentTimeMillis() - time, TimeUnit. MILLISECONDS) + "s")
        System. exit(0)

        def importJob(jobBuilder: SimpleOnceJobBuilder): SubmittableSimpleOnceJob = {
        jobBuilder
        .addJobContent("sqoop.env.mapreduce.job.queuename", "queue_1003_01")
        .addJobContent("sqoop. mode", "import")
        .addJobContent("sqoop.args.connect", "jdbc:mysql://database address/library name")
        .addJobContent("sqoop.args.username", "database account")
        .addJobContent("sqoop.args.password", "database password")
        .addJobContent("sqoop.args.query", "select * from linkis_ps_udf_manager where 1=1 and $CONDITIONS")
        #The table must exist $CONDITIONS is indispensable
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
        .addJobContent("sqoop. mode", "import")
        .addJobContent("sqoop.args.connect", "jdbc:mysql://database address/library name")
        .addJobContent("sqoop.args.username", "database account")
        .addJobContent("sqoop.args.password", "database password")
        .addJobContent("sqoop.args.query", "select * from linkis_ps_udf_manager where 1=1 and $CONDITIONS")
        #The table must exist $CONDITIONS is indispensable
        .addJobContent("sqoop.args.hcatalog.database", "janicegong_ind")
        .addJobContent("sqoop.args.hcatalog.table", "linkis_ps_udf_manager_sync2")
        .addJobContent("sqoop.args.hcatalog.partition.keys", "ds")
        .addJobContent("sqoop.args.hcatalog.partition.values", "20220708")
        .addJobContent("sqoop.args.num.mappers", "1")
        .build
        }
        }
```