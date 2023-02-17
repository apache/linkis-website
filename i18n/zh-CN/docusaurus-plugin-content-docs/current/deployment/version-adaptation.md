---
title: 版本适配
sidebar_position: 8
---

# 版本适配

## 1. 功能说明

针对Apache,CDH,HDP等版本适配需要手动修改的地方进行说明

## 2. 编译指令

进入到项目的根目录下,依次执行如下指令

```text
mvn -N  install
mvn clean install -Dmaven.test.skip=true
```

## 3. SQL脚本切换

linkis-dist -> package -> db 下的 linkis-dml.sql 脚本

将对应的引擎版本切换为自己需要的版本，如果你使用的版本和官方一致的话,则无需修改此步

比如:   

1. spark是3.0.0的话,则此处是 SET @SPARK_LABEL="spark-3.0.0";
2. hive是2.1.1-cdh6.3.2的话,需先调整2.1.1_cdh6.3.2(构建时),则此处是 SET @HIVE_LABEL="hive-2.1.1_cdh6.3.2";

```sql
-- 变量：
SET @SPARK_LABEL="spark-2.4.3";
SET @HIVE_LABEL="hive-2.3.3";
SET @PYTHON_LABEL="python-python2";
SET @PIPELINE_LABEL="pipeline-1";
SET @JDBC_LABEL="jdbc-4";
SET @PRESTO_LABEL="presto-0.234";
SET @IO_FILE_LABEL="io_file-1.0";
SET @OPENLOOKENG_LABEL="openlookeng-1.5.0";
```

## 4. Linkis官方版本

| 引擎   | 版本   |
| ------ | ------ |
| hadoop | 2.7.2  |
| hive   | 2.3.3  |
| spark  | 2.4.3  |
| flink  | 1.12.2 |

## 5. Apache版本适配

### 5.1 Apache3.1.x版本

| 引擎   | 版本   |
| ------ | ------ |
| hadoop | 3.1.1  |
| hive   | 3.1.2  |
| spark  | 3.0.1  |
| flink  | 1.13.2 |

#### 5.1.1 linkis的pom文件

Linkis版本小于`1.3.2`时
```java
<hadoop.version>3.1.1</hadoop.version>
<scala.version>2.12.10</scala.version>
<scala.binary.version>2.12</scala.binary.version>

<!-- 将hadoop-hdfs 替换成为hadoop-hdfs-client -->
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
<dependency>
```

当Linkis版本大于等于`1.3.2`时, 只需要设置 `scala.version` and `scala.binary.version`
```java
<scala.version>2.12.10</scala.version>
<scala.binary.version>2.12</scala.binary.version>
```
因为我们可以直接使用`hadoop-3.3` or `hadoop-2.7` profile来编译
Profile `hadoop-3.3` 可以用于任意hadoop3.x, 默认hadoop3.x版本是3.3.1,
Profile `hadoop-2.7` 可以用于任意hadoop2.x, 默认hadoop2.x版本是2.7.2,
想要用其他版本可以编译时指定 -Dhadoop.version=xxx
```text
mvn -N  install
mvn clean install -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true
```

#### 5.1.2 linkis-hadoop-common的pom文件

Linkis版本小于`1.3.2`时
```java
<!-- 注意这里的 <version>${hadoop.version}</version> , 根据你有没有遇到错误来进行调整 --> 
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
</dependency>
```

当Linkis版本大于等于`1.3.2`时,`linkis-hadoop-common`模块不需要变更

#### 5.1.3 linkis-engineplugin-hive的pom文件

```java
<hive.version>3.1.2</hive.version>
```

#### 5.1.4 linkis-engineplugin-spark的pom文件

Linkis版本小于`1.3.2`时
```java
<spark.version>3.0.1</spark.version>
```

