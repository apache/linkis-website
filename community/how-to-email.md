---
title: How to Use Email
sidebar_position: 1.1
---

> Introduces mailing list usage guidelines and reference examples

To subscribe to the mailing list, please refer to this [Subscription Guidelines](how-to-subscribe.md)

Linkis' archived mail can be viewed here [archived mail](https://lists.apache.org/list.html?dev@linkis.apache.org)

:::caution Notice
Since mailbox 163/sina replies with Chinese "reply" by default, it will cause the apache mail to be recognized as a new thread mail.
The following takes 163 mailboxes as an example:
:::

![Email reply](/Images/Architecture/email-reply.png)

**Therefore, you need to modify the general settings of the mailbox**

![mailbox-settings](/Images/Architecture/mailbox-settings.png)

## 1. Themes
The subject of the email can be roughly divided into the following types
- **\[DISCUSS]** Discussion on a feature/function/logic modification/CI/CD, which can be implementation/design/optimization suggestion, etc.
- **\[PROPOSAL]** Proposals, such as adding/removing certain features, are not much different from \[DISCUSS]
- **\[VOTE]** Vote for changes/elect Committer/elect new PPMC members, etc., such as version release, each version will be voted on in the community dev mailing list; you can also choose multiple options ,Poll.
- **\[ANNOUNCE]** Announce the completion of the release of the new version, announcing the new Committer/PPMC elected, etc.
- **\[NOTICE]** Mainly used to notify some temporary announcements, etc., such as the community sandbox environment is suspended for maintenance/upgrade, the web official website is abnormally unavailable, etc.; as well as online and offline weekly meetings/exchange meetings and various Event information announcements, etc.
- **\[HELP]** Ask for help, because there are many git code notifications, and sometimes it is impossible to check them in time; in addition, github network access is limited, and some students may not be able to submit issues through github smoothly. Initiated by email, it is easier to identify and be perceived.
- **\[VOTE]\[RESULT]** Announce the results of the release vote



## 2. Mail specifications

** General**
- Whenever possible do not send plain HTML messages, but plain text. If you use QQ mailbox, its email content is in html format by default. Please switch to plain text text format when writing. For detailed switching instructions, see the appendix of this article.
- Developers/community users/PPMC members initiate email discussions/needs for help/notifications for the content of the above scenarios, please send them to dev@linkis.apache.org
- Please put the corresponding type prefix before the email subject: such as `[HELP] XXXXXXX`, `[DISCUSS] XXXXXXX`

