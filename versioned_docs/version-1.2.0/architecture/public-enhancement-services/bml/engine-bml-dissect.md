---
title: Analysis of Engine BML
sidebar_position: 1
---

> Introduction: This article takes the engine-related material management process as the entry point, and combines the underlying data model and source code to analyze the implementation details of the engine material management function in detail, hoping to help you better understand the BML (material library) service. Architecture.

## 1. BML material library service

The BML material library is a functional module under the PublicEnhancementService (PS) in Linkis, the public enhancement service framework.

![PS-BML](/Images/Architecture/Public_Enhancement_Service/engine_bml/PS-BML.png)

In the Linkis architecture system, the concept of `material` refers to various file data that are stored and hosted in a unified manner, including script code, resource files, third-party jars, related class libraries and configuration files required when the engine starts, as well as keytab files for security authentication, etc.

In short, any data that exists in the file state can be centrally hosted in the material library, and then downloaded and used in the respective required scenarios.

The material service is stateless and can be deployed in multiple instances to achieve high service availability. Each instance provides independent services to the outside world without interfering with each other. All material metadata and version information are shared in the database, and the underlying material data can be accessed. Store in HDFS or local (shared) file system, and support the implementation of file storage-related interfaces, extending other file storage systems, etc.

The material service provides precise permission control. For the material of the engine resource type, it can be shared and accessed by all users; for some material data containing sensitive information, only limited users can read it.

The material file adopts the method of appending, which can combine multiple versions of resource files into one large file to avoid generating too many small HDFS files. Too many small HDFS files will reduce the overall performance of HDFS.

The material service provides lifecycle management of operation tasks such as file upload, update, and download. At the same time, there are two forms of using the material service, the rest interface and the SDK. Users can choose according to their own needs.

The BML architecture diagram is as follows:

![BML Architecture](/Images/Architecture/Public_Enhancement_Service/engine_bml/bml-jiagou.png)

For the above overview of the BML architecture, please refer to the official website document: https://linkis.apache.org/docs/latest/architecture/public-enhancement-services/bml

## 2. BML material library service underlying table model

Before deeply understanding the process details of BML material management, it is necessary to sort out the database table model that the underlying BML material management service relies on.

![BML-Model](/Images/Architecture/Public_Enhancement_Service/engine_bml/BML-Model.png)

Combined with Linkis' linkis_ddl.sql file and the engine material upload and update process described below, you can understand the meaning of fields in bml resources related tables and the field relationship between tables.

## 3. Usage scenarios of BML material library service

Currently in Linkis, the usage scenarios of the BML material library service include:

- Engine material files, including files in conf and lib required for engine startup
- Stored scripts, such as the scripts in the Scripts linked by the workflow task node are stored in the BML material library
- Workflow content version management in DSS
- Management of resource files required when tasks are running

## 4. Analysis of engine material management process

`Engine material` is a subset of the Linkis material concept, and its role is to provide the latest version of jar package resources and configuration files for the engine to start. This section mainly starts from the engine material management function, and analyzes the flow details of engine material data in BML.

### 4.1 Engine Material Description

After the Linkis installation package is deployed normally, you can see all the engine material directories under the `LINKIS_INSTALL_HOME/lib/linkis-engineconn-plugins` directory. Taking the jdbc engine as an example, the structure of the engine material directory is as follows:

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

Material catalog composition:

