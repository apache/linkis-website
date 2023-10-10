---
title: 免密认证
sidebar_position: 3
---
> 在有些场景下，为了方便开发调试，能够方便的访问页面和接口，可以开启测试模式配置，进行免密认证

## 1. 实现逻辑介绍

通过统一的认证处理filter:`org.apache.linkis.server.security.SecurityFilter` 来控制 

配置项
```properties
#是否开启测试模式
wds.linkis.test.mode=true
#测试模式的模拟用户名
wds.linkis.test.user=hadoop
```
实现的伪代码 
```scala
val BDP_TEST_USER = CommonVars("wds.linkis.test.user", "")
val IS_TEST_MODE = CommonVars("wds.linkis.test.mode", false)

if (IS_TEST_MODE.getValue) {
    logger.info("test mode! login for uri: " + request.getRequestURI)
    // 设置登陆用户信息为配置指定的用户
    SecurityFilter.setLoginUser(response, BDP_TEST_USER)
    true
}
```

## 2. 使用方式 

### 2.1 Step1 开启测试模式
直接修改配置文件 `linkis.properties`（对linkis所有服务生效）, 修改对应的配置如下 
```shell script
#是否开启测试模式
wds.linkis.test.mode=true
#测试模式的模拟用户名
wds.linkis.test.user=hadoop
```

如果只需要开启某个服务的测试模式，可以修改对应的服务配置项。
如 只开启 `entrance` 服务的测试模式 
直接修改配置文件 `linkis-cg-entrance.properties`（对linkis的entrance服务生效）, 修改对应的配置如下 
```shell script
#是否开启测试模式
wds.linkis.test.mode=true
#测试模式的模拟用户名
wds.linkis.test.user=hadoop
```

### 2.2 Step2 重启对应的服务 

修改配置后，需要重启对应的服务（如果是所有服务都开启，重启所有服务），才能生效


### 2.3 Step3 请求验证 

重启服务成功后，可以直接请求原来需要认证的http接口，无需额外的认证，便能正常请求.
管理台也无需登陆认证，就可以访问内容页面
 

## 3  注意事项 

### 3.1 wds.linkis.test.user的值设置 
因为部分接口会进行用户角色的权限校验，如: 【搜索历史EC信息】的接口:`/api/rest_j/v1/linkisManager/ecinfo/ecrHistoryList`
角色有：

|角色名 | 权限说明| 配置项 | 默认值 |
| -------- | -------- | ----- |----- |
|管理员角色|最高权限，拥有所有权限操作|`wds.linkis.governance.station.admin`|`hadoop`|
|历史任务角色|相对普通用户，还可以查看其他用户的所有任务列表信息|`wds.linkis.jobhistory.admin`|`hadoop`|
|普通角色|默认的角色|||

对于不同场景的测试，设置的`wds.linkis.test.user`的值，会有不同，需要按实际场景进行设置。
如果需要访问所有接口，需要配置为和`wds.linkis.governance.station.admin`一样的值，一般是`hadoop`