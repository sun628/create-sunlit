<template>
  <ASubMenu :key="props.item.name">
    <template #icon>
      <SvgIcon v-if="props.item.meta.icon" :name="props.item.meta.icon" />
    </template>
    <template #title>{{ props.item.meta.title }}</template>
    <template v-for="children in props.item.children">
      <MenuItem
        v-if="
          (children.hidden !== true && !children.children) ||
          (children.children && children.children.length == 1 && children.meta.alwaysShow !== true)
        "
        :key="children.name"
        :item="children"
      />
      <SubMenu
        v-if="
          children.hidden !== true &&
          children.children &&
          (children.children.length > 1 || children.meta.alwaysShow === true)
        "
        :key="children.name"
        :item="children"
      />
    </template>
  </ASubMenu>
</template>
<script setup>
import MenuItem from './MenuItem.vue';
const props = defineProps(['item']);
</script>
