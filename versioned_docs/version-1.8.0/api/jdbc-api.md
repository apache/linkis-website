---
title: Task JDBC API
sidebar_position: 4
---

# Task Submission And Execution Of JDBC API 

### 1. Introduce Dependent Modules
The first way depends on the JDBC module in the pom:  
```xml
<dependency>
    <groupId>org.apache.linkis</groupId>
    <artifactId>linkis-jdbc-driver</artifactId>
    <version>${linkis.version}</version>
 </dependency>
```  
**Note:** The module has not been deployed to the central repository. You need to execute `mvn install -Dmaven.test.skip=true` in the linkis-computation-governance/linkis-jdbc-driver directory for local installation.

**The second way is through packaging and compilation:**
1. Enter the linkis-jdbc-driver directory in the Linkis project and enter the command in the terminal to package `mvn assembly:assembly -Dmaven.test.skip=true`
The packaging instruction skips the running of the unit test and the compilation of the test code, and packages the dependencies required by the JDBC module into the Jar package.  
2. After the packaging is complete, two Jar packages will be generated in the target directory of JDBC. The one with dependencies in the Jar package name is the Jar package we need.  
### 2. Create A Test Category
Establish a Java test class LinkisJDBCTest, the specific interface meaning can be seen in the notes:  
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

1. Where EngineType is the specified corresponding engine type: supports Spark/hive/presto/shell, etc.
2. Creator is the specified corresponding application type, which is used for resource isolation between applications