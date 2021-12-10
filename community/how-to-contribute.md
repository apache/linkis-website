---
title: How to Contribute
sidebar_position: 1
---
# Contributing

Thank you very much for contributing to the Linkis project! Before participating in the contribution, please read the following guidelines carefully.

## 1. Contribution category

### 1.1 Bug feedback and fix

We suggest that whether it is bug feedback or repair, you should create an issue first to describe the status of the bug in detail, so as to help the community to find and review issues and codes through issue records. Bug feedback issues usually need to include a complete description
**Bug** information and reproducible scenarios, so that the community can quickly locate the cause of the bug and fix it. Opened issues that contain #bug label all need to be fixed.

### 1.2 Functional communication, implementation and refactoring

In the communication process, please elaborate the details, mechanisms and using scenarios of the new function(or refactoring). This can promote the function(or refactoring) to be implemented better and faster.
If you plan to implement a major feature (or refactoring), be sure to communicate with the team through **Issue** or other methods, so that everyone can move forward in the most efficient way. An open Issue containing the #feature tag means that there are new functions need to be implemented. And open issues including #Enhancement tags always means that needs to be improved for refactoring.


### 1.3 Issue Q&A

Helping to answer the usage questions in the Issue is a very valuable way to contribute to the Linkis community; There will always be new users keeping coming in. While helping new users, you can also show your expertise.

### 1.4 Documentation improvements

Linkis User Manual Documents are maintained in the Linkis-Doc project of github, you can edit the markdown file in the project and improve the document by submit a pr.

## 2. Contribution process

### 2.1 Branch structure

The Linkis source code may contain some temporary branches, but there are only three branches as followed that are really meaningful:

```
master: The source code of the last stable release, and occassionally may have several hotfix submissions
branch-0.10.0: The latest stable version
dev-1.0.0: Main development branch
```

### 2.2 Development Guidelines

Linkis front-end and back-end code share the same code repository, but they are separated in development. Before embarking on development, please fork a copy of Linkis project to your own Github Repositories. When developing, please do it based on your own Github Repositories.

We recommend cloning the dev-1.0.0 branch for development, so there will be much less conflicts on merging when submitting a PR to the Linkis main project
Much smaller

```
git clone https://github.com/yourname/Linkis.git --branch dev-1.0.0
```

#### 2.2.1 Backend

The user configuration is under the project root directory /config/, the project startup script and the upgrade patch script are under the project root directory /bin/.
The back-end code and core configuration are in the server/ directory, and the log is in the project root directory /log/. 
The root directory of the project mentioned here refers to the directory configured by the environment variable LINKIS_HOME, and the environment variable needs to be configured during the development of the IDE.
For example, Idea regarding the priority of environment variable loading from  high to low: Environment configured in Run/Debug Configurations
variables —> System environment variables cached by the IDE.

**2.2.1.1** Directory structure

```
1. Script
```
```
├── assembly-package/bin # script directory
 ├── install.sh # One-click deployment script
 ├── checkEnv.sh # Environment check script
 └── common.sh # Common script function
```
```
├── sbin # script directory
 ├── linkis-daemon.sh # Single service start and stop, status detection script
 ├── linkis-start-all.sh # One-click start script
 ├── linkis-stop-all.sh # One-click stop script
 └── ext # Separate service script directory
    ├── linkis-xxx.sh # The startup script of a service
    ├── linkis-xxx.sh
    ├── ...
```
    
```
2. Configuration
```
```
├── assembly-package/config # User configuration directory
 ├── linkis-env.sh # Configuration variable settings for one-click deployment
 ├── db.sh # One-click deployment database configuration
```
```
3. Code directory structure
See Linkis code directory structure for details
4. Log directory
```
```
├── logs # log root directory
```
**2.2.1.2** Environment variables


```
Configure system environment variable or IDE environment variable LINKIS_HOME, it is recommended to use IDE environment variable first.
```
**2.2.1.3** Database

```
1. Create the Linkis system database by yourself;
2. Modify the corresponding information of the database in conf/db.sh and execute bin/install.sh or import directly on the database client
db/linkis_*.sql.
```

**2.2.1.4** Configuration file

Modify the application-linkis.yml file in the conf directory and the properties file corresponding to each microservice name to configure related properties.

**2.2.1.5** Packaging

```
1. To package the project, you need to modify the version in /assembly/src/main/assembly/assembly.xml in the root directory, and then execute the following command in the root directory: mvn clean package;
To package a single module, simply run mvn clean package directly in each module.
```
### 2.3 Pull Request Guidelines

#### If you still don’t know how to initiate a PR to an open source project, please refer to this description

```
Whether it is bug fixes or new feature development, please submit a PR to the dev-1.0.0 branch.
PR and submission name follow the principle of <type>(<scope>): <subject>. For details, please refer to Ruan Yifeng's article [Commitmessage and Change log Compilation Guide](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html).
If the PR contains new features, the document update should be included in this PR.
If this PR is not ready to merge, please add the [WIP] prefix to the head of the name (WIP = work-in-progress).
All submissions to the dev-1.0.0 branch need to go through at least one review before they can be merged
```
### 2.4 Review Standard

Before contributing code, you can find out what kind of submissions are popular in Review. Simply put, if a submission can bring as many gains as possible and as few side effects or risks as possible, then it will be reviewd and merged first. Submissions with high risk and low value are almost impossible to be merged, and may be rejected without even a chance to review. 

**2.4.1** Gain

```
Fix the main cause of the bug
Add or fix a feature or problem that a large number of users urgently need
Simple and effective
Easy to test, with test cases
Reduce complexity and amount of code
```

#### Issues that have been discussed by the community and identified for improvement

#### 2.4.2 Side effects and risks

```
Only fix the surface phenomenon of the bug
Introduce new features with high complexity
Add complexity to meet niche needs
Change stable existing API or semantics
Cause other functions to not operate normally
Add a lot of dependencies
Change the dependency version at will
Submit a large amount of code or changes at once
```
**2.4.3 Reviewer** Note

```
Please use a constructive tone to write comments
If you need to make changes by the submitter, please clearly state all the content that needs to be modified to complete the Pull Request
If a PR is found to have brought new problems after the merger, the Reviewer needs to contact the PR author and communicate to resolve the problem.
Question; if the PR author cannot be contacted, the Reviewer needs to restore the PR
```
## 3. advanced contribution

### 3.1 About Committers (Collaborators)

**3.1.1** How to become a **committer**

If you have had a valuable PR for the Linkis code and it has been merged, you can contact the core development team through the official WeChat group
Team applied to be the Committer of the Linkis project; the core development team and other Committers will vote together to decide whether or not allow you to join. If you get enough votes, you will become a Committer for the Linkis project.

**3.1.2 Committer** Rights

```
You can join the official developer WeChat group, participate in discussions and make development plans
Can manage Issues, including closing and adding tags
Can create and manage project branches, except for master and dev-1.0.0 branches
Can review the PR submitted to the dev-1.0.0 branch
Can apply to be a member of Committee
```
### 3.2 About Committee

**3.2.1** How to become a **Committee** member


If you are a Committer of the Linkis project, and all your contributions have been recognized by other Committee members. Yes, you can apply to be a member of the Linkis Committee, and other Committee members will vote together to decide whether to allow you to join in, and if unanimously approved, you will become a member of the Linkis Committee.

**3.2.2 Committee members' rights

```
You can merge PRs submitted by other Committers and contributors to the dev-1.0.0 branch
```