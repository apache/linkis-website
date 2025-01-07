---
title: 任务固定 EngineConn 执行
sidebar_position: 0.3
--- 

## 1. 需求背景
现在Linkis任务提交时，是基于标签进行创建或者复用 EngineConn（以下简称EC），多个任务间的 EC 是随机的。但是对于存在多任务需要能够满足任务的依赖性，在同一个EC 上进行执行就不能很好的做支持。在多人任务中添加新的 EngineConnInstanceLabel 来满足多任务固定同一个 EC 的目的。

## 2. 使用说明
1. 管理台添加特定标签，添加路径如下：登录管理台 -> ECM管理 -> 点击某 ECM 示例名称 -> 编辑待固定的 EC -> 添加 FixdEngineConnLabel 类型的标签。
![](/Images-zh/feature/ecm.png)
![](/Images-zh/feature/ec.png)
![](/Images-zh/feature/label.png)
2. 提交任务执行需要新增：FixdEngineConnLabel 标签 并提交到固定的实例
```json
"labels": {
    "engineType": "spark-2.4.3",
    "userCreator": "hadoop-IDE",
    "fixedEngineConn": "idvalue"
}
```
## 3. 注意事项
1. 第一个任务可以选择先获取EC实例列表进行选择，也可以直接提交任务进行创建

2. 如果EC不处于空闲可以用的状态，也会创建新的EC实例对任务进行执行，如果需要避免这种情况，可以在任务进行提交时调用EC实例查询接口，判断对应的EC是否存在和状态后再进行提交。