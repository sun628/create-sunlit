<template>
  <AntLayout class="layout">
    <AntSider
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />

      <AsideMenu :collapsed="collapsed" :theme="getTheme" />
    </AntSider>
    <AntLayout>
      <!-- <component :is="name" /> -->

      <!-- <PageHeader v-model:collapsed="collapsed" :theme="getTheme">
        <template v-if="layoutSetting.layout === 'topmenu'" #left>
          <Logo :collapsed="collapsed" />
        </template>
        <template v-if="layoutSetting.layout === 'topmenu'" #menu>
          <AsideMenu :collapsed="collapsed" :theme="getTheme" />
        </template>
      </PageHeader>
      <AntContent class="layout-content">
        <TabsView />
      </AntContent>
      <PageFooter /> -->

      <AntContent class="layout-content wh-full">
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
      </AntContent>
    </AntLayout>
  </AntLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Layout as AntLayout } from 'ant-design-vue';

const { Sider: AntSider } = AntLayout;
import Logo from './logo/index.vue';
// import { TabsView } from './tabs';
import AsideMenu from './menu/menu.vue';
// import PageHeader from './header/index.vue';
// import PageFooter from './footer';
import { useAppStore } from '@/store';

const { layoutSetting } = useAppStore();

const collapsed = ref<boolean>(false);
// 自定义侧边栏菜单收缩和展开时的宽度
const asiderWidth = computed(() => (collapsed.value ? $toRem(80) : $toRem(220)));
const getTheme = computed(() => (layoutSetting.navTheme === 'light' ? 'light' : 'dark'));
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
