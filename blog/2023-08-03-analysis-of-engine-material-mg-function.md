---
title: [Source Code Interpretation] Analysis of the Material Management Function of the Linkis Engine
authors: [Casion]
tags: [blog,linkis]
---
### Catalog Guide

```
Introduction: This article takes the engine related material management process as the starting point, combined with the underlying data model and source code, to provide a detailed analysis of the implementation details of the engine's material management function, hoping to help everyone better understand the architecture of BML (Material Warehouse) services.
```

#### 1. BML Material Warehouse Service

The BML material library is a functional module under the Public Enhancement Service (PS) - public enhanced service architecture in Linkis.
![](/static/Images/blog/public-enhancement-service.png)

In the architecture system of Linkis, the concept of materials refers to various file data that is uniformly stored and managed, including script code, resource files, third-party jars, relevant class libraries and configuration files required for engine startup, and keytab files used for security authentication.

In short, any data that exists as a file can be centrally hosted in the material library and then downloaded and used in their respective scenarios.

Material services are stateless and can be deployed with multiple instances to achieve high service availability. Each instance provides independent services to the outside world without interference. All material metadata and version information are shared in the database, and the underlying material data can be stored in HDFS or local (shared) file systems. It also supports the implementation of file storage related interfaces and the expansion of other file storage systems.

The material service provides precise permission control, and materials of engine resource type can be shared and accessed by all users; For some material data containing sensitive information, it is also possible to achieve limited user readability.

The material file adopts an appending method, which can merge multiple versions of resource files into one large file to avoid generating too many HDFS small files. Excessive HDFS small files can lead to a decrease in the overall performance of HDFS.

Material service provides lifecycle management for operational tasks such as file upload, update, and download. At the same time, there are two forms of using material services: rest interface and SDK, and users can choose according to their own needs.

The BML architecture diagram is as follows:
![](/static/Images/blog/bml-service.png)

The above overview of BML architecture can be found in the official website documentation：https://linkis.apache.org/zh-CN/docs/latest/architecture/public_enhancement_services/bml

#### 2. BML Material Warehouse Service Bottom Table Model
Before delving into the process details of BML material management, it is necessary to first sort out the database table models that BML material management services rely on at the bottom.
![](/static/Images/blog/linkis-ps-bml.png)

Linkis that can be combined with Linkis_ The ddl. SQL file and the engine material upload and update process described in the following content are used to understand the field meanings of bml resources related tables and the field relationships between tables.

#### 3. Usage scenarios for BML material warehouse services
Currently, the usage scenarios of BML material warehouse services in Linkis include:
- Engine material files, including files in conf and lib required for engine startup
- Storing scripts, such as those in the scripts linked to workflow task nodes, are stored in the BML material library
- Workflow Content Version Management in DSS
- Resource file management required for task runtime

#### 4. Analysis of Engine Material Management Process
Engine material is a subset of the Linkis material concept, which provides the latest version of jar package resources and configuration files for engine startup. This section mainly analyzes the flow details of engine material data in BML from the perspective of engine material management function.

##### 4.1 Engine Material Description
After the installation package for Linkis is deployed normally, in LINKIS_ INSTALL_ Under the HOME/lib/linkis engine conn plugins directory, you can see all engine material directories. Taking the jdbc engine as an example, the structure of the engine material directory is as follows:
```
jdbc
├── dist
│   └── v4
│       ├── conf
│       ├── conf.zip
│       ├── lib
│       └── lib.zip
└── plugin
    └── 4
        └── linkis-engineplugin-jdbc-1.1.2.jar
```
Material catalog composition:
```
jdbc/dist/版本号/conf.zip
jdbc/dist/版本号/lib.zip

jdbc/plugin/版本号(去v留数字)/linkis-engineplugin-引擎名称-1.1.x.jar
```
conf.zip and lib.zip will be hosted as engine materials in the material management service. After each local modification to the material Conf or lib, a new version number will be generated for the corresponding material, and the material file data will be re uploaded. When the engine starts, it will obtain the latest version of material data, load lib and conf, and start the engine's Java process.

##### 4.2 Engine Material Upload and Update Process
When Linkis completes deployment and starts for the first time, it will trigger the engine materials (lib. zip and conf. zip) to be uploaded to the material library for the first time; When there are modifications to the jar package or engine configuration file in the engine lib or conf, it is necessary to trigger the engine material refresh mechanism to ensure that the latest material file can be loaded when the engine starts.

Taking the current version of Linkis1.1. x as an example, there are two ways to trigger engine material refresh:

