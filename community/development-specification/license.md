---
title: License Notes
sidebar_position: 0.1
---

> Note: This article applies to Apache projects only.
>This article refers to the Dolphinscheduler project's License Instructions document https://dolphinscheduler.apache.org/zh-cn/docs/dev/user_doc/contribute/join/DS-License.html

The open source projects under the ASF (Apache Foundation) have extremely strict requirements for the license. When you contribute code to Linkis, you must follow the Apache rules. In order to avoid the contributors wasting too much time on the license,
This article will explain the ASF-License and how to avoid the license risk when participating in the Linkis project development.

## 1.License file directory description

License related can be divided into 3 parts
- The main scenarios that need to be paid attention to are: in the project source code, the resources are directly included in the project (such as the direct use of video files, sample files, code JAVA of other projects, additions, icons, audio sources) and other files, and modifications made on the basis )
- The packaging of the project will be packaged and released. The main scenarios that need to be paid attention to are: the running and installation dependencies of the dependent jar packages in the dependencies, and the pom, that is, the packaging of the dependencies, will be packaged in
- The situation that the material installation package of the management console needs to be paid attention to: the additional dependency packages that are dependent on the front-end web are configured through linkweb/package.json

[Linkis source code](https://github.com/apache/incubator-linkis) The directory related to the license is as follows
```shell script
# the outermost directory starts

├── LICENSE  //LICENSE of the project source code Some files without asf header or the introduction of external resources need to be marked here
├── NOTICE   //The NOTICE of the project source code generally does not change
├── licenses  //Introduction of third-party component licenses at the project source level
│   └── LICENSE-py4j-0.10.9.5-src.txt
├── linkis-dist  
│   └── release-docs 
│       ├── LICENSE   //Summary of license information of the third-party jar packages that depend on the compiled installation package
│       ├── licenses   //Details of the license information corresponding to the third-party jar package dependent on the compiled installation package
│       │   ├── LICENSE-log4j-api.txt
│       │   ├── LICENSE-log4j-core.txt
│       │   ├── LICENSE-log4j-jul.txt
│       │   ├── LICENSE-xxxx.txt
│       └── NOTICE  //A summary of NOTICE of dependent third-party jar packages in the compiled installation package
├── linkis-web 
    └── release-docs
        ├── LICENSE  //LICENSE information summary of the third-party npm dependencies of the front-end web compilation and installation package
        ├── licenses  //The license information corresponding to the third-party npm dependencies of the front-end web compilation and installation package is detailed
        │   ├── LICENSE-vuedraggable.txt
        │   ├── LICENSE-vue-i18n.txt
        │   ├── LICENSE-vue.txt
        │   ├── LICENSE-vuescroll.txt
        │   └── LICENSE-xxxx.txt
        └── NOTICE //A summary of NOTICE dependent on third-party npm for front-end web compilation and installation packages



````


## 2.How to legally use third-party open source software on Linkis

When the code you submit has the following scenarios:

- Scenario 1. The source code has added(removed) third-party code or static resources. For example, the source code directly uses a code file of another project, and adds text, css, js, pictures, icons, audio and video files. , and modifications made on a third-party basis.
- Scenario 2. The runtime dependencies of the project are added(removed) (runtime dependencies:the final compilation and packaging will be packaged into the released installation package)

- The imported file in Scenario 1 must be a Class A License of [ASF Third Party License Policy](https://apache.org/legal/resolved.html)
- The dependencies introduced in Scenario 2 must be Class A/Class B licenses in [ASF Third Party License Policy](https://apache.org/legal/resolved.html), not Class C licenses

We need to know the NOTICE/LICENSE of the files introduced by our project or jar dependencies, (most open source projects will have NOTICE files), these must be reflected in our project. In Apache's words, "Work" shall be mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work.

### 2.1 Example Scenario 1
For example, the third-party file `linkis-engineconn-plugins/python/src/main/py4j/py4j-0.10.7-src.zip` is introduced into the source code

Find the source branch of the version corresponding to py4j-0.10.7-src.zip, if there is no `LICENSE/NOTICE` file in the corresponding version branch, select the main branch
- The project source code is located at: https://github.com/bartdag/py4j/tree/0.10.7/py4j-python
- LICENSE file: https://github.com/bartdag/py4j/blob/0.10.7/py4j-python/LICENSE.txt
- NOTICE file: none

The license information of `py4j-0.10.7-src.zip` needs to be specified in the `linkis/LICENSE` file.
The detailed license.txt file corresponding to `py4j-0.10.7-src.zip` is placed in the same level directory `linkis-engineconn-plugins/python/src/main/py4j/LICENSE-py4j-0.10 .7-src.txt`
Since https://github.com/bartdag/py4j/tree/0.10.7/py4j-python does not have a NOTICE file, there is no need to append to the `linkis/NOTICE` file.

### 2.2 Example Scene 2

The compilation of the project depends on `org.apache.ant:ant:1.9.1`, and ant-1.9.1.jar will be compiled and installed in the final package `target/apache-linkis-xxx-incubating-bin/linkis-package/lib `medium
You can decompress ant-1.9.1.jar and extract the LICENSE/NOTICE file from the jar package. If not, you need to find the corresponding version source code
Find the source branch of the version corresponding to py4j-0.10.7-src.zip, if the corresponding version branch is not available, select the main branch
- The project source code is located at: https://github.com/apache/ant/tree/rel/1.9.1
- LICENSE file: https://github.com/apache/ant/blob/rel/1.9.1/LICENSE
- NOTICE file: https://github.com/apache/ant/blob/rel/1.9.1/NOTICE

The license information of `ant-1.9.1.jar` needs to be specified in the `linkis/LICENSE-binary` file.
The detailed license.txt file corresponding to `ant-1.9.1.jar` is placed in `licenses-binary/LICENSE-ant.txt`
The detailed notice.txt corresponding to `ant-1.9.1.jar` is appended to the `NOTICE-binary` file

Regarding the specific open source protocol usage protocols, I will not introduce them one by one here. If you are interested, you can check them yourself.

## 3.License detection rules
We build a license-check script for our own project to ensure that we can avoid license problems as soon as we use it.

When we need to add new Jars or other external resources, we need to follow these steps:

* Add the jar name + version you need in tool/dependencies/known-dependencies.txt.
* Add relevant license information in linkis-web/release-docs/LICENSE (depending on the actual situation).
* Append the relevant NOTICE file to linkis-web/release-docs/NOTICE (determined according to the actual situation). This file must be consistent with the NOTICE file in the code version repository of the dependencies.

:::caution Note
If the scenario is to remove, then the corresponding reverse operation of the above steps needs to remove the corresponding LICENSE/NOTICE content in the corresponding file. In short, it is necessary to ensure that these files are consistent with the data of the actual source code/compiled package
- known-dependencies.txt
- LICENSE/LICENSE-binary/LICENSE-binary-ui
- NOTICE/NOTICE-binary/NOTICE-binary-ui
:::


** check dependency license fail**

After compiling, execute the tool/dependencies/diff-dependenies.sh script to verify
````
--- /dev/fd/63 2020-12-03 03:08:57.191579482 +0000
+++ /dev/fd/62 2020-12-03 03:08:57.191579482 +0000
@@ -1,0 +2 @@
+HikariCP-java6-2.3.13.jar
@@ -16,0 +18 @@
+c3p0-0.9.5.2.jar
@@ -149,0 +152 @@
+mchange-commons-java-0.2.11.jar
Error: Process completed with exit code 1.
````
Generally speaking, the work of adding a jar is often not so easy to end, because it often depends on various other jars, and we also need to add corresponding licenses for these jars.
In this case, we will get the error message of check dependency license fail in check. As above, we are missing the license statement of HikariCP-java6-2.3.13, c3p0, etc.
Follow the steps to add jar to add it.


## 4.Appendix
Attachment: Mail format of new jar
````
[VOTE][New/Remove Jar] jetcd-core(registry plugin support etcd3 )


(state the purpose, and what the jar needs to be added) 
Hi, the registry SPI will provide the implementation of etcd3. Therefore, we need to introduce a new jar (jetcd-core, jetcd-launcher (test)), which complies with the Apache-2.0 License. I checked his related dependencies to make sure it complies with the license of the Apache project.

new or remove jar :

jetcd-core version -x.x.x license apache2.0
jetcd-launcher (test) version -x.x.x license apache2.0

Dependent jar (which jars it depends on, preferably the accompanying version, and the relevant license agreement):
grpc-core version -x.x.x license XXX
grpc-netty version -x.x.x license XXX
grpc-protobuf version -x.x.x license XXX
grpc-stub version -x.x.x license XXX
grpc-grpclb version -x.x.x license XXX
netty-all version -x.x.x license XXX
failsafe version -x.x.x license XXX

If it is a new addition, the email needs to attach the following content
Related addresses: mainly github address, license file address, notice file address, maven central warehouse address

github address: https://github.com/etcd-io/jetcd
license: https://github.com/etcd-io/jetcd/blob/master/LICENSE
notice: https://github.com/etcd-io/jetcd/blob/master/NOTICE

Maven repository:
https://mvnrepository.com/artifact/io.etcd/jetcd-core
https://mvnrepository.com/artifact/io.etcd/jetcd-launcher
````

## 5.Reference articles
* [COMMUNITY-LED DEVELOPMENT "THE APACHE WAY"](https://apache.org/dev/licensing-howto.html)
* [ASF 3RD PARTY LICENSE POLICY](https://apache.org/legal/resolved.html)