---
title: Release Notes 1.1.3
sidebar_position: 0.2
--- 

Apache Linkis(incubating) 1.1.3 包括所有 [Project Linkis-1.1.3](https://github.com/apache/incubator-linkis/projects/19)。


本次发布主要 集成Prometheus，提供linkis微服务监控的基础能力；任务提交新增任务重试次数参数；增加任务与执行EC的关联信息记录；Flink引擎支持将 Yarn 日志下载到 EC 日志目录；前端页面支持水印；部分安全漏洞组件升级等；修复社区反馈的已知 bug

主要功能如下：
* 集成prometheus，提供linkis微服务监控的基础能力
* 任务提交支持任务重试次数的参数
* Flink引擎支持将 Yarn 日志下载到 EC 日志目录
* 部分依赖包的升级和社区已知问题修复

缩写：
- COMMON: Linkis Common
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM:  Linkis Manager
- PS: Linkis Public Service
- PE: Linkis Public Enhancement
- RPC: Linkis Common RPC
- CG: Linkis Computation Governance
---
## 新特性
* \[Common][[Linkis-1656]](https://github.com/apache/incubator-linkis/issues/1656)  集成prometheus，提供linkis微服务监控的基础能力
* \[EC-Flink][[Linkis-2241]](https://github.com/apache/incubator-linkis/pull/2241) 添加 Yarn Log Operator，支持将 Yarn 日志下载到 EC 日志目录
* \[Web][[Linkis-2235]](https://github.com/apache/incubator-linkis/issues/2108) 前端页面支持水印
* \[Entrance][[Linkis-2164]](https://github.com/apache/incubator-linkis/pull/2164) Entrance 支持任务重试次数的参数 
* \[EC][[Linkis-2163]](https://github.com/apache/incubator-linkis/pull/2163) 增加任务与执行EC的记录，EC信息记录到任务的 Metrics字段中

## 增强点
* \[ECM][[Linkis-2243]](https://github.com/apache/incubator-linkis/pull/2243) 优化新注册的ECM服务，优化服务负载选择逻辑，减下可能存在的因为新服务可用性问题造成的影响
* \[PS-Jobhistory][[Linkis-2198]](https://github.com/apache/incubator-linkis/pull/2198) 优化任务代码缓存文件名，增加时间参数，避免长任务存在的冲突问题
* \[EC-Python][[Linkis-2175]](https://github.com/apache/incubator-linkis/pull/2175) 增加py4j的watchdog线程，监控java进程，防止java进程异常退出后，python进程没有退出的情况
* \[Common][[Linkis-2150]](https://github.com/apache/incubator-linkis/pull/2150) common和entrance模块都存在自定义变量替换的逻辑，优化聚集到common模块中处理
* \[EC-JDBC][[Linkis-2142]](https://github.com/apache/incubator-linkis/pull/2142)  修复JDBC Engine 控制台配置修改后无法立即生效的问题（cache时间调整为配置项）
* \[Entrance][[Linkis-2160]](https://github.com/apache/incubator-linkis/pull/2160) 任务提交的消费队列支持配置特定大容量用户
* \[PE][[Linkis-2200]](https://github.com/apache/incubator-linkis/pull/2200) 标签代码优化，去除标签key-value的持久化 
* \[EC][[Linkis-1749]](https://github.com/apache/incubator-linkis/issues/1749)  支持EC启动时 ，能够通过参数进行指定服务的端口段的限制 
* \[Common-Storage][[Linkis-2168]](https://github.com/apache/incubator-linkis/pull/2168) FileSource中文件类型支持变量配置
* \[Common-Storage][[Linkis-2161]](https://github.com/apache/incubator-linkis/pull/2161) 新增对结果集导出到 excel文件时，自动格式化参数的支持
* \[Gateway][[Linkis-2249]](https://github.com/apache/incubator-linkis/pull/2249) 优化gateway的Parser逻辑代码 
* \[Web][[Linkis-2248]](https://github.com/apache/incubator-linkis/pull/2248) 用户资源展示页面按用户和创建者排序展示
* \[Web][[Linkis-2108]](https://github.com/apache/incubator-linkis/issues/2108) 前端页面布局优化调整，统一基本样式，优化二级菜单展示
* \[Install][[Linkis-2319]](https://github.com/apache/incubator-linkis/pull/2319) 调整数据源服务部署模式，默认为开启；支持安装时，配置初始登陆密码
* \[Install][[Linkis-2421]](https://github.com/apache/incubator-linkis/pull/2421) 支持安装部署时，配置kerberos相关认证信息
* \[EC][[Linkis-2159]](https://github.com/apache/incubator-linkis/pull/2159) EC的log日志支持按大小和时间切割滚动
* \[Common-Scheduler][[Linkis-2272]](https://github.com/apache/incubator-linkis/pull/2272) 优化代码格式增加LoopArray单元测试 
* \[PS-ContextService][[Linkis-2234]](https://github.com/apache/incubator-linkis/pull/2234) 在contextservice添加了批量清理context值的方法

## 修复功能
* \[EC][[Linkis-2275]](https://github.com/apache/incubator-linkis/pull/2275) 修复EC引擎心跳上报在异常场景下日志字段过长导致存储失败问题 
* \[Web][[Linkis-2239]](https://github.com/apache/incubator-linkis/pull/2239) 修复yarm 队列资源空闲/繁忙状态使用率的环形占比图显示不正确问题
* \[PS-ContextService][[Linkis-2226]](https://github.com/apache/incubator-linkis/pull/2226) 修复 FileReader 和 BufferedReader 资源在 final 中未释放的问题 
* \[Install][[Linkis-2203]](https://github.com/apache/incubator-linkis/pull/2203) 不同系统编译出现shell脚本授权+x权限失败问题
* \[Entrance][[Linkis-2237]](https://github.com/apache/incubator-linkis/pull/2237) 重构 JobQueueLabel 和 JobRunningLabel,修复任务排队标签和任务运行标签bug
* \[Build][[Linkis-2354]](https://github.com/apache/incubator-linkis/pull/2354) 修复WIN系统下 编译打包项目存在的ERROR级别的警告问题
* \[Gateway][[Linkis-2329]](https://github.com/apache/incubator-linkis/pull/2329) 修复LDAP接入存在的配置问题
* \[Entrance][[Linkis-2238]](https://github.com/apache/incubator-linkis/pull/2238) 优化结果集路径以日期分隔，解决单个文件夹子目录过多问题 不同日期的resustset路径在同一个文件夹，如“/tmp/linkis/hadoop/linkis/20220516_210525/IDE/40099”，可能会导致一个文件夹下文件太多
* \[Entrance][[Linkis-2162]](https://github.com/apache/incubator-linkis/pull/2162) 优化结果集路径以日期分隔，解决单个文件夹子目录过多问题
* \[Common][[Linkis-2332]](https://github.com/apache/incubator-linkis/pull/2332) 关闭SpringCloud 默认配置中心，减少不必要日志信息的干扰 
* \[Web][[Linkis-2295]](https://github.com/apache/incubator-linkis/pull/2295) 移除web安装脚本中多余的代码

## 安全相关
* \[PS-Jobhistory][[Linkis-2248]](https://github.com/apache/incubator-linkis/pull/2248) 任务查询列表接口增加参数校验，防止sql注入的安全问题
* \[PS-PublicService][[Linkis-1949]](https://github.com/apache/incubator-linkis/pull/2235) /api/rest_j/v1/datasource/columns 接口增加用户权限检查
## 依赖变更
* \[Common][[Linkis-2188]](https://github.com/apache/incubator-linkis/pull/2188) 升级poi 5.2.1至poi 5.2.2，修复可能出现的内存分配问题
* \[Common][[Linkis-2182]](https://github.com/apache/incubator-linkis/pull/2182) 升级 gson:2.8.5 至gson:2.8.9版本 

## 致谢
Apache Linkis(incubating) 1.1.3的发布离不开Linkis社区的贡献者,感谢所有的社区贡献者，包括但不仅限于以下Contributors（排名不发先后）: Alexkun、CCweixiao、Davidhua1996、QuintinTao、casionone、det101、doroxinrui、huiyuanjjjjuice、husofskyzy、hzdhgf、jackxu2011、legendtkl、liuyou2、peacewong 、pjfanning、ruY9527、saLeox、seayi、wForget、wallezhang、yyuser5201314


