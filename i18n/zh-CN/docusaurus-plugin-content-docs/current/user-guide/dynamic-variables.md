---
title: 内置时间变量
sidebar_position: 7
---

## 1.总述
### 1.1 需求背景
用户希望在写代码时，对时间的格式要求千变万化,已有的[Linkis自定义变量](https://linkis.apache.org/docs/latest/architecture/commons/variable/)目前还不足以支撑这些需求。另外,已有的时间运算-1有些表示减一个月,有些则是减一天,用户很容易混淆

### 1.2 目标
* 其他日期内置变量都是相对run_date计算出来
* 支持Pattern格式时间且用户可以自行随意指定
* 支持±y/±M/±d/±H等等

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
e	|Day number of week (1 = Monday, …, 7 = Sunday)	|Number	|1
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

## 2. 总体设计
总体设计和技术架构参照[Linkis自定义变量](https://linkis.apache.org/docs/latest/architecture/commons/variable/)

## 3. 功能介绍
* Linkis支持的变量类型分为自定义变量(不做赘述)和系统内置变量，自定变量日期支持+-。
* 其中+-是先对linkis内置参数run_date进行运算,然后将%之前的pattern字段进行替换,非Pattern字符不支持运算替换。

### 3.1 内置变量举例
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

### 3.2 自定义变量使用实例

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
