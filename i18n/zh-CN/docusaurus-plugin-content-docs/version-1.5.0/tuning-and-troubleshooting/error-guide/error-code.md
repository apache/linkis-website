---
title: 常见错误码及处理方法
sidebar_position: 1
---

#### 错误码 01001

**现象**

任务执行过程中报错：错误码 01001，错误信息 您的任务没有路由到后台ECM，请联系管理员
>The em of labels

**原因1**

您的任务没有路由到后台ECM

**解决1**
1. 请检查租户标签是否正确
2. 如果正确联系管理员
---------------------------------
#### 错误码 01002

**现象**

任务执行过程中报错：错误码 01002，错误信息 Linkis服务负载过高，请联系管理员扩容
>Unexpected end of file from server

**原因1**

Linkis服务负载过高，导致服务连接异常

**解决1**

请联系管理员

---------------------------------

#### 错误码 01003

**现象**

任务执行过程中报错：错误码 01003，错误信息 Linkis服务负载过高，请联系管理员扩容
>failed to ask linkis Manager Can be retried SocketTimeoutException

**原因1**

Linkis服务负载过高，导致服务连接超时

**解决1**

联系管理员

---------------------------------

#### 错误码 01004

**现象**

任务执行过程中报错：错误码 01004，错误信息 引擎在启动时被Kill，请联系管理员
>[0-9]+ Killed

**原因1**

引擎在启动时被Kill，这个是因为机器负载过高导致

**解决1**
1. 您可以选择重试
2. 或者联系管理员

---------------------------------

#### 错误码 01005

**现象**

任务执行过程中报错：错误码 01005，错误信息 请求Yarn获取队列信息重试2次仍失败，请联系管理员
>Failed to request external resourceClassCastException

**原因1**

请求Yarn获取队列信息失败，这个是因为配置有问题导致

**解决1**

请联系管理员

---------------------------------

#### 错误码 01101

**现象**

任务执行过程中报错：错误码 01101，错误信息 ECM资源不足，请联系管理员扩容
>ECM resources are insufficient

**原因1**

服务器资源不足导致，可能是高峰期导致

**解决1**
1. 可以进行任务重试
2. 或者联系管理员
---------------------------------

#### 错误码 01102

**现象**

任务执行过程中报错：错误码 01102，错误信息 ECM 内存资源不足，请联系管理员扩容
>ECM memory resources are insufficient

**原因1**

服务器内存资源不足

**解决1**
1. 可以进行任务重试
2. 或者联系管理员
---------------------------------

#### 错误码 01103

**现象**

任务执行过程中报错：错误码 01103，错误信息 ECM CPU资源不足，请联系管理员扩容
>ECM CPU resources are insufficient

**原因1**

服务器CPU资源不足

**解决1**
1. 可以进行任务重试
2. 或者联系管理员
---------------------------------

#### 错误码 01104

**现象**

任务执行过程中报错：错误码 01104，错误信息 实例资源不足，请联系管理员扩容
>ECM Insufficient number of instances

**原因1**

服务器实例资源不足

**解决1**
1. 可以进行任务重试
2. 或者联系管理员
---------------------------------

#### 错误码 01105

**现象**

任务执行过程中报错：错误码 01105，错误信息 机器内存不足，请联系管理员扩容
>Cannot allocate memory

**原因1**

服务器机器内存不足

**解决1**

1. 可以进行任务重试
2. 或者联系管理员
---------------------------------

#### 错误码 12001

**现象**

任务执行过程中报错：错误码 12001，错误信息 队列CPU资源不足，可以调整Spark执行器个数
>Queue CPU resources are insufficient

**原因1**

队列CPU资源不足，超过了您设置的限制值

**解决1**

- 打开DSS平台，点击管理台--参数配置--IDE--Spark--显示高级设置--woker引擎资源设置(2)--调整执行器并发数[spark.executor.instances]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkSetting.png)

- 或者在管理台--参数配置-全局设置调整队列资源使用上限值
---------------------------------

#### 错误码 12002

**现象**

任务执行过程中报错：错误码 12002，错误信息 队列内存资源不足，可以调整Spark执行器个数
>Insufficient queue memory

**原因1**

队列内存资源不足，超过了您设置的队列内存资源值

