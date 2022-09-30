---
title: Linkis built-in time variable introduction
sidebar_position: 7
---
## 1. General
### Requirements Background
Users hope that when writing code, the time format requirements are ever-changing, and the existing [Linkis custom variables](https://linkis.apache.org/docs/latest/architecture/commons/variable/) is currently not enough to support these requirements. In addition, some of the existing time operation -1 means minus one month, and some minus one day, which is easy for users to confuse

### Target
* Other date built-in variables are calculated relative to run_date
* Support Pattern format time and users can specify at will
* Support ±y/±M/±d/±H etc.

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
e |Day number of week (1 = Monday, …, 7 = Sunday) |Number |1
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

## 2. Overall Design
The overall design and technical architecture refer to [Linkis Custom Variables](https://linkis.apache.org/docs/latest/architecture/commons/variable/)

## 3. Function introduction
* The variable types supported by Linkis are divided into custom variables (not to be repeated) and system built-in variables. The custom variable date supports +-.
* Among them, +- is to perform operation on the built-in parameter run_date of linkis, and then replace the pattern field before %. Non-pattern characters do not support operation replacement.

### 3.1 Examples of built-in variables
You can define parameters that need to be dynamically rendered according to your own preferences/business actual situation

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

### 3.2 Custom Variable Usage Example

* Example 1: sql
```sql
SELECT * FROM hive.tmp.fund_nav_histories
WHERE dt <= DATE_FORMAT(DATE_ADD('day', -1, DATE(Date_parse('&{yyyyMMdd%-1d}', '%Y%m%d'))), '%Y%m%d')
````
after rendering
```sql
SELECT * FROM hive.tmp.fund_nav_histories
WHERE dt <= DATE_FORMAT(DATE_ADD('day', -1, DATE(Date_parse('20220705', '%Y%m%d'))), '%Y%m%d')
````

* Example 2: shell
```shell
aws s3 ls s3://***/ads/tmp/dws_member_active_detail_d_20210601_20211231/pt=&{yyyyMMdd%-1d}/
````
after rendering
```shell
aws s3 ls s3://***/ads/tmp/dws_member_active_detail_d_20210601_20211231/pt=20220705/
````

* Example 3: datax json
````json
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
            "bucket": "****************",
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
````
after rendering
````json
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
            "bucket": "****************",
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
````
* Example 4: python
````python
print(&{yyyyMMdd%-1d})
````
after rendering
````
 20220705
````