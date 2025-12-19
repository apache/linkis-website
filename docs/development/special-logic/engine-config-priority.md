---
title: Linkis Engine Configuration Parameter Priority Analysis
sidebar_position: 1
---

# Linkis Engine Configuration Parameter Priority and Effective Logic Analysis

## Overview

This document provides a detailed analysis of the configuration parameter effective logic, priority mechanism, and database table relationships in Linkis during task submission and engine creation process.

## 1. Configuration Parameter Levels

Linkis configuration parameters are divided into the following 4 levels:

### 1.1 Global Default Configuration
- **Label**: `*-*,*-*`
- **Description**: Global default configuration applicable to all users, all applications, and all engines
- **Priority**: Lowest
- **Example**: System-level resource limits, queue configurations, etc.

### 1.2 Engine Default Configuration
- **Label**: `*-*,{engineType}-{version}`
- **Description**: Default configuration for a specific engine type, applicable to all users
- **Priority**: Low
- **Example**: `*-*,spark-3.2.1` represents default configuration for Spark 3.2.1 engine

### 1.3 Creator Default Configuration
- **Label**: `*-{creator},*-*` or `{user}-*,*-*`
- **Description**: Default configuration for a specific creator (e.g., IDE, scheduler) or specific user
- **Priority**: Medium
- **Example**: `*-IDE,*-*` represents default configuration for all tasks submitted via IDE

### 1.4 User Specific Configuration
- **Label**: `{user}-{creator},{engineType}-{version}`
- **Description**: Personalized configuration for a specific user, creator, and engine
- **Priority**: High
- **Example**: `hadoop-IDE,spark-3.2.1` represents hadoop user's configuration for using Spark 3.2.1 via IDE

### 1.5 Runtime Parameters
- **Source**: `params` parameter passed in the API when user submits a task
- **Priority**: **Highest**
- **Description**: Runtime-specified parameters that override all configuration levels

## 2. Configuration Parameter Priority

### 2.1 Priority Order

```text
Runtime Parameters                              [Priority: 1 - Highest]
    ↓
User Specific Configuration                     [Priority: 2]
    ↓
Creator Default Configuration                   [Priority: 3]
    ↓
Engine Default Configuration                    [Priority: 4]
    ↓
Global Default Configuration                    [Priority: 5 - Lowest]
```

### 2.2 Priority Rules

Based on code analysis (`ConfigurationService.scala:289-475`):

1. **Cascaded Query**: System queries user configuration, creator configuration, user general configuration, engine configuration, and global configuration in sequence
2. **Value Override**: Higher priority configuration values override lower priority configurations with the same name
3. **Parameter Merge**: Non-duplicate configuration items from different priorities are merged
4. **Runtime First**: Parameters passed when user submits a task have the highest priority and will not be overridden by any configuration

### 2.3 Core Code Logic

#### Configuration Cascaded Query (ConfigurationService.scala)

```scala
// Location: ConfigurationService.scala:366-419
def getConfigsByLabelList(
    labelList: java.util.List[Label[_]],
    useDefaultConfig: Boolean = true,
    language: String
): (util.List[ConfigKeyValue], util.List[ConfigKeyValue]) = {

    // 1. Get user-specific configuration (user-creator,engineType-version)
    val configs: util.List[ConfigKeyValue] = getConfigByLabelId(label.getId, language)

    // 2. Get creator default configuration (*-creator,*-*)
    val defaultCreatorConfigs = getConfigByLabelId(defaultCreatorLabel.getId, language)

    // 3. Get user general default configuration (user-*,*-*)
    val defaultUserConfigs = getConfigByLabelId(defaultUserLabel.getId, language)

    // 4. Get engine general default configuration (*-*,engineType-version)
    val defaultEngineConfigs = getConfigByLabelId(defaultEngineLabel.getId, language)

    // 5. Configuration merge: creator config > engine config
    if (Configuration.USE_CREATOR_DEFAULE_VALUE && userCreatorLabel.getCreator != "*") {
      replaceCreatorToEngine(defaultCreatorConfigs, defaultEngineConfigs)
    }

    // 6. Configuration merge: user config > engine config
    if (Configuration.USE_USER_DEFAULE_VALUE && userCreatorLabel.getUser != "*") {
      replaceCreatorToEngine(defaultUserConfigs, defaultEngineConfigs)
    }

    return (configs, defaultEngineConfigs)
}
```

