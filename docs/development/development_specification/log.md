---
title: Log
sidebar_position: 1
---

1.	[**Convention**] Linkis chooses SLF4J and Log4J2 as the log printing framework, removing the logback in the Spring-Cloud package. Since SLF4J will randomly select a logging framework for binding, it is necessary to exclude bridging packages such as SLF4J-LOG4J after introducing new Maven packages in the future, otherwise log printing will be a problem. However, if the newly introduced Maven package depends on a package such as Log4J, do not exclude, otherwise the code may run with an error.

2.	[**Configuration**] The log4j2 configuration file is default to log4j2.xml and needs to be placed in the classpath. If springcloud combination is needed, "logging:config:classpath:log4j2-spring.xml"(the location of the configuration file) can be added to application.yml.

3.	[**Compulsory**] The API of the logging system (log4j2, Log4j, Logback) cannot be used directly in the class. For Scala code, force inheritance from Logging traits is required. For Java, use LoggerFactory.GetLogger(getClass).

4.	[**Development Convention**] Since engineConn is started by engineConnManager from the command line, we specify the path of the log configuration file on the command line, and also modify the log configuration during the code execution. In particular, redirect the engineConn log to the system's standard out. So the log configuration file for the EngineConn convention is defined in the EnginePlugin and named log4j2-engineConn.xml (this is the convention name and cannot be changed).

5.	[**Compulsory**] Strictly differentiate log levels. Fatal logs should be thrown and exited using System.out(-1) when the SpringCloud application is initialized. Error-level exceptions are those that developers must care about and handle. Do not use them casually. The WARN level is the logs of user action exceptions and some logs to troubleshoot bugs later. INFO is the key process log. Debug is a mode log, write as little as possible.

6.	[**Compulsory**] Requirements: Every module must have INFO level log; Every key process must have INFO level log. The daemon thread must have a WARN level log to clean up resources, etc.

7.	[**Compulsory**] Exception information should include two types of information: crime scene information and exception stack information. If not, then throw it by keyword. Example: logger.error(Parameters/Objects.toString + "_" + e.getMessage(), e);