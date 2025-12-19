---
title: Engine Max Running Job Configuration Guide
sidebar_position: 2
---

# Engine Max Running Job Configuration Guide

## Overview

This guide explains how to configure the maximum number of concurrent running jobs for Linkis engines using the `wds.linkis.engine.running.job.max` parameter.

## Configuration Details

### Parameter Information

| Property | Value |
|----------|-------|
| Configuration Key | `wds.linkis.engine.running.job.max` |
| Display Name | 引擎运行最大任务数 (Engine Max Running Jobs) |
| Description | Maximum number of concurrent jobs that can run in an engine instance |
| Default Value | 30 |
| Validation Type | NumInterval |
| Applicable Engines | All engines (shell, hive, spark, python, etc.) |

### Configuration Levels

This guide demonstrates how to set the configuration at two levels:

1. **Global Default** (`*-*,*-*`)
   - Applies to all engines
   - Lowest priority
   - Fallback when no engine-specific config exists

2. **Hive Engine Default** (`*-*,hive-3.1.3`)
   - Applies specifically to Hive 3.1.3 engine
   - Higher priority than global default
   - Overrides global default for Hive engine

## Prerequisites

Before executing the SQL scripts, verify the following:

### 1. Check Configuration Key Exists

```sql
SELECT id, `key`, name, engine_conn_type, default_value
FROM linkis_ps_configuration_config_key
WHERE `key` = 'wds.linkis.engine.running.job.max';
```

**Expected Result:**
- `id`: 112 (may vary in your environment)
- `key`: wds.linkis.engine.running.job.max
- `name`: 引擎运行最大任务数

### 2. Check Label IDs

```sql
SELECT id, label_key, label_value
FROM linkis_cg_manager_label
WHERE label_key = 'combined_userCreator_engineType'
  AND label_value IN ('*-*,*-*', '*-*,hive-3.1.3')
ORDER BY label_value;
```

**Expected Results:**
- `id=5`, `label_value='*-*,*-*'` (Global Default)
- `id=7`, `label_value='*-*,hive-3.1.3'` (Hive Engine Default)

:::warning Important
The `config_key_id` and `config_label_id` values in the SQL scripts are based on a standard Linkis installation. **You must verify these IDs in your own database** and update the scripts accordingly if they differ.
:::

## SQL Scripts

### Quick Execution Script

Use this script for direct execution:

```sql
-- Insert Global Default Configuration (*-*,*-*)
INSERT INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 5, NOW(), NOW());

-- Insert Hive Engine Default Configuration (*-*,hive-3.1.3)
INSERT INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 7, NOW(), NOW());
```

### Idempotent Script (Safe for Re-execution)

Use `REPLACE INTO` if you want to run the script multiple times safely:

```sql
REPLACE INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 5, NOW(), NOW()),  -- Global default
(112, '30', 7, NOW(), NOW());  -- Hive engine default
```

### Update Existing Configuration

If the configuration already exists and you want to update it:

```sql
-- Update Global Default
UPDATE linkis_ps_configuration_config_value
SET config_value = '30', update_time = NOW()
WHERE config_key_id = 112 AND config_label_id = 5;

-- Update Hive Engine Default
UPDATE linkis_ps_configuration_config_value
SET config_value = '30', update_time = NOW()
WHERE config_key_id = 112 AND config_label_id = 7;
```

## Verification

After executing the SQL scripts, verify the configuration:

```sql
SELECT
    v.id AS value_id,
    k.key AS config_key,
    k.name AS config_name,
    v.config_value,
    l.label_value,
    CASE
        WHEN l.label_value = '*-*,*-*' THEN 'Global Default (Priority: 5)'
        WHEN l.label_value = '*-*,hive-3.1.3' THEN 'Hive Engine Default (Priority: 4)'
        ELSE 'Other'
    END AS config_level,
    v.create_time,
    v.update_time
FROM
    linkis_ps_configuration_config_value v
JOIN
    linkis_ps_configuration_config_key k ON v.config_key_id = k.id
JOIN
    linkis_cg_manager_label l ON v.config_label_id = l.id
WHERE
    k.key = 'wds.linkis.engine.running.job.max'
    AND v.config_label_id IN (5, 7)
ORDER BY
    l.label_value;
```

**Expected Output:**

