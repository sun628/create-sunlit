<template>
  <template v-if="item?.meta?.icon">
    <Icon :icon="item.meta.icon" />
  </template>
  <span>{{ item?.meta?.title }}</span>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router';
import Icon from '@ant-design/icons-vue';

defineOptions({
  name: 'MenuItemContent'
});

defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  }
});
</script>
