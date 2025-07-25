<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys="isSideMenu ? openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      collapsible
    >
      <template v-for="item in menuData" :key="item.name">
        <SubMenuItem :item="item" />
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { type MenuTheme } from 'ant-design-vue';
import SubMenuItem from './components/SubMenuItem.vue';
import { getMenuData, clearMenuItem } from './getMenuData.ts';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
});

const { layoutSetting } = useAppStore();
// 当前路由
const currentRoute = useRoute();
const router = useRouter();

const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const openKeys = ref<string[]>([]);
console.log('🚀 ~ menuData:', menuData);

const selectedKeys = computed(() => [currentRoute.path]);

/** 侧边栏布局 */
const isSideMenu = computed(() => layoutSetting.layout === 'vertical');

// 监听菜单收缩状态
watch(
  () => props.collapsed,
  () => {
    console.log('🚀 ~ collapsed:', props.collapsed);
  }
);
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
    height: calc(100vh - 64px);
  }

  & > :deep(.ant-menu) {
    justify-content: center;
    width: 100%;
  }
  :deep(.ant-menu-title-content) {
    display: flex;
    align-items: center;
    .svg-icon {
      margin-right: 8px;
    }
  }
}
</style>
