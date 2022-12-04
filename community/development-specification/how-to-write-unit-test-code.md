---
title: How to Write Unit Test Code
sidebar_position: 10
---

## 1.Frame Selection

Junit5 + mockito + Jacobo + H2 local database

Idea enhancement plugin  

- JUnitGenerator V2. 0 standard module for generating test cases
- Create the allnewset object and set the default value for allnewset
- The association mapping between mybatisx DAO and mapper is easy to view

### 1.1 Configure the Template of JUnit in Idea

```properties

######################################################################################## 
## 
## Available variables: 
##         $entryList.methodList - List of method composites 
##         $entryList.privateMethodList - List of private method composites 
##         $entryList.fieldList - ArrayList of class scope field names 
##         $entryList.className - class name 
##         $entryList.packageName - package name 
##         $today - Todays date in MM/dd/yyyy format 
## 
##            MethodComposite variables: 
##                $method.name - Method Name 
##                $method.signature - Full method signature in String form 
##                $method.reflectionCode - list of strings representing commented out reflection code to access method (Private Methods) 
##                $method.paramNames - List of Strings representing the method's parameters' names 
##                $method.paramClasses - List of Strings representing the method's parameters' classes 
## 
## You can configure the output class name using "testClass" variable below. 
## Here are some examples: 
## Test${entry.ClassName} - will produce TestSomeClass 
## ${entry.className}Test - will produce SomeClassTest 
## 
######################################################################################## 
## 
## title case 
#macro (cap $strIn)$strIn.valueOf($strIn.charAt(0)).toUpperCase()$strIn.substring(1)#end 
## Initial lowercase custom down
#macro (down $strIn)$strIn.valueOf($strIn.charAt(0)).toLowerCase()$strIn.substring(1)#end
## Iterate through the list and generate testcase for every entry. 
#foreach ($entry in $entryList) 
#set( $testClass="${entry.className}Test") 
##

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package $entry.packageName; 
 
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

/** 
 * ${entry.className} Tester
*/ 
public class $testClass { 
 
    @Autowired
    private ${entry.className} #down(${entry.className});
 
    @BeforeEach
    @DisplayName("Each unit test method is executed once before execution")
    public void before() throws Exception {
    }
 
    @AfterEach
    @DisplayName("Each unit test method is executed once before execution")
    public void after() throws Exception {
    }
 
#foreach($method in $entry.methodList) 
 
    @Test
    @DisplayName("Method description: ...")
    public void test#cap(${method.name})() throws Exception { 
        //TODO: Test goes here... 
    } 
 
#end 
 
#foreach($method in $entry.privateMethodList) 

    @Test
    @DisplayName("Method description: ...")
    public void test#cap(${method.name})() throws Exception { 
        //TODO: Test goes here... 
    #foreach($string in $method.reflectionCode) 
    $string 
    #end 
    } 
 
#end 
} 
#end

```

