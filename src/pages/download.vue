<template>
  <div class="ctn-block normal-page download-page">
    <h3 class="team-title">Download</h3>
    <p class="team-desc">Use the links below to download the Apache Linkis (Incubating) Releases. See all Linkis releases in <a class="desc-link" href="">Github release page</a></p>
    <ul class="download-list">
      <li class="download-item">
        <h3 class="item-title"><span>Linkis-1.0.2</span><span><span class="release-date">Release Date: </span>2021-9-2</span></h3>
        <p class="item-desc">This release mainly introduces Flink-support into Linkis ecosystem.</p>
        <ul class="item-info">
          <li class="info-tag">New Features <span class="nums">6</span></li>
          <li class="info-tag">Enhancement <span class="nums">6</span></li>
          <li class="info-tag">BUG fixs <span class="nums">6</span></li>
          <li class="info-tag">Changelog</li>
        </ul>
        <a href="" class="corner-botton blue">Download</a>
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
