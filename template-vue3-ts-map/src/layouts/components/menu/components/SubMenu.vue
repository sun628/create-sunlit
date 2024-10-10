<template>
  <ASubMenu :key="item.name">
    <template #icon>
      <SvgIcon v-if="item.meta?.icon" :name="item.meta.icon" />
    </template>
    <template #title>{{ item.meta?.title }}</template>
    <template v-for="subItem in item.children" :key="subItem.name">
      <SubMenu v-if="subItem.children && subItem.children.length > 0" :item="subItem" />
      <MenuItem v-else :item="subItem" />
    </template>
  </ASubMenu>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import MenuItem from './MenuItem.vue';
withDefaults(defineProps<{ item: RouteRecordRaw }>(), {});
</script>
