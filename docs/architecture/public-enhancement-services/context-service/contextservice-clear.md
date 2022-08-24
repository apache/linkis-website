---
title: CS cleaner Architecture
sidebar_position: 10
---

##1. Overview
###1.1 Requirement Background
The Linkis ContextService unified context service currently lacks a cleaning mechanism, and lacks the interface for creation time, update time fields, and batch cleaning. In the case of long-term accumulation, millions of data may appear to affect query efficiency.
###1.2 Goals
1. Modify the underlying library table of ContextService, add the fields of creation time, modification time, and last access time, and complete the update time of ContextID and ContextMap related data.
2. Add a restful interface for cleaning and cleaning, and support batch and retail cleaning interfaces according to time range and id list
3. Add the corresponding java sdk interface of cs-client

##2. Overall Design
This requirement involves the cs-client, cs-persistence and cs-server modules under ContextService. Add three fields of the existing table in the cs-persistence module; add three restful interfaces in the cs-server module, and add three sdk apis in the cs-client module.

###2.1 Technical Architecture
For the overall architecture of ContextService, please refer to the existing document: [ContextService Architecture Document](https://linkis.apache.org/zh-CN/docs/latest/architecture/public_enhancement_services/context_service/overview "ContextService Architecture Document")

The access relationship of each module of ContestService is shown in the following figure
![arc](/Images/Architecture/Public_Enhancement_Service/ContextService/cs_clear_01.png)


Table changes are in the cs-persistence module. This change involves 5 tables, context_id, context_map, context_id_listener, context_key_listener, and context_history tables, all of which need to add create_time, update_time, and access_time 3 fields. The context_id and context_map tables are enabled, and the other three tables are not enabled. create_time Adds the time before the persistence module executes the insert operation. update_time and access_time are actively called by the upstream interface. In the update interface, update_time and access_time are mutually exclusive updates, that is, when access_time exists (not null), update_time will not be updated, otherwise update_time will be updated.

The update_time field is updated in the cs-cache module, and the ADD message when the new context_id is loaded from the db is detected, and the access_time is synchronized to the db at this time. Only the create_time update_time access_time of the context_id table is recorded in the table. Subsequent search cleaning is also performed from the context_id table.

Added 3 cleanup related interfaces: searchContextIDByTime, clearAllContextByID, clearAllContextByTime. searchContextIDByTime searches according to 3 time ranges and returns the contextID list; clearAllContextByID clears the content of the context_map table and context_id table corresponding to the ID in the input contextID list; clearAllContextByTime searches according to the 3 time start and end ranges, and clears all the context_map tables corresponding to the searched contextIDs and the content of the context_id table.

###2.2 Business Architecture
This feature is to add batch query and cleanup related interfaces to the ContextService service, as well as add fields such as the update time of the underlying data table, so as to clean up expired data according to the access situation. The function points involve the modules as shown in the table below.

| Component name | First-level module | Second-level module | Function point |
| :------------ | :------------ | :------------ | :------ ------ |
| Linkis | linkis-ps-cs | cs-client | Added batch cleaning interface related java sdk api interface |
| Linkis | Linkis-ps-cs | cs-server | Added restful interface related to batch cleaning interface |
| Linkis | linkis-ps-cs | cs-persistence | Add 3 time-related fields of the underlying table |


##3. Module Design
###Main execution process
- Create ContextID. When a user creates a ContextID, the create_time will be recorded, and this field will not be updated later.
- Update ContextID. When the user updates the ContextID, the update_time field is updated. Note that if the update is from the cache at this time, the access_time field will not be updated; if it is loaded from the db to the cache and then updated with the new contextID, the access_time will be updated first, and then the new update_time will be updated separately.
- Query ContextID according to time. When the user queries the ContextID of the corresponding time range, only a list of haid strings will be returned. This interface has paging, which is limited to 5000 pieces of data by default.
- Bulk cleanup of ContextIDs. All contextMap data and contextID data corresponding to the incoming idList will be cleaned up in batches. The maximum number of incoming arrays is 5000.
- Query and clean up ContextID. Query first and then batch clean.
  The corresponding timing diagrams above are as follows:
  ![time](/Images/Architecture/Public_Enhancement_Service/ContextService/cs_clear_02.jpg)

Two of them require additional attention:
①The restful api in the cs-server service will encapsulate the request as a Job and submit it to the queue and block waiting for the result. The operation type of CLEAR is newly defined to facilitate matching to the cleanup related interface.
② To process the Service service of the Job in ①, the name needs to be defined as not including the ContextID to avoid the dynamic proxy conversion of the HighAvailable module. This conversion is only for the interface with only one ContextID in the request, and it is meaningless and affects the batch cleanup and batch query interface. performance.

##4. Data structure
````
# The main involved context_id table structure is as follows, adding create_time, update_time, expire_time fields
CREATE TABLE `linkis_ps_cs_context_id` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(32) DEFAULT NULL,
  `application` varchar(32) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `expire_type` varchar(32) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `instance` varchar(128) DEFAULT NULL,
  `backup_instance` varchar(255) DEFAULT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'update unix timestamp',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `access_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'last access time',
  PRIMARY KEY (`id`),
  KEY `instance` (`instance`(128)),
  KEY `backup_instance` (`backup_instance`(191)),
  KEY `instance_2` (`instance`(128), `backup_instance`(128))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
````

##5. Interface Design
###5.1 Restful interface
1. Query ID interface searchContextIDByTime

①Interface name
GET /api/rest_j/v1/contextservice/searchContextIDByTime

②Input parameters
GET interface path parameters:
![](/storage/img/b5949932490640c2a8f5610d9eea36e3XXX315DE)

③Example of output parameters
````
{
    "method": "/api/contextservice/searchContextIDByTime",
    "status": 0,
    "message": "OK",
    "data": {
        "contextIDs": [
            "8-8--cs_1_devcs_2_dev10493",
            "8-8--cs_1_devcs_2_dev10494",
            "8-8--cs_1_devcs_2_dev10495",
            "8-8--cs_1_devcs_2_dev10496",
            "8-8--cs_1_devcs_2_dev10497",
            "8-8--cs_2_devcs_2_dev10498"
        ]
    }
}
````


2. Clear the specified ID interface clearAllContextByID
   ①Interface name POST /api/rest_j/v1/contextservice/clearAllContextByID
   ② Example of input parameters
````
{
"idList" : [
"8-8--cs_1_devcs_1_dev2236"
]
}
````

③Example of output parameters
````
{
    "method": "/api/contextservice/clearAllContextByID",
    "status": 0,
    "message": "OK",
    "data": {
        "num": "1"
    }
}
````

3. Clear the interface clearAllContextByTime according to the time
   ①Interface name
   POST /api/rest_j/v1/contextservice/clearAllContextByTime
   ② Example of input parameters
   {
   "createTimeStart": "2022-06-01 00:00:00",
   "createTimeEnd": "2022-06-30 00:00:00"
   }
   ③Example of output parameters
````
{
    "method": "/api/contextservice/clearAllContextByTime",
    "status": 0,
    "message": "OK",
    "data": {
        "num": "1"
    }
}
````

###5.2 JAVA SDK API
````
# import pom
<dependency>
     <groupId>org.apache.linkis</groupId>
     <artifactId>linkis-cs-client</artifactId>
     <version>1.1.3</version>
</dependency>

# Code reference is as follows

String createTimeStart = "2022-05-26 22:04:00";
        String createTimeEnd = "2022-06-01 24:00:00";

        ContextClient contextClient = ContextClientFactory.getOrCreateContextClient();

# Interface 1 searchHAIDByTime
        List<String> idList =
                contextClient.searchHAIDByTime(
                        createTimeStart, createTimeEnd, null, null, null, null, 0, 0);

        for (String id : idList) {
            System.out.println(id);
        }

        System.out.println("Got " + idList.size() + "ids.");

        if (idList.size() > 0) {
            String id1 = idList.get(0);
            System.out.println("will clear context of id : " + id1);
        }

# Interface 2 batchClearContextByHAID
        List<String> tmpList = new ArrayList<>();
        tmpList.add(id1);
        int num = contextClient.batchClearContextByHAID(tmpList);
        System.out.println("Succeed to clear " + num + " ids.");
        
# Interface 3 batchClearContextByTime
        int num1 =
                contextClient.batchClearContextByTime(
                        createTimeStart, createTimeEnd, null, null, null, null);
        System.out.println("Succeed to clear " + num1 + " ids by time.");

````


##6. Non-functional design
###6.1 Security
The result interface requires login authentication and requires an administrator to operate. The administrator user is configured in the properties file.

###6.2 Performance
- The query ID interface searchContextIDByTime has pagination and has no performance impact.
- Clear the specified ID interface clearAllContextByID to limit the amount of operation data without performance impact.
- The interface clearAllContextByTime is cleared according to the time. If the query time range is too large, the query may time out, but the task will not fail. And the cleanup operation is a single operation and does not affect other queries.

###6.3 Capacity
This requirement provides a time range query and batch cleaning interface, which requires the upper-layer application that uses ContextService to actively clean up data.

###6.4 High Availability
The interface reuses the high availability of the ContextService microservice itself.