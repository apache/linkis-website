---
title: upgrade hadoop\spark\hive default version to 3.x
sidebar_position: 0.2
---

## 1. Requirement Background
fow now we support different hadoop, hive ,spark version compile, and lower engine version may have potential risk

## 2. Instructions for use
default hadoop version changes from 2.7.2 to 3.3.4
default hive version changes from 2.3.3 to 3.1.3
default spark version changes from 2.4.3 to 3.2.1


## 3. Precautions
for the default compilation, versions will be spark3.2.1+hadoop3.3.4+hive3.1.3.
```
mvn install package
```
profile spark-3.2 、 hadoop-3.3 、spark-2.4-hadoop-3.3 profiles have been removed and profile hadoop-2.7 and spark-2.4 have been added instead.