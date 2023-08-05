---
title: Description of other features
sidebar_position: 0.6
---

## 1. Linkis 1.4.0 other feature upgrade instructions

### 1.1 Do not kill EC when ECM restarts
When the ECM restarts, there is an option not to kill the engine, but to take over the existing surviving engine. Makes the Engine Connection Manager (ECM) service stateless.

### 1.2 Remove json4s dependency
Different versions of spark depend on different json4s versions, which is not conducive to the support of multiple versions of spark. We need to reduce this json4s dependency and remove json4s from linkis.
For example: spark2.4 needs json4s v3.5.3, spark3.2 needs json4s v3.7.0-M11.

### 1.3 EngineConn module definition depends on engine version
The version definition of the engine is in `EngineConn` by default. Once the relevant version changes, it needs to be modified in many places. We can put the relevant version definition in the top-level pom file. When compiling a specified engine module, it needs to be compiled in the project root directory, and use `-pl` to compile the specific engine module, for example:
```
mvn install package -pl linkis-engineconn-plugins/spark -Dspark.version=3.2.1
```
The version of the engine can be specified by the -D parameter of mvn compilation, such as -Dspark.version=xxx, -Dpresto.version=0.235
At present, all underlying engine versions have been moved to the top-level pom file. When compiling a specified engine module, it needs to be compiled in the project root directory, and `-pl` is used to compile the specific engine module.

### 1.4 Linkis Main Version Number Modification Instructions

Linkis will no longer be upgraded by minor version after version 1.3.2. The next version will be 1.4.0, and the version number will be 1.5.0, 1.6.0 and so on. When encountering a major defect in a released version that needs to be fixed, it will pull a minor version to fix the defect, such as 1.4.1.


## 1.5 LInkis code submission main branch description

The modified code of Linkis 1.3.2 and earlier versions is merged into the dev branch by default. In fact, the development community of Apache Linkis is very active, and new development requirements or repair functions will be submitted to the dev branch, but when users visit the Linkis code base, the master branch is displayed by default. Since we only release a new version every quarter, it seems that the community is not very active from the perspective of the master branch. Therefore, we decided to merge the code submitted by developers into the master branch by default starting from version 1.4.0.
