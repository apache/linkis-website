---
title: 自定义变量设计
sidebar_position: 1
---

## 1. 总述
### 1.1 需求背景
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户希望在写代码时，能够定义一些公共变量然后执行的时候进行替换，比如用户每天都会批量跑同一段sql，需要指定上一天的分区时间，如果基于sql去写会比较复杂如果系统提供一个run_date的变量将会非常方便使用。
### 1.2 目标
1. 支持任务代码的变量替换
2. 支持自定义变量，支持用户在脚本和提交给Linkis的任务参数定义自定义变量，支持简单的+，-等计算
3. 预设置系统变量：run_date,run_month，run_today等系统变量

## 2. 总体设计
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Linkis任务执行过程中自定义变量在Entrance进行，主要通过Entrance在任务提交执行前的拦截器进行拦截替换实现，通过正则表达式获取到任务代码中使用到的变量和定义的变量，并通过任务传入的自定义变量初始值完成代码的替换，变成最终可以执行的代码。

### 2.1 技术架构
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自定义变量整体架构如下，用于任务提交过来后，会经过变量替换拦截器。首先会解析出所有代码中用到的变量和表达式，然后通过和系统以及用户自定义的变量初始值进行替换，最终将解析后的代码提交给EngineConn执行。所以到底层引擎已经是替换好的代码。

![var_arc](/Images/Architecture/Commons/var_arc.png)

## 3.功能介绍
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis支持的变量类型分为自定义变量和系统内置变量，内部变量是Linkis预先定义好的，可以直接进行使用。然后不同的变量类型支持不同的计算格式：String支持+、整数小数支持+-*/,日期支持+-。

### 3.1 内置变量
目前已支持的内置变量如下：

| 变量名 | 变量类型 | 变量含义 | 变量值举例 |
| ------ | -------- | -------- | ---------- |
| run\_date | String | 数据统计时间（支持用户自己设定，默认设置为当前时间的前一天），如今天执行昨天的数据，则为昨天的时间，格式为 yyyyMMdd | 20180129 |
| run\_date\_std | String | 数据统计时间(标准日期格式)，如今天执行昨天数据，则为昨天的时间，格式为 yyyy-MM-dd | 2018-01-29 |
| run_today | String | run_date (数据统计时间) 的后一天，格式为 yyyyMMdd | 20211210 |
| run_today_std | String | run_date (数据统计时间) 的后一天（标准格式），格式为 yyyy-MM-dd | 2021-12-10 |
| run_mon | String | 数据统计时间所在月，格式为 yyyyMM | 202112 |
| run_mon_std | String | 数据统计时间所在月（标准格式），格式为 yyyy-MM | 2021-12 |
| run\_month\_begin | String | 数据统计时间所在月的第一天，格式为 yyyyMMdd | 20180101 |
| run\_month\_begin\_std | String | 数据统计时间所在月的第一天(标准日期格式)，格式为 yyyy-MM-dd | 2018-01-01 |
| run_month_now_begin | String | run_today 所在月的第一天，格式为 yyyyMMdd | 20211201 |
| run_month_now_begin_std | String | run_today 所在月的第一天（标准格式），格式为 yyyy-MM-dd | 2021-12-01 |
| run\_month\_end | String | 数据统计时间所在月的最后一天，格式为 yyyyMMdd | 20180131 |
| run\_month\_end\_std | String | 数据统计时间所在月的最后一天(标准日期格式)，格式为 yyyy-MM-dd | 2018-01-31 |
| run_month_now_end | String | run_today 所在月的最后一天，格式为 yyyyMMdd | 20211231 |
| run_month_now_end_std | String | run_today 所在月的最后一天（标准日期格式），格式为 yyyy-MM-dd | 2021-12-31 |
| run_quarter_begin | String | 数据统计时间所在季度的第一天，格式为 yyyyMMdd | 20210401 |
| run_quarter_end | String | 数据统计时间所在季度的最后一天，格式为 yyyyMMdd | 20210630 |
| run_half_year_begin | String | 数据统计时间所在半年的第一天，格式为 yyyyMMdd | 20210101 |
| run_half_year_end | String | 数据统计时间所在半年的最后一天，格式为 yyyyMMdd | 20210630 |
| run_year_begin | String | 数据统计时间所在年的第一天，格式为 yyyyMMdd | 20210101 |
| run_year_end | String | 数据统计时间所在年的最后一天，格式为 yyyyMMdd | 20211231 |
| run_quarter_begin_std | String | 数据统计时间所在季度的第一天（标准格式），格式为 yyyy-MM-dd | 2021-10-01 |
| run_quarter_end_std | String | 数据统计时间所在季度的最后一天（标准格式），格式为 yyyy-MM-dd | 2021-12-31 |
| run_half_year_begin_std | String | 数据统计时间所在半年的第一天（标准格式），格式为 yyyy-MM-dd | 2021-07-01 |
| run_half_year_end_std | String | 数据统计时间所在半年的最后一天（标准格式），格式为 yyyy-MM-dd | 2021-12-31 |
| run_year_begin_std | String | 数据统计时间所在年的第一天（标准格式），格式为 yyyy-MM-dd | 2021-01-01 |
| run_year_end_std | String | 数据统计时间所在年的最后一天（标准格式），格式为 yyyy-MM-dd | 2021-12-31 |

具体细节：

1、run_date为核心自带日期变量，支持用户自定义日期，如果不指定默认为当前系统时间的前一天。
2、其他衍生内置日期变量定义：其他日期内置变量都是相对run_date计算出来的，一旦run_date变化，其他变量值也会自动跟着变化，其他日期变量不支持设置初始值，只能通过修改run_date进行修改。
3、内置变量支持更加丰富的使用场景：${run_date-1}为run_data的前一天；${run_month_begin-1}为run_month_begin的上个月的第一天，这里的-1表示减一个月。

### 3.2 自定义变量
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;什么是自定义变量？先定义，后使用的用户变量。用户自定义变量暂时支持字符串，整数，浮点数变量的定义，其中字符串支持+法，整数和浮点数支持+-*/方法。用户自定义变量与SparkSQL和HQL本身支持的set变量语法不冲突，但是不允许同名。如何定义和使用自定义变量？如下：
```
## 代码中定义，在任务代码前进行指定
sql类型定义方式：
--@set f=20.1
python/Shell类型定义如下：
#@set f=20.1
注意：只支持一行定义一个变量
```
使用都是直接在代码中使用通过 ```{varName表达式},如${f*2}```

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







