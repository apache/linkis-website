---
title: 编程规约
sidebar_position: 1
---
## 1. 命名规约
1. 【**强制**】不要用中文拼音和看不懂的缩写
2. 基本的Java命名规范可以参考[naming-conventions](https://alibaba.github.io/Alibaba-Java-Coding-Guidelines/#naming-conventions)
3. 【约束】在linkis中有scalastyle风格配置文件，如果不符合规范的需要按照scalastyle的风格进行命名
4. 【**强制**】配置文件命令、启动命名、进程命名、配置的key等也需要遵守命名规范，规范如下：

|分类|	风格|	规范|    例子|
|:----  |:---   |:---   |:---   |
|配置文件|小写'-'分隔|	linkis-分类层级（ps/cg/mg）-服务名.propertis| linkis-cg-linkismanager.properties|
|启停脚本|小写'-'分隔|	linkis-分类层级-服务名|	linkis-cg-linkismanager|
|模块目录|小写'-'分隔|	模块目录必须在对应的分类层级下面，并以模块名为子目录| linkis-public-enhancements/linkis-bml|
|进程命名|驼峰命名|	以Linkis开头服务名结尾| LinkisBMLApplication|
|配置Key命名|小写'.'分隔|	linkis+模块名+keyName|	linkis.bml.hdfs.prefix|

## 2. 注释规约
1. 【**强制**】类、类属性、接口方法必须加注释，且注释必须使用 Javadoc 规范，使用`/**内容*/`格式
2. 【**强制**】所有的抽象方法（包括接口中的方法）必须要用 Javadoc 注释、除了返回值、参数、 异常说明外，还必须指出该方法做什么事情，实现什么功能
