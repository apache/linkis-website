## Apache Gobblin 
- 孵化时间:2017-02-23 ~ 2021-01-20
- 毕业讨论邮件:https://lists.apache.org/thread/9z79b2648bcxy6pw78bfhvq1jkwy0lox
- 孵化信息: https://incubator.apache.org/projects/gobblin.html 
- 反馈的问题: 


## Apache Ratis 
- 孵化时间:2017-01-03 ~ 2021-02-17
- 毕业讨论邮件: https://lists.apache.org/thread/0x2pbbr0khldfo2t8vp49cnl9oz51wcb 
- 孵化信息: https://incubator.apache.org/projects/ratis.html 
- 反馈的问题: 
    - 邮件流量问题 Adjust Github nofications settings to use issues@ mailing list


## Apache Pinot 
- 孵化时间:2018-10-17 ~ 2021-07-21
- 毕业讨论邮件: https://lists.apache.org/thread/9y63b4fosbocmsj8qlyzg8j4c6166b54
- 孵化信息: https://incubator.apache.org/projects/pinot.html 
- 反馈的问题:
    - 文档有一些 ASF 软件的品牌问题 https://github.com/prestodb/presto/issues/16271
One other thing you might want to correct, all of the download links to previous version are broken on your download page. [1] The previous version are automatically archived and can be found here. [2] You may also want to consider not calling the convenience binary an “offical binary release”.


## Apache Hop 
- 孵化时间:2020-09-24 ~ 2021-12-16
- 毕业讨论邮件: https://lists.apache.org/thread/jj46blkwrhf0l31srtzo5j5dcv7zsqz3
- 孵化信息: https://incubator.apache.org/projects/hop.html
- 反馈的问题:
    - 下载区有几个旧版本；这些应该被删除
    - 项目描述太长，需优化相关的措辞

## Apache AGE 
- 孵化时间:2020-04-29 ~ 2022-05-18
- 毕业讨论邮件: https://lists.apache.org/thread/jvrtvcw1zb8gf286css7tvol94r3qd68
- 孵化信息: https://incubator.apache.org/projects/age.html
- 反馈的问题:
    - 三名 PPMC 成员未订阅私人邮件列表。
    - 包括一些 PPMC 成员在内的四名 Committer 没有将他们的 apache id 映射到他们的 GitHub id。他们如何做出贡献？
    - 没有人加入PPMC

讨论指出的问题比较多，多次发起了 


## Apache YuniKorn 
- 孵化时间:2020-01-21 ~ 2022-03-16
- 毕业讨论邮件:  https://lists.apache.org/thread/o8y4b3mp21f608745ngqqdhc628qtwxf
- 孵化信息: https://incubator.apache.org/projects/yunikorn.html
- 反馈的问题:


## Apache Doris 
- 孵化时间:2018-07-18 ~ 2022-06-15
- 毕业讨论邮件: https://lists.apache.org/thread/nbncjl8fdq0bcjop6l4747c8x9c06q00
- 孵化信息: https://incubator.apache.org/projects/doris.html
- 反馈的问题:
    - DorisDB  和 StarRocks的侵权问题 
    - 百度在中国拥有 Doris 商标，该商标是否已转让给 ASF？
    - 与 Apache Impala 的关系 

注:涉及比较多的商标和License 问题

- 毕业清单  https://cwiki.apache.org/confluence/display/DORIS/Graduation+Check+List
 
## Apache MXNet 

- 孵化时间:2017-01-23 ~ 2022-06
- 毕业讨论邮件: https://lists.apache.org/thread/3rxzjcmo2y457y6r8ohz1j4qv49joyo6
- 孵化信息: https://incubator.apache.org/projects/mxnet.html
- 反馈的问题:
    - 不应该使用 Google Analytics，而是使用 Apache 安装的 Matomo 跟踪器。
    - 第三方产品名称问题  3rd party product name listed

- - ICLA签署
https://cwiki.apache.org/confluence/display/MXNET/ICLA+Progress



## Apache ShenYu 
- 孵化时间:2021-05-03 ~ 2022-06
- 毕业讨论邮件: https://lists.apache.org/thread/cc2myvso0pbyl39yv26bdmzml8jjvpt2
- 孵化信息: https://incubator.apache.org/projects/shenyu.html
- 反馈的问题:
    - 主页描述不够精简 最好用简短而清晰的句子来 说明它在做什么
    -  网站上提到了 5 个版本，而不是 4 个,在孵化之前的需要标识出  There's no 2.3.0 version release. And the 2.3.0 document is marked legacy now https://github.com/ apache/incubator-shenyu-website/pull/604
    -  文档中名字最好带上 Apache 前缀  https://github.com/apache/incubator-shenyu/pull/3568
    -  商标问题 \[Branding Issue] Shenyu is still decleared as a project of dromara community https://lists.apache.org/thread/o9bwzkl3cjbrmzx4n36l63xbv0q112px


