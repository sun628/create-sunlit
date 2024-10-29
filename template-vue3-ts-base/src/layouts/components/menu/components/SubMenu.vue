<template>
  <ASubMenu v-if="item.children && item.children.length > 1" :key="item.name">
    <template #icon>
      <SvgIcon v-if="item.meta?.icon" :name="item.meta.icon" />
    </template>
    <template #title>{{ item.meta?.title }}</template>
    <template v-for="subItem in item.children" :key="subItem.name">
      <SubMenu v-if="subItem.children && subItem.children.length > 0" :item="subItem" />
      <MenuItem v-else :item="subItem" />
    </template>
  </ASubMenu>
  <MenuItem v-else :item="item" />
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import MenuItem from './MenuItem.vue';
withDefaults(defineProps<{ item: RouteRecordRaw }>(), {});
</script>