#### Configuration Tree Building (ConfigurationService.scala)

```scala
// Location: ConfigurationService.scala:294-333
// Priority: configs > defaultConfigs
def buildTreeResult(
    configs: util.List[ConfigKeyValue],
    defaultConfigs: util.List[ConfigKeyValue]
): util.ArrayList[ConfigTree] = {

    // Iterate through default configurations
    defaultConfigs.asScala.foreach(defaultConfig => {
        defaultConfig.setIsUserDefined(false)

        // User configuration overrides default configuration
        configs.asScala.foreach(config => {
          if (config.getKey.equals(defaultConfig.getKey)) {
            defaultConfig.setConfigValue(config.getConfigValue)  // Value override
            defaultConfig.setIsUserDefined(true)
          }
        })
    })

    return resultConfigsTree
}
```

#### Parameter Merge During Engine Creation (DefaultEngineCreateService.scala)

```scala
// Location: DefaultEngineCreateService.scala:371-397
def generateResource(
    props: util.Map[String, String],           // User-submitted parameters
    user: String,
    labelList: util.List[Label[_]],
    timeout: Long
): NodeResource = {

    // Get console configuration from configuration service (already multi-level merged)
    val configProp = engineConnConfigurationService.getConsoleConfiguration(labelList)

    // Key: User-submitted parameters have the highest priority
    if (null != configProp && configProp.asScala.nonEmpty) {
      configProp.asScala.foreach(keyValue => {
        if (!props.containsKey(keyValue._1)) {  // Only use config when user didn't specify
          props.put(keyValue._1, keyValue._2)
        }
      })
    }

    // Continue processing special logic like cross-queue configuration
    // ...
}
```

**Key Point**: Line `380` check `if (!props.containsKey(keyValue._1))` ensures that **user-submitted parameters will never be overridden by configuration service values**.

## 3. Database Table Structure and Relationships

### 3.1 Core Configuration Tables

#### Table 1: `linkis_ps_configuration_config_key` (Configuration Key Definition Table)

| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key, configuration key ID |
| key | varchar(50) | Configuration parameter name (e.g., `wds.linkis.rm.yarnqueue`) |
| name | varchar(50) | Configuration display name |
| description | varchar(200) | Configuration description (Chinese) |
| en_name | varchar(100) | English display name |
| en_description | varchar(200) | English description |
| engine_conn_type | varchar(50) | Engine type (e.g., `spark`, `hive`) |
| default_value | varchar(200) | Default value |
| validate_type | varchar(50) | Validation type (`None`, `NumInterval`, `Regex`, etc.) |
| validate_range | varchar(150) | Validation range |
| is_hidden | tinyint(1) | Whether hidden |
| is_advanced | tinyint(1) | Whether advanced configuration |
| level | tinyint(1) | Configuration level |
| treeName | varchar(20) | Configuration category tree name |
| boundary_type | tinyint | Boundary type |
| template_required | tinyint(1) | Whether template is required |

**Purpose**: Define metadata for all available configuration items.

#### Table 2: `linkis_ps_configuration_config_value` (Configuration Value Storage Table)

| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key, configuration value ID |
| config_key_id | bigint | Foreign key, references `config_key.id` |
| config_value | varchar(500) | Actual value of the configuration |
| config_label_id | int | Foreign key, references `cg_manager_label.id` |
| create_time | datetime | Creation time |
| update_time | datetime | Update time |

**Purpose**: Store configuration values under different labels.
**Unique Index**: `(config_key_id, config_label_id)` ensures only one value per configuration key under the same label.

#### Table 3: `linkis_cg_manager_label` (Label Table)

| Field | Type | Description |
|-------|------|-------------|
| id | int | Primary key, label ID |
| label_key | varchar(32) | Label key (e.g., `combined_userCreator_engineType`) |
| label_value | varchar(128) | Label value (e.g., `hadoop-IDE,spark-3.2.1`) |
| label_feature | varchar(16) | Label feature (`OPTIONAL`, `CORE`, etc.) |
| label_value_size | int | Number of label value dimensions |
| create_time | datetime | Creation time |
| update_time | datetime | Update time |

**Purpose**: Define multi-dimensional labels, supporting combinations of user, creator, engine type, version, etc.