For more information, please refer to the official [Mail Etiquette](https://infra.apache.org/contrib-email-tips) https://infra.apache.org/contrib-email-tips

** Reply **

- At the end of the email content, it is best to bring your own signature (English)
- If it is a reply to a voting email, it is best to bring a binding mark (votes cast by PPMC/IPMC members are binding, you can add a binding suffix such as: `+1 approve(binding)`;
Votes cast by ordinary members, non-binding, can be added with non-binding suffix such as: `+1 approve(non-binding)` )
- When some mailboxes such as: 163/sina reply to emails, the default is to bring the Chinese `reply`, which will cause the apache email to be recognized as a new thread email
For example: https://lists.apache.org/thread/otfftdtbq0z9xsddnl7wb8tgzkhqcnof, the threads of the entire mail cannot be connected in series,
Therefore, it is necessary to modify the configuration of the email reply. For detailed switching guidelines, see the appendix of this article.


** \[DISCUSS/Proposal] Mail **

- Title `[DISCUSS][module name] XXXX` (if it is a specific module, it is recommended to bring the module name)
- Generally, create a corresponding issue on Github's [issues column](https://github.com/apache/incubator-linkis/issues), and then initiate an email discussion
- Briefly describe clearly the content of the discussion/proposal (eg: background/what problem you want to solve/how to solve it)
- Modules involved (if one or two specific modules are involved)
- Graphical and textual information such as relevant design instructions can be placed in the corresponding issue for easy modification, and the link can be quoted in the email.
- The corresponding Chinese translation can be attached

** \[HELP] Mail**
- Please confirm [QA documentation](https://docs.qq.com/doc/DSGZhdnpMV3lTUUxq)/[issues](https://github.com/apache/incubator-linkis/issues) and [archived mail]( Is this question not included in https://lists.apache.org/list.html?dev@linkis.apache.org)
- Detailed description of the problems encountered
- How to reproduce this problem
- You can create a corresponding issue on git
- The corresponding Chinese translation can be attached

## 3. Sample reference

** \[DISCUSS/Proposal] Example**
- k8 is supported discussion: https://lists.apache.org/thread/3o61h3439sjnqt8wvmdolg90o635w303
- Some feature change discussion email example: https://lists.apache.org/thread/lxdsvo2q0gbzllx04wkq547qxlgp5k5z
- Sample proposal email for community building: https://lists.apache.org/thread/t3cbmrzcpgv9j39f5c3zz8xjfdd3fzsv

** \[VOTE] Example**
- Release voting for new versions: https://lists.apache.org/thread/9nhsj61oo338g0oql9rlrnfh8jwx64cl

** \[ANNOUNCE] Example**

- The new version is released: https://lists.apache.org/thread/dmdtgrgozjn1m1mz6ss7999qq387mq0w
- New committer elected: https://lists.apache.org/thread/s8p9nr9gsqxl2tt7o3vxo3jxzrzjm5vf
- New PMC elected: https://lists.apache.org/thread/gqrczn8pw4tq3g4mwh1mf6s0k6r206jn

** \[NOTICE] Example**

- Notice of regular meeting: https://lists.apache.org/thread/2wtn55wkzh27373k9y8qq09843xs9oxn
- Service status notification: https://lists.apache.org/thread/bzsc3mnkcl5gz4h3hp9qh9ofpykbr28f


** \[HELP] Example**
- For help: https://lists.apache.org/thread/br03lmd3n73lbc6n0lzcmqjbvy960wvf

## 4. Mail usage of PPMC

From the determination of a version to the release, it may involve specific common scenarios of using email
1. The new version needs to organize PMC and developers to discuss, record the minutes of the meeting, determine the function points of this version, the general release time of the plan, and the release manager of this time, etc., and send the meeting minutes private@linkis.apache.org Email list.
2. For the scope of the feature list of the new version, you need to send a voting email to dev@linkis.apache.org, and 3+ PMCs are required to agree and the yes votes are greater than the negative votes.
3. For the weekly regular meeting hosted, the meeting invitation reminder email needs to be released before the meeting / the meeting minutes email should be sent to the dev@linkis.apache.org mailbox after the meeting
4. New committer/ppmc votes need to be sent to private@linkis.apache.org. See https://community.apache.org/newcommitter.html for the new committee/ppmc selection process


## 5. How to reply to version release voting emails
If a release vote is initiated, after verification (see [How to verify](how-to-verify.md) for the detailed verification process), you can refer to this reply example for email reply

If you initiate a posting vote, you can refer to this response example to reply to the email after verification
<font color="red">
When replying to the email, you must bring the information that you have checked by yourself. Simply replying to `+1 approve` is invalid.

PPMC/IPMC member voting is best with the binding suffix, indicating a binding vote, which is convenient for counting voting results
</font>

Non-PPMC/Non-IPMC member
```html
+1 (non-binding)
I checked:
     1. All download links are valid
     2. Checksum and signature are OK
     3. LICENSE and NOTICE are exist
     4. Build successfully on macOS(Big Sur)
     5.  
````

PPMC/IPMC member
```html
+1 (binding)
I checked:
     1. All download links are valid
     2. Checksum and signature are OK
     3. LICENSE and NOTICE are exist
     4. Build successfully on macOS(Big Sur)
     5.  
````

## 6. Appendix
** QQ mailbox switch to plain text format **

![image](https://user-images.githubusercontent.com/11496700/149449779-d0116bb1-de9e-4cc4-98fb-af3327b15c09.png)


** Email configuration reply default subject keywords **
Chinese `Reply: `There will be problems
![Email reply](/Images/Architecture/email-reply.png)

Modify general mailbox settings
![mailbox-settings](/Images-zh/Architecture/mailbox-settings.png)