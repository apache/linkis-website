---
title: 根据数据源生成SQL
sidebar_position: 0.5
--- 

## 1. 背景
根据数据源信息生成 SparkSQL 和 JdbcSQL，包含DDL、DML、DQL。

## 2. 使用说明
### 生成SparkSQL

接口地址：/api/rest_j/v1/metadataQuery/getSparkSql

请求方式：GET

请求数据类型：application/x-www-form-urlencoded

请求参数：

| 参数名                          | 说明    | 是否必须 | 数据类型 |
|------------------------------|-------|-----|--|
| `dataSourceName`             | 数据源名称 | 是   | String |
| `system`             | 系统名称  | 是   | String |
| `database`             | 数据库名称 | 是   | String |
| `table`             | 表名称   | 是   | String |

响应示例:

```json
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "sparkSql": {
            "ddl": "CREATE TEMPORARY TABLE test USING org.apache.spark.sql.jdbc OPTIONS (  url 'jdbc:mysql://localhost:3306/test',  dbtable 'test',  user 'root',  password 'password')",
            "dml": "INSERT INTO test SELECT * FROM ${resultTable}",
            "dql": "SELECT id,name FROM test"
        }
    }
}
```
目前支持jdbc、kafka、elasticsearch、mongo 数据源，可以根据SparkSQLDDL注册 spark table 进行查询

### 生成JdbcSQL

接口地址：/api/rest_j/v1/metadataQuery/getJdbcSql

请求方式：GET

请求数据类型：application/x-www-form-urlencoded

请求参数：

| 参数名                          | 说明    | 是否必须 | 数据类型 |
|------------------------------|-------|-----|--|
| `dataSourceName`             | 数据源名称 | 是   | String |
| `system`             | 系统名称  | 是   | String |
| `database`             | 数据库名称 | 是   | String |
| `table`             | 表名称   | 是   | String |

响应示例:

```json
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "jdbcSql": {
            "ddl": "CREATE TABLE `test` (\n\t  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '列名是id',\n\t  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '列名是name',\n\t  PRIMARY KEY (`id`)\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",
            "dml": "INSERT INTO test SELECT * FROM ${resultTable}",
            "dql": "SELECT id,name FROM test"
        }
    }
}
```

目前支持 JDBC 数据源，如：mysql、oracle、postgres等，JdbcSQLDDL可以用于前端展示。

## 3. 注意事项
1. 需要先注册数据源

## 4. 实现原理
### 生成SparkSQL实现原理
定义DDL_SQL_TEMPLATE,获取数据源信息进行替换
```java
  public static final String JDBC_DDL_SQL_TEMPLATE =
        "CREATE TEMPORARY TABLE %s "
        + "USING org.apache.spark.sql.jdbc "
        + "OPTIONS ("
        + "  url '%s',"
        + "  dbtable '%s',"
        + "  user '%s',"
        + "  password '%s'"
        + ")";
```

### 生成JdbcSQL实现原理
根据表schema信息拼接DDL
```java
public String generateJdbcDdlSql(String database, String table) {
    StringBuilder ddl = new StringBuilder();
    ddl.append("CREATE TABLE ").append(String.format("%s.%s", database, table)).append(" (");

    try {
        List < MetaColumnInfo > columns = getColumns(database, table);
        if (CollectionUtils.isNotEmpty(columns)) {
            for (MetaColumnInfo column: columns) {
                ddl.append("\n\t").append(column.getName()).append(" ").append(column.getType());
                if (column.getLength() > 0) {
                    ddl.append("(").append(column.getLength()).append(")");
                }
                if (!column.isNullable()) {
                    ddl.append(" NOT NULL");
                }
                ddl.append(",");
            }
            String primaryKeys =
                columns.stream()
                .filter(MetaColumnInfo::isPrimaryKey)
                .map(MetaColumnInfo::getName)
                .collect(Collectors.joining(", "));
            if (StringUtils.isNotBlank(primaryKeys)) {
                ddl.append(String.format("\n\tPRIMARY KEY (%s),", primaryKeys));
            }
            ddl.deleteCharAt(ddl.length() - 1);
        }
    } catch (Exception e) {
        LOG.warn("Fail to get Sql columns(获取字段列表失败)");
    }

    ddl.append("\n)");

    return ddl.toString();
}
```

部分数据源支持直接获取DDL

**mysql**
```sql
SHOW CREATE TABLE 'table'
```

**oracle**
```sql
SELECT DBMS_METADATA.GET_DDL('TABLE', 'table', 'database') AS DDL  FROM DUAL
```