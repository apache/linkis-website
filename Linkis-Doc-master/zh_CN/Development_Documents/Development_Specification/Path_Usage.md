请注意：Linkis 提供了统一的 Storage模块，所以在使用路径或在配置文件中配置路径时，必须遵守 Linkis 路径规范。

1.	【**强制**】使用文件路径时不管是本地，hdfs，http都必须带有schema信息。其中：
    - 本地文件 的 Scheme 头为：file:///; 
    - HDFS 的 Scheme 头为：hdfs:///；
    - http 的 Scheme 头为：http:///。

2.	路径中不应该存在特殊字符，尽量英文，下划线，数字进行组合。