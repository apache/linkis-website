---
title: BML 引擎物料管理功能剖析
sidebar_position: 1
---

> 导语：本文以引擎相关的物料管理流程为切入点，同时结合底层数据模型和源码，为大家详细剖析引擎物料管理功能的实现细节，期望能够帮助大家更好地理解BML（物料库）服务的架构。

## 1. BML物料库服务

BML物料库是Linkis中PublicEnhancementService（PS）——公共增强服务架构下的功能模块。

![PS-BML](/Images/Architecture/Public_Enhancement_Service/engine_bml/PS-BML.png)

在Linkis的架构体系里，`物料`的概念是指被统一存储托管起来的各种文件数据，包括脚本代码、资源文件、第三方jar、引擎启动时所需的相关类库和配置文件以及用于安全认证的keytab文件等。

总之，任何以文件态存在的数据，都可以被集中托管在物料库之中，然后在各自所需的场景中被下载使用。

物料服务是无状态的，可进行多实例部署，做到服务高可用，每个实例对外提供独立的服务，互不干扰，所有物料元数据及版本信息等在数据库中共享，底层物料数据可被存储到HDFS或本地（共享）文件系统之中，以及支持实现文件存储相关的接口，扩展其他文件存储系统等。

物料服务提供精确的权限控制，对于引擎资源类型的物料，可被所有用户共享访问；对于一些含有敏感信息的物料数据，也可做到仅有限用户可读。

物料文件采用追加的方式，可将多个版本的资源文件合并成一个大文件，避免产生过多的HDFS小文件，HDFS小文件过多会导致HDFS整体性能的下降。

物料服务提供了文件上传、更新、下载等操作任务的生命周期管理。同时，使用物料服务的方式有rest接口和SDK两种形式，用户可以根据自己的需要进行选择。

BML架构图如下：

![BML架构](/Images/Architecture/Public_Enhancement_Service/engine_bml/bml-jiagou.png)

上述关于BML架构的概述，有参考官网文档：https://linkis.apache.org/zh-CN/docs/latest/architecture/public-enhancement-services/bml

## 2. BML物料库服务底层表模型

在深入理解BML物料管理的流程细节之前，有必要先梳理下BML物料管理服务底层依赖的数据库表模型。

![BML-Model](/Images/Architecture/Public_Enhancement_Service/engine_bml/BML-Model.png)

可结合Linkis的`linkis_ddl.sql`文件以及下文内容阐述的引擎物料上传和更新流程来理解bml resources相关表的字段含义以及表与表之间的字段关系。

## 3. BML物料库服务的使用场景

目前在Linkis中，BML物料库服务的使用场景包括：

- 引擎物料文件，包括引擎启动时所需的conf和lib中的文件
- 存储脚本，比如工作流任务节点链接的Scripts中的脚本是存储在BML物料库中的
- DSS中工作流内容版本管理
- 任务运行时所需资源文件管理

## 4. 引擎物料管理流程剖析

`引擎物料`是Linkis物料概念中的一个子集，其作用是为引擎启动时提供最新版本的jar包资源和配置文件等。本小节主要从引擎物料管理功能为切入点，剖析引擎物料数据在BML中的流转细节。

### 4.1 引擎物料说明

对Linkis的安装包正常部署之后，在`LINKIS_INSTALL_HOME/lib/linkis-engineconn-plugins`目录之下可以看到所有的引擎物料目录，以jdbc引擎为例，引擎物料目录的结构如下：

```shell
jdbc
├── dist
│   └── v4
│       ├── conf
│       ├── conf.zip
│       ├── lib
│       └── lib.zip
└── plugin
    └── 4
        └── linkis-engineplugin-jdbc-1.1.2.jar
```

物料目录构成：

```shell
jdbc/dist/版本号/conf.zip
jdbc/dist/版本号/lib.zip

jdbc/plugin/版本号(去v留数字)/linkis-engineplugin-引擎名称-1.1.x.jar
```

conf.zip和lib.zip会作为引擎物料被托管在物料管理服务中，本地每次对物料conf或lib进行修改之后，对应物料会产生一个新的版本号，物料文件数据会被重新上传。引擎启动时，会获取最新版本号的物料数据，加载lib和conf并启动引擎的java进程。

