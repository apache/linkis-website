---
title: 如何使用加入开发组
sidebar_position: 1.0
---
> 介绍加入linkis候选人的要求以及流程

## 1. 申请者评审规范
    在投票时，所有 PMC 成员都需要自己决定是否应批准候选人成为提交者。他们可能会搜索邮件列表和 JIRA，以了解候选人如何与他人互动，以及他们所做的贡献（代码或文档补丁、建议、参与对话）。
    以下是在评估候选人的承诺资格时需要考虑的一些要点。
1. 与同行合作的能力我们如何评价？
   - 1.1 通过他们通过电子邮件进行的互动。
   - 1.2 通过他们如何回应批评。
   - 1.3 通过他们如何参与群体决策过程。
2. 成为导师的能力我们如何评价？  
   - 2.1 通过他们的清晰程度以及他们识别甚至创建适当的背景材料的意愿。
3. 社区我们如何评价？
   - 3.1 他们是否有助于回答邮件列表中提出的问题？
   - 3.2 他们是否表现出乐于助人的态度并尊重他人的想法？
4. 承诺我们如何评价？
   - 4.1 按已经给项目的时间完成任务的情况。
   - 4.2 他们如何通过棘手的问题坚持这个过程。
   - 4.3 通过他们如何帮助完成不那么有趣的任务。
5. 个人技能/能力我们如何评价？
   - 5.1 对项目有扎实的总体了解。
   - 5.2 电子邮件中讨论的质量。
   - 5.3 他们的补丁（如果适用）是否易于应用，只需粗略的审查。

## 2. 审批过程
    本节描述了一个典型的 Linkis 项目处理投票以添加新提交者的过程
1. 概括 
    - 1.1 发起投票（templates/committerVote.txt）
    - 1.2 关闭投票 
    - 1.3 如果结果是肯定的，请邀请新的提交者 (templates/committerInvite.txt)
2. 邀请流程
    - 2.1 接受提交者 (templates/committerAccept.txt)
    - 2.2 等到我们看到记录了 CLA 的收据
    - 2.3 请求创建提交者帐户 (template/committerCreate.txt)
        ```html
        2.3.1 等到root说完成。
        2.3.2 PMC 主席启用 svn 和其他访问。
        2.3.3 将提交者添加到 JIRA 和 CWiki 中的相应组。
        ```

    - 2.4 通知提交者完成（template/committerDone.txt）
    - 2.5 如果提交者也是 PMC 成员，PMC 主席会向 board@ 发送电子邮件，要求确认新 PMC 成员（templates/email-member-ack.txt）
    - 2.6 宣布新的提交者 (template/committerAnnounce.txt)
## 3. 推举详细流程
1. 发起社区Private邮件组投票讨论：任何linkis的PPMC成员都可以发起投票讨论，在PPMC发现社区贡献者任何有价值的贡献并取得候选人本人同意后，可以在linkis的private邮件列表发起讨论。讨论邮件里提议者要把候选人的贡献说清楚，并且给出复核对应贡献的地址，便于大家讨论分析。讨论邮件主送private@linkis.apache.org邮箱，讨论将持续至少72个小时，项目组成员，包括mentor们会针对提议邮件充分发表自己的看法。如下是讨论邮件样例：
    ```html 
    [DISCUSS]  YYYYY as an linkis XXXXXX

    I nominate YYYYY as an linkis XXXXXX
 
    Judging from the contributions in recent months, YYYYY has submitted many implementations[1],[2] to the project and improved the management module for the project. During the optimization and improvement period of the project, it is hoped that more people will participate in the actual project optimization and improvement, to let the project more perfect and easier to use.
  
    So I nominated YYYYY as XXXXXX of the linkis project.
  
    1. https://github.com/apache/incubator-linkis/issues/created_by/YYYYY 
    2. https://github.com/apache/incubator-linkis/commits?author=YYYYY 
    ```
    
2. 发起社区Private邮件组投票： 如果讨论邮件在规定时间内没有收到分歧信息，投票发起者需要在linkis的private邮件列表发起Committer或PPMC的选举投票。投票邮件主送private@linkis.apache.org，至少持续72小时，至少要3票+1通过；如果0票或者有1票-1投票票则整个投票失败；如果发起-1投票，投票人需要把打分-1的原因说清楚，便于大家理解和知晓。如下是投票邮件样例：
    ```html
    [VOTE] YYYYY as an linkis XXXXXX
  
    Judging from the contributions in recent months, YYYYY has submitted many implementations[1],[2],[3] to the project and improved the management module for the project. During the optimization and improvement period of the project, it is hoped that more people will participate in the actual project optimization and improvement, to let the project more perfect and easier to use.

    I think making him a XXXXXX will be a recognition of his outstanding work for linkis. So, I am happy to call VOTE to accept YYYYY as an linkis XXXXXX.
  
    Voting will continue for at least 72 hours or until the required number of votes is reached.
 
    Please vote accordingly:
    [ ] +1 approve
    [ ] +0 no opinion
    [ ] -1 disapprove with the reason  
   
    Here are three links to his contributions to linkis:
    1. Issues: https://github.com/apache/incubator-linkis/pulls?q=YYYYY
    2. PRs   : https://github.com/apache/incubator-linkis/issues?q=YYYYY

    3. Others:  https://xxx.com/xxx/xxx/?q=YYYYY
    ```
