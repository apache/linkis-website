---
title: 移除 DSS Support 依赖
sidebar_position: 0.4
--- 

## 1. 需求背景
Linkis 微服务模块中依赖了 dss-gateway-support jar 包，在使用 scala 2.12 之前的版本编译时会出现 jar 包冲突的情况。因此考虑去掉 dss-gateway-support 模块依赖。

## 2. 使用说明

移除 dss-gateway-support 依赖后，不影响 Linkis 使用。

## 3. 注意事项

Linkis >= 1.3.2 版本，遇到 dss support 相关的错误，可查看 $LINKIS_HOME/lib/linkis-spring-cloud-services/linkis-mg-gateway 目录下是否有 dss support 相关的 jar包，如果有删除相关 jar 包，重启服务即可。 