### 4.2 引擎物料上传和更新流程

在Linkis完成部署并首次启动时，会触发引擎物料（lib.zip和conf.zip）首次上传至物料库；当引擎lib下jar包或conf中引擎配置文件有修改时，则需要触发引擎物料的刷新机制来保证引擎启动时能够加载到最新的物料文件。

以现在Linkis1.1.x版本为例，触发引擎物料刷新的两种方式有两种：

通过命令`sh sbin/linkis-daemon.sh restart cg-engineplugin`重启engineplugin服务

通过请求引擎物料刷新的接口

```shell
# 刷新所有引擎物料
curl --cookie "linkis_user_session_ticket_id_v1=kN4HCk555Aw04udC1Npi4ttKa3duaCOv2HLiVea4FcQ=" http://127.0.0.1:9001/api/rest_j/v1/engineplugin/refreshAll
# 指定引擎类型和版本刷新物料
curl --cookie "linkis_user_session_ticket_id_v1=kN4HCk555Aw04udC1Npi4ttKa3duaCOv2HLiVea4FcQ=" http://127.0.0.1:9001/api/rest_j/v1/engineplugin/refresh?ecType=jdbc&version=4
```

这两种引擎物料的刷新方式，其底层的实现机制是一样的，都是调用了`EngineConnResourceService`类中的refreshAll()或refresh()方法。

在抽象类`EngineConnResourceService`的默认实现类`DefaultEngineConnResourceService`中的init()方法内部，通过参数wds.linkis.engineconn.dist.load.enable（默认为true）来控制是否在每次启动engineplugin服务时都执行refreshAll(false)来检查所有引擎物料是否有更新（其中faslse代表异步获取执行结果）。

> init()方法被注解@PostConstruct修饰，在DefaultEngineConnResourceService加载后，对象使用前执行，且只执行一次。

手动调用engineplugin/refresh的接口，即手动执行了`EngineConnResourceService`类中的refreshAll或refresh方法。

所以引擎物料检测更新的逻辑在`DefaultEngineConnResourceService`中的refreshAll和refresh方法内。

其中refreshAll()的核心逻辑是:

1）通过参数wds.linkis.engineconn.home获取引擎的安装目录，默认是：

```scala
getEngineConnsHome = Configuration.getLinkisHome() + "/lib/linkis-engineconn-plugins";
```

2）遍历引擎目录

```scala
getEngineConnTypeListFromDisk: Array[String] = new File(getEngineConnsHome).listFiles().map(_.getName)
```

3）`EngineConnBmlResourceGenerator`接口提供对各个引擎（版本）底层文件或目录的合法性检测。对应实现存在于抽象类`AbstractEngineConnBmlResourceGenerator`中。

4）`DefaultEngineConnBmlResourceGenerator`类主要是为了生成`EngineConnLocalizeResource`。EngineConnLocalizeResource是对物料资源文件元数据和InputStream的封装，在后续的逻辑中EngineConnLocalizeResource会被作为物料参数来参与物料的上传过程。

EngineConnBmlResourceGenerator、AbstractEngineConnBmlResourceGenerator、DefaultEngineConnBmlResourceGenerator这三个文件的代码细节暂不细说，可通过以下UML类图，大致了解其继承机制，并结合方法内的具体实现来理解这一部分的功能。

![BML](/Images/Architecture/Public_Enhancement_Service/engine_bml/bml_uml.png)

再重新回到`DefaultEngineConnResourceService`类中的refreshAll方法内，继续看refreshTask线程的核心流程：

```scala
engineConnBmlResourceGenerator.getEngineConnTypeListFromDisk foreach { engineConnType => 
    Utils.tryCatch {
           	engineConnBmlResourceGenerator.generate(engineConnType).foreach { 
              case (version, localize) =>
             		logger.info(s" Try to initialize ${engineConnType}EngineConn-$version.")
             		refresh(localize, engineConnType, version)
      }
    } 
    					......
}
```

扫描引擎的安装目录，可获得每个引擎物料目录的列表，对于每个引擎物料目录结构的合法性校验通过之后，可得到对应的`EngineConnLocalizeResource`，然后通过调用refresh(localize: Array[EngineConnLocalizeResource], engineConnType: String, version: String)来完成后续物料的上传工作。