3. 投票结果反馈：投票邮件结束后，投票发起者需要在第二封[VOTE]邮件里提醒投票结束；同时，投票发起者需要发起邮票总结邮件，总结邮件主送private@linkis.apache.org。如下是投票总结邮件样例：
    ```html
    [RESULTS][VOTE] YYYYY as an linkis XXXXXX

    Hi everyone,

    The vote for "YYYYY as an linkis XXXXXX" has PASSED and closed now.

    The result is as follows:

    3 PPMC  +1 Votes
    - aaa
    - bbb
    - ccc

    Vote thread:
    https://lists.apache.org/thread/aaaaaxxxx

    Then I'm going to invite YYYYY to join us.

    Thanks for everyone's support!   
    ```
   备注：如果是未通过，结果是 "The vote for "YYYYY as an linkis XXXXXX" has FAILED and closed now."
4. 新增PPMC通知邮件：该步骤只针对投票通过的PPMC进行处理，如果选举的是Committer，该步跳过不执行。投票发起者需要向IPMC的private邮件组发送知会邮件，并等待至少72小时；邮件主送private@incubator.apache.org，抄送private@linkis.apache.org；IPMC们会分析合规性，直到没有疑义。如下是新增PPMC通知邮件样例：
    ```html
    [NOTICE] YYYYY for linkis PPMC

    Hi everyone,

    YYYYY has been voted as a new member of the linkis PPMC. 

    The vote thread is at:
    https://lists.apache.org/thread/aaaaaxxxx

    Thanks!
    ```
    
5. 发起邀请邮件：投票总结邮件发出后，投票发起人要给候选人发送邀请邮件。邀请邮件主送被邀请人，抄送private@linkis.apache.org；被邀请的候选人必须通过指定的邮箱地址回复接受或者拒绝该邀请。如下是邀请候选人邮件样例：
    ```html
    [Invitation] Invitation to join Apache linkis as a XXXXXX

    Hi YYYYY,

    In recognition of your contributions to Apache linkis, the linkis PPMC
    has recently voted to add you as a XXXXXX. The XXXXXX role gives
    you access to merge patches into Apache linkis and is also a
    stepping-stone towards membership in the
    Podling Project Management Committee (PPMC). We hope that you accept
    this invitation and continue to help us make Apache linkis better.

    If you'd like to accept, you will need to send an Individual
    Contributor License Agreement (ICLA) to secretary@apache.org, CCing
    private@linkis.apache.org, and request an Apache account name as
    described at http://www.apache.org/dev/new-committers-guide.html if
    you don’t already have one, once you get an account name, or if you
    have one already, please email it to me.

    With the expectation of your acceptance, welcome!

    The Apache linkis PPMC
    ```
6. 接受邀请后处理：创建Apache帐号并将候选人帐号加入项目。候选人接受邀请后，如果候选人没有apache邮箱帐号，投票发起人需要协助候选人按照指引创建好apache帐号。在签署ICLA时，候选人需要在“notify project:”栏目写上Apache linkis项目名，这样候选人帐号才会被Apache加入对应项目人员名单，如果候选人没有加入项目，投票发起人需要向Mentors申请添加项目组成员，开通apache项目的权限帐号，确认候选人的Apache帐号已加入项目的地址：http://people.apache.org/phonebook.html?podling=linkis .

    
7. 向社区发布申明邮件：如上步骤都完成后，投票发起人向dev@linkis.apache.org邮件组发通知邮件。如下是通知邮件样例：
    ```html
    [ANNOUNCE] New XXXXXX: YYYYY

    Hi everyone,

    The Project Management Committee(PMC) for Apache linkis has invited YYYYY to become a XXXXXX and we are pleased to announce that he has accepted.

    YYYYY is being active in the linkis community, and we are glad to see his more interactions with the community in the future.

    Welcome YYYYY, and please enjoy your journey.:)

    Thanks!
    ```
  到此，整个流程才算走完，候选人才正式的成为项目的Committer或者PPMC。
