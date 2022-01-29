---

Title: how to join a development group

sidebar_ position: 1.0

---

>Introduce the requirements and process of joining linkis candidates



For details of the format of candidate application email, please refer to [application email] here（ https://linkis.apache.org/zh-CN/development/how-to-vote-a-committer-ppmc )

## 1. Applicant review specification

When voting, all PMC members need to decide whether to approve the candidate as the submitter. They may search mailing lists and JIRA to find out how candidates interact with others and their contributions (code or document patches, suggestions, participation in conversations).

Here are some key points to consider when assessing a candidate's commitment qualifications.

1. How do we evaluate the ability to cooperate with peers?
    - 1.1 through their interaction via email.
    - 1.2 through how they respond to criticism.
    - 1.3 through how they participate in the group decision-making process.

2. How do we evaluate the ability to become a mentor?
    - 2.1 through their clarity and their willingness to identify and even create appropriate background materials.
    
3. How do we evaluate the community?
    - 3.1 are they helpful in answering the questions raised in the mailing list?
    - 3.2 do they show a helpful attitude and respect the ideas of others?
    
4. How do we evaluate the commitment?
    - 4.1 completion of tasks according to the time given to the project.
    - 4.2 how do they stick to the process through difficult problems.
    - 4.3 through how they help complete less interesting tasks.

5. How do we evaluate personal skills/abilities?
    - 5.1 have a solid overall understanding of the project.
    - 5.2 quality discussed in email.
    - 5.3 whether their patches (if applicable) are easy to apply requires only a rough review.



## 2. Approval process

This section describes the process of a typical linkis project processing votes to add new submitters

1. General
    - 1.1 initiate voting (templates/committervote.txt)
    - 1.2 close voting
    - 1.3 if the result is positive, please invite a new submitter (templates/committerinvite.txt)

2. Invitation process
    - 2.1 accept submitters (templates/committeraccept.txt)
    - 2.2 wait until we see the receipt recording cla
    - 2.3 request to create submitter account (template/committercreate. Txt)
        ```html
        2.3.1 wait until the root is finished
        2.3.2 PMC chairman enables SVN and other access
        2.3.3 add the submitter to the corresponding group in JIRA and cwiki
        ```
    - 2.4 notify the submitter of completion (template/committerdone.txt)
    - 2.5 if the submitter is also a PMC member, the PMC chairman will send an email to board @ requesting confirmation of the new PMC member (templates/email-member-ack.txt)
    - 2.6 announce new submitters (template / committerannouncement.txt)
 
 ## 3. Detailed selection process

1. Initiate community private email group voting discussion: any PPMC member of linkis can initiate voting discussion. After PPMC finds any valuable contribution of community contributors and obtains the consent of the candidate, it can initiate discussion on the private email list of linkis. In the discussion email, the proposer should clarify the candidate's contribution and give the address of the corresponding contribution for review, so as to facilitate discussion and analysis. Discussion mail delivery private@linkis.apache.org Email, the discussion will last for at least 72 hours, and project team members, including mentors, will fully express their views on the proposed email. The following is a sample discussion email:

```html

[DISCUSS] YYYYY as an linkis XXXXXX

    I nominate YYYYY as an linkis XXXXXX

    Judging from the contributions in recent months, YYYYY has submitted many implementations[1],[2] to the project and improved the management module for the project. During        the optimization and improvement period of the project, it is hoped that more people will participate in the actual project optimization and improvement, to let the project      more perfect and easier to use.

    So I nominated YYYYY as XXXXXX of the linkis project.

    one https://github.com/apache/incubator-linkis/issues/created_by/YYYYY
    two https://github.com/apache/incubator-linkis/commits?author=YYYYY

    ```



