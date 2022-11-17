---
title: 版本和新特性规范
sidebar_position: 8
---

## 1. 新增版本规范
当您有新的版本需要时，需要遵循以下步骤：
1. 【强制】新版本一定需要组织PMC和开发者进行讨论，需要记录会议纪要发送邮件列表
2. 【强制】新版本的特性列表范围，需要发起邮件投票.需要3+ PMC同意且同意票大于反对票
3. 【强制】版本投票通过后，需要在GitHub建立对应的版本[Project](https://github.com/apache/incubator-linkis/projects)
4. 【强制】每个特性需要单独发送邮件列表，说明设计原因、设计思路
5. 【强制】涉及到安装、数据库、配置修改的也需要发送邮件列表
6. 【推荐】一个特性对应一个issue对应一个PR
7. 【强制】每个版本需要保证CICD通过、测试案例通过才可以发布版本
8. 【约束】每个版本需要有对应的Leader，leader需要管理相关的Issue和PR，并拉会讨论、积极回复邮件、确认方案、追踪进度等


## 2. 新加特性规范
当您有新特性的新增时，需要遵循以下步骤：
1. 【强制】新特性需要发送邮件进行投票，并附上设计原因，设计思路
2. 【强制】需要在GitHub对应的版本中新添加特性[Project](https://github.com/apache/incubator-linkis/projects)
3. 【强制】涉及到安装、数据库、配置修改的也需要发送邮件列表
4. 【强制】新的特性一定要新增文档
5. 【强制】新加特性需要新增对应的单元测试，[单元测试规范](https://linkis.apache.org/community/development-specification/unit_test)
6. 【推荐】一个特性对应一个issue对应一个PR