当Linkis版本大于等于`1.3.2`时
```text
我们可以直接编译spark-3.2 profile, 如果我们同时使用hadoop3, 那么我们还需要指定hadoop-3.3 profile.
默认 spark3.x 版本时3.2.1. 如果我们使用spark-3.2 profile编译, scala版本默认是2.12.15,因此我们不需要在项目根目录设置scala版本了（5.1.1提到当)
如果Linkis使用hadoop3编译，同时spark仍旧是2.x版本的话，由于spark兼容性问题需要激活profile `spark-2.4-hadoop-3.3`
```
```text
mvn -N  install
mvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true
```

#### 5.1.5 flink-engineconn-flink的pom文件

```java
<flink.version>1.13.2</flink.version>
```

:::caution 临时方案

注意以下复制类操作均在flink中

由于flink1.12.2到1.13.2版本,有部分类进行调整,所以需要进行flink的编译和调整,编译flink选择scala的版本为2.12版本(scala版本根据自己的实际使用版本来)

flink编译参考指令: mvn clean install -DskipTests -P scala-2.12 -Dfast -T 4 -Dmaven.compile.fock=true

:::

```text
-- 注意,下列的类是从flink的1.12.2版本给copy到flink的1.13.2版本来
org.apache.flink.table.client.config.entries.DeploymentEntry
org.apache.flink.table.client.config.entries.ExecutionEntry
org.apache.flink.table.client.gateway.local.CollectBatchTableSink
org.apache.flink.table.client.gateway.local.CollectStreamTableSink
```

#### 5.1.6 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
    public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.1");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.2");
```

#### 5.1.7 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.1")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.2")
```

## 6. HDP版本适配

### 6.1 HDP3.0.1版本

| 引擎           | 版本   |
| -------------- | ------ |
| hadoop         | 3.1.1  |
| hive           | 3.1.0  |
| spark          | 2.3.2  |
| json4s.version | 3.2.11 |

#### 6.1.1 linkis的pom文件

Linkis版本小于`1.3.2`时
```java
<hadoop.version>3.1.1</hadoop.version>
<json4s.version>3.2.11</json4s.version>
    
<!-- 将hadoop-hdfs 替换成为hadoop-hdfs-client -->
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
<dependency>
```

当Linkis版本大于等于`1.3.2`时, 只需要设置 `json4s.version`
```java
<json4s.version>3.2.11</json4s.version>
```
因为我们可以直接使用`hadoop-3.3` or `hadoop-2.7` profile来编译
Profile `hadoop-3.3` 可以用于任意hadoop3.x, 默认hadoop3.x版本是3.3.1,
Profile `hadoop-2.7` 可以用于任意hadoop2.x, 默认hadoop2.x版本是2.7.2,
想要用其他版本可以编译时指定 -Dhadoop.version=xxx
```text
mvn -N  install
mvn clean install -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true
```

#### 6.1.2 linkis-engineplugin-hive的pom文件

```java
<hive.version>3.1.0</hive.version>
```

#### 6.1.3 linkis-engineplugin-spark的pom文件

Linkis版本小于`1.3.2`时
```java
<spark.version>2.3.2</spark.version>
```

当Linkis版本大于等于`1.3.2`时
```text
我们可以直接编译spark-3.2 profile, 如果我们同时使用hadoop3, 那么我们还需要指定hadoop-3.3 profile.
默认 spark3.x 版本时3.2.1. 如果我们使用spark-3.2 profile编译, scala版本默认是2.12.15,因此我们不需要在项目根目录设置scala版本了（5.1.1提到当)
如果Linkis使用hadoop3编译，同时spark仍旧是2.x版本的话，由于spark兼容性问题需要激活profile `spark-2.4-hadoop-3.3`
```
```text
mvn -N  install
mvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true
mvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true
```

#### 6.1.4 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
    public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.2");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.0");
```

#### 6.1.5 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.2")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.0")
```

## 7 CDH版本适配

### 7.1 maven配置地址

#### 7.1.1 setting文件

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
       <name>阿里云公共仓库</name>
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

#### 7.1.2 linkis的pom文件

