# Shell 引擎使用文档

本文主要介绍在Linkis1.0中，Shell引擎的配置、部署和使用。

## 1.Shell引擎使用前的环境配置

如果您希望在您的服务器上使用shell引擎，您需要保证用户的PATH中是有bash的执行目录和执行权限。

| 环境变量名 | 环境变量内容 | 备注         |
|------------|--------------|--------------|
| sh执行环境 | bash环境变量 | 建议使用bash |

表1-1 环境配置清单

## 2.Shell引擎的配置和部署

### 2.1 Shell版本的选择和编译

Shell引擎不需要用户自行编译，直接使用编译好的shell引擎插件包即可。

### 2.2 shell engineConn部署和加载

此处可以使用默认的加载方式即可正常使用。

### 2.3 shell引擎的标签

此处可以使用默认的dml.sql进行插入即可正常使用。

## 3.Shell引擎的使用

### 准备操作

在linkis上提交shell之前，您只需要保证您的用户的\$PATH中有shell的路径即可。

### 3.1 Scriptis的使用方式

Scriptis的使用方式是最简单的，您可以直接进入Scriptis，右键目录然后新建shell脚本并编写shell代码并点击执行。

shell的执行原理是shell引擎通过java自带的ProcessBuilder启动一个系统进程来进行执行，并且将进程的输出重定向到引擎并写入到日志中。

![](../Images/EngineUsage/shell-run.png)

图3-1 shell的执行效果截图

### 3.2工作流的使用方式

DSS工作流也有shell的节点，您可以拖入工作流节点，然后双击进入然后进行编辑代码，然后以工作流的形式进行执行。

Shell执行需要注意一点，在工作流中如果是多行执行的话,工作流节点是否成功是由最后一个命令确定，比如前两行是错的,但是最后一行的shell返回值是0，那么这个节点是成功的。

### 3.3 Linkis Client的使用方式

Linkis也提供了client的方式进行调用shell的任务，调用的方式是通过LinkisClient提供的SDK的方式。我们提供了java和scala两种方式进行调用，具体的使用方式可以参考<https://github.com/WeBankFinTech/Linkis/wiki/Linkis1.0%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3>。

## 4.Shell引擎的用户设置

shell引擎一般可以设置引擎JVM的最大内存。
