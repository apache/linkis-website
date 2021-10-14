<template>
    <div class="ctn-block reading-area blog-ctn">
        <main class="main-content">
            <ul class="blog-list">{{lang}}
                <li v-for="item in jsonData" class="blog-item">
                    <h1 class="blog-title">{{item.title}}</h1>
                    <div class="blog-info">
                        <span class="info-item">{{item.author}}</span>
                        <span class="info-item sperator">|</span>
                        <span class="info-item">{{item.createTime}}</span>
                    </div>
                    <p class="blog-preview">
                        {{item.summary}}</p>
                    <div class="blog-info seperator"><span class="info-item">{{item.readCost}}</span><span
                            class="info-item">{{item.tag}}</span></div>
                    <router-link :to='"/blog/event?id="+item.id' class="corner-botton blue">{{$t('message.common.read_more')}}</router-link>
                </li>
            </ul>
        </main>
    </div>
</template>
<style lang="less" scoped>
    .blog-ctn {
        .blog-item {
            position: relative;
            padding: 30px;
            margin-bottom: 20px;
            background: rgba(15, 18, 34, 0.03);
            border-radius: 8px;

            .blog-preview {
                text-align: justify;
            }

            .corner-botton {
                position: absolute;
                right: 30px;
                bottom: 30px;
            }
        }
    }
</style>

<script >
  import  list_en from "./blogdata_en.js";
  import  list_zh from "./blogdata_zh.js";

  export default {
    data() {
      return {
        "jsonData": null
      }
    },
    created() {
      const lang = localStorage.getItem('locale');
      if (lang === "en") {
        this.jsonData = list_en;
      } else {
        this.jsonData = list_zh;
      }
    }

  }
</script>
