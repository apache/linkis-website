---
title: Linkis 编译打包
sidebar_position: 0
---
## 1 全量编译Linkis

   __编译环境要求：__  需要JDK8以上进行编译，**Oracle/Sun** 和 **OpenJDK**都支持。

   从git获取项目代码后，使用maven打包项目安装包。  
   
**请注意**：官方推荐使用 Hadoop-2.7.2、Hive-1.2.1、Spark-2.4.3 和 Scala-2.11.12 对 Linkis 进行编译。

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
              
        <scala.version>2.11.12</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>
              
    </properties>
```

   (1) **如果您是本地第一次使用，必须在 Linkis 源码包根目录先执行以下命令**：
   
```bash
    cd incubator-linkis-x.x.x
    mvn -N  install
```

   (2) 在Linkis 源码包根目录执行以下命令:
    
```bash
    cd incubator-linkis-x.x.x
    mvn clean install
```  

   (3) 获取安装包，在工程的assembly->target目录下：

```bash
    wedatasphere-linkis-x.x.x/assembly/target/wedatasphere-linkis-x.x.x-dist.tar.gz
```

## 2 编译单个服务
   
   从git获取项目代码后，使用maven打包项目安装包。   

（1） **如果您是本地第一次使用，必须在 Linkis 源码包根目录先执行以下命令**：
   
```bash
    cd incubator-linkis-x.x.x
    mvn -N  install
```
         
（2） 在terminal通过命令行跳转到对应的模块，比如
   
```bash   
    cd publicService
```

（3） 执行该模块对应的pom.xml目录下执行编译命令：
   
```bash      
    mvn clean install
```
         
（4） 获取安装包，在对应模块的->target目录下会有编译好的包：
   
```
   target/linkis-publicservice.zip
```