<template>
  <div class="ctn-block home-page text-center">
    <div class="banner">
      <h1 class="home-title"><span class="apache">Apache</span> <span class="linkis">Linkis</span> <span class="badge">Incubating</span></h1>
      <p class="home-desc">Decouple the upper applications and the underlying data<br>engines by building a middleware layer.</p>
      <div class="botton-row">
        <a href="/" class="corner-botton black">Get Started</a>
        <a href="/" class="corner-botton white">GitHub</a>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import url('/src/style/base.less');

  .home-page {
    .banner {
      padding: 168px 0;
      .home-title {
        margin-bottom: 20px;
        font-size: 60px;
        line-height: 84px;

        .apache {
          color: @enhance-color;
        }

        .linkis {
          color: #1A529C;
        }

        .badge {
          font-size: 24px;
          font-weight: 400;
        }
      }

      .home-desc {
        margin-bottom: 80px;
        font-size: 24px;
        color: @enhance-color;
        text-align: center;
        line-height: 26px;
        font-weight: 400;
      }

      .botton-row{
        display: flex;
        justify-content: center;
        .corner-botton{
          margin-right: 22px;
          padding: 0 40px;
          height: 46px;
          line-height: 46px;
          border-radius: 25px;
          &:last-child{
            margin-right: 0;
          }
          &.black{
            color: #fff;
            background: @enhance-color;
            border: 1px solid  @enhance-color;
          }
          &.white{
            color: @enhance-color;
            background: #fff;
            border: 1px solid @enhance-color;
          }
        }
      }
    }
  }
</style>