Restart the engineplugin service by issuing the command sh sbin/linkis-daemon.sh restart cg-engineplugin

Interface for requesting engine material refresh
```
# Refresh all engine materials
curl --cookie "linkis_user_session_ticket_id_v1=kN4HCk555Aw04udC1Npi4ttKa3duaCOv2HLiVea4FcQ=" http://127.0.0.1:9001/api/rest_j/v1/engineplugin/refreshAll
# Specify engine type and version to refresh materials
curl --cookie "linkis_user_session_ticket_id_v1=kN4HCk555Aw04udC1Npi4ttKa3duaCOv2HLiVea4FcQ=" http://127.0.0.1:9001/api/rest_j/v1/engineplugin/refresh?ecType=jdbc&version=4
```
The underlying implementation mechanism of these two engine material refresh methods is the same, both of which call the refreshAll() or refresh() methods in the EngineConnResourceService class.

Inside the init() method in the default implementation class of the abstract class EngineConnResourceService, defaultEngineConnResourceService, the parameter wds. linkis. engineconn. dist. load. enable (default is true) is used to control whether refreshAll (false) is executed every time the engine plugin service is started to check for updates to all engine materials (where false represents asynchronous acquisition of execution results).
```
The init() method is decorated with the annotation @PostConstruct, which executes only once before the object is used after the defaultEngineConnResourceService is loaded.
```

Manually calling the engine plugin/refresh interface means manually executing the refreshAll or refresh methods in the EngineConnResourceService class.

So the logic for detecting and updating engine materials is within the refreshAll and refresh methods in the Default Engine ConnResourceService.
The core logic of refreshAll() is:

1) Obtain the installation directory of the engine through the parameter wds.linkis. engineconn.home. The default is:
```
getEngineConnsHome = Configuration.getLinkisHome() + "/lib/linkis-engineconn-plugins";
```
2）Traverse engine directory
```
getEngineConnTypeListFromDisk: Array[String] = new File(getEngineConnsHome).listFiles().map(_.getName)
```
3）The EngineConnBmlResourceGenerator interface provides legitimacy detection of underlying files or directories for each engine (version). The corresponding implementation exists in the abstract class AbstractEngineConnBmlResourceGenerator.

4）The defaultEngineConnBmlResourceGenerator class is mainly used to generate EngineConnLocalizeResources. EngineConnLocalizeResource is the encapsulation of material resource file metadata and InputStream. In subsequent logic, EngineConnLocalizeResource will be used as a material parameter to participate in the material upload process.

The code details of the three files, EngineConnBmlResourceGenerator, AbstractEngineConnBmlResourceGenerator, and DefaultEngineConnBmlResourceGenerator, will not be explained in detail. The inheritance mechanism can be roughly understood through the following UML class diagram, and the specific implementation within the method can be combined to understand the functionality of this part.

Return to the refreshAll method in the DefaultEngineConnResourceService class and continue to look at the core process of the refreshTask thread:
```
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
Scan the installation directory of the engine to obtain a list of each engine material directory. After verifying the legality of each engine material directory structure, the corresponding EngineConnLocalizeResource can be obtained. Then, complete the subsequent material upload work by calling refresh (locate: Array [EngineConnLocalizeResource], engineConnType: String, version: String).

Within the refresh() method, the main processes involved are:

From table linkis_ Cg_ Engine_ Conn_ Plugin_ BML_ Obtain the material list data corresponding to engineConnType and version from resources, and assign the value to the variable engineConnBmlResources.
```
val engineConnBmlResources = asScalaBuffer(engineConnBmlResourceDao.getAllEngineConnBmlResource(engineConnType, version))
```

###### 4.2.1 Engine Material Upload Process
Sequence diagram of engine material upload process

If the table linkis_ Cg_ Engine_ Conn_ Plugin_ BML_ If there is no matching data in the resources, you need to use the data from the EngineConnLocalizeResource to construct the EngineConnBmlResource object and save it to linkis_ Cg_ Engine_ Conn_ Plugin_ BML_ In the resources table, before saving this data, it is necessary to complete the upload operation of the material file, that is, execute the uploadToBml (localizeResource) method.

Within the uploadToBml (localizeResource) method, an interface is constructed to request material upload by constructing a bmlClient. Namely:
```
private val bmlClient = BmlClientFactory.createBmlClient()
bmlClient.uploadResource(Utils.getJvmUser, localizeResource.fileName, localizeResource.getFileInputStream)
```
In BML Server, the location of the material upload interface is within the uploadResource interface method in the BmlRestfulApi class. The main process experienced is:
```
ResourceTask resourceTask = taskService.createUploadTask(files, user, properties);
```
Each material upload will construct a ResourceTask to complete the file upload process and record the execution record of the file upload task. The main operations completed within the createUploadTask method are as follows:

1) Generate a globally unique resource for the uploaded resource file_ Id, String resourceId=UUID. randomUUID(). toString();

2) Build ResourceTask records and store them in the table linkis_ Ps_ BML_ Resources_ In the task, as well as a series of subsequent task status modifications.
```
ResourceTask resourceTask = ResourceTask.createUploadTask(resourceId, user, properties);
taskDao.insert(resourceTask);

