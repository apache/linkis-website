---
title: 引擎复用逻辑
sidebar_position: 1
---

# 引擎复用逻辑

## 概述

引擎复用是 Linkis 中一个关键的性能优化机制。当用户提交任务时，系统会首先尝试复用现有的空闲引擎，而不是创建新的引擎。这显著减少了引擎启动开销，提高了任务响应速度。

## 核心流程

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          引擎请求 (Engine Ask Request)                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  检查 EXECUTE_ONCE_KEY 标签   │
                    └───────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
             存在 EXECUTE_ONCE              不存在 EXECUTE_ONCE
                    │                               │
                    ▼                               ▼
               创建新引擎                  ┌─────────────────────┐
                                          │    尝试引擎复用      │
                                          └─────────────────────┘
                                                    │
                                                    ▼
                                          ┌─────────────────────┐
                                          │    构建标签过滤器    │
                                          │  - EngineNodeLabel  │
                                          │  - UserCreatorLabel │
                                          │  - EngineTypeLabel  │
                                          └─────────────────────┘
                                                    │
                                                    ▼
                                          ┌─────────────────────┐
                                          │   检查排除标签       │
                                          │ ReuseExclusionLabel │
                                          └─────────────────────┘
                                                    │
                              ┌─────────────────────┴─────────────────────┐
                              │                                           │
                              ▼                                           ▼
                      通配符 (*) 排除                            指定实例排除
                              │                                           │
                              ▼                                           ▼
                  返回 null (不复用)                            从列表中移除排除实例
                                                                          │
                                                                          ▼
                                                          ┌─────────────────────┐
                                                          │  应用标签选择器      │
                                                          │  (多用户引擎处理)    │
                                                          └─────────────────────┘
                                                                          │
                                                                          ▼
                                                          ┌─────────────────────┐
                                                          │  从标签服务获取      │
                                                          │  可用引擎实例        │
                                                          └─────────────────────┘
                                                                          │
                                                                          ▼
                                                          ┌─────────────────────┐
                                                          │    可选过滤器：      │
                                                          │  - 模板名称匹配      │
                                                          │  - 资源匹配          │
                                                          │  - Python版本匹配    │
                                                          └─────────────────────┘
                                                                          │
                                                                          ▼
                                                          ┌─────────────────────┐
                                                          │     节点选择器       │
                                                          │   (选择最优节点)     │
                                                          └─────────────────────┘
                                                                          │
                                                                          ▼
                                                          ┌─────────────────────┐
                                                          │    尝试锁定引擎      │
                                                          └─────────────────────┘
                                                                          │
                                              ┌───────────────────────────┴───────────────────────────┐
                                              │                                                       │
                                              ▼                                                       ▼
                                          锁定成功                                                锁定失败
                                              │                                                       │
                                              ▼                                                       ▼
                                          返回引擎                                         重试 (达到限制前)
                                                                                                     │
                                                                                                     ▼
                                                                                     ┌─────────────────────┐
                                                                                     │  超过重试限制或超时  │
                                                                                     └─────────────────────┘
                                                                                                     │
                                                                                                     ▼
                                                                                     抛出 LinkisRetryException
```

## 关键组件

### 核心类

| 类 | 位置 | 描述 |
|----|------|------|
| `EngineReuseService` | `linkis-application-manager/.../service/engine/EngineReuseService.scala` | 引擎复用服务接口 |
| `DefaultEngineReuseService` | `linkis-application-manager/.../service/engine/DefaultEngineReuseService.scala` | 复用逻辑核心实现 |
| `EngineReuseLabelChooser` | `linkis-application-manager/.../label/EngineReuseLabelChooser.java` | 复用时标签选择的接口 |
| `MultiUserEngineReuseLabelChooser` | `linkis-application-manager/.../label/MultiUserEngineReuseLabelChooser.java` | 处理多用户引擎的标签选择 |
| `ReuseExclusionLabel` | `linkis-label-common/.../label/entity/engine/ReuseExclusionLabel.java` | 排除特定实例复用的标签 |
| `EngineReuseRequest` | `linkis-manager-common/.../protocol/engine/EngineReuseRequest.java` | 引擎复用请求协议 |
| `DefaultEngineNodeManager` | `linkis-application-manager/.../manager/DefaultEngineNodeManager.java` | 管理引擎节点操作，包括锁定 |

### 源代码位置

```
linkis-computation-governance/linkis-manager/
├── linkis-application-manager/src/main/
│   ├── scala/org/apache/linkis/manager/am/service/engine/
│   │   ├── EngineReuseService.scala              # 接口定义
│   │   ├── DefaultEngineReuseService.scala       # 核心实现
│   │   └── DefaultEngineAskEngineService.scala   # 调用服务
│   └── java/org/apache/linkis/manager/am/
│       ├── label/
│       │   ├── EngineReuseLabelChooser.java
│       │   └── MultiUserEngineReuseLabelChooser.java
│       ├── manager/
│       │   └── DefaultEngineNodeManager.java
│       └── conf/
│           └── AMConfiguration.java              # 配置类
├── linkis-manager-common/src/main/java/.../protocol/engine/
│   └── EngineReuseRequest.java
└── linkis-label-common/src/main/java/.../label/entity/engine/
    └── ReuseExclusionLabel.java
