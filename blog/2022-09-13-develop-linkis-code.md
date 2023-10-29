---
title: Develop and debug the source code of Linkis locally
authors: [Jie Longping]
tags: [blog,guide]
---
> This article records in detail how to configure and start various microservices of Linkis in IDEA, and implement the submission and execution of scripts such as JDBC, Python, and Shell.
###1 Code debugging environment
- Mac OS m1 chip, linkis-cg-engineplugin and linkis-cg-engineconnmanager services do not support debugging on Windows for the time being, you can refer to the development documents on the official website for remote debugging.
- Zulu openjdk 1.8
- maven3.6.3
- Linkis 1.2.0 (under development), this article can theoretically support local development and debugging of Linkis 1.0.3 and later versions
###2 Prepare the code and compile it

```shell script
git clone git@github.com:apache/incubator-linkis.git

cd incubator-linkis

git checkout dev-1.2.0 
```
Clone the source code of Linkis to the local computer, and open it with IDEA, the first time you open the project, you will download the dependency jar package required for the compilation of the Linkis project from the maven repository. When the dependent jar package is loaded, run the following compilation and packaging commands:
```shell script
mvn -N install
mvn clean Install
```
After the compilation command is successfully run, the compiled installation package can be found in the directory incubator-linkis/linkis-dist/target/: apache-linkis-version-incubating-bin.tar.gz
###3 Configure and start the service
####3.1 add mysql-connector-java to classpath 
If you encounter the situation that the mysql driver class cannot be found during the service startup process, you can add mysql-connector-java-version number .jar to the classpath of the corresponding service module, please refer to section 3.5 for detailed operations.

Currently, the following services rely on MySQL:

- linkis-mg-gateway

- linkis-ps-publicservice

- linkis-cg-linkismanage
####3.2Adjust the log4j2 .xml configuration
Under the Linkis source code folder, in the subdirectory linkis-dist/package/conf, are some default configuration files of Linkis, first edit the log4j2 .xml file, and add the configuration of log output to the console.

For more information, please visit https://mp.weixin.qq.com/s?__biz=MzI4MDkxNzUxMg==&mid=2247489146&idx=1&sn=b455fbda66d6714693681eb53182caee&chksm=ebb0751ddcc7fc0b6cc43226a34fb4e72724b4fb4a359171d686f294025a814dfc416e3eef1d&token=173691862&lang=zh_CN#rd
