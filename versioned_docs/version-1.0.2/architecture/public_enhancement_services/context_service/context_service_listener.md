---
title: CS Listener Architecture
sidebar_position: 3
---
## **Listener Architecture**

In DSS, when a node changes its metadata information, the context information of the entire workflow changes. We expect all nodes to perceive the change and automatically update the metadata. We use the monitoring mode to achieve, and use the heartbeat mechanism to poll to maintain the metadata consistency of the context information.

### **Client registration itself, CSKey registration and CSKey update process**

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-listener-01.png)

The main process is as follows:

1. Registration operation: The clients client1, client2, client3, and client4 register themselves and the CSKey they want to monitor with the csserver through HTPP requests. The Service service obtains the callback engine instance through the external interface, and registers the client and its corresponding CSKeys.

2. Update operation: If the ClientX node updates the CSKey content, the Service service updates the CSKey cached by the ContextCache, and the ContextCache delivers the update operation to the ListenerBus. The ListenerBus notifies the specific listener to consume (that is, the ContextKeyCallbackEngine updates the CSKeys corresponding to the Client). The consumed event will be automatically removed.

3. Heartbeat mechanism:

All clients use heartbeat information to detect whether the value of CSKeys in ContextKeyCallbackEngine has changed.

ContextKeyCallbackEngine returns the updated CSKeys value to all registered clients through the heartbeat mechanism. If there is a client's heartbeat timeout, remove the client.

### **Listener UM class diagram**

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-02.png)

Interface: ListenerManager

External: Provide ListenerBus for event delivery.

Internally: provide a callback engine for specific event registration, access, update, and heartbeat processing logic

## **Listener callbackengine timing diagram**

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-03.png)