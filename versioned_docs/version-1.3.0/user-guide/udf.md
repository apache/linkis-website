---
title: UDF Manual
sidebar_position: 2.2
---

## 1 Introduction to UDFs
UDF: User Defined Function, user-defined function. In some scenarios, we need to use hive functions to process some data, such as count(), sum() functions are built-in. If we want to use some functions that do not come with them, we need to customize the function functions, which can be done by writing UDF.

The way to implement a UDF is relatively simple: just inherit the UDF class and override the evaluate method.


public class HelloUDF extends UDF{

        public String evaluate(String str){
                try {
                        return "Hello " + str;
                } catch (Exception e) {
                        // TODO: handle exception
                        e.printStackTrace();
                        return "ERROR";
                }
        }

Several types of UDF

**UDF function**
>Requires registration to use

- Universal type of UDF function: refers to the UDF function that can be used by both Hive's hql and Spark's sql, generally compiled into a jar package
- Spark-type UDF function: Spark-specific UDF, you need to create the corresponding scala/python script first, and register it through scala or python function. After registration, it can also be used in sql

**Custom Function**
PythonUDF and ScalaUDF can only be used in Spark engine

- python custom function, based on functions written in python
- scala custom functions, functions written based on scala


## 2 UDF additions, deletions and modifications
Click on the linkis management console: Home >> UDF Management
![](/Images/udf/udf_01.png)


There are two columns "UDF management" and "function management" in the entry, among which the function management column is a general method function, such as python and scala functions, which can be used like ordinary functions in the script without registration, UDF needs It can only be used after registration.
![](/Images/udf/udf_02.png)


### 2.1 UDF added
Added generic UDF functions:

You need to compile the corresponding Jar package and upload it to the corresponding user's workspace (if you use the dss family bucket, you can upload it through scriptis, if you use linkis alone, you need to manually upload it to the corresponding directory)

![](/Images/udf/udf_09.png)

Click the Add UDF button, there are two types of UDFs that can be added, select the "general" type and register through the jar package. The registration format needs to write the fully qualified class name of the UDF implementation class.

![](/Images/udf/udf_03.png)

Added Spark-type UDF functions:

If you select the "spark" type, select the defined scala or python function to register, and you can also use it in sql after registration, similar to: select hello("abc").

It should be noted that after adding udf, the corresponding jar package or script content will be uploaded to bml storage. If the locally modified resource needs to be updated to take effect.

![](/Images/udf/udf_04.png)

### 2.2 UDF modification

Click the edit button corresponding to the udf.

![](/Images/udf/udf_05.png)


If you need to update the content of the udf, you need to edit the udf and upload it again, and generate a new version of the udf. If the content of the script has not changed, but only modified other content such as: using the format, only the information will be updated, and a new version will not be generated.

![](/Images/udf/udf_06.png)

### 2.3 UDF deletion

Click the delete button of the corresponding udf, note: all versions of the udf will be deleted.

![](/Images/udf/udf_07.png)

## 3 UDF usage
If you want to make the UDF you created valid for use in the program, you need to load the UDF. The entrance of "load"/"unload" is: enter the UDF function on the left side of scriptis -> personal function, the created UDF is in the personal function list.

Note 1: When adding a UDF, if it is not automatically unchecked on the page, it will be loaded by default.

Note 2: For the operation of loading/unloading udf, you need to kill the corresponding engine to start a new engine, and the operation will take effect

Introduction to the non-personal functions in the list:

BDAP function: functions created by bdap for users, such as desensitization functions. Note: The bdap function needs to be actively loaded before it can be used.

System function: The default built-in function of the system can be used in the code without the user's own loading.

Shared function: a function shared with you by others, you need to load it to use

Expiration function: It is also a shared function, but the sharer marks it as expired, which does not affect the use for the time being



## 4 UDF sharing
Prerequisite: The sharing function needs to be used by the user as an administrator, otherwise the front-end page will not provide an operation entry.

Click the share button of udf: the content box will pop up, enter the list of users you want to share (comma separated).

Note: After sharing to others, others need to actively load the UDF before using it.



After sharing, the shared user can find it in "Shared Function", check the load and use it.

## 5 Introduction of other functions
### 5.1 UDF handover

For example, when the user leaves the company, it may be necessary to hand over personal udf to others. Click the Handover button, select your handover object, and click OK.



### 5.2 UDF Expiration

For a UDF shared to others, if it has been loaded by the sharing user, the udf cannot be deleted directly, but the udf can only be marked as expired. For the time being, it is only used for marking and does not affect use.

### 5.3 UDF version list

Click the "version list" button of a udf to view all versions of the udf. The following features are provided for each version:

Create a new version: Copy the corresponding version to the latest version.

Download: Download the udf file from bml to the local.

View the source code: For the python/scala script type, you can directly view the source code, but the jar type is not supported.

Publish: The shared udf can click to publish a certain version, so that the version will take effect for the shared user. Note: Shared users use the latest version of udf released, and individual users always use the latest version.