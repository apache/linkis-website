---
title: Linkis-Cli 的使用
sidebar_position: 2
---

## 1. 介绍

Linkis-Cli 是一个用于向Linkis提交任务的Shell命令行程序。

## 2. 基础案例

您可以参照下面的例子简单地向Linkis提交任务

第一步，检查conf/目录下是否存在默认配置文件`linkis-cli.properties`，且包含以下配置：

```properties
   #linkis-mg-gateway服务地址
   wds.linkis.client.common.gatewayUrl=http://127.0.0.1:9001
   #认证鉴权策略 token/static 
   wds.linkis.client.common.authStrategy=token
   #static 模式下为用户名/密码，token模式下为linkis-mg-gateway_auth_token表中token_name 和logal_users
   wds.linkis.client.common.tokenKey=Validation-Code
   wds.linkis.client.common.tokenValue=BML-AUTH
```

第二步，进入linkis安装目录，输入指令：

```bash
    sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop 
```

第三步，您会在控制台看到任务被提交到linkis,并开始执行的信息。

linkis-cli目前仅支持同步提交，即向linkis提交任务后，不断询问任务状态、拉取任务日志，直至任务结束。任务结束时状态如果为成功，linkis-cli还会主动拉取结果集并输出。


## 3. 使用方式

```bash
   sh ./bin/linkis-cli   [客户端参数][引擎参数] [启动运行参数]
```
           
## 4. 支持的参数列表

* 客户端参数

    | 参数      | 说明                     | 数据类型 | 是否必填 |
    | ----------- | -------------------------- | -------- | ---- |
    | --gatewayUrl | 手动指定linkis-mg-gateway服务的地址 | String   | 否  |
    | --authStg   | 指定认证策略   token/static         | String   | 否  |
    | --authKey   | 指定认证key            | String   | 否  |
    | --authVal   | 指定认证value          | String   | 否  |
    | --userConf  | 指定配置文件位置   | String   | 否  |
    | --kill        | 指定kill的taskId，执行任务停止命令         | String   | 否  |
    | --log         | 指定执行的相关日志路径            | String   | 否  |
    | --result      |           | String   | 否  |
    | --status      |           | String   | 否  |    
    | --async       |           | String   | 否  |
    | --mode        | ujes/once           | String   | 否  |
    
*  引擎相关参数 

    | 参数      | 说明                     | 数据类型 | 是否必填 |
    | ----------- | -------------------------- | -------- | ---- |
    | -engineType   | 指定此任务的引擎类型，带版本号 如 hive-2.3.3 | String   | 是  |
    | -codeType     | 为此作业指定 linkis的runType 如sql/hql/shell   | String   | 否  |     
    | -codePath     | 本地执行代码文件路径        | String   | 否  |
    | -code         | 要执行的代码          | String   | 否  |
    | -scriptPath   | 为上传的脚本指定远程路径   | String   | 否  |  
    | -submitUser   | 提交的用户           | String   | 否  |
    | -proxyUser    | 指定在 Linkis 服务器端执行您的代码的代理用户   | String   | 否  |     
    | -creator      | 指定此任务的创建者，系统级别 如 IDE/LINKISCLI  | String   | 否  |
    | -outPath      | 指定结果集的输出路径。 如果未指定，则输出重置为屏幕（标准输出）   | String   | 否  |  


* Map启动运行参数

    | 参数      | 说明                     | 数据类型 | 是否必填 |
    | ----------- | -------------------------- | -------- | ---- |
    | -confMap    | 启动参数，可以将任何启动参数放入此 Map（例如 spark.executor.instances），输入格式：-confMap key1=value1 -confMap key2=value2 | String   | 是  |
    | -runtimeMap | 运行参数，可以将任何运行参数放入此 Map（例如 jdbc.url=jdbc:hive2://xxx:10000）， 输入格式：-runtimeMap key1=value1 -runtimeMap key2=value2| String   | 是  |
    | -varMap     | 指定变量映射，变量用于关键字替换。如执行语句'select form ${table_x} limit ${limit_y}' 通过varMap指定关键字变量替换， -varMap table_x=test -varMap limit_y=100 | String   | 否  |
    | -labelMap   | 标签映射| String   | 否  |
    | -jobContentMap| jobContent 映射        | String   | 否  |
   


## 5. 详细示例

### 5.1 客户端参数

客户端参数可以通过手动指定的方式传入，此方式会覆盖默认配置文件`linkis-cli.properties`中的冲突配置项
可以通过配置文件进行配置
```bash
   sh ./bin/linkis-cli --gatewayUrl http://127.0.0.1:9001  --authStg token --authKey [tokenKey] --authVal [tokenValue]  -engineType spark-2.4.3 -codeType sql -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  
```

