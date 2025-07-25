<template>
  <i class="svg-icon" :class="[iconName]" :style="iconStyle" />
</template>
<script setup lang="ts">
import { isNumber } from 'lodash-es';
import { computed } from 'vue';

defineOptions({
  name: 'SvgIcon'
});

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
    default: '0.16rem'
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
  if (props.name.includes(':')) {
    return `i-${props.name}`;
  }
  return `i-${props.prefix}:${props.name}`;
});
</script>
<style lang="less" scoped></style>
