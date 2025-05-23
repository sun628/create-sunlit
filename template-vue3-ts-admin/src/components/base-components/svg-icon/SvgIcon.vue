<template>
  <div class="svg-icon" :class="[iconName]" :style="iconStyle" />
</template>
<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'SvgIcon'
});

export type SvgIconProps = {
  name: string;
  prefix?: 'ant-design' | 'svg' | undefined;
  fontSize?: string;
  color?: string;
};

const props = withDefaults(defineProps<SvgIconProps>(), {
  prefix: 'svg'
});

const iconStyle = computed(() => {
  return {
    fontSize: props.fontSize || '0.24rem',
    color: props.color
  };
});

const iconName = computed(() => {
  if (!props.name) {
    return void 0;
  }
  return `i-${props.prefix}:${props.name}`;
});
</script>
<style lang="less" scoped></style>