而在refresh()方法的内部，主要经过的流程有：

从表`linkis_cg_engine_conn_plugin_bml_resources`中获取对应engineConnType和version的物料列表数据，赋值给变量engineConnBmlResources。

```scala
val engineConnBmlResources = asScalaBuffer(engineConnBmlResourceDao.getAllEngineConnBmlResource(engineConnType, version))
```

![ec数据](/Images/Architecture/Public_Enhancement_Service/engine_bml/ec-data.png)



#### 4.2.1 引擎物料上传流程

**引擎物料上传流程时序图**

![引擎物料上传流程时序图](/Images/Architecture/Public_Enhancement_Service/engine_bml/bml-shixu.png)

如果表`linkis_cg_engine_conn_plugin_bml_resources`中没有匹配到数据，则需要拿EngineConnLocalizeResource中的数据来构造EngineConnBmlResource对象，并保存至`linkis_cg_engine_conn_plugin_bml_resources`表中，此数据保存之前，需要先完成物料文件的上传操作，即执行`uploadToBml(localizeResource)`方法。

在uploadToBml(localizeResource)方法内部，通过构造bmlClient来请求物料上传的接口。即：

```scala
private val bmlClient = BmlClientFactory.createBmlClient()
bmlClient.uploadResource(Utils.getJvmUser, localizeResource.fileName, localizeResource.getFileInputStream)
```

在BML Server中，物料上传的接口位置在BmlRestfulApi类中的uploadResource接口方法内。主要经历的过程是：

```scala
ResourceTask resourceTask = taskService.createUploadTask(files, user, properties);
```

每一次物料上传，都会构造一个ResourceTask来完成文件上传的流程，并记录此次文件上传Task的执行记录。在createUploadTask方法内部，主要完成的操作如下：

1）为此次上传的资源文件产生`一个全局唯一标识的resource_id`，String resourceId = UUID.randomUUID().toString();

2）构建ResourceTask记录，并存储在表`linkis_ps_bml_resources_task`中，以及后续一系列的Task状态修改。

```scala
ResourceTask resourceTask = ResourceTask.createUploadTask(resourceId, user, properties);
taskDao.insert(resourceTask);

taskDao.updateState(resourceTask.getId(), TaskState.RUNNING.getValue(), new Date());
```

3）物料文件真正写入物料库的操作是由ResourceServiceImpl类中的upload方法完成的，在upload方法内部，会把一组`List<MultipartFile> files`对应的字节流持久化至物料库文件存储系统中；把物料文件的properties数据，存储到资源记录表（linkis_ps_bml_resources）和资源版本记录表（linkis_ps_bml_resources_version）中。

```scala
MultipartFile p = files[0]
String resourceId = (String) properties.get("resourceId");
String fileName =new String(p.getOriginalFilename().getBytes(Constant.ISO_ENCODE),
                            Constant.UTF8_ENCODE);
fileName = resourceId;
String path = resourceHelper.generatePath(user, fileName, properties);
// generatePath目前支持Local和HDFS路径，路径的构成规则由LocalResourceHelper或HdfsResourceHelper
// 中的generatePath方法实现
StringBuilder sb = new StringBuilder();
long size = resourceHelper.upload(path, user, inputStream, sb, true);
// 文件size计算以及文件字节流写入文件由LocalResourceHelper或HdfsResourceHelper中的upload方法实现
Resource resource = Resource.createNewResource(resourceId, user, fileName, properties);
// 插入一条记录到resource表linkis_ps_bml_resources中
long id = resourceDao.uploadResource(resource);
// 新增一条记录到resource version表linkis_ps_bml_resources_version中，此时的版本号是onstant.FIRST_VERSION
// 除了记录这个版本的元数据信息外，最重要的是记录了该版本的文件的存储位置，包括文件路径，起始位置，结束位置。
String clientIp = (String) properties.get("clientIp");
ResourceVersion resourceVersion = ResourceVersion.createNewResourceVersion(
                            resourceId, path, md5String, clientIp, size, Constant.FIRST_VERSION, 1);
versionDao.insertNewVersion(resourceVersion);
```

