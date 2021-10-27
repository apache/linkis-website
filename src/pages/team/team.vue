<template>
  <div class="ctn-block normal-page team-page">
    <h3 class="normal-title">Contributing</h3>
    <br>
    <p class="normal-desc" v-html="jsonData.info.desc"></p>
    <br>
    <h3 class="normal-title">PPMC</h3>
    <p class="normal-desc">{{jsonData.info.tip}}</p>
    <ul  class="character-list">
      <a :href="'https://github.com/'+ item.githubId" v-for="(item,index) in jsonData.list" :key="index" target="_blank">
        <li class="character-item text-center">
          <img class="character-avatar" :src="item.avatarUrl" :alt="item.name"/>
          <div class="character-desc">
            <h3 class="character-name">{{item.name}}</h3>
          </div>
        </li>
      </a>
    </ul>
    <!-- <p class="normal-desc" v-html="jsonData.info.tip"></p> -->
    <!--   <h3 class="normal-title">Contributors</h3>
     <p class="normal-desc">Use the links below to download the Apache Linkis (Incubating) Releases. See all Linkis releases in Github release page.</p>
    ]<ul class="contributor-list">
      <li class="contributor-item">apache/apisix-go-plugin-runner</li>
     </ul>-->
  </div>
</template>

<script >
   import utils  from "../../js/utils";
   import  list_en from "./teamdata_en.js";
   import  list_zh from "./teamdata_zh.js";

    export default {
        data() {
            return {
                utils,
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
<style lang="less" scoped>
@import url('/src/style/variable.less');
.team-page{
  .contributor-list{
    padding: 20px 0 40px;
    .contributor-item{
      display: inline-block;
      margin-right: 20px;
      margin-bottom: 20px;
      padding: 16px 16px 16px 48px;
      background-size: 24px;
      background-position: 16px center;
      background-repeat: no-repeat;
      color: @enhance-color;
      border: 1px solid rgba(15,18,34,0.20);
      border-radius: 4px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .character-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding: 20px 0 60px;
    &.committer{
      grid-template-columns: repeat(5, 224px);
      .character-item{
        display: flex;
        padding: 20px;
        align-items: center;
        .character-avatar{
          width: 60px;
          height: 60px;
          margin: 0;
        }
        .character-desc{
          flex: 1;
          padding-left: 16px;
          min-width: 0;
        }
      }
    }
    .character-item{
      border: 1px solid rgba(15,18,34,0.20);
      border-radius: 4px;
      // 辅助处理文字溢出
      min-width: 0;
      padding: 0 20px 20px;
      .character-avatar{
        width: 120px;
        height: 120px;
        margin: 30px auto 10px;
        background: #D8D8D8;
        border-radius: 50%;
      }
      .character-name{
        color: @enhance-color;
        line-height: 24px;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .character-link{
        color: rgba(15,18,34,0.65);
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>



