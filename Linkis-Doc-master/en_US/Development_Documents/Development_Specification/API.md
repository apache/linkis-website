 > When Contributor contributes new RESTful interfaces to Linkis, it is required to follow the following interface specifications for interface development.



## 1. HTTP or WebSocket ?



Linkis currently provides two interfaces: HTTP and WebSocket.



WebSocket advantages over HTTP:



- Less stress on the server

- More timely information push

- Interactivity is more friendly



Correspondingly, WebSocket has the following disadvantages:



- The WebSocket may be disconnected while using

- Higher technical requirements on the front end

- It is generally required to have a front-end degradation handling mechanism



**We generally strongly recommend that Contributor provide the interface using WebSocket as little as possible if not necessary;**



**If you think it is necessary to use WebSocket and are willing to contribute the developed functions to Linkis, we suggest you communicate with us before the development, thank you!**



## 2. URL specification



```

/api/rest_j/v1/{applicationName}/.+

/api/rest_s/v1/{applicationName}/.+

```



**Convention** :



- rest_j indicates that the interface complies with the Jersey specification

- REST_S indicates that the interface complies with the SpringMVC REST specification

- v1 is the version number of the service. ** version number will be updated with the Linkis version **

- {applicationName} is the name of the micro-service



## 3. Interface request format



```json

{

"method":"/api/rest_j/v1/entrance/execute",

"data":{},

"WebsocketTag" : "37 fcbd8b762d465a0c870684a0261c6e" / / WebSocket requests require this parameter, HTTP requests can ignore

}

```



**Convention** :



- method: The requested RESTful API URL.

- data: The specific data requested.

- WebSocketTag: The unique identity of a WebSocket request. This parameter is also returned by the back end for the front end to identify.



## 4. Interface response format



```json

{" method ":"/API/rest_j/v1 / project/create ", "status" : 0, "message" : "creating success!" ,"data":{}}

```



**Convention** :



- method: Returns the requested RESTful API URL, mainly for the WebSocket mode.

- status: Returns status information, where: -1 means not login, 0 means success, 1 means error, 2 means failed validation, and 3 means no access to the interface.

- data: Returns the specific data.

- message: Returns a prompt message for the request. If status is not 0, message will return an error message, where data may have a stack trace field, and return the specific stack information.



In addition: Different status cause different HTTP status code, under normal circumstances:



- When status is 0, the HTTP status code is 200

- When the status is -1, the HTTP status code is 401

- When status is 1, the HTTP status code is 400

- When status is 2, the HTTP status code is 412

- When status is 3, the HTTP status code is 403