---
title:  linkis中移除json4s依赖
sidebar_position: 0.2
---

## 1. 需求背景
spark 不同版本依赖不同的json4s版本，不利于spark多版本的支持，我们需要减少这个json4s依赖，从linkis中移除json4s.

## 2. 使用说明
spark自定义版本源码编译时不需要修改json4s的依赖