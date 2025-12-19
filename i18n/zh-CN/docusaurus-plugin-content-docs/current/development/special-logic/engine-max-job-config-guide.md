---
title: 引擎最大任务数配置指南
sidebar_position: 2
---

# 引擎最大任务数配置指南

## 概述

本指南说明如何使用 `wds.linkis.engine.running.job.max` 参数配置 Linkis 引擎的最大并发任务数。

## 配置详情

### 参数信息

| 属性 | 值 |
|------|-----|
| 配置键 | `wds.linkis.engine.running.job.max` |
| 显示名称 | 引擎运行最大任务数 |
| 描述 | 引擎实例可同时运行的最大任务数量 |
| 默认值 | 30 |
| 验证类型 | NumInterval (数值区间) |
| 适用引擎 | 所有引擎 (shell, hive, spark, python 等) |

### 配置级别

本指南演示如何在两个级别设置配置:

1. **全局默认配置** (`*-*,*-*`)
   - 适用于所有引擎
   - 优先级最低
   - 当不存在引擎特定配置时的后备值

2. **Hive 引擎默认配置** (`*-*,hive-3.1.3`)
   - 专门适用于 Hive 3.1.3 引擎
   - 优先级高于全局默认
   - 覆盖 Hive 引擎的全局默认值

## 前置条件

执行 SQL 脚本前,需要验证以下内容:

### 1. 检查配置键是否存在

```sql
SELECT id, `key`, name, engine_conn_type, default_value
FROM linkis_ps_configuration_config_key
WHERE `key` = 'wds.linkis.engine.running.job.max';
```

**预期结果:**
- `id`: 112 (您的环境中可能不同)
- `key`: wds.linkis.engine.running.job.max
- `name`: 引擎运行最大任务数

### 2. 检查标签 ID

```sql
SELECT id, label_key, label_value
FROM linkis_cg_manager_label
WHERE label_key = 'combined_userCreator_engineType'
  AND label_value IN ('*-*,*-*', '*-*,hive-3.1.3')
ORDER BY label_value;
```

**预期结果:**
- `id=5`, `label_value='*-*,*-*'` (全局默认)
- `id=7`, `label_value='*-*,hive-3.1.3'` (Hive 引擎默认)

:::warning 重要提示
SQL 脚本中的 `config_key_id` 和 `config_label_id` 值基于标准 Linkis 安装。**您必须在自己的数据库中验证这些 ID**,如果不同需要相应更新脚本。
:::

## SQL 脚本

### 快速执行脚本

使用此脚本直接执行:

```sql
-- 插入全局默认配置 (*-*,*-*)
INSERT INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 5, NOW(), NOW());

-- 插入 Hive 引擎默认配置 (*-*,hive-3.1.3)
INSERT INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 7, NOW(), NOW());
```

### 幂等脚本 (可安全重复执行)

如果希望脚本可以多次安全运行,使用 `REPLACE INTO`:

```sql
REPLACE INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 5, NOW(), NOW()),  -- 全局默认
(112, '30', 7, NOW(), NOW());  -- Hive 引擎默认
```

### 更新现有配置

如果配置已存在且需要更新:

```sql
-- 更新全局默认
UPDATE linkis_ps_configuration_config_value
SET config_value = '30', update_time = NOW()
WHERE config_key_id = 112 AND config_label_id = 5;

-- 更新 Hive 引擎默认
UPDATE linkis_ps_configuration_config_value
SET config_value = '30', update_time = NOW()
WHERE config_key_id = 112 AND config_label_id = 7;
```

## 验证

执行 SQL 脚本后,验证配置:

