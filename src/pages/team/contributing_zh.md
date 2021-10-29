# Contributing

非常感谢贡献Linkis项目！在参与贡献之前，请仔细阅读以下指引。

## 一、贡献范畴

### 1.1 Bug 反馈与修复

我们建议无论是 Bug 反馈还是修复，都先创建一个 Issue 来仔细描述 Bug 的状况，以助于社
区可以通过 Issue 记录来找到和回顾问题以及代码。Bug 反馈 Issue 通常需要包含完整描述
**Bug** 的信息以及可复现的场景，这样社区才能快速定位导致 Bug 的原因并修复它。包含
#bug 标签的打开的 Issue 都是需要被修复的。

### 1.2 功能交流、实现、重构

在交流过程中，详细描述新功能（或重构）的细节、机制和使用场景，能够促使它更好更快地
被实现。如果计划实现一个重大的功能（或重构），请务必通过 **Issue** 或其他方式与核心开
发团队进行沟通，这样大家能以最效率的方式来推进它。包含 #feature 标签的打开的 Issue
都是需要被实现的新功能，包含 #enhancement 标签的打开的 Issue 都是需要改进重构的功
能。

### 1.3 Issue 答疑

帮助回答 Issue 中的使用问题是为 Linkis 社区做贡献的一个非常有价值的方式；社区中总会有
新用户不断进来，在帮助新用户的同时，也可以展现你的专业知识。

### 1.4 文档改进

Linkis 用户手册文档维护在github的Linkis-Doc项目中，可以编辑项目里的 Markdown 文件，通过提pr的方式来对文档做改进。

## 二、贡献流程

### 2.1 分支结构

Linkis 源码可能会产生一些临时分支，但真正有明确意义的只有以下三个分支：

```
master: 最近一次稳定 release 的源码，偶尔会多几次 hotfix 提交；
branch-0.10.0: 最新稳定版
dev-1.0.0: 主要开发分支；
```

### 2.2 开发指引

Linkis 前后端代码共用同一个代码库，但在开发上是分离的。在着手开发之前，请先将 Linkis
项目 fork 一份到自己的 Github Repositories 中， 开发时请基于自己 Github Repositories 中的Linkis 代码库进行开发。

我们建议克隆 dev-1.0.0 分支来开发，这样在向 Linkis 主项目提交 PR 时合并冲突的可能性会
小很多

```
git clone https://github.com/yourname/Linkis.git --branch dev-1.0.0
```
#### 2.2.1 后端

用户配置在项目根目录 /config/ 下，项目启动脚本和升级补丁脚本在项目根目录 /bin/ 下，
后端代码及核心配置在 server/ 目录下, 日志在项目根目录 /log/ 下。注意：此处所指项目根目
录都指环境变量 LINKIS_HOME 所配置的目录，在使用 IDE 开发过程中也需要配置环境变量，
如 Idea 关于环境变量加载的优先级：Run/Debug Configurations 中配置的 Environment
variables —> IDE缓存的系统环境变量。

**2.2.1.1** 目录结构

```
1. 脚本
```
```
├── assembly-package/bin # 脚本目录
 ├── install.sh # 一键部署脚本
 ├── checkEnv.sh # 环境检查脚本
 └── common.sh # 通用脚本函数
```
```
├── sbin # 脚本目录
 ├── linkis-daemon.sh # 单服务启停、状态检测脚本
 ├── linkis-start-all.sh # 一键启动脚本
 ├── linkis-stop-all.sh # 一键停止脚本
 └── ext # 单独服务脚本目录
    ├── linkis-xxx.sh # 某个服务的启动脚本
    ├── linkis-xxx.sh 
    ├── ...
```
    
```
2. 配置
```
```
├── assembly-package/config # 用户配置目录
 ├── linkis-env.sh # 一键部署的配置变量设置
 ├── db.sh # 一键部署的数据库配置
```
```
3. 代码目录结构
详见 Linkis代码目录结构
4. 日志目录
```
```
├── logs # 日志根目录
```
**2.2.1.2** 环境变量


