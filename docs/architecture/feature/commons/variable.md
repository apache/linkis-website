---
title: Custom Variable Design
sidebar_position: 1
---

## 1. Overview
### need
1. The user hopes that Linkis can provide some public variables and then replace them during execution. For example, the user runs the same SQL in batches every day, and needs to specify the partition time of the previous day. Writing based on SQL will be more complicated if the system provides a run_date variable It will be very convenient to use.
2. The user hopes that Linkis supports date pattern calculation, supports writing variables such as &{YYYY-MM-DD} in the code to calculate time variables
3. The user wants to define variables by himself, such as setting a float variable, and then use it in the code

### Target
1. Support variable replacement of task code
2. Support custom variables, support users to define custom variables in scripts and task parameters submitted to Linkis, support simple +, - and other calculations
3. Preset system variables: run_date, run_month, run_today and other system variables
4. Support date pattern variable, support +, - operation of pattern

## 2. Overall Design
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;During the execution of the Linkis task, the custom variable is carried out in Entrance, mainly through the interceptor of Entrance before the task is submitted and executed. Variables and defined variables, and the initial value of the custom variable passed in through the task completes the code replacement and becomes the final executable code.

### 2.1 Technical Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The overall structure of custom variables is as follows. After the task is submitted, it will pass through the variable replacement interceptor. First, it will analyze all the variables and expressions used in the code, and then replace them with the initial values of the system and user-defined variables, and finally submit the parsed code to EngineConn for execution. So the underlying engine is already replaced code.

![arc](/Images/Architecture/Commons/var_arc.png)

Remarks: Because the functions of variable and parsing are more general, the extraction tool class is defined in linkis-commons: org.apache.linkis.common.utils.VariableUtils

### 2.2 Business Architecture
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The feature this time is mainly to complete the analysis, calculation, and replacement functions of variable substitution, which mainly involves the Entrance module of linkis for code interception and the variable substitution tools defined by the Linkis-commons module :

| Component Name | Level 1 Module | Level 2 Module | Function Point |
|---|---|---|---|
| Linkis | CG | Entrance|Intercept task code and call Linkis-common's VariableUtils for code replacement|
| Linkis | Linkis-commons | linkis-common|Provide variable, analysis, calculation tool class VariableUtils|

## 3. Module design
### 3.1 Core Execution Process
[input port] The input port is code and code type (python/sql/scala/sh).
[Processing flow] Entrance will first enter the interceptor after receiving the task, and start the variable interceptor to complete the analysis, replacement and calculation of variables
The overall timing diagram is as follows:

![time](/Images/Architecture/Commons/var_time.png)

What needs to be explained here is:
1. Custom variables and system variables are used in ${}, such as ${run_date}
2. The date pattern variable is used as &{}, for example, the value of &{yyyy-01-01} is 2022-01-01.
   The reason why it is divided into two different ways is to prevent the string defined by the custom variable from containing pattern characters. For example, if a custom variable with y=1 is defined, it may represent different meanings, and it will be the year variable by the pattern task.


### 3.2 Specific details:
1. run_date is a date variable that comes with the core, and supports user-defined dates. If not specified, it defaults to the day before the current system time.
2. Definition of other derived built-in date variables: other date built-in variables are calculated relative to run_date. Once run_date changes, the values of other variables will also change automatically. Other date variables do not support setting initial values and can only be modified by modifying run_date .
3. The built-in variables support richer usage scenarios: ${run_date-1} is the day before run_data; ${run_month_begin-1} is the first day of the previous month of run_month_begin, where -1 means minus one month.
4. Pattern type variables are also calculated based on run_date, and then replaced and +—

### 3.3 Variable scope
Custom variables also have a scope in linkis, and the priority is that the variable defined in the script is greater than the Variable defined in the task parameter and greater than the built-in run_date variable. The task parameters are defined as follows:
```
## restful
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
JobSubmitAction. builder
   .addExecuteCode(code)
   .setStartupParams(startupMap)
   .setUser(user) //submit user
   .addExecuteUser(user) //execute user
   .setLabels(labels)
   .setVariableMap(varMap) //setVar
   .build
```

## 4. Interface design:
The main tools are:
```
VariableUtils:
def replace(replaceStr: String): String replaces the variable in the code and returns the replaced code
def replace(replaceStr: String, variables: util.Map[String, Any]): String supports passing in the value of a custom variable for replacement
def replace(code: String, runtType: String, variables: util.Map[String, String]): String supports incoming code types, and performs replacement parsing according to different types
```