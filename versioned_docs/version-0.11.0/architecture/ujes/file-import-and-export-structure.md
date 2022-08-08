---
title: Spark Engine File Import Export
sidebar_position: 2
---

## 1 Background

Data analysts or data warehouses are often required to export data from databases to Excel files for data analysis, or to export data to Excel for users or co-operators.

Furthermore, users often need to undertake joint analyses of data files such as CSV, Excel and online Hive databases, which need to be imported into the Hive database.

For more confidential industries, such as banks, data exports often require sensitive export fields such as identity cards, mobile phone numbers.

## 2 Thinking

Using Spark's distributed computing capability and supporting DataSource, which connects multiple data sources.

## 3 Implementation

### 3.1 Export

The export process is shown below in graph：

![Export process](../../images/ch4/ujes/export_process.png)

1.  The user selects the corresponding data source and the corresponding data form to be exported, such as the user order form in the：Mysql library;

2.  User defines the query statement of data to be exported from the data table, as well as the data transformation to the specified column.

  For example,：defines the export of order forms for the last six months and dissociates user information;

3.  User selects file formats and output paths to export, e.g.：export user order form to excel, path to /home/username/orders.xlsx

4.  Spark read corresponding data based on user configured data sources and tables and querying statements. DataSource supports multiple data storage components such as：Hive,Mysql, Oracle,HDF,Hbase,Mongodb

5.  The data is then processed to DataFrame according to the data conversion format configured by the user

6.  Gets the file write object according to the file format type of the user configuration, e.g.：supports the file writing object for Spark's Excel.Writer's support for multiple file formats such as Excel, exce, Json

7.  Write the corresponding data via writer to the corresponding destination, e.g.：/home/username/orders.xlsx.

### 3.2 Import

Import process below：

![Import process](../../images/ch4/ujes/import_process.png)

1.  The user selects the exported file. File readers will read from incoming files: e.g.：/home/username/orders.xlsx;

2.  Readers read the contents of the previous N line for data type extrapolations, such as reading 10 lines.Reader supports reading in multiple file formats.

3.  Data type extrapolators use the first 10 lines of incoming data type to determine the type of data in each column. The method is to determine the data type in each row by determining the type of data and ultimately by determining the number of times the type appears, and to return to the user.

  e.g.：user：String,orderId：Int;

4.  User selected data sources to import, e.g.：Mysql.Import data also supports multiple selections;

5.  The user chooses whether to create a new tree or rewrite the data or add the data.Select user order form and select data appending;

6.  User-defined data import transformation format and imported column information, such as：decrypting user information

7.  The scheme uses Spark and transforms the file to DataFrame via user incoming data to events and column information;

8.  Generate the corresponding Datasupply via the data source selected by the user

9.  Import processed DataFrame via Datasource to the corresponding data source, e.g.：Mysql library.
