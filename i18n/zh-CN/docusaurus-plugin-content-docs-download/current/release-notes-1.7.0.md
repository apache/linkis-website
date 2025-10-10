---
title: Release Notes 1.7.0
sidebar_position: 88
---

Apache Linkis 1.7.0 版本，主要新增如下特性功能： Linkis的RPC功能支持自动重试、引入Spring boot Admin模块，监控管理Linkis服务、EC支持设置状态为unhealthy并在空闲时自动退出、在ECM服务中添加容器化模式，允许在该模式下将与外界通信的特定IP和端口等

主要功能如下：

- Spring 全家桶升级为最新安全版本（Spring Cloud gateway(3.1.8)、Spring Boot(2.7.11)）
- Orchestrator支持可插拔
- 结果集存储支持切换为ORC和Parquet格式存储
- Flink支持UDF函数
- 支持Doris引擎
- 管理台任务看板功能

缩写：
- COMMON: Linkis Common
- ENTRANCE: Linkis Entrance
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM: Linkis Manager
- PS: Linkis Public Service
- PE: Linkis Public Enhancement
- RPC: Linkis Common RPC
- CG: Linkis Computation Governance
- DEPLOY: Linkis Deployment
- WEB: Linkis Web
- GATEWAY: Linkis Gateway
- EP: Engine Plugin
- ORCHESTRATOR: Linkis Orchestrator
- CLIENT： Linkis Client

## 新特性

- Linkis的RPC功能支持自动重试
- 引入Spring boot Admin模块，监控管理Linkis服务
- EC支持设置状态为unhealthy并在空闲时自动退出
- 在Spark引擎中添加对SparkMeasure的支持，以便更好地监控Spark的性能
- 在ECM服务中添加容器化模式，允许在该模式下将与外界通信的特定IP和端口分配给特定引擎

## 增强点

- 管理台修改配置后主动kill对应空闲引擎，让参数立即生效
- 支持用户在脚本中指定固定对应的引擎实例进行执行
- 增加系统内置日期变量，支持run_today_h 等
- 前端全局历史增加查看运行代码功能
- 数据源服务新增接口返回用户下有写权限的hive库名
- 公共增强服务操作HDFS支持通过使用管理员的FS
- 公共增强服务新增接口查询结果集文件MD5值
- Linkis Manager引擎Ask增加延时调度，防止并发过大导致引擎同时请求过多
- 排队中的任务支持定时打印排队信息，帮助确认任务是否异常Hang住
- 优化日志打印资源不足时用户需要修改的具体参数
- 引擎复用优化，智能判断当前任务携带资源参数，避免复杂任务复用小资源
- 历史任务设置部门管理员权限仅支持查看所在部门人员提交的历史任务
- 前端全局历史页面支持按照ECM机器过滤作业
- 前端资源面板页面分类支持按应用展示
- 用户结果集展示优化限制展示列数量
- 结果集某字段超1w报错信息优化
- pipeline csv文件导出参数配置新增竖线、分号分隔符
- 引擎实例增加驱动引擎启动的任务ID标签
- 支持将任务来源信息传递到Yarn层的label里面
- Linkis client sdk查询Hive数据返回结果适配Map、Array、Struct复杂数据类型
- 前端管理台ECM表增加备注字段
- 前端历史任务界面优化支持时间范围查询精确到分钟
- Hive任务日志打印展示 yarn的applicaiton地址信息
- 查看日志接口 openLog 添加文件大小30M限制
- 新增判断执行任务资源是否充足的接口
- LinkisManager引擎申请调整为异步模式，可以显著提高引擎申请的并发
- Linkis管理台支持引擎日志下载功能
- Trino引擎任务日志打印集群 URL，将 Trino 的 queryId包含 linkis 的 taskid
- 公共增强服务文件操作支持文件目录的移动
- 引擎任务日志主动推送 新增用户主动kill引擎后，任务日志中记录用户主动kill的操作

## 修复功能

- 资源管理页面引擎剩余资源数据展示问题修复
- Spark引擎任务偶现ThreadDeath问题修复
- pyspark脚本查询数据异常信息提示错误优化
- 引擎日志入口功能仅对管理员开放
- 结果集单行数据过大导致OOM问题修复
- 执行 Spark Scala任务，任务取消状态流转错误问题修复
- 提交python任务 取消后，后续复用引擎的任务偶发报错“创建单机Python解释器失败”问题
- 优化HDFS文件用户数过大，可能导致的FullGC问题
- 修复Trino/presto返回的decimal 字段存在空格时  类型转换错误的问题

## 致谢
Apache Linkis 1.7.0 的发布离不开 Linkis 社区的贡献者，感谢所有的社区贡献者
