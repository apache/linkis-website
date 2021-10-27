<template>
    <docEn v-if="lang === 'en'"></docEn>
    <docZh v-else></docZh>
</template>
<script setup>
    import docEn from './mysql_zh.md';
    import docZh from './mysql_zh.md';

    // 初始化语言
    const lang = ref(localStorage.getItem('locale') || 'en');
</script>
