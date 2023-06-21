---
title: reduce base engine compatibility issues
sidebar_position: 0.2
---

## 1. Requirement Background
before we may need to modify linkis source code to fit different hive and spark version and compilation may fail for some certain versions, we need to reduce compilation and installation problems caused by base engine versions

## 2. Instructions for use
for different hive compilation, we only to compile with target hive versions, such as
```
mvn clean install package -Dhive.version=3.1.3

```

for different spark compilation, we only to compile with target spark versions, here are normal scenes for usage.
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
## 3. Precautions
spark subversion can be specified by -Dspark.version=xxx
hadoop subversion can be specified by -Dhadoop.version=xxx

for example :
mvn install package -Pspark-3.2 -Phadoop-3.3 -Dspark.version=3.1.3