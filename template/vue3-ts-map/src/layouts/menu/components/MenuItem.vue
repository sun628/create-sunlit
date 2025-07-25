<template>
  <a-menu-item
    :key="item?.path"
    :icon="renderIcon(item?.meta?.icon)"
    @click="handleMenuItemClick(item)"
  >
    <span>{{ item?.meta?.title }}</span>
  </a-menu-item>
</template>

<script setup lang="ts">
import { renderIcon } from '@/components/base-components/svg-icon';
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
