1. [**Compulsory**] Make sure getting a singleton object to be thread-safe. Operating inside singletons should also be kept thread-safe.



2. [**Compulsory**] Thread resources must be provided through the thread pool, and it is not allowed to explicitly create threads in the application.



3. SimpleDateFormat is a thread-unsafe class. It is recommended to use the DataUtils utility class.



4. [**Compulsory**] At high concurrency, synchronous calls should consider the performance cost of locking. If you can use lockless data structures, don't use locks. If you can lock blocks, don't lock the whole method body. If you can use object locks, don't use class locks.



5. [**Compulsory**] Use ThreadLocal as less as possible. Everytime using ThreadLocal and it holds an object which needs to be closed, remember to close it to release.