---
title: 如何提名新的Committer 和 PPMC
sidebar_position: 6
---
> 介绍Committer 和 PPMC 的推选要求以及流程。官方指引可参见：https://incubator.apache.org/guides/ppmc.html

## 1.候选人要求
在投票时，所有 PPMC 成员都需要自己决定是否应批准候选人成为提交者。可以通过搜索[邮件列表](https://lists.apache.org/list?dev@linkis.apache.org)/[ISSUES/PR](https://github.com/apache/incubator-linkis/issues)/[官网文档贡献](https://github.com/apache/incubator-linkis-website)，以了解候选人如何与他人互动，以及他们所做的贡献（代码或文档补丁、建议、参与答疑等）。

以下是在评估候选人的承诺资格时需要考虑的一些要点。
1. 与社区开发合作的能力？
   - 通过电子邮件进行的互动
   - 参与某些群体投票或决策讨论过程
2. 社区如何评价？
   - 是否有助于回答邮件列表中提出的问题
   - 是否表现出乐于助人的态度并尊重他人的想法
3. 承诺工作内容如何评价？
   - 按项目任务计划完成任务的情况
   - 对于棘手的问题处理态度和过程
   - 如何帮助完成不那么有趣的任务
4. 个人技能/能力如何评价？
   - 对项目有扎实的总体了解
   - 电子邮件中讨论的质量
   - 他们的补丁（如果适用）是否易于应用，只需粗略的审查
5. PPMC 的能力要求
   - 对项目有比较全面的了解
   - 能够把控项目进度和版本质量
   - 积极参与/主导社区建设，推动社区健康发展，主动承当项目的责任和治理工作
   - 积极回复 ASF 董事会提出的问题，并采取必要的行动
   - 熟悉 ASF 的版本发布流程

在大多数情况下，新的 PPMC 成员是从 Committer 团队中提名的。但也可以直接成为 PPMC 成员，只要 PPMC 同意提名，并确信候选人已经准备好。例如，这可以通过他/她曾是 Apache 成员、Apache 官员或另一个项目的 PPMC 成员这一事实来证明。

## 2. 推举详细流程

:::tip 
${Candidate Name}：代表被选举人 如：Joe Bloggs

${Committer/PPMC}：代表推选的类型 Committer/PPMC
:::

### 2.1 发起社区邮件讨论

>任何linkis的 PPMC 成员都可以发起投票讨论，在 PPMC 发现社区贡献者任何有价值的贡献并取得候选人本人同意后，可以在linkis的private邮件列表发起讨论。讨论邮件里提议者要把候选人的贡献说清楚，并且给出复核对应贡献的地址，便于大家讨论分析。讨论邮件主送private@linkis.apache.org邮箱，讨论将持续至少72个小时，项目组成员，包括mentor们会针对提议邮件充分发表自己的看法。


如下是讨论邮件样例：

```html
To: private@linkis.apache.org
Subject: [DISCUSS]  ${Candidate Name} as an Linkis ${Committer/PPMC} candidate
Content:

Hi all:
    I nominate ${Candidate Name} as an Linkis ${Committer/PPMC} candidate
 
    Judging from the contributions in recent months, ${Candidate Name} has submitted many implementations[1],[2] to the project and improved the management module for the project. During the optimization and improvement period of the project, it is hoped that more people will participate in the actual project optimization and improvement, to let the project more perfect and easier to use.
  
    So I nominated ${Candidate Name} as ${Committer/PPMC} of the Linkis project.
  
    1. https://github.com/apache/incubator-linkis/issues/created_by/${Candidate Githubid} 
    2. https://github.com/apache/incubator-linkis/commits?author=${Candidate Githubid} 
    3. https://lists.apache.org/list?dev@linkis.apache.org?xxxx
    4. ....
Thanks!
```
    
### 2.2 发起社区邮件投票
>如果讨论邮件在规定时间内没有收到分歧信息，投票发起者需要在linkis的private邮件列表发起Committer或 PPMC 的选举投票。投票邮件主送private@linkis.apache.org，至少持续72小时，至少要3票+1通过；如果存在-1投票则整个投票失败；投票人需要把-1的原因说清楚，便于大家理解和知晓。

如下是投票邮件样例：
```html
To: private@linkis.apache.org
Subject: [VOTE] ${Candidate Name} as an Linkis ${Committer/PPMC} candidate
Content: 
Hi all:
    Judging from the contributions in recent months, ${Candidate Name} has submitted many implementations[1],[2],[3] to the project and improved the management module for the project. During the optimization and improvement period of the project, it is hoped that more people will participate in the actual project optimization and improvement, to let the project more perfect and easier to use.

    I think making him a ${Committer/PPMC} will be a recognition of his outstanding work for Linkis. So, I am happy to call VOTE to accept ${Candidate Name} as an Linkis ${Committer/PPMC}.
  
    Voting will continue for at least 72 hours or until the required number of votes is reached.
 
    Please vote accordingly:
    [ ] +1 approve
    [ ] +0 no opinion
    [ ] -1 disapprove with the reason  
   
    Here are three links to his contributions to Linkis:
    1. https://github.com/apache/incubator-linkis/issues/created_by/${Candidate Githubid} 
    2. https://github.com/apache/incubator-linkis/commits?author=${Candidate Githubid}
    3. Others: https://xxx.com/xxx/xxx/

Thanks!
```
### 2.3 宣布投票结果
>投票邮件结束后，投票发起者需要在第二封[VOTE]邮件里提醒投票结束；同时，投票发起者需要发起邮票宣布投票结果，发送至private@linkis.apache.org。

如下投票结果样例：
```html
To: private@linkis.apache.org
Subject: [RESULTS][VOTE] ${Candidate Name} as an Linkis ${Committer/PPMC}
Content: 

Hi all:
    The vote for "${Candidate Name} as an Linkis ${Committer/PPMC}" has PASSED and closed now.

    The result is as follows:

    3 PPMC  +1 Votes
    - aaa
    - bbb
    - ccc

    Vote thread:
    https://lists.apache.org/thread/xx

    Then I'm going to invite ${Candidate Name} to join us.

    Thanks for everyone's support!   
Thanks!
```
**备注：如果是未通过，结果是 "The vote for "${Candidate Name} as an Linkis ${Committer/PPMC}" has FAILED and closed now."**
   
### 2.4 新增 PPMC 的通知邮件

>该步骤只针对新的 PPMC 推举流程，如果选举的是Committer，该步跳过不执行。
>投票发起者需要发送至IPMC private@incubator.apache.org邮件组发送知会邮件，并等待至少72小时；
>邮件发送 private@incubator.apache.org，抄送private@linkis.apache.org；IPMC们会分析合规性，直到没有异议。

发送至IPMC private@incubator.apache.org  抄送 private@linkis.apache.org 。 从 PPMC 向 IPMC 发送通知到 PPMC 正式邀请被提议的成员，之间要有 72 小时的宽限期

如下是新增推选 PPMC 的通知邮件样例：
```html
To: private@incubator.apache.org
Cc: private@linkis.apache.org

Subject：[NOTICE] ${Candidate Name} for Linkis PPMC
Content:
Hi everyone,

    ${Candidate Name} has been voted as a new member of the Linkis PPMC. 

    The vote thread is at:
    https://lists.apache.org/thread/xx

Thanks!
```

72 小时后，如果IPMC不反对提名（大多数情况下不会反对），则可以向候选人发送邀请。


### 2.5 向候选人发起邮件邀请 
>宣布投票结果邮件发出后，投票发起人要给候选人发送邀请邮件。邀请邮件发送被邀请人，抄送private@linkis.apache.org；被邀请的候选人必须通过指定的邮箱地址回复接受或者拒绝该邀请。

如下是邀请候选人邮件样例：以被邀请人Joe Bloggs为例 

```html
To: JoeBloggs@foo.net
Cc: private@linkis.apache.org
Subject: Invitation to become Linkis committer: Joe Bloggs
    
Hello Joe Bloggs,

    The Linkis Podling Project Management Committee] (PPMC) 
    hereby offers you committer privileges to the project 
    [as well as membership in the PPMC]. These privileges are
    offered on the understanding that you'll use them
    reasonably and with common sense. We like to work on trust
    rather than unnecessary constraints. 
    
    Being a committer enables you to more easily make 
    changes without needing to go through the patch 
    submission process. [Being a PPMC member enables you 
    to guide the direction of the project.]
    
    Being a committer does not require you to 
    participate any more than you already do. It does 
    tend to make one even more committed.  You will 
    probably find that you spend more time here.
    
    Of course, you can decline and instead remain as a 
    contributor, participating as you do now.
    
    A. This personal invitation is a chance for you to 
    accept or decline in private.  Either way, please 
    let us know in reply to the [private@linkis.apache.org] 
    address only.
    
    B. If you accept, the next step is to register an iCLA:
        1. Details of the iCLA and the forms are found 
        through this link: https://www.apache.org/licenses/#clas
    
        2. Instructions for its completion and return to 
        the Secretary of the ASF are found at
        https://www.apache.org/licenses/#submitting
    
        3. When you transmit the completed iCLA, request 
        to notify the Apache Linkis(Incubating) and choose a 
        unique Apache ID. Look to see if your preferred 
        ID is already taken at 
        https://people.apache.org/committer-index.html
        This will allow the Secretary to notify the PPMC 
        when your iCLA has been recorded.
    
    When recording of your iCLA is noted, you will 
    receive a follow-up message with the next steps for 
    establishing you as a committer.

    With the expectation of your acceptance, welcome!

The Apache Linkis(Incubating) PPMC
```

### 2.6 接受邀请流程
>需要候选人进行处理

新的 Committer 应回复 `private@linkis.apache.org`（选择`reply all`），并表达他/她接受邀请。
然后，该邀请将被项目的 PPMC 视为已接受。当然，新的 committer 也可以选择拒绝邀请。

接受邀请，回复邮件示例 
```
Hello Apache Linkis PPMC,

I accept the invitation.
Thanks to the  Apache Linkis(Incubating) Community PPMC for
recognizing my work, I will continue to actively participate in the
work of the  Apache Linkis(Incubating). Next, I will follow the
instructions to complete the next steps: Signing and submitting iCLA
and registering Apache ID.

XXXX 
```

一旦邀请被接受，新的提交者需要完成以下事项：
- 订阅`dev@linkis.apache.org`。通常这已经完成了。
- 选择一个未被使用过 [apache committers list page](http://people.apache.org/committer-index.html) 的 Apache ID。
- 下载 ICLA 并签署 指引见[ICLA 签署流程](how-to-sign-apache-icla)。

- PPMC 将等待Apache秘书确认ICLA（或CCLA）备案。新的提交者和 PPMC 将收到以下电子邮件：

```html
Dear ${Candidate Name},

This message acknowledges receipt of your ICLA, which has been filed in the Apache Software Foundation records.

Your account has been requested for you and you should receive email with next steps
within the next few days (can take up to a week).

Please refer to https://www.apache.org/foundation/how-it-works.html#developers
for more information about roles at Apache.
```

万一该帐户未被处理，PPMC 成员应联系项目[Apache Incubator的VP](https://www.apache.org/foundation/), 可以通过 [Apache Account Submission Helper Form](https://whimsy.apache.org/officers/acreq) 请求。

几天后，新的提交者将收到一封来自root@apache.org帐户通知账号创建的电子邮件，标题为`Welcome to the Apache Software Foundation (ASF)!`。

收到账户创建成功的通知邮件后，可以再次回复之前的邀请邮件，告知Linkis PPMC，你的Apache Id账号已经创建，请求将你的Apache Id添加到Linkis的官方提交者列表中。
(告知负责提名你的PPMC通过 [Roster](https://whimsy.apache.org/roster/committee/linkis) 页面，将新的提交者添加到官方提交者列表中）

### 2.7 设置 Apache ID 和开发环境

- 进入[Apache Account Utility Platform](https://id.apache.org/)，创建密码，设置个人邮箱（`转发邮箱地址`）和GitHub账号（`Your GitHub Username`）。
- 如果您想使用`xxx@apache.org`邮件服务，请参考[这里](https://infra.apache.org/committer-email.html)。推荐使用 Gmail，因为这种转发模式在大多数邮箱服务设置中都不容易找到。
- 关注【授权GitHub 2FA wiki】(https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/) 开启双因素授权（2FA ) 在 [Github](http://github.com/) 上。当您将 2FA 设置为“关闭”时，它将被相应的 Apache committer 写入权限组除名，直到您再次设置它。 （**注意：像对待密码一样注意恢复代码！**）
- 使用【GitBox Account Linking Utility】（https://gitbox.apache.org/setup/）获取Linkis项目的写权限。
- [linkis-website](https://linkis.apache.org/team)相关页面更新

详细指引见[PPMC/Committer 相关权限配置](ppmc-related-permission-configuration.md)

如果您想在 Apache GitHub 组织中公开露面，您需要前往 [Apache GitHub 人员页面](https://github.com/orgs/apache/people)，
搜索自己，然后选择`Organization visibility`为`Public`。

   
## 3 发布公告邮件
>如上步骤都完成后，投票发起人向dev@linkis.apache.org邮件组发通知邮件。

如下是通知邮件样例：
```html
To: dev@linkis.apache.org
Subject: [ANNOUNCE] New ${Committer/PPMC}: ${Candidate Name}
Content: 
Hi all:
    Hi everyone,

    The Project Management Committee(PMC) for Apache Linkis has invited ${Candidate Name} to become a ${Committer/PPMC} and we are pleased to announce that he has accepted.

    ${Candidate Name} is being active in the Linkis community, and we are glad to see his more interactions with the community in the future.

    Welcome ${Candidate Name}, and please enjoy your journey.:)

Thanks!
The Apache Linkis(Incubating) PPMC
```
   
到此，整个流程才算走完，候选人才正式的成为项目的Committer或者PPMC。

## 4 更新 Clutch Status信息
step1 克隆状态记录的文件 
```shell script
svn co https://svn.apache.org/repos/asf/incubator/public/trunk/content/projects/
```

step2 修改 linkis.xml 中的new信息
增加committer信息记录 
```shell script
<section id="News">
      <title>News</title>
      <ul>
<!--    <li>YYYY-MM-DD New committer: Fred Hampton</li>    -->
        <li>2021-08-02 Project enters incubation.</li>
        <li>2022-02-19 First Apache Linkis release v1.0.3</li>
        <li>2022-02-24 New Committer: Chen Xia</li>
        <li>2022-04-15 Apache Linkis release v1.1.0</li>

      </ul>
    </section>
```
step3 更新提交后，信息会在这里呈现 
https://incubator.apache.org/clutch/linkis.html


## 5 操作流程总结
1. 发送携带ICLA附件的邮件
2. 1-2天后收到回复邮件，将在5个工作日内处理  
3. 2-5天内收到apache账户创建成功邮件   
4. 使用邮件提示内容找回密码或重置密码  
5. 登录id.apache.org或whimsy.apache.org关联github账号  
6. 开启Github的2FA认证（双英子认证）  
7. 使用gitbox.apache.org获得仓库写入权限  