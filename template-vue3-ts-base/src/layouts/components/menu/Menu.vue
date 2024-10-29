<template>
  <AMenu
    mode="inline"
    theme="dark"
    :selectedKeys="selectedKeys"
    :open-keys="openKeys"
    @openChange="openChange"
  >
    <Submenu v-for="menu in menuList" :key="menu.path" :item="menu" />
  </AMenu>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes';
import Submenu from './components/SubMenu.vue';
import { useRouter } from 'vue-router';
import { isEmpty } from 'radash';
const router = useRouter();

const openKeys = ref<string[]>([]);
const openChange = (keys) => {
  openKeys.value = keys;
};

const selectedKeys = computed(() => {
  return [router.currentRoute.value.name] as string[];
});

function generateMenu(routes) {
  return routes.reduce((acc, route) => {
    const isHidden = route.meta && route.meta.hidden;
    // 处理隐藏路由逻辑
    if (isHidden && isEmpty(route.children)) {
      return acc;
    }
    // 处理有子路由的情况
    if (isHidden && route.children) {
      acc.push(...generateMenu(route.children));
      return acc;
    }
    acc.push({
      ...route,
      children: route.children ? generateMenu(route.children) : [],
    });
    return acc;
  }, []);
}

const menuList = generateMenu(routes);
</script>
