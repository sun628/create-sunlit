<template>
  <a-layout-header class="layout-header" :style="headerStyle">
    <div class="layout-header-container flex">
      <div class="flex-1 overflow-x-auto">
        <slot name="headerContent">
          <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="updatedCollapsed(false)" />
          <MenuFoldOutlined v-else class="trigger" @click="updatedCollapsed(true)" />
          <slot name="breadcrumb">
            <Breadcrumb />
          </slot>
        </slot>
      </div>
      <a-space align="center" class="flex-shrink-0">
        <slot name="headerActions" />
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { type CSSProperties } from 'vue';
import Breadcrumb from './components/breadcrumb/index.vue';
defineOptions({
  name: 'LayoutHeader'
});

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const { layoutSetting } = useAppStore();

const emits = defineEmits<{
  (e: 'collapse', val: boolean): void;
  (e: 'update:collapsed', val: boolean): void;
}>();

function updatedCollapsed(val: boolean) {
  emits('collapse', val);
  emits('update:collapsed', val);
}

const headerStyle = computed<CSSProperties>(() => {
  const { theme } = layoutSetting;
  const isDark = theme === 'dark';
  return {
    backgroundColor: isDark ? '' : 'rgba(255, 255, 255, 0.85)',
    color: isDark ? 'rgba(255, 255, 255, 0.85)' : ''
  };
});
</script>

<style scoped lang="less">
.layout-header {
  height: 64px;
  line-height: 64px;
  font-size: 16px;
  padding-left: 16px;
  box-shadow: 0 5px 4px rgba(0, 21, 41, 0.08);
  position: relative;
}
</style>