**Label Value Examples**:
- `*-*,*-*`: Global default
- `*-*,spark-3.2.1`: Spark engine default configuration
- `*-IDE,*-*`: IDE creator default configuration
- `hadoop-IDE,spark-3.2.1`: hadoop user's configuration for using Spark via IDE

#### Table 4: `linkis_ps_configuration_key_limit_for_user` (User Configuration Limit Table)

| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key |
| user_name | varchar(50) | Username |
| combined_label_value | varchar(128) | Combined label value |
| key_id | bigint | Configuration key ID |
| config_value | varchar(200) | Configuration value |
| max_value | varchar(50) | Maximum value limit |
| min_value | varchar(50) | Minimum value limit |
| is_valid | varchar(2) | Whether effective (`Y`/`N`) |
| create_by | varchar(50) | Creator |
| create_time | datetime | Creation time |
| update_by | varchar(50) | Updater |
| update_time | datetime | Update time |

**Purpose**: Set upper and lower limits for configuration values for specific users, preventing users from configuring beyond administrator-allowed ranges.

### 3.2 Table Relationships

```text
┌─────────────────────────────────────────────────────────────────────┐
│                    Configuration Parameter Relationships              │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐
│  linkis_cg_manager_label     │
│  (Label Table)               │
├──────────────────────────────┤
│  id (PK)                     │◄──────────┐
│  label_key                   │           │
│  label_value                 │           │ N:1
│  - *-*,*-*                   │           │
│  - *-*,spark-3.2.1           │           │
│  - hadoop-IDE,spark-3.2.1    │           │
└──────────────────────────────┘           │
                                           │
        ┌──────────────────────────────────┘
        │
        │  ┌────────────────────────────────────────┐
        └──┤  linkis_ps_configuration_config_value  │
           │  (Configuration Value Table)           │
           ├────────────────────────────────────────┤
           │  id (PK)                               │
           │  config_key_id (FK) ──────────┐        │
           │  config_value                 │        │
           │  config_label_id (FK)         │        │
           └────────────────────────────────────────┘
                                           │
                                           │ N:1
                                           │
        ┌──────────────────────────────────┘
        │
        │  ┌────────────────────────────────────────┐
        └─►│  linkis_ps_configuration_config_key    │
           │  (Configuration Key Definition Table)  │
           ├────────────────────────────────────────┤
           │  id (PK)                               │
           │  key                                   │
           │  name                                  │
           │  description                           │
           │  engine_conn_type                      │
           │  default_value                         │
           │  validate_type                         │
           │  validate_range                        │
           │  level                                 │
           └────────────────────────────────────────┘
                      │
                      │ 1:N
                      │
        ┌─────────────┘
        │
        │  ┌────────────────────────────────────────┐
        └─►│ linkis_ps_configuration_key_limit_     │
           │ for_user (User Config Limit Table)     │
           ├────────────────────────────────────────┤
           │  id (PK)                               │
           │  user_name                             │
           │  combined_label_value                  │
           │  key_id (FK)                           │
           │  max_value                             │
           │  min_value                             │
           └────────────────────────────────────────┘
```

### 3.3 SQL Query Examples

#### Query User's Complete Configuration (with Priority Merge)

```sql
-- Query hadoop user's configuration for using Spark 3.2.1 via IDE
-- Result will include merged user config, creator config, and engine config

SELECT
    k.key,
    k.name,
    k.engine_conn_type,
    k.default_value,
    v.config_value,
    l.label_value,
    CASE
        WHEN l.label_value LIKE 'hadoop-IDE,spark-3.2.1' THEN 'User Config'
        WHEN l.label_value LIKE '*-IDE,*-*' THEN 'Creator Default'
        WHEN l.label_value LIKE '*-*,spark-3.2.1' THEN 'Engine Default'
        WHEN l.label_value LIKE '*-*,*-*' THEN 'Global Default'
        ELSE 'Other'
    END AS config_level
FROM
    linkis_ps_configuration_config_key k
LEFT JOIN
    linkis_ps_configuration_config_value v ON k.id = v.config_key_id
LEFT JOIN
    linkis_cg_manager_label l ON v.config_label_id = l.id
WHERE
    l.label_value IN (
        'hadoop-IDE,spark-3.2.1',    -- User config
        '*-IDE,*-*',                 -- Creator default
        '*-*,spark-3.2.1',           -- Engine default
        '*-*,*-*'                    -- Global default
    )
ORDER BY
    k.key,
    FIELD(l.label_value, 'hadoop-IDE,spark-3.2.1', '*-IDE,*-*', '*-*,spark-3.2.1', '*-*,*-*');
```