| value_id | config_key | config_name | config_value | label_value | config_level | create_time | update_time |
|----------|------------|-------------|--------------|-------------|--------------|-------------|-------------|
| xxx | wds.linkis.engine.running.job.max | 引擎运行最大任务数 | 30 | *-*,*-* | Global Default (Priority: 5) | ... | ... |
| xxx | wds.linkis.engine.running.job.max | 引擎运行最大任务数 | 30 | *-*,hive-3.1.3 | Hive Engine Default (Priority: 4) | ... | ... |

## Priority Explanation

When a Hive job is submitted, the effective configuration value follows this priority:

```text
1. Runtime Parameters (highest)         ← User can override via API
   ↓
2. User Specific Configuration
   Example: 'hadoop-IDE,hive-3.1.3'
   ↓
3. Creator Default Configuration
   Example: '*-IDE,*-*'
   ↓
4. Engine Default Configuration         ← Created by this script
   >>> '*-*,hive-3.1.3' = 30
   ↓
5. Global Default Configuration (lowest) ← Created by this script
   >>> '*-*,*-*' = 30
```

### Example Scenarios

#### Scenario 1: Hive Job Without User Config
- User: `hadoop`, Creator: `IDE`, Engine: `hive-3.1.3`
- No user-specific or creator config exists
- **Effective value**: `30` (from Hive engine default `*-*,hive-3.1.3`)

#### Scenario 2: Spark Job Without User Config
- User: `hadoop`, Creator: `IDE`, Engine: `spark-3.2.1`
- No Spark engine default config exists
- **Effective value**: `30` (falls back to global default `*-*,*-*`)

#### Scenario 3: User Submits with Runtime Parameter
```json
{
  "params": {
    "wds.linkis.engine.running.job.max": "50"
  },
  "labels": {
    "userCreator": "hadoop-IDE",
    "engineType": "hive-3.1.3"
  }
}
```
- **Effective value**: `50` (runtime parameter overrides all configs)

## Configuration for Other Engines

To add the same configuration for other engines (e.g., Spark, Python), follow the same pattern:

### 1. Find the Engine's Label ID

```sql
SELECT id, label_value
FROM linkis_cg_manager_label
WHERE label_key = 'combined_userCreator_engineType'
  AND label_value LIKE '*-*,spark%'  -- For Spark
ORDER BY label_value;
```

### 2. Insert Configuration

```sql
-- Example: Spark 3.2.1 engine default (assuming label_id = 8)
INSERT INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 8, NOW(), NOW());  -- Adjust label_id as needed
```

## Troubleshooting

### Issue: Insert Fails with Duplicate Key Error

**Cause**: Configuration value already exists for the label.

**Solution**: Use `REPLACE INTO` instead of `INSERT INTO`, or update the existing value:

```sql
UPDATE linkis_ps_configuration_config_value
SET config_value = '30', update_time = NOW()
WHERE config_key_id = 112 AND config_label_id = 5;
```

### Issue: Configuration Not Taking Effect

**Possible Causes**:
1. Configuration cache not invalidated
2. Higher priority configuration exists
3. Runtime parameter overriding the config

**Solutions**:
1. Restart Linkis services to clear cache
2. Check for user-specific or creator configurations:
   ```sql
   SELECT v.*, l.label_value
   FROM linkis_ps_configuration_config_value v
   JOIN linkis_cg_manager_label l ON v.config_label_id = l.id
   WHERE v.config_key_id = 112
   ORDER BY l.label_value;
   ```
3. Check job submission parameters in logs

## Cleanup

To remove the configurations created by this guide:

```sql
DELETE FROM linkis_ps_configuration_config_value
WHERE config_key_id = 112
  AND config_label_id IN (5, 7);
```

## Related Documentation

- [Linkis Engine Configuration Parameter Priority Analysis](./engine-config-priority.md)
- [Linkis Configuration Management Guide](https://linkis.apache.org/docs/latest/configuration/)

## References

- **Database Tables**:
  - `linkis_ps_configuration_config_key`: Configuration key definitions
  - `linkis_ps_configuration_config_value`: Configuration values
  - `linkis_cg_manager_label`: Label definitions

- **Code Files**:
  - `ConfigurationService.scala`: Configuration service implementation
  - `DefaultEngineCreateService.scala`: Engine creation service
  - `ConfigMapper.xml`: Database mapper definitions

---

**Last Updated**: 2025-11-23