```

## 复用条件

### 1. 基本触发条件

当请求中**不包含** `EXECUTE_ONCE_KEY` 标签时，系统会尝试引擎复用：

```scala
if (!engineAskRequest.getLabels.containsKey(LabelKeyConstant.EXECUTE_ONCE_KEY)) {
  // 尝试引擎复用
  val reuseNode = engineReuseService.reuseEngine(engineReuseRequest, sender)
}
```

### 2. 标签匹配

系统根据以下标签过滤可用引擎：

- **EngineNodeLabel**：匹配引擎节点类型
- **UserCreatorLabel**：匹配用户和创建者应用
- **EngineTypeLabel**：匹配引擎类型（spark、hive、python 等）
- **AliasServiceInstanceLabel**：按服务实例别名过滤

### 3. 排除规则

#### ReuseExclusionLabel

此标签允许从复用中排除特定引擎实例：

```java
// 排除所有引擎（通配符）
ReuseExclusionLabel label = new ReuseExclusionLabel();
label.setInstances("*");

// 排除特定实例
label.setInstances("instance1;instance2;instance3");
```

当设置为通配符 `*` 时，该请求不会复用任何引擎。

### 4. 引擎状态检查

引擎只有在以下条件下才能被复用：

- **状态为 Unlock**：引擎当前未被其他任务锁定
- **状态为可用**：引擎处于健康、可用状态

```java
@Override
public EngineNode reuseEngine(EngineNode engineNode) {
  EngineNode node = getEngineNodeInfo(engineNode);
  if (node == null || !NodeStatus.isAvailable(node.getNodeStatus())) {
    return null;
  }
  if (!NodeStatus.isLocked(node.getNodeStatus())) {
    Optional<String> lockStr = engineLocker.lockEngine(node, timeout);
    if (!lockStr.isPresent()) {
      throw new LinkisRetryException(...);
    }
    node.setLock(lockStr.get());
    return node;
  }
  return null;
}
```

## 多用户引擎支持

某些引擎类型支持多用户共享，即引擎可以在不同用户之间复用：

### 支持的多用户引擎类型

```
es, presto, io_file, appconn, openlookeng, trino, jobserver, nebula, hbase, doris
```

### 工作原理

对于多用户引擎，`UserCreatorLabel` 会被修改为使用管理员用户：

```java
public List<Label<?>> chooseLabels(List<Label<?>> labelList) {
  // 检查引擎类型是否为多用户
  if (isMultiUserEngine(engineTypeLabel)) {
    String userAdmin = getAdminUser(engineTypeLabel.getEngineType());
    userCreatorLabel.setUser(userAdmin);
  }
  return labels;
}
```

这允许不同用户共享同一个引擎实例。

## 可选过滤规则

### 模板名称匹配

启用后，只有模板名称匹配的引擎才会被复用：

```properties
linkis.ec.reuse.with.template.rule.enable=true
```

系统会检查引擎参数中的 `ec.resource.name` 属性。

### 资源匹配

启用后，系统会确保引擎有足够的资源：

```properties
linkis.ec.reuse.with.resource.rule.enable=true
linkis.ec.reuse.with.resource.with.ecs=spark,hive,shell,python
```

执行的检查：
1. 可用/锁定资源 >= 请求资源
2. Python 版本兼容性（针对 Python/PySpark 引擎）

## 缓存策略

系统支持缓存引擎实例以提高复用性能：

### 缓存配置

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `wds.linkis.manager.am.engine.reuse.enable.cache` | `false` | 启用实例缓存 |
| `wds.linkis.manager.am.engine.reuse.cache.expire.time` | `5s` | 缓存过期时间 |
| `wds.linkis.manager.am.engine.reuse.cache.max.size` | `1000` | 最大缓存条目数 |
| `wds.linkis.manager.am.engine.reuse.cache.support.engines` | `shell` | 支持缓存的引擎类型 |

### 缓存键格式

```scala
val cacheKey = userCreatorLabel.getStringValue + "_" + engineTypeLabel.getEngineType
// 示例："hadoop-IDE_spark"
```

## 配置参数

### 核心复用参数

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `wds.linkis.manager.am.engine.reuse.max.time` | `5m` | 复用最大等待时间 |
| `wds.linkis.manager.am.engine.reuse.count.limit` | `2` | 复用最大重试次数 |
| `wds.linkis.manager.am.engine.locker.max.time` | `5m` | 引擎最大锁定时间 |

### 多用户引擎参数

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `wds.linkis.multi.user.engine.types` | `es,presto,...` | 多用户引擎类型列表 |
| `wds.linkis.multi.user.engine.user` | JSON 配置 | 每种引擎类型的管理员用户映射 |

### 可选过滤参数

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `linkis.ec.reuse.with.template.rule.enable` | `false` | 启用模板名称匹配 |
| `linkis.ec.reuse.with.resource.rule.enable` | `false` | 启用资源匹配 |
| `linkis.ec.reuse.with.resource.with.ecs` | `spark,hive,shell,python` | 需要资源匹配的引擎类型 |

## 重试和超时处理

### 重试逻辑

```scala
val reuseLimit = if (engineReuseRequest.getReuseCount <= 0)
                   AMConfiguration.ENGINE_REUSE_COUNT_LIMIT  // 默认: 2
                 else engineReuseRequest.getReuseCount

