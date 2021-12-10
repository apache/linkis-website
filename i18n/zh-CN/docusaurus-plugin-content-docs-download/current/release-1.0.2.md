# Linkis Release-1.0.2
  使用以下链接下载Linkis

## Linkis
| 日期 | 版本| 备注 | 下载 |
|:---:|:--:|:--:|:--:|
| 2021-09-02| 1.0.2 | 源码 | [[SRC](https://github.com/apache/incubator-linkis/archive/refs/tags/1.0.2.tar.gz)]                 [[PGP](NULL)]             [[SHA512](NULL)] |
| |                 | 二进制包 | [[BIN](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/1.0.2/wedatasphere-linkis-1.0.2-combined-package-dist.tar.gz)]  [[PGP](NULL)]     [[SHA512](NULL)] |


### 发布完整性
   您必须[验证](https://www.apache.org/info/verification.html) 下载文件的完整性。 我们为每个发布文件提供 OpenPGP 签名。 此签名应与包含 Linkis 发布经理的 OpenPGP 密钥的 [KEYS](https://downloads.apache.org/incubator/linkis/KEYS) 文件匹配。 我们还为每个发布文件提供 <code>SHA-512</code> 校验和。 下载文件后，您应该计算下载的校验和，并确保它与我们的相同。

## 发版说明

Linkis-1.0.2 includes all of [Project Linkis-1.0.2](https://github.com/WeBankFinTech/Linkis/projects/11).

This release mainly introduces Flink-support into Linkis ecosystem. 

The following key features are added: 
* Flink-EngineConn which offers solid support for Flink jobs. Executing, debugging and monitoring Flink SQL or applications are now available, together with SQL-enhancement ability powered by Linkis Orchestrator.
* LinkisManagerClient which enables direct access to LinkisManager.  Submitting and managing OnceJob rely on this feature.


Abbreviations:

CGS: Computation Governance Services

PES: Public Enhancement Services

MGS: Microservice Governance Services

---

## New Feature

#### EngineConn
* [Linkis-936](https://github.com/WeBankFinTech/Linkis/pull/936)  [CGS-LinkisOnceEngineconn] supports OnceEngineExecutor

#### EnginePlugin
* [Linkis-935](https://github.com/WeBankFinTech/Linkis/pull/935)  [CGS-EngineConnPlugin-Flink] supports Flink EngineConn
* [Linkis-947](https://github.com/WeBankFinTech/Linkis/pull/947)  [CGS-EngineConnPlugin-Flink] supports executing Flink SQL and Flink applications
* [Linkis-948](https://github.com/WeBankFinTech/Linkis/pull/948)  [CGS-EngineConnPlugin-Flink] multiple-datasource support for Flink EngineConn
* [Linkis-949](https://github.com/WeBankFinTech/Linkis/pull/949)  [CGS-EngineConnPlugin-Flink] monitoring Flink Metrics

#### ComputationClient
* [Linkis-937](https://github.com/WeBankFinTech/Linkis/pull/937)  [CGS-LinkisComputationClient] supports OnceEngineExecutor client

---

## Enhancement
* [Linkis-953](https://github.com/WeBankFinTech/Linkis/pull/953)  [CGS-LinkisManager] label supports '-' in hostname
* [Linkis-925](https://github.com/WeBankFinTech/Linkis/pull/925)  [MGS-LinkisServiceGateway] fix weak password in linkis gateway 
* [Linkis-950](https://github.com/WeBankFinTech/Linkis/pull/950)  [CGS-LinkisEngineConnManager] support both ip address and hostname for service discovery
* [Linkis-967](https://github.com/WeBankFinTech/Linkis/pull/967) [CGS-LinkisEntrance] remove instance-label client dependency, Solve the host name and ip judgment abnormality in the gateway router, exclude the pom dependency to pentaho-aggdesigner-algorithm jar.
* [Linkis-963](https://github.com/WeBankFinTech/Linkis/pull/963)  [PES-LinkisBmlServer] default download user changed to jvm user, and supports to set default download user by configuration.

---
## Bugs Fix

* [Linkis-938](https://github.com/WeBankFinTech/Linkis/pull/938)  [CGS-LimkisMnagager] fixes a serial execution bug
* [Linkis-952](https://github.com/WeBankFinTech/Linkis/pull/952)  [CGS-LinkisEngineConn] fixes a redundant thread bug
* [Linkis-943](https://github.com/WeBankFinTech/Linkis/pull/943)  [CGS-EngineConnPlugin-Hive] fixes a Hive3.0 compilation error
* [Linkis-961](https://github.com/WeBankFinTech/Linkis/pull/961)  [CGS-EngineConnPlugin-Flink] fixes a Flink-EnginePlugin compilation bug
* [Linkis-966](https://github.com/WeBankFinTech/Linkis/pull/966)  [CGS-EngineConnPlugin-Hive] [CGS-EnginePlugin-Spark] Solve Spark and hive compatibility issue

## Credits  

The release of Linkis 1.0.2 is inseparable from the contributors of the Linkis community. Thanks to all the community contributors! 

---
## Compiled Version

1. **Tencent Cloud**:

[Linkis-1.0.2 Compiled (.tar.gz)](https://osp-1257653870.cos.ap-guangzhou.myqcloud.com/WeDatasphere/Linkis/1.0.2/wedatasphere-linkis-1.0.2-combined-package-dist.tar.gz)
 
