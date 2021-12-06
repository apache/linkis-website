---
title: 接口规范
sidebar_position: 1
---

> Contributor为Linkis贡献新的Restful接口时，需遵循如下接口规范进行接口开发。

## 1. HTTP or WebSocket ?

Linkis目前提供了两种接口方式：HTTP和WebSocket。

WebSocket相比于HTTP的优势：

- 对服务器产生的压力更小
- 信息推送更加及时
- 交互性更加友好

相应的，WebSocket也有如下的劣势：

- WebSocket在使用时可能出现断开连接的情况
- 对前端的技术要求更高
- 一般要求前端有降级处理机制

**如非必要，我们通常强烈建议Contributor尽量少用WebSocket的方式提供接口；**

**如您觉得使用WebSocket很有必要，且愿意将开发的功能贡献给Linkis，建议您在开发前与我们取得沟通，多谢！**

## 2. URL规范

```
/api/rest_j/v1/{applicationName}/.+
/api/rest_s/v1/{applicationName}/.+
```

**约定**：

 - rest_j表示接口符合Jersey规范
 - rest_s表示接口符合springMVC Rest规范
 - v1为服务的版本号，**版本号会随着Linkis版本进行升级**
 - {applicationName}为微服务名

## 3. 接口请求格式

```json
{
 	"method":"/api/rest_j/v1/entrance/execute",
 	"data":{},
	"websocketTag":"37fcbd8b762d465a0c870684a0261c6e"  // WebSocket请求的必需参数，HTTP请求可忽略
}
```

**约定**：

 - method：请求的Restful API URL。
 - data：请求的具体数据。
 - websocketTag：某一次WebSocket请求的唯一标识，后台也会带回该参数用于给前端进行识别。

## 4. 接口返回格式

```json
{"method":"/api/rest_j/v1/project/create","status":0, "message":"创建成功！","data":{}}
```

**约定**：

 - method：返回请求的Restful API URL，主要是websocket模式需要使用。
 - status：返回状态信息，其中：-1表示没有登录，0表示成功，1表示错误，2表示验证失败，3表示没该接口的访问权限。
 - data：返回具体的数据。
 - message：返回请求的提示信息。如果status非0时，message返回的是错误信息，其中data有可能存在stack字段，返回具体的堆栈信息。 

另：根据status的不同，HTTP请求的状态码也不一样，一般情况下：

 - 当status为0时，HTTP的状态码为200
 - 当status为-1时，HTTP的状态码为401
 - 当status为1时，HTTP的状态码为400
 - 当status为2时，HTTP的状态码为412
 - 当status为3时，HTTP的状态码为403
