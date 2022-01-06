---
title: Compile And Package
sidebar_position: 0
---
## 1 Fully compile Linkis

   __ Compilation environment requirements: __ JDK8 or above is required for compilation, and both **Oracle/Sun** and **OpenJDK** are supported.

   After obtaining the project code from git, use maven to package the project installation package.
   
**Please note**: The official recommendation is to use Hadoop-2.7.2, Hive-1.2.1, Spark-2.4.3 and Scala-2.11.12 to compile Linkis.

   If you want to use other versions of Hadoop, Hive, and Spark to compile Linkis, you can enter the root directory of the Linkis source code package and manually modify the relevant version information of the pom.xml file, as follows:

```bash
    cd incubator-linkis-x.x.x
    vim pom.xml
```

```xml
    <properties>
      
        <hadoop.version>2.7.2</hadoop.version>
        <hive.version>1.2.1</hive.version>
        <spark.version>2.4.3</spark.version>
              
        <scala.version>2.11.12</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>
              
    </properties>
```

   (1) **If you are using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:
   
```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```

   (2) Execute the following command in the root directory of the Linkis source code package:
    
```bash
    cd incubator-linkis-x.x.x
    mvn clean install
```

   (3) Obtain the installation package, under the assembly->target directory of the project:

```bash
    wedatasphere-linkis-x.x.x/assembly/target/wedatasphere-linkis-x.x.x-dist.tar.gz
```

## 2 Compile a single service
   
   After obtaining the project code from git, use maven to package the project installation package.

(1) **If you are using it locally for the first time, you must first execute the following command in the root directory of the Linkis source code package**:
   
```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```
         
(2) Jump to the corresponding module through the command line in the terminal, such as
   
```bash
    cd publicService
```

(3) Execute the compile command in the pom.xml directory corresponding to the module:
   
```bash
    mvn clean install
```
         
(4) Obtain the installation package, there will be a compiled package in the ->target directory of the corresponding module:
   
```
   target/linkis-publicservice.zip
```