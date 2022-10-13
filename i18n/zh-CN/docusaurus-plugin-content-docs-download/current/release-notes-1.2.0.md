---
title: Release Notes 1.2.0
sidebar_position: 0.18
---

Apache Linkis(incubating) 1.2.0 包括所有 [Project Linkis-1.2.0](https://github.com/apache/incubator-linkis/projects/12).

Linkis 1.2.0 版本发布主要支持Presto和ElasticSearch引擎；对JDBC引擎新增特性，以支持数据源模式；减少和优化Linkis模块；数据源功能优化；改进部分引擎的测试用例，并进行了大量的bug修复和功能改进。

主要功能如下：
* 新增对 Presto 引擎的支持 
* 新增对 ElasticSearch 引擎的支持
* JDBC引擎新增特性:支持数据源模式
* 减少和优化Linkis部分模块
* 数据源功能模块接口优化
* 集成swagger,http 接口新增swagger注解说明 
* entrance支持Route标签租户隔离 
* 支持SDK客户端任务重试 
* 新增单个Entrance任务统计接口 
* 管理台资源管理页面支持查看历史引擎信息

缩写：
- COMMON: Linkis Common
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

---
## 新特性
+ \[ECP-PRESTO][[LINKIS-1631]](https://github.com/apache/incubator-linkis/issues/1631) 增强Presto引擎，适配Linkis 1.X 架构
+ \[ECP-ES][[LINKIS-1632]](https://github.com/apache/incubator-linkis/issues/1632) 增强ElasticSearch引擎, 适配Linkis 1.X 架构
+ \[ECP-JDBC][[LINKIS-2092]](https://github.com/apache/incubator-linkis/issues/2092) Linkis JDBC引擎支持多个数据源链接
+ \[COMMON][[LINKIS-2191]](https://github.com/apache/incubator-linkis/issues/2191) 为所有服务添加offline的公共通用接口
+ \[CG][[LINKIS-2222]](https://github.com/apache/incubator-linkis/issues/2222) 单链路入口任务指标收集
+ \[CG][[LINKIS-2227]](https://github.com/apache/incubator-linkis/issues/2227) 添加ECR历史查询接口
+ \[WEB][[LINKIS-2227]](https://github.com/apache/incubator-linkis/issues/2227) 支持显示引擎历史信息
+ \[CG][[LINKIS-2257]](https://github.com/apache/incubator-linkis/issues/2257) 网关支持转发与入口非执行相关的请求
+ \[CG][[LINKIS-2258]](https://github.com/apache/incubator-linkis/issues/2258) 增加了在入口进程正常退出时清理运行任务的功能
+ \[PE][[LINKIS-2277]](https://github.com/apache/incubator-linkis/pull/2277) 在工作区中，文件可以移动到另一个文件夹
+ \[CG][[LINKIS-2288]](https://github.com/apache/incubator-linkis/issues/2288) 增加未完成任务查询界面
+ \[CG]\[PE][[LINKIS-2291]](https://github.com/apache/incubator-linkis/pull/2291) 入口支持路由标签隔离
+ \[COMMON]\[CG]\[PE][[LINKIS-2320]](https://github.com/apache/incubator-linkis/issues/2320) 入口增加了restful接口来支持修改路由标签
+ \[CG]\[PE][[LINKIS-2326]](https://github.com/apache/incubator-linkis/pull/2326) Linkis任务支持自动重试
+ \[COMMON][[LINKIS-2366]](https://github.com/apache/incubator-linkis/pull/2366) [[LINKIS-2434]](https://github.com/apache/incubator-linkis/pull/2434) 支持 knif4j
+ \[ECP-JDBC][[LINKIS-2392]](https://github.com/apache/incubator-linkis/pull/2392) JDBC引擎支持trino
+ \[COMMON][[LINKIS-2415]](https://github.com/apache/incubator-linkis/pull/2415) 支持变量操作

## 增强点
+ \[COMMON][[LINKIS-1411]](https://github.com/apache/incubator-linkis/issues/1411) 移除 sun.misc.BASE64
+ \[COMMON][[LINKIS-1475]](https://github.com/apache/incubator-linkis/issues/1475) 优化代码风格
+ \[LM][[LINKIS-1763]](https://github.com/apache/incubator-linkis/issues/1763) 将非空验证添加到应用列表接口
+ \[COMMON][[LINKIS-1824]](https://github.com/apache/incubator-linkis/issues/1824) 将commons-lang更新为commons-lang3
+ \[COMMON]\[CG]\[PE][[LINKIS-2077]](https://github.com/apache/incubator-linkis/issues/2077) 优化为修改管理控制台参数后自动刷新所有LinkisManager缓存
+ \[DMS][[LINKIS-2082]](https://github.com/apache/incubator-linkis/issues/2082) 数据源管理模块优化
+ \[ECP-JDBC][[LINKIS-2140]](https://github.com/apache/incubator-linkis/issues/2140) JDBC引擎中JDBC连接参数的一致调整
+ \[ECP-JDBC][[LINKIS-2141]](https://github.com/apache/incubator-linkis/issues/2141) 在JDBC引擎中将dbcp修改为druid
+ \[DEPLOY][[LINKIS-2193]](https://github.com/apache/incubator-linkis/issues/2193) 添加优雅升级脚本
+ \[ECP-JDBC][[LINKIS-2194]](https://github.com/apache/incubator-linkis/issues/2194) 取消JDBC引擎ConnectionManager.java中支持的ddb，并添加参数wds.links.jdbc.driver
+ \[DMS][[LINKIS-2212]](https://github.com/apache/incubator-linkis/issues/2212) 为LinkisDataSourceRemoteClient添加默认的DWSClientConfig构造函数，以简化内部微服务调用数据源服务的客户端API
+ \[ECP][[LINKIS-2214]](https://github.com/apache/incubator-linkis/issues/2214) 在引擎材质刷新界面中，refeshAll和refresh被修改为refresshAll和refresh
+ \[ECP-PYTHON][[LINKIS-2216]](https://github.com/apache/incubator-linkis/issues/2216) python plt show方法直接支持显示
+ \[CG][[LINKIS-2217]](https://github.com/apache/incubator-linkis/issues/2217) 增加了trino引擎类型
+ \[CG]\[ECP]\[PE][[LINKIS-2264]](https://github.com/apache/incubator-linkis/issues/2264) 模块优化可以减少模块数量
+ \[ECP-JDBC][[LINKIS-2278]](https://github.com/apache/incubator-linkis/pull/2278) 为JDBC引擎增加测试用例
+ \[DEPLOY][[LINKIS-2293]](https://github.com/apache/incubator-linkis/issues/2293) 在install.sh中添加端口检查
+ \[COMMON][[LINKIS-2299]](https://github.com/apache/incubator-linkis/pull/2299) 添加内置变量run_today_h和run_today_h_std
+ \[PE][[LINKIS-2344]](https://github.com/apache/incubator-linkis/issues/2344) 优化元数据SQL
+ \[PE][[LINKIS-2352]](https://github.com/apache/incubator-linkis/issues/2352) 优化CS模块，减少模块数量
+ \[CG][[LINKIS-2362]](https://github.com/apache/incubator-linkis/issues/2362) 将link-engineeconn-plugin-framework移动到link-cg模块
+ \[PE][[LINKIS-2368]](https://github.com/apache/incubator-linkis/pull/2368) 自动为新添加的用户创建工作区
+ \[PACKAGE][[LINKIS-2374]](https://github.com/apache/incubator-linkis/issues/2374) 优化Linkis assamble-combined-package模块
+ \[COMMON][[LINKIS-2396]](https://github.com/apache/incubator-linkis/issues/2396) 删除已弃用的Logging方法
+ \[ECP-SPARK][[LINKIS-2405]](https://github.com/apache/incubator-linkis/pull/2405) 支持scala spark多版本
+ \[ECP-SPARK][[LINKIS-2419]](https://github.com/apache/incubator-linkis/pull/2419) 删除配置SPARK_SCALA_VERSION并从env中获取scala版本
+ \[COMMON][[LINKIS-2441]](https://github.com/apache/incubator-linkis/issues/2441) Knife4j接口文档
+ \[PE-BML][[LINKIS-2450]](https://github.com/apache/incubator-linkis/issues/2450) 当更新引擎材料时，新的存储路径将得到优化
+ \[PE-BML][[LINKIS-2475]](https://github.com/apache/incubator-linkis/issues/2475) 修复包名大小写问题
+ \[CG][[LINKIS-2477]](https://github.com/apache/incubator-linkis/pull/2477) 优化建立link-cg-engineeconnplugin的依赖
+ \[CG]\[ECP][[LINKIS-2479]](https://github.com/apache/incubator-linkis/pull/2479) 终止ECM引擎时需要同时终止yarn appid
+ \[MDS][[LINKIS-2481]](https://github.com/apache/incubator-linkis/issues/2481) Linkis-metadat-query-service-hive包名修改
+ \[COMMON]\[CG]\[GATEWAY][[LINKIS-2496]](https://github.com/apache/incubator-linkis/pull/2496) 优化重构入口bean配置
+ \[COMMON]\[CG]\[PE][[LINKIS-2508]](https://github.com/apache/incubator-linkis/pull/2508) 支持高并发性的特性优化
+ \[ECP-PRESTO][[LINKIS-2512]](https://github.com/apache/incubator-linkis/pull/2512) 优化presto引擎
+ \[WEB][[LINKIS-2524]](https://github.com/apache/incubator-linkis/pull/2524) 将web重命名为linkis-web
+ \[PE-BML][[LINKIS-2531]](https://github.com/apache/incubator-linkis/pull/2531) 更新VersionServiceImplTest
+ \[COMMON][[LINKIS-2549]](https://github.com/apache/incubator-linkis/issues/2549) 在脚本执行后输出结果集时，优化结果集的读取效率
+ \[ECP-SPARK]\[TEST][[LINKIS-2617]](https://github.com/apache/incubator-linkis/pull/2617)为工厂启动扩展添加测试用例
+ \[COMMON][[LINKIS-2618]](https://github.com/apache/incubator-linkis/pull/2618) 优化模块和插件配置
+ \[ECP-SHELL]\[TEST][[LINKIS-2620]](https://github.com/apache/incubator-linkis/pull/2620) 为外壳引擎添加测试用例
+ \[ECP][[LINKIS-2628]](https://github.com/apache/incubator-linkis/issues/2628) 将EC Yarn应用日志打印到一个单独的日志中
+ \[PE-BML][[LINKIS-2633]](https://github.com/apache/incubator-linkis/issues/2633) rollbackversion函数修改大写
+ \[PACKAGE][[LINKIS-2635]](https://github.com/apache/incubator-linkis/pull/2635) 添加1.2.0_schema文件记录以更新对1.2.0的更改
+ \[PACKAGE][[LINKIS-2679]](https://github.com/apache/incubator-linkis/issues/2679) 优化默认队列，以及减少dml中hive默认参数
+ \[ECP-JDBC][[LINKIS-2741]](https://github.com/apache/incubator-linkis/issues/2741) ConnectionManager中的连接缓存池键值将调整为数据源名称和版本号
+ \[ECP-JDBC][[LINKIS-2743]](https://github.com/apache/incubator-linkis/issues/2743) JDBC数据源配置优先级定义

## 修复功能

+ \[PS-RM][[LINKIS-1850]](https://github.com/apache/incubator-linkis/pull/1850) 修复NPE问题
+ \[PE][[LINKIS-1879]](https://github.com/apache/incubator-linkis/issues/1879) FileWriter和BufferedWriter在finally子句中没有关闭
+ \[CG][[LINKIS-1911]](https://github.com/apache/incubator-linkis/issues/1911) 修复link-computing-client提交作业失败的问题
+ \[CG][[LINKIS-2040]](https://github.com/apache/incubator-linkis/issues/2040) 修复HDFSCacheLogWriter getOutPutStream NPE问题
+ \[DMS][[LINKIS-2255]](https://github.com/apache/incubator-linkis/issues/2255) 当从单个数据源查询信息时，将丢失过期字段
+ \[COMMON][[LINKIS-2269]](https://github.com/apache/incubator-linkis/pull/2269) 修复 ddl sql bug
+ \[COMMON][[LINKIS-2314]](https://github.com/apache/incubator-linkis/issues/2314) 修复AbstractDiscovery delayTime计算错误
+ \[ECP-HIVE][[LINKIS-2321]](https://github.com/apache/incubator-linkis/issues/2321) 对于hive on tez任务，取消任务时无法正确结束任务
+ \[PE][[LINKIS-2346]](https://github.com/apache/incubator-linkis/issues/2346) 修复了管理员用户获取表而不返回所有表的问题
+ \[RPC][[LINKIS-2370]](https://github.com/apache/incubator-linkis/issues/2370) 修复linkis-rpc messageUtils.orderIsLast不正确
+ \[LM][[LINKIS-2372]](https://github.com/apache/incubator-linkis/pull/2372) 修复了LM ec历史restful的bug
+ \[PE][[LINKIS-2273]](https://github.com/apache/incubator-linkis/issues/2273)数据源编辑表单支持中文和英文
+ \[PACKAGE][[LINKIS-2389]](https://github.com/apache/incubator-linkis/issues/2389) 修复了打包后links-ps-metadataquery模块中缺失的bug
+ \[CG][[LINKIS-2412]](https://github.com/apache/incubator-linkis/issues/2412) 修复查询ECM历史时，权限管理失败的问题
+ \[CG][[LINKIS-2418]](https://github.com/apache/incubator-linkis/pull/2418) 修复了将不安全的SimpleDateFormat线程用作全局变量时无法正常翻转任务状态的问题
+ \[MDS][[LINKIS-2435]](https://github.com/apache/incubator-linkis/issues/2435) 修复了mysql元数据查询的NPE问题
+ \[GATEWAY][[LINKIS-2454]](https://github.com/apache/incubator-linkis/issues/2454) 当在本地调试link-gateway时，与knife4j相关的类依赖冲突
+ \[COMMON][[LINKIS-2456]](https://github.com/apache/incubator-linkis/issues/2456) 修复测试bug
+ \[ECM][[LINKIS-2469]](https://github.com/apache/incubator-linkis/issues/2469) ECM logOperator使用错误的分隔符来获取日志路径
+ \[PE][[LINKIS-2470]](https://github.com/apache/incubator-linkis/issues/2470) 上传文件中文名称乱码
+ \[CG][[LINKIS-2471]](https://github.com/apache/incubator-linkis/issues/2471) Orchestrator支持任务等待超时
+ \[PE][[LINKIS-2472]](https://github.com/apache/incubator-linkis/issues/2472) 当数据为空时抛出异常
+ \[ECP-SPARK][[LINKIS-2488]](https://github.com/apache/incubator-linkis/issues/2488) 修复CsvRelation类无法序列化的问题
+ \[COMMON][[LINKIS-2506]](https://github.com/apache/incubator-linkis/issues/2506) 升级1.1.1 ddl 语句缺失 engine=innodb default charset=utf8
+ \[COMMON][[LINKIS-2535]](https://github.com/apache/incubator-linkis/issues/2535) 修复调用ExceptionUtils.getStackTrace NPE问题
+ \[PE-BML][[LINKIS-2543]](https://github.com/apache/incubator-linkis/pull/2543) 修复ps_bml_resources_version插入新版本缺失一些信息的问题
+ \[CG]\[MDS][[LINKIS-2547]](https://github.com/apache/incubator-linkis/pull/2547) 修复MetadataQuery sql语法错误和LockManagerMapper方法过载的bug
+ \[COMMON][[LINKIS-2559]](https://github.com/apache/incubator-linkis/issues/2559) 修复变量替换错误
+ \[ECP-PRESTO][[LINKIS-2596]](https://github.com/apache/incubator-linkis/issues/2596) 修复了编译包时缺少依赖关系的问题
+ \[ECP-ES][[LINKIS-2603]](https://github.com/apache/incubator-linkis/issues/2603) 修复ES引擎NoSuchMethodError
+ \[ECP-ES][[LINKIS-2604]](https://github.com/apache/incubator-linkis/issues/2604) 修复ES引擎NumberFormatException
+ \[PE][[LINKIS-2614]](https://github.com/apache/incubator-linkis/issues/2614) 修复了由客户端请求引起的NPE问题
+ \[COMMON][[LINKIS-2631]](https://github.com/apache/incubator-linkis/pull/2631) 修复死循环问题
+ \[ECP-SHELL][[LINKIS-2654]](https://github.com/apache/incubator-linkis/pull/2654) 修复了ShellEngineConnExecutor的测试用例
+ \[LM][[LINKIS-2688]](https://github.com/apache/incubator-linkis/issues/2688) 升级flink ec的默认EngineType版本
+ \[TOOL][[LINKIS-2701]](https://github.com/apache/incubator-linkis/issues/2701) 修复github repos页面的许可证显示与未知的许可证发现

## 安全相关
+ \[SPRING][[LINKIS-2395]](https://github.com/apache/incubator-linkis/issues/2395) SynchronossPartHttpMessageReader应该只在需要时创建临时目录(CVE-2022-2296)

## 依赖变更
+ \[COMMON]\[CG]\[ECP][[LINKIS-2301]](https://github.com/apache/incubator-linkis/pull/2301) 更新依赖关系以修复CVE
+ \[CG][[LINKIS-2452]](https://github.com/apache/incubator-linkis/issues/2452) oshi-core 版本升级

## 致谢
Apache Linkis(incubating) 1.2.0的发布离不开Linkis社区的贡献者，感谢所有的社区贡献者，包括但不仅限于以下Contributors（排名不发先后）: 
CCweixiao, Dlimeng, QuintinTao, WenxiangFan, aiceflower, barry8023, binbinCheng, casionone,
 duhanmin, gabeng1996, huangKai-2323, huapan123456, huiyuanjjjjuice, hunter-cloud09, jackxu2011,
legendtkl, liangqilang, liuyou2, mindflow94, peacewong, ruY9527, seedscoder, wForget, yyuser5201314