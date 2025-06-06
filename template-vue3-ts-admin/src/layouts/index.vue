<template>
  <a-layout class="layout">
    <AntSider
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <SiderMenu :collapsed="collapsed" />
    </AntSider>
    <a-layout>
      <LayoutHeader v-model:collapsed="collapsed" />
      <a-layout-content class="layout-content wh-full">
        <!-- <TabsView /> -->
        <router-view v-slot="{ Component, route }">
          <Suspense>
            <Transition name="fade-transform" mode="out-in" appear>
              <!-- <KeepAlive :include="keepAliveComponents"> -->
              <component :is="Component" :key="route.fullPath" />
              <!-- </KeepAlive> -->
            </Transition>
            <template #fallback>正在加载...</template>
          </Suspense>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Layout } from 'ant-design-vue';
const { Sider: AntSider } = Layout;
import Logo from './logo/index.vue';
import LayoutHeader from './header/index.vue';
import SiderMenu from './menu/menu.vue';

const collapsed = ref<boolean>(false);
// 自定义侧边栏菜单收缩和展开时的宽度
const asiderWidth = computed(() => (collapsed.value ? $toRem(80) : $toRem(220)));
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .ant-layout {
    overflow: hidden;
    .layout-content {
      flex: none;

      .fade-transform-enter-active,
      .fade-transform-leave-active {
        transition: all 0.5s;
      }

      .fade-transform-enter-from {
        opacity: 0;
        transform: translateX(50px);
      }

      .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(-50px);
      }
    }
  }
}
</style>