**解决1**
- 打开DSS平台，点击管理台--参数配置--IDE--Spark--显示高级设置--woker引擎资源设置(2)--调整执行器并发数[spark.executor.instances]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkSetting.png)

- 或者在管理台--参数配置-全局设置调整队列资源使用上限值
---------------------------------

#### 错误码 12003

**现象**

任务执行过程中报错：错误码 12003，错误信息 队列实例数超过限制
>Insufficient number of queue instances

**原因1**

队列实例数超过限制值

**解决1**

- 打开DSS平台，点击管理台--参数配置--全局设置--队列资源--yarn队列实例最大个数[wds.linkis.rm.yarnqueue.instance.max]
- ![](/Images/tuning-and-troubleshooting/error-guide/queueInstanceMax.png)

**备注**


涉及全局设置不推荐用户随意修改，如需修改请与运维沟通后修改。非全局设置参数，用户可自行修改

---------------------------------

#### 错误码 12004

**现象**

任务执行过程中报错：错误码 12004，错误信息 全局驱动器内存使用上限，可以设置更低的驱动内存
>Drive memory resources are insufficient

**原因1**

全局驱动器内存超过上限

**解决1**
- 打开DSS平台，点击管理台--参数配置--全局设置--队列资源--yarn队列实例最大个数[wds.linkis.rm.yarnqueue.instance.max]
- ![](/Images/tuning-and-troubleshooting/error-guide/queueInstanceMax.png)

**解决2**

- 如果队列可用，应用实例数过低，可联系管理员设置

**备注**


涉及全局设置不推荐用户随意修改，如需修改请与运维沟通后修改。非全局设置参数，用户可自行修改

---------------------------------

#### 错误码 12005

**现象**

任务执行过程中报错：错误码 12005，错误信息 超出全局驱动器CPU个数上限，可以清理空闲引擎
>Drive core resources are insufficient

**原因1**

全局驱动器CPU个数超过上限

**解决1**

- 打开DSS平台，点击管理台--参数配置--全局设置--队列资源--队列CPU使用上限[wds.linkis.rm.yarnqueue.cores.max]
- ![](/Images/tuning-and-troubleshooting/error-guide/queueCodesMax.png)

**解决2**

- 清理空闲引擎

**备注**


涉及全局设置不推荐用户随意修改，如需修改请与运维沟通后修改。非全局设置参数，用户可自行修改

---------------------------------

#### 错误码 12006

**现象**

任务执行过程中报错：错误码 12006，错误信息 超出引擎最大并发数上限，可以清理空闲引擎
>Insufficient number of instances

**原因1**

超出引擎最大并发数上限

**解决1**

- 修改配置，全局配置：打开DSS平台，点击管理台--参数配置--全局设置--队列资源--全局各个引擎最大并发数[wds.linkis.rm.instance]
- ![](/Images/tuning-and-troubleshooting/error-guide/MaxInstance.png)
- spark引擎
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkMaxInstance.png)
- hive引擎
- ![](/Images/tuning-and-troubleshooting/error-guide/hiveMaxInstance.png)
- python引擎
- ![](/Images/tuning-and-troubleshooting/error-guide/pythonMaxInstance.png)
- pipeline引擎
- ![](/Images/tuning-and-troubleshooting/error-guide/pipelineMaxInstance.png)

**备注**


涉及全局设置不推荐用户随意修改，如需修改请与运维沟通后修改。非全局设置参数，用户可自行修改

---------------------------------

#### 错误码 12008

**现象**

任务执行过程中报错：错误码 12008，错误信息 获取Yarn队列信息异常,可能是您设置的yarn队列不存在
>获取Yarn队列信息异常

**原因1**

获取Yarn队列信息异常

**解决1**

- 如果集群正常，用户队列配置错误：
- linkis管理台/参数配置>全局设置>yarn队列名[wds.linkis.rm.yarnqueue]
- ![](/Images/tuning-and-troubleshooting/error-guide/yarnQueue.png)

**解决2**

- 如果集群是新集群，先检查LinkisManager的集群配置
  >查看hadoop集群地址: http://ip:8088/cluster
  >
  >查看yarn队列地址：http://ip:8888/cluster/scheduler
>
**备注**


