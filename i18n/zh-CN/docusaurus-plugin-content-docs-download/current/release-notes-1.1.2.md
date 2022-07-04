---
title: Release Notes 1.1.2
sidebar_position: 6
--- 

Apache Linkis(incubating) 1.1.2 包括所有 [Project Linkis-1.1.2](https://github.com/apache/incubator-linkis/projects/20)。


本次发布主要 支持在无HDFS的环境下进行精简化部署（支持部分引擎），方便更轻量化的学习使用和调试；新增对数据迁移工具 Sqoop 引擎的支持；异常处理日志优化；部分安全漏洞组件升级等；修复社区反馈的已知 bug

主要功能如下：
* 支持在无HDFS的环境下进行精简化部署（支持部分引擎），方便更轻量化的学习使用和调试
* 新增对数据迁移工具 Sqoop 引擎的支持
* 优化日志等，提高问题排查效率
* 修复用户越权等接口的安全问题
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
- 

---
## 新特性
* \[Deployment][[Linkis-1804,1811,1841,1843,1846,1933]](https://github.com/apache/incubator-linkis/pull/1804) 支持在无HDFS的环境下进行精简化部署（支持部分引擎），方便更轻量化的学习使用和调试。
* \[PS][[Linkis-1949]](https://github.com/apache/incubator-linkis/pull/1949) 增加未完成作业的列表接口 (/listundone)，并利用定时调度优化查询性能
* \[BML][[Linkis-1811,1843]](https://github.com/apache/incubator-linkis/pull/1843) BML物料服务新增对本地文件系统存储模式部署的支持
* \[Common][[Linkis-1887]](https://github.com/apache/incubator-linkis/pull/1887) RPC模块Sender支持修改负载均衡 Ribbon 等参数
* \[Common][[Linkis-2059]](https://github.com/apache/incubator-linkis/issues/2059)  使用任务task id 作为日志中的 trace id
* \[EC][[Linkis-1971]](https://github.com/apache/incubator-linkis/pull/1971) EC AsyncExecutor 支持设置并行 Job Group 的个数
* \[Engine][[Linkis-2109]](https://github.com/apache/incubator-linkis/pull/2109) 新增对数据迁移工具 Sqoop 引擎的支持

## 增强点
* \[ECP][[Linkis-2074]](https://github.com/apache/incubator-linkis/issues/2074) Flink 引擎支持自定义配置
* \[Deployment][[Linkis-1841]](https://github.com/apache/incubator-linkis/pull/1841) 支持用户部署时关闭对 Spark/Hive/HDFS 环境检测
* \[Deployment][[Linkis-1971]](https://github.com/apache/incubator-linkis/pull/1989) 修复在多块网卡机器部署时，自动获取ip错误的问题

* \[Entrance][[Linkis-1941]](https://github.com/apache/incubator-linkis/pull/1941) Entrance 支持将原始的 jobId 传递给 EngineConn 和 LinkisManager
* \[Entrance][[Linkis-2045]](https://github.com/apache/incubator-linkis/issues/2045) 重构EntranceInterceptor实现类中脚本类型和运行类型匹配关系
* \[RPC][[Linkis-1903]](https://github.com/apache/incubator-linkis/pull/1903/files) 修改 RPC 模块异常处理逻辑，透传 EngineConnPlugin 异常的原始错误信息
* \[RPC][[Linkis-1905]](https://github.com/apache/incubator-linkis/pull/1905) 增加参数支持传递 LoadBalancer 的参数，比如 Ribbon
* \[Orchestrator][[Linkis-1937]](https://github.com/apache/incubator-linkis/pull/1937) 编排器任务调度器creator配置参数支持配置多个Creator值
* \[PE][[Linkis-1959](https://github.com/apache/incubator-linkis/pull/1959) ContextService 增加必要的日志打印，方便错误排查
* \[EC][[Linkis-1942]](https://github.com/apache/incubator-linkis/pull/1942) EC支持将taskID塞入到底层引擎的conf中，方便做任务的血缘分析关联到具体的linkis任务
* \[EC][[Linkis-1973]](https://github.com/apache/incubator-linkis/pull/1973) Task 的执行错误日志获取方式由 cat 改为 tail -1000 控制日志数量，避免全量加载大文件
* \[CG,PE][[Linkis-2014]](https://github.com/apache/incubator-linkis/pull/2014) 增加配置 add/get/delete，优化同步锁
* \[Common][[Linkis-2016]](https://github.com/apache/incubator-linkis/pull/2016) 调整cglib依赖的使用，将 cglib 依赖替换为 spring 内置的cglib
* \[Gateway][[Linkis-2071]](https://github.com/apache/incubator-linkis/issues/2071) HTTP请求Header中增加 GatewayURL属性值

## 修复功能
* \[Engine][[Linkis-1931]](https://github.com/apache/incubator-linkis/pull/1931) 修复 Python 错误加载的是Pyspark的函数，非单机Python本身的函数问题
* \[Deployment][[Linkis-1853]](https://github.com/apache/incubator-linkis/pull/1853) 修复安装初始化 DDL 报错的问题
* \[UDF][[Linkis-1893]](https://github.com/apache/incubator-linkis/pull/1893) 为 udf 相关接口增加用户权限校验
* \[EC][[Linkis-1933]](https://github.com/apache/incubator-linkis/pull/1933) 给非 deploy 用户组的用户执行作业增加 resultSet 的写权限
* \[EC][[Linkis-1846]](https://github.com/apache/incubator-linkis/pull/1846) 修复 ResultSet 配置本地路径无效的问题
* \[EC][[Linkis-1966]](https://github.com/apache/incubator-linkis/pull/1966) 使用 System.properties 替换 System.ev
* \[EC-Python][[Linkis-2131]](https://github.com/apache/incubator-linkis/pull/2131) 修复 Python 引擎由于 pandas 引入导致异常的问题
* \[PS][[Linkis-1840]](https://github.com/apache/incubator-linkis/pull/1840) 下载 csv 格式数据时，增加灵活选择，防止数据格式错乱
* \[Orchestrator][[Linkis-1992]](https://github.com/apache/incubator-linkis/pull/1992) 修复 Orchestrator Reheater 模块的并发问题
* \[PE][[Linkis-2032]](https://github.com/apache/incubator-linkis/pull/2032) 配置接口的优化，获取Label的配置参数时，修改为直接获取Key-value对
* \[Web][[Linkis-2036]](https://github.com/apache/incubator-linkis/pull/2036) 管理台ECM 页面实例显示问题修复
* \[Web][[Linkis-1895]](https://github.com/apache/incubator-linkis/pull/1895) 资源页面显示问题修复
* \[ECP][[Linkis-2027]](https://github.com/apache/incubator-linkis/pull/2027) 修复 ECP 物料下载字节截取导致的异常错误
* \[ECP][[Linkis-2088]](https://github.com/apache/incubator-linkis/pull/2088) 修复 hive task 运行过程中存在进度回退的问题
* \[ECP][[Linkis-2090]](https://github.com/apache/incubator-linkis/pull/2090) 修复 Python3 找不到的问题
* \[CG][[Linkis-1751]](https://github.com/apache/incubator-linkis/pull/1751) 脚本自定义变量运行类型和后缀约束配置化
* \[CG][[Linkis-2034]](https://github.com/apache/incubator-linkis/pull/2034) 对超时任务的描述信息不匹配的修复
* \[CG][[Linkis-2100]](https://github.com/apache/incubator-linkis/pull/2100) 优化高并发下的 db 死锁问题


## 安全相关
* \[UDF][[Linkis-1893]](https://github.com/apache/incubator-linkis/pull/1893) 修复 udf 部分接口（/udf/list，/udf/tree/add，/udf/tree/update）的用户越权问题
* \[PS][[Linkis-1869]](https://github.com/apache/incubator-linkis/pull/1869) 修复 Linkis PlublicService 相关接口越权问题
* \[PS][[Linkis-2086]](https://github.com/apache/incubator-linkis/pull/2086) 方法 /updateCategoryInfo 增加权限校验

## 依赖变更
* \[MDS][[Linkis-1947]](https://github.com/apache/incubator-linkis/pull/1947) mys2168ql-connector-java 从 5.1.34 升级到 8.0.16
* \[ECP][[Linkis-1951]](https://github.com/apache/incubator-linkis/pull/1951) hive-jdbc 从 1.2.1 升级至 2.3.3
* \[ECP][[Linkis-1968]](https://github.com/apache/incubator-linkis/pull/1974) protobuf-java 版本升级至 3.15.8
* \[ECP][[Linkis-2021]](https://github.com/apache/incubator-linkis/pull/2021) 移除 Flink 模块的一些冗余依赖包
* \[RPC][[Linkis-2018]](https://github.com/apache/incubator-linkis/pull/2018) 统一 json4s 的版本
* \[Web][[Linkis-2336]](https://github.com/apache/incubator-linkis/pull/2336) 引入web组件jsencrypt-3.2.1的依赖，作为登陆密码加解密工具


## 致谢
Apache Linkis(incubating) 1.1.2的发布离不开Linkis社区的贡献者,感谢所有的社区贡献者，包括但不仅限于以下Contributors（排名不发先后）: Alexyang, Casion, David hua, GodfreyGuo, Jack Xu, Zosimer, allenlliu, casionone, ericlu, huapan123456, husofskyzy, iture123, legendtkl, luxl@chinatelecom.cn, maidangdang44, peacewong, pengfeiwei, seedscoder, weixiao, xiaojie19852006, めぐみん, 李为