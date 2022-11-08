---
title: How to Vote New Committer/PPMC
sidebar_position: 6
---
> Introduce the selection requirements and process for Committer and PPMC. Official guidelines can be found at: https://incubator.apache.org/guides/ppmc.html

## 1. Candidate requirements
When voting, all PPMC members need to decide for themselves whether candidates should be approved as committers. This can be done by searching the [mailing list](https://lists.apache.org/list?dev@linkis.apache.org)/[ISSUES/PR](https://github.com/apache/incubator-linkis/issues )/[Official Website Documentation Contribution](https://github.com/apache/incubator-linkis-website) to understand how candidates interact with others, and the contributions they make (code or documentation patches, suggestions, participation in Q&A) Wait).

Below are some points to consider when evaluating candidates for commitment eligibility.
1. Ability to develop collaboration with the community?
   - Interaction via email
   - Participate in certain group voting or decision-making discussions
2. How does the community evaluate it?
   - Is it helpful to answer questions asked on the mailing list
   - Shows a helpful attitude and respects the ideas of others
3. How to evaluate the content of the commitment work?
   - Completion of tasks according to the project task plan
   - Attitude and process for handling difficult issues
   - How to help with less fun tasks
4. How are personal skills/competencies assessed?
   - Have a solid general understanding of the project
   - Quality of discussions in emails
   - Are their patches (if applicable) easy to apply with just a cursory review
5. PPMC competency requirements
   - Have a more comprehensive understanding of the project
   - Ability to control project progress and version quality
   - Actively participate in/lead the construction of the community, promote the healthy development of the community, and take the initiative to undertake the responsibility and governance of the project
   - Respond proactively to questions raised by the ASF Board and take necessary action
   - Familiar with the release process of ASF

In most cases, new PPMC members are nominated from the Committer team. But it is also possible to become a member of the PPMC directly, as long as the PPMC agrees to the nomination and is confident that the candidate is ready. This can be demonstrated, for example, by the fact that he/she was an Apache member, an Apache official, or a PPMC member of another project.

## 2. Detailed process of recommendation

:::tip
${Candidate Name}: represents the electee eg: Joe Bloggs

${Committer/PPMC}: represents the type of Committer/PPMC
:::

### 2.1 Initiate community mail discussion

>Any linkis PPMC member can initiate a voting discussion. After PPMC finds any valuable contributions from community contributors and obtains the consent of the candidate, they can initiate a discussion on the linkis private mailing list. In the discussion email, the proposer should clarify the candidate's contribution and give the address for reviewing the corresponding contribution, so that everyone can discuss and analyze. The discussion email should be sent to private@linkis.apache.org. The discussion will last for at least 72 hours. The project team members, including the mentors, will fully express their views on the proposed email.

Here is a sample discussion email:

```html
To: private@linkis.apache.org
Subject: [DISCUSS] ${Candidate Name} as an Linkis ${Committer/PPMC} candidate
Content:

Hi all:
    I nominate ${Candidate Name} as an Linkis ${Committer/PPMC} candidate
 
    Judging from the contributions in recent months, ${Candidate Name} has submitted many implementations[1],[2] to the project and improved the management module for the project. During the optimization and improvement period of the project, it is hoped that more people will participate in in the actual project optimization and improvement, to let the project more perfect and easier to use.
  
    So I nominated ${Candidate Name} as ${Committer/PPMC} of the Linkis project.
  
    1. https://github.com/apache/incubator-linkis/issues/created_by/${Candidate Githubid} 
    2. https://github.com/apache/incubator-linkis/commits?author=${Candidate Githubid} 
    3. https://lists.apache.org/list?dev@linkis.apache.org?xxxx
    4. ....
Thanks!
````
    
### 2.2 Initiate a community mail poll
>If the discussion email does not receive any disagreement information within the specified time, the vote initiator needs to initiate a Committer or PPMC election vote on the linkis private mailing list. The main voting email is sent to private@linkis.apache.org, which lasts for at least 72 hours, and requires at least 3 votes + 1 to pass; if there is 1 -1 vote, the entire vote will fail; if a -1 vote is initiated, the voter needs to put -1 The reasons are clearly stated so that everyone can understand and understand.

Here is a sample poll email:
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
````
### 2.3 Announcement of voting results
>After the voting email ends, the voting initiator needs to remind the voting end in the second [VOTE] email; at the same time, the voting initiator needs to issue a stamp to announce the voting result and send it to private@linkis.apache.org.

Here is an example of voting results:
```html
To: private@linkis.apache.org
Subject: [RESULTS][VOTE] ${Candidate Name} as an Linkis ${Committer/PPMC}
Content:

Hi all:
    The vote for "${Candidate Name} as an Linkis ${Committer/PPMC}" has PASSED and closed now.

    The result is as follows:

    3 PPMC +1 Votes
    - aaa
    - bbb
    - ccc

    Vote thread:
    https://lists.apache.org/thread/xx

    Then I'm going to invite ${Candidate Name} to join us.

    Thanks for everyone's support!
Thanks!
````
**Note: If it is not passed, the result is "The vote for "${Candidate Name} as an Linkis ${Committer/PPMC}" has FAILED and closed now."**
   
### 2.4 Added PPMC notification email
> This step is only for the new PPMC election process. If the Committer is elected, this step is skipped and not executed.
> The initiator of the vote needs to send a notification email to the IPMC private@incubator.apache.org mailing group and wait for at least 72 hours;
> Email to private@incubator.apache.org, cc private@linkis.apache.org; IPMCs will analyze compliance until there is no objection.

Send to IPMC private@incubator.apache.org cc private@linkis.apache.org . There is a 72-hour grace period between the notification by the PPMC to the IPMC and the formal invitation by the PPMC to the proposed member

The following is a sample notification email for adding a PPMC:
```html
To: private@incubator.apache.org
Cc: private@linkis.apache.org
Subject: [NOTICE] ${Candidate Name} for Linkis PPMC
Content:
Hi everyone,

    ${Candidate Name} has been voted as a new member of the Linkis PPMC.

    The vote thread is at:
    https://lists.apache.org/thread/xx

Thanks!
````

After 72 hours, if the IPMC has no objection to the nomination (which in most cases will not), an invitation may be sent to the candidate.

### 2.5 Send email invitations to candidates
> After announcing the voting results, the voting initiator should send an invitation email to the candidates. The invitation email is sent to the invitees, cc private@linkis.apache.org; the invited candidates must reply to accept or reject the invitation through the specified email address.

The following is a sample invitation email: Take the invitee Joe Bloggs as an example

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
    tend to make one even more committed. You will
    probably find that you spend more time here.
    
    Of course, you can decline and instead remain as a
    contributor, participating as you do now.
    
    A. This personal invitation is a chance for you to
    accept or decline in private. Either way, please
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
````

### 2.6 Invitation acceptance process
>Requires candidates for processing

The new Committer should reply to `private@linkis.apache.org` (select `reply all`) and express his/her acceptance of the invitation.
The invitation will then be considered accepted by the project's PPMC. Of course, new committers can also choose to decline the invitation.

Once the invitation is accepted, new submitters must take the following steps:
- Subscribe to `dev@linkis.apache.org`. Usually this is already done.
- Choose an Apache ID that has not been used [apache committers list page](http://people.apache.org/committer-index.html).
- Download [ICLA](https://www.apache.org/licenses/icla.pdf org/licenses/cla-corporate.pdf) is expected).
- After filling in the correct information in `icla.pdf` (or `ccla.pdf`), print it, sign it by hand, scan it into PDF, and send it as an attachment to [secretary@apache.org] (email: secretary@apache.org). (If electronic signatures are preferred, follow the steps on [this page](http://www.apache.org/licenses/contributor-agreements.html#submitting))
- PPMC will wait for the Apache Secretary to confirm ICLA (or CCLA) filing. New submitters and PPMC will receive the following email:


```html
Dear ${Candidate Name},

This message acknowledges receipt of your ICLA, which has been filed in the Apache Software Foundation records.

Your account has been requested for you and you should receive email with next steps
within the next few days (can take up to a week).

Please refer to https://www.apache.org/foundation/how-it-works.html#developers
for more information about roles at Apache.
````

In the unlikely event that the account has not been processed, PPMC members should contact the project [Apache Incubator's VP](https://www.apache.org/foundation/), which can be accessed through the [Apache Account Submission Helper Form](https://whismy. apache.org/officers/acreq) request.

In a few days, new committers will receive an email confirming account creation with the title `Welcome to the Apache Software Foundation (ASF)!`.

After receiving the notification email that the account was created successfully, you can reply to the previous invitation email again to inform Linkis PPMC that your Apache Id account has been created, and request that your Apache Id be added to Linkis' official submitter list.
(Inform the PPMC responsible for nominating you to add the new committer to the official committer list via the [Roster](https://whismy.apache.org/roster/committee/linkis) page)

### 2.7 Setting up apache id and development environment
>Requires candidates for processing

- Enter [Apache Account Utility Platform] (https://id.apache.org/), create a password, set up a personal email address (`forwarding email address`) and a GitHub account (`Your GitHub Username`). 
- If you want to use `xxx@apache.org` mail service, please refer to [here](https://infra.apache.org/committer-email.html). Gmail is recommended as this forwarding mode is not easily found in most email service setups.
- Follow【Authorize GitHub 2FA wiki】(https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/) to enable two-factor authorization (2FA) in [Github ](http://github.com/). When you set 2FA to "off", it will be delisted from the corresponding Apache committer write permission group until you set it again. (**Note: pay attention to recovery codes like passwords!**)
- Use the [GitBox Account Linking Utility] (https://gitbox.apache.org/setup/) to obtain the write permission of the Linkis project.
- [linkis-website](https://linkis.apache.org/team) related page update


For detailed instructions, see [PPMC/Committer Related Permission Configuration](ppmc-related-permission-configuration.md)

If you want to make a public appearance in the Apache GitHub organization, you need to go to the [Apache GitHub people page](https://github.com/orgs/apache/people),
Search for yourself, then select `Organization visibility` for `Public`.

## 3 Post announcement email
>After the above steps are completed, the voting initiator will send a notification email to the dev@linkis.apache.org mailing group.

The following is a sample notification email:
```html
To: dev@linkis.apache.org
Subject: [ANNOUNCE] New ${Committer/PPMC}: ${Candidate Name}
Content:
Hi all:
     Hi everyone,

     The Project Management Committee(PMC) for Apache Linkis has invited ${Candidate Name} to become a ${Committer/PPMC} and we are pleased to announce that he has accepted.

     ${Candidate Name} is being active in the Linkis community, and we are glad to see his more interactions with the community in the future.

     Welcome ${Candidate Name}, and please enjoy your journey. :)

Thanks!
The Apache Linkis(Incubating) PPMC
````
   
At this point, the whole process is over, and the candidate officially becomes the Committer or PPMC of the project.

## 4 Workflow summary

1. Send emails with ICLA attachments

2. 1-2 days after receipt of the reply email, will be processed within 5 working days

3. 2-Receive an Apache account creation success email within 5 days

4. Use the email prompt to retrieve or reset your password

5. Connect your Github account to id.apache.org or whimsy.apache.org

6. Enable Github 2FA authentication

7. Use gitbox.apache.org to get repository write access