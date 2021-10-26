<template>
<div>
  <div class="home-page">
    <div class="ctn-block">
      <div class="banner text-center">
        <h1 class="home-title"><span class="apache">Apache</span> <span class="linkis">Linkis</span> <span class="badge">Incubating</span></h1>
        <p class="home-desc" v-html="$t('message.home.banner.slogan')"></p>
        <div class="botton-row center">
          <a href="/#/docs/deploy/linkis" class="corner-botton blue-fill">{{$t('message.common.get_start')}}</a>
          <a :href="systemConfiguration.github.projectUrl" class="corner-botton blue"><img class="button-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABkvfSiAAAE2klEQVRIDa1WSyykWRQ+qrwf8YzQ3iTKWyrxmoWoWJHMoqIRKWErs7AYk1jIWDS9YCdshQWxQMsIYUE6Wm1qiJAIimjSqPaI8hrEu+Z8d9xKVak2mDnJrfvXueee79zzuteFXkApKSlqNzc3rYuLSz6PCN7y7nHbd4vFYrq/v9fz+GN5eXn+39S5PCeQmppaykAfGUT1nJxcY9BVHr8vLS0NSp7j7BQwIyMjjgX7FApFHoM57nn2P5+Y7u7uDN7e3rqZmZlNR+En2tRqdQELfXp4eAiGsASUM3hQCnLkST7W2Fizq6vr+9nZ2S/4L0kpPzA/gk2wsG9iYiJ5eXnR1dUVMbgYUhZAGOBLEPz39fWlmJgY8vHxodPTU29eq4yLi5ve2dn5Zt0rP3JycuJub29ncTJsampqgpW0uLhI/f39tLu7SxxP8vPzI3aXADs/P6eLiwsBymGgkpISio+Pp/X1daqvrxfyHFMz68seGRkR7nWVgJeXl32sMJj9TwkJCaRSqcjT05PS0tIoPT2dVldXKTo6moKCgkipVAoQNpD29vbIbDZTbm4uRUQggUl4BqeEd1g2+OvXr33M/glrAvAxG/PAgIvc3d3tXAVAANvGDLIgGIY9jmvwxvX1tZDhWOZpNJrSqampQQU4bMVHscI/2Mj+J1hvS44Kn1vDyTAkwSP7+/sCQ5GVlaVmhqgzWArLuNDFLDe8doY7MzMz7RKN9aqqq6vVCg6qVipE/CIjI0mr1Yo4SP5r5/DwcKqoqCB2pRUUp1xZWdEq+FT5UiEAOY2twZf8t8woKwBDp6Sbm5t8Bcfmn9RiLsogNDRUzFLorXNAQAAFBgZakw96gIWkkY1Y6EYx/x/EobK600bfO5GlkgGwk5MTZ4JS5MUzGgIaA7xmQxbE8LtkYBGFjLL4r3RwcECHh4d2gIy1C3iTVI6SWFtbI4PBIFlvmlHw4+PjdHZ2JroSlKDkPDw8TAoG0UutKG7OJOrt7SXu8pL9qhmxGxoaosnJSSsYFICfnJysVxYXF59ub2/XwJ0hISHCBSaTiTBQR2FhYbDsRaBbW1s0MDAgBlxqGz8chGvzV3Efcq80snIVijUqKooGBwdpc3NTNAHUE1smeiZ3JdHQbdER87m5OXFD8E1P3Kjp+PjYVkTUIpfJql6vTxL3YUFBwR5fP+UIMpq0RqMhbAYorIZCNPTCwsInTRrZ2NLSQqxMeIVvHQEmey9ih+JnT/4yPT29LAD58bPMV0/R0dFRJDK0qKhItDYYgJaEi7WyslJ0ITvT+Q/uRhiE6wsgckg5lFpsbKyhs7PzN/Cs9yG7U9fT0zNrNBqD5+fnRT9FE4d7kHVwpzNCnNDCnBFOx43cXFtbqxsdHRUi1ifGxMTEiU6n+3NjY6OShxIlIu9BJBNaFZLIGfFjiRYWFuzcDTDWcVtTU/NzWVnZgtz35BHV2NhYMDw8/ImFg/39/eUzgTo6OigpKUnus5vb29upu7tbAMqYcRjMdXV178vLy+0eUXZ9B1qam5u/VFVVZfPbxYB3DLIQsURa/4gAAkJy4OLmzDY0NDRkO4L9aL+V39raWsqZaeRnhIUfU6zXObW1tVn49BZ2nbGrq6vUquCtH2NjY2rO3g8M95nHKo+/Hge+P3PtfYDMS/T/DaQGbM8QvzFuAAAAAElFTkSuQmCC" alt="github"><span>GitHub</span></a>
        </div>
      </div>
      <h1 class="home-block-title text-center">{{$t('message.home.introduce.title')}}</h1>
      <div class="concept home-block">
        <div class="concept-item before">
          <h3 class="concept-title">{{$t('message.home.introduce.before')}}</h3>
          <div class="concept-ctn">
            <p class="home-paragraph">{{$t('message.home.introduce.before_text')}}</p>
            <img src="../../assets/home/before_linkis_en.png" alt="before" class="concept-image">
          </div>
        </div>
        <div class="concept-item after">
          <h3 class="concept-title">{{$t('message.home.introduce.after')}}</h3>
          <div class="concept-ctn">
            <p class="home-paragraph">{{$t('message.home.introduce.after_text')}}</p>
            <img src="../../assets/home/after_linkis_en.png" alt="after" class="concept-image">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home-page">
    <div class="ctn-block">
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
    </div>
  </div>
  <div class="home-page feature">
    <div class="ctn-block">
      <h1 class="home-block-title text-center">{{$t('message.common.core_features')}}</h1>
      <div class="features home-block text-center">
        <div class="feature-item connectivity">
          <h3 class="item-title">{{$t('message.common.connectivity')}}</h3>
          <p class="item-desc">{{$t('message.home.core.connectivity')}}</p>
        </div>
        <div class="feature-item scalability">
          <h3 class="item-title">{{$t('message.common.scalability')}}</h3>
          <p class="item-desc">{{$t('message.home.core.scalability')}}</p>
        </div>
        <div class="feature-item controllability">
          <h3 class="item-title">{{$t('message.common.controllability')}}</h3>
          <p class="item-desc">{{$t('message.home.core.controllability')}}</p>
        </div>
        <div class="feature-item orchestration">
          <h3 class="item-title">{{$t('message.common.orchestration')}}</h3>
          <p class="item-desc">{{$t('message.home.core.orchestration')}}</p>
        </div>
        <div class="feature-item">
          <h3 class="item-title">{{$t('message.common.reusability')}}</h3>
          <p class="item-desc">{{$t('message.home.core.reusability')}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="home-page">
    <div class="ctn-block">
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
  </div>
</div>
</template>
<style lang="less" scoped>
  @import url('/src/style/variable.less');
  @import url('/src/style/base.less');

  .home-page {
    padding: 64px 0 30px;
    &.feature{
      background: #eee url(/src/assets/home/features_bg.png) center no-repeat;
      background-size: cover;
    }
    .home-block-title{
      margin-bottom: 20px;
      font-size: 32px;
      line-height: 46px;
    }
    .home-block{
      padding: 20px 0;
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
        &.before{
          .concept-ctn{
            background: #e4e5e9;
          }
          .concept-title{
            background: #E4E5E9;
          }
        }
        &.after{
          .concept-ctn{
            background: #1E78E0;
            .home-paragraph{
              color: #fff;
            }
          }
          .concept-title{
            color: #fff;
            background: #1E78E0;
          }
        }
        .concept-ctn{
          padding: 60px 40px;
          border-radius: 10px;
        }
        .concept-title{
          display: inline-block;
          padding: 0 24px;
          font-size: 24px;
          line-height: 48px;
          font-weight: 600;
          margin-bottom: 16px;
          color: @enhance-color;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          border-bottom-left-radius: 24px;
        }
        .concept-image{
          width: 100%;
        }
      }
    }
    .show-case{
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      margin-bottom: 20px;
      .case-item{
        display: flex;
        min-width: 0;
        padding: 5px;
        height: 88px;
        background: #FFFFFF;
        box-shadow: 0 1px 20px 0 rgba(15,18,34,0.10);
        border-radius: 8px;
        align-items: center;
        justify-content: center;
        > img {
          max-width: 80%;
          max-height: 80%;
        }
      }
    }
    .features{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .feature-item{
        width: 320px;
        height: 320px;
        margin-right: 32px;
        margin-bottom: 32px;
        background: #FFFFFF;
        box-shadow: 0 0 16px 0 rgba(211,211,211,0.50);
        border-radius: 10px;
        padding: 126px 50px 24px;
        background-repeat: no-repeat;
        background-size: 80px;
        background-position: center 20px;
        &:nth-child(3n+3){
          margin-right: 0;
        }
        &.scalability{
          background-image: url(/src/assets/home/icons/scalability.png);
        }
        &.connectivity{
          background-image: url(/src/assets/home/icons/connectivity.png);
        }
        &.controllability{
          background-image: url(/src/assets/home/icons/controllability.png);
        }
        &.orchestration{
          background-image: url(/src/assets/home/icons/orchestration.png);
        }
        .item-title{
          margin-bottom: 8px;
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
    .banner {
      padding: 168px 0;
      .home-title {
        margin-bottom: 20px;
        font-size: 80px;
        line-height: 60px;

        .apache {
          color: #0F1223;
          font-weight: 600;
        }

        .linkis {
          color: #1E78E0;
          font-weight: 600;
        }

        .badge {
          font-size: 24px;
          font-weight: 500;
          color: #1E78E0;
        }
      }

      .home-desc {
        margin-bottom: 56px;
        font-size: 24px;
        color: @enhance-color;
        text-align: center;
        line-height: 32px;
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
