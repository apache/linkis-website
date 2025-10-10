---
title: built-in time variable
sidebar_position: 7
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

The specific technical architecture can refer to:
[Linkis Custom Variables](https://linkis.apache.org/docs/latest/architecture/commons/variable/)

## 2 Custom variable function introduction
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The variable types supported by Linkis are divided into custom variables and system built-in variables. The internal variables are pre-defined by Linkis and can be used directly. Then different variable types support different calculation formats: String supports +, integers and decimals support +-*/, and dates support +-.

### 2.1 Built-in variables
Currently supported built-in variables are as follows:
(The variable values in the following table take 20240229 in leap year as a special date as an example)

| variable name | variable type | variable meaning | variable value example |
| ------ | -------- | -------- | ---------- |
| run\_date | String | Data statistics time (users can set it themselves, the default setting is the day before the current time), if you execute yesterday’s data today, it will be yesterday’s time, the format is yyyyMMdd | 20240229 |
| run\_date\_std | String | Data statistics time (standard date format), if yesterday’s data is executed today, it is yesterday’s time, the format is yyyy-MM-dd | 2024-02-29 |
| run_today | String | The day after run_date (data statistics time), the format is yyyyMMdd | 20240301 |
| run_today_std | String | The day after run_date (data statistics time) (standard format), the format is yyyy-MM-dd | 2024-03-01 |
| run_mon | String | The month of run_date, the format is yyyyMM | 202402 |
| run_mon_std | String | The month of run_date (standard format), the format is yyyy-MM | 2024-02 |
| run\_month\_begin | String | The first day of the month where the data statistics time is located, the format is yyyyMMdd | 20240201 |
| run\_month\_begin\_std | String | The first day of the month where run_date is located (standard date format), the format is yyyy-MM-dd | 2024-02-01 |
| run_month_now_begin | String | the first day of the previous month where run_today is located, the format is yyyyMMdd | 20240201 |
| run_month_now_begin_std | String | The first day of the previous month where run_today is located (standard format), the format is yyyy-MM-dd | 2024-02-01 |
| run\_month\_end | String | The last day of the month where run_date belongs, in the format of yyyyMMdd | 20240229 |
| run\_month\_end\_std | String | The last day of the month of run_date (standard date format), the format is yyyy-MM-dd | 2024-02-29 |
| run_month_now_end | String | the last day of the previous month where run_today is located, the format is yyyyMMdd | 20240229 |
| run_month_now_end_std | String | The last day of the previous month where run_today is located (standard date format), the format is yyyy-MM-dd | 2024-02-29 |
| run_quarter_begin | String | The first day of the quarter where run_date belongs, the format is yyyyMMdd | 20240101 |
| run_quarter_end | String | The last day of the quarter where run_date is located, in the format of yyyyMMdd | 20240331 |
| run_half_year_begin | String | The first day of the half year where run_date is located, the format is yyyyMMdd | 20240101 |
| run_half_year_end | String | The last day of the half year where run_date is located, the format is yyyyMMdd | 20240630 |
| run_year_begin | String | The first day of the year where run_date is located, the format is yyyyMMdd | 20240101 |
| run_year_end | String | The last day of the year where run_date is located, the format is yyyyMMdd | 20241231 |
| run_quarter_begin_std | String | The first day of the quarter where run_date belongs (standard format), the format is yyyy-MM-dd | 2024-01-01 |
| run_quarter_end_std | String | The last day of the quarter where run_date belongs (standard format), the format is yyyy-MM-dd | 2024-03-31 |
| run_half_year_begin_std | String | The first day of the half year where run_date is located (standard format), the format is yyyy-MM-dd | 2024-01-01 |
| run_half_year_end_std | String | The last day of the half year where run_date is located (standard format), the format is yyyy-MM-dd | 2024-06-30 |
| run_year_begin_std | String | The first day of the year where run_date is located (standard format), the format is yyyy-MM-dd | 2024-01-01 |
| run_year_end_std | String | The last day of the year of run_date (standard format), the format is yyyy-MM-dd | 2024-12-31 |
| run_tody_h | String | run_today task running time, yyyyMMddHH | 2024030111 |
| run_tody_h_std | String | The running time of the run_today task yyyy-MM-dd HH | 2024-03-01 11 |

details:

1. run_date is a date variable that comes with the core, and supports user-defined dates. If not specified, it defaults to the day before the current system time.
2. Definition of other derived built-in date variables: other date built-in variables are calculated relative to run_date. Once run_date changes, the values of other variables will also change automatically. Other date variables do not support setting initial values and can only be modified by modifying run_date .
3. The built-in variables support richer usage scenarios: ${run_date-1} is the day before run_data; ${run_month_begin-1} is the first day of the previous month of run_month_begin, where -1 means minus one month.

Take sql as an example:
```
--@set run_date=20240229
select
"${run_date}" as run_date,
"${run_date_std}" as run_date_std,
"${run_today}" as run_today,
"${run_today_std}" as run_today_std,
"${run_mon}" as run_mon,
"${run_mon_std}" as run_mon_std,
"${run_month_begin}" as run_month_begin,
"${run_month_begin_std}" as run_month_begin_std,
"${run_month_now_begin}" as run_month_now_begin,
"${run_month_now_begin_std}" as run_month_now_begin_std,
"${run_month_end}" as run_month_end,
"${run_month_end_std}" as run_month_end_std,
"${run_month_now_end}" as run_month_now_end,
"${run_month_now_end_std}" as run_month_now_end_std,
"${run_quarter_begin}" as run_quarter_begin,
"${run_quarter_end}" as run_quarter_end,
"${run_half_year_begin}" as run_half_year_begin,
"${run_half_year_end}" as run_half_year_end,
"${run_year_begin}" as run_year_begin,
"${run_year_end}" as run_year_end,
"${run_quarter_begin_std}" as run_quarter_begin_std,
"${run_quarter_end_std}" as run_quarter_end_std,
"${run_half_year_begin_std}" as run_half_year_begin_std,
"${run_half_year_end_std}" as run_half_year_end_std,
"${run_year_begin_std}" as run_year_begin_std,
"${run_year_end_std}" as run_year_end_std,
"${run_today_h}" as run_tody_h,
"${run_today_h_std}" as run_tody_h_std

Compile the replaced content:
select 
"20240229" as run_date,
"2024-02-29" as run_date_std,
"20240301" as run_today,
"2024-03-01" as run_today_std, 
"202402" as run_mon,
"2024-02" as run_mon_std,
"20240201" as run_month_begin,
"2024-02-01" as run_month_begin_std,
"20240201" as run_month_now_begin, 
"2024-02-01" as run_month_now_begin_std,
"20240229" as run_month_end,
"2024-02-29" as run_month_end_std,
"20240229" as run_month_now_end,
"2024-02-29" as run_month_now_end_std, 
"20240101" as run_quarter_begin,
"20240331" as run_quarter_end,
"20240101" as run_half_year_begin,
"20240630" as run_half_year_end,
"20240101" as run_year_begin, 
"20241231" as run_year_end,
"2024-01-01" as run_quarter_begin_std,
"2024-03-31" as run_quarter_end_std,
"2024-01-01" as run_half_year_begin_std,
"2024-06-30" as run_half_year_end_std, 
"2024-01-01" as run_year_begin_std,
"2024-12-31" as run_year_end_std,
"2024030111" as run_tody_h,
"2024-03-01 11" as run_tody_h_std

```

### 2.2 Custom variables
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What are custom variables? User variables that are defined first and used later. User-defined variables temporarily support the definition of strings, integers, and floating-point variables. Strings support the + method, and integers and floating-point numbers support the +-*/ method. User-defined variables do not conflict with the set variable syntax supported by SparkSQL and HQL itself, but the same name is not allowed. How to define and use custom variables? as follows:
```
## Defined in the code, specify before the task code
sql type definition method:
--@set f=20.1
The python/Shell type is defined as follows:
#@set f=20.1
Note: Only one line to define a variable is supported
```
The use is directly used in the code through ```{varName expression}, such as ${f*2}```

### 2.3 Variable scope
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

## 3. Date Pattern variable introduction

### 3.1 Features

* Support Pattern format time and users can specify it at will
* Pattern date variables are calculated relative to run_date
* Support ±y/±M/±d/±H etc.
* Among them, +- is to operate on the linkis built-in parameter run_date first, and then replace the pattern field before %. Non-Pattern characters do not support operation and replacement.

Pattern format comparison table:

Letter| Date or Time Component| Presentation| Examples
----- | ----- | ----- | -----
G |Era designator |Text |AD
y |Year |Year |1996; 96
Y |Week year |Year |2009; 09
M |Month in year |Month| July; Jul; 07
w |Week in year |Number |27
W |Week in month |Number |2
D |Day in year |Number| 189
d |Day in month |Number |10
F |Day of week in month| Number |2
E |Day name in week |Text |Tuesday; Tue
u |Day number of week (1 = Monday, …, 7 = Sunday) |Number |1
a |Am/pm marker |Text |PM
H |Hour in day (0-23) |Number| 0
k |Hour in day (1-24)| Number |24
K |Hour in am/pm (0-11)| Number |0
h |Hour in am/pm (1-12) |Number |12
m |Minute in hour |Number |30
s |Second in minute |Number| 55
S |Millisecond |Number |978
z |Time zone |General time zone |Pacific Standard Time; PST; GMT-08:00
Z |Time zone |RFC 822 time zone |-0800
X |Time zone |ISO 8601 time zone |-08; -0800; -08:00


### 3.2 Date Pattern variable example
You can define the parameters that need dynamic rendering according to your own preferences/business actual situation

variable | result
--- | ---
&{yyyy-01-01} | 2021-01-01
&{yyyy-01-01%-2y} | 2019-01-01
&{yyyy-MM-01%-2M} | 2021-02-01
&{yyyy-MM-dd%-2d} | 2021-03-31
&{yyyy MM ----- HH%-1H} | 2021 04 ----- 14
&{yyyyMMdd%-1d} | 20210401
&{yyyyMM01%-1M} | 20210301
&{HH%-1H} | 14

### 3.3 Date Pattern variable usage examples

* Example 1: sql
```sql
SELECT * FROM hive.tmp.fund_nav_histories
WHERE dt <= DATE_FORMAT(DATE_ADD('day', -1, DATE(Date_parse('&{yyyyMMdd%-1d}', '%Y%m%d'))), '%Y%m%d')
```
after rendering
```sql
SELECT * FROM hive.tmp.fund_nav_histories
WHERE dt <= DATE_FORMAT(DATE_ADD('day', -1, DATE(Date_parse('20220705', '%Y%m%d'))), '%Y%m%d')
```

* Example 2: shell
```shell
aws s3 ls s3://***/ads/tmp/dws_member_active_detail_d_20210601_20211231/pt=&{yyyyMMdd%-1d}/
```
after rendering
```shell
aws s3 ls s3://***/ads/tmp/dws_member_active_detail_d_20210601_20211231/pt=20220705/
```

* Example 3: datax json
```json
{
   "job": {
     "setting": {
       "speed": {
         "channel": 1
       }
     },
     "content": [
       {
         "reader": {
           "name": "s3reader",
           "parameter": {
             "bucket": "**************",
             "path": [
               "ads/tmp/ccass_tm_announcements/&{yyyyMMdd%-1d}/"
             ],
             "stored": "parquet",
             "compression": "NONE",
             "column": [
               {
                 "index": 0,
                 "type": "int"
               },
               {
                 "index": 1,
                 "type": "string",
                 "constant": "&{yyyyMMdd%-1d}"
               }
             ]
           }
         },
         "writer": {
           "name": "streamwriter",
           "parameter": {
             "print": true
           }
         }
       }
     ]
   }
}
```
after rendering
```json
{
   "job": {
     "setting": {
       "speed": {
         "channel": 1
       }
     },
     "content": [
       {
         "reader": {
           "name": "s3reader",
           "parameter": {
             "bucket": "**************",
             "path": [
               "ads/tmp/ccass_tm_announcements/20220705/"
             ],
             "stored": "parquet",
             "compression": "NONE",
             "column": [
               {
                 "index": 0,
                 "type": "int"
               },
               {
                 "index": 1,
                 "type": "string",
                 "constant": "20220705"
               }
             ]
           }
         },
         "writer": {
           "name": "streamwriter",
           "parameter": {
             "print": true
           }
         }
       }
     ]
   }
}
```
* Example 4:python
```python
print(&{yyyyMMdd%-1d})
```
after rendering
```
  20220705
```