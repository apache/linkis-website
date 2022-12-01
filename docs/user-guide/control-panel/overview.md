---
title: Description of The Main Interface of The Management Console
sidebar_position: 0
---

### 1 Global History
#### 1.1 Main functions
- Query of executing tasks: Support querying historical tasks based on time/task ID/engine type/task status.
- Forced stop of running tasks
- Admin users can switch the admin view to view all user tasks
- View detailed task execution logs and execution results

#### 1.2 Main interface

- Paging query of historical tasks /api/rest_j/v1/jobhistory/list
- Detailed query of historical tasks /api/rest_j/v1/jobhistory/{taskId}/get
- Log viewing /api/rest_j/v1/filesystem/openLog?path=hdfs:%2F%2F%2Ftmp%2Flinkis%2Flog%2F2022-04-12%2FIDE%2Fhadoop%2F466.log
- Result set file list /api/rest_j/v1/filesystem/getDirFileTrees?path=hdfs:%2F%2F%2Ftmp%2Flinkis%2Fhadoop%2Flinkis%2F20220412_173302%2FIDE%2F466
- Execute result set data /api/rest_j/v1/filesystem/openFile?path=hdfs:%2F%2F%2Ftmp%2Flinkis%2Fhadoop%2Flinkis%2F20220412_173302%2FIDE%2F466%2F_0.dolphin&page=1&pageSize=5000
- Mandatory kill interface for tasks /api/rest_j/v1/entrance/killJobs


### 2 Resource Management
#### 2.1 Main functions
- View the status of the engine currently started by the logged-in user and the resource usage
- Ability to stop the engine through interface operations
- Administrator users can switch administrator views, view yarn queue resources, and reset resources

#### 2.2 Main interface
- Resource query interface /api/rest_j/v1/linkisManager/rm/userresources
- Detailed engine instance information api/rest_j/v1/linkisManager/rm/applicationlist used by resources
- Engine kill interface /api/rest_j/v1/linkisManager/rm/enginekill
- Resource reset interface /api/rest_j/v1/linkisManager/rm/resetResource?resourceId=2
- List of all resources used /api/rest_j/v1/linkisManager/rm/allUserResource?page=1&size=15


### 3 parameter configuration
#### 3.1 Main functions
- Function of user-defined parameter management
- Users can manage engine related configurations on this interface
- Administrators can also add application types and engines here

#### 3.2 Main interface
- View the configuration tree list /api/rest_j/v1/configuration/getFullTreesByAppName?creator=%E5%85%A8%E5%B1%80%E8%AE%BE%E7%BD%AE
- New secondary engine configuration /api/rest_j/v1/configuration/createSecondCategory
- configuration saving /api/rest_j/v1/configuration/saveFullTree


### 4 Global variables
#### 4.1 Main functions
- Support users to customize the addition and modification of variables, which can be automatically replaced according to the configured variable values ​​when the task is submitted. Ability to reuse commonly used variables

#### 4.2 Main interface
- Saving of global variables /api/rest_j/v1/variable/saveGlobalVariable
- Query of global variables /api/rest_j/v1/variable/listGlobalVariable

### 5 ECM Management
> **Only visible to linkis computing management platform administrators**
#### 5.1 Main functions
- Admin can manage ECM and all engines,
- You can view ECM status information, modify ECM label information, modify ECM status information, and query all engine information under each ECM
- You can edit the tag information of ECM (only some tags are allowed to be edited), and modify the status of ECM.
- You can view all the engine information under the ECM, and you can stop the operation for a single engine, view the operation log, and edit the tag information of the engine.

The maximum available resource is configured with a default value via a configuration file parameter
wds.linkis.ecm.memory.max 100g
wds.linkis.ecm.cores.max 100
wds.linkis.ecm.engineconn.instances.max 50


#### 5.2 Main interface
- Query the ECM list api/rest_j/v1/linkisManager/listAllEMs
- Modify ECM information api/rest_j/v1/linkisManager/modifyEMInfo
- Query engine data under ecm/api/rest_j/v1/linkisManager/listEMEngines
- Modify engine information api/rest_j/v1/linkisManager/modifyEngineInfo
- Engine kill interface /api/rest_j/v1/linkisManager/rm/enginekill
- Engine log query interface /api/rest_j/v1/linkisManager/openEngineLog


### 6 Microservice Management

#### 6.1 Main functions

You can view all microservice information under Linkis, which is only visible to linkis computing management console administrators.

#### 6.2 Main interface
- Service query /api/rest_j/v1/microservice/allInstance
- label update api/rest_j/v1/microservice/instanceLabel





