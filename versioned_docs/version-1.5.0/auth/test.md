---
title: Password-Free
sidebar_position: 3
---
> In some scenarios, in order to facilitate development and debugging, and to access pages and interfaces conveniently, you can enable test mode configuration for secret-free authentication

## 1. Implementation logic introduction

Control through unified authentication processing filter: `org.apache.linkis.server.security.SecurityFilter`

configuration item
```properties
# Whether to enable test mode
wds.linkis.test.mode=true
# Simulated user name for test mode
wds.linkis.test.user=hadoop
```
Implemented pseudocode
```scala
val BDP_TEST_USER = CommonVars("wds.linkis.test.user", "")
val IS_TEST_MODE = CommonVars("wds. linkis. test. mode", false)

if (IS_TEST_MODE. getValue) {
     logger.info("test mode! login for uri: " + request.getRequestURI)
     // Set the login user information to the user specified in the configuration
     SecurityFilter.setLoginUser(response, BDP_TEST_USER)
     true
}
```

## 2. How to use

### 2.1 Step1 Open the test mode
Directly modify the configuration file `linkis.properties` (effective for all linkis services), modify the corresponding configuration as follows
```shell script
# Whether to enable test mode
wds.linkis.test.mode=true
# Simulated user name for test mode
wds.linkis.test.user=hadoop
```

If you only need to enable the test mode of a certain service, you can modify the corresponding service configuration item.
For example: only enable the test mode of `entrance` service
Directly modify the configuration file `linkis-cg-entrance.properties` (effective for the entry service of linkis), modify the corresponding configuration as follows
```shell script
# Whether to enable test mode
wds.linkis.test.mode=true
# Simulated user name for test mode
wds.linkis.test.user=hadoop
```

### 2.2 Step2 Restart the corresponding service

After modifying the configuration, you need to restart the service to take effect


### 2.3 Step3 request verification

After successfully restarting the service, you can directly request the http interface that originally required authentication, and you can request normally without additional authentication.
The management console can also access the content page without login authentication
 

## 3 Notes

### 3.1 Value setting of wds.linkis.test.user
Because some interfaces will perform permission verification of user roles, such as: [Search historical EC information] interface: `/api/rest_j/v1/linkisManager/ecinfo/ecrHistoryList`
The roles are:

|role name | permission description | configuration item | default value |
| -------- | -------- | ----- |----- |
|Administrator role|The highest authority, has all authority operations|`wds.linkis.governance.station.admin`|`hadoop`|
|Historical task role|Compared with ordinary users, you can also view all task list information of other users|`wds.linkis.jobhistory.admin`|`hadoop`|
|Normal role|Default role|||

For tests in different scenarios, the set value of `wds.linkis.test.user` will be different and needs to be set according to the actual scenario.
If you need to access all interfaces, you need to configure it to the same value as `wds.linkis.governance.station.admin`, usually `hadoop`