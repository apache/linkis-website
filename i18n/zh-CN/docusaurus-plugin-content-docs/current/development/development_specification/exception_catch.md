---
title: 异常规范
sidebar_position: 3
---

## 1. 异常层次定义
1. linkis异常继承层次：

LinkisException：异常继承于Exception，存在三个静态属性，是服务在启动时进行赋值的,这三个属性主要为了在进行异常打印时，标明异常来自于哪个微服务
```
    static String applicationName;//Microservice AppName
    static String hostname;//Microservice hostName
    static int hostPort;//Microservice port
```
可继承异常：

|异常类 | 所在服务|    错误描述|
|:----  |:---   |:---   |
|LinkisException|	common|	顶级父类，继承自Exception,不允许直接继承|
|LinkisRuntimeException|	common|	顶级父类，继承自RuntimeException,不允许直接继承|
|WarnException|	common|	次级父类，继承自LinkisRuntimeException。提示级的异常，必须直接或间接继承该类|
|ErrorException|	common|	次级父类，继承自LinkisException。错误级的异常，必须直接或间接继承该类|
|FatalException|	common|	次级父类，继承自LinkisException。致命级的异常，必须直接或间接继承该类,出现此类异常服务需要在Catch时进行退出。如：ECM在向LM注册失败时需要退出|
|LinkisRetryException|	common|	次级父类，继承自LinkisException。重试级的异常，必须直接或间接继承该类,一般用于Linkis内部，用于捕获该异常进行请求的重试，如：引擎启动的资源不足异常|

2. 模块使用异常须知：
- 【**强制**】每个模块需要自定义对应模块的异常，自定义的异常都必须继承自LinkisRetryException、WarnException、ErrorException或FatalException之一
- 【**强制**】自定义的异常必须包含错误码和错误描述，如有必要，也可将发生异常的ip地址和进程端口封装到异常当中
- 【**强制**】慎用WarnException！WarnException抛出来的异常，如果在Restful和RPC的Receiver端被捕获，不会给前端或sender端抛出执行失败，而是只返回一条警告信息！
- 【**强制**】WARNException的异常级别为1，ErrorException的异常级别为2，FatalException的异常级别为3，LinkisRetryException的异常级别为4

3. 错误码需按照规范进行定义，错误码规范如下（PS：现有不规范的错误码，您可以提PR进行修复）
```
## 错误码定义：整个调用链路的需要有规则
linkis-commons:10000-11000
linkis-computattion-governace:11000-12000
linkis-engineconn-plugins:12000-13000
linkis-orchestrator:13000-14000
linkis-public-enghancements:14000-15000
linkis-spring-cloud-service:15100-15500
linkis-extensions:15500-16000
```

## 2. 异常规范
1. [强制] 禁止直接catch Throwable，这种代码非常危险，因为会把Error也给catch住，像OOM等异常会被直接catch，原本JVM检测到该异常会自动停止进程，但是因为我们catch住了，会导致进程实际已经无法提供服务，但是不会正常退出。
```scala
// 对于Scala代码建议使用Utils工具类里面提供的相关tryCatch方法
 def tryCatch[T](tryOp: => T)(catchOp: Throwable => T): T = {
    try tryOp catch {
      case t: ControlThrowable => throw t
      case fatal: FatalException =>
        error("Fatal error, system exit...", fatal)
        System.exit(fatal.getErrCode)
        null.asInstanceOf[T]
      case e: VirtualMachineError =>
        error("Fatal error, system exit...", e)
        System.exit(-1)
        throw e
      case er: Error =>
        error("Throw error", er)
        throw er
      case t => catchOp(t)
    }
  }
```
2. [强制] 捕获异常后，如果需要创建新的异常，一定要将cause进行传递对新加的异常进行initCause，防止丢失根因
```
// 新生成的异常，需要继承cacuse
public StorageErrorException(int errCode, String desc, Throwable t){
        super(errCode, desc);
        initCause(t);
}
```

3. 【**强制**】每个小模块的异常，都应该定义一个专门的exception类，方便后续给用户生成错误码，不允许抛出任何RuntimeException和直接抛Exception。

4. 【推荐】尽量不要对大段代码进行try-catch，这是不负责任的表现。catch时请分清稳定代码和非稳定代码，稳定代码指的是无论如何不会出错的代码。对于非稳定代码的catch尽可能进行区分异常类型，再做对应的异常处理。

5. 【**强制**】捕获异常是为了处理它，不要捕获了却什么都不处理而抛弃之，如果不想处理它，请将该异常抛给它的调用者。注意：什么情况下，都不要用e.printStackTrace()！最外层的业务使用者，必须处理异常，将其转化为用户可以理解的内容。

finally块必须对资源对象、流对象进行关闭，有异常也要做try-catch。

6. 【**强制**】预防NullPointerException。方法的返回值可以为null，不强制返回空集合，或者空对象等，但是必须添加注释充分说明什么情况下会返回 null 值。RPC、SpringCloud Feign调用，一律要求进行非空判断。

7. 【**强制**】不要在finally中使用Return和抛出异常

8. 【**强制**】如果异常已经抛出，禁止打印异常的堆栈日志，会导致日志冗余