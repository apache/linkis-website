---
title: 在本地开发调试Linkis的源码
authors: [介龙平]
tags: [blog,guide]
---
> 本文详细记录了如何在 IDEA 中配置和启动 Linkis 的各个微服务，并实现 JDBC、Python、Shell 等脚本的提交和执行。
###1 代码调试环境
- Mac OS m1 芯片，Linkis 的linkis-cg-engineplugin和linkis-cg-engineconnmanager两个服务暂不支持在 Windows 上进行调试，可参考官网的开发文档进行远程调试。
- Zulu openjdk 1.8
- maven3.6.3
- Linkis 1.2.0（开发中） ，本篇文章理论上可支持对 Linkis1.0.3 和以上版本的本地开发调试
###2 准备代码并编译

```shell script
git clone git@github.com:apache/incubator-linkis.git

cd incubator-linkis

git checkout dev-1.2.0 
```
克隆 Linkis 的源码到本地，并用 IDEA 打开，首次打开项目会从 maven 仓库中下载 Linkis 项目编译所需的依赖 jar 包。当依赖 jar 包加载完毕之后，运行如下编译打包命令。
```shell script
mvn -N install
mvn clean Install
```
编译命令运行成功之后，在目录 incubator-linkis/linkis-dist/target/下可找到编译好的安装包：apache-linkis-版本号-incubating-bin.tar.gz
###3 配置并启动服务
####3.1 add mysql-connector-java 到 classpath 中
服务启动过程中如果遇到 mysql 驱动类找不到的情况，可以把 mysql-connector-java-版本号.jar 添加到对应服务模块的 classpath 下，详细操作请参考 3.5 小节。

目前依赖 mysql 的服务有：
- linkis-mg-gateway
  
- linkis-ps-publicservice
  
- linkis-cg-linkismanage
####3.2调整 log4j2.xml 配置
在 Linkis 源码文件夹下，子目录 linkis-dist/package/conf 中，是 Linkis 的一些默认配置文件，首先对 log4j2.xml 文件进行编辑，在其中增加日志输出到控制台的配置。

更多内容请访问 https://mp.weixin.qq.com/s?__biz=MzI4MDkxNzUxMg==&mid=2247489146&idx=1&sn=b455fbda66d6714693681eb53182caee&chksm=ebb0751ddcc7fc0b6cc43226a34fb4e72724b4fb4a359171d686f294025a814dfc416e3eef1d&token=173691862&lang=zh_CN#rd