```shell
jdbc/dist/version/conf.zip
jdbc/dist/version/lib.zip

jdbc/plugin/version number (remove v and leave the number)/linkis-engineplugin-engine name-1.1.x.jar
````

conf.zip and lib.zip will be hosted in the material management service as engine materials. After each local modification to the material conf or lib, a new version number will be generated for the corresponding material, and the material file data will be re-uploaded. When the engine starts, the material data of the latest version number will be obtained, lib and conf will be loaded, and the java process of the engine will be started.

### 4.2 Engine material upload and update process

When Linkis is deployed and started for the first time, the engine material (lib.zip and conf.zip) will be triggered to upload to the material library for the first time; when the jar package under the engine lib or the engine configuration file in conf is modified, the engine material needs to be triggered. The refresh mechanism ensures that the latest material file can be loaded when the engine is started.

Taking the current version of Linkis 1.1.x as an example, there are two ways to trigger the engine material refresh:

Restart the engineplugin service with the command `sh sbin/linkis-daemon.sh restart cg-engineplugin`

Interface to refresh by requesting engine material

```shell
# refresh all engine materials
curl --cookie "linkis_user_session_ticket_id_v1=kN4HCk555Aw04udC1Npi4ttKa3duaCOv2HLiVea4FcQ=" http://127.0.0.1:9001/api/rest_j/v1/engineplugin/refreshAll
# Specify the engine type and version to refresh the item
curl --cookie "linkis_user_session_ticket_id_v1=kN4HCk555Aw04udC1Npi4ttKa3duaCOv2HLiVea4FcQ=" http://127.0.0.1:9001/api/rest_j/v1/engineplugin/refresh?ecType=jdbc&version=4
```

The underlying implementation mechanism of the two types of engine material refresh methods is the same, both call the refreshAll() or refresh() method in the `EngineConnResourceService` class.

In the init() method in the default implementation class `DefaultEngineConnResourceService` of the abstract class `EngineConnResourceService`, the parameter wds.linkis.engineconn.dist.load.enable (default is true) is used to control whether to start the engineplugin service every time. Execute refreshAll(false) to check whether all engine materials have been updated (where faslse represents asynchronous acquisition of execution results).

> The init() method is modified by the annotation @PostConstruct. After the DefaultEngineConnResourceService is loaded, it is executed before the object is used, and it is executed only once.

Manually call the interface of engineplugin/refresh, that is, manually execute the refreshAll or refresh method in the `EngineConnResourceService` class.

So the logic of engine material detection and update is in the refreshAll and refresh methods in `DefaultEngineConnResourceService`.

The core logic of refreshAll() is:

1) Obtain the installation directory of the engine through the parameter wds.linkis.engineconn.home, the default is:

```scala
getEngineConnsHome = Configuration.getLinkisHome() + "/lib/linkis-engineconn-plugins";
````

2) Traverse the engine directory

```scala
getEngineConnTypeListFromDisk: Array[String] = new File(getEngineConnsHome).listFiles().map(_.getName)
```

3) The `EngineConnBmlResourceGenerator` interface provides the validity detection of the underlying files or directories of each engine (version). The corresponding implementation exists in the abstract class `AbstractEngineConnBmlResourceGenerator`.

4) The `DefaultEngineConnBmlResourceGenerator` class is mainly used to generate `EngineConnLocalizeResource`. EngineConnLocalizeResource is the encapsulation of the material resource file metadata and InputStream. In the subsequent logic, EngineConnLocalizeResource will be used as a material parameter to participate in the material upload process.

The code details of the three files EngineConnBmlResourceGenerator, AbstractEngineConnBmlResourceGenerator, and DefaultEngineConnBmlResourceGenerator will not be described in detail. You can use the following UML class diagram to get a general understanding of its inheritance mechanism, and combine the specific implementation in the method to understand the function of this part.

![BML](/Images/Architecture/Public_Enhancement_Service/engine_bml/bml_uml.png)

Go back to the refreshAll method in the `DefaultEngineConnResourceService` class, and continue to look at the core process of the refreshTask thread:

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

Scan the installation directory of the engine to get a list of each engine material directory. After the legality check of each engine material directory structure is passed, you can get the corresponding `EngineConnLocalizeResource`, and then call refresh(localize: Array[EngineConnLocalizeResource] , engineConnType: String, version: String) to complete the upload of subsequent materials.

Inside the refresh() method, the main processes are as follows:

Obtain the material list data corresponding to engineConnType and version from the table `linkis_cg_engine_conn_plugin_bml_resources`, and assign it to the variable engineConnBmlResources.

