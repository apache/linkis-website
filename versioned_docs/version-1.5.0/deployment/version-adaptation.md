---
title: Version Adaptation
sidebar_position: 8
---

#  Version Adaptation 

## 1. Function description

Explain where manual modification is required for Apache, CDH, HDP and other version adaptations

## 2. Compilation instruction

Enter the root directory of the project and execute the following commands in sequence

```text
mvn -N  install
mvn clean install -Dmaven.test.skip=true
```

## 3. SQL Script Switch

linkis-dist -> package -> linkis-dml.sql(db folder)

Switch the corresponding engine version to the version you need. If the  version you use is consistent with the official version, you do not need to modify this step 

for example:   

1. If Spark is 3.0.0, this is SET @ SPARK_ LABEL="spark-3.0.0";
2. If hive is 2.1.1-cdh6.3.2, adjust 2.1.1 first_ Cdh6.3.2 (during construction), this is SET @ HIVE_ LABEL="hive-2.1.1_cdh6.3.2";

```sql
-- variable：
SET @SPARK_LABEL="spark-2.4.3";
SET @HIVE_LABEL="hive-2.3.3";
SET @PYTHON_LABEL="python-python2";
SET @PIPELINE_LABEL="pipeline-1";
SET @JDBC_LABEL="jdbc-4";
SET @PRESTO_LABEL="presto-0.234";
SET @IO_FILE_LABEL="io_file-1.0";
SET @OPENLOOKENG_LABEL="openlookeng-1.5.0";
```

## 4. Linkis official version

| engine | version |
| ------ | ------- |
| hadoop | 2.7.2   |
| hive   | 2.3.3   |
| spark  | 2.4.3   |
| flink  | 1.12.2  |

## 5. Apache version adaptation

### 5.1 Apache3.1.x version

| engine | version |
| ------ | ------- |
| hadoop | 3.1.1   |
| hive   | 3.1.2   |
| spark  | 3.0.1   |
| flink  | 1.13.2  |

#### 5.1.1 The pom file of linkis

For Linkis version < 1.3.2
```xml
<hadoop.version>3.1.1</hadoop.version>
<scala.version>2.12.10</scala.version>
<scala.binary.version>2.12</scala.binary.version>

<!-- hadoop-hdfs replace with hadoop-hdfs-client -->
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
<dependency>

```
For Linkis version >= 1.3.2, we only need to set `scala.version` and `scala.binary.version` if necessary
```java
<scala.version>2.12.10</scala.version>
<scala.binary.version>2.12</scala.binary.version>
```
Because we can directly compile with hadoop-3.3 or hadoop-2.7 profile.
Profile `hadoop-3.3` can be used for any hadoop3.x, default hadoop3.x version will be hadoop 3.3.1,
Profile `hadoop-2.7` can be used for any hadoop2.x, default hadoop2.x version will be hadoop 2.7.2,
other hadoop version can be specified by -Dhadoop.version=xxx
```text
mvn -N  install
mvn clean install -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true
```
#### 5.1.2  The pom file of linkis-hadoop-common

For Linkis version < 1.3.2
```xml
<!-- Notice here <version>${hadoop.version}</version> , adjust according to whether you have encountered errors --> 
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
</dependency>
```

For Linkis version >= 1.3.2,`linkis-hadoop-common` module no need to change

#### 5.1.3 The pom file of linkis-engineplugin-hive

```xml
<hive.version>3.1.2</hive.version>
```

#### 5.1.4 The pom file of linkis-engineplugin-spark

For Linkis version < 1.3.2
```xml
<spark.version>3.0.1</spark.version>
```

For Linkis version >= 1.3.2
```text
We can directly compile with spark-3.2 or spark-2.4-hadoop-3.3 profile, if we need to used with hadoop3, then profile hadoop-3.3 will be needed.
default spark3.x version will be spark 3.2.1. if we compile with spark-3.2 then scala version will be 2.12.15 by default,
so we do not need to set the scala version in Linkis project pom file(mentioned in 5.1.1).
if spark2.x used with hadoop3, for compatibility reason, profile `spark-2.4-hadoop-3.3` need to be activated.
```
```text
mvn -N  install
mvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true
```

#### 5.1.5 The pom file of flink-engineconn-flink

```xml
<flink.version>1.13.2</flink.version>
```

Since some classes of Flink 1.12.2 to 1.13.2 are adjusted, it is necessary to compile and adjust Flink. Select Scala version 2.12 for compiling Flink

:::caution temporary plan

Note that the following operations are all in flink

Due to flink1.12.2 to 1.13.2, some classes are adjusted, so flink needs to be compiled and adjusted, and the version of scala selected for compiling flink is version 2.12(The scala version is based on the actual version used)

