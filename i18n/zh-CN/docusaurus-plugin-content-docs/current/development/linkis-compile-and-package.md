---
title: Linkis 后端编译打包
sidebar_position: 0
---

## 1. 前置准备 

## 1.1 环境要求 

__编译环境要求：__  必须 **JDK8** 以上，**Oracle/Sun** 和 **OpenJDK**都支持。


### 1.2 源码获取

- 方式1：从[github仓库](https://github.com/apache/incubator-linkis) https://github.com/apache/incubator-linkis 获取项目的源代码。
- 方式2：从[linkis的官方下载页面](https://linkis.apache.org/download/main) https://linkis.apache.org/download/main 下载所需版本的源码包。

**请注意**：官方推荐使用 Hadoop-2.7.2、Hive-1.2.1、Spark-2.4.3 和 Scala-2.11.12 对 Linkis 进行编译。

如果您想使用 Hadoop、Hive、Spark 的其他版本对 Linkis 进行编译，请参考：[如何修改Linkis的依赖的Hadoop、Hive、Spark版本](#4-如何修改linkis的依赖的hadoophivespark版本)

### <font color="red">1.2 修改依赖配置</font>  
:::caution 注意
因为mysql-connector-java驱动是GPL2.0协议，不满足Apache开源协议关于license的政策，因此从1.0.3版本开始，对mysql-connector-java的依赖项作用域scope默认是test，若自行编译，可以修改顶级pom.xml的mysql-connector-java依赖的scope作用域（注释掉即可）
:::
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql.connector.version}</version>
    <!--<scope>test</scope>-->
</dependency>
```

## 2. 全量编译 Linkis

### step1 首次编译(非首次可跳过此步)

**如果您是本地第一次编译使用，必须在 Linkis 源码工程的根目录先执行以下命令**：
```bash
    cd incubator-linkis-x.x.x
    mvn -N  install
```

### step2 执行编译
在 Linkis 源码包根目录执行以下命令:
    
```bash
    cd incubator-linkis-x.x.x
    mvn clean install

```  

### step3 获取安装包
编译后的完整安装包，在工程的linkis-dist->target目录下：

```bash
    #详细路径如下
    incubator-linkis-x.x.x/linkis-dist/target/apache-linkis-x.x.x-incubating-bin.tar.gz
```

## 3 常见问题 

### 3.1 如何编译单个模块
> 有些场景可能只需要针对某个模块进行编译，可参考如下流程 

:::caution 注意
如有没有执行过全量编译，先要进行一次全量编译
:::

#### step1 进入到对应模块进行编译     
进入到对应模块进行编译，比如想重新编译 Entrance，命令如下：
   
```bash   
    cd incubator-linkis-x.x.x/linkis-computation-governance/linkis-entrance
    mvn clean install
```

#### step2 获取安装包 
获取安装包，在对应模块的->target目录下会有编译好的包：
   
```
    ls incubator-linkis-x.x.x/linkis-computation-governance/linkis-entrance/target/linkis-entrance.x.x.x.jar
```

### 3.2 如何编译某个引擎

>有些场景可能只需要针对某个引擎进行编译，可参考如下流程 

:::caution 注意
如有没有执行过全量编译，先要进行一次全量编译
:::

这里以编译Spark 引擎为例：

#### step1 进入到对应模块进行编译           
进入到 Spark 引擎所在的目录进行编译打包，命令如下：
   
```bash   
    cd incubator-linkis-x.x.x/linkis-engineconn-plugins/spark
    mvn clean install
```
#### step2 获取引擎的物料包       
在对应模块的target目录下：

```
   #spark文件下就是编译好的引擎物料
   incubator-linkis-x.x.x/linkis-engineconn-plugins/spark/target/out/spark
```
如何单独安装 Spark 引擎？请参考 [Linkis 引擎插件安装文档](../deployment/engine-conn-plugin-installation)


### 3.2 如何将非默认引擎打包至安装部署包中 
 
> 默认打包配置中`linkis-dist/src/main/assembly/distribution.xml`，只会将`spark/hive/python/shell`打包到安装包中，如果需要添加其它引擎，可参考此步骤 

以jdbc引擎为例 

step1 修改`linkis-dist/src/main/assembly/distribution.xml` 添加jdbc引擎
```shell script
 <!--jdbc-->
    <fileSet>
      <directory>
        ../../linkis-engineconn-plugins/jdbc/target/out/
      </directory>
      <outputDirectory>lib/linkis-engineconn-plugins/</outputDirectory>
      <includes>
        <include>**/*</include>
      </includes>
</fileSet>
```
step2 如果已经全量编译，可以直接重新编译`linkis-dist`模块，如果没有，这执行全量编译

### 3.3 如何在全量编译时跳过指定引擎
可使用mvn指令中的`-pl`选项，详情可参考如下
```
-pl,--projects <arg>                   Comma-delimited list of specified
                                        reactor projects to build instead
                                        of all projects. A project can be
                                        specified by [groupId]:artifactId
                                        or by its relative path.
```
通过`!`实现反选，从而排除指定的引擎，缩短全量编译所需时间，以flink、sqoop和hive为例，跳过这些引擎进行编译:
```
mvn clean install -Dmaven.test.skip=true \
-pl '!linkis-engineconn-plugins/flink,!linkis-engineconn-plugins/sqoop,!linkis-engineconn-plugins/hive'
```

## 4. 如何修改Linkis的依赖的Hadoop、Hive、Spark版本

请注意：Hadoop 作为大数据基础服务，Linkis 必须依赖 Hadoop 进行编译；
而 Spark、Hive等计算存储引擎则不然，如果您不想使用某个引擎，可以无需设置该引擎的版本，无需编译该引擎插件。

具体而言，修改 Hadoop 的版本与 Spark、Hive 等计算引擎的方式不同，下面详细介绍：

### 4.1 如何修改 Linkis 依赖的 Hadoop 版本

进入 Linkis 源码包根目录，手动修改 pom.xml 文件的 Hadoop 版本信息，具体如下：

```bash
    cd incubator-linkis-x.x.x
    vim pom.xml
```

```xml
    <properties>
      
        <hadoop.version>2.7.2</hadoop.version> <!--> 在这里修改Hadoop版本号 <-->
        <scala.version>2.11.12</scala.version>
        <jdk.compile.version>1.8</jdk.compile.version>
              
    </properties>
```
:::caution 注意
**请注意：如果你的hadoop版本是hadoop3，需要修改linkis-hadoop-common的pom文件**
:::

因为在hadoop2.8以下的时候，hdfs相关的class是在hadoop-hdfs模块中的，但是在hadoop 3.X中将对应的class移动到了模块hadoop-hdfs-client当中，您需要修改下这个文件：

pom:Linkis/linkis-commons/linkis-hadoop-common/pom.xml
修改依赖hadoop-hdfs为hadoop-hdfs-client：
```
 <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-hdfs</artifactId>  <!-- 只需要将该行替换即可，替换为 <artifactId>hadoop-hdfs-client</artifactId>-->
        <version>${hadoop.version}</version>
</dependency>
 将hadoop-hdfs修改为：
 <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-hdfs-client</artifactId>
        <version>${hadoop.version}</version>
</dependency>
```

### 4.2 如何修改 Linkis 依赖的 Spark、Hive 版本

这里以修改 Spark 的版本为例进行介绍。进入 Spark 引擎所在的目录，手动修改 pom.xml 文件的 Spark 版本信息，具体如下：

```bash
    cd incubator-linkis-x.x.x/linkis-engineconn-plugins/spark
    vim pom.xml
```

```xml
    <properties>
        <spark.version>2.4.3</spark.version>  <!--> 在这里修改Spark版本号 <-->  
    </properties>
```

修改其他引擎的版本与修改 Spark 版本类似，先进入相关引擎所在的目录，手动修改 pom.xml 文件的引擎版本信息即可。

然后请参考 [编译某个引擎](#32-如何编译某个引擎)
