---
title: CS Cache Architecture
sidebar_position: 3
---


## **CSCache Architecture**
### **issues that need resolving**

### 1.1. Memory structure needs to be solved:

1. Support splitting by ContextType: speed up storage and query performance

2. Support splitting according to different ContextID: Need to complete ContextID, see metadata isolation

3. Support LRU: Recycle according to specific algorithm

4. Support searching by keywords: Support indexing by keywords

5. Support indexing: support indexing directly through ContextKey

6. Support traversal: need to support traversal according to ContextID and ContextType

### 1.2 Loading and parsing problems to be solved:

1. Support parsing ContextValue into memory data structure: It is necessary to complete the parsing of ContextKey and value to find the corresponding keywords.

2. Need to interface with the Persistence module to complete the loading and analysis of the ContextID content

### 1.3 Metric and cleaning mechanism need to solve the problem:

1. When JVM memory is not enough, it can be cleaned based on memory usage and frequency of use

2. Support statistics on the memory usage of each ContextID

3. Support statistics on the frequency of use of each ContextID

## **ContextCache Architecture**

The architecture of ContextCache is shown in the following figure:

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-01.png)

1. ContextService: complete the provision of external interfaces, including additions, deletions, and changes;

2. Cache: complete the storage of context information, map storage through ContextKey and ContextValue

3. Index: The established keyword index, which stores the mapping between the keywords of the context information and the ContextKey;

4. Parser: complete the keyword analysis of the context information;

5. LoadModule completes the loading of information from the persistence layer when the ContextCache does not have the corresponding ContextID information;

6. AutoClear: When the Jvm memory is insufficient, complete the on-demand cleaning of ContextCache;

7. Listener: Metric information for the mobile phone ContextCache, such as memory usage and access times.

## **ContextCache storage structure design**

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-02.png)

The storage structure of ContextCache is divided into three layers:

**ContextCache:** stores the mapping relationship between ContextID and ContextIDValue, and can complete the recovery of ContextID according to the LRU algorithm;

**ContextIDValue:** CSKeyValueContext that has stored all context information and indexes of ContextID. And count the memory and usage records of ContestID.

**CSKeyValueContext:** Contains the CSInvertedIndexSet index set that stores and supports keywords according to type, and also contains the storage set CSKeyValueMapSet that stores ContextKey and ContextValue.

CSInvertedIndexSet: categorize and store keyword indexes through CSType

CSKeyValueMapSet: categorize and store context information through CSType

## **ContextCache UML Class Diagram Design**

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-03.png)

## **ContextCache Timing Diagram**

The following figure draws the overall process of using ContextID, KeyWord, and ContextType to check the corresponding ContextKeyValue in ContextCache.
![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-04.png)

Note: The ContextIDValueGenerator will go to the persistence layer to pull the Array[ContextKeyValue] of the ContextID, and parse the ContextKeyValue key storage index and content through ContextKeyValueParser.

The other interface processes provided by ContextCacheService are similar, so I won't repeat them here.

## **KeyWord parsing logic**

The specific entity bean of ContextValue needs to use the annotation \@keywordMethod on the corresponding get method that can be used as the keyword. For example, the getTableName method of Table must be annotated with \@keywordMethod.

![](/Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-05.png)

When ContextKeyValueParser parses ContextKeyValue, it scans all the annotations modified by KeywordMethod of the specific object passed in and calls the get method to obtain the returned object toString, which will be parsed through user-selectable rules and stored in the keyword collection. Rules have separators, and regular expressions

Precautions:

1. The annotation will be defined to the core module of cs

2. The modified Get method cannot take parameters

3. The toSting method of the return object of the Get method must return the keyword