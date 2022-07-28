---
title: ResultSet File Storage
sidebar_position: 3
---
>Result set file storage scheme-Dolphin file

## 1 Background

Linkis faces the need to store multiple types of data in files, such as storing Hive table data in files, and hopes to save metadata information such as field types, column names, and comments.

Existing file storage solutions generally only support specific data types for storage. For example, ORC supports data tables but does not support the storage of unstructured data.

At the same time, support for saving special characters is also the reason that prompted us to define a new file format. For example, if there are special characters such as line breaks in a field in textFile, the content will be abnormal when it is parsed and read.

Finally, if the content of the file is too large, Linkis usually hopes to provide a paging function. Existing file storage schemes only support how many bytes are skipped, but do not support how many lines are skipped, or only read a certain line in the file.

## 2 Ideas

Linkis defines a file storage format Dolphin file that stores multiple data types.

![Dolphin file format](../../images/ch4/storage/dolphin_file.png)

The file structure of Dolphin is shown in the figure above:

- The Dolphin logo is stored at the beginning of the file to distinguish whether the file is a Dolphin file

- Metadata: content metadata information

- index Data: row length index

- RowData: Row data.

 RowData stores a row of data, such as the data of a row of the table, including the length of the row data and the Byte information of the row data.

- PostData: Basic file information

- PostDataLen: Basic information length

Among them, PostData is the basic information of the file mainly composed of:

- type: the type of storage content

- Codec: encoding format

- Statistical information: The statistical information of the file content includes the number of lines, the maximum and minimum values, etc.

## 3 Implementation

The specific process of reading and writing Dolphin files is as follows:

![Dolphin file read and write flow chart](../../images/ch4/storage/dolphin_progress.png)

### 3.1 Write data to Dolphin

When the user needs to store the contents of a file (for example: table) in a Dolphin file, the steps are as follows:

1. Write Dolphin file ID

2. Write data type Type

3. Through the serializer (Serializer), write Metadata (metadata) such as the column name of the table, the type of each column, column comments, etc.;

4. Pass in a row of data to DolphinWriter, DolphinWriter serializes the row of data through a serializer (Serializer) to obtain the row length and serialized Bytes to write to the Dolphin file;

5. After writing the row of data, it will update the statistical information (Statistical information), increase the number of row records, update the maximum and minimum values ​​of each column, etc.;

6. DolphinWriter writes PostData (basic information) composed of statistical information and encoding information to the Dolphin file;

7. Write the length of PostData to complete the write operation.


### 3.2 Read Dolphin file

The steps for users to read the contents of the Dolphin file are as follows:

1. Read the Dolphin file ID, and throw an exception if it is not a Dolphin file;

2. If the user only needs to read Statistical information, read the length of PostData, and obtain PostData according to the length.

 Through PostData, the basic information is parsed into corresponding Type, Codec, MetaData, and Statistical information.
 
 Return to complete this reading operation.

3. If the user wants to read data, first read the data type Type.

4. Read the Metadata information, get the Deserializer through Type, and encapsulate the read Bytes data into MetaData

5. Read the row length index, and read the row Bytes through the row length index. Obtain Deserializer through Type, convert Bytes into Record data, and encapsulate RowData with Record and MetaData;

6. The read RowData row content is given to the user to complete the entire reading.

### 3.3 Skip

**Question**: How to read a row? How many lines to start reading?

**Answer**: When writing a row, the row length index will be written first, so that the user can read the index and skip row reading through the row length index when reading;

### 3.4 Serialization

The serializer (Serializer) serializes the data into a byte array, and the deserializer (Deserializer) parses the byte array into string data to achieve correct reading and writing of special characters;

Serializer and Deserializer are related to Type. Different data types can define different Serializer and Deserializer.

Dolphin provides a common interface for user-defined implementations to support other types of files.