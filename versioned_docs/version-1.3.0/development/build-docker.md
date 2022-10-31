---
title: How to Build Docker Image
sidebar_position: 1.2
---

## Linkis Image Components

Starting from version 1.3.0, Linkis introduces some Docker images, and the Dockerfile files for all the images are in the `linkis-dist/docker` directory.

Images currently included as below:

### linkis-base
  
  - __Dockerfile__: 
    - File: linkis.Dockerfile
    - Arguments, which can be overridden with the `-build-arg` option of the `docker build` command: 
      * JDK_VERSION: JDK version, default is 1.8.0-openjdk
      * JDK_BUILD_REVISION: JDK release version, default is 1.8.0.332.b09-1.el7_9
  - __Description__: Linkis service Base image for Linkis service, mainly used for pre-installation of external libraries, initialization of system environment and directory. This image does not need to be updated frequently, and can be used to speed up the creation of Linkis images by using docker's image caching mechanism.

### linkis
  - __Dockerfile__: 
    - File Name: linkis.Dockerfile
    - Arguments:
      * LINKIS_VERSION: Linkis Version, default is 0.0.0
      * LINKIS_SYSTEM_USER: System user, default is hadoop 
      * LINKIS_SYSTEM_UID: System user UID, default is 9001
      * LINKIS_HOME: Linkis home directory, default is /opt/linkis , the binary packages and various scripts will be deployed here
      * LINKIS_CONF_DIR: Linkis configuration directory, default is /etc/linkis-conf
      * LINKIS_LOG_DIR: Linkis log directory, default is /var/logs/linkis
  - __Description__: Linkis service image, it contains binary packages of all components of Apache Linkis and various scripts.

### linkis-web
  - __Dockerfile__: 
    - File Name: linkis.Dockerfile
    - Arguments:
      * LINKIS_VERSION: Linkis Version, default is 0.0.0
      * LINKIS_HOME: Linkis home directory, default is /opt/linkis , Web 相关的包会被放置在 ${LINKIS_HOME}-web 下 
  - __Description__: Linkis Web Console image, it contains binary packages and various scripts for the Apache Linkis web console, which uses nginx as the web server. 

### linkis-ldh
  - __Dockerfile__: 
    - File Name: ldh.Dockerfile
    - Arguments:
      * JDK_VERSION: JDK version, default is 1.8.0-openjdk
      * JDK_BUILD_REVISION: JDK release version, default is 1.8.0.332.b09-1.el7_9
      * LINKIS_VERSION: Linkis Version, default is 0.0.0
      * MYSQL_JDBC_VERSION: MySQL JDBC version, default is 8.0.28
      * HADOOP_VERSION: Apache Hadoop version, default is 2.7.2
      * HIVE_VERSION: Apache Hive version, default is 2.3.3
      * SPARK_VERSION:  Apache Spark version, default is 2.4.3
      * SPARK_HADOOP_VERSION:  Hadoop version suffix of pre-build Apache Spark distrubtion package, default is 2.7. This value cannot be set arbitrarily, and must be consistent with the official release version of Apache Spark, otherwise the relevant component cannot be downloaded automatically.  
      * FLINK_VERSION:  Apache Flink version, default is 1.12.2
      * ZOOKEEPER_VERSION:  Apache Zookeeper version, default is 3.5.9
  - __Description__: LDH is a test-oriented image, LDH image provides a complete, pseudo-distributed mode Apache Hadoop runtime environment, including HDFS, YARN, HIVE, Spark, Flink and Zookeeper. you can easily pull up a full-featured Hadoop environment in the development environment for testing Linkis functionality. The ENTRYPOINT of LDH image is in `linkis-dist/docker/scripts/entry-point-ldh.sh`, some initialization operations, such as format HDFS, are done in this script. 

### Integrate with MySQL JDBC driver

Due to MySQL licensing restrictions, the official Linkis image does not integrate the MySQL JDBC driver, as a result, users need to  by themselves put the MySQL JDBC driver into the container before using the Linkis. To simplify this process, we provide a Dockerfile:

- File Name: linkis-with-mysql-jdbc.Dockerfile
- Arguments:
  * LINKIS_IMAGE: Linkis image name with tag, based on which to create a custom image containing the MySQL JDBC driver, default is `linkis:dev`
  * LINKIS_HOME: Linkis home directory, default is /opt/linkis
  * MYSQL_JDBC_VERSION: MySQL JDBC version, default is 8.0.28

## Build Linkis Images

> Because some Bash scripts are used in the image creation process, Linkis image packaging is currently only supported under Linux/MaxOS. 

### Building images with Maven

Liniks images can be created using Maven commands. 

1. Build image `linkis` 

    ``` shell
    # Building a Linkis image without MySQL JDBC
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
    # Building a Linkis image contains MySQL JDBC
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.with.jdbc=true
    ```
    Note: 
    * The `linkis-base` image will be built on the first build of the `linkis` image, and will not be rebuilt if the Dockerfile has not been modified;
    * Due to the syntax of the Maven POM file, `linkis.build.with.jdbc` is a pseudo-boolean arguments, in fact `-Dlinkis.build.with.jdbc=false` is the same as `-Dlinkis.build.with.jdbc=true`, If you want to express `-Dlinkis.build.with.jdbc=false`, please just remove this arguments. Other arguments are similar. 

2. Build image `linkis-web` 

    ``` shell
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.web=true
    ```

3. Build image `linkis-ldh`

    ``` shell
    $> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.ldh=true
    ```

    Note: 
    * In the process of creating this image, we downloaded the pre-built binary distribution of each hadoop components from the official site [Apache Archives](https://archive.apache.org/dist/). However, due to the network environment in China or other nation/region which is slow to visit Apache site, this approach can be very slow. If you have a faster mirror site, you can manually download the corresponding packages from these sites and move them to the following directory `${HOME}/.linkis-build-cache` to solve this problem. 

All of the above Arguments can be used in combination, so if you want to build all the images at once, you can use the following command:

``` shell
$> ./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.web=true -Dlinkis.build.ldh=true
```

### Building images with `docker build` command

It is much convenient to build an image with maven, but the build process introduces a lot of repetitive compilation process, which cause the whole process is rather long. If you only adjust the internal structure of the image, such as directory structure, initialization commands, etc., you can use the `docker build` command to quickly build the image for testing after the first time using the Maven command to build the image. 

An example of building a `linkis-ldh` image using the `docker build` command is as follows:

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

For other images, please refer to the relevant profile in `linkis-dist/pom.xml`.
