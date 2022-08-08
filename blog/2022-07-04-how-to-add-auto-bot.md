---
title: How to add a GitHub Action for the GitHub repository
authors: [BeaconTown]
tags: [github]
---

## 1 Summary
As you know, [continuous integration](#21-what-is-continuous-integration) consists of many operations, such as capturing code, running tests, logging in to remote servers, publishing to third-party services, and so on. GitHub calls these operations as Actions. Many operations are similar in different projects and can be shared. GitHub noticed this and came up with a wonderful idea to allow developers to write each operation as an independent script file and store it in the code repository so that other developers can reference it. If you need an action, you don't have to write a complex script by yourself. You can directly reference the action written by others. The whole continuous integration process becomes a combination of actions. This is the most special part of GitHub Actions.

GitHub provides a [Github Action Market](https://github.com/marketplace) for developers, we can find the GitHub Action we want from this market and configure it into the `workflow` of the repository to realize automatic operation. Of course, the GitHub Action that this market can provide is limited. In some cases, we can't find a GitHub Action that can meet our needs. I will also teach you how to write GitHub Action by yourself later in this blog.

## 2 Some terms
#### 2.1 What is continuous integration
In short, it is an automated program. For example, every time the front-end programmer submits code to GitHub's repository, GitHub will automatically create a virtual machine (MAC / Windows / Linux) to execute one or more instructions (determined by us), for example:

```bash
npm install
npm run build
```

#### 2.2 What is YAML
The way we integrate GitHub Action is to create a `Github/workflow` directory, with a `* yaml` file - this `yaml` file is the file we use to configure GitHub Action. It is a very easy scripting language. For users who are not familiar with `yaml`, you can refer to it [here](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes).

## 3 Start writing the first Workflow
#### 3.1 How to customize the name of Workflow
GitHub displays the name of the Workflow on the action page of the repository. If we omit name, GitHub will set it as the Workflow file path relative to the repository root directory.

```yaml
name: 
  Say Hello
```

#### 3.2 How to customize the trigger event of Workflow
There are many events, for example, the user submits a pull request to the repository, the user submits an issue to the repository, or the user closes an issue, etc. We hope that when some events occur, the Workflow will be automatically executed, which requires the definition of trigger events. The following is an example of a custom trigger event:

```yml
name: 
  Say Hello
on: 
  pull_request
```

The above code can trigger workflow when the user submits a pull request. For multiple events, we enclose them in square brackets, for example:

```yml
name: 
  Say Hello
on: 
  [pull_request,pull]
```

Of course, we hope that the triggering event can be more specific, such as triggering Workflow when a pull request is closed or reopened:

```yml
name: 
  Say Hello
on: 
  pull_request:
    type: 
      [reopend,closed]
```

For more trigger events, please refer to [document](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#about-workflow-events) here.

#### 3.3 How to define a job
A Workflow is composed of one or more jobs, which means that a continuous integration run can complete multiple tasks. Here is an example:

```yml
name: 
  Say Hello
on: 
  pull_request
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
```

Each job must have an ID associated with it. Above `my_ first_ Job` and `my_ second_ Job` is the ID of the job.

#### 3.4 How to specify the running environment of a job
Specify the running environment for running jobs. The operating systems available on Workflow are:
- Windows
- macos
- linux

The following is an example of a specified running environment:
```yml
# Limited by space, the previous code is omitted
jobs:
  my_first_job:
    name: My first job
  runs-on: macos-10.15
```

#### 3.5 The use of step
Each job is composed of multiple steps, which will be executed from top to bottom. Step can run commands (such as linxu commands) and actions.

The following is an example of outputting "Hello World":
```yml
# Limited by space, the previous code is omitted
jobs:
  my_first_job:
    name: My first job
  runs-on: macos-10.15
  step:
    - name: Print a greeting
    # Define the environment variables of step
      env:
        FIRST_WORD: Hello
        SECOND_WORD: WORD
      # Run instructions: output environment variables
      run: |
        echo $FIRST_WORD $SECOND_WORD.
```

Next is the use of action, which is actually a command. For example, GitHub officially gives us some [default commands](https://github.com/marketplace?type=actions&query=actions). We can directly use these commands to reduce the amount of Workflow code in the repository. The most common action is [Checkout](https://link.zhihu.com/?target=https%3A//github.com/marketplace/actions/checkout), it can clone the latest code in the repository into the Workflow workspace.
```yml
# Limited by space, the previous code is omitted
  step:
    - name: Check out git repository 
      uses: actions/checkout@v2
```
Some actions require additional parameters to be passed in. Generally, `with` is used to set the parameter value:
```yml
# Limited by space, the previous code is omitted
  step:
    - name: Check out git repository 
      uses: actions/checkout@v2
      uses: actions/setup-node@v2.2.0
        with:
          node-version: 14
```

## 4 How to write your own action
#### 4.1 Configuration of action.yml
When we can't find the action we want in the GitHub Action Market, we can write an action to meet our needs by ourselves. The customized action needs to be created a new `"actions"` directory under the `".gitHub/workflow"` directory, and then create a directory with a custom action name. Each action needs an action configuration file: `action.yml`. The `runs` section of `action.yml` specifies the starting mode of the operation. There are three startup methods: `node.js Script`, `Docker Image`, and `Composite Script`. The common parameters of `action.yml` are described below:
- name: Customize the name of the action
- description: Declare the parameters or outputs that need to be passed in for action
- inputs: Customize the parameters to be input
- outputs: Output variables
- runs: Startup mode

The following is a configuration example of `action.yml`：

```yml
name: "example action"

description: "This is an example action"

inputs:
  param1:
    description: "The first param of this action"
    required: true  #Required parameters must be set to true

  param2:
    description: "The second param of this action"
    required: true

outputs:
  out1:
    description: "The outputs of this action"

runs:
  using: node16
  main: dist/index.js
  post: dist/index.js
```
Setting `runs.using` to `node16` or `node12` can be specified as the starting `node.js` script. The script file named `main` is the startup file. The way to start is similar to running the command `node main.js` directly. Therefore, dependency will not be installed from `package.json`. During development, we usually use the packaging tool to package the dependencies together, output a separate `JS` file, and then use this file as the entry point. The `runs.post` can specify the cleanup work, and the content here will be run at the end of the Workflow.

#### 4.2 Using Docker Image
If Docker is used, we need to modify the `runs` in `action.yml` to:

```yml
runs:
  using: docker
  image: Dockerfile
```
`runs.image` specifies the dockerfile required for image startup, which is specified here as the dockerfile under the project root directory. In the dockerfile, specify the startup script with `ENTRYPOINT` or `CMD`. For example, define a program that runs scripts in `Python`:
```docker
FROM python:3

RUN pip install --no-cache-dir requests

COPY . .

CMD [ "python", "/main.py"]
```
Here we can see the advantages of using docker: you can customize the running environment, and you can use other program languages.

## 5 GitHub Action project practice
In this section, I will describe how to write your own GitHub Action with a specific example.
##### Problem
Assuming that there are many issues to be processed in our GitHub repository, each pull request submitted by the user may be associated with an issue. If you have to manually close an issue after merging a pull request, it will be quite cumbersome.
##### Resolve
Then workflow comes in handy. We can listen to the closed event of pull request and determine whether the closed event is closed by merged or non merged. If it is merged, the associated issue will be closed.

But there is still a problem here, how to obtain the associated issue? We can ask the user to add the issue that needs to be associated in the description part when submitting the pull request, such as `#345`, and then extract the issue number of `345`. How to realize this function? We can write GitHub Action by ourselves. In order to make the GitHub Action program more concise, here I use docker to start GitHub Action. First, prepare `action.yml`:
```yml
# The name of Github Action 
name: "Auto_close_associate_issue"
# The description of action
description: "Auto close an issue which associate with a PR."

# Define parameters to be input
inputs:
  # The name of first param is prbody
  prbody: 
    # The definition of the param
    description: "The body of the PR to search for related issues"
    # Required param
    required: true

outputs:
  #The name of output param
  issurNumber:
    description: "The issue number"

runs:
  # Using Docker Image
  using: "docker"
  image: "Dockerfile"
```

The next step is to write script files, where I use `node.js`. The idea of this script is: first obtain the variable value from the environment, extract the issue number, and then output it to the environment. The corresponding script (named main.js) is as follows:
```javascript
// Get environment variables. All parameters passed to GitHub Action are capitalized and the prefix INPUT_ is required, which is specified by GitHub
let body = process.env['INPUT_PRBODY']; 
// Extract the number of issue by regular expression
let pattern = /#\d+/;
let issueNumber = body.match(pattern)[0].replace('#', '');
// Output the issue number to the environment
console.log(`::set-output name=issueNumber::${issueNumber}`);
```

Next is the image file of Docker (the file name is `Dockerfile`):
```yml
FROM node:10.15

COPY . .

CMD [ "node", "/main.js"]
```

Finally, `action.yml`, `Dockerfile` and `main.js` is under the directory `.github/actions/Auto_close_associate_issue`, and the writing of an action is over.

The last step is to write Workflow. The configuration of Workflow is described in detail in [Start Writing the First Workflow](#3-start-writing-the-first-workflow), so I won't repeat it here. The specific configuration is as follows：
```yml
name: Auto close issue when PR is merged

on:
  pull_request_target:
    types: [ closed ]

jobs:
  close-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: "Auto issue closer"
        uses: ./.github/actions/Auto_close_associate_issue/
        id: Closer
        with:
          prbody: ${{ github.event.pull_request.body }}

      - name: Close Issue
        uses: peter-evans/close-issue@v2
        if: ${{ github.event.pull_request.merged }}
        with:
          issue-number: ${{ steps.Closer.outputs.issueNumber }}
          comment: The associated PR has been merged, this issue is automatically closed, you can reopend if necessary.
        env:
          Github_Token: ${{ secrets.GITHUB_TOKEN }}
          PRNUM: ${{ github.event.pull_request.number }}
```