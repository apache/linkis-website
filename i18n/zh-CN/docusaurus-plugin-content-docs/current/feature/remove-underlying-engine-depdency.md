---
title: EngineConn模块定义依赖引擎版本
sidebar_position: 0.2
---

## 1. 需求背景
引擎的版本定义默认在 `EngineConn`中，一旦相关版本变更，需要修改多处，我们可以把相关的版本定义统一放到顶层pom文件中

## 2. 使用说明
编译指定引擎模块时，需要在项目根目录编译，并使用`-pl`来编译具体的引擎模块，比如：
```
mvn install package -pl linkis-engineconn-plugins/spark -Dspark.version=3.2.2

```
## 3. 注意事项
引擎的版本可以通过mvn编译-D参数来指定，比如 -Dspark.version=xxx 、 -Dpresto.version=0.235
目前所有的底层引擎版本新都已经移到顶层pom文件中，编译指定引擎模块时，需要在项目根目录编译，并使用`-pl`来编译具体的引擎模块