上述流程执行成功之后，物料数据才算是真正完成，然后把UploadResult返回给客户端，并标记此次ResourceTask的状态为完成，如果有遇到上传文件报错，则标记此次ResourceTask的状态为失败，记录异常信息。

![resource-task](/Images/Architecture/Public_Enhancement_Service/engine_bml/resource-task.png)



#### 4.2.2 引擎物料更新流程

**引擎物料更新流程时序图**

![引擎物料更新流程时序图](/Images/Architecture/Public_Enhancement_Service/engine_bml/engine-bml-update-shixu.png)

如果表`linkis_cg_engine_conn_plugin_bml_resources`中匹配到本地物料数据，则需要拿EngineConnLocalizeResource中的数据来构造EngineConnBmlResource对象，并更新`linkis_cg_engine_conn_plugin_bml_resources`表中原有物料文件的版本号、文件大小、修改时间等元数据信息，此数据更新前，需要先完成物料文件的更新上传操作，即执行`uploadToBml(localizeResource, engineConnBmlResource.getBmlResourceId)`方法。

在uploadToBml(localizeResource, resourceId)方法内部，通过构造bmlClient来请求物料资源更新的接口。即：

```scala
private val bmlClient = BmlClientFactory.createBmlClient()
bmlClient.updateResource(Utils.getJvmUser, resourceId, localizeResource.fileName, localizeResource.getFileInputStream)
```

在BML Server中，实现物料更新的接口位置在BmlRestfulApi类中的updateVersion接口方法内，主要经历的过程是：

完成resourceId的有效性检测，即检测传入的resourceId是否在linkis_ps_bml_resources表中存在，如果此resourceId不存在，给客户端抛出异常，在接口层面此次物料更新操作失败。

所以在表`linkis_cg_engine_conn_plugin_bml_resources`和`linkis_ps_bml_resources`中的资源数据的对应关系需要保证完整，否则会出现物料文件无法更新的报错。

```scala
resourceService.checkResourceId(resourceId)
```

resourceId如果存在于linkis_ps_bml_resources表中，会继续执行：

```scala
StringUtils.isEmpty(versionService.getNewestVersion(resourceId))
```

getNewestVersion方法是为了在表`linkis_ps_bml_resources_version`中获取该resourceId的最大版本号，如果resourceId对应的最大version为空，那么物料同样会更新失败，所以此处数据的对应关系完整性也需要严格保证。

上述两处检查都通过之后，会创建ResourceUpdateTask来完成最终的文件写入和记录更新保存等工作。

```scala
ResourceTask resourceTask = null;
synchronized (resourceId.intern()) {
	resourceTask = taskService.createUpdateTask(resourceId, user, file, properties);
}
```

而在createUpdateTask方法内部，主要实现的功能是：

```scala
// 为物料Resource生成新的version
String lastVersion = getResourceLastVersion(resourceId);
String newVersion = generateNewVersion(lastVersion);
// 然后是对ResourceTask的构建，和状态维护
ResourceTask resourceTask = ResourceTask.createUpdateTask(resourceId, newVersion, user, system, properties);
// 物料更新上传的逻辑由versionService.updateVersion方法完成
versionService.updateVersion(resourceTask.getResourceId(), user, file, properties);
```

在versionService.updateVersion方法内部，主要实现的功能是：

```scala
ResourceHelper resourceHelper = ResourceHelperFactory.getResourceHelper();
InputStream inputStream = file.getInputStream();
// 获取资源的path
String newVersion = params.get("newVersion").toString();
String path = versionDao.getResourcePath(resourceId) + "_" + newVersion;
// getResourcePath的获取逻辑是从原有路径中limit一条，然后以_拼接newVersion
// select resource from linkis_ps_bml_resources_version WHERE resource_id = #{resourceId} limit 1
// 资源上传到hdfs或local
StringBuilder stringBuilder = new StringBuilder();
long size = resourceHelper.upload(path, user, inputStream, stringBuilder, OVER_WRITE);
// 最后在linkis_ps_bml_resources_version表中插入一条新的资源版本记录
ResourceVersion resourceVersion = ResourceVersion.createNewResourceVersion(resourceId, path, md5String, clientIp, size, newVersion, 1);
versionDao.insertNewVersion(resourceVersion);
```