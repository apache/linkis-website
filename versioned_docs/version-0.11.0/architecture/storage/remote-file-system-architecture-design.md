---
title: Access Remote File System Architecture
sidebar_position: 1
---



## 1 Background

Normally after a JVM process the user only has access to file reading and writing from the user.

If：User A starts a JVM process on the linux server. If the user is not root (superuser), they can only access local files on that server and only have permission to operate with User A files.

But there are many scenarios in which we launch the JVM process through User A, hoping to have access to other user files on local filesystem in the context of non-proliferation of document permissions.

At the same time, how can the HDFS file system be accessed without HDFS installed locally?

How do you avoid creating Linux users so you can access the relevant files of that user on HDFs?

## 2 Ideas

By launching the engine manager (IO-Engineer) of the filesystem on the remote server ([what is EngineManager?](/architecture/ujes/ujes-design.md)) and providing a compatible client API, allowing users access to remote file systems.

The entire architecture is shown below in graph：

![Storage Remote Mode Architecture](../../images/ch4/storage/storage_remote.png)

## 3 Implementation

(1) User A calls on the client (IO-Client) of the remote filesystem to IO-Client via the incoming file path (FsPath) and user B for proxy;

(2) Client (IO-Client) receives FsPath and proxy user B for ProxyFS.

(3) User A operates through ProxyFS on proxyFS files of proxy user B. If the permissions check for the next steps are passed, then you can perform actions such as adding and deleting, reading and writing of files.

(4) User A is passed through ProxyFS operations to IO-Client and to remote filesystem services that are transmitted via the network and are obtained through the Smart Routing Service (IR) with a lower load remote file service (IO-Engine) during the transmission process.

(5) When the remote file service (IO-Engine) receives an IO-Client operation, safety rules are used to determine first whether the transferred token is lawful, then whether the IP is lawful, and then whether User A is authorized to act on the file to User B.

(6) The IO-Engineering will then access the superuser's Fs through which to access the actual filesystem and operate user B files.Since the IO-Engineering service is started by a superuser, it can access all user files and operates.

(7) The IO-Engineering operation completed the user B file operation and returned the result to IO-client, thus returning the result to user A, and the complete process for proxy remote access files was completed.

## Note

The engine manager (IO-EM) service in the graph above is responsible for stopping the IO-Engineering service.

The Smart Routing Service (IR) in the above graph is responsible for determining the load of each IO-Engineering and for the balancing redirection of the IO-Client request to send it, and for notifying IOEM to start the new IO-Engineering service if all IO-Engineering is overloaded and IOEM to stop the idle IO-Engineering service when the load is low.

**Through the process above before you can write to you at least：**

From point (5) it is clear that full control of permissions can be achieved and that users can configure their own security rules;

Features similar to shared storage can be achieved from the remote filesystem service access;

Multiple filesystems can be supported from points (1) and (2) through different types of incoming FS.
