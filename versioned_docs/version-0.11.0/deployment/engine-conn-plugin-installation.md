---
title: Install EngineConnPlugin Engine
sidebar_position: 5
---

> This article mainly introduces the standalone Linkis engine plug-in, mainly from the aspects of compilation, installation, etc.

## 1 Compilation and packaging of engine plug-ins
&nbsp;&nbsp;&nbsp;&nbsp;After linkis1.0, the engine is managed by the engine management service, and the engine plug-in supports real-time effect. In order to facilitate the engine management service to be loaded into the corresponding engine plug-in through tags, it needs to be packaged according to the following directory structure (hive is used as an example):
```
hive: engine home directory, must be the name of the engine
    └── dist # Dependency and configuration required for engine startup, different versions of the engine need to be in this directory to prevent the corresponding version directory
      └── v1.2.1 #Must start with v and add engine version number 1.2.1
           └── conf # Configuration file directory required by the engine
           └── lib # Dependency package required by engine plug-in
    └── plugin #Engine plug-in directory, this directory is used for the startup command and resource application of the engine management service package engine
      └── 1.2.1 # Engine version
        └── linkis-engineplugin-hive-1.0.0-RC1.jar #Engine module package (only need to place a separate engine package)
```
If you are a new engine, you can refer to hive's assembly configuration method, source code directory: `linkis-engineconn-plugins/engineconn-plugins/hive/src/main/assembly/distribution.xml`

## 2 Engine installation
### 2.1 Plug-in package installation
1. First, you need to confirm the home directory of the engine dist directory configuration: wds.linkis.engineconn.home (LinkisInstall/conf/linkis.properties), this parameter is used by the engine manager service to read the configuration and dependent directories required for engine startup , If the parameter (wds.linkis.engineconn.dist.load.enable=true) is set for the engine manager service, it will read the engine in this directory and store it in the material library.
2. In addition, you need to confirm the engine plug-in loading parameter: wds.linkis.engineconn.plugin.loader.store.path, this directory is the engine manager service for reflective reading of the engine module package.
3. If the two parameters wds.linkis.engineconn.home and wds.linkis.engineconn.plugin.loader.store.path are specified as the same directory, you can directly unzip the directory output by the engine to this directory, such as placing Go to the /appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins directory:
```
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins:
hive
 dist
 plugin
spark
 dist
 plugin
```
4. If the directory is not the same directory, you need to place the dist and plugin directories separately, as shown in the following example:
```
##dist Directory
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins/dist:
hive
 dist
 
spark
 dist
 
##plugin directory
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins/dist:
hive
 plugin
spark
 plugin
```
### 2.2 Management console configuration modification

>Management console Configuration configuration modification (optional)

&nbsp;&nbsp;&nbsp;&nbsp;After 1.0, the configuration of the management console is managed according to the engine label. If the new engine has configuration parameters, you need to insert the corresponding configuration parameters in the Configuration, and you need to insert the parameters in the three tables:
```
linkis_configuration_config_key: insert the key and default values ​​of the configuration parameters of the engine
linkis-manager_label: Insert engine label such as hive-1.2.1
linkis_configuration_category: Insert the catalog relationship of the engine
linkis_configuration_config_value: Insert the configuration that the engine needs to display
```
If it is an existing engine and a new version is added, you can modify the version of the corresponding engine in the linkis_configuration_dml.sql file for execution

### 2.3 Engine refresh
1. The engine supports real-time refresh. After the engine is placed in the corresponding directory, Linkis1.0 provides a method to load the engine without shutting down the server. You can request it through the restful interface. The request interface is [http://ip:port/api/rest_j /v1/rpc/receiveAndReply](http://ip:port/api/rest_j/v1/rpc/receiveAndReply), the request method is POST, and the request body is {"method":"/enginePlugin/engineConn/refreshAll"}.
2. Restart to refresh: The engine catalog can be forced to refresh by restarting
```
### cd to the sbin directory, restart linkis-engineconn-plugin-server

cd /Linkis1.0.0/sbin

## Execute linkis-daemon script

sh linkis-daemon.sh restart linkis-engine-plugin-server
```