```
配置系统环境变量或 IDE 环境变量 LINKIS_HOME，推荐优先使用 IDE 环境变量。
```
**2.2.1.3** 数据库

```
1. 自行创建 Linkis 系统数据库；
2. 修改 conf/db.sh 中的数据库相应信息并执行bin/install.sh 或 直接在数据库客户端导入
db/linkis_*.sql。
```
**2.2.1.4** 配置文件

修改conf目录下的application-linkis.yml文件，以及各微服务名对应的properties文件，配置相关属性。

**2.2.1.5** 打包

```
1. 打完整 release 包需要修改根目录下 /assembly/src/main/assembly/assembly.xml 中相关版本信息，然后在根目录下执行: mvn clean package 即可；
2. 打每个模块 的包可直接在 模块目录下执行 mvn clean package。
```
### 2.3 Pull Request 指引

#### 如果你还不知道怎样向开源项目发起 PR，请参考这篇说明

```
无论是 Bug 修复，还是新功能开发，请将 PR 提交到 dev-1.0.0 分支。
PR 和提交名称遵循 <type>(<scope>): <subject> 原则，详情可以参考阮一峰的[Commitmessage 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) 这篇文章。
如果 PR 中包含新功能，理应将文档更新包含在本次 PR 中。
如果本次 PR 尚未准备好合并，请在名称头部加上 [WIP] 前缀（WIP = work-in-
progress）。
所有提交到 dev-1.0.0 分支的提交至少需要经过一次 Review 才可以被合并
```
### 2.4 Review 标准

在贡献代码之前，可以了解一下什么样的提交在 Review 中是受欢迎的。简单来说，如果一项
提交能带来尽可能多增益和尽可能少的副作用或风险，那它被合并的几率就越高，Review 的
速度也会越快。风险大、价值低的提交是几乎不可能被合并的，并且有可能会被拒绝连
Review 的机会都没有。

**2.4.1** 增益

```
修复导致 Bug 的主要原因
添加或修复一个大量用户亟需的功能或问题
简单有效
容易测试，有测试用例
减少复杂度以及代码量
```

#### 经社区讨论过的、确定需要改进的问题

#### 2.4.2 副作用和风险

```
仅仅修复 Bug 的表面现象
引入复杂度高的新功能
为满足小众需求添加复杂度
改动稳定的现有API或语义
导致其他功能不能正常运行
添加大量依赖
随意改变依赖版本
一次性提交大量代码或改动
```
**2.4.3 Reviewer** 注意事项

```
请使用建设性语气撰写评论
如果需要提交者进行修改，请明确说明完成此次 Pull Request 所需要修改的所有内容
如果某次 PR 在合并后发现带来了新问题，Reviewer 需要向 PR 作者联系并沟通解决问
题；如果无法联系到 PR 作者，Reviewer 需要将此次 PR 进行还原
```
## 三、贡献进阶

### 3.1 关于 Committers （ Collaborators ）

**3.1.1** 如何成为 **Committer**

如果你对 Linkis 代码有过颇具价值的 PR 并且被合并，你可以通过官方微信群联系核心开发团
队申请成为 Linkis 项目的 Committer；核心开发团队和其他 Committers 将会一起投票决定是否允许你的加入，如果得到足够票数，你将成为 Linkis 项目的 Committer。

**3.1.2 Committer** 的权利

```
可以加入官方开发者微信群，参与讨论和制定开发计划
可以对 Issue 进行管理，包括关闭、添加标签
可以创建和管理项目分支，master、dev-1.0.0 分支除外
可以对提交到 dev-1.0.0 分支的 PR 进行 Review
可以申请成为 Committee 成员
```
### 3.2 关于 Committee

**3.2.1** 如何成为 **Committee** 成员


如果你是 Linkis 项目的 Committer，并且你贡献的所有内容得到了其他 Committee 成员的认
可，你可以申请成为 Linkis Committee 成员，其他 Committee 成员将会一起投票决定是否允
许你的加入，如果全票通过，你将成为 Linkis Committee 成员。

**3.2.2 Committee** 成员的权利

```
可以合并其他 Committers 和贡献者提交到 dev-1.0.0 分支的 PR
```

