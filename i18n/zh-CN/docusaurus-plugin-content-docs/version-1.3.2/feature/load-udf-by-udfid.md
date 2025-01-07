---
title: 通过 UDF ID 加载 UDF
sidebar_position: 0.2
--- 

## 1. 背景
在一些场景加载 UDF 不是通过 Scripts、DSS 等可视化界面进行加载，而是通过代码进行加载。这就需要提供通过 UDF ID 加载 UDF 的功能。

## 2. 使用说明
参数说明：

| 参数名                      | 说明                   |  默认值|
|--------------------------- |------------------------|--------|
|`linkis.user.udf.all.load`  | 是否加载用户选中的所有 UDF | true |
|`linkis.user.udf.custom.ids`| UDF ID 列表，用 `,` 分隔 |  -   |

通过 RestFul 的方式提交任务，请求示例如下。
```json
POST /api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linkis

{
    "executionContent": {
        "code": "show databases",
        "runType": "sql"
    },
    "params": {
        "configuration": {
            "startup": {
                "linkis.user.udf.all.load": false
                "linkis.user.udf.custom.ids": "1,2,3"
            }
        }
    },
    "labels": {
        "engineType": "spark-2.4.3",                  // pattern：engineType-version
        "userCreator": "linkis-IDE"                   // userCreator: linkis is username。IDE is system that be configed in Linkis。
    }
}
```

## 3. 注意事项
1. 当 `linkis.user.udf.all.load` 指定 true 时，`linkis.user.udf.custom.ids` 参数不生效

2. 该功能与 `/udf/isload?udfId=123&isLoad=true` 接口的加载是相互独立的
