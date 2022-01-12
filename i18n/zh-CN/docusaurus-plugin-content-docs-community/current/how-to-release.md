---
title: 如何发布版本
sidebar_position: 3
---

# Apache 发布指南
> 本文以发布 1.0.3 Apache版本为示例。如果是非Apache版本的发布指引见 [详细信息见](https://incubator.apache.org/guides/releasemanagement.html)  https://incubator.apache.org/guides/releasemanagement.html
 
理解 Apache 发布的内容和流程
Source Release 是 Apache 关注的重点，也是发布的必须内容；而 Binary Release 是可选项，
请参考以下链接，找到更多关于 ASF 的发布指南:

- [Apache Release Guide](http://www.apache.org/dev/release-publishing)
- [Apache Release Policy](http://www.apache.org/dev/release.html)
- [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

Apache的maven和SVN仓库都会使用到GPG签名来验证物料文件的合法性


## 1 工具准备
:::caution 注意
当本次发布者是首次进行发布时需要
:::

**主要包括签名工具GnuPG、Maven 仓库认证相关准备**

### 1.1 安装GPG

（以Window系统为例，如果有安装过git客户端，gpg可能已经存在，无需再次安装）

在[GnuPG官网](https://www.gnupg.org/download/index.html)下载二进制安装包（GnuPG binary releases）。目前最新版本为[Gpg4win-3.1.16 2021-06-11](https://gpg4win.org/download.html) 下载后请先完成安装操作
注：GnuPG的1.x版本和2.x版本的命令有细微差别，下列说明以2.2.28为例
安装后gpg命令添加至系统环境变量且可用
```sh
#检查版本，应该为2.x
$ gpg --version 
```

### 1.2 用gpg生成key

**需要注意以下几点：**
- 使用的邮箱应该是apache邮箱
- 名字最好使用拼音或者英文，否则会出现乱码

根据提示，生成 key
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
Your selection? 1 #这里输入1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096 #这里输入4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0 #这里输入0
Key does not expire at all
Is this correct? (y/N) y #这里输入y

GnuPG needs to construct a user ID to identify your key.

Real name: mingXiao #这里输入拼英或则英文名
Email address: xiaoming@apache.org #这里输入apache的邮箱地址
Comment: test key for apache create at 20211110  #这里输入一些注释，可以为空
You selected this USER-ID:
    "mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O #这里输入O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.

# 此时会弹出对话框，要求为这个gpg输入密钥，需要记住，后续发布会用到。
┌──────────────────────────────────────────────────────┐
│ Please enter this passphrase to protect your new key │
│                                                      │
│ Passphrase: _______不能少于8位______________          │
│ Repeat:     _______________________________          │
│                      <OK>          <Cancel>          │
└──────────────────────────────────────────────────────┘
#输入秘钥完毕后 需要执行一定的随机动作来生成加密素数，创建好后，会输出以下信息
gpg: key 1AE82584584EE68E marked as ultimately trusted
gpg: revocation certificate stored as 'C:/Users/xxx/AppData/Roaming/gnupg/openpgp-revocs.d\E7A9B12D1AC2D8CF857AF5851AE82584584EE68E.rev'
public and secret key created and signed.

pub   rsa4096 2021-11-10 [SC]
      E7A9B12D1AC2D8CF857AF5851AE82584584EE68E
uid                      mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>
sub   rsa4096 2021-11-10 [E]
```

### 1.3 上传生成的key到公共服务器

```shell
$ gpg  --keyid-format SHORT --list-keys 
pub   rsa4096/584EE68E 2021-11-10 [SC] #584EE68E就是key id
      E7A9B12D1AC2D8CF857AF5851AE82584584EE68E
uid         [ultimate] mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>
sub   rsa4096/399AA54F 2021-11-10 [E]

# 通过key id发送public key到keyserver 
$ gpg --keyserver keyserver.ubuntu.com --send-key 584EE68E
# 其中，keyserver.ubuntu.com为挑选的keyserver，建议使用这个, 因为Apache Nexus校验时是使用的这个keyserver
```
### 1.4 查看key是否创建成功
验证是否同步到公网，大概需要一分钟才能查到,未成功可以进行上传重试几次 
```shell
方式一
$ gpg --keyserver keyserver.ubuntu.com --recv-keys 584EE68E #584EE68E是对应的key id

D:\>gpg --keyserver keyserver.ubuntu.com --recv-keys 584EE68E
#结果如下
gpg: key 1AE82584584EE68E: "mingXiao (test key for apache create at 20211110) <xiaoming@apache.org>" not changed
gpg: Total number processed: 1
gpg:              unchanged: 1

方式二
直接访问https://keyserver.ubuntu.com/  输入用户名mingXiao搜索查询结果
```

### 1.5 将gpg公钥加入Apache SVN项目仓库的KEYS文件

> 这个步骤需要使用SVN，请先下载安装SVN客户端，Apache使用svn托管项目的发布内容

- Linkis DEV分支 https://dist.apache.org/repos/dist/dev/incubator/linkis
- Linkis Release分支 https://dist.apache.org/repos/dist/release/incubator/linkis

#### 1.5.1 在dev分支中添加公钥到KEYS

用于发布RC版本

```shell
mkdir -p linkis_svn/dev
cd linkis_svn/dev

svn co https://dist.apache.org/repos/dist/dev/incubator/linkis 
# 这个步骤比较慢，会把所有版本都拷贝下来，如果网断了，用svn cleanup删掉锁，重新执行一下，会断点续传
cd linkis_svn/dev/linkis

# 追加你生成的KEY到文件KEYS中, 追加后最好检查一下是否正确
(gpg --list-sigs YOUR_NAME@apache.org && gpg --export --armor YOUR_NAME@apache.org) >> KEYS 
# 如果之前存在KEYS文件，则不需要
svn add KEYS	
#提交到SVN
svn ci -m "add gpg key for YOUR_NAME" 
```

#### 1.5.2 在release分支中添加公钥到KEYS

用于发布正式版本

```shell

mkdir -p linkis_svn/release
cd linkis_svn/release

svn co https://dist.apache.org/repos/dist/release/incubator/linkis
# 这个步骤比较慢，会把所有版本都拷贝下来，如果网断了，用svn cleanup删掉锁，重新执行一下，会断点续传

cd  linkis
# 追加你生成的KEY到文件KEYS中, 追加后最好检查一下是否正确
(gpg --list-sigs YOUR_NAME@apache.org && gpg --export --armor YOUR_NAME@apache.org) >> KEYS 
# 如果之前存在KEYS文件，则不需要
svn add KEYS	
#提交到SVN
svn ci -m "add gpg key for YOUR_NAME" 
```


### 1.6 配置apache maven地址和用户密码设置

在maven的配置文件~/.m2/settings.xml中，则添加下面的`<server>`项 
加密设置可参考[这里](http://maven.apache.org/guides/mini/guide-encryption.html)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.1.0 http://maven.apache.org/xsd/settings-1.1.0.xsd" xmlns="http://maven.apache.org/SETTINGS/1.1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <servers>
    <!-- Apache Repo Settings -->
    <server>
        <id>apache.snapshots.https</id>
         <!-- APACHE LDAP 用户名 --> 
        <username>{user-id}</username>
         <!--APACHE LDAP 密码（使用经过mvn密机机制加密后的密码）-->
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
        <gpg.keyname>你的KEYID</gpg.keyname>
        <!-- Use an agent: Prevents being asked for the password during the build -->
        <gpg.useagent>true</gpg.useagent>
        <gpg.passphrase>你的私钥的密码</gpg.passphrase>
      </properties>
    </profile>
</profiles>
</settings>
```


## 2 准备物料包&Apache Nexus发布

### 2.1 准备分支/Tag/Release Notes

从待发布分支拉取新分支作为待发布分支，如现在要发布$`{release_version}`版本，则从待发布分支检出新分支`release-${release_version}-${condition_version}`，此后所有操作都在`release-${release_version}-${condition_version}`分支上进行，在最终发布完成后，合入主干分支。

如当前开发的源码分支为dev-1.0.3，需要发布1.0.3的版本
- 创建分支：release-1.0.3-rc1
- 创建tag：release-1.0.3-rc1

梳理本次变更发布的内容说明，按[模块][pr_url]方式排序。
进入到创建页面 https://github.com/apache/incubator-linkis/releases/new 
基于之前release-1.0.3-rc1的tag，创建一个release，并勾选`This is a pre-release`，将release notes 写入。

:::caution 注意
- 主仓库apache/incubator-linkis准备好发布分支/tag/release notes后,请fork到自己的仓库中进行下面步骤
:::


### 2.2 版本号确认

如果版本号不正确，需要统一修改版本号为

```
mvn versions:set -DnewVersion=1.0.3 
#修改最外层pom.xml中的配置  
<linkis.version>1.0.3</linkis.version>
```
检查代码是否正常，包括版本号，编译成功、单元测试全部成功，RAT检查成功等等
```
#build检查
$ mvn clean install -Dmaven.javadoc.skip=true
#RAT LICENSE检查 

#正常5分钟内可以执行完，如果长时间未执行结束，请检查是否由于编译等动作，增加了额外不必要检查的文件
$ mvn apache-rat:check

#无异常后 检查所有的rat文件 
find ./ -name rat.txt -print0 | xargs -0 -I file cat file > merged-rat.txt
```
若check异常，请检查是否由于编译等动作，增加了额外不必要检查的文件，可以移除掉。
rat check的白名单文件配置在外层pom.xml中的apache-rat-plugin插件配置中。

检查merged-rat.txt中所有license信息，注意Binaries 和Archives文件是否为0。
```text
Notes: 0
Binaries: 0
Archives: 0
0 Unknown Licenses
```
<font color="red">
如果不为0，需要确认源码中是否有对该二进制或则压缩文件的license进行说明，可以参考源码中引用的`linkis-engineconn-plugins/engineconn-plugins/python/src/main/py4j/py4j-0.10.7-src.zip`
</font>


### 2.3 发布jar包到Apache Nexus仓库
```shell
# 开始编译并上传 耗时大概在1h40min左右
mvn -DskipTests deploy -Prelease -Dmaven.javadoc.skip=true  
```
:::caution 注意
出现下列情况，请先登陆https://repository.apache.org/#stagingRepositories
 drop掉异常的任务，重新执行本步骤。
 
- 若使用网络代理或则请求方ip变化，可能会导致apache maven 拆分为了多次上传记录,最好关闭网络代理
- 若出现超时，需要重新deploy
:::
上述命令执行成功后，待发布版本包会自动上传到Apache的临时筹备仓库(staging repository)。所有被deploy到远程[maven仓库](http://repository.apache.org/)的Artifacts都会处于staging状态，访问https://repository.apache.org/#stagingRepositories, 使用Apache的LDAP账户登录后，就会看到上传的版本，`Repository`列的内容即为${STAGING.REPOSITORY}。 点击`Close`来告诉Nexus这个构建已经完成，只有这样该版本才是可用的。 如果电子签名等出现问题，`Close`会失败，可以通过`Activity`查看失败信息。
同时也生成了二进制文件 assembly-combined-package/target/apache-linkis-1.0.3-incubating-bin.tar.gz

步骤2.4-3.3执行命令，合并在release.sh脚本中，也可以通过release.sh脚本(见文末附录)来执行 

### 2.4 打包源码

```shell
mkdir -p dist/apache-linkis
#基于release-1.0.3-rc1分支打包源码的tar.gz物料
git archive --format=tar.gz --output="dist/apache-linkis/apache-linkis-1.0.3-incubating-src.tar.gz"  release-1.0.3-rc1
```
### 2.5 拷贝二进制文件

步骤2.3执行后，二进制文件已经生成，位于assembly-combined-package/target/apache-linkis-1.0.3-incubating-bin.tar.gz
```shell
cp  assembly-combined-package/target/apache-linkis-1.0.3-incubating-bin.tar.gz   dist/apache-linkis
```

### 2.6 打包前端管理台(如果需要发布前端)
:::caution 注意
如果不发布前端项目，可以跳过此步骤
:::

#### 2.6.1 安装Node.js
将Node.js下载到本地，安装即可。下载地址：[http://nodejs.cn/download/](http://nodejs.cn/download/) （建议使用node v14版本）
**该步骤仅第一次使用时需要执行。**

#### 2.6.2 安装依赖包
在终端命令行中执行以下指令：
```
#进入项目WEB根目录
cd incubator-linkis/web
#安装项目所需依赖
npm install
```
**该步骤仅第一次使用时需要执行。**

#### 2.6.3 打包前端管理台项目
在终端命令行执行以下指令对项目进行打包，生成压缩后的部署安装包。
检查web/package.json，web/.env文件，检查前端管理台版本号是否正确。
```
npm run build
```
上述命令执行成功后，会生成前端管理台安装包 `apache-linkis-${version}-incubating-web-bin.tar.gz`

注意：

```
1.Windows下npm install 步骤报错：
Error: Can't find Python executable "python", you can set the PYTHON env variable
安装windows-build-tools （管理员权限）
npm install --global --production windows-build-tools
安装node-gyp
npm install --global node-gyp

2.如果编译失败 请按如下步骤清理后重新执行
#进入项目工作目录，删除 node_modules
rm -rf node_modules
#删除 package-lock.json
rm -rf package-lock.json
#清除 npm 缓存
npm cache clear --force
#重新下载依赖
npm install

```

#### 2.6.4 拷贝前端管理台安装包

步骤2.6.3执行后，前端管理台安装包已经生成，位于 web/apache-linkis-1.0.3-incubating-web-bin.tar.gz
```shell
cp  web/apache-linkis-1.0.3-incubating-web-bin.tar.gz   dist/apache-linkis
```

### 2.7 对源码包/二进制包进行签名/sha512
```shell
cd  dist/apache-linkis
for i in *.tar.gz; do echo $i; gpg --armor --output $i.asc --detach-sig $i ; done # 计算签名

for i in *.tar.gz; do echo $i; sha512sum  $i > $i.sha512 ; done # 计算SHA512
```

### 2.8 检查生成的签名/sha512是否正确
验证签名是否正确如下：
```shell
cd dist/apache-linkis
for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i ; done
```
出现类似以下内容则说明签名正确，关键字：**`Good signature`**
```shell
    apache-linkis-xxx-incubating-src.tar.gz
    gpg: Signature made XXXX
    gpg:                using RSA key XXXXX
    gpg: Good signature from "xxx @apache.org>"
```

验证sha512是否正确如下：
```shell
cd dist/apache-linkis
for i in *.tar.gz; do echo $i; sha512sum --check  $i.sha512; done

```

详细验证流程可以参见[验证候选版本](how-to-verify.md)



## 3 发布Apache SVN仓库

- Linkis [DEV分支](https://dist.apache.org/repos/dist/dev/incubator/linkis) 用来存储候选版本的源码和二进制等原始物料
- Linkis [Release分支](https://dist.apache.org/repos/dist/release/incubator/linkis) 投票通过的RC版本，最终会移动到release库中


### 3.1 检出Linkis发布目录

从Apache SVN dev目录检出Linkis发布目录。

```shell
svn co https://dist.apache.org/repos/dist/dev/incubator/linkis  dist/linkis_svn_dev

```

### 3.2 将待发布的内容添加至SVN目录

创建版本号目录,以`${release_version}-${RC_version}`方式命名，RC_version 从1开始，即候选版本从RC1开始，在发布过程中，存在问题导致投票不通过，需要修正，则需要迭代RC版本，RC版本号要+1。
比如:1.0.3-RC1版本进行投票，若投票通过，无任何问题，则这个RC1版本物料作为最终版本物料发布。
若存在问题（linkis/incubator社区投票时，投票者会严格检查各种发布要求项以及合规问题），需要修正，则修正后，再重新发起投票，下次投票的候选版本为1.0.3-RC2。

```shell
mkdir -p dist/linkis_svn_dev/1.0.3-RC1
```

将源码包、二进制包和Linkis可执行二进制包添加至SVN工作目录。

```shell
cp -f  dist/apache-linkis/*   dist/linkis_svn_dev/1.0.3-RC1

```
### 3.3 提交Apache SVN

```shell
cd  dist/linkis_svn_dev/

# 检查svn状态
svn status
# 添加到svn版本
svn add 1.0.3-RC1
svn status
#提交至svn远程服务器 
svn commit -m "prepare for 1.0.3-RC1"

```
若svn命令出现中文乱码，可尝试设置编码格式。
 
## 4 验证Release Candidates

详细可以参见[How to Verify release](/how-to-verify.md)

## 5 发起投票

:::caution 注意
所有指向校验和、签名和公钥的链接都必须引用Apache主网站https://downloads.apache.org/并应使用https://(SSL)。例如：https://downloads.apache.org/incubator/linkis/KEYS

目前是用的DISCLAIMER-WIP免责申明，请在邮件中加入此说明`As the DISCLAIMER-WIP shows....`。如果后续解决了WIP待处理的问题后，可以去掉

WIP的使用，详细可见 https://issues.apache.org/jira/browse/LEGAL-469
:::


> Linkis 仍在孵化阶段，需要进行两次投票

- Linkis 社区投票，发送邮件至：`dev@linkis.apache.org`
- incubator 社区投票，发送邮件至：`general@incubator.apache.org` Linkis毕业后，只需要在Linkis社区投票

### 5.1 Linkis 社区投票阶段

1. Linkis 社区投票，发起投票邮件到`dev@linkis.apache.org`。PMC需要先按照文档检查版本的正确性，然后再进行投票。 经过至少72小时并统计到3个`+1` PMC member票后，才可进入下一阶段的投票。

2. 宣布投票结果,发起投票结果邮件到`dev@linkis.apache.org`。


#### 5.1.1 Linkis 社区投票模板

```html
标题：
[VOTE] Release Apache Linkis (Incubating) ${release_version} ${rc_version}

内容：

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
	    https://downloads.apache.org/incubator/linkis/KEYS

	GPG user ID:
	${YOUR.GPG.USER.ID}

    As the DISCLAIMER-WIP shows, this release still left some license problems, which will be gradually resolved during incubation.

	The vote will be open for at least 72 hours or until necessary number of votes are reached.

	Please vote accordingly:

	[ ] +1 approve
	[ ] +0 no opinion
	[ ] -1 disapprove with the reason

	Checklist for reference:

	[ ] Download links are valid.
	[ ] Checksums and PGP signatures are valid.
	[ ] Source code distributions have correct names matching the current release.
	[ ] LICENSE and NOTICE files are correct for each Linkis repo.
	[ ] All files have license headers if necessary.
	[ ] No compiled archives bundled in source archive.

	More detail checklist  please refer:
        https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist
    Steps to validate the release，Please refer to: 
        https://linkis.apache.org/community/how-to-verify
Thanks,
${Linkis Release Manager}
```

#### 5.1.2 宣布投票结果模板

```html
标题：
[RESULT][VOTE] Release Apache Linkis (Incubating) ${release_version} ${rc_version}

内容：
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

### 5.2 Incubator 社区投票阶段

1. Incubator社区投票，发起投票邮件到`general@incubator.apache.org`，需至少3个 `+1` IPMC Member投票，才可进入下一阶段。
2. 宣布投票结果,发起投票结果邮件到`general@incubator.apache.org` 并抄送至`dev@linkis.apache.org`。

#### 5.2.1 Incubator 社区投票模板

```html
标题：[VOTE] Release Apache Linkis(Incubating) ${release_version} ${rc_version}

内容：

Hello Incubator Community,

    This is a call for a vote to release Apache Linkis(Incubating) version
    ${release_version} ${rc_version}

    The Apache Linkis community has voted on and approved a proposal to release
    Apache Linkis(Incubating) version ${release_version} ${rc_version}

    We now kindly request the Incubator PMC members review and vote on this
    incubator release.

    Linkis community vote thread:
        • [Linkis社区投票链接]

    Vote result thread:
        • [Linkis社区投票结果链接]

    The release candidate:
        • https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/

    Git tag for the release:
        • https://github.com/apache/incubator-linkis/releases/tag/${release_version}-${rc_version}

    Release notes:
        • https://github.com/apache/incubator-linkis/releases/tag/${release_version}-${rc_version}

    The artifacts signed with PGP key [填写你个人的KEY], corresponding to [填写你个人的邮箱], that can be found in keys file:
        • https://downloads.apache.org/incubator/linkis/KEYS

    As the DISCLAIMER-WIP shows, this release still left some license problems, which will be gradually resolved during incubation.

    The vote will be open for at least 72 hours or until necessary number of votes are reached.

    Please vote accordingly:

    [ ] +1 approve
    [ ] +0 no opinion
    [ ] -1 disapprove with the reason

    More detail checklist  please refer:
        • https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist

    Steps to validate the release，Please refer to: 
        • https://linkis.apache.org/community/how-to-verify

Thanks,
On behalf of Apache Linkis(Incubating) community

```

#### 5.2.2 宣布投票结果模板

```html
标题：[RESULT][VOTE] Release Apache Linkis ${release_version} {rc_version}

内容：
Hi all

Thanks for reviewing and voting for Apache Linkis(Incubating) ${release_version} {rc_version}
release, I am happy to announce the release voting has passed with [投票结果数]
binding votes, no +0 or -1 votes. Binding votes are from IPMC

   - xxx
   - xxx
   - xxx

The voting thread is:
[Incubator社区投票链接]

Many thanks for all our mentors helping us with the release procedure, and
all IPMC helped us to review and vote for Apache Linkis(Incubating) release. I will
be working on publishing the artifacts soon.

Thanks
On behalf of Apache Linkis(Incubating) community
```


## 6 正式发布

### 6.1 合并分支

合并`${release_version}-RC`分支的改动到`master`分支，合并完成后删除`${release_version}-RC`分支

```shell
$ git checkout master
$ git merge origin/${release_version}-RC
$ git pull
$ git push origin master
$ git push --delete origin ${release_version}-RC
$ git branch -d ${release_version}-RC
```

### 6.2 迁移源码与二进制包

将源码和二进制包从svn的`dev`目录移动到`release`目录

```shell
#移动源码包与二进制包
$ svn mv https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version} https://dist.apache.org/repos/dist/release/incubator/linkis/ -m "transfer packages for ${release_version}-${rc_version}" 
# 下面操作 按实际情况 决定是否更新release 分支的key
# 清除原有release目录下的KEYS
$ svn delete https://dist.apache.org/repos/dist/release/incubator/linkis/KEYS -m "delete KEYS" 
# 拷贝dev目录KEYS到release目录
$ svn cp https://dist.apache.org/repos/dist/dev/incubator/linkis/KEYS https://dist.apache.org/repos/dist/release/incubator/linkis/ -m "transfer KEYS for ${release_version}-${rc_version}"
```

### 6.3 确认dev和release下的包是否正确

- 确认[dev](https://dist.apache.org/repos/dist/dev/incubator/linkis/)下的`${release_version}-${rc_version}`已被删除
- 删除[release](https://dist.apache.org/repos/dist/release/incubator/linkis/)目录下 上一个版本的发布包，这些包会被自动保存在[这里](https://archive.apache.org/dist/incubator/linkis/)

```shell
$ svn delete https://dist.apache.org/repos/dist/release/incubator/linkis/${last_release_version} -m "Delete ${last_release_version}"
```

### 6.4 在Apache Staging仓库发布版本

- 登录 http://repository.apache.org , 使用Apache账号登录
- 点击左侧的 Staging repositories，
- 搜索 Linkis 关键字，选择你最近上传的仓库，投票邮件中指定的仓库
- 点击上方的`Release`按钮，这个过程会进行一系列检查

> 等仓库同步到其他数据源，一般需要24小时

### 6.5 GitHub 版本发布

1. 基于最终发布的分支或则commit id打上tag。

2. 在 [GitHub Releases](https://github.com/apache/incubator/linkis/releases) 页面的 `${release_version}` 版本上点击 `Edit` 编辑版本号及版本说明，并点击 `Publish release`

### 6.6 更新下载页面

<font color='red'>中英文文档都要更新</font>

linkis的官网下载地址应该指向apache的官方地址

等待并确认新的发布版本同步至 Apache 镜像后，更新如下页面：

- https://linkis.apache.org/zh-CN/download/main
- https://linkis.apache.org/download/main

GPG签名文件和哈希校验文件的下载连接应该使用这个前缀：`https://downloads.apache.org/incubator/linkis/`



## 7 邮件通知版本发布完成

> 请确保Apache Staging仓库已发布成功，一般是在该步骤的24小时后发布邮件

发邮件到 `dev@linkis.apache.org` 、 `announce@apache.org`和`general@incubator.apache.org`
```html
标题：
[ANNOUNCE] Apache Linkis (Incubating) ${release_version} available

内容：
Hi all,

Apache Linkis (Incubating) Team is glad to announce the new release of Apache Linkis (Incubating) ${release_version}.

Apache Linkis (Incubating) builds a computation middleware layer to decouple the upper applications and the underlying data engines, provides standardized interfaces (REST, JDBC, WebSocket etc.) to easily connect to various underlying engines (Spark, Presto, Flink, etc.), while enables cross engine context sharing, unified job& engine governance and orchestration.

Download Links: https://linkis.apache.org/download/main/

Release Notes: https://linkis.apache.org/download/release-${release_version}/

Website: https://linkis.apache.org/

Linkis Resources:
- Issue: https://github.com/apache/incubator-linkis/issues
- Mailing list: dev@linkis.apache.org

- Apache Linkis (Incubating) Team

```


## 附件 
### 附件1 release.sh

步骤2.4-3.3执行命令，可以合并在release.sh脚本中
```shell script
#!/bin/bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# tar source code
release_version=1.0.3
#本次进行的RC版本 格式RCX
rc_version=RC1
#对应的git 仓库分支
git_branch=release-1.0.3-rc1

workDir=$(cd "$(dirname "$0")"; pwd)
cd ${workDir}; echo "enter work dir:$(pwd)"

rm -rf dist

mkdir -p  dist/apache-linkis

#step1 打包源码文件
git archive --format=tar.gz --output="dist/apache-linkis/apache-linkis-$release_version-incubating-src.tar.gz"  $git_branch
echo  "git archive --format=tar.gz --output='dist/apache-linkis/apache-linkis-$release_version-incubating-src.tar.gz'  $git_branch"

#step2 拷贝二进制编译包
cp  assembly-combined-package/target/apache-linkis-$release_version-incubating-bin.tar.gz   dist/apache-linkis

#step3 打包web(如果需要发布前端)

cd web
#安装依赖
npm install
npm run build
cp  apache-linkis-*-incubating-web-bin.tar.gz  ../dist/apache-linkis

#step4 签名

### 对源码包/二进制包进行签名/sha512
cd   ../dist/apache-linkis
for i in *.tar.gz; do echo $i; gpg --armor --output $i.asc --detach-sig $i ; done # 计算签名
for i in *.tar.gz; do echo $i; sha512sum  $i > $i.sha512 ; done # 计算SHA512

### 检查生成的签名/sha512是否正确
for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i ; done
for i in *.tar.gz; do echo $i; sha512sum --check  $i.sha512; done


#step5 上传至svn

cd ../
rm -rf linkis-svn-dev
svn co https://dist.apache.org/repos/dist/dev/incubator/linkis   linkis-svn-dev


mkdir -p linkis-svn-dev/${release_version}-${rc_version}
cp  apache-linkis/*tar.gz*    linkis-svn-dev/${release_version}-${rc_version}
cd  linkis-svn-dev

# 检查svn状态
svn status
# 添加到svn版本
svn add ${release_version}-${rc_version}
svn status
# 提交至svn远程服务器
svn commit -m "prepare for ${release_version} ${rc_version}"

```