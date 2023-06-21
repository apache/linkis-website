---
title: 减少基础引擎不同版本兼容性问题
sidebar_position: 0.2
---

## 1. 需求背景
之前我们需要修改linkis代码来适配不同的hive版本、spark版本，因为兼容性问题，编译可能会失败，我们可以减少这些基础引擎的兼容性问题。

## 2. 使用说明
不同的hive版本的编译，我们只需要指定`-D=xxx`就可以了，比如：
```
mvn clean install package -Dhive.version=3.1.3

```
不同版本的spark编译，我们也只需要指定`-D=xxx`就可以了，常用的使用场景如下：
```
spark3+hadoop3
mvn install package

spark3+hadoop2
mvn install package  -Phadoop-2.7

spark2+hadoop2
mvn install package -Pspark-2.4 -Phadoop-2.7

spark2+ hadoop3
mvn install package -Pspark-2.4

```
## 3. 注意事项
spark的子版本可以通过`-Dspark.version=xxx` 来指定
hadoop的子版本可以通过`-Dhadoop.version=xxx` 来指定

举个例子 :
```
mvn install package -Pspark-3.2 -Phadoop-3.3 -Dspark.version=3.1.3
```