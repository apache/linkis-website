---
title: Docker 编译
sidebar_position: 5.0
---

## Linkis 镜像组成

从1.3.0版本起，Linkis引入了一些 Docker 镜像，项目所有镜像的 Dockerfile 文件都在`linkis-dist/docker`目录下。

目前由如下几个镜像组成:

### linkis-base
  
  - __Dockerfile__: 
    - 文件名: linkis.Dockerfile
    - 参数, 可以通过 `docker build` 命令的 `--build-arg` 参数来重载：
      * JDK_VERSION: JDK 版本，默认为 1.8.0-openjdk
      * JDK_BUILD_REVISION: JDK 发布版本, 默认为 1.8.0.332.b09-1.el7_9
  - __说明__: Linkis服务基础镜像，主要用于预安装 Linkis 系统需要的外部库，初始化系统环境和目录。本镜像不需要经常更新，利用 docker 的镜像缓存机制，可以加速 Linkis 镜像的制作。

### linkis
  - __Dockerfile__: 
    - 文件名: linkis.Dockerfile
    - 参数:
      * LINKIS_VERSION: Linkis 版本号，默认为 0.0.0
      * LINKIS_SYSTEM_USER: 系统用户，默认为 hadoop 
      * LINKIS_SYSTEM_UID: 系统用户UID, 默认为 9001
      * LINKIS_HOME: Linkis 主目录，默认为 /opt/linkis , 系统的二进制包和各类脚本会部署到这里
      * LINKIS_CONF_DIR: Linkis 配置文件目录，默认为 /etc/linkis-conf
      * LINKIS_LOG_DIR: Linkis 日志目录，默认为 /var/logs/linkis
  - __说明__: Linkis服务镜像，镜像中包含了 Apache Linkis 的所有组件的二进制包和各类脚本。

### linkis-web
  - __Dockerfile__: 
    - 文件名: linkis.Dockerfile
    - 参数:
      * LINKIS_VERSION: Linkis 版本号，默认为 0.0.0
      * LINKIS_HOME: Linkis 主目录，默认为 /opt/linkis , Web 相关的包会被放置在 ${LINKIS_HOME}-web 下 
  - __说明__: Linkis Web 控制台镜像，镜像中包含了 Apache Linkis Web 控制台的的二进制包和各类脚本，本镜像使用 nginx 作为 Web 服务器。

### linkis-ldh
  - __Dockerfile__: 
    - 文件名: ldh.Dockerfile
    - 参数:
      * JDK_VERSION: JDK 版本，默认为 1.8.0-openjdk
      * JDK_BUILD_REVISION: JDK 发布版本, 默认为 1.8.0.332.b09-1.el7_9
      * LINKIS_VERSION: Linkis 版本号，默认为 0.0.0
      * MYSQL_JDBC_VERSION: MySQL JDBC 版本，默认为 8.0.28
      * HADOOP_VERSION: Apache Hadoop 组件版本，默认为 2.7.2
      * HIVE_VERSION: Apache Hive 组件版本，默认为 2.3.3
      * SPARK_VERSION:  Apache Spark 组件版本，默认为 2.4.3
      * SPARK_HADOOP_VERSION:  预编译的 Apache Spark 发布包 Hadoop 版本后缀，默认为 2.7，该值不能任意设置，需要和 Apache Spark 官方发布版本保持一致，否则无法自动下载相关组件 
      * FLINK_VERSION:  Apache Flink 组件版本，默认为 1.12.2
      * ZOOKEEPER_VERSION:  Apache Zookeeper 组件版本，默认为 3.5.9
  - __说明__: LDH 是一个面向测试用途的镜像，LDH 镜像提供了一套完整的、伪分布式模式的 Apache Hadoop 运行环境，包含了 HDFS, YARN, HIVE, Spark, Flink 和 Zookeeper, 可以很方便的在开发环境中拉起一个全真的 Hadoop 环境用来测试 Linkis 的功能。LDH 镜像的 ENTRYPOINT 为 `linkis-dist/docker/scripts/entry-point-ldh.sh`，一些初始化操作，如 HDFS 的 format 操作都是在这个脚本中完成的。

### 集成 MySQL JDBC

由于MySQL的许可协议限制，官方发布的 Linkis 镜像没有集成 MySQL JDBC 驱动，用户在使用 Linkis 容器前需要自行将 MySQL JDBC 驱动放置到容器中。为了简化这个过程，我们提供了一个 Dockerfile:

- 文件名: linkis-with-mysql-jdbc.Dockerfile
- 参数:
  * LINKIS_IMAGE: Linkis 镜像名，基于这个镜像来制作包含 MySQL JDBC 驱动的自定义镜像, 默认为 `linkis:dev`
  * LINKIS_HOME: Linkis 主目录，默认为 /opt/linkis
  * MYSQL_JDBC_VERSION: MySQL JDBC 版本，默认为 8.0.28

## Linkis 镜像制作

> 因为镜像制作过程中使用了一些 Bash 脚本，目前仅支持在 Linux/MaxOS 下完成 Linkis 镜像打包的工作。

### 使用 Maven 构建镜像

Linkis 镜像制作过程都已经集成到项目的 Maven Profile 中，可以通过 Maven 命令实现 Liniks 镜像的制作。

1. 构建 `linkis` 镜像

    ``` shell
    # 构建不包含 MySQL JDBC 的 Linkis 镜像
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
    # 构建包含 MySQL JDBC 的 Linkis 镜像
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.with.jdbc=true
    ```
    需要注意：
    * `linkis-base` 镜像会在 `linkis` 镜像第一次构建时被构建，后续如果 Dockerfile 没有被修改，将不会被重复构建;
    *  受制于 Maven POM 文件的语法，`linkis.build.with.jdbc` 是一个伪布尔参数，实际上`-Dlinkis.build.with.jdbc=false`和`-Dlinkis.build.with.jdbc=true`是一样的，如希望表达`-Dlinkis.build.with.jdbc=false`，请直接将这个参数去掉。其他参数类似。

2. 构建 `linkis-web` 镜像 

    ``` shell
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.web=true
    ```

3. 构建 `linkis-ldh` 镜像 

    ``` shell
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.ldh=true
    ```

    需要注意：
    * 在制作本镜像的过程中，我们从 [Apache Archives](https://archive.apache.org/dist/) 这个官方站点下载每个hadoop组件的预建二进制发行版。但是，受制于国内的网络环境，这种方式可能会非常缓慢。如果你有更快的站点，你可以手动从这些站点下载相应的包，并将其移动到如下这个目录`${HOME}/.linkis-build-cache` 来解决这个问题。

上述参数都可以组合使用，如希望一次性构建所有镜像，可以使用如下命令:

``` shell
$> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.web=true -Dlinkis.build.ldh=true
```

### 使用 docker build 命令构建镜像

使用 Maven 命令构建镜像固然方便，但是构建过程中引入了不少重复的编译过程，整个过程比较漫长。如果仅调整镜像内部结构，如目录结构，初始化命令等，可以在第一次使用 Maven 命令构建镜像后，直接使用`docker build` 命令来快速构建镜像进行测试。

使用 `docker build` 命令构建 linkis-ldh 镜像示例如下:

``` shell
$> docker build -t linkis-ldh:dev --target linkis-ldh -f linkis-dist/docker/ldh.Dockerfile linkis-dist/target

[+] Building 0.2s (19/19) FINISHED                                                                                                                                                                                      
 => [internal] load build definition from ldh.Dockerfile               0.0s
 => => transferring dockerfile: 41B                                    0.0s
 => [internal] load .dockerignore                                      0.0s
 => => transferring context: 2B                                        0.0s
 => [internal] load metadata for docker.io/library/centos:7            0.0s
 => [ 1/14] FROM docker.io/library/centos:7                            0.0s
 => [internal] load build context                                      0.0s
 => => transferring context: 1.93kB                                    0.0s
 => CACHED [ 2/14] RUN useradd -r -s ...                               0.0s
 => CACHED [ 3/14] RUN yum install -y       ...                        0.0s
 ...
 => CACHED [14/14] RUN chmod +x /usr/bin/start-all.sh                  0.0s
 => exporting to image                                                 0.0s
 => => exporting layers                                                0.0s
 => => writing image sha256:aa3bde0a31bf704413fb75673fc2894b03a0840473d8fe15e2d7f7dd22f1f854     0.0s
 => => naming to docker.io/library/linkis-ldh:dev 
```

其他镜像的构建命令请参考 `linkis-dist/pom.xml` 中相关的 profile.
