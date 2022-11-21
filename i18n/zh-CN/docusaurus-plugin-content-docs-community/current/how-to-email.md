---
title: 如何使用邮件列表
sidebar_position: 1.1
---

> 介绍邮件列表的使用规范和参考示例

邮件列表的订阅请参考此[订阅指引](how-to-subscribe.md)

Linkis的存档邮件可以在此处查看[存档邮件](https://lists.apache.org/list.html?dev@linkis.apache.org)


## 1. 主题种类 
邮件的主题可以大体分为以下几种类型
- **\[DISCUSS]**  针对某一特性/功能/逻辑修改/CI/CD的讨论，可以是实现方式/设计/优化建议等等 
- **\[PROPOSAL]** 提案，如新增/移除某些功能，和\[DISCUSS]区别并不大
- **\[VOTE]**     对变更的投票/推选Committer/推选新的PPMC成员等，比如版本的发布，每个版本都会在社区dev邮件列表进行投票；也可以进行多种方案的选择时，发起投票。
- **\[ANNOUNCE]** 宣布新版本完成发布，宣布推选出的新Committer/PPMC等
- **\[NOTICE]** 主要用来通知一些临时公告等，如社区沙箱环境停服维修/升级，web官网出现服务异常不可用等；以及线上线下周会/交流会以及各种活动信息公告等
- **\[HELP]**   寻求帮助, 因为git的代码通知比较多，有时无法及时查阅到；另外github网络访问受限，可能有些同学无法顺利的通过github提交issue。通过邮件发起，更容易辨别和被感知到。
- **\[VOTE]\[RESULT]** 宣布版本发布投票的结果 



## 2. 邮件规范

** 通用规范 **

- 尽可能不要发送纯 HTML 内容，而是发送纯文本。如果使用QQ邮箱，其邮件内容默认使用的是html格式，编写时请先切换至纯文本格式，详细切换指引见本文附录
- 开发者/社区用户/PPMC成员针对以上场景的内容，发起邮件讨论/需求帮助/通知事宜等，请发送至dev@linkis.apache.org邮箱
- 邮件标题前请带上对应的类型前缀：如`[HELP] XXXXXXX`,`[DISCUSS] XXXXXXX`

更多可以参阅官方[邮件规范](https://infra.apache.org/contrib-email-tips) https://infra.apache.org/contrib-email-tips


** 回复规范**

- 邮件内容末尾，最好带上自己的署名(英文)
- 如果是回复投票类的邮件，最好带上是否具有约束性的标识(PPMC/IPMC成员投的票具有约束性，可以加上 binding后缀 如：`+1 approve(binding)`;
普通成员投的票，无约束性，可以加上 non-binding后缀 如：`+1 approve(non-binding)` )
- 由于部分邮箱如:163/sina 在进行邮件回复时，默认是带上的中文`回复`会导致apache 邮件识别为一封新线程邮件 
如：https://lists.apache.org/thread/otfftdtbq0z9xsddnl7wb8tgzkhqcnof， 无法将整个邮件的线程串联起来，
所以需要对邮箱的回复进行修改配置，详细切换指引见本文附录


** \[DISCUSS/Proposal] 邮件 **

- 标题`[DISCUSS][模块名] XXXX`(如果是某个具体模块的话，建议带上模块名)
- 一般先在Github 的[issues栏](https://github.com/apache/incubator-linkis/issues)上创建对应的issue，再发起邮件讨论
- 简要描述清楚讨论/提议的内容（如:背景/希望解决什么问题/怎么解决）
- 涉及到的模块（如果是涉及到某一两个具体的模块）
- 相关的设计说明等图文信息可以放在对应的issue中，方便修改，邮件中引用链接即可。
- 可以附上对应的中文翻译 

** \[HELP] 邮件 **
- 请先确认[QA文档](https://docs.qq.com/doc/DSGZhdnpMV3lTUUxq)/[issues](https://github.com/apache/incubator-linkis/issues)以及[存档邮件](https://lists.apache.org/list.html?dev@linkis.apache.org)中是否未收录此问题
- 详细描述清楚遇到的问题
- 如何复现此问题
- 可以在git上创建对应的issue
- 可以附上对应的中文翻译

## 3. 示例参考

** \[DISCUSS/Proposal] 示例**
- k8是支持的讨论:https://lists.apache.org/thread/3o61h3439sjnqt8wvmdolg90o635w303
- 某些功能变动讨论邮件示例:https://lists.apache.org/thread/lxdsvo2q0gbzllx04wkq547qxlgp5k5z
- 社区建设的提议邮件示例:https://lists.apache.org/thread/t3cbmrzcpgv9j39f5c3zz8xjfdd3fzsv

** \[VOTE] 示例** 
- 新版本进行发布投票:https://lists.apache.org/thread/9nhsj61oo338g0oql9rlrnfh8jwx64cl

** \[ANNOUNCE] 示例**

- 新版本完成发布:https://lists.apache.org/thread/dmdtgrgozjn1m1mz6ss7999qq387mq0w
- 推选了新的committer:https://lists.apache.org/thread/s8p9nr9gsqxl2tt7o3vxo3jxzrzjm5vf
- 推选了新的PMC:https://lists.apache.org/thread/gqrczn8pw4tq3g4mwh1mf6s0k6r206jn

** \[NOTICE] 示例**

- 例会通知：https://lists.apache.org/thread/2wtn55wkzh27373k9y8qq09843xs9oxn
- 服务状态通知:https://lists.apache.org/thread/bzsc3mnkcl5gz4h3hp9qh9ofpykbr28f


** \[HELP] 示例** 
- 寻求帮助:https://lists.apache.org/thread/br03lmd3n73lbc6n0lzcmqjbvy960wvf

## 4. PPMC的邮件使用
从一个版本的确定到发布，可能会涉及具体的使用邮件的常见场景
1. 新版本需要组织PMC和开发者进行讨论，需要记录会议纪要，确定此版本功能点，计划的大体发布时间，以及本次的release manager等，并发送会议纪要private@linkis.apache.org 邮件列表。
2. 对于新版本的特性列表范围，需要发送投票邮件至dev@linkis.apache.org邮箱中，并需要3+ PMC同意且同意票大于反对票。
3. 主持的周例会，会议前需要发布会议邀约提醒邮件/会议后要发送会议纪要邮件至dev@linkis.apache.org邮箱中
4. 新的committer/ppmc投票需要发送投票邮件至private@linkis.apache.org邮箱中。新的committer/ppmc推选流程见 https://community.apache.org/newcommitter.html

## 5. 版本发布投票邮件的回复
如果发起了发布投票，验证后(详细验证流程见[如何验证](how-to-verify.md))，可以参照此回复示例进行邮件回复

<font color="red">
回复的邮件一定要带上自己检查了那些项信息，仅仅回复`+1 approve`，是无效的。

PPMC/IPMC成员，投票时请带上 binding后缀，表示具有约束性投票，方便统计投票结果
</font>

非PPMC/IPMC成员
```html
+1 (non-binding)
I  checked:
    1. All download links are valid
    2. Checksum and signature are OK
    3. LICENSE and NOTICE are exist
    4. Build successfully on macOS(Big Sur) 
    5. ....
```

PPMC/IPMC成员
```html
+1 (binding)
I  checked:
    1. All download links are valid
    2. Checksum and signature are OK
    3. LICENSE and NOTICE are exist
    4. Build successfully on macOS(Big Sur) 
    5. ....
```

## 6. 附录

** QQ邮箱切换纯文本格式 **

![image](https://user-images.githubusercontent.com/11496700/149449779-d0116bb1-de9e-4cc4-98fb-af3327b15c09.png)

** 邮箱配置回复默认主题关键字 **
中文`回复：`会存在问题
![Email reply](/Images-zh/Architecture/email-reply.png)

修改邮箱常规设置

![mailbox-settings](/Images-zh/Architecture/mailbox-settings.png)