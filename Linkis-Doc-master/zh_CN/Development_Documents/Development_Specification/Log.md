1.	【**约定**】Linkis选择slf4j和Log4j2作为日志打印框架，去除了Spring-Cloud包中自带的logback。由于Slf4j会随机选择一个日志框架进行绑定，所以以后在引入新maven包的时候，需要将诸如slf4j-log4j等桥接包exclude掉，不然日志打印会出现问题。但是如果新引入的maven包依赖log4j等包，不要进行exclude，不然代码运行可能会报错

2.	【**配置**】log4j2的配置文件默认为log4j2.xml,需要放置在classpath中。如果需要和springcloud结合，可以在application.yml中加上logging:config:classpath:log4j2-spring.xml(配置文件的位置)

3.	【**强制**】类中不可直接使用日志系统（log4j2、Log4j、Logback）中的API。；如果是Scala代码，强制继承Logging trait。java采用 LoggerFactory.getLogger(getClass)。

4.	【**开发约定**】由于EngineConn是由EngineConnManager通过命令行进行启动的，所以我们在命令行中指定了日志的配置文件的路径，同时也对日志的配置在代码运行中进行了改造，特别是将EngineConn的日志重定向到了系统的standard out中。所以约定EngineConn的日志配置文件在EnginePlugin中定义，名称为log4j2-engineconn.xml(这个是约定名，不能更改)

5.	【**强制**】严格区分日志级别。Fatal级别的日志，在springcloud应用初始化的时候，就应该抛出来，并使用System.out(-1)退出。ERROR级别的异常为开发人员必须关注和处理的异常，不要随便用ERROR级别的。Warn级别是用户操作异常日志和一些方便日后排除BUG的日志。INFO为关键的流程日志。DEBUG为调式日志，尽量少写。

6.	【**强制**】要求：INFO级别的日志，每个小模块都必须有，关键的流程，都至少有INFO级别的日志。守护线程清理资源等必须有WARN级别的日志。

7.	【**强制**】异常信息应该包括两类信息：案发现场信息和异常堆栈信息。如果不处理，那么通过关键字throws往上抛出。 正例：logger.error(各类参数或者对象toString + "_" + e.getMessage(), e);