涉及全局设置不推荐用户随意修改，如需修改请与运维沟通后修改。非全局设置参数，用户可自行修改

---------------------------------

#### 错误码 12009

**现象**

任务执行过程中报错：错误码 12009，错误信息 会话创建失败，%s队列不存在，请检查队列设置是否正确
>queue (\S+) is not exists in YARN

**原因1**

队列不存在，请检查队列设置是否正确

**解决1**

- 用户联系管理员，确认队列是否正确
- ![](/Images/tuning-and-troubleshooting/error-guide/yarnQueue.png)
---------------------------------

#### 错误码 12010

**现象**

任务执行过程中报错：错误码 12010，错误信息 集群队列内存资源不足，可以联系组内人员释放资源
>Insufficient cluster queue memory

**原因1**

集群队列内存资源不足

**解决1**

- 检查资源内存是否已满，用户联系组内人员释放资源，或者申请队列扩容
- ![](/Images/tuning-and-troubleshooting/error-guide/queueRamResource.png)
---------------------------------

#### 错误码 12011

**现象**

任务执行过程中报错：错误码 12011，错误信息 集群队列CPU资源不足，可以联系组内人员释放资源
>Insufficient cluster queue cpu

**原因1**

集群队列CPU资源不足

**解决1**

- 检查资源cpu是否已满,用户联系组内人员释放资源，或者申请队列扩容

- ![](/Images/tuning-and-troubleshooting/error-guide/queueCPUResource.png)
---------------------------------

#### 错误码 12013

**现象**

任务执行过程中报错：错误码 12013，错误信息 资源不足导致启动引擎超时，您可以进行任务重试
>wait for DefaultEngineConn

**原因1**

资源不足导致启动引擎超时

**解决1**

用户重试任务，如果多次出现，请联系管理员排查

---------------------------------

#### 错误码 12014

**现象**

任务执行过程中报错：错误码 12014，错误信息 请求引擎超时，可能是因为队列资源不足导致，请重试
>wait for engineConn initial timeout

**原因1**

请求引擎超时

**解决1**

用户重试任务，如果多次出现，请联系管理员排查

---------------------------------

#### 错误码 13001

**现象**

任务执行过程中报错：错误码 13001，错误信息 Java进程内存溢出，建议优化脚本内容
>OutOfMemoryError

**原因1**

Java进程内存溢出

**解决1**

- 用户尝试增加java管理端内存配置，如果重复出现，请联系管理员排查
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--spark引擎资源设置(2)--spark引擎内存[spark.driver.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkMemory.png)

---------------------------------

#### 错误码 13002

**现象**

任务执行过程中报错：错误码 13002，错误信息 使用资源过大，请调优sql或者加大资源

>Container killed by YARN for exceeding memory limits

**原因1**

使用资源过大

**解决1**

- 在管理台增加executor内存，或在提交任务中增加内存
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--worker资源设置(2)--worker内存大小[spark.executor.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkExecutorMemory.png)
---------------------------------

#### 错误码 13003

**现象**

任务执行过程中报错：错误码 13003，错误信息 使用资源过大，请调优sql或者加大资源

>read record exception

**原因1**

使用资源过大

**解决1**

- 用户与管理员确认后，在管理台增加executor内存，或在提交任务中增加内存
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--worker资源设置(2)--worker内存大小[spark.executor.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkExecutorMemory.png)
---------------------------------

#### 错误码 13004

**现象**

任务执行过程中报错：错误码 13004，错误信息 引擎意外退出，可能是使用资源过大导致

>failed because the engine quitted unexpectedly

**原因1**

引擎意外退出

**解决1**

联系管理员排查

---------------------------------

#### 错误码 13005

**现象**

任务执行过程中报错：错误码 13005，错误信息 Spark app应用退出，可能是复杂任务导致

>Spark application has already stopped

**原因1**

Spark app应用退出，可能是复杂任务导致

**解决1**

- 用户尝试增加java管理端内存配置，如果重复出现，请联系管理员排查
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--spark引擎资源设置(2)--spark引擎内存[spark.driver.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkMemory.png)

**解决2**

- 用户与管理员确认后，在管理台增加executor内存，或在提交任务中增加内存
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--worker资源设置(2)--worker内存大小[spark.executor.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkExecutorMemory.png)

