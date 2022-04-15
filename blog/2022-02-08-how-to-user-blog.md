---
title: How to Write a Blog
authors: [Casion]
tags: [blog,guide]
---
> _This article mainly guides you how to publish blog posts on the Linkis official website. You are welcome to submit blog post documents about Apache Linkis, including but not limited to Linkis installation/source code analysis/architecture/experience sharing. _

This article mainly refers to Docusaurus' official [blog post specifications and examples] (https://docusaurus.io/zh-CN/blog). The guidelines and specifications may not be perfect. Any comments or suggestions are welcome.

<!--truncate-->
## Resource path

- Chinese blog post warehouse path: https://github.com/apache/incubator-linkis-website/tree/dev/i18n/zh-CN/docusaurus-plugin-content-blog
- English blog post warehouse path: https://github.com/apache/incubator-linkis-website/tree/dev/blog

Each blog post needs to support both Chinese and English. Please do not omit the corresponding English documents when submitting.

## File naming
The framework will automatically parse the release date in YYYY-MM-DD format from the directory/file name
- eg: blog/2021-02-08-how-to-user-blog.md
- The access path of http is: http://xxxxx/blog/2021/02/08/how-to-user-blog

The blog post release log will automatically parse the corresponding date according to the file: 2021-02-08, so the default is to sort by date.

## Graphic blog specification
- ⚠ If the blog post involves image resources and needs to load local image resources, please use the form of a folder, so that the resources such as images required by the blog can be conveniently put together with the Markdown document.
- ⚠ If it is a picture of the architecture/process, the original project file, such as .vsdx file, please upload it to the img directory for subsequent modification. Please ensure that no Chinese pictures appear in English blog posts.

```shell script
|-- blog
| |--2021-02-08-how-to-user-blog
| | |-- img //Store the image
| | |-- index.md //Blog content
````

Reference example:
- Source: https://github.com/facebook/docusaurus/tree/main/website/blog/2022-01-24-docusaurus-2021-recap
- Visual Effects: https://docusaurus.io/zh-CN/blog/2022/01/24/docusaurus-2021-recap

## Summary
The blog's home page ( /blog by default) is the blog list page, which displays all blog posts.

Use <!--truncate--> in blog posts to mark article abstracts. <!--truncate--> The above content will become a summary and will be displayed on the blog homepage.
for example:
````markdown
---
title: Abstract example
---

All these will be part of the blog post summary.

Even include this line.

<!--truncate-->

But this line and the content below this line will not be truncated.

This line will not.

Neither will this line.
````

## Metadata information

Markdown documents can use the following Markdown frontend metadata fields, enclosed by lines on either side of ---.

````markdown
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

Welcome to this blog. This blog is built using [**Docusaurus 2**](https://docusaurus.io/).

<!--truncate-->

This is my first blog post.

Below is a list of content.
````
Common parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `authors` | `Authors` | `undefined` | List of blog post authors (or unique author).|
| `authors.url` | `string` | `undefined` | The URL that the author's name will be linked to. This could be a GitHub, Twitter, Facebook profile URL, etc. |
| `authors.image_url` | `string` | `undefined` | The URL to the author's thumbnail image. |
| `authors.title` | `string` | `undefined` | A description of the author. |
| `title` | `string` | Markdown title | The blog post title. |
| `date` | `string` | File name or file creation time | The blog post creation date. If not specified, this can be extracted from the file or folder name, eg, `2021-04-15-blog-post. mdx`, `2021-04-15-blog-post/index.mdx`, `2021/04/15/blog-post.mdx`. Otherwise, it is the Markdown file creation time. |
| `tags` | `Tag[]` | `undefined` | A list of strings or objects of two string fields `label` and `permalink` to tag to your post. |
| `keywords` | `string[]` | `undefined` | Keywords meta tag, which will become the `<meta name="keywords" content="keyword1,keyword2,..."/>` in `<head> `, used by search engines. |
| `description` | `string` | The first line of Markdown content | The description of your document, which will become the `<meta name="description" content="..."/>` and `<meta property= "og:description" content="..."/>` in `<head>`, used by search engines. |
| `image` | `string` | `undefined` | Cover or thumbnail image that will be used when displaying the link to your post. |
| `slug` | `string` | File path | Allows to customize the blog post url (`/<routeBasePath>/<slug>`). Support multiple patterns: `slug: my-blog-post`, `slug: / my/path/to/blog/post`, slug: `/`. |


## Author information

For the average blog post author, maintaining author information inline in each blog post can be tedious.
Can be globally in the config file declare these authors:
`blog/authors.yml`
````yaml
Casion:
   name: Casion
   title: Development Engineer of WeBank
   url: https://github.com/casionone/
   image_url: https://avatars.githubusercontent.com/u/7869972?v=4
````