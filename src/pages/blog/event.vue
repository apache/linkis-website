<template>
  <div class="ctn-block reading-area blog-ctn">
      <main class="main-content">
        <component :is="optionComponent"></component>
      </main>
<!--      <h1 class="blog-title">Born at China’s WeBank, now incubating in the ASF - Introducing Apache Linkis</h1>-->
      <!-- <div class="blog-info seperator"><span class="info-item">enjoyyin</span><span class="info-item">2021-9-2</span></div>
      <div class="blog-info seperator"><span class="info-item">5 min read</span><span class="info-item">tag</span></div> -->
<!--    <div class="side-bar">-->
<!--      <router-link :to="doc.link" class="bar-item" v-for="(doc,index) in docs" :key="index">{{doc.title}}-->
<!--        <router-link :to="children.link" class="bar-item" v-for="(children,cindex) in doc.children" :key="cindex">-->
<!--          {{children.title}}-->
<!--        </router-link>-->
<!--      </router-link>-->
<!--    </div>-->
  </div>
</template>
<script >
  import { defineAsyncComponent } from "vue";
  export default {
    computed: {
          optionComponent() {
              const id=this.$route.query.id;
              const lang =localStorage.getItem('locale')=="en"?"en":"zh";
              const path="./"+id+"_"+lang+".md";
              console.log(path);
              return defineAsyncComponent(() =>
                  import(path)
              );
          }
      }

  }
</script>