#### Query User Configuration Limits

```sql
-- Query configuration limits for hadoop user
SELECT
    u.user_name,
    u.combined_label_value,
    k.key,
    k.name,
    u.max_value,
    u.min_value,
    u.is_valid
FROM
    linkis_ps_configuration_key_limit_for_user u
JOIN
    linkis_ps_configuration_config_key k ON u.key_id = k.id
WHERE
    u.user_name = 'hadoop'
    AND u.is_valid = 'Y';
```

## 4. Complete Engine Creation Parameter Effective Flow

### 4.1 Flow Diagram

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│              Linkis Engine Creation Configuration Parameter Flow             │
└─────────────────────────────────────────────────────────────────────────────┘

[1] Frontend/SDK submits task
    │
    ├─ params: { "spark.executor.memory": "4g", ... }
    ├─ labels: ["hadoop-IDE", "spark-3.2.1"]
    └─ executionContent: "select * from table"
    │
    ▼
[2] EntranceParser.parseToTask()
    │ (Parse request, extract params, labels)
    │
    ▼
[3] EntranceJob (Job object)
    │ - jobRequest.params
    │ - jobRequest.labels
    │
    ▼
[4] Orchestrator
    │ - JobReqParamCheckRuler (Parameter validation)
    │
    ▼
[5] DefaultEngineCreateService.createEngine()
    │
    ├──► [5.1] buildLabel(labels, user)
    │     └─ Build label list: UserCreatorLabel + EngineTypeLabel
    │
    ├──► [5.2] selectECM(request, labelList)
    │     └─ Select suitable ECM node
    │
    ├──► [5.3] generateResource(props, user, labelList, timeout)
    │     │
    │     ├─ engineConnConfigurationService.getConsoleConfiguration(labelList)
    │     │   │
    │     │   ├─► ConfigurationMapCache.engineMapCache.get(labelList)
    │     │   │   │
    │     │   │   ├─► [Cache miss] RPC call ConfigurationService
    │     │   │   │
    │     │   │   └─► ConfigurationService.getConfigsByLabelList()
    │     │   │       │
    │     │   │       ├─ Query user config (hadoop-IDE,spark-3.2.1)
    │     │   │       ├─ Query creator config (*-IDE,*-*)
    │     │   │       ├─ Query user general config (hadoop-*,*-*)
    │     │   │       ├─ Query engine config (*-*,spark-3.2.1)
    │     │   │       ├─ Query global config (*-*,*-*)
    │     │   │       │
    │     │   │       └─► replaceCreatorToEngine() (Config merge)
    │     │   │           └─ Creator config > Engine config
    │     │   │           └─ User config > Engine config
    │     │   │
    │     │   └─ Return Map<String, String> configProp
    │     │
    │     └─ Parameter merge logic:
    │         for (entry : configProp) {
    │             if (!props.containsKey(entry.key)) {  ◄── Key check
    │                 props.put(entry.key, entry.value)
    │             }
    │         }
    │         └─ **User-submitted params (props) will not be overridden**
    │
    ├──► [5.4] resourceManager.requestResource()
    │     └─ Resource request
    │
    ├──► [5.5] createEngineNode()
    │     └─ Build engine node request
    │
    ├──► [5.6] emService.createEngine(engineBuildRequest, emNode)
    │     └─ Call ECM to create engine
    │
    └──► [5.7] Engine starts with merged parameters
          └─ Final effective params = User submitted params + Config service params (deduplicated)
