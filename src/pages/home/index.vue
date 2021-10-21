<template>
  <div class="ctn-block home-page">
    <div class="banner text-center">
      <h1 class="home-title"><span class="apache">Apache</span> <span class="linkis">Linkis</span> <span class="badge">Incubating</span></h1>
      <p class="home-desc">{{$t('message.home.banner.slogan')}}</p>
      <div class="botton-row center">
        <a href="/#/docs/deploy/linkis" class="corner-botton black">{{$t('message.common.get_start')}}</a>
        <a :href="systemConfiguration.github.projectUrl" class="corner-botton white">GitHub</a>
      </div>
    </div>
    <h1 class="home-block-title text-center">{{$t('message.home.introduce.title')}}</h1>
    <div class="concept home-block">
      <div class="concept-item">
        <h3 class="concept-title">{{$t('message.home.introduce.before')}}</h3>
        <p class="home-paragraph">{{$t('message.home.introduce.before_text')}}

        </p>
        <img src="../../assets/home/before_linkis_en.png" alt="before" class="concept-image">
      </div>
      <div class="concept-item">
        <h3 class="concept-title">{{$t('message.home.introduce.after')}}</h3>
        <p class="home-paragraph">{{$t('message.home.introduce.after_text')}}</p>
        <img src="../../assets/home/after_linkis_en.png" alt="after" class="concept-image">
      </div>
    </div>
    <div class="description home-block">
      <div class="description-content">
        <h1 class="home-block-title">{{$t('message.common.description')}}</h1>
        <p class="home-paragraph">{{$t('message.home.description.paragraph1')}}
        </p>
        <p class="home-paragraph">{{$t('message.home.description.paragraph2')}}
        </p>
        <div class="botton-row">
          <a href="/#/docs/architecture/DifferenceBetween1.0&0.x" class="corner-botton blue">{{$t('message.common.learn_more')}}</a>
        </div>
      </div>
      <img src="../../assets/home/description.png" alt="description" class="description-image">
    </div>
    <h1 class="home-block-title text-center">{{$t('message.common.core_features')}}</h1>
    <div class="features home-block">
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">{{$t('message.common.connectivity')}}</h3>
          <p class="item-desc">{{$t('message.home.core.connectivity')}}
          </p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">{{$t('message.common.scalability')}}</h3>
          <p class="item-desc">{{$t('message.home.core.scalability')}}
          </p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">{{$t('message.common.controllability')}}</h3>
          <p class="item-desc">{{$t('message.home.core.controllability')}}
          </p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">{{$t('message.common.orchestration')}}</h3>
          <p class="item-desc">{{$t('message.home.core.orchestration')}}
          </p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">{{$t('message.common.reusability')}}</h3>
          <p class="item-desc">{{$t('message.home.core.reusability')}}
          </p>
        </div>
      </div>
    </div>
    <h1 class="home-block-title text-center">{{$t('message.common.our_users')}}</h1>
    <div class="show-case home-block">
     <div class="case-item"> <img src="/src/assets/user/招联消费金融有限公司.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/平安.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/荣耀.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/360.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/天翼云.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/理想汽车.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/萨摩耶云.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/蔚来汽车.jpg" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/T3出行.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/百望云.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/海康威视.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/立创商城.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/红象云腾.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/艾佳生活.jpg" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/顶点软件.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/97物联.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/航天信息.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/boss直聘.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/华中科技大学.jpg" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/联创智融.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/mobtech.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/西安电子科技大学.jpg" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/依图.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/中体彩科技.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/万科采筑.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/东方通.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/中国电科.jpg" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/中通云仓.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/中国通信服务.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/之江实验室.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/信用生活.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/哗啦啦.jpg" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/圈外同学.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/云徒科技.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/成都大数据.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/杭州电魂网络.png" alt="name"></div>
      <div class="case-item"> <img src="/src/assets/user/桔子分期.png" alt="name"></div>
       <!-- <template  v-for="(item,index) in img" :key="index"> -->
        <!-- <div class="case-item"> <img v-bind:src="'/src/assets/user/'+item.url" alt="name"></div> -->
      <!-- </template> -->
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import url('/src/style/variable.less');
  @import url('/src/style/base.less');

  .home-page {
    .home-block-title{
      margin-bottom: 20px;
      font-size: 32px;
      line-height: 46px;
    }
    .home-block{
      padding: 20px 0 88px;
      .home-paragraph{
        font-size: 18px;
        color: #4A4A4A;
        line-height: 26px;
        font-weight: 400;
        margin-bottom: 16px;
      }
    }
    .description{
      display: flex;
      align-items: center;
      .description-content{
        flex: 1;
      }
      .description-image{
        margin-left: 40px;
        width: 630px;
      }
    }

    .concept{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 20px;
      .concept-item{
        padding: 30px 20px;
        border: 1px dashed #979797;
        border-radius: 10px;
        .concept-title{
          font-size: 24px;
          line-height: 34px;
          margin-bottom: 16px;
          color: @enhance-color;
        }
        .concept-image{
          width: 100%;
        }
      }
    }
    .show-case{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      .case-item{
        display: flex;
        min-width: 0;
        height: 88px;
        background: #FFFFFF;
        box-shadow: 0 1px 20px 0 rgba(15,18,34,0.10);
        border-radius: 8px;
        align-items: center;
        justify-content: center;
        > img {
          max-width: 90%;
          max-height: 90%;
        }
      }
    }
    .features{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 20px;
      .feature-item{
        height: 370px;
        background: #FFFFFF;
        box-shadow: 0 0 16px 0 rgba(211,211,211,0.50);
        border-radius: 10px;
        padding-top: 100px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center top;
        .item-content{
          padding: 30px 20px;
          text-align: left;
          .item-title{
            margin-bottom: 20px;
            color: #393939;
            line-height: 26px;
            font-size: 18px;
            font-weight: 500;
          }
          .item-desc{
            color: #666666;
            line-height: 22px;
            font-weight: 400;
          }
        }
      }
    }
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
    }

    .botton-row{
      display: flex;
      &.center{
        justify-content: center;
      }
    }
  }
</style>
// <script setup>
//   import { ref } from "vue"
//   import  systemConfiguration from "../../js/config"
//   import img from "./img";

//   const lang = ref(localStorage.getItem('locale') || 'en');
// </script>

<script >
  import { ref } from "vue"
  import  systemConfiguration from "../../js/config"
  import img from "./img";

  export default {
    data() {
      return {
        systemConfiguration,
        img,
      }
    },
    methods:{
      imageSrc(url) {
            require('@/assets/user/' + url) ;
            
        }
    },
    created() {
      const lang = localStorage.getItem('locale');
    },
    computed: {
        
    }

  }
</script>
