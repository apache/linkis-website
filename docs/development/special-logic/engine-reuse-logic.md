---
title: Engine Reuse Logic
sidebar_position: 1
---

# Engine Reuse Logic

## Overview

Engine reuse is a critical performance optimization mechanism in Linkis. When a user submits a task, the system first attempts to reuse an existing idle engine instead of creating a new one. This significantly reduces engine startup overhead and improves task response time.

## Core Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Engine Ask Request                                │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ Check EXECUTE_ONCE_KEY Label  │
                    └───────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
           Has EXECUTE_ONCE            No EXECUTE_ONCE
                    │                               │
                    ▼                               ▼
           Create New Engine           ┌─────────────────────┐
                                       │  Try Engine Reuse   │
                                       └─────────────────────┘
                                                   │
                                                   ▼
                                       ┌─────────────────────┐
                                       │ Build Label Filter  │
                                       │  - EngineNodeLabel  │
                                       │  - UserCreatorLabel │
                                       │  - EngineTypeLabel  │
                                       └─────────────────────┘
                                                   │
                                                   ▼
                                       ┌─────────────────────┐
                                       │ Check Exclusion     │
                                       │ Label               │
                                       └─────────────────────┘
                                                   │
                              ┌────────────────────┴────────────────────┐
                              │                                         │
                              ▼                                         ▼
                    Wildcard (*) Exclusion               Specific Instance Exclusion
                              │                                         │
                              ▼                                         ▼
                    Return null (No Reuse)              Remove Excluded Instances
                                                                       │
                                                                       ▼
                                                       ┌─────────────────────┐
                                                       │ Apply Label Choosers│
                                                       │ (Multi-User Engine) │
                                                       └─────────────────────┘
                                                                       │
                                                                       ▼
                                                       ┌─────────────────────┐
                                                       │ Get Engine Instances│
                                                       │ from Label Service  │
                                                       └─────────────────────┘
                                                                       │
                                                                       ▼
                                                       ┌─────────────────────┐
                                                       │ Optional Filters:   │
                                                       │ - Template Name     │
                                                       │ - Resource Match    │
                                                       │ - Python Version    │
                                                       └─────────────────────┘
                                                                       │
                                                                       ▼
                                                       ┌─────────────────────┐
                                                       │   Node Selector     │
                                                       │  (Choose Best Node) │
                                                       └─────────────────────┘
                                                                       │
                                                                       ▼
                                                       ┌─────────────────────┐
                                                       │ Try Lock Engine     │
                                                       └─────────────────────┘
                                                                       │
                                              ┌────────────────────────┴────────────────────────┐
                                              │                                                 │
                                              ▼                                                 ▼
                                        Lock Success                                      Lock Failed
                                              │                                                 │
                                              ▼                                                 ▼
                                        Return Engine                              Retry (up to limit)
                                                                                              │
                                                                                              ▼
                                                                               ┌─────────────────────┐
                                                                               │ Exceeded Retry Limit│
                                                                               │ or Timeout          │
                                                                               └─────────────────────┘
                                                                                              │
                                                                                              ▼
                                                                               Throw LinkisRetryException
