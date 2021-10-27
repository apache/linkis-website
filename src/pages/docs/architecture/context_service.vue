<template>
  <docEn v-if="lang === 'en'"></docEn>
  <docZh v-else></docZh>
</template>
<script setup>
  import { ref } from "vue";

  import docEn from './context_service_en.md';
  import docZh from './context_service_zh.md';

  // 初始化语言
  const lang = ref(localStorage.getItem('locale') || 'en');
</script>
