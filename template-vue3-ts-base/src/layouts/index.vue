<template>
  <div class="container-wrapper flex" :class="{ closeSide: !open }">
    <SideBar class="aside-container" :collapsed="open" />
    <div class="layout-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { SideBar } from './components';

const open = ref(true);
</script>

<style lang="less" scoped>
@import './layout.less';
</style>
