---
title: Engine Material Management
authors: [aiceflower]
tags: [bml,linki1.3.1]
---
# Overview

## background

Engine material management is the linkis engine material management system, which is mainly used to manage Linkis engine material files and store various engine files of users, including engine type, engine version and other information. The overall process is that the compressed file is uploaded to the material library (BML) through the front-end browser, and the material compressed file is decompressed and verified. If the engine does not exist locally when it needs to be executed, it needs to be searched in the material library, downloaded, installed and registered for execution.

Has the following function points:

1) Support uploading packaged engine files. The size of uploaded files is affected by nginx configuration, and the file type is zip file type. It is not supported to package zip compressed files by yourself in the windows environment.

2) Support for updating existing engine materials. After updating, add a storage version of bml engine materials in BML, and the current version can be rolled back and deleted.

3) An engine involves two engine materials, namely lib and conf, which can be managed separately.

## Architecture Diagram

![](./img/bml.jpg)

## Architecture Description

1. Engine material management requires administrator privileges in the Linkis web management console, and the administrator field in the test environment needs to be set during development and debugging.

2. Engine material management involves adding, updating, and deleting engine material files. Material files are divided into lib and conf to store them separately. The concept of two versions is involved in the file, one is the version of the engine itself, and the other is the material version. In the update operation, if the material is modified, a new material version will be added and stored in BML, which supports the material version delete and rollback.

3. Use the BML Service to store the engine material files, call the BML service to store the files through RPC, and obtain the stored resource id and version and save them.

### Core process

1. Upload the engine plug-in file of zip type, first store it in the Home directory of the engine plug-in and decompress the file, and then start the refresh program.
2. Compress the conf and lib directories in the decompressed engine file, upload it to the BML (material management system), obtain the corresponding BML resource id and resource version, and read the corresponding engine name and version information.
3. In the engine material resource table, add a new engine material record, and each upload will generate lib and conf data respectively. In addition to recording the name and type information of the engine, the most important thing is to record the information of the engine in the material management system, including the resource id and version information of the engine, which are linked to the resource table in BML.

## Database Design

Engine Material Resource Information Table (linkis_cg_engine_conn_plugin_bml_resources)

| Field name | Function | Remarks |
| --- | --- | --- |
| id | engine material package identification id | Primary key |
| engine_conn_type | The location where resources are stored | such as Spark |
| version | engine version | such as Spark's v2.4.3 |
| file_name | engine file name | such as lib.zip |
| file_size | engine file size | |
| last_modified | The last modification time of the file | |
| bml_resource_id | The id of the record resource in BML (material management system) | The id used to identify the engine file in BML |
| bml_resource_version | record resource version in BML | such as v000001 |
| create_time | resource creation time | |
| last_update_time | The last update time of the resource | |