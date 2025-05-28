<template>
  <AntdMenuItem :key="item?.name" @click="handleMenuItemClick(item)">
    <MenuItemContent :item="item" />
  </AntdMenuItem>
</template>

<script setup lang="ts">
import { MenuItem as AntdMenuItem } from 'ant-design-vue';
import MenuItemContent from './MenuItemContent.vue';
import { useRouter } from 'vue-router';
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

defineOptions({
  name: 'MyMenuItem'
});

defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  }
});

const router = useRouter();

const handleMenuItemClick = (item: RouteRecordRaw) => {
  const { isExt, extOpenMode } = item.meta || {};
  if (isExt && extOpenMode !== 2) {
    window.open(item.path);
  } else {
    router.push({ name: item.name });
  }
};
</script>
