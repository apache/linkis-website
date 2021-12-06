---
title: Linkis Compilation
sidebar_position: 3
---

# Linkis compilation document

## Directory

- 1. How to compile the whole project of Linkis.
- 2. How to compile a module.
- 3. How to compile an engine.
- 4. How to modify the version of Hadoop, Hive and Spark that Linkis depends on.

## 1. Compile the whole project

Environment requirements: The version of JDK must be **higher than JDK8**, both **Oracle/Sun** and **OpenJDK** are supported.

After cloning the project from github, please use maven to compile the project. 

**Please note**: We recommend you using Hadoop-2.7.2, Hive-1.2.1, Spark-2.4.3 and Scala-2.11.8 to compile the Linkis.

If you want to use other version of Hadoop, Hive and Spark, please refer to: How to modify the version of Hadoop, Hive and Spark that Linkis depends on.

(1) **If you are compiling the Linkis on your local machine for the first time, you must execute the following commands on the root directory beforehand:**

```bash
    cd wedatasphere-linkis-x.x.x
    mvn -N  install
```

(2) Execute the following commands on the root directory:

```bash
    cd wedatasphere-linkis-x.x.x
    mvn clean install
```

(3) Obtain installation package from the directory 'assembly-> target':

```bash
    ls wedatasphere-linkis-x.x.x/assembly/target/wedatasphere-linkis-x.x.x-dist.tar.gz
```

## 2. Compile a module

After cloning project from github, please use maven to compile the project. 

(1) **If you are compiling the Linkis on your local machine for the first time, you must execute the following commands on the root directory beforehand:**

```bash
    cd wedatasphere-linkis-x.x.x
    mvn -N  install
```

(2) Switch to the corresponding module to compile. An example of compiling Entrance module is shown below.

```bash   
    cd wedatasphere-linkis-x.x.x/linkis-computation-governance/linkis-entrance
    mvn clean install
```

(3) Obtain compiled installation package from 'target' directory in the corresponding module.

```
    ls wedatasphere-linkis-x.x.x/linkis-computation-governance/linkis-entrance/target/linkis-entrance.x.x.x.jar
```

## 3. Compile an engine

An example of compiling the Spark engine is shown below:

(1) **If you are compiling the Linkis on your local machine for the first time, you must execute the following commands on the root directory beforehand:**

```bash
    cd wedatasphere-linkis-x.x.x
    mvn -N  install
```

(2) Switch to the directory where Spark engine locates and use the following commands to compile:

```bash   
    cd wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
    mvn clean install
```

(3) Obtained compiled installation package from 'target' directory in the corresponding module.

```
    ls wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark/target/linkis-engineplugin-spark-x.x.x.zip
```

How to install Spark engine separately? Please refer to Linkis EngineConnPlugin installation document.

## 4. How to modify the version of Hadoop, Hive and Spark that Linkis depends on

Please note: Since Hadoop is a fundamental service in big data area, Linkis must rely on it for compilation, while computing storage engines such as Spark and Hive are not. If you do not have requirements for a certain engine, then no need to set its engine version or compile its EngineConnPlugin.

The way to modify the version of Hadoop is different from that of Spark, Hive and other computation engines. Please see instructions below:

#### How to modify the version of Hadoop that Linkis relies on?

Enter the root directory of the Linkis and manually modified the Hadoop version in pom.xml.

```bash
    cd wedatasphere-linkis-x.x.x
    vim pom.xml
```

```xml
    <properties>
      
        <hadoop.version>2.7.2</hadoop.version> <!--> Modify Hadoop version here <-->
              
        <scala.version>2.11.8</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>
              
    </properties>
```

#### How to modify the version of Spark, Hive that Linkis relies on?

Here is an example of modifying Spark version. Enter the directory where Spark engine locates and manually modify the Spark version in pom.xml.

```bash
    cd wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
    vim pom.xml
```

```xml
    <properties>
      
        <spark.version>2.4.3</spark.version>  <!--> Modify Spark version here <-->
              
    </properties>
```

Modifying  the version of other engines is similar to that of Spark. Enter the directory where  engine locates and manually modify the version in pom.xml.

Then, please refer to How to compile an engine.