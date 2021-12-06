> 本文简单介绍Linkis从0.X升级到1.0的注意事项，Linkis1.0 对Linkis的多个服务进行了调整，改动较大，本文将介绍从0.X到1.X升级过程中的注意事项。

## 1. 注意事项

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**如果您是首次接触并使用Linkis，您可以忽略该章节；如果您已经是 Linkis 的使用用户，安装或升级前建议先阅读：[Linkis1.0 与 Linkis0.X 的区别简述](https://github.com/WeBankFinTech/Linkis/wiki/Linkis1.0%E4%B8%8ELinkis0.X%E7%9A%84%E5%8C%BA%E5%88%AB%E7%AE%80%E8%BF%B0)**。

## 2. 服务升级安装

&nbsp;&nbsp;&nbsp;&nbsp;  因为1.0基本上对所有服务进行了升级，包括服务名进行了修改，所以0.X到1.X升级时服务需要进行重新安装。

&nbsp;&nbsp;&nbsp;&nbsp;  在安装时如果需要保留0.X的数据，一定要选择1跳过建表语句（见下面代码）。

&nbsp;&nbsp;&nbsp;&nbsp;  Linkis1.0 的安装可以参考[如何快速安装使用Linkis-1.0](https://github.com/WeBankFinTech/Linkis-Doc/blob/master/zh_CN/Deployment_Documents/%E5%BF%AB%E9%80%9F%E9%83%A8%E7%BD%B2Linkis1.0.md)

```
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
```
## 3. 数据库升级

&nbsp;&nbsp;&nbsp;&nbsp;  服务安装完成后，需要对数据库进行结构修改，包括进行表结构变更和新增表和数据：

### 3.1 表结构修改部分：

&nbsp;&nbsp;&nbsp;&nbsp;  linkis_task 表新增了submit_user和label_json字段，更新语句是：

```mysql-sql
    ALTER TABLE linkis_task ADD submit_user varchar(50) DEFAULT NULL COMMENT 'submitUser name';
    ALTER TABLE linkis_task ADD `label_json` varchar(200) DEFAULT NULL COMMENT 'label json';
```

### 3.2 需要新执行的sql：

```mysql-sql
    cd db/module
    ##新增enginePlugin服务依赖的表：
    source linkis_ecp.sql
    ##新增public service-instanceLabel 服务依赖的表
    source linkis_instance_label.sql
    ##新增linkis-manager服务依赖的表
    source linkis_manager.sql
```

### 3.3 publicservice-Configuration表修改

&nbsp;&nbsp;&nbsp;&nbsp;  为了支持Linkis1.X 的全标签化能力，configuration模块相关数据表已全部升级为标签化，和0.X的Configuration表完全不同，需要重新执行建表语句和初始化语句。

&nbsp;&nbsp;&nbsp;&nbsp;  这意味着，**Linkis0.X 用户已有的引擎配置参数，已无法迁移到Linkis1.0之中**（建议用户重新配置一次引擎参数）。

&nbsp;&nbsp;&nbsp;&nbsp;  执行建表语句如下：

```mysql-sql
    source linkis_configuration.sql
```

&nbsp;&nbsp;&nbsp;&nbsp;  执行初始化语句，因为 Linkis1.0 支持对接多版本的引擎，所以执行初始化语句时，一定需要修改对应引擎的版本，如下所示。

```mysql-sql
    vim linkis_configuration_dml.sql
    ## 修改对应引擎的默认版本
    SET @SPARK_LABEL="spark-2.4.3";
    SET @HIVE_LABEL="hive-1.2.1";
    ## 保存执行初始化语句
    source linkis_configuration_dml.sql
```

## 4. 安装Linkis1.0

&nbsp;&nbsp;&nbsp;&nbsp;  启动Linkis1.0，验证服务是否已正常启动并对外提供服务，具体请参考： [如何快速安装使用Linkis-1.0](https://github.com/WeBankFinTech/Linkis-Doc/blob/master/zh_CN/Deployment_Documents/%E5%BF%AB%E9%80%9F%E9%83%A8%E7%BD%B2Linkis1.0.md)
