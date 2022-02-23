---
title: Release Notes 1.0.3
sidebar_position: 9
--- 

Apache Linkis(incubating) 1.0.3 包含所有 [Project Linkis-1.0.3](https://github.com/apache/incubator-linkis/projects/13)。

该版本是Linkis进入Apache孵化的第一个版本。主要完成ASF基础设施建设，包括License完善/包名修改等，增加EngineConn对Operator的支持等功能，修复社区反馈的1.0.2版本中的bug。

添加了以下主要功能：
* http restful api风格使用springmvc替换jersey
* 用 fastxml json 替换 codehaus json
* 支持EngineConn/OnceEngineConn通用operator，提供对接流式计算引擎的基础能力
* 支持使用kerberos代理用户模式

缩写：
- CGS: Computation Governance Services
- PES: Public Enhancement Services
- MGS: Microservice Governance Services
- EC: Engineconn
- ECM: EngineConnManager
---

## 新特性

* \[CGS&PES&MGS][[Linkis-1002]](https://github.com/apache/incubator-linkis/pull/1002) http restful api风格使用springmvc模式替换jersey，使用spring的DispatcherServlet，web接口注解方式统一
* \[CGS&PES&MGS][[Linkis-1038]](https://github.com/apache/incubator-linkis/pull/1038) 升级codehaus json至稳定主流的fastxml json版本
* \[CGS-Engineconn][[Linkis-1027]](https://github.com/apache/incubator-linkis/pull/1027) 支持使用Hadoop的proxyuser机制访问启用kerberos的Hadoop集群
* \[CGS-EngineConnManager][[Linkis-1248]](https://github.com/apache/incubator-linkis/pull/1248) ECM获取EC日志的功能，可以在EC运行或停止时获取EC的所有日志
* \[CGS-LinkisManager][[Linkis-1043]](https://github.com/apache/incubator-linkis/pull/1043) 支持引擎operator，客户端可以通过引擎operator在EngineConn上执行特定操作并返回结果
* \[CGS-LinkisOnceEngineconn][[Linkis-946]](https://github.com/apache/incubator-linkis/pull/946) 支持hostname和IP地址来进行eureka服务发现和服务调用，以满足k8s等容器化部署的场景
* \[CGS-LinkisOnceEngineconn][[Linkis-1078]](https://github.com/apache/incubator-linkis/pull/1078) 支持EngineConn/OnceEngineConn通用operator，提供对接流式计算引擎的基础能力


---

## 增强点
* \[Commons][[Linkis-1026]](https://github.com/apache/incubator-linkis/pull/1026) 数据导出到excel的优化，对数字类型的字段更好的支持
* \[Commons][[Linkis-1036]](https://github.com/apache/incubator-linkis/pull/1036) 共享文件系统在LocalFileSystem模式下的文件权限优化
* \[Commons][[Linkis-1185]](https://github.com/apache/incubator-linkis/pull/1185) 添加一些scala代码规范检查规则，自动检测scala代码格式
* \[Orchestrator][[Linkis-1183]](https://github.com/apache/incubator-linkis/pull/1183) 优化Orchestrator模块中循环复杂度较高的代码以及高并发下的Map问题
* \[MGS-LinkisServiceGateway][[Linkis-1064]](https://github.com/apache/incubator-linkis/pull/1064) 支持http api的白名单配置，无需用户登录验证即可调用
* \[CGS-EngineConnManager][[Linkis-1030]](https://github.com/apache/incubator-linkis/pull/1030) 支持将自定义环境变量从ECM传输到EC
* \[CGS-EngineConnPlugin] [[Linkis-1083]](https://github.com/apache/incubator-linkis/pull/1083) 将engineConnPlugin异常类进行统一和优化
* \[CGS-EngineConnPlugin][[Linkis-1203]](https://github.com/apache/incubator-linkis/pull/1203) 优化标签更新/删除逻辑
* \[CGS-EngineConnPlugin-JDBC] [[Linkis-1117]](https://github.com/apache/incubator-linkis/pull/1117) 支持linkis jdbc的kerberos认证类型
* \[CGS-EngineConnPlugin-Flink] [[Linkis-1070]](https://github.com/apache/incubator-linkis/pull/1070) 优化在prod模式下提交jar应用,优化计算执行器的kill操作
* \[CGS-EngineConnPlugin-Flink] [[Linkis-1248]](https://github.com/apache/incubator-linkis/pull/1248) FlinkOnceJob支持执行集合，展示flinkSQL的语法
* \[CGS-EngineConnManager][[Linkis-1167]](https://github.com/apache/incubator-linkis/pull/1167) processEngineConnLaunch 添加对JAVA_HOME环境变量的支持
* \[CGS-ComputationClient][[Linkis-1126]](https://github.com/apache/incubator-linkis/pull/1126) 支持python matplotlib显示图片
* \[CGS-Entrance][[Linkis-1206]](https://github.com/apache/incubator-linkis/pull/1206) 优化entrance逻辑，增加taskID区分任务
* \[CGS-LinkisManager][[Linkis-1209]](https://github.com/apache/incubator-linkis/pull/1209) 优化manager常用的多项功能:给节点对象添加更新和启动时间属性/yarn资源获取的方法
* \[CGS-LinkisManager][[Linkis-1213]](https://github.com/apache/incubator-linkis/pull/1213) 优化保留long-lived标签与节点的关系
* \[CGS-LinkisManager][[Linkis-1222]](https://github.com/apache/incubator-linkis/pull/1222) 支持ECM注册请求的响应结果返回
* \[PES-PublicService][[Linkis-1211]](https://github.com/apache/incubator-linkis/pull/1211) 优化jobhistory的数据库信息更新逻辑，移除事务，增加重试逻辑
* \[PES-Metadata][[Linkis-1224]](https://github.com/apache/incubator-linkis/pull/1224) 优化datasource/dbs http接口查询结果与登录用户关联限制，可以通过配置文件进行开启与关闭

---
## 修复功能
* \[DB][[Linkis-1053]](https://github.com/apache/incubator-linkis/pull/1053) 修复由于数据库表字段长度过长导致数据插入可能失败的问题
* \[DB][[Linkis-1087]](https://github.com/apache/incubator-linkis/pull/1087) 删除重复的DDL语句
* \[Commons][[Linkis-1058]](https://github.com/apache/incubator-linkis/pull/1058) 修复物料上传时，存在子目录时无法压缩导致上传失败的问题
* \[Commons][[Linkis-1223]](https://github.com/apache/incubator-linkis/pull/1223) 升级 log4j 版本到 2.17.0
* \[Commons][[Linkis-1052]](https://github.com/apache/incubator-linkis/pull/1052) 修复了当主机名以微服务应用名字开头时，无法获取路由实例的问题
* \[CGS-LinkisManager][[Linkis-1014]](https://github.com/apache/incubator-linkis/pull/1014) 修复object相等判断的错误用法
* \[CGS-LinkisManager][[Linkis-1054]](https://github.com/apache/incubator-linkis/pull/1054) 修复了当主机名包含服务名时实例标签解析失败的问题。
* \[CGS-LinkisManager][[Linkis-1074]](https://github.com/apache/incubator-linkis/pull/1074) 修复了http api 'rm/userresources' 的NPE问题
* \[CGS-LinkisManager][[Linkis-1101]](https://github.com/apache/incubator-linkis/pull/1101) 修复监视器发送引擎心跳RPC请求失败，导致误杀引擎的问题
* \[CGS-LinkisManager][[Linkis-1210]](https://github.com/apache/incubator-linkis/pull/1210) 修复实例检查和引擎标签排除的bug
* \[CGS-LinkisManager][[Linkis-1214]](https://github.com/apache/incubator-linkis/pull/1214) 修复多个RM模块高并发bug
* \[CGS-LinkisManager][[Linkis-1216]](https://github.com/apache/incubator-linkis/pull/1216) 从AM中删除节点监控模块
* \[MGS-LinkisServiceGateway][[Linkis-1093]](https://github.com/apache/incubator-linkis/pull/1093) 修复pass auth uri为空字符可能导致的权限绕过bug
* \[MGS-LinkisServiceGateway][[Linkis-1105]](https://github.com/apache/incubator-linkis/pull/1105) 修改linkis默认测试账号弱密码问题
* \[MGS-LinkisServiceGateway][[Linkis-1234]](https://github.com/apache/incubator-linkis/pull/1234) 修复SSO登录内存泄露问题
* \[CGS-Common][[Linkis-1199]](https://github.com/apache/incubator-linkis/pull/1199) 修复SqlCodeParser对分割符“;”转义成多个SQL
* \[CGS-Entrance][[Linkis-1073]](https://github.com/apache/incubator-linkis/pull/1073) 修复http api 'entrance/{id}/killJobs' 未使用参数导致的异常{ID}
* \[CGS-Entrance][[Linkis-1106]](https://github.com/apache/incubator-linkis/pull/1106) 修复VarSubstitutionInterceptor 获取代码类型错误
* \[CGS-Entrance][[Linkis-1149]](https://github.com/apache/incubator-linkis/pull/1149) 修复job任务完成后前台无法获取进度信息数据的问题
* \[CGS-Entrance][[Linkis-1205]](https://github.com/apache/incubator-linkis/pull/1205) 修复了LogWirter的oom错误
* \[CGS-EngineConnPlugin][[Linkis-1113]](https://github.com/apache/incubator-linkis/pull/1113) 修复bml资源数据记录更新时sql语句错误
* \[CGS-EngineConnPlugin-JDBC] [[Linkis-923]](https://github.com/apache/incubator-linkis/pull/923) 修复未配置JDBC引擎的连接url的bug
* \[CGS-EngineConnPlugin-Spark][[Linkis-1017]](https://github.com/apache/incubator-linkis/pull/1017) 修复了spark3引擎编译错误
* \[CGS-EngineConnPlugin-Flink][[Linkis-1069]](https://github.com/apache/incubator-linkis/pull/1069) 修复Flink引擎缺少hadoop-mapreduce-client-core等依赖导致的ClassNotfoundException问题
* \[CGS-EngineConnPlugin-Flink][[Linkis-1128]](https://github.com/apache/incubator-linkis/pull/1129) 修复flink引擎的数据表信息插入问题
* \[CGS-EngineConnPlugin-Flink][[Linkis-1304]](https://github.com/apache/incubator-linkis/pull/1304) 修复flink sql不支持多个sql，使用set、rest、drop语法时checkpoint失败等问题
* \[CGS-EngineConnPlugins-Hive][[Linkis-1231]](https://github.com/apache/incubator-linkis/pull/1231) 修复引擎推送多个子任务的进度bug
* \[PEC-BmlServer][[Linkis-1155]](https://github.com/apache/incubator-linkis/pull/1155) 修复sql语句中使用mysql保留字的问题
* \[PEC-CSServer][[Linkis-1160]](https://github.com/apache/incubator-linkis/pull/1160) 修复 CsJobListener 中的NPE
* \[Orchestrator][[Linkis-1179]](https://github.com/apache/incubator-linkis/pull/1179) 修复了Orchestrator并发导致的bug
* \[Orchestrator][[Linkis-1186]](https://github.com/apache/incubator-linkis/pull/1186) 修复Orchestrator排队的任务无法被kill的问题
* \[Console][[Linkis-1121]](https://github.com/apache/incubator-linkis/pull/1121) 从当前请求中获取协议，删除'http'的硬编码方式

## 其他
*  ⚠ \[Commons&MGS-LinkisServiceGateway][[Linkis-1192]](https://github.com/apache/incubator-linkis/pull/1092) 第三方依赖mysql-connector-java违反了Apache 许可政策。所以从1.0.3开始移除了对 mysql-connector-java 的依赖，如果只为自己的项目使用，可以自行在项目中增加 mysql-connector-java 依赖。
* \[Commons&MGS-LinkisEureka][[Linkis-1291]](https://github.com/apache/incubator-linkis/pull/1291) 移除license归属类别不明确的jar包 io.github.x-stream:mxparser 
* \[Commons][[Linkis-1287]](https://github.com/apache/incubator-linkis/pull/1287) 拆分二进制发布包和源码的LICENSE/NOTICE等文件
* \[Console][[Linkis-1301]](https://github.com/apache/incubator-linkis/pull/1301) 移除license授权未知的字体文件以及未使用到的图片图标等前端资源文件
* \[CGS-EngineConnPlugins-Python][[Linkis-1281]](https://github.com/apache/incubator-linkis/pull/1281) 移除源码中的pyspark.zip，添加py4j的LICENSE.txt文件

---------

## 致谢
Apache Linkis(incubating) 1.0.3的发布离不开Linkis社区的贡献者。感谢所有的社区贡献者！