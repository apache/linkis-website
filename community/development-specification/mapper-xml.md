---
title: Mapper XML Specification
sidebar_position: 10
---

> Contributor contributes new data tables to Apache Linkis. When writing Mapper XML, the following specifications must be followed for development.

## 1.Basically follow the specifications
- In mapper.xml namespace is equal to java interface address  
- The method name in the java interface is the same as the id of the statement in XML  
- The input parameter type of the method in the java interface is the same as the type specified by the parameterType of the statement in XML
- The return value type of the method in the java interface is the same as the type specified by the resultType of the statement in XML
- All mysql keywords in XML use lowercase uniformly
- Abstract SQL fragments for excessive query fields
- It is recommended to use Integer for the integer return value type, which can distinguish between unassigned and 0 cases. For example, if the return value is determined to be a number, int can be used. Other data types are similar.
- For placeholders, use #{name} instead of ${name}. Fuzzy query can use CONCAT('%',#{sname},'%')
- For sql statement writing, no annotation method is used, and it is uniformly written in the XML file

## 2.Method name specification

|Method Name|Description|Core Points|Recommendations|
|:---- |:--- |:--- |:--- |
|insert | New data | If it is an auto-incrementing primary key, it should return the primary key ID| |	 
|deleteById | Delete data according to the primary key ID | sql adds limit 1 by default to prevent multiple deletion of data | This method is not recommended, it is recommended to logically delete |
|updateById | Modify data according to the primary key ID | sql adds limit 1 by default to prevent multiple data modification | |	 
|selectById | Query data by primary key | Query a piece of data | |
|selectByIdForUpdate | Query data according to the primary key lock | Query a piece of data by locking, for transaction processing | |
|queryListByParam | Query data list according to input conditions | Multi-parameter query list | |
|queryCountByParam | The total number of queries based on input conditions | The number of multi-parameter queries | |

## 3.parameterType specification
The java interface must contain @Param, and the XML can not contain parameterType
### 3.1 basic type
````java
// java interface
User selectUserById(@Param("id") Integer id);
// XML file
<select id="selectUserById" resultType="userMap">
    select id, name
	from user
	where id = #{id}
</select>
````
### 3.2 Collection type
````java
// java interface
List<User> userListByIds(@Param("ids") List<Integer> ids);
// XML file
<select id="userListByIds" resultMap="userMap">
	select id, name
	from user
	where id in
		<foreach collection="ids" separator="," open="(" close=")" item="item">
			#{item}
		</foreach>
</select>
````
### 3.3 Map type
````java
// java interface
User queryByParams(@Param("map") Map<String, Object> parasms);
// XML file
<select id="queryByParams" resultMap="userMap">
	select id, name
	from user
	where id = #{map.id} and name = #{map.name}
</select>
````
### 3.4 Entity Type
````java
// java interface
User queryByUser(@Param("user") User user);
// XML file
<select id="queryByUser" resultMap="userMap">
	select id, name
	from user
	where id = #{user.id} and name = #{user.name}
</select>
````
### 3.5 Multiple parameter types
````java
// java interface
User queryByIdAndName(@Param("id") Integer id, @Param("name") String name);
// XML file
<select id="queryByIdAndName" resultMap="userMap">
	select id, name
	from user
	where id = #{id} and name = #{name}
</select>
````
## 4.XML file writing example
Use spaces and indentation reasonably to enhance readability. Examples of various types of SQL statements are as follows
```sql
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.apache.linkins.dao.mapper.UserMapper">
	-- add a statement
	<insert id="insert">
		insert into user (id, name)
		values ​​(1, 'z3');
	</insert>

	-- delete statement
	<delete id = "deleteUserByIdAndName">
		delete from user
		where name = #{name}
			and id = #{id}
	</delete>

	-- modify the statement
	<update id="updateUserById">
		update user
		set name = #{name}
		where id = #{id}
	</update>

	-- Check for phrases
	<select id="selectUserByName" resultMap="userMap">
		select id, name
		from user
		where name = 'z3'
	</select>

	-- sql fragment
	<sql id="user">
		id,
		name
	</sql>
	-- Quote
	<include refid="user"/>

	-- resultMap
	<resultMap type="Assets" id="userMap">  
		<id property="id" column="id" />  
		<result property="name" column="name" />
	</resultMap>
	-- Quote
	<select id="queryListByParam" parameterType="map" resultMap="userMap">
		do...
	</select>

	-- conditional judgment
	<if test="name != null and name != ''">  
		name = #{name}  
	</if>

	-- sub query
	<select id="selectUserByTeacherIdAndName" resultMap="userMap">
		select u.id, u.name
		from user u
		where u.name in (
			select t.name
			from teacher t
			where t.id = 1
				and t.name = 'z3'
			)
			and u.id = 2
	</select>
</mapper>
````