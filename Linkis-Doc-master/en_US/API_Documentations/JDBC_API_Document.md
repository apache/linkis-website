# Task Submission And Execution Of JDBC API Documents
### 1. Introduce Dependent Modules
The first way depends on the JDBC module in the pom:  
```xml
<dependency>
    <groupId>com.webank.wedatasphere.linkis</groupId>
    <artifactId>linkis-ujes-jdbc</artifactId>
    <version>${linkis.version}</version>
 </dependency>
```  
**Note:** The module has not been deployed to the central warehouse. You need to execute `mvn install -Dmaven.test.skip=true` in the ujes/jdbc directory for local installation.

**The second way is through packaging and compilation:**
1. Enter the ujes/jdbc directory in the Linkis project and enter the command in the terminal to package `mvn assembly:assembly -Dmaven.test.skip=true`
The packaging instruction skips the running of the unit test and the compilation of the test code, and packages the dependencies required by the JDBC module into the Jar package.  
2. After the packaging is complete, two Jar packages will be generated in the target directory of JDBC. The one with dependencies in the Jar package name is the Jar package we need.  
### Second, create a test category:
Establish a Java test class LinkisClientImplTestJ, the specific interface meaning can be seen in the notes:  
```java
 public static void main(String[] args) throws SQLException, ClassNotFoundException {

        //1. Load driver class：com.webank.wedatasphere.linkis.ujes.jdbc.UJESSQLDriver
        Class.forName("com.webank.wedatasphere.linkis.ujes.jdbc.UJESSQLDriver");

        //2. Get connection：jdbc:linkis://gatewayIP:gatewayPort
        //   the front-end account password
        Connection connection =  DriverManager.getConnection("jdbc:linkis://127.0.0.1:9001","username","password");

        //3. Create statement and execute query
        Statement st= connection.createStatement();
        ResultSet rs=st.executeQuery("show tables");
        //4. Processing the returned results of the database (using the ResultSet class)
        while (rs.next()) {
            ResultSetMetaData metaData = rs.getMetaData();
            for (int i = 1; i <= metaData.getColumnCount(); i++) {
                System.out.print(metaData.getColumnName(i) + ":" +metaData.getColumnTypeName(i)+": "+ rs.getObject(i) + "    ");
            }
            System.out.println();
        }
        // close resourse
        rs.close();
        st.close();
        connection.close();
    }
```