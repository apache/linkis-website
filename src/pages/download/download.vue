<template>
  <div class="ctn-block normal-page download-page">
    <h3 class="normal-title">Download</h3>
    <p class="normal-desc" v-html="jsonData.info.desc"></p>
    <ul class="download-list" v-for="item in jsonData.list">
      <li class="download-item">
        <h3 class="item-title"><span>Linkis-{{item.version}}</span><span><span class="release-date">Release Date: </span>{{item.releaseDate}}</span></h3>
        <p class="item-desc">{{item.releaseDesc}}</p>
        <ul class="item-info">
          <li class="info-tag">{{$t('message.common.newFeatures')}} <span class="nums">{{item.newFeatures}}</span></li>
          <li class="info-tag">{{$t('message.common.enhancement')}} <span class="nums">{{item.enhancement}}</span></li>
          <li class="info-tag">{{$t('message.common.bugFixs')}} <span class="nums">{{item.bugFixs}}</span></li>
          <li class="info-tag">{{$t('message.common.changeLog')}} </li>
        </ul>
        <a :href="systemConfiguration.github.projectReleaseUrl+'/tag/'+item.version" class="corner-botton blue">{{$t('message.common.download')}}</a>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
@import url('/src/style/variable.less');
.download-page{
  .download-list{
    padding: 40px 0;
    .download-item{
      position: relative;
      padding: 30px;
      margin-bottom: 20px;
      border: 1px solid rgba(15,18,34,0.20);
      border-radius: 8px;
      font-size: 16px;
      .item-title{
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        line-height: 34px;
        .release-date{
          color: rgba(15,18,34,0.45);
          font-weight: 400;
        }
      }
      .item-desc{
        padding: 10px 0 40px;
      }
      .corner-botton{
        position: absolute;
        right: 30px;
        bottom: 30px;
      }
      .item-info{
        display: flex;
        color: rgba(15,18,34,0.45);
        line-height: 22px;
        .info-tag{
          padding-right: 30px;
          .nums{
            color: @enhance-color;
          }
        }
      }
    }
  }
}
</style>
<!--<script setup>-->
<!--  import { ref } from "vue"-->
<!--  import  systemConfiguration from "../../js/config"-->
<!--  const lang = ref(localStorage.getItem('locale') || 'en');-->
<!--</script>-->

<script >
  import utils  from "../../js/utils";
  import  systemConfiguration from "../../js/config"
  import  list_en from "./downloaddata_en.js";
  import  list_zh from "./downloaddata_zh.js";

  export default {
    data() {
      return {
        utils,
        jsonData: null,
        systemConfiguration,
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
