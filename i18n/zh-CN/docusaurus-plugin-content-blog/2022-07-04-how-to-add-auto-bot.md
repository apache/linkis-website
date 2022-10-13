---
title: 如何编写 Github Action
authors: [BeaconTown]
tags: [github]
---

## 1 概述
大家知道，[持续集成](#21-什么是持续集成)由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。gitHub 把这些操作就称为 actions。很多操作在不同项目里面是类似的，完全可以共享。github注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是gitHub actions 最特别的地方。

Github为广大开发者提供了一个[github action市场](https://github.com/marketplace)，我们可以从这个市场中找到我们想要的github action并配置到仓库的`workflow`中实现自动化操作，当然这个市场能提供的github action有限，有些情况下找不到能满足我们需求的github action，本篇博客在后面我也会教大家如何自己编写github action。

## 2 一些名词术语
#### 2.1 什么是持续集成
简单说就是自动化程序，举个例子，对于前端程序员每次提交代码到 Github 的仓库后，Github 都会自动创建一个虚拟机（Mac / Windows / Linux 任我们选），来执行一段或多段指令（由我们定），例如：

```bash
npm install
npm run build
```

#### 2.2 yaml是什么
我们集成github action的做法，就是在我们仓库的根目录下，创建一个 `.github/workflow`目录，里面放一个 `*.yaml`文件——这个yaml文件就是我们配置github action所用的文件。它是一个非常容易的脚本语言，对于不熟悉yaml的用户可以[参考此处](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes)。

## 3 开始编写第一个workflow
#### 3.1 如何自定workflow的名字
Workflow的名称，github在存储库的Action页面上显示Workflow的名称。如果我们省略 name，则github会将其设置为相对于存储库根目录的工作流文件路径。
```yaml
name: 
  Say Hello
```

#### 3.2 如何自定workflow的触发事件
事件有很多，例如：用户提交pull request到仓库、用户给仓库提交issue或者用户关闭issue等，我们希望某些事件发生时，自动执行workflow，这就需要定义触发事件了。下面是自定触发事件的一个例子：
```yml
name: 
  Say Hello
on: 
  pull_request
```
上面的代码能在用户提交pull request时触发workflow，对于多个事件我们用方括号括起来，例如：
```yml
name: 
  Say Hello
on: 
  [pull_request,pull]
```
当然我们希望触发事件能更具体一些，就比如当一个pull request关闭或重新开启时触发workflow：
```yml
name: 
  Say Hello
on: 
  pull_request:
    type: 
      [reopend,closed]
```
想了解更多的触发事件请参考此处的[文档](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#about-workflow-events)。

#### 3.3 如何定义一个job
一个Workflow由一个或多个jobs构成，含义是一次持续集成的运行，可以完成多个任务，下面是一个例子。
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
每个job必须具有一个id与之关联。上面的`my_first_job`和`my_second_job`就是job的id。

#### 3.4 如何定义 job 的运行环境
指定运行job的运行环境，github上可用的操作系统为：
- Windows
- macos
- linux

下面是指定运行环境的一个例子：
```yml
# 受限于篇幅，前面代码部分省略
jobs:
  my_first_job:
    name: My first job
  runs-on: macos-10.15
```

#### 3.5 step的使用
每个job由多个step构成，它会从上至下依次执行。step可以运行commands（如linxu命令）以及action。
下面是一个输出hello world的例子：
```yml
# 受限于篇幅，前面代码部分省略
jobs:
  my_first_job:
    name: My first job
  runs-on: macos-10.15
  step:
    - name: Print a greeting
    # 定义 step 的环境变量
      env:
        FIRST_WORD: Hello
        SECOND_WORD: WORD
      # 运行指令：输出环境变量
      run: |
        echo $FIRST_WORD $SECOND_WORD.
```
接下来是action的使用，这里的action其实就是命令，比如github官方给了我们一些[默认的命令](https://github.com/marketplace?type=actions&query=actions)，我么可以直接使用这些命令来减少仓库中workflow的代码量。最常见的action是[checkout](https://link.zhihu.com/?target=https%3A//github.com/marketplace/actions/checkout)，它可以把仓库中最新的代码克隆到Workflow的工作区：
```yml
# 受限于篇幅，前面代码部分省略
  step:
    - name: Check out git repository 
      uses: actions/checkout@v2
```
有些action会需要传入额外的参数，一般使用with来设置参数值：
```yml
# 受限于篇幅，前面代码部分省略
  step:
    - name: Check out git repository 
      uses: actions/checkout@v2
      uses: actions/setup-node@v2.2.0
        with:
          node-version: 14
```

## 4 如何编写自己的action
#### 4.1 action.yml的配置
当在github action市场上找不到我们想要的action时我们可以自己动手编写满足自己需求的action。自定action需要在`.github`目录下新建一个`actions`目录，然后再新建一个自定的action名称的目录。每个action都需要有一个action.yml的配置文件，action.yml的runs段制定了操作的启动方式。启动方式可以分为三种：运行 Node.js脚本，运行Docker镜像，运行组合脚本。下面说明action.yml的常用参数：
- name: 自定action的名字
- description: 对action需要传入的参数或者输出进行声明
- inputs: 自定需要输入的参数
- outputs: 输出的变量
- runs: 启动方式

下面是一个action.yml的配置例子：

```yml
name: "example action"

description: "This is an example action"

inputs:
  param1:
    description: "The first param of this action"
    required: true  #必传参数必须要设置required为true

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
将runs.using设置为node16或node12，就可以指定为启动Node.js脚本。用main字段指定脚本的入口点。启动的方式类似于直接运行node main.js，所以并不会从 package.json中安装依赖。因此，在开发时，一般都会使用打包工具将依赖项打包到一起，输出一个单独的js文件，然后将这个文件作为入口点。post字段可以指定清理工作，这里的内容将会在 workflow 结束时运行。

#### 4.2使用Docker镜像
若使用Docker，我们需要把action.yml中的runs修改为：
```yml
runs:
  using: docker
  image: Dockerfile
```
image 指定镜像启动需要的Dockerfile，这里指定为项目根目录下的Dockerfile文件，在 Dockerfile中，用ENTRYPOINT或者CMD指定启动的脚本。比如这样定义一个用python运行脚本的程序：
```docker
FROM python:3

RUN pip install --no-cache-dir requests

COPY . .

CMD [ "python", "/main.py"]
```
这里可以看出使用Docker的优点：可以自定义运行环境，就能够使用除了Node.js以外的环境，也能使用其他的语言。

## 5 Github action项目实战
在本节我会以一个具体的例子来讲述如何编写自己的github action。
##### 问题
假设我们的github仓库中有许多待处理的issue，用户提交的每一个pull request可能会关联一个issue，如果每合并一个pull request后就要手动关闭一个issue会相当繁琐。
##### 解决
这时workflow就派上用场了。我们可以监听pull request的closed事件，同时判断closed时是被merged关闭还是非merged关闭。如果是merged关闭则关闭关联的issue。
但这里仍然有一个问题，如何获取关联的issue？我们可以要求用户在提交pull request时在描述部分添加需要关联的issue如`#345`，再把`345`的issue编号抽取出来。如何实现这个功能呢？我们可以自己来编写github action。为了让github action程序更加简洁，这里我使用docker来启动github action。首先是准备action.yml：
```yml
# github action 的名称
name: "Auto_close_associate_issue"
# 该action的描述
description: "Auto close an issue which associate with a PR."

#定义需要输入的参数
inputs:
  # 第一个参数名叫prbody
  prbody: 
    #对该参数名的描述
    description: "The body of the PR to search for related issues"
    # 必须参数
    required: true

outputs:
  #输出的参数名
  issurNumber:
    description: "The issue number"

runs:
  # 使用docker镜像
  using: "docker"
  image: "Dockerfile"
```

接下来是编写脚本文件，在这我使用node.js来编写脚本，此脚本的思路是：先从环境中获取变量值，抽取出issue编号再输出到环境中，对应的脚本（取名为main.js）如下：
```javascript
// 获取环境变量，所有传给github action的参数一律大写，且需要加上INPUT_前缀，此处是github规定的
let body = process.env['INPUT_PRBODY']; 
// 利用正则表达式抽取出issue编号数字
let pattern = /#\d+/;
let issueNumber = body.match(pattern)[0].replace('#', '');
// 输出到环境中
console.log(`::set-output name=issueNumber::${issueNumber}`);
```

接下来是docker的镜像文件（文件名为Dockerfile）：
```yml
FROM node:10.15

COPY . .

CMD [ "node", "/main.js"]
```

最后在`.github/actions/Auto_close_associate_issue`路径下放入`action.yml`、`Dockerfile`以及`main.js`三个文件，一个action的编写到此结束。

最后的最后就是编写workflow，workflow的配置在[开始编写第一个workflow](#3-开始编写第一个workflow)中进行了细致讲述，这里就不作具体赘述了，具体配置如下：
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