---------------------------------

#### 错误码 13006

**现象**

任务执行过程中报错：错误码 13006，错误信息 Spark context退出，可能是复杂任务导致

>Spark application has already stopped

**原因1**

Spark context退出，可能是复杂任务导致

**解决1**

- 用户尝试增加java管理端内存配置，如果重复出现，请联系管理员排查
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--spark引擎资源设置(2)--spark引擎内存[spark.driver.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkMemory.png)

**解决2**

- 用户与管理员确认后，在管理台增加executor内存，或在提交任务中增加内存
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--worker资源设置(2)--worker内存大小[spark.executor.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkExecutorMemory.png)
---------------------------------

#### 错误码 13007

**现象**

任务执行过程中报错：错误码 13007，错误信息 Pyspark子进程意外退出，可能是复杂任务导致

>Pyspark process  has stopped

**原因1**

Pyspark子进程意外退出，可能是复杂任务导致

**解决1**

- 用户尝试增加java管理端内存配置，如果重复出现，请联系管理员排查
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEspark--spark引擎资源设置(2)--spark引擎内存[spark.driver.memory]
- ![](/Images/tuning-and-troubleshooting/error-guide/sparkMemory.png)
---------------------------------

#### 错误码 21001

**现象**

任务执行过程中报错：错误码 21001，错误信息 会话创建失败，用户%s不能提交应用到队列：%s，请联系提供队列给您的人员

>User (\S+) cannot submit applications to queue (\S+)

**原因1**

会话创建失败,用户%s不能提交应用到队列

**解决1**

用户队列无权限，请检查队列配置是否错误，或者申请队列权限

---------------------------------

#### 错误码 21002

**现象**

任务执行过程中报错：错误码 21002，错误信息 创建Python解释器失败，请联系管理员

>initialize python executor failed

**原因1**

创建Python解释器失败

**解决1**

联系运维人员排查

---------------------------------

#### 错误码 21003

**现象**

任务执行过程中报错：错误码 21003，错误信息 创建单机Python解释器失败，请联系管理员

>PythonSession process cannot be initialized

**原因1**

创建Python解释器失败

**解决1**

联系运维人员排查

---------------------------------

#### 错误码 22001

**现象**

任务执行过程中报错：错误码 22001，错误信息 %s无权限访问，请申请开通数据表权限，请联系您的数据管理人员

>Permission denied:\s*user=[a-zA-Z0-9_]+,\s*access=[A-Z]+\s*,\s*inode="([a-zA-Z0-9/_\.]+)

**原因1**

无权限访问

**解决1**

- 数据库表权限需要到进行申请
---------------------------------

#### 错误码 22003

**现象**

任务执行过程中报错：错误码 22003，错误信息 所查库表无权限

>Authorization failed:No privilege

**原因1**

无权限访问

**解决1**

- 数据库表权限需要到进行申请

---------------------------------

#### 错误码 22004

**现象**

任务执行过程中报错：错误码 22004，错误信息 用户%s在机器不存在，请确认是否申请了相关权限

>user (\S+) does not exist

**原因1**

无权限访问

**解决1**


- 用户服务
---------------------------------

#### 错误码 22005

**现象**

任务执行过程中报错：错误码 22005，错误信息 用户在机器不存在，请确认是否申请了相关权限

>engineConnExec.sh: Permission denied

**原因1**

无权限访问

**解决1**


- 用户服务
---------------------------------

#### 错误码 22006

**现象**

任务执行过程中报错：错误码 22006，错误信息 用户在机器不存在，请确认是否申请了相关权限

>at com.sun.security.auth.UnixPrincipal

**原因1**

无权限访问

**解决1**


- 用户服务
---------------------------------

#### 错误码 22007

**现象**

任务执行过程中报错：错误码 22007，错误信息 用户在机器不存在，请确认是否申请了相关权限

>LoginException: java.lang.NullPointerException: invalid null input: name

**原因1**

无权限访问

**解决1**


- 用户服务
---------------------------------

#### 错误码 22008

**现象**

任务执行过程中报错：错误码 22008，错误信息 用户在机器不存在，请确认是否申请了相关权限

>User not known to the underlying authentication module

