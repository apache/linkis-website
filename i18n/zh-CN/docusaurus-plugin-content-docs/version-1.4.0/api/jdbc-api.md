---
title: JDBC Driver 文档
sidebar_position: 4
---
## 1. 引入依赖模块：
第一种方式在pom里面依赖JDBC模块：
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-jdbc-driver</artifactId>
    <version>${linkis.version}</version>
</dependency>
```  
**注意:** 该模块还没有deploy到中央仓库，需要在linkis-computation-governance/linkis-jdbc-driver目录里面执行`mvn install -Dmaven.test.skip=true`进行本地安装。

**第二种方式通过打包和编译：**
1. 在Linkis项目中进入到linkis-computation-governance/linkis-jdbc-driver目录然后在终端输入指令进行打包`mvn assembly:assembly -Dmaven.test.skip=true`
该打包指令会跳过单元测试的运行和测试代码的编译，并将JDBC模块需要的依赖一并打包进Jar包之中。
2. 打包完成后在JDBC的target目录下会生成两个Jar包，Jar包名称中包含dependencies字样的那个就是我们需要的驱动包

## 2. 建立测试类：
建立Java的测试类LinkisJDBCTest，具体接口含义可以见注释：

```java
package org.apache.linkis.jdbc.test;

import java.sql.*;

public class LinkisJDBCTest {

    public static void main(String[] args) throws SQLException, ClassNotFoundException {

        //1. load driver：org.apache.linkis.ujes.jdbc.UJESSQLDriver
        Class.forName("org.apache.linkis.ujes.jdbc.UJESSQLDriver");

        //2. Get Connection：jdbc:linkis://gatewayIP:gatewayPort/dbName?EngineType=hive&creator=test, user/password   
        Connection connection =  DriverManager.getConnection("jdbc:linkis://127.0.0.1:9001/default?EngineType=hive&creator=test","hadoop","hadoop");
        //3. Create statement 
        Statement st= connection.createStatement();
        ResultSet rs=st.executeQuery("show tables");
        //4.get result
        while (rs.next()) {
            ResultSetMetaData metaData = rs.getMetaData();
            for (int i = 1; i <= metaData.getColumnCount(); i++) {
                System.out.print(metaData.getColumnName(i) + ":" +metaData.getColumnTypeName(i)+": "+ rs.getObject(i) + "    ");
            }
            System.out.println();
        }
        //close resource
        rs.close();
        st.close();
        connection.close();
    }
}
```

备注：
1. 其中EngineType为指定对应的引擎类型：支持Spark/hive/presto/shell等
2. 其中creator为指定对应的应用类型，用于应用间的资源隔离
