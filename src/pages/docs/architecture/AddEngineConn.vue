<template>
  <docEn v-if="lang === 'en'"></docEn>
  <docZh v-else></docZh>
</template>
<script setup>
  import { ref } from "vue";

  import docEn from '../../../docs/architecture/AddEngineConn_en.md';
  import docZh from '../../../docs/architecture/AddEngineConn_zh.md';

  // 初始化语言
  const lang = ref(localStorage.getItem('locale') || 'en');
</script>
