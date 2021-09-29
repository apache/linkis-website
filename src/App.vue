<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
<div>
  <nav class="nav">
    <div class="ctn-block">
      <div class="nav-logo">
        Apache Linkis
      </div>
      <span class="nav-logo-badge">Incubating</span>
      <div class="menu-list">
        <router-link class="menu-item" to="/">Home</router-link>
        <router-link class="menu-item" to="/docs">Docs</router-link>
        <router-link class="menu-item" to="/faq">FAQ</router-link>
        <router-link class="menu-item" to="/download">Download</router-link>
        <router-link class="menu-item" to="/blog">Blog</router-link>
        <router-link class="menu-item" to="/team">Team</router-link>
        <div class="menu-item">Language</div>
      </div>
    </div>
  </nav>
  <router-view></router-view>
  <footer class="footer">
    <div class="ctn-block">
      <div class="footer-links-row">
        <div class="footer-links">
          <h3 class="links-title">Linkis</h3>
          <a href="" class="links-item">Documentation</a>
          <a href="" class="links-item">Events</a>
          <a href="" class="links-item">Releases</a>
        </div>
        <div class="footer-links">
          <h3 class="links-title">Community</h3>
          <a href="" class="links-item">GitHub</a>
          <a href="" class="links-item">Issue Tracker</a>
          <a href="" class="links-item">Pull Requests</a>
        </div>
        <div class="footer-links">
          <h3 class="links-title">Apache Software Foundation</h3>
          <a href="" class="links-item">Foundation</a>
          <a href="" class="links-item">License</a>
          <a href="" class="links-item">Sponsorship</a>
          <a href="" class="links-item">Thanks</a>
        </div>
      </div>
      <p class="footer-desc">Apache Linkis (Incubating) is an effort undergoing incubation at The Apache Software Foundation, sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p>
      <p class="footer-desc text-center">Copyright © 2021 The Apache Software Foundation. Apache Linkis, Apache Incubator, Linkis, Apache, the Apache feather logo, the Apache<br>Linkis logo and the Apache Incubator project logo are trademarks of The Apache Software Foundation.</p>
    </div>
  </footer>
</div>
</template>

<style lang="less">
@import url('/src/style/base.less');
.nav{
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(15,18,34,0.2);
  color: @enhance-color;
  .ctn-block{
    display: flex;
    align-items: center;
  }
  .nav-logo{
    line-height: 54px;
    font-weight: 500;
  }
  .nav-logo-badge{
    display: inline-block;
    margin-left: 4px;
    padding: 0 8px;
    line-height: 24px;
    background: #E8E8E8;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
  }
  .menu-list{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .menu-item{
      margin-left: 16px;
      margin-right: 16px;
      line-height: 52px;
      border-bottom: 2px solid transparent;
      transition: all ease .2s;
      cursor: pointer;
      &:hover,
      &.router-link-exact-active{
        color: @active-color;
        border-color: @active-color;
      }
    }
  }
}
.footer{
  padding-top: 40px;
  background: #F9FAFB;
  .footer-desc{
    padding: 0 20px 30px;
    color: #999999;
    font-weight: 400;
  }
  .footer-links-row{
    display: flex;
    font-size: 16px;
    .footer-links{
      flex: 1;
      padding: 20px;
      .links-title{
        margin-bottom: 16px;
      }
      .links-item{
        display: block;
        margin-bottom: 10px;
        color: rgba(15,18,34,0.65);
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
