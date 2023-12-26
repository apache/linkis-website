---
title: 基础引擎依赖性、兼容性、默认版本优化
sidebar_position: 0.2
---

## 1. 需求背景
1. 低版本 linkis 需要通过修改代码来适配不同的 Hive、Spark 等版本，因为兼容性问题，编译可能会失败，可以减少这些基础引擎的兼容性问题。
2. Hadoop、Hive、Spark 3.x 已经很成熟，并且低版本的引擎可能有潜在的风险点，社区很多用户默认使用 3.x 版本，因此考虑将 Linkis 默认编译的版本修改为 3.x 。

## 2. 使用说明

## 2.1 默认版本调整说明

Linkis 1.4.0 将 Hadoop、Hive、Spark 默认版本修改为 3.x，具体版本分别为 Hadoop 3.3.4、Hive 3.1.3、Spark 3.2.1 。

## 2.2 不同版本适配

不同的hive版本的编译，我们只需要指定`-D=xxx`就可以了，比如：
```
mvn clean install package -Dhive.version=2.3.3
```
不同版本的spark编译，我们也只需要指定`-D=xxx`就可以了，常用的使用场景如下：
```
#spark3+hadoop3
mvn install package

#spark3+hadoop2
mvn install package  -Phadoop-2.7

#spark2+hadoop2
mvn install package -Pspark-2.4 -Phadoop-2.7

#spark2+ hadoop3
mvn install package -Pspark-2.4
```
## 3. 注意事项
1. 默认版本编译时，基础版本为：hadoop3.3.4 + hive3.1.3 + spark3.2.1
```
mvn install package
```
由于默认基础引擎的默认版本升级，`spark-3.2`、`hadoop-3.3`和`spark-2.4-hadoop-3.3` profile被移除，新增profile `hadoop-2.7` and `spark-2.4`。

2. spark的子版本可以通过`-Dspark.version=xxx` 来指定，系统默认使用的 scala 版本为 2.12.17，可适配 spark 3.x 版本 。如需编译 spark 2.x，需要使用 scala 2.11 版本。可通过 -Pspark-2.4 参数，或者 -Dspark.version=2.xx -Dscala.version=2.11.12 -Dscala.binary.version=2.11 编译。

3. hadoop的子版本可以通过`-Dhadoop.version=xxx` 来指定

举个例子 :
```
mvn install package -Pspark-3.2 -Phadoop-3.3 -Dspark.version=3.1.3
```

4. hive 2.x 版本需要依赖 jersey，hive EC 默认编译时未添加 jersey依赖，可通过如下指引编译。

**编译 hive 2.3.3 版本**

编译 hive EC 时默认添加了指定 2.3.3 版本时激活添加 jersey 依赖的 profile，用户可通过指定 -Dhive.version=2.3.3 参数编译

**编译其它 hive 2.x 版本**

修改 linkis-engineconn-plugins/hive/pom.xml 文件，将 2.3.3 修改为用户编译版本，如 2.1.0
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
编译时添加 -Dhive.version=2.1.0 参数。