```xml
    <repositories>
        <repository>
            <id>cloudera</id>
            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>
        <!--防止cloudera找不到，加上阿里源-->
        <repository>
            <id>aliyun</id>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>
    </repositories>
```

### 7.2 CDH5.12.1版本

| 引擎      | 版本            |
| --------- | --------------- |
| hadoop    | 2.6.0-cdh5.12.1 |
| zookeeper | 3.4.5-cdh5.12.1 |
| hive      | 1.1.0-cdh5.12.1 |
| spark     | 2.3.4           |
| flink     | 1.12.4          |
| python    | python3         |

#### 7.2.1 linkis的pom文件

```xml
<hadoop.version>2.6.0-cdh5.12.1</hadoop.version>
<zookeeper.version>3.4.5-cdh5.12.1</zookeeper.version>
<scala.version>2.11.8</scala.version>
```

#### 7.2.2 linkis-engineplugin-hive的pom文件

```xml
-- 修改
<hive.version>1.1.0-cdh5.12.1</hive.version>
-- 添加
<package.hive.version>1.1.0_cdh5.12.1</package.hive.version>
```

- 修改 assembly 下的 distribution.xml 文件

```xml
<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>
<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>
<outputDirectory>plugin/${package.hive.version}</outputDirectory>
```

- 修改CustomerDelimitedJSONSerDe文件

  ```
     /* hive版本过低，需注释
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

#### 7.2.3 linkis-engineplugin-flink的pom文件

```xml
<flink.version>1.12.4</flink.version>
```

#### 7.2.4 linkis-engineplugin-spark的pom文件

```xml
<spark.version>2.3.4</spark.version>
```

#### 7.2.5 linkis-engineplugin-python的pom文件

```xml
<python.version>python3</python.version>
```

#### 7.2.6 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
   public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.4");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "1.1.0");

			CommonVars.apply("wds.linkis.python.engine.version", "python3")
```

#### 7.2.7 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.4")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "1.1.0")
      
  val PYTHON_ENGINE_VERSION = CommonVars("wds.linkis.python.engine.version", "python3")
```

### 7.3 CDH6.3.2

| 引擎   | 版本           |
| ------ | -------------- |
| hadoop | 3.0.0-cdh6.3.2 |
| hive   | 2.1.1-cdh6.3.2 |
| spark  | 3.0.0          |

#### 7.3.1 linkis的pom文件

```xml
<hadoop.version>3.0.0-cdh6.3.2</hadoop.version> 
<scala.version>2.12.10</scala.version>
```

#### 7.3.2 linkis-hadoop-common

```xml
   <!-- 将hadoop-hdfs 切换 hadoop-hdfs-client --> 
   <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-hdfs-client</artifactId>
    </dependency>
```

#### 7.3.3 linkis-engineplugin-hive的pom文件

```xml
-- 修改
<hive.version>2.1.1-cdh6.3.2</hive.version>
-- 添加
<package.hive.version>2.1.1_cdh6.3.2</package.hive.version>
```

修改 assembly 下的 distribution.xml 文件

```xml
<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>
<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>
<outputDirectory>plugin/${package.hive.version}</outputDirectory>
```

#### 7.3.4 linkis-engineplugin-spark的pom文件

```xml
<spark.version>3.0.0</spark.version>
```

#### 7.3.5 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
   public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.0");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2");
```

#### 7.3.6 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.0")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2")
```

## 8 编译技巧

- 如果遇到类缺少或者类中方法缺少的情况下,找到对应引用这个包依赖,如何尝试切换到有对应包或者类的版本中来
- 引擎版本如果需要使用到-的话,使用_来进行替换,并且加上<package.引擎名字.version>来指定替换后的版本,同时在对应的引擎distribution文件中使用${package.引擎名字.version}来替换原有的
- 如果有时候使用阿里云镜像出现下载guava的jar出现403的问题的话,可以切换到华为,腾讯等镜像仓库