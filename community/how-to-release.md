---
title: How to Release
sidebar_position: 3
---

# Apache Publishing Guide
>This article takes the release of version 1.0.3 as an example

Understand the content and process of Apache's release

Source Release is the focus of Apache’s attention and is also a required content for release; Binary Release is optional.

Please refer to the following link to find more ASF release guidelines:

- [Apache Release Guide](http://www.apache.org/dev/release-publishing)
- [Apache Release Policy](http://www.apache.org/dev/release.html)
- [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

Both apache's maven and SVN repositorys use GPG signatures to verify the legitimacy of material files

## 1 Tool preparation
(Required when this publisher is releasing for the first time)
Mainly include the preparation of the signature tool GnuPG, Maven repository certification

### 1.1 Install GPG

(Take the Window system as an example, if the git client has been installed, gpg may already exist, and there is no need to install it again)

Download the binary installation package (GnuPG binary releases) at [GnuPG official website](https://www.gnupg.org/download/index.html). The latest version is [Gpg4win-3.1.16 2021-06-11](https://gpg4win.org/download.html) After downloading, please complete the installation operation first
Note: The commands of GnuPG 1.x version and 2.x version are slightly different. The following description takes 2.2.28 as an example
After installation, the gpg command is added to the system environment variables and is available
```sh
$ gpg --version #Check the version, it should be 2.x
```

### 1.2. Generate key with gpg

**Note the following points:**
-The mailbox used should be apache mailbox
-It is best to use pinyin or English for the name, otherwise garbled characters will appear

According to the prompt, generate the key
```shell
C:\Users\xxx>gpg --full-gen-key
gpg (GnuPG) 2.2.28; Copyright (C) 2021 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
  (14) Existing key from card
Your selection? 1 #here enter 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096 #Enter 4096 here
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n> = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0 #here enter 0
Key does not expire at all
Is this correct? (y/N) y #Enter y here

GnuPG needs to construct a user ID to identify your key.

Real name: mingXiao #Enter Pinying or English name here
Email address: xiaoming@apache.org #Enter the email address of apache here
Comment: test key for apache create at 20211110 #Enter some comments here, can be empty
You selected this USER-ID:
    "mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O #Enter O here
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.

# At this time, a dialog box will pop up, asking you to enter the key for this gpg.
┌────────────────────────────────────────────── ─────┐
│ Please enter this passphrase to protect your new key │
│ │
│ Passphrase: _______ no less than 8 digits ______________ │
│ Repeat: _______________________________ │
│ <OK> <Cancel> │
└────────────────────────────────────────────── ─────┘
#After entering the secret key, a certain random action needs to be performed to generate encrypted prime numbers. After creation, the following information will be output
gpg: key 1AE82584584EE68E marked as ultimately trusted
gpg: revocation certificate stored as'C:/Users/xxx/AppData/Roaming/gnupg/openpgp-revocs.d\E7A9B12D1AC2D8CF857AF5851AE82584584EE68E.rev'
public and secret key created and signed.

pub rsa4096 2021-11-10 [SC]
      E7A9B12D1AC2D8CF857AF5851AE82584584EE68E
uid mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>
sub rsa4096 2021-11-10 [E]
```

### 1.3. Upload the generated key to the public server

```shell
$ gpg --keyid-format SHORT --list-keys
pub rsa4096/584EE68E 2021-11-10 [SC] #584EE68E is the key id
      E7A9B12D1AC2D8CF857AF5851AE82584584EE68E
uid [ultimate] mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>
sub rsa4096/399AA54F 2021-11-10 [E]

# Send public key to keyserver via key id
$ gpg --keyserver pgpkeys.mit.edu --send-key 584EE68E
# Among them, pgpkeys.mit.edu is a randomly selected keyserver, and the keyserver list is: https://sks-keyservers.net/status/, which are automatically synchronized with each other, you can choose any one.
```
### 1.4. Check whether the key is created successfully
Verify whether it is synchronized to the public network. It takes about a minute to find out. If it is not successful, you can upload and retry several times
```shell
method one
$ gpg --keyserver hkp://pgpkeys.mit.edu --recv-keys 584EE68E #584EE68E is the corresponding key id

D:\>gpg --keyserver hkp://pgpkeys.mit.edu --recv-keys 584EE68E
#Results are as follows
gpg: key 1AE82584584EE68E: "mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>" not changed
gpg: Total number processed: 1
gpg: unchanged: 1

Way two
Go directly to https://pgpkeys.mit.edu/ and enter the username mingXiao to search the query results
```


### 1.5 Add the gpg public key to the KEYS file of the Apache SVN project repository

> This step requires SVN

Linkis DEV branch https://dist.apache.org/repos/dist/dev/incubator/linkis

Linkis Release branch https://dist.apache.org/repos/dist/release/incubator/linkis

#### 1.5.1 Add public key to KEYS in dev branch

Used to release RC version

```shell
mkdir -p linkis_svn/dev
cd linkis_svn/dev

svn co https://dist.apache.org/repos/dist/dev/incubator/linkis
# This step is relatively slow, and all versions will be copied. If the network is broken, use svn cleanup to delete the lock and re-execute it, and the upload will be resumed.
cd linkis_svn/dev/linkis

# Append the KEY you generated to the file KEYS, it is best to check if it is correct after appending
(gpg --list-sigs YOUR_NAME@apache.org && gpg --export --armor YOUR_NAME@apache.org) >> KEYS
# If there is a KEYS file before, it is not needed
svn add KEY
#Submit to SVN.
svn ci -m "add gpg key for YOUR_NAME"
```

#### 1.5.2 Add the public key to KEYS in the release branch

Used to release the official version

```shell

mkdir -p linkis_svn/release
cd linkis_svn/release

svn co https://dist.apache.org/repos/dist/release/incubator/linkis
# This step is relatively slow, and all versions will be copied. If the network is broken, use svn cleanup to delete the lock and re-execute it, and the upload will be resumed.

cd linkis
# Append the KEY you generated to the file KEYS, it is best to check if it is correct after appending
(gpg --list-sigs YOUR_NAME@apache.org && gpg --export --armor YOUR_NAME@apache.org) >> KEYS
# If there is a KEYS file before, it is not needed
svn add KEY
#Submit to SVN.
svn ci -m "add gpg key for YOUR_NAME"
```


### 1.6 Configure apache maven address and user password settings

In the maven configuration file ~/.m2/settings.xml, add the following `<server>` item
For encryption settings, please refer to [here](http://maven.apache.org/guides/mini/guide-encryption.html)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.1.0 http://maven.apache.org/xsd/settings-1.1.0.xsd" xmlns="http://maven .apache.org/SETTINGS/1.1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <servers>
    <!-- Apache Repo Settings -->
    <server>
        <id>apache.snapshots.https</id>
         <!-- APACHE LDAP username -->
        <username>{user-id}</username>
         <!--APACHE LDAP password (using the password encrypted by the mvn secret machine mechanism) -->
        <password>{user-pass}</password>
    </server>
    <server>
        <id>apache.releases.https</id>
        <username>{user-id}</username>
        <password>{user-pass}</password>
    </server>
  </servers>
<profiles>
    <profile>
      <id>apache-release</id>
      <properties>
        <!-- Your GPG Keyname here -->
        <gpg.keyname>Your KEYID</gpg.keyname>
        <!-- Use an agent: Prevents being asked for the password during the build -->
        <gpg.useagent>true</gpg.useagent>
        <gpg.passphrase>The password of your private key</gpg.passphrase>
      </properties>
    </profile>
</profiles>
</settings>
```
### 1.7 Prepare svn native environment

Apache uses svn to host the published content of the project



## 2 Prepare material package & release of Apache Nexus

### 2.1 Preparing to branch

Pull the new branch from the branch to be released as the release branch. If you want to release the $`{release_version}` version now, check out the new branch `${release_version}-release` from the branch to be released, and all operations thereafter are in `${ release_version}-release` branch, merge into the main branch after the final release is completed.

```
#If the currently developed source code branch is dev-1.0.3, the version 1.0.3-release needs to be released
git clone --branch dev-1.0.3 git@github.com:apache/incubator-linkis.git
cd incubator-linkis
git pull
git checkout -b 1.0.3-release
git push origin 1.0.3-release

```

### 2.2 Version number confirmation

If the version number is incorrect, you need to modify the version number to

```
mvn versions:set -DnewVersion=1.0.3
Modify the configuration in pom.xml <linkis.version>1.0.3</linkis.version>
```
Check whether the code is normal, including the version number, the compilation is successful, the unit test is all successful, the RAT check is successful, etc.
```
#build check
$ mvn clean install -Dmaven.javadoc.skip=true
#RAT LICENSE check
$ mvn apache-rat:check
```

### 2.3 Publish jar package to Apache Nexus repository
```shell
mvn -DskipTests deploy -Prelease -Dmaven.javadoc.skip=true # Start to compile and upload, it takes about 1h40min
```

After the above command is executed successfully, the release package will be automatically uploaded to Apache's staging repository. All Artifacts deployed to the remote [maven repository](http://repository.apache.org/) will be in the staging state. Visit https://repository.apache.org/#stagingRepositories and log in using the Apache LDAP account. You will see the uploaded version, and the content in the `Repository` column is ${STAGING.REPOSITORY}. Click `Close` to tell Nexus that the build is complete, and only then is the version available. If there is a problem with the electronic signature, `Close` will fail. You can check the failure information through `Activity`.
At the same time, the binary file assembly-combined-package/target/apache-linkis-1.0.3-incubating-bin.tar.gz is also generated

Step 2.4-3.3 execute the command, merge it in the tool/release.sh script, or execute it through the release.sh script
### 2.4 Package source code

```shell
mkdir dist/apache-linkis
git archive --format=tar.gz --output="dist/apache-linkis/apache-linkis-1.0.3-incubating-src.tar.gz" release-1.0.3
```
### 2.5 Copy binary files

After step 2.3 is executed, the binary file has been generated, located in assembly-combined-package/target/apache-linkis-1.0.3-incubating-bin.tar.gz
```shell
cp assembly-combined-package/target/apache-linkis-1.0.3-incubating-bin.tar.gz dist/apache-linkis
```

### 2.6 Sign source package/binary package/sha512
```shell
cd dist/apache-linkis
for i in *.tar.gz; do echo $i; gpg --print-md SHA512 $i> $i.sha512; done # Calculate SHA512
for i in *.tar.gz; do echo $i; gpg --armor --output $i.asc --detach-sig $i; done # Calculate signature
```

### 2.7 Check whether the generated signature/sha512 is correct
For example, verify that the signature is correct as follows:
```shell
cd dist/apache-linkis
for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i; done
```



## 3 Publish the Apache SVN repository

### 3.1 Check out the Linkis release directory

Check out the Linkis distribution directory from the Apache SVN dev directory.

```shell
svn co https://dist.apache.org/repos/dist/dev/incubator/linkis dist/linkis_svn_dev

```

### 3.2 Add the content to be published to the SVN directory

Create a directory of version numbers.

```shell
mkdir -p dist/linkis_svn_dev/1.0.3-rc01
```

Add the source code package, binary package, and Linkis executable binary package to the SVN working directory.

```shell
cp -f dist/apache-linkis/* dist/linkis_svn_dev/1.0.3-rc01

```
### 3.3 Submit Apache SVN

```shell
cd dist/linkis_svn_dev/

# Check svn status
svn status
# Add to svn version
svn add 1.0.3-rc01
svn status
# Submit to svn remote server
#svn commit -m "prepare for 1.0.3-rc01"

```


## 4 Verify Release Candidates

For details, please refer to [How to Verify release](/how-to-verify.md)

## 5 Voting for non-ASF version

> Linkis non-ASF version for Linkis community voting

<font color='red'>
The non-ASF version can choose to vote on the ASF infrastructure, but it is distributed through the non-ASF infrastructure, and if the official website has a link to the non-ASF version, it needs to be clearly marked as the non-ASF version.
You can use the non-ASF version as a way to discover ASF policy violations and iteratively solve the opportunities for non-compliance.
Only the version voted by IPMC members is the official ASF version.
Incubating projects need to successfully release multiple ASF versions before they can graduate from the incubator<br/>

[For more information, see](https://incubator.apache.org/guides/releasemanagement.html) https://incubator.apache.org/guides/releasemanagement.html

</font>


#### 5.1 Non-ASF version Linkis community voting template
>To vote in the Linkis community, send an email to: `dev@linkis.apache.org`

```html
title:
[VOTE] Release Apache Linkis (Incubating) ${release_version} ${rc_version}

content:

Hello Linkis Community,

    This is a call for review and vote to release Apache Linkis (Incubating) version ${release_version}-${rc_version}.

Release notes:
https://github.com/apache/incubator-linkis/releases/tag/v${release_version}-${rc_version}

    The release candidates:
    https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/

Git tag for the release:
https://github.com/apache/incubator-linkis/tree/v${release_version}-${rc_version}

Keys to verify the Release Candidate:
https://dist.apache.org/repos/dist/dev/incubator/linkis/KEYS

GPG user ID:
${YOUR.GPG.USER.ID}

    Thanks to everyone who has contributed to this release.

The vote will be open for at least 72 hours or until necessary number of votes are reached.

Please vote accordingly:

[] +1 approve
[] +0 no opinion
[] -1 disapprove with the reason

Checklist for reference:

[] Download links are valid.
[] Checksums and PGP signatures are valid.
[] Source code distributions have correct names matching the current release.
[] LICENSE and NOTICE files are correct for each Linkis repo.
[] All files have license headers if necessary.
[] No compiled archives bundled in source archive.

More detail checklist please refer:
        https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist
    
    Steps to validate the release, Please refer to:
        https://linkis.apache.org/community/how-to-verify

Thanks,
${Linkis Release Manager}
```

#### 5.2 Announce non-ASF version voting result template

```html
title:
[RESULT][VOTE] Release Apache Linkis (Incubating) ${release_version} ${rc_version}

content:
Hello Linkis community,

     Thanks to everyone that participated. The vote to release Apache Linkis
     (Incubating) ${release_version} ${rc_version} in dev@linkis is now closed as PASSED.
    
     This vote passed with 6 +1 votes (4 bindings and 2 non-bindings) and no 0
     or -1 votes.
    
     +1 votes
         * Xiao Min / binding
         * Xiao Hong
         * Xiao Zi / binding
         * xxxx
    
     0 votes
         * No votes
    
     -1 votes
         * No votes
    
     Vote thread can be found here [1].
    
     I'll continue with the release process and update the community as progress is made.

Best regards,
${Linkis Release Manager}

[1] https://lists.apache.org/thread/xxxx

```

## 6. The official version initiates a vote

> Linkis is still in the incubation stage and needs to vote twice

- To vote in the Linkis community, send an email to: `dev@linkis.apache.org`
- To vote in the incubator community, send an email to: `general@incubator.apache.org` After Linkis graduates, you only need to vote in the Linkis community

### 6.1 Linkis community voting stage

- To vote in the Linkis community, send a voting email to `dev@linkis.apache.org`. PMC needs to check the correctness of the version according to the document, and then vote. After at least 72 hours have passed and three `+1 PMC member` votes have been counted, you can enter the next stage of voting.
- Announce the results of the voting and send an email to the result of the voting to `dev@linkis.apache.org`.

#### 6.1.1 Linkis Community Voting Template

```html
title:
[VOTE] Release Apache Linkis (Incubating) ${release_version} ${rc_version}

content:

Hello Linkis Community,

    This is a call for vote to release Apache Linkis (Incubating) version ${release_version}-${rc_version}.

Release notes:
https://github.com/apache/incubator-linkis/releases/tag/v${release_version}-${rc_version}

    The release candidates:
    https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/

    Maven artifacts are available in a staging repository at:
    https://repository.apache.org/content/repositories/orgapachelinkis-{staging-id}

Git tag for the release:
https://github.com/apache/incubator-linkis/tree/v${release_version}-${rc_version}

Keys to verify the Release Candidate:
https://dist.apache.org/repos/dist/dev/incubator/linkis/KEYS

GPG user ID:
${YOUR.GPG.USER.ID}

The vote will be open for at least 72 hours or until necessary number of votes are reached.

Please vote accordingly:

[] +1 approve
[] +0 no opinion
[] -1 disapprove with the reason

Checklist for reference:

[] Download links are valid.
[] Checksums and PGP signatures are valid.
[] Source code distributions have correct names matching the current release.
[] LICENSE and NOTICE files are correct for each Linkis repo.
[] All files have license headers if necessary.
[] No compiled archives bundled in source archive.

More detail checklist please refer:
    https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist

Thanks,
${Linkis Release Manager}
```

#### 6.1.2 Announce voting result template

```html
title:
[RESULT][VOTE] Release Apache Linkis (Incubating) ${release_version} ${rc_version}

content:
Hello Apache Linkis PPMC and Community,

    The vote closes now as 72hr have passed. The vote PASSES with

    xx (+1 non-binding) votes from the PPMC,
    xx (+1 binding) votes from the IPMC,
    xx (+1 non-binding) votes from the rest of the developer community,
    and no further 0 or -1 votes.

    The vote thread: {vote_mail_address}

    I will now bring the vote to general@incubator.apache.org to get approval by the IPMC.
    If this vote passes also, the release is accepted and will be published.

Thank you for your support.
${Linkis Release Manager}
```

### 6.2 Incubator community voting stage

1. To vote in the Incubator community, send a voting email to `general@incubator.apache.org`, and 3 `+1 IPMC Member` votes are required to proceed to the next stage.
2. Announce the result of the poll, send an email to `general@incubator.apache.org` and send a copy to `dev@linkis.apache.org`.

#### 6.2.1 Incubator community voting template

```html
Title: [VOTE] Release Apache Linkis(Incubating) ${release_version} ${rc_version}

content:

Hello Incubator Community,

    This is a call for a vote to release Apache Linkis(Incubating) version
    ${release_version} ${rc_version}

    The Apache Linkis community has voted on and approved a proposal to release
    Apache Linkis(Incubating) version ${release_version} ${rc_version}

    We now kindly request the Incubator PMC members review and vote on this
    incubator release.

    Linkis community vote thread:
    • [Vote Link]

    Vote result thread:
    • [Link to voting results]

    The release candidate:
    • https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/

    Git tag for the release:
    • https://github.com/apache/incubator-linkis/releases/tag/${release_version}-${rc_version}

    Release notes:
    • https://github.com/apache/incubator-linkis/releases/tag/${release_version}-${rc_version}

    The artifacts signed with PGP key [fill in your personal KEY], corresponding to [fill in your personal email], that can be found in keys file:
    • https://downloads.apache.org/incubator/linkis/KEYS

    The vote will be open for at least 72 hours or until necessary number of votes are reached.

    Please vote accordingly:

    [] +1 approve
    [] +0 no opinion
    [] -1 disapprove with the reason

Thanks,
On behalf of Apache Linkis(Incubating) community

```

#### 6.2.2 Announce voting result template

```html
Title: [RESULT][VOTE] Release Apache Linkis ${release_version} {rc_version}

content:
Hi all

Thanks for reviewing and voting for Apache Linkis(Incubating) ${release_version} {rc_version}
release, I am happy to announce the release voting has passed with [Number of voting results]
binding votes, no +0 or -1 votes. Binding votes are from IPMC

   -xxx
   -xxx
   -xxx

The voting thread is:
[Vote Link]

Many thanks for all our mentors helping us with the release procedure, and
all IPMC helped us to review and vote for Apache Linkis(Incubating) release. I will
be working on publishing the artifacts soon.

Thanks
On behalf of Apache Linkis(Incubating) community
```
## 7. Official release

### 7.1 Merging branches

Merge the changes from the `${release_version}-release` branch to the `master` branch, and delete the `release` branch after the merge is completed

```shell
$ git checkout master
$ git merge origin/${release_version}-release
$ git pull
$ git push origin master
$ git push --delete origin ${release_version}-release
$ git branch -d ${release_version}-release
```

### 7.2 Migrating source and binary packages

Move the source and binary packages from the `dev` directory of svn to the `release` directory

```shell
$ svn mv https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version} https://dist.apache.org/repos/dist/release/incubator/ linkis/ -m "transfer packages for ${release_version}-${rc_version}" #Mobile source package and binary package
$ svn delete https://dist.apache.org/repos/dist/release/incubator/linkis/KEYS -m "delete KEYS" #Remove KEYS in the original release directory
$ svn cp https://dist.apache.org/repos/dist/dev/incubator/linkis/KEYS https://dist.apache.org/repos/dist/release/incubator/linkis/ -m "transfer KEYS for ${release_version}-${rc_version}" #copy dev directory KEYS to release directory
```

### 7.3 Confirm whether the packages under dev and release are correct

-Confirm that `${release_version}-${rc_version}` under [dev](https://dist.apache.org/repos/dist/dev/incubator/linkis/) has been deleted
-Delete the release package of the previous version in the [release](https://dist.apache.org/repos/dist/release/incubator/linkis/) directory, these packages will be automatically saved in [here](https:/ /archive.apache.org/dist/incubator/linkis/)

```shell
$ svn delete https://dist.apache.org/repos/dist/release/incubator/linkis/${last_release_version} -m "Delete ${last_release_version}"
```

### 7.4 Release version in Apache Staging repository

-Log in to http://repository.apache.org and log in with your Apache account
-Click on Staging repositories on the left,
-Search for Linkis keywords, select your recently uploaded repository, and vote for the repository specified in the email
-Click the `Release` button above, a series of checks will be carried out in this process

> It usually takes 24 hours to wait for the repository to synchronize to other data sources

### 7.5 GitHub version released

1.Tag the commit (on which the vote happened) with the release version without `-${RELEASE_CANDIDATE}`. For example: after a successful vote on `v1.2-rc5`, the hash will be tagged again with `v1. 2` only.

2. Click `Edit` on the version `${release_version}` on the [GitHub Releases](https://github.com/apache/incubator/linkis/releases) page

Edit the version number and version description, and click `Publish release`

### 7.6 Update download page

The linkis official website download address should point to the official apache address

After waiting and confirming that the new release version is synchronized to the Apache mirror, update the following page:

https://linkis.apache.org/#/download

The download connection of the GPG signature file and the hash verification file should use this prefix: `https://downloads.apache.org/incubator/linkis/`



## 8. Email notification version is released

> Please make sure that the Apache Staging repository has been published successfully, usually mail is published 24 hours after this step

Send email to `dev@linkis.apache.org`, `announce@apache.org` and `general@incubator.apache.org`
```html
title:
[ANNOUNCE] Apache Linkis (Incubating) ${release_version} available

content:

Hi all,

Apache Linkis (Incubating) Team is glad to announce the new release of Apache Linkis (Incubating) ${release_version}.

Apache Linkis (Incubating) is a dynamic cloud-native eventing infrastruture used to decouple the application and backend middleware layer, which supports a wide range of use cases that encompass complex multi-cloud, widely distributed topologies using diverse technology stacks.

Download Links: https://linkis.apache.org/projects/linkis/download/

Release Notes: https://linkis.apache.org/events/release-notes/v${release_version}/

Website: https://linkis.apache.org/

Linkis Resources:
-Issue: https://github.com/apache/incubator-linkis/issues
-Mailing list: dev@linkis.apache.org

-Apache Linkis (Incubating) Team
```