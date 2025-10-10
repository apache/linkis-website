---
title: Test Specification
sidebar_position: 7
---

1. [**Mandatory**] Tool classes and internal interfaces of services must have test case.
2. [**Mandatory**] Unit testing needs to be able to be automated (triggered by mvn compilation), independence (unit test cases cannot call each other), and repeatable execution (can be executed multiple times, with the same result)
3. [**Mandatory**] A test case should only test one method.
4. [**Mandatory**] Test case exceptions cannot be caught and need to be thrown upwards.
5. [**Mandatory**] The unit test code must be written in the following project directory: src/test/java or scala, and it is not allowed to be written in other records.
6. [Recommended] Unit testing needs to consider boundary conditions, such as the end of the month and February.
7. [Recommended] For database-related unit tests, consider data rollback.