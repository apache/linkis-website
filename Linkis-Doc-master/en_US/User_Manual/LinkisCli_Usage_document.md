Linkis-Cli usage documentation
============

## Introduction

Linkis-Cli is a shell command line program used to submit tasks to Linkis.

## Basic case

You can simply submit a task to Linkis by referring to the example below

The first step is to check whether the default configuration file `linkis-cli.properties` exists in the conf/ directory, and it contains the following configuration:

```properties
   wds.linkis.client.common.gatewayUrl=http://127.0.0.1:9001
   wds.linkis.client.common.authStrategy=token
   wds.linkis.client.common.tokenKey=Validation-Code
   wds.linkis.client.common.tokenValue=BML-AUTH
```

The second step is to enter the linkis installation directory and enter the command:

```bash
    ./bin/linkis-client -engineType spark-2.4.3 -codeType sql -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop 
```

In the third step, you will see the information on the console that the task has been submitted to linkis and started to execute.

Linkis-cli currently only supports synchronous submission, that is, after submitting a task to linkis, it will continue to inquire about the task status and pull task logs until the task ends. If the status is successful at the end of the task, linkis-cli will also actively pull the result set and output it.


## How to use

```bash
   ./bin/linkis-client [parameter] [cli parameter]
```

## Supported parameter list

* cli parameters

    | Parameter | Description | Data Type | Is Required |
    | ----------- | -------------------------- | -------- |- --- |
    | --gwUrl | Manually specify the linkis gateway address | String | No |
    | --authStg | Specify authentication policy | String | No |
    | --authKey | Specify authentication key | String | No |
    | --authVal | Specify authentication value | String | No |
    | --userConf | Specify the configuration file location | String | No |

* Parameters

    | Parameter | Description | Data Type | Is Required |
    | ----------- | -------------------------- | -------- |- --- |
    | -engType | Engine Type | String | Yes |
    | -runType | Execution Type | String | Yes |
    | -code | Execution code | String | No |
    | -codePath | Local execution code file path | String | No |
    | -smtUsr | Specify the submitting user | String | No |
    | -pxyUsr | Specify the execution user | String | No |
    | -creator | Specify creator | String | No |
    | -scriptPath | scriptPath | String | No |
    | -outPath | Path of output result set to file | String | No |
    | -confMap | configuration map | Map | No |
    | -varMap | variable map for variable substitution | Map | No |
    | -labelMap | linkis labelMap | Map | No |
    | -sourceMap | Specify linkis sourceMap | Map | No |


## Detailed example

#### One, add cli parameters

Cli parameters can be passed in manually specified, this way will overwrite the conflicting configuration items in the default configuration file

```bash
    ./bin/linkis-client -engineType spark-2.4.3 -codeType sql -code "select count(*) from testdb.test;" -submitUser hadoop -proxyUser hadoop --gwUrl http://127.0.0.1:9001- -authStg token --authKey [tokenKey] --authVal [tokenValue]
```

#### Two, add engine initial parameters

The initial parameters of the engine can be added through the `-confMap` parameter. Note that the data type of the parameter is Map. The input format of the command line is as follows:

        -confMap key1=val1,key2=val2,...
        
For example: the following example sets startup parameters such as the yarn queue for engine startup and the number of spark executors:

```bash
   ./bin/linkis-client -engineType spark-2.4.3 -codeType sql -confMap wds.linkis.yarnqueue=q02,spark.executor.instances=3 -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  
```

Of course, these parameters can also be read in a configuration file, we will talk about it later

#### Three, add tags

Labels can be added through the `-labelMap` parameter. Like the `-confMap`, the type of the `-labelMap` parameter is also Map:

```bash
   /bin/linkis-client -engineType spark-2.4.3 -codeType sql -labelMap labelKey=labelVal -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  
```

#### Fourth, variable replacement

Linkis-cli variable substitution is realized by `${}` symbol and `-varMap`

```bash
   ./bin/linkis-client -engineType spark-2.4.3 -codeType sql -code "select count(*) from \${key};" -varMap key=testdb.test  -submitUser hadoop -proxyUser hadoop  
```

During execution, the sql statement will be replaced with:

```mysql-sql
   select count(*) from testdb.test
```  
        
Note that the escape character in `'\$'` is to prevent the parameter from being parsed in advance by linux. If `-codePath` specifies the local script mode, the escape character is not required

#### Five, use user configuration

1. linkis-cli supports loading user-defined configuration files, the configuration file path is specified by the `--userConf` parameter, and the configuration file needs to be in the file format of `.properties`
        
```bash
   ./bin/linkis-client -engineType spark-2.4.3 -codeType sql -code "select count(*) from testdb.test;"  -submitUser hadoop -proxyUser hadoop  --userConf [配置文件路径]
``` 
        
        
2. Which parameters can be configured?

All parameters can be configured, for example:

cli parameters:

```properties
   wds.linkis.client.common.gatewayUrl=http://127.0.0.1:9001
   wds.linkis.client.common.authStrategy=static
   wds.linkis.client.common.tokenKey=[tokenKey]
   wds.linkis.client.common.tokenValue=[tokenValue]
```

parameter:

```properties
   wds.linkis.client.label.engineType=spark-2.4.3
   wds.linkis.client.label.codeType=sql
```
        
When the Map class parameters are configured, the format of the key is

        [Map prefix] + [key]

The Map prefix includes:

 - ExecutionMap prefix: wds.linkis.client.exec
 - sourceMap prefix: wds.linkis.client.source
 - ConfigurationMap prefix: wds.linkis.client.param.conf
 - runtimeMap prefix: wds.linkis.client.param.runtime
 - labelMap prefix: wds.linkis.client.label
        
Note:

1. variableMap does not support configuration

2. When there is a conflict between the configured key and the key entered in the command parameter, the priority is as follows:

        Instruction Parameters> Key in Instruction Map Type Parameters> User Configuration> Default Configuration
        
Example:

Configure engine startup parameters:

```properties
   wds.linkis.client.param.conf.spark.executor.instances=3
   wds.linkis.client.param.conf.wds.linkis.yarnqueue=q02
```
        
Configure labelMap parameters:

```properties
   wds.linkis.client.label.myLabel=label123
```
        
#### Six, output result set to file

Use the `-outPath` parameter to specify an output directory, linkis-cli will output the result set to a file, and each result set will automatically create a file. The output format is as follows:

        task-[taskId]-result-[idx].txt
        
E.g:

        task-906-result-1.txt
        task-906-result-2.txt
        task-906-result-3.txt