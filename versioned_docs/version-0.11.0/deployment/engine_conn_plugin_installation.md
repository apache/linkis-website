---
title: Install EngineConnPlugin
sidebar_position: 5
---

> This paper focuses on the separate function of the Linkis Engine plugin, mainly in compilation, installation, etc.

## 1 Engine Plugin Packaging
&nbsp;&nbsp;&nbsp;&nbsp;Engines are managed after linkis1.0 by the Engine Management Service, and engine plugins are supported in real time.For engine management services to be able to load by tag to the corresponding engine plugin, packaging according to the following directory structure (for example, hive)：
```
hive:引擎主目录，必须为引擎的名字
    └── dist  # 引擎启动需要的依赖和配置，引擎不同的版本需要在该目录防止对应的版本目录
      └── v1.2.1 #必须以v开头加上引擎版本号1.2.1
           └── conf # 引擎需要的配置文件目录
           └── lib  # 引擎插件需要的依赖包
    └── plugin #引擎插件目录，该目录用于引擎管理服务封装引擎的启动命令和资源申请
      └── 1.2.1 # 引擎版本
        └── linkis-engineplugin-hive-1.0.0-RC1.jar  #引擎模块包（只需要放置单独的引擎包）
```
如果您是新增引擎，你可以参考hive的assembly配置方式，源码目录：`linkis-engineconn-plugins/engineconn-plugins/hive/src/main/assembly/distribution.xml`

## 2 Engine Installation
### 2.1 Package Installation
1. First confirm the main directory for the engine dish configuration：wds.linkis.engineconn.home (LinkisInstall/conf/linkis.properties), which is the engine manager service that reads the configuration and dependency required for engine startuping. Engine manager service that sets the parameter (wds.linkis.engineconn.dist.load.enable=true) will read the engine from that directory into the repository.
2. Also need to confirm the engine plugin loading parameter：wds.linkis.engineconn.plugin.loader.store.path; this directory is an engine manager service that is used to reflect and read the engine packages.
3. If the two parameters of wds.linkis.engineconn.home and wds.linkis.engineconn.plugin.loader.store.path.path are specified as the same directory, the directory from which the engine is generated can be unpacked directly to that directory, or placed in /appcom/Install/LinkisInstall/Lib/linkis-engineconn-plugins directory：
```
/appcom/Install/LinkisInstall/lib/linkis-engineeconn-plugins:
hive
 dist
 plugin
spark
 dist
 plugin
```
4. If the directory is not the same directory, it needs to be opened separately for disquiet and plugin, like the example below：
```
#dist directory
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins/distist:
hive
 dist

spark
 dist

#plugin directory
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins/distist:
hive
 plin
spark
 plugin
```
### 2.2 Admin Config Changes
> Admin Config Change (optional)

&nbsp;&nbsp;&nbsp;&nbsp;The configuration of the post 1.0 admin is managed according to the engine label. If the new engine has configuration parameters to insert the corresponding configuration parameter in Configuration, the parameter needs to be inserted in the three tables：
```
linkis_configuration_configuration_config_key: key/default values for configuration parameters for inserting engines
linkis_manager_label：insert engine label like：hive-1.2.1
linkis_configuration_category： insert directory association for engine
linkis_configuration_configuration_value：
```
If an already existing engine is added a new version, you can modify the version of the corresponding engine under the linkis_configuration_dml.sql file

### 2.3 Engine Refresh
1. Engine is a method to support real-time refreshing. Once the engine is placed into the corresponding directory, Linkis1.0 provides a non-heated heating engine. This is done by restful interface requests:[http://ip:port/api/res_j/v1/rpc/receiveReply](http://ip:port/api/rest_j/v1/rpc/receiveAndReply)by POST, and body's request is {"method:"/enginePlugin/EngineConnec/refreshAll"}.
2. Restart refresh：can also force refresh engine directory by restarting
```
### To sbin directory, restart linkis-enginn-plugin-server

cd /Linkis1.0.0/sbin

## Execute linkis-daemon

sh linkis-daemon.sh restart linkis-enginee-plugin-server
```

