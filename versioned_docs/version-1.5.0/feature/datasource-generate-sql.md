---
title: Generate SQL according to the data source
sidebar_position: 0.5
---

## 1. Background
Generate SparkSQL and JdbcSQL based on data source information, including DDL, DML, and DQL.

## 2. Instructions for use
### generate SparkSQL

Interface address: /api/rest_j/v1/metadataQuery/getSparkSql

Request method: GET

Request data type: application/x-www-form-urlencoded

Request parameters:

| Parameter name | Description | Required | Data type |
|-------------------------------|-------|-----|--|
| `dataSourceName` | data source name | is | String |
| `system` | system name | is | String |
| `database` | database name | is | String |
| `table` | table name | is | String |

Example response:

```json
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "sparkSql": {
            "ddl": "CREATE TEMPORARY TABLE test USING org.apache.spark.sql.jdbc OPTIONS ( url 'jdbc:mysql://localhost:3306/test', dbtable 'test', user 'root', password 'password' )",
            "dml": "INSERT INTO test SELECT * FROM ${resultTable}",
            "dql": "SELECT id,name FROM test"
        }
    }
}
```
Currently supports jdbc, kafka, elasticsearch, mongo data source, you can register spark table according to SparkSQLDDL for query

### Generate JdbcSQL

Interface address: /api/rest_j/v1/metadataQuery/getJdbcSql

Request method: GET

Request data type: application/x-www-form-urlencoded

Request parameters:

| Parameter name | Description | Required | Data type |
|-------------------------------|-------|-----|--|
| `dataSourceName` | data source name | is | String |
| `system` | system name | is | String |
| `database` | database name | is | String |
| `table` | table name | is | String |

Example response:

```json
{
    "method": null,
    "status": 0,
    "message": "OK",
    "data": {
        "jdbcSql": {
            "ddl": "CREATE TABLE `test` (\n\t `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'The column name is id',\n\t `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'The column name is name',\n\t PRIMARY KEY (`id`)\n\t) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",
            "dml": "INSERT INTO test SELECT * FROM ${resultTable}",
            "dql": "SELECT id,name FROM test"
        }
    }
}
```

Currently supports JDBC data sources, such as: mysql, oracle, postgres, etc. JdbcSQLDDL can be used for front-end display.

## 3. Precautions
1. You need to register the data source first

## 4. Implementation principle
### Generate SparkSQL implementation principle
Define DDL_SQL_TEMPLATE to obtain data source information for replacement
```java
  public static final String JDBC_DDL_SQL_TEMPLATE =
        "CREATE TEMPORARY TABLE %s"
        + "USING org.apache.spark.sql.jdbc"
        + "OPTIONS ("
        + "url '%s',"
        + "dbtable '%s',"
        + " user '%s',"
        + "password '%s'"
        + ")";
```

### Generate JdbcSQL implementation principle
Splicing DDL according to table schema information
```java
public String generateJdbcDdlSql(String database, String table) {
    StringBuilder ddl = new StringBuilder();
    ddl.append("CREATE TABLE ").append(String.format("%s.%s", database, table)).append(" (");

    try {
        List < MetaColumnInfo > columns = getColumns(database, table);
        if (CollectionUtils. isNotEmpty(columns)) {
            for (MetaColumnInfo column: columns) {
                ddl.append("\n\t").append(column.getName()).append(" ").append(column.getType());
                if (column. getLength() > 0) {
                    ddl.append("(").append(column.getLength()).append(")");
                }
                if (!column. isNullable()) {
                    ddl.append("NOT NULL");
                }
                ddl.append(",");
            }
            String primaryKeys =
                columns. stream()
                .filter(MetaColumnInfo::isPrimaryKey)
                .map(MetaColumnInfo::getName)
                .collect(Collectors.joining(", "));
            if (StringUtils. isNotBlank(primaryKeys)) {
                ddl.append(String.format("\n\tPRIMARY KEY (%s),", primaryKeys));
            }
            ddl. deleteCharAt(ddl. length() - 1);
        }
    } catch (Exception e) {
        LOG.warn("Fail to get Sql columns(Failed to get the field list)");
    }

    ddl.append("\n)");

    return ddl. toString();
}
```

Some data sources support direct access to DDL

**mysql**
```sql
SHOW CREATE TABLE 'table'
```

**oracle**
```sql
SELECT DBMS_METADATA.GET_DDL('TABLE', 'table', 'database') AS DDL FROM DUAL
```