```

### 4.2 Key Step Explanation

#### Step 5.3: Parameter Merge Logic (generateResource)

**Code Location**: `DefaultEngineCreateService.scala:371-397`

```scala
def generateResource(
    props: util.Map[String, String],           // User-submitted parameters
    user: String,
    labelList: util.List[Label[_]],
    timeout: Long
): NodeResource = {
    // 1. Get parameters from configuration service (already multi-level merged)
    val configProp = engineConnConfigurationService.getConsoleConfiguration(labelList)

    // 2. Parameter merge: User-submitted parameters take priority
    if (null != configProp && configProp.asScala.nonEmpty) {
      configProp.asScala.foreach(keyValue => {
        if (!props.containsKey(keyValue._1)) {  // ◄── Only use config when user didn't specify
          props.put(keyValue._1, keyValue._2)
        }
      })
    }

    // 3. Handle cross-queue configuration
    val crossQueue = props.get(AMConfiguration.CROSS_QUEUE)
    if (StringUtils.isNotBlank(crossQueue)) {
      val queueName = props.getOrDefault(AMConfiguration.YARN_QUEUE_NAME_CONFIG_KEY, "default")
      props.put(AMConfiguration.YARN_QUEUE_NAME_CONFIG_KEY, crossQueue)
    }

    // 4. Create resource request
    val timeoutEngineResourceRequest = TimeoutEngineResourceRequest(timeout, user, labelList, props)
    engineConnResourceFactoryService.createEngineResource(timeoutEngineResourceRequest)
}
```

**Key Points**:
1. `configProp` is already the result of multi-level configuration merge (user config > creator config > engine config > global config)
2. `if (!props.containsKey(keyValue._1))` ensures user-submitted parameters are not overridden
3. Final `props` contains complete parameter set, passed to the engine

### 4.3 Configuration Cache Mechanism

**Code Location**: `ConfigurationMapCache.java`

```java
// Global configuration cache (by user dimension)
static RPCMapCache<UserCreatorLabel, String, String> globalMapCache

// Engine configuration cache (by user + engine dimension)
static RPCMapCache<Tuple2<UserCreatorLabel, EngineTypeLabel>, String, String> engineMapCache
```

**Cache Working Mechanism**:
1. Uses RPC cache to reduce repeated queries
2. Cache Key: `(UserCreatorLabel, EngineTypeLabel)` combination
3. Cache Value: `Map<String, String>` (configuration key-value pairs)
4. Cache invalidation: Automatically invalidated after configuration update

## 5. Configuration Parameter Validation Mechanism

### 5.1 Validation Types

Linkis supports multiple parameter validation types (defined in `validate_type` field):

| Validation Type | Description | Example |
|----------------|-------------|---------|
| None | No validation | - |
| NumInterval | Numeric interval validation | `[1,100]` means value must be between 1-100 |
| FloatInterval | Float interval validation | `[0.0,1.0]` |
| Regex | Regular expression validation | `^[a-zA-Z0-9_]+$` |
| Json | JSON format validation | Validate if it's valid JSON |
| OFT | OneOf type validation | `queue1,queue2,queue3` (must choose one) |
| Contain | Contains validation | Validate if value contains specified string |

### 5.2 Validator Implementation

**Code Location**: `linkis-configuration/src/main/scala/org/apache/linkis/configuration/validate/`

- `ValidatorManager`: Validator manager
- `NumericalValidator`: Numeric validator
- `RegexValidator`: Regex validator
- `JsonValidator`: JSON validator
- `OneOfValidator`: Enum validator

### 5.3 User Configuration Limits

Through the `linkis_ps_configuration_key_limit_for_user` table, administrators can set upper and lower limits for specific users:

```sql
-- Example: Limit hadoop user's executor memory to no more than 8G
INSERT INTO linkis_ps_configuration_key_limit_for_user
(user_name, combined_label_value, key_id, max_value, is_valid, create_by)
VALUES
('hadoop', 'hadoop-*,spark-*',
 (SELECT id FROM linkis_ps_configuration_config_key WHERE key='spark.executor.memory'),
 '8G', 'Y', 'admin');
```

**Effective Logic** (Code Location: `ConfigurationService.scala:422-442`):

```scala
// Add special configuration limit information
val limitList = configKeyLimitForUserMapper.selectByLabelAndKeyIds(
    combinedLabel.getStringValue, keyIdList
)

defaultEngineConfigs.asScala.foreach(entity => {
  val keyId = entity.getId
  val res = limitList.asScala.filter(v => v.getKeyId == keyId).toList.asJava
  if (res.size() > 0) {
    val specialMap = new util.HashMap[String, String]()
    val maxValue = res.get(0).getMaxValue
    if (StringUtils.isNotBlank(maxValue)) {
      specialMap.put("maxValue", maxValue)
      entity.setSpecialLimit(specialMap)  // Set special limit
    }
  }
})
```

## 6. Practical Case Analysis

### 6.1 Scenario Description

User `hadoop` submits a Spark 3.2.1 task via IDE, analyzing parameter effective behavior.

### 6.2 Database Configuration

```sql
-- Global default configuration (label_id=5: *-*,*-*)
INSERT INTO linkis_ps_configuration_config_value
VALUES (101, 10, '2G', 5);  -- spark.executor.memory = 2G

