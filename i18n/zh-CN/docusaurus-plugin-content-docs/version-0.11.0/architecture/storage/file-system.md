---
title: 对接多种文件系统
sidebar_position: 1
---
>如何实现对接多种文件系统


## 1 背景

很多系统都面临着访问多文件系统的需求。例如使用本地文件系统和HDFS文件系统，用户需要了解两个文件系统的Java SDK，具有很大的学习成本。

另外在使用其Java SDK时，实例化FileSystem需要传入很多配置信息并进行很多的初始化，加大了用户使用的复杂性。

是否可以通过指定路径的scheme头，让文件系统自动识别并切换底层的文件系统，来读取文件？

## 2 思路

提供通用的文件系统Java SDK，用户通过调用FSFactory创建FileSystem，使用通用接口进行多种文件系统的访问，整体方案如下图：

![通用文件系统方案](../../images/ch4/storage/file_system.png)

## 3 实现

**(1)** 
用户通过文件系统工厂(FSFactory)，通过传入FsPath，获取一个Fs。
FsPath实例化时通过schema来区分不同的文件系统类型，如:local:///tmp/test.txt和hdfs:///tmp/test.txt，FsFactory通过schema头(如：local或hdfs)可获得对应文件系统的FileSystem对象；

**(2)** 
FileSystem对象，提供了通用的接口，如：获得文件(夹)大小，创建、删除文件(夹)，读写文件等操作。
用户只需要调用FileSystem对象里面的方法既可以完成对应文件系统的操作。

**(3)** 
用户通过FileSystem并传入相应的FsPath就可以操作对应的文件系统，通过第二点提供的操作可以实现通用的文件系统操作。

**(4)** 
FileSystem底层对应的是实际的文件系统对象和接口，这些接口对于用户来说是屏蔽的，用户只需要了解FileSystem的接口和方法后，就可以操作底层不同的文件系统。
如用户需要读取路径为local:///tmp/test.tx的本地文件，用户只需要调用FileSystem的read方法就可以映射到本地文件系统的文件输入流读取出相应的内容。
其中文件系统(File System)接口现已经实现了本地LoaclFileSystem和HDFSFileSystem。
用户通过实现文件系统(File System)接口可以对接到不同的文件系统，扩展极其方便。