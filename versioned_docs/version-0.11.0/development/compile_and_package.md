---
title: Linkis Packaging
sidebar_position: 0
---
## 1 Full compilation of Linkis

   __Build environment requirements：__  requires more than JDK8 to compile,**Oracle/Sun** and **OpenJDK**.

   When you get project code from git, use maven to install packages.

**Please note**：Official Recommended Compilation of Linkis using Hadoop-2.7.2, Hive-1.2.1, Spark-2.4.3 and Scala-2.11.12.

   如果您想使用Hadoop、Hive、Spark的其他版本对Linkis进行编译，您可以进入Linkis源码包根目录，手动修改 pom.xml 文件相关版本信息，具体如下：

```bash
    cd incubator-linkis-x.x.x
    vim pom.xml
```

```xml
    <properties>

        <hadoop.version>2.7.2</hadoop.version>
        <hive.version>1.2.1</hive.version>
        <spark.version>2.4.3</spark.version>

        <scala.version>2.11.2</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>

    </properties>
```

   (1) **If you are local for the first time, the following command must be executed in the Linkis source package root directory**：

```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```

   (2) Execute the following commands in the link source package directory:

```bash
    cd incubator-linkis-x.x.x
    mvn clean install
```

   (3) 获取安装包，在工程的assembly->target目录下：

```bash
    wedasphere-linkis-x.x.x/assembly/target/wedataphere-linkis-x.x.x-dist.tar.gz
```

## 2 Compilation of individual services

   When you get project code from git, use maven to install packages.

(1) **If you are local for the first time, the following command must be executed in the Linkis source package root directory**：

```bash
    cd incubator-linkis-x.x.x
    mvn -N install
```

(2) Jump to the corresponding module by command line in terminal, e.g.

```bash   
    cd Public Service
```

(3) Execute the compilation command under the pom.xml directory corresponding to this module：

```bash      
    mvn clean install
```

（4） 获取安装包，在对应模块的->target目录下会有编译好的包：

```
   target/linkis-publicservice.zip
```