-- Spark engine default configuration (label_id=20: *-*,spark-3.2.1)
INSERT INTO linkis_ps_configuration_config_value
VALUES (102, 10, '4G', 20);  -- spark.executor.memory = 4G

-- IDE creator default configuration (label_id=30: *-IDE,*-*)
INSERT INTO linkis_ps_configuration_config_value
VALUES (103, 10, '6G', 30);  -- spark.executor.memory = 6G

-- hadoop user configuration (label_id=40: hadoop-IDE,spark-3.2.1)
INSERT INTO linkis_ps_configuration_config_value
VALUES (104, 10, '8G', 40);  -- spark.executor.memory = 8G
```

### 6.3 Task Submission Parameters

```json
{
  "params": {
    "spark.executor.memory": "10G",
    "spark.executor.cores": "4"
  },
  "labels": {
    "userCreator": "hadoop-IDE",
    "engineType": "spark-3.2.1"
  }
}
```

### 6.4 Parameter Effective Process

| Step | Operation | Current Value | Description |
|------|-----------|---------------|-------------|
| 1 | Config service query | - | Start querying configuration |
| 2 | Query user config (40) | `8G` | Found `hadoop-IDE,spark-3.2.1` configuration |
| 3 | Query creator config (30) | `6G` | Found `*-IDE,*-*` configuration |
| 4 | Query engine config (20) | `4G` | Found `*-*,spark-3.2.1` configuration |
| 5 | Query global config (5) | `2G` | Found `*-*,*-*` configuration |
| 6 | Configuration merge | `8G` | User config overrides all default configs |
| 7 | Merge with task params | `10G` | User submitted params > Config service params |
| 8 | Final effective | **`10G`** | **Task submission params take effect** |

### 6.5 Final Parameter Set

```json
{
  "spark.executor.memory": "10G",        // From task submission params (highest priority)
  "spark.executor.cores": "4",           // From task submission params
  "wds.linkis.rm.yarnqueue": "default",  // From config service (user didn't specify)
  "spark.driver.memory": "1G"            // From config service (user didn't specify)
}
```

## 7. Summary

### 7.1 Key Points

1. **Clear Priority Mechanism**: Task params > User config > Creator config > Engine config > Global config
2. **Cascaded Configuration Query**: Supports multi-level default configurations, automatic merge
3. **User Parameters First**: User-submitted parameters are never overridden by configuration service
4. **Label-Driven**: Multi-dimensional configuration management through combined labels
5. **Validation and Limits**: Supports parameter validation and user-level configuration limits

### 7.2 Best Practice Recommendations

1. **Set Reasonable Defaults**: Configure reasonable default values at global and engine levels
2. **Configure On-Demand**: Only create personalized configurations for users when necessary
3. **Use Limit Features**: Use `key_limit_for_user` table to prevent users from exceeding configuration limits
4. **Parameter Validation**: Use `validate_type` and `validate_range` to ensure parameter validity
5. **Monitor Configuration Changes**: Pay attention to `update_time` field to track configuration modification history

### 7.3 Related Code File Index

| Module | File Path |
|--------|-----------|
| Configuration Service | `/linkis-public-enhancements/linkis-configuration/src/main/scala/org/apache/linkis/configuration/service/ConfigurationService.scala` |
| Engine Creation | `/linkis-computation-governance/linkis-manager/linkis-application-manager/src/main/scala/org/apache/linkis/manager/am/service/engine/DefaultEngineCreateService.scala` |
| Configuration Cache | `/linkis-computation-governance/linkis-manager/linkis-application-manager/src/main/java/org/apache/linkis/manager/am/conf/ConfigurationMapCache.java` |
| Data Access | `/linkis-public-enhancements/linkis-configuration/src/main/java/org/apache/linkis/configuration/dao/ConfigMapper.java` |
| Mapper XML | `/linkis-public-enhancements/linkis-configuration/src/main/resources/mapper/common/ConfigMapper.xml` |
| Parameter Validation | `/linkis-public-enhancements/linkis-configuration/src/main/scala/org/apache/linkis/configuration/validate/` |

---

**Document Version**: 1.0
**Last Updated**: 2025-11-23
**Analysis Based On**: Linkis Project at /data/workspace/linkis
