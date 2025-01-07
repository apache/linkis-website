---
title: BML
sidebar_position: 2
---


## Background

BML (Material Library Service) is a material management system of linkis, which is mainly used to store various file data of users, including user scripts, resource files, third-party Jar packages, etc., and can also store class libraries that need to be used when the engine is running.

It has the following functions:

1) Support various types of files. Supports text and binary files. If you are a user in the field of big data, you can store their script files and material compression packages in the system.

2), the service is stateless, multi-instance deployment, to achieve high service availability. When the system is deployed, it can be deployed with multiple instances. Each instance provides services independently to the outside world without interfering with each other. All information is stored in the database for sharing.

3) Various ways of use. Provides two ways of Rest interface and SDK, users can choose according to their needs.

4) The file is appended to avoid too many small HDFS files. Many small HDFS files will lead to a decrease in the overall performance of HDFS. We have adopted a file append method to combine multiple versions of resource files into one large file, effectively reducing the number of files in HDFS.

5) Accurate authority control, safe storage of user resource file content. Resource files often have important content, and users only want to read it by themselves

6) Provide life cycle management of file upload, update, download and other operational tasks.

## Architecture diagram

![BML Architecture Diagram](/Images/Architecture/bml-02.png)

## Schema description

1. The Service layer includes resource management, uploading resources, downloading resources, sharing resources, and project resource management.

Resource management is responsible for basic operations such as adding, deleting, modifying, and checking resources, controlling access rights, and whether files are out of date.

2. File version control
   Each BML resource file has version information. Each update operation of the same resource will generate a new version. Of course, it also supports historical version query and download operations. BML uses the version information table to record the deviation position and size of each version of the resource file HDFS storage, and can store multiple versions of data on one HDFS file.

3. Resource file storage
   HDFS files are mainly used as actual data storage. HDFS files can effectively ensure that the material library files are not lost. The files are appended to avoid too many small HDFS files.

### Core Process

**upload files:**

1. Determine the operation type of the file uploaded by the user, whether it is the first upload or update upload. If it is the first upload, a new resource information record needs to be added. The system has generated a globally uniquely identified resource_id and a resource_location for this resource. The first version A1 of resource A needs to be stored in the resource_location location in the HDFS file system. After storing, you can get the first version marked as V00001. If it is an update upload, you need to find the latest version last time.

2. Upload the file stream to the specified HDFS file. If it is an update, it will be added to the end of the last content by file appending.

3. Add a new version record, each upload will generate a new version record. In addition to recording the metadata information of this version, the most important thing is to record the storage location of the version of the file, including the file path, start location, and end location.

**download file:**

1. When users download resources, they need to specify two parameters: one is resource_id and the other is version. If version is not specified, the latest version will be downloaded by default.

2. After the user passes in the two parameters resource_id and version to the system, the system queries the resource_version table, finds the corresponding resource_location, start_byte and end\_byte to download, and uses the skipByte method of stream processing to set the front (start_byte- 1) skip bytes, then read to end_byte
   The number of bytes. After the reading is successful, the stream information is returned to the user.

3. Insert a successful download record in resource_download_history

## Database Design

1. Resource information table (resource)

| Field name | Function | Remarks |
|-------------------|------------------------------|----------------------------------|
| resource_id | A string that uniquely identifies a resource globally | UUID can be used for identification |
| resource_location | The location where resources are stored | For example, hdfs:///tmp/bdp/\${USERNAME}/ |
| owner | The owner of the resource | e.g. zhangsan |
| create_time | Record creation time | |
| is_share | Whether to share | 0 means not to share, 1 means to share |
| update\_time | Last update time of the resource | |
| is\_expire | Whether the record resource expires | |
| expire_time | Record resource expiration time | |

2. Resource version information table (resource_version)

| Field name | Function | Remarks |
|-------------------|--------------------|----------|
| resource_id | Uniquely identifies the resource | Joint primary key |
| version | The version of the resource file | |
| start_byte | Start byte count of resource file | |
| end\_byte | End bytes of resource file | |
| size | Resource file size | |
| resource_location | Resource file placement location | |
| start_time | Record upload start time | |
| end\_time | End time of record upload | |
| updater | Record update user | |

3. Resource download history table (resource_download_history)

| Field | Function | Remarks |
|-------------|---------------------------|--------------------------------|
| resource_id | Record the resource_id of the downloaded resource | |
| version | Record the version of the downloaded resource | |
| downloader | Record downloaded users | |
| start\_time | Record download time | |
| end\_time | Record end time | |
| status | Whether the record is successful | 0 means success, 1 means failure |
| err\_msg | Log failure reason | null means success, otherwise log failure reason |