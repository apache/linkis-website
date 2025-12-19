-- =====================================================================
-- Linkis 引擎最大任务数配置插入脚本 (简化版)
-- =====================================================================
-- 配置项: wds.linkis.engine.running.job.max (引擎运行最大任务数)
-- 配置值: 30
-- =====================================================================

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

-- 验证插入结果
SELECT
    v.id AS value_id,
    k.key AS config_key,
    k.name AS config_name,
    v.config_value,
    l.label_value,
    CASE
        WHEN l.label_value = '*-*,*-*' THEN '全局默认'
        WHEN l.label_value = '*-*,hive-3.1.3' THEN 'Hive引擎默认'
        ELSE '其他'
    END AS config_level
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
