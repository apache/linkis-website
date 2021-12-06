---
title: EngineConnPlugin installation
sidebar_position: 2
---

EngineConnPlugin installation 
===============================

This article mainly introduces the use of Linkis EngineConnPlugins, mainly from the aspects of compilation and installation.

## 1. Compilation and packaging of EngineConnPlugins

After linkis1.0, the engine is managed by EngineConnManager, and the EngineConnPlugin (ECP) supports real-time effectiveness.
In order to facilitate the EngineConnManager to be loaded into the corresponding EngineConnPlugin by labels, it needs to be packaged according to the following directory structure (take hive as an example):
```
hive: engine home directory, must be the name of the engine
└── dist # Dependency and configuration required for engine startup, different versions of the engine need to be in this directory to prevent the corresponding version directory
    └── v1.2.1 #Must start with ‘v’ and add engine version number ‘1.2.1’
        └── conf # Configuration file directory required by the engine
        └── lib # Dependency package required by EngineConnPlugin
└── plugin #EngineConnPlugin directory, this directory is used for engine management service package engine startup command and resource application
    └── 1.2.1 # Engine version
        └── linkis-engineplugin-hive-1.0.0-RC1.jar #Engine module package (only need to place a separate engine package)
```
If you are adding a new engine, you can refer to hive's assembly configuration method, source code directory: linkis-engineconn-plugins/engineconn-plugins/hive/src/main/assembly/distribution.xml
## 2. Engine Installation
### 2.1 Plugin package installation
1.First, confirm the dist directory of the engine: wds.linkis.engineconn.home (get the value of this parameter from ${LINKIS_HOME}/conf/linkis.properties), this parameter is used by EngineConnPluginServer to read the configuration file that the engine depends on And third-party Jar packages. If the parameter (wds.linkis.engineconn.dist.load.enable=true) is set, the engine in this directory will be automatically read and loaded into the Linkis BML (material library).

2.Second, confirm the engine Jar package directory:
wds.linkis.engineconn.plugin.loader.store.path, which is used by EngineConnPluginServer to read the actual implementation Jar of the engine.

It is highly recommended to specify **wds.linkis.engineconn.home and wds.linkis.engineconn.plugin.loader.store.path as** the same directory, so that you can directly unzip the engine ZIP package exported by maven into this directory, such as: Place it in the ${LINKIS_HOME}/lib/linkis-engineconn-plugins directory.

```
${LINKIS_HOME}/lib/linkis-engineconn-plugins:
└── hive
    └── dist
    └── plugin
└── spark
    └── dist
    └── plugin
```

If the two parameters do not point to the same directory, you need to place the dist and plugin directories separately, as shown in the following example:

```
## dist directory
${LINKIS_HOME}/lib/linkis-engineconn-plugins/dist:
└── hive
    └── dist
└── spark
    └── dist
## plugin directory
${LINKIS_HOME}/lib/linkis-engineconn-plugins/plugin:
└── hive
    └── plugin
└── spark
    └── plugin
```
### 2.2 Configuration modification of management console (optional)

The configuration of the Linkis1.0 management console is managed according to the engine label. If the new engine has configuration parameters, you need to insert the corresponding configuration parameters in the Configuration, and you need to insert the parameters in three tables:

```
linkis_configuration_config_key: Insert the key and default values of the configuration parameters of the engin
linkis_manager_label: Insert engine label such as hive-1.2.1
linkis_configuration_category: Insert the catalog relationship of the engine
linkis_configuration_config_value: Insert the configuration that the engine needs to display
```

If it is an existing engine and a new version is added, you can modify the version of the corresponding engine in the linkis_configuration_dml.sql file for execution

### 2.3 Engine refresh

1.	The engine supports real-time refresh. After the engine is placed in the corresponding directory, Linkis1.0 provides a method to load the engine without shutting down the server, and just send a request to the linkis-engineconn-plugin-server service through the restful interface, that is, the actual deployment of the service Ip+port, the request interface is http://ip:port/api/rest_j/v1/rpc/receiveAndReply, the request method is POST, the request body is {"method":"/enginePlugin/engineConn/refreshAll"}.

2.	Restart refresh: the engine catalog can be forced to refresh by restarting

```
### cd to the sbin directory, restart linkis-engineconn-plugin-server
cd /Linkis1.0.0/sbin
## Execute linkis-daemon script
sh linkis-daemon.sh restart linkis-engine-plugin-server
```

3.Check whether the engine refresh is successful: If you encounter problems during the refresh process and need to confirm whether the refresh is successful, you can check whether the last_update_time of the linkis_engine_conn_plugin_bml_resources table in the database is the time when the refresh is triggered.
