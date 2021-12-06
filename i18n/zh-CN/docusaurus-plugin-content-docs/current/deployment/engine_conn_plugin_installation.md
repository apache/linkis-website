# 引擎插件安装文档

> 本文主要介绍Linkis引擎插件的使用，主要从编译、安装等方面进行介绍

## 1. 引擎插件的编译打包

&nbsp;&nbsp;&nbsp;&nbsp;在linkis1.0以后，引擎是由EngineConnManager进行管理的，引擎插件（EngineConnPlugin）支持实时生效。

为了方便 EngineConnManager 能够通过标签加载到对应的引擎插件，需要按照如下目录结构进行打包(以hive为例)：

**请注意： 因为现在标签是通过-来进行拆分值的所以版本里面不能出现-如果出现可以通过用其他符号代替，比如engineType：hvie-cdh-2.3.3，会拆分错，您可以直接使用这个：hive-2.3.3，**
```
hive:引擎主目录，必须为引擎的名字
    └── dist  # 引擎启动需要的依赖和配置，引擎不同的版本需要在该目录防止对应的版本目录
      └── v2.3.3 #必须以v开头加上引擎版本号2.3.3
           └── conf # 引擎需要的配置文件目录
           └── lib  # 引擎插件需要的依赖包
    └── plugin #引擎插件目录，该目录用于引擎管理服务封装引擎的启动命令和资源申请
      └── 2.3.3 # 引擎版本,没有V开头
        └── linkis-engineplugin-hive-1.0.0.jar  #引擎模块包（只需要放置单独的引擎包）
```

如果您是新增引擎，你可以参考hive的assembly配置方式，源码目录：`linkis-engineconn-plugins/engineconn-plugins/hive/src/main/assembly/distribution.xml`

## 2. 引擎安装

### 2.1 插件包安装

1. 首先，确认引擎的dist目录：wds.linkis.engineconn.home（从${LINKIS_HOME}/conf/linkis.properties中获取该参数的值），该参数为 EngineConnPluginServer 用于读取引擎启动所依赖的配置文件和第三方Jar包。如果设置了参数（wds.linkis.engineconn.dist.load.enable=true），会自动读取并加载该目录下的引擎到Linkis BML（物料库）中。

2. 其次，确认引擎Jar包目录：wds.linkis.engineconn.plugin.loader.store.path，该目录用于 EngineConnPluginServer 读取该引擎的实际实现Jar。

3. **强烈推荐 wds.linkis.engineconn.home 和 wds.linkis.engineconn.plugin.loader.store.path 指定为同一个目录**，这样就可以直接将maven打出来的引擎ZIP包，解压到该目录下，如：放置到${LINKIS_HOME}/lib/linkis-engineconn-plugins目录下。

```
${LINKIS_HOME}/lib/linkis-engineconn-plugins:
└── hive
   └── dist
   └── plugin
└── spark
   └── dist
   └── plugin
```

4. 如果两个参数不是指向同一个目录，则需要分开放置dist和plugin目录，如下示例：

```
## dist 目录
${LINKIS_HOME}/lib/linkis-engineconn-plugins/dist:
└── hive
   └── dist
└── spark
   └── dist
 
## plugin 目录
${LINKIS_HOME}/lib/linkis-engineconn-plugins/plugin:
└── hive
   └── plugin
└── spark
   └── plugin
```

5. 并配置默认的引擎版本，方便没有带版本的任务进行提交
`wds.linkis.hive.engine.version=2.3.3`

### 2.2 管理台Configuration配置修改（可选）

&nbsp;&nbsp;&nbsp;&nbsp;Linkis1.0 管理台的配置是按照引擎标签来进行管理的，如果新增的引擎有配置参数需要在Configuration插入相应的配置参数，需要在三个表中插入参数：

```
linkis_configuration_config_key:  插入引擎的配置参数的key和默认values
linkis_manager_label：插入引擎label如：hive-2.3.3
linkis_configuration_category： 插入引擎的目录关联关系
linkis_configuration_config_value： 插入引擎需要展示的配置
```

如果是已经存在的引擎，新增版本，则可以修改linkis_configuration_dml.sql文件下的对应引擎的版本进行执行

### 2.3 引擎刷新

1. 引擎支持实时刷新，引擎放置到对应目录后，Linkis1.0提供了不关服热加载引擎的方法，通过restful接口向linkis-engineconn-plugin-server服务发送请求即可。

- 接口 `http://${engineconn-plugin-server-IP}:${port}/api/rest_j/v1/rpc/receiveAndReply`

- 请求方式 `POST`

```json
{
  "method": "/enginePlugin/engineConn/refreshAll"
}
```

2. 重启刷新：通过重启也可以强制刷新引擎目录

```bash
### cd到sbin目录下，重启linkis-engineconn-plugin-server

cd ${LINKIS_HOME}/sbin

## 执行linkis-daemon脚本

sh linkis-daemon.sh restart cg-engineplugin

```

3. 检查引擎是否刷新成功：如果在刷新过程中遇到问题，需要确认是否刷新成功，则可以查看数据库中的linkis_engine_conn_plugin_bml_resources这张表的last_update_time是否为触发刷新的时间。
