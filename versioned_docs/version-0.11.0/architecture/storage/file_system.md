---
title: Docking Multiple File Systems
sidebar_position: 1
---
>How to realize the docking of multiple file systems


## 1 Background

Many systems face the need to access multiple file systems. For example, to use the local file system and the HDFS file system, users need to understand the Java SDK of the two file systems, which has a great learning cost.

In addition, when using its Java SDK, instantiating FileSystem requires a lot of configuration information and a lot of initialization, which increases the complexity of users.

Can the file system automatically recognize and switch the underlying file system to read the file by specifying the scheme header of the path?

## 2 Ideas

Provide a common file system Java SDK, users create FileSystem by calling FSFactory, and use common interfaces to access multiple file systems. The overall plan is as follows:

![Common File System Scheme](../../images/ch4/storage/file_system.png)

## 3 Implementation

**(1)** 
The user obtains an Fs through the file system factory (FSFactory) and by passing in the FsPath.
When FsPath is instantiated, different file system types can be distinguished by schema, such as: local:///tmp/test.txt and hdfs:///tmp/test.txt, FsFactory can use the schema header (such as: local or hdfs). Obtain the FileSystem object corresponding to the file system;

**(2)** 
The FileSystem object provides a common interface, such as: obtaining the size of a file (folder), creating and deleting a file (folder), reading and writing files, etc.
The user only needs to call the method in the FileSystem object to complete the operation of the corresponding file system.

**(3)**
The user can operate the corresponding file system through FileSystem and pass in the corresponding FsPath, and the general file system operation can be realized through the operation provided in the second point.

**(4)**
The bottom layer of FileSystem corresponds to the actual file system objects and interfaces. These interfaces are shielded for users. Users only need to understand the interfaces and methods of FileSystem before they can operate different file systems at the bottom.
If the user needs to read a local file whose path is local:///tmp/test.tx, the user only needs to call the read method of FileSystem to be mapped to the file input stream of the local file system to read the corresponding content.
Among them, the file system (File System) interface has now implemented the local LoaclFileSystem and HDFSFileSystem.
Users can connect to different file systems by implementing the File System interface, which is extremely convenient for expansion.