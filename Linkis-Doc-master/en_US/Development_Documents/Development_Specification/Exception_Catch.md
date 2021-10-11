1. [**Mandatory**] For the exception of each small module, a special exception class should be defined to facilitate the subsequent generation of error codes for users. It is not allowed to throw any RuntimeException or directly throw Exception.

2. Try not to try-catch a large section of code. This is irresponsible. Please distinguish between stable code and non-stable code when catching. Stable code refers to code that will not go wrong anyway. For the catch of unstable code, try to distinguish the exception types as much as possible, and then do the corresponding exception handling.

3. [**Mandatory**] The purpose of catching an exception is to handle it. Don't throw it away without handling it. If you don't want to handle it, please throw the exception to its caller. Note: Do not use e.printStackTrace() under any circumstances! The outermost business users must deal with exceptions and turn them into content that users can understand.

4. The finally block must close the resource object and the stream object, and try-catch if there is an exception.

5. [**Mandatory**] Prevent NullPointerException. The return value of the method can be null, and it is not mandatory to return an empty collection, or an empty object, etc., but a comment must be added to fully explain under what circumstances the null value will be returned. RPC and SpringCloud Feign calls all require non-empty judgments.