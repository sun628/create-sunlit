<template>
  <ALayout>
    <LayoutHeader></LayoutHeader>
    <ALayoutContent class="layout-main">
      <router-view v-slot="{ Component }">
        <KeepAlive :include="cacheRouter" :max="10">
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </ALayoutContent>
  </ALayout>
</template>
<script setup lang="ts">
import LayoutHeader from './Header.vue';
import cacheRouter from '@/routers/cacheRouter';
defineOptions({
  name: 'Layout',
});
</script>

<style lang="less" scoped>
/* 主页 */
.layout-main {
  background: var(--bg-color);
  padding: 0;
  height: calc(100% - 60px);
  overflow-y: auto;
  position: relative;
}
</style>

<style lang="less"></style>