def selectEngineToReuse: Boolean = {
  if (count > reuseLimit) {
    throw new LinkisRetryException(...)
  }
  // 尝试复用选中的引擎
  engine = Utils.tryCatch(getEngineNodeManager.reuseEngine(engineNode)) { t =>
    // 失败时，从候选列表中移除并重试
    count = count + 1
    engineScoreList = engineScoreList.filter(!_.equals(choseNode.get))
    null
  }
  engine != null
}
```

### 超时处理

- 如果复用超时，系统会异步停止问题引擎
- 超时后，控制权返回以允许作为回退创建新引擎

```scala
if (ExceptionUtils.getRootCause(t).isInstanceOf[TimeoutException]) {
  val stopEngineRequest = new EngineStopRequest(engineNode.getServiceInstance, ...)
  engineStopService.asyncStopEngine(stopEngineRequest)
}
```

## 最佳实践

1. **为频繁使用的引擎启用缓存**：对于像 `shell` 这样频繁使用且执行时间短的引擎类型，启用缓存以提高复用效率。

2. **配置适当的超时值**：根据集群的网络延迟和引擎响应时间设置 `engine.reuse.max.time`。

3. **需要时使用 ReuseExclusionLabel**：如果某些任务需要隔离的引擎，使用 `ReuseExclusionLabel` 防止不必要的复用。

4. **监控复用指标**：跟踪引擎复用成功率，以识别特定引擎类型或配置的潜在问题。

5. **考虑多用户引擎**：对于 Presto 或 Trino 等只读查询引擎，考虑将其配置为多用户引擎以最大化资源利用率。

## 故障排除

### 常见问题

1. **引擎复用总是失败**
   - 检查引擎是否处于 `Unlock` 状态
   - 验证标签匹配（用户、创建者、引擎类型）
   - 检查请求中是否有 `ReuseExclusionLabel`

2. **复用超时错误**
   - 增加 `wds.linkis.manager.am.engine.reuse.max.time`
   - 检查管理器和引擎之间的网络连接
   - 查看引擎日志中的锁获取问题

3. **复用了错误的引擎**
   - 验证标签配置
   - 检查是否需要时启用了模板名称匹配
   - 检查多用户引擎配置
