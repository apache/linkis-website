---
title:  Shell Engine Usage
sidebar_position: 2
---

# Shell engine usage document

This article mainly introduces the configuration, deployment and use of Shell engine in Linkis1.0
## 1. The environment configuration before using the Shell engine

If you want to use the shell engine on your server, you need to ensure that the user's PATH has the bash execution directory and execution permissions.

| Environment variable name | Environment variable content | Remarks             |
|---------------------------|------------------------------|---------------------|
| sh execution environment  | bash environment variables    | bash is recommended |

Table 1-1 Environmental configuration list

## 2. Shell engine configuration and deployment

### 2.1 Shell version selection and compilation

The shell engine does not need to be compiled by the user, and the compiled shell engine plug-in package can be used directly.
### 2.2 shell engineConn deployment and loading

Here you can use the default loading method to be used normally.

### 2.3 Labels of the shell engine

Here you can use the default dml.sql to insert it and it can be used normally.

## 3. Use of Shell Engine

### Ready to operate

Before submitting the shell on linkis, you only need to ensure that there is the path of the shell in your user's $PATH.

### 3.1 How to use Scriptis

The use of Scriptis is the simplest. You can directly enter Scriptis, right-click the directory and create a new shell script, write shell code and click Execute.

The execution principle of the shell is that the shell engine starts a system process to execute through the ProcessBuilder that comes with java, and redirects the output of the process to the engine and writes it to the log.

![](/Images/EngineUsage/shell-run.png)

Figure 3-1 Screenshot of shell execution effect

### 3.2 How to use workflow

The DSS workflow also has a shell node. You can drag in the workflow node, then double-click to enter and edit the code, and then execute it in the form of a workflow.

Shell execution needs to pay attention to one point. If the workflow is executed in multiple lines, the success of the workflow node is determined by the last command. For example, the first two lines are wrong, but the shell return value of the last line is 0, then this node Is successful.

### 3.3 How to use Linkis Client

Linkis also provides a client method to call the shell task, the calling method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to <https://github.com/WeBankFinTech/Linkis/wiki/Linkis1.0%E7%94%A8%E6%88%B7%E4 %BD%BF%E7%94%A8%E6%96%87%E6%A1%A3>.

## 4. Shell engine user settings

The shell engine can generally set the maximum memory of the engine JVM.
