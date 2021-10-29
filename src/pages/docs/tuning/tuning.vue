<template>
    <docEn v-if="lang === 'en'"></docEn>
    <docZh v-else></docZh>
</template>
<script setup>
    import { ref } from "vue";

    import docEn from './tuning_en.md';
    import docZh from './tuning_zh.md';


    // 初始化语言
    const lang = ref(localStorage.getItem('locale') || 'en');
</script>
