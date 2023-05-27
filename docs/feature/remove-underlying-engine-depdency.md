---
title: EngineConn no longer imports the dependencies of the underlying engine
sidebar_position: 0.2
---

## 1. Requirement Background
engine version hides in EngineConn, we may need to change several modules pom files if some engine version changes, we should move it to project pom file.

## 2. Instructions for use
if we need to compile only one engineconn module, we will need to compile with `-pl` to specific modules
```
mvn install package -pl linkis-engineconn-plugins/spark -Dspark.version=3.2.2

```
## 3. Precautions
engine version can also be specified like -Dspark.version=xxx 、 -Dpresto.version=0.235
now all our supported engine version has been moved to project pom file. please compile with the `-pl` command