```

## Key Components

### Core Classes

| Class | Location | Description |
|-------|----------|-------------|
| `EngineReuseService` | `linkis-application-manager/.../service/engine/EngineReuseService.scala` | Service interface for engine reuse |
| `DefaultEngineReuseService` | `linkis-application-manager/.../service/engine/DefaultEngineReuseService.scala` | Core implementation of reuse logic |
| `EngineReuseLabelChooser` | `linkis-application-manager/.../label/EngineReuseLabelChooser.java` | Interface for label selection during reuse |
| `MultiUserEngineReuseLabelChooser` | `linkis-application-manager/.../label/MultiUserEngineReuseLabelChooser.java` | Handles multi-user engine label selection |
| `ReuseExclusionLabel` | `linkis-label-common/.../label/entity/engine/ReuseExclusionLabel.java` | Label to exclude specific instances from reuse |
| `EngineReuseRequest` | `linkis-manager-common/.../protocol/engine/EngineReuseRequest.java` | Request protocol for engine reuse |
| `DefaultEngineNodeManager` | `linkis-application-manager/.../manager/DefaultEngineNodeManager.java` | Manages engine node operations including locking |

### Source Code Locations

```
linkis-computation-governance/linkis-manager/
├── linkis-application-manager/src/main/
│   ├── scala/org/apache/linkis/manager/am/service/engine/
│   │   ├── EngineReuseService.scala              # Interface
│   │   ├── DefaultEngineReuseService.scala       # Core implementation
│   │   └── DefaultEngineAskEngineService.scala   # Caller service
│   └── java/org/apache/linkis/manager/am/
│       ├── label/
│       │   ├── EngineReuseLabelChooser.java
│       │   └── MultiUserEngineReuseLabelChooser.java
│       ├── manager/
│       │   └── DefaultEngineNodeManager.java
│       └── conf/
│           └── AMConfiguration.java              # Configuration
├── linkis-manager-common/src/main/java/.../protocol/engine/
│   └── EngineReuseRequest.java
└── linkis-label-common/src/main/java/.../label/entity/engine/
    └── ReuseExclusionLabel.java
```

## Reuse Conditions

### 1. Basic Trigger Condition

Engine reuse is attempted when the request does NOT contain the `EXECUTE_ONCE_KEY` label:

```scala
if (!engineAskRequest.getLabels.containsKey(LabelKeyConstant.EXECUTE_ONCE_KEY)) {
  // Attempt engine reuse
  val reuseNode = engineReuseService.reuseEngine(engineReuseRequest, sender)
}
```

### 2. Label Matching

The system filters available engines based on:

- **EngineNodeLabel**: Matches engine node type
- **UserCreatorLabel**: Matches user and creator application
- **EngineTypeLabel**: Matches engine type (spark, hive, python, etc.)
- **AliasServiceInstanceLabel**: Filters by service instance alias

### 3. Exclusion Rules

#### ReuseExclusionLabel

This label allows excluding specific engine instances from reuse:

```java
// Exclude all engines (wildcard)
ReuseExclusionLabel label = new ReuseExclusionLabel();
label.setInstances("*");

