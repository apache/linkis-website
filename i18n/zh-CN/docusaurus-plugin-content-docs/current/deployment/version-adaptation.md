# 版本适配

### 1. 编译指令

进入到项目的根目录下,依次执行如下指令

```text
mvn -N  install
mvn clean install -Dmaven.test.skip=true
```

### 2. SQL脚本切换

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

## 3. Linkis官方版本

| 引擎   | 版本   |
| ------ | ------ |
| hadoop | 2.7.2  |
| hive   | 2.3.3  |
| spark  | 2.4.3  |
| flink  | 1.12.2 |

## 3. Apache版本适配

### 3.1 Apache3.1.x版本

| 引擎   | 版本   |
| ------ | ------ |
| hadoop | 3.1.1  |
| hive   | 3.1.2  |
| spark  | 3.0.1  |
| flink  | 1.13.2 |

#### 3.1.1 linkis的pom文件

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

#### 3.1.2 linkis-hadoop-common的pom文件

```java
<!-- 注意这里的 <version>${hadoop.version}</version> , 根据你有没有遇到错误来进行调整 --> 
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-hdfs-client</artifactId>
    <version>${hadoop.version}</version>
</dependency>
```

#### 3.1.3 linkis-engineplugin-hive的pom文件

```java
<hive.version>3.1.2</hive.version>
```

#### 3.1.4 linkis-engineplugin-spark的pom文件

```java
<spark.version>3.0.1</spark.version>
```

#### 3.1.5 flink-engineconn-flink的pom文件

```java
<flink.version>1.13.2</flink.version>
```

由于flink1.12.2到1.13.2版本,有部分类进行调整,所以需要进行flink的编译和调整,编译flink选择scala的版本为2.12版本

```text
-- 注意,下列的类是从1.12.2给copy到1.13.2版本来
org.apache.flink.table.client.config.entries.DeploymentEntry
org.apache.flink.table.client.config.entries.ExecutionEntry
org.apache.flink.table.client.gateway.local.CollectBatchTableSink
org.apache.flink.table.client.gateway.local.CollectStreamTableSink
```

#### 3.1.6 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
    public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.1");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.2");
```

#### 3.1.7 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.1")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.2")
```

## 4. HDP版本适配

### 4.1 HDP3.0.1版本

| 引擎           | 版本   |
| -------------- | ------ |
| hadoop         | 3.1.1  |
| hive           | 3.1.0  |
| spark          | 2.3.2  |
| json4s.version | 3.2.11 |

#### 4.1.1 linkis的pom文件

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

#### 4.1.2 linkis-engineplugin-hive的pom文件

```java
<hive.version>3.1.0</hive.version>
```

#### 4.1.3 linkis-engineplugin-spark的pom文件

```java
<spark.version>2.3.2</spark.version>
```

#### 4.1.4 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
    public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.2");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.0");
```

#### 4.1.5 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.2")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.0")
```

## 5 CDH版本适配

### 5.1 maven配置地址

#### 5.1.1 setting文件

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

#### 5.1.2 linkis的pom文件

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

### 5.2 CDH5.12.1版本

| 引擎      | 版本            |
| --------- | --------------- |
| hadoop    | 2.6.0-cdh5.12.1 |
| zookeeper | 3.4.5-cdh5.12.1 |
| hive      | 1.1.0-cdh5.12.1 |
| spark     | 2.3.4           |
| flink     | 1.12.4          |
| python    | python3         |

#### 5.2.1 linkis的pom文件

```xml
<hadoop.version>2.6.0-cdh5.12.1</hadoop.version>
<zookeeper.version>3.4.5-cdh5.12.1</zookeeper.version>
<scala.version>2.11.8</scala.version>
```

#### 5.2.2 linkis-engineplugin-hive的pom文件

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

#### 5.2.3 linkis-engineplugin-flink的pom文件

```xml
<flink.version>1.12.4</flink.version>
```

#### 5.2.4 linkis-engineplugin-spark的pom文件

```xml
<spark.version>2.3.4</spark.version>
```

#### 5.2.5 linkis-engineplugin-python的pom文件

```xml
<python.version>python3</python.version>
```

#### 5.2.6 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
   public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.4");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "1.1.0");

			CommonVars.apply("wds.linkis.python.engine.version", "python3")
```

#### 5.2.7 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.4")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "1.1.0")
      
  val PYTHON_ENGINE_VERSION = CommonVars("wds.linkis.python.engine.version", "python3")
```

### 5.3 CDH6.3.2

| 引擎   | 版本           |
| ------ | -------------- |
| hadoop | 3.0.0-cdh6.3.2 |
| hive   | 2.1.1-cdh6.3.2 |
| spark  | 3.0.0          |

#### 5.3.1 linkis的pom文件

```xml
<hadoop.version>3.0.0-cdh6.3.2</hadoop.version> 
<scala.version>2.12.10</scala.version>
```

#### 5.3.2 linkis-hadoop-common

```xml
   <!-- 将hadoop-hdfs 切换 hadoop-hdfs-client --> 
   <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-hdfs-client</artifactId>
    </dependency>
```

#### 5.3.3 linkis-engineplugin-hive的pom文件

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

#### 5.3.4 linkis-engineplugin-spark的pom文件

```xml
<spark.version>3.0.0</spark.version>
```

#### 5.3.5 linkis-label-common调整

org.apache.linkis.manager.label.conf.LabelCommonConfig 文件调整

```java
   public static final CommonVars<String> SPARK_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.0");

    public static final CommonVars<String> HIVE_ENGINE_VERSION =
            CommonVars.apply("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2");
```

#### 5.3.6 linkis-computation-governance-common调整

org.apache.linkis.governance.common.conf.GovernanceCommonConf 文件调整

```java
  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.0")

  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2")
```

## 6 编译技巧

- 如果遇到类缺少或者类中方法缺少的情况下,找到对应引用这个包依赖,如何尝试切换到有对应包或者类的版本中来
- 引擎版本如果需要使用到-的话,使用_来进行替换,并且加上<package.引擎名字.version>来指定替换后的版本,同时在对应的引擎distribution文件中使用${package.引擎名字.version}来替换原有的
- 如果有时候使用阿里云镜像出现下载guava的jar出现403的问题的话,可以切换到华为,腾讯等镜像仓库