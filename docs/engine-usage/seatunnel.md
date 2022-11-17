#Seattunnel Engine Usage Document
This article mainly introduces the configuration, deployment and use of the Seatunnel engine in Linkis1. X.
##1. Seatunnel engine Linkis system parameter configuration
The seatunnel depends on the Spark or Flink environment. Before using the linkis seatunnel engine, it is strongly recommended to run through the seatunnel environment locally

|Environment variable name | Environment variable content | Yes No|
|-----------------|----------------|----------------------------------------|
| JAVA_ HOME | JDK installation path | Required|
| SEATUNNEL_ HOME | Seattunnel installation path | Required|
Table 1-1 Environment Configuration List

|Linkis variable name | variable content | Yes No|
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
|Wds.linkis.engine.seatunnel.plugin.home | Seatunnel installation path | Required|
##2. Seatunnel engine configuration and deployment
###2.1 Seatunnel Version Selection and Compilation
Seattunnel Version 2.1.2
Download address: https://dlcdn.apache.org/incubator/seatunnel/2.1.2/apache-seatunnel-incubating-2.1.2-bin.tar.gz
###2.2 Deployment and loading of Seatunnel engineCon
Note: Before compiling the Seatunnel engine, you need to fully compile the linkis project
```
Compile Seatunnel separately:
${linkis_code_dir}linkis-engineconn-plugins/seatunnel/
mvn clean install
```
The installation method is to compile the compiled engine package, which is located in
```bash
${linkis_code_dir}linkis-engineconn-plugins/seatunnel/target/out.zip
```
Then deploy to
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
Finally, restart linkis cg linkismanager
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```
More engineplugin details can be found in the following article [EngineConnPlugin Installation] (../deployment/install engineconn)
##3. Usage of the Seattunnel engine
### 3.1 OnceEngineConn
OnceEngineCon calls the createEngineCon interface of LinkisManager through LinkisManagerClient, sends the code to the created Seattunnel engine, and then the Seattunnel engine starts to execute. The client is also very simple to use. First, create a new maven project, or introduce the following dependencies into the project
```xml
<dependency>
<groupId>org.apache.linkis</groupId>
<artifactId>linkis-computation-client</artifactId>
<version>${linkis.version}</version>
</dependency>
```
**Test case:**
```java
package org.apache.linkis.computation.client;
import org.apache.linkis.common.conf.Configuration;
import org.apache.linkis.computation.client.once.simple.SubmittableSimpleOnceJob;
import org.apache.linkis.computation.client.utils.LabelKeyUtils;
public class SeatunnelOnceJobTest {
    public static void main(String[] args) {
        LinkisJobClient.config().setDefaultServerUrl(" http://ip:9001 ");
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
        + "    result_table_name = \"my_ dataset\"\n"
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
**Parameter comparison table (with local parameters):**
```
Spark environment parameters. On the left are linkis seatunnel engine parameters, and on the right are local environment parameters
master=》--master
deploy-mode=》--deploy-mode
config=》--config
Flink environment parameters
run-mode=》--run-mode
config=》--config
```