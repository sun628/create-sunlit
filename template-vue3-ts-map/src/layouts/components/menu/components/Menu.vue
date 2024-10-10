<template>
  <component :is="menuComponent" :key="routeChildren.path" :item="routeChildren" />
</template>

<script setup>
import MenuItem from './MenuItem.vue';
import Submenu from './SubMenu.vue';
const props = defineProps(['item']);
const routeChildren = ref({});
const menuComponent = shallowRef('');
const handleChildren = (children = []) => {
  if (children === null) return [];
  return children.filter((item) => item.hidden !== true);
};
const showChildren = handleChildren(props.item.children);
if (showChildren.length === 0) {
  menuComponent.value = MenuItem;
  routeChildren.value = { ...props.item };
} else if (showChildren.length === 1 && props.item.meta.alwaysShow !== true) {
  menuComponent.value = MenuItem;
  routeChildren.value = showChildren[0];
} else {
  menuComponent.value = Submenu;
  routeChildren.value = { ...props.item };
}
</script>
<style lang="less">
.anticon {
  margin-right: 3px !important;
}
</style>
