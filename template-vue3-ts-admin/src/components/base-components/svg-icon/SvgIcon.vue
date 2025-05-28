<template>
  <div class="svg-icon" :class="[iconName]" :style="iconStyle" />
</template>
<script setup lang="ts">
import { isNumber } from 'lodash-es';
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

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    default: 'svg'
  },
  fontSize: {
    type: [String, Number],
    default: '0.24rem'
  },
  color: String
});

const iconStyle = computed(() => {
  const { fontSize, color } = props;
  const fontSizeValue = isNumber(fontSize) ? toRem(fontSize) : fontSize;
  return {
    fontSize: fontSizeValue,
    color
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
