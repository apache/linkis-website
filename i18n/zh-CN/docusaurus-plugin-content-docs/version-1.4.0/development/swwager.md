---
title: Swagger 注解使用
sidebar_position: 10.0
---

## 1. Swagger注解的作用域
|  API| 作用范围 | 使用位置 | 
| -------- | -------- | ----- |
|@Api|协议集描述|用于controller类上|
|@ApiOperation|协议描述|用在controller的方法上|
|@ApiImplicitParams|非对象参数集|用在controller的方法上|
|@ApiImplicitParam|非对象参数描述|用在@ApiImplicitParams的方法里边|
|@ApiResponses|Response集|用在controller的方法上|
|@ApiResponse|Response|用在 @ApiResponses里边|
|@ApiModel|描述返回对象的意义|	用在返回对象类上|
|@ApiModelProperty|对象属性|用在出入参数对象的字段上|
|@ApiParam|协议描述|用在方法、参数、类的字段上|

## 2. @Api
使用位置即用在类上，对请求类进行描述。标识一个Controller类是Swagger文档类。

### 2.1 注解的属性

| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|描述，无实际意义。| 
|tags|String[]|""|分组|
|basePath|String|""|基本路径|
|protocols|String|int|请求协议|
|authorizations|Authorization[]|@Authorization(value = "")|高级特性认证时的配置|
|hidden|boolean|false|是否隐藏（不显示,默认为false）|


### 2.2 属性value、tags二者的区别

value属性作用在类和作用在方法上都用于描述；

tags属性作用在类和作用在方法上都用于分组，但分组的效果区别很大：

tags作用在类上时，会对全局的方法分组，即根据tags属性值复制多份，此时方法上的tags值无效，方法上tags配或不配效果都一样。

tags作用在方法上时，会根据当前类的所有方法的tags值做分组，粒度更细。

### 2.3 使用方法
<font color="red">注意：java和scala在@Api注解上使用的区别 </font>

```java
*java
@Api(tags = "Swagger测试相关接口")
@RestController

*scala
@Api(tags = Array("Swagger测试相关接口"))
@RestController
```



## 3. @ApiOperation
用在方法上，对请求方法进行描述。
### 3.1 注解的属性

| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|描述|
|notes|String|""|	详细描述|
|tags|String[]|""|分组|
|response|Class<?>|Void.class|响应参数类型|
|responseReference|String[]|""|指定对响应类型的引用，本地/远程引用，并将覆盖任何其它指定的response()类|
|httpMethod|String|""|http请求方式，如：GET、HEAD、POST、PUT、DELETE、OPTION、SPATCH|
|hidden|boolean|false|是否隐藏（不显示）默认为false|
|code|int|200|http的状态码|
|extensions|Extension[]|@Extension(properties = @ExtensionProperty(name = "", value = "")|扩展属性|

### 3.2 使用方法

```java
@GetMapping("test1")
@ApiOperation(value = "test1接口",notes = "test1接口详细描述")
public ApiResult<String> test1(@RequestParam String aa, @RequestParam String bb, @RequestParam String cc) {
        return ApiUtil.success("success");
}
```

## 4. @ApiImplicitParams

常用在方法上，对请求参数列表进行描述。
其中的value属性可包含多个@ApiImplicitParam，对每个参加进行具体的描述。

### 4.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|描述|

## 5. @ApiImplicitParams

用在方法上，对请求参数进行描述。当需要对多个参数进行描述时，作为@ApiImplicitParams的属性使用。

### 5.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|描述|
|name|String|""|参数说明|
|defaultValue|String|""|默认值|
|allowableValues|String|""|参数允许值|
|required|boolean|false|是否必填,默认false|
|access|String|""|参数过滤|
|allowMultiple|boolean|false|参数是否可以通过多次出现来接受多个值，默认不允许|
|dataType|String|""|参数的数据类型，可以使类名或原始数据类型|
|dataTypeClass|Class<?>|Void.class|参数的数据类型，如果提供则覆盖 dataType|
|paramType|String|""|参数类型，有效值为 path, query, body, header, form|
|example|String|""|非body类型的参数示例|
|examples|Example|@Example(value = @ExampleProperty(mediaType = “”, value = “”))|body类型的参数示例|
|type|String|""|添加覆盖检测到的类型的功能|
|format|String|""|添加提供自定义format格式的功能|
|readOnly|boolean|false|添加被指定为只读的功能|

### 5.2 使用方法

```java
@GetMapping("test1")
@ApiOperation(value = "test1接口",notes = "test1接口详细描述")
@ApiImplicitParams(value = {
        @ApiImplicitParam(name = "aa",value = "aa的说明",defaultValue = "1",allowableValues = "1,2,3",required = true),
        @ApiImplicitParam(name = "bb",value = "bb的说明",defaultValue = "1",allowableValues = "1,2,3",required = true),
        @ApiImplicitParam(name = "cc",value = "cc的说明",defaultValue = "2",allowableValues = "1,2,3",required = true),

})
```

## 6. @ApiParam

用在方法、参数、类的字段上，对请求参数进行描述。

### 6.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|描述|
|name|String|""|参数说明|
|defaultValue|String|""|默认值|
|allowableValues|String|""|参数允许值|
|required|boolean|false|是否必填,默认false|
|access|String|""|参数过滤|
|allowMultiple|boolean|false|参数是否可以通过多次出现来接受多个值，默认不允许|
|dataType|String|""|参数的数据类型，可以使类名或原始数据类型|
|dataTypeClass|Class<?>|Void.class|参数的数据类型，如果提供则覆盖 dataType|
|paramType|String|""|参数类型，有效值为 path, query, body, header, form|
|example|String|""|非body类型的参数示例|
|examples|Example|@Example(value = @ExampleProperty(mediaType = “”, value = “”))|body类型的参数示例|
|type|String|""|添加覆盖检测到的类型的功能|
|format|String|""|添加提供自定义format格式的功能|
|readOnly|boolean|false|添加被指定为只读的功能|

### 6.2 使用方法

```java
@GetMapping("test2")
@ApiOperation(value = "test2接口",notes = "test2接口详细描述")
public ApiResult<TestRes> test2(@ApiParam(value = "aa的说明") @RequestParam String aa, @ApiParam(value = "bb的说明") @RequestParam String bb) {
        return ApiUtil.success(new TestRes());
}
```
## 7. @ApiModel

用在类上，对请求、响应类,实体类进行描述。

### 7.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|	为提供模型的替代名称，默认情况下，使用类名|
|description|String|""|类的描述|
|parent|Class<?> parent|Void.class|为模型提供父类以允许描述继承关系|
|discriminatory|String|""|支持模型继承和多态，使用鉴别器的字段的名称，可以断言需要使用哪个子类型|
|subTypes|boolean|false|是否必填,默认false|
|access|Class<?> parent|Void.class|	从此模型继承的子类型数组|
|reference|boolean|false|指定对应类型定义的引用，覆盖指定的任何其他元数据|

## 8 @ApiModelProperty

用在类上，对请求、响应类,实体类进行描述。

### 8.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|String|""|属性说明|
|name|String|""|覆盖属性的名称|
|allowableValues|String|""|参数允许值|
|access|String|""|过滤属性|
|required|boolean|false|是否必填,默认false|
|dataType|String|""|参数的数据类型，可以使类名或原始数据类型|
|hidden|boolean|false|	是否隐藏|
|readOnly|String|""|添加被指定为只读的功能|
|reference|String|""|指定对应类型定义的引用，覆盖指定的任何其他元数据|
|allowEmptyValue|boolean|false|允许传空值|
|example|String|""|属性的示例值|

### 8.2 使用方法

<font color="red">注意：java和scala在@ApiModelProperty注解上的使用的区别 </font>

```java
*java实体类
@Data
@ApiModel(description = "测试请求类")
public class TestReq {

    @ApiModelProperty(value = "用户ID",required = true)
    private Long userId;
    @ApiModelProperty(value = "用户名",example = "张三")
}

*scala实体类
@Data
@ApiModel(description = "测试响应类")
public class TestRes {
    @(ApiModelProperty @field)("用户ID")
    private Long userId;
    @(ApiModelProperty @field)("用户名")
}
```


## 9. @ApiResponses

用在方法、类上，对响应状态码列表进行描述。

### 9.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|value|ApiResponse[]|""|响应状态码列表的描述|

## 10. @ApiResponse

用在方法上，对响应状态码进行描述。一般作为@ApiResponses的属性使用。

### 10.1 注解的属性
| 属性名称 | 属性类型 | 属性默认值 | 属性描述 |
| -------- | -------- | ----- |----- | 
|code|int|""|响应的HTTP状态码|
|message|String|""|响应的描述|
|response|Class<?>|Void.class|用于描述消息有效负载的可选响应类，对应于响应消息对象的 schema 字段|
|reference|String|""|指定对响应类型的引用，指定的应用可以使本地引用，也可以是远程引用，将按原样使用，并将覆盖任何指定的response()类|
|responseHeaders|ResponseHeader[]|@ResponseHeader(name = "", response = Void.class)|可能响应的header列表|
|responseContainer|String|""|声明响应的容器，有效值为List,Set,Map，任何其他值都将被忽略|


### 10.2 使用方法

```java
@GetMapping("test2")
@ApiOperation(value = "test2接口",notes = "test2接口详细描述")
@ApiResponses(value = {
        @ApiResponse(code = 200, message = "请求成功", responseHeaders = {@ResponseHeader(name = "header1", description = "header1的描述",response = String.class)}),
        @ApiResponse(code = 401, message = "没有权限"),
        @ApiResponse(code = 403, message = "禁止访问")
})
public ApiResult<TestRes> test2(@ApiParam(value = "aa的说明") @RequestParam String aa, @ApiParam(value = "bb的说明") @RequestParam String bb) {
        return ApiUtil.success(new TestRes());
}

```