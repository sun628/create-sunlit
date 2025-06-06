<template>
  <a-layout-header class="layout-header">
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
defineOptions({
  name: 'LayoutHeader'
});

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits<{
  (e: 'collapse', val: boolean): void;
  (e: 'update:collapsed', val: boolean): void;
}>();

function updatedCollapsed(val: boolean) {
  emits('collapse', val);
  emits('update:collapsed', val);
}
</script>

<style scoped lang="less">
.layout-header {
  height: 64px;
  line-height: 64px;
  padding-inline: 0;
}
</style>
