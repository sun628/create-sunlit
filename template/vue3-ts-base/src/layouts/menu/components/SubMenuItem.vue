<template>
  <!-- 目录 -->
  <a-sub-menu
    v-if="isShowSubMenu(item)"
    :key="item?.path"
    v-bind="$attrs"
    :icon="renderIcon(item?.meta?.icon)"
    :title="item?.meta?.title"
  >
    <template v-for="child in item.children || []" :key="child.path">
      <SubMenuItem :item="child" />
    </template>
  </a-sub-menu>
  <!-- 菜单 -->
  <MenuItem v-else :item="item" />
</template>

<script setup lang="tsx">
import MenuItem from './MenuItem.vue';
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { renderIcon } from '@/components/base-components/svg-icon';
defineOptions({
  name: 'SubMenuItem'
});

defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  }
});

/**
 * @function
 * @todo 判断是否显示子菜单
 * @param  menuItem - 菜单项
 * @returns  是否显示子菜单
 **/
const isShowSubMenu = (menuItem: RouteRecordRaw) => {
  return !Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length;
};
</script>
