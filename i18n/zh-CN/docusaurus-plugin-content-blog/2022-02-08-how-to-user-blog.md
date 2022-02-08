---
title: 如何编写博客
authors: [Casion]
tags: [blog,guide]
---
> _本文主要指引大家如何在 Linkis 官网发布博文，欢迎大家提交关于Apache Linkis的博文文档，包括但不仅限于Linkis的安装/源码解析/架构/经验分享等。_

本文主要参考Docusaurus的官方[博文规范和示例](https://docusaurus.io/zh-CN/blog)，指引和规范可能并不完善，有任何意见或建议，欢迎提出。

<!--truncate-->
## 资源路径 

- 中文博文仓库路径:https://github.com/apache/incubator-linkis-website/tree/dev/i18n/zh-CN/docusaurus-plugin-content-blog
- 英文博文仓库路径:https://github.com/apache/incubator-linkis-website/tree/dev/blog

每篇博文需要支持中文和英文，提交时请不要遗漏对应的英文文档。

## 文件命名
框架会自动从目录/文件名中，解析出 YYYY-MM-DD 格式的发布日期
- 如：blog/2021-02-08-how-to-user-blog.md 
- http的访问路径是: http://xxxxx/blog/2021/02/08/how-to-user-blog

博文发布日志会根据文件自动解析出对应的日期:2021-02-08，这样默认就是按照日期进行排序。

## 图文博客规范
- ⚠ 如果博文有涉及到图片资源，需要加载本地图片资源，请使用文件夹的形式，这样可以方便的把博客所需要的图片等资源和Markdown 文档放在一起。
- ⚠ 如果是架构/流程等图片，原始的工程文件，如.vsdx文件，也请上传至img目录下，方便后续修改。请保证不要再英文博文中出现中文图片。 

```shell script
|-- blog
|   |--2021-02-08-how-to-user-blog 
|   |    |-- img //存放图片
|   |    |-- index.md //博文内容
```

参考示例:
- 源码：https://github.com/facebook/docusaurus/tree/main/website/blog/2022-01-24-docusaurus-2021-recap
- 视觉效果:https://docusaurus.io/zh-CN/blog/2022/01/24/docusaurus-2021-recap

## 摘要
博客的首页（默认为 /blog ）是博客列表页，会展示所有的博客文章。

在博文中使用 <!--truncate--> 来标记文章摘要。 <!--truncate--> 以上的内容均将成为摘要，会在博客主页进行展示。 
举个例子：
```markdown
---
title: 摘要示例
---

All these will be part of the blog post summary.

甚至包括这一行。

<!--truncate-->

但这一行和这一行下方的内容将不会被截取。

这行不会。

这行也不会。
```

## 元数据信息

Markdown 文档可以使用以下 Markdown 前端元数据字段，由---两边的线括起来。

```markdown
---
title: Welcome Docusaurus v2
description: This is my first post on Docusaurus 2.
data:2022-02-01 
slug: welcome-docusaurus-v2
authors:
  - name: Joel Marcey
    title: Co-creator of Docusaurus 1
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
  - name: Sébastien Lorber
    title: Docusaurus maintainer
    url: https://sebastienlorber.com
    image_url: https://github.com/slorber.png
tags: [hello, docusaurus-v2]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

Welcome to this blog. 此博客使用 [**Docusaurus 2**](https://docusaurus.io/) 搭建。

<!--truncate-->

这是我的首篇博文。

下方是一系列内容。
```
常用参数 

|姓名 |类型 |默认 |说明 |
| --- | --- | --- | --- |
| `authors` | `string` | `未定义` |博客文章作者（或唯一作者）列表。|
| `authors.url` | `string` | `未定义` |作者姓名将链接到的 URL。这可能是 GitHub、Twitter、Facebook 个人资料 URL 等。
| `authors.image_url` | `string` | `未定义` |作者缩略图的 URL。 |
| `authors.title` | `string` | `未定义` |作者的描述。 |
| `title` | `string` |降价标题 |博文标题。 |
| `date` | `string` |文件名或文件创建时间 |博文创建日期。如果未指定，则可以从文件或文件夹名称中提取，例如，`2021-04-15-blog-post.mdx`、`2021-04-15-blog-post/index.mdx`、`2021/ 04/15/blog-post.mdx`。否则，就是 Markdown 文件的创建时间。 |
| `tags` | `Tag[]` | `未定义` |两个字符串字段“标签”和“永久链接”的字符串或对象列表，用于标记您的帖子。 |
| `keywords` | `string[]` | `未定义` |关键字元标记，将成为 `<head>` 中的 `<meta name="keywords" content="keyword1,keyword2,..."/>`，供搜索引擎使用。 |
| `description` | `string` |第一行 Markdown 内容 |您的文档的描述，它将成为 `<meta name="description" content="..."/>` 和 `<meta property="og:description" content="..."/>` in `<head>`，被搜索引擎使用。 |
| `image` | `string` | `未定义` |显示帖子链接时将使用的封面或缩略图。 |
| `slug` | `string` |文件路径 |允许自定义博客文章 url (`/<routeBasePath>/<slug>`)。支持多种模式：`slug: my-blog-post`, `slug: /my/path/to/blog/post`, slug: `/`。 |

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `authors` | `Authors` | `undefined` | List of blog post authors (or unique author).|
| `authors.url` | `string` | `undefined` | The URL that the author's name will be linked to. This could be a GitHub, Twitter, Facebook profile URL, etc. |
| `authors.image_url` | `string` | `undefined` | The URL to the author's thumbnail image. |
| `authors.title` | `string` | `undefined` |  A description of the author. |
| `title` | `string` | Markdown title | The blog post title. |
| `date` | `string` | File name or file creation time | The blog post creation date. If not specified, this can be extracted from the file or folder name, e.g, `2021-04-15-blog-post.mdx`, `2021-04-15-blog-post/index.mdx`, `2021/04/15/blog-post.mdx`. Otherwise, it is the Markdown file creation time. |
| `tags` | `Tag[]` | `undefined` | A list of strings or objects of two string fields `label` and `permalink` to tag to your post. |
| `keywords` | `string[]` | `undefined` | Keywords meta tag, which will become the `<meta name="keywords" content="keyword1,keyword2,..."/>` in `<head>`, used by search engines. |
| `description` | `string` | The first line of Markdown content | The description of your document, which will become the `<meta name="description" content="..."/>` and `<meta property="og:description" content="..."/>` in `<head>`, used by search engines. |
| `image` | `string` | `undefined` | Cover or thumbnail image that will be used when displaying the link to your post. |
| `slug` | `string` | File path | Allows to customize the blog post url (`/<routeBasePath>/<slug>`). Support multiple patterns: `slug: my-blog-post`, `slug: /my/path/to/blog/post`, slug: `/`. |


##  作者信息维护

对于普通的博客文章作者来说，维护每篇博客文章中内联的作者信息可能很乏味。
可以在配置文件中全局声明这些作者：
`blog/authors.yml`
```yaml
Casion:
  name: Casion
  title: Development Engineer of WeBank
  url: https://github.com/casionone/
  image_url: https://avatars.githubusercontent.com/u/7869972?v=4
```
