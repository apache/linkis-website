---
title: 自定义变量设计
sidebar_position: 1
---

## 1. 总述
### 需求
1. 用户希望Linkis能够提供一些公共变量然后执行的时候进行替换，比如用户每天都会批量跑同一段sql，需要指定上一天的分区时间，如果基于sql去写会比较复杂如果系统提供一个run_date的变量将会非常方便使用。
2. 用户希望Linkis支持date pattern计算，支持在代码中写&{YYYY-MM-DD}等变量计算时间变量
3. 用户希望自己定义变量，比如定一个一个float变量，然后在代码中进行使用

### 目标
1. 支持任务代码的变量替换
2. 支持自定义变量，支持用户在脚本和提交给Linkis的任务参数定义自定义变量，支持简单的+，-等计算
3. 预设置系统变量：run_date,run_month，run_today等系统变量
4. 支持date pattern变量，支持pattern的+，-操作

## 2. 总体设计
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Linkis任务执行过程中自定义变量在Entrance进行，主要通过Entrance在任务提交执行前的拦截器进行拦截替换实现，通过正则表达式获取到任务代码中使用到的变量和定义的变量，并通过任务传入的自定义变量初始值完成代码的替换，变成最终可以执行的代码。

### 2.1 技术架构
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自定义变量整体架构如下，用于任务提交过来后，会经过变量替换拦截器。首先会解析出所有代码中用到的变量和表达式，然后通过和系统以及用户自定义的变量初始值进行替换，最终将解析后的代码提交给EngineConn执行。所以到底层引擎已经是替换好的代码。

![arc](/Images/Architecture/Commons/var_arc.png)

备注：变量和解析的功能因为比较通用，抽成工具类定义在linkis-commons中：org.apache.linkis.common.utils.VariableUtils

### 2.2 业务架构
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此次的特性主要是为了完成变量替换的解析、计算、替换功能，主要涉及到linkis的Entrance模块做代码拦截和Linkis-commons模块定义的变量替换的工具类：

| 组件名| 一级模块 | 二级模块 | 功能点 |
|---|---|---|---|
| Linkis | CG | Entrance|拦截任务的代码并调用linkis-common的VariableUtils进行代码替换|
| Linkis | Linkis-commons | linkis-common|提供变量、解析、计算的工具类VariableUtils|

## 3. 模块设计
### 3.1核心执行流程
[输入端] 输入端为代码和代码类型（python/sql/scala/sh）.
[处理流程] Entrance在接受到任务后会首先进过拦截器，启动变量拦截器会完成变量的解析、替换、计算
整体时序图如下：

![time](/Images/Architecture/Commons/var_time.png)

这里需要说明的是：
1. 自定义变量和系统变量使用方式为${}，如${run_date}
2. date pattern变量的使用方式为&{}，如&{yyyy-01-01} 值为2022-01-01。
   之所以分成两种不同的方式是为了防止自定义变量定义的字符串中包含pattern字符，如定义了一个y=1的自定义变量可能代表不同的含义，会被pattern任务是年变量


### 3.2具体细节：
1、run_date为核心自带日期变量，支持用户自定义日期，如果不指定默认为当前系统时间的前一天。
2、其他衍生内置日期变量定义：其他日期内置变量都是相对run_date计算出来的，一旦run_date变化，其他变量值也会自动跟着变化，其他日期变量不支持设置初始值，只能通过修改run_date进行修改。
3、内置变量支持更加丰富的使用场景：${run_date-1}为run_data的前一天；${run_month_begin-1}为run_month_begin的上个月的第一天，这里的-1表示减一个月。
4、Pattern类型变量也是基于run_date进行计算，然后再进行替换和+—

### 3.3 变量作用域
在linkis中自定义变量也有作用域，优先级为脚本中定义的变量大于在任务参数中定义的Variable大于内置的run_date变量。任务参数中定义如下：
```
## restful
{
    "executionContent": {"code": "select \"${f-1}\";", "runType":  "sql"},
    "params": {
                    "variable": {f: "20.1"},
                    "configuration": {
                            "runtime": {
                                "linkis.openlookeng.url":"http://127.0.0.1:9090"
                                }
                            }
                    },
    "source":  {"scriptPath": "file:///mnt/bdp/hadoop/1.sql"},
    "labels": {
        "engineType": "spark-2.4.3",
        "userCreator": "hadoop-IDE"
    }
}
## java SDK
JobSubmitAction.builder
  .addExecuteCode(code)
  .setStartupParams(startupMap)
  .setUser(user) //submit user
  .addExecuteUser(user) //execute user
  .setLabels(labels)
  .setVariableMap(varMap) //setVar
  .build
```

## 4. 接口设计：
主要工具类为：
```
VariableUtils:
def replace(replaceStr: String): String 替换代码中的变量返回替换后的代码
def replace(replaceStr: String, variables: util.Map[String, Any]): String 支持传入自定义变量的值，进行替换
def replace(code: String, runtType: String, variables: util.Map[String, String]): String 支持传入代码类型，按照不同的类型进行替换解析
```








