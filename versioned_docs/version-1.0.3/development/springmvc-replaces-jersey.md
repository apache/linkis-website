---
title: SpringMVC Replaces Jersey 
sidebar_position: 5
---
> This article mainly introduces the linkis-1.0.3 version, how to use Spring REST to replace the jersey REST mode. Before version 1.0.3, the REST web services provided by linkis used the jersey architecture. The reason for the replacement is mainly to consider: 1. Lisence compliance issues (https://www.apache.org/legal/resolved.html#); 2. linkis itself is a project developed based on Spring, using Spring REST It is more friendly to combine with Feign.

## Servlet Adjustment

linkis Before 1.0.3, the DataWorkCloudApplication startup class used jersey's ServletContainer when creating the web container of JettyServletWebServerFactory.
Replaced by Spring's DispatcherServlet in 1.0.3. If there are other components based on the secondary development of linkis, and some rely on the DataWorkCloudApplication startup class, then the http service in the original jersey mode cannot be used directly.

## Request Returned Structure Adjustment
- Jersey: http request returns entity: javax.ws.rs.core.Response is the jersey mode http return entity, which is processed separately in jersey and encapsulated as Response

- The Spingmvc mode needs to be modified and returns directly to Message

````java
  return Message.messageToResponse(Message.ok().data("test", data));
=>
  return Message.ok().data("test", data)
````


## Jackson Upgrade Replacement

- org.codehaus.jackson has been moved from codehaus to github since v2 and renamed to com.fasterxml.jackson
- The old version of jersey uses org.codehaus.jackson, and springmvc uses the new version of com.fasterxml.jackson. When replacing with springmvc style, you need to upgrade jackson


## Annotation Comparison


| jersey annotations | springmvc annotations | remarks |
| --- | --- | --- |
| @GET | @RequestMapping(method = RequestMethod.GET) | |
| @POST| @RequestMapping(method = RequestMethod.POST) | |
| @DELETE| @RequestMapping(method = RequestMethod.DELETE) | |
| @PUT| @RequestMapping(method = RequestMethod.PUT) | |
| @Path("/dss") | @RequestMapping(path = "/dss) | |
| @FormDataParam("system") String system | @RequestParam(value = "system",required = false)|request is false|
| @QueryParam("system") String system |@RequestParam(value = "system",required = false)|request is false|
| @PathParam("id") Long id|@PathVariable("id") Long id | |
| FormDataMultiPart form |@RequestParam("file") List\<MultipartFile\> files | The default parameter name is file, the usage needs to be modified |
|@Context | Delete directly | |
| @DefaultValue("1000") @QueryParam("pageSize") int pageSize, | @RequestParam(value = "pageSize",defaultValue = "1000")| |
|@Consumes(MediaType.APPLICATION_JSON)| @RequestMapping(consumes = {"application/json"})||
|@Produces(MediaType.APPLICATION_JSON)|@RequestMapping(produces = {"application/json"})| |
|Parameter org.codehaus.jackson.JsonNode|@RequestBody com.fasterxml.jackson.databind.JsonNode jsonNode|The old version of jersey uses the old version of jackson, and springmvc uses the new version of JsonNode


## Jackson Main Replacement Point

```
jackson-1.X methods: getBooleanValue(), getFields(), getElements(), getIntValue()
jackson-2.X methods: booleanValue(), fields(), elements() and intValue()

```

For details, please refer to
- https://stackoverflow.com/questions/55896802/upgrade-of-jackson-from-org-codehaus-jackson-to-com-fasterxml-jackson-version-1
- http://www.cowtowncoder.com/blog/archives/2012/04/entry_469.html
