---
title: CS Search Architecture
sidebar_position: 3
---

## **CSSearch Architecture**
### **Overall architecture**

As shown below:

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-01.png)

1. ContextSearch: The query entry, accepts the query conditions defined in the Map form, and returns the corresponding results according to the conditions.

2. Building module: Each condition type corresponds to a Parser, which is responsible for converting the condition in the form of Map into a Condition object, which is implemented by calling the logic of ConditionBuilder. Conditions with complex logical relationships will use ConditionOptimizer to optimize query plans based on cost-based algorithms.

3. Execution module: Filter out the results that match the conditions from the Cache. According to different query targets, there are three execution modes: Ruler, Fetcher and Match. The specific logic is described later.

4. Evaluation module: Responsible for calculation of conditional execution cost and statistics of historical execution status.

### **Query Condition Definition (ContextSearchCondition)**

A query condition specifies how to filter out the part that meets the condition from a ContextKeyValue collection. The query conditions can be used to form more complex query conditions through logical operations.

1. Support ContextType, ContextScope, KeyWord matching

    1. Corresponding to a Condition type

    2. In Cache, these should have corresponding indexes

2. Support contains/regex matching mode for key

    1. ContainsContextSearchCondition: contains a string

    2. RegexContextSearchCondition: match a regular expression

3. Support logical operations of or, and and not

    1. Unary operation UnaryContextSearchCondition:

> Support logical operations of a single parameter, such as NotContextSearchCondition

1. Binary operation BinaryContextSearchCondition:

> Support the logical operation of two parameters, defined as LeftCondition and RightCondition, such as OrContextSearchCondition and AndContextSearchCondition

1. Each logical operation corresponds to an implementation class of the above subclass

2. The UML class diagram of this part is as follows:

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-02.png)

### **Construction of query conditions**

1. Support construction through ContextSearchConditionBuilder: When constructing, if multiple ContextType, ContextScope, KeyWord, contains/regex matches are declared at the same time, they will be automatically connected by And logical operation

2. Support logical operations between Conditions and return new Conditions: And, Or and Not (considering the form of condition1.or(condition2), the top-level interface of Condition is required to define logical operation methods)

3. Support to build from Map through ContextSearchParser corresponding to each underlying implementation class

### **Execution of query conditions**

1. Three function modes of query conditions:

    1. Ruler: Filter out eligible ContextKeyValue sub-Arrays from an Array

    2. Matcher: Determine whether a single ContextKeyValue meets the conditions

    3. Fetcher: Filter out an Array of eligible ContextKeyValue from ContextCache

2. Each bottom-level Condition has a corresponding Execution, responsible for maintaining the corresponding Ruler, Matcher, and Fetcher.

### **Query entry ContextSearch**

Provide a search interface, receive Map as a parameter, and filter out the corresponding data from the Cache.

1. Use Parser to convert the condition in the form of Map into a Condition object

2. Obtain cost information through Optimizer, and determine the order of query according to the cost information

3. After executing the corresponding Ruler/Fetcher/Matcher logic through the corresponding Execution, the search result is obtained

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-03.png)

### **Query Optimization**

1. OptimizedContextSearchCondition maintains the Cost and Statistics information of the condition:

    1. Cost information: CostCalculator is responsible for judging whether a certain Condition can calculate Cost, and if it can be calculated, it returns the corresponding Cost object

    2. Statistics information: start/end/execution time, number of input lines, number of output lines

2. Implement a CostContextSearchOptimizer, whose optimize method is based on the cost of the Condition to optimize the Condition and convert it into an OptimizedContextSearchCondition object. The specific logic is described as follows:

    1. Disassemble a complex Condition into a tree structure based on the combination of logical operations. Each leaf node is a basic simple Condition; each non-leaf node is a logical operation.

> Tree A as shown in the figure below is a complex condition composed of five simple conditions of ABCDE through various logical operations.

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-04.png)
<center>(Tree A)</center>

1. The execution of these Conditions is actually depth first, traversing the tree from left to right. Moreover, according to the exchange rules of logical operations, the left and right order of the child nodes of a node in the Condition tree can be exchanged, so all possible trees in all possible execution orders can be enumerated.

> Tree B as shown in the figure below is another possible sequence of tree A above, which is exactly the same as the execution result of tree A, except that the execution order of each part has been adjusted.

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-05.png)
<center>(Tree B)</center>

1. For each tree, the cost is calculated from the leaf node and collected to the root node, which is the final cost of the tree, and finally the tree with the smallest cost is obtained as the optimal execution order.

> The rules for calculating node cost are as follows:

1. For leaf nodes, each node has two attributes: Cost and Weight. Cost is the cost calculated by CostCalculator. Weight is assigned according to the order of execution of the nodes. The current default is 1 on the left and 0.5 on the right. See how to adjust it later (the reason for assigning weight is that the conditions on the left have already been set in some cases. It can directly determine whether the entire combinatorial logic matches or not, so the condition on the right does not have to be executed in all cases, and the actual cost needs to be reduced by a certain percentage)

2. For non-leaf nodes, Cost = the sum of Cost×Weight of all child nodes; the weight assignment logic is consistent with that of leaf nodes.

> Taking tree A and tree B as examples, calculate the costs of these two trees respectively, as shown in the figure below, the number in the node is Cost\|Weight, assuming that the cost of the 5 simple conditions of ABCDE is 10, 100, 50 , 10, and 100. It can be concluded that the cost of tree B is less than that of tree A, which is a better solution.


<center class="half">
    <img src="/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-06.png" width="300"/> <img src="./../ /Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-search-07.png" width="300"/>
</center>

1. Use CostCalculator to measure the cost of simple conditions:

    1. The condition acting on the index: the cost is determined according to the distribution of the index value. For example, when the length of the Array obtained by condition A from the Cache is 100 and condition B is 200, then the cost of condition A is less than B.

    2. Conditions that need to be traversed:

        1. According to the matching mode of the condition itself, an initial Cost is given: For example, Regex is 100, Contains is 10, etc. (the specific values ​​etc. will be adjusted according to the situation when they are realized)

        2. According to the efficiency of historical query, the real-time Cost is obtained after continuous adjustment on the basis of the initial Cost. Throughput per unit time