### 5.2 添加引擎启动参数
>按实际使用场景如果不涉及 可以不配置

引擎的初始参数可以通过`-confMap`参数添加，注意参数的数据类型是Map，命令行的输入格式如下：
```html
-confMap key1=val1 -confMap key2=val2 ...
```

        
例如：以下示例设置了引擎启动的yarn队列、spark executor个数等启动参数：

```bash
   sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -confMap wds.linkis.yarnqueue=q02 -confMap spark.executor.instances=3 -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  
```
        
当然，这些参数也支持以配置文件的方式读取，见【5.5 使用用户的配置文件】

### 5.2 添加引擎运行参数
>按实际使用场景，如果不涉及 可以不配置

引擎的初始参数可以通过`-runtimeMap`参数添加，注意参数的数据类型是Map，命令行的输入格式如下：
```html
-runtimeMap key1=val1 -confMap key2=val2 ...
```

        
例如：以下示例设置了jdbc引擎运行是需要的连接地址/用户名/密码 等参数

```bash
 sh ./bin/linkis-cli -submitUser hadoop   -engineType jdbc-4 -codeType jdbc  -code "show tables" -runtimeMap jdbc.url=jdbc:mysql://127.0.0.1:36000/hive_meta  -runtimeMap jdbc.username=test -runtimeMap  jdbc.password=test@123
```
        
当然，这些参数也支持以配置文件的方式读取，见【5.5 使用用户的配置文件】


### 5.3 添加标签

标签可以通过`-labelMap`参数添加，与`-confMap`一样，`-labelMap`参数的类型也是Map:

```bash
   sh /bin/linkis-cli -engineType spark-2.4.3 -codeType sql -labelMap labelKey=labelVal -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  
```

### 5.4 变量替换

Linkis-cli的变量替换通过`${}`符号和`-varMap`共同实现

```bash
  sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "select count(*) from \${key};" -varMap key=testdb.test  -submitUser hadoop -proxyUser hadoop  
```

执行过程中sql语句会被替换为：

```mysql-sql
   select count(*) from testdb.test
```        

注意`'\$'`中的转义符是为了防止参数被linux提前解析，如果是`-codePath`指定本地脚本方式，则不需要转义符

### 5.5 使用用户的配置文件

1. linkis-cli支持加载用户自定义配置文件，配置文件路径通过`--userConf`参数指定，配置文件需要是`.properties`文件格式,默认是使用 `conf/linkis-cli/linkis-cli.properties` 配置文件

```bash
   sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  --userConf [配置文件路径]
``` 
        
2. 哪些参数可以配置？

所有参数都可以配置化，例如：

cli参数：

```properties
   wds.linkis.client.common.gatewayUrl=http://127.0.0.1:9001
   wds.linkis.client.common.authStrategy=static
   wds.linkis.client.common.tokenKey=[静态认证key]
   wds.linkis.client.common.tokenValue=[静态认证value]
```

参数：

```properties
   wds.linkis.client.label.engineType=spark-2.4.3
   wds.linkis.client.label.codeType=sql
```
        
Map类参数配置化时，key的格式为

        [Map前缀] + [key]
        
>通过前缀区分参数的类型(启动参数，运行参数等)

Map前缀包括：

 - executionMap前缀: wds.linkis.client.exec
 - sourceMap前缀: wds.linkis.client.source
 - confMap前缀: wds.linkis.client.param.conf
 - runtimeMap前缀: wds.linkis.client.param.runtime
 - labelMap前缀: wds.linkis.client.label
 
        
注意： 

1. variableMap不支持配置化

2. 当配置的key和指令参数中已输入的key存在冲突时，优先级如下：

        指令参数 > 指令Map类型参数中的key > 用户配置 > 默认配置
        
示例：

配置引擎启动参数：

```properties
   wds.linkis.client.param.conf.spark.executor.instances=3
   wds.linkis.client.param.conf.wds.linkis.yarnqueue=q02
```
        
配置labelMap参数：

```properties
   wds.linkis.client.label.myLabel=label123
```

### 5.6 输出结果集到文件

使用`-outPath`参数指定一个输出目录，linkis-cli会将结果集输出到文件，每个结果集会自动创建一个文件，输出形式如下：

        task-[taskId]-result-[idx].txt
        
例如：
```html
    task-906-result-1.txt
    task-906-result-2.txt
    task-906-result-3.txt
```



    
