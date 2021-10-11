# Linkis Compilation Document

## directory

- [1. Fully compile Linkis](#1-Fully-compile-Linkis)

- [2. Build a single module](#2-Build-a-single-module)

- [3. Build an engine](#3-Build-an-engine)

- [4. How to Modify Linkis dependency versions of Hadoop, Hive, Spark](#4-How-to-Modify-Linkis-dependency-versions-of-Hadoop,-Hive,-Spark)

## 1. Fully compile Linkis

**Environment requirements:** Version of JDK must be higher then **JDK8**,  **Oracle/Sun** and **OpenJDK** are both supported.

After getting the project code from Git, compile the project installation package using Maven.

**Notice** : The official recommended versions for compiling Linkis are hadoop-2.7.2, hive-1.2.1, spark-2.4.3, and Scala-2.11.8.

If you want to compile Linkis with another version of Hadoop, Hive, Spark, please refer to: [How to Modify Linkis dependency of Hadoop, Hive, Spark](#4 How to Modify Linkis dependency versionof Hadoop, Hive, Spark)

(1) **If you compile it locally for the first time, you must execute the following command ** in the source package root directory of Linkis:**

```bash
cd wedatasphere-linkis-x.x.x
mvn -N  install
```

(2) Execute the following command in the source package root directory of Linkis:

```bash
cd wedatasphere-linkis-x.x.x
mvn clean install
```

(3) Get the installation package, in the project assembly->target directory:

```bash
ls wedatasphere-linkis-x.x.x/assembly/target/wedatasphere-linkis-x.x.x-dist.tar.gz
```

## 2. Compile a single module

After getting the project code from Git, use Maven to package the project installation package.

(1) **If you use it locally for the first time, you must execute the following command** in the source package root directory of Linkis:

```bash
cd wedatasphere-linkis-x.x.x
mvn -N  install
```

(2) Go to the corresponding module for compilation. For example, if you want to recompile the Entrance, command as follows:

```bash
cd wedatasphere-linkis-x.x.x/linkis-computation-governance/linkis-entrance
mvn clean install
```

(3) Get the installation package. The compiled package will be found in the ->target directory of the corresponding module:

```
ls wedatasphere-linkis-x.x.x/linkis-computation-governance/linkis-entrance/target/linkis-entrance.x.x.x.jar
```

## 3. Build an engine

Here's an example of the Spark engine that builds Linkis:

(1) **If you use it locally for the first time, you must execute the following command** in the source package root directory of Linkis:

```bash
cd wedatasphere-linkis-x.x.x
mvn -N  install
```

(2) Jump to the directory where the Spark engine is located for compilation and packaging. The command is as follows:

```bash
cd wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
mvn clean install
```

(3) Get the installation package. The compiled package will be found in the ->target directory of the corresponding module:

```
ls  wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark/target/linkis-engineplugin-spark-x.x.x.zip
```

How do I install the Spark engine separately? Please refer to [Linkis Engine Plug-in Installation Documentation](.. / Deployment_Documents EngineConnPlugin engine plug-in installation document. Md)

## 4. How to Modify Linkis dependency versions of Hadoop, Hive, Spark

Please note: Hadoop is a big data basic service, Linkis must rely on Hadoop for compilation;
If you don't want to use an engine, you don't need to set the version of the engine or compile the engine plug-in.

Specifically, the version of Hadoop can be modified in a different way than Spark, Hive, and other computing engines, as described below:

#### How do I modify the version of Hadoop that Linkis relies on?

Enter the source package root directory of Linkis, and manually modify the Hadoop version information of the pom.xml file, as follows:

```bash
cd wedatasphere-linkis-x.x.x
vim pom.xml
```

```xml
<properties>
    <hadoop.version>2.7.2</hadoop.version> <!--Change version of hadoop here-->
    <scala.version>2.11.8</scala.version>
    <jdk.compile.version>1.8</jdk.compile.version>
 </properties>

```

**Please note: If your hadoop version is hadoop3, you need to modify the pom file of linkis-hadoop-common**
Because under hadoop2.8, hdfs-related classes are in the hadoop-hdfs module, but in hadoop 3.X the corresponding classes are moved to the module hadoop-hdfs-client, you need to modify this file:

```
pom:Linkis/linkis-commons/linkis-hadoop-common/pom.xml
Modify the dependency hadoop-hdfs to hadoop-hdfs-client:
  <dependency>
             <groupId>org.apache.hadoop</groupId>
             <artifactId>hadoop-hdfs</artifactId> <!-- Replace this line with <artifactId>hadoop-hdfs-client</artifactId>-->
             <version>${hadoop.version}</version>
             ...
  Modify hadoop-hdfs to:
   <dependency>
             <groupId>org.apache.hadoop</groupId>
             <artifactId>hadoop-hdfs-client</artifactId>
             <version>${hadoop.version}</version>
             ...
```

#### How to modify Spark, Hive versions that Linkis relies on?

Here's an example of changing the version of Spark. Go to the directory where the Spark engine is located and manually modify the Spark version information of the pom.xml file as follows:

```bash
cd wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
vim pom.xml
```

```xml
<properties>
    <spark.version>2.4.3</spark.version> <!-- Change the Spark version number here -->
 </properties>

```

Modifying the version of another engine is similar to changing the Spark version by going to the directory where the engine is located and manually changing the engine version information in the pom.xml file.

Then refer to  [Build an engine](#3 Build an engine).
