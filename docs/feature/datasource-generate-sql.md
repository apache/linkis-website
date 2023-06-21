---
title: Generate SQL from the data source
sidebar_position: 0.2
--- 

## 1. Background
SparkSQL and JdbcSQL are generated based on data source information, including DDL, DML, and DQL

## 2. Instructions for use
### Generate SparkSQL
Parameter Description:

| parameter name       | description    | default value |
|------------------------------|-------|-----|
| `dataSourceName`             | Data source name | -   |
| `system`             | System name  | -   |
| `database`             | Database name | -   |
| `table`             | Table name  | -   |

Submit the task through RestFul, the request example is as follows.
```json
GET /api/rest_j/v1/metadataQuery/getSparkSql?dataSourceName=mysql&system=system&database=test&table=test
```

The following is an example of the response.
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
Currently, jdbc, kafka, elasticsearch, and mongo data sources are supported. You can register spark table based on SparkSQLDdl for query

### Generate JdbcSQL
Parameter Description:

| parameter name       | description    | default value |
|------------------------------|-------|-----|
| `dataSourceName`             | Data source name | -   |
| `system`             | System name  | -   |
| `database`             | Database name | -   |
| `table`             | Table name  | -   |

Submit the task through RestFul, the request example is as follows.
```json
GET /api/rest_j/v1/metadataQuery/getJdbcSql?dataSourceName=mysql&system=system&database=test&table=test
```

The following is an example of the response.
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
Currently, jdbc data sources are supported, such as mysql, oracle, and postgres. JdbcSQLDdl can be used for front-end display

## 3. Precautions
1. You need to register the data source first

## 4. Implementation principle
### Generate SparkSQL implementation principles
Define DDL_SQL_TEMPLATE to retrieve data source information for replacement
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

### Generate JdbcSQL implementation principles
Concatenate DDL based on the table schema information
```java
  public String generateJdbcDdlSql(String database, String table) {
        StringBuilder ddl = new StringBuilder();
        ddl.append("CREATE TABLE ").append(String.format("%s.%s", database, table)).append(" (");

        try {
        List<MetaColumnInfo> columns = getColumns(database, table);
        if (CollectionUtils.isNotEmpty(columns)) {
        for (MetaColumnInfo column : columns) {
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
Some data sources support fetching DDL directly

mysql
```sql
SHOW CREATE TABLE 'table'
```

oracle
```sql
SELECT DBMS_METADATA.GET_DDL('TABLE', 'table', 'database') AS DDL  FROM DUAL
```