---
title: UDF Function
sidebar_position: 5
---

## 1 Introduction to UDF
UDF: User Defined Function, user-defined function. In some scenarios, we need to use hive functions to process some data. Functions like count() and sum() are built-in. If we want to use some functions that are not built-in, we need to customize the function, which can be done by writing UDF.


## 1.Overview of the overall steps for creating UDF
### 1 Universal type UDF functions
Overall step description
- Write UDF functions in UDF format locally and package them as jar package files
- 【Scriptis >> Workspace】Upload to the corresponding directory in the workspace
- 【Management Console>>UDF Function】 Create udf (default loading)
- Used in task code (only effective for newly started engines)

**Step1 Writing jar packages locally**

Hive UDF Example：
1. add hive dependency
```xml
<dependency>
    <groupId>org.apache.hive</groupId>
    <artifactId>hive-exec</artifactId>
    <version>3.1.3</version>
</dependency>
```
2. create UDF class
```java
import org.apache.hadoop.hive.ql.exec.UDF;

public class UDFExample extends UDF {
    public Integer evaluate(Integer value) {
        return value == null ? null : value + 1;
    }
}
```

3. package
```shell
mvn package
```

**Step2【Scriptis >> Workspace】Upload jar package**
Select the corresponding folder and right-click to select Upload

![](/Images/udf/udf_14.png)

**Step3【Management Console>>UDF Function】 Create UDF**
- Function name: Conforming to the rules is sufficient, such as test_ Udf_ Using jar in scripts such as SQL
- Function Type: General
- Script path: Select the shared directory path where the jar package is stored, such as../..// Wds_ Functions_ 1_ 0_ 0. jar
- Registration format: package name+class name, such as com.webank.wedatasphere.willink.bdp.udf.ToUpperCase
- Usage format: Input type and return type must be consistent with the definition in the jar package
- Classification: drop-down selection; Alternatively, enter a custom directory (which will create a new target level directory under the personal function)

![](/Images/udf/udf_15.png)

Note that the newly created UDF function is loaded by default and can be viewed on the [Scriptis>>UDF Functions] page for easy viewing during Scriptis task editing. Checking the UDF function indicates that it will be loaded and used

![](/Images/udf/udf_16.png)

**Step4  Use this udf function**

Innovative udf function using the above steps in the task
Function name is [Create UDF] Function name
In pyspark:
print (sqlContext.sql("select test_udf_jar(name1) from stacyyan_ind.result_sort_1_20200226").collect())

### 2 UDF functions of Spark type
Overall step description
- Create a new Spark script file in the desired directory in the [Scriptis>>workspace]
- Create UDF in [Management Console>>UDF Functions] (default loading)
- Used in task code (only effective for newly started engines)

**Step1 dss-scriptis-Create a new scala script**

![](/Images/udf/udf_17.png)

def helloWorld(str: String): String = "hello, " + str

**Step2 Create UDF**
- Function name: Conforming to the rules is sufficient, such as test_ Udf_ Scala
- Function type: spark
- Script Path:../..// B
- Registration format: The input type and return type must be consistent with the definition; The function names that need to be defined in the registration format must be strictly consistent, such as helloWorld
- Classification: Drop down and select the first level directory that exists under dss scriptis UDF function - Personal function; Alternatively, enter a custom directory (which will create a new target level directory under the personal function)

![](/Images/udf/udf_18.png)

**Step3 Use this udf function**

Use the above steps in the task to create a new udf function
Function name is [Create UDF] Function name
- In scala
  val s=sqlContext.sql("select test_udf_scala(name1)
  from stacyyan_ind.result_sort_1_20200226")
  show(s)
- in pyspark
  print(sqlContext.sql("select test_udf_scala(name1)
  from stacyyan_ind.result_sort_1_20200226").collect());
- in sql
  select test_udf_scala(name1) from stacyyan_ind.result_sort_1_20200226;

### 3 Python functions
Overall step description
- Create a new Python script file in the desired directory in the [Scriptis>>workspace]
- Create UDF in [Management Console>>UDF Functions] (default loading)
- Used in task code (only effective for newly started engines)

**Step1 dss-scriptis-Create a new pyspark script**

![](/Images/udf/udf_19.png)

def addation(a, b):
return a + b
Step2 Create UDF
- Function name: Conforming to the rules is sufficient, such as test_ Udf_ Py
- Function type: spark
- Script Path:../..// A
- Registration format: The function names that need to be defined must be strictly consistent, such as addition
- Usage format: The input type and return type must be consistent with the definition
- Classification: Drop down and select the first level directory that exists under dss scriptis UDF function - Personal function; Alternatively, enter a custom directory (which will create a new target level directory under the personal function)

![](/Images/udf/udf_20.png)

**Step3 uses this udf function**
Use the above steps in the task to create a new udf function
Function name is [Create UDF] Function name
- in pyspark
  print(sqlContext.sql("select test_udf_py(pv,impression) from neiljianliu_ind.alias where entityid=504059 limit 50").collect());
- in sql
  select test_udf_py(pv,impression) from neiljianliu_ind.alias where entityid=504059 limit 50

### 4 scala functions
Overall step description
- Create a new Spark Scala script file in the desired directory in the [Scriptis>>workspace]
- Create UDF in [Management Console>>UDF Functions] (default loading)
- Used in task code (only effective for newly started engines)
-
**Step1 dss-scriptis-Create a new scala script**
def hellozdy(str:String):String = "hellozdy,haha " + str
**Step2 CREATE FUNCTION**
- Function name: Must be strictly consistent with the defined function name, such as hellozdy
- Function Type: Custom Function
- Script Path:../..// D
- Usage format: The input type and return type must be consistent with the definition
- Classification: Drop down and select the first level directory that exists under dss scriptis method function personal function; Alternatively, enter a custom directory (which will create a new target level directory under the personal function)
  Step3 Use this function
  Use the above steps in the task to create a new udf function
  Function name is [Create UDF] Function name
  val a = hellozdy("abcd");
  print(a)

### 5 Common usage issues
#### 5.1 UDF function loading failed
"FAILED: SemanticException [Error 10011]: Invalid function xxxx"

  ![](/Images/udf/udf_10.png)

- Firstly, check if the UDF function configuration is correct:

  ![](/Images/udf/udf_11.png)

- The registration format is the function path name:

  ![](/Images/udf/udf_12.png)

- Check the scriptis udf function to see if the loaded function is checked. When the function is not checked, udf will not be loaded when the engine starts

  ![](/Images/udf/udf_13.png)

- Check if the engine has loaded UDF. If not, please restart another engine or restart the current engine
  Note: UDF will only be loaded when the engine is initialized. If UDF is added midway, the current engine will not be able to perceive and load it