**原因1**

无权限访问

**解决1**


- 用户服务
---------------------------------

#### 错误码 30001

**现象**

任务执行过程中报错：错误码 30001，错误信息 库超过限制

>is exceeded

**原因1**

库超过限制

**解决1**

用户自行清理数据

**解决2**

申请数据库扩容

---------------------------------

#### 错误码 31001

**现象**

任务执行过程中报错：错误码 31001，错误信息 用户主动kill任务

>is killed by user

**原因1**

用户主动kill任务

**解决1**

- 如果确认用户未主动kill，请联系运维人员排查
---------------------------------

#### 错误码 31002

**现象**

任务执行过程中报错：错误码 31002，错误信息 您提交的EngineTypeLabel没有对应的引擎版本

>EngineConnPluginNotFoundException

**原因1**

EngineTypeLabel没有对应的引擎版本

**解决1**

- 用户检查传的EngineTypeLabel是否正确，如果正确，请联系运维人员排查
- 运维人员检查方法：在linkis ecp节点 lib/linkis-engineconn-plugins/是所有可用引擎插件的本地缓存。这个没有可能是引擎对应版本没有，或者引擎文件里面放了其它非正常格式文件，比如 .bak ，不该放zip的放了zip等等

---------------------------------

#### 错误码 41001

**现象**

任务执行过程中报错：错误码 41001，错误信息 数据库%s不存在，请检查引用的数据库是否有误

>Database '([a-zA-Z_0-9]+)' not found

**原因1**

数据库%s不存在

**解决1**

- 用户检查数据库是否存在及权限
- >show databases

---------------------------------

#### 错误码 41001

**现象**

任务执行过程中报错：错误码 41001，错误信息 数据库%s不存在，请检查引用的数据库是否有误

>Database does not exist: ([a-zA-Z_0-9]+)

**原因1**

数据库%s不存在

**解决1**

- 用户检查数据库是否存在及权限
- >show databases

---------------------------------

#### 错误码 41003

**现象**

任务执行过程中报错：错误码 41003，错误信息 字段%s不存在，请检查引用的字段是否有误

>cannot resolve '`(.+)`' given input columns

**原因1**

字段%s不存在

**解决1**

- 用户检查字段是否存在
>desc tabl_name
---------------------------------

#### 错误码 41003

**现象**

任务执行过程中报错：错误码 41003，错误信息 字段%s不存在，请检查引用的字段是否有误

>Column '(.+)' cannot be resolved

**原因1**

字段%s不存在

**解决1**

- 用户检查字段是否存在
>desc tabl_name
---------------------------------

#### 错误码 41003

**现象**

任务执行过程中报错：错误码 41003，错误信息 字段%s不存在，请检查引用的字段是否有误

> Invalid table alias or column reference '(.+)':

**原因1**

字段%s不存在

**解决1**

- 用户检查字段是否存在
>desc tabl_name
---------------------------------

#### 错误码 41004

**现象**

任务执行过程中报错：错误码 41004，错误信息 分区字段%s不存在，请检查引用的表是否为分区表或分区字段有误

>Partition spec \{(\S+)\} contains non-partition columns

**原因1**

分区字段%s不存在

**解决1**

- 用户检查分区字段填写是否正确

---------------------------------

#### 错误码 41004

**现象**

任务执行过程中报错：错误码 41004，错误信息 分区字段%s不存在，请检查引用的表是否为分区表或分区字段有误

>table is not partitioned but partition spec exists:\{(.+)\}

**原因1**

分区字段%s不存在

**解决1**

- 用户检查分区字段填写是否正确

---------------------------------

#### 错误码 41004

**现象**

任务执行过程中报错：错误码 41004，错误信息 表对应的路径不存在，请联系您的数据管理人员

>Path does not exist: viewfs

**原因1**

分区路径不存在导致

**解决1**

- 请尝试refresh table  XXX，或者kill引擎重跑，仍有异常，请联系数据管理人员排查

---------------------------------

#### 错误码 41004

**现象**

任务执行过程中报错：错误码 41004，错误信息 字段%s不存在，请检查引用的表%s是否为分区表或分区字段有误

