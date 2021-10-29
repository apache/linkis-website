<template>
  <div  v-if="lang === 'en'" class="ctn-block normal-page">
    <h1>Sorry,Page Not Found!!!</h1>
    <br>
    <p>You can contact us via email(dev@linkis.incubator.apache.org) or submitting an issue on github</p>
    <br>
   </div>
   <div  v-else class="ctn-block normal-page">
    <h1>抱歉，请求的资源未找到！！！</h1>
        <br>
     <p>您可以通过邮件（dev@linkis.incubator.apache.org）告知我们或则通过github提交issue.</p>
     <br>
   </div>
</template>
<script setup>
  import { ref } from "vue";
  // 初始化语言
  const lang = ref(localStorage.getItem('locale') || 'en');
</script>