flink compilation reference instruction: mvn clean install -DskipTests -P scala-2.12 -Dfast -T 4 -Dmaven.compile.fock=true

:::

```text
-- Note that the following classes are copied from version 1.12.2 to version 1.13.2
org.apache.flink.table.client.config.entries.DeploymentEntry
org.apache.flink.table.client.config.entries.ExecutionEntry
org.apache.flink.table.client.gateway.local.CollectBatchTableSink
org.apache.flink.table.client.gateway.local.CollectStreamTableSink
```

#### 5.1.6 linkis-label-commo adjustment

org.apache.linkis.manager.label.conf.LabelCommonConfig  file adjustment

```java
    public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.1");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.2");
```

#### 5.1.7 linkis-computation-governance-common adjustment

org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.1")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.2")
```

## 6. HDP version adaptation

### 6.1 HDP3.0.1 version

| engine         | version |
| -------------- | ------- |
| hadoop         | 3.1.1   |
| hive           | 3.1.0   |
| spark          | 2.3.2   |
| json4s.version | 3.2.11  |

#### 6.1.1 The pom file of linkis

For Linkis version < 1.3.2
```xml
<hadoop.version>3.1.1</hadoop.version>
<json4s.version>3.2.11</json4s.version>
    
<!-- hadoop-hdfs replace with hadoop-hdfs-client -->
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
<dependency>
```

For Linkis version >= 1.3.2, we only need to set `json4s.version` if necessary
```java
<json4s.version>3.2.11</json4s.version>
```
Because we can directly compile with hadoop-3.3 or hadoop-2.7 profile.
Profile `hadoop-3.3` can be used for any hadoop3.x, default hadoop3.x version will be hadoop 3.3.1,
Profile `hadoop-2.7` can be used for any hadoop2.x, default hadoop2.x version will be hadoop 2.7.2,
other hadoop version can be specified by -Dhadoop.version=xxx
```text
mvn -N  install
mvn clean install -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true
```

#### 6.1.2 The pom file of linkis-engineplugin-hive

```xml
<hive.version>3.1.0</hive.version>
```

#### 6.1.3 The pom file of linkis-engineplugin-spark

For Linkis version < 1.3.2
```xml
<spark.version>2.3.2</spark.version>
```

For Linkis version >= 1.3.2
```text
We can directly compile with spark-3.2 profile, if we need to use with hadoop3, then profile hadoop-3.3 will be needed.
default spark3.x version will be spark 3.2.1. if we compile with spark-3.2 then scala version will be 2.12.15 by default,
so we do not need to set the scala version in Linkis project pom file(mentioned in 5.1.1).
if spark2.x used with hadoop3, for compatibility reason, profile `spark-2.4-hadoop-3.3` need to be activated.
```
```text
mvn -N  install
mvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true
```

#### 6.1.4 linkis-label-common adjustment

org.apache.linkis.manager.label.conf.LabelCommonConfig file adjustment

```java
    public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.2");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.0");
```

#### 6.1.5 linkis-computation-governance-common adjustment

org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.2")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.0")
```

## 7 CDH Version adaptation

### 7.1 maven Configure address

#### 7.1.1 setting file

```xml
<mirrors>
  <!-- mirror
   | Specifies a repository mirror site to use instead of a given repository. The repository that
   | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
   | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
   |
  <mirror>
    <id>mirrorId</id>
    <mirrorOf>repositoryId</mirrorOf>
    <name>Human Readable Name for this Mirror.</name>
    <url>http://my.repository.com/repo/path</url>
  </mirror>
   -->
   <mirror>
       <id>nexus-aliyun</id>
       <mirrorOf>*,!cloudera</mirrorOf>
       <name>Nexus aliyun</name>
       <url>http://maven.aliyun.com/nexus/content/groups/public</url>
   </mirror>
   <mirror>
       <id>aliyunmaven</id>
       <mirrorOf>*,!cloudera</mirrorOf>
       <name>Alibaba Cloud Public Warehouse</name>
       <url>https://maven.aliyun.com/repository/public</url>
   </mirror>
   <mirror>
       <id>aliyunmaven</id>
       <mirrorOf>*,!cloudera</mirrorOf>
       <name>spring-plugin</name>
       <url>https://maven.aliyun.com/repository/spring-plugin</url>
   </mirror>
  <mirror>
    <id>maven-default-http-blocker</id>
    <mirrorOf>external:http:*</mirrorOf>
    <name>Pseudo repository to mirror external repositories initially using HTTP.</name>
    <url>http://0.0.0.0/</url>
    <blocked>true</blocked>
  </mirror>
</mirrors>
```

#### 7.1.2 The pom file of linkis

