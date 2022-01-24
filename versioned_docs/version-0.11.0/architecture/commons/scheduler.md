---
title: Scheduler Architecture
sidebar_position: 1
---

>Linkis Scheduler—Expandable packet scheduling consumption architecture capable of intelligent monitoring

## 1 Background

Under the microservice architecture, each service only handles one kind of logic, and in order to achieve asynchronous and decoupling, the calls between services are often completed by submitting the event and then distributing the consumption by the server.

This makes the event distribution and consumption algorithm need to deal with a large number of different types of events. These events have different requirements in terms of urgency, estimated execution time, and whether they can be abandoned, and the gap between the peak and the trough of the event arrival is very large. The state is difficult to predict, so the traditional consumption queue and other data structures and algorithms cannot meet the requirements. It is necessary to define a new distribution consumption that can reasonably group events, monitor the consumption status in time, and expand and adjust the consumption process. algorithm.

## 2 Ideas

1. Through grouping, all objects in the group correspond to a complete life cycle.

2. Each group can independently set the parameter standards for measuring the health of the consumer, and there is a separate thread monitoring. Once it is found to be in an unhealthy state, it will make corresponding parameter adjustments according to the defined logic to ensure consumption as much as possible Stable operation of the device.

2. In each group, define the combination of related parameters. When a parameter is adjusted, all parameters related to it will be adjusted accordingly to try to maintain the normal operation of the consumer.


## 3 Implementation

As shown in the figure below, the process of Linkis Scheduler distributing consumption events is as follows:

![Packet scheduling consumption architecture](../../images/ch4/commons/scheduler.png)

### 3.1 Specific implementation

1. When the event arrives, the scheduler requests the packet factory to obtain the name of the packet that the event should enter.

   The role of the group factory is to parse the attributes of the event and associate it with a certain group. The specific logic is left to the developers of specific consumers to inherit and implement, as long as the unified interface of the GroupFactory provided by the solution is implemented.

2. After getting the group name from the group factory, the scheduler requests the consumption manager to obtain the actual consumer corresponding to the group.

   The consumption manager is globally unique. It maintains a mapping relationship between groups and consumers, and is responsible for the initial construction of the consumer when it is first requested.

   In the process of initializing the consumer, the consumer manager will first create a Consumer object, and then find the corresponding one according to the name from all the Group entities, set its parameters to the Consumer object just created, and then start it The Consumer puts it into a working state and starts processing events.

3. The scheduler puts the event into the waiting queue of the corresponding consumer.

   Each consumer maintains a waiting queue and an execution queue.

   After each time period specified by the "distribution interval" parameter, the consumer will check whether there is a space in the execution queue or a seat for an event that has been executed. If there is, it selects an event from the waiting queue and puts it into that seat. And start to execute the event (the logic of selecting the event depends on the distribution rule, for example, the default FIFO rule will select the first event added to the queue).

### 3.2 Parameter adjustment

When adjusting the parameters of this program, the following process is required:

1. Request the grouping factory and get the grouping object to be adjusted by name. It does not support setting parameters directly in Consumer.

   Only the parameters of the grouping object that provide an adjustment method to the public can be adjusted.

2. Call the parameter adjustment method in the grouping object and try to set the parameters. The following two situations are involved:

    a) The parameter limit must be within the range specified by several sets of numbers.
        
        If the parameter you are trying to set is not within the range, the feedback setting has failed.
        
        If it is within the allowable range, the grouped object will get the corresponding consumer through the consumption manager. While setting the target parameter to the target value, set the other parameters to the corresponding value according to the matched group of numbers. .
    
    b) The parameter limit must meet a certain ratio.
    
        The grouped object gets the corresponding consumer through the consumer manager, and while setting the target parameter to the target value, the other parameters are also calculated in proportion to the corresponding target value, and all are reset.
        
In addition to manually setting parameters, each consumer has an independent monitoring thread to count the length of the waiting queue in the consumer, the number of events being executed, and the growth rate of execution time.

In each grouping object, thresholds and alarm ratios are set for these indicators. Once an indicator exceeds the threshold, or the ratio between multiple indicators exceeds a limited range (for example, when the average execution time is monitored to be greater than the distribution interval parameter, the threshold is considered to be exceeded ), the monitoring thread will immediately expand the consumer accordingly.

When expanding, it will make full use of the above-mentioned parameter adjustment process to increase a certain parameter in a targeted manner, and other parameters will be automatically expanded accordingly.