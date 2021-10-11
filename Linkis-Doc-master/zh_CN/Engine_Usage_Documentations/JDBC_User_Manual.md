# JDBC 引擎使用文档

本文主要介绍在Linkis1.0中，JDBC引擎的配置、部署和使用。

## 1.JDBC引擎使用前的环境配置

如果您希望在您的服务器上使用JDBC引擎，您需要准备JDBC连接信息，如MySQL数据库的连接地址、用户名和密码等

## 2.JDBC引擎的配置和部署

### 2.1 JDBC版本的选择和编译

JDBC引擎不需要用户自行编译，直接使用编译好的JDBC引擎插件包即可。已经提供的Driver包括有MySQL，PostgreSQL等

### 2.2 JDBC engineConn部署和加载

此处可以使用默认的加载方式即可正常使用，按照标准版本安装即可。

### 2.3 JDBC引擎的标签

此处可以使用默认的dml.sql进行插入即可正常使用。

## 3.JDBC引擎的使用

### 准备操作

您需要配置JDBC的连接信息，包括连接地址信息和用户名以及密码。

![](../Images/EngineUsage/jdbc-conf.png)

图3-1 JDBC配置信息

### 3.1 Scriptis的使用方式

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建JDBC脚本并编写JDBC代码并点击执行。

JDBC的执行原理是通过加载JDBC的Driver然后提交sql到SQL的server去执行并获取到结果集并返回。

![](../Images/EngineUsage/jdbc-run.png)

图3-2 JDBC的执行效果截图

### 3.2工作流的使用方式

DSS工作流也有JDBC的节点，您可以拖入工作流节点，然后双击进入然后进行编辑代码，然后以工作流的形式进行执行。

### 3.3 Linkis Client的使用方式

Linkis也提供了client的方式进行调用JDBC的任务，调用的方式是通过LinkisClient提供的SDK的方式。我们提供了java和scala两种方式进行调用，具体的使用方式可以参考<https://github.com/WeBankFinTech/Linkis/wiki/Linkis1.0%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3>。

## 4.JDBC引擎的用户设置

JDBC的用户设置是主要是的JDBC的连接信息，但是建议用户将此密码等信息进行加密管理。