>([a-zA-Z_0-9]+) is not a valid partition column in table ([`\.a-zA-Z_0-9]+)

**原因1**

字段%s不存在

**解决1**

- 用户检查分区字段填写是否正确

---------------------------------

#### 错误码 41005

**现象**

任务执行过程中报错：错误码 41005，错误信息 文件%s不存在

>Caused by:\s*java.io.FileNotFoundException

**原因1**

文件%s不存在

**解决1**

- 请尝试refresh table  XXX，或者kill引擎重跑，仍有异常，请联系数据管理人员排查


---------------------------------

#### 错误码 42003

**现象**

任务执行过程中报错：错误码 42003，错误信息 未知函数%s，请检查代码中引用的函数是否有误

>Undefined function: '(\S+)'

**原因1**

引用的函数有误

**解决1**

- 如果是udf，请检查函数，如果是公共函数，请联系运维人员排查
- udf函数地址：![](/Images/tuning-and-troubleshooting/error-guide/udf.png)

---------------------------------

#### 错误码 42003

**现象**

任务执行过程中报错：错误码 42003，错误信息 未知函数%s，请检查代码中引用的函数是否有误

>Invalid function '(\S+)'

**原因1**

引用的函数有误

**解决1**

- 如果是udf，请检查函数，如果是公共函数，请联系运维人员排查
- udf函数地址：![](/Images/tuning-and-troubleshooting/error-guide/udf.png)

---------------------------------

#### 错误码 42004

**现象**

任务执行过程中报错：错误码 42004，错误信息 字段%s存在名字冲突，请检查子查询内是否有同名字段

>Ambiguous column Reference '(\S+)' in subquery

**原因1**

字段%s存在名字冲突

**解决1**

- 用户检查是否有重名字段

---------------------------------

#### 错误码 42004

**现象**

任务执行过程中报错：错误码 42004，错误信息 字段%s存在名字冲突，请检查子查询内是否有同名字段

>Reference '(\S+)' is ambiguous

**原因1**

字段%s存在名字冲突

**解决1**

- 用户检查是否有重名字段

---------------------------------

#### 错误码 42005

**现象**

任务执行过程中报错：错误码 42005，错误信息 字段%s必须指定表或者子查询别名，请检查该字段来源

>Column '(\S+)' Found in more than One Tables/Subqueries

**原因1**

字段未指定表

**解决1**

- 用户增加字段来源

---------------------------------

#### 错误码 42006

**现象**

任务执行过程中报错：错误码 42006，错误信息 表%s在数据库中已经存在，请删除相应表后重试

>Table already exists

**原因1**

表%s在数据库中已经存在

**解决1**

- 用户需要清理表再重试

---------------------------------

#### 错误码 42006

**现象**

任务执行过程中报错：错误码 42006，错误信息 表%s在数据库中已经存在，请删除相应表后重试

>AnalysisException: (S+) already exists

**原因1**

表%s在数据库中已经存在

**解决1**

- 用户需要清理表再重试

---------------------------------

#### 错误码 42006

**现象**

任务执行过程中报错：错误码 42006，错误信息 表%s在数据库中已经存在，请删除相应表后重试

>Table (\S+) already exists

**原因1**

表%s在数据库中已经存在

**解决1**

- 用户需要清理表再重试


---------------------------------

#### 错误码 42006

**现象**

任务执行过程中报错：错误码 42006，错误信息 表%s在数据库中已经存在，请删除相应表后重试

>Table or view '(\S+)' already exists in database '(\S+)'

**原因1**

表%s在数据库中已经存在

**解决1**

- 用户需要清理表再重试


---------------------------------

#### 错误码 42007

**现象**

任务执行过程中报错：错误码 42007，错误信息 插入目标表字段数量不匹配,请检查代码！

>requires that the data to be inserted have the same number of columns as the target table

**原因1**

插入目标表字段数量不匹配

**解决1**

- 用户检查代码


---------------------------------

#### 错误码 42008

**现象**

任务执行过程中报错：错误码 42008，错误信息 数据类型不匹配，请检查代码！

>due to data type mismatch: differing types in

**原因1**

数据类型不匹配

**解决1**

- 用户检查代码


---------------------------------

#### 错误码 42009

**现象**

任务执行过程中报错：错误码 42009，错误信息 字段%s引用有误，请检查字段是否存在！

>Invalid column reference (S+)

**原因1**

字段%s引用有误

**解决1**

- 用户检查字段是否存在


---------------------------------

#### 错误码 42010

**现象**

任务执行过程中报错：错误码 42010，错误信息 字段%s提取数据失败

>Can't extract value from (S+): need

**原因1**

字段%s提取数据失败

**解决1**

- 检查select 的字段是否有误


---------------------------------

#### 错误码 42012

**现象**

任务执行过程中报错：错误码 42012，错误信息 group by 位置2不在select列表中，请检查代码！

>GROUP BY position (S+) is not in select list

**原因1**

group by 的字段不在select列表中

**解决1**

- 用户检查代码


---------------------------------

#### 错误码 42014

**现象**

任务执行过程中报错：错误码 42014，错误信息 插入数据未指定目标表字段%s，请检查代码！

>Cannot insert into target table because column number/types are different '(S+)'

**原因1**

插入数据和目标表的字段对应不上

**解决1**

- 用户检查代码


---------------------------------

#### 错误码 42016

**现象**

任务执行过程中报错：错误码 42016，错误信息 UDF函数未指定参数，请检查代码！

>UDFArgumentException Argument expected

**原因1**

UDF函数未指定完整参数

**解决1**

- 用户检查代码


---------------------------------

#### 错误码 42017

**现象**

任务执行过程中报错：错误码 42017，错误信息 聚合函数%s不能写在group by 中，请检查代码！

>aggregate functions are not allowed in GROUP BY

**原因1**

聚合函数%s不能写在group by 中，请检查代码！

**解决1**

- 用户检查代码


---------------------------------

#### 错误码 43007

**现象**

任务执行过程中报错：错误码 43007，错误信息 pyspark执行失败，可能是语法错误或stage失败

>Py4JJavaError: An error occurred

**原因1**

语法错误或stage失败

**解决1**

- 如果是语法错误需要检查代码进行修改
- 如果是stage失败可以选择重试


---------------------------------

#### 错误码 43011

**现象**

任务执行过程中报错：错误码 43011，错误信息 导出Excel表超过最大限制1048575

>Invalid row number

**原因1**

数据量超过单个sheet的限制

**解决1**

- 减少数据量进行导出，或者导出为CSV格式


---------------------------------

#### 错误码 43040

**现象**

任务执行过程中报错：错误码 43040，错误信息 Presto查询一定要指定数据源和库信息

>Schema must be specified when session schema is not set

**原因1**

数据源配置错误

**解决1**

- 检查管理台Presto数据源配置
- 修改配置，打开DSS平台，点击管理台--参数配置--IDE--IDEpresto--数据源配置
- ![](/Images/tuning-and-troubleshooting/error-guide/presto.png)


---------------------------------

#### 错误码 46001

**现象**

任务执行过程中报错：错误码 46001，错误信息 找不到导入文件地址：%s

>java.io.FileNotFoundException: (\S+) \(No such file or directory\)

**原因1**

文件不存在

**解决1**

- 请检查工作空间，或检查HDFS目录下文件是否存在
- ![](/Images/tuning-and-troubleshooting/error-guide/hdfs.png)


---------------------------------

#### 错误码 46002

**现象**

任务执行过程中报错：错误码 46002，错误信息 导出为excel时临时文件目录权限异常

>java.io.IOException: Permission denied(.+) at org.apache.poi.xssf.streaming.SXSSFWorkbook.createAndRegisterSXSSFSheet

**原因1**

文件目录异常，或者文件读写权限不足

**解决1**

- 请确认文件有读写权限，如有异常请联系运维人员处理


---------------------------------

#### 错误码 46003

**现象**

任务执行过程中报错：错误码 46003，错误信息 导出文件时无法创建目录：%s

>java.io.IOException: Mkdirs failed to create (\S+) (.+)

**原因1**

无法创建目录

**解决1**

- 联系运维人员排查


---------------------------------

#### 错误码 46004

**现象**

任务执行过程中报错：错误码 46004，错误信息 导入模块错误，系统没有%s模块，请联系运维人员安装

>ImportError: No module named (S+)

**原因1**

系统没有%s模块

**解决1**

- 联系运维人员排查

