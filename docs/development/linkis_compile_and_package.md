---
title: Compile And Package
sidebar_position: 1
---

## 1. Fully compile Linkis

**Compilation environment requirements**:Must be **JDK8** or above, both **Oracle/Sun** and **OpenJDK** are supported.

After obtaining the project code from [github repository](https://github.com/apache/incubator-linkis) https://github.com/apache/incubator-linkis, use maven to compile the project installation package.

### step1 Source code acquisition

- Method 1: Obtain the source code of the project from [github repository](https://github.com/apache/incubator-linkis) https://github.com/apache/incubator-linkis.
- Method 2: Download the source code package of the required version from the [linkis official download page](https://linkis.apache.org/download/index) https://linkis.apache.org/download/index.

**Please note**: The official recommendation is to use Hadoop-2.7.2, Hive-1.2.1, Spark-2.4.3 and Scala-2.11.12 to compile Linkis.

If you want to use other versions of Hadoop, Hive, Spark to compile Linkis, please refer to: [How to modify the version of Hadoop, Hive, Spark that Linkis depends on] (#4-How to modify the version of hadoophivespark that Linkis depends on)

### step2 Compile for the first time (not the first time you can skip this step)

**If you are compiling and using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:
```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```

### step3 Execute compilation
Execute the following commands in the root directory of the Linkis source code package:
    
```bash
    cd incubator-linkis-x.x.x
    mvn clean install

```

### step4 Obtain the installation package
The compiled complete installation package is in the assembly-combined-package->target directory of the project:

```bash
    #Detailed path is as follows
    incubator-linkis-x.x.x/assembly-combined-package/target/apache-linkis-x.x.x-incubating-bin.tar.gz
```

## 2. Compile a single module

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
Obtain the installation package, there will be a compiled package in the ->target directory of the corresponding module:
   
```
    ls incubator-linkis-x.x.x/linkis-computation-governance/linkis-entrance/target/linkis-entrance.x.x.x.jar
```

## 3. Compile an engine

Here is an example of compiling the Spark engine of Linkis:

### step1 Compile for the first time (skip this step for non-first time)
**If you are using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:
   
```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```
### step2 Enter the corresponding module to compile
Enter the directory where the Spark engine is located to compile and package, the command is as follows:
   
```bash
    cd incubator-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
    mvn clean install
```
### step3 Obtain the installation package
Obtain the installation package, there will be a compiled package in the ->target directory of the corresponding module:
   
```
   incubator-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark/target/linkis-engineplugin-spark-x.x.x.jar
```

How to install Spark engine separately? Please refer to [Linkis Engine Plugin Installation Document](deployment/engine_conn_plugin_installation.md)

## 4. How to modify the Hadoop, Hive, and Spark versions that Linkis depends on

Please note: Hadoop is a big data basic service, Linkis must rely on Hadoop for compilation;
This is not true for computing storage engines such as Spark and Hive. If you do not want to use a certain engine, you do not need to set the engine version or compile the engine plug-in.

Specifically, the way to modify the version of Hadoop is different from that of Spark, Hive and other computing engines. The following is a detailed introduction:

#### How to modify the Hadoop version that Linkis depends on?

Enter the root directory of the Linkis source code package and manually modify the Hadoop version information of the pom.xml file as follows:

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
Because when the hadoop 2.8 is below, the hdfs related class is in the hadoop-hdfs module, but in hadoop 3.X the corresponding class is moved to the module hadoop-hdfs-client, you need to modify this file:

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

#### How to modify the Spark and Hive versions that Linkis depends on?

Here is an example of modifying the version of Spark. Enter the directory where the Spark engine is located, and manually modify the Spark version information in the pom.xml file, as follows:

```bash
    cd incubator-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
    vim pom.xml
```

```xml
    <properties>
        <spark.version>2.4.3</spark.version> <!--> Modify the Spark version number here <-->
    </properties>
```

Modifying the version of other engines is similar to modifying the Spark version. First, enter the directory where the relevant engine is located, and manually modify the engine version information in the pom.xml file.

Then please refer to [3. Compile an engine]



