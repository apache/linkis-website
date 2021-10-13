<template>
  <div class="ctn-block reading-area blog-ctn">
    <main class="main-content">
      <ul class="blog-list">
        <li class="blog-item">
          <h1 class="blog-title">Born at China’s WeBank, now incubating in the ASF - Introducing Apache Linkis</h1>
          <div class="blog-info">
            <span class="info-item">enjoyyin</span>
            <span class="info-item sperator">|</span>
            <span class="info-item">2021-9-2</span>
          </div>
          <p class="blog-preview">Guangsheng Chen, the founder of Apache EventMesh, has been buzzing since the project was welcomed into the Apache Software Foundation (ASF)’s incubator in February 2021. There’s a growing community supporting work on the open source software — used to decouple the application</p>
          <div class="blog-info seperator"><span class="info-item">5 min read</span><span class="info-item">tag</span></div>
          <router-link to="/blog/event" class="corner-botton blue">Read More</router-link>
        </li>
      </ul>
    </main>
  </div>
</template>
<style lang="less" scoped>
  .blog-ctn {
    .blog-item{
      position: relative;
      padding: 30px;
      margin-bottom: 20px;
      background: rgba(15,18,34,0.03);
      border-radius: 8px;
      .blog-preview{
        text-align: justify;
      }
      .corner-botton{
        position: absolute;
        right: 30px;
        bottom: 30px;
      }
    }
  }
</style>