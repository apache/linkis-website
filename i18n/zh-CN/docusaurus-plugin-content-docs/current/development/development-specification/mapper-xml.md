---
title: Mapper XML 规范
sidebar_position: 10
---

> Contributor为Apache Linkis贡献新的数据表，编写Mapper XML时需遵循如下规范进行开发。

## 1.基本遵循规范
- 在mapper.xml中namespace等于java接口地址  
- java接口中的方法名和XML中statement的id一致  
- java接口中的方法输入参数类型和XML中statement的parameterType指定的类型一致
- java接口中的方法返回值类型和XML中statement的resultType指定的类型一致
- XML中所有mysql关键字统一使用小写
- 对于过多的查询字段抽象出SQL片段
- 对于整型返回值类型建议使用Integer，可以区分未赋值和值为0的情况，如确定返回值为数字可使用int。其它数据类型类似。
- 对于占位符，使用#{name}，而不要使用${name}。模糊查询可以使用CONCAT('%',#{sname},'%')
- 对于sql语句编写，不使用注解方式，统一写在XML文件中

## 2.方法名称规范

|方法名称|	说明|	核心点|    建议|
|:----  |:---   |:---   |:---   |
|insert	| 新增数据 | 如果是自增主键，应该返回主键ID| |	 
|deleteById	| 根据主键ID删除数据|	sql默认加limit 1，防止多删数据	|此方法不建议有，建议逻辑删除|
|updateById	| 根据主键ID修改数据|	sql默认加limit 1，防止多修改数据| |	 
|selectById	| 根据主键查询数据|	查询一条数据	 | |
|selectByIdForUpdate	| 根据主键加锁查询数据|	加锁查询一条数据，事务处理用	| | 
|queryListByParam	| 根据输入条件查询数据列表|	多参数查询列表	 | |
|queryCountByParam	| 根据输入条件查询总数|	多参数查询数量	 | |

## 3.parameterType规范
java接口中必须包含@Param，XML中可以不包含parameterType
### 3.1 基本类型
```java
// java接口
User selectUserById(@Param("id") Integer id);
// XML文件
<select id="selectUserById" resultType="userMap">
    select id, name 
	from user
	where id = #{id}
</select>
```
### 3.2 集合类型
```java
// java接口
List<User> userListByIds(@Param("ids") List<Integer> ids);
// XML文件
<select id="userListByIds" resultMap="userMap">
	select id, name
	from user
	where id in
		<foreach collection="ids" separator="," open="(" close=")" item="item">
			#{item}
		</foreach>
</select>
```
### 3.3 Map类型
```java
// java接口
User queryByParams(@Param("map") Map<String, Object> parasms);
// XML文件
<select id="queryByParams" resultMap="userMap">
	select id, name
	from user
	where id = #{map.id} and name = #{map.name}
</select>
```
### 3.4 实体类型
```java
// java接口
User queryByUser(@Param("user") User user);
// XML文件
<select id="queryByUser" resultMap="userMap">
	select id, name
	from user
	where id = #{user.id} and name = #{user.name}
</select>
```
### 3.5 多个参数类型
```java
// java接口
User queryByIdAndName(@Param("id") Integer id, @Param("name") String name);
// XML文件
<select id="queryByIdAndName" resultMap="userMap">
	select id, name
	from user
	where id = #{id} and name = #{name}
</select>
```
## 4.XML文件编写示例
合理地使用空格和缩进来增强可读性，各类型sql语句示例如下
```sql
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.apache.linkins.dao.mapper.UserMapper">
	-- 新增语句
	<insert id="insert">
		insert into user (id, name)
		values (1, 'z3');
	</insert>

	-- 删除语句
	<delete id = "deleteUserByIdAndName">
		delete from user
		where name = #{name}
			and id = #{id}
	</delete>

	-- 修改语句
	<update id="updateUserById">
		update user
		set name = #{name}
		where id = #{id}
	</update>

	-- 查询语句
	<select id="selectUserByName" resultMap="userMap">
		select id, name
		from user
		where name = 'z3'
	</select>

	-- sql片段
	<sql id="user">
		id,
		name
	</sql>
	-- 引用
	<include refid="user"/> 

	-- resultMap
	<resultMap type="Assets" id="userMap">  
		<id property="id" column="id" />  
		<result property="name" column="name" />
	</resultMap>
	-- 引用
	<select id="queryListByParam" parameterType="map" resultMap="userMap">
		do...
	</select>

	-- 条件判断
	<if test="name != null and name != ''">  
		name = #{name}  
	</if>

	-- 子查询
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
```