```scala
val engineConnBmlResources = asScalaBuffer(engineConnBmlResourceDao.getAllEngineConnBmlResource(engineConnType, version))
````

![ec data](/Images/Architecture/Public_Enhancement_Service/engine_bml/ec-data.png)



#### 4.2.1 Engine material upload process

**Engine material upload process sequence diagram**

![Engine material upload process sequence diagram](/Images/Architecture/Public_Enhancement_Service/engine_bml/bml-shixu.png)

If there is no matching data in the table `linkis_cg_engine_conn_plugin_bml_resources`, you need to use the data in EngineConnLocalizeResource to construct an EngineConnBmlResource object and save it to the `linkis_cg_engine_conn_plugin_bml_resources` table. Before saving this data, you need to upload the material file, that is, execute `uploadToBml` (localizeResource)` method.

Inside the uploadToBml(localizeResource) method, the interface for requesting material upload is constructed by constructing bmlClient. which is:

```scala
private val bmlClient = BmlClientFactory.createBmlClient()
bmlClient.uploadResource(Utils.getJvmUser, localizeResource.fileName, localizeResource.getFileInputStream)
```

In BML Server, the location of the material upload interface is in the uploadResource interface method in the BmlRestfulApi class. The main process is:

```scala
ResourceTask resourceTask = taskService.createUploadTask(files, user, properties);
```

Every time a material is uploaded, a ResourceTask will be constructed to complete the file upload process, and the execution record of the file upload task will be recorded. Inside the createUploadTask method, the main operations are as follows:

1) Generate a globally unique resource_id for the uploaded resource file, String resourceId = UUID.randomUUID().toString();

2) Build a ResourceTask record and store it in the table `linkis_ps_bml_resources_task`, as well as a series of subsequent Task state modifications.

```scala
ResourceTask resourceTask = ResourceTask.createUploadTask(resourceId, user, properties);
taskDao.insert(resourceTask);

taskDao.updateState(resourceTask.getId(), TaskState.RUNNING.getValue(), new Date());
```

3) The actual writing of material files into the material library is completed by the upload method in the ResourceServiceImpl class. Inside the upload method, a set of byte streams corresponding to `List<MultipartFile> files` will be persisted to the material library file storage In the system; store the properties data of the material file in the resource record table (linkis_ps_bml_resources) and the resource version record table (linkis_ps_bml_resources_version).

```scala
MultipartFile p = files[0]
String resourceId = (String) properties.get("resourceId");
String fileName =new String(p.getOriginalFilename().getBytes(Constant.ISO_ENCODE),
                            Constant.UTF8_ENCODE);
fileName = resourceId;
String path = resourceHelper.generatePath(user, fileName, properties);
// generatePath currently supports Local and HDFS paths, and the composition rules of paths are determined by LocalResourceHelper or HdfsResourceHelper
// implementation of the generatePath method in
StringBuilder sb = new StringBuilder();
long size = resourceHelper.upload(path, user, inputStream, sb, true);
// The file size calculation and the file byte stream writing to the file are implemented by the upload method in LocalResourceHelper or HdfsResourceHelper
Resource resource = Resource.createNewResource(resourceId, user, fileName, properties);
// Insert a record into the resource table linkis_ps_bml_resources
long id = resourceDao.uploadResource(resource);
// Add a new record to the resource version table linkis_ps_bml_resources_version, the version number at this time is instant.FIRST_VERSION
// In addition to recording the metadata information of this version, the most important thing is to record the storage location of the file of this version, including the file path, starting location, and ending location.
String clientIp = (String) properties.get("clientIp");
ResourceVersion resourceVersion = ResourceVersion.createNewResourceVersion(
                            resourceId, path, md5String, clientIp, size, Constant.FIRST_VERSION, 1);
versionDao.insertNewVersion(resourceVersion);
```

After the above process is successfully executed, the material data is truly completed, and then the UploadResult is returned to the client, and the status of this ResourceTask is marked as completed. Exception information.

