---
title:  其它特性说明
sidebar_position: 0.6
---

## 1. ECM 重启时不 kill EC
当ECM重新启动时，可以选择不杀死引擎，而是可以接管现有的存活引擎。使引擎连接管理器 (ECM) 服务无状态。

## 2. 移除 json4s 依赖
spark 不同版本依赖不同的json4s版本，不利于spark多版本的支持，我们需要减少这个json4s依赖，从linkis中移除了json4s.
比如: spark2.4 需要json4s v3.5.3, spark3.2需要json4s v3.7.0-M11。

## 3. EngineConn模块定义依赖引擎版本
引擎的版本定义默认在 `EngineConn`中，一旦相关版本变更，需要修改多处，我们可以把相关的版本定义统一放到顶层pom文件中。编译指定引擎模块时，需要在项目根目录编译，并使用`-pl`来编译具体的引擎模块，比如：
```
mvn install package -pl linkis-engineconn-plugins/spark -Dspark.version=3.2.1
```
引擎的版本可以通过mvn编译-D参数来指定，比如 -Dspark.version=xxx 、 -Dpresto.version=0.235
目前所有的底层引擎版本新都已经移到顶层pom文件中，编译指定引擎模块时，需要在项目根目录编译，并使用`-pl`来编译具体的引擎模块。

## 4. Linkis 主版本号修改说明

Linkis 从 1.3.2 版本后将不再按小版本升级，下一个版本为 1.4.0，再往后升级时版本号为1.5.0，1.6.0 以此类推。当遇到某个发布版本有重大缺陷需要修复时会拉取小版本修复缺陷，如 1.4.1 。


## 5. LInkis 代码提交主分支说明

Linkis 1.3.2 及之前版本修改代码默认是合并到 dev 分支。实际上 Apache Linkis 的开发社区很活跃，对于新开发的需求或修复功能都会提交到 dev 分支，但是用户访问 Linkis 代码库的时候默认显示的是 master 分支。由于我们一个季度才会发布一个新版本，从 master 分支来看显得社区活跃的不高。因此我们决定从 1.4.0 版本开始，将开发者提交的代码默认合并到 master 分支。

