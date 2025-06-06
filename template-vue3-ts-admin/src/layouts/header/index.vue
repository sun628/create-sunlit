<template>
  <a-layout-header class="layout-header" :style="headerStyle">
    <div class="layout-header-container">
      <div class="flex-1 overflow-x-auto">
        <slot name="headerContent">
          <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="updatedCollapsed(false)" />
          <MenuFoldOutlined v-else class="trigger" @click="updatedCollapsed(true)" />
          <!-- <slot name="breadcrumb">
            <Breadcrumb />
          </slot> -->
        </slot>
      </div>
      <a-space align="center" class="flex-shrink-0">
        <slot name="headerActions" />
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
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
  padding-inline: 0;
}
</style>
