---
title: License 须知
sidebar_position: 0.1
---

>注：本文仅适用于Apache项目。
>本文参考 Dolphinscheduler项目的License须知文档 https://dolphinscheduler.apache.org/zh-cn/community/development/DS-License.html

ASF(Apache基金会)下的开源项目，对于License有着极其严苛的要求，当您为Linkis贡献代码时，就必须按照Apache的规则来,为了避免贡献者在License上浪费过多的时间，
本文将为您讲解ASF—License以及参与 Linkis 项目开发时如何规避掉License风险。

## 1.License 文件目录说明 

licence相关的可以划分为3部分
- 源码级别  主要需要关注的场景是： 在项目工程源码中，直接引入第三方资源（如 直接使用了某个其他项目的代码JAVA文件，新增了文本、css、js、图片、图标、音视频等文件，以及在第三方基础上做的修改）
- 项目的安装物料包  主要需要关注的场景是： 依赖的第三方jar包的运行态依赖，pom 配置中 通过dependency依赖引入 即最后编译打包会被打包到发布的安装包中的
- 管理台的安装物料包  主要需要关注的场景是：前端web编译依赖的第三方npm依赖包 通过linkis-web/package.json 配置引入


[Linkis源码](https://github.com/apache/incubator-linkis)涉及到license的目录如下

```shell script
# 最外层目录开始

├── LICENSE  //项目源码的LICENSE  一些没有asf header的文件或则引入外部资源需要在这里标明 
├── NOTICE   //项目源码的NOTICE 一般不会变动 
├── licenses  //项目源码级别引入第三方组件license 说明 
│   └── LICENSE-py4j-0.10.9.5-src.txt
├── linkis-dist  
│   └── release-docs 
│       ├── LICENSE   //编译的安装包中依赖的第三方jar包的license信息汇总 
│       ├── licenses   //编译的安装包中依赖的第三方jar包对应的license信息详细 
│       │   ├── LICENSE-log4j-api.txt
│       │   ├── LICENSE-log4j-core.txt
│       │   ├── LICENSE-log4j-jul.txt
│       │   ├── LICENSE-xxxx.txt
│       └── NOTICE  //编译的安装包中依赖的第三方jar包的NOTICE 汇总 
├── linkis-web 
    └── release-docs
        ├── LICENSE  //前端web编译安装包第三方npm依赖的LICENSE信息汇总  
        ├── licenses  //前端web编译安装包第三方npm依赖对应的license信息详细 
        │   ├── LICENSE-vuedraggable.txt
        │   ├── LICENSE-vue-i18n.txt
        │   ├── LICENSE-vue.txt
        │   ├── LICENSE-vuescroll.txt
        │   └── LICENSE-xxxx.txt
        └── NOTICE //前端web编译安装包第三方npm依赖的NOTICE 汇总  
        

```


## 2.如何在 Linkis 合法的使用第三方开源软件

当你提交的代码有如下场景时：

- 场景1. 源码中有新增(或移除)使用第三方代码或则静态资源，如源码中直接使用了某个其他项目的代码文件文件，新增了文本、css、js、图片、图标、音视频等文件，以及在第三方基础上做的修改。
- 场景2. 项目的运行态依赖有新增(或移除)(运行态依赖:即最后编译打包会被打包到发布的安装包中的)

- 场景1中的引入的文件必须是[ASF第三方许可证策](https://apache.org/legal/resolved.html)的A类License 
- 场景2中的引入的依赖必须是[ASF第三方许可证策](https://apache.org/legal/resolved.html)中的A类/B类License，不能是C类License

我们需要知道被我们项目引入的文件或jar依赖的NOTICE/LICENSE,（绝大多数的开源项目都会有NOTICE文件），这些必须在我们的项目中体现，用Apache的话来讲，就是"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a
copyright notice that is included in or attached to the work.

### 2.1 示例 场景1
比如源码中引入了`linkis-engineconn-plugins/python/src/main/py4j/py4j-0.10.7-src.zip`第三方文件

找到py4j-0.10.7-src.zip 对应的版本源码分支，如果对应版本分支无`LICENSE/NOTICE`文件，则选择主分支
- 项目源码位于:https://github.com/bartdag/py4j/tree/0.10.7/py4j-python
- LICENSE文件:https://github.com/bartdag/py4j/blob/0.10.7/py4j-python/LICENSE.txt
- NOTICE文件:无

需要在`linkis/LICENSE`文件中说明`py4j-0.10.7-src.zip`的license信息。
`py4j-0.10.7-src.zip`对应的详细的license.txt文件放在同级的目录下`linkis-engineconn-plugins/python/src/main/py4j/LICENSE-py4j-0.10.7-src.txt`
因为https://github.com/bartdag/py4j/tree/0.10.7/py4j-python 没有NOTICE文件，所以`linkis/NOTICE`文件中无需追加。

### 2.2 示例 场景 2

项目编译依赖了`org.apache.ant:ant:1.9.1`,ant-1.9.1.jar会在最后的编译安装包`target/apache-linkis-x.x.x-incubating-bin/linkis-package/lib`中
可以解压ant-1.9.1.jar，从jar包中提取LICENSE/NOTICE文件，如果没有，则需要找到对应的版本源码 
找到py4j-0.10.7-src.zip 对应的版本源码分支，如果对应版本分支没有，则选择主分支
- 项目源码位于:https://github.com/apache/ant/tree/rel/1.9.1
- LICENSE文件:https://github.com/apache/ant/blob/rel/1.9.1/LICENSE
- NOTICE文件:https://github.com/apache/ant/blob/rel/1.9.1/NOTICE

需要在`linkis/LICENSE-binary`文件中说明`ant-1.9.1.jar`的license信息。
`ant-1.9.1.jar`对应的详细的license.txt文件放在`licenses-binary/LICENSE-ant.txt`
`ant-1.9.1.jar`对应的详细的notice.txt，追加到 `NOTICE-binary`文件中

关于具体的各个开源协议使用协议，在此不做过多篇幅一一介绍，有兴趣可以自行查询了解。

##  3.license 检测规则
我们为自己的项目建立license-check脚本，是为了确保我们在使用过程中能够第一时间避免License的问题。

当我们需要添加新的Jar或其他外部资源的时候，我们需要按照以下步骤：

* 在 tool/dependencies/known-dependencies.txt中添加你所需要的jar名称+版本。
* 在 linkis-web/release-docs/LICENSE（根据实际情况决定）中添加相关的license信息。
* 在 linkis-web/release-docs/NOTICE（根据实际情况决定）中追加相关的NOTICE文件，此文件请务必和依赖项的代码版本仓库中的NOTICE文件一致。

:::caution 注意
如果是移除的场景，则对应的上述步骤的反向操作，需要在对应的文件中移除相应的LICENSE/NOTICE内容，总之需要保证这几个文件与实际源码/编译包的数据保持一致
- tool/dependencies/known-dependencies.txt
- LICENSE/LICENSE-binary/LICENSE-binary-ui
- NOTICE/NOTICE-binary/NOTICE-binary-ui
:::

** check dependency license fail**

编译后 执行tool/dependencies/diff-dependenies.sh 脚本验证
```
--- /dev/fd/63	2020-12-03 03:08:57.191579482 +0000
+++ /dev/fd/62	2020-12-03 03:08:57.191579482 +0000
@@ -1,0 +2 @@
+HikariCP-java6-2.3.13.jar
@@ -16,0 +18 @@
+c3p0-0.9.5.2.jar
@@ -149,0 +152 @@
+mchange-commons-java-0.2.11.jar
Error: Process completed with exit code 1.
```
一般来讲，添加一个jar的工作往往不会如此轻易的结束，因为它往往依赖了其它各种各样的jar，这些jar我们同样需要添加相应的license。
这种情况下，我们会在check里面得到 check dependency license fail的错误信息，如上，我们缺少了HikariCP-java6-2.3.13、c3p0等的license声明，
按照添加jar的步骤补充即可。


## 4.附件
附件：新jar的邮件格式 
```
[VOTE][New/Remove Jar] jetcd-core(registry plugin support etcd3 ) 


（说明目的，以及需要添加/移除的 jar 是什么）
Hi, the registry SPI will provide the implementation of etcd3. Therefore, we need to introduce a new jar (jetcd-core, jetcd-launcher (test)), which complies with the Apache-2.0 License. I checked his related dependencies to make sure it complies with the license of the Apache project.

new or remove jar : 

jetcd-core             version -x.x.x   license apache2.0
jetcd-launcher (test)  version -x.x.x   license apache2.0

dependent jar（它依赖了哪些jar，最好附带版本,以及相关采用的license协议）:
grpc-core     version -x.x.x  license XXX
grpc-netty    version -x.x.x  license XXX
grpc-protobuf version -x.x.x  license XXX
grpc-stub     version -x.x.x  license XXX
grpc-grpclb   version -x.x.x  license XXX
netty-all     version -x.x.x  license XXX
failsafe      version -x.x.x  license XXX

如果是新增，邮件需要附上如下内容
相关地址：主要有github地址、license文件地址、notice 文件地址、maven中央仓库地址

github address:https://github.com/etcd-io/jetcd
license:https://github.com/etcd-io/jetcd/blob/master/LICENSE
notice:https://github.com/etcd-io/jetcd/blob/master/NOTICE

Maven repository:
https://mvnrepository.com/artifact/io.etcd/jetcd-core
https://mvnrepository.com/artifact/io.etcd/jetcd-launcher
```

## 5.参考文章
* [COMMUNITY-LED DEVELOPMENT "THE APACHE WAY"](https://apache.org/dev/licensing-howto.html)
* [ASF 3RD PARTY LICENSE POLICY](https://apache.org/legal/resolved.html)

