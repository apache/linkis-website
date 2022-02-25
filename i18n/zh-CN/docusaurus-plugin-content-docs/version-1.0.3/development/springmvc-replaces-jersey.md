---
title: SpringMVC 替换 Jersey 分享
sidebar_position: 5
---
> 本文主要介绍 linkis-1.0.3 版本，如何使用Spring REST对jersey REST模式的替换。在1.0.3版本之前，linkis提供的REST Web服务是使用的jersey架构。进行替换的原因主要是考虑到:1. Lisence合规问题(https://www.apache.org/legal/resolved.html#);2. linkis本身是基于Spring开发的项目，使用Spring REST方式的与Feign结合度更友好。


## Servlet 的调整

linkis在1.0.3之前，DataWorkCloudApplication启动类在创建JettyServletWebServerFactory的Web容器时，使用的是jersey的ServletContainer。
在1.0.3替换为了Spring的DispatcherServlet。如果有基于linkis二次开发的其他组件，有依赖了DataWorkCloudApplication启动类，那么原来jersey模式的http服务无法直接使用。

## 请求返回的结构体调整
- Jersey :http请求返回实体：javax.ws.rs.core.Response为jersey模式http返回实体，jersey内部有做单独的处理,封装为了Response

- Spingmvc模式需要修改，直接返回Message

```java
  return Message.messageToResponse(Message.ok().data("test", data));
=>
  return Message.ok().data("test", data)
```


## jackson升级替换 

- org.codehaus.jackson 从v2版本时已经从 codehaus 移交到github 并重命名为com.fasterxml.jackson
- jersey老版本使用的是org.codehaus.jackson，springmvc使用的是新版本的com.fasterxml.jackson，替换为springmvc风格时，需要升级jackson


## 注解对比


|  jersey注解| springmvc注解 | 备注 |
| --- | --- | --- |
|  @GET |   @RequestMapping(method = RequestMethod.GET)|  |
|  @POST| @RequestMapping(method = RequestMethod.POST) |  |
|  @DELETE| @RequestMapping(method = RequestMethod.DELETE) |  |
|  @PUT| @RequestMapping(method = RequestMethod.PUT) |  |
| @Path("/dss") | @RequestMapping(path = "/dss) |  |
|  @FormDataParam("system") String system | @RequestParam(value ="system",required = false)|request为false|
 |  @QueryParam("system") String system |@RequestParam(value ="system",required = false)|request为false|
|  @PathParam("id") Long id|@PathVariable("id") Long id |  |
| FormDataMultiPart form  |@RequestParam("file") List\<MultipartFile\> files  | 默认参数名为file，用法需要修改 |
|@Context  |  直接删除|  |
|  @DefaultValue("1000") @QueryParam("pageSize") int pageSize, |   @RequestParam(value = "pageSize",defaultValue = "1000")|  |
|@Consumes(MediaType.APPLICATION_JSON)| @RequestMapping(consumes = {"application/json"})||
|@Produces(MediaType.APPLICATION_JSON)|@RequestMapping(produces = {"application/json"})| |
|参数 org.codehaus.jackson.JsonNode|@RequestBody com.fasterxml.jackson.databind.JsonNode jsonNode|jersey老版本使用的是老版本的jackson，springmvc使用的是新版本的JsonNode/


## Jackson升级主要替换点

```shell script

jackson-1.X 方法： getBooleanValue()、getFields()、getElements()、getIntValue()
jackson-2.X 方法： booleanValue()、fields()、elements() 和 intValue()

```

详细可参考：
- https://stackoverflow.com/questions/55896802/upgrade-of-jackson-from-org-codehaus-jackson-to-com-fasterxml-jackson-version-1
- http://www.cowtowncoder.com/blog/archives/2012/04/entry_469.html