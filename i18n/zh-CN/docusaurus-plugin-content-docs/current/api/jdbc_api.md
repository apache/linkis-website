# 任务提交执行JDBC API文档

### 一、引入依赖模块：
第一种方式在pom里面依赖JDBC模块：
```xml
<dependency>
    <groupId>com.webank.wedatasphere.linkis</groupId>
    <artifactId>linkis-ujes-jdbc</artifactId>
    <version>${linkis.version}</version>
 </dependency>
```
**注意:** 该模块还没有deploy到中央仓库，需要在ujes/jdbc目录里面执行`mvn install -Dmaven.test.skip=true`进行本地安装。

**第二种方式通过打包和编译：**
1. 在Linkis项目中进入到ujes/jdbc目录然后在终端输入指令进行打包`mvn assembly:assembly -Dmaven.test.skip=true`
该打包指令会跳过单元测试的运行和测试代码的编译，并将JDBC模块需要的依赖一并打包进Jar包之中。
2. 打包完成后在JDBC的target目录下会生成两个Jar包，Jar包名称中包含dependencies字样的那个就是我们需要的Jar包

### 二、建立测试类：
建立Java的测试类LinkisClientImplTestJ，具体接口含义可以见注释：
```java
 public static void main(String[] args) throws SQLException, ClassNotFoundException {

        //1. 加载驱动类：com.webank.wedatasphere.linkis.ujes.jdbc.UJESSQLDriver
        Class.forName("com.webank.wedatasphere.linkis.ujes.jdbc.UJESSQLDriver");

        //2. 获得连接：jdbc:linkis://gatewayIP:gatewayPort   帐号和密码对应前端的帐号密码
        Connection connection =  DriverManager.getConnection("jdbc:linkis://127.0.0.1:9001","username","password");

        //3. 创建statement 和执行查询
        Statement st= connection.createStatement();
        ResultSet rs=st.executeQuery("show tables");
        //4.处理数据库的返回结果(使用ResultSet类)
        while (rs.next()) {
            ResultSetMetaData metaData = rs.getMetaData();
            for (int i = 1; i <= metaData.getColumnCount(); i++) {
                System.out.print(metaData.getColumnName(i) + ":" +metaData.getColumnTypeName(i)+": "+ rs.getObject(i) + "    ");
            }
            System.out.println();
        }
        //关闭资源
        rs.close();
        st.close();
        connection.close();
    }
```