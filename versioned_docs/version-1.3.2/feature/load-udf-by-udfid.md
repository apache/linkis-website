---
title: Load UDF by UDF ID
sidebar_position: 0.2
---

## 1. Background
In some scenarios, UDF is not loaded through visual interfaces such as Scripts and DSS, but through code. This needs to provide the function of loading UDF by UDF ID.

## 2. Instructions for use
Parameter Description:

| parameter name | description | default value |
|--------------|----------------|--------|
|`linkis.user.udf.all.load` | Whether to load all UDFs selected by the user | true |
|`linkis.user.udf.custom.ids`| UDF ID list, separated by `,` | - |

Submit the task through RestFul, the request example is as follows.
```json
POST /api/rest_j/v1/entrance/submit
Content-Type: application/json
Token-Code: dss-AUTH
Token-User: linked

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

## 3. Precautions
1. When `linkis.user.udf.all.load` specifies true, the `linkis.user.udf.custom.ids` parameter does not take effect

2. This function is independent of the loading of `/udf/isload?udfId=123&isLoad=true` interface