```xml
    <repositories>
        <repository>
            <id>cloudera</id>
            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>
        <!--To prevent cloudera from not being found, add Alibaba Source-->
        <repository>
            <id>aliyun</id>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>
    </repositories>
```

### 7.2 CDH5.12.1 version

| engine    | version         |
| --------- | --------------- |
| hadoop    | 2.6.0-cdh5.12.1 |
| zookeeper | 3.4.5-cdh5.12.1 |
| hive      | 1.1.0-cdh5.12.1 |
| spark     | 2.3.4           |
| flink     | 1.12.4          |
| python    | python3         |

#### 7.2.1 The pom file of linkis

```xml
<hadoop.version>2.6.0-cdh5.12.1</hadoop.version>
<zookeeper.version>3.4.5-cdh5.12.1</zookeeper.version>
<scala.version>2.11.8</scala.version>
```

#### 7.2.2 The pom file of linkis-engineplugin-hive

```xml
-- update
<hive.version>1.1.0-cdh5.12.1</hive.version>
-- add
<package.hive.version>1.1.0_cdh5.12.1</package.hive.version>
```

- update assembly under distribution.xml file

```xml
<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>
<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>
<outputDirectory>plugin/${package.hive.version}</outputDirectory>
```

- update CustomerDelimitedJSONSerDe file

  ```
     /* hive version is too low and needs to be noted
     case INTERVAL_YEAR_MONTH:
         {
             wc = ((HiveIntervalYearMonthObjectInspector) oi).getPrimitiveWritableObject(o);
             binaryData = Base64.encodeBase64(String.valueOf(wc).getBytes());
             break;
         }
     case INTERVAL_DAY_TIME:
         {
             wc = ((HiveIntervalDayTimeObjectInspector) oi).getPrimitiveWritableObject(o);
             binaryData = Base64.encodeBase64(String.valueOf(wc).getBytes());
             break;
         }
     */
  ```

#### 7.2.3  The pom file of linkis-engineplugin-flink

```xml
<flink.version>1.12.4</flink.version>
```

#### 7.2.4 The pom file of linkis-engineplugin-spark

```xml
<spark.version>2.3.4</spark.version>
```

#### 7.2.5 The pom file of linkis-engineplugin-python

```xml
<python.version>python3</python.version>
```

#### 7.2.6 linkis-label-common adjustment

org.apache.linkis.manager.label.conf.LabelCommonConfig  file adjustment

```java
   public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.4");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "1.1.0");

			CommonVars.apply("wds.linkis.python.engine.version", "python3")
```

#### 7.2.7 linkis-computation-governance-common adjustment

org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.4")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "1.1.0")
      
  val PYTHON_ENGINE_VERSION = CommonVars("wds.linkis.python.engine.version", "python3")
```

### 7.3 CDH6.3.2

| engine | version        |
| ------ | -------------- |
| hadoop | 3.0.0-cdh6.3.2 |
| hive   | 2.1.1-cdh6.3.2 |
| spark  | 3.0.0          |

#### 7.3.1 The pom file of linkis

```xml
<hadoop.version>3.0.0-cdh6.3.2</hadoop.version> 
<scala.version>2.12.10</scala.version>
```

#### 7.3.2  The pom file of linkis-hadoop-common

```xml
   <!-- hadoop-hdfs replace with hadoop-hdfs-client --> 
   <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-hdfs-client</artifactId>
    </dependency>
```

#### 7.3.3 The pom file of linkis-engineplugin-hive

```xml
-- update
<hive.version>2.1.1-cdh6.3.2</hive.version>
-- add
<package.hive.version>2.1.1_cdh6.3.2</package.hive.version>
```

update assembly under distribution.xml file

```xml
<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>
<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>
<outputDirectory>plugin/${package.hive.version}</outputDirectory>
```

#### 7.3.4  The pom file of linkis-engineplugin-spark

```xml
<spark.version>3.0.0</spark.version>
```

#### 7.3.5 linkis-label-common adjustment

org.apache.linkis.manager.label.conf.LabelCommonConfig  file adjustment

```java
   public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.0");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2");
```

#### 7.3.6 linkis-computation-governance-common adjustment

org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.0")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2")
```

## 8 Compilation Skills

- If the class is missing or the method in the class is missing, find the corresponding package dependency, and how to try to switch to the version with the corresponding package or class
-  If the engine version needs to use -, use _  to replace, add<package.(engine name).version>to specify the  replaced version, and use ${package.(engine name). version} in the  corresponding engine distribution file to replace the original
- If sometimes there is a 403 problem when using Alibaba Cloud images to download the jars of guava, you can switch to Huawei, Tencent and other image warehouses