---
title: Base Engine Dependency, Compatibility, Default Version Optimization
sidebar_position: 0.2
---

## 1. Requirement background
1. The lower version of linkis needs to modify the code to adapt to different versions of Hive, Spark, etc. Because of compatibility issues, the compilation may fail, which can reduce the compatibility issues of these basic engines.
2. Hadoop, Hive, and Spark 3.x are very mature, and lower versions of the engine may have potential risks. Many users in the community use the 3.x version by default, so consider changing the default compiled version of Linkis to 3.x.

## 2. Instructions for use

## 2.1 Default version adjustment instructions

Linkis 1.4.0 changes the default versions of Hadoop, Hive, and Spark to 3.x, and the specific versions are Hadoop 3.3.4, Hive 3.1.3, and Spark 3.2.1.

## 2.2 Different version adaptation

To compile different hive versions, we only need to specify `-D=xxx`, for example:
```
mvn clean install package -Dhive.version=2.3.3
```
To compile different versions of spark, we only need to specify `-D=xxx`. Common usage scenarios are as follows:
```
#spark3+hadoop3
mvn install package

#spark3+hadoop2
mvn install package -Phadoop-2.7

#spark2+hadoop2
mvn install package -Pspark-2.4 -Phadoop-2.7

#spark2+ hadoop3
mvn install package -Pspark-2.4
```
## 3. Precautions
1. When the default version is compiled, the basic version is: hadoop3.3.4 + hive3.1.3 + spark3.2.1
```
mvn install package
```
Due to the default version upgrade of the default base engine, `spark-3.2`, `hadoop-3.3` and `spark-2.4-hadoop-3.3` profiles were removed, and profiles `hadoop-2.7` and `spark-2.4` were added.

2. The sub-version of spark can be specified by `-Dspark.version=xxx`. The default scala version used by the system is 2.12.17, which can be adapted to spark 3.x version. To compile spark 2.x, you need to use scala 2.11 version. Can be compiled with -Pspark-2.4 parameter, or -Dspark.version=2.xx -Dscala.version=2.11.12 -Dscala.binary.version=2.11.

3. The subversion of hadoop can be specified by `-Dhadoop.version=xxx`

for example :
```
mvn install package -Pspark-3.2 -Phadoop-3.3 -Dspark.version=3.1.3
```

4. Version 2.x of hive needs to rely on jersey. Hive EC does not add jersey dependency when compiling by default. You can compile it through the following guidelines.

**Compile hive version 2.3.3**

When compiling hive EC, the profile that activates adding jersey dependencies when specifying version 2.3.3 is added by default. Users can compile by specifying the -Dhive.version=2.3.3 parameter

**Compile other hive 2.x versions**

Modify the linkis-engineconn-plugins/hive/pom.xml file, modify 2.3.3 to the user-compiled version, such as 2.1.0
```xml
<profile>
      <id>hive-jersey-dependencies</id>
      <activation>
        <property>
          <name>hive.version</name>
          <!-- <value>2.3.3</value> -->
          <value>2.1.0</value>
        </property>
      </activation>
      ...
    </profile>
```
Add -Dhive.version=2.1.0 parameter when compiling.
