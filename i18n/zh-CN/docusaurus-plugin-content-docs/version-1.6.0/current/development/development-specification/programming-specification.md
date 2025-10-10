---
title: 编程规约
sidebar_position: 1
---
## 1. 命名规约
1. 【**强制**】不要用中文拼音和看不懂的缩写
2. 基本的Java命名规范可以参考[命名规范](https://alibaba.github.io/Alibaba-Java-Coding-Guidelines/#naming-conventions)
3. 【约束】在linkis中有scalastyle风格配置文件，如果不符合规范的需要按照scalastyle的风格进行命名
4. 【**强制**】配置文件命令、启动命名、进程命名、配置的key等也需要遵守命名规范，规范如下：

|分类|	风格|	规范|    例子|
|:----  |:---   |:---   |:---   |
|配置文件|小写'-'分隔|	linkis-分类层级（ps/cg/mg）-服务名.propertis| linkis-cg-linkismanager.properties|
|启停脚本|小写'-'分隔|	linkis-分类层级-服务名|	linkis-cg-linkismanager|
|模块目录|小写'-'分隔|	模块目录必须在对应的分类层级下面，并以模块名为子目录| linkis-public-enhancements/linkis-bml|
|进程命名|驼峰命名|	以Linkis开头服务名结尾| LinkisBMLApplication|
|配置Key命名|小写'.'分隔|	linkis+模块名+keyName|	linkis.bml.hdfs.prefix|

## 2. 注释规约
1. 【**强制**】类、类属性、接口方法必须加注释，且注释必须使用 Javadoc 规范，使用`/**内容*/`格式。

示例：
```java
/** Wrap the communication between Bml service */
public class BmlAppServiceImpl implements BmlAppService {
  /** Bml client */
  private BmlClient client;
}
```
2. 【**强制**】所有的类都不要添加创建者。Linkis项目已捐献给Apache，无须添加作者信息。

3. 【**强制**】所有的抽象方法（包括接口中的方法）必须要用 Javadoc 注释、除了返回值、参数、 异常说明外，还必须指出该方法做什么事情，实现什么功能。

4. 【**强制**】方法内部单行注释，在被注释语句上方另起一行，使用 // 注释。方法内部多行注释使用 /* */ 注释，注意与代码对齐。

示例：
```java
    // Store the reflection relation between parameter variable like 'T' and type like
    Map<String, Type> typeVariableReflect = new HashMap<>();
```
5. 【**强制**】所有的枚举类型字段必须要有注释，说明每个数据项的用途。

示例：
```java
/**
 * 节点监控状态信息
 * to monitor node status info
 */
public enum NodeHealthy {

  /**
   * 状态正常
   * healthy status
   */
  Healthy,
  
  /**
   * EM自己标识自己为UnHealthy 或者manager把他标识为UnHealthy 处理引擎状态不正常，
   * manager主动要求所有的engine强制退出（engine自杀）
   * EM identifies itself as UnHealthy or
   * The manager marks it as abnormal in the status of UnHealthy processing engine.
   * The manager requests all engines to withdraw forcibly (engine suicide).
   */
  UnHealthy,

  /**
   * 引擎处于告警状态，但是可以接受任务
   * The engine is in the alarm state, but can accept tasks
   */
  WARN,

  /**
   * 存量可用状态，可以接受任务。当EM状态最近n次心跳没有上报，但是已经启动的Engine还是正常的可以接受任务
   * The stock is available and can accept tasks. When the EM status is not reported for the last n heartbeats,
   * the Engine that has been started is still normal and can accept tasks
   */
  StockAvailable,

  /**
   * 存量不可用状态，不可以接受任务。（超过n+1没上报心跳）或者（EM自己判断，但是服务正常的情况），
   * 但是如果往上面提交任务会出现error失败情况 EM处于StockUnavailable时，
   * manager主动要求所有的engine非强制退出，manager需要将EM标识为UnHealthy。
   * 如果StockUnavailable状态如果超过n分钟，则发送IMS告警
   * The stock is not available. Tasks cannot be accepted
   */
  StockUnavailable;
}
```
6. 【推荐】代码修改的同时，注释也要进行相应的修改，尤其是参数、返回值、异常、核心逻辑等的修改。
7. 【推荐】在类中删除未使用的任何字段、方法、内部类；在方法中删除未使用的任何参数声明与内部变量。
8. 【参考】谨慎注释掉代码。在上方详细说明，而不是简单地注释掉。如果无用，则删除。代码被注释掉有两种可能性：1）后续会恢复此段代码逻辑。2）永久不用。前者如果没有备注信息，难以知晓注释动机。后者建议直接删掉即可，假如需要查阅历史代码，登录代码仓库即可。

示例：
```java
  public static final CommonVars<String> TUNING_CLASS =
      CommonVars.apply(
          "wds.linkis.cs.ha.class", "org.apache.linkis.cs.highavailable.DefaultContextHAManager");
  // 应该删除如下注释代码
  // public static final CommonVars<String> TUNING_CLASS =
  // CommonVars.apply("wds.linkis.cs.ha.class","org.apache.linkis.cs.persistence.ProxyMethodA");
```
9. 【参考】对于注释的要求：第一、能够准确反映设计思想和代码逻辑；第二、能够描述业务含义，使别的程序员能够迅速了解到代码背后的信息。完全没有注释的大段代码对于阅读者形同天书，注释是给自己看的，即使隔很长时间，也能清晰理解当时的思路；注释也是给继任者看的，使其能够快速接替自己的工作。
