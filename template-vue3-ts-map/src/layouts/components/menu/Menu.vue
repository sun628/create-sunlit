<template>
  <AMenu
    mode="inline"
    theme="dark"
    :selectedKeys="selectedKeys"
    :open-keys="openKeys"
    @openChange="changeOpen"
  >
    <template v-for="route in routes" :key="route.path">
      <Submenu :item="route" />
    </template>
  </AMenu>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes';
import Submenu from './components/SubMenu.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const openKeys = ref<string[]>([]);
const changeOpen = (keys) => {
  openKeys.value = keys;
};

const selectedKeys = computed(() => {
  return [router.currentRoute.value.name] as string[];
});
</script>

<style scoped lang="less"></style>
