---
Title: PPMC Members Binds Github Account
sidebar_ position: 8
---
> PPMC (Podling Project Management Committee) member, bind github account process

## Process Overview
1. Associate Apache account with GitHub account
2. Open 2FA authentication for GitHub personal account
3. Open permission application on gitbox
## 1. Associate Apache ID with GitHub account
### Mode 1
Landing https://id.apache.org The [Your GitHub Username] field in LDAP is set to its own GitHub ID. Enter your password and click Submit changes. You will receive an invitation to join the organization of Apache organization on GitHub within four hours. Your GitHub account email should receive an email with the title "ASF gitbox".

If the invitation has expired (7 days later), you can try both method 1 and method 2 again. See if you can receive the invitation email to join ASF org again in the email associated with the GitHub account (search "ASF gitbox").

If you haven't received the invitation, try the following:
1. Delete the GitHub accounts in methods 1 and 2 first;
2. Wait for 1 scanning cycle (4 hours to be safe), and then add back the GitHub account;
3. Then wait another 4 hours to see if the invitation email to join ASF org can be received again in the email associated with the GitHub account (search the email title "ASF gitbox").
 
![Open-Apache's-GitHub-warehouse1](https://user-images.githubusercontent.com/29391030/153324492-cc4e4348-5e4b-450f-a23f-6c208e1a26fb.png)

### Mode 2
visit https://whimsy.apache.org/roster/committer/xxx (replace with your Apache ID) modify the corresponding data, and you will receive an invitation to join Apache's GitHub organization within four hours.

Check the invitation email of GitHub organization that invites you to join Apache. The invitation is valid for 7 days

![open-Apache's-GitHub-warehouse2]( https://user-images.githubusercontent.com/29391030/153324641-351cf239-c0ff-4fa6-a9f9-46991d4b11fd.png )

After successful invitation, you can see that the organization you belong to has Apache based on your GitHub account information

![open-Apache's-GitHub-warehouse3]( https://user-images.githubusercontent.com/29391030/153324664-6633b5be-a5b5-400a-b9db-685c4eeab8ad.png )

## 2. Enable 2FA authentication (login token) for GitHub personal account
Two factor authentication (2FA) refers to the method of authenticating users by combining password and physical conditions (credit card, SMS mobile phone, token or fingerprint and other biometrics). To ensure the security of the submitter's account, we need you to enable 2FA on GitHub to authenticate the login user and contribute code. Refer to 2FA for details.

You need to install TOTP software on the mobile phone, search TOTP in the application market (Microsoft authenticator can be used for Android), and IOS Apple mobile phone recommends downloading authy token software, which can be bound to the mobile phone for cloud backup. SMS is also supported, but the GitHub configuration page has no Chinese mobile number + 86 to choose from by default. See the front-end code when you need to modify the configuration https://www.programmerall.com/article/5457100195/  .

Step1 visit the personal account security setting page https://github.com/settings/security Select the fourth item [account security]

![open-Apache's-GitHub-warehouse4]( https://user-images.githubusercontent.com/29391030/153325044-4b68a5c0-959a-4077-abdf-5ad5e67aa26a.png )

Step2 select [set up using an app] next

![open-Apache's-GitHub-warehouse5]( https://user-images.githubusercontent.com/29391030/153325063-ea61ad8c-cbbc-4053-8a37-35d315dc3b00.png )

Step3 enters the QR code binding page, scans the code using the TOTP type app with the download number in advance, and enters the 6 displayed on the mobile terminal as the token

![open-Apache's-GitHub-warehouse6]( https://user-images.githubusercontent.com/29391030/153325084-b57d3647-a6a5-4e15-9e9c-3c2f632c0655.png )

Step4 download recover codes, then enter the success page and click Done to bind successfully

![open-Apache's-GitHub-warehouse7]( https://user-images.githubusercontent.com/29391030/153325124-a523bd8c-f6d5-44ce-8372-3804d9c693c6.png )

be careful

When 2FA authentication is enabled, you need to use the user name / password + Mobile authentication code to log in to GitHub.

When 2FA authentication is enabled, a private access token needs to be generated for git submission and other operations. At this time, you will use the user name + private access token to submit the code instead of the user name + password (subsequent on-demand configuration).

For specific operations, please refer to creating a private token.

If 2FA is subsequently closed, it will be removed from the project and will not be able to access our warehouse and fork warehouse from our private warehouse.

##3. Open permission application on gitbox

Step1 access https://gitbox.apache.org/setup/ Authorize associated Apache account

![open-Apache's-GitHub-warehouse8]( https://user-images.githubusercontent.com/29391030/153325227-f917e9c3-16ea-42d4-8432-4b63fd5849da.png )

Step 2 authorized associated GitHub account

![open-Apache's-GitHub-warehouse9]( https://user-images.githubusercontent.com/29391030/153325245-e2eea319-278f-4254-afb8-7e1ec418f004.png )

Step3 MFA status verification

![open-Apache's-GitHub-warehouse10]( https://user-images.githubusercontent.com/29391030/153325267-71761576-9467-49a1-809b-2a5c0fc1a681.png )

be careful

After successful execution, see the figure below. Write permission will be enabled within about an hour after success. If the MFA status prompts "user not a member of the ASF GitHub organization. Please make sure you are a part of the ASF organization on GitHub and have 2FA enabled. Visit id.apache.org and set your GitHub ID to be invited to the org." Please check whether [associate Apache and GitHub account] is completed / whether 2FA is enabled. If it is normal, please verify it later because there is a delay for new members to obtain MFA status.

![open-Apache's-GitHub-warehouse11]( https://user-images.githubusercontent.com/29391030/153325293-654c1cd4-7b2c-44be-94b0-9520e2ea05c1.png )

##4. Other linked documents

[GitHub uses TOTP to enable 2FA authentication] https://docs.github.com/cn/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication

[create private token] https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

[introduction to gitbox] https://gitbox.apache.org

[Apache and GitHub] https://infra.apache.org/apache-github.html

[git github &amp;gitbox] https://cwiki.apache.org/confluence/display/INFRA/Git%2C +GitHub+and+Gitbox
