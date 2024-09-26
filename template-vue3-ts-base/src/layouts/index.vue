<template>
  <ALayout>
    <LayoutHeader></LayoutHeader>
    <ALayout class="main-layout">
      <ALayoutContent class="main-content">
        <router-view v-slot="{ Component }">
          <KeepAlive :include="cacheRouter" :max="10">
            <component :is="Component" />
          </KeepAlive>
        </router-view>
      </ALayoutContent>
    </ALayout>
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
.main-layout {
  height: calc(100vh - 70px);
}
/* 主页 */
.main-content {
  background: var(--bg-color);
  padding: 0;
  height: 100%;
  overflow-y: auto;
  position: relative;
}
</style>

<style lang="less"></style>
