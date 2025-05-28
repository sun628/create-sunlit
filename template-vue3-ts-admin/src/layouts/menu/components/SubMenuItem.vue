<template>
  <!-- 目录 -->
  <AntdSubMenu v-if="isShowSubMenu(item)" :key="item?.name" v-bind="$attrs">
    <template #title>
      <MenuItemContent :item="item" />
    </template>
    <template v-for="child in item.children || []" :key="child.name">
      <SubMenuItem :item="child" />
    </template>
  </AntdSubMenu>
  <!-- 菜单 -->
  <MenuItem v-else :item="item" />
</template>

<script setup lang="ts">
import { SubMenu as AntdSubMenu } from 'ant-design-vue';
import MenuItem from './MenuItem.vue';
import MenuItemContent from './MenuItemContent.vue';
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

defineOptions({
  name: 'SubMenuItem'
});

defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  }
});

const isShowSubMenu = (menuItem: RouteRecordRaw) => {
  return (
    menuItem?.meta?.type === 0 ||
    (!Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length)
  );
};
</script>

<style scoped></style>
