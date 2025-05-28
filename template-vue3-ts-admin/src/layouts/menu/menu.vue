<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <Menu
      v-model:selected-keys="selectedKeys"
      :open-keys="isSideMenu ? openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="collapsed"
      collapsible
    >
      <template v-for="item in menus" :key="item.name">
        <SubMenuItem :item="item" />
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Menu, type MenuTheme } from 'ant-design-vue';
import SubMenuItem from './components/SubMenuItem.vue';
import { useAppStore, useUserStore } from '@/store';

type MenuProps = {
  collapsed: boolean;
  theme: MenuTheme;
};

withDefaults(defineProps<MenuProps>(), {
  collapsed: false,
  theme: 'light'
});

const userStore = useUserStore();
const { layoutSetting } = useAppStore();
// 当前路由
const currentRoute = useRoute();
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([currentRoute.name as string]);

const menus = computed(() => userStore.menus);
// console.log('menus', menus.value);
/** 侧边栏布局 */
const isSideMenu = computed(() => layoutSetting.layout === 'vertical');
</script>

<style lang="less" scoped>
.menu-container {
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &.is-side-menu {
    height: calc(100vh - var(--app-header-height));
  }

  & > :deep(.ant-menu) {
    justify-content: center;
    width: 100%;
  }
}
</style>