// Exclude specific instances
label.setInstances("instance1;instance2;instance3");
```

When wildcard `*` is set, no engine will be reused for that request.

### 4. Engine Status Check

An engine can only be reused if:

- **Status is Unlock**: The engine is not currently locked by another task
- **Status is Available**: The engine is in a healthy, available state

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

## Multi-User Engine Support

Some engine types support multi-user sharing, where engines can be reused across different users:

### Supported Multi-User Engine Types

```
es, presto, io_file, appconn, openlookeng, trino, jobserver, nebula, hbase, doris
```

### How It Works

For multi-user engines, the `UserCreatorLabel` is modified to use an admin user:

```java
public List<Label<?>> chooseLabels(List<Label<?>> labelList) {
  // Check if engine type is multi-user
  if (isMultiUserEngine(engineTypeLabel)) {
    String userAdmin = getAdminUser(engineTypeLabel.getEngineType());
    userCreatorLabel.setUser(userAdmin);
  }
  return labels;
}
```

This allows different users to share the same engine instance.

## Optional Filtering Rules

### Template Name Matching

When enabled, only engines with matching template names will be reused:

```properties
linkis.ec.reuse.with.template.rule.enable=true
```

The system checks the `ec.resource.name` property in engine parameters.

### Resource Matching

When enabled, the system ensures the engine has sufficient resources:

```properties
linkis.ec.reuse.with.resource.rule.enable=true
linkis.ec.reuse.with.resource.with.ecs=spark,hive,shell,python
```

Checks performed:
1. Available/locked resources >= requested resources
2. Python version compatibility (for Python/PySpark engines)

## Caching Strategy

The system supports caching engine instances to improve reuse performance:

### Cache Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| `wds.linkis.manager.am.engine.reuse.enable.cache` | `false` | Enable instance caching |
| `wds.linkis.manager.am.engine.reuse.cache.expire.time` | `5s` | Cache expiration time |
| `wds.linkis.manager.am.engine.reuse.cache.max.size` | `1000` | Maximum cache entries |
| `wds.linkis.manager.am.engine.reuse.cache.support.engines` | `shell` | Engine types supporting cache |

### Cache Key Format

```scala
val cacheKey = userCreatorLabel.getStringValue + "_" + engineTypeLabel.getEngineType
// Example: "hadoop-IDE_spark"
```

## Configuration Parameters

### Core Reuse Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `wds.linkis.manager.am.engine.reuse.max.time` | `5m` | Maximum wait time for reuse |
| `wds.linkis.manager.am.engine.reuse.count.limit` | `2` | Maximum reuse retry count |
| `wds.linkis.manager.am.engine.locker.max.time` | `5m` | Maximum engine lock time |

### Multi-User Engine Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `wds.linkis.multi.user.engine.types` | `es,presto,...` | Multi-user engine type list |
| `wds.linkis.multi.user.engine.user` | JSON config | Admin user mapping for each engine type |

### Optional Filter Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `linkis.ec.reuse.with.template.rule.enable` | `false` | Enable template name matching |
| `linkis.ec.reuse.with.resource.rule.enable` | `false` | Enable resource matching |
| `linkis.ec.reuse.with.resource.with.ecs` | `spark,hive,shell,python` | Engine types for resource matching |

## Retry and Timeout Handling

### Retry Logic

```scala
val reuseLimit = if (engineReuseRequest.getReuseCount <= 0)
                   AMConfiguration.ENGINE_REUSE_COUNT_LIMIT  // Default: 2
                 else engineReuseRequest.getReuseCount

def selectEngineToReuse: Boolean = {
  if (count > reuseLimit) {
    throw new LinkisRetryException(...)
  }
  // Try to reuse selected engine
  engine = Utils.tryCatch(getEngineNodeManager.reuseEngine(engineNode)) { t =>
    // On failure, remove from candidates and retry
    count = count + 1
    engineScoreList = engineScoreList.filter(!_.equals(choseNode.get))
    null
  }
  engine != null
}
```

### Timeout Handling

- If reuse times out, the system will asynchronously stop the problematic engine
- After timeout, control returns to allow engine creation as fallback

```scala
if (ExceptionUtils.getRootCause(t).isInstanceOf[TimeoutException]) {
  val stopEngineRequest = new EngineStopRequest(engineNode.getServiceInstance, ...)
  engineStopService.asyncStopEngine(stopEngineRequest)
}
```

## Best Practices

1. **Enable caching for frequently used engines**: For engine types like `shell` that are used frequently with short execution times, enable caching to improve reuse efficiency.

2. **Configure appropriate timeout values**: Set `engine.reuse.max.time` based on your cluster's network latency and engine response times.

3. **Use ReuseExclusionLabel when needed**: If certain tasks require isolated engines, use `ReuseExclusionLabel` to prevent unwanted reuse.

4. **Monitor reuse metrics**: Track engine reuse success rates to identify potential issues with specific engine types or configurations.

5. **Consider multi-user engines**: For read-only query engines like Presto or Trino, consider configuring them as multi-user engines to maximize resource utilization.

## Troubleshooting

### Common Issues

1. **Engine reuse always fails**
   - Check if engines are in `Unlock` status
   - Verify label matching (user, creator, engine type)
   - Check for `ReuseExclusionLabel` in requests

2. **Reuse timeout errors**
   - Increase `wds.linkis.manager.am.engine.reuse.max.time`
   - Check network connectivity between manager and engine
   - Review engine logs for lock acquisition issues

3. **Wrong engine reused**
   - Verify label configuration
   - Check if template name matching is enabled when needed
   - Review multi-user engine configuration
