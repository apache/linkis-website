-- =====================================================================
-- Linkis Configuration: Insert Engine Max Running Job Configuration
-- =====================================================================
-- Description: Insert configuration for maximum running jobs for engines
-- Configuration Key: wds.linkis.engine.running.job.max
-- Default Value: 30 (for both global and hive engine)
-- =====================================================================

-- Step 1: Check if configuration key exists
-- The configuration key 'wds.linkis.engine.running.job.max' should already exist
-- If not, you need to create it first in linkis_ps_configuration_config_key table

SELECT
    id,
    `key`,
    name,
    engine_conn_type,
    default_value
FROM
    linkis_ps_configuration_config_key
WHERE
    `key` = 'wds.linkis.engine.running.job.max';

-- Expected result: id = 112 (may vary in your environment)

-- Step 2: Get label IDs for global and hive engine configurations
SELECT
    id,
    label_key,
    label_value,
    CASE
        WHEN label_value = '*-*,*-*' THEN 'Global Default'
        WHEN label_value = '*-*,hive-3.1.3' THEN 'Hive Engine Default'
        ELSE 'Other'
    END AS label_type
FROM
    linkis_cg_manager_label
WHERE
    label_key = 'combined_userCreator_engineType'
    AND label_value IN ('*-*,*-*', '*-*,hive-3.1.3')
ORDER BY
    label_value;

-- Expected results:
-- id=5,  label_value='*-*,*-*'         (Global Default)
-- id=7,  label_value='*-*,hive-3.1.3' (Hive Engine Default)

-- =====================================================================
-- Step 3: Insert Configuration Values
-- =====================================================================

-- 3.1 Insert Global Default Configuration
-- Sets maximum running jobs to 30 for all engines (global default)
INSERT INTO linkis_ps_configuration_config_value
(
    config_key_id,      -- References config_key.id (112)
    config_value,       -- Value: 30
    config_label_id,    -- References label.id (5 for global '*-*,*-*')
    create_time,
    update_time
)
VALUES
(
    112,                -- config_key_id for 'wds.linkis.engine.running.job.max'
    '30',               -- Maximum 30 concurrent jobs (global default)
    5,                  -- label_id for '*-*,*-*' (global default)
    NOW(),
    NOW()
);

-- 3.2 Insert Hive Engine Default Configuration
-- Sets maximum running jobs to 30 specifically for Hive engine
INSERT INTO linkis_ps_configuration_config_value
(
    config_key_id,      -- References config_key.id (112)
    config_value,       -- Value: 30
    config_label_id,    -- References label.id (7 for hive '*-*,hive-3.1.3')
    create_time,
    update_time
)
VALUES
(
    112,                -- config_key_id for 'wds.linkis.engine.running.job.max'
    '30',               -- Maximum 30 concurrent jobs (Hive default)
    7,                  -- label_id for '*-*,hive-3.1.3' (Hive engine default)
    NOW(),
    NOW()
);

-- =====================================================================
-- Step 4: Verify Insertions
-- =====================================================================

-- Verify the inserted configuration values
SELECT
    v.id AS value_id,
    k.key AS config_key,
    k.name AS config_name,
    v.config_value,
    l.label_value,
    CASE
        WHEN l.label_value = '*-*,*-*' THEN 'Global Default (Priority: 5 - Lowest)'
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

-- =====================================================================
-- Priority Explanation
-- =====================================================================
/*
Configuration Priority (from highest to lowest):

1. Runtime Parameters                    [Priority: 1 - Highest]
   User can override via API params when submitting job

2. User Specific Configuration           [Priority: 2]
   Example: 'hadoop-IDE,hive-3.1.3'
   (Not created in this script)

3. Creator Default Configuration         [Priority: 3]
   Example: '*-IDE,*-*'
   (Not created in this script)

4. Engine Default Configuration          [Priority: 4]
   >>> '*-*,hive-3.1.3' = 30  (CREATED IN THIS SCRIPT)
   Applied to all users using Hive engine

5. Global Default Configuration          [Priority: 5 - Lowest]
   >>> '*-*,*-*' = 30  (CREATED IN THIS SCRIPT)
   Applied to all users, all engines

When a Hive job is submitted:
- If user provides runtime param: Use runtime param value
- Else if user-specific config exists: Use user config value
- Else if creator config exists: Use creator config value
- Else: Use Hive engine default (30) ← Created in this script
- Finally: Use global default (30) ← Created in this script

For other engines (non-Hive):
- Will fallback to global default (30)
*/

-- =====================================================================
-- Alternative: Use REPLACE INTO for Idempotent Execution
-- =====================================================================
-- If you want to make the script idempotent (can run multiple times),
-- use REPLACE INTO instead of INSERT INTO:

/*
REPLACE INTO linkis_ps_configuration_config_value
(config_key_id, config_value, config_label_id, create_time, update_time)
VALUES
(112, '30', 5, NOW(), NOW()),  -- Global default
(112, '30', 7, NOW(), NOW());  -- Hive engine default
*/

-- =====================================================================
-- Update Existing Configuration (if needed)
-- =====================================================================
-- If the configuration already exists and you want to update it:

/*
UPDATE linkis_ps_configuration_config_value
SET
    config_value = '30',
    update_time = NOW()
WHERE
    config_key_id = 112
    AND config_label_id = 5;  -- Global default

UPDATE linkis_ps_configuration_config_value
SET
    config_value = '30',
    update_time = NOW()
WHERE
    config_key_id = 112
    AND config_label_id = 7;  -- Hive engine default
*/

-- =====================================================================
-- Cleanup (if needed to remove these configurations)
-- =====================================================================
/*
DELETE FROM linkis_ps_configuration_config_value
WHERE
    config_key_id = 112
    AND config_label_id IN (5, 7);
*/

-- =====================================================================
-- End of Script
-- =====================================================================
