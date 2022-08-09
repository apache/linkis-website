SET @FLINK_LABEL="flink-1.12.7";
SET @FLINK_ALL=CONCAT('*-*,',@FLINK_LABEL);
SET @FLINK_IDE=CONCAT('*-IDE,',@FLINK_LABEL);

insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@FLINK_ALL, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@FLINK_IDE, 'OPTIONAL', 2, now(), now());

select @label_id := id from linkis_cg_manager_label where `label_value` = @FLINK_IDE;
insert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);

INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('flink.client.memory', '取值范围：1-15，单位：G', 'flink客户端的内存大小', '1g', 'Regex', '^([1-9]|1[0-5])(G|g)$', '0', '0', '1', 'flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('flink.jobmanager.memory', '取值范围：1-30，单位：G', 'flink JobManager的内存大小', '1g', 'Regex', '^([1-9]|[1-2][0-9]|3[0])(G|g)$', '0', '0', '1', 'flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('flink.taskmanager.memory', '取值范围：1-30，单位：G', 'flink TaskManager的内存大小', '1g', 'Regex', '^([1-9]|[1-2][0-9]|3[0])(G|g)$', '0', '0', '1', 'flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('flink.taskmanager.numberOfTaskSlots', '取值范围：1-40，单位：个', 'flink执行器实例最大并发数', '2', 'NumInterval', '[1,40]', '0', '0', '1', 'flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('flink.taskmanager.cpu.cores', '取值范围：1-8，单位：个', 'flink执行器核心个数',  '2', 'NumInterval', '[1,8]', '0', '0', '1','flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('flink.container.num', '取值范围：1-40，单位：个', 'flink container个数', '2', 'NumInterval', '[1,40]', '0', '0', '1', 'flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.rm.yarnqueue', 'flink任务所用yarn队列名', 'yarn队列名', 'default', 'None', NULL, '0', '0', '1', 'flink资源设置', 'flink');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.engineconn.flink.app.parallelism', '取值范围：1-40，单位：个', 'flink app并行度', '1', 'NumInterval', '[1,40]', '0', '0', '1', 'flink资源设置', 'flink');

insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config
INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'flink' and label.label_value = @FLINK_ALL);


insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation
INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @FLINK_ALL);