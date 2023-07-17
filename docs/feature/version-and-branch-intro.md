---
title: version number and branch modification instructions
sidebar_position: 0.4
---

## 1. Linkis main version number modification instructions

Linkis will no longer be upgraded by minor version after version 1.3.2. The next version will be 1.4.0, and the version number will be 1.5.0, 1.6.0 and so on. When encountering a major defect in a released version that needs to be fixed, it will pull a minor version to fix the defect, such as 1.4.1.


## 2. Linkis code submission master branch instructions

The modified code of Linkis 1.3.2 and earlier versions is merged into the dev branch by default. In fact, the development community of Apache Linkis is very active, and new development requirements or repair functions will be submitted to the dev branch, but when users visit the Linkis code base, the master branch is displayed by default. Since we only release a new version every quarter, it seems that the community is not very active from the perspective of the master branch. Therefore, we decided to merge the code submitted by developers into the master branch by default starting from version 1.4.0.