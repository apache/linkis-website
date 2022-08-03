---
title: 安装 EngineConnPlugin 引擎
sidebar_position: 5
---

> 本文主要介绍Linkis引擎插件的单独，主要从编译、安装等方面进行介绍

## 1 引擎插件的编译打包
&nbsp;&nbsp;&nbsp;&nbsp;在linkis1.0以后引擎是由引擎管理服务进行管理的，引擎插件支持实时生效。为了方便引擎管理服务能够通过标签加载到对应的引擎插件，需要按照如下目录结构进行打包(已hive为例)：
```
hive:引擎主目录，必须为引擎的名字
    └── dist  # 引擎启动需要的依赖和配置，引擎不同的版本需要在该目录放置对应的版本目录
      └── v1.2.1 #必须以v开头加上引擎版本号1.2.1
           └── conf # 引擎需要的配置文件目录
           └── lib  # 引擎插件需要的依赖包
    └── plugin #引擎插件目录，该目录用于引擎管理服务封装引擎的启动命令和资源申请
      └── 1.2.1 # 引擎版本
        └── linkis-engineplugin-hive-1.0.0-RC1.jar  #引擎模块包（只需要放置单独的引擎包）
```
如果您是新增引擎，你可以参考hive的assembly配置方式，源码目录：`linkis-engineconn-plugins/engineconn-plugins/hive/src/main/assembly/distribution.xml`

## 2 引擎安装
### 2.1 插件包安装
1. 首先需要确认引擎dist目录配置的主目录：wds.linkis.engineconn.home（LinkisInstall/conf/linkis.properties），该参数为引擎管理器服务用于读取引擎启动所需要配置和依赖的目录，引擎管理器服务如果设置了参数（wds.linkis.engineconn.dist.load.enable=true）会读取该目录下的引擎存放到物料库中。
2. 另外需要确认引擎插件加载参数：wds.linkis.engineconn.plugin.loader.store.path,该目录为引擎管理器服务用于反射读取引擎模块包。
3. 如果wds.linkis.engineconn.home和wds.linkis.engineconn.plugin.loader.store.path两个参数指定为同一个目录，则可以直接将引擎打出来的目录解压到该目录下，如放置到/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins目录下：
```
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins:
hive
 dist
 plugin
spark
 dist
 plugin
```
4. 如果目录不是同一个目录则需要分开放置dist和plugin目录，如下示例：
```
##dist 目录
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins/dist:
hive
 dist
 
spark
 dist
 
##plugin 目录
/appcom/Install/LinkisInstall/lib/linkis-engineconn-plugins/dist:
hive
 plugin
spark
 plugin
```
### 2.2 管理台配置修改

>管理台Configuration配置修改（可选）

&nbsp;&nbsp;&nbsp;&nbsp;1.0后管理台的配置是按照引擎标签来进行管理的，如果新增引擎有配置参数需要在Configuration插入相应的配置参数，需要在三个表中插入参数：
```
linkis_configuration_config_key:  插入引擎的配置参数的key和默认values
linkis-manager_label：插入引擎label如：hive-1.2.1
linkis_configuration_category： 插入引擎的目录关联关系
linkis_configuration_config_value： 插入引擎需要展示的配置
```
如果是已经存在的引擎，新增版本，则可以修改linkis_configuration_dml.sql文件下的对应引擎的版本进行执行

### 2.3 引擎刷新
1. 引擎是支持实时刷新，引擎放置到对应目录后，Linkis1.0提供不关服热加载引擎的方法，通过restful接口请求即可，请求接口为[http://ip:port/api/rest_j/v1/rpc/receiveAndReply](http://ip:port/api/rest_j/v1/rpc/receiveAndReply)，请求方式为POST，请求Body为{“method”:”/enginePlugin/engineConn/refreshAll”}。
2. 重启刷新：通过重启也可以强制刷新引擎目录
```
### cd到sbin目录下，重启linkis-engineconn-plugin-server

cd /Linkis1.0.0/sbin

## 执行linkis-daemon脚本

sh linkis-daemon.sh restart linkis-engine-plugin-server
```

