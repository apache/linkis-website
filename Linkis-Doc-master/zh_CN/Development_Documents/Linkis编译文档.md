# Linkis 编译文档

## 目录

- [1. 全量编译 Linkis](#1全量编译-linkis)

- [2. 编译单个模块](#2编译单个模块)

- [3. 编译某个引擎](#3-编译某个引擎)

- [4. 如何修改Linkis的依赖的Hadoop、Hive、Spark版本](#4-如何修改linkis的依赖的hadoophivespark版本)

- [5. 编译前端管理台](https://github.com/WeBankFinTech/Linkis-Doc/blob/master/zh_CN/Development_Documents/Web/Build.md)

## 1.全量编译 Linkis

   __编译环境要求：__  必须 **JDK8** 以上，**Oracle/Sun** 和 **OpenJDK**都支持。

   从 git 获取项目代码后，使用 maven 编译项目安装包。  
   
   **请注意**：官方推荐使用 Hadoop-2.7.2、Hive-1.2.1、Spark-2.4.3 和 Scala-2.11.8 对 Linkis 进行编译。

   如果您想使用 Hadoop、Hive、Spark 的其他版本对 Linkis 进行编译，请参考：[如何修改Linkis的依赖的Hadoop、Hive、Spark版本](#4-如何修改linkis的依赖的hadoophivespark版本)

   (1) **如果您是本地第一次编译使用，必须在 Linkis 源码包根目录先执行以下命令**：
   
```bash
    cd wedatasphere-linkis-x.x.x
    mvn -N  install
```

   (2) 在 Linkis 源码包根目录执行以下命令:
    
```bash
    cd wedatasphere-linkis-x.x.x
    mvn clean install
```  

   (3) 获取安装包，在工程的assembly->target目录下：

```bash
    ls wedatasphere-linkis-x.x.x/assembly/target/wedatasphere-linkis-x.x.x-dist.tar.gz
```

## 2.编译单个模块
   
   从 git 获取项目代码后，使用 maven 打包项目安装包。

（1） **如果您是本地第一次使用，必须在 Linkis 源码包根目录先执行以下命令**：
   
```bash
    cd wedatasphere-linkis-x.x.x
    mvn -N  install
```
         
（2） 跳转到对应模块进行编译，比如想重新编译 Entrance，命令如下：
   
```bash   
    cd wedatasphere-linkis-x.x.x/linkis-computation-governance/linkis-entrance
    mvn clean install
```
         
（3） 获取安装包，在对应模块的->target目录下会有编译好的包：
   
```
    ls wedatasphere-linkis-x.x.x/linkis-computation-governance/linkis-entrance/target/linkis-entrance.x.x.x.jar
```

## 3. 编译某个引擎

这里以编译 Linkis 的 Spark 引擎为例：

（1） **如果您是本地第一次使用，必须在 Linkis 源码包根目录先执行以下命令**：
   
```bash
    cd wedatasphere-linkis-x.x.x
    mvn -N  install
```
         
（2） 跳转到 Spark 引擎所在的目录进行编译打包，命令如下：
   
```bash   
    cd wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
    mvn clean install
```
         
（3） 获取安装包，在对应模块的->target目录下会有编译好的包：
   
```
    ls wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark/target/linkis-engineplugin-spark-x.x.x.zip
```

如何单独安装 Spark 引擎？ 请参考 [Linkis 引擎插件安装文档](../Deployment_Documents/EngineConnPlugin引擎插件安装文档.md)

## 4. 如何修改Linkis的依赖的Hadoop、Hive、Spark版本

请注意：Hadoop 作为大数据基础服务，Linkis 必须依赖 Hadoop 进行编译；
而 Spark、Hive等计算存储引擎则不然，如果您不想使用某个引擎，可以无需设置该引擎的版本，无需编译该引擎插件。

具体而言，修改 Hadoop 的版本与 Spark、Hive 等计算引擎的方式不同，下面详细介绍：

#### 如何修改 Linkis 依赖的 Hadoop 版本？

进入 Linkis 源码包根目录，手动修改 pom.xml 文件的 Hadoop 版本信息，具体如下：

```bash
    cd wedatasphere-linkis-x.x.x
    vim pom.xml
```

```xml
    <properties>
      
        <hadoop.version>2.7.2</hadoop.version> <!--> 在这里修改Hadoop版本号 <-->
              
        <scala.version>2.11.8</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>
              
    </properties>
```

**请注意：如果你的hadoop版本是hadoop3，需要修改linkis-hadoop-common的pom文件**
因为在hadoop2.8以下的时候，hdfs相关的class是在hadoop-hdfs模块中的，但是在hadoop 3.X中将对应的class移动到了模块hadoop-hdfs-client当中，您需要修改下这个文件：

```
pom:Linkis/linkis-commons/linkis-hadoop-common/pom.xml
修改依赖hadoop-hdfs为hadoop-hdfs-client：
 <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs</artifactId>  <!-- 只需要将该行替换即可，替换为 <artifactId>hadoop-hdfs-client</artifactId>-->
            <version>${hadoop.version}</version>
            ...
 将hadoop-hdfs修改为：
  <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs-client</artifactId>
            <version>${hadoop.version}</version>
            ...
```

#### 如何修改 Linkis 依赖的 Spark、Hive 版本？

这里以修改 Spark 的版本为例进行介绍。进入 Spark 引擎所在的目录，手动修改 pom.xml 文件的 Spark 版本信息，具体如下：

```bash
    cd wedatasphere-linkis-x.x.x/linkis-engineconn-plugins/engineconn-plugins/spark
    vim pom.xml
```

```xml
    <properties>
      
        <spark.version>2.4.3</spark.version>  <!--> 在这里修改Spark版本号 <-->
              
    </properties>
```

修改其他引擎的版本与修改 Spark 版本类似，先进入相关引擎所在的目录，手动修改 pom.xml 文件的引擎版本信息即可。

然后请参考 [编译某个引擎](#3-编译某个引擎)
