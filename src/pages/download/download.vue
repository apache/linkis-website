<template>
  <div class="ctn-block normal-page download-page">
    <h3 class="normal-title">Download</h3>
    <p class="normal-desc" v-html="jsonData.info.desc"></p>
    <ul class="download-list" v-for="item in jsonData.list">
      <li class="download-item">
        <h3 class="item-title"><span>Linkis-{{item.version}}</span><span><span class="release-date">{{$t('message.common.releaseDate')}}:</span>{{item.releaseDate}}</span></h3>
        <p class="item-desc">{{item.releaseDesc}}</p>
        <ul class="item-info">
          <li class="info-tag">{{$t('message.common.newFeatures')}} <span class="nums">{{item.newFeatures}}</span></li>
          <li class="info-tag">{{$t('message.common.enhancement')}} <span class="nums">{{item.enhancement}}</span></li>
          <li class="info-tag">{{$t('message.common.bugFixs')}} <span class="nums">{{item.bugFixs}}</span></li>
          <li class="info-tag"><a :href=item.changeLogUrl target="_blank" >{{$t('message.common.changeLog')}} <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="nums"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a> </li>
        </ul>
        <a :href=item.downloadUrl class="corner-botton blue">{{$t('message.common.download')}}</a>
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
          > a{
            color: rgba(15,18,34,0.45);
          }
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
