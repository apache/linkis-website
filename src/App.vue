<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="nav">
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
    .menu-item{
      margin-left: 16px;
      margin-right: 16px;
      line-height: 52px;
      border-bottom: 2px solid transparent;
      transition: all ease .2s;
      cursor: pointer;
      &:hover,
      &.router-link-active{
        color: @active-color;
        border-color: @active-color;
      }
    }
  }
}
</style>
