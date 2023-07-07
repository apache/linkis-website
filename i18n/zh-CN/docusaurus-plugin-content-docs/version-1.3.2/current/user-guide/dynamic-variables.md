---
title: 内置时间变量
sidebar_position: 7
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

具体技术架构可以参考：
[Linkis自定义变量](https://linkis.apache.org/docs/latest/architecture/commons/variable/)

## 2 自定义变量功能介绍
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis支持的变量类型分为自定义变量和系统内置变量，内部变量是Linkis预先定义好的，可以直接进行使用。然后不同的变量类型支持不同的计算格式：String支持+、整数小数支持+-*/,日期支持+-。

### 2.1 内置变量
目前已支持的内置变量如下：
（下表中的变量值举例以闰年的20240229作为特殊日期）

| 变量名 | 变量类型 | 变量含义 | 变量值举例 |
| ------ | -------- | -------- | ---------- |
| run\_date | String | 数据统计时间（支持用户自己设定，默认设置为当前时间的前一天），如今天执行昨天的数据，则为昨天的时间，格式为 yyyyMMdd | 20240229 |
| run\_date\_std | String | 数据统计时间(标准日期格式)，如今天执行昨天数据，则为昨天的时间，格式为 yyyy-MM-dd | 2024-02-29 |
| run_today | String | run_date (数据统计时间) 的后一天，格式为 yyyyMMdd | 20240301 |
| run_today_std | String | run_date (数据统计时间) 的后一天（标准格式），格式为 yyyy-MM-dd | 2024-03-01 |
| run_mon | String | run_date所在月，格式为 yyyyMM | 202402 |
| run_mon_std | String | run_date所在月（标准格式），格式为 yyyy-MM | 2024-02 |
| run\_month\_begin | String | 数据统计时间所在月的第一天，格式为 yyyyMMdd | 20240201 |
| run\_month\_begin\_std | String | run_date 所在月的第一天(标准日期格式)，格式为 yyyy-MM-dd | 2024-02-01 |
| run_month_now_begin | String | run_today所在上月的第一天，格式为 yyyyMMdd | 20240201 |
| run_month_now_begin_std | String | run_today所在上月的第一天（标准格式），格式为 yyyy-MM-dd | 2024-02-01 |
| run\_month\_end | String | run_date所在月的最后一天，格式为 yyyyMMdd | 20240229 |
| run\_month\_end\_std | String | run_date 所在月的最后一天(标准日期格式)，格式为 yyyy-MM-dd | 2024-02-29 |
| run_month_now_end | String | run_today 所在上月的最后一天，格式为 yyyyMMdd | 20240229 |
| run_month_now_end_std | String | run_today 所在上月的最后一天（标准日期格式），格式为 yyyy-MM-dd | 2024-02-29 |
| run_quarter_begin | String | run_date所在季度的第一天，格式为 yyyyMMdd | 20240101 |
| run_quarter_end | String | run_date 所在季度的最后一天，格式为 yyyyMMdd | 20240331 |
| run_half_year_begin | String | run_date 所在半年的第一天，格式为 yyyyMMdd | 20240101 |
| run_half_year_end | String | run_date所在半年的最后一天，格式为 yyyyMMdd | 20240630 |
| run_year_begin | String | run_date所在年的第一天，格式为 yyyyMMdd | 20240101 |
| run_year_end | String | run_date所在年的最后一天，格式为 yyyyMMdd | 20241231 |
| run_quarter_begin_std | String | run_date所在季度的第一天（标准格式），格式为 yyyy-MM-dd | 2024-01-01 |
| run_quarter_end_std | String | run_date所在季度的最后一天（标准格式），格式为 yyyy-MM-dd | 2024-03-31 |
| run_half_year_begin_std | String | run_date所在半年的第一天（标准格式），格式为 yyyy-MM-dd | 2024-01-01 |
| run_half_year_end_std | String | run_date所在半年的最后一天（标准格式），格式为 yyyy-MM-dd | 2024-06-30 |
| run_year_begin_std | String | run_date所在年的第一天（标准格式），格式为 yyyy-MM-dd | 2024-01-01 |
| run_year_end_std | String | run_date所在年的最后一天（标准格式），格式为 yyyy-MM-dd | 2024-12-31 |
| run_tody_h | String | run_today任务运行的时间， yyyyMMddHH | 2024030111 |
| run_tody_h_std | String | run_today任务运行的时间 yyyy-MM-dd HH | 2024-03-01 11 |

具体细节：

1、run_date为核心自带日期变量，支持用户自定义日期，如果不指定默认为当前系统时间的前一天。
2、其他衍生内置日期变量定义：其他日期内置变量都是相对run_date计算出来的，一旦run_date变化，其他变量值也会自动跟着变化，其他日期变量不支持设置初始值，只能通过修改run_date进行修改。
3、内置变量支持更加丰富的使用场景：${run_date-1}为run_data的前一天；${run_month_begin-1}为run_month_begin的上个月的第一天，这里的-1表示减一个月。

以sql为例的例子：
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

编译替换后的内容：
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

### 2.2 自定义变量
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

### 2.3 变量作用域
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

## 3. Date Pattern变量介绍

### 3.1 功能

* 支持Pattern格式时间且用户可以自行随意指定
* Pattern日期变量都是相对run_date计算出来的
* 支持±y/±M/±d/±H等等
* 其中+-是先对linkis内置参数run_date进行运算,然后将%之前的pattern字段进行替换,非Pattern字符不支持运算替换。

Pattern格式对照表:

Letter|	Date or Time Component|	Presentation|	Examples
----- | ----- | ----- | -----
G	|Era designator	|Text	|AD
y	|Year	|Year	|1996; 96
Y	|Week year	|Year	|2009; 09
M	|Month in year	|Month|	July; Jul; 07
w	|Week in year	|Number	|27
W	|Week in month	|Number	|2
D	|Day in year	|Number|	189
d	|Day in month	|Number	|10
F	|Day of week in month|	Number	|2
E	|Day name in week	|Text	|Tuesday; Tue
u	|Day number of week (1 = Monday, …, 7 = Sunday)	|Number	|1
a	|Am/pm marker	|Text	|PM
H	|Hour in day (0-23)	|Number|	0
k	|Hour in day (1-24)|	Number	|24
K	|Hour in am/pm (0-11)|	Number	|0
h	|Hour in am/pm (1-12)	|Number	|12
m	|Minute in hour	|Number	|30
s	|Second in minute	|Number|	55
S	|Millisecond	|Number	|978
z	|Time zone	|General time zone	|Pacific Standard Time; PST; GMT-08:00
Z	|Time zone	|RFC 822 time zone	|-0800
X	|Time zone	|ISO 8601 time zone	|-08; -0800; -08:00


### 3.2 Date Pattern变量举例
可以根据自己的喜好/业务实际情况定义需要动态渲染的参数

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

### 3.3 Date Pattern变量使用实例

* 例子1: sql
```sql
SELECT * FROM hive.tmp.fund_nav_histories
WHERE dt <= DATE_FORMAT(DATE_ADD('day', -1, DATE(Date_parse('&{yyyyMMdd%-1d}', '%Y%m%d'))), '%Y%m%d')
```
渲染后
```sql
SELECT * FROM hive.tmp.fund_nav_histories
WHERE dt <= DATE_FORMAT(DATE_ADD('day', -1, DATE(Date_parse('20220705', '%Y%m%d'))), '%Y%m%d')
```

* 例子2: shell
```shell
aws s3 ls  s3://***/ads/tmp/dws_member_active_detail_d_20210601_20211231/pt=&{yyyyMMdd%-1d}/
```
渲染后
```shell
aws s3 ls  s3://***/ads/tmp/dws_member_active_detail_d_20210601_20211231/pt=20220705/
```

* 例子3: datax json
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
渲染后
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
* 例子4:python
```python   
print(&{yyyyMMdd%-1d})
```
渲染后
```
 20220705
```