<template>
  <div class="logo">
    <img :src="logo" alt="" />
    <h2 v-show="!collapsed" class="title">{{ title }}</h2>
  </div>
</template>

<script setup lang="tsx">
import logo from '@/assets/images/layout/vite.svg';
import { loadEnv } from '@/utils';

const title = loadEnv().VITE_TITLE;

defineOptions({
  name: 'Logo'
});

defineProps({
  collapsed: {
    type: Boolean
  }
});
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    margin-bottom: 0;
    font-size: 20px;
    color: var(--el-color-primary);
  }
}
</style>