![test-0]( https://user-images.githubusercontent.com/29391030/155080741-7e6b89db-0ee6-48e1-a858-4123d5bbf2f0.png )

1. Configure test class generation path  

   Original configuration: ${sourcepath}/test/${package}/${filename}  
   Modified configuration: ${sourcepath}/..//test/java/${PACKAGE}/${FILENAME}  

   As shown in the figure:  
   ![test-1]( https://user-images.githubusercontent.com/29391030/155080336-476feba6-2790-43b5-a572-ee0aa6a9586f.png )

2. Select class -> right click -> generate -> JUnit test to generate a test class

   ![test-2]( https://user-images.githubusercontent.com/29391030/155080650-4fa68c66-5d7c-4e9f-ba63-0c7fc62d9df2.png )



## 2.Unit Test Criteria

### 2.1 Catalogue And Naming Citeria

- 1. Unit test code directory
     It must be written in the following project directory: src/test/java. It is not allowed to write in the business code directory.  
     Note: this directory will be skipped during source code compilation, while the unit test framework scans this directory by default. The test configuration file must be placed under the src/test/resources file

- 2. The package name of the test class should be consistent with the package name of the tested class  
     Example:  
     Business class： src/main/java/org/apache/linkis/jobhistory/dao/JobDetailMapper.java  
     Corresponding test class：src/main/java/org/apache/linkis/jobhistory/dao/JobDetailMapperTest java  

- 3. Naming and definition specification of test class: use test as the suffix of class name  
     The test class is named as follows:  
     Tested business + test, tested interface + test, tested class + test  

- 4. Specification for naming and defining test cases: use test as the prefix of method names
     The naming rule of test cases is: test + method name. Avoid using names that have no meaning in test1 and test2. Secondly, necessary function and method annotations are required.

### 2.2 Unit Coding Specifications

- 1. System is not allowed to be used in unit test Out for human flesh verification, or if judgment for verification (log can be used for Key log output). Assertion assert must be used for verification.

- 2. Maintain the independence of unit testing. In order to ensure that unit tests are stable, reliable and easy to maintain, unit test cases must not call each other or rely on the order of execution.
     Counterexample: method2 needs to rely on the execution of method1 and take the execution result as the input of method2

- 3. Unit tests must be repeatable and not affected by the external environment.  
     Note: unit tests are usually put into continuous integration. Unit tests will be executed every time there is code check in. If the single test depends on the external environment (network, service, middleware, etc.), it is easy to lead to the unavailability of the continuous integration mechanism.  
     Positive example: in order not to be affected by the external environment, it is required to change the relevant dependencies of the tested class into injection when designing the code, and inject a local (memory) implementation or mock implementation with a dependency injection framework such as spring during testing.

- 4. Incremental code ensures that the unit test passes.
     Note: the new code must supplement the unit test. If the new code affects the original unit test, please correct it

- 5. For unit testing, it is necessary to ensure that the test granularity is small enough to help accurately locate the problem. Single test granularity is generally at the method level (very few scenarios such as tool classes or enumeration classes can be at the class level).  
     Note: only with small test granularity can we locate the error location as soon as possible. Single test is not responsible for checking cross class or cross system interaction logic, which is the field of integration testing.

## 3.Use of Assertions    

    The result verification of all test cases must use the assertion pattern     
        use Assertions.assertEquals
        Assertions.assertEquals(expectedJobDetail, actualJobDetail)
        
    The assertions assertion of junit5 is preferred, and the assertions of assertij are allowed in very few scenarios    
        Comparison of objects before/after updating common scene databases
        Asserting the usingrecursive comparison pattern using assertj's assertThat
        Assertions.assertThat(actualObject).usingRecursiveComparison().isEqualTo(expectedObject);


### 3.1 Junit5 General Assertion

| Method | description    | remarks |
|--------|-------------|-------------|
|Assertequals | judge whether two objects or two original types are equal|        | 
|Assertnotequals | judge whether two objects or two original types are not equal|        | 
|Asserttrue | judge whether the given Boolean value is true|        | 
|Assertfalse | judge whether the given Boolean value is false|        | 
|AssertNull | judge whether the given object reference is null|        | 
|AssertNotNull | judge whether the given object reference is not null|        | 
|Assert all | multiple judgment logics are processed together. As long as one error is reported, the overall test will fail|        | 

### 3.2 Junit5 Combined Assertion and Exception Assertion

**Composite assertion**
The assertall method can process multiple judgment logics together. As long as one error is reported, the overall test will fail:
  ```java
    @Test
    @DisplayName("assert all")
    public void all() {
    //Multiple judgments are executed together. Only when all judgments are passed can they be considered as passed
     assertAll("Math",
        () -> assertEquals(2, 1 + 1),
        () -> assertTrue(1 > 0)
     );
    }
  ```

**Exception assertion**

Assertions. The assertthrows method is used to test whether the executable instance throws an exception of the specified type when executing the execute method;    
If the execute method does not throw an exception during execution, or the exception thrown is inconsistent with the expected type, the test will fail;    
Example:  

  ```java
    @Test
    @DisplayName("Assertion of exception")
    void exceptionTesting() {
        // When the execute method is executed, if an exception is thrown and the type of the exception is the first parameter of assertthrows (here is arithmeticexception. Class)
        // The return value is an instance of an exception
        Exception exception = assertThrows(ArithmeticException.class, () -> Math.floorDiv(1,0));
        log.info("assertThrows pass,return instance：{}", exception.getMessage());
    }
  ```

### 3.3 Assertion Usage Criteria

**Object instance equality assertion**

1. Is it the same object instance

```html
Use junitd's assertions assertEquals
Assertions.assertEquals(expectedJobDetail, actualJobDetail)
```

Not the same instance, but whether the attribute values of the comparison instance are exactly equal  
AssertJ

```html
Comparison of objects before/after updating common scene databases
Asserting the usingrecursive comparison pattern using assertj's assertthat
Assertions. assertThat(actualObject). usingRecursiveComparison(). isEqualTo(expectedObject);
```

2. Assertion of set results such as list
The size of the result set needs to be asserted
Scope or specific size
Each object in the result set needs assertion, which is recommended to be used in combination with the predicate of stream mode
Example:

```java
ArrayList<JobRespProtocol> jobRespProtocolArrayList=service. batchChange(jobDetailReqBatchUpdate);
//List is matched with the predicate of stream for assertion judgment
Predicate<JobRespProtocol> statusPrecate = e -> e.getStatus()==0;
assertEquals(2, jobRespProtocolArrayList.size());
assertTrue(jobRespProtocolArrayList.stream(). anyMatch(statusPrecate));
```

## 4.Mock simulation return data

Sometimes we just test some apis or service modules, where the service or dao returns null values for some methods by default, but if the logic includes the judgment or secondary value of the returned null object, it is to throw some exceptions

Example:  

```java
    PageInfo<UDFAddVo> pageInfo =
        udfService.getManagerPages(udfName, udfTypes, userName, curPage, pageSize);
    message = Message.ok();
    // The pageInfo here is null, and subsequent get methods will have exceptions
    message.data("infoList", pageInfo.getList());
    message.data("totalPage", pageInfo.getPages());
    message.data("total", pageInfo.getTotal());
```

Example of mock simulation data:

```java
    PageInfo<UDFAddVo> pageInfo = new PageInfo<>();
    pageInfo.setList(new ArrayList<>());
    pageInfo.setPages(10);
    pageInfo.setTotal(100);
    // For udfService.getManagerPages method passes parameters arbitrarily, and the simulation returns the pageInfo object
    // With this simulation data, the above example will not have exceptions when executing the get method
    Mockito.when(
            udfService.getManagerPages(
                Mockito.anyString(),
                Mockito.anyCollection(),
                Mockito.anyString(),
                Mockito.anyInt(),
                Mockito.anyInt()))
        .thenReturn(pageInfo);
```

## 5.Compilation of Unit Test

### 5.1 Class Division

It can be roughly classified according to the major functions of the class

-The controller of the HTTP service provided by the controller cooperates with mockmvc for unit testing
-Service layer of service business logic code
-Dao and Dao layer of database operation
-Util tool function class is a common function tool
-Exception class is a custom exception class
-Enum class
-Entity class is used for DB interaction and parameter VO object and other entity classes processed by methods (if there are other user-defined functions besides normal get set, unit test is required)


### 5.2 Unit Test of Controller class
Using mockmvc

It mainly verifies the requestmethod method of interface request, basic parameters and expected return results.  
Main scenarios: scenarios with and without unnecessary parameters are abnormal  

```java
 @Test
    public void testList() throws Exception {
        //Bring unnecessary parameters
        MultiValueMap<String, String> paramsMap = new LinkedMultiValueMap<>();
        paramsMap.add("startDate", String.valueOf(System.currentTimeMillis()));
        MvcResult mvcResult = mockMvc.perform(get("/jobhistory/list")
                .params(paramsMap))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        Message res = JsonUtils.jackson().readValue(mvcResult.getResponse().getContentAsString(), Message.class);
        assertEquals(res.getStatus(), MessageStatus.SUCCESS());
        logger.info(mvcResult.getResponse().getContentAsString());

        //Without unnecessary parameters
        mvcResult = mockMvc.perform(get("/jobhistory/list"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        res = JsonUtils.jackson().readValue(mvcResult.getResponse().getContentAsString(), Message.class);
        assertEquals(res.getStatus(), MessageStatus.SUCCESS());

        logger.info(mvcResult.getResponse().getContentAsString());
    }

```

### 5.3 Unit Test of Server class
   //todo

### 5.4 Unit Test of Dao class

Use H2 database, application. In the configuration file In properties, you need to configure the basic information of H2 database and the relevant path information of mybatis  

```properties
#h2 database configuration
spring.datasource.driver-class-name=org.h2.Driver
# Script to connect database
spring.datasource.url=jdbc:h2:mem:test;MODE=MySQL;DB_CLOSE_DELAY=-1;DATABASE_TO_LOWER=true
#Script to initialize database tables
spring.datasource.schema=classpath:create.sql
#Script to initialize data for database tables
spring.datasource.data=classpath:data.sql
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.hikari.connection-test-query=select 1
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.auto-commit=true
spring.datasource.hikari.validation-timeout=3000
spring.datasource.hikari.pool-name=linkis-test
spring.datasource.hikari.maximum-pool-size=50
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.leak-detection-threshold=0
spring.datasource.hikari.initialization-fail-timeout=1

#配置mybatis-plus的mapper信息 因为使用的是mybatis-plus，使用mybatis-plus
mybatis-plus.mapper-locations=classpath:org/apache/linkis/jobhistory/dao/impl/JobDetailMapper.xml,classpath:org/apache/linkis/jobhistory/dao/impl/JobHistoryMapper.xml
mybatis-plus.type-aliases-package=org.apache.linkis.jobhistory.entity
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

List is configured with predicate of stream to make assertion judgment and write specification

1. Use @Transactional and @Rollback to realize data rollback and avoid data pollution
2. Each DaoTest should have a public method for creating and initializing data (or the way of importing data CSV) to prepare data. For related queries, updates, deletions and other operations, the public method should be called first to prepare data
3. Create test data. If an attribute value is a self increasing ID, it should not be assigned
4. The test data created shall be consistent with the actual sample data as far as possible
5. When updating the data test, if the field allows, please prefix it with 'modify original value'
