<template>
  <Divider v-bind="getBindValue" orientation="center" :orientationMargin="0">
    <template v-for="(_, slotName) of $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </Divider>
</template>

<script setup lang="ts">
import { DividerProps } from 'ant-design-vue/es/divider';
import { Divider } from 'ant-design-vue';

const attrs = useAttrs();
const props = withDefaults(defineProps<DividerProps>(), {});

const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>

<style scoped lang="less">
.ant-divider-horizontal {
  &.ant-divider-with-text::before,
  &.ant-divider-with-text::after {
    height: 2px;
    background-color: var(--el-color-primary);
  }
}
</style>
