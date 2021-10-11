
<!--<template>-->
<!--  <div>faq</div>-->
<!--</template>-->

<template>
  <div class="ctn-block reading-area">
    <main class="main-content">
        <docEn v-if="lang === 'en'"></docEn>
        <docZh v-else></docZh>
    </main>
  </div>
</template>
<style lang="less">
  .reading-area {
    display: flex;
    padding: 60px 0;
    min-height: 600px;

    .main-content {
      width: 1200px;
      padding: 30px;
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
  import { ref } from "vue";

  import docEn from './faq_en.md';
  import docZh from './faq_zh.md';

  // 初始化语言
  const lang = ref(localStorage.getItem('locale') || 'en');
</script>