taskDao.updateState(resourceTask.getId(), TaskState.RUNNING.getValue(), new Date());
```
3) The actual operation of writing material files into the material library is completed by the upload method in the ResourceServiceImpl class. Within the upload method, a set of byte streams corresponding to List<MultipartFile>files will be persisted to the material library file storage system; Store the properties data of the material file in the resource record table (linkis_ps bml resources) and resource version record table (linkis_ps bml resources version).
```
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
After the above process is successfully executed, the material data is truly completed. Then, the UploadResult is returned to the client and the status of the ResourceTask is marked as completed. If an error is encountered when uploading a file, the status of the ResourceTask is marked as failed and abnormal information is recorded.

###### 4.2.2 Engine Material Update Process
Sequence diagram of engine material update process

If the table linkis_ Cg_ Engine_ Conn_ Plugin_ BML_ If local material data is matched in resources, the data from EngineConnLocalizeResource needs to be used to construct the EngineConnBmlResource object and update the linkis_ Cg_ Engine_ Conn_ Plugin_ BML_ The resources table contains metadata information such as the version number, file size, and modification time of the material file. Before updating this data, it is necessary to complete the update and upload operation of the material file, that is, execute the uploadToBml (localizeResource, engineConnBmlResource. getBmlResourceId) method.

Within the uploadToBml (localizeResource, resourceId) method, an interface is constructed to request material resource updates by constructing a bmlClient. Namely:
```
private val bmlClient = BmlClientFactory.createBmlClient()
bmlClient.updateResource(Utils.getJvmUser, resourceId, localizeResource.fileName, localizeResource.getFileInputStream)
```
In BML Server, the interface for implementing material updates is located in the updateVersion interface method of the BmlRestfulApi class, and the main process is:

Complete the validity check of resourceId, that is, check whether the incoming resourceId is in the link_ Ps_ BML_ It exists in the resources table. If this resourceId does not exist, an exception will be thrown to the client, causing the material update operation to fail at the interface level.

So in the table linkis_ Cg_ Engine_ Conn_ Plugin_ BML_ Resources and links_ Ps_ BML_ The corresponding relationship of resource data in resources needs to be ensured to be complete, otherwise an error message may appear that the material file cannot be updated.
```
resourceService.checkResourceId(resourceId)
```
If resourceId exists in linkis_ Ps_ BML_ In the resources table, execution will continue:
```
StringUtils.isEmpty(versionService.getNewestVersion(resourceId))
```
The getNewestVersion method is used to create a link in the table_ Ps_ BML_ Resources_ Obtain the maximum version number of the resourceId from version. If the maximum version corresponding to resourceId is empty, the material will also fail to update. Therefore, the integrity of the corresponding relationship of the data here also needs to be strictly guaranteed.

After passing both of the above checks, a ResourceUpdateTask will be created to complete the final file writing and record updating and saving tasks.
```
ResourceTask resourceTask = null;
synchronized (resourceId.intern()) {
resourceTask = taskService.createUpdateTask(resourceId, user, file, properties);
}
```
Within the createUpdateTask method, the main functions implemented are:
```
// 为物料Resource生成新的version
String lastVersion = getResourceLastVersion(resourceId);
String newVersion = generateNewVersion(lastVersion);
// 然后是对ResourceTask的构建，和状态维护
ResourceTask resourceTask = ResourceTask.createUpdateTask(resourceId, newVersion, user, system, properties);
// 物料更新上传的逻辑由versionService.updateVersion方法完成
versionService.updateVersion(resourceTask.getResourceId(), user, file, properties);
```
The main functions implemented within the versionService. updateVersion method are:
```
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
5. prose summary
   This article takes the Linkis engine material management function as the starting point, outlines the architecture of BML material services, and combines the underlying source code to analyze in detail the concept of engine materials in the engine material management function, as well as the operation process of uploading, updating, and version management of engine materials.