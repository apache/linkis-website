---
title: PPMC/Committer Related Permission Configuration
sidebar_position: 8
---

> PPMC (Podling Project Management Committee)/Committer member, bind github account process/and main email subscription

## 1. Binding github account process

### 1.1 Process overview
1. Associate the apache account with the github account
2. Securely enable 2FA authentication for github personal accounts
3. Open permission application on gitbox

### 1.2 Associate apache Id with github account
**Way 1**
Log in to https://id.apache.org and set the [Your GitHub Username] field in LDAP to your own GitHub ID. Enter your password Click submit changes.


![Open-Apache's-GitHub-warehouse1](https://user-images.githubusercontent.com/29391030/153324492-cc4e4348-5e4b-450f-a23f-6c208e1a26fb.png)

**Way 2**
Visit https://whismy.apache.org/roster/committer/xxx (replace with your apache id) to modify the corresponding data.

### 1.3 Enable 2FA authentication (login token)
>github personal account security Enable 2FA authentication (login token)

Two-factor authentication (2FA) refers to a method of authenticating users by combining passwords and physical items (credit cards, SMS mobile phones, tokens, or biometric indicators such as fingerprints). To keep the committer account secure, we require you to enable 2FA on GitHub to authenticate logged in users and contribute code. For details, please refer to 2FA.
You need to install TOTP software on the mobile phone, search for TOTP in the application market (Microsoft Authenticator is available for Android), and IOS Apple mobile phone personally recommends downloading the authy token software, which can be backed up in the cloud by binding the mobile phone. Mobile SMS is also supported, but the github configuration page does not have a mobile phone number +86 in China by default. For the front-end code bypass when you need to modify the configuration, see https://www.programmerall.com/article/5457100195/ .

step1 Visit the personal account security settings page https://github.com/settings/security and select the fourth item [Account security]

![open-Apache's-GitHub-warehouse4](https://user-images.githubusercontent.com/29391030/153325044-4b68a5c0-959a-4077-abdf-5ad5e67aa26a.png)

step2 Select【Set up using an app】Next step

![open-Apache's-GitHub-warehouse5](https://user-images.githubusercontent.com/29391030/153325063-ea61ad8c-cbbc-4053-8a37-35d315dc3b00.png)

Step3 enter the qr code binding page, scan the code with the pre-downloaded totp type app (such as Google identity authenticator、Microsoft Authenticator), and input the 6 displayed on the mobile phone as the token

![open-Apache's-GitHub-warehouse6](https://user-images.githubusercontent.com/29391030/153325084-b57d3647-a6a5-4e15-9e9c-3c2f632c0655.png)

step4 Download recover codes, then enter the success page and click done to bind successfully

![open-Apache's-GitHub-warehouse7](https://user-images.githubusercontent.com/29391030/153325124-a523bd8c-f6d5-44ce-8372-3804d9c693c6.png)

Notice
When 2FA verification is turned on, you need to use the username/password + mobile phone authentication code to log in to GitHub.
When 2FA authentication is enabled, a private access token needs to be generated for git submission and other operations. At this point, you will use username + private access token instead of username + password to submit code (subsequent configuration as needed).
For details, see Creating a Private Token.

If 2FA is turned off in the future, you will be delisted from this project, and you will not be able to access our repository and the fork repository from our private repository.

### 1.4 Open permission application on gitbox
step1 Visit https://gitbox.apache.org/setup/ to authorize the associated apache account

![open-Apache's-GitHub-warehouse8](https://user-images.githubusercontent.com/29391030/153325227-f917e9c3-16ea-42d4-8432-4b63fd5849da.png)

step 2 Authorize the associated github account

![open-Apache's-GitHub-warehouse9](https://user-images.githubusercontent.com/29391030/153325245-e2eea319-278f-4254-afb8-7e1ec418f004.png)

step3 mfa status check

![open-Apache's-GitHub-warehouse10](https://user-images.githubusercontent.com/29391030/153325267-71761576-9467-49a1-809b-2a5c0fc1a681.png)

Notice
After successful execution, the following figure is shown. After the success, the write permission will be activated within about an hour. If MFA Status says "User not a member of the ASF GitHub organisation. Please make sure you are a part of the ASF Organisation on GitHub and have 2FA enabled. Visit id.apache.org and set your GitHub ID to be invited to the org .” Please check whether [Associating apache and github accounts] is completed/2FA is enabled, if it is normal, please verify it later, because there is a delay in acquiring MFA status for new members.

![open-Apache's-GitHub-warehouse11](https://user-images.githubusercontent.com/29391030/153325293-654c1cd4-7b2c-44be-94b0-9520e2ea05c1.png)

After the successful invitation, the personal github account information can be seen that the affiliated organization has apache

![open-Apache's-GitHub-warehouse3](https://user-images.githubusercontent.com/29391030/153324664-6633b5be-a5b5-400a-b9db-685c4eeab8ad.png)

### 1.5 Related links documentation
[github uses TOTP to enable 2FA authentication] https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication

[Create a private token] https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

[Introduction to gitbox] https://gitbox.apache.org

[apache and github] https://infra.apache.org/apache-github.html

【git github &gitbox 】https://cwiki.apache.org/confluence/display/INFRA/Git%2C+GitHub+and+Gitbox


## 2. Configure emails and email subscriptions

### 2.1 Associate your own mailbox
>See https://infra.apache.org/committer-email.html for details
- Method 1: Log in to https://id.apache.org/, fill in your own email address in the `Forwarding email address` field (usually the address provided in the Independent Contributor License Agreement (ICLA) you provided), Save changes
- Method 2: Log in to https://whismy.apache.org/roster/committer/__self__ and double-click `Email forwarded to` to edit

### 2.2 Configure forwarding address
You cannot use your Apache email address directly. You must set up forwarding for this address. When writing to your ASF address, the email will be forwarded to your forwarding address. When you reply, the message goes back through the ASF system, so people you write with will see it's coming from your ASF address
. Configure in your email environment
```shell script
Server: mail-relay.apache.org Port: 587 (STARTTLS), 465 (SSL) User/Pass: {Your LDAP credentials}
````
![image](/img/community/mail-relay.png)

### 2.2 Subscribe to related mailing lists
As a member of PPMC, you need to actively participate in community construction, promote the healthy development of the community, undertake the responsibility and governance of the project, and this part of the work is often carried out by email (discussion/voting/answering questions, etc.),
Every PPMC member is required to subscribe to the following mailing lists:

|Name|Description|Subscribe Mail|Unsubscribe Mail|Mail Archive|
|:-----|:-------|:------|:-------|:-----|
| [dev@linkis.apache.org](mailto:dev@linkis.apache.org) | Linkis community activity information, project discussion announcements, etc. | [Subscribe](mailto:dev-subscribe@linkis.apache.org) | [unsubscribe](mailto:dev-unsubscribe@linkis.apache.org) | [archive](http://mail-archives.apache.org/mod_mbox/linkis-dev) |
| [private@linkis.apache.org](mailto:private@linkis.apache.org) |This mailing list is private, visible inside PPMC, mainly for internal discussions | [Subscribe](mailto:private-subscribe@ linkis.apache.org) | [unsubscribe](mailto:private-unsubscribe@linkis.apache.org) | [archive](http://mail-archives.apache.org/mod_mbox/linkis-private) |
| [general@incubator.apache.org](mailto:general@incubator.apache.org) | Public emails from the incubator community, mainly related to incubation projects | [Subscribe](mailto:general-subscribe@incubator.apache. org) | [unsubscribe](mailto:general-unsubscribe@incubator.apache.org) | [archive](http://mail-archives.apache.org/mod_mbox/incubator-general) |

Subscription operations can be found in the guide [Subscribe to the mailing list](how-to-subscribe.md)
:::caution note
Note: private@linkis.apache.org subscriptions need to be reviewed by the mail moderator (shaofengshi@apache.org), so please attach personal name information to the content of the mail when subscribing for moderator review.
:::
If the above subscription is unsuccessful, you can try to use the web-side tool: https://whismy.apache.org/committers/subscribe.cgi

![image](/img/community/subscribe.png)


Mailing list subscriptions, PPMC members can view here: https://whismy.apache.org/roster/ppmc/linkis