---
title: How to Build
sidebar_position: 2.0
---

## 1. Preparation
**Environment requirements:** Version of JDK must be higher than **JDK8**,  **Oracle/Sun** and **OpenJDK** are both supported.

After obtaining the project code from [github repository](https://github.com/apache/incubator-linkis) https://github.com/apache/incubator-linkis, use maven to compile the project installation package.

### 1.1 Source code acquisition

- Method 1: Obtain the source code of the project from [github repository](https://github.com/apache/incubator-linkis) https://github.com/apache/incubator-linkis.
- Method 2: Download the source code package of the required version from the [linkis official download page](https://linkis.apache.org/download/main) https://linkis.apache.org/download/main.

**Notice** : The official recommended versions for compiling Linkis are hadoop-2.7.2, hive-1.2.1, spark-2.4.3, and Scala-2.11.12.

If you want to compile Linkis with another version of Hadoop, Hive, Spark, please refer to: [How to Modify Linkis dependency of Hadoop, Hive, Spark](#5-how-to-modify-the-hadoop-hive-and-spark-versions-that-linkis-depends-on)

### <font color="red">1.2 Modify dependency configuration</font>
:::caution Note
Because the mysql-connector-java driver is under the GPL2.0 agreement and does not meet the license policy of the Apache open source agreement, starting from version 1.0.3, the scope of the dependency on mysql-connector-java is test by default. If you compile by yourself , You can modify the scope that the mysql-connector-java of the top-level pom.xml depends on (just comment it out)
:::
```xml
<dependency>
     <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
     <version>${mysql.connector.version}</version>
     <!--<scope>test</scope>-->
</dependency>
```

## 2. Fully compile Linkis



### step1 Compile for the first time (not the first time you can skip this step)

**If you are compiling and using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:
```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```

### step2 Execute compilation
Execute the following commands in the root directory of the Linkis source code package:
    
```bash
    cd incubator-linkis-x.x.x
    mvn clean install

```

### step3 Obtain the installation package
The compiled complete installation package is in the linkis-dist->target directory of the project:

```bash
    #Detailed path is as follows
    incubator-linkis-x.x.x/linkis-dist/target/apache-linkis-x.x.x-incubating-bin.tar.gz
```

## 3. Compile a single module

### step1 Compile for the first time (skip this step for non-first time)
**If you are compiling and using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:

```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```
### step2 Enter the corresponding module to compile
Enter the corresponding module to compile, for example, if you want to recompile Entrance, the command is as follows:
   
```bash
    cd incubator-linkis-x.x.x/linkis-computation-governance/linkis-entrance
    mvn clean install
```

### step3 Obtain the installation package
Get the installation package, there will be a compiled package in the ->target directory of the corresponding module:
   
```
    incubator-linkis-x.x.x/linkis-computation-governance/linkis-entrance/target/linkis-entrance.x.x.x.jar
```

## 4. Compile an engine

Here's an example of the Spark engine that builds Linkis:

### step1 Compile for the first time (skip this step for non-first time)
**If you are using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:
   
```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```
### step2 Enter the corresponding module to compile
Enter the directory where the Spark engine is located to compile and package, the command is as follows:
   
```bash
    cd incubator-linkis-x.x.x/linkis-engineconn-pluginsspark
    mvn clean install
```
### step3 Obtain the installation package
Get the installation package, there will be a compiled package in the ->target directory of the corresponding module:
   
```
   incubator-linkis-x.x.x/linkis-engineconn-pluginsspark/target/linkis-engineplugin-spark-x.x.x.jar
```

How to install Spark engine separately? Please refer to [Linkis Engine Plugin Installation Document](../deployment/install-engineconn)

## 5. How to modify the Hadoop, Hive, and Spark versions that Linkis depends on

Please note: Hadoop is a big data basic service, Linkis must rely on Hadoop for compilation;
If you don't want to use an engine, you don't need to set the version of the engine or compile the engine plug-in.

Specifically, the version of Hadoop can be modified in a different way than Spark, Hive, and other computing engines, as described below:

### 5.1 How to modify the Hadoop version that Linkis depends on

Enter the source package root directory of Linkis, and manually modify the Hadoop version information of the pom.xml file, as follows:

```bash
    cd incubator-linkis-x.x.x
    vim pom.xml
```

```xml
    <properties>
      
        <hadoop.version>2.7.2</hadoop.version> <!--> Modify the Hadoop version number here <-->
        <scala.version>2.11.12</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>
              
    </properties>
```

**Please note: If your hadoop version is hadoop3, you need to modify the pom file of linkis-hadoop-common**
Because under hadoop2.8, hdfs-related classes are in the hadoop-hdfs module, but in hadoop 3.X the corresponding classes are moved to the module hadoop-hdfs-client, you need to modify this file:
pom:Linkis/linkis-commons/linkis-hadoop-common/pom.xml
Modify the dependency hadoop-hdfs to hadoop-hdfs-client:
```
 <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-hdfs</artifactId> <!-- Just replace this line with <artifactId>hadoop-hdfs-client</artifactId>-->
        <version>${hadoop.version}</version>
</dependency>
 Modify hadoop-hdfs to:
 <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-hdfs-client</artifactId>
        <version>${hadoop.version}</version>
</dependency>
```

### 5.2 How to modify the Spark and Hive versions that Linkis depends on

Here's an example of changing the version of Spark. Go to the directory where the Spark engine is located and manually modify the Spark version information of the pom.xml file as follows:

```bash
    cd incubator-linkis-x.x.x/linkis-engineconn-pluginsspark
    vim pom.xml
```

```xml
    <properties>
        <spark.version>2.4.3</spark.version> <!--> Modify the Spark version number here <-->
    </properties>
```

Modifying the version of other engines is similar to modifying the Spark version. First, enter the directory where the relevant engine is located, and manually modify the engine version information in the pom.xml file.

Then please refer to [4. Compile an engine](#4-compile-an-engine)

## 6. How to exclude the specified engines during fully compile
You can use the `-pl` option of `mvn` command, please refer below for details
```
-pl,--projects <arg>                   Comma-delimited list of specified
                                        reactor projects to build instead
                                        of all projects. A project can be
                                        specified by [groupId]:artifactId
                                        or by its relative path.
```
Implement the reverse selection by using `!` to exclude the given engines so that shorten the consumed time for fully compile.
Here we take flink, sqoop and hive as an example, and exclude them during fully compile:
```
mvn clean install -Dmaven.test.skip=true \
-pl '!linkis-engineconn-plugins/flink,!linkis-engineconn-plugins/sqoop,!linkis-engineconn-plugins/hive'
```
