---
title: License Notes
sidebar_position: 0.1
---

> Note: This article applies to Apache projects only.
>This article refers to the Dolphinscheduler project's License Instructions document https://dolphinscheduler.apache.org/zh-cn/community/development/DS-License.html

The open source projects under the ASF (Apache Foundation) have extremely strict requirements for the license. When you contribute code to Linkis, you must follow the Apache rules. In order to avoid the contributors wasting too much time on the license,
This article will explain the ASF-License and how to avoid the license risk when participating in the Linkis project development.

## License file directory description
[Linkis source code](https://github.com/apache/incubator-linkis) The directory related to the license is as follows
```shell script
# in the outermost directory

|-- LICENSE //LICENSE of the project source code
|-- LICENSE-binary //LICENSE of binary package
|-- LICENSE-binary-ui //LICENSE of the front-end web compilation package
|-- NOTICE //NOTICE of project source code
|-- NOTICE-binary // NOTICE of binary package
|-- NOTICE-binary-ui //NOTICE of front-end web binary package
|-- licenses-binary The detailed dependent license file of the binary package
|-- licenses-binary-ui //The license file that the front-end web compilation package depends on in detail

````


## How to legally use third-party open source software on Linkis

When the code you submit has the following scenarios:

- Scenario 1. The source code uses third-party code or static resources. For example, the source code directly uses a code file of another project, and adds text, css, js, pictures, icons, audio and video files. , and modifications made on a third-party basis.
- Scenario 2. The runtime dependencies of the project are added (that is, the final compilation and packaging will be packaged into the released installation package)

- The imported file in Scenario 1 must be a Class A License of [ASF Third Party License Policy](https://apache.org/legal/resolved.html)
- The dependencies introduced in Scenario 2 must be Class A/Class B licenses in [ASF Third Party License Policy](https://apache.org/legal/resolved.html), not Class C licenses

We need to know the NOTICE/LICENSE of the files introduced by our project or jar dependencies, (most open source projects will have NOTICE files), these must be reflected in our project. In Apache's words, "Work" shall be mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work.

### Example Scenario 1
For example, the third-party file `linkis-engineconn-plugins/engineconn-plugins/python/src/main/py4j/py4j-0.10.7-src.zip` is introduced into the source code

Find the source branch of the version corresponding to py4j-0.10.7-src.zip, if there is no `LICENSE/NOTICE` file in the corresponding version branch, select the main branch
- The project source code is located at: https://github.com/bartdag/py4j/tree/0.10.7/py4j-python
- LICENSE file: https://github.com/bartdag/py4j/blob/0.10.7/py4j-python/LICENSE.txt
- NOTICE file: none

The license information of `py4j-0.10.7-src.zip` needs to be specified in the `linkis/LICENSE` file.
The detailed license.txt file corresponding to `py4j-0.10.7-src.zip` is placed in the same level directory `linkis-engineconn-plugins/engineconn-plugins/python/src/main/py4j/LICENSE-py4j-0.10 .7-src.txt`
Since https://github.com/bartdag/py4j/tree/0.10.7/py4j-python does not have a NOTICE file, there is no need to append to the `linkis/NOTICE` file.

### Example Scene 2

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

## License detection rules
We build a license-check script for our own project to ensure that we can avoid license problems as soon as we use it.

When we need to add new Jars or other external resources, we need to follow these steps:

* Add the jar name + version you need in tool/dependencies/known-dependencies.txt.
* Add relevant license information in LICENSE/LICENSE-binary/LICENSE-binary-ui (depending on the actual situation).
* Append the relevant NOTICE file to NOTICE/NOTICE-binary/NOTIC-binary-ui (determined according to the actual situation). This file must be consistent with the NOTICE file in the code version repository of the dependencies.

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


## Appendix
Attachment: Mail format of new jar
````
[VOTE][New Jar] jetcd-core(registry plugin support etcd3 )


(state the purpose, and what the jar needs to be added) Hi, the registry SPI will provide the implementation of etcd3. Therefore, we need to introduce a new jar (jetcd-core, jetcd-launcher (test)), which complies with the Apache-2.0 License. I checked his related dependencies to make sure it complies with the license of the Apache project.

new jar :

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

Related addresses: mainly github address, license file address, notice file address, maven central warehouse address

github address: https://github.com/etcd-io/jetcd


license: https://github.com/etcd-io/jetcd/blob/master/LICENSE


notice: https://github.com/etcd-io/jetcd/blob/master/NOTICE


Maven repository:


https://mvnrepository.com/artifact/io.etcd/jetcd-core


https://mvnrepository.com/artifact/io.etcd/jetcd-launcher
````

## Reference articles
* [COMMUNITY-LED DEVELOPMENT "THE APACHE WAY"](https://apache.org/dev/licensing-howto.html)
* [ASF 3RD PARTY LICENSE POLICY](https://apache.org/legal/resolved.html)