## Apache DataSketches
- 孵化时间:2019-03-30 ~ 2020-12-16
- 毕业讨论邮件: https://lists.apache.org/thread/kcpo1ngkmh9q3zgxl5vo64m9m62c45m0
- 孵化信息: https://incubator.apache.org/projects/datasketches.html
- 反馈的问题:
    - 如果有重要贡献者没有作为初始贡献者加入 podling，或者如果有其他公司实体可以在代码中主张权利，则 podling 必须从这些个人或公司获得 SGA






1. 之前尝试在Jira上提单申请hub账户 但是反馈坐席满了， 推荐使用Github Docker Registry。  这个是否存在合规性问题(官网文档https://incubator.apache.org/guides/distribution.html#docker 是说：
Artifacts need to be placed in https://hub.docker.com/r/apache/<project>）

2. 另外对于容器镜像构建过程中 的Dockfile文件，使用了基础镜像 如centos:7 ，以及通过如yun install unzip 的安装的基础环境软件包, 或则使用curl/ADD/COPY  to a destination inside the Docker image. 这些第三方的工具的使用 是否需要单独在LICENSE中进行 罗列说明 。 


1. 我们之前申请hub账号权限， 但是反馈seat 坐席满了， 推荐使用Github Docker Registry。  这个是否符合asf docker 镜像分发要求(官网文档https://incubator.apache.org/guides/distribution.html#docker 提到：
Artifacts need to be placed in https://hub.docker.com/r/apache/<project>）

2. 另外对于构建docker 镜像使用的 Dockfile文件，使用了基础镜像 如centos:7 ，以及通过如yun install unzip 的安装的基础环境软件包, 或则使用 ADD/COPY  添加资源 to a destination inside the Docker image. 这些第三方的工具的使用 是否需要单独在LICENSE文件中进行 罗列说明 。 


https://issues.apache.org/jira/browse/INFRA-22785

https://issues.apache.org/jira/browse/INFRA-22785
DockerHub is out of seats. Project is using GitHub Registry instead.

About docker image release and license 

We applied for the DockerHub permission before[1], but the feedback DockerHub is out of seats. It is recommended to use the Github Docker Registry. 
Does this meet the asf docker image distribution requirements (the official website document[2]mentions:
artifacts need to be placed in https://hub.docker.com/r/apache/<project>)

In addition, for the Dockfile file used to build the docker image[3], use the basic image such as centos, 
and the basic environment package installed through such as `yun install unzip`, 
or use `ADD/COPY` to add resources to a destination inside the Docker image. 
Whether the use of these third-party tools needs to be listed separately in the LICENSE file. 
If so, for the toolkit installed by the yum command, it seems that the indirect dependency license cannot be listed well.


1. https://issues.apache.org/jira/browse/INFRA-22785
2. https://incubator.apache.org/guides/distribution.html#docker 
3. https://github.com/apache/incubator-linkis/blob/dev-1.3.0/linkis-dist/docker/ldh.Dockerfile


We applied for the Docker Hub permission before[1], but the feedback Docker Hub is out of seats. 
It is recommended to use the Github Docker Registry. 
Does this meet the ASF docker image distribution requirements (The official website document[2] 
mentions:artifacts need to be placed in https://hub.docker.com/r/apache/<project>)

In addition, for the Dockfile file used to build the docker image[3], use the basic image such as CentOS, 
and the basic environment package installed through such as `yun install unzip`, 
or use `ADD/COPY` to add resources to a destination inside the Docker image. 
Whether the use of these third-party tools needs to be listed separately in the LICENSE file. 
If so, for the toolkit installed by the yum command, it seems that the indirect dependency license cannot be listed well.


1. https://issues.apache.org/jira/browse/INFRA-22785
2. https://incubator.apache.org/guides/distribution.html#docker 
3. https://github.com/apache/incubator-linkis/blob/dev-1.3.0/linkis-dist/docker/ldh.Dockerfile

Best Regards!
Apache Linkis(Incubating)
Chen Xia
