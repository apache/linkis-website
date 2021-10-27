<template>
  <div class="ctn-block reading-area blog-ctn">
    <main class="main-content">
      <docEn v-if="lang === 'en'"></docEn>
      <docZh  v-else></docZh>
    </main>
  </div>
</template>
<script setup>
  import { ref } from "vue";
  import docEn from './contributing_en.md';
  import docZh from './contributing_zh.md';

   const lang = ref(localStorage.getItem('locale') || 'en');
</script>
