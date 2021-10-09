<template>
  <div class="ctn-block reading-area">
    <main class="main-content">
      <deploy></deploy>
    </main>
    <div class="side-bar">
      <a :href="'#/blog' + doc.anchor" class="bar-item" v-for="(doc,index) in docs" :key="index">{{doc.title}}
        <a :href="'#/blog' + children.anchor" class="bar-item" v-for="(children,cindex) in doc.children" :key="cindex">{{children.title}}
        </a>
      </a>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .reading-area {
    display: flex;
    padding: 60px 0;

    .main-content {
      width: 900px;
      padding: 30px;
      min-height: 600px;
    }

    .side-bar {
      flex: 1;
      padding: 18px 0;
      border-left: 1px solid #eaecef;

      .bar-item {
        display: block;
        padding: 5px 18px;
        color: #4A4A4A;
      }
    }
  }
</style>
<script setup>
import deploy from '../docs/deploy.md';
  const docs = [{
    title: '部署文档',
    anchor: 'deploy',
    children: [{
      title: '快速部署 Linkis1.0',
      anchor: 'deploy-linkis'
    }, {
      title: '快速安装 EngineConnPlugin 引擎插件',
      anchor: 'deploy-engine'
    }, {
      title: 'Linkis1.0 分布式部署手册',
      anchor: 'deploy-handbook'
    }, {
      title: 'Linkis1.0 安装包目录层级结构详解',
      anchor: 'deploy-detail'
    }]
  }]
</script>