<template>
  <AMenu
    mode="inline"
    theme="dark"
    :selectedKeys="selectedKeys"
    :open-keys="openKeys"
    @openChange="changeOpen"
  >
    <template v-for="route in routes">
      <LayoutMenu v-if="!route.meta?.hidden" :key="route.path" :item="route" />
    </template>
  </AMenu>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes';
import LayoutMenu from './components/Menu.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const openKeys = ref<string[]>([]);
const changeOpen = (keys) => {
  const currentOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1);
  openKeys.value = currentOpenKey ? [currentOpenKey] : [];
};

const selectedKeys = computed(() => {
  return [router.currentRoute.value.name] as string[];
});
</script>

<style scoped lang="less"></style>
