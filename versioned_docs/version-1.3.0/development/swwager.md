---
title: Swagger Annotation
sidebar_position: 5
---

## 1. Scope of swagger annotations
| API| Scope | Where to use |
| -------- | -------- | ----- |
|@Api|Protocol set description|Used on the controller class|
|@ApiOperation|Protocol description|Used in controller methods|
|@ApiImplicitParams|Non-object parameter set|Used in controller methods|
|@ApiImplicitParam|Non-object parameter description|Used in methods of @ApiImplicitParams|
|@ApiResponses|Response set|Used in the controller's method|
|@ApiResponse|Response|Used in @ApiResponses|
|@ApiModel|Describe the meaning of the returned object|Used in the returned object class|
|@ApiModelProperty|Object property|Used on the fields of the parameter object|
|@ApiParam|Protocol description|Used on methods, parameters, fields of classes|

## 2. @Api
Use the location to use on the class to describe the request class. Identifies a Controller class is the Swagger document class.

### 2.1 Attributes of annotations

| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""|Description, meaningless. |
|tags|String[]|""|Grouping|
|basePath|String|""|Base Path|
|protocols|String|int|Request Protocol|
|authorizations|Authorization[]|@Authorization(value = "")|Configuration for advanced feature authentication|
|hidden|boolean|false|Is it hidden (not displayed, the default is false)|


### 2.2 The difference between attribute value and tags

The value attribute is used to describe both the role of the class and the role of the method;

The tags attribute is used for grouping both on classes and methods, but the effect of grouping is very different:

When tags act on a class, the global methods are grouped, that is, multiple copies are made according to the tags attribute value. At this time, the tags value on the method is invalid, and the effect of matching or not matching the tags on the method is the same.

When tags act on a method, they will be grouped according to the tags values ​​of all methods of the current class, with a finer granularity.

### 2.3 How to use
<font color="red">Note: The difference between java and scala in @Api annotation </font>

````java
*java
@Api(tags = "Swagger test related interface")
@RestController

*scala
@Api(tags = Array("Swagger test related interface"))
@RestController
````


## 3. @ApiOperation
Used in methods, to describe the request method.
### 3.1 Attributes of annotations

| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""|Description|
|notes|String|""| Detailed description|
|tags|String[]|""|Grouping|
|response|Class<?>|Void.class|Response parameter type|
|responseReference|String[]|""|Specifies a reference to the response type, local/remote reference, and will override any other specified response() class|
|httpMethod|String|""|http request method, such as: GET, HEAD, POST, PUT, DELETE, OPTION, SPATCH|
|hidden|boolean|false|whether hidden (not displayed) defaults to false|
|code|int|200|http status code|
|extensions|Extension[]|@Extension(properties = @ExtensionProperty(name = "", value = "")|Extension Properties|

### 3.2 How to use

````java
@GetMapping("test1")
@ApiOperation(value = "test1 interface", notes = "test1 interface detailed description")
public ApiResult<String> test1(@RequestParam String aa, @RequestParam String bb, @RequestParam String cc) {
        return ApiUtil.success("success");
}
````

## 4. @ApiImplicitParams

Commonly used in methods to describe the request parameter list.
The value attribute can contain multiple @ApiImplicitParam, and describe each participant in detail.

### 4.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""|Description|

## 5. @ApiImplicitParams

Used in methods to describe request parameters. When multiple parameters need to be described, it is used as a property of @ApiImplicitParams.

### 5.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""|Description|
|name|String|""|Parameter Description|
|defaultValue|String|""|default value|
|allowableValues|String|""|Parameter allowable values|
|required|boolean|false|Required, default false|
|access|String|""|Parameter Filter|
|allowMultiple|boolean|false|Whether the parameter can accept multiple values ​​by appearing multiple times, the default is not allowed|
|dataType|String|""|The data type of the parameter, which can be a class name or a primitive data type|
|dataTypeClass|Class<?>|Void.class| The data type of the parameter, overriding dataType| if provided
|paramType|String|""|Parameter type, valid values ​​are path, query, body, header, form|
|example|String|""|Parameter example of non-body type|
|examples|Example|@Example(value = @ExampleProperty(mediaType = "", value = ""))|Parameter example of body type|
|type|String|""|Add functionality to override detected types|
|format|String|""|Add the function to provide custom format format|
|readOnly|boolean|false|Adds features designated as read-only|

### 5.2 How to use

````java
@GetMapping("test1")
@ApiOperation(value = "test1 interface", notes = "test1 interface detailed description")
@ApiImplicitParams(value = {
        @ApiImplicitParam(name = "aa",value = "aa description",defaultValue = "1",allowableValues ​​= "1,2,3",required = true),
        @ApiImplicitParam(name = "bb",value = "bb description",defaultValue = "1",allowableValues ​​= "1,2,3",required = true),
        @ApiImplicitParam(name = "cc",value = "Description of cc",defaultValue = "2",allowableValues ​​= "1,2,3",required = true),

})
````

## 6. @ApiParam

Used in fields of methods, parameters, and classes to describe request parameters.

### 6.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""|Description|
|name|String|""|Parameter Description|
|defaultValue|String|""|default value|
|allowableValues|String|""|Parameter allowable values|
|required|boolean|false|Required, default false|
|access|String|""|Parameter Filter|
|allowMultiple|boolean|false|Whether the parameter can accept multiple values ​​by appearing multiple times, the default is not allowed|
|dataType|String|""|The data type of the parameter, which can be a class name or a primitive data type|
|dataTypeClass|Class<?>|Void.class| The data type of the parameter, overriding dataType| if provided
|paramType|String|""|Parameter type, valid values ​​are path, query, body, header, form|
|example|String|""|Parameter example of non-body type|
|examples|Example|@Example(value = @ExampleProperty(mediaType = "", value = ""))|Parameter example of body type|
|type|String|""|Add functionality to override detected types|
|format|String|""|Add the function to provide custom format format|
|readOnly|boolean|false|Adds features designated as read-only|

### 6.2 How to use

````java
@GetMapping("test2")
@ApiOperation(value = "test2 interface", notes = "test2 interface detailed description")
public ApiResult<TestRes> test2(@ApiParam(value = "aa description") @RequestParam String aa, @ApiParam(value = "bb description") @RequestParam String bb) {
        return ApiUtil.success(new TestRes());
}
````

## 7. @ApiModel

Used in classes to describe requests, response classes, and entity classes.

### 7.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""| is an alternative name to provide the model, by default, the class name is used|
|description|String|""|Class description|
|parent|Class<?> parent|Void.class|Provides a parent class for the model to allow describing inheritance relationships|
|discriminatory|String|""|Supports model inheritance and polymorphism, using the name of the discriminator's field, you can assert which subtype to use|
|subTypes|boolean|false|Required, default false|
|access|Class<?> parent|Void.class| Array of subtypes inherited from this model|
|reference|boolean|false|Specifies a reference to the corresponding type definition, overriding any other metadata specified|

## 8 @ApiModelProperty

Used in classes to describe requests, response classes, and entity classes.

### 8.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|String|""|Attribute Description|
|name|String|""|Override property name|
|allowableValues|String|""|Parameter allowable values|
|access|String|""|Filter Attribute|
|required|boolean|false|Required, default false|
|dataType|String|""|The data type of the parameter, which can be a class name or a primitive data type|
|hidden|boolean|false| Hidden|
|readOnly|String|""|Add functionality designated as read-only|
|reference|String|""|Specifies a reference to the corresponding type definition, overriding any other metadata specified|
|allowEmptyValue|boolean|false|Allow empty values|
|example|String|""|Example value for attribute|

### 8.2 How to use

<font color="red">Note: The difference between java and scala in the use of @ApiModelProperty annotation </font>

````java
*java entity class
@Data
@ApiModel(description = "Test request class")
public class TestReq {

    @ApiModelProperty(value = "User ID",required = true)
    private Long userId;
    @ApiModelProperty(value = "Username", example = "Zhang San")
}

*scala entity class
@Data
@ApiModel(description = "Test response class")
public class TestRes {
    @(ApiModelProperty @field)("User ID")
    private Long userId;
    @(ApiModelProperty @field)("Username")
}
````


## 9. @ApiResponses

Used on methods and classes to describe the response status code list.

### 9.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|value|ApiResponse[]|""|Description of response status code list|

## 10. @ApiResponse

Used in the method to describe the response status code. Generally used as a property of @ApiResponses.

### 10.1 Attributes of annotations
| Property Name | Property Type | Property Default Value | Property Description |
| -------- | -------- | ----- |----- |
|code|int|""|Response HTTP Status Code|
|message|String|""|Description of the response|
|response|Class<?>|Void.class|An optional response class used to describe the message payload, corresponding to the schema field of the response message object|
|reference|String|""|Specifies a reference to the response type, the specified application can make a local reference, or a remote reference, will be used as is, and will override any specified response() class|
|responseHeaders|ResponseHeader[]|@ResponseHeader(name = "", response = Void.class)|List of possible response headers|
|responseContainer|String|""|Declare the container of the response, valid values ​​are List, Set, Map, any other value will be ignored|


### 10.2 How to use

````java
@GetMapping("test2")
@ApiOperation(value = "test2 interface", notes = "test2 interface detailed description")
@ApiResponses(value = {
        @ApiResponse(code = 200, message = "Request successful", responseHeaders = {@ResponseHeader(name = "header1", description = "description of header1",response = String.class)}),
        @ApiResponse(code = 401, message = "No permission"),
        @ApiResponse(code = 403, message = "Access forbidden")
})
public ApiResult<TestRes> test2(@ApiParam(value = "aa description") @RequestParam String aa, @ApiParam(value = "bb description") @RequestParam String bb) {
        return ApiUtil.success(new TestRes());
}

````