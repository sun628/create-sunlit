<template>
  <div class="logo">
    <SvgIcon name="vite" class="mr-5" />
    <h2 v-show="!collapsed" class="title">{{ VITE_TITLE }}</h2>
  </div>
</template>

<script setup lang="tsx">
import { loadEnv } from '@/utils';

const { VITE_TITLE } = loadEnv();

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

  .logo-icon {
    margin-right: 5px;
  }

  .title {
    margin-bottom: 0;
    font-size: 20px;
    color: var(--color-primary);
  }
}
</style>
