<template>
  <div class="ctn-block reading-area blog-ctn">
    <main class="main-content">
      <h1 class="blog-title">Born at China’s WeBank, now incubating in the ASF - Introducing Apache Linkis</h1>
      <!-- <div class="blog-info seperator"><span class="info-item">enjoyyin</span><span class="info-item">2021-9-2</span></div>
      <div class="blog-info seperator"><span class="info-item">5 min read</span><span class="info-item">tag</span></div> -->
    </main>
    <div class="side-bar">
      <router-link :to="doc.link" class="bar-item" v-for="(doc,index) in docs" :key="index">{{doc.title}}
        <router-link :to="children.link" class="bar-item" v-for="(children,cindex) in doc.children" :key="cindex">
          {{children.title}}
        </router-link>
      </router-link>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .blog-ctn {
    padding-top: 60px;
    padding-bottom: 80px;

    .blog-title {
      font-size: 24px;
    }

    .blog-info{
      display: flex;
      padding: 20px 0;
      font-size: 16px;
      color: rgba(15,18,34,0.45);
      &.seperator{
        .info-item{
          border-right: 1px solid rgba(15,18,34,0.45);
          &:last-child{
            border-right: 0;
          }
        }
      }
      .info-item{
        padding: 0 20px 0 28px;
      }
    }
  }
</style>
<script setup>
  const docs = [{
    title: '部署文档',
    link: '/docs/deploy/linkis',
    children: [{
      title: '快速部署 Linkis1.0',
      link: '/docs/deploy/linkis',
    }, {
      title: '快速安装 EngineConnPlugin 引擎插件',
      link: '/docs/deploy/engins',
    }, {
      title: 'Linkis1.0 分布式部署手册',
      link: '/docs/deploy/distributed',
    }, {
      title: 'Linkis1.0 安装包目录层级结构详解',
      link: '/docs/deploy/structure',
    }]
  }, ];
</script>