2. Initiate community private email group voting: if the discussion email does not receive disagreement information within the specified time, the voting initiator needs to initiate the election voting of committee or PPMC on the private email list of linkis. Main delivery of voting mail private@linkis.apache.org , lasting at least 72 hours, at least 3 votes + 1 pass; If there are 0 votes or 1-1 votes, the whole voting fails; If A-1 vote is initiated, voters need to clarify the reasons for scoring-1 so that everyone can understand and know. The following is a sample voting email:

    ```html

    [VOTE] YYYYY as an linkis XXXXXX

    Judging from the contributions in recent months, YYYYY has submitted many implementations[1],[2],[3] to the project and improved the management module for the project.           During the optimization and improvement period of the project, it is hoped that more people will participate in the actual project optimization and improvement, to let the       project more perfect and easier to use.

    I think making him a XXXXXX will be a recognition of his outstanding work for linkis. So, I am happy to call VOTE to accept YYYYY as an linkis XXXXXX.

    Voting will continue for at least 72 hours or until the required number of votes is reached.

    Please vote accordingly:
    [ ] +1 approve
    [ ] +0 no opinion
    [ ] -1 disapprove with the reason

    Here are three links to his contributions to linkis:
    1. Issues: https://github.com/apache/incubator-linkis/pulls?q=YYYYY
    2. PRs : https://github.com/apache/incubator-linkis/issues?q=YYYYY
    3. Others: https://xxx.com/xxx/xxx/?q=YYYYY

```

3. Feedback of voting results: after the voting email is completed, the voting initiator needs to remind the end of voting in the second [vote] email; At the same time, the voting initiator needs to launch a stamp summary email, which is sent by the main sender private@linkis.apache.org 。 The following is a sample voting summary email:

    ```html

    [RESULTS][VOTE] YYYYY as an linkis XXXXXX

    Hi everyone,

    The vote for "YYYYY as an linkis XXXXXX" has PASSED and closed now.

    The result is as follows:

    3 PPMC +1 Votes
    - aaa
    - bbb
    - ccc

    Vote thread:
    https://lists.apache.org/thread/aaaaaxxxx

    Then I'm going to invite YYYYY to join us.

    Thanks for everyone's support!
    ```

  Note: if it fails, the result is "the vote for" yyyyy as an linkis XXXXXX "has failed and closed now."

4. Add PPMC notification email: this step is only for the PPMC that has passed the vote. If the election is a committee, this step will be skipped and will not be executed. The voting initiator needs to send a notification email to the private email group of IPMC and wait for at least 72 hours; Mail delivery private@incubator.apache.org , CC private@linkis.apache.org ； IPMC will analyze the compliance until there is no doubt. The following is an example of a new PPMC notification email:

```html
    [NOTICE] YYYYY for linkis PPMC

    Hi everyone,

    YYYYY has been voted as a new member of the linkis PPMC.

    The vote thread is at:
    https://lists.apache.org/thread/aaaaaxxxx

    Thanks!
    ```

5. Initiate invitation email: after the voting summary email is sent, the voting initiator shall send invitation email to the candidate. The invitation email is sent to the invitee with a CC private@linkis.apache.org ； The invited candidate must reply to accept or reject the invitation through the specified email address. The following is a sample email inviting candidates:

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
    Contributor License Agreement (ICLA) to secretary@apache.org , CCing
    private@linkis.apache.org , and request an Apache account name as
    described at http://www.apache.org/dev/new-committers-guide.html if
    you don’t already have one, once you get an account name, or if you
    have one already, please email it to me.

    With the expectation of your acceptance, welcome!

    The Apache linkis PPMC

    ```

6. Processing after accepting the invitation: create an Apache account and add the candidate account to the project. After the candidate accepts the invitation, if the candidate does not have an Apache email account, the voting initiator needs to assist the candidate to create an Apache account according to the guidelines. When signing icla, the candidate needs to write the name of Apache links project in the "notify project:" column, so that the candidate account can be added to the list of corresponding project personnel by Apache. If the candidate does not join the project, the voting initiator needs to apply to mentor to add project members and open the permission account of Apache project, Confirm that the candidate's Apache account has been added to the project address: http://people.apache.org/phonebook.html?podling=linkis .

7. Send a statement email to the community: after the above steps are completed, the voting sponsor shall send a message to the community dev@linkis.apache.org Send notification email to the mail group. The following is a sample notification email:

    ```html
    [ANNOUNCE] New XXXXXX: YYYYY

    Hi everyone,

    The Project Management Committee(PMC) for Apache linkis has invited YYYYY to become a XXXXXX and we are pleased to announce that he has accepted.

    YYYYY is being active in the linkis community, and we are glad to see his more interactions with the community in the future.

    Welcome YYYYY, and please enjoy your journey.:)

    Thanks!
    ```

  YYYYY is being active in the linkis community, and we are glad to see