```sql
SELECT
    v.id AS value_id,
    k.key AS config_key,
    k.name AS config_name,
    v.config_value,
    l.label_value,
    CASE
        WHEN l.label_value = '*-*,*-*' THEN '全局默认 (优先级: 5)'
        WHEN l.label_value = '*-*,hive-3.1.3' THEN 'Hive引擎默认 (优先级: 4)'
        ELSE '其他'
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

**预期输出:**

| value_id | config_key | config_name | config_value | label_value | config_level | create_time | update_time |
|----------|------------|-------------|--------------|-------------|--------------|-------------|-------------|
| xxx | wds.linkis.engine.running.job.max | 引擎运行最大任务数 | 30 | *-*,*-* | 全局默认 (优先级: 5) | ... | ... |
| xxx | wds.linkis.engine.running.job.max | 引擎运行最大任务数 | 30 | *-*,hive-3.1.3 | Hive引擎默认 (优先级: 4) | ... | ... |

## 优先级说明

提交 Hive 任务时,生效配置值遵循以下优先级:

```text
1. 任务提交参数 (最高)                 ← 用户可通过 API 覆盖
   ↓
2. 用户特定配置
   示例: 'hadoop-IDE,hive-3.1.3'
   ↓
3. 创建者默认配置
   示例: '*-IDE,*-*'
   ↓
4. 引擎默认配置                        ← 本脚本创建
   >>> '*-*,hive-3.1.3' = 30
   ↓
5. 全局默认配置 (最低)                 ← 本脚本创建
   >>> '*-*,*-*' = 30
```

### 示例场景

#### 场景 1: 没有用户配置的 Hive 任务
- 用户: `hadoop`, 创建者: `IDE`, 引擎: `hive-3.1.3`
- 不存在用户特定或创建者配置
- **生效值**: `30` (来自 Hive 引擎默认 `*-*,hive-3.1.3`)

#### 场景 2: 没有用户配置的 Spark 任务
- 用户: `hadoop`, 创建者: `IDE`, 引擎: `spark-3.2.1`
- 不存在 Spark 引擎默认配置
- **生效值**: `30` (回退到全局默认 `*-*,*-*`)

#### 场景 3: 用户提交时指定运行时参数
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
- **生效值**: `50` (运行时参数覆盖所有配置)

## 为其他引擎配置

要为其他引擎(如 Spark、Python)添加相同配置,遵循相同模式:

### 1. 查找引擎的标签 ID

```sql
SELECT id, label_value
FROM linkis_cg_manager_label
WHERE label_key = 'combined_userCreator_engineType'
  AND label_value LIKE '*-*,spark%'  -- 查找 Spark
ORDER BY label_value;
```

### 2. 插入配置

```sql
-- 示例: Spark 3.2.1 引擎默认 (假设 label_id = 8)
INSERT INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 8, NOW(), NOW());  -- 根据需要调整 label_id
```

## 常见问题

### 问题: 插入失败,提示重复键错误

**原因**: 该标签的配置值已存在。

**解决方案**: 使用 `REPLACE INTO` 替代 `INSERT INTO`,或更新现有值:

```sql
UPDATE linkis_ps_configuration_config_value
SET config_value = '30', update_time = NOW()
WHERE config_key_id = 112 AND config_label_id = 5;
```

### 问题: 配置未生效

**可能原因**:
1. 配置缓存未失效
2. 存在更高优先级的配置
3. 运行时参数覆盖了配置

**解决方案**:
1. 重启 Linkis 服务以清除缓存
2. 检查是否存在用户特定或创建者配置:
   ```sql
   SELECT v.*, l.label_value
   FROM linkis_ps_configuration_config_value v
   JOIN linkis_cg_manager_label l ON v.config_label_id = l.id
   WHERE v.config_key_id = 112
   ORDER BY l.label_value;
   ```
3. 检查日志中的任务提交参数

## 清理

删除本指南创建的配置:

```sql
DELETE FROM linkis_ps_configuration_config_value
WHERE config_key_id = 112
  AND config_label_id IN (5, 7);
```

## 相关文档

- [Linkis 引擎配置参数优先级分析](./engine-config-priority.md)
- [Linkis 配置管理指南](https://linkis.apache.org/zh-CN/docs/latest/configuration/)

## 参考

- **数据库表**:
  - `linkis_ps_configuration_config_key`: 配置键定义
  - `linkis_ps_configuration_config_value`: 配置值
  - `linkis_cg_manager_label`: 标签定义

- **代码文件**:
  - `ConfigurationService.scala`: 配置服务实现
  - `DefaultEngineCreateService.scala`: 引擎创建服务
  - `ConfigMapper.xml`: 数据库映射定义

---

**最后更新**: 2025-11-23
