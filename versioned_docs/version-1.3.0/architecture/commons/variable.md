---
title: Custom Variable Design
sidebar_position: 1
---

## 1. General
### 1.1 Requirements Background
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users want to be able to define some common variables when writing code and then replace them during execution. For example, users run the same sql in batches every day, and need to specify the partition time of the previous day. If based on sql It will be more complicated to write if the system provides a variable of run_date which will be very convenient to use.
### 1.2 Target
1. Support variable substitution of task code
2. Support custom variables, support users to define custom variables in scripts and task parameters submitted to Linkis, support simple +, - and other calculations
3. Preset system variables: run_date, run_month, run_today and other system variables

## 2. Overall Design
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;During the execution of the Linkis task, the custom variables are carried out in Entrance, mainly through the interceptor of Entrance before the task is submitted and executed. The variable and the defined variable, and complete the code replacement through the initial value of the custom variable passed in by the task, and become the final executable code.

### 2.1 Technical Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The overall structure of custom variables is as follows. After the task is submitted, it will go through the variable replacement interceptor. First, all variables and expressions used in the code will be parsed, and then replaced with the system and user-defined initial values ​​of variables, and finally the parsed code will be submitted to EngineConn for execution. So the underlying engine is already replaced code.

![var_arc](/Images/Architecture/Commons/var_arc.png)

## 3. Function introduction
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The variable types supported by Linkis are divided into custom variables and system built-in variables. The internal variables are predefined by Linkis and can be used directly. Then different variable types support different calculation formats: String supports +, integer decimal supports +-*/, date supports +-.

### 3.1 Built-in variables
The currently supported built-in variables are as follows:

| variable name | variable type | variable meaning | variable value example |
| ------ | -------- | -------- | ------------ |
| run\_date | String | Data statistics time (support user's own setting, the default setting is the day before the current time), if the data of yesterday is executed today, it will be the time of yesterday, the format is yyyyMMdd | 20180129 |
| run\_date\_std | String | Data statistics time (standard date format), if yesterday's data is executed today, it will be yesterday's time, the format is yyyy-MM-dd | 2018-01-29 |
| run_today | String | The day after run_date (data statistics time), the format is yyyyMMdd | 20211210 |
| run_today_std | String | The day after run_date (data statistics time) (standard format), the format is yyyy-MM-dd | 2021-12-10 |
| run_mon | String | The month of the data statistics time, the format is yyyyMM | 202112 |
| run_mon_std | String | The month of the data statistics time (standard format), the format is yyyy-MM | 2021-12 |
| run\_month\_begin | String | The first day of the month in which the data is counted, in the format yyyyMMdd | 20180101 |
| run\_month\_begin\_std | String | The first day of the month where the data statistics time is (standard date format), the format is yyyy-MM-dd | 2018-01-01 |
| run_month_now_begin | String | The first day of the month where run_today is in the format yyyyMMdd | 20211201 |
| run_month_now_begin_std | String | The first day of the month run_today (standard format), the format is yyyy-MM-dd | 2021-12-01 |
| run\_month\_end | String | The last day of the month in which the data is counted, in the format yyyyMMdd | 20180131 |
| run\_month\_end\_std | String | The last day of the month in which the data is counted (standard date format), the format is yyyy-MM-dd | 2018-01-31 |
| run_month_now_end | String | The last day of the month where run_today is in the format yyyyMMdd | 20211231 |
| run_month_now_end_std | String | The last day of the month in which run_today is located (standard date format), the format is yyyy-MM-dd | 2021-12-31 |
| run_quarter_begin | String | The first day of the quarter in which the data is counted, in the format yyyyMMdd | 20210401 |
| run_quarter_end | String | The last day of the quarter in which the data is counted, in the format yyyyMMdd | 20210630 |
| run_half_year_begin | String | The first day of the half year where the data statistics time is located, in the format yyyyMMdd | 20210101 |
| run_half_year_end | String | The last day of the half year where the data statistics time is located, the format is yyyyMMdd | 20210630 |
| run_year_begin | String | The first day of the year in which the data is counted, in the format yyyyMMdd | 20210101 |
| run_year_end | String | The last day of the year in which the data is counted, in the format yyyyMMdd | 20211231 |
| run_quarter_begin_std | String | The first day of the quarter in which the data is counted (standard format), the format is yyyy-MM-dd | 2021-10-01 |
| run_quarter_end_std | String | The last day of the quarter where the data statistics time is located (standard format), the format is yyyy-MM-dd | 2021-12-31 |
| run_half_year_begin_std | String | The first day of the half year where the data statistics time is located (standard format), the format is yyyy-MM-dd | 2021-07-01 |
| run_half_year_end_std | String | The last day of the half year where the data statistics time is located (standard format), the format is yyyy-MM-dd | 2021-12-31 |
| run_year_begin_std | String | The first day of the year in which the data is counted (standard format), the format is yyyy-MM-dd | 2021-01-01 |
| run_year_end_std | String | The last day of the year in which the data is counted (standard format), the format is yyyy-MM-dd | 2021-12-31 |

details:

1. run_date is the core built-in date variable, which supports user-defined date. If not specified, the default is the day before the current system time.
2. Definition of other derived built-in date variables: other date built-in variables are calculated relative to run_date. Once run_date changes, other variable values ​​will also change automatically. Other date variables do not support setting initial values ​​and can only be modified by modifying run_date. .
3. Built-in variables support more abundant usage scenarios: ${run_date-1} is the day before run_data; ${run_month_begin-1} is the first day of the previous month of run_month_begin, where -1 means minus one month.

### 3.2 Custom variables
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What are custom variables? User variables that are defined first and then used. User-defined variables temporarily support the definition of strings, integers, and floating-point variables. Strings support the + method, and integers and floating-point numbers support the +-*/ method. User-defined variables do not conflict with the set variable syntax supported by SparkSQL and HQL, but the same name is not allowed. How to define and use custom variables? as follows:
````
## Defined in the code, specified before the task code
sql type definition method:
--@set f=20.1
The python/shell types are defined as follows:
#@set f=20.1
Note: Only one variable can be defined on one line
````
The use is directly used in the code through ```{varName expression}, such as ${f*2}```

### 3.3 Variable scope
Custom variables in linkis also have scope, and the priority is that the variable defined in the script is greater than the Variable defined in the task parameter is greater than the built-in run_date variable. The task parameters are defined as follows:
````
##restful
{
    "executionContent": {"code": "select \"${f-1}\";", "runType": "sql"},
    "params": {
                    "variable": {f: "20.1"},
                    "configuration": {
                            "runtime": {
                                "linkis.openlookeng.url":"http://127.0.0.1:9090"
                                }
                            }
                    },
    "source": {"scriptPath": "file:///mnt/bdp/hadoop/1.sql"},
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
````