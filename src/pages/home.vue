<template>
  <div v-if="lang === 'en'" class="ctn-block home-page">
    <div class="banner text-center">
      <h1 class="home-title"><span class="apache">Apache</span> <span class="linkis">Linkis</span> <span class="badge">Incubating</span></h1>
      <p class="home-desc">{{$t('message.home.banner.slogan')}}</p>
      <div class="botton-row center">
        <a href="/" class="corner-botton black">Get Started</a>
        <a href="/" class="corner-botton white">GitHub</a>
      </div>
    </div>
    <h1 class="home-block-title text-center">Computation Governance Concept</h1>
    <div class="concept home-block">
      <div class="concept-item">
        <h3 class="concept-title">Before</h3>
        <p class="home-paragraph">Each upper application directly connects to and accesses various underlying engines in a tightly coupled way, which makes big data platform a complex network architecture.</p>
        <img src="../assets/home/before_linkis_en.png" alt="before" class="concept-image">
      </div>
      <div class="concept-item">
        <h3 class="concept-title">After</h3>
        <p class="home-paragraph">Build a common layer of "computation middleware" between the numerous upper-layer applications and the countless underlying engines to resolve these complex connection problems in a standardized reusable way</p>
        <img src="../assets/home/after_linkis_en.png" alt="before" class="concept-image">
      </div>
    </div>
    <div class="description home-block">
      <div class="description-content">
        <h1 class="home-block-title">Description</h1>
        <p class="home-paragraph">Linkis provides standardized interfaces (REST, JDBC, WebSocket etc.) to easily connect to various underlying engines (Spark, Presto, Flink, etc.), and acts as a proxy between the upper applications layer and underlying engines layer. </p>
        <p class="home-paragraph">Linkis is able to facilitate the connectivity, governance and orchestration capabilities of different kind of engines like OLAP, OLTP (developing), Streaming, and handle all these "computation governance" affairs in a standardized reusable way.</p>
        <div class="botton-row">
          <a href="/" class="corner-botton blue">Learn More</a>
        </div>
      </div>
      <img src="../assets/home/description.png" alt="description" class="description-image">
    </div>
    <h1 class="home-block-title text-center">Core Features</h1>
    <div class="features home-block">
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">Connectivity</h3>
          <p class="item-desc">Simplify the operation environment; decouple the upper and lower layers, which make the upper layer insensitive when bottom layers changed</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">Scalability</h3>
          <p class="item-desc">Distributed microservice architecture with great scalability and extensibility; quickly integrate with the new underlying engine</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">Controllability</h3>
          <p class="item-desc">Converge engine entrance, unify identity verification, high-risk prevention and control, audit records; label-based multi-level refined resource control and recovery capabilities</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">Orchestration</h3>
          <p class="item-desc">Computing strategy design based on active-active, mixed computing, transcation Orchestrator Service</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">Reusability</h3>
          <p class="item-desc">Highly reduced the back-end development workload of upper-level applications development; Swiftly and efficiently build a data platform tool suite based on Linkis</p>
        </div>
      </div>
    </div>
    <h1 class="home-block-title text-center">Our Users</h1>
    <div class="show-case home-block">
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
    </div>
  </div>
  <div v-else class="ctn-block home-page">
    <div class="banner text-center">
      <h1 class="home-title"><span class="apache">Apache</span> <span class="linkis">Linkis</span> <span class="badge">Incubating</span></h1>
      <p class="home-desc">{{$t('message.home.banner.slogan')}}</p>
      <div class="botton-row center">
        <a href="/" class="corner-botton black">开始</a>
        <a href="/" class="corner-botton white">GitHub</a>
      </div>
    </div>
    <h1 class="home-block-title text-center">计算治理理念</h1>
    <div class="concept home-block">
      <div class="concept-item">
        <h3 class="concept-title">没有Linkis之前</h3>
        <p class="home-paragraph">每个上层应用以紧耦合的方式直接连接和访问各种底层引擎，这使得大数据平台成为一个复杂的网络架构</p>
        <img src="../assets/home/before_linkis_zh.png" alt="before" class="concept-image">
      </div>
      <div class="concept-item">
        <h3 class="concept-title">有Linkis之后</h3>
        <p class="home-paragraph">在丰富的上层应用和丰富的底层引擎之间构建一个公共的“计算中间件”层，以标准化的可复用方式解决这些复杂的连接问题</p>
       <img src="../assets/home/after_linkis_zh.png" alt="before" class="concept-image">
      </div>
    </div>
    <div class="description home-block">
      <div class="description-content">
        <h1 class="home-block-title">描述</h1>
        <p class="home-paragraph">Linkis 提供标准化接口（REST、JDBC、WebSocket 等），方便连接各种底层引擎（Spark、Presto、Flink 等），充当上层应用层和底层引擎层之间的代理</p>
        <p class="home-paragraph">Linkis 能够促进 OLAP、OLTP（开发）、Streaming 等不同类型引擎的连接、治理和编排能力，并以标准化的可重用方式处理所有这些“计算治理”事务.</p>
        <div class="botton-row">
          <a href="/" class="corner-botton blue">了解更多</a>
        </div>
      </div>
     <img src="../assets/home/description.png" alt="description" class="description-image">
    </div>
    <h1 class="home-block-title text-center">核心功能</h1>
    <div class="features home-block">
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">连通性</h3>
          <p class="item-desc">简化操作环境；上层和下层解耦，使上层在底层变化时不敏感</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">可扩展性</h3>
          <p class="item-desc">分布式微服务架构，具有很好的可伸缩性和扩展性；快速与新的底层引擎集成</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">可控性</h3>
          <p class="item-desc">融合引擎入口，统一身份验证，高风险防控，审计记录；基于标签的多级精细化资源控制和恢复能力</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">编排</h3>
          <p class="item-desc">基于双活、混合计算、事务Orchestrator服务的计算策略设计</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="item-content">
          <h3 class="item-title">可复用性</h3>
          <p class="item-desc">大大减少了上层应用开发的后端开发工作量；可基于Linkis快速高效搭建数据平台工具套件</p>
        </div>
      </div>
    </div>
    <h1 class="home-block-title text-center">我们的用户</h1>
    <div class="show-case home-block">
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
      <div class="case-item"></div>
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
        height: 88px;
        background: #FFFFFF;
        box-shadow: 0 1px 20px 0 rgba(15,18,34,0.10);
        border-radius: 8px;
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
<script setup>
  import { ref } from "vue"
  // 初始化语言
  const lang = ref(localStorage.getItem('locale') || 'en');
</script>
