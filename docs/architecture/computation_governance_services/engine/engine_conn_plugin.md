---
title: EngineConnPlugin (ECP) Design
sidebar_position: 3
---


EngineConnPlugin (ECP) architecture design
===============================

The engine connector plug-in is an implementation that can dynamically load the engine connector and reduce the occurrence of version conflicts. It has the characteristics of convenient expansion, fast refresh, and selective loading. In order to allow developers to freely extend Linkis's Engine engine, and dynamically load engine dependencies to avoid version conflicts, the EngineConnPlugin was designed and developed, allowing new engines to be introduced into the execution life cycle of computing middleware by implementing established plug-in interfaces.
The plug-in interface disassembles the definition of the engine, including parameter initialization, allocation of engine resources, construction of engine connections, and setting of engine default tags.

一、ECP architecture diagram

![](/Images/Architecture/linkis-engineConnPlugin-01.png)

Introduction to the second-level module:
==============

EngineConn-Plugin-Server
------------------------

The engine connector plug-in service is an entrance service that provides external registration plug-ins, management plug-ins, and plug-in resource construction. The engine plug-in that is successfully registered and loaded will contain the logic of resource allocation and startup parameter configuration. During the engine initialization process, EngineConn
Other services such as Manager call the logic of the corresponding plug-in in Plugin Server through RPC requests.

| Core Class                           | Core Function                              |
|----------------------------------|---------------------------------------|
| EngineConnLaunchService          | Responsible for building the engine connector launch request            |
| EngineConnResourceFactoryService | Responsible for generating engine resources                      |
| EngineConnResourceService        | Responsible for downloading the resource files used by the engine connector from BML |


EngineConn-Plugin-Loader Engine Connector Plugin Loader
---------------------------------------

The engine connector plug-in loader is a loader used to dynamically load the engine connector plug-ins according to request parameters, and has the characteristics of caching. The specific loading process is mainly composed of two parts: 1) Plug-in resources such as the main program package and program dependency packages are loaded locally (not open). 2) Plug-in resources are dynamically loaded from the local into the service process environment, for example, loaded into the JVM virtual machine through a class loader.
| Core Class                          | Core Function                                     |
|---------------------------------|----------------------------------------------|
| EngineConnPluginsResourceLoader | Load engine connector plug-in resources                       |
| EngineConnPluginsLoader         | Load the engine connector plug-in instance, or load an existing one from the cache |
| EngineConnPluginClassLoader     | Dynamically instantiate engine connector instance from jar              |

EngineConn-Plugin-Cache engine plug-in cache module
----------------------------------------

Engine connector plug-in cache is a cache service specially used to cache loaded engine connectors, and supports the ability to read, update, and remove. The plug-in that has been loaded into the service process will be cached together with its class loader to prevent multiple loading from affecting efficiency; at the same time, the cache module will periodically notify the loader to update the plug-in resources. If changes are found, it will be reloaded and refreshed automatically Cache.

| Core Class                      | Core Function                     |
|-----------------------------|------------------------------|
| EngineConnPluginCache       | Cache loaded engine connector instance |
| RefreshPluginCacheContainer | Engine connector that refreshes the cache regularly     |

EngineConn-Plugin-Core: Engine connector plug-in core module
---------------------------------------------

The engine connector plug-in core module is the core module of the engine connector plug-in. Contains the implementation of the basic functions of the engine plug-in, such as the construction of the engine connector start command, the construction of the engine resource factory and the implementation of the core interface of the engine connector plug-in.
| Core Class                  | Core Function                                                 |
|-------------------------|----------------------------------------------------------|
| EngineConnLaunchBuilder | Build Engine Connector Launch Request                                   |
| EngineConnFactory       | Create Engine Connector                                           |
| EngineConnPlugin        | The engine connector plug-in implements the interface, including resources, commands, and instance construction methods. |
| EngineResourceFactory   | Engine Resource Creation Factory                                       |

EngineConn-Plugins: Engine connection plugin collection
-----------------------------------

The engine connection plug-in collection is used to place the default engine connector plug-in library that has been implemented based on the plug-in interface defined by us. Provides the default engine connector implementation, such as jdbc, spark, python, shell, etc. Users can refer to the implemented cases based on their own needs to implement more engine connectors.
| Core Class              | Core Function         |
|---------------------|------------------|
| engineplugin-jdbc   | jdbc engine connector   |
| engineplugin-shell  | Shell engine connector  |
| engineplugin-spark  | spark engine connector  |
| engineplugin-python | python engine connector |