![resource-task](/Images/Architecture/Public_Enhancement_Service/engine_bml/resource-task.png)



#### 4.2.2 Engine material update process

**Engine material update process sequence diagram**

![Engine material update process sequence diagram](/Images/Architecture/Public_Enhancement_Service/engine_bml/engine-bml-update-shixu.png)

If the table `linkis_cg_engine_conn_plugin_bml_resources` matches the local material data, you need to use the data in EngineConnLocalizeResource to construct an EngineConnBmlResource object, and update the metadata information such as the version number, file size, modification time, etc. of the original material file in the `linkis_cg_engine_conn_plugin_bml_resources` table. Before updating, you need to complete the update and upload operation of the material file, that is, execute the `uploadToBml(localizeResource, engineConnBmlResource.getBmlResourceId)` method.

Inside the uploadToBml(localizeResource, resourceId) method, an interface for requesting material resource update by constructing bmlClient. which is:

```scala
private val bmlClient = BmlClientFactory.createBmlClient()
bmlClient.updateResource(Utils.getJvmUser, resourceId, localizeResource.fileName, localizeResource.getFileInputStream)
```

In BML Server, the interface for material update is located in the updateVersion interface method in the BmlRestfulApi class. The main process is as follows:

Complete the validity detection of resourceId, that is, check whether the incoming resourceId exists in the linkis_ps_bml_resources table. If the resourceId does not exist, an exception will be thrown to the client, and the material update operation at the interface level will fail.

Therefore, the corresponding relationship of the resource data in the tables `linkis_cg_engine_conn_plugin_bml_resources` and `linkis_ps_bml_resources` needs to be complete, otherwise an error will occur that the material file cannot be updated.

```scala
resourceService.checkResourceId(resourceId)
```

If resourceId exists in the linkis_ps_bml_resources table, it will continue to execute:

```scala
StringUtils.isEmpty(versionService.getNewestVersion(resourceId))
````

The getNewestVersion method is to obtain the maximum version number of the resourceId in the table `linkis_ps_bml_resources_version`. If the maximum version corresponding to the resourceId is empty, the material will also fail to update, so the integrity of the corresponding relationship of the data here also needs to be strictly guaranteed.

After the above two checks are passed, a ResourceUpdateTask will be created to complete the final file writing and record update saving.

```scala
ResourceTask resourceTask = null;
synchronized (resourceId.intern()) {
	resourceTask = taskService.createUpdateTask(resourceId, user, file, properties);
}
```

Inside the createUpdateTask method, the main functions implemented are:

```scala
// Generate a new version for the material resource
String lastVersion = getResourceLastVersion(resourceId);
String newVersion = generateNewVersion(lastVersion);
// Then the construction of ResourceTask, and state maintenance
ResourceTask resourceTask = ResourceTask.createUpdateTask(resourceId, newVersion, user, system, properties);
// The logic of material update upload is completed by the versionService.updateVersion method
versionService.updateVersion(resourceTask.getResourceId(), user, file, properties);
```

Inside the versionService.updateVersion method, the main functions implemented are:

```scala
ResourceHelper resourceHelper = ResourceHelperFactory.getResourceHelper();
InputStream inputStream = file.getInputStream();
// Get the path of the resource
String newVersion = params.get("newVersion").toString();
String path = versionDao.getResourcePath(resourceId) + "_" + newVersion;
// The acquisition logic of getResourcePath is to limit one from the original path, and then splice newVersion with _
// select resource from linkis_ps_bml_resources_version WHERE resource_id = #{resourceId} limit 1
// upload resources to hdfs or local
StringBuilder stringBuilder = new StringBuilder();
long size = resourceHelper.upload(path, user, inputStream, stringBuilder, OVER_WRITE);
// Finally insert a new resource version record in the linkis_ps_bml_resources_version table
ResourceVersion resourceVersion = ResourceVersion.createNewResourceVersion(resourceId, path, md5String, clientIp, size, newVersion, 1);
versionDao.insertNewVersion(resourceVersion);
```